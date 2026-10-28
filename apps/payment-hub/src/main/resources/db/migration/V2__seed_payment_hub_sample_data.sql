-- =============================================================================
-- VAHIZTECH SAAS MULTI-TENANT PAYMENT HUB - FLYWAY MIGRATION V2
-- Description: Dữ liệu mẫu (Seed Data) cho môi trường Development & Testing
-- =============================================================================

-- 1. Seed Payment Configs cho tenant-alpha & tenant-beta
INSERT INTO payment_configs (
    id, tenant_id, provider, merchant_id, merchant_name, api_key, secret_key, webhook_secret, environment, is_active, is_default, config_data
) VALUES 
(
    '11111111-1111-1111-1111-111111111111',
    'tenant-alpha',
    'VIETQR',
    '970422', -- MBBank BIN code
    'VAHIZTECH VIETQR HUB',
    'vietqr_dev_api_key_2026',
    'vietqr_dev_checksum_key_2026',
    'vietqr_webhook_secret_2026',
    'SANDBOX',
    true,
    true,
    '{"bank_account": "0987654321", "account_holder": "CONG TY TNHH VAHIZTECH", "template": "compact2"}'::jsonb
),
(
    '22222222-2222-2222-2222-222222222222',
    'tenant-alpha',
    'VNPAY',
    'G48FJS7F',
    'VAHIZTECH VNPAY GATEWAY',
    'vnpay_dev_client_id_2026',
    'HRP8RDXFI56LY186JHOHM42172PN61WP',
    'vnpay_ipn_secret_2026',
    'SANDBOX',
    true,
    false,
    '{"pay_url": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html", "return_url": "http://localhost:3000/billing/vnpay/callback"}'::jsonb
),
(
    '33333333-3333-3333-3333-333333333333',
    'tenant-beta',
    'MOMO',
    'MOMO_TEST_MERCHANT_01',
    'VAHIZTECH MOMO MERCHANT',
    'momo_dev_access_key_2026',
    'momo_dev_secret_key_2026',
    'momo_webhook_secret_2026',
    'SANDBOX',
    true,
    true,
    '{"endpoint": "https://test-payment.momo.vn/v2/gateway/api/create"}'::jsonb
)
ON CONFLICT (tenant_id, provider, environment) DO NOTHING;

-- 2. Seed Payment Orders mẫu
INSERT INTO payment_orders (
    id, order_code, tenant_id, customer_id, customer_email, customer_name,
    source_service, source_order_id, amount, currency, status,
    description, return_url, cancel_url, metadata, expires_at
) VALUES
(
    '44444444-4444-4444-4444-444444444444',
    'ORD-20261028-COURSEDEMY-001',
    'tenant-alpha',
    'usr_alpha_student_01',
    'student@vahiztech.com',
    'Nguyen Van Hoc',
    'COURSEDEMY',
    'CRS-ORD-8821',
    499000.00,
    'VND',
    'COMPLETED',
    'Thanh toan khoa hoc: Spring Boot 3 & Microservices Architecture',
    'http://localhost:3001/checkout/success',
    'http://localhost:3001/checkout/cancel',
    '{"course_id": "crs_spring_boot_3", "discount_code": "WELCOME2026"}'::jsonb,
    CURRENT_TIMESTAMP + INTERVAL '1 day'
),
(
    '55555555-5555-5555-5555-555555555555',
    'ORD-20261028-VIHOTASK-002',
    'tenant-alpha',
    'usr_alpha_admin_01',
    'tenant_admin@vahiztech.com',
    'Tran Quang Admin',
    'VIHOTASK',
    'TASK-LIC-9932',
    1500000.00,
    'VND',
    'PROCESSING',
    'Nang cap ban quyen VihoTask Pro - 10 Seats / 1 Nam',
    'http://localhost:3002/settings/billing/success',
    'http://localhost:3002/settings/billing/cancel',
    '{"plan": "ENTERPRISE", "seats": 10, "billing_cycle": "ANNUAL"}'::jsonb,
    CURRENT_TIMESTAMP + INTERVAL '2 hours'
)
ON CONFLICT (order_code) DO NOTHING;

-- 3. Seed Payment Transactions mẫu
INSERT INTO payment_transactions (
    id, transaction_code, order_id, tenant_id, provider, payment_method,
    gateway_transaction_no, amount, fee_amount, currency, status,
    idempotency_key, bank_code, payer_account_info, response_code, response_message,
    gateway_payload, paid_at
) VALUES
(
    '66666666-6666-6666-6666-666666666666',
    'TXN-20261028-VIETQR-001',
    '44444444-4444-4444-4444-444444444444',
    'tenant-alpha',
    'VIETQR',
    'QR_CODE',
    'VQR_MB_20261028_99812',
    499000.00,
    0.00,
    'VND',
    'SUCCESS',
    'IDEMP-20261028-ALPHA-001',
    'MB',
    '0987***321 / NGUYEN VAN HOC',
    '00',
    'Giao dich thanh cong qua VietQR',
    '{"transfer_content": "ORD 20261028 COURSEDEMY 001", "bank_ref": "FT26102800192"}'::jsonb,
    CURRENT_TIMESTAMP - INTERVAL '10 minutes'
),
(
    '77777777-7777-7777-7777-777777777777',
    'TXN-20261028-VNPAY-002',
    '55555555-5555-5555-5555-555555555555',
    'tenant-alpha',
    'VNPAY',
    'ATM_CARD',
    'VNPAY_TXN_20261028_44102',
    1500000.00,
    1500.00,
    'VND',
    'PENDING',
    'IDEMP-20261028-ALPHA-002',
    'NCB',
    '9704198526171405991',
    '01',
    'Giao dich dang cho khach hang xac thuc OTP',
    '{"vnp_CardType": "ATM", "vnp_BankCode": "NCB"}'::jsonb,
    NULL
)
ON CONFLICT (transaction_code) DO NOTHING;

-- 4. Seed Payment Webhook Log mẫu
INSERT INTO payment_webhook_logs (
    id, tenant_id, provider, transaction_id, order_code, event_type,
    signature, ip_address, headers, raw_payload, processing_status,
    retry_count, processed_at
) VALUES
(
    '88888888-8888-8888-8888-888888888888',
    'tenant-alpha',
    'VIETQR',
    '66666666-6666-6666-6666-666666666666',
    'ORD-20261028-COURSEDEMY-001',
    'PAYMENT_SUCCESS',
    'sha256_mock_signature_vietqr_2026_valid',
    '118.69.182.50',
    '{"user-agent": "VietQR-Webhook-Agent/1.0", "content-type": "application/json"}'::jsonb,
    '{"order_code": "ORD-20261028-COURSEDEMY-001", "amount": 499000, "status": "PAID", "transaction_ref": "FT26102800192"}'::jsonb,
    'PROCESSED',
    0,
    CURRENT_TIMESTAMP - INTERVAL '10 minutes'
)
ON CONFLICT DO NOTHING;
