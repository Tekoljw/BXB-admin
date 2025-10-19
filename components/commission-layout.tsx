"use client"

import React, { useState, useEffect } from "react"
import { FileText, PiggyBank, CreditCard, Shield, Banknote } from "lucide-react"
import HorizontalTabNav, { TabNavItem } from "./horizontal-tab-nav"

interface CommissionLayoutProps {
  children: React.ReactNode
}

export default function CommissionLayout({ children }: CommissionLayoutProps) {
  const [currentPath, setCurrentPath] = useState("")

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const subNavItems: TabNavItem[] = [
    { path: "/admin/commission/futures", icon: FileText, label: "合约佣金" },
    { path: "/admin/commission/finance", icon: PiggyBank, label: "理财佣金" },
    { path: "/admin/commission/ucard", icon: CreditCard, label: "U卡佣金" },
    { path: "/admin/commission/escrow", icon: Shield, label: "担保佣金" },
    { path: "/admin/commission/payment", icon: Banknote, label: "支付佣金" },
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
