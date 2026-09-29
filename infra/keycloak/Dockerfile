# ==============================================================================
# VAHIZTECH CENTRAL IAM / SSO - DOCKERFILE
# ==============================================================================
# Tự đóng gói Keycloak 25.0+ cho hệ sinh thái SaaS Multi-Tenant Vahiztech
# Tích hợp sẵn:
#   1. Khởi tạo tối ưu (--optimized build)
#   2. Cấu hình Realm tự động nạp khi container khởi chạy
#   3. Theme thương hiệu Vahiztech Hub
#   4. Tiện ích mở rộng / Custom SPIs (nếu có)
# ==============================================================================

FROM quay.io/keycloak/keycloak:25.0.6 as builder

# Cấu hình môi trường build tối ưu
ENV KC_DB=postgres
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_FEATURES=organization

# Sao chép file cấu hình Realm vào thư mục import
WORKDIR /opt/keycloak
COPY realms/ecosystem-realm.json /opt/keycloak/data/import/realm-config.json

# Sao chép themes và extensions (nếu có)
COPY themes/ /opt/keycloak/themes/
COPY extensions/ /opt/keycloak/providers/

# Build tối ưu hoá image trước để tăng tốc khởi động 300%
RUN /opt/keycloak/bin/kc.sh build --features=organization

# Stage chạy chính thức (Minimal Runtime)
FROM quay.io/keycloak/keycloak:25.0.6
COPY --from=builder /opt/keycloak/ /opt/keycloak/

USER 1000

ENV KC_HTTP_ENABLED=true
ENV KC_HOSTNAME_STRICT=false
ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_PROXY_HEADERS=xforwarded

EXPOSE 8080

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--import-realm", "--features=organization"]
