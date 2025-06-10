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
    const pathData = data.map((point, index) => {
      const x = (index / (data.length - 1)) * (width - 2 * padding) + padding
      const y = ((100 - point) / 100) * (height - 2 * padding) + padding
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    }).join(' ')

    return pathData
  }

  return (
    <div className="w-28 h-12 relative">
      <svg width={width} height={height} className="absolute inset-0">
        <defs>
          <linearGradient id={`gradient-${isPositive ? 'green' : 'red'}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        <path
          d={`${createPath()} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
          fill={`url(#gradient-${isPositive ? 'green' : 'red'})`}
          opacity="0.6"
        />
        
        <path
          d={createPath()}
          stroke={isPositive ? "#10b981" : "#ef4444"}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
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
        merchant: "BitcoinMaster",
        rating: 5,
        orders: "99.2%",
        totalOrders: "23,456",
        price: "7.23",
        available: "80,000.00",
        minAmount: "500.00",
        maxAmount: "50,000.00",
        payments: ["现金送达", "银行卡", "支付宝"],
        avgTime: "1分钟",
        isVerified: true,
      },
      {
        id: "3",
        merchant: "CryptoKing888",
        rating: 4,
        orders: "97.8%",
        totalOrders: "18,901",
        price: "7.22",
        available: "120,000.00",
        minAmount: "200.00",
        maxAmount: "30,000.00",
        payments: ["银行卡", "微信", "现金送达"],
        avgTime: "3分钟",
        isVerified: true,
      },
      {
        id: "4",
        merchant: "快速交易商",
        rating: 4,
        orders: "96.7%",
        totalOrders: "12,567",
        price: "7.25",
        available: "30,000.00",
        minAmount: "50.00",
        maxAmount: "5,000.00",
        payments: ["支付宝", "微信"],
        avgTime: "5分钟",
        isVerified: false,
      },
    ],
    卖出: [
      {
        id: "5",
        merchant: "安全交易所",
        rating: 5,
        orders: "99.1%",
        totalOrders: "20,123",
        price: "7.20",
        available: "60,000.00",
        minAmount: "100.00",
        maxAmount: "15,000.00",
        payments: ["银行卡", "支付宝"],
        avgTime: "2分钟",
        isVerified: true,
      },
      {
        id: "6",
        merchant: "信誉商户",
        rating: 4,
        orders: "98.3%",
        totalOrders: "16,789",
        price: "7.19",
        available: "45,000.00",
        minAmount: "200.00",
        maxAmount: "8,000.00",
        payments: ["微信", "支付宝"],
        avgTime: "4分钟",
        isVerified: false,
      },
      {
        id: "7",
        merchant: "专业代理",
        rating: 5,
        orders: "99.5%",
        totalOrders: "25,678",
        price: "7.18",
        available: "100,000.00",
        minAmount: "500.00",
        maxAmount: "20,000.00",
        payments: ["银行卡", "现金送达"],
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
      
      {/* 顶部交易模式切换 */}
      <div className="mb-6 flex justify-end">
        {/* 右侧交易模式切换 */}
        <div className="flex flex-col items-end">
          <div className="flex bg-gray-200 dark:bg-[#252842] rounded-lg p-1 mb-3">
            {["C2C", "OTC", "快捷"].map((mode) => (
              <button
                key={mode}
                onClick={() => setTradeMode(mode)}
                className={`py-2 px-6 text-sm font-medium rounded-md transition-all duration-200 ${
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
          
          {/* 交易模式描述 */}
          <div className="flex flex-wrap gap-2 justify-end">
            {tradeMode === "C2C" && (
              <>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  汇率优惠
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                  需担保时间
                </span>
              </>
            )}
            
            {tradeMode === "快捷" && (
              <>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  操作简单
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                  汇率略高
                </span>
              </>
            )}
            
            {tradeMode === "OTC" && (
              <>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  大额交易
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800">
                  门槛较高
                </span>
              </>
            )}
          </div>
        </div>
      </div>

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
            </div>
          )}

          {/* 支付方式筛选 - 仅在C2C和OTC模式下显示 */}
          {(tradeMode === "C2C" || tradeMode === "OTC") && (
            <div className="mb-6">
              <label className={`text-sm font-medium mb-3 block ${isDark ? "text-white" : "text-gray-800"}`}>
                支付方式
              </label>
              <div className="flex flex-wrap gap-2">
                {paymentFilters.map((payment) => (
                  <button
                    key={payment}
                    onClick={() => setSelectedPayment(payment)}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all flex items-center space-x-2 ${
                      selectedPayment === payment
                        ? payment === "现金送达"
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          : "bg-custom-green text-white"
                        : isDark
                          ? "bg-[#252842] text-gray-300 hover:bg-[#2a2d42] border border-gray-600"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <PaymentIcon type={payment} />
                    {payment === "现金送达" && (
                      <span className="text-xs bg-yellow-200 text-yellow-800 px-1 py-0.5 rounded">安全</span>
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
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"} w-4 h-4`} />
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

              {/* C2C交易订单列表 */}
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className={`${cardStyle} rounded-lg p-6 hover:shadow-lg transition-shadow`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      {/* 商户信息 */}
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {order.merchant.slice(0, 1)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{order.merchant}</h3>
                            {order.isVerified && (
                              <Shield className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <MerchantRating rating={order.rating} />
                            <span>成功率: {order.orders}</span>
                            <span>订单: {order.totalOrders}</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{order.avgTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 价格和数量信息 */}
                      <div className="flex items-center justify-between lg:justify-end space-x-6">
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${activeTab === "买入" ? "text-custom-green" : "text-red-500"}`}>
                            ¥{order.price}
                          </div>
                          <div className="text-xs text-gray-400">单价</div>
                        </div>
                        
                        <div className="text-center">
                          <div className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                            {order.available} USDT
                          </div>
                          <div className="text-xs text-gray-400">可用</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-gray-500">
                            ¥{order.minAmount} - ¥{order.maxAmount}
                          </div>
                          <div className="text-xs text-gray-400">限额</div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {order.payments.map((payment) => (
                            <span key={payment} className={`px-2 py-1 text-xs rounded-full ${
                              payment === "现金送达"
                                ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                : "bg-gray-100 text-gray-600"
                            }`}>
                              {payment}
                            </span>
                          ))}
                        </div>
                        
                        <Button 
                          className={`px-6 py-2 font-medium ${
                            activeTab === "买入" 
                              ? "bg-custom-green hover:bg-custom-green/90 text-white" 
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                        >
                          {activeTab}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tradeMode === "OTC" && (
            <>
              {/* OTC模式 - 搜索和筛选栏 */}
              <div className={`${cardStyle} rounded-lg p-4 mb-6`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? "text-gray-400" : "text-gray-500"} w-4 h-4`} />
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
                      <option value="reputation">信誉优先</option>
                      <option value="rate">费率优先</option>
                      <option value="limit">限额优先</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* OTC供应商卡片 */}
              <div className="space-y-4">
                {/* OTC卡片列表 */}
                {[
                  { name: "BitPay", desc: "专业OTC服务商", rate: "0.5%", limit: "$10K-$1M", bg: "bg-blue-500" },
                  { name: "CoinBase OTC", desc: "全球知名交易平台", rate: "0.8%", limit: "$50K-$10M", bg: "bg-green-500" },
                  { name: "Kraken OTC", desc: "欧美领先OTC平台", rate: "0.3%", limit: "$100K-$50M", bg: "bg-purple-500" },
                  { name: "Binance OTC", desc: "全球最大交易所OTC", rate: "0.4%", limit: "$20K-$100M", bg: "bg-yellow-500" },
                  { name: "Huobi OTC", desc: "亚洲知名OTC服务", rate: "0.6%", limit: "$30K-$20M", bg: "bg-red-500" },
                ].map((otc, index) => (
                  <div key={index} className={`${cardStyle} rounded-lg p-6`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${otc.bg} rounded-full flex items-center justify-center text-white font-bold`}>
                          {otc.name.slice(0, 1)}
                        </div>
                        <div>
                          <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{otc.name}</h4>
                          <p className="text-sm text-gray-400">{otc.desc}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>费率: {otc.rate}</div>
                        <div className="text-xs text-gray-400">限额: {otc.limit}</div>
                      </div>
                    </div>
                  </div>
                ))}
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
                          点击快速购买
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {quickPayExpanded && (
                  <div className="mt-6 p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <h4 className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>购买金额</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {quickAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setQuickPayAmount(amount)}
                          className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
                            quickPayAmount === amount
                              ? "bg-custom-green text-white border-custom-green"
                              : isDark
                                ? "bg-[#252842] text-gray-300 border-gray-600 hover:bg-[#2a2d42]"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          ¥{amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="或输入自定义金额"
                      value={quickPayAmount}
                      onChange={(e) => setQuickPayAmount(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 mb-4 ${
                        isDark
                          ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                      }`}
                    />
                    <Button className="w-full bg-custom-green hover:bg-custom-green/90 text-white">
                      立即购买
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}