package com.hearth.backend.service;

import com.hearth.backend.dto.ChatRequest;
import com.hearth.backend.dto.ChatResponse;
import com.hearth.backend.model.Conversation;
import com.hearth.backend.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final MentalHealthService mentalHealthService;
    private final ConversationService conversationService;

    @Transactional
    public ChatResponse handleChatRequest(ChatRequest request, String userEmail) {       
        UUID conversationId = conversationService.getOrCreateConversation(request.getConversationId(), userEmail, request.getMessage());
        conversationService.saveMessage(conversationId, request.getMessage(), Message.Sender.USER);
        
        String botResponse;
        try {
            botResponse = mentalHealthService.processMessageWithContext(conversationId, request.getMessage(), userEmail);
        } catch (Exception e) {
            botResponse = "I'm sorry, I'm having trouble processing your message right now. Please try again.";
        }
        
        conversationService.saveMessage(conversationId, botResponse, Message.Sender.BOT);
        return new ChatResponse(conversationId, botResponse);
    }

    public List<Conversation> getUserConversations(String email) {
        return conversationService.getUserConversations(email);
    }
    
    public List<Message> getConversationMessages(UUID conversationId, String email) {
        return conversationService.getConversationMessages(conversationId, email);
    }
    
    @Transactional
    public void deleteConversation(UUID conversationId, String email) {
        conversationService.deleteConversation(conversationId, email);
    }

}
