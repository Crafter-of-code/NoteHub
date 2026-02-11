package com.note.repository;

import com.note.entity.UserEntitiy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntitiy,Long>{
    Optional<UserEntitiy> findByUserEmail(String userEmail);
}
