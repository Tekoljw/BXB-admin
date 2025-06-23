"use client"

import { useEffect, useRef } from "react"

interface DigitalRainProps {
  className?: string
}

export default function DigitalRain({ className = "" }: DigitalRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    const loadAndInitialize = async () => {
      if (!canvasRef.current) return

      // Load the script if not already loaded
      if (!scriptLoadedRef.current) {
        const script = document.createElement('script')
        script.src = '/digitalrain.js'
        script.async = true
        
        await new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
        
        scriptLoadedRef.current = true
      }

      // Wait a bit for the script to initialize
      setTimeout(() => {
        // The digital rain script will automatically create and manage its canvas
        // We just need to ensure our canvas element is properly sized and positioned
        const canvas = canvasRef.current
        if (canvas) {
          const rect = canvas.parentElement?.getBoundingClientRect()
          if (rect) {
            canvas.width = rect.width
            canvas.height = rect.height
            canvas.style.width = rect.width + 'px'
            canvas.style.height = rect.height + 'px'
          }
        }
      }, 500)
    }

    loadAndInitialize().catch(console.error)

    return () => {
      // Cleanup will be handled by the original script
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        width: "100%", 
        height: "100%",
        opacity: 0.6,
        zIndex: 1
      }}
    />
  )
}