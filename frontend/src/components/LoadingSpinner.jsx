import React from 'react'

function LoadingSpinner({ size = 'medium', color = 'rainbow' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  const colorClasses = {
    rainbow: 'text-transparent bg-gradient-to-r from-[#ff6b47] via-[#ff9f1c] to-[#f4d03f] bg-clip-text',
    green: 'text-[#27ae60]',
    orange: 'text-[#ff9f1c]',
    purple: 'text-[#a29bfe]',
    white: 'text-white'
  }

  return (
    <div className={`inline-block ${sizeClasses[size]} animate-spin`} role="status">
      <svg className={`w-full h-full ${colorClasses[color]}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default LoadingSpinner