import React from 'react'
import Label from './Label'

const Dropdown = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  error,
  disabled = false,
  required = false,
  className = '',
  helperText,
  labelVariant = 'default',
  labelSize = 'md'
}) => {
  const selectClasses = `
    w-full px-3 py-2 border rounded-lg text-gray-900 bg-white
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100
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
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={selectClasses.trim()}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}

export default Dropdown
