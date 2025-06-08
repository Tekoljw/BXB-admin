"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Star, TrendingUp, TrendingDown } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function UsdtTradePage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [activeTab, setActiveTab] = useState("买入")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("全部")

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

  const paymentMethods = ["全部", "支付宝", "微信", "银行卡"]

  const filteredAds = tradeAds.filter(ad => {
    const matchesTab = activeTab === "买入" ? ad.type === "buy" : ad.type === "sell"
    const matchesSearch = ad.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPayment = selectedPayment === "全部" || ad.paymentMethods.includes(selectedPayment)
    return matchesTab && matchesSearch && matchesPayment
  })

  return (
    <div className={`p-6 min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
          USDT买卖
        </h1>
        <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          安全便捷的USDT场外交易平台
        </p>
      </div>

      {/* 交易类型切换 */}
      <div className={`p-4 rounded-lg mb-6 ${isDark ? "bg-card" : "bg-white"} shadow-sm`}>
        <div className="flex items-center justify-between mb-4">
          {/* 买入/卖出切换 */}
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            {["买入", "卖出"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-[#00D4AA] text-white"
                    : isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab} USDT
              </button>
            ))}
          </div>

          {/* 搜索和筛选 */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="搜索用户"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg border text-sm ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                }`}
              />
            </div>
            
            <select
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
              className={`px-3 py-2 rounded-lg border text-sm ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 表格头部 */}
        <div className="grid grid-cols-7 gap-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
          <div>商家</div>
          <div>价格(CNY)</div>
          <div>可用/限额</div>
          <div>支付方式</div>
          <div>响应时间</div>
          <div>成功率</div>
          <div>操作</div>
        </div>

        {/* 广告列表 */}
        <div className="space-y-3 mt-4">
          {filteredAds.map((ad) => (
            <div
              key={ad.id}
              className={`p-4 rounded-lg border transition-colors ${
                isDark
                  ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                  : "bg-gray-50 border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="grid grid-cols-7 gap-4 items-center">
                {/* 商家信息 */}
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-1">
                      <span className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                        {ad.user}
                      </span>
                      {ad.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{ad.orderCount} 笔交易</span>
                  </div>
                </div>

                {/* 价格 */}
                <div className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  ¥{ad.price}
                </div>

                {/* 可用/限额 */}
                <div className="text-sm">
                  <div className={isDark ? "text-white" : "text-gray-800"}>
                    {ad.available} USDT
                  </div>
                  <div className="text-gray-400">
                    限额: ¥{ad.min}-{ad.max}
                  </div>
                </div>

                {/* 支付方式 */}
                <div className="flex flex-wrap gap-1">
                  {ad.paymentMethods.map((method, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded text-xs"
                    >
                      {method}
                    </span>
                  ))}
                </div>

                {/* 响应时间 */}
                <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {ad.responseTime}
                </div>

                {/* 成功率 */}
                <div className="flex items-center space-x-1">
                  <span className={`font-medium ${ad.rate >= 98 ? "text-green-500" : ad.rate >= 95 ? "text-yellow-500" : "text-red-500"}`}>
                    {ad.rate}%
                  </span>
                </div>

                {/* 操作按钮 */}
                <div>
                  <button className="w-full bg-[#00D4AA] hover:bg-[#00D4AA]/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    {activeTab}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}