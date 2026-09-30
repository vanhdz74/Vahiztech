#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${ROOT_DIR}"

echo "[-] Đang dừng toàn bộ container hệ thống Vahiztech..."
docker compose down

echo "[+] Toàn bộ container đã được dừng an toàn!"
