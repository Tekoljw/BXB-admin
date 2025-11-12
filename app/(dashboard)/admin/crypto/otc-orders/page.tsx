"use client"

import React, { useState, useMemo } from "react"
import { Download, ShoppingCart, Eye, RefreshCcw, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

interface OTCOrder {
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

export default function OTCOrdersPage() {
  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  
  // 四级页签状态
  const [typeTab, setTypeTab] = useState<string>("all") // 一级：买入/卖出
  const [providerTab, setProviderTab] = useState<string>("all") // 二级：供应商
  const [currencyTab, setCurrencyTab] = useState<string>("all") // 三级：币种
  const [statusTab, setStatusTab] = useState<string>("all") // 四级：状态
  const [selectedOrder, setSelectedOrder] = useState<OTCOrder | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  // 示例订单数据
  const orders: OTCOrder[] = [
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

  // 四级链式过滤：搜索 → 买入/卖出 → 供应商 → 币种 → 状态
  const filteredOrders = useMemo(() => {
    // 第一步：搜索过滤
    let filtered = orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesSearch
    })

    // 第二步：类型（买入/卖出）页签过滤
    if (typeTab !== "all") {
      filtered = filtered.filter(o => o.orderType === typeTab)
    }

    // 第三步：供应商页签过滤
    if (providerTab !== "all") {
      filtered = filtered.filter(o => o.providerName === providerTab)
    }

    // 第四步：币种页签过滤
    if (currencyTab !== "all") {
      filtered = filtered.filter(o => o.currency === currencyTab)
    }

    // 第五步：状态页签过滤
    if (statusTab !== "all") {
      filtered = filtered.filter(o => o.status === statusTab)
    }

    return filtered
  }, [orders, searchTerm, typeTab, providerTab, currencyTab, statusTab])

  // 获取当前筛选条件下的唯一供应商列表（用于二级页签）
  const availableProviders = useMemo(() => {
    let filtered = orders
    
    // 应用一级页签筛选
    if (typeTab !== "all") {
      filtered = filtered.filter(o => o.orderType === typeTab)
    }
    
    const providers = Array.from(new Set(filtered.map(o => o.providerName)))
    return providers.sort()
  }, [orders, typeTab])


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

  const handleViewDetail = (order: OTCOrder) => {
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
      {/* 标题和一级页签 */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">OTC订单</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              查看和管理用户通过OTC供应商买卖加密货币的订单
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* 一级页签：买入/卖出 */}
            <Tabs value={typeTab} onValueChange={(value) => {
              setTypeTab(value)
              setProviderTab("all") // 切换一级页签时重置二级页签
            }}>
              <TabsList className="bg-gray-100 dark:bg-gray-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  全部
                </TabsTrigger>
                <TabsTrigger value="buy" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  买入
                </TabsTrigger>
                <TabsTrigger value="sell" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  卖出
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button className="bg-custom-green hover:bg-green-600">
              <Download className="w-4 h-4 mr-2" />
              导出订单
            </Button>
          </div>
        </div>
      </div>

      {/* 二级页签：供应商 */}
      <div className="mb-4">
        <Tabs value={providerTab} onValueChange={setProviderTab}>
          <TabsList className="bg-gray-100 dark:bg-gray-700 h-auto flex-wrap">
            <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
              全部供应商
            </TabsTrigger>
            {availableProviders.map(provider => (
              <TabsTrigger 
                key={provider} 
                value={provider}
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600"
              >
                {provider}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* 三级页签：币种 */}
      <div className="mb-4">
        <Tabs value={currencyTab} onValueChange={setCurrencyTab}>
          <TabsList className="bg-gray-100 dark:bg-gray-700 h-auto flex-wrap">
            <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
              全部币种
            </TabsTrigger>
            <TabsTrigger value="USDT" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
              USDT
            </TabsTrigger>
            <TabsTrigger value="BTC" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
              BTC
            </TabsTrigger>
            <TabsTrigger value="ETH" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
              ETH
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 四级页签（状态）+ 搜索 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col gap-4">
          {/* 四级页签：状态 + 搜索框 */}
          <div className="flex items-center gap-4">
            {/* 四级页签：状态 */}
            <Tabs value={statusTab} onValueChange={setStatusTab} className="flex-shrink-0">
              <TabsList className="bg-gray-100 dark:bg-gray-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  全部状态
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  待支付
                </TabsTrigger>
                <TabsTrigger value="paid" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  已支付
                </TabsTrigger>
                <TabsTrigger value="processing" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  处理中
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  已完成
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  已取消
                </TabsTrigger>
                <TabsTrigger value="failed" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">
                  失败
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* 搜索框 */}
            <SearchControls
              placeholder="搜索订单ID、用户名、币种..."
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              onReset={handleReset}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  订单ID
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
                  供应商
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
                    <div className="text-sm text-gray-900 dark:text-white">
                      {order.providerName}
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
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无OTC订单</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">当用户通过OTC供应商买卖加密货币时，订单将显示在此处</p>
          </div>
        )}
      </div>

      {/* 订单详情对话框 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>订单详情</DialogTitle>
            <DialogDescription>
              查看OTC订单的详细信息
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
