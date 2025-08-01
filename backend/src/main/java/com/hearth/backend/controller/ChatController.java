package com.hearth.backend.controller;

import com.hearth.backend.dto.ChatRequest;
import com.hearth.backend.dto.ChatResponse;
import com.hearth.backend.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
//    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request, Principal principal){
        String username = principal.getName();
//        ChatResponse response = chatService.processUserMessage(request.getMessage(), username);
//        return ResponseEntity.ok(response);
        return ResponseEntity.ok((ChatResponse) Map.of(
                "message", "Request reached the chat controller",
                "Condition", "success"));
    }
}
