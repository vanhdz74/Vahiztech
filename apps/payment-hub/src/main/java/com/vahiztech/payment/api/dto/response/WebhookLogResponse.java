package com.vahiztech.payment.api.dto.response;

import com.vahiztech.payment.domain.entity.PaymentWebhookLogEntity;
import com.vahiztech.payment.domain.enums.PaymentProvider;
import com.vahiztech.payment.domain.enums.WebhookProcessingStatus;

import java.time.OffsetDateTime;
import java.util.UUID;

public record WebhookLogResponse(
        UUID id,
        String tenantId,
        PaymentProvider provider,
        UUID transactionId,
        String orderCode,
        String eventType,
        String processingStatus,
        String errorMessage,
        Integer retryCount,
        OffsetDateTime processedAt,
        OffsetDateTime createdAt
) {
    public static WebhookLogResponse fromEntity(PaymentWebhookLogEntity entity) {
        return new WebhookLogResponse(
                entity.getId(),
                entity.getTenantId(),
                entity.getProvider(),
                entity.getTransactionId(),
                entity.getOrderCode(),
                entity.getEventType(),
                entity.getProcessingStatus().name(),
                entity.getErrorMessage(),
                entity.getRetryCount(),
                entity.getProcessedAt(),
                entity.getCreatedAt()
        );
    }
}
