package com.nearcircle.repo;

import com.nearcircle.entity.Posts;
import com.nearcircle.entity.Tenant;
import com.nearcircle.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostsRepo extends JpaRepository<Posts,Long>{

    List<Posts> findAllByTenantId(Long tenantId);

    List<Posts> findAllByUserId(Long userId);
}
