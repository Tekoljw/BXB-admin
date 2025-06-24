"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
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
} from "lucide-react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/theme-context"
import ThemeToggle from "./theme-toggle"

interface SideNavigationProps {
  onCloseMobile?: () => void
  onToggleExpanded?: (expanded: boolean) => void
  isExpanded?: boolean
}

export default function SideNavigation({ onCloseMobile, onToggleExpanded, isExpanded: propIsExpanded }: SideNavigationProps) {
  const { language, setLanguage, theme } = useTheme()
  const [currentPath, setCurrentPath] = useState("/chat")
  const router = useRouter()
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const languageDropdownRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(propIsExpanded ?? true)

  const isDark = theme === "dark"

  // Navigation items
  const navItems = [
    { path: "/chat", icon: MessageCircle, label: language === "zh" ? "聊天" : "Chat" },
    { path: "/moments", icon: Users, label: language === "zh" ? "朋友圈" : "Moments" },
    { path: "/mall", icon: ShoppingBag, label: language === "zh" ? "商城" : "Mall" },
    { path: "/usdt-trade", icon: DollarSign, label: language === "zh" ? "USDT买卖" : "USDT Trade" },
    { path: "/market", icon: LineChart, label: language === "zh" ? "行情" : "Market" },
    { path: "/spot", icon: ArrowLeftRight, label: language === "zh" ? "现货" : "Spot" },
    { path: "/futures", icon: FileText, label: language === "zh" ? "合约" : "Futures" },
    { path: "/wallet", icon: Wallet, label: language === "zh" ? "钱包" : "Wallet" },
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

  const handleLanguageChange = (lang: "en" | "zh") => {
    setLanguage(lang)
    setLanguageDropdownOpen(false)
  }

  // Handle clicks outside language dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div 
      className={`w-full ${isDark ? "bg-[#374151]" : "bg-black"} text-white flex flex-col`}
      style={{ 
        height: '100vh', 
        maxHeight: '100vh', 
        overflow: 'hidden'
      }}
    >
      {/* Header - Fixed height */}
      <div className="flex-shrink-0 h-20">
        {/* Toggle Button */}
        <div className="hidden md:flex justify-end p-2">
          <button
            onClick={handleToggleExpand}
            className="text-white/70 hover:text-white transition-colors p-1 rounded"
          >
            {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
        
        {/* User Profile */}
        <div className="px-3 py-1">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
              U
            </div>
            <div className={`${isExpanded ? 'md:block' : 'md:hidden'}`}>
              <div className="text-xs font-medium text-white">User</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Takes remaining space */}
      <div className="flex-1 min-h-0 px-2">
        <div className="h-full flex flex-col justify-evenly">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center justify-center md:justify-start px-2 py-2 rounded-lg transition-colors hover:bg-white/10 ${
                  isActive(item.path) ? "bg-white/20" : "text-white/70 hover:text-white"
                }`}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className={`ml-2 text-sm ${isExpanded ? 'md:block' : 'md:hidden'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer - Fixed height */}
      <div className="flex-shrink-0 h-16 border-t border-white/10 px-2 flex items-center justify-center gap-3">
        {/* Language Toggle */}
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="p-2 rounded transition-colors hover:bg-white/10 text-white/70 hover:text-white"
          >
            <Globe2 className="h-4 w-4" />
          </button>

          {languageDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-32 bg-gray-800 rounded-lg shadow-lg border border-gray-600 z-50">
              <div className="py-1">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`flex items-center w-full px-3 py-2 text-sm transition-colors hover:bg-gray-700 ${
                    language === "en" ? "bg-gray-700 text-white" : "text-gray-300"
                  }`}
                >
                  🇺🇸 EN
                </button>
                <button
                  onClick={() => handleLanguageChange("zh")}
                  className={`flex items-center w-full px-3 py-2 text-sm transition-colors hover:bg-gray-700 ${
                    language === "zh" ? "bg-gray-700 text-white" : "text-gray-300"
                  }`}
                >
                  🇨🇳 中文
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Settings */}
        <button
          onClick={() => handleNavClick("/settings")}
          className={`p-2 rounded transition-colors hover:bg-white/10 ${
            isActive("/settings") ? "bg-white/20" : "text-white/70 hover:text-white"
          }`}
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}