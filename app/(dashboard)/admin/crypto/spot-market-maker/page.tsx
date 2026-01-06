"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Search, Plus, Download, RotateCcw } from "lucide-react"
import { toast } from "sonner"

interface MarketMaker {
  id: string
  makerId: string
  role: string
  marketName: string
  makerFeeDiscount: number
  takerFeeDiscount: number
  effectiveTime: string
  enabled: boolean
}

const mockMarketMakers: MarketMaker[] = [
  {
    id: "2000",
    makerId: "60856139805",
    role: "内部",
    marketName: "",
    makerFeeDiscount: 0,
    takerFeeDiscount: 0,
    effectiveTime: "2025-05-31 08:00:00 - 2030-05-31 08:00:00",
    enabled: true,
  },
  {
    id: "2001",
    makerId: "60856140292",
    role: "内部",
    marketName: "",
    makerFeeDiscount: 0,
    takerFeeDiscount: 0,
    effectiveTime: "2025-05-29 00:00:00 - 2030-06-05 00:00:00",
    enabled: true,
  },
]

const roleOptions = ["内部", "外部", "VIP"]
const marketOptions = ["BTC/USDT", "ETH/USDT", "BNB/USDT", "SOL/USDT", "XRP/USDT"]

export default function SpotMarketMakerPage() {
  const [marketMakers, setMarketMakers] = useState<MarketMaker[]>(mockMarketMakers)
  const [makerIdFilter, setMakerIdFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [marketFilter, setMarketFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingMaker, setEditingMaker] = useState<MarketMaker | null>(null)

  const [newMaker, setNewMaker] = useState({
    makerId: "",
    role: "",
    marketName: "",
    makerFeeDiscount: 0,
    takerFeeDiscount: 0,
    effectiveStartTime: "",
    effectiveEndTime: "",
    enabled: true,
  })

  const filteredMarketMakers = marketMakers.filter(maker => {
    if (makerIdFilter && !maker.makerId.includes(makerIdFilter)) return false
    if (roleFilter !== "all" && maker.role !== roleFilter) return false
    if (marketFilter !== "all" && maker.marketName !== marketFilter) return false
    return true
  })

  const handleSearch = () => {
    toast.success("查询完成")
  }

  const handleReset = () => {
    setMakerIdFilter("")
    setRoleFilter("all")
    setMarketFilter("all")
    toast.success("筛选已重置")
  }

  const handleAdd = () => {
    if (!newMaker.makerId) {
      toast.error("请输入做市商ID")
      return
    }
    if (!newMaker.role) {
      toast.error("请选择做市商角色")
      return
    }

    const newId = (parseInt(marketMakers[marketMakers.length - 1]?.id || "1999") + 1).toString()
    const effectiveTime = newMaker.effectiveStartTime && newMaker.effectiveEndTime
      ? `${newMaker.effectiveStartTime} - ${newMaker.effectiveEndTime}`
      : ""

    setMarketMakers(prev => [...prev, {
      id: newId,
      makerId: newMaker.makerId,
      role: newMaker.role,
      marketName: newMaker.marketName,
      makerFeeDiscount: newMaker.makerFeeDiscount,
      takerFeeDiscount: newMaker.takerFeeDiscount,
      effectiveTime,
      enabled: newMaker.enabled,
    }])

    setNewMaker({
      makerId: "",
      role: "",
      marketName: "",
      makerFeeDiscount: 0,
      takerFeeDiscount: 0,
      effectiveStartTime: "",
      effectiveEndTime: "",
      enabled: true,
    })
    setShowAddDialog(false)
    toast.success("做市商添加成功")
  }

  const handleEdit = (maker: MarketMaker) => {
    setEditingMaker(maker)
    setShowEditDialog(true)
  }

  const handleSaveEdit = () => {
    if (!editingMaker) return
    setMarketMakers(prev => prev.map(m => m.id === editingMaker.id ? editingMaker : m))
    setShowEditDialog(false)
    setEditingMaker(null)
    toast.success("编辑成功")
  }

  const handleExport = () => {
    toast.success("导出成功", { description: "做市商数据已导出为CSV文件" })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">现货做市商</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理现货交易做市商配置和费率折扣
          </p>
        </div>
        <div className="flex items-center gap-2">
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

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">做市商ID</Label>
            <Input 
              placeholder="请输入做市商ID" 
              value={makerIdFilter}
              onChange={(e) => setMakerIdFilter(e.target.value)}
              className="w-[180px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">做市商角色</Label>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">请选择</SelectItem>
                {roleOptions.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">市场</Label>
            <Select value={marketFilter} onValueChange={setMarketFilter}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="请选择" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">请选择</SelectItem>
                {marketOptions.map(market => (
                  <SelectItem key={market} value={market}>{market}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSearch}>
              查询
            </Button>
            <Button variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500" onClick={handleReset}>
              重置
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">id</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">做市商ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">做市商角色</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">市场名称</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">maker费率折扣</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">taker费率折扣</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">费率折扣生效时间</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">是否启用</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMarketMakers.map((maker) => (
                <tr key={maker.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.makerId}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.role}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.marketName || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.makerFeeDiscount}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.takerFeeDiscount}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white whitespace-pre-line">{maker.effectiveTime}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`${maker.enabled ? "text-green-600" : "text-gray-500"}`}>
                      {maker.enabled ? "是" : "否"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Button 
                      size="sm" 
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => handleEdit(maker)}
                    >
                      编辑
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredMarketMakers.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    暂无数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={showAddDialog} onOpenChange={setShowAddDialog}>
        <SheetContent className="w-[500px] sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>添加做市商</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div>
              <Label className="text-sm">做市商ID <span className="text-red-500">*</span></Label>
              <Input 
                placeholder="请输入做市商ID"
                value={newMaker.makerId}
                onChange={(e) => setNewMaker(prev => ({ ...prev, makerId: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm">做市商角色 <span className="text-red-500">*</span></Label>
              <Select value={newMaker.role} onValueChange={(v) => setNewMaker(prev => ({ ...prev, role: v }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">市场</Label>
              <Select value={newMaker.marketName} onValueChange={(v) => setNewMaker(prev => ({ ...prev, marketName: v }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  {marketOptions.map(market => (
                    <SelectItem key={market} value={market}>{market}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">maker费率折扣</Label>
                <Input 
                  type="number"
                  placeholder="0"
                  value={newMaker.makerFeeDiscount}
                  onChange={(e) => setNewMaker(prev => ({ ...prev, makerFeeDiscount: parseFloat(e.target.value) || 0 }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">taker费率折扣</Label>
                <Input 
                  type="number"
                  placeholder="0"
                  value={newMaker.takerFeeDiscount}
                  onChange={(e) => setNewMaker(prev => ({ ...prev, takerFeeDiscount: parseFloat(e.target.value) || 0 }))}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">生效开始时间</Label>
                <Input 
                  type="datetime-local"
                  value={newMaker.effectiveStartTime}
                  onChange={(e) => setNewMaker(prev => ({ ...prev, effectiveStartTime: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">生效结束时间</Label>
                <Input 
                  type="datetime-local"
                  value={newMaker.effectiveEndTime}
                  onChange={(e) => setNewMaker(prev => ({ ...prev, effectiveEndTime: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm">是否启用</Label>
              <Switch 
                checked={newMaker.enabled}
                onCheckedChange={(v) => setNewMaker(prev => ({ ...prev, enabled: v }))}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">
                取消
              </Button>
              <Button 
                className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white"
                onClick={handleAdd}
              >
                确定
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showEditDialog} onOpenChange={setShowEditDialog}>
        <SheetContent className="w-[500px] sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>编辑做市商</SheetTitle>
          </SheetHeader>
          {editingMaker && (
            <div className="mt-6 space-y-4">
              <div>
                <Label className="text-sm">做市商ID</Label>
                <Input 
                  value={editingMaker.makerId}
                  onChange={(e) => setEditingMaker(prev => prev ? { ...prev, makerId: e.target.value } : null)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm">做市商角色</Label>
                <Select value={editingMaker.role} onValueChange={(v) => setEditingMaker(prev => prev ? { ...prev, role: v } : null)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm">市场</Label>
                <Select value={editingMaker.marketName} onValueChange={(v) => setEditingMaker(prev => prev ? { ...prev, marketName: v } : null)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    {marketOptions.map(market => (
                      <SelectItem key={market} value={market}>{market}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm">maker费率折扣</Label>
                  <Input 
                    type="number"
                    value={editingMaker.makerFeeDiscount}
                    onChange={(e) => setEditingMaker(prev => prev ? { ...prev, makerFeeDiscount: parseFloat(e.target.value) || 0 } : null)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm">taker费率折扣</Label>
                  <Input 
                    type="number"
                    value={editingMaker.takerFeeDiscount}
                    onChange={(e) => setEditingMaker(prev => prev ? { ...prev, takerFeeDiscount: parseFloat(e.target.value) || 0 } : null)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm">是否启用</Label>
                <Switch 
                  checked={editingMaker.enabled}
                  onCheckedChange={(v) => setEditingMaker(prev => prev ? { ...prev, enabled: v } : null)}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowEditDialog(false)} className="flex-1">
                  取消
                </Button>
                <Button 
                  className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white"
                  onClick={handleSaveEdit}
                >
                  保存
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
