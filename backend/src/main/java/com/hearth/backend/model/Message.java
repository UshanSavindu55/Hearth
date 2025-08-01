    package com.hearth.backend.model;

    import jakarta.persistence.*;
    import lombok.Data;
    import java.time.LocalDateTime;

    @Entity
    @Data
    @Table(name = "messages")
    public class Message {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long messageId;

        @ManyToOne
        @JoinColumn(name = "conversation_id", nullable = false)
        private Conversation conversation;

        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

        private String content;
        private LocalDateTime timestamp;

        @Enumerated(EnumType.STRING)
        private Sender sender;

        public enum Sender {
            USER,
            BOT
        }

    }
