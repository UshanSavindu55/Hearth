package com.hearth.backend.service;

import com.hearth.backend.dto.LogInRequest;
import com.hearth.backend.dto.SignUpRequest;
import com.hearth.backend.dto.SuccessResponse;
import com.hearth.backend.security.JwtService;
import com.hearth.backend.exception.EmailAlreadyUsedException;
import com.hearth.backend.exception.PasswordMismatchException;
import com.hearth.backend.model.User;
import com.hearth.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    public ResponseEntity<?> signup(SignUpRequest signupRequest) {
        if (!signupRequest.getPassword().equals(signupRequest.getConfirmPassword())) {
            throw new PasswordMismatchException("Passwords do not match");
        }

        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            throw new EmailAlreadyUsedException("Email is already in use");
        }

        User user = new User();
        user.setName(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        userRepository.save(user);
        
        SuccessResponse response = new SuccessResponse(
            "signup",
            "User registered successfully",
            HttpStatus.OK.value()
        );
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> login(LogInRequest request) {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

        Authentication authentication = authenticationManager.authenticate(authToken);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String token = jwtService.generateToken(userDetails.getUsername());

        // Get user information to include in response
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create user data map (excluding sensitive information)
        Map<String, Object> userData = Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "name", user.getName()
        );

        SuccessResponse response = new SuccessResponse(
            "login",
            "User authenticated successfully",
            HttpStatus.OK.value(),
            Map.of(
                "token", token,
                "user", userData
            )
        );
        return ResponseEntity.ok(response);
    }
}




