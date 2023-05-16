package com.nearcircle.dto;


import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserDto {

    private Long id;
    private String email;
    private String name;
    private String role;
    private Long countFriends;


    public UserDto(Long id, String email, String name, String role, Long countFriends) {
    }

    public UserDto() {

    }
}
