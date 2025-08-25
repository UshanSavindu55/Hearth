package com.hearth.backend.repository;

import com.hearth.backend.model.Conversation;
import com.hearth.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, UUID> {
    List<Conversation> findByUserId(Long userId);
    List<Conversation> findByUserOrderByStartedAtDesc(User user);
}