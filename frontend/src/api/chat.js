// Chat/Messaging API functions
import { apiRequest } from './index'

export const chatAPI = {
  // Get all conversations for the user
  getConversations: async () => {
    return apiRequest('/chat/conversations', {
      method: 'GET',
    })
  },

  // Get messages for a specific conversation
  getMessages: async (conversationId) => {
    return apiRequest(`/chat/conversations/${conversationId}/messages`, {
      method: 'GET',
    })
  },

  // Send a new message
  sendMessage: async (conversationId, messageData) => {
    return apiRequest(`/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify(messageData),
    })
  },

  // Create a new conversation
  createConversation: async (conversationData) => {
    return apiRequest('/chat/conversations', {
      method: 'POST',
      body: JSON.stringify(conversationData),
    })
  },

  // Delete a conversation
  deleteConversation: async (conversationId) => {
    return apiRequest(`/chat/conversations/${conversationId}`, {
      method: 'DELETE',
    })
  },

  // Get emotion analysis for a message
  getEmotionAnalysis: async (messageData) => {
    return apiRequest('/chat/emotion-analysis', {
      method: 'POST',
      body: JSON.stringify(messageData),
    })
  },

  // Search messages
  searchMessages: async (query) => {
    return apiRequest('/chat/search', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
}

export default chatAPI
