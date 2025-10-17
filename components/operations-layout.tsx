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

interface OperationsLayoutProps {
  children: React.ReactNode
}

export default function OperationsLayout({ children }: OperationsLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems = [
    { path: "/admin/operations/dashboard", icon: LayoutDashboard, label: "总仪表盘" },
    { path: "/admin/operations/funds", icon: TrendingUp, label: "出入金分析报表" },
    { path: "/admin/operations/retention", icon: Users, label: "留存与活跃分析报表" },
    { path: "/admin/operations/risk", icon: Shield, label: "风控配置" },
    { path: "/admin/operations/activities", icon: Calendar, label: "活动配置" },
    { path: "/admin/operations/audit", icon: FileCheck, label: "财务审核" },
  ]

  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    // 使用 pushState 更新 URL 但不刷新页面
    window.history.pushState({}, "", path)
    // 触发自定义事件通知 InstantNavigation 更新
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
