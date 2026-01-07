"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Search, Plus, Download, CalendarIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

interface MarketMaker {
  id: string
  makerId: string
  role: string
  marketName: string
  makerFeeDiscount: number
  takerFeeDiscount: number
  effectiveStartTime: Date | null
  effectiveEndTime: Date | null
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
    effectiveStartTime: new Date("2025-05-31T08:00:00"),
    effectiveEndTime: new Date("2030-05-31T08:00:00"),
    enabled: true,
  },
  {
    id: "2001",
    makerId: "60856140292",
    role: "内部",
    marketName: "",
    makerFeeDiscount: 0,
    takerFeeDiscount: 0,
    effectiveStartTime: new Date("2025-05-29T00:00:00"),
    effectiveEndTime: new Date("2030-06-05T00:00:00"),
    enabled: true,
  },
]

const roleOptions = ["内部", "外部"]

export default function SpotMarketMakerPage() {
  const [marketMakers, setMarketMakers] = useState<MarketMaker[]>(mockMarketMakers)
  const [makerIdFilter, setMakerIdFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [marketFilter, setMarketFilter] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingMaker, setEditingMaker] = useState<MarketMaker | null>(null)

  const [newMaker, setNewMaker] = useState({
    makerId: "",
    role: "",
    marketName: "",
    makerFeeDiscount: 0,
    takerFeeDiscount: 0,
    effectiveStartTime: null as Date | null,
    effectiveEndTime: null as Date | null,
    startTimeHour: "00",
    startTimeMinute: "00",
    endTimeHour: "00",
    endTimeMinute: "00",
    enabled: true,
  })

  const [editStartTimeHour, setEditStartTimeHour] = useState("00")
  const [editStartTimeMinute, setEditStartTimeMinute] = useState("00")
  const [editEndTimeHour, setEditEndTimeHour] = useState("00")
  const [editEndTimeMinute, setEditEndTimeMinute] = useState("00")
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [displayCount, setDisplayCount] = useState(10)

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + 10)
      setIsLoadingMore(false)
    }, 800)
  }

  const filteredMarketMakers = marketMakers.filter(maker => {
    if (makerIdFilter && !maker.makerId.includes(makerIdFilter)) return false
    if (roleFilter !== "all" && maker.role !== roleFilter) return false
    if (marketFilter && !maker.marketName.toLowerCase().includes(marketFilter.toLowerCase())) return false
    return true
  })

  const handleSearch = () => {
    toast.success("查询完成")
  }

  const formatDateTime = (date: Date | null, hour: string, minute: string) => {
    if (!date) return null
    const result = new Date(date)
    result.setHours(parseInt(hour), parseInt(minute), 0, 0)
    return result
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
    const startTime = formatDateTime(newMaker.effectiveStartTime, newMaker.startTimeHour, newMaker.startTimeMinute)
    const endTime = formatDateTime(newMaker.effectiveEndTime, newMaker.endTimeHour, newMaker.endTimeMinute)

    setMarketMakers(prev => [...prev, {
      id: newId,
      makerId: newMaker.makerId,
      role: newMaker.role,
      marketName: newMaker.marketName,
      makerFeeDiscount: newMaker.makerFeeDiscount,
      takerFeeDiscount: newMaker.takerFeeDiscount,
      effectiveStartTime: startTime,
      effectiveEndTime: endTime,
      enabled: newMaker.enabled,
    }])

    setNewMaker({
      makerId: "",
      role: "",
      marketName: "",
      makerFeeDiscount: 0,
      takerFeeDiscount: 0,
      effectiveStartTime: null,
      effectiveEndTime: null,
      startTimeHour: "00",
      startTimeMinute: "00",
      endTimeHour: "00",
      endTimeMinute: "00",
      enabled: true,
    })
    setShowAddDialog(false)
    toast.success("做市商添加成功")
  }

  const handleEdit = (maker: MarketMaker) => {
    setEditingMaker(maker)
    if (maker.effectiveStartTime) {
      setEditStartTimeHour(maker.effectiveStartTime.getHours().toString().padStart(2, '0'))
      setEditStartTimeMinute(maker.effectiveStartTime.getMinutes().toString().padStart(2, '0'))
    }
    if (maker.effectiveEndTime) {
      setEditEndTimeHour(maker.effectiveEndTime.getHours().toString().padStart(2, '0'))
      setEditEndTimeMinute(maker.effectiveEndTime.getMinutes().toString().padStart(2, '0'))
    }
    setShowEditDialog(true)
  }

  const handleSaveEdit = () => {
    if (!editingMaker) return
    const startTime = formatDateTime(editingMaker.effectiveStartTime, editStartTimeHour, editStartTimeMinute)
    const endTime = formatDateTime(editingMaker.effectiveEndTime, editEndTimeHour, editEndTimeMinute)
    
    setMarketMakers(prev => prev.map(m => m.id === editingMaker.id ? {
      ...editingMaker,
      effectiveStartTime: startTime,
      effectiveEndTime: endTime,
    } : m))
    setShowEditDialog(false)
    setEditingMaker(null)
    toast.success("编辑成功")
  }

  const handleExport = () => {
    toast.success("导出成功", { description: "做市商数据已导出为CSV文件" })
  }

  const formatDisplayTime = (date: Date | null) => {
    if (!date) return "-"
    return format(date, "yyyy-MM-dd HH:mm:ss", { locale: zhCN })
  }

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

  const DateTimePicker = ({ 
    date, 
    onDateChange, 
    hour, 
    onHourChange, 
    minute, 
    onMinuteChange,
    label 
  }: {
    date: Date | null
    onDateChange: (date: Date | undefined) => void
    hour: string
    onHourChange: (hour: string) => void
    minute: string
    onMinuteChange: (minute: string) => void
    label: string
  }) => (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex-1 justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "yyyy-MM-dd", { locale: zhCN }) : "选择日期"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-[200]" align="start">
            <Calendar
              mode="single"
              selected={date || undefined}
              onSelect={onDateChange}
              locale={zhCN}
            />
          </PopoverContent>
        </Popover>
        <Select value={hour} onValueChange={onHourChange}>
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] z-[200]">
            {hours.map(h => (
              <SelectItem key={h} value={h}>{h}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="flex items-center">:</span>
        <Select value={minute} onValueChange={onMinuteChange}>
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] z-[200]">
            {minutes.map(m => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )

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
          <Tabs value={roleFilter} onValueChange={setRoleFilter} className="w-auto flex-shrink-0">
            <TabsList className="h-9">
              <TabsTrigger value="all" className="text-sm px-4">全部</TabsTrigger>
              <TabsTrigger value="内部" className="text-sm px-4">内部</TabsTrigger>
              <TabsTrigger value="外部" className="text-sm px-4">外部</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="relative flex-1 max-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="搜索做市商ID..." 
                value={makerIdFilter}
                onChange={(e) => setMakerIdFilter(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="搜索市场..." 
                value={marketFilter}
                onChange={(e) => setMarketFilter(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="h-9 flex-shrink-0" onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              搜索
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
              {filteredMarketMakers.slice(0, displayCount).map((maker) => (
                <tr key={maker.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.makerId}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.role}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.marketName || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.makerFeeDiscount}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">{maker.takerFeeDiscount}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white whitespace-pre-line">
                    {formatDisplayTime(maker.effectiveStartTime)} - {formatDisplayTime(maker.effectiveEndTime)}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <Switch 
                      checked={maker.enabled}
                      onCheckedChange={(checked) => {
                        setMarketMakers(prev => prev.map(m => 
                          m.id === maker.id ? { ...m, enabled: checked } : m
                        ))
                        toast.success(checked ? "已启用" : "已禁用")
                      }}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <Button 
                      size="sm" 
                      className="bg-custom-green hover:bg-custom-green-dark text-white"
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

      {filteredMarketMakers.length > displayCount && (
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
              `加载更多 (${filteredMarketMakers.length - displayCount})`
            )}
          </Button>
        </div>
      )}

      <Sheet open={showAddDialog} onOpenChange={setShowAddDialog}>
        <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
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
              <Input 
                placeholder="请输入市场名称"
                value={newMaker.marketName}
                onChange={(e) => setNewMaker(prev => ({ ...prev, marketName: e.target.value }))}
                className="mt-1"
              />
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
            <DateTimePicker
              date={newMaker.effectiveStartTime}
              onDateChange={(d) => setNewMaker(prev => ({ ...prev, effectiveStartTime: d || null }))}
              hour={newMaker.startTimeHour}
              onHourChange={(h) => setNewMaker(prev => ({ ...prev, startTimeHour: h }))}
              minute={newMaker.startTimeMinute}
              onMinuteChange={(m) => setNewMaker(prev => ({ ...prev, startTimeMinute: m }))}
              label="生效时间"
            />
            <DateTimePicker
              date={newMaker.effectiveEndTime}
              onDateChange={(d) => setNewMaker(prev => ({ ...prev, effectiveEndTime: d || null }))}
              hour={newMaker.endTimeHour}
              onHourChange={(h) => setNewMaker(prev => ({ ...prev, endTimeHour: h }))}
              minute={newMaker.endTimeMinute}
              onMinuteChange={(m) => setNewMaker(prev => ({ ...prev, endTimeMinute: m }))}
              label="失效时间"
            />
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
        <SheetContent className="w-[500px] sm:max-w-[500px] overflow-y-auto">
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
                <Input 
                  placeholder="请输入市场名称"
                  value={editingMaker.marketName}
                  onChange={(e) => setEditingMaker(prev => prev ? { ...prev, marketName: e.target.value } : null)}
                  className="mt-1"
                />
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
              <DateTimePicker
                date={editingMaker.effectiveStartTime}
                onDateChange={(d) => setEditingMaker(prev => prev ? { ...prev, effectiveStartTime: d || null } : null)}
                hour={editStartTimeHour}
                onHourChange={setEditStartTimeHour}
                minute={editStartTimeMinute}
                onMinuteChange={setEditStartTimeMinute}
                label="生效时间"
              />
              <DateTimePicker
                date={editingMaker.effectiveEndTime}
                onDateChange={(d) => setEditingMaker(prev => prev ? { ...prev, effectiveEndTime: d || null } : null)}
                hour={editEndTimeHour}
                onHourChange={setEditEndTimeHour}
                minute={editEndTimeMinute}
                onMinuteChange={setEditEndTimeMinute}
                label="失效时间"
              />
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
