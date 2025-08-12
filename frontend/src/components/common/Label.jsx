    import React from 'react';

const Label = ({ 
  children, 
  htmlFor, 
  required = false, 
  size = 'md', 
  variant = 'default',
  className = '',
  disabled = false,
  ...props 
}) => {
  // Size variants
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  // Color variants
  const variantClasses = {
    default: 'text-slate-700 font-medium',
    other: 'text-indigo-600 font-medium',
    light: 'text-slate-300 font-medium',
    muted: 'text-slate-400 font-medium',
    accent: 'text-indigo-300 font-semibold',
    success: 'text-emerald-300 font-semibold',
    warning: 'text-amber-600 font-semibold',
    error: 'text-red-800 font-semibold',
    // Light theme variants
    'light-default': 'text-gray-900 font-semibold',
    'light-muted': 'text-gray-600 font-medium'
  };

  // Disabled state
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const baseClasses = 'block transition-colors duration-200';
  
  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <label 
      htmlFor={htmlFor} 
      className={combinedClasses}
      {...props}
    >
      {children}
      {required && (
        <span className="text-red-400 ml-1" aria-label="required">
          *
        </span>
      )}
    </label>
  );
};

export default Label;
