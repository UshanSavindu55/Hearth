package com.hearth.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long conversationId;

    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime startedAt;
}
