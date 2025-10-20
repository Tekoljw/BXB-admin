"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CommissionPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin/commission/futures")
  }, [router])

  return null
}
