package com.vahiztech.payment.infrastructure.repository;

import com.vahiztech.payment.domain.entity.PaymentOrderEntity;
import com.vahiztech.payment.domain.enums.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentOrderRepository extends JpaRepository<PaymentOrderEntity, UUID> {

    Optional<PaymentOrderEntity> findByOrderCode(String orderCode);

    Optional<PaymentOrderEntity> findByIdAndTenantId(UUID id, String tenantId);

    Optional<PaymentOrderEntity> findByOrderCodeAndTenantId(String orderCode, String tenantId);

    Page<PaymentOrderEntity> findAllByTenantId(String tenantId, Pageable pageable);

    Page<PaymentOrderEntity> findAllByTenantIdAndStatus(String tenantId, PaymentStatus status, Pageable pageable);

    Page<PaymentOrderEntity> findAllByTenantIdAndCustomerId(String tenantId, String customerId, Pageable pageable);
}
