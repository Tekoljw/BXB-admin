"use client"

import React, { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import AccountDropdown from "@/components/account-dropdown"
import {
  MessageCircle,
  Compass,
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
import TetherIcon from "@/components/tether-icon"

interface InstantNavigationProps {
  onCloseMobile?: () => void
}

export default function InstantNavigation({ onCloseMobile }: InstantNavigationProps) {
  const [currentPage, setCurrentPage] = useState("/chat")
  const [isExpanded, setIsExpanded] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme, language, setLanguage } = useTheme()

  useEffect(() => {
    setCurrentPage(pathname)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLanguageDropdown) {
        setShowLanguageDropdown(false)
      }
    }

    if (showLanguageDropdown) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showLanguageDropdown])

  const navigate = (path: string) => {
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
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} overflow-hidden`}>
      {/* Sidebar */}
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
            <AccountDropdown />
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
            <div className="flex justify-center w-full">
              <button 
                onClick={() => navigate("/settings")}
                className="p-3 hover:bg-gray-700/50 rounded-xl transition-all duration-300 hover:scale-110 group"
                title="设置"
              >
                <div className="transition-all duration-300 group-hover:rotate-90 group-hover:text-custom-green">
                  <Settings size={20} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Language Dropdown - Positioned outside navigation */}
      {showLanguageDropdown && (
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
    </div>
  )
}