package com.note.controller;

import com.note.entity.UserEntitiy;
import com.note.model.LoginUserModel;
import com.note.responseModel.SigninReponseModel;
import com.note.services.AuthService;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api")
public class AuthController {
//    private SigninReponseModel signinReponseModel;
    AuthService authService;
    AuthController(AuthService authService,SigninReponseModel signinReponseModel, UserEntitiy userEntitiy){
        this.authService = authService;
//        this.signinReponseModel = signinReponseModel;
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
    public ResponseEntity<SigninReponseModel> Signin(@RequestBody Map<String,Object> data) {
        UserEntitiy userEntitiy = new UserEntitiy();
        userEntitiy.setUserName((String) data.get("userName"));
        userEntitiy.setUserPassword((String) data.get("userPassword"));
        userEntitiy.setUserEmail((String) data.get("userEmail"));
        return  ResponseEntity.ok().body(authService.signIn(userEntitiy));
    }
    @GetMapping("/logout")
    public ResponseEntity<?> logout(){
        return ResponseEntity.ok().body("You are logout");
    }
}
