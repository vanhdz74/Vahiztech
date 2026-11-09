package com.vahiztech.payment.application.service.impl;

import com.vahiztech.payment.api.dto.request.WebhookPayloadRequest;
import com.vahiztech.payment.api.dto.response.WebhookLogResponse;
import com.vahiztech.payment.application.service.PaymentWebhookService;
import com.vahiztech.payment.domain.entity.PaymentOrderEntity;
import com.vahiztech.payment.domain.entity.PaymentWebhookLogEntity;
import com.vahiztech.payment.domain.enums.PaymentStatus;
import com.vahiztech.payment.domain.enums.WebhookProcessingStatus;
import com.vahiztech.payment.infrastructure.kafka.event.PaymentCompletedPayload;
import com.vahiztech.payment.infrastructure.kafka.event.PaymentFailedPayload;
import com.vahiztech.payment.infrastructure.kafka.producer.PaymentKafkaProducer;
import com.vahiztech.payment.infrastructure.repository.PaymentOrderRepository;
import com.vahiztech.payment.infrastructure.repository.PaymentWebhookLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentWebhookServiceImpl implements PaymentWebhookService {

    private final PaymentWebhookLogRepository webhookLogRepository;
    private final PaymentOrderRepository orderRepository;
    private final PaymentKafkaProducer kafkaProducer;

    @Override
    @Transactional
    public WebhookLogResponse recordAndProcessWebhook(WebhookPayloadRequest request, String clientIp, String headers) {
        PaymentWebhookLogEntity logEntity = PaymentWebhookLogEntity.builder()
                .tenantId(request.tenantId())
                .provider(request.provider())
                .orderCode(request.orderCode())
                .eventType(request.eventType())
                .signature(request.signature())
                .ipAddress(clientIp)
                .headers(headers)
                .rawPayload(request.rawPayload())
                .processingStatus(WebhookProcessingStatus.RECEIVED)
                .build();

        PaymentWebhookLogEntity saved = webhookLogRepository.save(logEntity);
        log.info("Webhook received from provider {}: orderCode={}, event={}",
                request.provider(), request.orderCode(), request.eventType());

        // Xử lý sự kiện nếu có orderCode
        if (request.orderCode() != null && !request.orderCode().isBlank()) {
            orderRepository.findByOrderCodeAndTenantId(request.orderCode(), request.tenantId()).ifPresent(order -> {
                if ("PAYMENT_SUCCESS".equalsIgnoreCase(request.eventType())) {
                    order.setStatus(PaymentStatus.COMPLETED);
                    orderRepository.save(order);
                    log.info("Updated order {} status to COMPLETED via Webhook", order.getOrderCode());

                    // Bắn sự kiện PaymentCompleted lên Apache Kafka
                    PaymentCompletedPayload completedPayload = PaymentCompletedPayload.builder()
                            .orderCode(order.getOrderCode())
                            .tenantId(order.getTenantId())
                            .sourceService(order.getSourceService() != null ? order.getSourceService().name() : null)
                            .sourceOrderId(order.getSourceOrderId())
                            .customerId(order.getCustomerId())
                            .customerEmail(order.getCustomerEmail())
                            .amount(order.getAmount())
                            .currency(order.getCurrency())
                            .provider(request.provider() != null ? request.provider().name() : null)
                            .paidAt(OffsetDateTime.now(ZoneOffset.UTC))
                            .build();

                    kafkaProducer.publishPaymentCompleted(order.getTenantId(), null, completedPayload);

                } else if ("PAYMENT_FAILED".equalsIgnoreCase(request.eventType())) {
                    order.setStatus(PaymentStatus.FAILED);
                    orderRepository.save(order);

                    // Bắn sự kiện PaymentFailed lên Apache Kafka
                    PaymentFailedPayload failedPayload = PaymentFailedPayload.builder()
                            .orderCode(order.getOrderCode())
                            .tenantId(order.getTenantId())
                            .sourceService(order.getSourceService() != null ? order.getSourceService().name() : null)
                            .sourceOrderId(order.getSourceOrderId())
                            .reason("Payment failed callback received from provider " + request.provider())
                            .failedAt(OffsetDateTime.now(ZoneOffset.UTC))
                            .build();

                    kafkaProducer.publishPaymentFailed(order.getTenantId(), null, failedPayload);
                }
            });
            saved.setProcessingStatus(WebhookProcessingStatus.PROCESSED);
            saved.setProcessedAt(OffsetDateTime.now(ZoneOffset.UTC));
            saved = webhookLogRepository.save(saved);
        }

        return WebhookLogResponse.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<WebhookLogResponse> listWebhookLogs(String tenantId, Pageable pageable) {
        return webhookLogRepository.findAllByTenantId(tenantId, pageable)
                .map(WebhookLogResponse::fromEntity);
    }
}
