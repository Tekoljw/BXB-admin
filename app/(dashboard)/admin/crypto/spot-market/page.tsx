"use client"

import React, { useState, useMemo } from "react"
import { Plus, RotateCcw, Download, TrendingUp, Info } from "lucide-react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

interface SpotMarket {
  id: string
  name: string
  baseCurrency: string
  quoteCurrency: string
  pricePrecision: number
  quantityPrecision: number
  displayWeight: number
  tradingStatus: "open" | "closed"
  shardGroup: number
  displayLevel: string
  enableOpenAPI: boolean
  allowCancel: boolean
  enableTrading: boolean
  enableRebate: boolean
  takerFeeRate: string
  makerFeeRate: string
  orderBookDepth: number
  priceEnabled: boolean
  priceMax: string
  priceMin: string
  priceStep: string
  quantityEnabled: boolean
  quantityMax: string
  quantityMin: string
  quantityStep: string
  amountEnabled: boolean
  amountMin: string
  openProtection: boolean
  openProtectionSeconds: number
  openProtectionMultiplier: number
  limitProtection: boolean
  limitBuyDeviation: string
  limitSellDeviation: string
  marketProtection: boolean
  marketDeviation: string
}

const mockMarkets: SpotMarket[] = [
  { id: "9432", name: "ubn_usdt", baseCurrency: "UBN", quoteCurrency: "USDT", pricePrecision: 4, quantityPrecision: 4, displayWeight: 100, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9431", name: "ubc_usdt", baseCurrency: "UBC", quoteCurrency: "USDT", pricePrecision: 4, quantityPrecision: 4, displayWeight: 1, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9430", name: "ubx_usdt", baseCurrency: "UBX", quoteCurrency: "USDT", pricePrecision: 4, quantityPrecision: 4, displayWeight: 1, tradingStatus: "closed", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: false, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9429", name: "ab_usdt", baseCurrency: "AB", quoteCurrency: "USDT", pricePrecision: 4, quantityPrecision: 2, displayWeight: 3, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9428", name: "gcgl_usdt", baseCurrency: "GCGL", quoteCurrency: "USDT", pricePrecision: 3, quantityPrecision: 3, displayWeight: 0, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9427", name: "busd_btc", baseCurrency: "BUSD", quoteCurrency: "BTC", pricePrecision: 2, quantityPrecision: 2, displayWeight: 1, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9426", name: "sand_eth", baseCurrency: "SAND", quoteCurrency: "ETH", pricePrecision: 2, quantityPrecision: 2, displayWeight: 1, tradingStatus: "open", shardGroup: 87, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9425", name: "btc_usdt", baseCurrency: "BTC", quoteCurrency: "USDT", pricePrecision: 2, quantityPrecision: 6, displayWeight: 99, tradingStatus: "open", shardGroup: 1, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.001", makerFeeRate: "0.001", orderBookDepth: 10, priceEnabled: true, priceMax: "100000", priceMin: "10000", priceStep: "0.01", quantityEnabled: true, quantityMax: "100", quantityMin: "0.0001", quantityStep: "0.0001", amountEnabled: true, amountMin: "10", openProtection: true, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: true, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: true, marketDeviation: "0.1" },
  { id: "9424", name: "eth_usdt", baseCurrency: "ETH", quoteCurrency: "USDT", pricePrecision: 2, quantityPrecision: 5, displayWeight: 98, tradingStatus: "open", shardGroup: 1, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.001", makerFeeRate: "0.001", orderBookDepth: 10, priceEnabled: true, priceMax: "10000", priceMin: "1000", priceStep: "0.01", quantityEnabled: true, quantityMax: "1000", quantityMin: "0.001", quantityStep: "0.001", amountEnabled: true, amountMin: "10", openProtection: true, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: true, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: true, marketDeviation: "0.1" },
  { id: "9423", name: "bnb_usdt", baseCurrency: "BNB", quoteCurrency: "USDT", pricePrecision: 2, quantityPrecision: 4, displayWeight: 95, tradingStatus: "open", shardGroup: 2, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.001", makerFeeRate: "0.001", orderBookDepth: 8, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9422", name: "sol_usdt", baseCurrency: "SOL", quoteCurrency: "USDT", pricePrecision: 2, quantityPrecision: 3, displayWeight: 90, tradingStatus: "open", shardGroup: 2, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.001", makerFeeRate: "0.001", orderBookDepth: 8, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
  { id: "9421", name: "doge_usdt", baseCurrency: "DOGE", quoteCurrency: "USDT", pricePrecision: 6, quantityPrecision: 0, displayWeight: 80, tradingStatus: "open", shardGroup: 3, displayLevel: "full", enableOpenAPI: true, allowCancel: true, enableTrading: true, enableRebate: true, takerFeeRate: "0.002", makerFeeRate: "0.002", orderBookDepth: 5, priceEnabled: false, priceMax: "", priceMin: "", priceStep: "", quantityEnabled: false, quantityMax: "", quantityMin: "", quantityStep: "", amountEnabled: false, amountMin: "", openProtection: false, openProtectionSeconds: 300, openProtectionMultiplier: 5, limitProtection: false, limitBuyDeviation: "0.8", limitSellDeviation: "0.8", marketProtection: false, marketDeviation: "0.1" },
]

export default function SpotMarketManagementPage() {
  const [markets, setMarkets] = useState<SpotMarket[]>(mockMarkets)
  const [marketFilter, setMarketFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditSheet, setShowEditSheet] = useState(false)
  const [showConfigSheet, setShowConfigSheet] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState<SpotMarket | null>(null)
  const [editingMarket, setEditingMarket] = useState<Partial<SpotMarket>>({})
  const [editTab, setEditTab] = useState("public")
  const [googleCode, setGoogleCode] = useState("")
  const [newMarket, setNewMarket] = useState<Partial<SpotMarket>>({
    name: "",
    baseCurrency: "",
    quoteCurrency: "USDT",
    pricePrecision: 4,
    quantityPrecision: 4,
    displayWeight: 0,
    tradingStatus: "open",
    shardGroup: 1,
    displayLevel: "full",
  })

  const quoteCurrencies = useMemo(() => {
    const currencies = new Set(markets.map(m => m.quoteCurrency))
    return Array.from(currencies).sort()
  }, [markets])

  const filteredMarkets = useMemo(() => {
    return markets.filter(market => {
      const matchesMarket = marketFilter === "all" || market.quoteCurrency === marketFilter
      const matchesStatus = statusFilter === "all" || market.tradingStatus === statusFilter
      return matchesMarket && matchesStatus
    })
  }, [markets, marketFilter, statusFilter])

  const handleReset = () => {
    setMarketFilter("all")
    setStatusFilter("all")
  }

  const handleAddMarket = () => {
    if (!newMarket.baseCurrency || !newMarket.quoteCurrency) {
      toast.error("请填写完整信息", { description: "标的币种和报价币种为必填项" })
      return
    }

    const market: SpotMarket = {
      id: String(Date.now()),
      name: `${newMarket.baseCurrency?.toLowerCase()}_${newMarket.quoteCurrency?.toLowerCase()}`,
      baseCurrency: newMarket.baseCurrency!.toUpperCase(),
      quoteCurrency: newMarket.quoteCurrency!.toUpperCase(),
      pricePrecision: newMarket.pricePrecision || 4,
      quantityPrecision: newMarket.quantityPrecision || 4,
      displayWeight: newMarket.displayWeight || 0,
      tradingStatus: newMarket.tradingStatus || "open",
      shardGroup: newMarket.shardGroup || 1,
      displayLevel: newMarket.displayLevel || "full",
      enableOpenAPI: true,
      allowCancel: true,
      enableTrading: true,
      enableRebate: true,
      takerFeeRate: "0.002",
      makerFeeRate: "0.002",
      orderBookDepth: 5,
      priceEnabled: false,
      priceMax: "",
      priceMin: "",
      priceStep: "",
      quantityEnabled: false,
      quantityMax: "",
      quantityMin: "",
      quantityStep: "",
      amountEnabled: false,
      amountMin: "",
      openProtection: false,
      openProtectionSeconds: 300,
      openProtectionMultiplier: 5,
      limitProtection: false,
      limitBuyDeviation: "0.8",
      limitSellDeviation: "0.8",
      marketProtection: false,
      marketDeviation: "0.1",
    }

    setMarkets(prev => [market, ...prev])
    setNewMarket({
      name: "",
      baseCurrency: "",
      quoteCurrency: "USDT",
      pricePrecision: 4,
      quantityPrecision: 4,
      displayWeight: 0,
      tradingStatus: "open",
      shardGroup: 1,
      displayLevel: "full",
    })
    setShowAddDialog(false)
    toast.success("市场已添加", { description: `${market.name} 已成功创建` })
  }

  const handleEdit = (market: SpotMarket) => {
    setSelectedMarket(market)
    setEditingMarket({ ...market })
    setEditTab("public")
    setGoogleCode("")
    setShowEditSheet(true)
  }

  const handleSaveEdit = () => {
    if (!selectedMarket) return
    if (!googleCode) {
      toast.error("请输入谷歌验证码")
      return
    }
    setMarkets(prev => prev.map(m => 
      m.id === selectedMarket.id ? { ...m, ...editingMarket } as SpotMarket : m
    ))
    setShowEditSheet(false)
    setGoogleCode("")
    toast.success("市场已更新", { description: `${selectedMarket.name} 配置已保存` })
  }

  const handleOpenConfig = (market: SpotMarket) => {
    setSelectedMarket(market)
    setEditingMarket({ ...market })
    setShowConfigSheet(true)
  }

  const handleSaveConfig = () => {
    if (!selectedMarket) return
    setMarkets(prev => prev.map(m => 
      m.id === selectedMarket.id ? { ...m, ...editingMarket } as SpotMarket : m
    ))
    setShowConfigSheet(false)
    toast.success("开盘配置已保存", { description: `${selectedMarket.name} 交易参数已更新` })
  }

  const handleExport = () => {
    toast.success("导出成功", { description: "市场数据已导出为CSV文件" })
  }

  const LabelWithInfo = ({ label, hasInfo = false }: { label: string; hasInfo?: boolean }) => (
    <div className="flex items-center gap-1 mb-2">
      <span className="text-red-500">*</span>
      <Label>{label}</Label>
      {hasInfo && <Info className="h-3 w-3 text-gray-400" />}
    </div>
  )

  const SectionHeader = ({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: (v: boolean) => void }) => (
    <div className="flex items-center gap-2 py-2 border-b border-gray-200 dark:border-gray-700">
      <div className="w-1 h-4 bg-amber-500 rounded"></div>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
      <Switch checked={enabled} onCheckedChange={onToggle} className="ml-2" />
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">现货市场管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理现货交易市场、交易对和开盘配置
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">市场</Label>
            <Select value={marketFilter} onValueChange={setMarketFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                {quoteCurrencies.map(currency => (
                  <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">开盘状态</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="open">开盘</SelectItem>
                <SelectItem value="closed">停盘</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              重置
            </Button>
            <Button 
              className="bg-custom-green hover:bg-custom-green-dark text-white"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              添加
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">市场ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">市场名称</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">标的币种</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">报价币种</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">交易价格精度</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">交易数量精度</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">展示权重</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">开盘状态</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMarkets.map((market) => (
                <tr key={market.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{market.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{market.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">{market.baseCurrency.toLowerCase()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">{market.quoteCurrency.toLowerCase()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{market.pricePrecision}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{market.quantityPrecision}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{market.displayWeight}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      market.tradingStatus === "open" 
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                    }`}>
                      {market.tradingStatus === "open" ? "开盘" : "停盘"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(market)} className="h-7 text-xs">
                        编辑
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleOpenConfig(market)} className="h-7 text-xs text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300">
                        开盘配置
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-16">
            <TrendingUp className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">未找到市场</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">尝试调整筛选条件</p>
          </div>
        )}

        {filteredMarkets.length > 0 && <DataTotal total={filteredMarkets.length} />}
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>添加市场</DialogTitle>
            <DialogDescription>创建新的现货交易市场</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>标的币种</Label>
                <Input placeholder="如：BTC" value={newMarket.baseCurrency || ""} onChange={(e) => setNewMarket({ ...newMarket, baseCurrency: e.target.value.toUpperCase() })} className="mt-2" />
              </div>
              <div>
                <Label>报价币种</Label>
                <Select value={newMarket.quoteCurrency || "USDT"} onValueChange={(value) => setNewMarket({ ...newMarket, quoteCurrency: value })}>
                  <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>交易价格精度</Label>
                <Input type="number" value={newMarket.pricePrecision || 4} onChange={(e) => setNewMarket({ ...newMarket, pricePrecision: parseInt(e.target.value) })} className="mt-2" />
              </div>
              <div>
                <Label>交易数量精度</Label>
                <Input type="number" value={newMarket.quantityPrecision || 4} onChange={(e) => setNewMarket({ ...newMarket, quantityPrecision: parseInt(e.target.value) })} className="mt-2" />
              </div>
            </div>
            <div>
              <Label>展示权重</Label>
              <Input type="number" value={newMarket.displayWeight || 0} onChange={(e) => setNewMarket({ ...newMarket, displayWeight: parseInt(e.target.value) })} className="mt-2" />
            </div>
            <div className="pt-4 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddDialog(false)}>取消</Button>
              <Button className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white" onClick={handleAddMarket}>确认添加</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>修改市场</SheetTitle>
          </SheetHeader>
          {selectedMarket && (
            <div className="mt-4">
              <Tabs value={editTab} onValueChange={setEditTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="public">公共</TabsTrigger>
                  <TabsTrigger value="basic">基本配置</TabsTrigger>
                  <TabsTrigger value="trading">交易配置</TabsTrigger>
                  <TabsTrigger value="limits">交易限制</TabsTrigger>
                </TabsList>

                <TabsContent value="public" className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>市场ID</Label></div>
                      <Input value={editingMarket.id || ""} disabled className="bg-gray-50 dark:bg-gray-800" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>市场名称</Label></div>
                      <Input value={editingMarket.name || ""} disabled className="bg-gray-50 dark:bg-gray-800" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>标的币种</Label></div>
                      <Input value={editingMarket.baseCurrency || ""} disabled className="bg-gray-50 dark:bg-gray-800" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>报价币种</Label></div>
                      <Input value={editingMarket.quoteCurrency || ""} disabled className="bg-gray-50 dark:bg-gray-800" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-2"><Label>开盘状态</Label></div>
                      <Input value={editingMarket.openStatus === "开盘" ? "开盘" : "停盘"} disabled className="bg-gray-50 dark:bg-gray-800" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><Label>创建时间</Label></div>
                      <Input value="2024-01-15 10:30:00" disabled className="bg-gray-50 dark:bg-gray-800" />
                    </div>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                    <p className="text-sm text-amber-700 dark:text-amber-300">公共信息为系统自动生成，不可修改</p>
                  </div>
                </TabsContent>

                <TabsContent value="basic" className="mt-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>标的币种</Label></div>
                      <Select value={editingMarket.baseCurrency?.toLowerCase() || ""} disabled>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value={editingMarket.baseCurrency?.toLowerCase() || ""}>{editingMarket.baseCurrency?.toLowerCase()}</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>报价币种</Label></div>
                      <Select value={editingMarket.quoteCurrency?.toLowerCase() || ""} disabled>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value={editingMarket.quoteCurrency?.toLowerCase() || ""}>{editingMarket.quoteCurrency?.toLowerCase()}</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>分片组</Label></div>
                      <Input type="number" value={editingMarket.shardGroup || 0} onChange={(e) => setEditingMarket({ ...editingMarket, shardGroup: parseInt(e.target.value) })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>交易数量精度</Label></div>
                      <Input type="number" value={editingMarket.quantityPrecision || 0} onChange={(e) => setEditingMarket({ ...editingMarket, quantityPrecision: parseInt(e.target.value) })} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>交易价格精度</Label></div>
                      <Input type="number" value={editingMarket.pricePrecision || 0} onChange={(e) => setEditingMarket({ ...editingMarket, pricePrecision: parseInt(e.target.value) })} />
                    </div>
                    <div>
                      <LabelWithInfo label="展示权重" hasInfo />
                      <Input type="number" value={editingMarket.displayWeight || 0} onChange={(e) => setEditingMarket({ ...editingMarket, displayWeight: parseInt(e.target.value) })} className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <LabelWithInfo label="显示级别" hasInfo />
                    <Select value={editingMarket.displayLevel || "full"} onValueChange={(value) => setEditingMarket({ ...editingMarket, displayLevel: value })}>
                      <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">完全展示</SelectItem>
                        <SelectItem value="partial">部分展示</SelectItem>
                        <SelectItem value="hidden">隐藏</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>谷歌验证码</Label></div>
                    <Input placeholder="谷歌验证码" value={googleCode} onChange={(e) => setGoogleCode(e.target.value)} />
                  </div>
                </TabsContent>

                <TabsContent value="trading" className="mt-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <LabelWithInfo label="启用OPENAPI[false=否;true=是]" hasInfo />
                      <Select value={editingMarket.enableOpenAPI ? "是" : "否"} onValueChange={(v) => setEditingMarket({ ...editingMarket, enableOpenAPI: v === "是" })}>
                        <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="是">是</SelectItem><SelectItem value="否">否</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>允许撤单[false=否;true=是]</Label></div>
                      <Select value={editingMarket.allowCancel ? "是" : "否"} onValueChange={(v) => setEditingMarket({ ...editingMarket, allowCancel: v === "是" })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="是">是</SelectItem><SelectItem value="否">否</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>启用交易[false=否;true=是]</Label></div>
                      <Select value={editingMarket.enableTrading ? "是" : "否"} onValueChange={(v) => setEditingMarket({ ...editingMarket, enableTrading: v === "是" })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="是">是</SelectItem><SelectItem value="否">否</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>启用返佣[false=否;true=是]</Label></div>
                      <Select value={editingMarket.enableRebate ? "是" : "否"} onValueChange={(v) => setEditingMarket({ ...editingMarket, enableRebate: v === "是" })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="是">是</SelectItem><SelectItem value="否">否</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div>
                      <LabelWithInfo label="taker手续费率" hasInfo />
                      <Input value={editingMarket.takerFeeRate || ""} onChange={(e) => setEditingMarket({ ...editingMarket, takerFeeRate: e.target.value })} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>maker手续费率</Label></div>
                      <Input value={editingMarket.makerFeeRate || ""} onChange={(e) => setEditingMarket({ ...editingMarket, makerFeeRate: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>盘口合并深度</Label></div>
                    <Input type="number" value={editingMarket.orderBookDepth || 5} onChange={(e) => setEditingMarket({ ...editingMarket, orderBookDepth: parseInt(e.target.value) })} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-2"><span className="text-red-500">*</span><Label>谷歌验证码</Label></div>
                    <Input placeholder="谷歌验证码" value={googleCode} onChange={(e) => setGoogleCode(e.target.value)} />
                  </div>
                </TabsContent>

                <TabsContent value="limits" className="mt-4 space-y-4">
                  <SectionHeader label="价格" enabled={editingMarket.priceEnabled || false} onToggle={(v) => setEditingMarket({ ...editingMarket, priceEnabled: v })} />
                  <div className="grid grid-cols-3 gap-4">
                    <div><Label className="text-sm">最大值</Label><Input placeholder="请输入" value={editingMarket.priceMax || ""} onChange={(e) => setEditingMarket({ ...editingMarket, priceMax: e.target.value })} disabled={!editingMarket.priceEnabled} className="mt-1" /></div>
                    <div><Label className="text-sm">最小值</Label><Input placeholder="请输入" value={editingMarket.priceMin || ""} onChange={(e) => setEditingMarket({ ...editingMarket, priceMin: e.target.value })} disabled={!editingMarket.priceEnabled} className="mt-1" /></div>
                    <div><LabelWithInfo label="步进值" hasInfo /><Input placeholder="请输入" value={editingMarket.priceStep || ""} onChange={(e) => setEditingMarket({ ...editingMarket, priceStep: e.target.value })} disabled={!editingMarket.priceEnabled} className="mt-1" /></div>
                  </div>

                  <SectionHeader label="数量" enabled={editingMarket.quantityEnabled || false} onToggle={(v) => setEditingMarket({ ...editingMarket, quantityEnabled: v })} />
                  <div className="grid grid-cols-3 gap-4">
                    <div><Label className="text-sm">最大值</Label><Input placeholder="请输入" value={editingMarket.quantityMax || ""} onChange={(e) => setEditingMarket({ ...editingMarket, quantityMax: e.target.value })} disabled={!editingMarket.quantityEnabled} className="mt-1" /></div>
                    <div><Label className="text-sm">最小值</Label><Input placeholder="请输入" value={editingMarket.quantityMin || ""} onChange={(e) => setEditingMarket({ ...editingMarket, quantityMin: e.target.value })} disabled={!editingMarket.quantityEnabled} className="mt-1" /></div>
                    <div><LabelWithInfo label="步进值" hasInfo /><Input placeholder="请输入" value={editingMarket.quantityStep || ""} onChange={(e) => setEditingMarket({ ...editingMarket, quantityStep: e.target.value })} disabled={!editingMarket.quantityEnabled} className="mt-1" /></div>
                  </div>

                  <SectionHeader label="金额" enabled={editingMarket.amountEnabled || false} onToggle={(v) => setEditingMarket({ ...editingMarket, amountEnabled: v })} />
                  <div><Label className="text-sm">最小值</Label><Input placeholder="请输入" value={editingMarket.amountMin || ""} onChange={(e) => setEditingMarket({ ...editingMarket, amountMin: e.target.value })} disabled={!editingMarket.amountEnabled} className="mt-1" /></div>

                  <SectionHeader label="开盘保护" enabled={editingMarket.openProtection || false} onToggle={(v) => setEditingMarket({ ...editingMarket, openProtection: v })} />
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label className="text-sm">开盘后持续秒数</Label><Input type="number" value={editingMarket.openProtectionSeconds || 300} onChange={(e) => setEditingMarket({ ...editingMarket, openProtectionSeconds: parseInt(e.target.value) })} disabled={!editingMarket.openProtection} className="mt-1" /></div>
                    <div><Label className="text-sm">最大价格倍数</Label><Input type="number" value={editingMarket.openProtectionMultiplier || 5} onChange={(e) => setEditingMarket({ ...editingMarket, openProtectionMultiplier: parseInt(e.target.value) })} disabled={!editingMarket.openProtection} className="mt-1" /></div>
                  </div>

                  <SectionHeader label="限价保护" enabled={editingMarket.limitProtection || false} onToggle={(v) => setEditingMarket({ ...editingMarket, limitProtection: v })} />
                  <div className="grid grid-cols-2 gap-4">
                    <div><LabelWithInfo label="买单最大偏离度" hasInfo /><Input value={editingMarket.limitBuyDeviation || ""} onChange={(e) => setEditingMarket({ ...editingMarket, limitBuyDeviation: e.target.value })} disabled={!editingMarket.limitProtection} className="mt-1" /></div>
                    <div><LabelWithInfo label="卖单最大偏离度" hasInfo /><Input value={editingMarket.limitSellDeviation || ""} onChange={(e) => setEditingMarket({ ...editingMarket, limitSellDeviation: e.target.value })} disabled={!editingMarket.limitProtection} className="mt-1" /></div>
                  </div>

                  <SectionHeader label="市价保护" enabled={editingMarket.marketProtection || false} onToggle={(v) => setEditingMarket({ ...editingMarket, marketProtection: v })} />
                  <div><Label className="text-sm">最大偏离度</Label><Input value={editingMarket.marketDeviation || ""} onChange={(e) => setEditingMarket({ ...editingMarket, marketDeviation: e.target.value })} disabled={!editingMarket.marketProtection} className="mt-1" /></div>
                </TabsContent>
              </Tabs>

              <div className="pt-6 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowEditSheet(false)}>取消</Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSaveEdit}>提交</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={showConfigSheet} onOpenChange={setShowConfigSheet}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>开盘配置</SheetTitle>
          </SheetHeader>
          {selectedMarket && (
            <div className="mt-6 space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">市场：<span className="font-medium">{selectedMarket.name}</span></p>
              </div>
              <div className="flex items-center justify-between">
                <Label>开盘状态</Label>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${editingMarket.tradingStatus === "open" ? "text-green-600" : "text-gray-500"}`}>
                    {editingMarket.tradingStatus === "open" ? "开盘中" : "已停盘"}
                  </span>
                  <Switch checked={editingMarket.tradingStatus === "open"} onCheckedChange={(checked) => setEditingMarket({ ...editingMarket, tradingStatus: checked ? "open" : "closed" })} />
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <Button className="w-full bg-custom-green hover:bg-custom-green-dark text-white" onClick={handleSaveConfig}>保存配置</Button>
                <Button variant="outline" className="w-full" onClick={() => setShowConfigSheet(false)}>取消</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
