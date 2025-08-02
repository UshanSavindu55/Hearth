package com.hearth.backend.exception;

public class MentalHealthServiceException extends RuntimeException {
    public MentalHealthServiceException(String message, Exception e) {
        super(message);
    }
}
