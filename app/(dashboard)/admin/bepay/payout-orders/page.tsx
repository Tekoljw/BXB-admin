"use client"

import React, { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PayoutOrder {
  id: string
  upstreamOrderId: string
  downstreamOrderId: string
  merchantId: string
  currency: string
  paymentChannel: string
  amount: number
  fee: number
  createdAt: string
  paidAt?: string
  lastResent?: string
  status: "pending" | "success" | "failed"
}

const mockPayoutOrders: PayoutOrder[] = [
  {
    id: "PAYOUT2024110601",
    upstreamOrderId: "UP20241106101",
    downstreamOrderId: "DOWN20241106101",
    merchantId: "M001",
    currency: "CNY",
    paymentChannel: "支付宝",
    amount: 3500.00,
    fee: 17.50,
    createdAt: "2024-11-06 14:30:00",
    paidAt: "2024-11-06 14:32:15",
    status: "success"
  },
  {
    id: "PAYOUT2024110602",
    upstreamOrderId: "UP20241106102",
    downstreamOrderId: "DOWN20241106102",
    merchantId: "M002",
    currency: "CNY",
    paymentChannel: "微信支付",
    amount: 5800.00,
    fee: 29.00,
    createdAt: "2024-11-06 14:45:00",
    paidAt: "2024-11-06 14:46:30",
    status: "success"
  },
  {
    id: "PAYOUT2024110603",
    upstreamOrderId: "UP20241106103",
    downstreamOrderId: "DOWN20241106103",
    merchantId: "M001",
    currency: "CNY",
    paymentChannel: "银行转账",
    amount: 12000.00,
    fee: 36.00,
    createdAt: "2024-11-06 15:00:00",
    status: "pending"
  },
  {
    id: "PAYOUT2024110604",
    upstreamOrderId: "UP20241106104",
    downstreamOrderId: "DOWN20241106104",
    merchantId: "M003",
    currency: "BRL",
    paymentChannel: "PIX支付",
    amount: 8200.00,
    fee: 65.60,
    createdAt: "2024-11-06 15:15:00",
    status: "failed"
  },
]

const currencies = ["全部", "CNY", "BRL", "INR", "USD", "EUR"]
const statuses = ["全部", "已成功", "等待付款", "已失效"]
const paymentChannelsMap: Record<string, string[]> = {
  "全部": ["全部"],
  "CNY": ["全部", "支付宝", "微信支付", "银行转账"],
  "BRL": ["全部", "PIX支付"],
  "INR": ["全部", "UPI支付"],
  "USD": ["全部", "信用卡", "银行转账"],
  "EUR": ["全部", "SEPA转账", "信用卡"],
}

const statusMap: Record<string, string> = {
  "全部": "all",
  "已成功": "success",
  "等待付款": "pending",
  "已失效": "failed",
}

export default function PayoutOrdersPage() {
  const [orders] = useState<PayoutOrder[]>(mockPayoutOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("全部")
  const [selectedChannel, setSelectedChannel] = useState("全部")
  const [selectedStatus, setSelectedStatus] = useState("全部")

  const availableChannels = paymentChannelsMap[selectedCurrency] || ["全部"]

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency)
    setSelectedChannel("全部")
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.upstreamOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.downstreamOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.merchantId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCurrency = selectedCurrency === "全部" || order.currency === selectedCurrency
    const matchesChannel = selectedChannel === "全部" || order.paymentChannel === selectedChannel
    const statusValue = statusMap[selectedStatus]
    const matchesStatus = statusValue === "all" || order.status === statusValue
    
    return matchesSearch && matchesCurrency && matchesChannel && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">代付订单列表</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">币种筛选</label>
          <Tabs value={selectedCurrency} onValueChange={handleCurrencyChange}>
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
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">支付通道筛选</label>
          <Tabs value={selectedChannel} onValueChange={setSelectedChannel}>
            <TabsList className={`grid w-full max-w-3xl`} style={{ gridTemplateColumns: `repeat(${availableChannels.length}, minmax(0, 1fr))` }}>
              {availableChannels.map(channel => (
                <TabsTrigger key={channel} value={channel}>
                  {channel}
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
                  订单信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  商户
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  支付信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  金额
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
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">{order.id}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">上游: {order.upstreamOrderId}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">下游: {order.downstreamOrderId}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {order.merchantId}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                        {order.currency}
                      </span>
                      <span className="text-gray-900 dark:text-gray-300 text-xs">{order.paymentChannel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="text-gray-900 dark:text-white font-medium">${order.amount.toFixed(2)}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">费: ${order.fee.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="text-gray-900 dark:text-gray-300 text-xs">{order.createdAt}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {order.paidAt ? `付: ${order.paidAt}` : "-"}
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
                      {order.status === "success" ? "已成功" : order.status === "pending" ? "等待付款" : "已失效"}
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
  )
}
