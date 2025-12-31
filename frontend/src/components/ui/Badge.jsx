import React from 'react';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    secondary: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    success: 'bg-green-500/20 text-green-300 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-300 border-red-500/30',
    info: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    dark: 'bg-gray-800/50 text-gray-200 border-gray-600/30'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const classes = `inline-flex items-center justify-center rounded-full border font-medium backdrop-blur-sm ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;
