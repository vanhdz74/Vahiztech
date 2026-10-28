package com.vahiztech.payment.infrastructure.repository;

import com.vahiztech.payment.domain.entity.PaymentTransactionEntity;
import com.vahiztech.payment.domain.enums.TransactionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentTransactionRepository extends JpaRepository<PaymentTransactionEntity, UUID> {

    Optional<PaymentTransactionEntity> findByTransactionCode(String transactionCode);

    Optional<PaymentTransactionEntity> findByIdAndTenantId(UUID id, String tenantId);

    Optional<PaymentTransactionEntity> findByTransactionCodeAndTenantId(String transactionCode, String tenantId);

    Optional<PaymentTransactionEntity> findByIdempotencyKey(String idempotencyKey);

    List<PaymentTransactionEntity> findAllByOrderId(UUID orderId);

    Page<PaymentTransactionEntity> findAllByTenantId(String tenantId, Pageable pageable);

    Page<PaymentTransactionEntity> findAllByTenantIdAndStatus(String tenantId, TransactionStatus status, Pageable pageable);
}
