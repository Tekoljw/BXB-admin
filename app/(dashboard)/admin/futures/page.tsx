"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function FuturesManagementPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin/futures/config/sectors")
  }, [router])

  return null
}
