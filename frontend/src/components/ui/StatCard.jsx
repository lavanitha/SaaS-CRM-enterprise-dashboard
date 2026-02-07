import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import GlassCard from '../ui/GlassCard'

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon, 
  className = '' 
}) => {
  const isPositive = changeType === 'positive';
  const ChangeIcon = isPositive ? FiTrendingUp : FiTrendingDown;
  const changeColor = isPositive ? 'text-green-300' : 'text-red-300';

  return (
    <GlassCard className={`p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-white/60 text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 ${changeColor}`}>
              <ChangeIcon className="text-sm" />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <Icon className="text-blue-300 text-xl" />
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default StatCard;
