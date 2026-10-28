package com.vahiztech.payment.domain.entity;

import com.vahiztech.payment.domain.enums.PaymentStatus;
import com.vahiztech.payment.domain.enums.SourceService;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "payment_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentOrderEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "order_code", length = 64, unique = true, nullable = false)
    private String orderCode;

    @Column(name = "tenant_id", length = 64, nullable = false)
    private String tenantId;

    @Column(name = "customer_id", length = 64, nullable = false)
    private String customerId;

    @Column(name = "customer_email", length = 255, nullable = false)
    private String customerEmail;

    @Column(name = "customer_name", length = 255)
    private String customerName;

    @Enumerated(EnumType.STRING)
    @Column(name = "source_service", length = 32, nullable = false)
    private SourceService sourceService;

    @Column(name = "source_order_id", length = 64)
    private String sourceOrderId;

    @Column(name = "amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal amount;

    @Column(name = "currency", length = 3, nullable = false)
    @Builder.Default
    private String currency = "VND";

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 32, nullable = false)
    @Builder.Default
    private PaymentStatus status = PaymentStatus.PENDING;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "return_url", length = 500)
    private String returnUrl;

    @Column(name = "cancel_url", length = 500)
    private String cancelUrl;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "metadata", columnDefinition = "jsonb")
    private String metadata;

    @Column(name = "expires_at", nullable = false)
    private OffsetDateTime expiresAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<PaymentTransactionEntity> transactions = new ArrayList<>();
}
