"use client"

import React, { useState, useEffect } from "react"
import { Settings, Users, Package, UserCheck, FileText, TrendingDown, History, Shield, AlertTriangle, DollarSign, BarChart3, Monitor, Gift, User, Copy } from "lucide-react"
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface FuturesLayoutProps {
  children: React.ReactNode
}

export default function FuturesLayout({ children }: FuturesLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems: TabNavItem[] = [
    { path: "/admin/futures/config/sectors", icon: Settings, label: "合约配置" },
    { path: "/admin/futures/special-accounts/market-makers", icon: Users, label: "特殊账户管理" },
    { path: "/admin/futures/positions/scale", icon: Package, label: "持仓管理" },
    { path: "/admin/futures/trader-system/review", icon: UserCheck, label: "带单员系统" },
    { path: "/admin/futures/orders/tracking", icon: FileText, label: "委托管理" },
    { path: "/admin/futures/fee-tier/config", icon: TrendingDown, label: "阶梯费率" },
    { path: "/admin/futures/history/auto-delever", icon: History, label: "合约历史" },
    { path: "/admin/futures/risk-control/history", icon: Shield, label: "用户风控" },
    { path: "/admin/futures/mm-risk/monitor", icon: AlertTriangle, label: "做市商风控" },
    { path: "/admin/futures/funds/fee-management", icon: DollarSign, label: "资金管理" },
    { path: "/admin/futures/analytics/reports", icon: BarChart3, label: "数据分析" },
    { path: "/admin/futures/monitor/logs", icon: Monitor, label: "监控" },
    { path: "/admin/futures/campaigns/lottery", icon: Gift, label: "运营活动" },
    { path: "/admin/futures/users/blacklist", icon: User, label: "用户管理" },
    { path: "/admin/futures/copy-trade/stop-profit-loss", icon: Copy, label: "跟单管理" },
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
