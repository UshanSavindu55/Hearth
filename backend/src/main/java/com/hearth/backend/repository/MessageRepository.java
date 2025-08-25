package com.hearth.backend.repository;

import com.hearth.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationConversationIdOrderByTimestampAsc(UUID conversationId);
    List<Message> findTop4ByConversation_ConversationIdOrderByTimestampDesc(UUID conversationId);
    List<Message> findTop8ByConversation_ConversationIdOrderByTimestampDesc(UUID conversationId);
    
    @Transactional
    void deleteByConversationConversationId(UUID conversationId);

}
