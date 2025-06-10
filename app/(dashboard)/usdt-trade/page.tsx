"use client"

import { useState, useEffect } from "react"
import { Star, Search, TrendingUp, TrendingDown, Shield, Clock, CreditCard, DollarSign, MessageCircle, Plus } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"

// 简洁线性图表组件
const MiniLineChart = ({ isPositive }: { isPositive: boolean }) => {
  const generateLineData = () => {
    const points = []
    let baseValue = 50

    for (let i = 0; i < 15; i++) {
      const trend = isPositive ? 0.5 : -0.5
      const noise = (Math.random() - 0.5) * 8
      baseValue += trend + noise
      baseValue = Math.max(20, Math.min(80, baseValue))
      points.push(baseValue)
    }

    return points
  }

  const data = generateLineData()
  const width = 112
  const height = 48
  const padding = 4

  const createPath = () => {
    const maxVal = Math.max(...data)
    const minVal = Math.min(...data)
    const range = maxVal - minVal || 1

    const pathData = data
      .map((value, index) => {
        const x = padding + (index / (data.length - 1)) * (width - padding * 2)
        const y = padding + ((maxVal - value) / range) * (height - padding * 2)
        return `${index === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")

    return pathData
  }

  const lineColor = isPositive ? "#13C2A3" : "#ef4444"

  return (
    <div className="w-28 h-12">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`gradient-${isPositive ? "up" : "down"}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={`${createPath()} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
          fill={`url(#gradient-${isPositive ? "up" : "down"})`}
        />

        <path
          d={createPath()}
          fill="none"
          stroke={lineColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
          style={{
            filter: `drop-shadow(0 0 6px ${lineColor}60)`,
          }}
        />
      </svg>
    </div>
  )
}

// 商户评级组件
const MerchantRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${
            star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">({rating}.0)</span>
    </div>
  )
}

// 支付方式图标
const PaymentIcon = ({ type }: { type: string }) => {
  const getIcon = () => {
    switch (type) {
      case "现金送达":
        return <span className="text-lg">🛡️</span>
      case "银行卡":
        return <CreditCard className="w-4 h-4" />
      case "支付宝":
        return <div className="w-4 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">支</div>
      case "微信":
        return <div className="w-4 h-4 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">微</div>
      case "全部":
        return <div className="w-4 h-4 bg-gray-500 rounded text-white text-xs flex items-center justify-center font-bold">全</div>
      default:
        return <DollarSign className="w-4 h-4" />
    }
  }

  return (
    <div className="flex items-center space-x-2">
      {getIcon()}
      <span className="text-sm">{type}</span>
    </div>
  )
}

export default function USDTTradePage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("买入")
  const [selectedAmount, setSelectedAmount] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("全部")
  const [cashTradeFilter, setCashTradeFilter] = useState(false)
  const [tradeMode, setTradeMode] = useState("C2C")
  const [selectedCurrency, setSelectedCurrency] = useState("CNY")
  const [quickPayExpanded, setQuickPayExpanded] = useState(false)
  const [quickPayAmount, setQuickPayAmount] = useState("")
  const isDark = theme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"

  // USDT买卖数据
  const usdtOrders = {
    买入: [
      {
        id: "1",
        merchant: "币安官方商户",
        rating: 5,
        orders: "98.5%",
        totalOrders: "15,234",
        price: "7.24",
        available: "50,000.00",
        minAmount: "100.00",
        maxAmount: "10,000.00",
        payments: ["银行卡", "支付宝", "微信"],
        avgTime: "2分钟",
        isVerified: true,
      },
      {
        id: "2",
        merchant: "火币优选商户",
        rating: 5,
        orders: "99.2%",
        totalOrders: "23,456",
        price: "7.23",
        available: "120,000.00",
        minAmount: "200.00",
        maxAmount: "50,000.00",
        payments: ["银行卡", "支付宝"],
        avgTime: "1分钟",
        isVerified: true,
      },
      {
        id: "3",
        merchant: "OKX认证商户",
        rating: 4,
        orders: "97.8%",
        totalOrders: "8,765",
        price: "7.25",
        available: "80,000.00",
        minAmount: "500.00",
        maxAmount: "20,000.00",
        payments: ["银行卡", "微信"],
        avgTime: "3分钟",
        isVerified: true,
      },
      {
        id: "4",
        merchant: "专业交易商",
        rating: 4,
        orders: "96.5%",
        totalOrders: "5,432",
        price: "7.26",
        available: "30,000.00",
        minAmount: "100.00",
        maxAmount: "5,000.00",
        payments: ["支付宝", "微信"],
        avgTime: "5分钟",
        isVerified: false,
      },
      {
        id: "5",
        merchant: "信誉商户A",
        rating: 5,
        orders: "98.9%",
        totalOrders: "12,345",
        price: "7.22",
        available: "65,000.00",
        minAmount: "300.00",
        maxAmount: "15,000.00",
        payments: ["银行卡"],
        avgTime: "2分钟",
        isVerified: true,
      },
    ],
    卖出: [
      {
        id: "6",
        merchant: "币安官方商户",
        rating: 5,
        orders: "98.5%",
        totalOrders: "15,234",
        price: "7.20",
        available: "100,000.00",
        minAmount: "100.00",
        maxAmount: "10,000.00",
        payments: ["银行卡", "支付宝", "微信"],
        avgTime: "2分钟",
        isVerified: true,
      },
      {
        id: "7",
        merchant: "火币优选商户",
        rating: 5,
        orders: "99.2%",
        totalOrders: "23,456",
        price: "7.19",
        available: "150,000.00",
        minAmount: "200.00",
        maxAmount: "50,000.00",
        payments: ["银行卡", "支付宝"],
        avgTime: "1分钟",
        isVerified: true,
      },
      {
        id: "8",
        merchant: "OKX认证商户",
        rating: 4,
        orders: "97.8%",
        totalOrders: "8,765",
        price: "7.21",
        available: "90,000.00",
        minAmount: "500.00",
        maxAmount: "20,000.00",
        payments: ["银行卡", "微信"],
        avgTime: "3分钟",
        isVerified: true,
      },
      {
        id: "9",
        merchant: "专业交易商",
        rating: 4,
        orders: "96.5%",
        totalOrders: "5,432",
        price: "7.18",
        available: "40,000.00",
        minAmount: "100.00",
        maxAmount: "5,000.00",
        payments: ["支付宝", "微信"],
        avgTime: "5分钟",
        isVerified: false,
      },
    ],
  }

  const tabs = ["买入", "卖出"]
  const paymentFilters = ["全部", "现金送达", "银行卡", "支付宝", "微信"]
  const quickAmounts = ["1000", "5000", "10000", "50000"]

  const filteredOrders = usdtOrders[activeTab].filter((order) => {
    const matchesSearch = order.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPayment = selectedPayment === "全部" || order.payments.includes(selectedPayment)
    return matchesSearch && matchesPayment
  })

  return (
    <div className={`min-h-screen p-4 ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧 - 交易筛选 */}
        <div className={`${cardStyle} rounded-lg p-6`}>
          
          {/* 买入/卖出切换 */}
          <div className="mb-6">
            <div className="flex bg-gray-200 dark:bg-[#252842] rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTab === tab
                      ? tab === "买入"
                        ? "bg-custom-green text-white shadow-md"
                        : "bg-red-500 text-white shadow-md"
                      : isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab} USDT
                </button>
              ))}
            </div>
          </div>

          {/* 币种筛选 */}
          <div className="mb-6">
            <label className={`text-sm font-medium mb-2 block ${isDark ? "text-white" : "text-gray-800"}`}>
              法币类型
            </label>
            <select 
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-md transition-all duration-300 ease-in-out ${
                isDark 
                  ? "bg-[#252842] border-[#3a3d4a] text-white hover:bg-[#2a2d42] focus:bg-[#2a2d42]" 
                  : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50 focus:bg-gray-50"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transform hover:scale-[1.01] focus:scale-[1.01]`}
              style={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: '0',
                animation: 'fadeIn 0.5s ease-in-out forwards'
              }}
            >
              <option value="CNY">CNY (人民币)</option>
              <option value="USD">USD (美元)</option>
              <option value="EUR">EUR (欧元)</option>
              <option value="KRW">KRW (韩元)</option>
              <option value="JPY">JPY (日元)</option>
            </select>
          </div>

          {/* 交易模式选择 */}
          <div className="mb-6">
            <div className="flex bg-gray-200 dark:bg-[#252842] rounded-lg p-1">
              {["C2C", "OTC", "快捷"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTradeMode(mode)}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                    tradeMode === mode
                      ? "bg-white text-gray-800 shadow-sm"
                      : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            
            {/* 优势劣势标签 */}
            <div className={`mt-4 p-4 rounded-lg ${isDark ? "bg-[#252842]" : "bg-gray-50"}`}>
              <div className="flex flex-wrap gap-2">
                {/* 根据交易模式显示不同的标签 */}
                {tradeMode === "C2C" && (
                  <>
                    {/* C2C优势标签 (绿色) */}
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      汇率优惠
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      免手续费
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      支持现金送达
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      支持大额
                    </span>
                    
                    {/* C2C劣势标签 (红色) */}
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      需担保时间
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      需KYC
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      人工交易
                    </span>
                  </>
                )}
                
                {tradeMode === "快捷" && (
                  <>
                    {/* 快捷优势标签 (绿色) */}
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      操作简单
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      秒级到账
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      自动匹配
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      无需等待
                    </span>
                    
                    {/* 快捷劣势标签 (红色) */}
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      汇率略高
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      限额较小
                    </span>
                  </>
                )}
                
                {tradeMode === "OTC" && (
                  <>
                    {/* OTC优势标签 (绿色) */}
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      大额交易
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      专业服务
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      隐私保护
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      定制化
                    </span>
                    
                    {/* OTC劣势标签 (红色) */}
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      门槛较高
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      处理时间长
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      需要审核
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 金额输入 - 仅在C2C和OTC模式下显示 */}
          {(tradeMode === "C2C" || tradeMode === "OTC") && (
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
                交易金额 (CNY)
              </label>
              <input
                type="text"
                value={selectedAmount}
                onChange={(e) => setSelectedAmount(e.target.value)}
                placeholder="请输入金额"
                className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                  isDark
                    ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                }`}
              />
              
              {/* 快捷金额按钮 */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`py-2 px-3 text-xs rounded-md border transition-colors ${
                      selectedAmount === amount
                        ? "border-custom-green bg-custom-green/10 text-custom-green"
                        : isDark
                          ? "border-[#3a3d4a] text-gray-400 hover:border-gray-400"
                          : "border-gray-300 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    ¥{amount}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 支付方式筛选 - 仅在C2C和OTC模式下显示 */}
          {(tradeMode === "C2C" || tradeMode === "OTC") && (
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-3 ${isDark ? "text-white" : "text-gray-700"}`}>
                支付方式
              </label>
              <div className="space-y-3">
                {paymentFilters.map((payment) => (
                  <button
                    key={payment}
                    onClick={() => setSelectedPayment(payment)}
                    className={`w-full flex items-center py-3 px-3 rounded-lg transition-all duration-200 ${
                      selectedPayment === payment
                        ? payment === "现金送达"
                          ? "border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                          : "bg-custom-green/10 text-custom-green border-2 border-custom-green"
                        : isDark
                          ? "border border-[#3a3d4a] hover:border-gray-400 hover:bg-[#252842]"
                          : "border border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                    }`}
                  >
                    <PaymentIcon type={payment} />
                    {payment === "现金送达" && (
                      <div className="ml-auto">
                        <div className={`text-xs px-2 py-1 rounded ${
                          selectedPayment === payment
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-gray-200 text-gray-600"
                        }`}>
                          安全担保
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 市场统计 */}
          <div className={`p-4 rounded-lg ${isDark ? "bg-[#252842]" : "bg-gray-50"}`}>
            <h4 className={`text-sm font-medium mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>市场统计</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">24h成交量</span>
                <span className={`${isDark ? "text-white" : "text-gray-800"}`}>¥12,345,678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">平均价格</span>
                <span className={`${isDark ? "text-white" : "text-gray-800"}`}>¥7.22</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">在线商户</span>
                <span className="text-custom-green">156</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧 - 根据交易模式显示不同内容 */}
        <div className="lg:col-span-3">
          {tradeMode === "C2C" && (
            <>
              {/* C2C模式 - 搜索和筛选栏 */}
              <div className={`${cardStyle} rounded-lg p-4 mb-6`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`} />
                    <input
                      type="text"
                      placeholder="搜索商户名称"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                        isDark
                          ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                      }`}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400">排序:</span>
                    <select className={`px-3 py-2 rounded-lg border text-sm focus:outline-none ${
                      isDark
                        ? "bg-[#252842] border-[#3a3d4a] text-white"
                        : "bg-white border-gray-300 text-gray-800"
                    }`}>
                      <option value="price">价格优先</option>
                      <option value="rating">信誉优先</option>
                      <option value="speed">速度优先</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {tradeMode === "OTC" && (
            <>
              {/* OTC模式 - 搜索和筛选栏 */}
              <div className={`${cardStyle} rounded-lg p-4 mb-6`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`} />
                    <input
                      type="text"
                      placeholder="搜索OTC供应商"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                        isDark
                          ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                      }`}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400">排序:</span>
                    <select className={`px-3 py-2 rounded-lg border text-sm focus:outline-none ${
                      isDark
                        ? "bg-[#252842] border-[#3a3d4a] text-white"
                        : "bg-white border-gray-300 text-gray-800"
                    }`}>
                      <option value="rating">信誉优先</option>
                      <option value="fees">费率优先</option>
                      <option value="limit">限额优先</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={`${cardStyle} rounded-lg p-6`}>
                <div className="space-y-4">
                {/* Moonpay */}
                <div className={`p-4 rounded-lg border-2 border-transparent hover:border-custom-green transition-all cursor-pointer ${
                  isDark ? "bg-[#252842] hover:bg-[#2a2d42]" : "bg-gray-50 hover:bg-gray-100"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">M</span>
                      </div>
                      <div>
                        <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>Moonpay</h4>
                        <p className="text-sm text-gray-400">支持多种支付方式</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>费率: 2.5%</div>
                      <div className="text-xs text-gray-400">限额: $50-$2000</div>
                    </div>
                  </div>
                </div>

                {/* Simplex */}
                <div className={`p-4 rounded-lg border-2 border-transparent hover:border-custom-green transition-all cursor-pointer ${
                  isDark ? "bg-[#252842] hover:bg-[#2a2d42]" : "bg-gray-50 hover:bg-gray-100"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                      </div>
                      <div>
                        <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>Simplex</h4>
                        <p className="text-sm text-gray-400">快速安全交易</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>费率: 3.5%</div>
                      <div className="text-xs text-gray-400">限额: $20-$20000</div>
                    </div>
                  </div>
                </div>

                {/* Banxa */}
                <div className={`p-4 rounded-lg border-2 border-transparent hover:border-custom-green transition-all cursor-pointer ${
                  isDark ? "bg-[#252842] hover:bg-[#2a2d42]" : "bg-gray-50 hover:bg-gray-100"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">B</span>
                      </div>
                      <div>
                        <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>Banxa</h4>
                        <p className="text-sm text-gray-400">全球领先的法币网关</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>费率: 1.9%</div>
                      <div className="text-xs text-gray-400">限额: $50-$5000</div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </>
          )}

          {tradeMode === "快捷" && (
            <div className={`${cardStyle} rounded-lg p-6`}>
              <h3 className={`text-lg font-bold mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
                快捷购买
              </h3>
              <div className="space-y-4">
                {/* 支付方式选择 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["支付宝", "微信支付", "银行卡"].map((method) => (
                    <div key={method} className={`p-4 rounded-lg border-2 border-transparent hover:border-custom-green transition-all cursor-pointer ${
                      isDark ? "bg-[#252842] hover:bg-[#2a2d42]" : "bg-gray-50 hover:bg-gray-100"
                    }`} onClick={() => setQuickPayExpanded(true)}>
                      <div className="text-center">
                        <div className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                          {method}
                        </div>
                        <div className="text-sm text-gray-400">
                          {method === "支付宝" && "限额: ¥100-¥50,000"}
                          {method === "微信支付" && "限额: ¥100-¥50,000"}
                          {method === "银行卡" && "限额: ¥500-¥200,000"}
                        </div>
                        <div className="mt-2 text-custom-green text-sm font-medium">
                          点击购买
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 快捷购买展开界面 */}
                {quickPayExpanded && (
                  <div className={`mt-6 p-4 rounded-lg border ${
                    isDark ? "bg-[#1a1d29] border-[#252842]" : "bg-gray-50 border-gray-200"
                  }`}>
                    <h4 className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                      输入购买金额
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
                          购买金额 (CNY)
                        </label>
                        <input
                          type="number"
                          value={quickPayAmount}
                          onChange={(e) => setQuickPayAmount(e.target.value)}
                          placeholder="请输入金额"
                          className={`w-full px-3 py-2 border rounded-md ${
                            isDark
                              ? "bg-[#252842] border-[#3a3d4a] text-white"
                              : "bg-white border-gray-300 text-gray-800"
                          } focus:outline-none focus:ring-2 focus:ring-custom-green`}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setQuickPayExpanded(false)}
                          className="flex-1 py-2 px-4 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                        >
                          取消
                        </button>
                        <button
                          onClick={() => {
                            // 跳转到第三方支付
                            alert('正在跳转到第三方支付...')
                          }}
                          className="flex-1 py-2 px-4 text-sm bg-custom-green text-white rounded-md hover:bg-custom-green/90 transition-colors"
                        >
                          确认购买
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* C2C模式的订单列表 */}
          {tradeMode === "C2C" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Buy Card - Based on first screenshot */}
              <div className={`${cardStyle} rounded-lg p-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">BM</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">BitcoinMaster</span>
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-yellow-500">⭐ 4.8</span>
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>1923单</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mb-1">
                      要求担保周期12小时
                    </div>
                    <div className="text-2xl font-bold">¥7.23</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>剩余 无限制</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    限额: ¥500 - ¥100000
                  </div>
                  <div className="flex items-center space-x-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    <span>🛡️</span>
                    <span>现金交易</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                  </Button>
                  <Button 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    size="sm"
                  >
                    买入
                  </Button>
                </div>
              </div>

              {/* Sell Card - Based on second screenshot */}
              <div className={`${cardStyle} rounded-lg p-4`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">CK</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">CryptoKing888</span>
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-yellow-500">⭐ 4.9</span>
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>2847单</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex space-x-2 mb-1">
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        担保50万
                      </div>
                      <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                        周期24小时
                      </div>
                    </div>
                    <div className="text-2xl font-bold">¥7.25</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>剩余 48,500</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    限额: ¥100 - ¥50000
                  </div>
                  <div className="flex items-center space-x-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    <span>🛡️</span>
                    <span>现金交易</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button 
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    size="sm"
                  >
                    卖出
                  </Button>
                </div>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  )
}