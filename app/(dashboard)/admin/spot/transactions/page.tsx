"use client"

import React, { useState } from "react"
import SpotLayout from "@/components/spot-layout"
import { CheckCircle, Search } from "lucide-react"
import { LoadMoreButton } from "@/components/load-more-button"

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [displayedCount, setDisplayedCount] = useState(20)

  const transactions = [
    { id: 1, tradeId: "T20240315001", pair: "BTC/USDT", type: "买入", price: "65,432.10", amount: "0.5", total: "32,716.05", time: "2024-03-15 10:30:45" },
    { id: 2, tradeId: "T20240315002", pair: "ETH/USDT", type: "卖出", price: "3,245.67", amount: "2.0", total: "6,491.34", time: "2024-03-15 10:28:32" },
    { id: 3, tradeId: "T20240315003", pair: "BNB/USDT", type: "买入", price: "543.21", amount: "10", total: "5,432.10", time: "2024-03-15 10:25:15" },
  ]

  const filteredTransactions = transactions.filter(tx =>
    tx.tradeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.pair.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayedTransactions = filteredTransactions.slice(0, displayedCount)

  const handleLoadMore = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    setDisplayedCount(prev => Math.min(prev + 20, filteredTransactions.length))
  }

  return (
    <SpotLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-custom-green/10 flex items-center justify-center">
              <CheckCircle className="text-custom-green" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">成交记录</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">查看所有现货交易成交记录</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索成交ID或交易对..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-custom-green focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">成交ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">交易对</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">价格</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">数量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">总额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">时间</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {displayedTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{tx.tradeId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{tx.pair}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        tx.type === "买入"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{tx.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{tx.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <LoadMoreButton
            onLoadMore={handleLoadMore}
            currentCount={displayedTransactions.length}
            totalCount={filteredTransactions.length}
            disabled={displayedTransactions.length >= filteredTransactions.length}
          />
        </div>
      </div>
    </SpotLayout>
  )
}
