"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin/operations/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-green mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">正在跳转到总仪表盘...</p>
      </div>
    </div>
  )
}
