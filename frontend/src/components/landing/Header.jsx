import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, IconButton } from '../common'
import logo from '../../assets/logo.png'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-slate-900 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Hearth Logo" className="w-10 h-10 rounded-xl" />
            <span className="text-2xl font-bold text-white">Hearth</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-indigo-200 hover:text-indigo-500 transition-colors font-medium">
              Features
            </a>
            <a href="#about" className="text-indigo-200 hover:text-indigo-500 transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-indigo-200 hover:text-indigo-500 transition-colors font-medium">
              Contact
            </a>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="md" className="text-indigo-200 hover:text-white">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="md">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <IconButton
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </IconButton>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-700">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-indigo-200 hover:text-indigo-500 transition-colors font-medium">
                Features
              </a>
              <a href="#about" className="text-indigo-200 hover:text-indigo-500 transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="text-indigo-200 hover:text-indigo-500 transition-colors font-medium">
                Contact
              </a>
              <div className="flex flex-col space-y-3 pt-4">
                <Link to="/login">
                  <Button variant="ghost" size="md" fullWidth className="text-indigo-200 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="md" fullWidth>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header