package com.note.services;

//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.note.entity.UserEntitiy;
import com.note.model.LoginUserModel;
import com.note.repository.UserRepository;
import com.note.responseModel.ResponseModel;
import com.note.utility.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private JwtUtil jwtUtil;
    private ResponseModel responseModel;
    AuthService(UserRepository userRepository,
                PasswordEncoder passwordEncoder,
                JwtUtil jwtUtil,
                ResponseModel responseModel) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.responseModel = responseModel;
    }

    public ResponseModel login(LoginUserModel data) {
//    ResponseModel rm = new ResponseModel();
        try {
            UserEntitiy userData = userRepository.findByUserEmail(data.getUserEmail()).orElseThrow(() -> new RuntimeException("user not found"));
            Boolean resultOfPasswordMatching = passwordEncoder.matches(data.getUserPassword(), userData.getUserPassword());
            if (resultOfPasswordMatching) {
                ResponseModel rm = new ResponseModel();
                rm.setErrorStatus(false);
                rm.setUserId(userData.getUserId());
                rm.setMessage("You singined in successfully");
                rm.setToken(jwtUtil.generateToken(userData.getUserEmail()));
                return rm;
            } else {
                ResponseModel rm = new ResponseModel();
                rm.setMessage("Your password is wrong");
                rm.setErrorStatus(true);
                return rm;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        responseModel.setMessage("some thing went wrong");
        responseModel.setErrorStatus(true);
        return responseModel;
    }

    public ResponseModel signIn(UserEntitiy data) {
        try {
            String password = passwordEncoder.encode(data.getUserPassword());
            data.setUserPassword(password);
            userRepository.save(data);
        } catch (Exception e) {
            System.out.println(e);
            responseModel.setErrorStatus(true);
            responseModel.setMessage("User with this email is already present");
            return responseModel;
        }
        responseModel.setErrorStatus(false);
        responseModel.setMessage("You signed in successfully");
        return responseModel;
    }
}
