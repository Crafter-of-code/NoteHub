package com.note.services;

import com.note.entity.NoteEntity;
import com.note.entity.UserEntitiy;
import com.note.repository.NoteRepository;
import com.note.repository.UserRepository;
import com.note.responseModel.NoteResponseModel;
import com.note.responseModel.ResponseModel;
import com.note.utility.JwtUtil;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    private UserRepository userRepository;
    private JwtUtil jwtUtil;
    private NoteRepository noteRepository;

    NoteService(UserEntitiy userEntitiy, UserRepository userRepository, JwtUtil jwtUtil,
            NoteRepository noteRepository) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.noteRepository = noteRepository;
    }

    public List<NoteResponseModel> getAllNotes(String token) {
        UserEntitiy userData = userRepository.findByUserEmail(jwtUtil.extractUserName(token))
                .orElseThrow(() -> new RuntimeException("user note found"));
        List<NoteEntity> noteData = noteRepository.findByUserId(userData);
        // return noteData;
        return noteData.stream().map(item -> new NoteResponseModel(item.getNoteId(),
                item.getNoteTitle(),
                item.getNoteContent(),
                item.getCreateAt())).toList();
    }

    public String addNote(NoteEntity noteData, String header) {
        try {
            UserEntitiy userData = userRepository.findByUserEmail(jwtUtil.extractUserName(header))
                    .orElseThrow(() -> new RuntimeException("we are facing some problem"));
            noteData.setUserId(userData);
            noteRepository.save(noteData);
            return "Note has been added successfully";
        } catch (Exception e) {
            System.out.println(e);
            return "There is some problem while saving the note";
        }
    }

    public ResponseModel deleteNote(Long id) {
        ResponseModel rm = new ResponseModel();
        try {
            noteRepository.deleteById(id);
            rm.setErrorStatus(false);
            rm.setMessage("Your message has been deleted successfully");
            return rm;
        } catch (Exception e) {
            rm.setErrorStatus(true);
            rm.setMessage("we are facing some error while delete you message");
            return rm;
        }
    }

    public NoteResponseModel getSingleNote(Long id) {
        NoteEntity noteData = noteRepository.getReferenceById(id);
        return new NoteResponseModel(noteData.getNoteId(), noteData.getNoteTitle(), noteData.getNoteContent(),
                noteData.getCreateAt());
    }

    public ResponseModel updateSingleNote(Long noteId, NoteEntity updatedNoteData) {
        ResponseModel rm = new ResponseModel();
        try {
            NoteEntity existingNote = noteRepository.findById(noteId)
                    .orElseThrow(() -> new RuntimeException("note is note found"));
            existingNote.setNoteTitle(updatedNoteData.getNoteTitle());
            existingNote.setNoteContent(updatedNoteData.getNoteContent());
            noteRepository.save(existingNote);
            rm.setErrorStatus(false);
            rm.setMessage("You note has been successfully updated");
            return rm;
        } catch (Exception e) {
            rm.setErrorStatus(true);
            rm.setMessage("We are facing some error while updaing you note");
            return rm;
        }
    }
}