import React from 'react'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo */}
          <div className="flex items-center space-x-1">
                    <img src={logo} alt="Hearth Logo" className="w-10 h-10 rounded-xl" />
                    <span className="text-xl font-bold text-indigo-00">Hearth</span>
                  </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-8 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Support
            </a>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            © 2025 Hearth. All rights reserved. Made for mental wellness.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
