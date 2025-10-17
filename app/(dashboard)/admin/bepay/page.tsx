"use client"

import React from "react"
import { Banknote, Users, TrendingUp } from "lucide-react"

export default function BePayManagementPage() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">BePay管理</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">支付总额</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥678.9M</h3>
              </div>
              <Banknote className="w-10 h-10 text-custom-green" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">活跃商户</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,234</h3>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">成功率</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">99.8%</h3>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">BePay交易监控</h2>
          <div className="text-gray-500 dark:text-gray-400 text-center py-12">
            支付交易记录和商户管理
          </div>
        </div>
      </div>
    </div>
  )
}
