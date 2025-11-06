"use client"

import React, { useState } from "react"
import { Search, ArrowRightLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface ExchangeOrder {
  id: string
  merchantId: string
  fromAccount: string
  toAccount: string
  behaviorType: string
  fromAmount: number
  toAmount: number
  exchangeRate: number | null
  fee: number
  createdAt: string
  completedAt?: string
  status: "pending_rate" | "completed" | "rejected"
}

const mockExchangeOrders: ExchangeOrder[] = [
  {
    id: "EXC2024110601",
    merchantId: "M001",
    fromAccount: "法币资产",
    toAccount: "现货USDT",
    behaviorType: "法币换U",
    fromAmount: 7000.00,
    toAmount: 1000.00,
    exchangeRate: 7.0,
    fee: 10.00,
    createdAt: "2024-11-06 16:30:00",
    completedAt: "2024-11-06 16:32:15",
    status: "completed"
  },
  {
    id: "EXC2024110602",
    merchantId: "M002",
    fromAccount: "法币代付金",
    toAccount: "U卡USDT",
    behaviorType: "代付金划转",
    fromAmount: 1000.00,
    toAmount: 5000.00,
    exchangeRate: 5.0,
    fee: 15.00,
    createdAt: "2024-11-06 16:45:00",
    completedAt: "2024-11-06 16:46:30",
    status: "completed"
  },
  {
    id: "EXC2024110603",
    merchantId: "M001",
    fromAccount: "法币资产",
    toAccount: "现货USDT",
    behaviorType: "快捷充U",
    fromAmount: 1000.00,
    toAmount: 1100.00,
    exchangeRate: null,
    fee: 12.00,
    createdAt: "2024-11-06 17:00:00",
    status: "pending_rate"
  },
  {
    id: "EXC2024110604",
    merchantId: "M003",
    fromAccount: "现货USDT",
    toAccount: "法币资产",
    behaviorType: "法币换U",
    fromAmount: 8000.00,
    toAmount: 1000.00,
    exchangeRate: 8.0,
    fee: 20.00,
    createdAt: "2024-11-06 17:15:00",
    status: "rejected"
  },
  {
    id: "EXC2024110605",
    merchantId: "M004",
    fromAccount: "法币代付金",
    toAccount: "现货USDT",
    behaviorType: "代付金划转",
    fromAmount: 6000.00,
    toAmount: 1200.00,
    exchangeRate: null,
    fee: 18.00,
    createdAt: "2024-11-06 17:30:00",
    status: "pending_rate"
  },
]

const fromAccounts = ["全部", "法币资产", "法币代付金", "现货USDT", "U卡USDT"]
const toAccounts = ["全部", "法币资产", "法币代付金", "现货USDT", "U卡USDT"]
const behaviorTypes = ["全部", "法币换U", "代付金划转", "快捷充U"]
const statuses = ["全部", "待确认汇率", "已完成", "已拒绝"]

const statusMap: Record<string, string> = {
  "全部": "all",
  "待确认汇率": "pending_rate",
  "已完成": "completed",
  "已拒绝": "rejected",
}

export default function ExchangeOrdersPage() {
  const [orders, setOrders] = useState<ExchangeOrder[]>(mockExchangeOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFromAccount, setSelectedFromAccount] = useState("全部")
  const [selectedToAccount, setSelectedToAccount] = useState("全部")
  const [selectedBehaviorType, setSelectedBehaviorType] = useState("全部")
  const [selectedStatus, setSelectedStatus] = useState("全部")
  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<ExchangeOrder | null>(null)
  const [inputRate, setInputRate] = useState("")
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.merchantId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFromAccount = selectedFromAccount === "全部" || order.fromAccount === selectedFromAccount
    const matchesToAccount = selectedToAccount === "全部" || order.toAccount === selectedToAccount
    const matchesBehaviorType = selectedBehaviorType === "全部" || order.behaviorType === selectedBehaviorType
    const statusValue = statusMap[selectedStatus]
    const matchesStatus = statusValue === "all" || order.status === statusValue
    
    return matchesSearch && matchesFromAccount && matchesToAccount && matchesBehaviorType && matchesStatus
  })

  const openRateDialog = (order: ExchangeOrder) => {
    setCurrentOrder(order)
    setInputRate("")
    setIsRateDialogOpen(true)
  }

  const handleConfirmRate = () => {
    if (currentOrder && inputRate) {
      const rate = parseFloat(inputRate)
      if (isNaN(rate) || rate <= 0) {
        setActionMessage("请输入有效的汇率")
        setTimeout(() => setActionMessage(null), 3000)
        return
      }

      const updatedOrders = orders.map(order => {
        if (order.id === currentOrder.id) {
          return { 
            ...order, 
            exchangeRate: rate,
            status: "completed" as const,
            completedAt: new Date().toLocaleString('zh-CN')
          }
        }
        return order
      })
      setOrders(updatedOrders)
      setActionMessage(`订单 ${currentOrder.id} 的汇率已确认为 ${rate}`)
      setTimeout(() => setActionMessage(null), 3000)
      setIsRateDialogOpen(false)
      setCurrentOrder(null)
      setInputRate("")
    }
  }

  return (
    <div className="p-6 space-y-6">
      {actionMessage && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg">
          {actionMessage}
        </div>
      )}

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">兑换订单列表</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">划出账户（一级页签）</label>
          <Tabs value={selectedFromAccount} onValueChange={setSelectedFromAccount}>
            <TabsList className="grid grid-cols-5 w-full max-w-3xl">
              {fromAccounts.map(account => (
                <TabsTrigger key={account} value={account}>
                  {account}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">划入账户（二级页签）</label>
          <Tabs value={selectedToAccount} onValueChange={setSelectedToAccount}>
            <TabsList className="grid grid-cols-5 w-full max-w-3xl">
              {toAccounts.map(account => (
                <TabsTrigger key={account} value={account}>
                  {account}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">用户行为分类（三级页签）</label>
          <Tabs value={selectedBehaviorType} onValueChange={setSelectedBehaviorType}>
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              {behaviorTypes.map(type => (
                <TabsTrigger key={type} value={type}>
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">状态筛选</label>
          <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
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
                  账户划转
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  行为分类
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  金额
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  汇率
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
                      <div className="text-xs">
                        <div className="text-gray-500 dark:text-gray-400">划出</div>
                        <div className="font-medium text-gray-900 dark:text-white mt-1">
                          {order.fromAccount}
                        </div>
                      </div>
                      <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                      <div className="text-xs">
                        <div className="text-gray-500 dark:text-gray-400">划入</div>
                        <div className="font-medium text-gray-900 dark:text-white mt-1">
                          {order.toAccount}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                      {order.behaviorType}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="text-gray-900 dark:text-white font-medium">${order.fromAmount.toFixed(2)}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">费: ${order.fee.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {order.exchangeRate !== null ? (
                      <span className="text-gray-900 dark:text-gray-300">{order.exchangeRate.toFixed(4)}</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-medium">待确认</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="text-gray-900 dark:text-gray-300 text-xs">{order.createdAt}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {order.completedAt ? `完成: ${order.completedAt}` : "-"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {order.status === "pending_rate" ? (
                      <Button
                        size="sm"
                        onClick={() => openRateDialog(order)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-3 py-1 h-auto"
                      >
                        待确认汇率
                      </Button>
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                      }`}>
                        {order.status === "completed" ? "已完成" : "已拒绝"}
                      </span>
                    )}
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

      <Dialog open={isRateDialogOpen} onOpenChange={setIsRateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认汇率</DialogTitle>
            <DialogDescription>
              请为订单 "{currentOrder?.id}" 输入汇率
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">划出账户:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{currentOrder?.fromAccount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">划入账户:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{currentOrder?.toAccount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">划转金额:</span>
                  <span className="font-medium text-gray-900 dark:text-white">${currentOrder?.fromAmount.toFixed(2)}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  汇率
                </label>
                <Input
                  type="number"
                  step="0.0001"
                  placeholder="请输入汇率（例如：7.0000）"
                  value={inputRate}
                  onChange={(e) => setInputRate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRateDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleConfirmRate} className="bg-green-600 hover:bg-green-700">
              确认汇率
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
