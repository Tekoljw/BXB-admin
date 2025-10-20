"use client"

import React, { useState, useEffect } from "react"
import { Users, Building2, Settings, CreditCard, ShoppingCart } from "lucide-react"
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface UCardLayoutProps {
  children: React.ReactNode
}

export default function UCardLayout({ children }: UCardLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems: TabNavItem[] = [
    { path: "/admin/ucard/users", icon: Users, label: "U卡用户列表" },
    { path: "/admin/ucard/suppliers", icon: Building2, label: "U卡供应商" },
    { path: "/admin/ucard/config", icon: Settings, label: "U卡基础配置" },
    { path: "/admin/ucard/applications", icon: CreditCard, label: "U卡开卡记录" },
    { path: "/admin/ucard/transactions", icon: ShoppingCart, label: "U卡消费记录" },
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
