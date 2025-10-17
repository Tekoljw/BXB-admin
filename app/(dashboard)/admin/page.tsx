"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin/operations/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-custom-green rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-custom-green/30 rounded-full animate-spin mx-auto" style={{ animationDuration: '1.5s' }}></div>
        </div>
        <p className="mt-6 text-gray-400 text-lg font-medium">加载中...</p>
        <p className="mt-2 text-gray-500 text-sm">正在为您打开总仪表盘</p>
      </div>
    </div>
  )
}
