package com.vahiztech.payment.api.controller;

import com.vahiztech.payment.api.dto.request.CreatePaymentOrderRequest;
import com.vahiztech.payment.api.dto.response.ApiResponse;
import com.vahiztech.payment.api.dto.response.PaymentOrderResponse;
import com.vahiztech.payment.application.service.PaymentOrderService;
import com.vahiztech.payment.domain.enums.PaymentStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment/orders")
@RequiredArgsConstructor
@Tag(name = "Payment Orders", description = "Quản lý Đơn hàng & Yêu cầu thanh toán")
public class PaymentOrderController {

    private final PaymentOrderService orderService;

    @PostMapping
    @Operation(summary = "Tạo mới đơn hàng thanh toán")
    public ResponseEntity<ApiResponse<PaymentOrderResponse>> createOrder(
            @Valid @RequestBody CreatePaymentOrderRequest request) {
        PaymentOrderResponse response = orderService.createOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(response));
    }

    @GetMapping("/{orderCode}")
    @Operation(summary = "Lấy chi tiết đơn hàng theo mã orderCode")
    public ResponseEntity<ApiResponse<PaymentOrderResponse>> getOrderByCode(
            @PathVariable String orderCode,
            @RequestParam String tenantId) {
        PaymentOrderResponse response = orderService.getOrderByCode(orderCode, tenantId);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping
    @Operation(summary = "Danh sách đơn hàng theo Tenant")
    public ResponseEntity<ApiResponse<Page<PaymentOrderResponse>>> listOrders(
            @RequestParam String tenantId,
            @RequestParam(required = false) PaymentStatus status,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<PaymentOrderResponse> page = orderService.listOrders(tenantId, status, pageable);
        return ResponseEntity.ok(ApiResponse.ok(page));
    }

    @PatchMapping("/{orderCode}/status")
    @Operation(summary = "Cập nhật trạng thái đơn hàng")
    public ResponseEntity<ApiResponse<PaymentOrderResponse>> updateStatus(
            @PathVariable String orderCode,
            @RequestParam String tenantId,
            @RequestParam PaymentStatus newStatus) {
        PaymentOrderResponse response = orderService.updateOrderStatus(orderCode, tenantId, newStatus);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}
