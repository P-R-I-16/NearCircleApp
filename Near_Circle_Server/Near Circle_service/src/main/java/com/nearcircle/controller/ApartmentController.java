package com.nearcircle.controller;

import com.nearcircle.dto.ApartmentDto;
import com.nearcircle.dto.ApproveTenantDto;
import com.nearcircle.responce.GeneralResponse;
import com.nearcircle.services.apartment.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/near-circle/apartment/")
@RestController
public class ApartmentController {

    @Autowired
    private ApartmentService apartmentService;

    @PostMapping("{userId}")
    public GeneralResponse addApartment(@PathVariable Long userId, @ModelAttribute ApartmentDto apartmentDto) {
        GeneralResponse response = new GeneralResponse();
        try {
            return apartmentService.addApartment(userId,apartmentDto);
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("/all/{userId}")
    public GeneralResponse getAllApartmentsByUserId(@PathVariable Long userId) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(apartmentService.getAllApartmentsByUserId(userId));
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @PostMapping("tenant/approve")
    public GeneralResponse approveTenant(@RequestBody ApproveTenantDto approveTenantDto) {
        GeneralResponse response = new GeneralResponse();
        try {
            return apartmentService.approveTenant(approveTenantDto);
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("/tenants/{managerId}")
    public GeneralResponse getTenantsByManagerId(@PathVariable Long managerId) {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(apartmentService.getTenantsByManagerId(managerId));
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

}
