"use client"

import React, { useEffect, useState } from "react"
import {
  Users,
  UsersRound,
  MessageSquare,
  FileSearch,
  CheckCircle,
  UserPlus,
  Search,
} from "lucide-react"

interface IMLayoutProps {
  children: React.ReactNode
}

export default function IMLayout({ children }: IMLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems = [
    { path: "/admin/im/accounts", icon: Users, label: "账号管理" },
    { path: "/admin/im/groups", icon: UsersRound, label: "群组管理" },
    { path: "/admin/im/messages", icon: MessageSquare, label: "消息管理" },
    { path: "/admin/im/logs", icon: FileSearch, label: "日志查询" },
    { path: "/admin/im/review", icon: CheckCircle, label: "审核管理" },
    { path: "/admin/im/auto-join", icon: UserPlus, label: "自动加群" },
    { path: "/admin/im/group-search", icon: Search, label: "群搜索" },
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

      {/* 子页面内容 */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
