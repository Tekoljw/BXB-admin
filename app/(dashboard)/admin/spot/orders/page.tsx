"use client"

import React, { useState } from "react"
import SpotLayout from "@/components/spot-layout"
import { FileText, Search } from "lucide-react"
import { LoadMoreButton } from "@/components/load-more-button"

export default function OrdersManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [displayedCount, setDisplayedCount] = useState(20)

  const orders = [
    { id: 1, orderId: "O2024030112345", pair: "BTC/USDT", type: "买入", price: "65,432.10", amount: "0.5", status: "未成交" },
    { id: 2, orderId: "O2024030112346", pair: "ETH/USDT", type: "卖出", price: "3,245.67", amount: "2.0", status: "部分成交" },
    { id: 3, orderId: "O2024030112347", pair: "BNB/USDT", type: "买入", price: "543.21", amount: "10", status: "已完成" },
  ]

  const filteredOrders = orders.filter(order =>
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.pair.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayedOrders = filteredOrders.slice(0, displayedCount)

  const handleLoadMore = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    setDisplayedCount(prev => Math.min(prev + 20, filteredOrders.length))
  }

  return (
    <SpotLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-custom-green/10 flex items-center justify-center">
              <FileText className="text-custom-green" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">委托管理</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">管理现货交易委托订单</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索订单号或交易对..."
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">订单号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">交易对</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">价格</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">数量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">状态</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {displayedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{order.orderId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{order.pair}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.type === "买入"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{order.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "已完成"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : order.status === "部分成交"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <LoadMoreButton
            onLoadMore={handleLoadMore}
            currentCount={displayedOrders.length}
            totalCount={filteredOrders.length}
            disabled={displayedOrders.length >= filteredOrders.length}
          />
        </div>
      </div>
    </SpotLayout>
  )
}
