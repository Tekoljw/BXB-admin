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

interface OrdersLayoutProps {
  children: React.ReactNode
}

export default function OrdersLayout({ children }: OrdersLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems = [
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

  const isActive = (path: string) => currentPath === path

  return (
    <div className="flex flex-col h-full">
      {/* 子导航栏 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {subNavItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  active
                    ? "bg-custom-green text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 子页面内容 */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
