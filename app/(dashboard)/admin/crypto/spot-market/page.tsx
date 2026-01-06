"use client"

import React, { useState, useMemo } from "react"
import { Plus, Search, RotateCcw, Download, Edit2, Settings, TrendingUp } from "lucide-react"
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
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
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
  minOrderAmount: string
  maxOrderAmount: string
  makerFee: string
  takerFee: string
}

const mockMarkets: SpotMarket[] = [
  { id: "9432", name: "ubn_usdt", baseCurrency: "UBN", quoteCurrency: "USDT", pricePrecision: 4, quantityPrecision: 4, displayWeight: 100, tradingStatus: "open", minOrderAmount: "10", maxOrderAmount: "1000000", makerFee: "0.1", takerFee: "0.1" },
  { id: "9431", name: "ubc_usdt", baseCurrency: "UBC", quoteCurrency: "USDT", pricePrecision: 4, quantityPrecision: 4, displayWeight: 1, tradingStatus: "open", minOrderAmount: "10", maxOrderAmount: "1000000", makerFee: "0.1", takerFee: "0.1" },
  { id: "9430", name: "ubx_usdt", baseCurrency: "UBX", quoteCurrency: "USDT", pricePrecision: 4, quantityPrecision: 4, displayWeight: 1, tradingStatus: "closed", minOrderAmount: "10", maxOrderAmount: "1000000", makerFee: "0.1", takerFee: "0.1" },
  { id: "9429", name: "ab_usdt", baseCurrency: "AB", quoteCurrency: "USDT", pricePrecision: 4, quantityPrecision: 2, displayWeight: 3, tradingStatus: "open", minOrderAmount: "10", maxOrderAmount: "1000000", makerFee: "0.1", takerFee: "0.1" },
  { id: "9428", name: "gcgl_usdt", baseCurrency: "GCGL", quoteCurrency: "USDT", pricePrecision: 3, quantityPrecision: 3, displayWeight: 0, tradingStatus: "open", minOrderAmount: "10", maxOrderAmount: "1000000", makerFee: "0.1", takerFee: "0.1" },
  { id: "9427", name: "busd_btc", baseCurrency: "BUSD", quoteCurrency: "BTC", pricePrecision: 2, quantityPrecision: 2, displayWeight: 1, tradingStatus: "open", minOrderAmount: "10", maxOrderAmount: "1000000", makerFee: "0.1", takerFee: "0.1" },
  { id: "9426", name: "sand_eth", baseCurrency: "SAND", quoteCurrency: "ETH", pricePrecision: 2, quantityPrecision: 2, displayWeight: 1, tradingStatus: "open", minOrderAmount: "10", maxOrderAmount: "1000000", makerFee: "0.1", takerFee: "0.1" },
  { id: "9425", name: "btc_usdt", baseCurrency: "BTC", quoteCurrency: "USDT", pricePrecision: 2, quantityPrecision: 6, displayWeight: 99, tradingStatus: "open", minOrderAmount: "10", maxOrderAmount: "10000000", makerFee: "0.08", takerFee: "0.1" },
  { id: "9424", name: "eth_usdt", baseCurrency: "ETH", quoteCurrency: "USDT", pricePrecision: 2, quantityPrecision: 5, displayWeight: 98, tradingStatus: "open", minOrderAmount: "10", maxOrderAmount: "5000000", makerFee: "0.08", takerFee: "0.1" },
  { id: "9423", name: "bnb_usdt", baseCurrency: "BNB", quoteCurrency: "USDT", pricePrecision: 2, quantityPrecision: 4, displayWeight: 95, tradingStatus: "open", minOrderAmount: "10", maxOrderAmount: "2000000", makerFee: "0.1", takerFee: "0.1" },
  { id: "9422", name: "sol_usdt", baseCurrency: "SOL", quoteCurrency: "USDT", pricePrecision: 2, quantityPrecision: 3, displayWeight: 90, tradingStatus: "open", minOrderAmount: "10", maxOrderAmount: "1000000", makerFee: "0.1", takerFee: "0.1" },
  { id: "9421", name: "doge_usdt", baseCurrency: "DOGE", quoteCurrency: "USDT", pricePrecision: 6, quantityPrecision: 0, displayWeight: 80, tradingStatus: "open", minOrderAmount: "100", maxOrderAmount: "10000000", makerFee: "0.1", takerFee: "0.1" },
]

export default function SpotMarketManagementPage() {
  const [markets, setMarkets] = useState<SpotMarket[]>(mockMarkets)
  const [marketFilter, setMarketFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditSheet, setShowEditSheet] = useState(false)
  const [showConfigSheet, setShowConfigSheet] = useState(false)
  const [selectedMarket, setSelectedMarket] = useState<SpotMarket | null>(null)
  const [editingMarket, setEditingMarket] = useState<Partial<SpotMarket>>({})
  const [newMarket, setNewMarket] = useState<Partial<SpotMarket>>({
    name: "",
    baseCurrency: "",
    quoteCurrency: "USDT",
    pricePrecision: 4,
    quantityPrecision: 4,
    displayWeight: 0,
    tradingStatus: "open",
    minOrderAmount: "10",
    maxOrderAmount: "1000000",
    makerFee: "0.1",
    takerFee: "0.1",
  })

  const quoteCurrencies = useMemo(() => {
    const currencies = new Set(markets.map(m => m.quoteCurrency))
    return Array.from(currencies).sort()
  }, [markets])

  const filteredMarkets = useMemo(() => {
    return markets.filter(market => {
      const matchesMarket = marketFilter === "all" || market.quoteCurrency === marketFilter
      const matchesStatus = statusFilter === "all" || market.tradingStatus === statusFilter
      const matchesSearch = searchTerm === "" || 
        market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.baseCurrency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.quoteCurrency.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesMarket && matchesStatus && matchesSearch
    })
  }, [markets, marketFilter, statusFilter, searchTerm])

  const handleReset = () => {
    setMarketFilter("all")
    setStatusFilter("all")
    setSearchTerm("")
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
      minOrderAmount: newMarket.minOrderAmount || "10",
      maxOrderAmount: newMarket.maxOrderAmount || "1000000",
      makerFee: newMarket.makerFee || "0.1",
      takerFee: newMarket.takerFee || "0.1",
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
      minOrderAmount: "10",
      maxOrderAmount: "1000000",
      makerFee: "0.1",
      takerFee: "0.1",
    })
    setShowAddDialog(false)
    toast.success("市场已添加", { description: `${market.name} 已成功创建` })
  }

  const handleEdit = (market: SpotMarket) => {
    setSelectedMarket(market)
    setEditingMarket({ ...market })
    setShowEditSheet(true)
  }

  const handleSaveEdit = () => {
    if (!selectedMarket) return
    setMarkets(prev => prev.map(m => 
      m.id === selectedMarket.id ? { ...m, ...editingMarket } as SpotMarket : m
    ))
    setShowEditSheet(false)
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

  const toggleTradingStatus = (id: string) => {
    setMarkets(prev => prev.map(market => {
      if (market.id === id) {
        const newStatus = market.tradingStatus === "open" ? "closed" : "open"
        toast.success(newStatus === "open" ? "已开盘" : "已停盘", {
          description: `${market.name} 交易状态已更新`,
        })
        return { ...market, tradingStatus: newStatus }
      }
      return market
    }))
  }

  const handleExport = () => {
    toast.success("导出成功", { description: "市场数据已导出为CSV文件" })
  }

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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  市场ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  市场名称
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  标的币种
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  报价币种
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  交易价格精度
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  交易数量精度
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  展示权重
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  开盘状态
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMarkets.map((market) => (
                <tr key={market.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {market.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {market.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white font-medium">
                      {market.baseCurrency.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white font-medium">
                      {market.quoteCurrency.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {market.pricePrecision}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {market.quantityPrecision}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {market.displayWeight}
                  </td>
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(market)}
                        className="h-7 text-xs"
                      >
                        编辑
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenConfig(market)}
                        className="h-7 text-xs text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                      >
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

        {filteredMarkets.length > 0 && (
          <DataTotal total={filteredMarkets.length} />
        )}
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>添加市场</DialogTitle>
            <DialogDescription>
              创建新的现货交易市场
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>标的币种</Label>
                <Input
                  placeholder="如：BTC"
                  value={newMarket.baseCurrency || ""}
                  onChange={(e) => setNewMarket({ ...newMarket, baseCurrency: e.target.value.toUpperCase() })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>报价币种</Label>
                <Select
                  value={newMarket.quoteCurrency || "USDT"}
                  onValueChange={(value) => setNewMarket({ ...newMarket, quoteCurrency: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
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
                <Input
                  type="number"
                  value={newMarket.pricePrecision || 4}
                  onChange={(e) => setNewMarket({ ...newMarket, pricePrecision: parseInt(e.target.value) })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>交易数量精度</Label>
                <Input
                  type="number"
                  value={newMarket.quantityPrecision || 4}
                  onChange={(e) => setNewMarket({ ...newMarket, quantityPrecision: parseInt(e.target.value) })}
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label>展示权重</Label>
              <Input
                type="number"
                value={newMarket.displayWeight || 0}
                onChange={(e) => setNewMarket({ ...newMarket, displayWeight: parseInt(e.target.value) })}
                className="mt-2"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>开盘状态</Label>
              <Switch
                checked={newMarket.tradingStatus === "open"}
                onCheckedChange={(checked) => setNewMarket({ ...newMarket, tradingStatus: checked ? "open" : "closed" })}
              />
            </div>
            <div className="pt-4 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowAddDialog(false)}>
                取消
              </Button>
              <Button 
                className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white"
                onClick={handleAddMarket}
              >
                确认添加
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>编辑市场</SheetTitle>
            <SheetDescription>
              修改 {selectedMarket?.name} 的基本信息
            </SheetDescription>
          </SheetHeader>
          {selectedMarket && (
            <div className="mt-6 space-y-4">
              <div>
                <Label>市场ID</Label>
                <Input value={selectedMarket.id} disabled className="mt-2 bg-gray-50 dark:bg-gray-800" />
              </div>
              <div>
                <Label>市场名称</Label>
                <Input value={selectedMarket.name} disabled className="mt-2 bg-gray-50 dark:bg-gray-800" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>标的币种</Label>
                  <Input value={selectedMarket.baseCurrency} disabled className="mt-2 bg-gray-50 dark:bg-gray-800" />
                </div>
                <div>
                  <Label>报价币种</Label>
                  <Input value={selectedMarket.quoteCurrency} disabled className="mt-2 bg-gray-50 dark:bg-gray-800" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>交易价格精度</Label>
                  <Input
                    type="number"
                    value={editingMarket.pricePrecision || 0}
                    onChange={(e) => setEditingMarket({ ...editingMarket, pricePrecision: parseInt(e.target.value) })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>交易数量精度</Label>
                  <Input
                    type="number"
                    value={editingMarket.quantityPrecision || 0}
                    onChange={(e) => setEditingMarket({ ...editingMarket, quantityPrecision: parseInt(e.target.value) })}
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label>展示权重</Label>
                <Input
                  type="number"
                  value={editingMarket.displayWeight || 0}
                  onChange={(e) => setEditingMarket({ ...editingMarket, displayWeight: parseInt(e.target.value) })}
                  className="mt-2"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>开盘状态</Label>
                <Switch
                  checked={editingMarket.tradingStatus === "open"}
                  onCheckedChange={(checked) => setEditingMarket({ ...editingMarket, tradingStatus: checked ? "open" : "closed" })}
                />
              </div>
              <div className="pt-4 space-y-2">
                <Button 
                  className="w-full bg-custom-green hover:bg-custom-green-dark text-white"
                  onClick={handleSaveEdit}
                >
                  保存修改
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowEditSheet(false)}>
                  取消
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={showConfigSheet} onOpenChange={setShowConfigSheet}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>开盘配置</SheetTitle>
            <SheetDescription>
              配置 {selectedMarket?.name} 的交易参数
            </SheetDescription>
          </SheetHeader>
          {selectedMarket && (
            <div className="mt-6 space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  市场：<span className="font-medium">{selectedMarket.name}</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>最小下单金额</Label>
                  <Input
                    value={editingMarket.minOrderAmount || ""}
                    onChange={(e) => setEditingMarket({ ...editingMarket, minOrderAmount: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>最大下单金额</Label>
                  <Input
                    value={editingMarket.maxOrderAmount || ""}
                    onChange={(e) => setEditingMarket({ ...editingMarket, maxOrderAmount: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Maker手续费(%)</Label>
                  <Input
                    value={editingMarket.makerFee || ""}
                    onChange={(e) => setEditingMarket({ ...editingMarket, makerFee: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Taker手续费(%)</Label>
                  <Input
                    value={editingMarket.takerFee || ""}
                    onChange={(e) => setEditingMarket({ ...editingMarket, takerFee: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>价格精度</Label>
                  <Input
                    type="number"
                    value={editingMarket.pricePrecision || 0}
                    onChange={(e) => setEditingMarket({ ...editingMarket, pricePrecision: parseInt(e.target.value) })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>数量精度</Label>
                  <Input
                    type="number"
                    value={editingMarket.quantityPrecision || 0}
                    onChange={(e) => setEditingMarket({ ...editingMarket, quantityPrecision: parseInt(e.target.value) })}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>开盘状态</Label>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${editingMarket.tradingStatus === "open" ? "text-green-600" : "text-gray-500"}`}>
                    {editingMarket.tradingStatus === "open" ? "开盘中" : "已停盘"}
                  </span>
                  <Switch
                    checked={editingMarket.tradingStatus === "open"}
                    onCheckedChange={(checked) => setEditingMarket({ ...editingMarket, tradingStatus: checked ? "open" : "closed" })}
                  />
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <Button 
                  className="w-full bg-custom-green hover:bg-custom-green-dark text-white"
                  onClick={handleSaveConfig}
                >
                  保存配置
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowConfigSheet(false)}>
                  取消
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
