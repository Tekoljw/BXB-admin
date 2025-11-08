"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import FiatLayout from "@/components/fiat-layout"

// 导入子页面
import C2CManagementPage from "./c2c/page"
import C2COrdersPage from "./c2c-orders/page"
import QuickConfigPage from "./quick-config/page"
import QuickOrdersPage from "./quick-orders/page"
import OTCConfigPage from "./otc-config/page"
import OTCOrdersPage from "./otc-orders/page"

export default function C2CModulePage() {
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
    
    // 如果访问的是根路径，重定向到C2C管理
    if (window.location.pathname === "/admin/c2c") {
      router.replace("/admin/c2c/c2c")
    }
    
    // 监听路径变化
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname)
    }
    
    // 监听URL变化的间隔器
    const intervalId = setInterval(() => {
      if (window.location.pathname !== currentPath && window.location.pathname.startsWith("/admin/c2c")) {
        setCurrentPath(window.location.pathname)
      }
    }, 100)
    
    window.addEventListener("popstate", handlePathChange)
    
    return () => {
      window.removeEventListener("popstate", handlePathChange)
      clearInterval(intervalId)
    }
  }, [router, currentPath])

  // 渲染对应的子页面
  const renderSubPage = () => {
    if (currentPath === "/admin/c2c/c2c") {
      return <C2CManagementPage />
    }
    if (currentPath === "/admin/c2c/c2c-orders") {
      return <C2COrdersPage />
    }
    if (currentPath === "/admin/c2c/quick-config") {
      return <QuickConfigPage />
    }
    if (currentPath === "/admin/c2c/quick-orders") {
      return <QuickOrdersPage />
    }
    if (currentPath === "/admin/c2c/otc-config") {
      return <OTCConfigPage />
    }
    if (currentPath === "/admin/c2c/otc-orders") {
      return <OTCOrdersPage />
    }

    // 默认页面
    return null
  }

  return (
    <FiatLayout>
      {renderSubPage()}
    </FiatLayout>
  )
}
