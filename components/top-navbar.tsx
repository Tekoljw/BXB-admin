"use client"

import React from "react"
import { Bell, Globe2, Sun, Moon, User } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface TopNavbarProps {
  currentSection: string
  onSectionChange: (section: string) => void
  sections: Array<{
    id: string
    label: string
    labelEn: string
  }>
}

export default function TopNavbar({ currentSection, onSectionChange, sections }: TopNavbarProps) {
  const { theme, setTheme, language, setLanguage } = useTheme()
  const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false)

  return (
    <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-custom-green to-emerald-400 bg-clip-text text-transparent">
          BXB
        </div>
      </div>

      {/* 一级导航菜单 */}
      <div className="flex items-center space-x-1">
        {sections.map((section) => {
          const isActive = currentSection === section.id
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-custom-green text-white shadow-lg shadow-custom-green/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {language === "zh" ? section.label : section.labelEn}
            </button>
          )
        })}
      </div>

      {/* 右侧操作栏 */}
      <div className="flex items-center space-x-4">
        {/* 语言切换 */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Globe2 size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
              <button
                onClick={() => {
                  setLanguage("zh")
                  setShowLanguageDropdown(false)
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
              >
                <span>🇨🇳 中文</span>
                {language === "zh" && <span className="text-custom-green">✓</span>}
              </button>
              <button
                onClick={() => {
                  setLanguage("en")
                  setShowLanguageDropdown(false)
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
              >
                <span>🇺🇸 English</span>
                {language === "en" && <span className="text-custom-green">✓</span>}
              </button>
            </div>
          )}
        </div>

        {/* 主题切换 */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {theme === "light" ? (
            <Moon size={20} className="text-gray-600" />
          ) : (
            <Sun size={20} className="text-gray-300" />
          )}
        </button>

        {/* 通知 */}
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* 用户头像 */}
        <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-custom-green to-emerald-400 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </button>
      </div>
    </div>
  )
}
