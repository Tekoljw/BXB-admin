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
  ChevronRight,
  ChevronLeft,
  Wallet,
  ShoppingBag,
  Share2,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { useState, useRef, useEffect, useCallback } from "react"
import ThemeToggle from "@/components/theme-toggle"
import OptimizedButton from "@/components/optimized-button"

interface SideNavigationProps {
  onCloseMobile?: () => void
  onToggleExpanded?: (expanded: boolean) => void
  isExpanded?: boolean
}

export default function SideNavigation({ onCloseMobile, onToggleExpanded, isExpanded: propIsExpanded }: SideNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, theme } = useTheme()
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(propIsExpanded || false)
  const languageDropdownRef = useRef<HTMLDivElement>(null)
  const notificationDropdownRef = useRef<HTMLDivElement>(null)

  // Sync with prop
  useEffect(() => {
    setIsExpanded(propIsExpanded || false)
  }, [propIsExpanded])

  const handleToggleExpand = () => {
    const newExpanded = !isExpanded
    setIsExpanded(newExpanded)
    onToggleExpanded?.(newExpanded)
  }

  // 翻译对象
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
    },
    zh: {
      chat: "聊天",
      moments: "朋友圈",
      usdtTrade: "USDT买卖",
      statistics: "行情",
      spot: "现货",
      futures: "合约",
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

  const handleNavClick = useCallback((path: string) => {
    // 立即更新UI，给用户快速响应感觉
    if (onCloseMobile) {
      onCloseMobile()
    }
    // 使用replace而不是push减少历史堆栈
    router.replace(path)
  }, [onCloseMobile, router])

  // 预加载所有路由以减少首次访问延迟
  useEffect(() => {
    const routes = ['/chat', '/moments', '/usdt-trade', '/market', '/spot', '/futures', '/settings']
    routes.forEach(route => {
      router.prefetch(route)
    })
  }, [router])

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
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/20 flex items-center justify-center mb-2 md:mb-0 ring-2 ring-white/30">
            <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
          </div>
          <div className={`text-center ${isExpanded ? 'md:block' : 'md:hidden'}`}>
            <div className="text-sm font-medium text-white">John Doe</div>
            <div className="text-xs text-white/70">demo@example.com</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-hidden" style={{maxHeight: 'calc(100vh - 100px)', height: 'calc(100vh - 100px)'}}>
        <ul className="h-full flex flex-col justify-between overflow-hidden">
          {/* 聊天 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/chat")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/chat") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? t.chat : undefined}
            >
              <MessageCircle className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>{t.chat}</span>
            </button>
          </li>

          {/* 朋友圈 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/moments")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/moments") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? t.moments : undefined}
            >
              <Share2 className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>{t.moments}</span>
            </button>
          </li>

          {/* 商城 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/mall")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/mall") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? "商城" : undefined}
            >
              <ShoppingBag className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>商城</span>
            </button>
          </li>

          {/* USDT买卖 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/usdt-trade")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/usdt-trade") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? t.usdtTrade : undefined}
            >
              <DollarSign className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>{t.usdtTrade}</span>
            </button>
          </li>

          {/* 行情 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/market")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/market") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? t.statistics : undefined}
            >
              <LineChart className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>{t.statistics}</span>
            </button>
          </li>

          {/* 现货 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/spot")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/spot") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? t.spot : undefined}
            >
              <ArrowLeftRight className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>{t.spot}</span>
            </button>
          </li>

          {/* 合约 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/futures")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/futures") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? t.futures : undefined}
            >
              <FileText className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>{t.futures}</span>
            </button>
          </li>

          {/* 钱包 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/wallet")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/wallet") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? "钱包" : undefined}
            >
              <Wallet className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>钱包</span>
            </button>
          </li>




        </ul>
      </nav>

      {/* Bottom Section - Fixed height */}
      <div className="mt-auto flex-shrink-0" style={{minHeight: '60px', maxHeight: '60px'}}>
        {/* Language Toggle Section */}
        <div className="px-2 md:px-3">
          <div className="relative" ref={languageDropdownRef}>
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className={`group relative flex items-center w-full py-0.5 px-2 ${isExpanded ? 'md:justify-start' : 'md:justify-center'} rounded-lg transition-colors hover:bg-white/10 text-white/70 hover:text-white`}
              title={!isExpanded ? t.languageToggle : undefined}
            >
              <Globe2 className="h-3 w-3 md:h-3 md:w-3" />
              <span className={`ml-2 text-xs ${isExpanded ? 'md:block' : 'md:hidden'}`}>{t.languageToggle}</span>
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

        {/* Compact Controls Row */}
        <div className="px-2 md:px-3 flex items-center justify-center gap-2">
          <div className="flex items-center">
            <ThemeToggle />
          </div>
          <button
            onClick={() => handleNavClick("/settings")}
            className={`p-1 rounded transition-colors hover:bg-white/10 ${
              isActive("/settings") ? "bg-white/20" : "text-white/70 hover:text-white"
            }`}
            title="设置"
          >
            <Settings className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}