"use client"

import React, { useEffect } from "react"
import InstantNavigation from "@/components/instant-navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    sessionStorage.setItem("isAdminLoggedIn", "true")
    document.cookie = "isAdminLoggedIn=true; path=/"
  }, [])

  return <InstantNavigation />
}
