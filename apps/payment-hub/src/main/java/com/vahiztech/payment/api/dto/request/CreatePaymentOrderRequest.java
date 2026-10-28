package com.vahiztech.payment.api.dto.request;

import com.vahiztech.payment.domain.enums.SourceService;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreatePaymentOrderRequest(
        @NotBlank(message = "tenant_id không được để trống")
        String tenantId,

        @NotBlank(message = "customer_id không được để trống")
        String customerId,

        @NotBlank(message = "customer_email không được để trống")
        @Email(message = "customer_email không hợp lệ")
        String customerEmail,

        String customerName,

        @NotNull(message = "source_service không được để trống")
        SourceService sourceService,

        String sourceOrderId,

        @NotNull(message = "amount không được để trống")
        @DecimalMin(value = "1000.00", message = "Số tiền thanh toán tối thiểu là 1,000 VND")
        BigDecimal amount,

        String currency,

        String description,

        String returnUrl,

        String cancelUrl,

        String metadata
) {}
