"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import FiatLayout from "@/components/fiat-layout"

// 导入子页面
import ReportsPage from "./reports/page"
import CurrenciesPage from "./currencies/page"
import SuppliersPage from "./suppliers/page"
import InterfacesPage from "./interfaces/page"
import ChannelsPage from "./channels/page"
import MerchantsPage from "./users/page"
import CommissionPage from "./commission/page"
import OrdersPage from "./orders/page"
import ExchangeOrdersPage from "./exchange-orders/page"

export default function FiatManagementPage() {
  const router = useRouter()
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
    
    // 如果访问的是根路径，重定向到经营报表
    if (window.location.pathname === "/admin/fiat") {
      router.replace("/admin/fiat/reports")
    }
    
    // 监听路径变化
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname)
    }
    
    // 监听URL变化的间隔器
    const intervalId = setInterval(() => {
      if (window.location.pathname !== currentPath && window.location.pathname.startsWith("/admin/fiat")) {
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
    if (currentPath === "/admin/fiat/reports") {
      return <ReportsPage />
    }
    if (currentPath === "/admin/fiat/currencies") {
      return <CurrenciesPage />
    }
    if (currentPath === "/admin/fiat/suppliers") {
      return <SuppliersPage />
    }
    if (currentPath === "/admin/fiat/interfaces") {
      return <InterfacesPage />
    }
    if (currentPath === "/admin/fiat/channels") {
      return <ChannelsPage />
    }
    if (currentPath === "/admin/fiat/users") {
      return <MerchantsPage />
    }
    if (currentPath === "/admin/fiat/commission") {
      return <CommissionPage />
    }
    if (currentPath === "/admin/fiat/orders") {
      return <OrdersPage />
    }
    if (currentPath === "/admin/fiat/exchange-orders") {
      return <ExchangeOrdersPage />
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
