#!/usr/bin/env bash
# ==============================================================================
# VAHIZTECH ECOSYSTEM - IAM / SSO & MARKETPLACE LICENSE TEST SCRIPT
# ==============================================================================
# Mô phỏng kiến trúc Google Workspace Cha -> Apps Con (Google Sheets / Docs):
#   - Vahiztech Hub (Cha): Quản lý Users, Mua bản quyền (Licenses)
#   - Apps Con: CourseDemy, VihoTask đối soát Licenses trong JWT Access Token
# ==============================================================================

set -e

KEYCLOAK_URL="${KEYCLOAK_URL:-http://localhost:8080}"
REALM="${REALM_NAME:-ecosystem-realm}"

echo "================================================================================="
echo "       KIỂM THỬ HỆ THỐNG ĐỊNH DANH VAHIZTECH HUB & SSO MARKETPLACE              "
echo "================================================================================="
echo "[*] Keycloak Server: ${KEYCLOAK_URL}"
echo "[*] Target Realm:    ${REALM}"
echo ""

# Hàm giải mã JWT Payload
decode_jwt() {
  local token=$1
  local payload=$(echo "$token" | cut -d. -f2)
  local len=${#payload}
  local rem=$((len % 4))
  if [ $rem -eq 2 ]; then payload="${payload}=="; fi
  if [ $rem -eq 3 ]; then payload="${payload}="; fi
  echo "$payload" | base64 --decode 2>/dev/null || echo "$payload" | base64 -D 2>/dev/null
}

echo "---------------------------------------------------------------------------------"
echo " 1. KIỂM THỬ BACKEND-ADMIN-CLIENT (SERVICE ACCOUNT / M2M ADMIN API)              "
echo "---------------------------------------------------------------------------------"

CLIENT_ID="backend-admin-client"
CLIENT_SECRET="backend_admin_super_secret_2026"

ADMIN_TOKEN_RESP=$(curl -s -X POST "${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=${CLIENT_ID}" \
  -d "client_secret=${CLIENT_SECRET}")

ADMIN_TOKEN=$(echo "$ADMIN_TOKEN_RESP" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4 || true)

if [ -z "$ADMIN_TOKEN" ]; then
  echo "[-] Lỗi khi lấy token M2M cho ${CLIENT_ID}:"
  echo "$ADMIN_TOKEN_RESP"
else
  echo "[+] Lấy token M2M thành công cho ${CLIENT_ID}!"
  echo "[+] Gọi Keycloak Admin REST API để tra cứu danh sách Users trong Realm..."
  USERS_LIST=$(curl -s -X GET "${KEYCLOAK_URL}/admin/realms/${REALM}/users" \
    -H "Authorization: Bearer ${ADMIN_TOKEN}" \
    -H "Accept: application/json")
  echo "$USERS_LIST" | grep -o '"username":"[^"]*' | cut -d'"' -f4 | sed 's/^/    ✓ User: /'
fi

echo ""
echo "---------------------------------------------------------------------------------"
echo " 2. KIỂM THỬ ĐĂNG NHẬP USER PERSONAS & BẢN QUYỀN ỨNG DỤNG (APP LICENSES)          "
echo "---------------------------------------------------------------------------------"

test_scenario() {
  local title=$1
  local username=$2
  local password=$3
  local expected_desc=$4

  echo ""
  echo "================================================================================="
  echo ">> KỊCH BẢN: ${title}"
  echo "   Mô tả:    ${expected_desc}"
  echo "   Tài khoản: [${username}]"
  echo "================================================================================="

  USER_TOKEN_RESP=$(curl -s -X POST "${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=password" \
    -d "client_id=vahiztech-hub" \
    -d "username=${username}" \
    -d "password=${password}" \
    -d "scope=openid profile email tenant-info")

  ACCESS_TOKEN=$(echo "$USER_TOKEN_RESP" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4 || true)

  if [ -z "$ACCESS_TOKEN" ]; then
    echo "[-] Đăng nhập THẤT BẠI cho user [${username}]:"
    echo "$USER_TOKEN_RESP"
    return
  fi

  PAYLOAD=$(decode_jwt "$ACCESS_TOKEN")
  TENANT=$(echo "$PAYLOAD" | grep -o '"tenant_id":"[^"]*' | cut -d'"' -f4 || echo "N/A")
  ROLES=$(echo "$PAYLOAD" | grep -o '"roles":\[[^]]*\]' || echo "roles: []")
  LICENSES=$(echo "$PAYLOAD" | grep -o '"licenses":\[[^]]*\]' || echo "licenses: []")

  echo "[+] ĐĂNG NHẬP THÀNH CÔNG!"
  echo "    🏢 Tenant ID : ${TENANT}"
  echo "    🔑 Roles     : ${ROLES}"
  echo "    📦 Licenses  : ${LICENSES}"
  echo ""
  echo "    --- KIỂM TRA QUYỀN TRUY CẬP CÁC APPS CON ---"
  
  if echo "$LICENSES" | grep -q "vahiztech_hub"; then
    echo "    ✅ Vahiztech Hub Portal : [CHO PHÉP] Toàn quyền quản trị hệ sinh thái"
  else
    echo "    ℹ️ Vahiztech Hub Portal : [BÌNH THƯỜNG] Thành viên / Khách hàng"
  fi

  if echo "$LICENSES" | grep -q "coursedemy"; then
    echo "    ✅ CourseDemy App      : [CHO PHÉP] Đã mua bản quyền E-Learning"
  else
    echo "    ❌ CourseDemy App      : [TỪ CHỐI / 403] Chưa mua bản quyền -> Yêu cầu mua trên Hub"
  fi

  if echo "$LICENSES" | grep -q "vihotask"; then
    echo "    ✅ VihoTask App        : [CHO PHÉP] Đã mua bản quyền Task Management"
  else
    echo "    ❌ VihoTask App        : [TỪ CHỐI / 403] Chưa mua bản quyền -> Yêu cầu mua trên Hub"
  fi
}

test_scenario "SUPER ADMIN HỆ SINH THÁI" \
  "vahiztech_super_admin" "SuperAdmin@123456" \
  "Admin tối cao của Vahiztech Hub - Sở hữu toàn bộ licenses hệ sinh thái."

test_scenario "DOANH NGHIỆP MUA FULL 2 APPS (ALPHA CORP ADMIN)" \
  "alpha_corp_admin" "Admin@123456" \
  "Quản trị viên Công ty Alpha - Đã mua license cả CourseDemy & VihoTask."

test_scenario "NHÂN VIÊN CÔNG TY CHỈ DÙNG VIHOTASK" \
  "alpha_employee_tasks" "Staff@123456" \
  "Nhân viên công ty Alpha - Chỉ được cấp license VihoTask, bị chặn CourseDemy."

test_scenario "HỌC VIÊN CHỈ HỌC COURSEDEMY (BETA SCHOOL)" \
  "beta_school_student" "Student@123456" \
  "Học viên trường Beta - Chỉ được cấp license CourseDemy, bị chặn VihoTask."

test_scenario "NGƯỜI DÙNG MIỄN PHÍ CHƯA MUA LICENSE NÀO" \
  "free_tier_user" "Free@123456" \
  "Tài khoản Free mới đăng ký trên Vahiztech - Bị chặn ở cả 2 Apps cho đến khi mua license."

echo ""
echo "================================================================================="
echo "[+] HOÀN TẤT KIỂM THỬ TOÀN DIỆN HỆ THỐNG SSO VAHIZTECH!"
echo "================================================================================="
