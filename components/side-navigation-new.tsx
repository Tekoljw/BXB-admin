"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import {
  BarChart2,
  Settings,
  MessageCircle,
  User,
  Bell,
  LineChart,
  ArrowLeftRight,
  FileText,
  Globe2,
  Users,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Wallet,
  ShoppingBag,
  TrendingUp,
  PiggyBank,
  AlertTriangle,
} from "lucide-react"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import ThemeToggle from "./theme-toggle"

interface SideNavigationProps {
  onCloseMobile?: () => void
  onToggleExpanded?: (expanded: boolean) => void
  isExpanded?: boolean
}

export default function SideNavigation({ onCloseMobile, onToggleExpanded, isExpanded: propIsExpanded }: SideNavigationProps) {
  const { language, setLanguage, theme } = useTheme()
  const [currentPath, setCurrentPath] = useState("/chat")
  const router = useRouter()
  const pathname = usePathname()
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false)
  const languageDropdownRef = useRef<HTMLDivElement>(null)
  const notificationDropdownRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(propIsExpanded ?? true)

  const isDark = theme === "dark"

  // Navigation items
  const navItems = [
    { path: "/chat", icon: MessageCircle, label: language === "zh" ? "聊天" : "Chat" },
    { path: "/moments", icon: Users, label: language === "zh" ? "朋友圈" : "Moments" },
    { path: "/mall", icon: ShoppingBag, label: language === "zh" ? "商城" : "Mall" },
    { path: "/usdt-trade", icon: DollarSign, label: language === "zh" ? "USDT买卖" : "USDT Trade" },
    { path: "/market", icon: LineChart, label: language === "zh" ? "行情" : "Market" },
    { path: "/spot", icon: ArrowLeftRight, label: language === "zh" ? "现货" : "Spot" },
    { path: "/futures", icon: FileText, label: language === "zh" ? "合约" : "Futures" },
    { path: "/finance", icon: PiggyBank, label: language === "zh" ? "理财" : "Finance" },
    { path: "/wallet", icon: Wallet, label: language === "zh" ? "钱包" : "Wallet" },
  ]

  const handleNavClick = (path: string) => {
    router.push(path)
    onCloseMobile?.()
  }

  const isActive = (path: string) => pathname === path

  const handleToggleExpand = () => {
    const newExpanded = !isExpanded
    setIsExpanded(newExpanded)
    onToggleExpanded?.(newExpanded)
  }

  const handleLanguageChange = (lang: "en" | "zh") => {
    setLanguage(lang)
    setLanguageDropdownOpen(false)
  }

  // Handle clicks outside dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false)
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setNotificationDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div 
      className={`w-full ${isDark ? "bg-[#374151]" : "bg-black"} text-white flex flex-col`}
      style={{ 
        height: '100vh', 
        maxHeight: '100vh', 
        overflow: 'hidden'
      }}
    >
      {/* Header - Fixed height */}
      <div className="flex-shrink-0 h-20">
        {/* Toggle Button */}
        <div className="hidden md:flex justify-end p-2">
          <button
            onClick={handleToggleExpand}
            className="text-white/70 hover:text-white transition-colors p-1 rounded"
          >
            {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
        
        {/* User Profile */}
        <div className="px-3 py-1">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
              U
            </div>
            <div className={`${isExpanded ? 'md:block' : 'md:hidden'}`}>
              <div className="text-xs font-medium text-white">User</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Takes remaining space */}
      <div className="flex-1 min-h-0 px-2">
        <div className="h-full flex flex-col justify-evenly">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center justify-center md:justify-start px-2 py-2 rounded-lg transition-colors hover:bg-white/10 ${
                  isActive(item.path) ? "bg-white/20" : "text-white/70 hover:text-white"
                }`}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className={`ml-2 text-sm ${isExpanded ? 'md:block' : 'md:hidden'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer - Fixed height */}
      <div className="flex-shrink-0 h-16 border-t border-white/10 px-2 flex items-center justify-center gap-3">
        {/* Language Toggle */}
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="p-2 rounded transition-colors hover:bg-white/10 text-white/70 hover:text-white"
          >
            <Globe2 className="h-4 w-4" />
          </button>

          {languageDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-32 bg-gray-800 rounded-lg shadow-lg border border-gray-600 z-50">
              <div className="py-1">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`flex items-center w-full px-3 py-2 text-sm transition-colors hover:bg-gray-700 ${
                    language === "en" ? "bg-gray-700 text-white" : "text-gray-300"
                  }`}
                >
                  🇺🇸 EN
                </button>
                <button
                  onClick={() => handleLanguageChange("zh")}
                  className={`flex items-center w-full px-3 py-2 text-sm transition-colors hover:bg-gray-700 ${
                    language === "zh" ? "bg-gray-700 text-white" : "text-gray-300"
                  }`}
                >
                  🇨🇳 中文
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative" ref={notificationDropdownRef}>
          <button
            onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
            className={`p-2 rounded transition-all duration-200 hover:bg-white/10 relative ${
              notificationDropdownOpen ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
            }`}
          >
            <Bell className={`h-4 w-4 transition-all duration-200 ${
              notificationDropdownOpen 
                ? "animate-pulse scale-110" 
                : "hover:animate-bounce"
            }`} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center text-[8px] animate-pulse">
              5
            </span>
          </button>

          {notificationDropdownOpen && (
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-600 z-[9999] animate-in fade-in zoom-in-95 duration-200">
              <div className="p-3 border-b border-gray-600">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">通知</h3>
                  <span className="text-xs text-gray-400">5条未读</span>
                </div>
              </div>
              
              {/* Notification Categories */}
              <div className="p-2">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">全部通知</div>
                      <div className="text-xs text-gray-400">5条</div>
                    </div>
                  </button>
                  <button className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <Settings className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">系统通知</div>
                      <div className="text-xs text-gray-400">2条</div>
                    </div>
                  </button>
                  <button className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">最新活动</div>
                      <div className="text-xs text-gray-400">1条</div>
                    </div>
                  </button>
                  <button className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-2">
                      <AlertTriangle className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">重要通知</div>
                      <div className="text-xs text-gray-400">2条</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="max-h-60 overflow-y-auto">
                <div className="px-3 py-2 border-t border-gray-600">
                  <div className="text-xs text-gray-400 mb-2">最近通知</div>
                  <div className="space-y-2">
                    <div className="flex items-start p-2 rounded-md hover:bg-gray-700 transition-colors">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white">BTC价格突破$95,000</div>
                        <div className="text-xs text-gray-400">2分钟前</div>
                      </div>
                    </div>
                    <div className="flex items-start p-2 rounded-md hover:bg-gray-700 transition-colors">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white">ETH买入订单已执行</div>
                        <div className="text-xs text-gray-400">15分钟前</div>
                      </div>
                    </div>
                    <div className="flex items-start p-2 rounded-md hover:bg-gray-700 transition-colors">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white">系统维护通知</div>
                        <div className="text-xs text-gray-400">1小时前</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-gray-600 text-center">
                <button 
                  onClick={() => {
                    setNotificationDropdownOpen(false)
                    handleNavClick("/notifications")
                  }}
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  查看全部通知
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}