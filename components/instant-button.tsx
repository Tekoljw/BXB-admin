"use client"

import { useRef, useEffect, useCallback } from 'react'

interface InstantButtonProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function InstantButton({
  children,
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md'
}: InstantButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Bypass React's synthetic events for instant response
  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleNativeClick = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        onClick()
      }
    }

    // Use native DOM events instead of React events
    button.addEventListener('mousedown', handleNativeClick, { passive: false })
    button.addEventListener('touchstart', handleNativeClick, { passive: false })

    return () => {
      button.removeEventListener('mousedown', handleNativeClick)
      button.removeEventListener('touchstart', handleNativeClick)
    }
  }, [onClick, disabled])

  const baseStyles = 'font-medium rounded focus:outline-none select-none cursor-pointer'
  
  const variantStyles = {
    primary: 'bg-[#00D4AA] hover:bg-[#00D4AA]/80 text-white focus:ring-[#00D4AA]',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
    ghost: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700'
  }
  
  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      type="button"
      style={{
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        transition: 'none',
        animation: 'none'
      }}
    >
      {children}
    </button>
  )
}