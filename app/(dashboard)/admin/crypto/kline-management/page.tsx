"use client"

import React, { useState, useMemo } from "react"
import { Search, Download, RotateCcw, Edit2, TrendingUp, BarChart3, Settings, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTotal } from "@/components/data-total"
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
  dataSource: string
  syncStatus: boolean
  lastSyncTime: string
  dataCount: number
  quality: "excellent" | "good" | "poor"
}

const mockKlineConfigs: KlineConfig[] = [
  { id: "K001", market: "BTC/USDT", interval: "1m", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:30:00", dataCount: 525600, quality: "excellent" },
  { id: "K002", market: "BTC/USDT", interval: "5m", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:30:00", dataCount: 105120, quality: "excellent" },
  { id: "K003", market: "BTC/USDT", interval: "1h", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:00:00", dataCount: 8760, quality: "excellent" },
  { id: "K004", market: "ETH/USDT", interval: "1m", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:30:00", dataCount: 525600, quality: "excellent" },
  { id: "K005", market: "ETH/USDT", interval: "5m", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:30:00", dataCount: 105120, quality: "good" },
  { id: "K006", market: "BNB/USDT", interval: "1m", dataSource: "OKX", syncStatus: false, lastSyncTime: "2025-01-07 09:00:00", dataCount: 480000, quality: "poor" },
  { id: "K007", market: "SOL/USDT", interval: "1m", dataSource: "Binance", syncStatus: true, lastSyncTime: "2025-01-07 10:29:00", dataCount: 200000, quality: "good" },
  { id: "K008", market: "DOGE/USDT", interval: "15m", dataSource: "OKX", syncStatus: true, lastSyncTime: "2025-01-07 10:15:00", dataCount: 35040, quality: "excellent" },
]

const intervals = ["1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"]
const dataSources = ["Binance", "OKX", "Huobi", "Bybit", "自有数据"]

export default function KlineManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [intervalFilter, setIntervalFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [configs, setConfigs] = useState(mockKlineConfigs)
  const [selectedConfig, setSelectedConfig] = useState<KlineConfig | null>(null)
  const [showEditSheet, setShowEditSheet] = useState(false)
  const [showAddSheet, setShowAddSheet] = useState(false)
  const [newConfig, setNewConfig] = useState({ market: "", interval: "1m", dataSource: "Binance" })

  const filteredConfigs = useMemo(() => {
    return configs.filter(config => {
      const matchesSearch = !searchQuery || config.market.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesInterval = intervalFilter === "all" || config.interval === intervalFilter
      const matchesSource = sourceFilter === "all" || config.dataSource === sourceFilter
      return matchesSearch && matchesInterval && matchesSource
    })
  }, [configs, searchQuery, intervalFilter, sourceFilter])

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
      dataSource: newConfig.dataSource,
      syncStatus: true,
      lastSyncTime: new Date().toLocaleString("zh-CN"),
      dataCount: 0,
      quality: "good" as const,
    }])
    setNewConfig({ market: "", interval: "1m", dataSource: "Binance" })
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

      <DataTotal items={[
        { label: "总配置", value: configs.length.toString() },
        { label: "同步中", value: configs.filter(c => c.syncStatus).length.toString() },
        { label: "数据源", value: [...new Set(configs.map(c => c.dataSource))].length.toString() },
        { label: "交易对", value: [...new Set(configs.map(c => c.market))].length.toString() },
      ]} />

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索交易对..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={intervalFilter} onValueChange={setIntervalFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="周期" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部周期</SelectItem>
            {intervals.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="数据源" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部数据源</SelectItem>
            {dataSources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">交易对</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">周期</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">数据源</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">数据量</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">质量</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">最后同步</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">同步</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredConfigs.map((config) => (
              <tr key={config.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{config.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-custom-green" />
                    <span className="font-medium text-gray-900 dark:text-white">{config.market}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium">{config.interval}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{config.dataSource}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">{config.dataCount.toLocaleString()}</td>
                <td className="px-4 py-3 text-center">{getQualityBadge(config.quality)}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{config.lastSyncTime}</td>
                <td className="px-4 py-3 text-center">
                  <Switch checked={config.syncStatus} onCheckedChange={() => handleToggleSync(config.id)} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => { setSelectedConfig(config); setShowEditSheet(true) }}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-700" onClick={() => {
                      setConfigs(prev => prev.filter(c => c.id !== config.id))
                      toast.success("已删除")
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
              <Select value={newConfig.dataSource} onValueChange={(v) => setNewConfig(prev => ({ ...prev, dataSource: v }))}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dataSources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
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
                <Select 
                  value={selectedConfig.dataSource} 
                  onValueChange={(v) => {
                    setConfigs(prev => prev.map(c => c.id === selectedConfig.id ? { ...c, dataSource: v } : c))
                    setSelectedConfig(prev => prev ? { ...prev, dataSource: v } : null)
                  }}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dataSources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
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
