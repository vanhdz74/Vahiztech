package com.vahiztech.payment.api.controller;

import com.vahiztech.payment.api.dto.request.PaymentConfigRequest;
import com.vahiztech.payment.api.dto.response.ApiResponse;
import com.vahiztech.payment.api.dto.response.PaymentConfigResponse;
import com.vahiztech.payment.application.service.PaymentConfigService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payment/configs")
@RequiredArgsConstructor
@Tag(name = "Payment Configs", description = "Quản lý Cấu hình Cổng thanh toán theo Tenant")
public class PaymentConfigController {

    private final PaymentConfigService configService;

    @PostMapping
    @Operation(summary = "Tạo mới hoặc cập nhật cấu hình cổng thanh toán cho Tenant")
    public ResponseEntity<ApiResponse<PaymentConfigResponse>> saveConfig(
            @Valid @RequestBody PaymentConfigRequest request) {
        PaymentConfigResponse response = configService.createOrUpdateConfig(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(response));
    }

    @GetMapping
    @Operation(summary = "Lấy danh sách tất cả cấu hình cổng thanh toán của Tenant")
    public ResponseEntity<ApiResponse<List<PaymentConfigResponse>>> getConfigs(
            @RequestParam String tenantId) {
        List<PaymentConfigResponse> list = configService.getConfigsByTenant(tenantId);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/default")
    @Operation(summary = "Lấy cấu hình cổng thanh toán mặc định của Tenant")
    public ResponseEntity<ApiResponse<PaymentConfigResponse>> getDefaultConfig(
            @RequestParam String tenantId) {
        PaymentConfigResponse response = configService.getDefaultConfig(tenantId);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Xóa cấu hình cổng thanh toán theo ID")
    public ResponseEntity<ApiResponse<Void>> deleteConfig(
            @PathVariable UUID id,
            @RequestParam String tenantId) {
        configService.deleteConfig(id, tenantId);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }
}
