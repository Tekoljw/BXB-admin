"use client"

import { useState } from "react"
import { Search, Star, Shield, Clock, TrendingUp, TrendingDown } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"

export default function USDTTradePage() {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState("买入")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("全部")

  const cardStyle = isDark
    ? "bg-[#1a1c2e] border border-[#2a2d42] shadow-lg"
    : "bg-white border border-gray-200 shadow-lg"

  const orders = [
    {
      merchant: "CryptoKing",
      price: "7.25",
      limit: "1,000 - 50,000",
      available: "168,952.36",
      payments: ["银行卡", "支付宝"],
      avgTime: "1分钟",
      isVerified: true,
      rating: 98.8,
      completedOrders: 2567
    },
    {
      merchant: "BitcoinMaster",
      price: "7.23",
      limit: "500 - 30,000", 
      available: "89,234.78",
      payments: ["微信支付", "银行卡"],
      avgTime: "3分钟",
      isVerified: true,
      rating: 97.2,
      completedOrders: 1834
    },
    {
      merchant: "USDT_Pro",
      price: "7.26",
      limit: "2,000 - 100,000",
      available: "256,891.45", 
      payments: ["银行卡"],
      avgTime: "2分钟",
      isVerified: true,
      rating: 99.1,
      completedOrders: 3245
    }
  ]

  const paymentMethods = ["全部", "银行卡", "支付宝", "微信支付"]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPayment = selectedPayment === "全部" || order.payments.includes(selectedPayment)
    return matchesSearch && matchesPayment
  })

  return (
    <div className={`min-h-screen p-4 ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* 左侧筛选 */}
          <div className="lg:col-span-1">
            <div className={`${cardStyle} rounded-lg p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                USDT 交易
              </h3>
              
              {/* USDT价格信息 */}
              <div className="space-y-3 mb-6">
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

              {/* 支付方式筛选 */}
              <div>
                <h4 className={`font-semibold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                  支付方式
                </h4>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method}
                      onClick={() => setSelectedPayment(method)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedPayment === method
                          ? "bg-custom-green text-white"
                          : isDark
                          ? "text-gray-300 hover:bg-[#2a2d42]"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 主要交易区域 */}
          <div className="lg:col-span-3">
            <div className={`${cardStyle} rounded-lg p-6`}>
              
              {/* 搜索栏 */}
              <div className="mb-6">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <input
                    type="text"
                    placeholder="搜索商家"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                      isDark
                        ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                    }`}
                  />
                </div>
              </div>

              {/* 买入/卖出切换 */}
              <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-[#252842] p-1 rounded-lg">
                {["买入", "卖出"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-white dark:bg-[#1a1c2e] text-custom-green shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* 订单列表 */}
              <div className="space-y-4">
                {filteredOrders.map((order, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                      isDark
                        ? "bg-[#252842] border-[#3a3d4a] hover:border-custom-green/50"
                        : "bg-gray-50 border-gray-200 hover:border-custom-green/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                            {order.merchant}
                          </h4>
                          {order.isVerified && (
                            <Shield className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-yellow-600">{order.rating}%</span>
                          <span className="text-xs text-gray-400">({order.completedOrders})</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-custom-green">¥{order.price}</div>
                        <div className="text-xs text-gray-400">可售: {order.available} USDT</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-xs text-gray-400">限额:</span>
                        <span className={`ml-2 text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                          ¥{order.limit}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">平均用时:</span>
                        <span className={`ml-2 text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                          {order.avgTime}
                        </span>
                      </div>
                    </div>

                    {/* 支付方式 */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xs text-gray-400">支付方式:</span>
                      <div className="flex space-x-2">
                        {order.payments.map((payment) => (
                          <span
                            key={payment}
                            className={`px-2 py-1 rounded text-xs ${
                              isDark
                                ? "bg-[#1a1c2e] text-gray-300"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {payment}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-custom-green hover:bg-custom-green/90 text-white"
                        size="sm"
                      >
                        {activeTab}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-custom-green text-custom-green hover:bg-custom-green hover:text-white"
                      >
                        详情
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}