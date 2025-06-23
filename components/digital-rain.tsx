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

    // Matrix-style characters including Japanese katakana
    const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ012345789ZΞΦΨΩαβγδεζηθικλμνξπρστυφχψωABCDEFGHIJKLMNOPQRSTUVWXYZ$¥€"
    
    let width = 0
    let height = 0
    let columns = 0
    const fontSize = 48
    const drops: Array<{
      y: number
      speed: number
      chars: string[]
      brightness: number[]
    }> = []

    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width
      canvas.height = height
      
      columns = Math.floor(width / fontSize)
      drops.length = 0
      
      // Initialize drops with trails
      for (let i = 0; i < columns; i++) {
        const trailLength = Math.floor(Math.random() * 12) + 4
        drops[i] = {
          y: Math.random() * height - trailLength * fontSize,
          speed: Math.random() * 2 + 0.75,
          chars: Array(trailLength).fill(0).map(() => 
            chars[Math.floor(Math.random() * chars.length)]
          ),
          brightness: Array(trailLength).fill(0).map((_, index) => 
            1 - (index / trailLength) * 0.9
          )
        }
      }
    }

    const draw = () => {
      // Create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)"
      ctx.fillRect(0, 0, width, height)

      ctx.font = `${fontSize}px 'Courier New', monospace`

      // Draw each column
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        const x = i * fontSize

        // Draw each character in the trail
        for (let j = 0; j < drop.chars.length; j++) {
          const y = drop.y - j * fontSize
          
          if (y > 0 && y < height) {
            // Head of the trail is brightest (white/teal)
            if (j === 0) {
              ctx.fillStyle = "#ffffff"
            } else if (j === 1) {
              ctx.fillStyle = "#14C2A3"
            } else {
              // Fade to darker green
              const alpha = drop.brightness[j]
              ctx.fillStyle = `rgba(20, 194, 163, ${alpha})`
            }
            
            // Random character change for flickering effect
            if (Math.random() < 0.02) {
              drop.chars[j] = chars[Math.floor(Math.random() * chars.length)]
            }
            
            ctx.fillText(drop.chars[j], x, y)
          }
        }

        // Move drop down
        drop.y += drop.speed

        // Reset when completely off screen
        if (drop.y - drop.chars.length * fontSize > height) {
          drop.y = -drop.chars.length * fontSize - Math.random() * height
          drop.speed = Math.random() * 2 + 0.75
          
          // Regenerate characters
          for (let j = 0; j < drop.chars.length; j++) {
            drop.chars[j] = chars[Math.floor(Math.random() * chars.length)]
          }
        }
      }
    }

    let animationId: number
    
    const animate = () => {
      draw()
      animationId = requestAnimationFrame(animate)
    }

    // Wait for canvas to be ready
    setTimeout(() => {
      setupCanvas()
      animate()
    }, 100)

    const handleResize = () => {
      setupCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
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
        opacity: 0.5,
        zIndex: 1
      }}
    />
  )
}