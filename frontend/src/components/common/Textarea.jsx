import React, { forwardRef } from 'react'
import Label from './Label'

const Textarea = forwardRef(({ 
  label, 
  error, 
  placeholder, 
  disabled = false,
  required = false,
  className = '',
  rows = 3,
  helperText,
  labelVariant = 'default',
  labelSize = 'md',
  ...props 
}, ref) => {
  const textareaClasses = `
    w-full px-3 py-2 border rounded-lg text-gray-900 placeholder-gray-500 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100
    resize-vertical
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
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
      <textarea
        ref={ref}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={textareaClasses.trim()}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
