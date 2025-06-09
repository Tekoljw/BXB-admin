"use client"

import { useState, useEffect } from "react"
import { Star, Search, TrendingUp, TrendingDown, Shield, Clock, CreditCard, DollarSign } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

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
      case "银行卡":
        return <CreditCard className="w-4 h-4" />
      case "支付宝":
        return <div className="w-4 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">支</div>
      case "微信":
        return <div className="w-4 h-4 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">微</div>
      default:
        return <DollarSign className="w-4 h-4" />
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {getIcon()}
      <span className="text-xs">{type}</span>
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
  const paymentFilters = ["全部", "银行卡", "支付宝", "微信"]
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
              className={`w-full px-3 py-2 text-sm border rounded-md ${
                isDark 
                  ? "bg-[#252842] border-[#3a3d4a] text-white" 
                  : "bg-white border-gray-300 text-gray-800"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <option value="CNY">CNY (人民币)</option>
              <option value="USD">USD (美元)</option>
              <option value="EUR">EUR (欧元)</option>
              <option value="KRW">KRW (韩元)</option>
              <option value="JPY">JPY (日元)</option>
            </select>
          </div>

          {/* 金额输入 */}
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

          {/* 支付方式筛选 */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
              支付方式
            </label>
            <div className="space-y-2">
              {paymentFilters.map((payment) => (
                <button
                  key={payment}
                  onClick={() => setSelectedPayment(payment)}
                  className={`w-full text-left py-2 px-3 text-sm rounded-md transition-colors ${
                    selectedPayment === payment
                      ? "bg-custom-green/10 text-custom-green border border-custom-green"
                      : isDark
                        ? "text-gray-400 hover:bg-[#252842] border border-transparent"
                        : "text-gray-600 hover:bg-gray-100 border border-transparent"
                  }`}
                >
                  {payment}
                </button>
              ))}
            </div>
          </div>

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

        {/* 右侧 - 交易列表 */}
        <div className="lg:col-span-3">
          {/* 搜索和筛选栏 */}
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

          {/* 订单列表表头 */}
          <div className={`${cardStyle} rounded-lg p-4 mb-4`}>
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-400">
              <div className="col-span-3">商户信息</div>
              <div className="col-span-2 text-center">价格 (CNY)</div>
              <div className="col-span-2 text-center">可用/限额</div>
              <div className="col-span-2 text-center">支付方式</div>
              <div className="col-span-2 text-center">平均时间</div>
              <div className="col-span-1 text-center">操作</div>
            </div>
          </div>

          {/* 订单列表 */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className={`${cardStyle} rounded-lg p-4 hover:shadow-xl transition-all duration-200`}>
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* 商户信息 */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold`}>
                        {order.merchant.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className={`font-medium text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                            {order.merchant}
                          </span>
                          {order.isVerified && (
                            <Shield className="w-3 h-3 text-custom-green" />
                          )}
                        </div>
                        <MerchantRating rating={order.rating} />
                        <div className="text-xs text-gray-400">
                          完成率 {order.orders} | {order.totalOrders}单
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 价格 */}
                  <div className="col-span-2 text-center">
                    <div className={`text-lg font-bold ${
                      activeTab === "买入" ? "text-custom-green" : "text-red-500"
                    }`}>
                      ¥{order.price}
                    </div>
                    <div className="flex items-center justify-center mt-1">
                      <MiniLineChart isPositive={Math.random() > 0.5} />
                    </div>
                  </div>

                  {/* 可用/限额 */}
                  <div className="col-span-2 text-center">
                    <div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                      {order.available} USDT
                    </div>
                    <div className="text-xs text-gray-400">
                      限额: ¥{order.minAmount} - ¥{order.maxAmount}
                    </div>
                  </div>

                  {/* 支付方式 */}
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {order.payments.map((payment, index) => (
                        <PaymentIcon key={index} type={payment} />
                      ))}
                    </div>
                  </div>

                  {/* 平均时间 */}
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-400">{order.avgTime}</span>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="col-span-1 text-center">
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        activeTab === "买入"
                          ? "bg-custom-green text-white hover:bg-custom-green/90"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {activeTab}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 加载更多 */}
          <div className="text-center mt-6">
            <button className={`px-6 py-2 rounded-lg border transition-colors ${
              isDark
                ? "border-[#3a3d4a] text-gray-400 hover:text-white hover:border-gray-400"
                : "border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400"
            }`}>
              加载更多订单
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}