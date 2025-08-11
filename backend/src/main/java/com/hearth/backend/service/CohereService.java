package com.hearth.backend.service;

import com.cohere.api.Cohere;
import com.cohere.api.requests.ChatRequest;
import com.cohere.api.types.NonStreamedChatResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CohereService {
    private final Cohere cohere;

    public CohereService(@Value("${cohere.api.key}") String apiKey) {
        this.cohere = Cohere.builder()
                .token(apiKey)
                .clientName("hearth-backend")
                .build();
    }

    public String getChatResponse(String prompt) {

        ChatRequest chatRequest = ChatRequest.builder()
                .message(prompt)
                .build();

        NonStreamedChatResponse response = cohere.chat(chatRequest);
        return response.getText();
    }

}
