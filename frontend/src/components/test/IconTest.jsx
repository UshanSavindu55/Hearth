import React from 'react'
import { MdEmail, MdLock } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'

const IconTest = () => {
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Icon Test</h2>
      
      <div className="space-y-4">
        <div>
          <p>Direct icon rendering:</p>
          <MdEmail className="w-5 h-5 text-blue-500" />
          <MdLock className="w-5 h-5 text-green-500" />
          <FaUser className="w-5 h-5 text-red-500" />
        </div>
        
        <div>
          <p>Icon in a container:</p>
          <div className="flex items-center space-x-2">
            <MdEmail className="w-5 h-5 text-blue-500" />
            <span>Email icon</span>
          </div>
        </div>
        
        <div>
          <p>Icon with absolute positioning test:</p>
          <div className="relative w-64 h-10 border border-gray-300 rounded">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
              <MdEmail className="w-5 h-5" />
            </div>
            <input 
              className="w-full h-full pl-10 pr-3 border-0 rounded focus:outline-none"
              placeholder="Test input with icon"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IconTest
