"use client"

import React from "react"
import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react"

export default function WalletManagementPage() {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">钱包管理</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总资产</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥567.8M</h3>
              </div>
              <Wallet className="w-10 h-10 text-custom-green" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日充值</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥12.3M</h3>
              </div>
              <ArrowDownCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日提现</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥8.9M</h3>
              </div>
              <ArrowUpCircle className="w-10 h-10 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">钱包交易记录</h2>
          <div className="text-gray-500 dark:text-gray-400 text-center py-12">
            充值提现记录和审核
          </div>
        </div>
      </div>
    </div>
  )
}
