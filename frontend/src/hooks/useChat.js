import { useState, useEffect, useRef } from 'react'
import { chatAPI } from '../api'

// Custom hook for managing chat functionality
export const useChat = (conversationId) => {
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true)
        const data = await chatAPI.getConversations()
        setConversations(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadConversations()
  }, [])

  // Load messages for specific conversation
  useEffect(() => {
    if (conversationId) {
      const loadMessages = async () => {
        try {
          setLoading(true)
          const data = await chatAPI.getMessages(conversationId)
          setMessages(data)
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }

      loadMessages()
    }
  }, [conversationId])

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Send message function
  const sendMessage = async (content) => {
    if (!content.trim() || !conversationId) return

    try {
      const messageData = { content, timestamp: new Date().toISOString() }
      
      // Optimistically add message to UI
      setMessages(prev => [...prev, { ...messageData, id: Date.now(), sending: true }])
      
      // Send to API
      const response = await chatAPI.sendMessage(conversationId, messageData)
      
      // Replace optimistic message with real one
      setMessages(prev => 
        prev.map(msg => 
          msg.sending ? response : msg
        )
      )
      
      setNewMessage('')
    } catch (err) {
      setError(err.message)
      // Remove failed message
      setMessages(prev => prev.filter(msg => !msg.sending))
    }
  }

  // Create new conversation
  const createConversation = async (title) => {
    try {
      const response = await chatAPI.createConversation({ title })
      setConversations(prev => [...prev, response])
      return response
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    messages,
    conversations,
    loading,
    error,
    newMessage,
    setNewMessage,
    sendMessage,
    createConversation,
    messagesEndRef,
    clearError: () => setError(null)
  }
}

export default useChat
