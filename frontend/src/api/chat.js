// Chat/Messaging API functions
import { apiRequest } from './index'

export const chatAPI = {
  // Send a message (creating or continuing conversation decides in the backend)
  sendMessage: async (message, conversationId = null) => {
    const url = '/chat';
    
    return apiRequest(url, {
      method: 'POST',
      body: JSON.stringify({ 
        message,
        conversationId 
      }),
    })
  },

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

  // Delete a conversation
  deleteConversation: async (conversationId) => {
    return apiRequest(`/chat/conversations/${conversationId}`, {
      method: 'DELETE',
    })
  },

  // Update conversation title
  updateConversationTitle: async (conversationId, title) => {
    return apiRequest(`/chat/conversations/${conversationId}`, {
      method: 'PUT',
      body: JSON.stringify({ title }),
    })
  },
}

export default chatAPI
