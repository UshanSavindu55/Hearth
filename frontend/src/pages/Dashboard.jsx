import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, ChatBubble, ChatInput, LoadingDots, ConversationList } from '../components/common';
import { chatAPI } from '../api';

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
  const conversationListRef = useRef(null);
  const navigate = useNavigate();

  // Check authentication and get user data
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');

      if (!token) {
        navigate('/login');
        return;
      }

      // Use stored user data instead of making API call
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          // If user data is corrupted, redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          navigate('/login');
        }
      } else {
        // If no user data stored, redirect to login
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    };

    checkAuth();
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

    try {
      // Send message to backend using chatAPI
      const response = await chatAPI.sendMessage(messageText, currentConversationId);

      // Add bot response
      const botResponse = {
        id: Date.now() + 1,
        text: response.reply,
        sender: 'bot',
        timestamp: new Date()
      };
      
      // Update conversation ID from response (for new conversations or corrections)
      if (response.conversationId) {
        setCurrentConversationId(response.conversationId);
      }
      
      setMessages(prev => [...prev, botResponse]);

      // Refresh conversation list to include new conversations
      if (conversationListRef.current) {
        conversationListRef.current.refreshConversations();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback response on error
      const errorResponse = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle selecting a conversation
  const handleSelectConversation = async (conversationId) => {
    setCurrentConversationId(conversationId);
    setIsLoading(true);
    
    try {
      // Load messages for this conversation using chatAPI
      const response = await chatAPI.getMessages(conversationId);
      
      // Transform backend messages to frontend format
      const formattedMessages = response.map(msg => ({
        id: msg.messageId,
        text: msg.content,
        sender: msg.sender === 'USER' ? 'user' : 'bot', // Normalize sender values
        timestamp: new Date(msg.timestamp)
      }));
      
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading conversation:', error);
      setMessages([
        {
          id: 1,
          text: "Sorry, I couldn't load this conversation. Please try again.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
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
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <Header user={user} />
      
      {/* Main Content with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Chat Container */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex-1 bg-slate-800 rounded-xl flex flex-col overflow-hidden">
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6" style={{scrollbarWidth: 'thin', scrollbarColor: '#64748b #334155'}}>
              {messages.map((message) => (
                <div key={message.id} className="mb-4">
                  <ChatBubble message={message} />
                </div>
              ))}
              
              {isLoading && (
                <div className="mb-4">
                  <LoadingDots />
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="flex-shrink-0 p-6 pt-0 bg-slate-800">
              <ChatInput 
                onSend={handleSendMessage}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Conversation List Sidebar */}
        <div className="w-72 flex-shrink-0">
          <ConversationList 
            ref={conversationListRef}
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