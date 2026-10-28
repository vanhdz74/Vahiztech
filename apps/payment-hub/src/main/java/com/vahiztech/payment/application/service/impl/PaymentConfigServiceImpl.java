package com.vahiztech.payment.application.service.impl;

import com.vahiztech.payment.api.dto.request.PaymentConfigRequest;
import com.vahiztech.payment.api.dto.response.PaymentConfigResponse;
import com.vahiztech.payment.application.service.PaymentConfigService;
import com.vahiztech.payment.domain.entity.PaymentConfigEntity;
import com.vahiztech.payment.domain.exception.ResourceNotFoundException;
import com.vahiztech.payment.infrastructure.repository.PaymentConfigRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentConfigServiceImpl implements PaymentConfigService {

    private final PaymentConfigRepository configRepository;

    @Override
    @Transactional
    public PaymentConfigResponse createOrUpdateConfig(PaymentConfigRequest request) {
        Optional<PaymentConfigEntity> existing = configRepository.findByTenantIdAndProviderAndEnvironment(
                request.tenantId(), request.provider(), request.environment());

        PaymentConfigEntity entity = existing.orElseGet(() -> PaymentConfigEntity.builder()
                .tenantId(request.tenantId())
                .provider(request.provider())
                .environment(request.environment())
                .build());

        entity.setMerchantId(request.merchantId());
        entity.setMerchantName(request.merchantName());
        entity.setApiKey(request.apiKey());
        entity.setSecretKey(request.secretKey());
        entity.setWebhookSecret(request.webhookSecret());
        if (request.isActive() != null) entity.setIsActive(request.isActive());
        if (request.isDefault() != null) entity.setIsDefault(request.isDefault());
        if (request.configData() != null) entity.setConfigData(request.configData());

        // Nếu đặt làm default, bỏ default của các config khác cùng tenant
        if (Boolean.TRUE.equals(request.isDefault())) {
            configRepository.findAllByTenantId(request.tenantId()).forEach(c -> {
                if (!c.getId().equals(entity.getId()) && Boolean.TRUE.equals(c.getIsDefault())) {
                    c.setIsDefault(false);
                    configRepository.save(c);
                }
            });
        }

        PaymentConfigEntity saved = configRepository.save(entity);
        log.info("Saved payment config: tenant={}, provider={}, env={}", saved.getTenantId(), saved.getProvider(), saved.getEnvironment());
        return PaymentConfigResponse.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentConfigResponse> getConfigsByTenant(String tenantId) {
        return configRepository.findAllByTenantId(tenantId)
                .stream()
                .map(PaymentConfigResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentConfigResponse getDefaultConfig(String tenantId) {
        PaymentConfigEntity config = configRepository.findByTenantIdAndIsDefaultTrue(tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy cấu hình thanh toán mặc định cho tenant: " + tenantId));
        return PaymentConfigResponse.fromEntity(config);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentConfigResponse getConfigById(UUID id, String tenantId) {
        PaymentConfigEntity config = configRepository.findByIdAndTenantId(id, tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy cấu hình thanh toán với id: " + id));
        return PaymentConfigResponse.fromEntity(config);
    }

    @Override
    @Transactional
    public void deleteConfig(UUID id, String tenantId) {
        PaymentConfigEntity config = configRepository.findByIdAndTenantId(id, tenantId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy cấu hình thanh toán với id: " + id));
        configRepository.delete(config);
        log.info("Deleted payment config id: {} for tenant: {}", id, tenantId);
    }
}
