package com.nearcircle.services.apartment;

import com.nearcircle.dto.ApartmentDto;
import com.nearcircle.dto.ApproveTenantDto;
import com.nearcircle.dto.TenantDto;
import com.nearcircle.responce.GeneralResponse;

import java.io.IOException;
import java.util.List;

public interface ApartmentService {

    GeneralResponse addApartment(Long userId, ApartmentDto apartmentDto) throws IOException;

    List<ApartmentDto> getAllApartmentsByUserId(Long userId);

    GeneralResponse approveTenant(ApproveTenantDto approveTenantDto);

    List<TenantDto> getTenantsByManagerId(Long apartmentOwnerId);

}
