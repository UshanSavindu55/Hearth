package com.hearth.backend.controller;

import com.hearth.backend.dto.ChatRequest;
import com.hearth.backend.dto.ChatResponse;
import com.hearth.backend.service.MentalHealthService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    MentalHealthService mentalHealthService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestParam(required = false) Long conversationId,
                                             @Valid @RequestBody ChatRequest request,
                                             Principal principal){
        String email = principal.getName();
        String userMessage = request.getMessage();

        ChatResponse response = mentalHealthService.handleUserMessage(conversationId, email, userMessage);
        return ResponseEntity.ok(response);
    }
}
