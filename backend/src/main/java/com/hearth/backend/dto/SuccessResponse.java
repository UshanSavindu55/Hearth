package com.hearth.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@AllArgsConstructor
public class SuccessResponse {
    private final String action;
    private final String message;
    private final int status;
    private final LocalDateTime timestamp;
    private final Map<String, Object> data;

    public SuccessResponse(String action, String message, int status) {
        this.action = action;
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
        this.data = null;
    }

    public SuccessResponse(String action, String message, int status, Map<String, Object> data) {
        this.action = action;
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
        this.data = data;
    }
}
