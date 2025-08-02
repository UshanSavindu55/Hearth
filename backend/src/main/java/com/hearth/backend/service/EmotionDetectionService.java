package com.hearth.backend.service;

import com.hearth.backend.dto.Emotion;
import com.hearth.backend.exception.EmotionServiceException;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class EmotionDetectionService {
    private final RestTemplate restTemplate;

    public EmotionDetectionService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<Emotion> detectEmotion(String message) {
        if (message == null || message.isEmpty()) {
            return List.of(new Emotion("neutral", 1.0));
        }

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("message", message);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            String emotionApiUrl = "http://localhost:5000/detect-emotion";

            ResponseEntity<Map<String, Map<String, Double>>> response = restTemplate.exchange(
                    emotionApiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    new ParameterizedTypeReference<Map<String, Map<String, Double>>>() {}
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Map<String, Double>> responseBody = response.getBody();
                if (responseBody != null && responseBody.containsKey("emotions")) {
                    Map<String, Double> emotionsMap = responseBody.get("emotions");

                    List<Emotion> emotionScores = new ArrayList<>();
                    for (Map.Entry<String, Double> entry : emotionsMap.entrySet()) {
                        emotionScores.add(new Emotion(entry.getKey(), entry.getValue()));
                    }

                    if (!emotionScores.isEmpty()) {
                        return emotionScores;
                    }
                }
            }
            return List.of(new Emotion("neutral", 1.0));
        } catch (Exception e) {
            throw new EmotionServiceException("Failed to connect to emotion detection service", e);
        }
    }
}
