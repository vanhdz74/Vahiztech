package com.vahiztech.payment.api.dto.request;

import com.vahiztech.payment.domain.enums.PaymentMethodType;
import com.vahiztech.payment.domain.enums.PaymentProvider;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ProcessTransactionRequest(
        @NotNull(message = "orderId không được để trống")
        UUID orderId,

        @NotBlank(message = "tenantId không được để trống")
        String tenantId,

        @NotNull(message = "provider không được để trống")
        PaymentProvider provider,

        @NotNull(message = "paymentMethod không được để trống")
        PaymentMethodType paymentMethod,

        @NotBlank(message = "idempotencyKey không được để trống")
        String idempotencyKey,

        String bankCode,

        String payerAccountInfo
) {}
