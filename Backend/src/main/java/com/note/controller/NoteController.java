package com.note.controller;

import com.note.entity.NoteEntity;
import com.note.responseModel.NoteResponseModel;
import com.note.responseModel.ResponseModel;
import com.note.services.NoteService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NoteController {
    private NoteService noteService;
    NoteController(NoteService noteService){
        this.noteService = noteService;
    }
    @GetMapping("/home")
    public ResponseEntity<List<NoteResponseModel>> getAllNotes(HttpServletRequest request){
        String header = request.getHeader("Authorization");
        String authoriationHeader = header.substring(7);
        System.out.println(authoriationHeader);
        List<NoteResponseModel> notes = noteService.getAllNotes(authoriationHeader);
        return  ResponseEntity.ok().body(notes);
    }
    @PostMapping("/addnote")
    public ResponseEntity<ResponseModel> addNote(@RequestBody NoteEntity data,@RequestHeader("Authorization") String header){
        System.out.println(header);
        String token = header.substring(7);
       String response = noteService.addNote(data,token);
        ResponseModel rm = new ResponseModel();
        rm.setErrorStatus(false);
        rm.setMessage(response);
        return  ResponseEntity.ok().body(rm);
    }
    @DeleteMapping("/deletenote/{id}")
    public ResponseEntity<ResponseModel>deleteNote(@PathVariable String id){

        System.out.println("The id is note id is: "+id);
        ResponseModel rm = noteService.deleteNote(Long.parseLong(id));
        if(rm.getErrorStatus()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rm);
        }
        else{
            return ResponseEntity.ok().body(rm);
        }
    }
}
