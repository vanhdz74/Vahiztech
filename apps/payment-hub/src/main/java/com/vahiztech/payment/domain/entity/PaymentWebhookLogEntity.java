package com.vahiztech.payment.domain.entity;

import com.vahiztech.payment.domain.enums.PaymentProvider;
import com.vahiztech.payment.domain.enums.WebhookProcessingStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Entity
@Table(name = "payment_webhook_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentWebhookLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "tenant_id", length = 64, nullable = false)
    private String tenantId;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", length = 32, nullable = false)
    private PaymentProvider provider;

    @Column(name = "transaction_id")
    private UUID transactionId;

    @Column(name = "order_code", length = 64)
    private String orderCode;

    @Column(name = "event_type", length = 64, nullable = false)
    private String eventType;

    @Column(name = "signature", length = 512)
    private String signature;

    @Column(name = "ip_address", length = 64)
    private String ipAddress;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "headers", columnDefinition = "jsonb")
    private String headers;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "raw_payload", columnDefinition = "jsonb", nullable = false)
    private String rawPayload;

    @Enumerated(EnumType.STRING)
    @Column(name = "processing_status", length = 32, nullable = false)
    @Builder.Default
    private WebhookProcessingStatus processingStatus = WebhookProcessingStatus.RECEIVED;

    @Column(name = "error_message", columnDefinition = "text")
    private String errorMessage;

    @Column(name = "retry_count", nullable = false)
    @Builder.Default
    private Integer retryCount = 0;

    @Column(name = "processed_at")
    private OffsetDateTime processedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = OffsetDateTime.now(ZoneOffset.UTC);
        }
    }
}
