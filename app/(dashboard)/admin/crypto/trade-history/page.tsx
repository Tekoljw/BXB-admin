"use client"

import React, { useState, useMemo } from "react"
import { Search, Download, RotateCcw, Eye, TrendingUp, TrendingDown, ArrowUpDown } from "lucide-react"
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

interface Trade {
  id: string
  orderId: string
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
  { id: "T001", orderId: "ORD001", uid: "100001", username: "用户A", market: "BTC/USDT", side: "buy", price: "42500.00", quantity: "0.1", amount: "4250.00", fee: "4.25", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 10:35:01" },
  { id: "T002", orderId: "ORD001", uid: "100001", username: "用户A", market: "BTC/USDT", side: "buy", price: "42498.50", quantity: "0.2", amount: "8499.70", fee: "8.50", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 10:35:00" },
  { id: "T003", orderId: "ORD002", uid: "100002", username: "用户B", market: "ETH/USDT", side: "sell", price: "2250.00", quantity: "5.0", amount: "11250.00", fee: "11.25", feeCurrency: "USDT", role: "maker", tradeTime: "2025-01-07 10:32:15" },
  { id: "T004", orderId: "ORD003", uid: "100003", username: "用户C", market: "BNB/USDT", side: "buy", price: "312.50", quantity: "10", amount: "3125.00", fee: "3.12", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 10:25:01" },
  { id: "T005", orderId: "ORD006", uid: "100001", username: "用户A", market: "DOGE/USDT", side: "buy", price: "0.0850", quantity: "5000", amount: "425.00", fee: "0.43", feeCurrency: "USDT", role: "maker", tradeTime: "2025-01-07 10:12:30" },
  { id: "T006", orderId: "ORD007", uid: "100006", username: "用户F", market: "XRP/USDT", side: "sell", price: "0.6200", quantity: "2000", amount: "1240.00", fee: "1.24", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 10:08:45" },
  { id: "T007", orderId: "ORD009", uid: "100008", username: "用户H", market: "SOL/USDT", side: "buy", price: "95.80", quantity: "20", amount: "1916.00", fee: "1.92", feeCurrency: "USDT", role: "maker", tradeTime: "2025-01-07 10:05:22" },
  { id: "T008", orderId: "ORD010", uid: "100009", username: "用户I", market: "BTC/USDT", side: "sell", price: "42510.00", quantity: "0.5", amount: "21255.00", fee: "21.26", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 10:02:10" },
  { id: "T009", orderId: "ORD011", uid: "100010", username: "用户J", market: "ETH/USDT", side: "buy", price: "2248.00", quantity: "3.0", amount: "6744.00", fee: "6.74", feeCurrency: "USDT", role: "maker", tradeTime: "2025-01-07 09:58:33" },
  { id: "T010", orderId: "ORD012", uid: "100011", username: "用户K", market: "AVAX/USDT", side: "sell", price: "35.20", quantity: "100", amount: "3520.00", fee: "3.52", feeCurrency: "USDT", role: "taker", tradeTime: "2025-01-07 09:55:18" },
]

export default function TradeHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sideFilter, setSideFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [marketType, setMarketType] = useState<"spot" | "leverage">("spot")
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null)
  const [showDetailSheet, setShowDetailSheet] = useState(false)

  const filteredTrades = useMemo(() => {
    return mockTrades.filter(trade => {
      const matchesSearch = !searchQuery || 
        trade.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trade.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索成交ID/订单ID/用户ID/用户名/交易对..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
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
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="角色" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部角色</SelectItem>
            <SelectItem value="maker">Maker</SelectItem>
            <SelectItem value="taker">Taker</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">成交ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">订单ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">用户</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">交易对</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">方向</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">价格</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">数量</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">金额</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">手续费</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">角色</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">成交时间</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTrades.map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{trade.id}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{trade.orderId}</td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900 dark:text-white">{trade.username}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{trade.uid}</div>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{trade.market}</td>
                <td className="px-4 py-3 text-sm">{getSideBadge(trade.side)}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">{trade.price}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">{trade.quantity}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-gray-900 dark:text-white">${trade.amount}</td>
                <td className="px-4 py-3 text-sm text-right text-gray-500 dark:text-gray-400">{trade.fee} {trade.feeCurrency}</td>
                <td className="px-4 py-3 text-center">{getRoleBadge(trade.role)}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{trade.tradeTime}</td>
                <td className="px-4 py-3">
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
                  <Label className="text-xs text-gray-500">订单ID</Label>
                  <p className="font-medium">{selectedTrade.orderId}</p>
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
    </div>
  )
}
