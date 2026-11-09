package com.vahiztech.payment.infrastructure.kafka.event;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * Cấu trúc vỏ bọc sự kiện chuẩn hóa truyền qua Apache Kafka trong hệ sinh thái Vahiztech.
 * Tuân thủ docs/events/event-envelope-schemas.json.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VahiztechKafkaEventEnvelope<T> {

    @Builder.Default
    @JsonProperty("eventId")
    private String eventId = UUID.randomUUID().toString();

    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("eventType")
    private String eventType;

    @Builder.Default
    @JsonProperty("producer")
    private String producer = "payment-hub";

    @Builder.Default
    @JsonProperty("version")
    private String version = "1.0";

    @Builder.Default
    @JsonProperty("timestamp")
    private Long timestamp = System.currentTimeMillis();

    @JsonProperty("traceId")
    private String traceId;

    @JsonProperty("payload")
    private T payload;

    public static <T> VahiztechKafkaEventEnvelope<T> of(String tenantId, String eventType, String traceId, T payload) {
        return VahiztechKafkaEventEnvelope.<T>builder()
                .eventId(UUID.randomUUID().toString())
                .tenantId(tenantId)
                .eventType(eventType)
                .producer("payment-hub")
                .version("1.0")
                .timestamp(System.currentTimeMillis())
                .traceId(traceId != null && !traceId.isBlank() ? traceId : UUID.randomUUID().toString().replace("-", ""))
                .payload(payload)
                .build();
    }
}
