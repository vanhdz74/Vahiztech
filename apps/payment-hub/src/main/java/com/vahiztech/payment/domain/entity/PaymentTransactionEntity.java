package com.vahiztech.payment.domain.entity;

import com.vahiztech.payment.domain.enums.PaymentMethodType;
import com.vahiztech.payment.domain.enums.PaymentProvider;
import com.vahiztech.payment.domain.enums.TransactionStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "payment_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentTransactionEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "transaction_code", length = 64, unique = true, nullable = false)
    private String transactionCode;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private PaymentOrderEntity order;

    @Column(name = "tenant_id", length = 64, nullable = false)
    private String tenantId;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", length = 32, nullable = false)
    private PaymentProvider provider;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", length = 32, nullable = false)
    private PaymentMethodType paymentMethod;

    @Column(name = "gateway_transaction_no", length = 128)
    private String gatewayTransactionNo;

    @Column(name = "amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal amount;

    @Column(name = "fee_amount", precision = 15, scale = 2)
    @Builder.Default
    private BigDecimal feeAmount = BigDecimal.ZERO;

    @Column(name = "currency", length = 3, nullable = false)
    @Builder.Default
    private String currency = "VND";

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 32, nullable = false)
    @Builder.Default
    private TransactionStatus status = TransactionStatus.INITIATED;

    @Column(name = "idempotency_key", length = 128, unique = true)
    private String idempotencyKey;

    @Column(name = "bank_code", length = 32)
    private String bankCode;

    @Column(name = "payer_account_info", length = 255)
    private String payerAccountInfo;

    @Column(name = "response_code", length = 64)
    private String responseCode;

    @Column(name = "response_message", length = 500)
    private String responseMessage;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "gateway_payload", columnDefinition = "jsonb")
    private String gatewayPayload;

    @Column(name = "paid_at")
    private OffsetDateTime paidAt;
}
