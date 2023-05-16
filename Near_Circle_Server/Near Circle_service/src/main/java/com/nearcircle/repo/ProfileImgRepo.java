package com.nearcircle.repo;

import com.nearcircle.entity.ProfileImg;
import com.nearcircle.entity.Tenant;
import com.nearcircle.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileImgRepo extends JpaRepository<ProfileImg, Long> {

    Optional<ProfileImg> findByUserId(Long userId);
}
