package com.nearcircle.services.user;

import com.nearcircle.dto.SignupRequest;
import com.nearcircle.dto.UserDto;
import com.nearcircle.entity.User;
import com.nearcircle.responce.GeneralResponse;

public interface UserService {

     User createUser(SignupRequest signupRequest) throws Exception;

     Boolean hasUserWithEmail(String email);

     void createAdminAccount();

     UserDto getUser(Long userId);

     GeneralResponse updateUser(UserDto userDto);

}
