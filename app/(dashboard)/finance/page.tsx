"use client"

import React, { useState } from "react"
import { useTheme } from "@/contexts/theme-context"

export default function FinancePage() {
  const { language, theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedTab, setSelectedTab] = useState("UBX挖矿")

  // Consistent card styling from trading pages
  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"

  const financeProducts = [
    {
      id: 1,
      dailyRate: "0.8%",
      baseRate: "0.054%",
      activityRate: "0.746%",
      duration: "360天",
      tokens: ["USDT", "USDC"],
      tags: ["单币质押", "稳定收益"]
    },
    {
      id: 2,
      dailyRate: "0.7%", 
      baseRate: "0.048%",
      activityRate: "0.652%",
      duration: "180天",
      tokens: ["USDT", "USDC"],
      tags: ["单币质押", "稳定收益"]
    },
    {
      id: 3,
      dailyRate: "0.6%",
      baseRate: "0.042%", 
      activityRate: "0.558%",
      duration: "90天",
      tokens: ["USDT", "USDC"],
      tags: ["单币质押", "稳定收益"]
    },
    {
      id: 4,
      dailyRate: "0.5%",
      baseRate: "0.036%",
      activityRate: "0.464%", 
      duration: "30天",
      tokens: ["USDT", "USDC"],
      tags: ["单币质押", "稳定收益"]
    }
  ]

  return (
    <div className={`min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      <div className="flex">
        {/* Left Sidebar Menu - Full screen style */}
        <div className="w-56 flex-shrink-0">
          <div className={`${isDark ? "bg-[#1a1d29]" : "bg-white"} border-r sticky top-0 overflow-hidden h-screen ${isDark ? "border-[#252842]" : "border-gray-200"}`}>
            <div className="flex flex-col h-full">
              <div className="flex-1 py-6">
                <div className="space-y-1 px-4">
                  {["UBX挖矿", "UBC挖矿"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`relative w-full flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedTab === tab
                          ? isDark
                            ? "bg-white text-black"
                            : "bg-black text-white"
                          : isDark
                            ? "text-gray-300 hover:text-white hover:bg-[#252842]"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {tab}
                      {tab === "UBC挖矿" && (
                        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          HOT
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* New User Exclusive Banner */}
          <div className="mb-6">
            <div className={`${cardStyle} rounded-lg p-6 relative overflow-hidden`}>
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-8 w-12 h-12 rounded-full border-2 border-[#00D4AA]"></div>
                <div className="absolute bottom-4 right-12 w-8 h-8 border border-[#00D4AA] rotate-45"></div>
              </div>
              
              <div className="relative z-10">
                <div className="mb-2">
                  <span className="text-[#00D4AA] text-sm font-medium bg-[#00D4AA]/10 px-2 py-1 rounded">
                    新用户专属
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-baseline space-x-3">
                    <span className={`${isDark ? "text-white" : "text-gray-900"} text-2xl font-bold`}>UBX挖矿</span>
                    <span className="text-[#00D4AA] text-3xl font-bold">0.4%</span>
                    <span className={`${isDark ? "text-gray-300" : "text-gray-600"} text-lg`}>日利率</span>
                    <span className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>7天</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className={`${isDark ? "text-gray-300" : "text-gray-600"} text-sm`}>
                    0.03% 基础利率 + 0.37% 活动奖励
                  </span>
                </div>
                
                <button className="bg-[#00D4AA] hover:bg-[#00C097] text-white font-medium px-6 py-2 rounded-lg transition-colors">
                  立即投资
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financeProducts.map((product) => (
              <div key={product.id} className={`${cardStyle} rounded-lg p-6`}>
                {/* Daily Rate */}
                <div className="mb-4">
                  <div className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-1`}>
                    {product.dailyRate}
                  </div>
                  <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    日利率
                  </div>
                </div>

                {/* Rate Details */}
                <div className="mb-4">
                  <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    {product.baseRate} 基础利率 + {product.activityRate} 活动加息
                  </div>
                </div>

                {/* Token Icons and Tags */}
                <div className="flex items-center space-x-2 mb-4">
                  {product.tokens.map((token, index) => (
                    <div key={index} className="flex items-center">
                      {token === "USDT" && (
                        <div className="w-6 h-6 rounded-full bg-[#00D4AA] flex items-center justify-center text-white text-xs font-bold">
                          T
                        </div>
                      )}
                      {token === "USDC" && (
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                          C
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex space-x-1">
                    {product.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={`text-xs px-2 py-1 rounded ${
                          isDark 
                            ? "bg-[#252842] text-gray-300" 
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    质押期限: {product.duration}
                  </div>
                </div>

                {/* Invest Button */}
                <button className={`w-full py-3 rounded-lg font-medium transition-colors border ${
                  isDark 
                    ? "border-[#252842] text-gray-300 hover:bg-[#252842]" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}>
                  立即投资
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}