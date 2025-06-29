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
  Compass,
  Coins,
  TrendingUp,
  PiggyBank,
  AlertTriangle,
} from "lucide-react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import { useTranslation } from "@/hooks/use-translation"
import { useState, useRef, useEffect, useCallback } from "react"
import ThemeToggle from "@/components/theme-toggle"
import OptimizedButton from "@/components/optimized-button"
import TetherIcon from "@/components/tether-icon"

interface SideNavigationProps {
  onCloseMobile?: () => void
  onToggleExpanded?: (expanded: boolean) => void
  isExpanded?: boolean
}

export default function SideNavigation({ onCloseMobile, onToggleExpanded, isExpanded: propIsExpanded }: SideNavigationProps) {
  const [currentPath, setCurrentPath] = useState("/chat")
  const router = useRouter()
  const { language, setLanguage, theme } = useTheme()
  const { t } = useTranslation()
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

  // Navigation items with translations
  const navigationItems = [
    { id: "wallet", icon: Wallet, label: t("nav.wallet"), href: "/wallet" },
    { id: "market", icon: BarChart2, label: t("nav.market"), href: "/market" },
    { id: "spot", icon: Coins, label: t("nav.spot"), href: "/spot" },
    { id: "futures", icon: LineChart, label: t("nav.futures"), href: "/futures" },
    { id: "finance", icon: PiggyBank, label: t("nav.finance"), href: "/finance" },
    { id: "usdt-trade", icon: DollarSign, label: t("nav.usdt_trade"), href: "/usdt-trade" },
    { id: "social", icon: Users, label: t("nav.social"), href: "/social" },
    { id: "chat", icon: MessageCircle, label: t("nav.chat"), href: "/chat" },
    { id: "guarantee", icon: ShoppingBag, label: t("nav.guarantee"), href: "/guarantee" },
  ]

  const isActive = (path: string) => {
    return currentPath === path
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

      <nav className="flex-1 overflow-y-auto" style={{maxHeight: 'calc(100vh - 120px)'}}>
        <ul className="flex flex-col space-y-1 py-2">
          {/* 聊天 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/chat")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/chat") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? "聊天" : undefined}
            >
              <MessageCircle className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>聊天</span>
            </button>
          </li>

          {/* 朋友圈 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/moments")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/moments") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? "朋友圈" : undefined}
            >
              <Compass className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>朋友圈</span>
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
              title={!isExpanded ? "USDT买卖" : undefined}
            >
              <TetherIcon className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>USDT买卖</span>
            </button>
          </li>

          {/* 行情 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/market")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/market") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? "行情" : undefined}
            >
              <LineChart className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>行情</span>
            </button>
          </li>

          {/* 现货 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/spot")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/spot") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? "现货" : undefined}
            >
              <ArrowLeftRight className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>现货</span>
            </button>
          </li>

          {/* 合约 */}
          <li className="flex justify-center md:justify-center">
            <button
              onClick={() => handleNavClick("/futures")}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/futures") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? "合约" : undefined}
            >
              <FileText className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>合约</span>
            </button>
          </li>

          {/* 理财 - TEST VISIBILITY */}
          <li className="flex justify-center md:justify-center" style={{ backgroundColor: 'red', minHeight: '40px' }}>
            <button
              onClick={() => {
                console.log("Financial button clicked");
                handleNavClick("/financial");
              }}
              className={`group relative flex items-center py-1 px-2 ${isExpanded ? 'md:w-full md:justify-start md:px-3' : 'md:p-2 md:w-10 md:h-10 md:justify-center'} rounded-lg transition-colors hover:bg-white/10 ${
                isActive("/financial") ? "bg-white/20" : "text-white/70 hover:text-white"
              }`}
              title={!isExpanded ? "理财" : undefined}
              style={{ backgroundColor: 'green', border: '2px solid yellow', color: 'white' }}
            >
              <Coins className="h-5 w-5 md:h-5 md:w-5" />
              <span className={`ml-3 ${isExpanded ? 'md:block' : 'md:hidden'}`}>理财</span>
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
              title={!isExpanded ? "语言" : undefined}
            >
              <Globe2 className="h-3 w-3 md:h-3 md:w-3" />
              <span className={`ml-2 text-xs ${isExpanded ? 'md:block' : 'md:hidden'}`}>语言</span>
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
          <div className="relative" ref={notificationDropdownRef}>
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

            {notificationDropdownOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-600 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
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
    </div>
  )
}