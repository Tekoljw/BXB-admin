"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Star, Search, Heart, MessageCircle, Share, MoreHorizontal, ImageIcon, Video, Smile } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function MomentsPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["post-1", "post-3"])
  const [activeMainTab, setActiveMainTab] = useState("推荐")
  const [activeSubTab, setActiveSubTab] = useState("全部")
  const [mounted, setMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [rightSidebarTab, setRightSidebarTab] = useState("推荐关注")
  const [leaderboardPeriod, setLeaderboardPeriod] = useState("单日")
  const [leftSidebarTab, setLeftSidebarTab] = useState("热门话题")
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
  const mainTabs = ["关注", "推荐", "热门"]

  // 二级页签
  const subTabs = [
    "全部",
    "交易心得",
    "市场分析",
    "技术分享",
    "新手教学",
    "DeFi",
    "NFT",
    "GameFi",
    "Layer2",
    "Meme币",
    "AI概念",
    "公链生态",
    "投资策略",
    "风险提示",
  ]

  // 热门话题数据
  const trendingTopics = [
    { tag: "BTC突破", posts: "1.2K", change: "+19.15%" },
    { tag: "DeFi挖矿", posts: "856", change: "+15.32%" },
    { tag: "NFT艺术", posts: "634", change: "+12.87%" },
    { tag: "ETH升级", posts: "423", change: "+11.45%" },
    { tag: "Layer2", posts: "312", change: "+9.23%" },
    { tag: "Meme币", posts: "289", change: "+8.76%" },
    { tag: "GameFi", posts: "245", change: "+7.65%" },
    { tag: "Web3", posts: "198", change: "+6.43%" },
  ]

  // 圈子数据
  const circles = [
    { name: "量化交易圈", members: "2.3K", posts: "456", avatar: "📊", isJoined: true },
    { name: "DeFi研究院", members: "1.8K", posts: "234", avatar: "🏛️", isJoined: false },
    { name: "NFT收藏家", members: "1.5K", posts: "189", avatar: "🎨", isJoined: true },
    { name: "区块链技术", members: "3.1K", posts: "567", avatar: "⛓️", isJoined: false },
    { name: "Web3创业者", members: "987", posts: "123", avatar: "🚀", isJoined: true },
    { name: "加密投资", members: "2.7K", posts: "345", avatar: "💰", isJoined: false },
    { name: "Layer2生态", members: "1.2K", posts: "98", avatar: "🌐", isJoined: false },
    { name: "Meme币社区", members: "856", posts: "67", avatar: "🐕", isJoined: true },
  ]

  // 推荐用户数据
  const recommendedUsers = [
    { name: "V神", avatar: "V", posts: "234", change: "+19.15%" },
    { name: "CZ", avatar: "C", posts: "189", change: "+15.32%" },
    { name: "加密女王", avatar: "👸", posts: "156", change: "+12.87%" },
    { name: "区块链教授", avatar: "👨‍🏫", posts: "143", change: "+11.45%" },
    { name: "DeFi专家", avatar: "💎", posts: "128", change: "+10.23%" },
  ]

  // 交易员排行榜数据
  const traderLeaderboard = [
    { rank: 1, name: "量化大师", avatar: "#FFD700", followers: "12.8K", trades: "1,234", return: "+158.7%", color: "bg-yellow-500" },
    { rank: 2, name: "趋势猎手", avatar: "#4F46E5", followers: "9.5K", trades: "987", return: "+142.3%", color: "bg-blue-500" },
    { rank: 3, name: "波段王者", avatar: "#22C55E", followers: "7.2K", trades: "756", return: "+128.9%", color: "bg-green-500" },
    { rank: 4, name: "价值投资者", avatar: "#A855F7", followers: "15.3K", trades: "543", return: "+115.4%", color: "bg-purple-500" },
    { rank: 5, name: "短线高手", avatar: "#EF4444", followers: "6.8K", trades: "2,156", return: "+98.7%", color: "bg-red-500" },
    { rank: 6, name: "套利专家", avatar: "#3B82F6", followers: "4.9K", trades: "678", return: "+87.2%", color: "bg-blue-600" },
    { rank: 7, name: "技术分析师", avatar: "#EC4899", followers: "8.1K", trades: "892", return: "+76.8%", color: "bg-pink-500" },
    { rank: 8, name: "风险控制师", avatar: "#10B981", followers: "11.2K", trades: "421", return: "+65.3%", color: "bg-emerald-500" },
  ]

  // 完整动态数据
  const postsData = [
    {
      id: "post-1",
      author: "CryptoAnalyst",
      avatar: "🔍",
      verified: true,
      content:
        "🚀 比特币突破关键阻力位！从技术分析角度看，BTC已经突破了长期下降趋势线，成交量也在放大。这可能是新一轮上涨的开始。",
      images: ["/placeholder.svg?height=300&width=400&text=BTC技术分析图"],
      timestamp: "2小时前",
      likes: 2543,
      comments: 156,
      shares: 89,
      isLiked: false,
      tags: ["BTC", "技术分析", "突破"],
    },
    {
      id: "post-2",
      author: "DeFiGuru",
      avatar: "🧙‍♂️",
      verified: true,
      content: "刚刚发现一个新的DeFi协议，APY高达200%！但是大家要注意风险，高收益往往伴随高风险。DYOR！💰",
      timestamp: "4小时前",
      likes: 1876,
      comments: 234,
      shares: 67,
      isLiked: true,
      tags: ["DeFi", "流动性挖矿", "风险提示"],
    },
    {
      id: "post-3",
      author: "NFTCollector",
      avatar: "🎨",
      verified: false,
      content: "这个NFT系列太惊艳了！艺术家将区块链技术与传统艺术完美结合，每一个作品都讲述了一个关于数字未来的故事。",
      images: [
        "/placeholder.svg?height=300&width=300&text=NFT作品1",
        "/placeholder.svg?height=300&width=300&text=NFT作品2",
      ],
      timestamp: "6小时前",
      likes: 1234,
      comments: 89,
      shares: 45,
      isLiked: false,
      tags: ["NFT", "数字艺术", "收藏"],
    },
    {
      id: "post-4",
      author: "TradingPro",
      avatar: "📈",
      verified: true,
      content:
        "市场分析：以太坊正在形成一个强劲的上升趋势，技术指标显示可能会在短期内突破4,000美元。关注RSI和MACD指标的交叉点。",
      timestamp: "8小时前",
      likes: 3156,
      comments: 445,
      shares: 178,
      isLiked: true,
      tags: ["ETH", "技术分析", "价格预测"],
    },
    {
      id: "post-5",
      author: "区块链新手",
      avatar: "🔰",
      verified: false,
      content: "刚入圈的新手，想请教一下大家，现在适合定投BTC和ETH吗？预算不多，每月1000元左右。求指导！🙏",
      timestamp: "10小时前",
      likes: 567,
      comments: 123,
      shares: 23,
      isLiked: false,
      tags: ["新手", "定投", "求助"],
    },
  ]

  const toggleFavorite = (postId: string) => {
    setFavorites((prev) => (prev.includes(postId) ? prev.filter((f) => f !== postId) : [...prev, postId]))
  }

  const handleLike = (postId: string) => {
    // 处理点赞逻辑
  }

  // 过滤动态数据
  const filteredPosts = postsData.filter((post) => {
    const searchText = `${post.author} ${post.content}`.toLowerCase()
    return searchText.includes(searchTerm.toLowerCase())
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
        {/* 三栏布局 */}
        <div className="grid grid-cols-12 gap-6">
          {/* 左侧边栏 - 热门话题与圈子 */}
          <div className="col-span-3">
            <div className={`${cardStyle} rounded-lg sticky top-6 overflow-hidden`}>
              {/* 页签导航 */}
              <div className="flex border-b border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => setLeftSidebarTab("热门话题")}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    leftSidebarTab === "热门话题"
                      ? isDark
                        ? "bg-[#00D4AA] text-white border-b-2 border-[#00D4AA]"
                        : "bg-[#00D4AA]/10 text-[#00D4AA] border-b-2 border-[#00D4AA]"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  热门话题
                </button>
                <button
                  onClick={() => setLeftSidebarTab("圈子")}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    leftSidebarTab === "圈子"
                      ? isDark
                        ? "bg-[#00D4AA] text-white border-b-2 border-[#00D4AA]"
                        : "bg-[#00D4AA]/10 text-[#00D4AA] border-b-2 border-[#00D4AA]"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  圈子
                </button>
              </div>

              {/* 内容区域 */}
              <div className="p-6">
                {leftSidebarTab === "热门话题" ? (
                  /* 热门话题内容 */
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between hover:bg-muted/50 p-2 rounded cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">#</span>
                          <div>
                            <span className={`${isDark ? "text-white" : "text-gray-800"} font-medium block`}>
                              {topic.tag}
                            </span>
                            <span className="text-gray-400 text-xs">{topic.posts} 条动态</span>
                          </div>
                        </div>
                        <span className="text-[#00D4AA] text-sm font-medium">{topic.change}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* 圈子内容 */
                  <div className="space-y-3">
                    {circles.map((circle, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between hover:bg-muted/50 p-2 rounded cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                            {circle.avatar}
                          </div>
                          <div>
                            <span className={`${isDark ? "text-white" : "text-gray-800"} font-medium block`}>
                              {circle.name}
                            </span>
                            <span className="text-gray-400 text-xs">{circle.members} 成员　{circle.posts} 条动态</span>
                          </div>
                        </div>
                        <button 
                          className={`text-xs px-3 py-1 rounded-full transition-colors ${
                            circle.isJoined
                              ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              : "bg-[#00D4AA] text-white hover:bg-[#00D4AA]/80"
                          }`}
                        >
                          {circle.isJoined ? "已加入" : "加入"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 中间主内容区 */}
          <div className="col-span-6">
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
                        className={`absolute bottom-0 left-0 h-0.5 bg-[#00D4AA] transition-all duration-300 ease-out ${
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
                    placeholder="搜索动态"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 w-64 rounded-lg border text-sm transition-colors ${
                      isDark
                        ? "bg-[#1a1d29] border-[#252842] text-white placeholder-gray-400 focus:border-[#00D4AA]"
                        : "bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-[#00D4AA]"
                    } focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/20`}
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
                            ? "bg-black text-white shadow-sm"
                            : "bg-black text-white shadow-sm"
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

            {/* 发布动态区域 */}
            <div className={`${cardStyle} rounded-lg mb-6`}>
              <div className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-black font-medium">
                    我
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="分享你的交易心得或市场观点..."
                      className={`w-full bg-muted rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm ${
                        isDark ? "bg-[#2a2d3a] text-white" : "bg-gray-100 text-gray-800"
                      }`}
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Video className="h-5 w-5 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Smile className="h-5 w-5 text-muted-foreground" />
                        </button>
                      </div>
                      <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                        发布
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 动态列表 - 重新设计的卡片布局 */}
            <div className="space-y-6">
              {filteredPosts.map((post) => {
                const isFavorite = favorites.includes(post.id)

                return (
                  <div
                    key={post.id}
                    className={`${cardStyle} rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:${
                      isDark ? "bg-[#1e2332]" : "bg-gray-50"
                    }`}
                  >
                    {/* 头部 - 用户信息和操作 */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                          {post.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`font-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                              {post.author}
                            </span>
                            {post.verified && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{post.timestamp}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleFavorite(post.id)}
                          className={`p-2 rounded-full transition-all duration-200 ${
                            isFavorite 
                              ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100" 
                              : "text-gray-400 hover:text-yellow-500 hover:bg-gray-50"
                          }`}
                        >
                          <Star className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                        </button>
                        <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* 内容 */}
                    <div className="mb-4">
                      <p className={`text-base leading-relaxed ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                        {post.content}
                      </p>
                    </div>

                    {/* 标签 */}
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 ${
                              isDark 
                                ? "bg-[#00D4AA]/30 text-[#00D4AA] hover:bg-[#00D4AA]/50" 
                                : "bg-[#00D4AA]/10 text-[#00D4AA] hover:bg-[#00D4AA]/20"
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 图片 */}
                    {post.images && (
                      <div className="mb-4">
                        {post.images.length === 1 ? (
                          <img
                            src={post.images[0] || "/placeholder.svg"}
                            alt="Post image"
                            className="w-full max-h-96 object-cover rounded-lg shadow-sm"
                          />
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            {post.images.slice(0, 4).map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Post image ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg shadow-sm"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 底部操作栏 */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                            post.isLiked 
                              ? "text-red-500 bg-red-50 hover:bg-red-100" 
                              : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                          }`}
                        >
                          <Heart className={`h-5 w-5 ${post.isLiked ? "fill-current" : ""}`} />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </button>

                        <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-500 hover:text-[#00D4AA] hover:bg-[#00D4AA]/10 transition-all duration-200">
                          <MessageCircle className="h-5 w-5" />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </button>

                        <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-500 hover:text-[#00D4AA] hover:bg-[#00D4AA]/10 transition-all duration-200">
                          <Share className="h-5 w-5" />
                          <span className="text-sm font-medium">{post.shares}</span>
                        </button>
                      </div>

                      {/* 数据统计 */}
                      <div className="text-sm text-gray-400">
                        {(post.likes + post.comments + post.shares).toLocaleString()} 次互动
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 右侧边栏 - 推荐关注与交易员排行榜 */}
          <div className="col-span-3">
            <div className={`${cardStyle} rounded-lg sticky top-6 overflow-hidden`}>
              {/* 页签导航 */}
              <div className="flex border-b border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => setRightSidebarTab("推荐关注")}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    rightSidebarTab === "推荐关注"
                      ? isDark
                        ? "bg-[#00D4AA] text-white border-b-2 border-[#00D4AA]"
                        : "bg-[#00D4AA]/10 text-[#00D4AA] border-b-2 border-[#00D4AA]"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  推荐关注
                </button>
                <button
                  onClick={() => setRightSidebarTab("交易员排行榜")}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    rightSidebarTab === "交易员排行榜"
                      ? isDark
                        ? "bg-[#00D4AA] text-white border-b-2 border-[#00D4AA]"
                        : "bg-[#00D4AA]/10 text-[#00D4AA] border-b-2 border-[#00D4AA]"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  交易员排行榜
                </button>
              </div>

              {/* 内容区域 */}
              <div className="p-6">
                {rightSidebarTab === "推荐关注" ? (
                  /* 推荐关注内容 */
                  <div className="space-y-3">
                    {recommendedUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {user.avatar}
                          </div>
                          <div>
                            <span className={`${isDark ? "text-white" : "text-gray-800"} font-medium block`}>
                              {user.name}
                            </span>
                            <span className="text-gray-400 text-xs">{user.posts} 条动态</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[#00D4AA] text-sm font-medium">{user.change}</span>
                          <button className="text-xs bg-[#00D4AA] text-white px-3 py-1 rounded-full hover:bg-[#00D4AA]/80 mt-1 transition-colors">
                            关注
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* 交易员排行榜内容 */
                  <div>
                    {/* 时间筛选器 - 黑色方形小页签 */}
                    <div className="flex items-center space-x-1 mb-4 overflow-x-auto">
                      {["单日", "本周", "本月", "总收益", "胜率"].map((period) => (
                        <button
                          key={period}
                          onClick={() => setLeaderboardPeriod(period)}
                          className={`px-3 py-1.5 text-xs font-medium rounded whitespace-nowrap transition-colors ${
                            leaderboardPeriod === period
                              ? "bg-black text-white"
                              : isDark
                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>

                    {/* 排行榜列表 - 优化排版 */}
                    <div className="space-y-2">
                      {traderLeaderboard.map((trader) => (
                        <div
                          key={trader.rank}
                          className="flex items-center p-2 hover:bg-muted/30 rounded-lg cursor-pointer transition-colors"
                        >
                          {/* 排名 */}
                          <div className="w-5 flex items-center justify-center mr-2">
                            <span className={`text-xs font-bold ${
                              trader.rank <= 3 ? "text-yellow-500" : isDark ? "text-gray-400" : "text-gray-500"
                            }`}>
                              {trader.rank}
                            </span>
                          </div>
                          
                          {/* 头像 */}
                          <div className={`w-8 h-8 rounded-full ${trader.color} flex items-center justify-center text-white font-bold text-xs mr-2`}>
                            {trader.name.charAt(0)}
                          </div>
                          
                          {/* 交易员信息 */}
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-medium truncate ${isDark ? "text-white" : "text-gray-800"}`}>
                              {trader.name}
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              {trader.followers} 关注者　{trader.trades} 笔交易
                            </div>
                          </div>
                          
                          {/* 收益率和跟单按钮 */}
                          <div className="flex flex-col items-end ml-2">
                            <span className="text-[#00D4AA] text-xs font-bold mb-1">{trader.return}</span>
                            <button className="text-xs bg-[#00D4AA] text-white px-2 py-0.5 rounded hover:bg-[#00D4AA]/80 transition-colors">
                              跟单
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}