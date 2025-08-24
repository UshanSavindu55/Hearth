package com.hearth.backend.controller;

import com.hearth.backend.dto.ChatRequest;
import com.hearth.backend.dto.ChatResponse;
import com.hearth.backend.dto.ConversationDto;
import com.hearth.backend.dto.MessageDto;
import com.hearth.backend.model.Conversation;
import com.hearth.backend.model.Message;
import com.hearth.backend.service.MentalHealthService;
import com.hearth.backend.service.ChatService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    MentalHealthService mentalHealthService;
    
    @Autowired
    ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestParam(required = false) Long conversationId,
                                             @Valid @RequestBody ChatRequest request,
                                             Principal principal){
        String email = principal.getName();
        String userMessage = request.getMessage();

        ChatResponse response = mentalHealthService.handleUserMessage(conversationId, email, userMessage);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationDto>> getUserConversations(Principal principal) {
        String email = principal.getName();
        List<Conversation> conversations = chatService.getUserConversations(email);
        
        List<ConversationDto> conversationDtos = conversations.stream()
                .map(conv -> new ConversationDto(
                        conv.getConversationId(),
                        conv.getTitle(),
                        conv.getStartedAt(),
                        conv.getMessages() != null ? conv.getMessages().size() : 0
                ))
                .collect(Collectors.toList());
                
        return ResponseEntity.ok(conversationDtos);
    }
    
    @GetMapping("/conversations/{conversationId}/messages")
    public ResponseEntity<List<MessageDto>> getConversationMessages(
            @PathVariable Long conversationId, 
            Principal principal) {
        String email = principal.getName();
        List<Message> messages = chatService.getConversationMessages(conversationId, email);
        
        List<MessageDto> messageDtos = messages.stream()
                .map(msg -> new MessageDto(
                        msg.getMessageId(),
                        msg.getContent(),
                        msg.getSender().name(),
                        msg.getTimestamp()
                ))
                .collect(Collectors.toList());
                
        return ResponseEntity.ok(messageDtos);
    }
}
