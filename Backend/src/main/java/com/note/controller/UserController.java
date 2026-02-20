package com.note.controller;

import com.note.responseModel.ResponseModel;
import com.note.responseModel.UserDetailResponse;
import com.note.services.UserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
    UserService userService;
    UserController(UserService userService){
        this.userService = userService;
    }
    @GetMapping("/userdetails")
    public ResponseEntity<UserDetailResponse>  getUserDetail(@RequestHeader("Authorization") String header){
        String token = header.substring(7);
        UserDetailResponse udr = userService.getUserDetailServcie(token);
        return  ResponseEntity.ok().body(udr);
    }
    @PutMapping("/update-user-name")
    public ResponseEntity<ResponseModel> updateUserName(@RequestHeader("Authorization") String header,
                                                        @RequestBody @NotNull Map<String,String> userUpdatedDetail){
        List<String> li = new ArrayList<String>(userUpdatedDetail.keySet());
        String token = header.substring(7);
        ResponseModel rm = userService.updateUserDetail(token,li.get(0),userUpdatedDetail.get(li.getFirst()));
        if(rm.getErrorStatus()){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(rm);
        }
        else {
            return ResponseEntity.ok().body(rm);
        }
    }

}
