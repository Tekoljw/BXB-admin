"use client"

import React from "react"
import UCardLayout from "@/components/ucard-layout"
import { ShoppingCart, TrendingUp, DollarSign, Users } from "lucide-react"

export default function UCardTransactionsPage() {
  return (
    <UCardLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">U卡消费记录</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日消费</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2,345</h3>
                </div>
                <ShoppingCart className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日金额</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥856K</h3>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总消费额</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥125M</h3>
                </div>
                <DollarSign className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">消费用户</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">6,789</h3>
                </div>
                <Users className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">消费记录列表</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              U卡消费交易记录查询和统计
            </div>
          </div>
        </div>
      </div>
    </UCardLayout>
  )
}
