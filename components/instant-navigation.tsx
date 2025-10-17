"use client"

import React, { useState, useEffect } from "react"

import { useTheme } from "@/contexts/theme-context"
import { useChat } from "@/contexts/chat-context"
import { useAdmin } from "@/contexts/admin-context"
import AccountDropdown from "@/components/account-dropdown"
import AdminSidebar from "@/components/admin-sidebar"
import {
  MessageCircle,
  Compass,
  ShoppingBag,
  DollarSign,
  LineChart,
  ArrowLeftRight,
  BarChart3,
  Wallet,
  Settings,
  Bell,
  Globe2,
  Sun,
  Moon,
  Menu,
  User,
  Shield,
  TrendingUp,
  PiggyBank,
} from "lucide-react"
import { createPortal } from "react-dom"

// Import all page components directly to avoid compilation delays
import ChatPage from "@/app/(dashboard)/chat/page"
import MomentsPage from "@/app/(dashboard)/moments/page"
import MallPage from "@/app/(dashboard)/mall/page"
import WalletPage from "@/app/(dashboard)/wallet/page"
import ProfilePage from "@/app/(dashboard)/profile/page"

import USDTTradePage from "@/app/(dashboard)/usdt-trade/page"
import MarketPage from "@/app/(dashboard)/market/page"
import SpotPage from "@/app/(dashboard)/spot/page"
import FuturesPage from "@/app/(dashboard)/futures/page"
import FinancePage from "@/app/(dashboard)/finance/page"
import AdminPage from "@/app/(dashboard)/admin/page"
import AdminLoginPage from "@/app/(dashboard)/admin/login/page"
import DashboardPage from "@/app/(dashboard)/admin/operations/dashboard/page"
import UsersManagementPage from "@/app/(dashboard)/admin/users/page"
import IMManagementPage from "@/app/(dashboard)/admin/im/page"
import SocialManagementPage from "@/app/(dashboard)/admin/social/page"
import MarketManagementPage from "@/app/(dashboard)/admin/market/page"
import FiatManagementPage from "@/app/(dashboard)/admin/fiat/page"
import EscrowManagementPage from "@/app/(dashboard)/admin/escrow/page"
import UCardManagementPage from "@/app/(dashboard)/admin/ucard/page"
import SpotManagementPage from "@/app/(dashboard)/admin/spot/page"
import FuturesManagementPage from "@/app/(dashboard)/admin/futures/page"
import FinanceManagementPage from "@/app/(dashboard)/admin/finance/page"
import WalletManagementPage from "@/app/(dashboard)/admin/wallet/page"
import BePayManagementPage from "@/app/(dashboard)/admin/bepay/page"
import OrdersManagementPage from "@/app/(dashboard)/admin/orders/page"
import TetherIcon from "@/components/tether-icon"

interface InstantNavigationProps {
  onCloseMobile?: () => void
}

export default function InstantNavigation({ onCloseMobile }: InstantNavigationProps) {
  const [currentPage, setCurrentPage] = useState("/chat")
  const [isExpanded, setIsExpanded] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // 检测移动端
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const [notificationFilter, setNotificationFilter] = useState<"all" | "system" | "activity" | "important">("all")
  const { theme, setTheme, language, setLanguage } = useTheme()
  const { showMobileChat } = useChat()
  const { isAdminLoggedIn } = useAdmin()

  useEffect(() => {
    // Initialize current page from URL on mount
    const path = window.location.pathname
    setCurrentPage(path || "/chat")
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLanguageDropdown) {
        setShowLanguageDropdown(false)
      }
      if (showNotificationDropdown) {
        setShowNotificationDropdown(false)
      }
    }

    if (showLanguageDropdown || showNotificationDropdown) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showLanguageDropdown, showNotificationDropdown])

  const navigate = (path: string) => {
    // 如果访问管理页面但未登录，跳转到登录页
    if (path.startsWith('/admin') && path !== '/admin/login' && !isAdminLoggedIn) {
      setCurrentPage('/admin/login')
      onCloseMobile?.()
      window.history.pushState({}, "", '/admin/login')
      return
    }
    
    setCurrentPage(path)
    onCloseMobile?.()
    // Update URL without triggering page reload
    window.history.pushState({}, "", path)
  }

  const handleLanguageSelect = (lang: "en" | "zh") => {
    setLanguage(lang)
    setShowLanguageDropdown(false)
  }

  const isActive = (path: string) => currentPage === path

  const navItems = [
    { path: "/chat", icon: MessageCircle, label: "聊天", component: ChatPage },
    { path: "/moments", icon: Compass, label: "分享", component: MomentsPage },
    { path: "/usdt-trade", icon: DollarSign, label: "USDT", component: USDTTradePage },
    { path: "/market", icon: LineChart, label: "行情", component: MarketPage },
    { path: "/spot", icon: ArrowLeftRight, label: "现货", component: SpotPage },
    { path: "/futures", icon: BarChart3, label: "合约", component: FuturesPage },
    { path: "/finance", icon: PiggyBank, label: "理财", component: FinancePage },
    { path: "/wallet", icon: Wallet, label: "钱包", component: WalletPage },
    { path: "/admin", icon: Shield, label: "管理", component: AdminPage },
  ]

  // 底部导航项（移动端）
  const mobileNavItems = [
    { path: "/chat", icon: MessageCircle, label: "聊天", component: ChatPage },
    { path: "/moments", icon: Compass, label: "发现", component: MomentsPage },
    { path: "/usdt-trade", icon: DollarSign, label: "USDT", component: USDTTradePage },
    { path: "/spot", icon: BarChart3, label: "交易", component: SpotPage },
    { path: "/wallet", icon: Wallet, label: "钱包", component: WalletPage },
  ]

  const renderCurrentPage = () => {
    const currentItem = navItems.find(item => item.path === currentPage)
    if (currentItem) {
      const Component = currentItem.component
      return <Component />
    }

    // Handle profile page separately
    if (currentPage === "/profile") {
      return <ProfilePage />
    }

    // Handle admin pages
    if (currentPage === "/admin/login") return <AdminLoginPage />
    if (currentPage === "/admin") return <AdminPage />
    if (currentPage === "/admin/operations") return <DashboardPage />
    if (currentPage === "/admin/users") return <UsersManagementPage />
    if (currentPage === "/admin/im") return <IMManagementPage />
    if (currentPage === "/admin/social") return <SocialManagementPage />
    if (currentPage === "/admin/market") return <MarketManagementPage />
    if (currentPage === "/admin/fiat") return <FiatManagementPage />
    if (currentPage === "/admin/escrow") return <EscrowManagementPage />
    if (currentPage === "/admin/ucard") return <UCardManagementPage />
    if (currentPage === "/admin/spot") return <SpotManagementPage />
    if (currentPage === "/admin/futures") return <FuturesManagementPage />
    if (currentPage === "/admin/finance") return <FinanceManagementPage />
    if (currentPage === "/admin/wallet") return <WalletManagementPage />
    if (currentPage === "/admin/bepay") return <BePayManagementPage />
    if (currentPage === "/admin/orders") return <OrdersManagementPage />

    return <ChatPage />
  }

  // 移动端布局
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        {/* 主要内容区域 */}
        <div className="flex-1 overflow-auto pb-20">
          {renderCurrentPage()}
        </div>
        
        {/* 底部导航栏 */}
        {/* 隐藏底部菜单当手机聊天界面打开时 */}
        {!showMobileChat && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
            <div className="flex items-center justify-around py-2">
              {mobileNavItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
                      active 
                        ? "text-custom-green" 
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                  >
                    {item.path === '/usdt-trade' ? (
                      <TetherIcon className={`w-6 h-6 ${active ? 'text-custom-green' : 'text-gray-500 dark:text-gray-400'}`} />
                    ) : (
                      <Icon size={24} />
                    )}
                    <span className={`text-xs mt-1 ${active ? 'font-medium' : 'font-normal'}`}>
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  // 检查是否在管理员模式
  const isAdminMode = currentPage.startsWith('/admin') && isAdminLoggedIn

  // 桌面端布局（原有的侧边栏布局）
  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} overflow-hidden`}>
      {/* Sidebar - 根据模式显示不同的侧边栏 */}
      {isAdminMode ? (
        <AdminSidebar 
          currentPage={currentPage}
          onNavigate={navigate}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      ) : (
        <div 
        className={`${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-900 via-black to-gray-900'} text-white flex flex-col shadow-2xl shadow-black/20 relative overflow-hidden h-full`}
        style={{
          width: isExpanded ? '256px' : '96px',
          transition: 'width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
          minHeight: '100vh',
        }}
      >
        {/* Background Overlay with Static Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-custom-green/5 via-transparent to-gray-700/5 opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-custom-green/2 to-transparent"></div>
        
        {/* Header - Hamburger Menu with Glow Effect */}
        <div className="relative z-10 h-14 flex items-center justify-center px-3 backdrop-blur-sm">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-3 hover:bg-gray-700/50 rounded-xl transition-all duration-300 hover:scale-110 group relative overflow-hidden"
            title={isExpanded ? "收起侧边栏" : "展开侧边栏"}
          >
            <div className="relative transition-all duration-300 group-hover:rotate-180">
              <Menu size={22} />
            </div>
          </button>
        </div>

        {/* User Section with Account Dropdown */}
        <div className={`relative z-10 ${isExpanded ? 'px-4 py-4' : 'px-0 py-4'} backdrop-blur-sm`}>
          <div className={`flex items-center ${isExpanded ? 'space-x-3' : 'justify-center w-full'} transition-all duration-500`}>
            <AccountDropdown onNavigate={navigate} />
            {isExpanded && (
              <div 
                className="ml-3 overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  width: '140px',
                  opacity: 1,
                }}
              >
                <div className="text-sm font-medium text-white whitespace-nowrap text-center">John Doe</div>
                <div className="text-xs text-gray-400 whitespace-nowrap text-center">
                  demo@example.com
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation with Enhanced Animations */}
        <div className={`relative z-10 flex-1 ${isExpanded ? 'p-2' : 'p-1'} flex flex-col justify-start min-h-0 overflow-hidden`}>
          <div className="flex flex-col justify-start pt-4" style={{gap: 'clamp(0.25rem, 2vh, 0.75rem)'}}>
          {navItems.map((item, index) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <div key={item.path} className="relative group">
                <button
                  onClick={() => navigate(item.path)}
                  className={`${isExpanded ? 'w-full px-4' : 'w-12 h-12 mx-auto'} flex items-center justify-center rounded-xl transition-all duration-500 ease-in-out transform relative overflow-hidden ${
                    active 
                      ? "bg-gradient-to-r from-custom-green/20 to-custom-green/10" 
                      : "hover:scale-105 hover:bg-gray-700/20"
                  }`}
                  style={{ 
                    padding: isExpanded ? 'clamp(0.5rem, 1.5vh, 1rem) 1rem' : '0',
                    animationDelay: `${index * 50}ms`,
                    animation: 'slideInLeft 0.6s ease-out forwards'
                  }}
                  title={!isExpanded ? item.label : undefined}
                >
                  {/* Active Item Background Glow */}
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-custom-green/10 to-custom-green/5 rounded-xl"></div>
                  )}
                  
                  {/* Hover Border Effect - Only for non-active items */}
                  {!active && (
                    <div className={`absolute inset-1 border border-custom-green/0 group-hover:border-custom-green/30 transition-all duration-400 ease-in-out ${isExpanded ? 'rounded-lg' : 'rounded-lg'}`}></div>
                  )}
                  
                  {/* Icon with Simple Animation */}
                  <div className={`relative transition-all duration-300 ${active ? 'text-custom-green' : 'group-hover:scale-110 group-hover:text-custom-green'}`}>
                    {item.path === '/usdt-trade' ? (
                      <div className={`transition-all duration-300 ${active ? 'text-custom-green' : 'text-gray-300'}`}>
                        <TetherIcon className="w-[26px] h-[26px]" />
                      </div>
                    ) : (
                      <Icon size={26} />
                    )}
                  </div>
                  
                  {/* Label with Smooth Slide Animation */}
                  <div 
                    className={`${isExpanded ? 'ml-4' : 'ml-0'} overflow-hidden transition-all duration-500 ease-in-out`}
                    style={{
                      width: isExpanded ? '120px' : '0px',
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    <span className={`text-base font-medium whitespace-nowrap transition-all duration-300 ${
                      active ? 'text-white font-semibold' : 'text-white group-hover:text-custom-green'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  
                  {/* Active Indicator - Only show when expanded */}
                  {active && isExpanded && (
                    <div className="absolute right-2 w-2 h-8 bg-gradient-to-b from-custom-green to-custom-green/70 rounded-full"></div>
                  )}
                </button>
                
                {/* Tooltip for Collapsed State */}
                {!isExpanded && (
                  <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap shadow-xl border border-gray-600">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45 border-l border-b border-gray-600"></div>
                  </div>
                )}
              </div>
            )
          })}
          </div>
        </div>

        {/* Footer with Enhanced Controls */}
        <div className="relative z-10 backdrop-blur-sm">
          <div className={`${isExpanded ? 'h-20 flex items-center justify-center gap-6' : 'py-4 flex flex-col items-center gap-3'} transition-all duration-500`}>
            <div className="relative flex justify-center w-full">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowLanguageDropdown(!showLanguageDropdown)
                }}
                className="p-3 hover:bg-gray-700/50 rounded-xl transition-all duration-300 hover:scale-110 group"
                title="语言选择"
              >
                <div className="transition-all duration-300 group-hover:rotate-12 group-hover:text-blue-400">
                  <Globe2 size={20} />
                </div>
              </button>
            </div>
            <div className="flex justify-center w-full">
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-3 hover:bg-gray-700/50 rounded-xl transition-all duration-300 hover:scale-110 group"
                title={theme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}
              >
                <div className="transition-all duration-300 group-hover:rotate-180 group-hover:text-yellow-400">
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </div>
              </button>
            </div>
            <div className="flex justify-center w-full relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  const newState = !showNotificationDropdown
                  setShowNotificationDropdown(newState)
                }}
                className={`p-3 rounded-xl transition-all duration-500 group relative ${
                  showNotificationDropdown 
                    ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 shadow-md shadow-purple-500/20 -translate-y-1' 
                    : 'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:shadow-md hover:shadow-purple-500/20 hover:-translate-y-1'
                }`}
                title="通知"
              >
                <div className={`transition-all duration-500 transform ${
                  showNotificationDropdown 
                    ? 'text-purple-400 rotate-12 scale-125' 
                    : 'group-hover:text-purple-400 group-hover:rotate-12 group-hover:scale-125'
                }`}>
                  <Bell size={20} />
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  5
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Language Dropdown - Positioned outside navigation */}
      {!isAdminMode && showLanguageDropdown && (
        <div 
          className="fixed left-20 bottom-20 bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 min-w-[120px] z-[9999] animate-in fade-in-0 zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
          style={{ 
            zIndex: 9999,
            left: isExpanded ? '272px' : '112px',
            transition: 'left 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
          }}
        >
          <button
            onClick={() => handleLanguageSelect("zh")}
            className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors duration-200 flex items-center ${
              language === "zh" ? "text-custom-green" : "text-white"
            }`}
          >
            <span className="mr-2">🇨🇳</span>
            中文
            {language === "zh" && <span className="ml-auto text-custom-green">✓</span>}
          </button>
          <button
            onClick={() => handleLanguageSelect("en")}
            className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors duration-200 flex items-center ${
              language === "en" ? "text-custom-green" : "text-white"
            }`}
          >
            <span className="mr-2">🇺🇸</span>
            English
            {language === "en" && <span className="ml-auto text-custom-green">✓</span>}
          </button>
        </div>
      )}

      {/* Main Content - Render component directly */}
      <div className="flex-1 overflow-auto">
        {renderCurrentPage()}
      </div>

      {/* Portal-based Notification Dropdown */}
      {!isAdminMode && mounted && showNotificationDropdown && createPortal(
        <div 
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999999,
            pointerEvents: 'none'
          }}
          onClick={() => setShowNotificationDropdown(false)}
        >
          <div 
            style={{ 
              position: 'absolute',
              left: isExpanded ? '272px' : '112px',
              bottom: '80px',
              width: '420px',
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              pointerEvents: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ padding: '20px', borderBottom: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontWeight: '600', fontSize: '16px', color: theme === 'dark' ? '#f9fafb' : '#111827', margin: 0 }}>通知中心</h3>
                <button 
                  onClick={() => window.location.href = "/notifications"}
                  style={{ fontSize: '14px', color: '#2563eb', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '500' }}
                >
                  查看全部
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div style={{ borderBottom: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}` }}>
              <div style={{ display: 'flex', paddingLeft: '20px', paddingRight: '20px' }}>
                {[
                  { id: 'all', label: '全部' },
                  { id: 'trading', label: '交易通知' },
                  { id: 'system', label: '系统通知' },
                  { id: 'social', label: '社交通知' }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    style={{ 
                      padding: '12px 0px',
                      marginRight: '32px',
                      fontSize: '16px', 
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontWeight: '500',
                      color: filter.id === 'all' ? (theme === 'dark' ? '#ffffff' : '#000000') : (theme === 'dark' ? '#9ca3af' : '#6b7280'),
                      borderBottom: filter.id === 'all' ? `2px solid ${theme === 'dark' ? '#ffffff' : '#000000'}` : '2px solid transparent',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (filter.id !== 'all') {
                        e.currentTarget.style.color = theme === 'dark' ? '#d1d5db' : '#374151'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (filter.id !== 'all') {
                        e.currentTarget.style.color = theme === 'dark' ? '#9ca3af' : '#6b7280'
                      }
                    }}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '40px 30px', textAlign: 'center', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  margin: '0 auto 16px', 
                  backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Bell size={40} style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280' }} />
                </div>
              </div>
              <h4 style={{ color: theme === 'dark' ? '#f3f4f6' : '#374151', fontSize: '16px', fontWeight: '500', margin: '0 0 8px 0' }}>暂无新通知</h4>
              <p style={{ color: theme === 'dark' ? '#9ca3af' : '#6b7280', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>当有新的交易、系统或社交通知时，会在这里显示</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}