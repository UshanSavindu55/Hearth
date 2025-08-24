package com.hearth.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConversationDto {
    private Long conversationId;
    private String title;
    private LocalDateTime startedAt;
    private int messageCount;
}
