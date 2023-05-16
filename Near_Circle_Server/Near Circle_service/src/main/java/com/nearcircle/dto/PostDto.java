package com.nearcircle.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PostDto {

    private Long id;

    private String text;

    private Long userId;

    private Long tenantId;

    private String tenantFirstName;

    private String tenantLastName;

    private Date date;

}
