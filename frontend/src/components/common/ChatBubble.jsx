import React from 'react';
import { FaUser } from 'react-icons/fa';
import { RiRobotFill } from 'react-icons/ri';

const ChatBubble = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex items-start max-w-md ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isBot ? 'bg-blue-600 mr-2' : 'bg-slate-600 ml-2'}`}>
          {isBot ? <RiRobotFill className="w-4 h-4 text-white" /> : <FaUser className="w-4 h-4 text-white" />}
        </div>
        <div className={`px-3 py-2 rounded-lg ${isBot ? 'bg-slate-700 text-slate-100' : 'bg-blue-600 text-white'}`}>
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
