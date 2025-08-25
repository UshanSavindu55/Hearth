package com.hearth.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
public class Conversation {

    @Id
    @GeneratedValue
    @Column(updatable = false, nullable = false)
    private UUID conversationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;
    private LocalDateTime startedAt;

    @OneToMany(mappedBy = "conversation")
    private List<Message> messages;
}
