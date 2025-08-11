package com.hearth.backend.service;

import com.hearth.backend.model.Conversation;
import com.hearth.backend.model.Message;
import com.hearth.backend.model.User;
import com.hearth.backend.repository.ConversationRepository;
import com.hearth.backend.repository.MessageRepository;
import com.hearth.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ConversationService {
    private final ConversationRepository conversationRepo;
    private final MessageRepository messageRepo;
    private final UserRepository userRepo;

    public ConversationService(ConversationRepository conversationRepo, MessageRepository messageRepo, UserRepository userRepo) {
        this.conversationRepo = conversationRepo;
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
    }

    public Conversation startConversation(String username, String title) {
        User user = userRepo.findByEmail(username).orElseThrow();
        Conversation conversation = new Conversation();
        conversation.setUser(user);
        conversation.setTitle(title);
        conversation.setStartedAt(LocalDateTime.now());
        return conversationRepo.save(conversation);
    }

    public Message saveMessage(Long conversationId, String content, Message.Sender sender) {
        Conversation conv = conversationRepo.findById(conversationId).orElseThrow();
        Message message = new Message();
        message.setConversation(conv);
        message.setContent(content);
        message.setSender(sender);
        return messageRepo.save(message);
    }

    public List<Message> getMessages(Long conversationId) {
        return messageRepo.findByConversationConversationIdOrderByTimestampAsc(conversationId);
    }

}
