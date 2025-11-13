"use client"

import React, { useState, useRef, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useAdmin } from "@/contexts/admin-context"
import { User, Settings, LogOut, ChevronDown } from "lucide-react"

interface AccountMenuProps {
  onNavigate: (path: string) => void
}

export default function AccountMenu({ onNavigate }: AccountMenuProps) {
  const { theme } = useTheme()
  const { adminUser, logout } = useAdmin()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleMenuItemClick = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* 用户头像按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors ${
          theme === 'dark' 
            ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <div className="relative">
          {adminUser?.avatarUrl ? (
            <img 
              src={adminUser.avatarUrl} 
              alt={adminUser.fullName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              theme === 'dark' 
                ? 'bg-gray-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}>
              {adminUser ? getInitials(adminUser.fullName || adminUser.username) : 'A'}
            </div>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border z-50 ${
          theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {/* 用户信息 */}
          <div className={`px-4 py-3 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <p className={`text-sm font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {adminUser?.fullName || adminUser?.username || '管理员'}
            </p>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {adminUser?.email || ''}
            </p>
          </div>

          {/* 菜单项 */}
          <div className="py-1">
            <button
              onClick={() => handleMenuItemClick(() => onNavigate('/admin/account'))}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>个人中心</span>
            </button>
            <button
              onClick={() => handleMenuItemClick(() => onNavigate('/admin/account#security'))}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>安全设置</span>
            </button>
          </div>

          {/* 退出登录 */}
          <div className={`border-t py-1 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              onClick={() => handleMenuItemClick(logout)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                theme === 'dark' 
                  ? 'text-red-400 hover:bg-gray-700 hover:text-red-300' 
                  : 'text-red-600 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span>退出登录</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
