package com.note.controller;

import com.note.entity.NoteEntity;
import com.note.responseModel.NoteResponseModel;
import com.note.responseModel.ResponseModel;
import com.note.services.NoteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NoteController {
    private NoteService noteService;

    NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/notes")
    public ResponseEntity<List<NoteResponseModel>> getAllNotes(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid or missing Authorization header");
        }
        String token = header.substring(7).trim();
        List<NoteResponseModel> notes = noteService.getAllNotes(token);
        return ResponseEntity.ok().body(notes);
    }

    @PostMapping("/note")
    public ResponseEntity<ResponseModel> addNote(@RequestBody NoteEntity data,
            @RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        String response = noteService.addNote(data, token);
        ResponseModel rm = new ResponseModel();
        rm.setErrorStatus(false);
        rm.setMessage(response);
        return ResponseEntity.ok().body(rm);
    }

    @DeleteMapping("/note/{id}")
    public ResponseEntity<ResponseModel> deleteNote(@PathVariable String id) {
        ResponseModel rm = noteService.deleteNote(Long.parseLong(id));
        if (rm.getErrorStatus()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(rm);
        } else {
            return ResponseEntity.ok().body(rm);
        }
    }

    @GetMapping("/note/{id}")
    public ResponseEntity<NoteResponseModel> getSingleNote(@PathVariable String id) {
        NoteResponseModel nrm = noteService.getSingleNote(Long.parseLong(id));
        return ResponseEntity.ok().body(nrm);
    }

    @PatchMapping("/note/{id}")
    public ResponseEntity<ResponseModel> updateSingleNote(@PathVariable String id,
            @RequestBody NoteEntity updateNoteData) {
        ResponseModel rm = noteService.updateSingleNote(Long.parseLong(id), updateNoteData);
        return ResponseEntity.ok().body(rm);
    }
}
