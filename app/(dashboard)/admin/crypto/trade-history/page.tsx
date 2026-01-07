"use client"

import React, { useState, useMemo } from "react"
import { Search, Download, RotateCcw, Eye, TrendingUp, TrendingDown, Loader2, Settings2, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
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

interface FilterPreset {
  id: string
  name: string
  side: string
  role: string
  market?: string
  enabled: boolean
  isDefault?: boolean
}

const defaultPresets: FilterPreset[] = [
  { id: "all", name: "全部成交", side: "all", role: "all", enabled: true, isDefault: true },
  { id: "buy", name: "买入成交", side: "buy", role: "all", enabled: true, isDefault: true },
  { id: "sell", name: "卖出成交", side: "sell", role: "all", enabled: true, isDefault: true },
  { id: "maker", name: "Maker成交", side: "all", role: "maker", enabled: true, isDefault: true },
  { id: "taker", name: "Taker成交", side: "all", role: "taker", enabled: true, isDefault: true },
]

interface Trade {
  id: string
  accountId: string
  orderId: string
  counterpartyAccountId: string
  counterpartyOrderId: string
  uid: string
  username: string
  market: string
  side: "buy" | "sell"
  price: string
  quantity: string
  amount: string
  fee: string
  feeCurrency: string
  role: "maker" | "taker"
  tradeTime: string
}

const mockTrades: Trade[] = [
  { id: "T001", accountId: "ACC100001", orderId: "ORD001", counterpartyAccountId: "ACC200001", counterpartyOrderId: "ORD101", uid: "100001", username: "用户A", market: "BTC/USDT", side: "buy", price: "42500.00", quantity: "0.1", amount: "4250.00", fee: "4.25", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 10:35:01" },
  { id: "T002", accountId: "ACC100001", orderId: "ORD001", counterpartyAccountId: "ACC200002", counterpartyOrderId: "ORD102", uid: "100001", username: "用户A", market: "BTC/USDT", side: "buy", price: "42498.50", quantity: "0.2", amount: "8499.70", fee: "8.50", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 10:35:00" },
  { id: "T003", accountId: "ACC100002", orderId: "ORD002", counterpartyAccountId: "ACC200003", counterpartyOrderId: "ORD103", uid: "100002", username: "用户B", market: "ETH/USDT", side: "sell", price: "2250.00", quantity: "5.0", amount: "11250.00", fee: "11.25", feeCurrency: "USDT", role: "maker", tradeTime: "2025-01-07 10:32:15" },
  { id: "T004", accountId: "ACC100003", orderId: "ORD003", counterpartyAccountId: "ACC200004", counterpartyOrderId: "ORD104", uid: "100003", username: "用户C", market: "BNB/USDT", side: "buy", price: "312.50", quantity: "10", amount: "3125.00", fee: "3.12", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 10:25:01" },
  { id: "T005", accountId: "ACC100001", orderId: "ORD006", counterpartyAccountId: "ACC200005", counterpartyOrderId: "ORD105", uid: "100001", username: "用户A", market: "DOGE/USDT", side: "buy", price: "0.0850", quantity: "5000", amount: "425.00", fee: "0.43", feeCurrency: "USDT", role: "maker", tradeTime: "2025-01-07 10:12:30" },
  { id: "T006", accountId: "ACC100006", orderId: "ORD007", counterpartyAccountId: "ACC200006", counterpartyOrderId: "ORD106", uid: "100006", username: "用户F", market: "XRP/USDT", side: "sell", price: "0.6200", quantity: "2000", amount: "1240.00", fee: "1.24", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 10:08:45" },
  { id: "T007", accountId: "ACC100008", orderId: "ORD009", counterpartyAccountId: "ACC200007", counterpartyOrderId: "ORD107", uid: "100008", username: "用户H", market: "SOL/USDT", side: "buy", price: "95.80", quantity: "20", amount: "1916.00", fee: "1.92", feeCurrency: "USDT", role: "maker", tradeTime: "2025-01-07 10:05:22" },
  { id: "T008", accountId: "ACC100009", orderId: "ORD010", counterpartyAccountId: "ACC200008", counterpartyOrderId: "ORD108", uid: "100009", username: "用户I", market: "BTC/USDT", side: "sell", price: "42510.00", quantity: "0.5", amount: "21255.00", fee: "21.26", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 10:02:10" },
  { id: "T009", accountId: "ACC100010", orderId: "ORD011", counterpartyAccountId: "ACC200009", counterpartyOrderId: "ORD109", uid: "100010", username: "用户J", market: "ETH/USDT", side: "buy", price: "2248.00", quantity: "3.0", amount: "6744.00", fee: "6.74", feeCurrency: "USDT", role: "maker", tradeTime: "2025-01-07 09:58:33" },
  { id: "T010", accountId: "ACC100011", orderId: "ORD012", counterpartyAccountId: "ACC200010", counterpartyOrderId: "ORD110", uid: "100011", username: "用户K", market: "AVAX/USDT", side: "sell", price: "35.20", quantity: "100", amount: "3520.00", fee: "3.52", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 09:55:18" },
]

export default function TradeHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sideFilter, setSideFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [marketType, setMarketType] = useState<"spot" | "leverage">("spot")
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null)
  const [showDetailSheet, setShowDetailSheet] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [displayCount, setDisplayCount] = useState(10)
  const [filterPresets, setFilterPresets] = useState<FilterPreset[]>(defaultPresets)
  const [activePreset, setActivePreset] = useState("all")
  const [showPresetDialog, setShowPresetDialog] = useState(false)
  const [newPresetName, setNewPresetName] = useState("")
  const [newPresetSide, setNewPresetSide] = useState("all")
  const [newPresetRole, setNewPresetRole] = useState("all")
  const [newPresetMarket, setNewPresetMarket] = useState("")
  const [newPresetEnabled, setNewPresetEnabled] = useState(true)

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + 10)
      setIsLoadingMore(false)
    }, 800)
  }

  const applyPreset = (presetId: string) => {
    const preset = filterPresets.find(p => p.id === presetId)
    if (preset) {
      setActivePreset(presetId)
      setSideFilter(preset.side)
      setRoleFilter(preset.role)
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
      side: newPresetSide,
      role: newPresetRole,
      market: newPresetMarket || undefined,
      enabled: newPresetEnabled,
      isDefault: false,
    }
    setFilterPresets([...filterPresets, newPreset])
    setNewPresetName("")
    setNewPresetSide("all")
    setNewPresetRole("all")
    setNewPresetMarket("")
    setNewPresetEnabled(true)
    toast.success("筛选组合已添加")
  }

  const handleTogglePreset = (presetId: string, enabled: boolean) => {
    setFilterPresets(prev => prev.map(p => p.id === presetId ? { ...p, enabled } : p))
  }

  const handleDeletePreset = (presetId: string) => {
    setFilterPresets(prev => prev.filter(p => p.id !== presetId))
    if (activePreset === presetId) {
      setActivePreset("all")
      applyPreset("all")
    }
    toast.success("筛选组合已删除")
  }

  const filteredTrades = useMemo(() => {
    return mockTrades.filter(trade => {
      const matchesSearch = !searchQuery || 
        trade.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trade.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trade.accountId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trade.counterpartyAccountId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trade.counterpartyOrderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trade.uid.includes(searchQuery) ||
        trade.username.includes(searchQuery) ||
        trade.market.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSide = sideFilter === "all" || trade.side === sideFilter
      const matchesRole = roleFilter === "all" || trade.role === roleFilter
      return matchesSearch && matchesSide && matchesRole
    })
  }, [searchQuery, sideFilter, roleFilter])

  const totalVolume = useMemo(() => {
    return filteredTrades.reduce((sum, t) => sum + parseFloat(t.amount), 0)
  }, [filteredTrades])

  const totalFees = useMemo(() => {
    return filteredTrades.reduce((sum, t) => sum + parseFloat(t.fee), 0)
  }, [filteredTrades])

  const handleViewDetail = (trade: Trade) => {
    setSelectedTrade(trade)
    setShowDetailSheet(true)
  }

  const getSideBadge = (side: Trade["side"]) => {
    return side === "buy" 
      ? <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><TrendingUp className="w-3 h-3" />买入</span>
      : <span className="flex items-center gap-1 text-red-600 dark:text-red-400"><TrendingDown className="w-3 h-3" />卖出</span>
  }

  const getRoleBadge = (role: Trade["role"]) => {
    return role === "maker"
      ? <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs">Maker</span>
      : <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs">Taker</span>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">成交记录</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">查看所有交易成交明细</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowPresetDialog(true)}>
            <Settings2 className="w-4 h-4 mr-2" />
            筛选组合
          </Button>
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
          <TabsTrigger value="spot">现货成交</TabsTrigger>
          <TabsTrigger value="leverage">杠杆成交</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">成交笔数</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{filteredTrades.length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">成交金额</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">${totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">手续费收入</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">${totalFees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">Maker占比</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{filteredTrades.length > 0 ? ((filteredTrades.filter(t => t.role === "maker").length / filteredTrades.length) * 100).toFixed(1) : 0}%</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">方向:</span>
          <Tabs value={sideFilter} onValueChange={(v) => { setSideFilter(v); setActivePreset("") }}>
            <TabsList className="h-8">
              <TabsTrigger value="all" className="h-7 px-3 text-xs">全部</TabsTrigger>
              <TabsTrigger value="buy" className="h-7 px-3 text-xs">买入</TabsTrigger>
              <TabsTrigger value="sell" className="h-7 px-3 text-xs">卖出</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">角色:</span>
          <Tabs value={roleFilter} onValueChange={(v) => { setRoleFilter(v); setActivePreset("") }}>
            <TabsList className="h-8">
              <TabsTrigger value="all" className="h-7 px-3 text-xs">全部</TabsTrigger>
              <TabsTrigger value="maker" className="h-7 px-3 text-xs">Maker</TabsTrigger>
              <TabsTrigger value="taker" className="h-7 px-3 text-xs">Taker</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1 relative min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索成交ID/账户ID/委托ID/交易对手..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-8"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full min-w-[1400px]">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">成交ID</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">账户ID</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">委托ID</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">对手账户ID</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">对手委托ID</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">交易对</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">方向</th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">价格</th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">数量</th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">金额</th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">手续费</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">角色</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">成交时间</th>
              <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTrades.slice(0, displayCount).map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-3 py-3 text-sm font-medium text-gray-900 dark:text-white">{trade.id}</td>
                <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-400">{trade.accountId}</td>
                <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-400">{trade.orderId}</td>
                <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-400">{trade.counterpartyAccountId}</td>
                <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-400">{trade.counterpartyOrderId}</td>
                <td className="px-3 py-3 text-sm font-medium text-gray-900 dark:text-white">{trade.market}</td>
                <td className="px-3 py-3 text-sm">{getSideBadge(trade.side)}</td>
                <td className="px-3 py-3 text-sm text-right text-gray-900 dark:text-white">{trade.price}</td>
                <td className="px-3 py-3 text-sm text-right text-gray-900 dark:text-white">{trade.quantity}</td>
                <td className="px-3 py-3 text-sm text-right font-medium text-gray-900 dark:text-white">${trade.amount}</td>
                <td className="px-3 py-3 text-sm text-right text-gray-500 dark:text-gray-400">{trade.fee} {trade.feeCurrency}</td>
                <td className="px-3 py-3 text-center">{getRoleBadge(trade.role)}</td>
                <td className="px-3 py-3 text-sm text-gray-500 dark:text-gray-400">{trade.tradeTime}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center justify-center">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleViewDetail(trade)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTrades.length > displayCount && (
        <div className="flex justify-center py-4">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="min-w-[140px]"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                加载中...
              </>
            ) : (
              `加载更多 (${filteredTrades.length - displayCount})`
            )}
          </Button>
        </div>
      )}

      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent className="w-[500px] sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>成交详情</SheetTitle>
            <SheetDescription>查看成交记录的完整信息</SheetDescription>
          </SheetHeader>
          {selectedTrade && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">成交ID</Label>
                  <p className="font-medium">{selectedTrade.id}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">账户ID</Label>
                  <p className="font-medium">{selectedTrade.accountId}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">委托ID</Label>
                  <p className="font-medium">{selectedTrade.orderId}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">交易对手账户ID</Label>
                  <p className="font-medium">{selectedTrade.counterpartyAccountId}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">交易对手委托ID</Label>
                  <p className="font-medium">{selectedTrade.counterpartyOrderId}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">用户</Label>
                  <p className="font-medium">{selectedTrade.username} ({selectedTrade.uid})</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">交易对</Label>
                  <p className="font-medium">{selectedTrade.market}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">方向</Label>
                  <p>{getSideBadge(selectedTrade.side)}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">角色</Label>
                  <p>{getRoleBadge(selectedTrade.role)}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">成交价格</Label>
                  <p className="font-medium">{selectedTrade.price}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">成交数量</Label>
                  <p className="font-medium">{selectedTrade.quantity}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">成交金额</Label>
                  <p className="font-medium text-lg">${selectedTrade.amount}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">手续费</Label>
                  <p className="font-medium">{selectedTrade.fee} {selectedTrade.feeCurrency}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-xs text-gray-500">成交时间</Label>
                  <p className="text-sm">{selectedTrade.tradeTime}</p>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={showPresetDialog} onOpenChange={setShowPresetDialog}>
        <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>筛选组合管理</SheetTitle>
            <SheetDescription>管理已有组合或添加新的筛选组合</SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">已有组合</h3>
              <div className="space-y-2">
                {filterPresets.map((preset) => (
                  <div 
                    key={preset.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={preset.enabled}
                        onCheckedChange={(checked) => handleTogglePreset(preset.id, checked)}
                        disabled={preset.isDefault}
                      />
                      <div>
                        <div className="font-medium text-sm text-gray-900 dark:text-white">
                          {preset.name}
                          {preset.isDefault && (
                            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">(默认)</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {preset.side !== "all" && `方向: ${preset.side === "buy" ? "买入" : "卖出"} `}
                          {preset.role !== "all" && `角色: ${preset.role === "maker" ? "Maker" : "Taker"}`}
                          {preset.market && ` 市场: ${preset.market}`}
                        </div>
                      </div>
                    </div>
                    {!preset.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                        onClick={() => handleDeletePreset(preset.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">添加新组合</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm">组合名称 <span className="text-red-500">*</span></Label>
                  <Input
                    placeholder="输入筛选组合名称"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm">交易方向</Label>
                  <Select value={newPresetSide} onValueChange={setNewPresetSide}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                      <SelectItem value="buy">买入</SelectItem>
                      <SelectItem value="sell">卖出</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">角色</Label>
                  <Select value={newPresetRole} onValueChange={setNewPresetRole}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                      <SelectItem value="maker">Maker</SelectItem>
                      <SelectItem value="taker">Taker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm">交易对</Label>
                  <Input
                    placeholder="如：BTC/USDT (可选)"
                    value={newPresetMarket}
                    onChange={(e) => setNewPresetMarket(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={newPresetEnabled}
                    onCheckedChange={setNewPresetEnabled}
                  />
                  <Label className="text-sm">启用此组合</Label>
                </div>
                <Button 
                  className="w-full bg-custom-green hover:bg-custom-green-dark text-white"
                  onClick={handleAddPreset}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  添加组合
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
