"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
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
  const width = 112
  const height = 48
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
            filter: `drop-shadow(0 0 6px ${lineColor}60)`,
          }}
        />
      </svg>
    </div>
  )
}

export default function MarketContent() {
  const { theme } = useTheme()
  const [favorites, setFavorites] = useState<string[]>(["BTC/USDT", "VGX/USDT"])
  const [mounted, setMounted] = useState(false)
  const isDark = theme === "dark"

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 解决闪烁问题
  useEffect(() => {
    setMounted(true)
  }, [])

  // 如果组件未挂载，返回空白内容，避免闪烁
  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  // 顶部重点币种数据
  const topCoins = [
    {
      symbol: "EHT",
      pair: "USDT",
      price: "3,949.25",
      change: "+2.54%",
      volume: "24H Vol 68.66M",
      isPositive: true,
      icon: "🔷",
    },
    {
      symbol: "BTC",
      pair: "USDT",
      price: "69,900.02",
      change: "+0.95%",
      volume: "24H Vol 60.50M",
      isPositive: true,
      icon: "₿",
    },
    {
      symbol: "BFT",
      pair: "USDT",
      price: "0.84130",
      change: "+0.79%",
      volume: "24H Vol 13.59M",
      isPositive: true,
      icon: "🟢",
    },
    {
      symbol: "DOGE",
      pair: "USDT",
      price: "0.17205",
      change: "+1.94%",
      volume: "24H Vol 10.58M",
      isPositive: true,
      icon: "🐕",
    },
  ]

  // 涨幅排行数据
  const topGainers = [
    { symbol: "BTC", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "₿" },
    { symbol: "VGX", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "💜" },
    { symbol: "ETH", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "🔷" },
    { symbol: "CAK", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "🟡" },
    { symbol: "BON", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "🟡" },
    { symbol: "UBC", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "🔵" },
  ]

  // 最高交易额币种数据
  const topVolume = [
    { symbol: "BTC", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "₿" },
    { symbol: "CAK", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "🟡" },
    { symbol: "VGX", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "💜" },
    { symbol: "BON", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "🟡" },
    { symbol: "ETH", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "🔷" },
    { symbol: "UBC", pair: "USDT", price: "0.11234", change: "+19.15%", icon: "🔵" },
  ]

  // 完整市场数据
  const marketData = [
    {
      symbol: "BTC",
      pair: "USDT",
      price: "1.5373",
      change: "-3.46%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: false,
      icon: "₿",
    },
    {
      symbol: "VGX",
      pair: "USDT",
      price: "1.5373",
      change: "+3.46%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: true,
      icon: "💜",
    },
    {
      symbol: "ETH",
      pair: "USDT",
      price: "1.5373",
      change: "+2.85%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: true,
      icon: "🔷",
    },
    {
      symbol: "CAK",
      pair: "USDT",
      price: "1.5373",
      change: "-1.25%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: false,
      icon: "🟡",
    },
    {
      symbol: "BON",
      pair: "USDT",
      price: "1.5373",
      change: "+4.21%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: true,
      icon: "🟡",
    },
    {
      symbol: "UBC",
      pair: "USDT",
      price: "1.5373",
      change: "-2.15%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: false,
      icon: "🔵",
    },
  ]

  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842]" : "bg-white border border-gray-200"

  // 鼠标拖动处理
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0))
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // 添加到自选
  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    )
  }

  return (
    <div className="space-y-6">
      {/* 顶部重点币种 - 手机端隐藏 */}
      <div className="hidden md:grid grid-cols-2 gap-4">
        {topCoins.map((coin, index) => (
          <div key={index} className={`${cardStyle} rounded-lg p-4`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{coin.icon}</span>
                <div>
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {coin.symbol}/{coin.pair}
                  </div>
                  <div className="text-xs text-gray-500">{coin.volume}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ${coin.price}
                </div>
                <div className={`text-sm ${coin.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 涨幅排行和最高交易额 - 手机端隐藏 */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 涨幅排行 */}
        <div className={`${cardStyle} rounded-lg p-4`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            涨幅排行
          </h3>
          <div className="space-y-3">
            {topGainers.map((coin, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{coin.icon}</span>
                  <div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {coin.symbol}/{coin.pair}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${coin.price}
                  </div>
                  <div className="text-sm text-green-500">
                    {coin.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 最高交易额 */}
        <div className={`${cardStyle} rounded-lg p-4`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            最高交易额
          </h3>
          <div className="space-y-3">
            {topVolume.map((coin, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{coin.icon}</span>
                  <div>
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {coin.symbol}/{coin.pair}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${coin.price}
                  </div>
                  <div className="text-sm text-green-500">
                    {coin.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 市场数据表格 */}
      <div className={`${cardStyle} rounded-lg p-4`}>
        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          市场数据
        </h3>
        
        {/* 桌面端表格 */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500">交易对</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500">最新价格</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500">24h涨跌</th>
                <th className="text-center py-3 px-2 text-xs font-medium text-gray-500">走势</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500">24h成交量</th>
                <th className="text-center py-3 px-2 text-xs font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody>
              {marketData.map((crypto, index) => (
                <tr key={index} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{crypto.icon}</span>
                      <div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {crypto.symbol}/{crypto.pair}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${crypto.price}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className={`font-medium ${crypto.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {crypto.change}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <MiniLineChart isPositive={crypto.isPositive} />
                  </td>
                  <td className="py-3 px-2 text-right text-sm text-gray-500">
                    {crypto.volume}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <button
                      onClick={() => toggleFavorite(`${crypto.symbol}/${crypto.pair}`)}
                      className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        favorites.includes(`${crypto.symbol}/${crypto.pair}`) ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                    >
                      <Star className="w-4 h-4" fill={favorites.includes(`${crypto.symbol}/${crypto.pair}`) ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 移动端表格标题 */}
        <div className="md:hidden mb-3">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium">
            <div className="text-left">
              {isDark ? <span className="text-gray-400">交易对/成交量</span> : <span className="text-gray-600">交易对/成交量</span>}
            </div>
            <div className="text-center">
              {isDark ? <span className="text-gray-400">价格</span> : <span className="text-gray-600">价格</span>}
            </div>
            <div className="text-right">
              {isDark ? <span className="text-gray-400">24H涨跌</span> : <span className="text-gray-600">24H涨跌</span>}
            </div>
          </div>
        </div>

        {/* 移动端市场数据列表 */}
        <div className="md:hidden space-y-1">
          {marketData.map((crypto, index) => {
            const pairName = `${crypto.symbol}/${crypto.pair}`
            const isFavorite = favorites.includes(pairName)

            return (
              <div
                key={index}
                className={`py-3 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}
              >
                <div className="grid grid-cols-3 gap-4 items-center">
                  {/* 左侧：交易对和成交量 */}
                  <div className="text-left">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`font-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                        {pairName}
                      </span>
                    </div>
                    <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {crypto.volume}
                    </div>
                  </div>

                  {/* 中间：价格 */}
                  <div className="text-center">
                    <div className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                      ${crypto.price}
                    </div>
                  </div>

                  {/* 右侧：24小时涨跌幅 */}
                  <div className="text-right">
                    <div
                      className={`inline-block px-3 py-1 rounded-md text-sm font-medium text-white ${
                        crypto.isPositive ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {crypto.change}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}