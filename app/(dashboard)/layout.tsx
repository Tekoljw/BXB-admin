"use client"

import React, { useEffect } from "react"
import NewNavigation from "@/components/new-navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", "true")
    document.cookie = "isLoggedIn=true; path=/"
  }, [])

  return <NewNavigation />
}
