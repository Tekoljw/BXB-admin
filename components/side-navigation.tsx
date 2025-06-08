"use client"

import {
  Wallet,
  BarChart2,
  Settings,
  MessageSquare,
  User,
  Bell,
  TrendingUp,
  Activity,
  Coins,
  FileText,
  Globe,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTheme } from "@/contexts/theme-context"
import { useState, useRef, useEffect } from "react"
import ThemeToggle from "@/components/theme-toggle"

interface SideNavigationProps {
  onCloseMobile?: () => void
}

const translations = {
  en: {
    chat: "Chat",
    dashboard: "Dashboard",
    moments: "Moments", // 新增
    statistics: "Market",
    spot: "Spot",
    futures: "Futures",
    wallet: "Wallet",
    settings: "Settings",
    notifications: "Notifications",
    authorKaras: "@author Karas",
    markAllAsRead: "Mark all as read",
    viewAllNotifications: "View all notifications",
    themeToggle: "Theme Toggle",
    languageToggle: "Language",
    switchToEnglish: "Switch to English",
    switchToChinese: "切换到中文",
  },
  zh: {
    chat: "聊天",
    dashboard: "动态", // 修改原有的dashboard为动态
    moments: "朋友圈", // 新增
    statistics: "行情",
    spot: "现货",
    futures: "合约",
    wallet: "钱包",
    settings: "设置",
    notifications: "通知",
    authorKaras: "@作者 Karas",
    markAllAsRead: "标记全部已读",
    viewAllNotifications: "查看所有通知",
    themeToggle: "主题切换",
    languageToggle: "语言",
    switchToEnglish: "Switch to English",
    switchToChinese: "切换到中文",
  },
}

export default function SideNavigation({ onCloseMobile }: SideNavigationProps) {
  const pathname = usePathname()
  const { language, setLanguage, theme } = useTheme()
  const t = translations[language]
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const notificationDropdownRef = useRef<HTMLDivElement>(null)
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (onCloseMobile) {
      onCloseMobile()
    }
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  // Debug: Log current pathname
  useEffect(() => {
    console.log("Current pathname:", pathname)
  }, [pathname])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setNotificationDropdownOpen(false)
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false)
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

  // 根据主题动态设置导航栏颜色 - 深色模式使用深蓝灰色
  const navBgColor = theme === "dark" ? "bg-[#374151]" : "bg-black"
  const navTextColor = theme === "dark" ? "text-white" : "text-white"
  const navTextColorMuted = theme === "dark" ? "text-white/70" : "text-white/80"
  const navHoverBg = theme === "dark" ? "hover:bg-white/10" : "hover:bg-white/10"
  const navActiveBg = theme === "dark" ? "bg-white/20" : "bg-white/20"

  return (
    <div className={`w-full h-full flex flex-col ${navBgColor} ${navTextColor}`}>
      {/* User Avatar Section */}
      <div className="p-3 pt-6 md:p-4 md:pt-8">
        <div className="flex flex-col items-center">
          <div
            className={`h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/20 flex items-center justify-center mb-2 md:mb-0 ring-2 ring-white/30`}
          >
            <User className={`h-4 w-4 md:h-5 md:w-5 ${navTextColor}`} />
          </div>
          {/* 移动端显示用户信息，桌面端隐藏 */}
          <div className="text-center md:hidden">
            <div className={`text-sm font-medium ${navTextColor}`}>John Doe</div>
            <div className={`text-xs ${navTextColorMuted}`}>demo@example.com</div>
          </div>
        </div>
      </div>

      <nav className="py-4 flex-1">
        <ul className="space-y-2">
          {/* 聊天 */}
          <li className="flex justify-center md:justify-center">
            <Link
              href="/chat"
              onClick={handleClick}
              className={`group relative flex items-center py-2 px-3 md:p-3 md:w-12 md:h-12 md:justify-center rounded-lg transition-all duration-200 ${navHoverBg} active:bg-white/20 ${
                isActive("/chat") ? navActiveBg : `${navTextColorMuted} hover:${navTextColor}`
              }`}
              title={t.chat}
            >
              <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
                <MessageSquare className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
              </div>
              <span className="ml-3 md:hidden">{t.chat}</span>
            </Link>
          </li>

          {/* 朋友圈 */}
          <li className="flex justify-center md:justify-center">
            <Link
              href="/moments"
              onClick={handleClick}
              className={`group relative flex items-center py-2 px-3 md:p-3 md:w-12 md:h-12 md:justify-center rounded-lg transition-all duration-200 ${navHoverBg} active:bg-white/20 ${
                isActive("/moments") ? navActiveBg : `${navTextColorMuted} hover:${navTextColor}`
              }`}
              title={t.moments}
            >
              <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
                <Globe className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
              </div>
              <span className="ml-3 md:hidden">{t.moments}</span>
            </Link>
          </li>

          {/* 动态 */}
          <li className="flex justify-center md:justify-center">
            <Link
              href="/dashboard"
              onClick={handleClick}
              className={`group relative flex items-center py-2 px-3 md:p-3 md:w-12 md:h-12 md:justify-center rounded-lg transition-all duration-200 ${navHoverBg} active:bg-white/20 ${
                isActive("/dashboard") ? navActiveBg : `${navTextColorMuted} hover:${navTextColor}`
              }`}
              title={t.dashboard}
            >
              <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
                <Activity className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
              </div>
              <span className="ml-3 md:hidden">{t.dashboard}</span>
            </Link>
          </li>

          {/* 行情 */}
          <li className="flex justify-center md:justify-center">
            <Link
              href="/market"
              onClick={handleClick}
              className={`group relative flex items-center py-2 px-3 md:p-3 md:w-12 md:h-12 md:justify-center rounded-lg transition-all duration-200 ${navHoverBg} active:bg-white/20 ${
                isActive("/market") ? navActiveBg : `${navTextColorMuted} hover:${navTextColor}`
              }`}
              title={t.statistics}
            >
              <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
              </div>
              <span className="ml-3 md:hidden">{t.statistics}</span>
            </Link>
          </li>

          {/* 现货 */}
          <li className="flex justify-center md:justify-center">
            <Link
              href="/spot"
              onClick={handleClick}
              className={`group relative flex items-center py-2 px-3 md:p-3 md:w-12 md:h-12 md:justify-center rounded-lg transition-all duration-200 ${navHoverBg} active:bg-white/20 ${
                isActive("/spot") ? navActiveBg : `${navTextColorMuted} hover:${navTextColor}`
              }`}
              title={t.spot}
            >
              <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
                <Coins className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
              </div>
              <span className="ml-3 md:hidden">{t.spot}</span>
            </Link>
          </li>

          {/* 合约 */}
          <li className="flex justify-center md:justify-center">
            <Link
              href="/futures"
              onClick={handleClick}
              className={`group relative flex items-center py-2 px-3 md:p-3 md:w-12 md:h-12 md:justify-center rounded-lg transition-all duration-200 ${navHoverBg} active:bg-white/20 ${
                isActive("/futures") ? navActiveBg : `${navTextColorMuted} hover:${navTextColor}`
              }`}
              title={t.futures}
            >
              <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
                <FileText className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
              </div>
              <span className="ml-3 md:hidden">{t.futures}</span>
            </Link>
          </li>

          {/* 钱包 */}
          <li className="flex justify-center md:justify-center">
            <Link
              href="/wallet"
              onClick={handleClick}
              className={`group relative flex items-center py-2 px-3 md:p-3 md:w-12 md:h-12 md:justify-center rounded-lg transition-all duration-200 ${navHoverBg} active:bg-white/20 ${
                isActive("/wallet") ? navActiveBg : `${navTextColorMuted} hover:${navTextColor}`
              }`}
              title={t.wallet}
            >
              <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
                <Wallet className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
              </div>
              <span className="ml-3 md:hidden">{t.wallet}</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Language Toggle Section */}
      <div className="px-3 md:px-4 py-2">
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className={`group relative flex items-center w-full py-2 md:py-3 px-3 md:justify-center rounded-lg transition-all duration-200 ${navHoverBg} active:bg-white/20 ${navTextColorMuted} hover:${navTextColor}`}
            title={t.languageToggle}
          >
            <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
              <Globe className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
            </div>
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
        <div
          className={`group relative flex items-center w-full py-2 md:py-3 px-3 md:justify-center rounded-lg transition-all duration-200 ${navHoverBg} active:bg-white/20 ${navTextColorMuted} hover:${navTextColor}`}
        >
          <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
            <ThemeToggle />
          </div>
          <span className="ml-3 md:hidden">{t.themeToggle}</span>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="px-3 md:px-4 py-4">
        <div className="relative" ref={notificationDropdownRef}>
          <button
            className={`group relative flex items-center w-full py-2 md:py-3 px-3 md:justify-center rounded-lg transition-all duration-200 ${navHoverBg} active:bg-white/20 ${navTextColorMuted} hover:${navTextColor}`}
            onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
            title={t.notifications}
          >
            <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 relative">
              <Bell className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                12
              </span>
            </div>
            <span className="ml-3 md:hidden">{t.notifications}</span>
          </button>

          {notificationDropdownOpen && (
            <div className="absolute bottom-full left-0 md:left-full md:bottom-0 mb-2 md:mb-0 md:ml-2 w-80 bg-card rounded-lg shadow-lg border border-border z-50 animate-in fade-in slide-in-from-bottom-5 md:slide-in-from-left-5 duration-200">
              <div className="p-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">{t.notifications}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-primary hover:text-primary/90 cursor-pointer">{t.markAllAsRead}</span>
                  </div>
                </div>
              </div>

              <div className="max-h-[350px] overflow-y-auto">
                {/* Sample notification items */}
                <div className="p-3 border-b border-border hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Price Alert</div>
                      <div className="text-xs text-muted-foreground">Bitcoin reached $45,000</div>
                      <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b border-border hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-custom-green flex items-center justify-center">
                      <Wallet className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Transaction Complete</div>
                      <div className="text-xs text-muted-foreground">Your deposit of 0.5 BTC has been confirmed</div>
                      <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b border-border hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <BarChart2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Market Update</div>
                      <div className="text-xs text-muted-foreground">Weekly portfolio report is ready</div>
                      <div className="text-xs text-muted-foreground mt-1">3 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 border-t border-border text-center">
                <button className="text-sm text-primary hover:text-primary/90 font-medium">
                  {t.viewAllNotifications}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings Section */}
      <div className="px-3 md:px-4 py-2">
        <Link
          href="/settings"
          onClick={handleClick}
          className={`group relative flex items-center w-full py-2 md:py-3 px-3 md:justify-center rounded-lg transition-all duration-200 ${navHoverBg} active:bg-white/20 ${
            isActive("/settings") ? navActiveBg : `${navTextColorMuted} hover:${navTextColor}`
          }`}
          title={t.settings}
        >
          <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
            <Settings className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
          </div>
          <span className="ml-3 md:hidden">{t.settings}</span>
        </Link>
      </div>

      {/* Author Section */}
      <div className="px-3 md:px-4 py-4 text-center">
        <a
          href="https://github.com/karasbuilder"
          target="_blank"
          rel="noopener noreferrer"
          className={`text-xs ${navTextColorMuted} hover:${navTextColor} transition-colors duration-200 flex items-center justify-center`}
          title={t.authorKaras}
        >
          <span className="font-medium md:hidden">{t.authorKaras}</span>
          <span className="font-medium hidden md:block">@K</span>
        </a>
      </div>
    </div>
  )
}
