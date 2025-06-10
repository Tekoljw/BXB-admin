"use client"

import { useState } from "react"
import { Search, Star, Shield, Clock, TrendingUp, TrendingDown, Plus, MessageSquare, CreditCard, Smartphone, Building2, Zap } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"

export default function USDTTradePage() {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState("买入USDT")
  const [tradeMode, setTradeMode] = useState("C2C")
  const [showServiceProviders, setShowServiceProviders] = useState(false)
  const [purchaseAmount, setPurchaseAmount] = useState("1000")

  const cardStyle = isDark
    ? "bg-[#1a1c2e] border border-[#2a2d42] shadow-lg"
    : "bg-white border border-gray-200 shadow-lg"

  // 交易模式
  const tradeModes = ["C2C", "快捷", "OTC"]
  
  // 买入/卖出选项
  const tradeTypes = ["买入USDT", "卖出USDT"]

  // 筛选标签 - 根据不同模式显示不同标签
  const getFilterTags = () => {
    if (tradeMode === "C2C") {
      return [
        { name: "汇率优惠", type: "green" },
        { name: "免手续费", type: "green" },
        { name: "支持现金送达", type: "green" },
        { name: "支持大额", type: "green" },
        { name: "需担保时间", type: "red" },
        { name: "需KYC", type: "red" },
        { name: "人工交易", type: "red" }
      ]
    } else if (tradeMode === "快捷") {
      return [
        { name: "免KYC", type: "green" },
        { name: "免担保", type: "green" },
        { name: "秒到账", type: "green" },
        { name: "全自动", type: "green" },
        { name: "小额", type: "red" },
        { name: "每日限额", type: "red" },
        { name: "每月限额", type: "red" },
        { name: "手续费较高", type: "red" }
      ]
    } else {
      return [
        { name: "5-10分钟到账", type: "green" },
        { name: "全自动", type: "green" },
        { name: "支持大额", type: "green" },
        { name: "严格KYC", type: "red" },
        { name: "汇率波动", type: "red" }
      ]
    }
  }

  // C2C商家数据
  const c2cMerchants = [
    {
      name: "BitcoinMaster",
      verified: true,
      rating: 4.8,
      orders: 1923,
      price: "¥7.23",
      note: "要求担保周期12小时",
      limit: "¥500 - ¥100000",
      paymentMethod: "现金交易",
      responseTime: "剩余 无限制"
    },
    {
      name: "SafeTrader", 
      verified: true,
      rating: 4.9,
      orders: 3521,
      price: "¥7.22",
      note: "要求担保周期6小时",
      limit: "¥1000 - ¥90000",
      paymentMethod: "现金交易",
      responseTime: "剩余 无限制"
    }
  ]

  // 快捷支付方式
  const paymentMethods = [
    {
      name: "支付宝",
      icon: "💰",
      rate: "¥7.24",
      fee: "0.1%",
      limit: "¥100 - ¥3000",
      status: "付款范围"
    },
    {
      name: "微信",
      icon: "💬",
      rate: "¥7.23", 
      fee: "0.15%",
      limit: "¥100 - ¥3000",
      status: "付款范围"
    },
    {
      name: "银行卡",
      icon: "🏦",
      rate: "¥7.25",
      fee: "0.05%", 
      limit: "¥500 - ¥3000",
      status: "付款范围"
    },
    {
      name: "PayPal",
      icon: "💳",
      rate: "¥7.20",
      fee: "0.2%",
      limit: "¥100 - ¥2000", 
      status: "付款范围"
    }
  ]

  // OTC服务商
  const otcProviders = [
    {
      name: "Ramp",
      label: "价格最优",
      price: "¥7150.00",
      rate: "¥7.15/USDT",
      payments: ["银行卡", "支付宝", "微信", "Apple Pay"],
      icon: "⚡"
    },
    {
      name: "MoonPay", 
      label: "",
      price: "¥7180.00",
      rate: "¥7.18/USDT",
      payments: ["银行卡", "支付宝", "微信"],
      icon: "🌙"
    }
  ]

  return (
    <div className={`min-h-screen p-4 ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* 左侧侧边栏 */}
          <div className="lg:col-span-1">
            <div className={`${cardStyle} rounded-lg p-6 mb-6`}>
              {/* 顶部交易类型切换 */}
              <div className="mb-6">
                <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                  交易类型
                </h3>
                <div className="flex flex-col space-y-2">
                  {tradeTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveTab(type)}
                      className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                        activeTab === type
                          ? "bg-custom-green text-white"
                          : isDark
                          ? "bg-[#252842] text-gray-300 hover:bg-[#2a2d42]"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {type === "买入USDT" && <TrendingUp className="w-4 h-4 mr-2" />}
                      {type === "卖出USDT" && <TrendingDown className="w-4 h-4 mr-2" />}
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* 货币选择 */}
              <div className="mb-6">
                <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                  货币类型
                </h4>
                <button className={`w-full px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-between ${
                  isDark ? "bg-[#252842] text-gray-300" : "bg-gray-100 text-gray-600"
                }`}>
                  <span className="flex items-center">
                    💲 CNY (人民币)
                  </span>
                  <span>▼</span>
                </button>
              </div>

              {/* USDT价格信息 */}
              <div className="space-y-3">
                <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                  USDT 行情
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">当前价格</span>
                    <span className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}>¥7.24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">24h涨跌</span>
                    <span className="text-green-500 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +0.28%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">24h成交量</span>
                    <span className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>₮2.8B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 主要内容区域 */}
          <div className="lg:col-span-3">
            
            {/* 交易模式选择 */}
            <div className={`${cardStyle} rounded-lg p-6 mb-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  交易模式
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {tradeModes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setTradeMode(mode)
                      setShowServiceProviders(false)
                    }}
                    className={`py-4 px-6 rounded-lg text-sm font-medium transition-all ${
                      tradeMode === mode
                        ? isDark
                          ? "bg-[#2a2d42] text-white border-2 border-custom-green"
                          : "bg-gray-100 text-gray-800 border-2 border-custom-green"
                        : isDark
                        ? "bg-[#1a1c2e] text-gray-400 hover:bg-[#252842] border border-[#3a3d4a]"
                        : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* 筛选标签 */}
            <div className={`${cardStyle} rounded-lg p-6 mb-6`}>
              <h4 className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                {tradeMode} 模式特点
              </h4>
              <div className="flex flex-wrap gap-3">
                {getFilterTags().map((tag, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      tag.type === "green"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 内容区域 */}
            <div className={`${cardStyle} rounded-lg p-6`}>
              
              {/* C2C模式内容 */}
              {tradeMode === "C2C" && (
                <>
                  {/* 现金交易/线上转账切换 */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      <button className="px-6 py-3 bg-gray-100 dark:bg-[#252842] rounded-lg text-sm font-medium">
                        现金交易
                      </button>
                      <button className="px-6 py-3 bg-gray-200 dark:bg-[#1a1c2e] rounded-lg text-sm font-medium text-gray-500">
                        线上转账
                      </button>
                    </div>
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      发布订单
                    </button>
                  </div>

                  {/* 商家列表 */}
                  <div className="space-y-4">
                    {c2cMerchants.map((merchant, index) => (
                      <div key={index} className={`p-6 rounded-lg border transition-all hover:shadow-md ${
                        isDark 
                          ? "bg-[#252842] border-[#3a3d4a] hover:border-custom-green/50" 
                          : "bg-gray-50 border-gray-200 hover:border-custom-green/50"
                      }`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-xl">👤</span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <span className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                                  {merchant.name}
                                </span>
                                {merchant.verified && (
                                  <Shield className="w-5 h-5 text-blue-500" />
                                )}
                              </div>
                              <div className="flex items-center space-x-2 mb-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-yellow-600 font-medium">{merchant.rating}</span>
                                <span className="text-gray-400">{merchant.orders}单</span>
                              </div>
                              <div className="text-sm text-blue-600">
                                {merchant.note}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-custom-green mb-1">
                              {merchant.price}
                            </div>
                            <div className="text-sm text-gray-400">
                              {merchant.responseTime}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-4">
                          限额: {merchant.limit}
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                              💰 {merchant.paymentMethod}
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button className="flex-1 bg-custom-green text-white py-3 px-6 rounded-lg font-medium hover:bg-custom-green/90 transition-all">
                            买入
                          </button>
                          <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                            <MessageSquare className="w-5 h-5 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 底部说明 */}
                  <div className="text-center text-sm text-gray-400 mt-8">
                    所有交易均由BeDAO提供担保服务，确保资金安全
                  </div>
                </>
              )}

              {/* 快捷模式内容 */}
              {tradeMode === "快捷" && (
                <div className="space-y-6">
                  <h3 className={`text-xl font-semibold mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
                    选择支付方式
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className={`p-6 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                        isDark 
                          ? "bg-[#252842] border-[#3a3d4a] hover:border-custom-green/50" 
                          : "bg-gray-50 border-gray-200 hover:border-custom-green/50"
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                              <span className="text-2xl">{method.icon}</span>
                            </div>
                            <div>
                              <div className={`text-lg font-semibold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                                {method.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                汇率: {method.rate} • 手续费: {method.fee}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">{method.limit}</div>
                            <div className="text-xs text-gray-400">{method.status}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center text-sm text-gray-400 mt-8">
                    严禁洗钱、诈骗等违法行为，一经发现将严厉处罚并移交司法机关
                  </div>
                </div>
              )}

              {/* OTC模式内容 */}
              {tradeMode === "OTC" && (
                <div className="space-y-6">
                  {!showServiceProviders ? (
                    <>
                      {/* 购买数量输入 */}
                      <div className="text-center">
                        <h3 className={`text-xl font-semibold mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
                          购买USDT数量
                        </h3>
                        <div className="max-w-md mx-auto">
                          <input
                            type="number"
                            value={purchaseAmount}
                            onChange={(e) => setPurchaseAmount(e.target.value)}
                            className={`w-full text-center text-3xl font-bold py-6 rounded-lg border focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                              isDark
                                ? "bg-[#252842] border-[#3a3d4a] text-white"
                                : "bg-white border-gray-300 text-gray-800"
                            }`}
                          />
                          <div className="flex justify-center items-center space-x-2 mt-4 text-sm text-gray-500">
                            <span>最低购买: 100 USDT</span>
                            <span>•</span>
                            <span>无上限</span>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => setShowServiceProviders(true)}
                          className="mt-6 bg-blue-500 text-white py-4 px-8 rounded-lg font-medium text-lg hover:bg-blue-600 transition-all"
                        >
                          重新查看报价
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 服务商选择 */}
                      <div>
                        <h3 className={`text-xl font-semibold mb-6 ${isDark ? "text-white" : "text-gray-800"}`}>
                          请选择服务商
                        </h3>
                        
                        <div className="space-y-6">
                          {otcProviders.map((provider, index) => (
                            <div key={index} className={`p-6 border rounded-lg hover:border-custom-green transition-all cursor-pointer ${
                              isDark ? "border-[#3a3d4a] hover:bg-[#252842]" : "border-gray-200 hover:bg-gray-50"
                            }`}>
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 flex items-center justify-center">
                                    <span className="text-2xl">{provider.icon}</span>
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-3">
                                      <span className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                                        {provider.name}
                                      </span>
                                      {provider.label && (
                                        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                          {provider.label}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-custom-green">
                                    {provider.price}
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    折合 {provider.rate}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                {provider.payments.map((payment, idx) => (
                                  <span key={idx} className={`text-sm px-3 py-1 rounded-full ${
                                    isDark ? "bg-[#1a1c2e] text-gray-300" : "bg-gray-100 text-gray-600"
                                  }`}>
                                    {payment}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}