package com.vahiztech.payment.api.dto.response;

import com.vahiztech.payment.domain.entity.PaymentConfigEntity;
import com.vahiztech.payment.domain.enums.EnvironmentType;
import com.vahiztech.payment.domain.enums.PaymentProvider;

import java.time.OffsetDateTime;
import java.util.UUID;

public record PaymentConfigResponse(
        UUID id,
        String tenantId,
        PaymentProvider provider,
        String merchantId,
        String merchantName,
        EnvironmentType environment,
        Boolean isActive,
        Boolean isDefault,
        String configData,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt
) {
    public static PaymentConfigResponse fromEntity(PaymentConfigEntity entity) {
        return new PaymentConfigResponse(
                entity.getId(),
                entity.getTenantId(),
                entity.getProvider(),
                entity.getMerchantId(),
                entity.getMerchantName(),
                entity.getEnvironment(),
                entity.getIsActive(),
                entity.getIsDefault(),
                entity.getConfigData(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
