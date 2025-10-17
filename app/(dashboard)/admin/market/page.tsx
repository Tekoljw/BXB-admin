"use client"

import React from "react"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

export default function MarketManagementPage() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">行情管理</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">交易对数量</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">128</h3>
              </div>
              <Activity className="w-10 h-10 text-custom-green" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">涨幅榜</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">45</h3>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">跌幅榜</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">38</h3>
              </div>
              <TrendingDown className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">交易对管理</h2>
          <div className="text-gray-500 dark:text-gray-400 text-center py-12">
            交易对配置和管理
          </div>
        </div>
      </div>
    </div>
  )
}
