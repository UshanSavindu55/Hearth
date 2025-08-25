package com.hearth.backend.service;

import com.hearth.backend.model.Conversation;
import com.hearth.backend.model.Message;
import com.hearth.backend.model.User;
import com.hearth.backend.repository.ConversationRepository;
import com.hearth.backend.repository.MessageRepository;
import com.hearth.backend.repository.UserRepository;
import com.hearth.backend.dto.Emotion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final UserRepository userRepo;
    private final ConversationRepository conversationRepo;
    private final MessageRepository messageRepository;

    /** Get existing conversation or create a new one with UUID */
    public UUID getOrCreateConversation(UUID conversationId, String email, String firstMessage) {
        if (conversationId == null) {
            return createConversationForUser(email, firstMessage);
        } else if (!conversationBelongsToUser(conversationId, email)) {
            throw new IllegalArgumentException("Conversation does not belong to user");
        }
        return conversationId;
    }

    /** Create a new conversation with UUID and set title from first message */
    private UUID createConversationForUser(String email, String firstMessage) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));

        Conversation conversation = new Conversation();
        conversation.setUser(user);
        conversation.setStartedAt(LocalDateTime.now());
        conversation.setTitle(generateTitleFromMessage(firstMessage)); // Set title from first message

        conversationRepo.save(conversation); // UUID is generated automatically
        return conversation.getConversationId(); // returns UUID
    }

    /** Check if conversation belongs to user */
    public boolean conversationBelongsToUser(UUID conversationId, String email) {
        return conversationRepo.findById(conversationId)
                .map(c -> c.getUser().getEmail().equals(email))
                .orElse(false);
    }

    /** Save a message to a conversation */
    public void saveMessage(UUID conversationId, String content, Message.Sender sender) {
        Optional<Conversation> conversationOpt = conversationRepo.findById(conversationId);
        if (conversationOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid conversation ID: " + conversationId);
        }
        Conversation conversation = conversationOpt.get();
        User user = conversation.getUser();

        Message message = new Message();
        message.setConversation(conversation);
        message.setUser(user);
        message.setContent(content);
        message.setSender(sender);
        message.setTimestamp(LocalDateTime.now());

        messageRepository.save(message);
    }

    /** Build chat history string (recent messages) */
    public String buildChatHistory(UUID conversationId, int messageCount) {
        List<Message> recentMessages;
        if (messageCount == 4) {
            recentMessages = messageRepository.findTop4ByConversation_ConversationIdOrderByTimestampDesc(conversationId);
        } else {
            recentMessages = messageRepository.findTop8ByConversation_ConversationIdOrderByTimestampDesc(conversationId);
        }
        Collections.reverse(recentMessages);

        StringBuilder chatHistory = new StringBuilder();
        for (Message m : recentMessages) {
            String senderName = m.getSender() == Message.Sender.USER ? "User" : "Assistant";
            chatHistory.append(senderName).append(": ").append(m.getContent()).append("\n");
        }
        return chatHistory.toString();
    }

    /** Convert emotions to string for prompt */
    public String emotionPromptCreator(List<Emotion> emotions) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < emotions.size(); i++) {
            Emotion e = emotions.get(i);
            sb.append(e.getEmotion())
                    .append(":")
                    .append(String.format("%.2f", e.getScore()));
            if (i < emotions.size() - 1) {
                sb.append(", ");
            }
        }
        return sb.toString();
    }

    private String generateTitleFromMessage(String message) {
        // Clean and truncate the message for the title
        String cleaned = message.trim();
        
        // Remove common starting phrases
        cleaned = cleaned.replaceAll("(?i)^(I am |I'm |I feel |I think |I have |I want |I need |I don't |I can't |I was |I will |I would )", "");
        
        // Truncate to reasonable length
        if (cleaned.length() > 30) {
            cleaned = cleaned.substring(0, 30).trim();
            // Try to break at word boundary
            int lastSpace = cleaned.lastIndexOf(' ');
            if (lastSpace > 15) {
                cleaned = cleaned.substring(0, lastSpace);
            }
            cleaned += "...";
        }
        
        // Capitalize first letter
        if (!cleaned.isEmpty()) {
            cleaned = cleaned.substring(0, 1).toUpperCase() + cleaned.substring(1);
        }
        
        // Fallback if cleaning resulted in empty string
        if (cleaned.isEmpty() || cleaned.length() < 3) {
            return "Mental Health Chat";
        }
        
        return cleaned;
    }

    /** Get all conversations for a user */
    public List<Conversation> getUserConversations(String email) {
        User user = findUserByEmail(email);
        return conversationRepo.findByUserOrderByStartedAtDesc(user);
    }
    
    /** Get all messages in a conversation */
    public List<Message> getConversationMessages(UUID conversationId, String email) {
        if (!conversationBelongsToUser(conversationId, email)) {
            throw new IllegalArgumentException("Conversation does not belong to user");
        }
        return messageRepository.findByConversationConversationIdOrderByTimestampAsc(conversationId);
    }
    
    /** Delete a conversation and all its messages */
    @Transactional
    public void deleteConversation(UUID conversationId, String email) {
        if (!conversationBelongsToUser(conversationId, email)) {
            throw new IllegalArgumentException("Conversation does not belong to user");
        }
        
        // Delete all messages first (if not cascaded)
        messageRepository.deleteByConversationConversationId(conversationId);
        
        // Then delete the conversation
        conversationRepo.deleteById(conversationId);
    }
    
    private User findUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));
    }

}
