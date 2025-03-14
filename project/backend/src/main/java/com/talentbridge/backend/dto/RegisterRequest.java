package com.talentbridge.backend.dto;

import com.talentbridge.backend.model.User.UserRole;
import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private UserRole role;
}