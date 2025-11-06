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
  FileCheck,
  Settings,
  Sun,
  Moon,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface AdminTopNavProps {
  currentModule: string
  onModuleChange: (module: string) => void
  onToggleSidebar?: () => void
}

const modules = [
  { id: "permissions", label: "权限", icon: Shield },
  { id: "orders", label: "财务", icon: Wallet },
  { id: "operations", label: "报表", icon: BarChart3 },
  { id: "system", label: "审核", icon: FileCheck },
  { id: "users", label: "用户", icon: Users },
  { id: "social", label: "社交", icon: Share2 },
  { id: "im", label: "IM", icon: MessageSquare },
  { id: "fiat", label: "C2C&OTC", icon: DollarSign },
  { id: "copytrade", label: "跟单", icon: Copy },
  { id: "futures", label: "合约", icon: TrendingUp },
  { id: "finance", label: "理财", icon: PiggyBank },
  { id: "ucard", label: "U卡", icon: CreditCard },
  { id: "escrow", label: "担保", icon: Shield },
  { id: "spot", label: "现货", icon: TrendingUp },
  { id: "commission", label: "佣金", icon: Percent },
  { id: "bepay", label: "法币", icon: Store },
]

export default function AdminTopNav({ currentModule, onModuleChange, onToggleSidebar }: AdminTopNavProps) {
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
      // 滚动事件监听
      container.addEventListener('scroll', checkScrollPosition)
      window.addEventListener('resize', checkScrollPosition)
      
      // 鼠标滚轮横向滚动
      const handleWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault()
          container.scrollLeft += e.deltaY
          checkScrollPosition()
        }
      }
      
      container.addEventListener('wheel', handleWheel, { passive: false })
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition)
        window.removeEventListener('resize', checkScrollPosition)
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  return (
    <div className={`h-14 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b flex items-center justify-between px-4`}>
      {/* 桌面端：一级菜单导航（带滚动箭头） */}
      <div className="hidden md:flex flex-1 items-center gap-2">
        {/* 左侧滚动按钮 */}
        <button
          onClick={() => scroll('left')}
          disabled={!showLeftScroll}
          aria-label="向左滚动"
          className={`p-1.5 rounded-md transition-colors flex-shrink-0 ${
            showLeftScroll
              ? theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              : theme === 'dark'
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gray-50 text-gray-300 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only">向左滚动</span>
        </button>

        {/* 滚动容器 */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-hide relative"
          style={{ maxWidth: 'calc(100vw - 250px)' }}
        >
          {modules.map((module) => {
            const Icon = module.icon
            const isActive = currentModule === module.id
            
            return (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module.id)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0
                  ${isActive 
                    ? 'bg-custom-green text-white'
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

        {/* 右侧滚动按钮 */}
        <button
          onClick={() => scroll('right')}
          disabled={!showRightScroll}
          aria-label="向右滚动"
          className={`p-1.5 rounded-md transition-colors flex-shrink-0 ${
            showRightScroll
              ? theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              : theme === 'dark'
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gray-50 text-gray-300 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          <span className="sr-only">向右滚动</span>
        </button>
      </div>

      {/* 移动端：汉堡菜单按钮（左侧） */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'dark' 
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
          aria-label="打开菜单"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {modules.find(m => m.id === currentModule)?.label || 'BeDAO 管理后台'}
        </span>
      </div>

      {/* 右侧操作按钮 */}
      <div className="flex items-center gap-2 min-w-[80px] md:min-w-[120px] justify-end">
        {/* 移动端二级菜单按钮 */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className={`md:hidden p-2 rounded-md transition-colors ${
              theme === 'dark' 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-label="打开子菜单"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        {/* 桌面端：主题切换 */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`hidden md:block p-2 rounded-md transition-colors ${
            theme === 'dark' 
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* 桌面端：退出登录 */}
        <button
          onClick={logout}
          className={`hidden md:block p-2 rounded-md transition-colors ${
            theme === 'dark' 
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
          title="退出登录"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* 移动端一级菜单遮罩层 */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* 移动端一级菜单（从左侧划出） */}
      <div className={`
        md:hidden fixed inset-y-0 left-0 w-72 z-40
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
        shadow-2xl transition-transform duration-300
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
            <div className="flex flex-col h-full">
              {/* 标题栏 */}
              <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  管理模块
                </h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'text-gray-400 hover:bg-gray-700 hover:text-white' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 菜单列表 */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
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
                            ? 'bg-custom-green text-white'
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
              </div>

              {/* 底部操作按钮 */}
              <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="space-y-2">
                  {/* 主题切换 */}
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span className="font-medium">{theme === 'dark' ? '浅色模式' : '深色模式'}</span>
                  </button>

                  {/* 退出登录 */}
                  <button
                    onClick={logout}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">退出登录</span>
                  </button>
                </div>
              </div>
            </div>
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
