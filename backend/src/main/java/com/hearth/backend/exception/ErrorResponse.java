package com.hearth.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ErrorResponse {
    private final String field;
    private final String message;
    private final int status;
    private final LocalDateTime timestamp;

    public ErrorResponse(String field, String message, int status) {
        this.field = field;
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }
}
