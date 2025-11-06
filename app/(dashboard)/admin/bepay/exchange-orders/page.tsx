"use client"

import React, { useState } from "react"
import { Search, ArrowRightLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ExchangeOrder {
  id: string
  merchantId: string
  fromCurrency: string
  toCurrency: string
  fromAmount: number
  toAmount: number
  exchangeRate: number
  fee: number
  createdAt: string
  completedAt?: string
  status: "pending" | "success" | "failed"
}

const mockExchangeOrders: ExchangeOrder[] = [
  {
    id: "EXC2024110601",
    merchantId: "M001",
    fromCurrency: "CNY",
    toCurrency: "USD",
    fromAmount: 7000.00,
    toAmount: 1000.00,
    exchangeRate: 7.0,
    fee: 10.00,
    createdAt: "2024-11-06 16:30:00",
    completedAt: "2024-11-06 16:32:15",
    status: "success"
  },
  {
    id: "EXC2024110602",
    merchantId: "M002",
    fromCurrency: "USD",
    toCurrency: "BRL",
    fromAmount: 1000.00,
    toAmount: 5000.00,
    exchangeRate: 5.0,
    fee: 15.00,
    createdAt: "2024-11-06 16:45:00",
    completedAt: "2024-11-06 16:46:30",
    status: "success"
  },
  {
    id: "EXC2024110603",
    merchantId: "M001",
    fromCurrency: "EUR",
    toCurrency: "USD",
    fromAmount: 1000.00,
    toAmount: 1100.00,
    exchangeRate: 1.1,
    fee: 12.00,
    createdAt: "2024-11-06 17:00:00",
    status: "pending"
  },
  {
    id: "EXC2024110604",
    merchantId: "M003",
    fromCurrency: "CNY",
    toCurrency: "EUR",
    fromAmount: 8000.00,
    toAmount: 1000.00,
    exchangeRate: 8.0,
    fee: 20.00,
    createdAt: "2024-11-06 17:15:00",
    status: "failed"
  },
  {
    id: "EXC2024110605",
    merchantId: "M004",
    fromCurrency: "BRL",
    toCurrency: "USD",
    fromAmount: 6000.00,
    toAmount: 1200.00,
    exchangeRate: 5.0,
    fee: 18.00,
    createdAt: "2024-11-06 17:30:00",
    completedAt: "2024-11-06 17:31:45",
    status: "success"
  },
]

const currencies = ["全部", "CNY", "USD", "EUR", "BRL", "INR"]
const statuses = ["全部", "已完成", "处理中", "已失败"]

const statusMap: Record<string, string> = {
  "全部": "all",
  "已完成": "success",
  "处理中": "pending",
  "已失败": "failed",
}

export default function ExchangeOrdersPage() {
  const [orders] = useState<ExchangeOrder[]>(mockExchangeOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFromCurrency, setSelectedFromCurrency] = useState("全部")
  const [selectedToCurrency, setSelectedToCurrency] = useState("全部")
  const [selectedStatus, setSelectedStatus] = useState("全部")

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.merchantId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFromCurrency = selectedFromCurrency === "全部" || order.fromCurrency === selectedFromCurrency
    const matchesToCurrency = selectedToCurrency === "全部" || order.toCurrency === selectedToCurrency
    const statusValue = statusMap[selectedStatus]
    const matchesStatus = statusValue === "all" || order.status === statusValue
    
    return matchesSearch && matchesFromCurrency && matchesToCurrency && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">兑换订单列表</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">源币种筛选</label>
          <Tabs value={selectedFromCurrency} onValueChange={setSelectedFromCurrency}>
            <TabsList className="grid grid-cols-6 w-full max-w-2xl">
              {currencies.map(currency => (
                <TabsTrigger key={currency} value={currency}>
                  {currency}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">目标币种筛选</label>
          <Tabs value={selectedToCurrency} onValueChange={setSelectedToCurrency}>
            <TabsList className="grid grid-cols-6 w-full max-w-2xl">
              {currencies.map(currency => (
                <TabsTrigger key={currency} value={currency}>
                  {currency}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">状态筛选</label>
          <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
            <TabsList className="grid grid-cols-4 w-full max-w-xl">
              {statuses.map(status => (
                <TabsTrigger key={status} value={status}>
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索订单号、商户ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  订单号
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  商户
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  兑换信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  汇率
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  费用
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  时间
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  状态
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {order.merchantId}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {order.fromAmount.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {order.fromCurrency}
                        </div>
                      </div>
                      <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {order.toAmount.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {order.toCurrency}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {order.exchangeRate.toFixed(4)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    ${order.fee.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="text-gray-900 dark:text-gray-300 text-xs">{order.createdAt}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {order.completedAt ? `完成: ${order.completedAt}` : "-"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "success"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : order.status === "pending"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                    }`}>
                      {order.status === "success" ? "已完成" : order.status === "pending" ? "处理中" : "已失败"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            暂无数据
          </div>
        )}
      </div>
    </div>
  )
}
