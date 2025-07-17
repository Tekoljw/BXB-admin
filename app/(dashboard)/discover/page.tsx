"use client"

import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useTranslation } from "@/hooks/use-translation"

// Import existing page components
import SocialPage from "../social/page"
import MarketPage from "../market/page"

export default function DiscoverPage() {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === "dark"
  const [activeTab, setActiveTab] = useState<"social" | "market">("social")

  const tabs = [
    { id: "social", label: t("nav.social"), component: SocialPage },
    { id: "market", label: t("nav.market"), component: MarketPage }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || SocialPage

  return (
    <div className="h-full flex flex-col">
      {/* Mobile Tab Navigation */}
      <div className={`flex border-b ${
        isDark ? "border-[#2a2d42] bg-[#1a1d29]" : "border-gray-200 bg-white"
      }`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "social" | "market")}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? isDark 
                  ? "text-[#00D4AA] bg-[#2a2d42]" 
                  : "text-[#00D4AA] bg-gray-50"
                : isDark 
                  ? "text-gray-400 hover:text-gray-300" 
                  : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D4AA]" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <ActiveComponent />
      </div>
    </div>
  )
}