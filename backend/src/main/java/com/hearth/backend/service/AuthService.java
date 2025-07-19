package com.hearth.backend.service;

import com.hearth.backend.dto.SignUpRequest;
import com.hearth.backend.model.User;
import com.hearth.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> signup(SignUpRequest signupRequest) {

        System.out.println("📥 Received signup request: " + signupRequest);
        return ResponseEntity.ok(signupRequest);
//        User user = new User();
//        user.setName(signupRequest.getName());
//        user.setEmail(signupRequest.getEmail());
//        user.setPassword(signupRequest.getPassword());
//
//        userRepository.save(user);
//
//        return ResponseEntity.ok("User registered successfully");
    }
}
