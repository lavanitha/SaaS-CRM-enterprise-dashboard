import React from 'react';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'p-6',
  onClick,
  style = {}
}) => {
  const baseClasses = `glass-card ${padding} ${className}`;
  const hoverClasses = hover ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassCard;
