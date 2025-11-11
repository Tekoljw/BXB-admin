"use client"

import React, { useState } from "react"
import { Search, Download, ShoppingCart, Eye, RefreshCcw, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface FiatTradingOrder {
  id: string
  userId: string
  userName: string
  orderType: 'buy' | 'sell'
  currency: string
  cryptoAmount: string
  exchangeRate: string
  fiatCurrency: string
  fiatAmount: string
  paymentMethod: string
  providerName: string
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled' | 'failed'
  createdAt: string
  paidAt?: string
  completedAt?: string
  remark?: string
}

export default function FiatTradingOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currencyFilter, setCurrencyFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<FiatTradingOrder | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  // 示例订单数据
  const orders: FiatTradingOrder[] = [
    {
      id: 'FT202411110001',
      userId: 'U123456',
      userName: '张三',
      orderType: 'buy',
      currency: 'USDT',
      cryptoAmount: '1000.00',
      exchangeRate: '7.25',
      fiatCurrency: 'CNY',
      fiatAmount: '7250.00',
      paymentMethod: '支付宝',
      providerName: 'OKPay',
      status: 'completed',
      createdAt: '2024-11-11 10:15:30',
      paidAt: '2024-11-11 10:16:45',
      completedAt: '2024-11-11 10:18:20',
    },
    {
      id: 'FT202411110002',
      userId: 'U789012',
      userName: '李四',
      orderType: 'sell',
      currency: 'USDT',
      cryptoAmount: '500.00',
      exchangeRate: '7.23',
      fiatCurrency: 'CNY',
      fiatAmount: '3615.00',
      paymentMethod: '银行卡',
      providerName: 'AlchemyPay',
      status: 'processing',
      createdAt: '2024-11-11 11:20:15',
      paidAt: '2024-11-11 11:21:30',
    },
    {
      id: 'FT202411110003',
      userId: 'U345678',
      userName: '王五',
      orderType: 'buy',
      currency: 'BTC',
      cryptoAmount: '0.01',
      exchangeRate: '650000.00',
      fiatCurrency: 'CNY',
      fiatAmount: '6500.00',
      paymentMethod: '微信支付',
      providerName: 'MoonPay',
      status: 'pending',
      createdAt: '2024-11-11 12:30:00',
    },
    {
      id: 'FT202411110004',
      userId: 'U901234',
      userName: '赵六',
      orderType: 'buy',
      currency: 'USDT',
      cryptoAmount: '2000.00',
      exchangeRate: '7.24',
      fiatCurrency: 'CNY',
      fiatAmount: '14480.00',
      paymentMethod: '支付宝',
      providerName: 'OKPay',
      status: 'failed',
      createdAt: '2024-11-11 09:45:00',
      remark: '支付超时，订单自动取消',
    },
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === "all" || order.orderType === typeFilter
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesCurrency = currencyFilter === "all" || order.currency === currencyFilter
    
    return matchesSearch && matchesType && matchesStatus && matchesCurrency
  })

  // 统计数据
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled' || o.status === 'failed').length,
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          已完成
        </span>
      case "processing":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          处理中
        </span>
      case "paid":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
          已支付
        </span>
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
          待支付
        </span>
      case "cancelled":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
          已取消
        </span>
      case "failed":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          失败
        </span>
      default:
        return null
    }
  }

  const getTypeLabel = (type: string) => {
    return type === 'buy' ? '买入' : '卖出'
  }

  const getTypeBadge = (type: string) => {
    return type === 'buy' 
      ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          买入
        </span>
      : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
          卖出
        </span>
  }

  const handleViewDetail = (order: FiatTradingOrder) => {
    setSelectedOrder(order)
    setShowDetailDialog(true)
  }

  const handleRefundOrder = (orderId: string) => {
    toast.success("退款申请已提交", {
      description: `订单 ${orderId} 的退款申请已成功提交`,
    })
  }

  const handleCancelOrder = (orderId: string) => {
    toast.success("订单已取消", {
      description: `订单 ${orderId} 已成功取消`,
    })
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">法币买卖订单</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              查看和管理用户通过法币接口买卖加密货币的订单
            </p>
          </div>
          <Button className="bg-custom-green hover:bg-green-600">
            <Download className="w-4 h-4 mr-2" />
            导出订单
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">订单总数</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">待支付</p>
            <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.pending}
            </h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已完成</p>
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.completed}
            </h3>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">失败/取消</p>
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
              {stats.cancelled}
            </h3>
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="搜索订单ID、用户名..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="订单类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="buy">买入</SelectItem>
              <SelectItem value="sell">卖出</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="订单状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="pending">待支付</SelectItem>
              <SelectItem value="paid">已支付</SelectItem>
              <SelectItem value="processing">处理中</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
              <SelectItem value="cancelled">已取消</SelectItem>
              <SelectItem value="failed">失败</SelectItem>
            </SelectContent>
          </Select>

          <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="币种" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部币种</SelectItem>
              <SelectItem value="USDT">USDT</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="ETH">ETH</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm("")
              setTypeFilter("all")
              setStatusFilter("all")
              setCurrencyFilter("all")
            }}
          >
            重置
          </Button>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  订单信息
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  用户
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  加密货币金额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  法币金额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  支付方式
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  创建时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {order.providerName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {order.userName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {order.userId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(order.orderType)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.cryptoAmount} {order.currency}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      汇率: {order.exchangeRate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ¥{order.fiatAmount}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {order.fiatCurrency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {order.paymentMethod}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {order.createdAt}
                    </div>
                    {order.completedAt && (
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        完成: {order.completedAt}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetail(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {order.status === 'completed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRefundOrder(order.id)}
                        >
                          <RefreshCcw className="w-4 h-4" />
                        </Button>
                      )}
                      {(order.status === 'pending' || order.status === 'paid') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无法币买卖订单</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">当用户通过法币接口买卖加密货币时，订单将显示在此处</p>
          </div>
        )}
      </div>

      {/* 订单详情对话框 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>订单详情</DialogTitle>
            <DialogDescription>
              查看法币买卖订单的详细信息
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">订单ID</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">订单类型</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{getTypeLabel(selectedOrder.orderType)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">用户</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {selectedOrder.userName} ({selectedOrder.userId})
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">状态</label>
                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">加密货币金额</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {selectedOrder.cryptoAmount} {selectedOrder.currency}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">汇率</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedOrder.exchangeRate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">法币金额</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    ¥{selectedOrder.fiatAmount} {selectedOrder.fiatCurrency}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">支付方式</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">服务商</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedOrder.providerName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">创建时间</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedOrder.createdAt}</p>
                </div>
                {selectedOrder.paidAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">支付时间</label>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedOrder.paidAt}</p>
                  </div>
                )}
                {selectedOrder.completedAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">完成时间</label>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedOrder.completedAt}</p>
                  </div>
                )}
              </div>
              
              {selectedOrder.remark && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">备注</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    {selectedOrder.remark}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
