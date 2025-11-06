"use client"

import React, { useState } from "react"
import { ShoppingCart, TrendingUp, CheckCircle, DollarSign, Search, Send, RefreshCw, Lock, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Order {
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

const mockOrders: Order[] = [
  {
    id: "ORD2024110601",
    upstreamOrderId: "UP20241106001",
    downstreamOrderId: "DOWN20241106001",
    merchantId: "M001",
    currency: "CNY",
    paymentChannel: "支付宝",
    amount: 1500.00,
    fee: 7.50,
    createdAt: "2024-11-06 10:30:00",
    paidAt: "2024-11-06 10:32:15",
    status: "success"
  },
  {
    id: "ORD2024110602",
    upstreamOrderId: "UP20241106002",
    downstreamOrderId: "DOWN20241106002",
    merchantId: "M002",
    currency: "CNY",
    paymentChannel: "微信支付",
    amount: 2800.00,
    fee: 14.00,
    createdAt: "2024-11-06 10:45:00",
    paidAt: "2024-11-06 10:46:30",
    status: "success"
  },
  {
    id: "ORD2024110603",
    upstreamOrderId: "UP20241106003",
    downstreamOrderId: "DOWN20241106003",
    merchantId: "M001",
    currency: "CNY",
    paymentChannel: "银行转账",
    amount: 5000.00,
    fee: 15.00,
    createdAt: "2024-11-06 11:00:00",
    status: "pending"
  },
  {
    id: "ORD2024110604",
    upstreamOrderId: "UP20241106004",
    downstreamOrderId: "DOWN20241106004",
    merchantId: "M003",
    currency: "BRL",
    paymentChannel: "PIX支付",
    amount: 3200.00,
    fee: 25.60,
    createdAt: "2024-11-06 11:15:00",
    paidAt: "2024-11-06 11:16:05",
    status: "success"
  },
  {
    id: "ORD2024110605",
    upstreamOrderId: "UP20241106005",
    downstreamOrderId: "DOWN20241106005",
    merchantId: "M004",
    currency: "INR",
    paymentChannel: "UPI支付",
    amount: 8500.00,
    fee: 51.00,
    createdAt: "2024-11-06 11:30:00",
    status: "failed"
  },
  {
    id: "ORD2024110606",
    upstreamOrderId: "UP20241106006",
    downstreamOrderId: "DOWN20241106006",
    merchantId: "M002",
    currency: "CNY",
    paymentChannel: "支付宝",
    amount: 950.00,
    fee: 4.75,
    createdAt: "2024-11-06 11:45:00",
    paidAt: "2024-11-06 11:47:20",
    status: "success"
  },
]

const currencies = ["全部", "CNY", "BRL", "INR", "USD", "EUR"]
const paymentChannelsMap: Record<string, string[]> = {
  "全部": ["全部"],
  "CNY": ["全部", "支付宝", "微信支付", "银行转账"],
  "BRL": ["全部", "PIX支付"],
  "INR": ["全部", "UPI支付"],
  "USD": ["全部", "信用卡", "银行转账"],
  "EUR": ["全部", "SEPA转账", "信用卡"],
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("全部")
  const [selectedChannel, setSelectedChannel] = useState("全部")
  const [isResendDialogOpen, setIsResendDialogOpen] = useState(false)
  const [isReverifyDialogOpen, setIsReverifyDialogOpen] = useState(false)
  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false)
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

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
    
    return matchesSearch && matchesCurrency && matchesChannel
  })

  const handleResend = () => {
    if (currentOrder) {
      const updatedOrders = orders.map(order => {
        if (order.id === currentOrder.id) {
          return { ...order, lastResent: new Date().toLocaleString('zh-CN') }
        }
        return order
      })
      setOrders(updatedOrders)
      setActionMessage(`订单 ${currentOrder.id} 的通知已补发`)
      setTimeout(() => setActionMessage(null), 3000)
      setIsResendDialogOpen(false)
      setCurrentOrder(null)
    }
  }

  const handleReverify = () => {
    if (currentOrder) {
      const updatedOrders = orders.map(order => {
        if (order.id === currentOrder.id && order.status === "pending") {
          return { ...order, status: "success" as const, paidAt: new Date().toLocaleString('zh-CN') }
        }
        return order
      })
      setOrders(updatedOrders)
      setActionMessage(`订单 ${currentOrder.id} 已重新校验并更新为成功状态`)
      setTimeout(() => setActionMessage(null), 3000)
      setIsReverifyDialogOpen(false)
      setCurrentOrder(null)
    }
  }

  const handleFreeze = () => {
    if (currentOrder) {
      const updatedOrders = orders.map(order => {
        if (order.id === currentOrder.id) {
          return { ...order, status: "failed" as const }
        }
        return order
      })
      setOrders(updatedOrders)
      setActionMessage(`订单 ${currentOrder.id} 已冻结`)
      setTimeout(() => setActionMessage(null), 3000)
      setIsFreezeDialogOpen(false)
      setCurrentOrder(null)
    }
  }

  const handleRefund = () => {
    if (currentOrder) {
      const updatedOrders = orders.map(order => {
        if (order.id === currentOrder.id) {
          return { ...order, status: "failed" as const }
        }
        return order
      })
      setOrders(updatedOrders)
      setActionMessage(`订单 ${currentOrder.id} 已退款，金额 $${currentOrder.amount.toFixed(2)} 已退回用户账户`)
      setTimeout(() => setActionMessage(null), 3000)
      setIsRefundDialogOpen(false)
      setCurrentOrder(null)
    }
  }

  const openResendDialog = (order: Order) => {
    setCurrentOrder(order)
    setIsResendDialogOpen(true)
  }

  const openReverifyDialog = (order: Order) => {
    setCurrentOrder(order)
    setIsReverifyDialogOpen(true)
  }

  const openFreezeDialog = (order: Order) => {
    setCurrentOrder(order)
    setIsFreezeDialogOpen(true)
  }

  const openRefundDialog = (order: Order) => {
    setCurrentOrder(order)
    setIsRefundDialogOpen(true)
  }

  const totalOrders = orders.length
  const successOrders = orders.filter(o => o.status === "success").length
  const totalVolume = orders.reduce((sum, o) => sum + o.amount, 0)
  const successRate = totalOrders > 0 ? ((successOrders / totalOrders) * 100).toFixed(1) : "0.0"

  return (
    <div className="space-y-6">
      {actionMessage && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg">
          {actionMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日订单</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalOrders}</h3>
            </div>
            <ShoppingCart className="w-10 h-10 text-custom-green" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">成功订单</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{successOrders}</h3>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日交易额</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">${(totalVolume / 1000).toFixed(1)}K</h3>
            </div>
            <DollarSign className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">成功率</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{successRate}%</h3>
            </div>
            <TrendingUp className="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">订单列表</h2>

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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  内部订单号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  上游订单号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  下游订单号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  商户ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  支付币种
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  支付通道
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  支付金额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  手续费
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  发起时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  付款时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  订单状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {order.upstreamOrderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {order.downstreamOrderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {order.merchantId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                      {order.currency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {order.paymentChannel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    ${order.fee.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {order.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {order.paidAt || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openResendDialog(order)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        title="补发通知"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openReverifyDialog(order)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400"
                        title="重新校验"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openFreezeDialog(order)}
                        className="text-orange-600 hover:text-orange-800 dark:text-orange-400"
                        title="冻结订单"
                      >
                        <Lock className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openRefundDialog(order)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                        title="订单退款"
                        disabled={order.status !== "success"}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
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

      <Dialog open={isResendDialogOpen} onOpenChange={setIsResendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>补发通知</DialogTitle>
            <DialogDescription>
              确定要补发订单 "{currentOrder?.id}" 的通知吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResendDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleResend} className="bg-blue-600 hover:bg-blue-700">
              补发
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReverifyDialogOpen} onOpenChange={setIsReverifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>重新校验</DialogTitle>
            <DialogDescription>
              确定要重新校验订单 "{currentOrder?.id}" 吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReverifyDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleReverify} className="bg-green-600 hover:bg-green-700">
              校验
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFreezeDialogOpen} onOpenChange={setIsFreezeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>冻结订单</DialogTitle>
            <DialogDescription>
              确定要冻结订单 "{currentOrder?.id}" 吗？冻结后将暂停该订单的所有操作。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFreezeDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleFreeze} className="bg-orange-600 hover:bg-orange-700">
              冻结
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>订单退款</DialogTitle>
            <DialogDescription>
              确定要退款订单 "{currentOrder?.id}" 吗？金额 ${currentOrder?.amount.toFixed(2)} 将退回到用户账户。此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRefundDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleRefund}>
              确认退款
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
