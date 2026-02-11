package com.note.controller;

import com.note.entity.UserEntitiy;
import com.note.model.LoginUserModel;
import com.note.model.SigninDataModel;
import com.note.services.AuthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class AuthController {
    AuthService authService;
    AuthController(AuthService authService){
        this.authService = authService;
    }
    @GetMapping("/signin")
    public String singnHandler(){
        return "this is the signin get route";
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@ModelAttribute LoginUserModel data){
        String token =  authService.login(data);
        ResponseCookie setCookie = ResponseCookie.from("jwt",token).httpOnly(true).secure(true).build();
        return  ResponseEntity.ok().header("Authorization","Bearer "+token) .body(token);

    }
    @PostMapping("/signin")
    public String Signin(@ModelAttribute UserEntitiy data) {
        return authService.signIn(data);
    }
    @GetMapping("/logout")
    public ResponseEntity<?> logout(){
        return ResponseEntity.ok().body("You are logout");
    }
}
