"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function OperationsPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/admin/operations/dashboard")
  }, [router])

  return null
}
