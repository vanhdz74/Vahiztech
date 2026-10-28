package com.vahiztech.payment.application.service.impl;

import com.vahiztech.payment.api.dto.request.CreatePaymentOrderRequest;
import com.vahiztech.payment.api.dto.response.PaymentOrderResponse;
import com.vahiztech.payment.application.service.PaymentOrderService;
import com.vahiztech.payment.domain.entity.PaymentOrderEntity;
import com.vahiztech.payment.domain.enums.PaymentStatus;
import com.vahiztech.payment.domain.exception.ResourceNotFoundException;
import com.vahiztech.payment.infrastructure.repository.PaymentOrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentOrderServiceImpl implements PaymentOrderService {

    private final PaymentOrderRepository orderRepository;

    @Override
    @Transactional
    public PaymentOrderResponse createOrder(CreatePaymentOrderRequest request) {
        String datePrefix = OffsetDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String uniqueSuffix = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String generatedCode = "ORD-" + datePrefix + "-" + uniqueSuffix;

        OffsetDateTime expiresAt = OffsetDateTime.now(ZoneOffset.UTC).plusMinutes(30);

        PaymentOrderEntity entity = PaymentOrderEntity.builder()
                .orderCode(generatedCode)
                .tenantId(request.tenantId())
                .customerId(request.customerId())
                .customerEmail(request.customerEmail())
                .customerName(request.customerName())
                .sourceService(request.sourceService())
                .sourceOrderId(request.sourceOrderId())
                .amount(request.amount())
                .currency(request.currency() != null ? request.currency() : "VND")
                .status(PaymentStatus.PENDING)
                .description(request.description())
                .returnUrl(request.returnUrl())
                .cancelUrl(request.cancelUrl())
                .metadata(request.metadata())
                .expiresAt(expiresAt)
                .build();

        PaymentOrderEntity saved = orderRepository.save(entity);
        log.info("Created payment order: code={}, tenant={}, amount={}", saved.getOrderCode(), saved.getTenantId(), saved.getAmount());
        return PaymentOrderResponse.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentOrderResponse getOrderByCode(String orderCode, String tenantId) {
        PaymentOrderEntity order = orderRepository.findByOrderCodeAndTenantId(orderCode, tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với mã: " + orderCode + " trong tenant: " + tenantId));
        return PaymentOrderResponse.fromEntity(order);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentOrderResponse getOrderById(UUID id, String tenantId) {
        PaymentOrderEntity order = orderRepository.findByIdAndTenantId(id, tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với id: " + id + " trong tenant: " + tenantId));
        return PaymentOrderResponse.fromEntity(order);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PaymentOrderResponse> listOrders(String tenantId, PaymentStatus status, Pageable pageable) {
        Page<PaymentOrderEntity> page = (status != null)
                ? orderRepository.findAllByTenantIdAndStatus(tenantId, status, pageable)
                : orderRepository.findAllByTenantId(tenantId, pageable);
        return page.map(PaymentOrderResponse::fromEntity);
    }

    @Override
    @Transactional
    public PaymentOrderResponse updateOrderStatus(String orderCode, String tenantId, PaymentStatus newStatus) {
        PaymentOrderEntity order = orderRepository.findByOrderCodeAndTenantId(orderCode, tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng: " + orderCode));

        order.setStatus(newStatus);
        PaymentOrderEntity updated = orderRepository.save(order);
        log.info("Updated order {} status to {}", orderCode, newStatus);
        return PaymentOrderResponse.fromEntity(updated);
    }
}
