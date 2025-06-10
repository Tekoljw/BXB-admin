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
          <linearGradient id={`gradient-${isPositive}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d={createPath()}
          stroke={lineColor}
          strokeWidth="2"
          fill="none"
          className="transition-all duration-300"
        />
      </svg>
    </div>
  )
}

export default function USDTTradePage() {
  const { isDark } = useTheme()
  const [tradeMode, setTradeMode] = useState("C2C")
  const [activeTab, setActiveTab] = useState("买入")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("全部")
  const [selectedAmount, setSelectedAmount] = useState("1000")
  const [quickPayExpanded, setQuickPayExpanded] = useState(false)

  const cardStyle = isDark
    ? "bg-[#1a1c2e] border border-[#2a2d42] shadow-lg"
    : "bg-white border border-gray-200 shadow-lg"

  const usdtOrders = {
    买入: [
      {
        merchant: "BitcoinMaster",
        price: "7.25",
        limit: "1,000 - 50,000",
        available: "168,952.36",
        payments: ["现金送达", "银行卡"],
        avgTime: "1分钟",
        isVerified: true,
        rating: 98.8,
        completedOrders: 2567,
        advantages: ["实时到账", "0手续费", "24小时服务"],
        disadvantages: ["限额较高", "需要实名认证"]
      },
      {
        merchant: "CryptoKing888",
        price: "7.23",
        limit: "500 - 30,000",
        available: "89,234.78",
        payments: ["支付宝", "微信"],
        avgTime: "3分钟",
        isVerified: true,
        rating: 97.2,
        completedOrders: 1834,
        advantages: ["支持支付宝", "快速响应", "信誉良好"],
        disadvantages: ["价格稍低", "限额中等"]
      },
      {
        merchant: "USDT_Pro",
        price: "7.26",
        limit: "2,000 - 100,000",
        available: "256,891.45",
        payments: ["银行卡", "现金送达"],
        avgTime: "2分钟",
        isVerified: true,
        rating: 99.1,
        completedOrders: 3245,
        advantages: ["价格优势", "大额交易", "安全保障"],
        disadvantages: ["起购金额高", "审核严格"]
      },
      {
        merchant: "FastUSDT",
        price: "7.22",
        limit: "100 - 20,000",
        available: "45,678.23",
        payments: ["支付宝", "微信"],
        avgTime: "5分钟",
        isVerified: false,
        rating: 95.5,
        completedOrders: 892,
        advantages: ["门槛低", "支付便捷"],
        disadvantages: ["未认证", "价格较低", "限额小"]
      }
    ],
    卖出: [
      {
        merchant: "USDTTrader",
        price: "7.18",
        limit: "1,000 - 80,000",
        available: "195,432.67",
        payments: ["银行卡", "现金送达"],
        avgTime: "2分钟",
        isVerified: true,
        rating: 98.3,
        completedOrders: 2134,
        advantages: ["快速到账", "银行直转", "安全可靠"],
        disadvantages: ["需要银行卡", "工作时间限制"]
      },
      {
        merchant: "CoinExchange",
        price: "7.19",
        limit: "500 - 25,000",
        available: "78,945.12",
        payments: ["支付宝", "微信"],
        avgTime: "4分钟",
        isVerified: true,
        rating: 96.8,
        completedOrders: 1567,
        advantages: ["移动支付", "操作简单"],
        disadvantages: ["手续费较高", "限额中等"]
      },
      {
        merchant: "QuickSell",
        price: "7.17",
        limit: "200 - 15,000",
        available: "34,567.89",
        payments: ["支付宝", "微信"],
        avgTime: "8分钟",
        isVerified: false,
        rating: 94.2,
        completedOrders: 456,
        advantages: ["门槛低", "支付灵活"],
        disadvantages: ["价格偏低", "响应较慢", "未认证"]
      }
    ]
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
        <div className="lg:col-span-1">
          <div className={`${cardStyle} rounded-lg p-6`}>
            <div className="space-y-6">
              {/* 交易模式切换 */}
              <div>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                  交易模式
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {["C2C", "OTC", "快捷"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setTradeMode(mode)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        tradeMode === mode
                          ? "bg-custom-green text-white"
                          : isDark
                          ? "bg-[#252842] text-gray-300 hover:bg-[#2a2d42]"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* 模式优势/劣势 */}
              <div className="space-y-3">
                <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                  {tradeMode} 模式特点
                </h4>
                <div className="space-y-2">
                  {tradeMode === "C2C" && (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">点对点交易</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">价格自由协商</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-red-600">需要等待匹配</span>
                      </div>
                    </>
                  )}
                  {tradeMode === "OTC" && (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">大额交易</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">专业服务</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-red-600">起购金额高</span>
                      </div>
                    </>
                  )}
                  {tradeMode === "快捷" && (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">即时成交</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">操作简单</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-red-600">价格固定</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* USDT行情 */}
              <div>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                  USDT 实时行情
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">当前价格</span>
                    <span className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}>¥7.24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">24h涨跌</span>
                    <span className="text-green-500 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +0.28%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">24h成交量</span>
                    <span className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>₮2.8B</span>
                  </div>
                  <div className="mt-4">
                    <MiniLineChart isPositive={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧 - 交易内容 */}
        <div className="lg:col-span-3">
          {/* C2C模式 */}
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
                      placeholder="搜索商家"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                        isDark
                          ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                          : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                      }`}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">金额:</span>
                      <input
                        type="text"
                        placeholder="输入金额"
                        className={`px-3 py-2 w-24 rounded-lg border text-sm focus:outline-none ${
                          isDark
                            ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                        }`}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">支付:</span>
                      <select 
                        value={selectedPayment}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className={`px-3 py-2 rounded-lg border text-sm focus:outline-none ${
                          isDark
                            ? "bg-[#252842] border-[#3a3d4a] text-white"
                            : "bg-white border-gray-300 text-gray-800"
                        }`}
                      >
                        {paymentFilters.map((filter) => (
                          <option key={filter} value={filter}>{filter}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${cardStyle} rounded-lg p-6`}>
                {/* 买入/卖出切换 */}
                <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-[#252842] p-1 rounded-lg">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                        activeTab === tab
                          ? "bg-white dark:bg-[#1a1c2e] text-custom-green shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* 订单列表 */}
                <div className="space-y-4">
                  {filteredOrders.map((order, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                        isDark
                          ? "bg-[#252842] border-[#3a3d4a] hover:border-custom-green/50"
                          : "bg-gray-50 border-gray-200 hover:border-custom-green/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                              {order.merchant}
                            </h4>
                            {order.isVerified && (
                              <Shield className="w-4 h-4 text-blue-500" />
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-yellow-600">{order.rating}%</span>
                            <span className="text-xs text-gray-400">({order.completedOrders})</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-custom-green">¥{order.price}</div>
                          <div className="text-xs text-gray-400">可售: {order.available} USDT</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-xs text-gray-400">限额:</span>
                          <span className={`ml-2 text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                            ¥{order.limit}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400">平均用时:</span>
                          <span className={`ml-2 text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                            {order.avgTime}
                          </span>
                        </div>
                      </div>

                      {/* 支付方式 */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-xs text-gray-400">支付方式:</span>
                        <div className="flex space-x-2">
                          {order.payments.map((payment) => (
                            <span
                              key={payment}
                              className={`px-2 py-1 rounded text-xs ${
                                payment === "现金送达"
                                  ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                  : isDark
                                  ? "bg-[#1a1c2e] text-gray-300"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {payment}
                              {payment === "现金送达" && (
                                <span className="ml-1 text-yellow-600">🔒</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 优势劣势标签 */}
                      <div className="space-y-2 mb-4">
                        <div className="flex flex-wrap gap-1">
                          {order.advantages.map((advantage, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full"
                            >
                              ✓ {advantage}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {order.disadvantages.map((disadvantage, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full"
                            >
                              ⚠ {disadvantage}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          className="flex-1 bg-white border border-custom-green text-custom-green hover:bg-custom-green hover:text-white transition-all"
                          size="sm"
                        >
                          {activeTab}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* OTC模式 */}
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
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-custom-green rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">M</span>
                        </div>
                        <div>
                          <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>Moonpay</h4>
                          <p className="text-sm text-gray-400">全球最大的加密货币网关</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>费率: 2.5%</div>
                        <div className="text-xs text-gray-400">限额: $100-$10000</div>
                      </div>
                    </div>
                  </div>

                  {/* Simplex */}
                  <div className={`p-4 rounded-lg border-2 border-transparent hover:border-custom-green transition-all cursor-pointer ${
                    isDark ? "bg-[#252842] hover:bg-[#2a2d42]" : "bg-gray-50 hover:bg-gray-100"
                  }`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">S</span>
                        </div>
                        <div>
                          <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>Simplex</h4>
                          <p className="text-sm text-gray-400">欧盟合规的支付处理商</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>费率: 3.5%</div>
                        <div className="text-xs text-gray-400">限额: $50-$20000</div>
                      </div>
                    </div>
                  </div>

                  {/* Banxa */}
                  <div className={`p-4 rounded-lg border-2 border-transparent hover:border-custom-green transition-all cursor-pointer ${
                    isDark ? "bg-[#252842] hover:bg-[#2a2d42]" : "bg-gray-50 hover:bg-gray-100"
                  }`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">B</span>
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

          {/* 快捷模式 */}
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

                {/* 快捷金额选择 */}
                {quickPayExpanded && (
                  <div className="mt-6 p-4 border rounded-lg bg-blue-50 dark:bg-[#252842]">
                    <h4 className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                      选择购买金额
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {quickAmounts.map((amount) => (
                        <button
                          key={amount}
                          onClick={() => setSelectedAmount(amount)}
                          className={`p-3 rounded-lg font-medium transition-all ${
                            selectedAmount === amount
                              ? "bg-custom-green text-white"
                              : isDark
                              ? "bg-[#1a1c2e] text-gray-300 hover:bg-[#2a2d42]"
                              : "bg-white text-gray-700 hover:bg-gray-100 border"
                          }`}
                        >
                          ¥{amount}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <input
                        type="text"
                        placeholder="自定义金额"
                        className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                          isDark
                            ? "bg-[#1a1c2e] border-[#3a3d4a] text-white"
                            : "bg-white border-gray-300 text-gray-800"
                        }`}
                      />
                      <Button className="bg-custom-green hover:bg-custom-green/90 text-white">
                        立即购买
                      </Button>
                    </div>
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