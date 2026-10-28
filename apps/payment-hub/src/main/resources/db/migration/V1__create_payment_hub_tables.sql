-- =============================================================================
-- VAHIZTECH SAAS MULTI-TENANT PAYMENT HUB - FLYWAY MIGRATION V1
-- Description: Tạo 4 bảng chính quản lý Cấu hình, Đơn hàng, Giao dịch & Webhooks
-- =============================================================================

-- 1. Bật Extensions cần thiết
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Hàm tự động cập nhật updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =============================================================================
-- BẢNG 1: PAYMENT_CONFIGS (Cấu hình Cổng Thanh toán theo Tenant)
-- Lưu trữ cấu hình merchant (VietQR, VNPay, MoMo, ZaloPay, Stripe) cho từng Tenant
-- =============================================================================
CREATE TABLE IF NOT EXISTS payment_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL,
    provider VARCHAR(32) NOT NULL CHECK (provider IN ('VIETQR', 'VNPAY', 'MOMO', 'ZALOPAY', 'STRIPE')),
    merchant_id VARCHAR(128) NOT NULL,
    merchant_name VARCHAR(255) NOT NULL,
    api_key VARCHAR(255),
    secret_key VARCHAR(512) NOT NULL,
    webhook_secret VARCHAR(255),
    environment VARCHAR(20) NOT NULL DEFAULT 'SANDBOX' CHECK (environment IN ('SANDBOX', 'PRODUCTION')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_default BOOLEAN NOT NULL DEFAULT false,
    config_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_payment_config_tenant_provider_env UNIQUE (tenant_id, provider, environment)
);

CREATE INDEX IF NOT EXISTS idx_payment_configs_tenant_provider ON payment_configs(tenant_id, provider);
CREATE INDEX IF NOT EXISTS idx_payment_configs_active ON payment_configs(tenant_id, is_active);

CREATE TRIGGER trg_payment_configs_updated_at
    BEFORE UPDATE ON payment_configs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- BẢNG 2: PAYMENT_ORDERS (Đơn hàng / Yêu cầu Thanh toán Đa dịch vụ)
-- Tiếp nhận yêu cầu thanh toán từ CourseDemy, VihoTask, Portal Billing
-- =============================================================================
CREATE TABLE IF NOT EXISTS payment_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_code VARCHAR(64) UNIQUE NOT NULL,
    tenant_id VARCHAR(64) NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255),
    source_service VARCHAR(32) NOT NULL CHECK (source_service IN ('COURSEDEMY', 'VIHOTASK', 'PORTAL_BILLING', 'OTHER')),
    source_order_id VARCHAR(64),
    amount NUMERIC(15, 2) NOT NULL CHECK (amount >= 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'VND',
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'EXPIRED', 'REFUNDED')),
    description VARCHAR(500),
    return_url VARCHAR(500),
    cancel_url VARCHAR(500),
    metadata JSONB DEFAULT '{}'::jsonb,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payment_orders_tenant_status ON payment_orders(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_payment_orders_code ON payment_orders(order_code);
CREATE INDEX IF NOT EXISTS idx_payment_orders_customer ON payment_orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_source ON payment_orders(source_service, source_order_id);

CREATE TRIGGER trg_payment_orders_updated_at
    BEFORE UPDATE ON payment_orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- BẢNG 3: PAYMENT_TRANSACTIONS (Giao dịch Thanh toán Chi tiết)
-- Nhật ký từng lượt thanh toán thực tế, hỗ trợ Idempotency Key & đối soát ngân hàng
-- =============================================================================
CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_code VARCHAR(64) UNIQUE NOT NULL,
    order_id UUID NOT NULL REFERENCES payment_orders(id) ON DELETE RESTRICT,
    tenant_id VARCHAR(64) NOT NULL,
    provider VARCHAR(32) NOT NULL CHECK (provider IN ('VIETQR', 'VNPAY', 'MOMO', 'ZALOPAY', 'STRIPE')),
    payment_method VARCHAR(32) NOT NULL CHECK (payment_method IN ('QR_CODE', 'ATM_CARD', 'CREDIT_CARD', 'E_WALLET', 'BANK_TRANSFER')),
    gateway_transaction_no VARCHAR(128),
    amount NUMERIC(15, 2) NOT NULL CHECK (amount >= 0),
    fee_amount NUMERIC(15, 2) DEFAULT 0.00,
    currency VARCHAR(3) NOT NULL DEFAULT 'VND',
    status VARCHAR(32) NOT NULL DEFAULT 'INITIATED' CHECK (status IN ('INITIATED', 'PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'EXPIRED')),
    idempotency_key VARCHAR(128) UNIQUE,
    bank_code VARCHAR(32),
    payer_account_info VARCHAR(255),
    response_code VARCHAR(64),
    response_message VARCHAR(500),
    gateway_payload JSONB DEFAULT '{}'::jsonb,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payment_txns_order_id ON payment_transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_txns_tenant_status ON payment_transactions(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_payment_txns_gateway_no ON payment_transactions(gateway_transaction_no);
CREATE INDEX IF NOT EXISTS idx_payment_txns_idempotency ON payment_transactions(idempotency_key);

CREATE TRIGGER trg_payment_transactions_updated_at
    BEFORE UPDATE ON payment_transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- BẢNG 4: PAYMENT_WEBHOOK_LOGS (Nhật ký Webhook & IPN Đối soát Giao dịch)
-- Lưu vết phản hồi từ cổng thanh toán, đảm bảo tính Idempotency và an toàn tài chính
-- =============================================================================
CREATE TABLE IF NOT EXISTS payment_webhook_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL,
    provider VARCHAR(32) NOT NULL CHECK (provider IN ('VIETQR', 'VNPAY', 'MOMO', 'ZALOPAY', 'STRIPE')),
    transaction_id UUID REFERENCES payment_transactions(id) ON DELETE SET NULL,
    order_code VARCHAR(64),
    event_type VARCHAR(64) NOT NULL,
    signature VARCHAR(512),
    ip_address VARCHAR(64),
    headers JSONB DEFAULT '{}'::jsonb,
    raw_payload JSONB NOT NULL,
    processing_status VARCHAR(32) NOT NULL DEFAULT 'RECEIVED' CHECK (processing_status IN ('RECEIVED', 'PROCESSED', 'FAILED', 'IGNORED', 'DUPLICATE')),
    error_message TEXT,
    retry_count INT NOT NULL DEFAULT 0,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_webhook_logs_tenant_provider ON payment_webhook_logs(tenant_id, provider);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_order_code ON payment_webhook_logs(order_code);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_status ON payment_webhook_logs(processing_status);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_created_at ON payment_webhook_logs(created_at);
