package com.talentbridge.backend.service;

import com.talentbridge.backend.dto.LoginRequest;
import com.talentbridge.backend.dto.RegisterRequest;
import com.talentbridge.backend.model.User;
import com.talentbridge.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;

    public User register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In production, password should be hashed
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        return userRepository.findByEmail(request.getEmail())
            .filter(user -> user.getPassword().equals(request.getPassword())) // In production, use proper password comparison
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}