import React, { useState, useEffect } from 'react';
import { FaComments, FaTrash, FaPlus, FaClock } from 'react-icons/fa';

const ConversationList = ({ onSelectConversation, currentConversationId, onNewConversation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading] = useState(false);

  // Mock data for conversations - replace with actual API call
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        title: "Feeling anxious about work",
        lastMessage: "Thank you for listening, I feel much better now.",
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        messageCount: 12
      },
      {
        id: 2,
        title: "Stress management",
        lastMessage: "Those breathing exercises really helped.",
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        messageCount: 8
      },
      {
        id: 3,
        title: "Sleep troubles",
        lastMessage: "I'll try the relaxation techniques you suggested.",
        timestamp: new Date(Date.now() - 259200000), // 3 days ago
        messageCount: 15
      },
      {
        id: 4,
        title: "Relationship concerns",
        lastMessage: "That perspective makes a lot of sense.",
        timestamp: new Date(Date.now() - 432000000), // 5 days ago
        messageCount: 20
      }
    ];
    setConversations(mockConversations);
  }, []);

  const formatTimestamp = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const handleDeleteConversation = (conversationId, event) => {
    event.stopPropagation(); // Prevent triggering the select conversation
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
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
                onClick={() => onSelectConversation(conversation)}
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
                    <p className="text-xs text-slate-400 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteConversation(conversation.id, e)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 ml-2"
                  >
                    <FaTrash className="w-2.5 h-2.5" />
                  </button>
                </div>
                
                <div className="text-xs text-slate-500 mt-1">
                  {formatTimestamp(conversation.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
