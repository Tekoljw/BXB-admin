"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Search, Heart, MessageCircle, Share, MoreHorizontal, ImageIcon, Video, Smile } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function MomentsPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["post-1", "post-3"])
  const [activeMainTab, setActiveMainTab] = useState("关注")
  const [activeSubTab, setActiveSubTab] = useState("全部")
  const [mounted, setMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [rightSidebarTab, setRightSidebarTab] = useState("推荐关注")
  const [leaderboardPeriod, setLeaderboardPeriod] = useState("本周")
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

  const cardStyle = isDark ? "bg-[#1a1d29] border-[#252842]" : "bg-white border-gray-200"

  const getSubTabs = () => {
    if (activeMainTab === "热门话题") {
      return [
        "全部",
        "BTC",
        "ETH", 
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
    return [
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
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d50?w=64&h=64&fit=crop&crop=face",
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

  return (
    <div className={`p-6 min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      
      {/* 三栏布局 */}
      <div className="grid grid-cols-12 gap-6">
        {/* 左侧边栏 - 热门话题与圈子 */}
        <div className="col-span-3">
          <div className={`${cardStyle} rounded-lg sticky top-6 overflow-hidden`}>
            {/* 页签导航 */}
            <div className="flex border-b border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setLeftSidebarTab("热门话题")}
                className={`flex-1 py-3 px-4 text-sm transition-colors ${
                  leftSidebarTab === "热门话题"
                    ? isDark
                      ? "bg-[#252842] text-white border-b-2 border-[#00D4AA]"
                      : "bg-gray-50 text-gray-800 border-b-2 border-[#00D4AA]"
                    : isDark
                      ? "text-gray-400 hover:text-white hover:bg-[#1e2332]"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                热门话题
              </button>
              <button
                onClick={() => setLeftSidebarTab("热门圈子")}
                className={`flex-1 py-3 px-4 text-sm transition-colors ${
                  leftSidebarTab === "热门圈子"
                    ? isDark
                      ? "bg-[#252842] text-white border-b-2 border-[#00D4AA]"
                      : "bg-gray-50 text-gray-800 border-b-2 border-[#00D4AA]"
                    : isDark
                      ? "text-gray-400 hover:text-white hover:bg-[#1e2332]"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                热门圈子
              </button>
            </div>

            {/* 左侧边栏内容 */}
            <div className="p-4 max-h-[600px] overflow-y-auto">
              {leftSidebarTab === "热门话题" ? (
                <div className="space-y-3">
                  {[
                    { tag: "BTC突破", posts: "1.2K", change: "+19.15%" },
                    { tag: "DeFi挖矿", posts: "856", change: "+15.32%" },
                    { tag: "NFT艺术", posts: "634", change: "+12.87%" },
                    { tag: "ETH升级", posts: "423", change: "+11.45%" },
                    { tag: "Layer2", posts: "312", change: "+9.23%" },
                    { tag: "Meme币", posts: "289", change: "+8.76%" },
                    { tag: "GameFi", posts: "245", change: "+7.65%" },
                    { tag: "Web3", posts: "198", change: "+6.43%" },
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#252842] transition-colors cursor-pointer">
                      <div>
                        <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>#{topic.tag}</div>
                        <div className="text-sm text-gray-500">{topic.posts} 条动态</div>
                      </div>
                      <div className="text-sm text-green-500 font-medium">{topic.change}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {circleData.slice(0, 5).map((circle) => (
                    <div key={circle.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#252842] transition-colors cursor-pointer">
                      <img
                        src={circle.avatar}
                        alt={circle.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className={`font-medium text-sm ${isDark ? "text-white" : "text-gray-800"}`}>{circle.name}</div>
                        <div className="text-xs text-gray-500">{circle.members} 位成员</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 中央内容区域 */}
        <div className="col-span-6">
          <div className="space-y-4">
            {/* 主页签 */}
            <div className={`${cardStyle} rounded-lg mb-3 border-2 ${isDark ? "border-[#252842]" : "border-gray-300"}`}>
              <div className="p-4">
                {/* 主页签导航 */}
                <div className="grid grid-cols-3 gap-1 mb-4">
                  {["关注", "圈子", "热门"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveMainTab(tab)}
                      className={`py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                        activeMainTab === tab
                          ? isDark
                            ? "bg-white text-black"
                            : "bg-black text-white"
                          : isDark
                            ? "text-gray-300 hover:text-white hover:bg-[#252842]"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* 二级页签 - 只在热门页签时显示 */}
                {activeMainTab === "热门" && (
                  <div className={`${isDark ? "bg-[#2a2d3a]" : "bg-gray-100"} rounded-lg p-2`}>
                    <div
                      ref={scrollContainerRef}
                      className="flex items-center space-x-1 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
                    <div className="mb-4">
                      <div className={`text-base font-bold ${isDark ? "text-white" : "text-gray-800"} mb-4`}>我的圈子</div>
                      
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
                        
                        {/* 创建圈子按钮 - 大圆形黑色按钮 */}
                        <div className="flex-shrink-0 text-center">
                          <button
                            className="flex items-center justify-center w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg"
                            title="创建圈子"
                          >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                          <p className={`text-xs mt-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                            创建圈子
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 动态内容 - 关注和热门页签显示 */}
            {(activeMainTab === "关注" || activeMainTab === "热门") && (
              <div className="space-y-4">
                <div className={`${cardStyle} rounded-lg p-4`}>
                  <div className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {activeMainTab === "关注" ? "暂无关注的用户动态" : "暂无热门内容"}
                  </div>
                </div>
              </div>
            )}

            {/* 圈子详细列表 - 只在圈子页签时显示 */}
            {activeMainTab === "圈子" && (
              <div className="space-y-4 mb-6">
                {circleData.map((circle) => (
                  <div
                    key={circle.id}
                    className={`${isDark ? "bg-[#1a1d29]" : "bg-white"} border ${isDark ? "border-[#252842]" : "border-gray-300"} rounded-lg transition-all duration-200 hover:${
                      isDark ? "bg-[#1e2332]" : "bg-gray-50"
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
          </div>
        </div>

        {/* 右侧边栏 */}
        <div className="col-span-3">
          <div className={`${cardStyle} rounded-lg sticky top-6`}>
            {/* 顶部tabs导航 */}
            <div className="flex border-b border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setRightSidebarTab("推荐关注")}
                className={`flex-1 py-3 px-4 text-sm transition-colors ${
                  rightSidebarTab === "推荐关注"
                    ? isDark
                      ? "bg-[#252842] text-white border-b-2 border-[#00D4AA]"
                      : "bg-gray-50 text-gray-800 border-b-2 border-[#00D4AA]"
                    : isDark
                      ? "text-gray-400 hover:text-white hover:bg-[#1e2332]"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                推荐关注
              </button>
              <button
                onClick={() => setRightSidebarTab("TOP")}
                className={`flex-1 py-3 px-4 text-sm transition-colors ${
                  rightSidebarTab === "TOP"
                    ? isDark
                      ? "bg-[#252842] text-white border-b-2 border-[#00D4AA]"
                      : "bg-gray-50 text-gray-800 border-b-2 border-[#00D4AA]"
                    : isDark
                      ? "text-gray-400 hover:text-white hover:bg-[#1e2332]"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                TOP
              </button>
            </div>

            <div className="p-4">
              {rightSidebarTab === "推荐关注" ? (
                <div className="space-y-4">
                  {[
                    { name: "CryptoAnalyst", username: "@crypto_guru", followers: "125K", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", verified: true },
                    { name: "DeFi Master", username: "@defi_master", followers: "89K", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=40&h=40&fit=crop&crop=face", verified: false },
                    { name: "NFT Collector", username: "@nft_collector", followers: "67K", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", verified: true },
                    { name: "Blockchain Dev", username: "@blockchain_dev", followers: "45K", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d50?w=40&h=40&fit=crop&crop=face", verified: false },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <div className="flex items-center space-x-1">
                            <span className={`font-medium text-sm ${isDark ? "text-white" : "text-gray-800"}`}>{user.name}</span>
                            {user.verified && <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                          </div>
                          <div className="text-xs text-gray-500">{user.username} • {user.followers}</div>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-[#00D4AA] text-white text-xs rounded-md hover:bg-[#00D4AA]/80 transition-colors">
                        关注
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* TOP 子页签 */}
                  <div className="relative">
                    <div className="flex items-center justify-center space-x-1 bg-gray-100 dark:bg-[#2a2d3a] rounded-lg p-1 relative">
                      {/* 滑动背景 */}
                      <div 
                        className="absolute top-1 bottom-1 bg-white dark:bg-[#1a1d29] rounded-md transition-all duration-300 ease-out shadow-sm"
                        style={{
                          left: leaderboardPeriod === "本周" ? "4px" : leaderboardPeriod === "本月" ? "33.33%" : "66.66%",
                          width: "calc(33.33% - 4px)"
                        }}
                      />
                      {["本周", "本月", "总收益"].map((period) => (
                        <button
                          key={period}
                          onClick={() => setLeaderboardPeriod(period)}
                          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all duration-300 relative z-10 ${
                            leaderboardPeriod === period
                              ? isDark
                                ? "text-white"
                                : "text-gray-800"
                              : isDark
                                ? "text-gray-400 hover:text-gray-300"
                                : "text-gray-600 hover:text-gray-700"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* TOP 排行榜内容 */}
                  <div className="space-y-3">
                    {[
                      { rank: 1, name: "CryptoKing", profit: "+247.8%", amount: "$125,430", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" },
                      { rank: 2, name: "DeFiQueen", profit: "+189.2%", amount: "$89,760", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=32&h=32&fit=crop&crop=face" },
                      { rank: 3, name: "TradeWizard", profit: "+156.7%", amount: "$67,890", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" },
                      { rank: 4, name: "TokenMaster", profit: "+134.5%", amount: "$54,320", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d50?w=32&h=32&fit=crop&crop=face" },
                      { rank: 5, name: "CoinSage", profit: "+98.3%", amount: "$42,150", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face" },
                    ].map((trader) => (
                      <div key={trader.rank} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-[#252842] transition-colors">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          trader.rank === 1 ? "bg-yellow-500 text-white" :
                          trader.rank === 2 ? "bg-gray-400 text-white" :
                          trader.rank === 3 ? "bg-amber-600 text-white" :
                          "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }`}>
                          {trader.rank}
                        </div>
                        <img src={trader.avatar} alt={trader.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className={`font-medium text-sm ${isDark ? "text-white" : "text-gray-800"}`}>{trader.name}</div>
                          <div className="text-xs text-gray-500">{trader.amount}</div>
                        </div>
                        <div className="text-xs font-bold text-green-500">{trader.profit}</div>
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
  )
}