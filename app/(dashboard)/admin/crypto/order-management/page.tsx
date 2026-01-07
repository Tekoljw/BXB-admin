"use client"

import React, { useState, useMemo } from "react"
import { Search, Download, RotateCcw, Filter, Eye, X as XIcon, TrendingUp, TrendingDown } from "lucide-react"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

interface Order {
  id: string
  uid: string
  username: string
  market: string
  side: "buy" | "sell"
  type: "limit" | "market" | "stop_limit"
  price: string
  quantity: string
  filledQuantity: string
  status: "pending" | "partial" | "filled" | "cancelled"
  createTime: string
  updateTime: string
}

const mockOrders: Order[] = [
  { id: "ORD001", uid: "100001", username: "用户A", market: "BTC/USDT", side: "buy", type: "limit", price: "42500.00", quantity: "0.5", filledQuantity: "0.3", status: "partial", createTime: "2025-01-07 10:30:00", updateTime: "2025-01-07 10:35:00" },
  { id: "ORD002", uid: "100002", username: "用户B", market: "ETH/USDT", side: "sell", type: "limit", price: "2250.00", quantity: "5.0", filledQuantity: "5.0", status: "filled", createTime: "2025-01-07 10:28:00", updateTime: "2025-01-07 10:32:00" },
  { id: "ORD003", uid: "100003", username: "用户C", market: "BNB/USDT", side: "buy", type: "market", price: "市价", quantity: "10", filledQuantity: "10", status: "filled", createTime: "2025-01-07 10:25:00", updateTime: "2025-01-07 10:25:01" },
  { id: "ORD004", uid: "100004", username: "用户D", market: "BTC/USDT", side: "sell", type: "stop_limit", price: "41000.00", quantity: "1.0", filledQuantity: "0", status: "pending", createTime: "2025-01-07 10:20:00", updateTime: "2025-01-07 10:20:00" },
  { id: "ORD005", uid: "100005", username: "用户E", market: "SOL/USDT", side: "buy", type: "limit", price: "95.50", quantity: "50", filledQuantity: "0", status: "cancelled", createTime: "2025-01-07 10:15:00", updateTime: "2025-01-07 10:18:00" },
  { id: "ORD006", uid: "100001", username: "用户A", market: "DOGE/USDT", side: "buy", type: "limit", price: "0.085", quantity: "10000", filledQuantity: "5000", status: "partial", createTime: "2025-01-07 10:10:00", updateTime: "2025-01-07 10:12:00" },
  { id: "ORD007", uid: "100006", username: "用户F", market: "XRP/USDT", side: "sell", type: "limit", price: "0.62", quantity: "2000", filledQuantity: "2000", status: "filled", createTime: "2025-01-07 10:05:00", updateTime: "2025-01-07 10:08:00" },
  { id: "ORD008", uid: "100007", username: "用户G", market: "ETH/USDT", side: "buy", type: "limit", price: "2200.00", quantity: "2.5", filledQuantity: "0", status: "pending", createTime: "2025-01-07 10:00:00", updateTime: "2025-01-07 10:00:00" },
]

export default function OrderManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sideFilter, setSideFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [marketType, setMarketType] = useState<"spot" | "leverage">("spot")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetailSheet, setShowDetailSheet] = useState(false)

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const matchesSearch = !searchQuery || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.uid.includes(searchQuery) ||
        order.username.includes(searchQuery) ||
        order.market.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      const matchesSide = sideFilter === "all" || order.side === sideFilter
      const matchesType = typeFilter === "all" || order.type === typeFilter
      return matchesSearch && matchesStatus && matchesSide && matchesType
    })
  }, [searchQuery, statusFilter, sideFilter, typeFilter])

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order)
    setShowDetailSheet(true)
  }

  const handleCancelOrder = (orderId: string) => {
    toast.success(`订单 ${orderId} 已取消`)
  }

  const getStatusBadge = (status: Order["status"]) => {
    const styles = {
      pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
      partial: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
      filled: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      cancelled: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
    }
    const labels = { pending: "待成交", partial: "部分成交", filled: "已成交", cancelled: "已取消" }
    return <span className={`px-2 py-1 rounded text-xs ${styles[status]}`}>{labels[status]}</span>
  }

  const getSideBadge = (side: Order["side"]) => {
    return side === "buy" 
      ? <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><TrendingUp className="w-3 h-3" />买入</span>
      : <span className="flex items-center gap-1 text-red-600 dark:text-red-400"><TrendingDown className="w-3 h-3" />卖出</span>
  }

  const getTypeLabel = (type: Order["type"]) => {
    const labels = { limit: "限价单", market: "市价单", stop_limit: "止损限价" }
    return labels[type]
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">委托管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">管理和查看所有交易委托订单</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("已刷新")}>
            <RotateCcw className="w-4 h-4 mr-2" />
            刷新
          </Button>
        </div>
      </div>

      <Tabs value={marketType} onValueChange={(v) => setMarketType(v as "spot" | "leverage")} className="w-fit">
        <TabsList>
          <TabsTrigger value="spot">现货委托</TabsTrigger>
          <TabsTrigger value="leverage">杠杆委托</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">总委托</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{filteredOrders.length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">待成交</div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{filteredOrders.filter(o => o.status === "pending").length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">部分成交</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{filteredOrders.filter(o => o.status === "partial").length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">已成交</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{filteredOrders.filter(o => o.status === "filled").length}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索订单ID/用户ID/用户名/交易对..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="pending">待成交</SelectItem>
            <SelectItem value="partial">部分成交</SelectItem>
            <SelectItem value="filled">已成交</SelectItem>
            <SelectItem value="cancelled">已取消</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sideFilter} onValueChange={setSideFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="方向" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部方向</SelectItem>
            <SelectItem value="buy">买入</SelectItem>
            <SelectItem value="sell">卖出</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            <SelectItem value="limit">限价单</SelectItem>
            <SelectItem value="market">市价单</SelectItem>
            <SelectItem value="stop_limit">止损限价</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">订单ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">用户</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">交易对</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">方向</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">类型</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">价格</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">数量</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">已成交</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">状态</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">创建时间</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900 dark:text-white">{order.username}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{order.uid}</div>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{order.market}</td>
                <td className="px-4 py-3 text-sm">{getSideBadge(order.side)}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{getTypeLabel(order.type)}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">{order.price}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">{order.quantity}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">{order.filledQuantity}</td>
                <td className="px-4 py-3 text-center">{getStatusBadge(order.status)}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{order.createTime}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleViewDetail(order)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    {(order.status === "pending" || order.status === "partial") && (
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-700" onClick={() => handleCancelOrder(order.id)}>
                        <XIcon className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent className="w-[500px] sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>订单详情</SheetTitle>
            <SheetDescription>查看委托订单的完整信息</SheetDescription>
          </SheetHeader>
          {selectedOrder && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">订单ID</Label>
                  <p className="font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">状态</Label>
                  <p>{getStatusBadge(selectedOrder.status)}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">用户</Label>
                  <p className="font-medium">{selectedOrder.username} ({selectedOrder.uid})</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">交易对</Label>
                  <p className="font-medium">{selectedOrder.market}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">方向</Label>
                  <p>{getSideBadge(selectedOrder.side)}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">类型</Label>
                  <p>{getTypeLabel(selectedOrder.type)}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">委托价格</Label>
                  <p className="font-medium">{selectedOrder.price}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">委托数量</Label>
                  <p className="font-medium">{selectedOrder.quantity}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">已成交数量</Label>
                  <p className="font-medium">{selectedOrder.filledQuantity}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">成交比例</Label>
                  <p className="font-medium">{((parseFloat(selectedOrder.filledQuantity) / parseFloat(selectedOrder.quantity)) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">创建时间</Label>
                  <p className="text-sm">{selectedOrder.createTime}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">更新时间</Label>
                  <p className="text-sm">{selectedOrder.updateTime}</p>
                </div>
              </div>
              {(selectedOrder.status === "pending" || selectedOrder.status === "partial") && (
                <Button 
                  variant="destructive" 
                  className="w-full mt-4"
                  onClick={() => {
                    handleCancelOrder(selectedOrder.id)
                    setShowDetailSheet(false)
                  }}
                >
                  取消订单
                </Button>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
