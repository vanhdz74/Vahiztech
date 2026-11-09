package com.vahiztech.payment.infrastructure.kafka.event;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

/**
 * Payload sự kiện thanh toán thất bại (PaymentFailed).
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentFailedPayload {

    @JsonProperty("orderCode")
    private String orderCode;

    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("sourceService")
    private String sourceService;

    @JsonProperty("sourceOrderId")
    private String sourceOrderId;

    @JsonProperty("reason")
    private String reason;

    @JsonProperty("failedAt")
    private OffsetDateTime failedAt;
}
