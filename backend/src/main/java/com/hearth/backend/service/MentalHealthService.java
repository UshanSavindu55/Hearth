package com.hearth.backend.service;

import com.hearth.backend.dto.ChatResponse;
import com.hearth.backend.dto.Emotion;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MentalHealthService {
    private final EmotionDetectionService emotionDetectionService;
    private final RelevancyDetectionService relevancyDetectionService;
    private final ChatService chatService;

    public MentalHealthService(ChatService chatService,
                               RelevancyDetectionService relevancyDetectionService,
                               EmotionDetectionService emotionDetectionService) {
        this.chatService = chatService;
        this.relevancyDetectionService = relevancyDetectionService;
        this.emotionDetectionService = emotionDetectionService;
    }

    //Handling the user prompt with the relevant business logics
    public ChatResponse handleUserMessage(String username, String userMessage){
        double relevancy_score = relevancyDetectionService.checkRelevancyScore(userMessage);
        if(relevancy_score > 0.5){
            List<Emotion> emotions = emotionDetectionService.detectEmotion(userMessage);
            String cohereResponse = chatService.processUserMessage(userMessage, emotions);
            return new ChatResponse(cohereResponse);
        }
        else if(relevancy_score >= 0.4){
            return new ChatResponse("I’m here to listen. Could you share a bit more about how this situation makes you feel?");
        }
        else {
            return new ChatResponse("It’s important to talk about what’s on your mind. Could you please ask a question related to your mental health?");
        }
    }


}
