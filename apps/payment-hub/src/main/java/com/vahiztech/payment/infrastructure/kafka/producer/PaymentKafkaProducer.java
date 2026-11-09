package com.vahiztech.payment.infrastructure.kafka.producer;

import com.vahiztech.payment.infrastructure.kafka.event.PaymentCompletedPayload;
import com.vahiztech.payment.infrastructure.kafka.event.PaymentFailedPayload;
import com.vahiztech.payment.infrastructure.kafka.event.VahiztechKafkaEventEnvelope;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

/**
 * Service đảm nhiệm việc phát tán (Publish) các sự kiện thanh toán lên Apache Kafka.
 * Tuân thủ quy tắc Event Envelope và Partitioning Key của hệ sinh thái Vahiztech.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class PaymentKafkaProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${ecosystem.kafka.topics.payment-events:ecosystem.payment.events}")
    private String paymentEventsTopic;

    /**
     * Bắn sự kiện thanh toán thành công (PaymentCompleted) lên Kafka.
     * Record Key = "tenantId:orderCode" để đảm bảo toàn bộ sự kiện của một đơn hàng
     * luôn vào đúng cùng 1 Partition, duy trì thứ tự xử lý tuyệt đối (In-order processing).
     */
    public CompletableFuture<SendResult<String, Object>> publishPaymentCompleted(
            String tenantId,
            String traceId,
            PaymentCompletedPayload payload) {

        VahiztechKafkaEventEnvelope<PaymentCompletedPayload> envelope =
                VahiztechKafkaEventEnvelope.of(tenantId, "PaymentCompleted", traceId, payload);

        String messageKey = tenantId + ":" + payload.getOrderCode();
        return sendEvent(paymentEventsTopic, messageKey, envelope);
    }

    /**
     * Bắn sự kiện thanh toán thất bại (PaymentFailed).
     */
    public CompletableFuture<SendResult<String, Object>> publishPaymentFailed(
            String tenantId,
            String traceId,
            PaymentFailedPayload payload) {

        VahiztechKafkaEventEnvelope<PaymentFailedPayload> envelope =
                VahiztechKafkaEventEnvelope.of(tenantId, "PaymentFailed", traceId, payload);

        String messageKey = tenantId + ":" + payload.getOrderCode();
        return sendEvent(paymentEventsTopic, messageKey, envelope);
    }

    /**
     * Gửi event generic kèm logging và callback xử lý kết quả.
     */
    public <T> CompletableFuture<SendResult<String, Object>> sendEvent(
            String topic,
            String messageKey,
            VahiztechKafkaEventEnvelope<T> envelope) {

        log.info("Publishing Kafka event: topic={}, eventType={}, eventId={}, key={}, tenantId={}",
                topic, envelope.getEventType(), envelope.getEventId(), messageKey, envelope.getTenantId());

        CompletableFuture<SendResult<String, Object>> future = kafkaTemplate.send(topic, messageKey, envelope);

        future.whenComplete((result, ex) -> {
            if (ex != null) {
                log.error("Failed to publish Kafka event [eventId={}]: error={}", envelope.getEventId(), ex.getMessage(), ex);
            } else {
                log.info("Successfully published Kafka event [eventId={}] to topic={} partition={} offset={}",
                        envelope.getEventId(),
                        result.getRecordMetadata().topic(),
                        result.getRecordMetadata().partition(),
                        result.getRecordMetadata().offset());
            }
        });

        return future;
    }
}
