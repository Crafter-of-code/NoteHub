package com.note.services;

import com.note.entity.UserEntitiy;
import com.note.repository.UserRepository;
import com.note.responseModel.ResponseModel;
import com.note.responseModel.UserDetailResponse;
import com.note.utility.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    JwtUtil jwtUtil;
    UserRepository userRepository;
    PasswordEncoder encoder;

    UserService(JwtUtil jwtUtil, UserRepository userRepository, PasswordEncoder encoder) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public UserDetailResponse getUserDetailServcie(String header) {
        String userEmail = jwtUtil.extractUserName(header);
        UserEntitiy userEntitiy = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("we unable to find the user"));
        UserDetailResponse udr = new UserDetailResponse();
        udr.setUserName(userEntitiy.getUserName());
        udr.setUserEmail(userEntitiy.getUserEmail());
        return udr;
    }

    public ResponseModel updateUserDetail(String token, String valueToChange, String value) {
        ResponseModel rm = new ResponseModel();
        try {
            UserEntitiy userData = userRepository.findByUserEmail(jwtUtil.extractUserName(token))
                    .orElseThrow(() -> new RuntimeException("user not found"));
            if (valueToChange.equals("userName")) {
                userData.setUserName(value);
                userRepository.save(userData);
                rm.setErrorStatus(false);
                rm.setMessage("user Name has been changed");
                return rm;
            } else if (valueToChange.equals("userEmail")) {
                userData.setUserEmail(value);
                userRepository.save(userData);
                rm.setErrorStatus(false);
                rm.setMessage("user email has been change");
                return rm;
            } else if (valueToChange.equals("userPassword")) {
                String encodedPassword = encoder.encode(value);
                userData.setUserPassword(encodedPassword);
                userRepository.save(userData);
                rm.setErrorStatus(false);
                rm.setMessage("user password has been change");
                return rm;
            }

        } catch (Exception e) {
            rm.setErrorStatus(true);
            rm.setMessage(e.getMessage());
            return rm;
        }
        return rm;
    }
}
