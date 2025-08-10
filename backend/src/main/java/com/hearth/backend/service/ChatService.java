package com.hearth.backend.service;

import com.hearth.backend.dto.Emotion;
import com.hearth.backend.repository.ConversationRepository;
import com.hearth.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final CohereService cohereService;
    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;

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

    public String processUserMessage(String message, List<Emotion> emotions) {
        String emotionContext = emotionPromptCreator(emotions);
        String fullPrompt = "You are a compassionate mental health counselor. " +
                "Based on the user's emotions: " + emotionContext + ", " +
                "respond empathetically and thoughtfully to the user's message: \"" + message + "\". " +
                "Provide support and understanding without referring to the emotion data explicitly.";

//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Conversation conversation = conversationRepository.findById(conversationId)
//                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        String botResponse = cohereService.getChatResponse(fullPrompt);
        return botResponse;

    }

}
