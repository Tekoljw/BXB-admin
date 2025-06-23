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
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Digital rain characters (mix of numbers, letters, and symbols)
    const chars = "01Ɱ†ⰭⱵȻⱾȺ¥€₿₽₹₦₩∃∀∴∵∞∆∇∈∉∋∌∑∏∐∪∩⊂⊃⊆⊇⊊⊋⊕⊗⊙⊛⊜⊝⊞⊟⊠⊡⊢⊣⊤⊥⊦⊧⊨⊩⊪⊫⊬⊭⊮⊯⊰⊱⊲⊳⊴⊵⊶⊷⊸⊹⊺⊻⊼⊽⊾⊿⋀⋁⋂⋃⋄⋅⋆⋇⋈⋉⋊⋋⋌⋍⋎⋏⋐⋑⋒⋓⋔⋕⋖⋗⋘⋙⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋪⋫⋬⋭⋮⋯⋰⋱⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    
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
      const columns = Math.floor(canvas.offsetWidth / 20)
      drops.length = 0
      
      for (let i = 0; i < columns; i++) {
        drops.push({
          x: i * 20,
          y: Math.random() * canvas.offsetHeight,
          speed: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          char: chars[Math.floor(Math.random() * chars.length)]
        })
      }
    }

    initDrops()

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw rain drops
      drops.forEach((drop, index) => {
        // Random character change
        if (Math.random() < 0.05) {
          drop.char = chars[Math.floor(Math.random() * chars.length)]
        }

        // Set color with teal green theme
        const alpha = drop.opacity * 0.8
        ctx.fillStyle = `rgba(20, 194, 163, ${alpha})`
        ctx.font = "14px monospace"
        ctx.fillText(drop.char, drop.x, drop.y)

        // Update position
        drop.y += drop.speed
        
        // Reset when off screen
        if (drop.y > canvas.offsetHeight) {
          drop.y = -20
          drop.x = Math.random() * canvas.offsetWidth
          drop.speed = Math.random() * 3 + 1
          drop.opacity = Math.random() * 0.8 + 0.2
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        width: "100%", 
        height: "100%",
        opacity: 0.3
      }}
    />
  )
}