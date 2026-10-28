package com.vahiztech.payment.application.service.impl;

import com.vahiztech.payment.api.dto.request.ProcessTransactionRequest;
import com.vahiztech.payment.api.dto.response.PaymentTransactionResponse;
import com.vahiztech.payment.application.service.PaymentTransactionService;
import com.vahiztech.payment.domain.entity.PaymentOrderEntity;
import com.vahiztech.payment.domain.entity.PaymentTransactionEntity;
import com.vahiztech.payment.domain.enums.PaymentStatus;
import com.vahiztech.payment.domain.enums.TransactionStatus;
import com.vahiztech.payment.domain.exception.BusinessException;
import com.vahiztech.payment.domain.exception.ResourceNotFoundException;
import com.vahiztech.payment.infrastructure.repository.PaymentOrderRepository;
import com.vahiztech.payment.infrastructure.repository.PaymentTransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentTransactionServiceImpl implements PaymentTransactionService {

    private final PaymentTransactionRepository transactionRepository;
    private final PaymentOrderRepository orderRepository;

    @Override
    @Transactional
    public PaymentTransactionResponse createTransaction(ProcessTransactionRequest request) {
        // Idempotency check: ngăn chặn trùng lặp giao dịch
        if (request.idempotencyKey() != null && !request.idempotencyKey().isBlank()) {
            Optional<PaymentTransactionEntity> existing = transactionRepository.findByIdempotencyKey(request.idempotencyKey());
            if (existing.isPresent()) {
                log.info("Idempotent request detected for key: {}. Returning existing transaction: {}",
                        request.idempotencyKey(), existing.get().getTransactionCode());
                return PaymentTransactionResponse.fromEntity(existing.get());
            }
        }

        // Kiểm tra Order tồn tại và đúng Tenant
        PaymentOrderEntity order = orderRepository.findByIdAndTenantId(request.orderId(), request.tenantId())
                .orElseThrow(() -> new ResourceNotFoundException("Đơn hàng không tồn tại hoặc không thuộc tổ chức này"));

        if (order.getStatus() == PaymentStatus.COMPLETED) {
            throw new BusinessException("Đơn hàng này đã được thanh toán thành công trước đó");
        }
        if (order.getStatus() == PaymentStatus.CANCELLED || order.getStatus() == PaymentStatus.EXPIRED) {
            throw new BusinessException("Đơn hàng đang ở trạng thái không thể thanh toán: " + order.getStatus());
        }

        String datePrefix = OffsetDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String uniqueSuffix = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String txnCode = "TXN-" + datePrefix + "-" + uniqueSuffix;

        PaymentTransactionEntity transaction = PaymentTransactionEntity.builder()
                .transactionCode(txnCode)
                .order(order)
                .tenantId(request.tenantId())
                .provider(request.provider())
                .paymentMethod(request.paymentMethod())
                .amount(order.getAmount())
                .feeAmount(BigDecimal.ZERO)
                .currency(order.getCurrency())
                .status(TransactionStatus.INITIATED)
                .idempotencyKey(request.idempotencyKey())
                .bankCode(request.bankCode())
                .payerAccountInfo(request.payerAccountInfo())
                .build();

        PaymentTransactionEntity saved = transactionRepository.save(transaction);
        log.info("Initiated transaction: code={}, orderCode={}, provider={}, amount={}",
                saved.getTransactionCode(), order.getOrderCode(), saved.getProvider(), saved.getAmount());

        return PaymentTransactionResponse.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentTransactionResponse getTransactionByCode(String transactionCode, String tenantId) {
        PaymentTransactionEntity txn = transactionRepository.findByTransactionCodeAndTenantId(transactionCode, tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy giao dịch: " + transactionCode));
        return PaymentTransactionResponse.fromEntity(txn);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentTransactionResponse getTransactionById(UUID id, String tenantId) {
        PaymentTransactionEntity txn = transactionRepository.findByIdAndTenantId(id, tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy giao dịch với id: " + id));
        return PaymentTransactionResponse.fromEntity(txn);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PaymentTransactionResponse> listTransactions(String tenantId, TransactionStatus status, Pageable pageable) {
        Page<PaymentTransactionEntity> page = (status != null)
                ? transactionRepository.findAllByTenantIdAndStatus(tenantId, status, pageable)
                : transactionRepository.findAllByTenantId(tenantId, pageable);
        return page.map(PaymentTransactionResponse::fromEntity);
    }

    @Override
    @Transactional
    public PaymentTransactionResponse updateTransactionStatus(String transactionCode, String tenantId,
                                                              TransactionStatus status, String gatewayTxnNo,
                                                              String responseCode, String message) {
        PaymentTransactionEntity txn = transactionRepository.findByTransactionCodeAndTenantId(transactionCode, tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy giao dịch: " + transactionCode));

        txn.setStatus(status);
        if (gatewayTxnNo != null) txn.setGatewayTransactionNo(gatewayTxnNo);
        if (responseCode != null) txn.setResponseCode(responseCode);
        if (message != null) txn.setResponseMessage(message);

        if (status == TransactionStatus.SUCCESS) {
            txn.setPaidAt(OffsetDateTime.now(ZoneOffset.UTC));
            if (txn.getOrder() != null) {
                txn.getOrder().setStatus(PaymentStatus.COMPLETED);
                orderRepository.save(txn.getOrder());
                log.info("Order {} successfully completed via txn {}", txn.getOrder().getOrderCode(), transactionCode);
            }
        }

        PaymentTransactionEntity updated = transactionRepository.save(txn);
        return PaymentTransactionResponse.fromEntity(updated);
    }
}
