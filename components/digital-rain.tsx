"use client"

import { useEffect } from "react"

interface DigitalRainProps {
  className?: string
}

export default function DigitalRain({ className = "" }: DigitalRainProps) {
  useEffect(() => {
    // Load the digital rain script
    const script = document.createElement('script')
    script.src = '/digitalrain.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup handled by the script itself
      script.remove()
    }
  }, [])

  // The script will create its own canvas element
  return null
}