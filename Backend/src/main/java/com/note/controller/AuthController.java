package com.note.controller;

import com.note.entity.UserEntitiy;
import com.note.model.LoginUserModel;
import com.note.responseModel.ResponseModel;
import com.note.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api")
public class AuthController {
    // private ResponseModel signinReponseModel;
    AuthService authService;

    AuthController(AuthService authService, ResponseModel responseModel, UserEntitiy userEntitiy) {
        this.authService = authService;
        // this.responseModel = responseModel;
    }

    @GetMapping("/signin")
    public String singnHandler() {
        return "this is the signin get route";
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseModel> login(@RequestBody LoginUserModel data) {
        return ResponseEntity.ok().body(authService.login(data));

    }

    @PostMapping("/signin")
    public ResponseEntity<ResponseModel> Signin(@RequestBody Map<String, Object> data) {
        UserEntitiy userEntitiy = new UserEntitiy();
        userEntitiy.setUserName((String) data.get("userName"));
        userEntitiy.setUserPassword((String) data.get("userPassword"));
        userEntitiy.setUserEmail((String) data.get("userEmail"));
        return ResponseEntity.ok().body(authService.signIn(userEntitiy));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok().body("You are logout");
    }
}
