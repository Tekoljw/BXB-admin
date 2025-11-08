"use client"

import React from "react"
import FiatLayout from "@/components/fiat-layout"
import { Users, TrendingUp, DollarSign, CheckCircle } from "lucide-react"

export default function C2CManagementPage() {
  return (
    <FiatLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">C2C管理</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">活跃商家</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">256</h3>
                </div>
                <Users className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日交易量</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥1.2M</h3>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总交易额</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥38.5M</h3>
                </div>
                <DollarSign className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">完成订单</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,856</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">C2C商家管理</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              C2C点对点交易商家管理和配置
            </div>
          </div>
        </div>
      </div>
    </FiatLayout>
  )
}
