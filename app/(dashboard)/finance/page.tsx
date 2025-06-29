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
    <div className={`min-h-screen ${isDark ? "bg-gradient-to-br from-gray-900 via-black to-gray-900" : "bg-gradient-to-br from-gray-50 via-white to-blue-50"}`}>
      {/* Tabs */}
      <div className={`border-b ${isDark ? "border-gray-800 bg-black/50 backdrop-blur-sm" : "border-gray-200 bg-white/80 backdrop-blur-sm"}`}>
        <div className="flex px-8 py-2">
          {["UBX挖矿", "UBC挖矿"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`relative px-8 py-4 font-semibold text-lg transition-all duration-300 ${
                selectedTab === tab
                  ? `${isDark ? "text-emerald-400" : "text-blue-600"} border-b-3 ${isDark ? "border-emerald-400" : "border-blue-600"} bg-gradient-to-t ${isDark ? "from-emerald-900/20" : "from-blue-100/50"}`
                  : `${isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"} hover:bg-gradient-to-t ${isDark ? "hover:from-gray-800/30" : "hover:from-gray-100/50"}`
              }`}
            >
              {tab}
              {tab === "UBC挖矿" && (
                <span className="absolute -top-1 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-pulse">
                  HOT
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* New User Exclusive Banner */}
        <div className="mb-10">
          <div className={`relative overflow-hidden rounded-2xl p-8 shadow-2xl ${
            isDark 
              ? "bg-gradient-to-br from-emerald-900/80 via-emerald-800/60 to-teal-900/80 border border-emerald-700/50" 
              : "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 border border-emerald-500"
          }`}>
            {/* Background decorative elements with enhanced styling */}
            <div className="absolute inset-0 opacity-15">
              <div className="absolute top-6 right-12">
                <div className={`w-16 h-16 rounded-full border-3 ${isDark ? "border-emerald-300" : "border-white"} flex items-center justify-center backdrop-blur-sm`}>
                  <div className={`w-3 h-3 ${isDark ? "bg-emerald-300" : "bg-white"} rounded-full animate-pulse`}></div>
                </div>
              </div>
              <div className="absolute top-12 right-32">
                <div className={`w-8 h-8 ${isDark ? "border-2 border-emerald-300" : "border-2 border-white"} rotate-45 backdrop-blur-sm`}></div>
              </div>
              <div className="absolute bottom-12 right-20">
                <div className="flex space-x-1">
                  <div className={`w-10 h-2 ${isDark ? "bg-emerald-300" : "bg-white"} rounded-full`}></div>
                  <div className={`w-6 h-2 ${isDark ? "bg-emerald-300" : "bg-white"} rounded-full`}></div>
                  <div className={`w-8 h-2 ${isDark ? "bg-emerald-300" : "bg-white"} rounded-full`}></div>
                </div>
              </div>
              {/* Enhanced chart elements */}
              <div className="absolute bottom-6 right-40">
                <svg width="100" height="50" viewBox="0 0 100 50" className={isDark ? "text-emerald-300" : "text-white"}>
                  <path 
                    d="M0,40 Q25,20 50,30 T100,10" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    fill="none"
                    opacity="0.7"
                  />
                  <circle cx="25" cy="25" r="3" fill="currentColor" opacity="0.9"/>
                  <circle cx="50" cy="30" r="3" fill="currentColor" opacity="0.9"/>
                  <circle cx="75" cy="15" r="3" fill="currentColor" opacity="0.9"/>
                </svg>
              </div>
              {/* Enhanced dollar signs */}
              <div className={`absolute top-8 right-52 ${isDark ? "text-emerald-300" : "text-white"} text-2xl opacity-40 font-bold`}>$</div>
              <div className={`absolute bottom-16 right-60 ${isDark ? "text-emerald-300" : "text-white"} text-lg opacity-30 font-bold`}>$</div>
            </div>
            
            <div className="relative z-10">
              <div className="mb-3">
                <span className={`${isDark ? "text-emerald-300" : "text-emerald-100"} text-base font-bold px-3 py-1 rounded-full ${isDark ? "bg-emerald-900/50" : "bg-white/20"} backdrop-blur-sm`}>
                  新用户专属
                </span>
              </div>
              
              <div className="mb-5">
                <div className="flex items-baseline space-x-4">
                  <span className={`${isDark ? "text-white" : "text-white"} text-3xl font-bold`}>UBX挖矿</span>
                  <span className={`${isDark ? "text-emerald-300" : "text-yellow-300"} text-5xl font-extrabold drop-shadow-lg`}>0.4%</span>
                  <span className={`${isDark ? "text-emerald-100" : "text-white"} text-xl font-medium`}>日利率</span>
                  <span className={`${isDark ? "text-emerald-200" : "text-emerald-100"} text-lg bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm`}>7天</span>
                </div>
              </div>
              
              <div className="mb-8">
                <span className={`${isDark ? "text-emerald-100" : "text-white"} text-base font-medium`}>
                  0.03% 基础利率 + 0.37% 活动奖励
                </span>
              </div>
              
              <div className="flex">
                <button className={`${isDark ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600" : "bg-gradient-to-r from-white to-emerald-100 hover:from-emerald-50 hover:to-white text-emerald-700"} text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105`}>
                  立即投资
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl">
          {financeProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`group relative overflow-hidden rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                isDark 
                  ? "bg-gradient-to-br from-slate-800/90 via-slate-900/80 to-gray-900/90 border border-slate-700/50 backdrop-blur-sm" 
                  : "bg-gradient-to-br from-white via-slate-50 to-blue-50/50 border border-slate-200 backdrop-blur-sm"
              }`}
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className={`absolute top-4 right-4 w-20 h-20 rounded-full ${isDark ? "bg-blue-400" : "bg-blue-500"}`}></div>
                <div className={`absolute bottom-4 left-4 w-16 h-16 rounded-full ${isDark ? "bg-purple-400" : "bg-purple-500"}`}></div>
              </div>

              {/* Daily Rate */}
              <div className="relative z-10 mb-6">
                <div className={`text-4xl font-black ${isDark ? "text-white" : "text-slate-800"} mb-2 tracking-tight`}>
                  {product.dailyRate}
                </div>
                <div className={`text-base font-semibold ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  日利率
                </div>
              </div>

              {/* Rate Details */}
              <div className="mb-6">
                <div className={`text-base font-medium ${isDark ? "text-slate-200" : "text-slate-700"} leading-relaxed`}>
                  {product.baseRate} 基础利率 + {product.activityRate} 活动加息
                </div>
              </div>

              {/* Token Icons */}
              <div className="flex items-center space-x-3 mb-6">
                {product.tokens.map((token, tokenIndex) => (
                  <div key={tokenIndex} className="flex items-center">
                    {token === "USDT" && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-emerald-300/30">
                        T
                      </div>
                    )}
                    {token === "USDC" && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-blue-300/30">
                        C
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex space-x-2">
                  {product.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className={`text-sm px-3 py-1.5 rounded-full font-medium ${
                        isDark 
                          ? "bg-slate-700/70 text-slate-200 border border-slate-600/50" 
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      } backdrop-blur-sm`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <div className={`text-base font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  质押期限: <span className={`font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}>{product.duration}</span>
                </div>
              </div>

              {/* Invest Button */}
              <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                isDark 
                  ? "bg-gradient-to-r from-slate-700 to-slate-600 text-white border border-slate-500/50 hover:from-slate-600 hover:to-slate-500" 
                  : "bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-600 hover:to-slate-700"
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