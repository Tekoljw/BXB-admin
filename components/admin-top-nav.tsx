"use client"

import React from "react"
import { useTheme } from "@/contexts/theme-context"
import { useAdmin } from "@/contexts/admin-context"
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Share2, 
  DollarSign, 
  Shield, 
  CreditCard, 
  TrendingUp, 
  Copy, 
  PiggyBank, 
  Percent, 
  Wallet, 
  Store, 
  FileText, 
  Settings,
  Sun,
  Moon,
  LogOut
} from "lucide-react"

interface AdminTopNavProps {
  currentModule: string
  onModuleChange: (module: string) => void
}

const modules = [
  { id: "operations", label: "运营报表", icon: BarChart3 },
  { id: "users", label: "用户管理", icon: Users },
  { id: "im", label: "IM管理", icon: MessageSquare },
  { id: "social", label: "社交管理", icon: Share2 },
  { id: "fiat", label: "法币管理", icon: DollarSign },
  { id: "escrow", label: "担保管理", icon: Shield },
  { id: "ucard", label: "U卡管理", icon: CreditCard },
  { id: "spot", label: "现货管理", icon: TrendingUp },
  { id: "futures", label: "合约管理", icon: TrendingUp },
  { id: "copytrade", label: "跟单管理", icon: Copy },
  { id: "finance", label: "理财管理", icon: PiggyBank },
  { id: "commission", label: "佣金管理", icon: Percent },
  { id: "bepay", label: "BePay管理", icon: Store },
  { id: "orders", label: "财务管理", icon: FileText },
  { id: "system", label: "系统管理", icon: Settings },
]

export default function AdminTopNav({ currentModule, onModuleChange }: AdminTopNavProps) {
  const { theme, setTheme } = useTheme()
  const { logout } = useAdmin()

  return (
    <div className={`h-14 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b flex items-center justify-between px-4`}>
      {/* Logo 和品牌 */}
      <div className="flex items-center gap-3 min-w-[200px]">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <h1 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          BeDAO 管理后台
        </h1>
      </div>

      {/* 一级菜单导航 */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto px-4 scrollbar-hide">
        {modules.map((module) => {
          const Icon = module.icon
          const isActive = currentModule === module.id
          
          return (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors
                ${isActive 
                  ? theme === 'dark'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-500 text-white'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{module.label}</span>
            </button>
          )
        })}
      </div>

      {/* 右侧操作按钮 */}
      <div className="flex items-center gap-2 min-w-[120px] justify-end">
        {/* 主题切换 */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`p-2 rounded-md transition-colors ${
            theme === 'dark' 
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* 退出登录 */}
        <button
          onClick={logout}
          className={`p-2 rounded-md transition-colors ${
            theme === 'dark' 
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
          title="退出登录"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
