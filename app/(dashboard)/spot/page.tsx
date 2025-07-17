"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

// Import page components for mobile tabs
import FuturesPage from "../futures/page"
import FinancePage from "../finance/page"

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

// 加密货币Logo组件
const CryptoLogo = ({ symbol, size = "w-8 h-8" }: { symbol: string; size?: string }) => {
  const getLogoColor = (symbol: string) => {
    const colors: { [key: string]: string } = {
      BTC: "bg-orange-500",
      ETH: "bg-blue-500",
      EHT: "bg-blue-500",
      BFT: "bg-custom-green",
      DOGE: "bg-yellow-500",
      VGX: "bg-purple-500",
      CAK: "bg-yellow-400",
      BON: "bg-yellow-400",
      UBC: "bg-blue-400",
      AI: "bg-indigo-500",
      BCO: "bg-red-500",
      CT: "bg-gray-500",
      JPC: "bg-pink-500",
      LTO: "bg-teal-500",
      SM: "bg-emerald-500",
      AXV: "bg-violet-500",
    }
    return colors[symbol] || "bg-gray-400"
  }

  const getSymbolText = (symbol: string) => {
    if (symbol === "BTC") return "₿"
    return symbol.slice(0, 2).toUpperCase()
  }

  return (
    <div
      className={`${size} ${getLogoColor(symbol)} rounded-full flex items-center justify-center text-white font-bold text-xs`}
    >
      {getSymbolText(symbol)}
    </div>
  )
}

// TradingView K线图组件
const TradingViewChart = () => {
  return (
    <div className="h-96 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-custom-green rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">K线图表</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">实时价格走势和技术分析图表</p>
      </div>
    </div>
  )
}

// 交易面板组件
const TradingPanel = ({ isDark }: { isDark: boolean }) => {
  const [activeTab, setActiveTab] = useState("buy")
  const [orderType, setOrderType] = useState("限价委托")
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")

  return (
    <div className={`${isDark ? "bg-[#1a1d29] border border-[#252842]" : "bg-white border border-gray-200"} rounded-lg p-4`}>
      {/* 买入/卖出选项卡 */}
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab("buy")}
          className={`flex-1 py-2 px-4 rounded-l-md font-medium text-sm transition-colors ${
            activeTab === "buy"
              ? "bg-custom-green text-white"
              : isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          买入
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`flex-1 py-2 px-4 rounded-r-md font-medium text-sm transition-colors ${
            activeTab === "sell"
              ? "bg-red-500 text-white"
              : isDark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          卖出
        </button>
      </div>

      {/* 订单类型选择 */}
      <div className="mb-4">
        <div className={`text-xs font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>订单类型</div>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className={`w-full p-2 border rounded-md text-sm ${
            isDark
              ? "bg-[#232332] border-[#3a3a4a] text-white"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <option value="限价委托">限价委托</option>
          <option value="市价委托">市价委托</option>
        </select>
      </div>

      {/* 价格输入 */}
      <div className="mb-4">
        <div className={`text-xs font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>价格 (USDT)</div>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          className={`w-full p-2 border rounded-md text-sm ${
            isDark
              ? "bg-[#232332] border-[#3a3a4a] text-white placeholder-gray-500"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
          }`}
        />
      </div>

      {/* 数量输入 */}
      <div className="mb-4">
        <div className={`text-xs font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>数量 (BTC)</div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className={`w-full p-2 border rounded-md text-sm ${
            isDark
              ? "bg-[#232332] border-[#3a3a4a] text-white placeholder-gray-500"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
          }`}
        />
      </div>

      {/* 快捷数量选择 */}
      <div className="mb-4">
        <div className="grid grid-cols-4 gap-2">
          {["25%", "50%", "75%", "100%"].map((percentage) => (
            <button
              key={percentage}
              className={`py-1 px-2 rounded text-xs border transition-colors ${
                isDark
                  ? "border-[#3a3a4a] text-gray-400 hover:bg-[#232332]"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {percentage}
            </button>
          ))}
        </div>
      </div>

      {/* 买入按钮 */}
      <button className="w-full bg-custom-green hover:bg-custom-green-600 text-white py-2 rounded-md font-medium text-sm transition-colors mb-3">
        买入 BTC
      </button>

      {/* 资产信息 */}
      <div className="border-t pt-4">
        <div className={`text-xs font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>资产</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CryptoLogo symbol="BTC" size="w-4 h-4" />
              <span className={`ml-2 font-medium ${isDark ? "text-white" : "text-gray-800"}`}>BTC</span>
            </div>
            <div className="text-right">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>可用</div>
              <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>60,928.20</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-custom-green rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
              <span className={`ml-2 font-medium ${isDark ? "text-white" : "text-gray-800"}`}>USDT</span>
            </div>
            <div className="text-right">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>可用</div>
              <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>0.000000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 现货交易主要内容组件
const SpotTradingContent = ({ isDark }: { isDark: boolean }) => {
  const [favorites, setFavorites] = useState<string[]>(["BTC/USDT", "VGX/USDT"])
  const [activeSubTab, setActiveSubTab] = useState("当前委托(0)")
  const [hideOtherPairs, setHideOtherPairs] = useState(false)

  // 二级页签
  const subTabs = ["当前委托(0)", "历史委托", "成交明细", "资产管理"]

  // 完整订单数据
  const orderData = [
    {
      id: "ORD001",
      type: "买入",
      symbol: "BTC",
      pair: "USDT",
      price: "69,877.68",
      amount: "0.001500",
      filled: "0.001500",
      total: "104.82",
      status: "已成交",
      time: "2024-01-15 14:30:25",
      isCompleted: true,
    },
    {
      id: "ORD002",
      type: "卖出",
      symbol: "ETH",
      pair: "USDT",
      price: "3,949.25",
      amount: "0.050000",
      filled: "0.025000",
      total: "98.73",
      status: "部分成交",
      time: "2024-01-15 14:28:15",
      isCompleted: false,
    },
    {
      id: "ORD003",
      type: "买入",
      symbol: "VGX",
      pair: "USDT",
      price: "1.5373",
      amount: "100.000000",
      filled: "0.000000",
      total: "153.73",
      status: "未成交",
      time: "2024-01-15 14:25:10",
      isCompleted: false,
    },
    {
      id: "ORD004",
      type: "卖出",
      symbol: "BTC",
      pair: "USDT",
      price: "70,123.50",
      amount: "0.002000",
      filled: "0.002000",
      total: "140.25",
      status: "已成交",
      time: "2024-01-15 14:20:45",
      isCompleted: true,
    },
    {
      id: "ORD005",
      type: "买入",
      symbol: "DOGE",
      pair: "USDT",
      price: "0.17205",
      amount: "1000.000000",
      filled: "500.000000",
      total: "86.03",
      status: "部分成交",
      time: "2024-01-15 14:15:30",
      isCompleted: false,
    },
    {
      id: "ORD006",
      type: "卖出",
      symbol: "CAK",
      pair: "USDT",
      price: "0.84130",
      amount: "50.000000",
      filled: "0.000000",
      total: "42.07",
      status: "已取消",
      time: "2024-01-15 14:10:20",
      isCompleted: false,
    },
  ]

  const toggleFavorite = (pair: string) => {
    setFavorites((prev) => (prev.includes(pair) ? prev.filter((f) => f !== pair) : [...prev, pair]))
  }

  // 过滤订单数据 - 根据开关状态决定是否只显示当前交易对
  const filteredOrderData = hideOtherPairs
    ? orderData.filter((item) => `${item.symbol}/${item.pair}` === "BTC/USDT")
    : orderData

  // 统一的卡片样式
  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"

  return (
    <div className={`p-3 md:p-6 min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* 交易对头部信息卡片 */}
      <div className={`${cardStyle} rounded-lg p-4 mb-6`}>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
          {/* 左侧 - 交易对选择 */}
          <div className="flex items-start space-x-3 w-full md:w-48">
            <CryptoLogo symbol="BTC" size="w-8 h-8" />
            <div>
              <div className="flex items-center space-x-1">
                <span className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>BTC/USDT</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="flex items-center mt-1">
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Bitcoin</span>
                <button
                  onClick={() => toggleFavorite("BTC/USDT")}
                  className={`ml-2 ${
                    favorites.includes("BTC/USDT") ? "text-yellow-500" : "text-gray-300"
                  } hover:text-yellow-500 transition-colors`}
                >
                  <Star className="h-4 w-4" fill={favorites.includes("BTC/USDT") ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </div>

          {/* Trading metrics - responsive grid */}
          <div className="grid grid-cols-2 md:flex md:flex-row gap-4 w-full mt-4 md:mt-0">
            {/* Current price */}
            <div className="md:w-32">
              <div className="text-2xl font-bold text-custom-green">69,877.68</div>
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>≈ $69,877.68</div>
            </div>

            {/* 24h change rate */}
            <div className="md:w-32">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>24h变化率</div>
              <div className="text-custom-green font-medium">+2.45%</div>
            </div>

            {/* 24h highest price */}
            <div className="md:w-32">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>24h最高价</div>
              <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>70,150.00</div>
            </div>

            {/* 24h lowest price */}
            <div className="md:w-32">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>24h最低价</div>
              <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>68,200.00</div>
            </div>

            {/* 24h volume */}
            <div className="md:w-32">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>24h成交量</div>
              <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>1,234.56 BTC</div>
            </div>

            {/* 24h turnover */}
            <div className="md:w-32">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>24h成交额</div>
              <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>86.2M USDT</div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要交易区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧 - K线图 (占3列) */}
        <div className="lg:col-span-3">
          <div className={`${cardStyle} rounded-lg p-4`}>
            <TradingViewChart />
          </div>
        </div>

        {/* 右侧 - 交易面板 (占1列) */}
        <div className="lg:col-span-1">
          <TradingPanel isDark={isDark} />
        </div>
      </div>

      {/* 底部订单区域 */}
      <div className={`${cardStyle} rounded-lg p-4 mt-6`}>
        {/* 二级页签 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4 overflow-x-auto">
            {subTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeSubTab === tab
                    ? "border-custom-green text-custom-green"
                    : isDark
                      ? "border-transparent text-gray-400 hover:text-gray-300"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 过滤开关 */}
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>仅看当前交易对</span>
            <button
              onClick={() => setHideOtherPairs(!hideOtherPairs)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                hideOtherPairs ? "bg-custom-green" : isDark ? "bg-gray-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  hideOtherPairs ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* 订单列表 */}
        <div className="space-y-3">
          {filteredOrderData.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border ${
                isDark ? "bg-[#232332] border-[#3a3a4a]" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                <div className="flex items-center space-x-3">
                  <CryptoLogo symbol={item.symbol} size="w-6 h-6" />
                  <div>
                    <div className="font-medium">
                      <span className={`${item.type === "买入" ? "text-custom-green" : "text-red-500"}`}>
                        {item.type}
                      </span>
                      <span className={`ml-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                        {item.symbol}/{item.pair}
                      </span>
                    </div>
                    <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{item.time}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:flex md:space-x-6 gap-4 md:gap-0">
                  <div>
                    <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>价格</div>
                    <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>{item.price}</div>
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>数量</div>
                    <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>{item.amount}</div>
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>已成交</div>
                    <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>{item.filled}</div>
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>总额</div>
                    <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>{item.total}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end md:space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "已成交"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : item.status === "部分成交"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : item.status === "未成交"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {item.status}
                  </span>
                  {item.status === "未成交" || item.status === "部分成交" ? (
                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md text-xs font-medium transition-colors">
                      撤单
                    </button>
                  ) : (
                    <button className="bg-black hover:bg-gray-800 text-white py-1 px-4 rounded-md text-xs font-medium transition-colors">
                      查看
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SpotPage() {
  const { theme } = useTheme()
  const [activeMobileTab, setActiveMobileTab] = useState("现货交易")
  const [mounted, setMounted] = useState(false)
  const isDark = theme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  const mobileTabOptions = ["现货交易", "合约交易", "理财投资"]

  // Render content based on active mobile tab
  if (activeMobileTab === "合约交易") {
    return (
      <div className={`min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
        <div className="md:hidden">
          <div className="p-4 pb-0">
            <div className="flex space-x-6">
              {mobileTabOptions.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMobileTab(tab)}
                  className={`pb-2 px-1 border-b-2 text-base transition-colors ${
                    activeMobileTab === tab
                      ? "border-black text-black font-bold"
                      : "border-transparent text-black font-medium hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        <FuturesPage />
      </div>
    )
  }

  if (activeMobileTab === "理财投资") {
    return (
      <div className={`min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
        <div className="md:hidden">
          <div className="p-4 pb-0">
            <div className="flex space-x-6">
              {mobileTabOptions.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMobileTab(tab)}
                  className={`pb-2 px-1 border-b-2 text-base transition-colors ${
                    activeMobileTab === tab
                      ? "border-black text-black font-bold"
                      : "border-transparent text-black font-medium hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
        <FinancePage />
      </div>
    )
  }

  // Default: 现货交易 content
  return (
    <div className={`min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* Mobile Tabs - Only visible on mobile */}
      <div className="md:hidden">
        <div className="p-4 pb-0">
          <div className="flex space-x-6">
            {mobileTabOptions.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMobileTab(tab)}
                className={`pb-2 px-1 border-b-2 text-base transition-colors ${
                  activeMobileTab === tab
                    ? "border-black text-black font-bold"
                    : "border-transparent text-black font-medium hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Original Spot Trading Content - Copy from futures page */}
      <SpotTradingContent isDark={isDark} />
    </div>
  )
}