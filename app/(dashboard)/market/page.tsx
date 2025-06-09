"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Star, Search } from "lucide-react"
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

export default function MarketPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["BTC/USDT", "VGX/USDT"])
  const [activeMainTab, setActiveMainTab] = useState("现货")
  const [activeSubTab, setActiveSubTab] = useState("全部")
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

  // 一级页签
  const mainTabs = ["自选", "现货", "合约"]

  // 二级页签
  const subTabs = [
    "全部",
    "USDT",
    "DEX",
    "Innovation",
    "SocialFi",
    "GameFi",
    "Solana Meme",
    "公链",
    "btc",
    "Layer2",
    "DeFi1",
    "Metaverse",
    "Web3.0",
    "Gray Scale",
  ]

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
      symbol: "CAK",
      pair: "USDT",
      price: "1.5373",
      change: "-3.46%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: false,
      icon: "🟡",
    },
    {
      symbol: "BTC",
      pair: "USDT",
      price: "1.5373",
      change: "+3.46%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: true,
      icon: "₿",
    },
    {
      symbol: "VGX",
      pair: "USDT",
      price: "1.5373",
      change: "-3.46%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: false,
      icon: "💜",
    },
    {
      symbol: "CAK",
      pair: "USDT",
      price: "1.5373",
      change: "+3.46%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: true,
      icon: "🟡",
    },
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
      symbol: "CAK",
      pair: "USDT",
      price: "1.5373",
      change: "-3.46%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: false,
      icon: "🟡",
    },
    {
      symbol: "BTC",
      pair: "USDT",
      price: "1.5373",
      change: "+3.46%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: true,
      icon: "₿",
    },
    {
      symbol: "VGX",
      pair: "USDT",
      price: "1.5373",
      change: "-3.46%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: false,
      icon: "💜",
    },
    {
      symbol: "CAK",
      pair: "USDT",
      price: "1.5373",
      change: "+3.46%",
      high: "1.5373",
      low: "1.5364",
      volume: "16,238.89K",
      turnover: "24,500.97K",
      isPositive: true,
      icon: "🟡",
    },
  ]

  const toggleFavorite = (pair: string) => {
    setFavorites((prev) => (prev.includes(pair) ? prev.filter((f) => f !== pair) : [...prev, pair]))
  }

  // 过滤市场数据
  const filteredMarketData = marketData.filter((item) => {
    const pairName = `${item.symbol}/${item.pair}`.toLowerCase()
    return pairName.includes(searchTerm.toLowerCase())
  })

  // 统一的卡片样式
  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // 添加隐藏滚动条的样式
  const scrollbarHideStyle = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyle }} />
      <div className={`p-6 min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
        {/* 顶部重点币种卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {topCoins.map((coin, index) => (
            <div key={index} className={`${cardStyle} rounded-lg p-6 ${isDark ? "text-white" : "text-gray-800"}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{coin.icon}</span>
                  <div>
                    <span className="font-bold text-lg">{coin.symbol}</span>
                    <span className="text-gray-400 text-sm">/{coin.pair}</span>
                  </div>
                </div>
                <div className={`text-sm font-medium ${coin.isPositive ? "text-custom-green" : "text-red-400"}`}>
                  {coin.change}
                </div>
              </div>

              <div className="flex items-end justify-between mb-2">
                <div className="text-2xl font-bold">{coin.price}</div>
                {/* 简洁线性图表 */}
                <MiniLineChart isPositive={coin.isPositive} />
              </div>

              <div className="text-gray-400 text-sm">{coin.volume}</div>
            </div>
          ))}
        </div>

        {/* 涨幅排行和最高交易额 - 两个独立卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* 涨幅排行卡片 */}
          <div className={`${cardStyle} rounded-lg p-6`}>
            <h3 className={`${isDark ? "text-white" : "text-gray-800"} text-lg font-bold mb-4`}>涨幅排行</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topGainers.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className={`${isDark ? "text-white" : "text-gray-800"} font-medium`}>
                      {item.symbol}/{item.pair}
                    </span>
                  </div>
                  <span className="text-custom-green text-sm font-medium">{item.change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 最高交易额币种卡片 */}
          <div className={`${cardStyle} rounded-lg p-6`}>
            <h3 className={`${isDark ? "text-white" : "text-gray-800"} text-lg font-bold mb-4`}>最高交易额币种</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topVolume.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className={`${isDark ? "text-white" : "text-gray-800"} font-medium`}>
                      {item.symbol}/{item.pair}
                    </span>
                  </div>
                  <span className="text-custom-green text-sm font-medium">{item.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 两级页签导航和搜索框 */}
        <div className="mb-6">
          {/* 一级页签和搜索框 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-8 relative">
              {mainTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMainTab(tab)}
                  className={`text-lg transition-all duration-300 relative pb-2 ${
                    activeMainTab === tab
                      ? "font-black text-black dark:text-white"
                      : isDark
                        ? "font-medium text-gray-400 hover:text-gray-300"
                        : "font-medium text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {/* 下划线动画 */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out ${
                      activeMainTab === tab ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* 搜索框 */}
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="搜索币种"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 w-64 rounded-lg border text-sm transition-colors ${
                  isDark
                    ? "bg-[#1a1d29] border-[#252842] text-white placeholder-gray-400 focus:border-blue-500"
                    : "bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-blue-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
            </div>
          </div>

          {/* 二级页签 */}
          <div className={`${isDark ? "bg-[#2a2d3a]" : "bg-gray-100"} rounded-lg p-2`}>
            <div
              ref={scrollContainerRef}
              className="flex items-center space-x-1 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {subTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`relative whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 pointer-events-auto ${
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
          </div>
        </div>

        {/* 市场数据标题栏 */}
        <div className={`${cardStyle} rounded-lg mb-3 border-2 ${isDark ? "border-[#252842]" : "border-gray-300"}`}>
          <div className="grid grid-cols-10 gap-4 p-4 text-base font-bold">
            <div className="col-span-2">
              {isDark ? <span className="text-white">交易对</span> : <span className="text-gray-800">交易对</span>}
            </div>
            <div className="col-span-1 text-right">
              {isDark ? <span className="text-white">价格</span> : <span className="text-gray-800">价格</span>}
            </div>
            <div className="col-span-2 text-center">
              {isDark ? <span className="text-white">24H涨跌</span> : <span className="text-gray-800">24H涨跌</span>}
            </div>
            <div className="col-span-2 text-center">
              {isDark ? (
                <span className="text-white">24H最高/最低</span>
              ) : (
                <span className="text-gray-800">24H最高/最低</span>
              )}
            </div>
            <div className="col-span-1 text-right">
              {isDark ? (
                <span className="text-white">24H成交量</span>
              ) : (
                <span className="text-gray-800">24H成交量</span>
              )}
            </div>
            <div className="col-span-1 text-right">
              {isDark ? <span className="text-white">交易量</span> : <span className="text-gray-800">交易量</span>}
            </div>
            <div className="col-span-1 text-right">
              {isDark ? <span className="text-white">操作</span> : <span className="text-gray-800">操作</span>}
            </div>
          </div>
        </div>

        {/* 市场数据横条卡片 */}
        <div className="space-y-3">
          {filteredMarketData.map((item, index) => {
            const pairName = `${item.symbol}/${item.pair}`
            const isFavorite = favorites.includes(pairName)

            return (
              <div
                key={index}
                className={`${cardStyle} rounded-lg transition-all duration-200 hover:${
                  isDark ? "bg-[#252842]" : "bg-gray-50"
                }`}
              >
                <div className="grid grid-cols-10 gap-4 p-4 items-center">
                  {/* 交易对 */}
                  <div className="col-span-2 flex items-center space-x-3">
                    <button
                      onClick={() => toggleFavorite(pairName)}
                      className={`${
                        isFavorite ? "text-yellow-500" : "text-gray-300"
                      } hover:text-yellow-500 transition-colors`}
                    >
                      <Star className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    <span className="text-lg">{item.icon}</span>
                    <span className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{pairName}</span>
                  </div>

                  {/* 价格 */}
                  <div className={`col-span-1 font-bold text-right ${isDark ? "text-white" : "text-gray-800"}`}>
                    {item.price}
                  </div>

                  {/* 24H涨跌 */}
                  <div className="col-span-2 flex justify-center">
                    <span
                      className={`inline-block w-24 text-center py-1 rounded-md text-base font-medium text-white ${
                        item.isPositive ? "bg-custom-green" : "bg-red-500"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>

                  {/* 24H最高/最低 */}
                  <div className={`col-span-2 text-sm text-center ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {item.high}/{item.low}
                  </div>

                  {/* 24H成交量 */}
                  <div className={`col-span-1 text-sm text-right ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {item.volume}
                  </div>

                  {/* 交易量 */}
                  <div className={`col-span-1 text-sm text-right ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {item.turnover}
                  </div>

                  {/* 操作按钮 */}
                  <div className="col-span-1 text-right">
                    <button className="bg-black hover:bg-gray-800 text-white py-2 px-6 rounded-md text-sm font-medium transition-colors">
                      交易
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
