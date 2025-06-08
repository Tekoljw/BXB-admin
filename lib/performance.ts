// Performance optimization utilities
import { useCallback, useMemo } from 'react'

// Debounce function for button clicks and input changes
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for scroll and resize events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Optimized button click handler
export const useOptimizedClick = (
  onClick: () => void,
  delay: number = 150
) => {
  return useCallback(
    debounce(() => {
      onClick()
    }, delay),
    [onClick, delay]
  )
}

// Memoized style calculation
export const useOptimizedStyles = (
  condition: boolean,
  activeStyles: string,
  inactiveStyles: string
) => {
  return useMemo(() => {
    return condition ? activeStyles : inactiveStyles
  }, [condition, activeStyles, inactiveStyles])
}

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
}