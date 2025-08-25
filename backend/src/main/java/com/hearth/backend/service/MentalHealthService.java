package com.hearth.backend.service;

import com.hearth.backend.dto.Emotion;
import com.hearth.backend.model.Message;
import com.hearth.backend.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class MentalHealthService {
    private final EmotionDetectionService emotionDetectionService;
    private final RelevancyDetectionService relevancyDetectionService;
    private final CohereService cohereService;
    private final MessageRepository messageRepository;

    public MentalHealthService(RelevancyDetectionService relevancyDetectionService,
                               EmotionDetectionService emotionDetectionService,
                               CohereService cohereService,
                               MessageRepository messageRepository) {
        this.relevancyDetectionService = relevancyDetectionService;
        this.emotionDetectionService = emotionDetectionService;
        this.cohereService = cohereService;
        this.messageRepository = messageRepository;
    }

    // Method called by ChatService to process message with mental health analysis
    public String processMessageWithContext(UUID conversationId, String userMessage, String email) {
        // Step 1: Check relevancy score
        double relevancy_score = relevancyDetectionService.checkRelevancyScore(userMessage);
        
        if(relevancy_score > 0.5){
            // Step 2: Analyze emotions for high relevancy messages
            List<Emotion> emotions = emotionDetectionService.detectEmotion(userMessage);
            
            // Step 3: Build chat history and generate contextual response
            return generateContextualResponse(conversationId, userMessage, emotions);
        }
        else if(relevancy_score >= 0.4){
            return "I'm here to listen. Could you share a bit more about how this situation makes you feel?";
        }
        else {
            return "It's important to talk about what's on your mind. Could you please ask a question related to your mental health?";
        }
    }

    private String generateContextualResponse(UUID conversationId, String userMessage, List<Emotion> emotions) {
        // Build chat history for context
        String chatHistory = buildChatHistory(conversationId, 8);
        String emotionContext = emotionPromptCreator(emotions);

        String fullPrompt = "You are a compassionate mental health counselor named Hearth. " +
                "You are having an ongoing conversation with a user who is seeking emotional support. " +
                "\n\nConversation history:\n" + chatHistory + 
                "\nThe user's current emotional state shows: " + emotionContext + 
                "\n\nPlease respond empathetically and supportively to continue this conversation. " +
                "Build upon what has been discussed previously, acknowledge their feelings, and provide helpful guidance. " +
                "Keep your response conversational and avoid mentioning the emotion analysis directly.";

        return cohereService.getChatResponse(fullPrompt);
    }

    private String buildChatHistory(UUID conversationId, int messageCount) {
        List<Message> recentMessages;
        if (messageCount == 4) {
            recentMessages = messageRepository.findTop4ByConversation_ConversationIdOrderByTimestampDesc(conversationId);
        } else {
            recentMessages = messageRepository.findTop8ByConversation_ConversationIdOrderByTimestampDesc(conversationId);
        }
        Collections.reverse(recentMessages);

        StringBuilder chatHistory = new StringBuilder();
        for (Message m : recentMessages) {
            String senderName = m.getSender() == Message.Sender.USER ? "User" : "Assistant";
            chatHistory.append(senderName)
                    .append(": ")
                    .append(m.getContent())
                    .append("\n");
        }
        return chatHistory.toString();
    }

    private String emotionPromptCreator(List<Emotion> emotions) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < emotions.size(); i++) {
            Emotion e = emotions.get(i);
            sb.append(e.getEmotion())
                    .append(":")
                    .append(String.format("%.2f", e.getScore()));
            if (i < emotions.size() - 1) {
                sb.append(", ");
            }
        }
        return sb.toString();
    }

}
