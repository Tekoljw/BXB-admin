"use client"

import React, { useEffect, useState } from "react"
import {
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  FileText,
  PiggyBank,
  CreditCard,
  Shield,
  Banknote,
} from "lucide-react"
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface OrdersLayoutProps {
  children: React.ReactNode
}

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems: TabNavItem[] = [
    { path: "/admin/orders/funds", icon: Wallet, label: "资金记录" },
    { path: "/admin/orders/usdt", icon: ArrowLeftRight, label: "USDT买卖记录" },
    { path: "/admin/orders/spot", icon: TrendingUp, label: "现货订单" },
    { path: "/admin/orders/futures", icon: FileText, label: "合约订单" },
    { path: "/admin/orders/finance", icon: PiggyBank, label: "理财订单" },
    { path: "/admin/orders/ucard", icon: CreditCard, label: "U卡订单" },
    { path: "/admin/orders/escrow", icon: Shield, label: "担保记录" },
    { path: "/admin/orders/payment", icon: Banknote, label: "支付订单" },
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
