"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, BarChart3, TrendingUp, Coins } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

export default function TradePage() {
  const { isDark } = useTheme()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("现货交易")
  const [isMobile, setIsMobile] = useState(false)

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const tradeTabs = [
    {
      name: "现货交易",
      icon: BarChart3,
      route: "/spot",
      description: "买卖加密货币现货，即时交割"
    },
    {
      name: "合约交易", 
      icon: TrendingUp,
      route: "/futures",
      description: "杠杆交易，支持做多做空"
    },
    {
      name: "投资理财",
      icon: Coins,
      route: "/finance", 
      description: "稳定收益理财产品"
    }
  ]

  // 处理页签切换
  const handleTabClick = (tab: typeof tradeTabs[0]) => {
    setActiveTab(tab.name)
    // 延迟跳转以显示选中效果
    setTimeout(() => {
      router.push(tab.route)
    }, 200)
  }

  // 卡片样式
  const cardStyle = isDark
    ? "bg-[#1a1d29] border border-[#252842] shadow"
    : "bg-white border border-gray-200 shadow"

  return (
    <div className={`min-h-screen ${isDark ? "bg-background" : "bg-gray-50"}`}>
      {/* 移动端头部 */}
      {isMobile && (
        <div className={`${isDark ? "bg-[#1a1d29]" : "bg-white"} border-b ${isDark ? "border-[#252842]" : "border-gray-200"} sticky top-0 z-10`}>
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => router.back()}
              className={`p-2 rounded-lg ${isDark ? "text-gray-300 hover:bg-[#252842]" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              交易中心
            </h1>
            <div className="w-9"></div>
          </div>
        </div>
      )}

      <div className="px-4 md:px-6 py-6">
        {/* 桌面端标题 */}
        {!isMobile && (
          <div className="mb-6">
            <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
              交易中心
            </h1>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              选择您要进入的交易类型
            </p>
          </div>
        )}

        {/* 移动端：水平选项卡 */}
        {isMobile && (
          <div className="mb-6">
            {/* 选项卡栏 */}
            <div className={`flex ${cardStyle} rounded-lg p-1 mb-4`}>
              {tradeTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.name
                
                return (
                  <button
                    key={tab.name}
                    onClick={() => handleTabClick(tab)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? isDark
                          ? "bg-white text-black shadow-sm"
                          : "bg-black text-white shadow-sm"
                        : isDark
                          ? "text-gray-300 hover:text-white hover:bg-[#252842]/50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.name}</span>
                  </button>
                )
              })}
            </div>

            {/* 当前选中的页签描述 */}
            <div className={`${cardStyle} rounded-lg p-4`}>
              <div className="text-center">
                {(() => {
                  const currentTab = tradeTabs.find(tab => tab.name === activeTab)
                  const Icon = currentTab?.icon
                  
                  return (
                    <div>
                      {Icon && (
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                          isDark ? "bg-custom-green/10" : "bg-custom-green/10"
                        }`}>
                          <Icon className="w-6 h-6 text-custom-green" />
                        </div>
                      )}
                      <h2 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {activeTab}
                      </h2>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        {currentTab?.description}
                      </p>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        )}

        {/* 桌面端：卡片网格 */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tradeTabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.name
              
              return (
                <button
                  key={tab.name}
                  onClick={() => handleTabClick(tab)}
                  className={`group ${cardStyle} rounded-lg p-6 text-left transition-all duration-200 hover:shadow-lg ${
                    isActive 
                      ? "ring-2 ring-custom-green" 
                      : "hover:scale-105"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-custom-green text-white" 
                        : isDark 
                          ? "bg-[#252842] text-gray-300 group-hover:bg-custom-green group-hover:text-white" 
                          : "bg-gray-100 text-gray-600 group-hover:bg-custom-green group-hover:text-white"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                        isActive 
                          ? "text-custom-green" 
                          : isDark 
                            ? "text-white group-hover:text-custom-green" 
                            : "text-gray-900 group-hover:text-custom-green"
                      }`}>
                        {tab.name}
                      </h3>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        {tab.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* 快捷功能区 */}
        <div className="mt-8">
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            快捷功能
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 快捷功能卡片 */}
            {[
              { name: "C2C交易", route: "/usdt-trade", color: "bg-blue-500" },
              { name: "行情分析", route: "/market", color: "bg-purple-500" },
              { name: "资产管理", route: "/wallet", color: "bg-green-500" },
              { name: "交易记录", route: "/wallet", color: "bg-orange-500" }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.route)}
                className={`${cardStyle} rounded-lg p-4 text-center hover:shadow-lg transition-all duration-200 hover:scale-105`}
              >
                <div className={`w-10 h-10 ${item.color} rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                  <div className="w-5 h-5 bg-white rounded-sm"></div>
                </div>
                <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 市场概览 */}
        <div className="mt-8">
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            市场概览
          </h2>
          
          <div className={`${cardStyle} rounded-lg p-4`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "BTC/USDT", price: "67,234.56", change: "+2.34%" },
                { label: "ETH/USDT", price: "3,456.78", change: "+1.23%" },
                { label: "BNB/USDT", price: "320.50", change: "-0.45%" },
                { label: "SOL/USDT", price: "156.78", change: "+3.45%" }
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {item.label}
                  </p>
                  <p className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    ${item.price}
                  </p>
                  <p className={`text-sm ${item.change.startsWith('+') ? 'text-custom-green' : 'text-red-500'}`}>
                    {item.change}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}