package com.vahiztech.payment.application.service;

import com.vahiztech.payment.api.dto.request.CreatePaymentOrderRequest;
import com.vahiztech.payment.api.dto.response.PaymentOrderResponse;
import com.vahiztech.payment.domain.enums.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface PaymentOrderService {
    PaymentOrderResponse createOrder(CreatePaymentOrderRequest request);
    PaymentOrderResponse getOrderByCode(String orderCode, String tenantId);
    PaymentOrderResponse getOrderById(UUID id, String tenantId);
    Page<PaymentOrderResponse> listOrders(String tenantId, PaymentStatus status, Pageable pageable);
    PaymentOrderResponse updateOrderStatus(String orderCode, String tenantId, PaymentStatus newStatus);
}
