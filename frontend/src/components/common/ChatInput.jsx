import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-slate-700 bg-slate-800 p-3">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          disabled={disabled}
          className="flex-1 px-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoSend className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
