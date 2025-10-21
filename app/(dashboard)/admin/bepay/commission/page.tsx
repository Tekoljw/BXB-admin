"use client"

import React from "react"
import { Wallet, TrendingUp, DollarSign, Users } from "lucide-react"

export default function CommissionPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">佣金管理</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日佣金</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$12,345</h3>
              </div>
              <Wallet className="w-10 h-10 text-custom-green" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">本月佣金</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$345K</h3>
              </div>
              <DollarSign className="w-10 h-10 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">增长率</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">+18%</h3>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">受益商户</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2,156</h3>
              </div>
              <Users className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">佣金记录</h2>
          <div className="text-gray-500 dark:text-gray-400 text-center py-12">
            佣金配置和分成记录
          </div>
        </div>
      </div>
    </div>
  )
}
