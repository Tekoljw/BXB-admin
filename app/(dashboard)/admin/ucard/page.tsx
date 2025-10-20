"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function UCardManagementPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/admin/ucard/users")
  }, [router])

  return null
}
