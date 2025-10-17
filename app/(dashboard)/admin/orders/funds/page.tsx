"use client"

import React from "react"
import OrdersLayout from "@/components/orders-layout"
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react"

export default function FundsRecordsPage() {
  const records = [
    { id: 1, type: "充值", amount: "+5000.00", currency: "USDT", time: "2024-10-17 14:30:25", status: "已完成" },
    { id: 2, type: "提现", amount: "-2000.00", currency: "USDT", time: "2024-10-17 12:15:10", status: "已完成" },
    { id: 3, type: "充值", amount: "+10000.00", currency: "USDT", time: "2024-10-17 09:45:33", status: "处理中" },
    { id: 4, type: "提现", amount: "-3500.00", currency: "USDT", time: "2024-10-16 18:20:15", status: "已完成" },
    { id: 5, type: "充值", amount: "+8000.00", currency: "USDT", time: "2024-10-16 16:05:42", status: "已完成" },
  ]

  return (
    <OrdersLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">资金记录</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总充值</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">23,000 USDT</h3>
              </div>
              <ArrowDownCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总提现</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">5,500 USDT</h3>
              </div>
              <ArrowUpCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">净流入</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">17,500 USDT</h3>
              </div>
              <Wallet className="w-8 h-8 text-custom-green" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">金额</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">币种</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.type}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${record.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {record.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.currency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{record.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === '已完成' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {record.status}
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
