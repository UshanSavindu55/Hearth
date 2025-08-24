package com.hearth.backend.service;

import com.hearth.backend.dto.Emotion;
import com.hearth.backend.model.Conversation;
import com.hearth.backend.model.Message;
import com.hearth.backend.model.User;
import com.hearth.backend.repository.ConversationRepository;
import com.hearth.backend.repository.MessageRepository;
import com.hearth.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final CohereService cohereService;
    private final UserRepository userRepo;
    private final ConversationRepository conversationRepo;
    private final MessageRepository messageRepository;

    private String emotionPromptCreator(List<Emotion> emotions) {
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

    public String processUserMessage(Long conversationId, String message, List<Emotion> emotions) {
        List<Message> recentMessages = messageRepository.findTop4ByConversation_ConversationIdOrderByTimestampDesc(conversationId);
        Collections.reverse(recentMessages);

        StringBuilder chatHistory = new StringBuilder();
        for (Message m : recentMessages) {
            chatHistory.append(m.getSender().name())
                    .append(": ")
                    .append(m.getContent())
                    .append("\n");
        }

        String emotionContext = emotionPromptCreator(emotions);

        String fullPrompt = "You are a compassionate mental health counselor. " +
                "Conversation so far:\n" + chatHistory.toString() + "\n" +
                "Based on the user's emotions: " + emotionContext + ", " +
                "respond empathetically and thoughtfully to the user's message: \"" + message + "\". " +
                "Provide support and understanding without referring to the emotion data explicitly.";

        return cohereService.getChatResponse(fullPrompt);
    }

    public void saveMessage(Long conversationId, String content, Message.Sender sender) {
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

    public String processUserMessageAndSaveResponse(Long conversationId, String userMessage, List<Emotion> emotions) {
        String botResponse = processUserMessage(conversationId, userMessage, emotions);
        saveMessage(conversationId, botResponse, Message.Sender.BOT);
        return botResponse;
    }

    public Long getOrCreateConversation(Long conversationId, String email){
        if(conversationId == null){
            return createConversationForUser(email);
        } else{
            if (!isConversationBelongsToUser(conversationId, email)) {
                throw new IllegalArgumentException("Conversation does not belong to user");
            }
            return conversationId;
        }
    }
    private Long createConversationForUser(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));

        Conversation conversation = new Conversation();
        conversation.setUser(user);
        conversation.setStartedAt(LocalDateTime.now());
        conversation.setTitle("New Conversation"); // Temporary title
        conversationRepo.save(conversation);
        return conversation.getConversationId();
    }

    private boolean isConversationBelongsToUser(Long conversationId, String email) {
        return conversationRepo.findById(conversationId)
                .map(c -> c.getUser().getEmail().equals(email))
                .orElse(false);
    }
    
    public List<Conversation> getUserConversations(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));
        return conversationRepo.findByUserOrderByStartedAtDesc(user);
    }
    
    public List<Message> getConversationMessages(Long conversationId, String email) {
        if (!isConversationBelongsToUser(conversationId, email)) {
            throw new IllegalArgumentException("Conversation does not belong to user");
        }
        return messageRepository.findByConversationConversationIdOrderByTimestampAsc(conversationId);
    }
    
    public void updateConversationTitle(Long conversationId, String userMessage) {
        Optional<Conversation> conversationOpt = conversationRepo.findById(conversationId);
        if (conversationOpt.isPresent()) {
            Conversation conversation = conversationOpt.get();
            
            // Only update if it's still the default title
            if ("New Conversation".equals(conversation.getTitle())) {
                String title = generateTitleFromMessage(userMessage);
                conversation.setTitle(title);
                conversationRepo.save(conversation);
            }
        }
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

}
