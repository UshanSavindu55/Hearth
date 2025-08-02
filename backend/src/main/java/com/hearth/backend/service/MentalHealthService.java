package com.hearth.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MentalHealthService {
    private final RestTemplate restTemplate;

    public MentalHealthService(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }



}
