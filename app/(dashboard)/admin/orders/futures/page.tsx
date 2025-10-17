"use client"

import React from "react"
import OrdersLayout from "@/components/orders-layout"
import { FileText } from "lucide-react"

export default function FuturesOrdersPage() {
  const orders = [
    { id: 1, pair: "BTC/USDT", type: "做多", leverage: "10x", openPrice: "67,500", currentPrice: "68,200", margin: "1,000", pnl: "+103.70", time: "2024-10-17 15:20:30", status: "持仓中" },
    { id: 2, pair: "ETH/USDT", type: "做空", leverage: "5x", openPrice: "3,200", currentPrice: "3,150", margin: "500", pnl: "+78.13", time: "2024-10-17 14:10:15", status: "持仓中" },
    { id: 3, pair: "BTC/USDT", type: "做多", leverage: "20x", openPrice: "66,800", currentPrice: "67,500", margin: "2,000", pnl: "+418.56", time: "2024-10-17 11:30:45", status: "已平仓" },
    { id: 4, pair: "SOL/USDT", type: "做多", leverage: "10x", openPrice: "145.50", currentPrice: "142.30", margin: "300", pnl: "-65.98", time: "2024-10-16 18:45:20", status: "持仓中" },
    { id: 5, pair: "ETH/USDT", type: "做空", leverage: "5x", openPrice: "3,180", currentPrice: "3,250", margin: "1,000", pnl: "-110.06", time: "2024-10-16 16:20:10", status: "已平仓" },
  ]

  return (
    <OrdersLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">合约订单</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">持仓订单</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">23</h3>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总盈亏</p>
                <h3 className="text-2xl font-bold text-green-500">+2,345.67 USDT</h3>
              </div>
              <FileText className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已用保证金</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12,500 USDT</h3>
              </div>
              <FileText className="w-8 h-8 text-custom-green" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">订单ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">合约</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">方向</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">杠杆</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">开仓价</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">当前价</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">保证金</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">盈亏</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{order.pair}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.type === '做多' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.leverage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.openPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.currentPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.margin}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${order.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {order.pnl}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{order.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === '持仓中' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 
                        'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrdersLayout>
  )
}
