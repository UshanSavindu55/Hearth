package com.hearth.backend.exception;

public class EmotionServiceException extends RuntimeException {
    public EmotionServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}