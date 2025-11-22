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

          {/* 价格输入框 */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={orderType === "limit" ? price : ""}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={orderType === "limit" ? "价格" : "市价交易"}
              disabled={orderType === "market"}
              className={`w-full p-2 text-sm rounded-md border pr-16 ${
                orderType === "market"
                  ? isDark
                    ? "bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                  : isDark
                    ? "bg-[#252842] border-[#3a3d4a] text-white"
                    : "bg-white border-gray-300 text-gray-800"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {/* 币种标签 */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <div className="w-3 h-3 bg-custom-green rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">+</span>
              </div>
              <span className="text-xs text-gray-400">USDT</span>
            </div>
          </div>
        </div>
      </div>

      {/* 数量输入 */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="数量"
            className={`w-full p-2 text-sm rounded-md border pr-16 ${
              isDark ? "bg-[#252842] border-[#3a3d4a] text-white" : "bg-white border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {/* 币种标签 */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <CryptoLogo symbol="BTC" size="w-3 h-3" />
            <span className="text-xs text-gray-400">BTC</span>
          </div>
        </div>
      </div>

      {/* 成交额 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="成交额"
            className={`w-full p-2 text-sm rounded-md border pr-16 ${
              isDark ? "bg-[#252842] border-[#3a3d4a] text-white" : "bg-white border-gray-300 text-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {/* 币种标签 */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <div className="w-3 h-3 bg-custom-green rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">+</span>
            </div>
            <span className="text-xs text-gray-400">USDT</span>
          </div>
        </div>
      </div>

      {/* 百分比滑块 */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-custom-green rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #eab308 25%, #13C2A3 50%, #13C2A3 75%, #13C2A3 100%)`,
            }}
          />
          <div
            className="absolute top-0 w-4 h-4 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1"
            style={{ left: `calc(${percentage}% - 8px)` }}
          />
        </div>
      </div>

      {/* 余额信息 */}
      <div className="mb-3 space-y-1">
        <div className="flex justify-between text-xs">
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>手续费</span>
          <span className={isDark ? "text-white" : "text-gray-800"}>00.00 USDT</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>可用</span>
          <span className="text-custom-green">60,928.20 USDT ●</span>
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

export default function SpotPage() {
  const { theme } = useTheme()
  const [favorites, setFavorites] = useState<string[]>(["BTC/USDT", "VGX/USDT"])
  const [activeSubTab, setActiveSubTab] = useState("当前委托(0)")
  const [hideOtherPairs, setHideOtherPairs] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isDark = theme === "dark"

  // 解决闪烁问题
  useEffect(() => {
    setMounted(true)
  }, [])

  // 如果组件未挂载，返回空白内容，避免闪烁
  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

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
              <div className="text-2xl font-bold text-custom-green">0.00</div>
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>≈ $0.00</div>
            </div>

            {/* 24h change rate */}
            <div className="md:w-32">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>24h变化率</div>
              <div className="text-custom-green font-medium">+0.00%</div>
            </div>

            {/* 24h highest price */}
            <div className="md:w-32">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>24h最高价</div>
              <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>0.00</div>
            </div>

            {/* 24h lowest price */}
            <div className="md:w-32">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>24h最低价</div>
              <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>0.00</div>
            </div>

            {/* 24h volume (BTC) */}
            <div className="md:w-40">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>24h成交量(BTC)</div>
              <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>0.0000000</div>
            </div>

            {/* 24h volume (USDT) */}
            <div className="md:w-40">
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>24h成交额(USDT)</div>
              <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>0.00</div>
            </div>
          </div>

          {/* 右侧 - 操作按钮 */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0 md:ml-auto">
            <button
              className={`p-2 rounded-md transition-colors ${isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"}`}
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </button>
            <button
              className={`p-2 rounded-md transition-colors ${isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"}`}
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 主要交易界面 - K线图、深度图、交易界面 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {/* K线图 - 占据3/5宽度 */}
        <div className="col-span-1 md:col-span-3">
          <div className={`${cardStyle} rounded-lg overflow-hidden h-[24rem] md:h-[36rem]`}>
            <TradingViewChart />
          </div>
        </div>

        {/* 深度图 - 占据1/5宽度 */}
        <div className="col-span-1 md:col-span-1">
          <div className={`${cardStyle} rounded-lg overflow-hidden h-[24rem] md:h-[36rem]`}>
            <DepthChart />
          </div>
        </div>

        {/* 交易界面 - 占据1/5宽度 */}
        <div className="col-span-1 md:col-span-1">
          <div className={`${cardStyle} rounded-lg overflow-hidden h-[24rem] md:h-[36rem]`}>
            <TradingInterface />
          </div>
        </div>
      </div>

      {/* 二级页签和隐藏其他交易对开关 */}
      <div className="mb-6">
        <div
          className={`${isDark ? "bg-[#2a2d3a]" : "bg-gray-100"} rounded-lg p-2 flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0`}
        >
          <div className="flex items-center space-x-1 overflow-x-auto w-full pb-1">
            {subTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`relative whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeSubTab === tab
                    ? isDark
                      ? "bg-white text-gray-800 shadow-sm"
                      : "bg-white text-gray-800 shadow-sm"
                    : isDark
                      ? "text-gray-300 hover:text-white hover:bg-[#3a3d4a]"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 隐藏其他交易对开关 - 移到页签同一行 */}
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>隐藏其他交易对</span>
            <button
              onClick={() => setHideOtherPairs(!hideOtherPairs)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                hideOtherPairs ? "bg-blue-600" : isDark ? "bg-gray-600" : "bg-gray-200"
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
      </div>

      {/* 订单记录标题栏 */}
      <div className={`${cardStyle} rounded-lg mb-3 border-2 ${isDark ? "border-[#252842]" : "border-gray-300"}`}>
        <div className="flex items-center p-4">
          <div className="hidden md:grid md:grid-cols-10 gap-4 flex-1 text-base font-bold">
            <div className="col-span-1">
              {isDark ? <span className="text-white">订单号</span> : <span className="text-gray-800">订单号</span>}
            </div>
            <div className="col-span-1">
              {isDark ? <span className="text-white">交易对</span> : <span className="text-gray-800">交易对</span>}
            </div>
            <div className="col-span-1">
              {isDark ? <span className="text-white">方向</span> : <span className="text-gray-800">方向</span>}
            </div>
            <div className="col-span-1 text-right">
              {isDark ? <span className="text-white">价格</span> : <span className="text-gray-800">价格</span>}
            </div>
            <div className="col-span-1 text-right">
              {isDark ? <span className="text-white">数量</span> : <span className="text-gray-800">数量</span>}
            </div>
            <div className="col-span-1 text-right">
              {isDark ? <span className="text-white">已成交</span> : <span className="text-gray-800">已成交</span>}
            </div>
            <div className="col-span-1 text-right">
              {isDark ? <span className="text-white">成交额</span> : <span className="text-gray-800">成交额</span>}
            </div>
            <div className="col-span-1 text-center">
              {isDark ? <span className="text-white">状态</span> : <span className="text-gray-800">状态</span>}
            </div>
            <div className="col-span-1 text-center">
              {isDark ? <span className="text-white">时间</span> : <span className="text-gray-800">时间</span>}
            </div>
            <div className="col-span-1 text-right">
              {isDark ? <span className="text-white">操作</span> : <span className="text-gray-800">操作</span>}
            </div>
          </div>
          {/* Mobile order table header */}
          <div className="md:hidden flex justify-between w-full text-sm font-bold">
            <div>{isDark ? <span className="text-white">订单</span> : <span className="text-gray-800">订单</span>}</div>
            <div>
              {isDark ? (
                <span className="text-white">状态/操作</span>
              ) : (
                <span className="text-gray-800">状态/操作</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 订单记录横条卡片 */}
      <div className="space-y-3">
        {filteredOrderData.map((item, index) => {
          const pairName = `${item.symbol}/${item.pair}`
          const getStatusColor = (status: string) => {
            switch (status) {
              case "已成交":
                return "bg-custom-green text-white"
              case "部分成交":
                return "bg-yellow-500 text-white"
              case "未成交":
                return "bg-gray-500 text-white"
              case "已取消":
                return "bg-red-500 text-white"
              default:
                return "bg-gray-500 text-white"
            }
          }

          const getTypeColor = (type: string) => {
            return type === "买入" ? "text-custom-green" : "text-red-500"
          }

          return (
            <div
              key={index}
              className={`${cardStyle} rounded-lg transition-all duration-200 hover:${
                isDark ? "bg-[#252842]" : "bg-gray-50"
              }`}
            >
              <div className="hidden md:grid md:grid-cols-10 gap-4 p-4 items-center">
                {/* 订单号 */}
                <div className="col-span-1">
                  <span className={`font-mono text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{item.id}</span>
                </div>

                {/* 交易对 */}
                <div className="col-span-1 flex items-center space-x-2">
                  <CryptoLogo symbol={item.symbol} size="w-5 h-5" />
                  <span className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{pairName}</span>
                </div>

                {/* 方向 */}
                <div className="col-span-1">
                  <span className={`font-bold ${getTypeColor(item.type)}`}>{item.type}</span>
                </div>

                {/* 价格 */}
                <div className={`col-span-1 font-bold text-right ${isDark ? "text-white" : "text-gray-800"}`}>
                  {item.price}
                </div>

                {/* 数量 */}
                <div className={`col-span-1 text-sm text-right ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {item.amount}
                </div>

                {/* 已成交 */}
                <div className={`col-span-1 text-sm text-right ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {item.filled}
                </div>

                {/* 成交额 */}
                <div className={`col-span-1 text-sm text-right ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {item.total}
                </div>

                {/* 状态 */}
                <div className="col-span-1 flex justify-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* 时间 */}
                <div className={`col-span-1 text-xs text-center ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {item.time}
                </div>

                {/* 操作按钮 */}
                <div className="col-span-1 text-right">
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
              {/* Mobile order display */}
              <div className="md:hidden flex flex-col p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <CryptoLogo symbol={item.symbol} size="w-5 h-5" />
                    <span className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{pairName}</span>
                  </div>
                  <span className={`font-bold ${getTypeColor(item.type)}`}>{item.type}</span>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    价格: <span className="font-bold">{item.price}</span>
                  </div>
                  <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>数量: {item.amount}</div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>已成交: {item.filled}</div>
                  <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>成交额: {item.total}</div>
                </div>

                <div className="flex justify-between items-center">
                  <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{item.time}</div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(item.status)}`}
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
