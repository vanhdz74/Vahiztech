package com.vahiztech.payment.application.service;

import com.vahiztech.payment.api.dto.request.PaymentConfigRequest;
import com.vahiztech.payment.api.dto.response.PaymentConfigResponse;

import java.util.List;
import java.util.UUID;

public interface PaymentConfigService {
    PaymentConfigResponse createOrUpdateConfig(PaymentConfigRequest request);
    List<PaymentConfigResponse> getConfigsByTenant(String tenantId);
    PaymentConfigResponse getDefaultConfig(String tenantId);
    PaymentConfigResponse getConfigById(UUID id, String tenantId);
    void deleteConfig(UUID id, String tenantId);
}
