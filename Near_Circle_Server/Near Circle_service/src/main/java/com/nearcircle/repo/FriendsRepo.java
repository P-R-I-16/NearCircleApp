package com.nearcircle.repo;

import com.nearcircle.entity.Friends;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendsRepo extends JpaRepository<Friends, Long> {
    List<Friends> findAllByUserId(Long userId);

    List<Friends> findAllByTenantId(Long tenantId);

    Friends findByTenantIdAndUserId(Long tenantId, Long userId);
}
