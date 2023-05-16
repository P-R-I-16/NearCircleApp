package com.nearcircle.services.admin;

import com.nearcircle.dto.ApartmentDto;
import com.nearcircle.dto.ApproveApartmentDto;
import com.nearcircle.entity.Apartment;
import com.nearcircle.responce.GeneralResponse;
import java.util.List;

public interface AdminService {
    GeneralResponse approveApartment(ApproveApartmentDto approveApartmentDto);

    GeneralResponse rejectApartment(ApproveApartmentDto approveApartmentDto);

    List<ApartmentDto> getAllApartments();

    Apartment getFile(Long apartmentId);
}
