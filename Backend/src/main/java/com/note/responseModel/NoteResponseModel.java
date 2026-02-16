package com.note.responseModel;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

public class NoteResponseModel {
    private long noteId;
    private String noteTitle;
    private String noteContent;
    private LocalDateTime createAt;

    public NoteResponseModel(long noteId, String noteTitle, String noteContent, LocalDateTime createAt) {
        this.noteId = noteId;
        this.noteTitle = noteTitle;
        this.noteContent = noteContent;
        this.createAt = createAt;
    }

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

    public String getNoteContent() {
        return noteContent;
    }

    public void setNoteContent(String noteContent) {
        this.noteContent = noteContent;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }
}
