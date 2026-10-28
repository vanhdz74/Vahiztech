# 💳 VAHIZTECH PAYMENT HUB SERVICE

> **Central Payment Hub & Gateway Microservice** cho hệ sinh thái SaaS Multi-Tenant Vahiztech.  
> Tích hợp đa cổng thanh toán: **VietQR, VNPay, MoMo, ZaloPay, Stripe**, hỗ trợ nạp tiền, thu phí dịch vụ CourseDemy & VihoTask, và quản lý bản quyền SaaS tự động.

---

## 📌 1. TỔNG QUAN & VAI TRÒ HỆ THỐNG

`payment-hub` là dịch vụ trung tâm xử lý giao dịch tài chính cho toàn bộ hệ sinh thái Vahiztech:
- **Phân lập Dữ liệu Multi-Tenant**: Mỗi Tenant sở hữu cấu hình cổng thanh toán độc lập (Merchant ID, Secret Keys, Webhook Secrets).
- **Đảm bảo Tính Toàn vẹn (ACID & Idempotency)**: Hỗ trợ `idempotency_key` ở cấp độ cơ sở dữ liệu và Redis Cache để ngăn chặn trừ tiền 2 lần.
- **Đối soát & Webhook IPN Tự động**: Tiếp nhận và xác thực chữ ký Webhook từ đối tác ngân hàng/cổng thanh toán, tự động đồng bộ trạng thái đơn hàng.

---

## 🛠️ 2. CÔNG NGHỆ SỬ DỤNG (TECH STACK)

| Thành phần | Công nghệ | Phiên bản |
| :--- | :--- | :--- |
| **Ngôn ngữ** | Java (LTS) | Java 21 |
| **Framework** | Spring Boot | 3.5.x |
| **Cơ sở dữ liệu** | PostgreSQL | 16-alpine |
| **Bộ nhớ đệm & Khóa** | Redis | 7-alpine |
| **Migration Dữ liệu** | Flyway DB | 11.x / 12.x |
| **Tài liệu API** | SpringDoc OpenAPI (Swagger UI) | 2.6.x |
| **Container hóa** | Docker & Docker Compose | Compose v2 |

---

## 🗄️ 3. KIẾN TRÚC DỮ LIỆU & 4 BẢNG CHÍNH (FLYWAY MIGRATIONS)

Hệ thống quản lý dữ liệu thanh toán thông qua 4 bảng cốt lõi (tạo bởi migration `V1__create_payment_hub_tables.sql`):

### 1️⃣ Bảng `payment_configs` (Cấu hình Cổng Thanh toán theo Tenant)
Lưu trữ thông tin xác thực và thiết lập môi trường thanh toán cho từng Tenant:
- `id` (UUID - PK): Khóa chính.
- `tenant_id` (VARCHAR): Định danh tổ chức doanh nghiệp.
- `provider` (VARCHAR): Cổng thanh toán (`VIETQR`, `VNPAY`, `MOMO`, `ZALOPAY`, `STRIPE`).
- `merchant_id` (VARCHAR): Mã tài khoản thụ hưởng / mã merchant.
- `merchant_name` (VARCHAR): Tên hiển thị khi quét mã hoặc thanh toán.
- `api_key` & `secret_key` (VARCHAR): Khóa bí mật ký số giao dịch (HMAC SHA512/SHA256).
- `webhook_secret` (VARCHAR): Khóa bí mật xác minh chữ ký Webhook/IPN.
- `environment` (VARCHAR): Môi trường (`SANDBOX`, `PRODUCTION`).
- `is_active` & `is_default` (BOOLEAN): Trạng thái kích hoạt và cờ ưu tiên.
- `config_data` (JSONB): Tham số bổ sung (số tài khoản ngân hàng, BIN VietQR, template QR).

### 2️⃣ Bảng `payment_orders` (Đơn hàng & Yêu cầu Thanh toán Đa dịch vụ)
Tiếp nhận yêu cầu thanh toán từ CourseDemy, VihoTask, Portal Billing:
- `id` (UUID - PK): Khóa chính.
- `order_code` (VARCHAR - UNIQUE): Mã đơn thanh toán duy nhất (VD: `ORD-20261028-XXXX`).
- `tenant_id` (VARCHAR): Tổ chức phát sinh đơn hàng.
- `customer_id` & `customer_email`: Thông tin khách hàng thực hiện thanh toán.
- `source_service` (VARCHAR): Dịch vụ nguồn (`COURSEDEMY`, `VIHOTASK`, `PORTAL_BILLING`, `OTHER`).
- `source_order_id` (VARCHAR): Mã đơn hàng bên hệ thống gốc.
- `amount` (NUMERIC) & `currency` (VARCHAR): Số tiền và đơn vị tiền tệ (`VND`, `USD`).
- `status` (VARCHAR): Vòng đời đơn (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`, `CANCELLED`, `EXPIRED`, `REFUNDED`).
- `expires_at` (TIMESTAMPTZ): Thời điểm hết hạn thanh toán (QR timeout).

### 3️⃣ Bảng `payment_transactions` (Giao dịch Thanh toán Chi tiết)
Lưu chi tiết từng lượt giao dịch thực tế qua ngân hàng / cổng thanh toán:
- `id` (UUID - PK): Khóa chính.
- `transaction_code` (VARCHAR - UNIQUE): Mã giao dịch thanh toán (VD: `TXN-20261028-XXXX`).
- `order_id` (UUID - FK): Liên kết đến đơn hàng (`payment_orders`).
- `provider` & `payment_method`: Nhà cung cấp và phương thức (`QR_CODE`, `ATM_CARD`, `CREDIT_CARD`, `E_WALLET`, `BANK_TRANSFER`).
- `gateway_transaction_no` (VARCHAR): Mã tham chiếu do cổng thanh toán/ngân hàng sinh ra.
- `idempotency_key` (VARCHAR - UNIQUE): Khóa chống trùng lặp giao dịch (Idempotency Key).
- `status` (VARCHAR): Trạng thái (`INITIATED`, `PENDING`, `SUCCESS`, `FAILED`, `CANCELLED`, `EXPIRED`).
- `gateway_payload` (JSONB): Payload phản hồi gốc từ đối tác.
- `paid_at` (TIMESTAMPTZ): Thời điểm giao dịch thành công.

### 4️⃣ Bảng `payment_webhook_logs` (Nhật ký Webhook & IPN Đối soát Giao dịch)
Lưu vết toàn bộ callback từ đối tác để đối soát và xử lý bất đồng bộ:
- `id` (UUID - PK): Khóa chính.
- `tenant_id` & `provider`: Nguồn gốc webhook.
- `order_code` & `transaction_id`: Thông tin đơn hoặc giao dịch đối chiếu.
- `event_type` (VARCHAR): Loại sự kiện (`PAYMENT_SUCCESS`, `PAYMENT_FAILED`, `REFUND`).
- `signature` (VARCHAR): Chữ ký bảo mật kèm theo header.
- `raw_payload` (JSONB): Dữ liệu nguyên bản JSON do cổng gửi sang.
- `processing_status` (VARCHAR): Trạng thái (`RECEIVED`, `PROCESSED`, `FAILED`, `IGNORED`, `DUPLICATE`).
- `retry_count` (INT): Số lần đã thử xử lý lại.

---

## 🚀 4. HƯỚNG DẪN KHỞI CHẠY (QUICK START)

### Cách 1: Chạy Hạ tầng Postgres + Redis bằng Docker Compose (Khuyến nghị cho Local Dev)

Từ thư mục `apps/payment-hub/`:
```bash
# 1. Khởi chạy Postgres 16 (Port 5434) và Redis 7 (Port 6379)
docker compose up -d postgres redis

# 2. Chạy ứng dụng Spring Boot
./mvnw spring-boot:run
```

### Cách 2: Khởi chạy Toàn bộ Module Payment Hub bằng Docker

```bash
cd apps/payment-hub
docker compose up -d
```

### Cách 3: Tích hợp với Hạ tầng Toàn hệ sinh thái Vahiztech

Từ thư mục gốc dự án (`Vahiztech/`):
```bash
# Khởi chạy hạ tầng chung (Postgres, Keycloak, Kafka, Redis)
docker compose -f docker-compose.infra.yml up -d

# Khởi chạy các ứng dụng
docker compose -f docker-compose.infra.yml -f docker-compose.apps.yml up -d
```

---

## 📖 5. TÀI LIỆU API & CỔNG TRUY CẬP

Khi ứng dụng đã khởi động:
- **Swagger UI (Interactive API Docs)**: [http://localhost:8084/swagger-ui.html](http://localhost:8084/swagger-ui.html)
- **OpenAPI Schema (JSON)**: [http://localhost:8084/v3/api-docs](http://localhost:8084/v3/api-docs)
- **Actuator Health Check**: [http://localhost:8084/actuator/health](http://localhost:8084/actuator/health)
- **Payment Hub Health Endpoint**: [http://localhost:8084/api/health](http://localhost:8084/api/health)

### Danh sách Endpoint Chính:

| Phương thức | Đường dẫn | Chức năng |
| :--- | :--- | :--- |
| `POST` | `/api/v1/payment/orders` | Tạo mới đơn thanh toán (CourseDemy, VihoTask, Billing) |
| `GET` | `/api/v1/payment/orders/{orderCode}?tenantId=...` | Chi tiết đơn hàng theo mã |
| `GET` | `/api/v1/payment/orders?tenantId=...&status=...` | Danh sách đơn hàng theo Tenant |
| `PATCH` | `/api/v1/payment/orders/{orderCode}/status` | Cập nhật trạng thái đơn |
| `POST` | `/api/v1/payment/transactions` | Khởi tạo giao dịch (hỗ trợ Idempotency) |
| `GET` | `/api/v1/payment/transactions/{code}?tenantId=...` | Chi tiết giao dịch ngân hàng/cổng |
| `PATCH` | `/api/v1/payment/transactions/{code}/status` | Cập nhật kết quả giao dịch |
| `POST` | `/api/v1/payment/configs` | Tạo/Cập nhật cấu hình cổng cho Tenant |
| `GET` | `/api/v1/payment/configs?tenantId=...` | Danh sách cấu hình cổng của Tenant |
| `POST` | `/api/v1/payment/webhooks` | Tiếp nhận IPN Webhook callback từ cổng đối tác |
| `GET` | `/api/v1/payment/webhooks?tenantId=...` | Tra cứu nhật ký webhook đối soát |

---

## 🧪 6. KIỂM THỬ NHANH BẰNG CURL

### 1. Tạo Đơn hàng Thanh toán Mới:
```bash
curl -X POST http://localhost:8084/api/v1/payment/orders \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "tenant-alpha",
    "customerId": "usr_alpha_101",
    "customerEmail": "learner@vahiztech.com",
    "customerName": "Nguyen Van A",
    "sourceService": "COURSEDEMY",
    "sourceOrderId": "CRS-2026-99",
    "amount": 299000.00,
    "currency": "VND",
    "description": "Thanh toan khoa hoc Next.js & Java Microservices"
  }'
```

### 2. Khởi tạo Giao dịch Thanh toán (Idempotent):
```bash
curl -X POST http://localhost:8084/api/v1/payment/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "<ORDER_UUID>",
    "tenantId": "tenant-alpha",
    "provider": "VIETQR",
    "paymentMethod": "QR_CODE",
    "idempotencyKey": "IDEMP-REQ-2026-001"
  }'
```

### 3. Giả lập Webhook IPN Thành công từ Cổng:
```bash
curl -X POST http://localhost:8084/api/v1/payment/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": "tenant-alpha",
    "provider": "VIETQR",
    "orderCode": "ORD-20261028-COURSEDEMY-001",
    "eventType": "PAYMENT_SUCCESS",
    "signature": "mock_signature_test",
    "rawPayload": "{\"status\":\"PAID\",\"amount\":499000}"
  }'
```
