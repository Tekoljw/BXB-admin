"use client"

import { useEffect, useRef } from "react"

interface DigitalRainProps {
  className?: string
}

export default function DigitalRain({ className = "" }: DigitalRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }

    // Digital rain characters (mix of numbers, letters, and symbols)
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ¥€₿∀∃∆∇∈∉∑∏⊂⊃⊕⊗⋀⋁⋂⋃"
    
    // Wait for next tick to ensure canvas is mounted
    setTimeout(() => {
      resizeCanvas()
      initDrops()
      animate()
    }, 100)
    
    window.addEventListener("resize", resizeCanvas)
    
    // Rain drops array
    const drops: Array<{
      x: number
      y: number
      speed: number
      opacity: number
      char: string
    }> = []

    // Initialize drops
    const initDrops = () => {
      const rect = canvas.getBoundingClientRect()
      const columns = Math.floor(rect.width / 20)
      drops.length = 0
      
      for (let i = 0; i < columns; i++) {
        drops.push({
          x: i * 20 + Math.random() * 10,
          y: Math.random() * rect.height,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          char: chars[Math.floor(Math.random() * chars.length)]
        })
      }
    }

    let animationId: number

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      
      // Clear canvas with fade effect for trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Draw rain drops
      drops.forEach((drop, index) => {
        // Random character change for flickering effect
        if (Math.random() < 0.05) {
          drop.char = chars[Math.floor(Math.random() * chars.length)]
        }

        // Draw main character with teal green
        ctx.fillStyle = `rgba(20, 194, 163, ${drop.opacity})`
        ctx.font = "bold 14px 'Courier New', monospace"
        ctx.fillText(drop.char, drop.x, drop.y)
        
        // Add subtle glow effect
        ctx.fillStyle = `rgba(20, 194, 163, ${drop.opacity * 0.5})`
        ctx.font = "bold 16px 'Courier New', monospace"
        ctx.fillText(drop.char, drop.x - 0.5, drop.y - 0.5)

        // Update position
        drop.y += drop.speed
        
        // Reset when off screen
        if (drop.y > rect.height + 50) {
          drop.y = -30 - Math.random() * 100
          drop.x = (index * 20) + Math.random() * 15
          drop.speed = Math.random() * 3 + 1
          drop.opacity = Math.random() * 0.8 + 0.4
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
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