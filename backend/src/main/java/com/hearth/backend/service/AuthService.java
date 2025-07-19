package com.hearth.backend.service;

import com.hearth.backend.dto.LogInRequest;
import com.hearth.backend.dto.SignUpRequest;
import com.hearth.backend.model.User;
import com.hearth.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<?> signup(SignUpRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User();
        user.setName(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    public ResponseEntity<?> login(LogInRequest request) {

        Optional<User> extUser = userRepository.findByEmail(request.getEmail());
        if(extUser.isEmpty()){
            return ResponseEntity.badRequest().body("Error: No user exists for that email.");
        }

        User user = extUser.get();

        String rawPassword = request.getPassword();
        String hashedPassword = user.getPassword();

        boolean passwordsMatch = passwordEncoder.matches(rawPassword, hashedPassword);

        if(!passwordsMatch) {
            return ResponseEntity.badRequest().body("Error: Invalid password.");
        }
        return ResponseEntity.ok("Valid password.");
    }

}
