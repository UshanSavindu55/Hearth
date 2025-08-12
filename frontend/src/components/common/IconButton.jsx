import React from 'react'

const IconButton = ({ 
  children, 
  onClick, 
  variant = 'ghost',
  size = 'md',
  disabled = false,
  className = '',
  tooltip,
  ...props 
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'text-gray-600 hover:bg-gray-100',
    danger: 'text-red-600 hover:bg-red-50'
  }
  
  const sizes = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  }
  
  const classes = `
    inline-flex items-center justify-center rounded-lg transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]} ${sizes[size]} ${className}
  `
  
  const button = (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
  
  if (tooltip) {
    return (
      <div className="relative group">
        {button}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          {tooltip}
        </div>
      </div>
    )
  }
  
  return button
}

export default IconButton
