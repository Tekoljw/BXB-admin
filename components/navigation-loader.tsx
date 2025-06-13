"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import CreativeLoader from "./creative-loader"

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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
      <CreativeLoader size={32} variant="circle" />
    </div>
  )
}