package com.nearcircle.entity;

import com.nearcircle.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String name;

    private String role;

    private Long countFriends;


    public User(String email, String encode, String name, String role, Long countFriends) {
    }


    public UserDto mapUsertoUserDto() {
        return new UserDto(id, email, name, role, countFriends);
    }

    public UserDto getUserDto() {
        UserDto userDto = new UserDto();
        userDto.setId(id);
        userDto.setName(name);
        userDto.setEmail(email);
        userDto.setRole(role);
        userDto.setCountFriends(countFriends);
        return userDto;
    }
}
