package com.vahiztech.payment.api.dto.response;

import com.vahiztech.payment.domain.entity.PaymentOrderEntity;
import com.vahiztech.payment.domain.enums.PaymentStatus;
import com.vahiztech.payment.domain.enums.SourceService;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

public record PaymentOrderResponse(
        UUID id,
        String orderCode,
        String tenantId,
        String customerId,
        String customerEmail,
        String customerName,
        SourceService sourceService,
        String sourceOrderId,
        BigDecimal amount,
        String currency,
        PaymentStatus status,
        String description,
        String returnUrl,
        String cancelUrl,
        String metadata,
        OffsetDateTime expiresAt,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
    public static PaymentOrderResponse fromEntity(PaymentOrderEntity entity) {
        return new PaymentOrderResponse(
                entity.getId(),
                entity.getOrderCode(),
                entity.getTenantId(),
                entity.getCustomerId(),
                entity.getCustomerEmail(),
                entity.getCustomerName(),
                entity.getSourceService(),
                entity.getSourceOrderId(),
                entity.getAmount(),
                entity.getCurrency(),
                entity.getStatus(),
                entity.getDescription(),
                entity.getReturnUrl(),
                entity.getCancelUrl(),
                entity.getMetadata(),
                entity.getExpiresAt(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
