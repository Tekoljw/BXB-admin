"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

// 简洁线性图表组件
const MiniLineChart = ({ isPositive }: { isPositive: boolean }) => {
  // 生成平滑的趋势线数据
  const generateLineData = () => {
    const points = []
    let baseValue = 50

    for (let i = 0; i < 15; i++) {
      // 创建更平滑的趋势
      const trend = isPositive ? 0.5 : -0.5
      const noise = (Math.random() - 0.5) * 8
      baseValue += trend + noise

      // 确保值在合理范围内
      baseValue = Math.max(20, Math.min(80, baseValue))
      points.push(baseValue)
    }

    return points
  }

  const data = generateLineData()
  const width = 112 // 从 80 改为 112
  const height = 48 // 从 32 改为 48
  const padding = 4

  // 创建SVG路径
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

        {/* 填充区域 */}
        <path
          d={`${createPath()} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
          fill={`url(#gradient-${isPositive ? "up" : "down"})`}
        />

        {/* 主线条 */}
        <path
          d={createPath()}
          fill="none"
          stroke={lineColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
          style={{
            filter: `drop-shadow(0 0 6px ${lineColor}60)`, // 从 4px 改为 6px，透明度从 40 改为 60
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
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    // 清理之前的脚本
    const existingScript = document.getElementById("tradingview-script")
    if (existingScript) {
      existingScript.remove()
    }

    // 清理容器
    const container = document.getElementById("tradingview-container")
    if (container) {
      container.innerHTML = ""
    }

    // 创建新的脚本
    const script = document.createElement("script")
    script.id = "tradingview-script"
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
    script.async = true
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "BINANCE:BTCUSDT",
      timezone: "Etc/UTC",
      theme: isDark ? "dark" : "light",
      style: "1",
      locale: "zh_CN",
      withdateranges: true,
      range: "1D",
      hide_side_toolbar: false,
      allow_symbol_change: true,
      support_host: "https://www.tradingview.com",
    })

    if (container) {
      container.appendChild(script)
    }

    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [isDark])

  return (
    <div className="h-[36rem] w-full">
      <div id="tradingview-container" className="tradingview-widget-container h-full w-full">
        <div className="tradingview-widget-container__widget h-full w-full"></div>
      </div>
    </div>
  )
}

// 深度图组件
const DepthChart = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [activeDepthTab, setActiveDepthTab] = useState("委托信息")
  const depthTabs = ["委托信息", "最新成交"]

  // 模拟订单簿数据 - 增加到9条
  const sellOrders = [
    { price: 69877.68, amount: 0.952515, total: 0.112015 },
    { price: 69880.25, amount: 0.845621, total: 0.110532 },
    { price: 69883.42, amount: 0.763458, total: 0.109876 },
    { price: 69885.17, amount: 0.687234, total: 0.108543 },
    { price: 69888.93, amount: 0.598765, total: 0.107654 },
    { price: 69890.56, amount: 0.512387, total: 0.106789 },
    { price: 69893.21, amount: 0.435621, total: 0.105432 },
    { price: 69895.84, amount: 0.367892, total: 0.104321 },
    { price: 69898.47, amount: 0.298765, total: 0.10321 },
  ]

  const buyOrders = [
    { price: 69875.32, amount: 0.987654, total: 0.11321 },
    { price: 69872.45, amount: 0.876543, total: 0.112345 },
    { price: 69870.18, amount: 0.765432, total: 0.111456 },
    { price: 69867.93, amount: 0.654321, total: 0.110567 },
    { price: 69865.27, amount: 0.54321, total: 0.109678 },
    { price: 69862.84, amount: 0.432109, total: 0.108789 },
    { price: 69860.51, amount: 0.321098, total: 0.10789 },
    { price: 69858.26, amount: 0.210987, total: 0.106901 },
    { price: 69855.73, amount: 0.109876, total: 0.105012 },
  ]

  const currentPrice = 69877.86

  return (
    <div
      className={`h-[36rem] ${isDark ? "bg-[#1a1d29] border border-[#252842]" : "bg-white border border-gray-200"} rounded-lg p-4`}
    >
      {/* 订单簿头部 - 添加页签 */}
      <div className="mb-4">
        <div className="flex items-center space-x-4 mb-3">
          {depthTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveDepthTab(tab)}
              className={`relative px-2 py-1 text-xs font-medium transition-colors ${
                activeDepthTab === tab
                  ? isDark
                    ? "text-white"
                    : "text-gray-800"
                  : isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
              {activeDepthTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"></div>}
            </button>
          ))}
        </div>

        {/* 布局切换和精度选择器 - 只在委托信息页签显示 */}
        {activeDepthTab === "委托信息" && (
          <div className="flex items-center justify-between border-t border-b py-2 px-1 mb-2 border-gray-200 dark:border-[#252842]">
            {/* 布局切换按钮 */}
            <div className="flex items-center space-x-2">
              <button className="p-1">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="3" y="3" width="2" height="10" fill="#ef4444" />
                  <rect x="7" y="3" width="2" height="10" fill="#13C2A3" />
                </svg>
              </button>
              <button className="p-1">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="3" y="3" width="2" height="10" fill="#13C2A3" />
                  <rect x="7" y="3" width="2" height="10" fill="#ef4444" />
                </svg>
              </button>
              <button className="p-1">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="3" y="3" width="2" height="10" fill="#000000" />
                  <rect x="7" y="3" width="2" height="10" fill="#000000" />
                </svg>
              </button>
            </div>

            {/* 精度选择器 */}
            <select
              className={`text-xs px-2 py-1 rounded border ${
                isDark ? "bg-[#252842] border-[#3a3d4a] text-white" : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              <option value="0.01">0.01</option>
              <option value="0.1">0.1</option>
              <option value="1">1</option>
            </select>
          </div>
        )}
      </div>

      {activeDepthTab === "委托信息" && (
        <>
          {/* 表头 */}
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2">
            <div>价格(USDT)</div>
            <div className="text-right">数量(BTC)</div>
            <div className="text-right">累计(BTC)</div>
          </div>

          {/* 卖单 */}
          <div className="space-y-1 mb-3">
            {sellOrders.map((order, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs relative">
                <div className="text-red-400">{order.price.toFixed(2)}</div>
                <div className={`text-right ${isDark ? "text-white" : "text-gray-800"}`}>{order.amount.toFixed(6)}</div>
                <div className={`text-right ${isDark ? "text-white" : "text-gray-800"}`}>{order.total.toFixed(6)}</div>
                <div
                  className="absolute right-0 top-0 h-full bg-red-500/10"
                  style={{ width: `${(order.total / 0.12) * 100}%` }}
                />
              </div>
            ))}
          </div>

          {/* 当前价格 - 调整排版尺寸 */}
          <div className="flex items-center justify-between py-3 mb-3 px-4 bg-custom-green/10 rounded">
            <div className="flex items-center space-x-3">
              <div className="text-custom-green font-bold text-sm">69,877.86</div>
              <div className="text-custom-green text-xs">+60.244 USD</div>
            </div>
            <button className="text-gray-400 hover:text-white text-xs">更多</button>
          </div>

          {/* 买单 */}
          <div className="space-y-1">
            {buyOrders.map((order, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs relative">
                <div className="text-custom-green">{order.price.toFixed(2)}</div>
                <div className={`text-right ${isDark ? "text-white" : "text-gray-800"}`}>{order.amount.toFixed(6)}</div>
                <div className={`text-right ${isDark ? "text-white" : "text-gray-800"}`}>{order.total.toFixed(6)}</div>
                <div
                  className="absolute right-0 top-0 h-full bg-custom-green/10"
                  style={{ width: `${(order.total / 0.12) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {activeDepthTab === "最新成交" && (
        <>
          {/* 最新成交表头 */}
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2">
            <div>价格(USDT)</div>
            <div className="text-right">数量(BTC)</div>
            <div className="text-right">时间</div>
          </div>

          {/* 最新成交记录 */}
          <div className="space-y-1">
            {[
              { price: 69877.68, amount: 0.001234, time: "14:30:25", type: "buy" },
              { price: 69875.32, amount: 0.002156, time: "14:30:24", type: "sell" },
              { price: 69878.9, amount: 0.000987, time: "14:30:23", type: "buy" },
              { price: 69876.45, amount: 0.001567, time: "14:30:22", type: "sell" },
              { price: 69879.12, amount: 0.000876, time: "14:30:21", type: "buy" },
              { price: 69877.33, amount: 0.002345, time: "14:30:20", type: "sell" },
              { price: 69880.67, amount: 0.001123, time: "14:30:19", type: "buy" },
              { price: 69878.89, amount: 0.001789, time: "14:30:18", type: "sell" },
              { price: 69881.23, amount: 0.000654, time: "14:30:17", type: "buy" },
              { price: 69879.56, amount: 0.002012, time: "14:30:16", type: "sell" },
              { price: 69882.34, amount: 0.001456, time: "14:30:15", type: "buy" },
              { price: 69880.78, amount: 0.000987, time: "14:30:14", type: "sell" },
              { price: 69883.45, amount: 0.001234, time: "14:30:13", type: "buy" },
              { price: 69881.9, amount: 0.001678, time: "14:30:12", type: "sell" },
            ].map((trade, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                <div className={trade.type === "buy" ? "text-custom-green" : "text-red-400"}>
                  {trade.price.toFixed(2)}
                </div>
                <div className={`text-right ${isDark ? "text-white" : "text-gray-800"}`}>{trade.amount.toFixed(6)}</div>
                <div className={`text-right ${isDark ? "text-gray-400" : "text-gray-500"}`}>{trade.time}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// 交易界面组件 - 重新设计
const TradingInterface = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [activeTab, setActiveTab] = useState("buy")
  const [orderType, setOrderType] = useState("market")
  const [price, setPrice] = useState("60,928.20")
  const [amount, setAmount] = useState("0.00")
  const [total, setTotal] = useState("0.00")
  const [percentage, setPercentage] = useState(0)

  return (
    <div
      className={`h-[36rem] ${isDark ? "bg-[#1a1d29] border border-[#252842]" : "bg-white border border-gray-200"} rounded-lg p-3`}
    >
      {/* 买入/卖出标签 - 添加滑动动画效果 */}
      <div className="relative mb-4">
        <div className="flex bg-gray-200 dark:bg-[#252842] rounded-md p-1">
          {/* 滑动背景 */}
          <div
            className={`absolute top-1 bottom-1 w-1/2 rounded-md transition-all duration-300 ease-in-out ${
              activeTab === "buy" ? "bg-custom-green left-1" : "bg-red-500 left-1/2"
            }`}
          />

          {/* 买入按钮 */}
          <button
            onClick={() => setActiveTab("buy")}
            className={`relative z-10 flex-1 py-2 text-xs font-medium rounded-md transition-colors duration-300 ${
              activeTab === "buy"
                ? "text-white"
                : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-800"
            }`}
          >
            买入
          </button>

          {/* 卖出按钮 */}
          <button
            onClick={() => setActiveTab("sell")}
            className={`relative z-10 flex-1 py-2 text-xs font-medium rounded-md transition-colors duration-300 ${
              activeTab === "sell"
                ? "text-white"
                : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-800"
            }`}
          >
            卖出
          </button>
        </div>
      </div>

      {/* 价格输入 - 限价开关在前面 */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          {/* 限价开关 */}
          <button
            onClick={() => setOrderType(orderType === "market" ? "limit" : "market")}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
              orderType === "limit" ? "bg-blue-600" : isDark ? "bg-gray-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                orderType === "limit" ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
          <span className="text-xs text-gray-400">限价</span>
        </div>

        {/* 价格输入框 */}
        {orderType === "limit" && (
          <div className="mt-2">
            <label className="text-xs text-gray-400 mb-1 block">价格</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full px-3 py-2 text-xs border rounded ${
                isDark
                  ? "bg-[#252842] border-[#3a3d4a] text-white"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            />
          </div>
        )}
      </div>

      {/* 数量输入 */}
      <div className="mb-4">
        <label className="text-xs text-gray-400 mb-1 block">数量</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className={`w-full px-3 py-2 text-xs border rounded ${
            isDark
              ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
          }`}
        />
      </div>

      {/* 百分比滑块 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          {[25, 50, 75, 100].map((percent) => (
            <button
              key={percent}
              onClick={() => setPercentage(percent)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                percentage === percent
                  ? activeTab === "buy"
                    ? "bg-custom-green text-white"
                    : "bg-red-500 text-white"
                  : isDark
                    ? "bg-[#252842] text-gray-400 hover:text-white"
                    : "bg-gray-100 text-gray-600 hover:text-gray-800"
              }`}
            >
              {percent}%
            </button>
          ))}
        </div>
      </div>

      {/* 总价显示 */}
      <div className="mb-4">
        <label className="text-xs text-gray-400 mb-1 block">总价</label>
        <div
          className={`w-full px-3 py-2 text-xs border rounded ${
            isDark ? "bg-[#252842] border-[#3a3d4a] text-gray-400" : "bg-gray-50 border-gray-300 text-gray-600"
          }`}
        >
          {total || "0.00"} USDT
        </div>
      </div>

      {/* 可用余额 */}
      <div className="mb-4 text-xs">
        <div className="flex justify-between text-gray-400">
          <span>可用余额</span>
          <span>12,580.45 USDT</span>
        </div>
      </div>

      {/* 交易按钮 */}
      <button
        className={`w-full py-3 rounded-md text-sm font-medium transition-colors ${
          activeTab === "buy"
            ? "bg-custom-green hover:bg-custom-green/90 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        {activeTab === "buy" ? "买入" : "卖出"} BTC
      </button>

      {/* 持仓信息 - 添加到底部 */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-[#252842]">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-gray-400">
            <span>持仓价值</span>
            <span className={isDark ? "text-white" : "text-gray-800"}>$8,920.45</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>未实现盈亏</span>
            <span className="text-custom-green">+$145.67 (+1.66%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FuturesPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeMainTab, setActiveMainTab] = useState("合约")
  const [favorites, setFavorites] = useState<string[]>(["BTC/USDT", "ETH/USDT"])
  const isDark = theme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow-lg" : "bg-white border border-gray-200 shadow-lg"

  // 合约交易对数据
  const cryptoData = [
    {
      symbol: "BTC",
      pair: "BTC/USDT",
      name: "Bitcoin",
      price: "69,877.68",
      change: "+2.45%",
      changeValue: "+1,672.43",
      volume: "125,890 BTC",
      marketCap: "1,375B",
      isPositive: true,
    },
    {
      symbol: "ETH", 
      pair: "ETH/USDT",
      name: "Ethereum",
      price: "3,245.89",
      change: "+1.82%",
      changeValue: "+58.12",
      volume: "89,456 ETH",
      marketCap: "390B",
      isPositive: true,
    },
    {
      symbol: "BNB",
      pair: "BNB/USDT", 
      name: "BNB",
      price: "615.32",
      change: "-0.67%",
      changeValue: "-4.15",
      volume: "45,123 BNB",
      marketCap: "89B",
      isPositive: false,
    },
    {
      symbol: "ADA",
      pair: "ADA/USDT",
      name: "Cardano", 
      price: "0.4567",
      change: "+3.21%",
      changeValue: "+0.0142",
      volume: "1.23M ADA",
      marketCap: "16B",
      isPositive: true,
    },
    {
      symbol: "SOL",
      pair: "SOL/USDT",
      name: "Solana",
      price: "98.76", 
      change: "-1.23%",
      changeValue: "-1.23",
      volume: "67,890 SOL",
      marketCap: "44B",
      isPositive: false,
    },
    {
      symbol: "DOT",
      pair: "DOT/USDT",
      name: "Polkadot",
      price: "7.654",
      change: "+0.98%", 
      changeValue: "+0.074",
      volume: "234K DOT",
      marketCap: "10B",
      isPositive: true,
    },
  ]

  const toggleFavorite = (pair: string) => {
    setFavorites(prev => 
      prev.includes(pair) 
        ? prev.filter(p => p !== pair)
        : [...prev, pair]
    )
  }

  return (
    <div className={`min-h-screen p-4 ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* 页面头部 */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>合约交易</h1>
        <p className="text-gray-400">专业的加密货币合约交易平台</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 左侧 - K线图表 */}
        <div className="lg:col-span-3">
          <div className={`${cardStyle} rounded-lg p-4 mb-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <CryptoLogo symbol="BTC" />
                <div>
                  <div className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-800"}`}>BTC/USDT</div>
                  <div className="text-sm text-gray-400">永续合约</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`font-bold text-xl ${isDark ? "text-white" : "text-gray-800"}`}>69,877.68</div>
                  <div className="text-custom-green text-sm">+2.45%</div>
                </div>
              </div>
            </div>
            <TradingViewChart />
          </div>

          {/* 交易对列表 */}
          <div className={`${cardStyle} rounded-lg p-4`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>合约交易对</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="搜索交易对"
                  className={`px-3 py-1 text-sm rounded border ${
                    isDark
                      ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                  }`}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-400 border-b border-gray-200 dark:border-[#252842]">
                    <th className="text-left py-2 font-medium">交易对</th>
                    <th className="text-right py-2 font-medium">最新价格</th>
                    <th className="text-right py-2 font-medium">24h涨跌</th>
                    <th className="text-center py-2 font-medium">趋势</th>
                    <th className="text-right py-2 font-medium">24h成交量</th>
                    <th className="text-center py-2 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoData.map((crypto, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-[#252842]/50 hover:bg-gray-50 dark:hover:bg-[#252842]/30 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleFavorite(crypto.pair)}
                            className="p-1"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                favorites.includes(crypto.pair)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-400 hover:text-yellow-500"
                              }`}
                            />
                          </button>
                          <CryptoLogo symbol={crypto.symbol} size="w-6 h-6" />
                          <div>
                            <div className={`font-medium text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                              {crypto.pair}
                            </div>
                            <div className="text-xs text-gray-400">{crypto.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className={`text-right py-3 font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                        ${crypto.price}
                      </td>
                      <td className="text-right py-3">
                        <div className={`font-medium ${crypto.isPositive ? "text-custom-green" : "text-red-500"}`}>
                          {crypto.change}
                        </div>
                        <div className={`text-xs ${crypto.isPositive ? "text-custom-green" : "text-red-500"}`}>
                          {crypto.isPositive ? "+" : ""}{crypto.changeValue}
                        </div>
                      </td>
                      <td className="text-center py-3">
                        <MiniLineChart isPositive={crypto.isPositive} />
                      </td>
                      <td className={`text-right py-3 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        {crypto.volume}
                      </td>
                      <td className="text-center py-3">
                        <button className="px-3 py-1 text-xs bg-custom-green text-white rounded hover:bg-custom-green/90 transition-colors">
                          交易
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 右侧 - 深度图和交易界面 */}
        <div className="lg:col-span-2 space-y-6">
          <DepthChart />
          <TradingInterface />
        </div>
      </div>
    </div>
  )
}