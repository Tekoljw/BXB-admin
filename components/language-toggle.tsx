"use client"

import { useTheme } from "@/contexts/theme-context"
import { Globe } from "lucide-react"

export default function LanguageToggle() {
  const { language, setLanguage, isDark } = useTheme()

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh")
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        isDark 
          ? "bg-gray-800 hover:bg-gray-700 text-gray-200" 
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`}
      title={language === "zh" ? "Switch to English" : "切换到中文"}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === "zh" ? "中文" : "EN"}
      </span>
    </button>
  )
}