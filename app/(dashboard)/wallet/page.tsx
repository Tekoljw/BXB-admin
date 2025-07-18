"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft,
  Eye,
  EyeOff,
  Plus,
  Minus,
  BarChart3,
  Shield,
  Gift,
  DollarSign,
  PiggyBank,
  Download,
  Upload,
  RefreshCw,
  ArrowLeftRight,
  ChevronDown,
  Search,
  Settings,
  X,
  Check,
  ArrowUpDown,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  History,
  FileText,
  BarChart2,
  PieChart,
  Power,
  BookOpen,
  ShoppingCart,
  LineChart,
  Banknote,
  Percent,
  CreditCard as CardIcon,
  HandCoins,
  Coins,
  CurrencyDollar,
  Clock,
  CheckCircle,
  Calendar,
  User,
  Briefcase,
  Rocket,
  MessageCircle,
  Users,
  UserPlus,
  Activity,
  ExternalLink,
  Receipt,
  Target,
  HelpCircle,
  Zap,
  Unlock,
  MapPin,
  Crown,
  Building2,
  University,
  Link,
  Landmark,
  Network,
  Repeat,
  Copy,
  Edit,
  Edit2,
  Trash2,
  Lock,
  Key,
  Ban,
  Unlink,
  ChevronRight,
  PauseCircle,
  Play,
  Menu
} from "lucide-react"
import React, { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useTranslation } from "@/hooks/use-translation"
import SkeletonLoader from "@/components/skeleton-loader"
import DollarRefreshIcon from "@/components/dollar-refresh-icon"
import TrendChart from "@/components/wallet/trend-chart"
import KlineChart from "@/components/wallet/kline-chart"
import { useRouter } from "next/navigation"

export default function WalletPage() {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const router = useRouter()
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [topLevelTab, setTopLevelTab] = useState("账户资产") // "账户资产" or "订单记录"
  const [activeTab, setActiveTab] = useState("钱包总览")
  const [orderTab, setOrderTab] = useState("现货订单")
  const [secondaryTab, setSecondaryTab] = useState<string>("") // 二级页签状态 // 订单记录子页签
  const [activeOrderCategory, setActiveOrderCategory] = useState('spot')
  const [activeOrderSubTab, setActiveOrderSubTab] = useState('current')
  const [overviewMode, setOverviewMode] = useState("现金账户") // "现金账户" or "总资产"
  const [overviewTab, setOverviewTab] = useState("现金账户") // Tab for wallet overview: "现金账户" or "总资产"
  const [selectedCurrency, setSelectedCurrency] = useState("USDT")
  const [selectedDisplayCurrency, setSelectedDisplayCurrency] = useState("USDT") // 卡片显示币种
  const [selectedAction, setSelectedAction] = useState("current-positions") // 选中的操作按钮
  const [clickedAction, setClickedAction] = useState("") // 点击的操作按钮
  const [showCurrencyModal, setShowCurrencyModal] = useState(false) // 币种选择弹窗
  const [currencyModalAnimating, setCurrencyModalAnimating] = useState(false) // 币种弹窗动画状态
  const [showAssetModal, setShowAssetModal] = useState(false) // 资产详情弹窗
  const [showMobileSidebar, setShowMobileSidebar] = useState(false) // 移动端侧边栏状态
  const [mobileSidebarAnimating, setMobileSidebarAnimating] = useState(false) // 移动端侧边栏动画状态
  const [isMobile, setIsMobile] = useState(false) // 移动端状态检测
  const isDark = theme === "dark"

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 简化的渲染内容，专注于PC端卡片和功能按钮布局
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 dark:bg-[#0c0e16]">
      {/* PC端内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 主内容区域 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* 顶级页签 */}
            <div className="w-full flex justify-center mb-6">
              <div className={`relative flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'} w-full max-w-md`}>
                <div
                  className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'}`}
                  style={{
                    width: '50%',
                    left: topLevelTab === "账户资产" ? '4px' : '50%',
                    transform: topLevelTab === "账户资产" ? 'translateX(0)' : 'translateX(-4px)'
                  }}
                />
                {["账户资产", "订单记录"].map((tab) => (
                  <button
                    key={tab}
                    className={`relative z-10 flex items-center justify-center text-sm font-medium transition-all duration-300 flex-1 ${
                      topLevelTab === tab
                        ? isDark ? "text-black" : "text-white"
                        : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    style={{ height: '36px' }}
                    onClick={() => setTopLevelTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* 钱包总览内容 - 实现用户要求的PC端布局 */}
            {topLevelTab === "账户资产" && (
              <div className="space-y-6">
                {/* PC端：卡片和功能按钮在同一行，移动端：分成两行 */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* 左侧：卡片区域（PC端居左对齐） */}
                  <div className="flex flex-col md:flex-row gap-6 md:flex-1">
                    {/* 移动端：页签选择器 */}
                    <div className="w-full flex justify-center md:hidden mb-4">
                      <div className={`relative flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'} w-full max-w-md`}>
                        <div
                          className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'}`}
                          style={{
                            width: '50%',
                            left: overviewTab === "现金账户" ? '4px' : '50%',
                            transform: overviewTab === "现金账户" ? 'translateX(0)' : 'translateX(-4px)'
                          }}
                        />
                        {["现金账户", "总资产"].map((tab) => (
                          <button
                            key={tab}
                            className={`relative z-10 flex items-center justify-center text-sm font-medium transition-all duration-300 flex-1 ${
                              overviewTab === tab
                                ? isDark ? "text-black" : "text-white"
                                : isDark
                                ? "text-gray-300 hover:text-white"
                                : "text-gray-700 hover:text-gray-900"
                            }`}
                            style={{ height: '36px' }}
                            onClick={() => setOverviewTab(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 移动端：根据选择显示单张卡片 */}
                    <div className="block md:hidden">
                      {overviewTab === "现金账户" && (
                        <div className={`${isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'} rounded-lg p-4 shadow`}>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <CreditCard className="h-5 w-5 text-[#00D4AA]" />
                              <h3 className="text-base font-semibold">现金账户</h3>
                            </div>
                            <span className="text-sm text-[#00D4AA] font-medium">USDT</span>
                          </div>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {balanceVisible ? "8,567.89" : "****"}
                          </div>
                        </div>
                      )}
                      {overviewTab === "总资产" && (
                        <div className={`${isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'} rounded-lg p-4 shadow`}>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <Wallet className="h-5 w-5 text-[#00D4AA]" />
                              <h3 className="text-base font-semibold">总资产</h3>
                            </div>
                            <span className="text-sm text-[#00D4AA] font-medium">USDT</span>
                          </div>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {balanceVisible ? "19,134.34" : "****"}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* PC端：双卡片并排显示 */}
                    <div className="hidden md:flex gap-6">
                      {/* 现金账户卡片 */}
                      <div className={`${isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'} rounded-lg p-6 shadow flex-1`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-6 w-6 text-[#00D4AA]" />
                            <h3 className="text-lg font-semibold">现金账户</h3>
                          </div>
                          <span className="text-sm text-[#00D4AA] font-medium">USDT</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                          {balanceVisible ? "8,567.89" : "****"}
                        </div>
                      </div>

                      {/* 总资产卡片 */}
                      <div className={`${isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'} rounded-lg p-6 shadow flex-1`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Wallet className="h-6 w-6 text-[#00D4AA]" />
                            <h3 className="text-lg font-semibold">总资产</h3>
                          </div>
                          <span className="text-sm text-[#00D4AA] font-medium">USDT</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                          {balanceVisible ? "19,134.34" : "****"}
                        </div>
                      </div>
                    </div>

                    {/* PC端：页签选择器在卡片下方 */}
                    <div className="hidden md:flex w-full justify-center mt-4">
                      <div className={`relative flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'} w-full max-w-md`}>
                        <div
                          className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'}`}
                          style={{
                            width: '50%',
                            left: overviewTab === "现金账户" ? '4px' : '50%',
                            transform: overviewTab === "现金账户" ? 'translateX(0)' : 'translateX(-4px)'
                          }}
                        />
                        {["现金账户", "总资产"].map((tab) => (
                          <button
                            key={tab}
                            className={`relative z-10 flex items-center justify-center text-sm font-medium transition-all duration-300 flex-1 ${
                              overviewTab === tab
                                ? isDark ? "text-black" : "text-white"
                                : isDark
                                ? "text-gray-300 hover:text-white"
                                : "text-gray-700 hover:text-gray-900"
                            }`}
                            style={{ height: '36px' }}
                            onClick={() => setOverviewTab(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 右侧：功能按钮区域（PC端居右对齐） */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-end md:flex-shrink-0">
                    {/* 主要操作按钮 */}
                    <Button className="bg-[#00D4AA] text-white border-[#00D4AA] hover:bg-[#00D4AA]/90">
                      <Download className="h-4 w-4 mr-1" />
                      入金
                    </Button>
                    <Button className="bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800">
                      <Upload className="h-4 w-4 mr-1" />
                      提币
                    </Button>
                    <Button className="bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      划转
                    </Button>
                    <Button className="bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800">
                      <ArrowLeftRight className="h-4 w-4 mr-1" />
                      兑换
                    </Button>

                    {/* 分隔线 */}
                    <div className={`w-px h-10 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />

                    {/* 图标按钮 */}
                    <Button
                      className="h-10 w-10 bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                      variant="outline"
                      title="资金记录"
                    >
                      <FileText className="h-4 w-4 text-black dark:text-white" />
                    </Button>
                    <Button
                      className="h-10 w-10 bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                      variant="outline"
                      title="订单记录"
                    >
                      <BarChart2 className="h-4 w-4 text-black dark:text-white" />
                    </Button>
                    <Button
                      className="h-10 w-10 bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                      variant="outline"
                      title="历史记录"
                    >
                      <History className="h-4 w-4 text-black dark:text-white" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* 订单记录内容区域 */}
            {topLevelTab === "订单记录" && (
              <div className="space-y-6">
                <div className={`${isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'} rounded-lg p-6 shadow`}>
                  <h2 className="text-xl font-semibold mb-4">订单记录</h2>
                  <p className="text-gray-500">订单记录内容...</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}