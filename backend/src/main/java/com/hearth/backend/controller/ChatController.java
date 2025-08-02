package com.hearth.backend.controller;

import com.hearth.backend.dto.ChatRequest;
import com.hearth.backend.dto.ChatResponse;
import com.hearth.backend.dto.Emotion;
import com.hearth.backend.service.ChatService;
import com.hearth.backend.service.EmotionDetectionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private EmotionDetectionService emotionDetectionService;


    @PostMapping
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request, Principal principal){
        String username = principal.getName();
        String userMessage = request.getMessage();


        List<Emotion> emotions = emotionDetectionService.detectEmotion(userMessage);

        String cohereResponse = chatService.processUserMessage(userMessage,emotions);

        ChatResponse response = new ChatResponse(cohereResponse,"neutral");
        return ResponseEntity.ok(response);
    }
}
