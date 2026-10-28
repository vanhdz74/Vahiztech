package com.vahiztech.payment.api.controller;

import com.vahiztech.payment.api.dto.request.ProcessTransactionRequest;
import com.vahiztech.payment.api.dto.response.ApiResponse;
import com.vahiztech.payment.api.dto.response.PaymentTransactionResponse;
import com.vahiztech.payment.application.service.PaymentTransactionService;
import com.vahiztech.payment.domain.enums.TransactionStatus;
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
@RequestMapping("/api/v1/payment/transactions")
@RequiredArgsConstructor
@Tag(name = "Payment Transactions", description = "Quản lý Giao dịch & Cổng thanh toán")
public class PaymentTransactionController {

    private final PaymentTransactionService transactionService;

    @PostMapping
    @Operation(summary = "Khởi tạo giao dịch thanh toán cho đơn hàng")
    public ResponseEntity<ApiResponse<PaymentTransactionResponse>> createTransaction(
            @Valid @RequestBody ProcessTransactionRequest request) {
        PaymentTransactionResponse response = transactionService.createTransaction(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(response));
    }

    @GetMapping("/{transactionCode}")
    @Operation(summary = "Lấy chi tiết giao dịch theo mã transactionCode")
    public ResponseEntity<ApiResponse<PaymentTransactionResponse>> getTransactionByCode(
            @PathVariable String transactionCode,
            @RequestParam String tenantId) {
        PaymentTransactionResponse response = transactionService.getTransactionByCode(transactionCode, tenantId);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping
    @Operation(summary = "Danh sách giao dịch theo Tenant")
    public ResponseEntity<ApiResponse<Page<PaymentTransactionResponse>>> listTransactions(
            @RequestParam String tenantId,
            @RequestParam(required = false) TransactionStatus status,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<PaymentTransactionResponse> page = transactionService.listTransactions(tenantId, status, pageable);
        return ResponseEntity.ok(ApiResponse.ok(page));
    }

    @PatchMapping("/{transactionCode}/status")
    @Operation(summary = "Cập nhật trạng thái giao dịch (thành công/thất bại)")
    public ResponseEntity<ApiResponse<PaymentTransactionResponse>> updateStatus(
            @PathVariable String transactionCode,
            @RequestParam String tenantId,
            @RequestParam TransactionStatus status,
            @RequestParam(required = false) String gatewayTxnNo,
            @RequestParam(required = false) String responseCode,
            @RequestParam(required = false) String message) {
        PaymentTransactionResponse response = transactionService.updateTransactionStatus(
                transactionCode, tenantId, status, gatewayTxnNo, responseCode, message);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}
