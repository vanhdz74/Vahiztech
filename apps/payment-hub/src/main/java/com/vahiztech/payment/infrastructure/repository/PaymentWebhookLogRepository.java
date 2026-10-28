package com.vahiztech.payment.infrastructure.repository;

import com.vahiztech.payment.domain.entity.PaymentWebhookLogEntity;
import com.vahiztech.payment.domain.enums.PaymentProvider;
import com.vahiztech.payment.domain.enums.WebhookProcessingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentWebhookLogRepository extends JpaRepository<PaymentWebhookLogEntity, UUID> {

    Optional<PaymentWebhookLogEntity> findByIdAndTenantId(UUID id, String tenantId);

    Page<PaymentWebhookLogEntity> findAllByTenantId(String tenantId, Pageable pageable);

    List<PaymentWebhookLogEntity> findAllByOrderCode(String orderCode);

    List<PaymentWebhookLogEntity> findAllByTenantIdAndProviderAndProcessingStatus(
            String tenantId, PaymentProvider provider, WebhookProcessingStatus status);
}
