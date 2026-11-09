package com.vahiztech.payment.infrastructure.kafka.event;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

/**
 * Payload sự kiện thanh toán thành công (PaymentCompleted).
 * Consumer (CourseDemy, VihoTask, Portal) lắng nghe payload này để kích hoạt dịch vụ/bản quyền.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCompletedPayload {

    @JsonProperty("orderCode")
    private String orderCode;

    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("sourceService")
    private String sourceService;

    @JsonProperty("sourceOrderId")
    private String sourceOrderId;

    @JsonProperty("customerId")
    private String customerId;

    @JsonProperty("customerEmail")
    private String customerEmail;

    @JsonProperty("amount")
    private BigDecimal amount;

    @JsonProperty("currency")
    private String currency;

    @JsonProperty("provider")
    private String provider;

    @JsonProperty("paymentMethod")
    private String paymentMethod;

    @JsonProperty("transactionCode")
    private String transactionCode;

    @JsonProperty("paidAt")
    private OffsetDateTime paidAt;
}
