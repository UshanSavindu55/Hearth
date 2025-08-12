import React from 'react'

const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  fallback,
  className = '',
  online = false 
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl'
  }
  
  const onlineIndicatorSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
    '2xl': 'w-4 h-4'
  }
  
  const classes = `
    inline-flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-medium relative
    ${sizeClasses[size]} ${className}
  `
  
  const content = src ? (
    <img
      src={src}
      alt={alt}
      className={`${classes} object-cover`}
    />
  ) : (
    <div className={classes}>
      {fallback || alt.charAt(0).toUpperCase()}
    </div>
  )
  
  if (online) {
    return (
      <div className="relative inline-block">
        {content}
        <div className={`absolute bottom-0 right-0 ${onlineIndicatorSizes[size]} bg-green-400 border-2 border-white rounded-full`}></div>
      </div>
    )
  }
  
  return content
}

export default Avatar
