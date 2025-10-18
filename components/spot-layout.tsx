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

interface SpotLayoutProps {
  children: React.ReactNode
}

export default function SpotLayout({ children }: SpotLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems = [
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

  const isActive = (path: string) => currentPath === path

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
        <div 
          className="flex items-center space-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 pb-2"
          style={{ scrollbarWidth: 'thin' }}
        >
          {subNavItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
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

      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
