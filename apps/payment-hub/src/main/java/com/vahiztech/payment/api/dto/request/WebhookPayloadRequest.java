package com.vahiztech.payment.api.dto.request;

import com.vahiztech.payment.domain.enums.PaymentProvider;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record WebhookPayloadRequest(
        @NotBlank(message = "tenantId không được để trống")
        String tenantId,

        @NotNull(message = "provider không được để trống")
        PaymentProvider provider,

        String orderCode,

        @NotBlank(message = "eventType không được để trống")
        String eventType,

        String signature,

        @NotBlank(message = "rawPayload không được để trống")
        String rawPayload
) {}
