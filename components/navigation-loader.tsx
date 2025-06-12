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
      <div className="h-1 bg-gradient-to-r from-[#00D4AA] to-[#3B82F6] animate-pulse" 
           style={{
             animation: "loading 1s ease-in-out infinite",
           }}>
      </div>
      <style jsx>{`
        @keyframes loading {
          0% { 
            width: 0%; 
            background: linear-gradient(90deg, #00D4AA 0%, #06B6D4 50%, #3B82F6 100%);
          }
          50% { 
            width: 70%; 
            background: linear-gradient(90deg, #3B82F6 0%, #00D4AA 50%, #06B6D4 100%);
          }
          100% { 
            width: 100%; 
            background: linear-gradient(90deg, #06B6D4 0%, #3B82F6 50%, #00D4AA 100%);
          }
        }
      `}</style>
    </div>
  )
}