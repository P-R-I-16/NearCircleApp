package com.nearcircle.dto;

import com.nearcircle.enums.Status;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class ApartmentDto {

    private Long id;

    private String name;

    private String address;

    private Date date;

    private Status status;

    private MultipartFile img;

    private String returnedFile;

    private byte[] file;

    private Long userId;

    private String username;

    private String phoneNo;

    private String managerName;

    private String city;

    private String state;

    private String country;



}
