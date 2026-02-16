package com.note.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "note")
public class NoteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long noteId;
    private String noteTitle;
    private String noteContent;
    @CreationTimestamp
    private LocalDateTime createAt;
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private UserEntitiy userId;

    public long getNoteId() {
        return noteId;
    }

    public void setNoteId(long noteId) {
        this.noteId = noteId;
    }

    public String getNoteTitle() {
        return noteTitle;
    }

    public void setNoteTitle(String noteTitle) {
        this.noteTitle = noteTitle;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public String getNoteContent() {
        return noteContent;
    }

    public void setNoteContent(String noteContent) {
        this.noteContent = noteContent;
    }

    public UserEntitiy getUserId() {
        return userId;
    }

    public void setUserId(UserEntitiy user) {
        this.userId = user;
    }
}
