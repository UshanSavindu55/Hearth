import React from 'react'
import { Button } from './index'

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  title = "Success!", 
  subtitle = "", 
  message = "", 
  buttonText = "Continue",
  buttonAction = null 
}) => {
  if (!isOpen) return null

  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction()
    } else {
      onClose()
    }
  }

  return (
    <div className="text-center py-12">
      {/* Success Icon with improved styling */}
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 border-2 border-green-400/30 backdrop-blur-sm mb-8 shadow-lg">
        <svg className="h-10 w-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      {/* Title with improved typography */}
      <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent mb-4">
        {title}
      </h3>
      
      {/* Subtitle */}
      {subtitle && (
        <p className="text-slate-800 mb-2 text-lg font-medium">{subtitle}</p>
      )}
      
      {/* Message with better spacing */}
      {message && (
        <p className="text-slate-700 mb-10 leading-relaxed max-w-sm mx-auto">
          {message}
        </p>
      )}
      
      {/* Action Button matching the form style */}
      <Button
        onClick={handleButtonClick}
        variant="primary"
        size="lg"
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl border border-green-400/20"
      >
        {buttonText}
      </Button>
      
      {/* Subtle decorative element */}
      <div className="mt-8 flex justify-center">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
      </div>
    </div>
  )
}

export default SuccessModal
