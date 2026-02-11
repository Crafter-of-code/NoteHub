package com.note.services;

//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.note.entity.UserEntitiy;
import com.note.model.LoginUserModel;
import com.note.repository.UserRepository;
import com.note.utility.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private JwtUtil jwtUtil;

    AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public String login(LoginUserModel data) {
        try {
            UserEntitiy userData = userRepository.findByUserEmail(data.getUserEmail()).orElseThrow(() -> new RuntimeException("user not found"));
            Boolean resultOfPasswordMatching = passwordEncoder.matches(data.getUserPassword(), userData.getUserPassword());
            if (resultOfPasswordMatching) {
                return jwtUtil.generateToken(userData.getUserEmail());
            } else {
                return "you are not the part of this ";
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return "there is some problem in the server";
    }

    public String signIn(UserEntitiy data) {
        try {
            String password = passwordEncoder.encode(data.getUserPassword());
            data.setUserPassword(password);
            userRepository.save(data);
        } catch (Exception e) {
            System.out.println("There is an exception");
            return "There is an exception in singIn post request";
        }
        return "The user has been saved successfully";
    }
}
