import React from 'react'

const Loading = ({ 
  size = 'md', 
  text = 'Loading...', 
  showText = true,
  className = '',
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }
  
  const content = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`} />
      {showText && (
        <p className="mt-2 text-sm text-gray-600">{text}</p>
      )}
    </div>
  )
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        {content}
      </div>
    )
  }
  
  return content
}

export default Loading
