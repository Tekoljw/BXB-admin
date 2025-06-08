"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function NavigationLoader() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    // 模拟路由变化时的加载状态
    handleStart()
    const timer = setTimeout(handleComplete, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-0.5 bg-blue-500 animate-pulse" 
           style={{
             animation: "loading 1s ease-in-out infinite",
             background: "linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)",
           }}>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}