package com.nearcircle.services.apartment;

import com.nearcircle.dto.ApartmentDto;
import com.nearcircle.dto.ApproveTenantDto;
import com.nearcircle.dto.TenantDto;
import com.nearcircle.entity.Apartment;
import com.nearcircle.entity.Tenant;
import com.nearcircle.entity.User;
import com.nearcircle.enums.Status;
import com.nearcircle.repo.ApartmentRepo;
import com.nearcircle.repo.TenantRepo;
import com.nearcircle.repo.UserRepo;
import com.nearcircle.responce.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ApartmentServiceImpl implements ApartmentService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Autowired
    private TenantRepo tenantRepo;


    @Override
    public GeneralResponse addApartment(Long userId, ApartmentDto apartmentDto) throws IOException {
        GeneralResponse response = new GeneralResponse();
        Optional<User> optionalUser = userRepo.findById(userId);
        if (optionalUser.isPresent()) {
            Apartment apartment = new Apartment();
            apartment.setName(apartmentDto.getName());
            apartment.setAddress(apartmentDto.getName());
            apartment.setCountry(apartmentDto.getCountry());
            apartment.setState(apartmentDto.getState());
            apartment.setCity(apartmentDto.getCity());
            apartment.setManagerName(apartmentDto.getManagerName());
            apartment.setPhoneNo(apartmentDto.getPhoneNo());
            apartment.setUser(optionalUser.get());
            apartment.setDate(new Date());
            apartment.setStatus(Status.PENDING);
            apartment.setImg(apartmentDto.getImg().getBytes());
            apartmentRepo.save(apartment);
            response.setMessage("Apartment added Successfully");
            response.setStatus(HttpStatus.CREATED);
            return response;
        } else {
            response.setStatus(HttpStatus.NOT_ACCEPTABLE);
            response.setMessage("Apartment not found!");
        }
        return response;
    }

    @Override
    public List<ApartmentDto> getAllApartmentsByUserId(Long userId) {
        return apartmentRepo.findAllByUserId(userId).stream().map(Apartment::getApartmentDto).collect(Collectors.toList());
    }

    @Override
    public GeneralResponse approveTenant(ApproveTenantDto approveTenantDto) {
        GeneralResponse response = new GeneralResponse();
        Optional<Tenant> optionalTenant = tenantRepo.findById(approveTenantDto.getTenantId());
        if (optionalTenant.isPresent()) {
            Tenant tenant = optionalTenant.get();
            tenant.setStatus(Status.APPROVED);
            tenantRepo.save(tenant);
            response.setMessage("Tenant approved Successfully");
            response.setStatus(HttpStatus.OK);
            return response;
        } else {
            response.setStatus(HttpStatus.NOT_ACCEPTABLE);
            response.setMessage("Tenant not found!");
        }
        return response;
    }

    @Override
    public List<TenantDto> getTenantsByManagerId(Long managerId) {
        return tenantRepo.findAllByManagerIdAndStatus(managerId, Status.PENDING).stream().map(Tenant::getTenantDto).collect(Collectors.toList());
    }

}
