package com.nearcircle.services.admin;

import com.nearcircle.dto.ApartmentDto;
import com.nearcircle.dto.ApproveApartmentDto;
import com.nearcircle.entity.Apartment;
import com.nearcircle.enums.Status;
import com.nearcircle.repo.ApartmentRepo;
import com.nearcircle.responce.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Override
    public GeneralResponse approveApartment(ApproveApartmentDto approveApartmentDto) {
        GeneralResponse response = new GeneralResponse();
        Optional<Apartment> optionalApartment = apartmentRepo.findById(approveApartmentDto.getApartmentId());
        if (optionalApartment.isPresent()) {
            Apartment apartment = optionalApartment.get();
            apartment.setStatus(Status.APPROVED);
            apartmentRepo.save(apartment);
            response.setMessage("Apartment approved Successfully");
            response.setStatus(HttpStatus.OK);
        } else {
            response.setStatus(HttpStatus.NOT_FOUND);
            response.setMessage("Apartment not found!");
        }
        return response;
    }

    @Override
    public GeneralResponse rejectApartment(ApproveApartmentDto approveApartmentDto) {
        GeneralResponse response = new GeneralResponse();
        Optional<Apartment> optionalApartment = apartmentRepo.findById(approveApartmentDto.getApartmentId());
        if (optionalApartment.isPresent()) {
            Apartment apartment = optionalApartment.get();
            apartment.setStatus(Status.REJECTED);
            apartmentRepo.save(apartment);
            response.setMessage("Apartment approval request rejected");
            response.setStatus(HttpStatus.OK);
        } else {
            response.setStatus(HttpStatus.NOT_FOUND);
            response.setMessage("Apartment not found!");
        }
        return response;
    }

    @Override
    public List<ApartmentDto> getAllApartments() {
        return apartmentRepo.findAllByStatus(Status.PENDING).stream().map(Apartment::getApartmentDto).collect(Collectors.toList());
    }

    @Override
    public Apartment getFile(Long apartmentId) {
        return apartmentRepo.findById(apartmentId).get();
    }

}
