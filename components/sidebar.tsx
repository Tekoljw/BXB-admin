"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  MessageCircle,
  Users,
  ShoppingBag,
  DollarSign,
  LineChart,
  ArrowLeftRight,
  FileText,
  Wallet,
  Settings,
  Globe2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  onCloseMobile?: () => void
  onToggleExpanded?: (expanded: boolean) => void
  isExpanded?: boolean
}

export default function Sidebar({ onCloseMobile, onToggleExpanded, isExpanded = true }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const navigate = (path: string) => {
    router.push(path)
    onCloseMobile?.()
  }

  const isActive = (path: string) => pathname === path

  const navItems = [
    { path: "/chat", icon: MessageCircle, label: "聊天" },
    { path: "/moments", icon: Users, label: "朋友圈" },
    { path: "/mall", icon: ShoppingBag, label: "商城" },
    { path: "/usdt-trade", icon: DollarSign, label: "USDT买卖" },
    { path: "/market", icon: LineChart, label: "行情" },
    { path: "/spot", icon: ArrowLeftRight, label: "现货" },
    { path: "/futures", icon: FileText, label: "合约" },
    { path: "/wallet", icon: Wallet, label: "钱包" },
  ]

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">U</div>
          {isExpanded && <span className="text-sm hidden md:block">用户</span>}
        </div>
        <button
          onClick={() => onToggleExpanded?.(!isExpanded)}
          className="p-1 hover:bg-gray-700 rounded hidden md:block"
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-center md:justify-start p-2 rounded hover:bg-gray-700 transition-colors ${
                isActive(item.path) ? "bg-gray-700" : ""
              }`}
            >
              <Icon size={20} />
              {isExpanded && <span className="ml-3 text-sm hidden md:block">{item.label}</span>}
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="h-12 flex items-center justify-center gap-3 border-t border-gray-700 px-2">
        <button className="p-2 hover:bg-gray-700 rounded">
          <Globe2 size={16} />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded">
          <Settings size={16} />
        </button>
      </div>
    </div>
  )
}