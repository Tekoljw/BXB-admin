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
} from "lucide-react"
import { useAdmin } from "@/contexts/admin-context"
import { useRouter } from "next/navigation"

interface AdminSidebarProps {
  currentPage: string
  onNavigate: (path: string) => void
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
}

export default function AdminSidebar({ currentPage, onNavigate, isExpanded, setIsExpanded }: AdminSidebarProps) {
  const { logout } = useAdmin()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/chat")
  }

  const adminNavItems = [
    { path: "/admin/operations", icon: BarChart3, label: "运营报表" },
    { path: "/admin/users", icon: Users, label: "用户管理" },
    { path: "/admin/im", icon: MessageSquare, label: "IM管理" },
    { path: "/admin/social", icon: Share2, label: "社交管理" },
    { path: "/admin/market", icon: TrendingUp, label: "行情管理" },
    { path: "/admin/fiat", icon: DollarSign, label: "法币管理" },
    { path: "/admin/escrow", icon: Shield, label: "担保管理" },
    { path: "/admin/ucard", icon: CreditCard, label: "U卡管理" },
    { path: "/admin/spot", icon: ArrowLeftRight, label: "现货管理" },
    { path: "/admin/futures", icon: FileText, label: "合约管理" },
    { path: "/admin/finance", icon: PiggyBank, label: "理财管理" },
    { path: "/admin/wallet", icon: Wallet, label: "钱包管理" },
    { path: "/admin/bepay", icon: Banknote, label: "BePay管理" },
    { path: "/admin/orders", icon: ShoppingCart, label: "订单管理" },
  ]

  const isActive = (path: string) => currentPage === path

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

      {/* 管理员标识 */}
      <div className={`relative z-10 ${isExpanded ? 'px-4 py-4' : 'px-0 py-4'} backdrop-blur-sm border-b border-gray-700/50`}>
        <div className={`flex items-center ${isExpanded ? 'space-x-3' : 'justify-center w-full'} transition-all duration-500`}>
          <div className="w-10 h-10 bg-gradient-to-br from-custom-green to-custom-green/80 rounded-xl flex items-center justify-center shadow-lg shadow-custom-green/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          {isExpanded && (
            <div className="ml-3 overflow-hidden transition-all duration-500 ease-in-out">
              <div className="text-sm font-medium text-white whitespace-nowrap">管理后台</div>
              <div className="text-xs text-gray-400 whitespace-nowrap">Admin Panel</div>
            </div>
          )}
        </div>
      </div>

      {/* 导航菜单 */}
      <div className={`relative z-10 flex-1 ${isExpanded ? 'p-2' : 'p-1'} flex flex-col justify-start min-h-0 overflow-y-auto custom-scrollbar`}>
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

      {/* 退出按钮 */}
      <div className="relative z-10 p-4 border-t border-gray-700/50">
        <button
          onClick={handleLogout}
          className={`${isExpanded ? 'w-full px-4' : 'w-12 h-12 mx-auto'} flex items-center justify-center rounded-xl transition-all duration-300 hover:bg-red-500/20 group`}
          style={{ padding: isExpanded ? '0.75rem 1rem' : '0' }}
        >
          <LogOut size={22} className="text-red-400 group-hover:text-red-300" />
          {isExpanded && (
            <span className="ml-3 text-sm font-medium text-red-400 group-hover:text-red-300">退出登录</span>
          )}
        </button>
      </div>

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
