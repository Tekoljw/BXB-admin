"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Search, Star } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { debounce } from "@/lib/performance"
import OptimizedButton from "@/components/optimized-button"

// 验证图标组件
const VerifiedIcon = () => (
  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  </div>
)

export default function UsdtTradePage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [activeMainTab, setActiveMainTab] = useState("买入")
  const [activeSubTab, setActiveSubTab] = useState("全部")
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["币友168", "交易达人"])
  const [mounted, setMounted] = useState(false)

  // All hooks must be before any early returns
  const toggleFavorite = useCallback((user: string) => {
    setFavorites(prev => 
      prev.includes(user) 
        ? prev.filter(fav => fav !== user)
        : [...prev, user]
    )
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleMainTabClick = useCallback((tab: string) => {
    setActiveMainTab(tab)
  }, [])

  const handleSubTabClick = useCallback((tab: string) => {
    setActiveSubTab(tab)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // 模拟广告数据
  const tradeAds = [
    {
      id: 1,
      user: "币友168",
      verified: true,
      rate: 98.5,
      orderCount: "1,234",
      price: "7.28",
      available: "50,000.00",
      min: "100",
      max: "10,000",
      paymentMethods: ["支付宝", "微信", "银行卡"],
      responseTime: "1分钟内",
      type: "buy"
    },
    {
      id: 2,
      user: "交易达人",
      verified: true,
      rate: 99.2,
      orderCount: "2,567",
      price: "7.27",
      available: "80,000.00",
      min: "500",
      max: "20,000",
      paymentMethods: ["支付宝", "银行卡"],
      responseTime: "2分钟内",
      type: "buy"
    },
    {
      id: 3,
      user: "USDT商家",
      verified: true,
      rate: 97.8,
      orderCount: "987",
      price: "7.29",
      available: "30,000.00",
      min: "200",
      max: "5,000",
      paymentMethods: ["微信", "银行卡"],
      responseTime: "3分钟内",
      type: "buy"
    },
    {
      id: 4,
      user: "专业交易",
      verified: false,
      rate: 96.5,
      orderCount: "456",
      price: "7.25",
      available: "100,000.00",
      min: "1,000",
      max: "50,000",
      paymentMethods: ["支付宝", "微信", "银行卡"],
      responseTime: "5分钟内",
      type: "sell"
    },
    {
      id: 5,
      user: "快速交易者",
      verified: true,
      rate: 99.8,
      orderCount: "3,210",
      price: "7.24",
      available: "75,000.00",
      min: "300",
      max: "15,000",
      paymentMethods: ["支付宝", "银行卡"],
      responseTime: "1分钟内",
      type: "sell"
    }
  ]

  const mainTabs = ["买入", "卖出"]
  const subTabs = ["全部", "支付宝", "微信", "银行卡"]

  const toggleFavorite = useCallback((user: string) => {
    setFavorites(prev => 
      prev.includes(user) 
        ? prev.filter(fav => fav !== user)
        : [...prev, user]
    )
  }, [])

  // Immediate search without debounce for better UX
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleMainTabClick = useCallback((tab: string) => {
    setActiveMainTab(tab)
  }, [])

  const handleSubTabClick = useCallback((tab: string) => {
    setActiveSubTab(tab)
  }, [])

  const filteredAds = useMemo(() => {
    return tradeAds.filter(ad => {
      const matchesTab = activeMainTab === "买入" ? ad.type === "buy" : ad.type === "sell"
      const matchesSearch = ad.user.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPayment = activeSubTab === "全部" || ad.paymentMethods.includes(activeSubTab)
      return matchesTab && matchesSearch && matchesPayment
    })
  }, [activeMainTab, searchTerm, activeSubTab])

  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"

  return (
    <div className={`p-6 min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* 搜索栏 */}
      <div className={`${cardStyle} rounded-lg p-4 mb-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="搜索商家名称"
                value={searchTerm}
                onChange={handleSearchChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm transition-colors ${
                  isDark
                    ? "bg-background border-gray-700 text-white placeholder-gray-500 focus:border-[#00D4AA]"
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-[#00D4AA]"
                } focus:outline-none focus:ring-1 focus:ring-[#00D4AA]`}
              />
            </div>
          </div>
          
          {/* 主要标签 */}
          <div className="flex space-x-2">
            {mainTabs.map((tab) => (
              <OptimizedButton
                key={tab}
                onClick={() => handleMainTabClick(tab)}
                variant={activeMainTab === tab ? "primary" : "secondary"}
                size="sm"
              >
                {tab}
              </OptimizedButton>
            ))}
          </div>
        </div>
      </div>

      {/* 交易表格 */}
      <div className={`${cardStyle} rounded-lg p-4`}>
        {/* 次级标签 */}
        <div className="flex items-center space-x-1 mb-4 overflow-x-auto">
          {subTabs.map((tab) => (
            <OptimizedButton
              key={tab}
              onClick={() => handleSubTabClick(tab)}
              variant={activeSubTab === tab ? "primary" : "ghost"}
              size="sm"
              className="whitespace-nowrap"
            >
              {tab}
            </OptimizedButton>
          ))}
        </div>

        {/* 表格头部 */}
        <div className="grid grid-cols-6 gap-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
          <div>商家</div>
          <div>价格</div>
          <div>可用数量</div>
          <div>限额</div>
          <div>支付方式</div>
          <div>交易</div>
        </div>

        {/* 广告列表 */}
        <div className="space-y-1">
          {filteredAds.map((ad, index) => (
            <div
              key={ad.id}
              className={`grid grid-cols-6 gap-4 py-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                index === filteredAds.length - 1 ? "border-b-0" : ""
              }`}
            >
              {/* 商家信息 */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleFavorite(ad.user)}
                  className={`transition-colors ${
                    favorites.includes(ad.user)
                      ? "text-yellow-400"
                      : "text-gray-400 hover:text-yellow-400"
                  }`}
                >
                  <Star className="w-4 h-4" fill={favorites.includes(ad.user) ? "currentColor" : "none"} />
                </button>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                      {ad.user}
                    </span>
                    {ad.verified && <VerifiedIcon />}
                  </div>
                  <div className="text-xs text-gray-400">
                    {ad.orderCount}单 {ad.rate}%
                  </div>
                </div>
              </div>

              {/* 价格 */}
              <div className="flex flex-col justify-center">
                <div className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  ¥{ad.price}
                </div>
              </div>

              {/* 可用数量 */}
              <div className="flex flex-col justify-center">
                <div className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                  {ad.available}
                </div>
                <div className="text-xs text-gray-400">USDT</div>
              </div>

              {/* 限额 */}
              <div className="flex flex-col justify-center">
                <div className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                  ¥{ad.min}-{ad.max}
                </div>
              </div>

              {/* 支付方式 */}
              <div className="flex flex-wrap gap-1">
                {ad.paymentMethods.slice(0, 2).map((method, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded text-xs"
                  >
                    {method}
                  </span>
                ))}
                {ad.paymentMethods.length > 2 && (
                  <span className="text-xs text-gray-400">+{ad.paymentMethods.length - 2}</span>
                )}
              </div>

              {/* 交易按钮 */}
              <div className="flex items-center">
                <OptimizedButton
                  onClick={() => {/* Handle trade action */}}
                  variant="primary"
                  size="sm"
                >
                  {activeMainTab}
                </OptimizedButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}