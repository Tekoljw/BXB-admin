"use client"

import React, { useState, useMemo, useCallback } from "react"
import { Search, Download, RotateCcw, Edit2, TrendingUp, BarChart3, Settings, Plus, Trash2, Loader2 } from "lucide-react"
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

interface KlineConfig {
  id: string
  market: string
  interval: string
  klineType: "spot" | "futures" | "swap"
  dataSource: string
  syncStatus: boolean
  lastSyncTime: string
  dataCount: number
  quality: "excellent" | "good" | "poor"
  open: number
  high: number
  low: number
  close: number
  volume: number
  turnover: number
}

const mockKlineConfigs: KlineConfig[] = [
  { id: "K001", market: "BTC/USDT", interval: "1m", klineType: "spot", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:30:00", dataCount: 525600, quality: "excellent", open: 98245.32, high: 98567.89, low: 98123.45, close: 98456.78, volume: 1234.56, turnover: 121345678.90 },
  { id: "K002", market: "BTC/USDT", interval: "5m", klineType: "spot", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:30:00", dataCount: 105120, quality: "excellent", open: 98200.00, high: 98600.00, low: 98100.00, close: 98450.00, volume: 5678.90, turnover: 557890123.45 },
  { id: "K003", market: "BTC/USDT", interval: "1h", klineType: "futures", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:00:00", dataCount: 8760, quality: "excellent", open: 97800.00, high: 98800.00, low: 97500.00, close: 98400.00, volume: 12345.67, turnover: 1212345678.90 },
  { id: "K004", market: "ETH/USDT", interval: "1m", klineType: "spot", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:30:00", dataCount: 525600, quality: "excellent", open: 3456.78, high: 3478.90, low: 3445.67, close: 3467.89, volume: 8901.23, turnover: 30845678.90 },
  { id: "K005", market: "ETH/USDT", interval: "5m", klineType: "swap", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:30:00", dataCount: 105120, quality: "good", open: 3450.00, high: 3480.00, low: 3440.00, close: 3465.00, volume: 45678.90, turnover: 157890123.45 },
  { id: "K006", market: "BNB/USDT", interval: "1m", klineType: "spot", dataSource: "OKX", syncStatus: false, lastSyncTime: "2025-01-07 09:00:00", dataCount: 480000, quality: "poor", open: 712.34, high: 715.67, low: 710.12, close: 714.56, volume: 23456.78, turnover: 16745678.90 },
  { id: "K007", market: "SOL/USDT", interval: "1m", klineType: "futures", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:29:00", dataCount: 200000, quality: "good", open: 210.45, high: 212.78, low: 209.12, close: 211.89, volume: 56789.01, turnover: 11978901.23 },
  { id: "K008", market: "DOGE/USDT", interval: "15m", klineType: "spot", dataSource: "OKX", syncStatus: true, lastSyncTime: "2025-01-07 10:15:00", dataCount: 35040, quality: "excellent", open: 0.4123, high: 0.4156, low: 0.4101, close: 0.4145, volume: 123456789.01, turnover: 51234567.89 },
]

const klineTypes = [
  { value: "spot", label: "现货" },
  { value: "futures", label: "期货" },
  { value: "swap", label: "永续" },
]

const intervals = ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"]
const dataSources = ["Binance", "OKX", "Huobi", "Bybit", "自有数据"]

export default function KlineManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [intervalFilter, setIntervalFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [configs, setConfigs] = useState(mockKlineConfigs)
  const [selectedConfig, setSelectedConfig] = useState<KlineConfig | null>(null)
  const [showEditSheet, setShowEditSheet] = useState(false)
  const [showAddSheet, setShowAddSheet] = useState(false)
  const [newConfig, setNewConfig] = useState({ market: "", interval: "1m", dataSource: "Binance", klineType: "spot" as const })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [displayCount, setDisplayCount] = useState(10)

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + 10)
      setIsLoadingMore(false)
    }, 800)
  }, [])

  const filteredConfigs = useMemo(() => {
    return configs.filter(config => {
      const matchesSearch = !searchQuery || config.market.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesInterval = intervalFilter === "all" || config.interval === intervalFilter
      const matchesSource = sourceFilter === "all" || config.dataSource === sourceFilter
      const matchesType = typeFilter === "all" || config.klineType === typeFilter
      return matchesSearch && matchesInterval && matchesSource && matchesType
    })
  }, [configs, searchQuery, intervalFilter, sourceFilter, typeFilter])

  const startEdit = (id: string, field: string, value: number | string) => {
    setEditingId(id)
    setEditingField(field)
    setEditValue(String(value))
  }

  const saveEdit = () => {
    if (editingId && editingField) {
      setConfigs(prev => prev.map(c => {
        if (c.id === editingId) {
          return { ...c, [editingField]: parseFloat(editValue) || 0 }
        }
        return c
      }))
      toast.success("数据已更新")
    }
    setEditingId(null)
    setEditingField(null)
    setEditValue("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingField(null)
    setEditValue("")
  }

  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    if (price >= 1) return price.toFixed(2)
    return price.toFixed(4)
  }

  const formatVolume = (vol: number) => {
    if (vol >= 1000000) return (vol / 1000000).toFixed(2) + "M"
    if (vol >= 1000) return (vol / 1000).toFixed(2) + "K"
    return vol.toFixed(2)
  }

  const getKlineTypeLabel = (type: string) => {
    return klineTypes.find(t => t.value === type)?.label || type
  }

  const handleToggleSync = (id: string) => {
    setConfigs(prev => prev.map(c => c.id === id ? { ...c, syncStatus: !c.syncStatus } : c))
    toast.success("同步状态已更新")
  }

  const getQualityBadge = (quality: KlineConfig["quality"]) => {
    const styles = {
      excellent: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      good: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
      poor: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    }
    const labels = { excellent: "优秀", good: "良好", poor: "较差" }
    return <span className={`px-2 py-1 rounded text-xs ${styles[quality]}`}>{labels[quality]}</span>
  }

  const handleAddConfig = () => {
    if (!newConfig.market) {
      toast.error("请输入交易对")
      return
    }
    const newId = `K${String(configs.length + 1).padStart(3, '0')}`
    setConfigs(prev => [...prev, {
      id: newId,
      market: newConfig.market.toUpperCase(),
      interval: newConfig.interval,
      klineType: newConfig.klineType,
      dataSource: newConfig.dataSource,
      syncStatus: true,
      lastSyncTime: new Date().toLocaleString("zh-CN"),
      dataCount: 0,
      quality: "good" as const,
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
      turnover: 0,
    }])
    setNewConfig({ market: "", interval: "1m", dataSource: "Binance", klineType: "spot" })
    setShowAddSheet(false)
    toast.success("K线配置已添加")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">K线管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">管理K线数据源和同步配置</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-custom-green hover:bg-custom-green-dark text-white" onClick={() => setShowAddSheet(true)}>
            <Plus className="w-4 h-4 mr-2" />
            新增配置
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("已刷新")}>
            <RotateCcw className="w-4 h-4 mr-2" />
            刷新
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">总配置</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{configs.length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">同步中</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{configs.filter(c => c.syncStatus).length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">数据源</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{[...new Set(configs.map(c => c.dataSource))].length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">交易对</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{[...new Set(configs.map(c => c.market))].length}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">类型:</span>
          <Tabs value={typeFilter} onValueChange={setTypeFilter}>
            <TabsList className="h-8">
              <TabsTrigger value="all" className="h-7 px-2 text-xs">全部</TabsTrigger>
              {klineTypes.map(t => (
                <TabsTrigger key={t.value} value={t.value} className="h-7 px-2 text-xs">{t.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">周期:</span>
          <Tabs value={intervalFilter} onValueChange={setIntervalFilter}>
            <TabsList className="h-8">
              <TabsTrigger value="all" className="h-7 px-2 text-xs">全部</TabsTrigger>
              {intervals.map(i => (
                <TabsTrigger key={i} value={i} className="h-7 px-2 text-xs">{i}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">数据源:</span>
          <Tabs value={sourceFilter} onValueChange={setSourceFilter}>
            <TabsList className="h-8">
              <TabsTrigger value="all" className="h-7 px-2 text-xs">全部</TabsTrigger>
              {dataSources.map(s => (
                <TabsTrigger key={s} value={s} className="h-7 px-2 text-xs">{s}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索交易对..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-8 w-full"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">交易对</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">类型</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">周期</th>
              <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">开盘价</th>
              <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">最高价</th>
              <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">最低价</th>
              <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">收盘价</th>
              <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">成交量</th>
              <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400">成交额</th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">数据源</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">同步</th>
              <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredConfigs.slice(0, displayCount).map((config) => (
              <tr key={config.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-2 py-2">
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-custom-green" />
                    <span className="font-medium text-gray-900 dark:text-white text-xs">{config.market}</span>
                  </div>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    config.klineType === "spot" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                    config.klineType === "futures" ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" :
                    "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                  }`}>
                    {getKlineTypeLabel(config.klineType)}
                  </span>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">{config.interval}</span>
                </td>
                {["open", "high", "low", "close"].map((field) => (
                  <td key={field} className="px-2 py-2 text-right">
                    {editingId === config.id && editingField === field ? (
                      <Input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-20 h-6 text-xs text-right"
                        autoFocus
                        onBlur={saveEdit}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit()
                          if (e.key === "Escape") cancelEdit()
                        }}
                      />
                    ) : (
                      <span 
                        className="text-xs text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 rounded"
                        onClick={() => startEdit(config.id, field, config[field as keyof KlineConfig] as number)}
                      >
                        {formatPrice(config[field as keyof KlineConfig] as number)}
                      </span>
                    )}
                  </td>
                ))}
                <td className="px-2 py-2 text-right">
                  {editingId === config.id && editingField === "volume" ? (
                    <Input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-20 h-6 text-xs text-right"
                      autoFocus
                      onBlur={saveEdit}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit()
                        if (e.key === "Escape") cancelEdit()
                      }}
                    />
                  ) : (
                    <span 
                      className="text-xs text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 rounded"
                      onClick={() => startEdit(config.id, "volume", config.volume)}
                    >
                      {formatVolume(config.volume)}
                    </span>
                  )}
                </td>
                <td className="px-2 py-2 text-right">
                  {editingId === config.id && editingField === "turnover" ? (
                    <Input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-20 h-6 text-xs text-right"
                      autoFocus
                      onBlur={saveEdit}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit()
                        if (e.key === "Escape") cancelEdit()
                      }}
                    />
                  ) : (
                    <span 
                      className="text-xs text-gray-900 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-1 py-0.5 rounded"
                      onClick={() => startEdit(config.id, "turnover", config.turnover)}
                    >
                      {formatVolume(config.turnover)}
                    </span>
                  )}
                </td>
                <td className="px-2 py-2 text-xs text-gray-600 dark:text-gray-400">{config.dataSource}</td>
                <td className="px-2 py-2 text-center">
                  <Switch checked={config.syncStatus} onCheckedChange={() => handleToggleSync(config.id)} className="scale-75" />
                </td>
                <td className="px-2 py-2">
                  <div className="flex items-center justify-center gap-0.5">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => { setSelectedConfig(config); setShowEditSheet(true) }}>
                      <Settings className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500 hover:text-red-700" onClick={() => {
                      setConfigs(prev => prev.filter(c => c.id !== config.id))
                      toast.success("已删除")
                    }}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredConfigs.length > displayCount && (
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
              `加载更多 (${filteredConfigs.length - displayCount})`
            )}
          </Button>
        </div>
      )}

      <Sheet open={showAddSheet} onOpenChange={setShowAddSheet}>
        <SheetContent className="w-[450px] sm:max-w-[450px]">
          <SheetHeader>
            <SheetTitle>新增K线配置</SheetTitle>
            <SheetDescription>配置新的K线数据同步</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div>
              <Label>交易对</Label>
              <Input 
                placeholder="例如: BTC/USDT" 
                value={newConfig.market}
                onChange={(e) => setNewConfig(prev => ({ ...prev, market: e.target.value }))}
                className="mt-2"
              />
            </div>
            <div>
              <Label>K线类型</Label>
              <Tabs value={newConfig.klineType} onValueChange={(v) => setNewConfig(prev => ({ ...prev, klineType: v as "spot" | "futures" | "swap" }))} className="mt-2">
                <TabsList className="grid w-full grid-cols-3 h-auto">
                  {klineTypes.map(t => (
                    <TabsTrigger key={t.value} value={t.value} className="text-xs px-2 py-1.5">{t.label}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div>
              <Label>周期</Label>
              <Select value={newConfig.interval} onValueChange={(v) => setNewConfig(prev => ({ ...prev, interval: v }))}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {intervals.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>数据源</Label>
              <Tabs value={newConfig.dataSource} onValueChange={(v) => setNewConfig(prev => ({ ...prev, dataSource: v }))} className="mt-2">
                <TabsList className="grid w-full grid-cols-5 h-auto">
                  {dataSources.map(s => (
                    <TabsTrigger key={s} value={s} className="text-xs px-2 py-1.5">{s}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <Button className="w-full bg-custom-green hover:bg-custom-green-dark text-white" onClick={handleAddConfig}>
              确认添加
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
        <SheetContent className="w-[450px] sm:max-w-[450px]">
          <SheetHeader>
            <SheetTitle>编辑K线配置</SheetTitle>
            <SheetDescription>{selectedConfig?.market} - {selectedConfig?.interval}</SheetDescription>
          </SheetHeader>
          {selectedConfig && (
            <div className="mt-6 space-y-4">
              <div>
                <Label>数据源</Label>
                <Tabs 
                  value={selectedConfig.dataSource} 
                  onValueChange={(v) => {
                    setConfigs(prev => prev.map(c => c.id === selectedConfig.id ? { ...c, dataSource: v } : c))
                    setSelectedConfig(prev => prev ? { ...prev, dataSource: v } : null)
                  }}
                  className="mt-2"
                >
                  <TabsList className="grid w-full grid-cols-5 h-auto">
                    {dataSources.map(s => (
                      <TabsTrigger key={s} value={s} className="text-xs px-2 py-1.5">{s}</TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <span>启用同步</span>
                <Switch 
                  checked={selectedConfig.syncStatus} 
                  onCheckedChange={() => {
                    handleToggleSync(selectedConfig.id)
                    setSelectedConfig(prev => prev ? { ...prev, syncStatus: !prev.syncStatus } : null)
                  }} 
                />
              </div>
              <Button 
                className="w-full bg-custom-green hover:bg-custom-green-dark text-white" 
                onClick={() => {
                  toast.success("配置已保存")
                  setShowEditSheet(false)
                }}
              >
                保存
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
