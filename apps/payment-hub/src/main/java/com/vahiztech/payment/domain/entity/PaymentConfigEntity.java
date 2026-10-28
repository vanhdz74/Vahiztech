package com.vahiztech.payment.domain.entity;

import com.vahiztech.payment.domain.enums.EnvironmentType;
import com.vahiztech.payment.domain.enums.PaymentProvider;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Table(name = "payment_configs", uniqueConstraints = {
    @UniqueConstraint(name = "uq_payment_config_tenant_provider_env", columnNames = {"tenant_id", "provider", "environment"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentConfigEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "tenant_id", length = 64, nullable = false)
    private String tenantId;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", length = 32, nullable = false)
    private PaymentProvider provider;

    @Column(name = "merchant_id", length = 128, nullable = false)
    private String merchantId;

    @Column(name = "merchant_name", length = 255, nullable = false)
    private String merchantName;

    @Column(name = "api_key", length = 255)
    private String apiKey;

    @Column(name = "secret_key", length = 512, nullable = false)
    private String secretKey;

    @Column(name = "webhook_secret", length = 255)
    private String webhookSecret;

    @Enumerated(EnumType.STRING)
    @Column(name = "environment", length = 20, nullable = false)
    private EnvironmentType environment;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @Column(name = "is_default", nullable = false)
    @Builder.Default
    private Boolean isDefault = false;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "config_data", columnDefinition = "jsonb")
    private String configData;
}
