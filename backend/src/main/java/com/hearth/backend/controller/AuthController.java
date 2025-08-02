package com.hearth.backend.controller;

import com.hearth.backend.dto.LogInRequest;
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
        return authService.signup(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LogInRequest request){
        return authService.login(request);
    }
}
