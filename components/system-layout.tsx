"use client"

import React, { useState, useEffect } from "react"
import { Shield, Users, UserCog, Settings, Smartphone, Activity, Calendar, List } from "lucide-react"
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface SystemLayoutProps {
  children: React.ReactNode
}

export default function SystemLayout({ children }: SystemLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems: TabNavItem[] = [
    { path: "/admin/system/permissions", icon: Shield, label: "权限管理" },
    { path: "/admin/system/roles", icon: UserCog, label: "角色管理" },
    { path: "/admin/system/users", icon: Users, label: "用户管理" },
    { path: "/admin/system/audit-config", icon: Settings, label: "审核配置" },
    { path: "/admin/system/app", icon: Smartphone, label: "APP管理" },
    { path: "/admin/system/operations", icon: Activity, label: "运维管理" },
    { path: "/admin/system/maintenance-plan", icon: Calendar, label: "维护计划配置" },
    { path: "/admin/system/maintenance-whitelist", icon: List, label: "维护白名单管理" },
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
