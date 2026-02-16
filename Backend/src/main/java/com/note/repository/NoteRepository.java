package com.note.repository;

import com.note.entity.NoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<NoteEntity,Long> {
    List<NoteEntity> findByUserId_UserId(Long id);
}
