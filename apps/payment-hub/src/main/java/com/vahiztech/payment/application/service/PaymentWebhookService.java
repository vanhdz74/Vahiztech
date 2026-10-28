package com.vahiztech.payment.application.service;

import com.vahiztech.payment.api.dto.request.WebhookPayloadRequest;
import com.vahiztech.payment.api.dto.response.WebhookLogResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PaymentWebhookService {
    WebhookLogResponse recordAndProcessWebhook(WebhookPayloadRequest request, String clientIp, String headers);
    Page<WebhookLogResponse> listWebhookLogs(String tenantId, Pageable pageable);
}
