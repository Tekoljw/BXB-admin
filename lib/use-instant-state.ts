import { useRef, useCallback } from 'react'

export function useInstantState<T>(initialValue: T) {
  const valueRef = useRef(initialValue)
  const listenersRef = useRef(new Set<(value: T) => void>())

  const setValue = useCallback((newValue: T) => {
    valueRef.current = newValue
    // Immediately notify all listeners
    listenersRef.current.forEach(listener => listener(newValue))
  }, [])

  const subscribe = useCallback((listener: (value: T) => void) => {
    listenersRef.current.add(listener)
    return () => {
      listenersRef.current.delete(listener)
    }
  }, [])

  const getValue = useCallback(() => valueRef.current, [])

  return { getValue, setValue, subscribe }
}