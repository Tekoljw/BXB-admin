"use client"

import React, { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { TrendingUp, PieChart, BarChart3, DollarSign, Calculator, Target, CreditCard, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function FinancePage() {
  const { language, theme } = useTheme()
  const isDark = theme === "dark"

  // Mock data for demonstration
  const portfolioValue = 128450.32
  const dailyChange = 2.34
  const dailyChangePercent = 1.89

  const financeProducts = [
    {
      id: 1,
      name: language === "zh" ? "稳健理财" : "Stable Finance",
      apy: "6.8%",
      minAmount: 100,
      risk: language === "zh" ? "低风险" : "Low Risk",
      duration: language === "zh" ? "30天" : "30 Days"
    },
    {
      id: 2,
      name: language === "zh" ? "增长理财" : "Growth Finance",
      apy: "12.5%",
      minAmount: 500,
      risk: language === "zh" ? "中风险" : "Medium Risk",
      duration: language === "zh" ? "90天" : "90 Days"
    },
    {
      id: 3,
      name: language === "zh" ? "高收益理财" : "High Yield Finance",
      apy: "18.2%",
      minAmount: 1000,
      risk: language === "zh" ? "高风险" : "High Risk",
      duration: language === "zh" ? "180天" : "180 Days"
    }
  ]

  const holdings = [
    {
      product: language === "zh" ? "稳健理财" : "Stable Finance",
      amount: 5000,
      earnings: 234.56,
      endDate: "2025-02-28"
    },
    {
      product: language === "zh" ? "增长理财" : "Growth Finance",
      amount: 10000,
      earnings: 567.89,
      endDate: "2025-03-15"
    }
  ]

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
            {language === "zh" ? "理财中心" : "Finance Center"}
          </h1>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {language === "zh" ? "智能投资，稳健收益" : "Smart investment, stable returns"}
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`p-6 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Wallet className={`h-8 w-8 ${isDark ? "text-blue-400" : "text-blue-600"} mr-3`} />
                <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {language === "zh" ? "总资产" : "Total Assets"}
                </h3>
              </div>
            </div>
            <div className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
              ${portfolioValue.toLocaleString()}
            </div>
            <div className="flex items-center">
              {dailyChange > 0 ? (
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${dailyChange > 0 ? "text-green-500" : "text-red-500"}`}>
                ${Math.abs(dailyChange)} ({dailyChangePercent}%)
              </span>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <TrendingUp className={`h-8 w-8 ${isDark ? "text-green-400" : "text-green-600"} mr-3`} />
                <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {language === "zh" ? "累计收益" : "Total Earnings"}
                </h3>
              </div>
            </div>
            <div className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
              $802.45
            </div>
            <div className="flex items-center">
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {language === "zh" ? "本月" : "This month"}: $156.78
              </span>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Target className={`h-8 w-8 ${isDark ? "text-purple-400" : "text-purple-600"} mr-3`} />
                <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {language === "zh" ? "平均年化" : "Average APY"}
                </h3>
              </div>
            </div>
            <div className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
              9.2%
            </div>
            <div className="flex items-center">
              <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {language === "zh" ? "当前组合" : "Current portfolio"}
              </span>
            </div>
          </div>
        </div>

        {/* Available Products */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}>
            {language === "zh" ? "理财产品" : "Finance Products"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financeProducts.map((product) => (
              <div key={product.id} className={`p-6 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg border ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                <div className="mb-4">
                  <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {language === "zh" ? "年化收益率" : "APY"}
                    </span>
                    <span className="text-2xl font-bold text-green-500">{product.apy}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {language === "zh" ? "最低投资" : "Min Amount"}
                    </span>
                    <span className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                      ${product.minAmount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {language === "zh" ? "风险等级" : "Risk Level"}
                    </span>
                    <span className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                      {product.risk}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {language === "zh" ? "投资期限" : "Duration"}
                    </span>
                    <span className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                      {product.duration}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  {language === "zh" ? "立即投资" : "Invest Now"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Holdings */}
        <div className="mb-8">
          <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-6`}>
            {language === "zh" ? "持有产品" : "Current Holdings"}
          </h2>
          <div className={`rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {language === "zh" ? "产品名称" : "Product"}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {language === "zh" ? "投资金额" : "Amount"}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {language === "zh" ? "累计收益" : "Earnings"}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {language === "zh" ? "到期日期" : "End Date"}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {language === "zh" ? "操作" : "Action"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding, index) => (
                    <tr key={index} className={`border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                      <td className={`px-6 py-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {holding.product}
                      </td>
                      <td className={`px-6 py-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                        ${holding.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-green-500 font-semibold">
                        +${holding.earnings}
                      </td>
                      <td className={`px-6 py-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {holding.endDate}
                      </td>
                      <td className="px-6 py-4">
                        <button className={`text-blue-600 hover:text-blue-700 font-semibold text-sm`}>
                          {language === "zh" ? "查看详情" : "View Details"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}