package com.nearcircle.repo;

import com.nearcircle.entity.Tenant;
import com.nearcircle.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TenantRepo extends JpaRepository<Tenant, Long> {
    List<Tenant> findAllByManagerIdAndStatus(Long managerId, Status pending);

    Optional<Tenant> findByUserId(Long userId);

    Tenant findAllByUserId(Long userId);

    List<Tenant> findAllByApartmentIdAndStatus(Long apartmentId, Status approved);
}
