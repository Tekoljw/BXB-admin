"use client"

import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"
import { TrendingUp, ArrowRight, Clock, Shield, Zap } from "lucide-react"

export default function FinancialPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedTab, setSelectedTab] = useState("UBX挖矿")

  const products = [
    {
      title: "UBX挖矿",
      rate: "0.8%",
      label: "日利率",
      baseRate: "0.054%",
      activityReward: "0.746%",
      features: ["申币种类", "数论驱动"],
      lockPeriod: "360天",
      hot: false
    },
    {
      title: "UBC挖矿", 
      rate: "0.7%",
      label: "日利率",
      baseRate: "0.048%",
      activityReward: "0.652%",
      features: ["申币种类", "数论驱动"],
      lockPeriod: "180天",
      hot: true
    },
    {
      title: "UBX挖矿",
      rate: "0.6%",
      label: "日利率", 
      baseRate: "0.042%",
      activityReward: "0.558%",
      features: ["申币种类", "数论驱动"],
      lockPeriod: "90天",
      hot: false
    },
    {
      title: "UBX挖矿",
      rate: "0.5%",
      label: "日利率",
      baseRate: "0.036%", 
      activityReward: "0.464%",
      features: ["申币种类", "数论驱动"],
      lockPeriod: "30天",
      hot: false
    }
  ]

  const heroProduct = {
    title: "UBX挖矿",
    rate: "0.4%",
    label: "日利率",
    period: "7天",
    baseRate: "0.03%",
    activityReward: "0.37%"
  }

  return (
    <div className={`min-h-screen p-4 md:p-6 ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <div className={`relative rounded-3xl p-8 overflow-hidden ${
            isDark 
              ? "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-800/30" 
              : "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200"
          }`}>
            {/* Background Design Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-4 right-8 w-64 h-32 opacity-20">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  {/* Trading chart-like design */}
                  <path d="M10,80 L30,60 L50,70 L70,40 L90,50 L110,30 L130,35 L150,20 L170,25 L190,15" 
                        stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="30" cy="60" r="3" fill="currentColor" />
                  <circle cx="70" cy="40" r="3" fill="currentColor" />
                  <circle cx="130" cy="35" r="3" fill="currentColor" />
                  {/* Additional UI elements */}
                  <rect x="140" y="60" width="40" height="25" rx="8" fill="currentColor" opacity="0.3" />
                  <rect x="10" y="20" width="30" height="20" rx="4" fill="currentColor" opacity="0.3" />
                </svg>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  isDark ? "bg-emerald-500/20 text-emerald-300" : "bg-emerald-100 text-emerald-700"
                }`}>
                  新用户专属
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {heroProduct.title}
                  <span className="text-emerald-400 ml-4">{heroProduct.rate}</span>
                  <span className={`text-lg ml-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {heroProduct.label} {heroProduct.period}
                  </span>
                </h1>
                <div className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {heroProduct.baseRate} 基础利率 + {heroProduct.activityReward} 活动奖励
                </div>
              </div>
              
              <Button 
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl"
              >
                立即投资
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
            {["UBX挖矿", "UBC挖矿"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`relative px-6 py-3 font-medium transition-all duration-200 ${
                  selectedTab === tab
                    ? `${isDark ? "text-white" : "text-gray-900"} border-b-2 border-emerald-500`
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 border transition-all duration-200 hover:shadow-lg ${
                isDark 
                  ? "bg-gray-900/50 border-gray-800 hover:border-gray-700" 
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold">{product.rate}</h3>
                    <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {product.label}
                    </span>
                    {product.hot && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        HOT
                      </span>
                    )}
                  </div>
                  <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {product.baseRate} 基础利率 + {product.activityReward} 活动奖励
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">e</span>
                  </div>
                  <span className="text-sm font-medium">申币种类</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium">数论驱动</span>
                </div>
              </div>

              <div className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                质押期限：{product.lockPeriod}
              </div>

              <Button 
                variant="outline"
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  isDark 
                    ? "border-gray-700 hover:bg-gray-800 text-white" 
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                立即投资
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}