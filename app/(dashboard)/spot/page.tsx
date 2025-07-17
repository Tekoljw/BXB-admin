"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"

// Import the actual page components
import FuturesPage from "../futures/page"
import FinancePage from "../finance/page"

export default function SpotPage() {
  const { theme } = useTheme()
  const [activeMobileTab, setActiveMobileTab] = useState("现货交易")
  const [mounted, setMounted] = useState(false)
  const isDark = theme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  const mobileTabOptions = ["现货交易", "合约交易", "理财投资"]

  // Mobile tab content switcher
  const renderMobileContent = () => {
    switch (activeMobileTab) {
      case "合约交易":
        return <FuturesPage />
      case "理财投资":
        return <FinancePage />
      default:
        return (
          <div className="p-3 md:p-6">
            <div className="text-center py-20">
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                现货交易
              </h2>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                现货交易功能正在开发中...
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* Mobile Tabs - Only visible on mobile */}
      <div className="md:hidden">
        <div className="p-4 pb-0">
          <div className="relative flex bg-gray-100 dark:bg-[#252842] rounded-lg p-1">
            {/* Sliding background */}
            <div 
              className="absolute bg-white dark:bg-white rounded-md transition-transform duration-300 ease-in-out"
              style={{ 
                width: 'calc(33.333% - 4px)', 
                height: 'calc(100% - 8px)',
                top: '4px',
                left: '4px',
                transform: `translateX(${mobileTabOptions.indexOf(activeMobileTab) * 100}%)`
              }}
            />
            
            {/* Tab buttons */}
            {mobileTabOptions.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMobileTab(tab)}
                className={`relative z-10 flex-1 py-2 px-3 text-sm font-medium transition-colors duration-300 ${
                  activeMobileTab === tab
                    ? "text-black"
                    : isDark
                      ? "text-gray-400"
                      : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="md:hidden">
        {renderMobileContent()}
      </div>

      {/* Desktop content - show original spot page content */}
      <div className="hidden md:block">
        <div className="p-3 md:p-6">
          <div className="text-center py-20">
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
              现货交易 (桌面版)
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              现货交易功能正在开发中...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}