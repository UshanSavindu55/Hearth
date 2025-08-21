import React from 'react';
import { RiRobotFill } from 'react-icons/ri';

const LoadingDots = () => (
  <div className="flex justify-start mb-3">
    <div className="flex items-start">
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
        <RiRobotFill className="w-4 h-4 text-white" />
      </div>
      <div className="bg-slate-700 rounded-lg px-3 py-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingDots;
