package com.vahiztech.payment.infrastructure.repository;

import com.vahiztech.payment.domain.entity.PaymentConfigEntity;
import com.vahiztech.payment.domain.enums.EnvironmentType;
import com.vahiztech.payment.domain.enums.PaymentProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PaymentConfigRepository extends JpaRepository<PaymentConfigEntity, UUID> {

    List<PaymentConfigEntity> findAllByTenantId(String tenantId);

    List<PaymentConfigEntity> findAllByTenantIdAndIsActiveTrue(String tenantId);

    Optional<PaymentConfigEntity> findByIdAndTenantId(UUID id, String tenantId);

    Optional<PaymentConfigEntity> findByTenantIdAndProviderAndEnvironment(
            String tenantId, PaymentProvider provider, EnvironmentType environment);

    Optional<PaymentConfigEntity> findByTenantIdAndIsDefaultTrue(String tenantId);
}
