"use client"

import React, { useEffect, useState } from "react"
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Shield,
  Calendar,
  FileCheck,
} from "lucide-react"
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface OperationsLayoutProps {
  children: React.ReactNode
}

export default function OperationsLayout({ children }: OperationsLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems: TabNavItem[] = [
    { path: "/admin/operations/dashboard", icon: LayoutDashboard, label: "总仪表盘" },
    { path: "/admin/operations/funds", icon: TrendingUp, label: "出入金分析报表" },
    { path: "/admin/operations/retention", icon: Users, label: "留存与活跃分析报表" },
    { path: "/admin/operations/risk", icon: Shield, label: "风控配置" },
    { path: "/admin/operations/activities", icon: Calendar, label: "活动配置" },
    { path: "/admin/operations/audit", icon: FileCheck, label: "财务审核" },
    { path: "/admin/operations/market-config", icon: TrendingUp, label: "行情配置管理" },
  ]

  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    window.history.pushState({}, "", path)
    window.dispatchEvent(new CustomEvent('navigate', { detail: { path } }))
  }

  return (
    <div className="flex flex-col h-full">
      <HorizontalTabNav
        items={subNavItems}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
