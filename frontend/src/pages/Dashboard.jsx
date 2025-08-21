import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, ChatBubble, ChatInput, LoadingDots, ConversationList } from '../components/common';

// Main Dashboard Component
const MentalHealthChatbot = () => {
  const [user, setUser] = useState(null);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to listen and support you. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Check authentication and get user data
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Thank you for sharing that with me. Can you tell me more about how you're feeling?",
        "I hear you. It's important to acknowledge these feelings. What would help you feel better right now?",
        "That sounds challenging. You're brave for reaching out. What support do you need today?",
        "I understand. Remember that it's okay to feel this way. What usually helps you when you feel like this?",
        "Your feelings are valid. Let's work through this together. What's one small thing that might help right now?"
      ];
      
      const botResponse = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conversation) => {
    setCurrentConversationId(conversation.id);
    // In a real app, you would load the messages for this conversation
    // For now, we'll just show a placeholder message
    setMessages([
      {
        id: 1,
        text: `Loading conversation: "${conversation.title}"`,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  // Handle creating a new conversation
  const handleNewConversation = () => {
    setCurrentConversationId(null);
    setMessages([
      {
        id: 1,
        text: "Hello! I'm here to listen and support you. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  // Show loading screen while checking authentication
  if (!user) {
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <Header user={user} />
      
      {/* Main Content with Sidebar */}
      <div className="flex-1 flex">
        
        {/* Chat Container */}
        <div className="flex-1 p-6">
          <div className="h-full bg-slate-800 rounded-xl flex flex-col">
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              
              {isLoading && <LoadingDots />}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 pt-0">
              <ChatInput 
                onSend={handleSendMessage}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Conversation List Sidebar */}
        <div className="w-72">
          <ConversationList 
            onSelectConversation={handleSelectConversation}
            currentConversationId={currentConversationId}
            onNewConversation={handleNewConversation}
          />
        </div>

      </div>
    </div>
  );
};

export default MentalHealthChatbot;