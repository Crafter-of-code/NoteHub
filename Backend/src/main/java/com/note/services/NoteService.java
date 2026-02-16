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
    private UserEntitiy userEntitiy;
    private UserRepository userRepository;
    private JwtUtil jwtUtil;
    private NoteRepository noteRepository;
    NoteService(UserEntitiy userEntitiy,UserRepository userRepository,JwtUtil jwtUtil,NoteRepository noteRepository){
        this.userEntitiy = userEntitiy;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.noteRepository = noteRepository;
    }
    public List<NoteResponseModel> getAllNotes(String token){
        System.out.println("We are in note server");
        UserEntitiy userData =  userRepository.findByUserEmail(jwtUtil.extractUserName(token))
                .orElseThrow(()->new RuntimeException("user note found"));
        Long id = userData.getUserId();
        System.out.println("Id of the user is: "+id);
        List<NoteEntity> noteData = noteRepository.findByUserId_UserId(id);
        List<NoteResponseModel> newNoteData = noteData.stream().map(item-> new NoteResponseModel(item.getNoteId(),
                item.getNoteTitle(),
                item.getNoteContent(),
                item.getCreateAt())).toList();
        return newNoteData;
    }
    public String addNote(NoteEntity noteData,String header){
        try{
            UserEntitiy userData = userRepository.findByUserEmail(jwtUtil.extractUserName(header))
                    .orElseThrow(()->new RuntimeException("we are facing some problem"));
            noteData.setUserId(userData);
            noteRepository.save(noteData);
            return  "Note has been added successfully";
        }
        catch (Exception e){
            System.out.println(e);
            return  "There is some problem while saving the note";
        }
    }
    public ResponseModel deleteNote(Long id){
        ResponseModel rm = new ResponseModel();
        try{
            noteRepository.deleteById(id);
            rm.setErrorStatus(false);
            rm.setMessage("Your message has been deleted successfully");
            return  rm;
        }
        catch (Exception e){
            rm.setErrorStatus(true);
            rm.setMessage("we are facing some error while delete you message");
            return  rm;
        }
    }
}