"use client"

import React, { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
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
  Sun,
  Moon,
  Menu,
  User,
} from "lucide-react"

// Import all page components directly to avoid compilation delays
import ChatPage from "@/app/(dashboard)/chat/page"
import MomentsPage from "@/app/(dashboard)/moments/page"
import MallPage from "@/app/(dashboard)/mall/page"
import WalletPage from "@/app/(dashboard)/wallet/page"
import USDTTradePage from "@/app/(dashboard)/usdt-trade/page"
import MarketPage from "@/app/(dashboard)/market/page"
import SpotPage from "@/app/(dashboard)/spot/page"
import FuturesPage from "@/app/(dashboard)/futures/page"

interface InstantNavigationProps {
  onCloseMobile?: () => void
}

export default function InstantNavigation({ onCloseMobile }: InstantNavigationProps) {
  const [currentPage, setCurrentPage] = useState("/chat")
  const [isExpanded, setIsExpanded] = useState(true)
  const pathname = usePathname()
  const { theme, setTheme, language, setLanguage } = useTheme()

  useEffect(() => {
    setCurrentPage(pathname)
  }, [pathname])

  const navigate = (path: string) => {
    setCurrentPage(path)
    onCloseMobile?.()
    // Update URL without triggering page reload
    window.history.pushState({}, "", path)
  }

  const isActive = (path: string) => currentPage === path

  const navItems = [
    { path: "/chat", icon: MessageCircle, label: "聊天", component: ChatPage },
    { path: "/moments", icon: Users, label: "朋友圈", component: MomentsPage },
    { path: "/mall", icon: ShoppingBag, label: "商城", component: MallPage },
    { path: "/usdt-trade", icon: DollarSign, label: "USDT买卖", component: USDTTradePage },
    { path: "/market", icon: LineChart, label: "行情", component: MarketPage },
    { path: "/spot", icon: ArrowLeftRight, label: "现货", component: SpotPage },
    { path: "/futures", icon: FileText, label: "合约", component: FuturesPage },
    { path: "/wallet", icon: Wallet, label: "钱包", component: WalletPage },
  ]

  const renderCurrentPage = () => {
    const currentItem = navItems.find(item => item.path === currentPage)
    if (currentItem) {
      const Component = currentItem.component
      return <Component />
    }
    return <ChatPage />
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className={`${isExpanded ? 'w-64' : 'w-24'} ${theme === 'dark' ? 'bg-gray-800' : 'bg-black'} text-white flex flex-col transition-all duration-300`}>
        {/* Header - Hamburger Menu */}
        <div className="h-12 flex items-center justify-center px-3 border-b border-gray-700">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title={isExpanded ? "收起侧边栏" : "展开侧边栏"}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center ${isExpanded ? 'px-4' : 'px-2 justify-center'} py-3 rounded-lg hover:bg-gray-700 transition-colors ${
                  isActive(item.path) ? "bg-gray-700" : ""
                }`}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon size={24} />
                {isExpanded && <span className="ml-4 text-base font-medium">{item.label}</span>}
              </button>
            )
          })}
        </div>

        {/* Footer - User Avatar and Controls */}
        <div className="border-t border-gray-700">
          {/* User Section */}
          <div className={`${isExpanded ? 'px-4 py-3' : 'px-2 py-3'} border-b border-gray-700`}>
            <div className={`flex items-center ${isExpanded ? 'space-x-3' : 'justify-center'}`}>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                <User size={16} />
              </div>
              {isExpanded && (
                <div>
                  <div className="text-sm font-medium text-white">用户</div>
                  <div className="text-xs text-gray-400">在线</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Controls */}
          <div className={`h-16 flex items-center ${isExpanded ? 'justify-center gap-4' : 'flex-col gap-2'} px-3`}>
            <button 
              onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
              className="p-2 hover:bg-gray-700 rounded-lg"
              title={language === "zh" ? "Switch to English" : "切换到中文"}
            >
              <Globe2 size={18} />
            </button>
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-gray-700 rounded-lg"
              title={theme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => navigate("/settings")}
              className="p-2 hover:bg-gray-700 rounded-lg"
              title="设置"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Render component directly */}
      <div className="flex-1 overflow-auto">
        {renderCurrentPage()}
      </div>
    </div>
  )
}