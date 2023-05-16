package com.nearcircle.dto;

import com.nearcircle.enums.Status;
import com.nearcircle.utill.JSONObjectConverter;
import lombok.Data;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Convert;
import java.util.Date;

@Data
public class SecondTenantDto {

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

    private String apartmentId;

    private Long userId;

    private String username;
    private MultipartFile img;

    private String returnedFile;

    private byte[] file;

    private String mobile;
}
