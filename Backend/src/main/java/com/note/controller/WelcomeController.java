package com.note.controller;

import com.note.model.WelcomeData;
import com.note.services.WelcomeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api")
public class WelcomeController {
    private WelcomeService wlcService;

    WelcomeController(WelcomeData wd, WelcomeService wlcService) {
        this.wlcService = wlcService;
    }

    @GetMapping("/welcome")
    public ResponseEntity<String> geeting() {
        return ResponseEntity.ok("Hello and welcome to NoteHub");
    }

    @GetMapping("/welcome/data")
    public ResponseEntity<List<WelcomeData>> data() {
        return ResponseEntity.ok(wlcService.getListData());
    }
}
