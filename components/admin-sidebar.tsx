"use client"

import React from "react"
import {
  BarChart3,
  Users,
  MessageSquare,
  Share2,
  TrendingUp,
  DollarSign,
  Shield,
  CreditCard,
  ArrowLeftRight,
  FileText,
  PiggyBank,
  Wallet,
  Banknote,
  ShoppingCart,
  LogOut,
  Menu,
  ChevronDown,
  KeyRound,
  User as UserIcon,
  Settings,
} from "lucide-react"
import { useAdmin } from "@/contexts/admin-context"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import ChangePasswordModal from "./change-password-modal"

interface AdminSidebarProps {
  currentPage: string
  onNavigate: (path: string) => void
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
}

export default function AdminSidebar({ currentPage, onNavigate, isExpanded, setIsExpanded }: AdminSidebarProps) {
  const { logout } = useAdmin()
  const router = useRouter()
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    logout()
    router.push("/chat")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false)
      }
    }

    if (showAccountMenu) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showAccountMenu])

  const adminNavItems = [
    { path: "/admin/operations/dashboard", icon: BarChart3, label: "运营管理" },
    { path: "/admin/users/all", icon: Users, label: "用户管理" },
    { path: "/admin/im/accounts", icon: MessageSquare, label: "IM管理" },
    { path: "/admin/social", icon: Share2, label: "社交管理" },
    { path: "/admin/fiat/c2c", icon: DollarSign, label: "法币管理" },
    { path: "/admin/escrow", icon: Shield, label: "担保管理" },
    { path: "/admin/ucard", icon: CreditCard, label: "U卡管理" },
    { path: "/admin/spot/coins", icon: ArrowLeftRight, label: "现货管理" },
    { path: "/admin/futures", icon: FileText, label: "合约管理" },
    { path: "/admin/finance", icon: PiggyBank, label: "理财管理" },
    { path: "/admin/commission/futures", icon: Wallet, label: "佣金管理" },
    { path: "/admin/bepay", icon: Banknote, label: "BePay管理" },
    { path: "/admin/orders/funds", icon: ShoppingCart, label: "财务管理" },
    { path: "/admin/it", icon: Settings, label: "系统管理" },
  ]

  const isActive = (path: string) => {
    // 对于运营管理、订单管理、IM管理、用户管理、现货管理和佣金管理，只要当前页面以对应路径开头就视为激活状态
    if (path === "/admin/operations/dashboard" && currentPage.startsWith("/admin/operations")) {
      return true
    }
    if (path === "/admin/orders/funds" && currentPage.startsWith("/admin/orders")) {
      return true
    }
    if (path === "/admin/im/accounts" && currentPage.startsWith("/admin/im")) {
      return true
    }
    if (path === "/admin/users/all" && currentPage.startsWith("/admin/users")) {
      return true
    }
    if (path === "/admin/spot/coins" && currentPage.startsWith("/admin/spot")) {
      return true
    }
    if (path === "/admin/commission/futures" && currentPage.startsWith("/admin/commission")) {
      return true
    }
    if (path === "/admin/fiat/c2c" && currentPage.startsWith("/admin/fiat")) {
      return true
    }
    return currentPage === path
  }

  return (
    <div 
      className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col shadow-2xl shadow-black/20 relative overflow-hidden h-full"
      style={{
        width: isExpanded ? '256px' : '96px',
        transition: 'width 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
        minHeight: '100vh',
      }}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-custom-green/5 via-transparent to-gray-700/5 opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-custom-green/2 to-transparent"></div>
      
      {/* Header */}
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


      {/* 导航菜单 */}
      <div className={`relative z-10 flex-1 ${isExpanded ? 'p-2' : 'p-1'} flex flex-col justify-start min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar`}>
        <div className="flex flex-col justify-start pt-4" style={{gap: 'clamp(0.25rem, 2vh, 0.75rem)'}}>
          {adminNavItems.map((item, index) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <div key={item.path} className="relative group">
                <button
                  onClick={() => onNavigate(item.path)}
                  className={`${isExpanded ? 'w-full px-4' : 'w-12 h-12 mx-auto'} flex items-center justify-center rounded-xl transition-all duration-500 ease-in-out transform relative overflow-hidden ${
                    active 
                      ? "bg-gradient-to-r from-custom-green/20 to-custom-green/10" 
                      : "hover:scale-105 hover:bg-gray-700/20"
                  }`}
                  style={{ 
                    padding: isExpanded ? 'clamp(0.5rem, 1.5vh, 1rem) 1rem' : '0',
                    animationDelay: `${index * 50}ms`,
                  }}
                  title={!isExpanded ? item.label : undefined}
                >
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-custom-green/10 to-custom-green/5 rounded-xl"></div>
                  )}
                  
                  {!active && (
                    <div className={`absolute inset-1 border border-custom-green/0 group-hover:border-custom-green/30 transition-all duration-400 ease-in-out ${isExpanded ? 'rounded-lg' : 'rounded-lg'}`}></div>
                  )}
                  
                  <div className={`relative transition-all duration-300 ${active ? 'text-custom-green' : 'group-hover:scale-110 group-hover:text-custom-green'}`}>
                    <Icon size={22} />
                  </div>
                  
                  <div 
                    className={`${isExpanded ? 'ml-4' : 'ml-0'} overflow-hidden transition-all duration-500 ease-in-out`}
                    style={{
                      width: isExpanded ? '120px' : '0px',
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      active ? 'text-white font-semibold' : 'text-white group-hover:text-custom-green'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  
                  {active && isExpanded && (
                    <div className="absolute right-2 w-2 h-8 bg-gradient-to-b from-custom-green to-custom-green/70 rounded-full"></div>
                  )}
                </button>
                
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

      {/* 账号菜单 */}
      <div className="relative z-10 p-4 border-t border-gray-700/50" ref={accountMenuRef}>
        <button
          onClick={() => setShowAccountMenu(!showAccountMenu)}
          className={`${isExpanded ? 'w-full px-4' : 'w-12 h-12 mx-auto'} flex items-center justify-between rounded-xl transition-all duration-300 hover:bg-gray-700/50 group relative`}
          style={{ padding: isExpanded ? '0.75rem 1rem' : '0' }}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-custom-green to-custom-green/80 flex items-center justify-center">
              <UserIcon size={18} className="text-white" />
            </div>
            {isExpanded && (
              <div className="ml-3 text-left">
                <div className="text-sm font-medium text-white">admin</div>
                <div className="text-xs text-gray-400">管理员</div>
              </div>
            )}
          </div>
          {isExpanded && (
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${showAccountMenu ? 'rotate-180' : ''}`} />
          )}
        </button>

        {showAccountMenu && (
          <div className={`absolute ${isExpanded ? 'bottom-full left-4 right-4' : 'bottom-full left-1/2 -translate-x-1/2'} mb-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden`}>
            <button
              onClick={() => {
                setShowAccountMenu(false)
                setShowChangePassword(true)
              }}
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
            >
              <KeyRound size={18} className="text-custom-green" />
              <span>修改密码</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-gray-700 transition-colors flex items-center space-x-3 border-t border-gray-700"
            >
              <LogOut size={18} className="text-red-400" />
              <span>退出登录</span>
            </button>
          </div>
        )}
      </div>

      <ChangePasswordModal 
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  )
}
