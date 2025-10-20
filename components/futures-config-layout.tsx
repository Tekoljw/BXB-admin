"use client"

import React, { useState, useEffect } from "react"
import { Grid, TrendingUp, Tag, Wrench, Settings, Users as UsersIcon, Coins, Target, Globe, LineChart, Share2 } from "lucide-react"
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface FuturesConfigLayoutProps {
  children: React.ReactNode
}

export default function FuturesConfigLayout({ children }: FuturesConfigLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems: TabNavItem[] = [
    { path: "/admin/futures/config/sectors", icon: Grid, label: "板块管理" },
    { path: "/admin/futures/config/index-price", icon: TrendingUp, label: "指数价格管理" },
    { path: "/admin/futures/config/index-source", icon: Tag, label: "指数价格来源" },
    { path: "/admin/futures/config/special-mark-price", icon: Wrench, label: "特殊标记价格管理" },
    { path: "/admin/futures/config/product", icon: Settings, label: "产品配置" },
    { path: "/admin/futures/config/predict-group", icon: UsersIcon, label: "预测合约分组" },
    { path: "/admin/futures/config/transfer-coins", icon: Coins, label: "划转币种管理" },
    { path: "/admin/futures/config/mark-price", icon: Target, label: "标记价格配置" },
    { path: "/admin/futures/config/i18n", icon: Globe, label: "国际化配置" },
    { path: "/admin/futures/config/kline", icon: LineChart, label: "K线管理" },
    { path: "/admin/futures/config/share", icon: Share2, label: "分享页管理" },
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
