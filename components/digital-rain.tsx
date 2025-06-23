"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

interface DigitalRainProps {
  className?: string
}

declare global {
  interface Window {
    initDigitalRain: (canvas: HTMLCanvasElement) => {
      start: () => void
      stop: () => void
      cleanup: () => void
    }
  }
}

export default function DigitalRain({ className = "" }: DigitalRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rainControlRef = useRef<ReturnType<typeof window.initDigitalRain> | null>(null)

  useEffect(() => {
    const initRain = () => {
      const canvas = canvasRef.current
      if (!canvas || !window.initDigitalRain) return

      // Cleanup previous instance
      if (rainControlRef.current) {
        rainControlRef.current.cleanup()
      }

      // Initialize new rain effect
      rainControlRef.current = window.initDigitalRain(canvas)
      rainControlRef.current.start()
    }

    // Check if script is already loaded
    if (window.initDigitalRain) {
      initRain()
    } else {
      // Wait for script to load
      const checkScript = setInterval(() => {
        if (window.initDigitalRain) {
          clearInterval(checkScript)
          initRain()
        }
      }, 100)

      return () => clearInterval(checkScript)
    }

    return () => {
      if (rainControlRef.current) {
        rainControlRef.current.cleanup()
      }
    }
  }, [])

  return (
    <>
      <Script
        src="/digitalrain.js"
        strategy="beforeInteractive"
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{ 
          width: "100%", 
          height: "100%",
          opacity: 0.5,
          zIndex: 1
        }}
      />
    </>
  )
}