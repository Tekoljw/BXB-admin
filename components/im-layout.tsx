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
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface IMLayoutProps {
  children: React.ReactNode
}

export default function IMLayout({ children }: IMLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems: TabNavItem[] = [
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
