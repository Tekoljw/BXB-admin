"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import MarketTrades from "@/components/market-trades"

export default function USDTTradePage() {
  const { theme, language } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("buy")
  const isDark = theme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842]" : "bg-white border border-gray-200"

  const merchants = [
    {
      name: "商户001",
      rating: "98.5%",
      orders: "2,580",
      price: "7.28",
      minAmount: "100",
      maxAmount: "50,000",
      methods: ["银行卡", "支付宝", "微信"],
      online: true
    },
    {
      name: "商户002", 
      rating: "99.2%",
      orders: "1,890",
      price: "7.27",
      minAmount: "500",
      maxAmount: "30,000",
      methods: ["银行卡", "支付宝"],
      online: true
    },
    {
      name: "商户003",
      rating: "97.8%", 
      orders: "3,120",
      price: "7.29",
      minAmount: "200",
      maxAmount: "100,000",
      methods: ["银行卡", "微信"],
      online: false
    }
  ]

  return (
    <div className={`p-6 min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          {language === "zh" ? "USDT买卖" : "USDT Trading"}
        </h1>
        <div className="flex items-center space-x-2 text-sm">
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            {language === "zh" ? "当前汇率:" : "Current Rate:"}
          </span>
          <span className="text-[#00D4AA] font-bold">1 USDT = ¥7.28</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab("buy")}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === "buy"
              ? "bg-green-500 text-white"
              : isDark 
                ? "bg-[#1a1d29] text-gray-400 hover:text-white"
                : "bg-white text-gray-600 hover:text-gray-900"
          }`}
        >
          {language === "zh" ? "购买USDT" : "Buy USDT"}
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            activeTab === "sell"
              ? "bg-red-500 text-white"
              : isDark 
                ? "bg-[#1a1d29] text-gray-400 hover:text-white"
                : "bg-white text-gray-600 hover:text-gray-900"
          }`}
        >
          {language === "zh" ? "出售USDT" : "Sell USDT"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Merchant List */}
        <div className="xl:col-span-2 space-y-4">
          <div className={`${cardStyle} rounded-lg p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {activeTab === "buy" 
                  ? (language === "zh" ? "优质商户" : "Premium Merchants")
                  : (language === "zh" ? "收购商户" : "Buying Merchants")
                }
              </h2>
              <div className="flex items-center space-x-4 text-sm">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {language === "zh" ? "价格" : "Price"}
                </span>
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {language === "zh" ? "限额" : "Limit"}
                </span>
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {language === "zh" ? "支付方式" : "Payment"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {merchants.map((merchant, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border transition-colors hover:border-[#00D4AA] ${
                    isDark ? "border-[#252842] hover:bg-[#252842]/50" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                            {merchant.name}
                          </span>
                          <div className={`w-2 h-2 rounded-full ${merchant.online ? "bg-green-500" : "bg-gray-400"}`} />
                        </div>
                        <div className="flex items-center space-x-4 text-sm mt-1">
                          <span className="text-green-500">{merchant.rating}</span>
                          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                            {merchant.orders} {language === "zh" ? "笔" : "orders"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <div className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                          ¥{merchant.price}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          ¥{merchant.minAmount} - ¥{merchant.maxAmount}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {merchant.methods.map((method, idx) => (
                          <span 
                            key={idx}
                            className={`px-2 py-1 text-xs rounded ${
                              isDark ? "bg-[#252842] text-gray-300" : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                      
                      <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                        activeTab === "buy"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}>
                        {activeTab === "buy" 
                          ? (language === "zh" ? "购买" : "Buy")
                          : (language === "zh" ? "出售" : "Sell")
                        }
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Trades */}
        <div className="space-y-6">
          <MarketTrades />
          
          {/* Quick Stats */}
          <div className={`${cardStyle} rounded-lg p-6`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {language === "zh" ? "今日统计" : "Today's Stats"}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {language === "zh" ? "成交量" : "Volume"}
                </span>
                <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  ¥2,580,000
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {language === "zh" ? "成交笔数" : "Orders"}
                </span>
                <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  1,245
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {language === "zh" ? "平均价格" : "Avg Price"}
                </span>
                <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  ¥7.28
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}