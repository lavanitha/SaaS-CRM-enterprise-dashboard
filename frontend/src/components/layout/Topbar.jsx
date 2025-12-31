import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { FiBell, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import Button from '../ui/Button';

const Topbar = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <div className="glass-card border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
            <FiBell className="text-xl" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                <FiUser className="text-white text-sm" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-white text-sm font-medium">{user?.name || 'Admin User'}</p>
                <p className="text-white/60 text-xs">{user?.role || 'admin'}</p>
              </div>
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 glass-card border border-white/20 rounded-lg p-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  <FiLogOut className="text-sm" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
