import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaCog } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Header = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getUserInitial = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-2">
      <div className="flex justify-between items-center">
        {/* Logo and Site Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Hearth Logo" className="w-8 h-8 rounded-lg" />
          <span className="text-xl font-bold text-white">
            Hearth
          </span>
        </div>

        {/* User Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 hover:bg-slate-700 rounded-lg p-1.5"
          >
            {/* User Avatar Circle */}
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              {getUserInitial()}
            </div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.username || 'User'}</p>
                <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
              </div>
              
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                <FaUser className="w-4 h-4" />
                <span>Profile</span>
              </button>
              
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                <FaCog className="w-4 h-4" />
                <span>Settings</span>
              </button>
              
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center space-x-2"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
