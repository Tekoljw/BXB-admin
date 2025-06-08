"use client"

import { memo, useCallback } from 'react'

interface OptimizedButtonProps {
  children: React.ReactNode
  onClick: () => void
  className?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const OptimizedButton = memo(({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  variant = 'primary',
  size = 'md'
}: OptimizedButtonProps) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      onClick()
    }
  }, [onClick, disabled])

  const baseStyles = 'font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 btn-optimized no-delay transform-optimized'
  
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
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  )
})

OptimizedButton.displayName = 'OptimizedButton'

export default OptimizedButton