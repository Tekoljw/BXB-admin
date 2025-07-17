"use client"

import React, { useState, useEffect } from "react"

import { useTheme } from "@/contexts/theme-context"
import AccountDropdown from "@/components/account-dropdown"
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
import DiscoverPage from "@/app/(dashboard)/discover/page"
import TradingPage from "@/app/(dashboard)/trading/page"
import TetherIcon from "@/components/tether-icon"
import MobileBottomNavigation from "@/components/mobile-bottom-navigation"

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

  const { theme, language, setTheme, setLanguage } = useTheme()

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile navigation items - only 5 items as specified
  const mobileNavItems = [
    { path: "/chat", label: "Chat", icon: MessageCircle },
    { path: "/discover", label: "Discover", icon: Compass },
    { path: "/usdt-trade", label: "USDT", icon: TetherIcon },
    { path: "/trading", label: "Trading", icon: BarChart3 },
    { path: "/wallet", label: "Wallet", icon: Wallet },
  ]

  // Desktop navigation items - full set
  const desktopNavItems = [
    { path: "/chat", label: "聊天", icon: MessageCircle },
    { path: "/moments", label: "动态", icon: Compass },
    { path: "/mall", label: "商城", icon: ShoppingBag },
    { path: "/usdt-trade", label: "USDT交易", icon: TetherIcon },
    { path: "/market", label: "行情", icon: LineChart },
    { path: "/spot", label: "现货交易", icon: ArrowLeftRight },
    { path: "/futures", label: "合约交易", icon: BarChart3 },
    { path: "/finance", label: "理财", icon: PiggyBank },
    { path: "/wallet", label: "钱包", icon: Wallet },
  ]

  const navItems = isMobile ? mobileNavItems : desktopNavItems

  useEffect(() => {
    setMounted(true)
    
    const handleClick = () => {
      setShowLanguageDropdown(false)
      setShowNotificationDropdown(false)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  const navigate = (path: string) => {
    console.log("Navigating to:", path)
    setCurrentPage(path)
    onCloseMobile?.()
  }

  const isActive = (path: string) => {
    return currentPage === path
  }

  const handleLanguageSelect = (newLanguage: "en" | "zh") => {
    setLanguage(newLanguage)
    setShowLanguageDropdown(false)
  }

  const renderCurrentPage = () => {
    // Mobile pages that combine multiple desktop pages
    if (isMobile) {
      if (currentPage === "/discover") {
        return <DiscoverPage />
      }
      if (currentPage === "/trading") {
        return <TradingPage />
      }
    }

    // Handle all pages based on current route
    const pageMap: { [key: string]: React.ComponentType } = {
      "/chat": ChatPage,
      "/moments": MomentsPage,
      "/mall": MallPage,
      "/usdt-trade": USDTTradePage,
      "/market": MarketPage,
      "/spot": SpotPage,
      "/futures": FuturesPage,
      "/finance": FinancePage,
      "/wallet": WalletPage,
      "/profile": ProfilePage,
    }

    const PageComponent = pageMap[currentPage]
    if (PageComponent) {
      return <PageComponent />
    }

    // Default fallback
    return <ChatPage />
  }

  if (!mounted) {
    return <div className="h-screen bg-gray-900"></div>
  }

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} overflow-hidden`}>
      {/* Desktop Sidebar - Hidden on Mobile */}
      {!isMobile && (
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
                      
                      <div className={`relative flex items-center transition-all duration-500 ${
                        active ? 'text-custom-green' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        <div className={`transition-all duration-500 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
                          {item.icon === TetherIcon ? (
                            <TetherIcon size={20} />
                          ) : (
                            <Icon size={20} />
                          )}
                        </div>
                        {isExpanded && (
                          <span 
                            className="ml-3 font-medium whitespace-nowrap transition-all duration-500 ease-in-out"
                            style={{
                              opacity: 1,
                              transform: 'translateX(0)',
                            }}
                          >
                            {item.label}
                          </span>
                        )}
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Settings and Language Section */}
          <div className="relative z-10 mt-auto p-4 backdrop-blur-sm">
            <div className={`flex ${isExpanded ? 'justify-around' : 'flex-col space-y-2 items-center'} w-full`}>
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-3 rounded-xl transition-all duration-500 group relative hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-orange-500/10 hover:shadow-md hover:shadow-yellow-500/20 hover:-translate-y-1 hover:scale-110"
                title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
              >
                <div className="transition-all duration-500 transform group-hover:text-yellow-400 group-hover:rotate-180">
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </div>
              </button>

              {/* Language Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowLanguageDropdown(!showLanguageDropdown)
                }}
                className={`p-3 rounded-xl transition-all duration-500 group relative ${
                  showLanguageDropdown 
                    ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 shadow-md shadow-blue-500/20 -translate-y-1 scale-110' 
                    : 'hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 hover:shadow-md hover:shadow-blue-500/20 hover:-translate-y-1 hover:scale-110'
                }`}
                title="语言设置"
              >
                <div className={`transition-all duration-500 transform ${
                  showLanguageDropdown 
                    ? 'text-blue-400 rotate-180' 
                    : 'group-hover:text-blue-400 group-hover:rotate-180'
                }`}>
                  <Globe2 size={20} />
                </div>
              </button>

              {/* Notification Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowNotificationDropdown(!showNotificationDropdown)
                }}
                className={`p-3 rounded-xl transition-all duration-500 group relative ${
                  showNotificationDropdown 
                    ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 shadow-md shadow-purple-500/20 -translate-y-1 scale-110' 
                    : 'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 hover:shadow-md hover:shadow-purple-500/20 hover:-translate-y-1 hover:scale-110'
                }`}
                title="通知"
              >
                <div className={`transition-all duration-500 transform ${
                  showNotificationDropdown 
                    ? 'text-purple-400 rotate-180' 
                    : 'group-hover:text-purple-400 group-hover:rotate-180'
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
      )}

      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${isMobile ? 'pb-16' : ''}`}>
        {renderCurrentPage()}
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <MobileBottomNavigation currentPage={currentPage} onNavigate={navigate} />
      )}

      {/* Notification Dropdown Portal - Desktop only */}
      {!isMobile && mounted && showNotificationDropdown && createPortal(
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
            <div style={{ padding: '20px', borderBottom: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ color: theme === 'dark' ? '#f3f4f6' : '#111827', fontSize: '18px', fontWeight: '600', margin: 0 }}>
                  通知
                </h3>
                <button 
                  onClick={() => navigate("/notifications")}
                  style={{
                    color: '#3b82f6',
                    fontSize: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  查看全部
                </button>
              </div>
            </div>

            <div style={{ padding: '40px 30px', textAlign: 'center', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  margin: '0 auto 20px auto', 
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

      {/* Language Dropdown Portal - Desktop only */}
      {!isMobile && mounted && showLanguageDropdown && createPortal(
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
          onClick={() => setShowLanguageDropdown(false)}
        >
          <div 
            style={{ 
              position: 'absolute',
              left: isExpanded ? '272px' : '112px',
              bottom: '140px',
              width: '200px',
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              pointerEvents: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '8px 0' }}>
              <button
                onClick={() => handleLanguageSelect('zh')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  textAlign: 'left',
                  background: language === 'zh' ? (theme === 'dark' ? '#374151' : '#f3f4f6') : 'none',
                  border: 'none',
                  color: theme === 'dark' ? '#f3f4f6' : '#111827',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: language === 'zh' ? '500' : '400'
                }}
                onMouseEnter={(e) => {
                  if (language !== 'zh') {
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#374151' : '#f9fafb'
                  }
                }}
                onMouseLeave={(e) => {
                  if (language !== 'zh') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                🇨🇳 中文
              </button>
              <button
                onClick={() => handleLanguageSelect('en')}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  textAlign: 'left',
                  background: language === 'en' ? (theme === 'dark' ? '#374151' : '#f3f4f6') : 'none',
                  border: 'none',
                  color: theme === 'dark' ? '#f3f4f6' : '#111827',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: language === 'en' ? '500' : '400'
                }}
                onMouseEnter={(e) => {
                  if (language !== 'en') {
                    e.currentTarget.style.backgroundColor = theme === 'dark' ? '#374151' : '#f9fafb'
                  }
                }}
                onMouseLeave={(e) => {
                  if (language !== 'en') {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                🇺🇸 English
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}