"use client"

import React, { useState, useEffect } from "react"
import { Settings, FileText, Award, Users, UserCheck, AlertCircle } from "lucide-react"
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface EscrowLayoutProps {
  children: React.ReactNode
}

export default function EscrowLayout({ children }: EscrowLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems: TabNavItem[] = [
    { path: "/admin/escrow/rules", icon: Settings, label: "担保规则配置" },
    { path: "/admin/escrow/records", icon: FileText, label: "担保记录" },
    { path: "/admin/escrow/rankings", icon: Award, label: "信誉担保排名" },
    { path: "/admin/escrow/groups", icon: Users, label: "担保群管理" },
    { path: "/admin/escrow/arbitrators", icon: UserCheck, label: "仲裁员管理" },
    { path: "/admin/escrow/complaints", icon: AlertCircle, label: "仲裁投诉记录" },
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
