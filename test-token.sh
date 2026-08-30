#!/usr/bin/env bash
# ==============================================================================
# Script kiểm thử IAM Token & Service Account
# Hỗ trợ:
# 1. Lấy token Client Credentials từ backend-admin-client & gọi Admin REST API
# 2. Lấy Access Token từ nextjs-portal cho các user và giải mã payload JWT
# ==============================================================================

set -e

KEYCLOAK_URL="http://localhost:8080"
REALM="ecosystem-realm"

echo "================================================================="
echo " 1. KIỂM THỬ BACKEND-ADMIN-CLIENT (CLIENT CREDENTIALS FLOW) "
echo "================================================================="

CLIENT_ID="backend-admin-client"
CLIENT_SECRET="backend_admin_super_secret_2026"

ADMIN_TOKEN_RESP=$(curl -s -X POST "${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=${CLIENT_ID}" \
  -d "client_secret=${CLIENT_SECRET}")

ADMIN_TOKEN=$(echo "$ADMIN_TOKEN_RESP" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$ADMIN_TOKEN" ]; then
  echo "[-] Lỗi khi lấy token cho ${CLIENT_ID}:"
  echo "$ADMIN_TOKEN_RESP"
else
  echo "[+] Lấy token thành công cho ${CLIENT_ID}!"
  echo "[+] Gọi Keycloak Admin REST API để lấy danh sách Users..."
  USERS_LIST=$(curl -s -X GET "${KEYCLOAK_URL}/admin/realms/${REALM}/users" \
    -H "Authorization: Bearer ${ADMIN_TOKEN}" \
    -H "Accept: application/json")
  echo "[+] Danh sách Users tìm thấy trong Realm:"
  echo "$USERS_LIST" | grep -o '"username":"[^"]*' | cut -d'"' -f4 | sed 's/^/    - /'
fi

echo ""
echo "================================================================="
echo " 2. KIỂM THỬ ACCESS TOKEN CLAIMS (TENANT_ID, LICENSES, ROLES) "
echo "================================================================="

decode_jwt() {
  local token=$1
  local payload=$(echo "$token" | cut -d. -f2)
  # Fix base64 padding
  local len=${#payload}
  local rem=$((len % 4))
  if [ $rem -eq 2 ]; then payload="${payload}=="; fi
  if [ $rem -eq 3 ]; then payload="${payload}="; fi
  echo "$payload" | base64 --decode 2>/dev/null || echo "$payload" | base64 -D 2>/dev/null
}

test_user() {
  local username=$1
  local password=$2
  echo ""
  echo "--> Đăng nhập user: [${username}]..."
  
  USER_TOKEN_RESP=$(curl -s -X POST "${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=password" \
    -d "client_id=nextjs-portal" \
    -d "username=${username}" \
    -d "password=${password}" \
    -d "scope=openid profile email tenant-info")

  ACCESS_TOKEN=$(echo "$USER_TOKEN_RESP" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

  if [ -z "$ACCESS_TOKEN" ]; then
    echo "[-] Đăng nhập thất bại:"
    echo "$USER_TOKEN_RESP"
  else
    echo "[+] Đăng nhập thành công! Claims trong Access Token:"
    PAYLOAD=$(decode_jwt "$ACCESS_TOKEN")
    echo "$PAYLOAD" | grep -o '"tenant_id":"[^"]*' || true
    echo "$PAYLOAD" | grep -o '"licenses":\[[^]]*\]' || true
    echo "$PAYLOAD" | grep -o '"roles":\[[^]]*\]' || true
  fi
}

test_user "tenant_admin" "Admin@123456"
test_user "tenant_member" "Member@123456"
test_user "individual_user" "User@123456"

echo ""
echo "================================================================="
echo "[+] Hoàn tất kiểm thử!"
echo "================================================================="
