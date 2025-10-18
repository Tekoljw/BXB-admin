"use client"

import React, { useEffect, useState } from "react"
import {
  Coins,
  Network,
  Store,
  TrendingUp,
  Layers,
  Globe,
  UserCheck,
  FileText,
  BarChart3,
  CheckCircle,
} from "lucide-react"
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface SpotLayoutProps {
  children: React.ReactNode
}

export default function SpotLayout({ children }: SpotLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems: TabNavItem[] = [
    { path: "/admin/spot/coins", icon: Coins, label: "币种管理" },
    { path: "/admin/spot/networks", icon: Network, label: "网络管理" },
    { path: "/admin/spot/markets", icon: Store, label: "市场管理" },
    { path: "/admin/spot/market-makers", icon: TrendingUp, label: "做市账户" },
    { path: "/admin/spot/sectors", icon: Layers, label: "板块管理" },
    { path: "/admin/spot/restricted-countries", icon: Globe, label: "交易受限国家" },
    { path: "/admin/spot/whitelist", icon: UserCheck, label: "用户白名单" },
    { path: "/admin/spot/orders", icon: FileText, label: "委托管理" },
    { path: "/admin/spot/kline", icon: BarChart3, label: "K线管理" },
    { path: "/admin/spot/transactions", icon: CheckCircle, label: "成交记录" },
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
