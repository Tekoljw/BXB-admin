"use client"

import React, { useState, useEffect } from "react"
import { Settings, Building2, Users, Wallet, ShoppingCart } from "lucide-react"
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface BePayLayoutProps {
  children: React.ReactNode
}

export default function BePayLayout({ children }: BePayLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
    
    // 监听路径变化
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname)
    }
    
    window.addEventListener("popstate", handlePathChange)
    return () => window.removeEventListener("popstate", handlePathChange)
  }, [])

  const subNavItems: TabNavItem[] = [
    { path: "/admin/bepay/channels", icon: Settings, label: "通道管理" },
    { path: "/admin/bepay/suppliers", icon: Building2, label: "供应商管理" },
    { path: "/admin/bepay/merchants", icon: Users, label: "商户管理" },
    { path: "/admin/bepay/commission", icon: Wallet, label: "佣金管理" },
    { path: "/admin/bepay/orders", icon: ShoppingCart, label: "订单管理" },
  ]

  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    window.history.pushState({}, "", path)
    window.dispatchEvent(new Event("popstate"))
  }

  return (
    <div>
      <HorizontalTabNav items={subNavItems} currentPath={currentPath} onNavigate={handleNavigate} />
      {children}
    </div>
  )
}
