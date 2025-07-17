"use client"

import React, { useState, useEffect, useRef } from "react"
import { Star, Search, Heart, MessageCircle, Share, MoreHorizontal, ImageIcon, Video, Smile } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import MarketContent from "@/components/market-content"

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
        />
      </svg>
    </div>
  )
}

export default function MomentsPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["post-1", "post-3"])
  const [activeMainTab, setActiveMainTab] = useState("推荐")
  const [activeSubTab, setActiveSubTab] = useState("热门话题")
  const [mounted, setMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [rightSidebarTab, setRightSidebarTab] = useState("推荐关注")
  const [leaderboardPeriod, setLeaderboardPeriod] = useState("本周")
  const [leftSidebarTab, setLeftSidebarTab] = useState("热门话题")
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [publishContent, setPublishContent] = useState("")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // 行情相关状态
  const [activePrimaryTab, setActivePrimaryTab] = useState("自选")
  const [activeSecondaryTab, setActiveSecondaryTab] = useState("现货")
  const [marketFavorites, setMarketFavorites] = useState<string[]>(["BTC/USDT", "ETH/USDT"])


  
  // 解决闪烁问题
  useEffect(() => {
    setMounted(true)
    
    // 检测移动端
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 当主页签切换时，重置二级页签
  useEffect(() => {
    if (activeMainTab === "推荐") {
      setActiveSubTab("热门话题")
    } else if (activeMainTab === "圈子") {
      setActiveSubTab("全部")
    } else if (activeMainTab === "行情") {
      setActiveSubTab("全部")
    } else {
      setActiveSubTab("全部")
    }
  }, [activeMainTab])

  // 处理设备类型变化时的页签切换
  useEffect(() => {
    // 如果当前页签在新设备类型下不可用，切换到默认页签
    if (!isMobile && (activeMainTab === "推荐" || activeMainTab === "行情")) {
      setActiveMainTab("关注")
    } else if (isMobile && activeMainTab === "推荐" && !mainTabs.includes("推荐")) {
      setActiveMainTab("关注")
    }
  }, [isMobile])

  const isDark = theme === "dark"

  // 一级页签 - 根据设备类型显示不同页签
  const mainTabs = isMobile ? ["关注", "圈子", "最新", "推荐", "行情"] : ["关注", "圈子", "最新"]

  // 二级页签 - 根据主页签变化
  const getSubTabs = () => {
    if (activeMainTab === "圈子") {
      return [] // 圈子页签不需要二级页签，会显示圈子列表
    }
    if (activeMainTab === "推荐") {
      return ["热门话题", "热门圈子", "推荐关注", "TOP"]
    }
    return [
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
  }

  const subTabs = getSubTabs()
  
  // 行情相关配置
  const primaryTabs = ["自选", "热门", "涨幅榜", "跌幅榜", "新币榜", "成交额榜"]
  const secondaryTabs = ["现货", "合约"]
  
  // 行情数据
  const marketData = [
    {
      symbol: "BTC",
      pair: "USDT",
      price: "43,250.00",
      change: "+2.45%",
      high24h: "44,100.00",
      low24h: "42,800.00",
      volume: "1,234,567,890",
      icon: "₿",
      isPositive: true
    },
    {
      symbol: "ETH",
      pair: "USDT",
      price: "2,680.50",
      change: "+1.85%",
      high24h: "2,720.00",
      low24h: "2,620.00",
      volume: "987,654,321",
      icon: "♦",
      isPositive: true
    },
    {
      symbol: "BNB",
      pair: "USDT",
      price: "315.25",
      change: "-0.75%",
      high24h: "322.00",
      low24h: "310.00",
      volume: "456,789,123",
      icon: "🔶",
      isPositive: false
    },
    {
      symbol: "ADA",
      pair: "USDT",
      price: "0.4850",
      change: "+3.25%",
      high24h: "0.5200",
      low24h: "0.4600",
      volume: "234,567,890",
      icon: "♠",
      isPositive: true
    },
    {
      symbol: "SOL",
      pair: "USDT",
      price: "95.75",
      change: "-1.45%",
      high24h: "98.50",
      low24h: "93.20",
      volume: "345,678,901",
      icon: "◉",
      isPositive: false
    },
    {
      symbol: "DOT",
      pair: "USDT",
      price: "7.850",
      change: "+0.95%",
      high24h: "8.100",
      low24h: "7.650",
      volume: "123,456,789",
      icon: "●",
      isPositive: true
    }
  ]
  
  // 行情收藏功能
  const toggleMarketFavorite = (pair: string) => {
    setMarketFavorites(prev => 
      prev.includes(pair) 
        ? prev.filter(p => p !== pair)
        : [...prev, pair]
    )
  }
  
  // 根据页签筛选行情数据
  const getFilteredMarketData = () => {
    let filtered = marketData
    
    if (activePrimaryTab === "自选") {
      filtered = marketData.filter(crypto => 
        marketFavorites.includes(`${crypto.symbol}/${crypto.pair}`)
      )
    } else if (activePrimaryTab === "热门") {
      filtered = marketData.slice(0, 6)
    } else if (activePrimaryTab === "涨幅榜") {
      filtered = marketData.filter(crypto => crypto.isPositive).sort((a, b) => 
        parseFloat(b.change) - parseFloat(a.change)
      )
    } else if (activePrimaryTab === "跌幅榜") {
      filtered = marketData.filter(crypto => !crypto.isPositive).sort((a, b) => 
        parseFloat(a.change) - parseFloat(b.change)
      )
    } else if (activePrimaryTab === "新币榜") {
      filtered = marketData.slice(2, 5)
    } else if (activePrimaryTab === "成交额榜") {
      filtered = marketData.sort((a, b) => 
        parseFloat(b.volume.replace(/,/g, '')) - parseFloat(a.volume.replace(/,/g, ''))
      )
    }
    
    return filtered
  }
  
  // 应用搜索过滤器
  const filteredMarketData = getFilteredMarketData().filter(crypto =>
    `${crypto.symbol}/${crypto.pair}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 如果组件未挂载，返回空白内容，避免闪烁
  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  // 圈子数据 - 更新为与社交页面一致的格式
  const circleData = [
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

  // 过滤动态数据 - 根据选择的圈子过滤
  const filteredPosts = postsData.filter((post) => {
    const searchText = `${post.author} ${post.content}`.toLowerCase()
    const matchesSearch = searchText.includes(searchTerm.toLowerCase())
    
    // 根据主页签过滤
    if (activeMainTab === "圈子") {
      return matchesSearch
    }
    
    // 根据二级页签过滤内容
    if (activeSubTab === "全部") {
      return matchesSearch
    } else if (activeSubTab === "交易心得") {
      return matchesSearch && (post.tags?.includes("交易心得") || post.content.includes("交易") || post.content.includes("心得"))
    } else if (activeSubTab === "市场分析") {
      return matchesSearch && (post.tags?.includes("市场分析") || post.content.includes("分析") || post.content.includes("市场"))
    } else if (activeSubTab === "技术分析") {
      return matchesSearch && (post.tags?.includes("技术分析") || post.content.includes("技术"))
    } else if (activeSubTab === "DeFi") {
      return matchesSearch && (post.tags?.includes("DeFi") || post.content.toLowerCase().includes("defi"))
    } else if (activeSubTab === "NFT") {
      return matchesSearch && (post.tags?.includes("NFT") || post.content.toLowerCase().includes("nft"))
    } else if (circleData.some(circle => circle.name === activeSubTab)) {
      // 特定圈子的动态过滤
      return matchesSearch
    }
    
    return matchesSearch
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
  `;

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyle }} />
      <div className={`${isMobile ? 'p-4' : 'p-6'} min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
        {/* 三栏布局 - 移动端单列布局 */}
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-12'}`}>
          {/* 左侧边栏 - 热门话题与圈子 - 在移动端隐藏 */}
          {!isMobile && (
            <div className="col-span-3">
            <div className={`${cardStyle} rounded-lg sticky top-6 overflow-hidden`}>
              {/* 页签导航 */}
              <div className="flex border-b border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => setLeftSidebarTab("热门话题")}
                  className={`flex-1 py-3 px-4 text-sm transition-colors ${
                    leftSidebarTab === "热门话题"
                      ? isDark 
                        ? "text-white font-bold border-b-2 border-white bg-transparent"
                        : "text-black font-bold border-b-2 border-black bg-transparent"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-700 font-normal"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 font-normal"
                  }`}
                >
                  热门话题
                </button>
                <button
                  onClick={() => setLeftSidebarTab("热门圈子")}
                  className={`flex-1 py-3 px-4 text-sm transition-colors ${
                    leftSidebarTab === "热门圈子"
                      ? isDark 
                        ? "text-white font-bold border-b-2 border-white bg-transparent"
                        : "text-black font-bold border-b-2 border-black bg-transparent"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-700 font-normal"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 font-normal"
                  }`}
                >
                  热门圈子
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
                  <div className="space-y-2">
                    {circles.map((circle, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-muted/30 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={circleData.find(c => c.name === circle.name)?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"}
                            alt={circle.name}
                            className="w-12 h-12 rounded-full object-cover shadow-sm flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`font-semibold text-sm truncate ${isDark ? "text-white" : "text-gray-800"}`}>
                                {circle.name}
                              </h4>
                              <button 
                                className={`text-xs px-2 py-1 rounded transition-colors flex-shrink-0 ${
                                  circle.isJoined
                                    ? "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300"
                                    : "bg-black text-white hover:bg-gray-800"
                                }`}
                              >
                                {circle.isJoined ? "已加入" : "加入"}
                              </button>
                            </div>
                            <div className="flex items-center space-x-3 text-xs text-gray-400">
                              <span className="flex items-center">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mr-1"></span>
                                {circle.members} 成员
                              </span>
                              <span className="flex items-center">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mr-1"></span>
                                {circle.posts} 条动态
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            </div>
          )}

          {/* 中间主内容区 */}
          <div className={`${isMobile ? 'col-span-1' : 'col-span-6'}`}>
            {/* 两级页签导航和搜索框 */}
            <div className="mb-6">
              {/* 一级页签和搜索框 - 移动端布局调整 */}
              <div className={`${isMobile ? 'space-y-4' : 'flex items-center justify-between'} mb-4`}>
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

                {/* 搜索框和发布按钮 */}
                <div className="flex items-center space-x-3">
                  {/* 搜索框 - 移动端缩短 */}
                  <div className="relative flex-1">
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
                      className={`pl-10 pr-4 py-2 ${isMobile ? 'w-full' : 'w-64'} rounded-lg border text-sm transition-colors ${
                        isDark
                          ? "bg-[#1a1d29] border-[#252842] text-white placeholder-gray-400 focus:border-[#00D4AA]"
                          : "bg-white border-gray-200 text-gray-800 placeholder-gray-500 focus:border-[#00D4AA]"
                      } focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/20`}
                    />
                  </div>
                  
                  {/* 移动端发布按钮 */}
                  {isMobile && (
                    <button
                      onClick={() => setShowPublishModal(true)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isDark 
                          ? "bg-white text-black hover:bg-gray-200" 
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      + 发布
                    </button>
                  )}
                </div>
              </div>

              {/* 二级页签 - 只在非圈子页签时显示 */}
              {activeMainTab !== "圈子" && (
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
                    {subTabs.map((tab, index) => (
                      <button
                        key={tab}
                        onClick={() => setActiveSubTab(tab)}
                        className={`relative whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 pointer-events-auto ${
                          activeSubTab === tab
                            ? isDark
                              ? "bg-white text-black shadow-sm"
                              : "bg-black text-white shadow-sm"
                            : isDark
                              ? "text-gray-300 hover:text-white hover:bg-[#3a3d4a]"
                              : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                        }`}
                        style={{
                          transform: activeSubTab === tab ? 'translateY(-2px)' : 'translateY(0)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: activeSubTab === tab ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none'
                        }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 圈子页签内容 */}
              {activeMainTab === "圈子" && (
                <div className={`${isDark ? "bg-[#1a1d29]" : "bg-white"} border ${isDark ? "border-[#252842]" : "border-gray-300"} rounded-lg p-4 mb-4`}>
                  {/* 圈子头像列表 */}
                  <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                    {circleData.map((circle) => (
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
                    
                    {/* 创建圈子的大图标 */}
                    <div className="flex-shrink-0 text-center">
                      <button
                        className={`flex items-center justify-center w-16 h-16 rounded-full border-2 bg-transparent transition-colors mb-2 ${
                          isDark
                            ? "border-white text-white hover:bg-white/10"
                            : "border-black text-black hover:bg-black/10"
                        }`}
                        title="创建圈子"
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      <p className={`text-xs font-medium w-16 ${isDark ? "text-white" : "text-gray-800"}`}>
                        创建圈子
                      </p>
                      <p className="text-xs text-gray-500">&nbsp;</p>
                    </div>
                  </div>
                </div>
              )}
            </div>



            {/* 发布动态区域 - 在移动端隐藏 */}
            {!isMobile && (
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
                        <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          isDark 
                            ? "bg-white text-black hover:bg-gray-200" 
                            : "bg-black text-white hover:bg-gray-800"
                        }`}>
                          发布
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 推荐页签内容 */}
            {activeMainTab === "推荐" && (
              <div className="space-y-6">
                {activeSubTab === "热门话题" && (
                  <div className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <div
                        key={index}
                        className={`${cardStyle} rounded-lg p-4 hover:shadow-lg transition-shadow`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">#</span>
                            <div>
                              <span className={`${isDark ? "text-white" : "text-gray-800"} font-medium text-lg block`}>
                                {topic.tag}
                              </span>
                              <span className="text-gray-400 text-sm">{topic.posts} 条动态</span>
                            </div>
                          </div>
                          <span className="text-[#00D4AA] text-lg font-medium">{topic.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSubTab === "热门圈子" && (
                  <div className="space-y-3">
                    {circleData.map((circle) => (
                      <div
                        key={circle.id}
                        className={`${cardStyle} rounded-lg p-4 hover:shadow-lg transition-shadow`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={circle.avatar}
                              alt={circle.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h4 className={`font-semibold text-lg ${isDark ? "text-white" : "text-gray-800"}`}>
                                {circle.name}
                              </h4>
                              <p className="text-gray-400 text-sm">{circle.description}</p>
                              <p className="text-gray-500 text-sm">{circle.members} 成员</p>
                            </div>
                          </div>
                          <button 
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              circle.isJoined
                                ? "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300"
                                : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black"
                            }`}
                          >
                            {circle.isJoined ? "已加入" : "加入"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSubTab === "推荐关注" && (
                  <div className="space-y-3">
                    {recommendedUsers.map((user, index) => (
                      <div
                        key={index}
                        className={`${cardStyle} rounded-lg p-4 hover:shadow-lg transition-shadow`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                              {user.avatar}
                            </div>
                            <div>
                              <span className={`${isDark ? "text-white" : "text-gray-800"} font-medium text-lg block`}>
                                {user.name}
                              </span>
                              <span className="text-gray-400 text-sm">{user.posts} 条动态</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[#00D4AA] text-lg font-medium mb-2">{user.change}</span>
                            <button className={`px-4 py-2 rounded-lg transition-colors ${
                              isDark 
                                ? "bg-white text-black hover:bg-gray-200" 
                                : "bg-black text-white hover:bg-gray-800"
                            }`}>
                              关注
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeSubTab === "TOP" && (
                  <div className="space-y-3">
                    {traderLeaderboard.map((trader) => (
                      <div
                        key={trader.rank}
                        className={`${cardStyle} rounded-lg p-4 hover:shadow-lg transition-shadow`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 flex items-center justify-center">
                              <span className={`text-lg font-bold ${
                                trader.rank <= 3 ? "text-yellow-500" : isDark ? "text-gray-400" : "text-gray-500"
                              }`}>
                                {trader.rank}
                              </span>
                            </div>
                            <div className={`w-16 h-16 rounded-full ${trader.color} flex items-center justify-center text-white font-bold text-xl`}>
                              {trader.name.charAt(0)}
                            </div>
                            <div>
                              <div className={`text-lg font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                                {trader.name}
                              </div>
                              <div className="text-sm text-gray-400">
                                {trader.followers} 关注者　{trader.trades} 笔交易
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-[#00D4AA] text-lg font-bold mb-2">{trader.return}</span>
                            <button className={`px-4 py-2 rounded-lg transition-colors ${
                              isDark 
                                ? "bg-white text-black hover:bg-gray-200" 
                                : "bg-black text-white hover:bg-gray-800"
                            }`}>
                              跟单
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 行情页签内容 */}
            {activeMainTab === "行情" && (
              <div className="space-y-6">
                {/* 一级页签 */}
                <div className="flex flex-wrap gap-2">
                  {primaryTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActivePrimaryTab(tab)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        activePrimaryTab === tab
                          ? "bg-[#00D4AA] text-white shadow-lg hover:bg-[#00C699]"
                          : isDark
                          ? "bg-[#252842] text-gray-300 hover:bg-[#2a2f4a] hover:text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* 二级页签 */}
                <div className="flex flex-wrap gap-2">
                  {secondaryTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSecondaryTab(tab)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeSecondaryTab === tab
                          ? "bg-[#00D4AA] text-white shadow-md"
                          : isDark
                          ? "bg-[#1e2332] text-gray-400 hover:bg-[#252842] hover:text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* 移动端搜索框 */}
                <div className="md:hidden">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="搜索交易对..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00D4AA] ${
                        isDark
                          ? "bg-[#1e2332] border-[#252842] text-white placeholder-gray-400"
                          : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                  </div>
                </div>

                {/* 移动端市场数据标题栏 */}
                <div className="md:hidden mb-3 px-4">
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
                  {filteredMarketData.map((crypto, index) => {
                    const pairName = `${crypto.symbol}/${crypto.pair}`
                    const isFavorite = marketFavorites.includes(pairName)

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
                              <button
                                onClick={() => toggleMarketFavorite(pairName)}
                                className={`p-1 rounded-full transition-colors ${
                                  isFavorite ? 'text-yellow-500' : 'text-gray-400'
                                }`}
                              >
                                <Star className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
                              </button>
                            </div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                              {crypto.volume}
                            </div>
                          </div>

                          {/* 中间：价格和24h高低 */}
                          <div className="text-center">
                            <div className={`font-bold text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                              ${crypto.price}
                            </div>
                            <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                              ${crypto.high24h}/${crypto.low24h}
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

                {/* 桌面端市场数据表格 */}
                <div className={`hidden md:block ${cardStyle} rounded-lg`}>
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        市场数据
                      </h3>
                      <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="搜索交易对..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00D4AA] ${
                            isDark
                              ? "bg-[#1e2332] border-[#252842] text-white placeholder-gray-400"
                              : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">交易对</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">最新价格</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">24h涨跌</th>
                          <th className="text-center py-3 px-4 text-xs font-medium text-gray-500">24h高低</th>
                          <th className="text-right py-3 px-4 text-xs font-medium text-gray-500">24h成交量</th>
                          <th className="text-center py-3 px-4 text-xs font-medium text-gray-500">走势</th>
                          <th className="text-center py-3 px-4 text-xs font-medium text-gray-500">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMarketData.map((crypto, index) => {
                          const pairName = `${crypto.symbol}/${crypto.pair}`
                          const isFavorite = marketFavorites.includes(pairName)

                          return (
                            <tr key={index} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm">{crypto.icon}</span>
                                  <div>
                                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                      {pairName}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  ${crypto.price}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className={`font-medium ${crypto.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                  {crypto.change}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                  ${crypto.high24h}/${crypto.low24h}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right text-sm text-gray-500">
                                {crypto.volume}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <MiniLineChart isPositive={crypto.isPositive} />
                              </td>
                              <td className="py-3 px-4 text-center">
                                <button
                                  onClick={() => toggleMarketFavorite(pairName)}
                                  className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                    isFavorite ? 'text-yellow-500' : 'text-gray-400'
                                  }`}
                                >
                                  <Star className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 动态列表 - 重新设计的卡片布局 */}
            {activeMainTab !== "推荐" && activeMainTab !== "行情" && (
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
                            {/* 信誉担保标签 */}
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                              信誉担保$123K
                            </span>
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
                        <div className="relative">
                          <button 
                            onClick={() => setOpenDropdown(openDropdown === post.id ? null : post.id)}
                            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                          
                          {/* 三点菜单弹窗 */}
                          {openDropdown === post.id && (
                            <div className={`absolute right-0 top-full mt-2 w-32 rounded-lg shadow-lg border z-50 ${
                              isDark 
                                ? "bg-[#1a1d29] border-[#252842]" 
                                : "bg-white border-gray-200"
                            }`}>
                              <div className="py-1">
                                <button 
                                  onClick={() => {
                                    setOpenDropdown(null)
                                    // 处理关注逻辑
                                  }}
                                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                    isDark 
                                      ? "text-white hover:bg-[#252842]" 
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  关注
                                </button>
                                <button 
                                  onClick={() => {
                                    setOpenDropdown(null)
                                    // 处理屏蔽逻辑
                                  }}
                                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                    isDark 
                                      ? "text-white hover:bg-[#252842]" 
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  屏蔽
                                </button>
                                <button 
                                  onClick={() => {
                                    setOpenDropdown(null)
                                    // 处理举报逻辑
                                  }}
                                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                    isDark 
                                      ? "text-red-400 hover:bg-[#252842]" 
                                      : "text-red-600 hover:bg-gray-50"
                                  }`}
                                >
                                  举报
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
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

                      {/* 跟单按钮和人数 - 移动到底部右侧 */}
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          已有{Math.floor(Math.random() * 500 + 100)}人跟单
                        </span>
                        <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isDark 
                            ? "bg-white text-black hover:bg-gray-200" 
                            : "bg-black text-white hover:bg-gray-800"
                        }`}>
                          跟单
                        </button>
                      </div>
                    </div>
                  </div>
                )
                })}
              </div>
            )}
          </div>

          {/* 右侧边栏 - 推荐关注与交易员排行榜 - 在移动端隐藏 */}
          {!isMobile && (
            <div className="col-span-3">
            <div className={`${cardStyle} rounded-lg sticky top-6 overflow-hidden`}>
              {/* 页签导航 */}
              <div className="flex border-b border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => setRightSidebarTab("推荐关注")}
                  className={`flex-1 py-3 px-4 text-sm transition-colors ${
                    rightSidebarTab === "推荐关注"
                      ? isDark 
                        ? "text-white font-bold border-b-2 border-white bg-transparent"
                        : "text-black font-bold border-b-2 border-black bg-transparent"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-700 font-normal"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 font-normal"
                  }`}
                >
                  推荐关注
                </button>
                <button
                  onClick={() => setRightSidebarTab("TOP")}
                  className={`flex-1 py-3 px-4 text-sm transition-colors ${
                    rightSidebarTab === "TOP"
                      ? isDark 
                        ? "text-white font-bold border-b-2 border-white bg-transparent"
                        : "text-black font-bold border-b-2 border-black bg-transparent"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-gray-700 font-normal"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 font-normal"
                  }`}
                >
                  TOP
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
                          <button className={`text-xs px-3 py-1 rounded-full mt-1 transition-colors ${
                            isDark 
                              ? "bg-white text-black hover:bg-gray-200" 
                              : "bg-black text-white hover:bg-gray-800"
                          }`}>
                            关注
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* 交易员排行榜内容 */
                  <div>
                    {/* 时间筛选器 - 自动适配宽度和滑动动画 */}
                    <div className="relative mb-4">
                      <div className="flex items-center justify-center space-x-0 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 relative overflow-hidden">
                        {/* 滑动背景 */}
                        <div 
                          className="absolute bg-white dark:bg-white rounded-md shadow-sm transition-all duration-300 ease-out"
                          style={{
                            width: `${100 / 3}%`,
                            height: 'calc(100% - 8px)',
                            left: `${["本周", "本月", "总收益"].indexOf(leaderboardPeriod) * (100 / 3)}%`,
                            top: '4px',
                            transform: 'translateX(0)',
                            transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        />
                        {["本周", "本月", "总收益"].map((period, index) => (
                          <button
                            key={period}
                            onClick={() => setLeaderboardPeriod(period)}
                            className={`flex-1 px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all duration-300 relative z-10 ${
                              leaderboardPeriod === period
                                ? "text-black"
                                : isDark
                                  ? "text-gray-300 hover:text-white"
                                  : "text-gray-600 hover:text-gray-800"
                            }`}
                            style={{
                              transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                          >
                            {period}
                          </button>
                        ))}
                      </div>
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
                            <button className={`text-xs px-2 py-0.5 rounded transition-colors ${
                              isDark 
                                ? "bg-white text-black hover:bg-gray-200" 
                                : "bg-black text-white hover:bg-gray-800"
                            }`}>
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
          )}
        </div>
      </div>

      {/* 移动端发布弹窗 */}
      {isMobile && showPublishModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 animate-in fade-in duration-300"
          onClick={() => setShowPublishModal(false)}
        >
          <div 
            className={`w-full max-w-md ${isDark ? 'bg-[#1a1d29]' : 'bg-white'} rounded-t-xl p-6 transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                发布动态
              </h3>
              <button
                onClick={() => setShowPublishModal(false)}
                className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 用户信息 */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-black font-medium">
                我
              </div>
              <div>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>我的动态</p>
                <p className="text-sm text-gray-500">公开</p>
              </div>
            </div>

            {/* 内容输入区 */}
            <div className="mb-4">
              <textarea
                value={publishContent}
                onChange={(e) => setPublishContent(e.target.value)}
                placeholder="分享你的交易心得或市场观点..."
                className={`w-full bg-transparent border-none resize-none focus:outline-none text-base ${
                  isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                }`}
                rows={6}
                autoFocus
              />
            </div>

            {/* 工具栏 */}
            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                  <ImageIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                  <Video className="h-5 w-5 text-gray-500" />
                </button>
                <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
                  <Smile className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <button
                onClick={() => {
                  // 这里可以添加发布逻辑
                  setPublishContent("")
                  setShowPublishModal(false)
                }}
                disabled={!publishContent.trim()}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  publishContent.trim()
                    ? isDark 
                      ? "bg-white text-black hover:bg-gray-200" 
                      : "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                发布
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}