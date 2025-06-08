"use client"

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
  ChevronDown,
  CheckCircle,
  X
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { useState } from "react"
import ThemeToggle from "@/components/theme-toggle"

interface SideNavigationProps {
  onCloseMobile?: () => void
}

export default function SideNavigation({ onCloseMobile }: SideNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, theme } = useTheme()
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false)

  const t = {
    en: {
      chat: "Chat",
      moments: "Moments", 
      usdtTrade: "USDT Trade",
      statistics: "Market",
      spot: "Spot",
      futures: "Futures",
      languageToggle: "Language",
      themeToggle: "Theme",
      notifications: "Notifications",
      markAllAsRead: "Mark all as read",
      settings: "Settings",
      logout: "Logout"
    },
    zh: {
      chat: "聊天",
      moments: "动态",
      usdtTrade: "USDT买卖", 
      statistics: "行情",
      spot: "现货",
      futures: "合约",
      languageToggle: "语言",
      themeToggle: "主题",
      notifications: "通知",
      markAllAsRead: "标记为已读",
      settings: "设置",
      logout: "退出登录"
    }
  }

  const isDark = theme === "dark"

  const navigationItems = [
    { href: "/chat", icon: MessageCircle, label: t[language].chat },
    { href: "/moments", icon: Users, label: t[language].moments },
    { href: "/spot", icon: ArrowLeftRight, label: t[language].spot },
    { href: "/futures", icon: FileText, label: t[language].futures },
    { href: "/usdt-trade", icon: DollarSign, label: t[language].usdtTrade },
    { href: "/market", icon: BarChart2, label: t[language].statistics }
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
    if (onCloseMobile) {
      onCloseMobile()
    }
  }

  const notifications = [
    {
      id: 1,
      title: "新交易通知",
      message: "您的BTC/USDT订单已成交",
      time: "2分钟前",
      read: false
    },
    {
      id: 2,
      title: "系统维护",
      message: "系统将于今晚23:00进行维护",
      time: "1小时前",
      read: true
    }
  ]

  return (
    <aside className={`w-64 h-screen flex flex-col ${isDark ? "bg-[#1a1d29]" : "bg-white"} border-r ${isDark ? "border-[#252842]" : "border-gray-200"}`}>
      {/* Logo区域 */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          BeDAO
        </h1>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left ${
                isActive
                  ? "bg-[#00D4AA] text-white shadow-sm"
                  : isDark
                  ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* 底部工具栏 */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        {/* 通知下拉菜单 */}
        <div className="relative">
          <button
            onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left ${
              isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="font-medium">{t[language].notifications}</span>
            <div className="ml-auto flex items-center">
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mr-2">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transform ${notificationDropdownOpen ? "rotate-180" : ""}`} />
            </div>
          </button>
          
          {notificationDropdownOpen && (
            <div className={`absolute bottom-full left-0 right-0 mb-2 ${
              isDark ? "bg-[#252842] border-gray-600" : "bg-white border-gray-200"
            } border rounded-lg shadow-lg max-h-64 overflow-y-auto z-50`}>
              <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    {t[language].notifications}
                  </span>
                  <button className="text-sm text-[#00D4AA] hover:underline">
                    {t[language].markAllAsRead}
                  </button>
                </div>
              </div>
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                  !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}>
                  <div className="flex items-start space-x-3">
                    {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                        {notification.title}
                      </p>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 语言切换下拉菜单 */}
        <div className="relative">
          <button
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left ${
              isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Globe2 className="w-5 h-5" />
            <span className="font-medium">{t[language].languageToggle}</span>
            <ChevronDown className={`w-4 h-4 ml-auto transform ${languageDropdownOpen ? "rotate-180" : ""}`} />
          </button>
          
          {languageDropdownOpen && (
            <div className={`absolute bottom-full left-0 right-0 mb-2 ${
              isDark ? "bg-[#252842] border-gray-600" : "bg-white border-gray-200"
            } border rounded-lg shadow-lg z-50`}>
              <button
                onClick={() => {
                  setLanguage("zh")
                  setLanguageDropdownOpen(false)
                }}
                className={`flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <span>中文</span>
                {language === "zh" && <CheckCircle className="w-4 h-4 text-[#00D4AA]" />}
              </button>
              <button
                onClick={() => {
                  setLanguage("en")
                  setLanguageDropdownOpen(false)
                }}
                className={`flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 last:rounded-b-lg ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <span>English</span>
                {language === "en" && <CheckCircle className="w-4 h-4 text-[#00D4AA]" />}
              </button>
            </div>
          )}
        </div>

        {/* 主题切换 */}
        <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}>
          <Settings className="w-5 h-5" />
          <span className="font-medium flex-1">{t[language].themeToggle}</span>
          <ThemeToggle />
        </div>

        {/* 用户设置 */}
        <button
          onClick={() => handleNavigation("/settings")}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-left ${
            isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="font-medium">{t[language].settings}</span>
        </button>
      </div>
    </aside>
  )
}