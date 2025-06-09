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

          {/* 价格标签和输入 */}
          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1">
              {orderType === "limit" ? "价格(USDT)" : "市价"}
            </label>
            {orderType === "limit" ? (
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                  isDark
                    ? "bg-[#252842] border-[#3a3d4a] text-white"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              />
            ) : (
              <div
                className={`w-full px-3 py-2 text-sm rounded-md border ${
                  isDark ? "bg-[#252842] border-[#3a3d4a] text-gray-400" : "bg-gray-100 border-gray-300 text-gray-500"
                }`}
              >
                市价
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 数量输入 */}
      <div className="mb-4">
        <label className="block text-xs text-gray-400 mb-1">数量(BTC)</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className={`w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
            isDark
              ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
          }`}
        />
      </div>

      {/* 百分比按钮 */}
      <div className="mb-4">
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((percent) => (
            <button
              key={percent}
              onClick={() => setPercentage(percent)}
              className={`py-1 text-xs rounded-md border transition-colors ${
                percentage === percent
                  ? "border-custom-green bg-custom-green/10 text-custom-green"
                  : isDark
                    ? "border-[#3a3d4a] text-gray-400 hover:border-gray-400"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              {percent}%
            </button>
          ))}
        </div>
      </div>

      {/* 总计 */}
      <div className="mb-4">
        <label className="block text-xs text-gray-400 mb-1">总计(USDT)</label>
        <input
          type="text"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          placeholder="0.00"
          className={`w-full px-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
            isDark
              ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
          }`}
        />
      </div>

      {/* 账户信息 */}
      <div className={`mb-4 p-3 rounded-md ${isDark ? "bg-[#252842]" : "bg-gray-50"}`}>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">可用</span>
          <span className={`${isDark ? "text-white" : "text-gray-800"}`}>0.00000000 BTC</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">可用</span>
          <span className={`${isDark ? "text-white" : "text-gray-800"}`}>0.00 USDT</span>
        </div>
      </div>

      {/* 交易按钮 */}
      <button
        className={`w-full py-3 text-sm font-medium rounded-md transition-colors ${
          activeTab === "buy"
            ? "bg-custom-green hover:bg-custom-green/90 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        {activeTab === "buy" ? "买入 BTC" : "卖出 BTC"}
      </button>

      {/* 登录提示 */}
      <div className="mt-3">
        <button className="w-full py-2 text-xs text-blue-500 hover:text-blue-600 transition-colors">
          登录或注册
        </button>
      </div>
    </div>
  )
}

export default function FuturesPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)
  const [selectedPair, setSelectedPair] = useState("BTC/USDT")
  const [activeMarketTab, setActiveMarketTab] = useState("收藏")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"

  // 市场数据 - 调整为完整数据
  const marketData = {
    收藏: [
      {
        pair: "BTC/USDT",
        price: "69,877.86",
        change: "+60.244",
        changePercent: "+0.09%",
        volume: "41,234.58M",
        isPositive: true,
        isLarge: true,
      },
      {
        pair: "ETH/USDT",
        price: "2,680.50",
        change: "-32.12",
        changePercent: "-1.18%",
        volume: "12,456.78M",
        isPositive: false,
        isLarge: false,
      },
      {
        pair: "BFT/USDT",
        price: "1.2345",
        change: "+0.0234",
        changePercent: "+1.93%",
        volume: "8,765.43M",
        isPositive: true,
        isLarge: false,
      },
    ],
    现货: [
      {
        pair: "EHT/USDT",
        price: "2,680.50",
        change: "-32.12",
        changePercent: "-1.18%",
        volume: "12,456.78M",
        isPositive: false,
        isLarge: false,
      },
      {
        pair: "DOGE/USDT",
        price: "0.08234",
        change: "+0.00123",
        changePercent: "+1.52%",
        volume: "2,345.67M",
        isPositive: true,
        isLarge: false,
      },
      {
        pair: "VGX/USDT",
        price: "0.5678",
        change: "-0.0123",
        changePercent: "-2.12%",
        volume: "1,234.56M",
        isPositive: false,
        isLarge: false,
      },
      {
        pair: "CAK/USDT",
        price: "4.5678",
        change: "+0.1234",
        changePercent: "+2.78%",
        volume: "987.65M",
        isPositive: true,
        isLarge: false,
      },
    ],
    杠杆: [
      {
        pair: "BON/USDT",
        price: "12.3456",
        change: "-0.5678",
        changePercent: "-4.38%",
        volume: "654.32M",
        isPositive: false,
        isLarge: false,
      },
      {
        pair: "UBC/USDT",
        price: "0.9876",
        change: "+0.0345",
        changePercent: "+3.62%",
        volume: "432.10M",
        isPositive: true,
        isLarge: false,
      },
      {
        pair: "AI/USDT",
        price: "87.6543",
        change: "+2.3456",
        changePercent: "+2.75%",
        volume: "321.09M",
        isPositive: true,
        isLarge: false,
      },
      {
        pair: "BCO/USDT",
        price: "0.3456",
        change: "-0.0087",
        changePercent: "-2.46%",
        volume: "210.98M",
        isPositive: false,
        isLarge: false,
      },
    ],
    合约: [
      {
        pair: "CT/USDT",
        price: "234.56",
        change: "+12.34",
        changePercent: "+5.56%",
        volume: "1,876.54M",
        isPositive: true,
        isLarge: false,
      },
      {
        pair: "JPC/USDT",
        price: "0.0123",
        change: "-0.0005",
        changePercent: "-3.90%",
        volume: "765.43M",
        isPositive: false,
        isLarge: false,
      },
      {
        pair: "LTO/USDT",
        price: "45.6789",
        change: "+1.2345",
        changePercent: "+2.78%",
        volume: "543.21M",
        isPositive: true,
        isLarge: false,
      },
      {
        pair: "SM/USDT",
        price: "9.8765",
        change: "-0.3456",
        changePercent: "-3.38%",
        volume: "432.10M",
        isPositive: false,
        isLarge: false,
      },
      {
        pair: "AXV/USDT",
        price: "156.78",
        change: "+8.90",
        changePercent: "+6.02%",
        volume: "987.65M",
        isPositive: true,
        isLarge: false,
      },
    ],
  }

  const marketTabs = ["收藏", "现货", "杠杆", "合约"]

  return (
    <div className={`min-h-screen p-4 ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* 页面头部 */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>合约交易</h1>
        <p className="text-gray-400">专业合约交易平台 - 永续合约交易</p>
      </div>

      {/* 主要布局 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-12rem)]">
        {/* 左侧 - 市场列表 */}
        <div className={`${cardStyle} rounded-lg p-4 h-full flex flex-col`}>
          {/* 搜索和页签 */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="搜索交易对"
              className={`w-full px-3 py-2 text-sm rounded-md border mb-3 focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                isDark
                  ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                  : "bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-400"
              }`}
            />

            {/* 页签 */}
            <div className="flex space-x-1 mb-3">
              {marketTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMarketTab(tab)}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    activeMarketTab === tab
                      ? "bg-custom-green text-white"
                      : isDark
                        ? "text-gray-400 hover:text-white hover:bg-[#252842]"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 市场列表表头 */}
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2 px-1">
            <div>交易对</div>
            <div className="text-right">价格</div>
            <div className="text-right">24h涨跌</div>
          </div>

          {/* 市场列表内容 */}
          <div className="flex-1 overflow-y-auto space-y-1">
            {marketData[activeMarketTab]?.map((market, index) => (
              <div
                key={index}
                onClick={() => setSelectedPair(market.pair)}
                className={`grid grid-cols-3 gap-2 p-2 rounded cursor-pointer transition-colors ${
                  selectedPair === market.pair
                    ? isDark
                      ? "bg-[#252842]"
                      : "bg-gray-100"
                    : isDark
                      ? "hover:bg-[#252842]/50"
                      : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <CryptoLogo symbol={market.pair.split("/")[0]} size="w-5 h-5" />
                  <div>
                    <div className={`text-xs font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                      {market.pair}
                    </div>
                    <div className="text-xs text-gray-400">{market.volume}</div>
                  </div>
                  {index === 0 && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                </div>
                <div className={`text-right text-xs ${isDark ? "text-white" : "text-gray-800"}`}>{market.price}</div>
                <div className="text-right">
                  <div className={`text-xs ${market.isPositive ? "text-custom-green" : "text-red-400"}`}>
                    {market.changePercent}
                  </div>
                  <div className="w-full flex justify-end mt-1">
                    <MiniLineChart isPositive={market.isPositive} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 中间 - K线图 */}
        <div className={`lg:col-span-2 ${cardStyle} rounded-lg p-4`}>
          {/* 图表头部 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CryptoLogo symbol={selectedPair.split("/")[0]} />
                <div>
                  <div className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{selectedPair}</div>
                  <div className="text-xs text-gray-400">永续合约</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`text-xl font-bold text-custom-green`}>69,877.86</div>
                <div className="text-custom-green text-sm">+60.244 (+0.09%)</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className={`px-3 py-1 text-xs rounded border transition-colors ${
                  isDark
                    ? "border-[#3a3d4a] text-gray-400 hover:text-white hover:border-gray-400"
                    : "border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400"
                }`}
              >
                全屏
              </button>
            </div>
          </div>

          {/* TradingView 图表 */}
          <TradingViewChart />
        </div>

        {/* 右侧 - 深度图和交易 */}
        <div className="space-y-4 h-full flex flex-col">
          {/* 深度图 */}
          <div className="flex-1">
            <DepthChart />
          </div>

          {/* 交易界面 */}
          <div>
            <TradingInterface />
          </div>
        </div>
      </div>
    </div>
  )
}