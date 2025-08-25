import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { FaComments, FaTrash, FaPlus, FaClock } from 'react-icons/fa';
import { chatAPI } from '../../api';

const ConversationList = forwardRef(({ onSelectConversation, currentConversationId, onNewConversation }, ref) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch conversations from API
  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await chatAPI.getConversations();
      
      // Transform the data to match our component's expected format
      const transformedConversations = response.map(conv => ({
        id: conv.conversationId,
        title: conv.title,
        lastMessage: "Click to view conversation", // We'd need to get this from messages
        timestamp: new Date(conv.startedAt),
        messageCount: conv.messageCount || 0
      }));
      
      setConversations(transformedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      // Fallback to empty array on error
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // Expose fetchConversations function to parent component
  useImperativeHandle(ref, () => ({
    refreshConversations: fetchConversations
  }));

  const formatTimestamp = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleDeleteConversation = async (conversationId, event) => {
    event.stopPropagation(); // Prevent triggering the select conversation
    
    console.log('Deleting conversation with ID:', conversationId); // Debug log
    
    try {
      // Delete conversation via API
      await chatAPI.deleteConversation(conversationId);
      
      // Remove from local state after successful deletion
      setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    } catch (error) {
      console.error('Error deleting conversation:', error);
      // You could add a toast notification here to inform the user of the error
    }
  };

  return (
    <div className="bg-slate-800 h-full flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-white">
            Conversations
          </h2>
          <button
            onClick={onNewConversation}
            className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded"
            title="New Conversation"
          >
            <FaPlus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {loading ? (
          <div className="text-center text-slate-400 py-6 text-sm">
            Loading...
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-center text-slate-400 py-6 text-sm">
            No conversations yet
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`
                  p-2.5 rounded cursor-pointer group
                  ${currentConversationId === conversation.id 
                    ? 'bg-slate-700 text-white' 
                    : 'hover:bg-slate-700/50 text-slate-200'
                  }
                `}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">
                      {conversation.title}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => handleDeleteConversation(conversation.id, e)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 ml-2"
                  >
                    <FaTrash className="w-2.5 h-2.5" />
                  </button>
                </div>
                
                <div className="text-xs text-slate-500 mt-1">
                  Started: {formatTimestamp(conversation.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default ConversationList;
