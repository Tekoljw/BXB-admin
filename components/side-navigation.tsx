"use client"

import React from "react"
import {
  BarChart2,
  Settings,
  MessageCircle,
  User,
  Bell,
  LineChart,
  ArrowLeftRight,
  TrendingUp,
  Wallet,
  Users,
  ChevronLeft,
  ChevronRight,
  PiggyBank,
  Globe,
  ChevronDown
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { useState, useRef, useEffect } from "react"
import { useTranslation } from "@/hooks/use-translation"
import ThemeToggle from "./theme-toggle"

interface SideNavigationProps {
  onCloseMobile?: () => void
  onToggleExpanded?: (expanded: boolean) => void
  isExpanded?: boolean
}

export default function SideNavigation({ onCloseMobile, onToggleExpanded, isExpanded: propIsExpanded }: SideNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { language, setLanguage, theme } = useTheme()
  const { t } = useTranslation()
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(propIsExpanded ?? true)
  const languageDropdownRef = useRef<HTMLDivElement>(null)
  const notificationDropdownRef = useRef<HTMLDivElement>(null)

  const navigationItems = [
    { icon: MessageCircle, label: t("chat"), path: "/" },
    { icon: Users, label: t("social"), path: "/social" },
    { icon: BarChart2, label: t("market"), path: "/market" },
    { icon: LineChart, label: t("spot"), path: "/spot" },
    { icon: TrendingUp, label: t("futures"), path: "/futures" },
    { icon: PiggyBank, label: t("finance"), path: "/finance" },
    { icon: Wallet, label: t("wallet"), path: "/wallet" },
    { icon: User, label: t("profile"), path: "/profile" }
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

  const handleLanguageChange = (newLanguage: "en" | "zh") => {
    setLanguage(newLanguage)
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

  const isDark = theme === "dark"

  return (
    <>
      <div className={`w-full h-screen flex flex-col ${isDark ? "bg-[#374151]" : "bg-black"} text-white overflow-hidden`} style={{maxHeight: '100vh'}}>
        {/* Expand/Collapse Toggle Button */}
        <div className="hidden md:flex justify-end p-2">
          <button
            onClick={handleToggleExpand}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title={isExpanded ? "收起" : "展开"}
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4 text-white/70" />
            ) : (
              <ChevronRight className="h-4 w-4 text-white/70" />
            )}
          </button>
        </div>

        {/* User Avatar Section */}
        <div className="p-3 pt-2 md:p-4 md:pt-2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-2 md:mb-3">
              <User className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            {isExpanded && (
              <div className="text-center">
                <div className="text-sm md:text-base font-medium text-white">用户名</div>
                <div className="text-xs text-white/60">ID: 123456</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-2 md:px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center p-2 md:p-3 rounded-lg transition-all duration-200 group ${
                    active
                      ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  title={!isExpanded ? item.label : undefined}
                >
                  <Icon className={`h-4 w-4 md:h-5 md:w-5 flex-shrink-0 ${
                    active ? "text-blue-400" : "text-white/70 group-hover:text-white"
                  }`} />
                  {isExpanded && (
                    <span className="ml-3 text-sm md:text-base font-medium">
                      {item.label}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Language Selector */}
        <div className="px-2 md:px-3 pb-2">
          <div className="relative" ref={languageDropdownRef}>
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            >
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                {isExpanded && <span className="text-sm">{language === "zh" ? "中文" : "English"}</span>}
              </div>
              {isExpanded && <ChevronDown className="h-3 w-3" />}
            </button>

            {languageDropdownOpen && isExpanded && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-popover border border-border rounded-md shadow-lg z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`flex items-center w-full px-4 py-2 text-sm transition-colors hover:bg-muted ${
                      language === "en" ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                    }`}
                  >
                    <span className="mr-3 text-base">🇺🇸</span>
                    <span>English</span>
                    {language === "en" && <span className="ml-auto text-primary">✓</span>}
                  </button>
                  <button
                    onClick={() => handleLanguageChange("zh")}
                    className={`flex items-center w-full px-4 py-2 text-sm transition-colors hover:bg-muted ${
                      language === "zh" ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                    }`}
                  >
                    <span className="mr-3 text-base">🇨🇳</span>
                    <span>中文</span>
                    {language === "zh" && <span className="ml-auto text-primary">✓</span>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compact Controls Row */}
        <div className="px-2 md:px-3 flex items-center justify-center gap-2">
          <div className="flex items-center">
            <ThemeToggle />
          </div>
          <div ref={notificationDropdownRef}>
            <button
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
              className={`p-1 rounded transition-all duration-200 hover:bg-white/10 relative group ${
                notificationDropdownOpen ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
              }`}
              title="通知"
            >
              <Bell className={`h-3 w-3 transition-all duration-200 ${
                notificationDropdownOpen 
                  ? "animate-pulse scale-110" 
                  : "group-hover:animate-bounce"
              }`} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center text-[8px] animate-pulse">
                5
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Dropdown Portal */}
      {notificationDropdownOpen && (
        <div className="fixed inset-0 z-[9998]" onClick={() => setNotificationDropdownOpen(false)}>
          <div 
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-600 z-[9999] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
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
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                    <Settings className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">系统通知</div>
                    <div className="text-xs text-gray-400">2条</div>
                  </div>
                </button>
                <button className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">最新活动</div>
                    <div className="text-xs text-gray-400">3条</div>
                  </div>
                </button>
                <button className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-2">
                    <Bell className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">重要通知</div>
                    <div className="text-xs text-gray-400">1条</div>
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
        </div>
      )}
    </>
  )
}