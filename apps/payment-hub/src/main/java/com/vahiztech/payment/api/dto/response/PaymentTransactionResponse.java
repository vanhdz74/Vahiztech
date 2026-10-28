package com.vahiztech.payment.api.dto.response;

import com.vahiztech.payment.domain.entity.PaymentTransactionEntity;
import com.vahiztech.payment.domain.enums.PaymentMethodType;
import com.vahiztech.payment.domain.enums.PaymentProvider;
import com.vahiztech.payment.domain.enums.TransactionStatus;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record PaymentTransactionResponse(
        UUID id,
        String transactionCode,
        UUID orderId,
        String orderCode,
        String tenantId,
        PaymentProvider provider,
        PaymentMethodType paymentMethod,
        String gatewayTransactionNo,
        BigDecimal amount,
        BigDecimal feeAmount,
        String currency,
        TransactionStatus status,
        String idempotencyKey,
        String bankCode,
        String payerAccountInfo,
        String responseCode,
        String responseMessage,
        OffsetDateTime paidAt,
        OffsetDateTime createdAt
) {
    public static PaymentTransactionResponse fromEntity(PaymentTransactionEntity entity) {
        return new PaymentTransactionResponse(
                entity.getId(),
                entity.getTransactionCode(),
                entity.getOrder() != null ? entity.getOrder().getId() : null,
                entity.getOrder() != null ? entity.getOrder().getOrderCode() : null,
                entity.getTenantId(),
                entity.getProvider(),
                entity.getPaymentMethod(),
                entity.getGatewayTransactionNo(),
                entity.getAmount(),
                entity.getFeeAmount(),
                entity.getCurrency(),
                entity.getStatus(),
                entity.getIdempotencyKey(),
                entity.getBankCode(),
                entity.getPayerAccountInfo(),
                entity.getResponseCode(),
                entity.getResponseMessage(),
                entity.getPaidAt(),
                entity.getCreatedAt()
        );
    }
}
