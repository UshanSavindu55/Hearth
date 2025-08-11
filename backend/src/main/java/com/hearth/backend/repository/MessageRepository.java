package com.hearth.backend.repository;

import com.hearth.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationConversationIdOrderByTimestampAsc(Long conversationId);
    List<Message> findTop4ByConversation_ConversationIdOrderByTimestampDesc(Long conversationId);


}
