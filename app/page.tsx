"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect directly to chat interface
    router.replace("/chat")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">正在进入聊天...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00D4AA] mx-auto"></div>
      </div>
    </div>
  )
}