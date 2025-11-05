"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BePayLayout from "@/components/bepay-layout"

// 导入子页面
import ChannelsPage from "./channels/page"
import SuppliersPage from "./suppliers/page"
import MerchantsPage from "./merchants/page"
import CommissionPage from "./commission/page"
import OrdersPage from "./orders/page"

export default function BePayManagementPage() {
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
    
    // 如果访问的是根路径，重定向到供应商管理
    if (window.location.pathname === "/admin/bepay") {
      router.replace("/admin/bepay/suppliers")
    }
    
    // 监听路径变化
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname)
    }
    
    window.addEventListener("popstate", handlePathChange)
    return () => window.removeEventListener("popstate", handlePathChange)
  }, [router])

  // 渲染对应的子页面
  const renderSubPage = () => {
    if (currentPath === "/admin/bepay/suppliers") {
      return <SuppliersPage />
    }
    if (currentPath === "/admin/bepay/channels") {
      return <ChannelsPage />
    }
    if (currentPath === "/admin/bepay/merchants") {
      return <MerchantsPage />
    }
    if (currentPath === "/admin/bepay/commission") {
      return <CommissionPage />
    }
    if (currentPath === "/admin/bepay/orders") {
      return <OrdersPage />
    }

    // 默认页面
    return null
  }

  return (
    <BePayLayout>
      {renderSubPage()}
    </BePayLayout>
  )
}
