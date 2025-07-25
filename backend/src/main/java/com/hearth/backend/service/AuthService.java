package com.hearth.backend.service;

import com.hearth.backend.dto.LogInRequest;
import com.hearth.backend.dto.SignUpRequest;
import com.hearth.backend.exception.EmailAlreadyUsedException;
import com.hearth.backend.exception.PasswordMismatchException;
import com.hearth.backend.exception.InvalidCredentialsException;
import com.hearth.backend.model.User;
import com.hearth.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public ResponseEntity<?> signup(SignUpRequest signupRequest) {

        if(!signupRequest.getPassword().equals(signupRequest.getConfirmPassword())) {
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
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    public ResponseEntity<?> login(LogInRequest request) {
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        authenticationManager.authenticate(authToken);
        return ResponseEntity.ok(Map.of("message", "User login successfully"));
    }

//    public ResponseEntity<?> login(LogInRequest request) {
//        Optional<User> extUser = userRepository.findByEmail(request.getEmail());
//        if(extUser.isEmpty()){
//            throw new InvalidCredentialsException("Invalid email or password");
//        }
//
//        User user = extUser.get();
//
//        String rawPassword = request.getPassword();
//        String hashedPassword = user.getPassword();
//
//        boolean passwordsMatch = passwordEncoder.matches(rawPassword, hashedPassword);
//
//        if(!passwordsMatch) {
//            throw new InvalidCredentialsException("Invalid email or password");
//        }
//        return ResponseEntity.ok(Map.of("message", "User login successfully"));
//    }

}
