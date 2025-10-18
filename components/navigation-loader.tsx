"use client"

import { useEffect, useState } from "react"
import SimpleLoader from "./simple-loader"

export default function NavigationLoader() {
  const [loading, setLoading] = useState(false)
  const [currentPath, setCurrentPath] = useState("/chat")

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    handleStart()
    const timer = setTimeout(handleComplete, 100)

    return () => clearTimeout(timer)
  }, [currentPath])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
      <SimpleLoader size={32} />
    </div>
  )
}
