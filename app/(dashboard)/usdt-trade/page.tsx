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
    <div className={`min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      <div className="max-w-6xl mx-auto p-4">
        
        {/* 顶部交易类型切换 */}
        <div className="mb-6">
          <div className="flex space-x-2 mb-4">
            {tradeTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
                  activeTab === type
                    ? "bg-custom-green text-white"
                    : isDark
                    ? "bg-[#252842] text-gray-300 hover:bg-[#2a2d42]"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {type === "买入USDT" && <TrendingUp className="w-4 h-4 mr-1" />}
                {type === "卖出USDT" && <TrendingDown className="w-4 h-4 mr-1" />}
                {type}
              </button>
            ))}
            
            {/* 货币选择 */}
            <button className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
              isDark ? "bg-[#252842] text-gray-300" : "bg-gray-200 text-gray-600"
            }`}>
              💲 CNY 
              <span className="ml-1">▼</span>
            </button>
          </div>
        </div>

        {/* 交易模式选择 */}
        <div className={`${cardStyle} rounded-lg p-4 mb-6`}>
          <div className="grid grid-cols-3 gap-2">
            {tradeModes.map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setTradeMode(mode)
                  setShowServiceProviders(false)
                }}
                className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  tradeMode === mode
                    ? isDark
                      ? "bg-[#2a2d42] text-white border border-gray-600"
                      : "bg-gray-100 text-gray-800 border border-gray-300"
                    : isDark
                    ? "bg-[#1a1c2e] text-gray-400 hover:bg-[#252842]"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* 筛选标签 */}
        <div className={`${cardStyle} rounded-lg p-4 mb-6`}>
          <div className="flex flex-wrap gap-2">
            {getFilterTags().map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
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

        {/* C2C模式内容 */}
        {tradeMode === "C2C" && (
          <>
            {/* 现金交易/线上转账切换 */}
            <div className="flex space-x-2 mb-6">
              <button className="flex-1 py-3 px-4 bg-gray-100 dark:bg-[#252842] rounded-lg text-sm font-medium">
                现金交易
              </button>
              <button className="flex-1 py-3 px-4 bg-gray-200 dark:bg-[#1a1c2e] rounded-lg text-sm font-medium text-gray-500">
                线上转账
              </button>
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium flex items-center">
                <Plus className="w-4 h-4 mr-1" />
                发布订单
              </button>
            </div>

            {/* 商家列表 */}
            <div className="space-y-4">
              {c2cMerchants.map((merchant, index) => (
                <div key={index} className={`${cardStyle} rounded-lg p-4`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-lg">👤</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                            {merchant.name}
                          </span>
                          {merchant.verified && (
                            <Shield className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-yellow-600">{merchant.rating}</span>
                          <span className="text-gray-400">{merchant.orders}单</span>
                        </div>
                        <div className="text-xs text-blue-600">
                          {merchant.note}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-custom-green mb-1">
                        {merchant.price}
                      </div>
                      <div className="text-xs text-gray-400">
                        {merchant.responseTime}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    限额: {merchant.limit}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        💰 {merchant.paymentMethod}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-custom-green text-white py-2 px-4 rounded-lg text-sm font-medium">
                      买入
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 底部说明 */}
            <div className="text-center text-xs text-gray-400 mt-6">
              所有交易均由BeDAO提供担保服务，确保资金安全
            </div>
          </>
        )}

        {/* 快捷模式内容 */}
        {tradeMode === "快捷" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">选择支付方式</h3>
            
            {paymentMethods.map((method, index) => (
              <div key={index} className={`${cardStyle} rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <span className="text-xl">{method.icon}</span>
                    </div>
                    <div>
                      <div className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
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

            <div className="text-center text-xs text-gray-400 mt-6">
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
                <div className={`${cardStyle} rounded-lg p-4`}>
                  <h3 className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                    购买USDT数量
                  </h3>
                  <div className="relative">
                    <input
                      type="number"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(e.target.value)}
                      className={`w-full text-center text-2xl font-bold py-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                        isDark
                          ? "bg-[#252842] border-[#3a3d4a] text-white"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    />
                    <div className="flex justify-center items-center space-x-2 mt-2 text-sm text-gray-500">
                      <span>最低购买: 100 USDT</span>
                      <span>•</span>
                      <span>无上限</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowServiceProviders(true)}
                    className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg font-medium"
                  >
                    重新查看报价
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* 服务商选择 */}
                <div className={`${cardStyle} rounded-lg p-4`}>
                  <h3 className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                    请选择服务商
                  </h3>
                  
                  <div className="space-y-4">
                    {otcProviders.map((provider, index) => (
                      <div key={index} className={`p-4 border rounded-lg hover:border-custom-green transition-all cursor-pointer ${
                        isDark ? "border-[#3a3d4a] hover:bg-[#252842]" : "border-gray-200 hover:bg-gray-50"
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 flex items-center justify-center">
                              <span className="text-xl">{provider.icon}</span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                                  {provider.name}
                                </span>
                                {provider.label && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                    {provider.label}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-custom-green">
                              {provider.price}
                            </div>
                            <div className="text-xs text-gray-400">
                              折合 {provider.rate}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {provider.payments.map((payment, idx) => (
                            <span key={idx} className={`text-xs px-2 py-1 rounded ${
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
  )
}