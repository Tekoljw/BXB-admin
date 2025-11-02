"use client"

import React from "react"
import { LucideIcon } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface MenuItem {
  id: string
  label: string
  labelEn: string
  icon: LucideIcon
  path: string
}

interface LeftSidebarProps {
  currentPage: string
  onNavigate: (path: string) => void
  menuItems: MenuItem[]
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
}

export default function LeftSidebar({
  currentPage,
  onNavigate,
  menuItems,
  isExpanded,
  setIsExpanded,
}: LeftSidebarProps) {
  const { language } = useTheme()

  return (
    <div
      className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col shadow-2xl h-full fixed left-0 top-16 bottom-0 z-40 transition-all duration-300"
      style={{
        width: isExpanded ? "256px" : "80px",
      }}
    >
      {/* 展开/收起按钮 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 hover:bg-gray-700/50 transition-colors flex items-center justify-center"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className="w-full h-0.5 bg-white rounded-full"></div>
          <div className="w-full h-0.5 bg-white rounded-full"></div>
          <div className="w-full h-0.5 bg-white rounded-full"></div>
        </div>
      </button>

      {/* 二级菜单列表 */}
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.path
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.path)}
              className={`w-full ${
                isExpanded ? "px-4" : "px-2"
              } py-3 mb-2 flex items-center transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-custom-green/20 to-custom-green/10 border-l-4 border-custom-green"
                  : "hover:bg-gray-700/50"
              }`}
            >
              <div className={`flex items-center ${isExpanded ? "justify-start" : "justify-center"} w-full`}>
                <Icon
                  size={20}
                  className={`${
                    isActive ? "text-custom-green" : "text-gray-300"
                  } flex-shrink-0`}
                />
                {isExpanded && (
                  <span
                    className={`ml-4 text-sm font-medium ${
                      isActive ? "text-custom-green" : "text-gray-200"
                    }`}
                  >
                    {language === "zh" ? item.label : item.labelEn}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
