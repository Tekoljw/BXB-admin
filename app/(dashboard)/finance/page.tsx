"use client"

import React, { useState } from "react"
import { useTheme } from "@/contexts/theme-context"

export default function FinancePage() {
  const { language, theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedTab, setSelectedTab] = useState("UBX挖矿")

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
    <div className={`min-h-screen ${isDark ? "bg-black" : "bg-gray-50"}`}>
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex px-6">
          {["UBX挖矿", "UBC挖矿"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`relative px-6 py-4 font-medium transition-all duration-200 ${
                selectedTab === tab
                  ? `${isDark ? "text-white" : "text-gray-900"} border-b-2 border-white`
                  : `${isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"}`
              }`}
            >
              {tab}
              {tab === "UBC挖矿" && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  HOT
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
          {financeProducts.map((product) => (
            <div 
              key={product.id} 
              className={`${
                isDark 
                  ? "bg-gray-900 border border-gray-800" 
                  : "bg-white border border-gray-200"
              } rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}
            >
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
              <div className="mb-4 space-y-1">
                <div className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {product.baseRate} 基础利率 + {product.activityRate} 活动加息
                </div>
              </div>

              {/* Token Icons */}
              <div className="flex items-center space-x-2 mb-4">
                {product.tokens.map((token, index) => (
                  <div key={index} className="flex items-center">
                    {token === "USDT" && (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
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
                          ? "bg-gray-800 text-gray-300" 
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
                  ? "border-gray-600 text-gray-300 hover:bg-gray-800" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}>
                立即投资
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}