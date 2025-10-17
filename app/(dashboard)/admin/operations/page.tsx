"use client"

import React from "react"
import { BarChart3, Users, DollarSign, TrendingUp, ArrowUp, ArrowDown } from "lucide-react"

export default function OperationsPage() {
  const stats = [
    { label: "今日交易额", value: "¥15,678,900", change: "+12.5%", trend: "up", icon: DollarSign },
    { label: "今日新增用户", value: "1,234", change: "+8.2%", trend: "up", icon: Users },
    { label: "活跃用户数", value: "45,678", change: "+5.3%", trend: "up", icon: TrendingUp },
    { label: "今日订单量", value: "8,901", change: "-2.1%", trend: "down", icon: BarChart3 },
  ]

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">运营报表</h1>
        
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.trend === 'up' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <Icon className={`w-6 h-6 ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">交易趋势</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <BarChart3 className="w-16 h-16" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">用户增长</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <TrendingUp className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
