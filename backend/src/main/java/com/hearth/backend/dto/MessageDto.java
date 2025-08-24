package com.hearth.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private Long messageId;
    private String content;
    private String sender;
    private LocalDateTime timestamp;
}
