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
  icon,
  helperText,
  labelVariant = 'default',
  labelSize = 'md',
  ...props 
}, ref) => {
  const inputClasses = `
    w-full px-3 py-2 border rounded-lg text-gray-900 placeholder-gray-500 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
    ${icon ? 'pl-10' : ''}
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
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses.trim()}
          {...props}
        />
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
