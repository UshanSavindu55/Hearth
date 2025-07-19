package com.hearth.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@ToString(exclude = "password")
public class LogInRequest {
    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    private String password;
}
