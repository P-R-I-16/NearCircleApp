package com.nearcircle.controller;

import com.nearcircle.dto.ApproveApartmentDto;
import com.nearcircle.entity.Apartment;
import com.nearcircle.responce.GeneralResponse;
import com.nearcircle.services.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/near-circle/admin/")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("apartment")
    public GeneralResponse approveApartment(@RequestBody ApproveApartmentDto approveApartmentDto) {
        GeneralResponse response = new GeneralResponse();
        try {
            return adminService.approveApartment(approveApartmentDto);
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @PostMapping("reject-apartment")
    public GeneralResponse rejectApartment(@RequestBody ApproveApartmentDto approveApartmentDto) {
        GeneralResponse response = new GeneralResponse();
        try {
            return adminService.rejectApartment(approveApartmentDto);
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("/apartments")
    public GeneralResponse getAllApartments() {
        GeneralResponse response = new GeneralResponse();
        try {
            response.setData(adminService.getAllApartments());
            response.setStatus(HttpStatus.OK);
            return response;
        } catch (Exception ex) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("Sorry Something Wrong Happened.");
            return response;
        }
    }

    @GetMapping("file/{apartmentId}")
    public ResponseEntity<Object> getFile(@PathVariable Long apartmentId) {
        Apartment apartment = adminService.getFile(apartmentId);
       /* File f=new File("C:\\Users\\Priyansha\\Downloads\\" + 1 + ".png");
        try {
            FileOutputStream fs=new FileOutputStream(f);
            fs.write(apartment.getImg());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }*/
        MediaType contentType = MediaType.IMAGE_JPEG;
        ResponseEntity.ok().contentType(contentType);
       // return ResponseEntity.ok().contentType(contentType).body(apartment.getImg());
      return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "AptId_"+ apartmentId+"_"+"file.jpg" + "\"").body(apartment.getImg());
    }

}
