"use client"

import React from "react"
import { FileText, TrendingUp, Users } from "lucide-react"

export default function FuturesManagementPage() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">合约管理</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">持仓量</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥156.8M</h3>
              </div>
              <FileText className="w-10 h-10 text-custom-green" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">24h交易量</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥89.2M</h3>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">合约用户</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12,345</h3>
              </div>
              <Users className="w-10 h-10 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">合约交易监控</h2>
          <div className="text-gray-500 dark:text-gray-400 text-center py-12">
            合约持仓和风险管理
          </div>
        </div>
      </div>
    </div>
  )
}
