"use client"

import React from "react"
import CommissionLayout from "@/components/commission-layout"
import { TrendingUp, DollarSign, Users, Shield } from "lucide-react"

export default function EscrowCommissionPage() {
  return (
    <CommissionLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">担保佣金</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日佣金</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥5,678</h3>
                </div>
                <DollarSign className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">本月佣金</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥156,234</h3>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">担保交易用户</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">567</h3>
                </div>
                <Users className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">担保交易量</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥3.2M</h3>
                </div>
                <Shield className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">担保佣金记录</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              担保交易佣金数据和统计信息
            </div>
          </div>
        </div>
      </div>
    </CommissionLayout>
  )
}
