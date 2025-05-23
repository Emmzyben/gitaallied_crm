import React from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';

interface HeaderProps {
  onMenuButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuButtonClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left side - Mobile Menu Button & Search */}
        <div className="flex items-center">
          <button 
            onClick={onMenuButtonClick} 
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          
          <div className="relative ml-4 md:ml-0">
            <div className="flex items-center px-3 py-2 bg-gray-100 rounded-lg">
              <Search size={16} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder-gray-500 w-32 sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Right side - Notifications & User */}
        <div className="flex items-center space-x-4">
          <button 
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div className="border-l border-gray-300 h-6 mx-2 hidden sm:block"></div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <User size={16} className="text-gray-500" />
            </div>
            <div className="ml-2 hidden sm:block">
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;