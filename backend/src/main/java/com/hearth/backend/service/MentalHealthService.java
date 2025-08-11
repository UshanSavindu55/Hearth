package com.hearth.backend.service;

import com.hearth.backend.dto.ChatResponse;
import com.hearth.backend.dto.Emotion;

import com.hearth.backend.model.Message;
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
    public ChatResponse handleUserMessage(Long conversationId, String email, String userMessage){
        Long convId = chatService.getOrCreateConversation(conversationId, email);
        double relevancy_score = relevancyDetectionService.checkRelevancyScore(userMessage);
        String botResponse;
        if(relevancy_score > 0.5){
            List<Emotion> emotions = emotionDetectionService.detectEmotion(userMessage);
            chatService.saveMessage(convId, userMessage, Message.Sender.USER);
            botResponse = chatService.processUserMessageAndSaveResponse(convId, userMessage, emotions);
        }
        else if(relevancy_score >= 0.4){
            botResponse = "I’m here to listen. Could you share a bit more about how this situation makes you feel?";
            chatService.saveMessage(convId, botResponse, Message.Sender.BOT);
        }
        else {
            botResponse = "It’s important to talk about what’s on your mind. Could you please ask a question related to your mental health?";
            chatService.saveMessage(convId, botResponse, Message.Sender.BOT);
        }

        return new ChatResponse(botResponse);
    }


}
