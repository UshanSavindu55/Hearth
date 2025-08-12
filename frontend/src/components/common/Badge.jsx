import React from 'react'

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  dot = false 
}) => {
  const variants = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800'
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  }
  
  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }
  
  if (dot) {
    return (
      <span className={`inline-flex items-center gap-1.5 ${className}`}>
        <span className={`${dotSizes[size]} rounded-full ${variants[variant]}`}></span>
        {children}
      </span>
    )
  }
  
  const classes = `
    inline-flex items-center font-medium rounded-full
    ${variants[variant]} ${sizes[size]} ${className}
  `
  
  return (
    <span className={classes}>
      {children}
    </span>
  )
}

export default Badge
