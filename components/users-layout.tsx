"use client"

import React, { useEffect, useState } from "react"
import {
  Users,
  UserX,
  Trash2,
  Activity,
  CheckSquare,
  Settings,
  MessageSquare,
  Mail,
  ShieldCheck,
  Phone,
  UserCog,
  Crown,
  FileCheck,
  ClipboardCheck,
} from "lucide-react"

interface UsersLayoutProps {
  children: React.ReactNode
}

export default function UsersLayout({ children }: UsersLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems = [
    { path: "/admin/users/all", icon: Users, label: "用户总表" },
    { path: "/admin/users/blacklist", icon: UserX, label: "黑名单管理" },
    { path: "/admin/users/deleted", icon: Trash2, label: "已删除账户" },
    { path: "/admin/users/behavior", icon: Activity, label: "用户行为" },
    { path: "/admin/users/api-review", icon: CheckSquare, label: "API审核" },
    { path: "/admin/users/api-manage", icon: Settings, label: "API管理" },
    { path: "/admin/users/sms-logs", icon: MessageSquare, label: "短信日志" },
    { path: "/admin/users/email-logs", icon: Mail, label: "邮箱日志" },
    { path: "/admin/users/f2a-review", icon: ShieldCheck, label: "F2A审核" },
    { path: "/admin/users/voice-logs", icon: Phone, label: "语音日志" },
    { path: "/admin/users/account-types", icon: UserCog, label: "账户类型管理" },
    { path: "/admin/users/special-accounts", icon: Crown, label: "特殊账户管理" },
    { path: "/admin/users/kyc-review", icon: FileCheck, label: "KYC审核" },
    { path: "/admin/users/kyc-records", icon: ClipboardCheck, label: "KYC审核记录" },
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
