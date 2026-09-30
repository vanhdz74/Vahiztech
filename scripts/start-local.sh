#!/usr/bin/env bash
# ==============================================================================
# VAHIZTECH ECOSYSTEM - ONE-CLICK LOCAL STARTER
# ==============================================================================
# Script khởi chạy toàn bộ hạ tầng IAM / SSO và Cổng Giao diện Hệ thống (Portal)
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${ROOT_DIR}"

echo "================================================================================="
echo "   🚀 KHỞI CHẠY HỆ THỐNG VAHIZTECH - CENTRAL IAM, SSO & APPS HUB PORTAL        "
echo "================================================================================="

# 1. Kiểm tra file cấu hình .env
if [ ! -f .env ]; then
  echo "[*] Không tìm thấy file .env, tự động sao chép từ .env.example..."
  cp .env.example .env
fi

# 2. Khởi động các container Hạ tầng (PostgreSQL 16, Keycloak 25+, Kafka)
echo ""
echo "[*] [1/3] Đang khởi động hạ tầng Docker (PostgreSQL, Keycloak, Kafka)..."
docker compose -f docker-compose.infra.yml up -d

# 3. Chờ Keycloak khởi động hoàn tất
echo ""
echo "[*] [2/3] Đang kiểm tra trạng thái Keycloak Server (http://localhost:8080)..."
RETRIES=30
until curl -s -f http://localhost:8080/realms/ecosystem-realm/.well-known/openid-configuration > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "    ⏳ Chờ Keycloak sẵn sàng và nạp Ecosystem Realm... ($RETRIES lần thử lại)"
  sleep 3
  RETRIES=$((RETRIES-1))
done

if [ $RETRIES -eq 0 ]; then
  echo "[-] Cảnh báo: Keycloak mất nhiều thời gian hơn dự kiến để khởi động. Vui lòng kiểm tra: docker logs vahiztech-keycloak"
else
  echo "[+] ✅ Keycloak 25.0+ IAM & SSO Server ĐÃ SẴN SÀNG!"
fi

# 4. Kiểm thử nhanh SSO Token
echo ""
echo "[*] [3/3] Chạy kiểm thử tự động luồng SSO Token..."
"${ROOT_DIR}/infra/keycloak/scripts/test-token.sh"

echo ""
echo "================================================================================="
echo "   🎉 HỆ THỐNG ĐÃ SẴN SÀNG! TRUY CẬP CÁC DỊCH VỤ DƯỚI ĐÂY:                      "
echo "================================================================================="
echo "   🌐 Giao diện Hệ thống (Hub Portal) : http://localhost:3000"
echo "   🔐 Keycloak IAM Master Console      : http://localhost:8080 (admin / admin_master_password_2026)"
echo "   🏢 Keycloak Ecosystem Realm         : http://localhost:8080/admin/master/console/#/ecosystem-realm"
echo "   👤 Keycloak Account Self-service    : http://localhost:8080/realms/ecosystem-realm/account"
echo "   🐘 PostgreSQL 16 DB (Host Port)     : localhost:5433 (user: keycloak, pass: keycloak_secure_pass_2026)"
echo "   📦 Apache Kafka Event Broker        : localhost:29092"
echo "================================================================================="
echo "   💡 Để chạy giao diện Portal chế độ phát triển (Dev Mode):"
echo "      cd apps/portal && npm run dev"
echo "================================================================================="
