# Keycloak Extensions & Custom SPIs

Thư mục này lưu trữ các Service Provider Interfaces (SPI) tự viết, Event Listeners, Custom Authenticators, hoặc User Storage Providers (file JAR).

## Cách kích hoạt:
Khi build Docker image tùy biến hoặc chạy container, các file `.jar` đặt tại đây sẽ được mount hoặc copy vào `/opt/keycloak/providers/`.
