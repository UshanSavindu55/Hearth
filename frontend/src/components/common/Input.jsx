import React, { forwardRef } from 'react'
import Label from './Label'

const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  placeholder, 
  disabled = false,
  required = false,
  className = '',
  leftIcon,
  rightIcon,
  icon, // backward compatibility - defaults to left
  helperText,
  labelVariant = 'default',
  labelSize = 'md',
  ...props 
}, ref) => {
  // Handle backward compatibility with single icon prop
  const displayLeftIcon = leftIcon || icon
  const displayRightIcon = rightIcon

  const inputClasses = `
    w-full py-2 border rounded-lg text-gray-900 placeholder-gray-500 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
    ${displayLeftIcon ? 'pl-10' : 'pl-3'}
    ${displayRightIcon ? 'pr-10' : 'pr-3'}
    ${className}
  `
  
  return (
    <div className="w-full">
      {label && (
        <Label 
          variant={error ? 'error' : labelVariant}
          size={labelSize}
          required={required}
          disabled={disabled}
          className="mb-1"
        >
          {label}
        </Label>
      )}
      <div className="relative">
        {/* Left Icon */}
        {displayLeftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
            {displayLeftIcon}
          </div>
        )}
        
        {/* Input Field */}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses.trim()}
          {...props}
        />
        
        {/* Right Icon */}
        {displayRightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 z-10">
            {displayRightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
