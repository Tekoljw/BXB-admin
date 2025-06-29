"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, Sun, Moon, Globe } from "lucide-react"
import { useTheme } from "../contexts/theme-context"
import { useTranslation } from "../hooks/use-translation"

// Import page components
import ChatPage from "../app/(dashboard)/chat/page"
import WalletPage from "../app/(dashboard)/wallet/page"
import ProfilePage from "../app/(dashboard)/profile/page"
import NotificationsPage from "../app/(dashboard)/notifications/page"

interface InstantNavigationProps {
  onCloseMobile?: () => void
}

export default function InstantNavigation({ onCloseMobile }: InstantNavigationProps) {
  const { theme, setTheme, language, setLanguage } = useTheme()
  const { t } = useTranslation()
  
  const [currentPage, setCurrentPage] = useState("chat")
  const [isExpanded, setIsExpanded] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)
  const [notificationActiveTab, setNotificationActiveTab] = useState("all")
  
  const sidebarRef = useRef<HTMLDivElement>(null)
  const languageDropdownRef = useRef<HTMLDivElement>(null)
  const notificationDropdownRef = useRef<HTMLDivElement>(null)

  const navigate = (page: string) => {
    setCurrentPage(page)
    if (onCloseMobile) {
      onCloseMobile()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false)
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setShowNotificationDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLanguageSelect = (newLanguage: "zh" | "en") => {
    setLanguage(newLanguage)
    setShowLanguageDropdown(false)
  }

  const menuItems = [
    { id: "chat", icon: "💬", label: t("chat"), labelEn: "Chat" },
    { id: "wallet", icon: "👛", label: t("wallet"), labelEn: "Wallet" },
    { id: "profile", icon: "👤", label: t("profile"), labelEn: "Profile" }
  ]

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "chat": return <ChatPage />
      case "wallet": return <WalletPage />
      case "profile": return <ProfilePage />
      case "notifications": return <NotificationsPage />
      default: return <ChatPage />
    }
  }

  // If we're on notifications page, render it directly
  if (currentPage === "notifications") {
    return <NotificationsPage />
  }

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} overflow-hidden`}>
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-b from-gray-900 via-black to-gray-900'} text-white flex flex-col shadow-2xl shadow-black/20 relative overflow-hidden h-full`}
        style={{
          width: isExpanded ? '256px' : '96px',
          transition: 'width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo */}
        <div className="p-6 text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-custom-green to-emerald-400 bg-clip-text text-transparent">
            {isExpanded ? 'BeDAO' : 'B'}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-gradient-to-r hover:from-custom-green/20 hover:to-emerald-500/20 hover:shadow-lg hover:shadow-custom-green/10 ${
                currentPage === item.id 
                  ? 'bg-gradient-to-r from-custom-green/30 to-emerald-500/30 shadow-lg shadow-custom-green/20 border border-custom-green/20' 
                  : 'hover:bg-gray-700/50'
              }`}
            >
              <span className="text-xl mr-4 group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <span className={`font-medium transition-all duration-300 ${
                isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              } ${currentPage === item.id ? 'text-custom-green' : 'group-hover:text-custom-green'}`}>
                {language === "zh" ? item.label : item.labelEn}
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 space-y-3 border-t border-gray-700/50">
          {/* Theme Toggle */}
          <div className="flex justify-center w-full">
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 hover:bg-gray-700/50 rounded-xl transition-all duration-300 hover:scale-110 group"
              title={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
            >
              <div className="transition-all duration-300 group-hover:ring-2 group-hover:ring-custom-green group-hover:text-custom-green">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </div>
            </button>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center w-full" ref={languageDropdownRef}>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                setShowLanguageDropdown(!showLanguageDropdown)
              }}
              className="p-3 hover:bg-gray-700/50 rounded-xl transition-all duration-300 hover:scale-110 group"
              title="切换语言"
            >
              <div className="transition-all duration-300 group-hover:ring-2 group-hover:ring-custom-green group-hover:text-custom-green">
                <Globe size={20} />
              </div>
            </button>
          </div>

          {/* Notification Button */}
          <div className="flex justify-center w-full" ref={notificationDropdownRef}>
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowNotificationDropdown(!showNotificationDropdown)
                }}
                className={`p-3 hover:bg-gray-700/50 rounded-xl transition-all duration-300 hover:scale-110 group relative ${
                  showNotificationDropdown ? 'bg-gray-600' : ''
                }`}
                title="通知"
              >
                <div className="transition-all duration-300 group-hover:ring-2 group-hover:ring-custom-green group-hover:text-custom-green">
                  <Bell size={20} />
                </div>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                  5
                </span>
              </button>

              {/* Notification Dropdown */}
              {showNotificationDropdown && (
                <div className="absolute right-0 bottom-full mb-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-[9999]"
                     onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">通知</h3>
                      <button 
                        onClick={() => navigate("notifications")}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        查看全部
                      </button>
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-1">
                      {[
                        { key: "all", label: "全部" },
                        { key: "system", label: "系统通知" },
                        { key: "activity", label: "最新活动" },
                        { key: "important", label: "重要通知" }
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            notificationActiveTab === tab.key
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                          onClick={() => setNotificationActiveTab(tab.key)}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Empty State */}
                  <div className="p-4">
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Bell size={20} className="text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 dark:text-white font-medium mb-1">暂无通知</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {notificationActiveTab === "all" && "没有新通知"}
                          {notificationActiveTab === "system" && "没有系统通知"}
                          {notificationActiveTab === "activity" && "没有活动通知"}
                          {notificationActiveTab === "important" && "没有重要通知"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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