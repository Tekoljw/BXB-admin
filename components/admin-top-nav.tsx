"use client"

import React, { useState, useRef, useEffect } from "react"
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
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleModuleClick = (moduleId: string) => {
    onModuleChange(moduleId)
    setMobileMenuOpen(false)
  }

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftScroll(scrollLeft > 0)
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    const scrollAmount = 200
    const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
    
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    checkScrollPosition()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollPosition)
      window.addEventListener('resize', checkScrollPosition)
      return () => {
        container.removeEventListener('scroll', checkScrollPosition)
        window.removeEventListener('resize', checkScrollPosition)
      }
    }
  }, [])

  return (
    <div className={`h-14 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b flex items-center justify-between px-4`}>
      {/* Logo 和品牌 */}
      <div className="flex items-center gap-3 min-w-[160px] md:min-w-[200px]">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <h1 className={`text-base md:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} hidden sm:block`}>
          BeDAO 管理后台
        </h1>
        <h1 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} sm:hidden`}>
          BeDAO
        </h1>
      </div>

      {/* 桌面端：一级菜单导航（带滚动指示器） */}
      <div className="hidden md:flex flex-1 items-center relative px-2">
        {/* 左侧滚动按钮和渐变指示 */}
        {mounted && showLeftScroll && (
          <>
            <div className={`absolute left-0 top-0 bottom-0 w-12 pointer-events-none z-10 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-gray-800 to-transparent' 
                : 'bg-gradient-to-r from-white to-transparent'
            }`} />
            <button
              onClick={() => scroll('left')}
              aria-label="向左滚动"
              className={`absolute left-2 z-20 p-1 rounded-md transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="sr-only">向左滚动</span>
            </button>
          </>
        )}

        {/* 滚动容器 */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 flex items-center gap-1 overflow-x-auto px-10 scrollbar-hide"
        >
          {modules.map((module) => {
            const Icon = module.icon
            const isActive = currentModule === module.id
            
            return (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module.id)}
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

        {/* 右侧滚动按钮和渐变指示 */}
        {mounted && showRightScroll && (
          <>
            <div className={`absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-10 ${
              theme === 'dark' 
                ? 'bg-gradient-to-l from-gray-800 to-transparent' 
                : 'bg-gradient-to-l from-white to-transparent'
            }`} />
            <button
              onClick={() => scroll('right')}
              aria-label="向右滚动"
              className={`absolute right-2 z-20 p-1 rounded-md transition-colors ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
              <span className="sr-only">向右滚动</span>
            </button>
          </>
        )}
      </div>

      {/* 移动端：汉堡菜单按钮 */}
      <div className="flex md:hidden flex-1 justify-center">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            theme === 'dark' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-emerald-500 text-white'
          }`}
        >
          <Menu className="w-4 h-4" />
          <span>{modules.find(m => m.id === currentModule)?.label || '菜单'}</span>
        </button>
      </div>

      {/* 右侧操作按钮 */}
      <div className="flex items-center gap-2 min-w-[80px] md:min-w-[120px] justify-end">
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

      {/* 移动端菜单弹窗 */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <SheetHeader>
            <SheetTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              管理模块
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            {modules.map((module) => {
              const Icon = module.icon
              const isActive = currentModule === module.id
              
              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                    ${isActive 
                      ? theme === 'dark'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-500 text-white'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{module.label}</span>
                </button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>

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
