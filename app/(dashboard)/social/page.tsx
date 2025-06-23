"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, MessageCircle, Share2, ThumbsUp, Filter } from "lucide-react"
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

interface User {
  id: string
  name: string
  handle: string
  avatar: string
  followers: string
  change: string
  isPositive: boolean
  posts: string
  bio?: string
  isVerified?: boolean
}

interface Post {
  id: string
  userId: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  time: string
  isLiked?: boolean
}

export default function SocialPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["user-1", "user-3"])
  const [activeMainTab, setActiveMainTab] = useState("圈子")
  const [activeSubTab, setActiveSubTab] = useState("全部")
  const [mounted, setMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isDark = theme === "dark"

  // 解决闪烁问题
  useEffect(() => {
    setMounted(true)
  }, [])

  // 如果组件未挂载，返回空白内容，避免闪烁
  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  // 一级页签
  const mainTabs = ["关注", "圈子", "最新"]

  // 二级页签 - 根据主页签变化
  const getSubTabs = () => {
    if (activeMainTab === "圈子") {
      return [] // 圈子页签不需要二级页签，会显示圈子列表
    }
    return [
      "全部",
      "交易员",
      "分析师", 
      "KOL",
      "机构",
      "新手",
      "BTC",
      "ETH",
      "DeFi",
      "NFT",
      "GameFi",
      "Layer2",
      "Meme",
      "AI",
    ]
  }

  const subTabs = getSubTabs()

  // 圈子数据
  const circles = [
    {
      id: "circle-1",
      name: "DeFi精英圈",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      members: 2856,
      isJoined: true,
      description: "专注DeFi协议分析与投资策略"
    },
    {
      id: "circle-2", 
      name: "NFT收藏家",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=64&h=64&fit=crop&crop=face",
      members: 1234,
      isJoined: false,
      description: "发现优质NFT项目，分享收藏心得"
    },
    {
      id: "circle-3",
      name: "链游公会",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face", 
      members: 3421,
      isJoined: true,
      description: "GameFi项目测评与攻略分享"
    },
    {
      id: "circle-4",
      name: "技术开发者",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      members: 892,
      isJoined: false,
      description: "区块链技术讨论与代码分享"
    },
    {
      id: "circle-5",
      name: "投资策略",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
      members: 5678,
      isJoined: true,
      description: "市场分析与投资策略分享"
    }
  ]

  // 顶部热门用户数据
  const topUsers: User[] = [
    {
      id: "user-1",
      name: "CryptoKing",
      handle: "@cryptoking",
      avatar: "👑",
      followers: "125.6K",
      change: "+2.54%",
      posts: "24H Posts 68",
      isPositive: true,
      isVerified: true,
    },
    {
      id: "user-2",
      name: "BitcoinBull",
      handle: "@bitcoinbull",
      avatar: "🐂",
      followers: "89.2K",
      change: "+0.95%",
      posts: "24H Posts 45",
      isPositive: true,
    },
    {
      id: "user-3",
      name: "DeFiGuru",
      handle: "@defiguru",
      avatar: "🧙‍♂️",
      followers: "67.8K",
      change: "+0.79%",
      posts: "24H Posts 32",
      isPositive: true,
      isVerified: true,
    },
    {
      id: "user-4",
      name: "NFTCollector",
      handle: "@nftcollector",
      avatar: "🎨",
      followers: "54.3K",
      change: "+1.94%",
      posts: "24H Posts 28",
      isPositive: true,
    },
  ]

  // 涨粉排行数据
  const topGainers: User[] = [
    { id: "user-5", name: "CryptoWhale", handle: "@cryptowhale", avatar: "🐋", followers: "234K", change: "+19.15%", posts: "156 posts", isPositive: true },
    { id: "user-6", name: "BlockchainBro", handle: "@blockchainbro", avatar: "⛓️", followers: "189K", change: "+15.32%", posts: "134 posts", isPositive: true },
    { id: "user-7", name: "AltcoinAlpha", handle: "@altcoinalpha", avatar: "🚀", followers: "156K", change: "+12.87%", posts: "128 posts", isPositive: true },
    { id: "user-8", name: "TradingPro", handle: "@tradingpro", avatar: "📈", followers: "143K", change: "+11.45%", posts: "112 posts", isPositive: true },
    { id: "user-9", name: "CryptoNews", handle: "@cryptonews", avatar: "📰", followers: "198K", change: "+10.23%", posts: "98 posts", isPositive: true },
    { id: "user-10", name: "DeFiDegen", handle: "@defidegen", avatar: "💎", followers: "87K", change: "+9.87%", posts: "87 posts", isPositive: true },
  ]

  // 热门帖子数据
  const topPosts: Post[] = [
    {
      id: "post-1",
      userId: "user-1",
      content: "比特币突破70,000美元！这是历史性的一刻，我们正在见证加密货币的未来。#BTC #加密货币 #牛市",
      likes: 1245,
      comments: 328,
      shares: 567,
      time: "2小时前",
      isLiked: true,
    },
    {
      id: "post-2",
      userId: "user-3",
      content: "刚刚发布了一个关于DeFi流动性挖矿的深度分析报告，欢迎大家查看并提供反馈。链接在评论区。#DeFi #流动性挖矿 #加密货币",
      likes: 876,
      comments: 245,
      shares: 312,
      time: "4小时前",
    },
    {
      id: "post-3",
      userId: "user-4",
      content: "这个NFT系列太惊艳了！艺术家将区块链技术与传统艺术完美结合，每一个作品都讲述了一个关于数字未来的故事。#NFT #数字艺术 #区块链",
      image: "https://via.placeholder.com/500x300",
      likes: 1532,
      comments: 421,
      shares: 678,
      time: "昨天",
      isLiked: true,
    },
    {
      id: "post-4",
      userId: "user-2",
      content: "市场分析：以太坊正在形成一个强劲的上升趋势，技术指标显示可能会在短期内突破4,000美元。关注RSI和MACD指标的交叉点。#ETH #技术分析 #加密货币",
      likes: 945,
      comments: 213,
      shares: 387,
      time: "昨天",
    },
  ]

  // 用户数据
  const users: User[] = [
    ...topUsers,
    ...topGainers,
    {
      id: "user-11",
      name: "CryptoMaster",
      handle: "@cryptomaster",
      avatar: "🎯",
      followers: "1.5M",
      change: "-3.46%",
      posts: "2.3K",
      isPositive: false,
      isVerified: true,
    },
    {
      id: "user-12",
      name: "BlockchainQueen",
      handle: "@blockchainqueen",
      avatar: "👸",
      followers: "987K",
      change: "+3.46%",
      posts: "1.8K",
      isPositive: true,
    },
    {
      id: "user-13",
      name: "DeFiLord",
      handle: "@defilord",
      avatar: "🏰",
      followers: "756K",
      change: "-2.15%",
      posts: "3.1K",
      isPositive: false,
    },
    {
      id: "user-14",
      name: "NFTHunter",
      handle: "@nfthunter",
      avatar: "🏹",
      followers: "654K",
      change: "+5.23%",
      posts: "892",
      isPositive: true,
      isVerified: true,
    },
  ]

  // 过滤用户数据
  const filteredUsers = users.filter((user) => {
    const searchText = `${user.name} ${user.handle}`.toLowerCase()
    return searchText.includes(searchTerm.toLowerCase())
  })

  const toggleFavorite = (userId: string) => {
    setFavorites((prev) => (prev.includes(userId) ? prev.filter((f) => f !== userId) : [...prev, userId]))
  }

  // 统一的卡片样式
  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"

  // 拖动滑动功能
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
        {/* 顶部热门用户卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {topUsers.map((user) => (
            <div key={user.id} className={`${cardStyle} rounded-lg p-6 ${isDark ? "text-white" : "text-gray-800"}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{user.avatar}</span>
                  <div>
                    <div className="flex items-center">
                      <span className="font-bold text-lg">{user.name}</span>
                      {user.isVerified && (
                        <span className="ml-1 text-blue-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400 text-sm">{user.handle}</div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${user.isPositive ? "text-custom-green" : "text-red-400"}`}>
                  {user.change}
                </div>
              </div>

              <div className="flex items-end justify-between mb-2">
                <div className="text-2xl font-bold">{user.followers}</div>
                {/* 简洁线性图表 */}
                <MiniLineChart isPositive={user.isPositive} />
              </div>

              <div className="text-gray-400 text-sm">{user.posts}</div>
            </div>
          ))}
        </div>

        {/* 涨粉排行和热门帖子 - 两个独立卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* 涨粉排行卡片 */}
          <div className={`${cardStyle} rounded-lg p-6`}>
            <h3 className={`${isDark ? "text-white" : "text-gray-800"} text-lg font-bold mb-4`}>涨粉排行</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topGainers.slice(0, 6).map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{user.avatar}</span>
                    <div>
                      <span className={`${isDark ? "text-white" : "text-gray-800"} font-medium block`}>{user.name}</span>
                      <span className="text-gray-400 text-xs">{user.handle}</span>
                    </div>
                  </div>
                  <span className="text-custom-green text-sm font-medium">{user.change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 热门帖子卡片 */}
          <div className={`${cardStyle} rounded-lg p-6`}>
            <h3 className={`${isDark ? "text-white" : "text-gray-800"} text-lg font-bold mb-4`}>热门帖子</h3>
            <div className="space-y-4">
              {topPosts.slice(0, 3).map((post) => {
                const user = users.find((u) => u.id === post.userId)
                if (!user) return null
                return (
                  <div key={post.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                        {user.avatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <span className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>{user.name}</span>
                        {user.isVerified && (
                          <span className="ml-1 text-blue-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                        <span className="mx-1 text-gray-400">·</span>
                        <span className="text-gray-400 text-sm">{post.time}</span>
                      </div>
                      <p className={`text-sm mt-1 line-clamp-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {post.content}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <button
                          className={`flex items-center text-xs ${
                            post.isLiked ? "text-custom-green" : "text-gray-400"
                          } hover:text-custom-green`}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" fill={post.isLiked ? "currentColor" : "none"} />
                          {post.likes}
                        </button>
                        <button className="flex items-center text-xs text-gray-400 hover:text-custom-green">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </button>
                        <button className="flex items-center text-xs text-gray-400 hover:text-custom-green">
                          <Share2 className="h-4 w-4 mr-1" />
                          {post.shares}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
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
                      ? "font-black text-gray-900 dark:text-white"
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
                placeholder="搜索用户"
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

          {/* 二级页签 - 只在非圈子页签时显示 */}
          {activeMainTab !== "圈子" && (
            <div className={`${isDark ? "bg-[#2a2d3a]" : "bg-gray-100"} rounded-lg p-2`}>
              <div
                ref={scrollContainerRef}
                className="flex items-center space-x-1 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
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
            </div>
          )}

          {/* 圈子页签内容 */}
          {activeMainTab === "圈子" && (
            <div className={`${cardStyle} rounded-lg mb-3 border-2 ${isDark ? "border-[#252842]" : "border-gray-300"}`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-base font-bold ${isDark ? "text-white" : "text-gray-800"}`}>我的圈子</div>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00D4AA] text-white hover:bg-[#00D4AA]/80 transition-colors"
                    title="创建圈子"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                
                {/* 圈子头像列表 */}
                <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                  {circles.map((circle) => (
                    <div key={circle.id} className="flex-shrink-0 text-center">
                      <div className="relative mb-2">
                        <img
                          src={circle.avatar}
                          alt={circle.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                        />
                        {circle.isJoined && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00D4AA] rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className={`text-xs font-medium truncate w-16 ${isDark ? "text-white" : "text-gray-800"}`}>
                        {circle.name}
                      </p>
                      <p className="text-xs text-gray-500">{circle.members}人</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 用户列表标题栏 - 只在非圈子页签时显示 */}
        {activeMainTab !== "圈子" && (
          <div className={`${cardStyle} rounded-lg mb-3 border-2 ${isDark ? "border-[#252842]" : "border-gray-300"}`}>
            <div className="flex items-center justify-between p-4">
              <div className={`text-base font-bold ${isDark ? "text-white" : "text-gray-800"}`}>推荐用户</div>
              <button
                className={`flex items-center px-3 py-1 rounded-md text-sm ${
                  isDark ? "bg-[#252842] text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                筛选
              </button>
            </div>
          </div>
        )}

        {/* 圈子详细列表 - 只在圈子页签时显示 */}
        {activeMainTab === "圈子" && (
          <div className="space-y-3">
            {circles.map((circle) => (
              <div
                key={circle.id}
                className={`${cardStyle} rounded-lg transition-all duration-200 hover:${
                  isDark ? "bg-[#252842]" : "bg-gray-50"
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={circle.avatar}
                        alt={circle.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                          {circle.name}
                        </h3>
                        <p className="text-gray-500 text-sm">{circle.description}</p>
                        <p className="text-gray-400 text-xs">{circle.members} 位成员</p>
                      </div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        circle.isJoined
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                          : "bg-[#00D4AA] text-white hover:bg-[#00D4AA]/80"
                      }`}
                    >
                      {circle.isJoined ? "已加入" : "加入"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 用户列表 - 只在非圈子页签时显示 */}
        {activeMainTab !== "圈子" && (
          <div className="space-y-3">
            {filteredUsers.map((user) => {
              const isFavorite = favorites.includes(user.id)

              return (
                <div
                  key={user.id}
                  className={`${cardStyle} rounded-lg transition-all duration-200 hover:${
                    isDark ? "bg-[#252842]" : "bg-gray-50"
                  }`}
                >
                <div className="p-4">
                  <div className="flex items-start">
                    {/* 用户头像和信息 */}
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                        {user.avatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{user.name}</span>
                          {user.isVerified && (
                            <span className="ml-1 text-blue-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                  clip\
