#!/usr/bin/env bash
# ==============================================================================
# Script xuất (export) toàn bộ cấu hình Realm từ container Keycloak đang chạy
# Kết quả xuất ra file: infra/keycloak/realms/ecosystem-realm.exported.json
# ==============================================================================

set -euo pipefail

CONTAINER_NAME="${KEYCLOAK_CONTAINER:-vahiztech-keycloak}"
REALM_NAME="${REALM_NAME:-ecosystem-realm}"
OUTPUT_FILE="infra/keycloak/realms/ecosystem-realm.exported.json"

echo "==> Đang kiểm tra container ${CONTAINER_NAME}..."
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "[-] Lỗi: Container ${CONTAINER_NAME} không đang chạy."
  echo "    Hãy khởi chạy hạ tầng trước: docker compose -f docker-compose.infra.yml up -d"
  exit 1
fi

echo "==> Đang export Realm [${REALM_NAME}] từ Keycloak container..."
docker exec "${CONTAINER_NAME}" /opt/keycloak/bin/kc.sh export \
  --realm "${REALM_NAME}" \
  --file /tmp/realm-export.json \
  --users realm_file

echo "==> Đang sao chép file cấu hình về máy host: ${OUTPUT_FILE}..."
docker cp "${CONTAINER_NAME}:/tmp/realm-export.json" "${OUTPUT_FILE}"

echo "[+] Đã xuất cấu hình Realm thành công vào: ${OUTPUT_FILE}"
