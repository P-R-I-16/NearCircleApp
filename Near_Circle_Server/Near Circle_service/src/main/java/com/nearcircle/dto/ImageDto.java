package com.nearcircle.dto;

import com.nearcircle.enums.Status;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Blob;
import java.util.Date;

@Data
public class ImageDto {

    private Long id;


    private Long userId;



    private MultipartFile img;

    private String returnedFile;

    private byte[] file;


}
