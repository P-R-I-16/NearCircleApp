package com.nearcircle.dto;

import lombok.Data;

@Data
public class FriendsDto {

    private Long id;

    private Long userId;

    private Long tenantId;

    private String tenantFirstName;

    private String tenantLastName;

    private Long tenantUserId;

}
