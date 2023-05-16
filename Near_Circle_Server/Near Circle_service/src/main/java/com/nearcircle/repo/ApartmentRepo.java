package com.nearcircle.repo;

import com.nearcircle.entity.Apartment;
import com.nearcircle.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;



@Repository
public interface ApartmentRepo extends JpaRepository<Apartment,Long> {

    List<Apartment> findAllByUserId(Long userId);

    List<Apartment> findAllByStatus(Status approved);
}
