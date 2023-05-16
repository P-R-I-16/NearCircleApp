package com.nearcircle.services.user;

import com.nearcircle.dto.SignupRequest;
import com.nearcircle.dto.UserDto;
import com.nearcircle.entity.User;
import com.nearcircle.repo.UserRepo;
import com.nearcircle.responce.GeneralResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public void createAdminAccount() {
        User adminAccount = userRepo.findByRole("ADMIN");
        if(null == adminAccount){
            User user = new User();
            user.setEmail("admin@gmail.com");
            user.setName("Admin");
            user.setRole("ADMIN");
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepo.save(user);
        }
    }

    @Transactional
    public User createUser(SignupRequest signupRequest) throws Exception {
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setRole(signupRequest.getRole());
        user.setCountFriends(0L);
        user = userRepo.save(user);
        return user;
    }


    public Boolean hasUserWithEmail(String email) {
        return userRepo.findFirstByEmail(email) != null;
    }

    @Override
    public UserDto getUser(Long userId) {
        UserDto userDto = null;
        Optional<User> optionalUser = userRepo.findById(userId);
        if(optionalUser.isPresent()){
            userDto = optionalUser.get().mapUsertoUserDto();
        }
        return userDto;
    }

    public GeneralResponse updateUser(UserDto userDto)  {
        GeneralResponse response = new GeneralResponse();
        User user = null;
        try {
            Optional<User> userOptional = userRepo.findById(userDto.getId());
            if (userOptional.isPresent()) {
                user = userOptional.get();
                user.setName(userDto.getName());
                userRepo.save(user);
                response.setMessage("User Updated Successfully");
                response.setStatus(HttpStatus.CREATED);
                return response;
            } else {
                response.setStatus(HttpStatus.NOT_ACCEPTABLE);
                response.setMessage("User Not Found");
                return response;
            }
        }catch (Exception e){
            response.setStatus(HttpStatus.NOT_ACCEPTABLE);
            response.setMessage("Unable to process Img");
            return response;
        }
    }

}
