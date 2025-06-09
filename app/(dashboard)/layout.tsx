"use client"

import React, { useEffect } from "react"
import InstantNavigation from "@/components/instant-navigation-fixed"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", "true")
    document.cookie = "isLoggedIn=true; path=/"
  }, [])

  return <InstantNavigation />
}
