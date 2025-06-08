"use client"

import {
  BarChart2,
  Settings,
  MessageSquare,
  User,
  Bell,
  TrendingUp,
  Coins,
  Globe,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { useState, useRef, useEffect } from "react"
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
  const languageDropdownRef = useRef<HTMLDivElement>(null)
  const notificationDropdownRef = useRef<HTMLDivElement>(null)

  // 翻译对象
  const t = {
    en: {
      chat: "Chat",
      moments: "Moments",
      statistics: "Market",
      spot: "Spot",
      languageToggle: "Language",
      themeToggle: "Theme",
      notifications: "Notifications",
      markAllAsRead: "Mark all as read",
      settings: "Settings",
    },
    zh: {
      chat: "聊天",
      moments: "朋友圈",
      statistics: "行情",
      spot: "现货",
      languageToggle: "语言",
      themeToggle: "主题",
      notifications: "通知",
      markAllAsRead: "全部已读",
      settings: "设置",
    },
  }[language]

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleNavClick = (path: string) => {
    // 立即更新UI，给用户快速响应感觉
    if (onCloseMobile) {
      onCloseMobile()
    }
    // 使用replace而不是push减少历史堆栈
    router.replace(path)
  }

  // 预加载所有路由以减少首次访问延迟
  useEffect(() => {
    const routes = ['/chat', '/moments', '/market', '/spot', '/dashboard']
    routes.forEach(route => {
      router.prefetch(route)
    })
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setLanguageDropdownOpen(false)
      }
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target as Node)
      ) {
        setNotificationDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLanguageChange = (newLanguage: "en" | "zh") => {
    setLanguage(newLanguage)
    setLanguageDropdownOpen(false)
  }

  const isDark = theme === "dark"

  return (
    <div className={`w-full h-full flex flex-col ${isDark ? "bg-[#374151]" : "bg-black"} text-white`}>
      {/* User Avatar Section */}
      <div className="p-3 pt-6 md:p-4 md:pt-8">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/20 flex items-center justify-center mb-2 md:mb-0 ring-2 ring-white/30">
            <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
          <div className="text-center md:hidden">
            <div className="text-sm font-medium text-white">John Doe</div>
            <div className="text-xs text-white/70">demo@example.com</div>
          </div>
        </div>
      </div>

      <nav className="py-4 flex-1">
        <ul className="space-y-2">
          {/* 聊天 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/chat")}
              className={`group relative flex items-center py-2 px-3 md:p-3 md:w-12 md:h-12 md:justify-center rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/chat") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={t.chat}
            >
              <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
              <span className="ml-3 md:hidden">{t.chat}</span>
            </button>
          </li>

          {/* 朋友圈 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/moments")}
              className={`group relative flex items-center py-2 px-3 md:p-3 md:w-12 md:h-12 md:justify-center rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/moments") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={t.moments}
            >
              <Globe className="h-5 w-5 md:h-6 md:w-6" />
              <span className="ml-3 md:hidden">{t.moments}</span>
            </button>
          </li>

          {/* 行情 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/market")}
              className={`group relative flex items-center py-2 px-3 md:p-3 md:w-12 md:h-12 md:justify-center rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/market") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={t.statistics}
            >
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
              <span className="ml-3 md:hidden">{t.statistics}</span>
            </button>
          </li>

          {/* 现货 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/spot")}
              className={`group relative flex items-center py-2 px-3 md:p-3 md:w-12 md:h-12 md:justify-center rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/spot") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={t.spot}
            >
              <Coins className="h-5 w-5 md:h-6 md:w-6" />
              <span className="ml-3 md:hidden">{t.spot}</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Language Toggle Section */}
      <div className="px-3 md:px-4 py-2">
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="group relative flex items-center w-full py-2 md:py-3 px-3 md:justify-center rounded-lg transition-colors hover:bg-white/10 text-white/70 hover:text-white"
            title={t.languageToggle}
          >
            <Globe className="h-5 w-5 md:h-6 md:w-6" />
            <span className="ml-3 md:hidden">{t.languageToggle}</span>
          </button>

          {/* Language Dropdown */}
          {languageDropdownOpen && (
            <div className="absolute bottom-full left-0 md:left-full md:bottom-0 mb-2 md:mb-0 md:ml-2 w-48 bg-card rounded-lg shadow-lg border border-border z-50 animate-in fade-in slide-in-from-bottom-5 md:slide-in-from-left-5 duration-200">
              <div className="py-2">
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

      {/* Theme Toggle Section */}
      <div className="px-3 md:px-4 py-2">
        <div className="group relative flex items-center w-full py-2 md:py-3 px-3 md:justify-center rounded-lg transition-colors hover:bg-white/10 text-white/70 hover:text-white">
          <ThemeToggle />
          <span className="ml-3 md:hidden">{t.themeToggle}</span>
        </div>
      </div>

      {/* Settings Section */}
      <div className="px-3 md:px-4 py-4">
        <button
          onClick={() => handleNavClick("/settings")}
          className={`group relative flex items-center w-full py-2 md:py-3 px-3 md:justify-center rounded-lg transition-colors hover:bg-white/10 ${
            isActive("/settings") ? "bg-white/20" : "text-white/70 hover:text-white"
          }`}
          title={t.settings}
        >
          <Settings className="h-5 w-5 md:h-6 md:w-6" />
          <span className="ml-3 md:hidden">{t.settings}</span>
        </button>
      </div>
    </div>
  )
}