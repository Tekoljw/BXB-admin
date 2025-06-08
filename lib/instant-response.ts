// Instant response utilities for eliminating button delays
export const enableInstantResponse = () => {
  // Override all CSS transitions immediately
  const style = document.createElement('style')
  style.innerHTML = `
    * {
      transition: none !important;
      animation: none !important;
      transition-delay: 0ms !important;
      transition-duration: 0ms !important;
    }
    
    button:active {
      transform: scale(0.98) !important;
    }
  `
  document.head.appendChild(style)
}

export const createInstantHandler = (callback: () => void) => {
  return (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Immediate visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.transform = 'scale(0.98)'
      requestAnimationFrame(() => {
        e.currentTarget.style.transform = 'scale(1)'
      })
    }
    
    // Execute callback immediately
    callback()
  }
}

// Force immediate state updates
export const forceImmediate = (setState: (value: any) => void, value: any) => {
  setState(value)
  // Force React to flush synchronously
  ;(globalThis as any).flushSync?.(() => {
    setState(value)
  })
}