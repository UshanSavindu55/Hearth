package com.hearth.backend.exception;

import com.hearth.backend.service.MentalHealthService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        String field = ex.getBindingResult().getFieldErrors().get(0).getField();
        String message = ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage();

        return ResponseEntity.badRequest().body(
                new ErrorResponse(field, message, HttpStatus.BAD_REQUEST.value())
        );
    }

    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<ErrorResponse> handleEmailAlreadyExists(EmailAlreadyUsedException ex) {
        return ResponseEntity.badRequest().body(
                new ErrorResponse("email", ex.getMessage(), HttpStatus.BAD_REQUEST.value())
        );
    }

    @ExceptionHandler(PasswordMismatchException.class)
    public ResponseEntity<ErrorResponse> handlePasswordMismatch(PasswordMismatchException ex) {
        return ResponseEntity.badRequest().body(
                new ErrorResponse("confirmPassword", ex.getMessage(), HttpStatus.BAD_REQUEST.value())
        );
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ErrorResponse("user", ex.getMessage(), HttpStatus.NOT_FOUND.value())
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new ErrorResponse("login", "Invalid email or password", HttpStatus.UNAUTHORIZED.value())
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        return ResponseEntity.badRequest().body(
                new ErrorResponse("database", "A database error occurred. Possible constraint violation.", HttpStatus.BAD_REQUEST.value())
        );
    }

    @ExceptionHandler(JpaSystemException.class)
    public ResponseEntity<ErrorResponse> handleJpaSystem(JpaSystemException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ErrorResponse("database", "A JPA system error occurred.", HttpStatus.INTERNAL_SERVER_ERROR.value())
        );
    }

    @ExceptionHandler(JwtTokenMissingException.class)
    public ResponseEntity<ErrorResponse> handleJwtMissing(JwtTokenMissingException ex) {
        ErrorResponse error = new ErrorResponse(
                "Authorization",
                "Authentication token is missing or malformed.",
                HttpStatus.UNAUTHORIZED.value()
        );
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InvalidJwtAuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleInvalidJwt(InvalidJwtAuthenticationException ex) {
        ErrorResponse error = new ErrorResponse(
                "Authorization",
                "Authentication token is invalid or expired.",
                HttpStatus.UNAUTHORIZED.value()
        );
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(EmotionServiceException.class)
    public ResponseEntity<ErrorResponse> handleEmotionServiceException(EmotionServiceException ex) {
        ErrorResponse error = new ErrorResponse(
                "emotion",
                "Emotion detection service is temporarily unavailable.",
                HttpStatus.SERVICE_UNAVAILABLE.value()
        );
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(error);
    }

    @ExceptionHandler(MentalHealthServiceException.class)
    public ResponseEntity<ErrorResponse> handleMentalHealthServiceException(MentalHealthServiceException ex) {
        ErrorResponse error = new ErrorResponse(
                "Mental health",
                "Mental health service is temporarily unavailable.",
                HttpStatus.SERVICE_UNAVAILABLE.value()
        );
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ErrorResponse("error", "An unexpected error occurred.", HttpStatus.INTERNAL_SERVER_ERROR.value())
        );
    }
}
