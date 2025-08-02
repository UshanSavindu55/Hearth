package com.hearth.backend.service;

import com.hearth.backend.dto.Emotion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final CohereService cohereService;

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
        String fullPrompt = "Emotions: " + emotionContext + ". User says: " + message
                + "\nRespond empathetically but do not mention the emotion scores.";
        return cohereService.getChatResponse(fullPrompt);
    }

}
