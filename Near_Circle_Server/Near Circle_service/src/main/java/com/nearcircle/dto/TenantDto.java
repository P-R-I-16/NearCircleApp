package com.nearcircle.dto;

import com.nearcircle.enums.Status;
import lombok.Data;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class TenantDto {

    private Long id;

    private String firstname;

    private String lastname;

    private String address;

    private String age;

    private String bio;

    private String interests;

    private String race;

    private String ethnicity;

    private String nationality;

    private Date date;

    private Status status;

    private Long managerId;

    private Long apartmentId;

    private String apartmentName;

    private Long userId;

    private String username;

    private MultipartFile img;

    private String returnedFile;

    private byte[] file;

    private String mobile;

}
