"use client"

import React, { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAdmin } from "@/contexts/admin-context"
import InstantNavigation from "@/components/instant-navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAdminLoggedIn } = useAdmin()

  useEffect(() => {
    // 如果不是登录页，检查登录状态
    if (pathname !== '/admin/login') {
      const accessToken = localStorage.getItem('admin.accessToken') || 
                         sessionStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('admin.refreshToken') || 
                          localStorage.getItem('refreshToken')
      
      // 如果没有token且未登录，重定向到登录页
      if (!accessToken && !refreshToken && !isAdminLoggedIn) {
        const loginUrl = `/admin/login?redirect=${encodeURIComponent(pathname)}`
        router.push(loginUrl)
        return
      }
      
      // 设置登录标记
      if (accessToken || refreshToken) {
        sessionStorage.setItem("isAdminLoggedIn", "true")
        document.cookie = "isAdminLoggedIn=true; path=/; max-age=86400"
      }
    }
  }, [pathname, isAdminLoggedIn, router])

  return <InstantNavigation />
}
