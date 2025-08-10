package com.hearth.backend.service;

import com.hearth.backend.dto.RelevancyResponse;
import com.hearth.backend.exception.MentalHealthServiceException;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class RelevancyDetectionService {
    private final RestTemplate restTemplate;

    public RelevancyDetectionService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    //Method to check the relevancy score of the user prompt
    public double checkRelevancyScore(String message){
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("message", message);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestBody, headers);
        try{
            String relevancyApiUrl = "http://localhost:5000/detect-relevancy";
            ResponseEntity<RelevancyResponse> response = restTemplate.postForEntity(
                    relevancyApiUrl, requestEntity, RelevancyResponse.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                System.out.println("Relevancy Score Received: " + response.getBody().getRelevancy_score());
                return response.getBody().getRelevancy_score();
            }

            System.out.println("No response body or status not OK. Returning 0.0");
            return 0.0;
        }catch (Exception e) {
            throw new MentalHealthServiceException("Failed to connect to mental health service", e);
        }
    }


}
