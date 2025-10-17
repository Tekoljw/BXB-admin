"use client"

import React from "react"
import { DollarSign, CreditCard, BanknoteIcon } from "lucide-react"

export default function FiatManagementPage() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">法币管理</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">充值金额</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥1,234,567</h3>
              </div>
              <DollarSign className="w-10 h-10 text-custom-green" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">提现金额</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥987,654</h3>
              </div>
              <BanknoteIcon className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">待审核</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">45</h3>
              </div>
              <CreditCard className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">法币交易记录</h2>
          <div className="text-gray-500 dark:text-gray-400 text-center py-12">
            法币充值提现记录
          </div>
        </div>
      </div>
    </div>
  )
}
