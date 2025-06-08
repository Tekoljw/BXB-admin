"use client"

import { useRef, useEffect } from 'react'

interface NativeButtonProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export default function NativeButton({
  children,
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md'
}: NativeButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const callbackRef = useRef(onClick)

  // Update callback ref when onClick changes
  useEffect(() => {
    callbackRef.current = onClick
  }, [onClick])

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    // Completely native event handling
    const handleClick = () => {
      if (!disabled) {
        // Execute immediately without React's event system
        callbackRef.current()
      }
    }

    // Use capture phase for faster response
    button.addEventListener('mousedown', handleClick, { capture: true, passive: false })
    button.addEventListener('touchstart', handleClick, { capture: true, passive: false })

    // Prevent default React events
    const preventReactEvents = (e: Event) => {
      e.stopPropagation()
      e.preventDefault()
    }
    
    button.addEventListener('click', preventReactEvents, { capture: true })

    return () => {
      button.removeEventListener('mousedown', handleClick, { capture: true })
      button.removeEventListener('touchstart', handleClick, { capture: true })
      button.removeEventListener('click', preventReactEvents, { capture: true })
    }
  }, [disabled])

  const baseStyles = 'font-medium rounded focus:outline-none select-none cursor-pointer'
  
  const variantStyles = {
    primary: 'bg-[#00D4AA] hover:bg-[#00D4AA]/80 text-white',
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
        animation: 'none',
        willChange: 'auto'
      }}
    >
      {children}
    </button>
  )
}