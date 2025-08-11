import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className="bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-1">
          <img src={logo} alt="Hearth Logo" className="w-10 h-10 rounded-xl" />
          <span className="text-xl font-bold text-white">Hearth</span>
        </div>
          
          {/* CTA Button */}
          <button className="bg-indigo-900 hover:bg-blue-600 text-white px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap">
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header