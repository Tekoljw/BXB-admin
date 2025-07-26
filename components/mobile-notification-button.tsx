"use client"

import React from "react"
import { Bell } from "lucide-react"
import { useTheme } from "../contexts/theme-context"

interface MobileNotificationButtonProps {
  onNavigate: (path: string) => void
}

export default function MobileNotificationButton({ onNavigate }: MobileNotificationButtonProps) {
  const { isDark } = useTheme()
  
  return (
    <button 
      onClick={() => onNavigate("/notifications")}
      className={`p-2 rounded-lg ${isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"} relative transition-colors`}
    >
      <Bell className={`h-5 w-5 ${isDark ? "text-white" : "text-gray-700"}`} />
      {/* Notification badge */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
        <span className="text-[8px] text-white font-bold">3</span>
      </div>
    </button>
  )
}