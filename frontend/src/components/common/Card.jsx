import React from 'react'

const Card = ({ 
  children, 
  className = '', 
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  border = true,
  hover = false,
  bgColor = 'bg-white',
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }
  
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl'
  }
  
  const borderClass = border ? 'border border-gray-200' : ''
  const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-200' : ''
  
  const classes = `
    ${bgColor}
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${roundedClasses[rounded]}
    ${borderClass}
    ${hoverClass}
    ${className}
  `.trim()
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Card
