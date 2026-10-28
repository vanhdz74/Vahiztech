package com.vahiztech.payment.application.service;

import com.vahiztech.payment.api.dto.request.ProcessTransactionRequest;
import com.vahiztech.payment.api.dto.response.PaymentTransactionResponse;
import com.vahiztech.payment.domain.enums.TransactionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface PaymentTransactionService {
    PaymentTransactionResponse createTransaction(ProcessTransactionRequest request);
    PaymentTransactionResponse getTransactionByCode(String transactionCode, String tenantId);
    PaymentTransactionResponse getTransactionById(UUID id, String tenantId);
    Page<PaymentTransactionResponse> listTransactions(String tenantId, TransactionStatus status, Pageable pageable);
    PaymentTransactionResponse updateTransactionStatus(String transactionCode, String tenantId, TransactionStatus status, String gatewayTxnNo, String responseCode, String message);
}
