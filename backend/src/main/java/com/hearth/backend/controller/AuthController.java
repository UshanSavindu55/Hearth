package com.hearth.backend.controller;

import com.hearth.backend.dto.SignUpRequest;
import com.hearth.backend.service.AuthService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService  authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignUpRequest request) {
        System.out.println("Controller: Received signup request for email: " + request.getEmail());
        return ResponseEntity.ok("Request reached controller, stopping here.");

//        return authService.signup(request);
    }
}
