package com.vahiztech.payment.api.controller;

import com.vahiztech.payment.api.dto.request.WebhookPayloadRequest;
import com.vahiztech.payment.api.dto.response.ApiResponse;
import com.vahiztech.payment.api.dto.response.WebhookLogResponse;
import com.vahiztech.payment.application.service.PaymentWebhookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment/webhooks")
@RequiredArgsConstructor
@Tag(name = "Payment Webhooks", description = "Xử lý IPN & Webhook từ các Cổng thanh toán")
public class PaymentWebhookController {

    private final PaymentWebhookService webhookService;

    @PostMapping
    @Operation(summary = "Tiếp nhận webhook callback từ Cổng thanh toán (VietQR, VNPay, MoMo, Stripe)")
    public ResponseEntity<ApiResponse<WebhookLogResponse>> receiveWebhook(
            @Valid @RequestBody WebhookPayloadRequest request,
            HttpServletRequest servletRequest) {
        String clientIp = servletRequest.getRemoteAddr();
        String userAgent = servletRequest.getHeader("User-Agent");
        String headersJson = "{\"User-Agent\": \"" + (userAgent != null ? userAgent : "") + "\"}";

        WebhookLogResponse response = webhookService.recordAndProcessWebhook(request, clientIp, headersJson);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping
    @Operation(summary = "Xem lịch sử nhật ký webhook/IPN theo Tenant")
    public ResponseEntity<ApiResponse<Page<WebhookLogResponse>>> listWebhookLogs(
            @RequestParam String tenantId,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<WebhookLogResponse> page = webhookService.listWebhookLogs(tenantId, pageable);
        return ResponseEntity.ok(ApiResponse.ok(page));
    }
}
