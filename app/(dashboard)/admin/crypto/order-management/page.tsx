"use client"

import React, { useState, useMemo } from "react"
import { Search, Download, RotateCcw, Eye, X as XIcon, TrendingUp, TrendingDown, Trash2, Plus, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface FilterPreset {
  id: string
  name: string
  status: string
  side: string
  type: string
  isDefault?: boolean
}

const defaultPresets: FilterPreset[] = [
  { id: "all", name: "全部订单", status: "all", side: "all", type: "all", isDefault: true },
  { id: "pending", name: "待处理", status: "pending,partial", side: "all", type: "all", isDefault: true },
  { id: "buy", name: "买入订单", status: "all", side: "buy", type: "all", isDefault: true },
  { id: "sell", name: "卖出订单", status: "all", side: "sell", type: "all", isDefault: true },
  { id: "completed", name: "已完成", status: "filled", side: "all", type: "all", isDefault: true },
]

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
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [filterPresets, setFilterPresets] = useState<FilterPreset[]>(defaultPresets)
  const [activePreset, setActivePreset] = useState("all")
  const [showPresetDialog, setShowPresetDialog] = useState(false)
  const [newPresetName, setNewPresetName] = useState("")
  const [newPresetStatus, setNewPresetStatus] = useState("all")
  const [newPresetSide, setNewPresetSide] = useState("all")
  const [newPresetType, setNewPresetType] = useState("all")

  const applyPreset = (presetId: string) => {
    const preset = filterPresets.find(p => p.id === presetId)
    if (preset) {
      setActivePreset(presetId)
      setStatusFilter(preset.status)
      setSideFilter(preset.side)
      setTypeFilter(preset.type)
    }
  }

  const handleAddPreset = () => {
    if (!newPresetName.trim()) {
      toast.error("请输入筛选组合名称")
      return
    }
    const newPreset: FilterPreset = {
      id: `custom_${Date.now()}`,
      name: newPresetName.trim(),
      status: newPresetStatus,
      side: newPresetSide,
      type: newPresetType,
      isDefault: false,
    }
    setFilterPresets([...filterPresets, newPreset])
    setShowPresetDialog(false)
    setNewPresetName("")
    setNewPresetStatus("all")
    setNewPresetSide("all")
    setNewPresetType("all")
    toast.success("筛选组合已添加")
  }

  const handleDeletePreset = (presetId: string) => {
    setFilterPresets(filterPresets.filter(p => p.id !== presetId))
    if (activePreset === presetId) {
      setActivePreset("all")
      applyPreset("all")
    }
    toast.success("筛选组合已删除")
  }

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const matchesSearch = !searchQuery || 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.uid.includes(searchQuery) ||
        order.username.includes(searchQuery) ||
        order.market.toLowerCase().includes(searchQuery.toLowerCase())
      const statusValues = statusFilter.split(",")
      const matchesStatus = statusFilter === "all" || statusValues.includes(order.status)
      const matchesSide = sideFilter === "all" || order.side === sideFilter
      const matchesType = typeFilter === "all" || order.type === typeFilter
      return matchesSearch && matchesStatus && matchesSide && matchesType
    })
  }, [searchQuery, statusFilter, sideFilter, typeFilter])

  const cancellableOrders = useMemo(() => {
    return filteredOrders.filter(o => o.status === "pending" || o.status === "partial")
  }, [filteredOrders])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(cancellableOrders.map(o => o.id))
    } else {
      setSelectedOrders([])
    }
  }

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, orderId])
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId))
    }
  }

  const handleBatchCancel = () => {
    if (selectedOrders.length === 0) {
      toast.error("请先选择要撤销的订单")
      return
    }
    toast.success(`已批量撤销 ${selectedOrders.length} 个订单`)
    setSelectedOrders([])
  }

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
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleBatchCancel}
            disabled={selectedOrders.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            批量撤单{selectedOrders.length > 0 ? ` (${selectedOrders.length})` : ''}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("已刷新")}>
            <RotateCcw className="w-4 h-4 mr-2" />
            刷新
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowPresetDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            添加筛选组合
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {filterPresets.map((preset) => (
          <div key={preset.id} className="relative group">
            <Button
              variant={activePreset === preset.id ? "default" : "outline"}
              size="sm"
              onClick={() => applyPreset(preset.id)}
              className="pr-2"
            >
              {preset.name}
              {!preset.isDefault && (
                <XIcon
                  className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 hover:text-red-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeletePreset(preset.id)
                  }}
                />
              )}
            </Button>
          </div>
        ))}
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

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">状态:</span>
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-fit">
            <TabsList className="h-8">
              <TabsTrigger value="all" className="text-xs px-3 h-7">全部</TabsTrigger>
              <TabsTrigger value="pending" className="text-xs px-3 h-7">待成交</TabsTrigger>
              <TabsTrigger value="partial" className="text-xs px-3 h-7">部分成交</TabsTrigger>
              <TabsTrigger value="filled" className="text-xs px-3 h-7">已成交</TabsTrigger>
              <TabsTrigger value="cancelled" className="text-xs px-3 h-7">已取消</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">方向:</span>
          <Tabs value={sideFilter} onValueChange={setSideFilter} className="w-fit">
            <TabsList className="h-8">
              <TabsTrigger value="all" className="text-xs px-3 h-7">全部</TabsTrigger>
              <TabsTrigger value="buy" className="text-xs px-3 h-7">买入</TabsTrigger>
              <TabsTrigger value="sell" className="text-xs px-3 h-7">卖出</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">类型:</span>
          <Tabs value={typeFilter} onValueChange={setTypeFilter} className="w-fit">
            <TabsList className="h-8">
              <TabsTrigger value="all" className="text-xs px-3 h-7">全部</TabsTrigger>
              <TabsTrigger value="limit" className="text-xs px-3 h-7">限价单</TabsTrigger>
              <TabsTrigger value="market" className="text-xs px-3 h-7">市价单</TabsTrigger>
              <TabsTrigger value="stop_limit" className="text-xs px-3 h-7">止损限价</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索订单ID/用户ID/用户名/交易对..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[280px]"
            />
          </div>
          <Button size="sm" onClick={() => toast.success("搜索完成")}>
            搜索
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="px-4 py-3 text-center">
                <Checkbox 
                  checked={cancellableOrders.length > 0 && selectedOrders.length === cancellableOrders.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
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
                <td className="px-4 py-3 text-center">
                  {(order.status === "pending" || order.status === "partial") ? (
                    <Checkbox 
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                    />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                </td>
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

      <Dialog open={showPresetDialog} onOpenChange={setShowPresetDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>添加筛选组合</DialogTitle>
            <DialogDescription>
              配置筛选条件并保存为常用组合，方便快速筛选
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>组合名称</Label>
              <Input
                placeholder="输入筛选组合名称"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>状态筛选</Label>
              <Select value={newPresetStatus} onValueChange={setNewPresetStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="pending">待成交</SelectItem>
                  <SelectItem value="partial">部分成交</SelectItem>
                  <SelectItem value="pending,partial">待处理（待成交+部分成交）</SelectItem>
                  <SelectItem value="filled">已成交</SelectItem>
                  <SelectItem value="cancelled">已取消</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>方向筛选</Label>
              <Select value={newPresetSide} onValueChange={setNewPresetSide}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部方向</SelectItem>
                  <SelectItem value="buy">买入</SelectItem>
                  <SelectItem value="sell">卖出</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>类型筛选</Label>
              <Select value={newPresetType} onValueChange={setNewPresetType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="limit">限价单</SelectItem>
                  <SelectItem value="market">市价单</SelectItem>
                  <SelectItem value="stop_limit">止损限价</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPresetDialog(false)}>
              取消
            </Button>
            <Button onClick={handleAddPreset}>
              保存组合
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
