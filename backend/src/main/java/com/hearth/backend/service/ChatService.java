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

    public String processUserMessage(String message, List<Emotion> emotions) {
        String emotionContext = emotionPromptCreator(emotions);
        String fullPrompt = "You are a compassionate mental health counselor. " +
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
        String botResponse = processUserMessage(userMessage, emotions);
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
        conversation.setTitle("Conversation started at " + LocalDateTime.now());
        conversationRepo.save(conversation);
        return conversation.getConversationId();
    }

    private boolean isConversationBelongsToUser(Long conversationId, String email) {
        return conversationRepo.findById(conversationId)
                .map(c -> c.getUser().getEmail().equals(email))
                .orElse(false);
    }

}
