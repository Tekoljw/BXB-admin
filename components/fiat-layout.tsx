"use client"

import React, { useState, useEffect } from "react"
import { Users, ShoppingCart, Settings, Zap, Globe, FileText } from "lucide-react"
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface FiatLayoutProps {
  children: React.ReactNode
}

export default function FiatLayout({ children }: FiatLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems: TabNavItem[] = [
    { path: "/admin/fiat/c2c", icon: Users, label: "C2C管理" },
    { path: "/admin/fiat/c2c-orders", icon: ShoppingCart, label: "C2C订单" },
    { path: "/admin/fiat/quick-config", icon: Settings, label: "法币快捷配置" },
    { path: "/admin/fiat/quick-orders", icon: Zap, label: "法币快捷订单" },
    { path: "/admin/fiat/otc-config", icon: Globe, label: "OTC配置" },
    { path: "/admin/fiat/otc-orders", icon: FileText, label: "OTC订单" },
  ]

  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    window.history.pushState({}, "", path)
    window.dispatchEvent(new Event("popstate"))
  }

  return (
    <div>
      <HorizontalTabNav items={subNavItems} currentPath={currentPath} onNavigate={handleNavigate} />
      <div className="p-6">{children}</div>
    </div>
  )
}
