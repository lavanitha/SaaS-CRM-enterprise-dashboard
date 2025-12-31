import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiBriefcase, 
  FiCheckSquare, 
  FiSettings,
  FiTarget,
  FiUser
} from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: FiHome
    },
    {
      name: 'Leads',
      path: '/leads',
      icon: FiTarget
    },
    {
      name: 'Cases',
      path: '/cases',
      icon: FiBriefcase
    },
    {
      name: 'Tasks',
      path: '/tasks',
      icon: FiCheckSquare
    },
    {
      name: 'Team',
      path: '/team',
      icon: FiUsers
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: FiSettings
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed left-0 top-0 h-full w-64 glass-card border-r border-white/20 p-6 z-40 animate-slide-in">
      {/* Logo/Brand */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <FiUser className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">CRM Pro</h1>
          <p className="text-white/60 text-sm">Professional Suite</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                active 
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-lg' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`text-lg ${active ? 'text-blue-300' : 'text-white/60 group-hover:text-white/80'}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="glass p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
              <FiUser className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-white/60 text-xs">admin@crm.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
