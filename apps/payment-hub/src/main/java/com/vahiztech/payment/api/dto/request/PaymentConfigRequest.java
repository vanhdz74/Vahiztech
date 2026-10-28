package com.vahiztech.payment.api.dto.request;

import com.vahiztech.payment.domain.enums.EnvironmentType;
import com.vahiztech.payment.domain.enums.PaymentProvider;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PaymentConfigRequest(
        @NotBlank(message = "tenantId không được để trống")
        String tenantId,

        @NotNull(message = "provider không được để trống")
        PaymentProvider provider,

        @NotBlank(message = "merchantId không được để trống")
        String merchantId,

        @NotBlank(message = "merchantName không được để trống")
        String merchantName,

        String apiKey,

        @NotBlank(message = "secretKey không được để trống")
        String secretKey,

        String webhookSecret,

        @NotNull(message = "environment không được để trống")
        EnvironmentType environment,

        Boolean isActive,

        Boolean isDefault,

        String configData
) {}
