"use client"

import React, { useState, useMemo } from "react"
import CommissionLayout from "@/components/commission-layout"
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Banknote,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowRightLeft,
  Activity,
  Search,
  Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DataTotal } from "@/components/data-total"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PaymentCommission {
  id: string
  timestamp: string
  orderId: string
  merchantName: string
  merchantId: string
  type: "collection" | "payout" | "exchange"
  amount: number
  commission: number
  status: "success" | "processing" | "failed"
  channel: string
  rate: number
}

const mockRecords: PaymentCommission[] = [
  {
    id: "PCO2024001",
    timestamp: "2024-11-14 10:23:45",
    orderId: "ORD20241114001",
    merchantName: "商户A",
    merchantId: "M123456",
    type: "collection",
    amount: 10000,
    commission: 50,
    status: "success",
    channel: "支付宝",
    rate: 0.5
  },
  {
    id: "PCO2024002",
    timestamp: "2024-11-14 09:15:22",
    orderId: "ORD20241114002",
    merchantName: "商户B",
    merchantId: "M123457",
    type: "payout",
    amount: 5000,
    commission: 30,
    status: "success",
    channel: "微信",
    rate: 0.6
  },
  {
    id: "PCO2024003",
    timestamp: "2024-11-14 08:45:10",
    orderId: "ORD20241114003",
    merchantName: "商户C",
    merchantId: "M123458",
    type: "exchange",
    amount: 8000,
    commission: 24,
    status: "processing",
    channel: "银行卡",
    rate: 0.3
  },
]

const typeLabels = {
  collection: "代收",
  payout: "代付",
  exchange: "兑换"
}

const statusLabels = {
  success: "成功",
  processing: "处理中",
  failed: "失败"
}

const statusColors = {
  success: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
  processing: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20",
  failed: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
}

// 日期范围过滤helper
function isDateInRange(timestamp: string, range: string): boolean {
  // 将"YYYY-MM-DD HH:mm:ss"格式转换为ISO格式"YYYY-MM-DDTHH:mm:ss"
  // Safari等浏览器不支持空格分隔的日期格式
  const isoTimestamp = timestamp.replace(' ', 'T')
  const recordDate = new Date(isoTimestamp)
  
  // 检查日期是否有效
  if (isNaN(recordDate.getTime())) {
    return true // 如果日期无效，默认显示该记录
  }
  
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  switch (range) {
    case "today":
      return recordDate >= today
    case "yesterday":
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      return recordDate >= yesterday && recordDate < today
    case "7days":
      const sevenDaysAgo = new Date(today)
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return recordDate >= sevenDaysAgo
    case "30days":
      const thirtyDaysAgo = new Date(today)
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return recordDate >= thirtyDaysAgo
    case "custom":
      return true // 自定义范围需要额外的日期选择器，暂时返回true
    default:
      return true
  }
}

export default function PaymentCommissionPage() {
  const [selectedRecord, setSelectedRecord] = useState<PaymentCommission | null>(null)
  const [dateRange, setDateRange] = useState("today")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [channelFilter, setChannelFilter] = useState("all")
  
  const { searchTerm, deferredSearchTerm, handleSearchChange } = useDeferredSearch()

  // 过滤逻辑
  const filteredRecords = useMemo(() => {
    return mockRecords.filter(record => {
      const matchesSearch = !deferredSearchTerm || 
        record.id.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        record.orderId.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        record.merchantName.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        record.merchantId.toLowerCase().includes(deferredSearchTerm.toLowerCase())
      
      const matchesDateRange = isDateInRange(record.timestamp, dateRange)
      const matchesType = typeFilter === "all" || record.type === typeFilter
      const matchesStatus = statusFilter === "all" || record.status === statusFilter
      const matchesChannel = channelFilter === "all" || record.channel === channelFilter
      
      return matchesSearch && matchesDateRange && matchesType && matchesStatus && matchesChannel
    })
  }, [mockRecords, deferredSearchTerm, dateRange, typeFilter, statusFilter, channelFilter])

  return (
    <CommissionLayout>
      <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">支付佣金</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">代收、代付、兑换订单佣金统计与管理</p>
            </div>
            <Button className="bg-custom-green hover:bg-custom-green/90">
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </Button>
          </div>
          
        {/* 统计卡片 - 今日数据 */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">今日数据</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">代收佣金</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥1,234</h3>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 15.3%</p>
                  </div>
                  <ArrowDownToLine className="w-10 h-10 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">代付佣金</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥1,876</h3>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 12.8%</p>
                  </div>
                  <ArrowUpFromLine className="w-10 h-10 text-purple-500" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">兑换佣金</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥1,124</h3>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">↓ 2.1%</p>
                  </div>
                  <ArrowRightLeft className="w-10 h-10 text-orange-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日总佣金</p>
                    <h3 className="text-2xl font-bold text-custom-green">¥4,234</h3>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 10.5%</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-custom-green" />
                </div>
              </div>
          </div>
        </div>

        {/* 统计卡片 - 本月数据 */}
        <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">本月数据</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">本月总佣金</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥123,456</h3>
                  </div>
                  <TrendingUp className="w-10 h-10 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">支付用户</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">789</h3>
                  </div>
                  <Users className="w-10 h-10 text-blue-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">支付交易量</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥1.8M</h3>
                  </div>
                  <Banknote className="w-10 h-10 text-orange-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">成功率</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">96.5%</h3>
                  </div>
                  <Activity className="w-10 h-10 text-purple-500" />
                </div>
              </div>
          </div>
        </div>

        {/* 筛选工具栏 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="选择时间范围" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">今日</SelectItem>
                  <SelectItem value="yesterday">昨日</SelectItem>
                  <SelectItem value="7days">最近7天</SelectItem>
                  <SelectItem value="30days">最近30天</SelectItem>
                  <SelectItem value="custom">自定义</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="订单类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部类型</SelectItem>
                  <SelectItem value="collection">代收</SelectItem>
                  <SelectItem value="payout">代付</SelectItem>
                  <SelectItem value="exchange">兑换</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="success">成功</SelectItem>
                  <SelectItem value="processing">处理中</SelectItem>
                  <SelectItem value="failed">失败</SelectItem>
                </SelectContent>
              </Select>

              <Select value={channelFilter} onValueChange={setChannelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="渠道" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部渠道</SelectItem>
                  <SelectItem value="支付宝">支付宝</SelectItem>
                  <SelectItem value="微信">微信</SelectItem>
                  <SelectItem value="银行卡">银行卡</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="搜索订单号/商户..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-9"
                />
              </div>
          </div>
        </div>

        {/* 佣金记录表格 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">佣金记录</h2>
                <DataTotal count={filteredRecords.length} />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>佣金编号</TableHead>
                    <TableHead>时间</TableHead>
                    <TableHead>订单编号</TableHead>
                    <TableHead>商户名称</TableHead>
                    <TableHead>商户ID</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead>订单金额</TableHead>
                    <TableHead>佣金金额</TableHead>
                    <TableHead>费率</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>渠道</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-12 text-gray-500 dark:text-gray-400">
                        暂无佣金记录
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {record.timestamp}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{record.orderId}</TableCell>
                        <TableCell>{record.merchantName}</TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {record.merchantId}
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                            {typeLabels[record.type]}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">¥{record.amount.toLocaleString()}</TableCell>
                        <TableCell className="font-bold text-custom-green">
                          ¥{record.commission.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {record.rate}%
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[record.status]}`}>
                            {statusLabels[record.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {record.channel}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRecord(record)}
                          >
                            详情
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
        </div>
      </div>

      {/* 佣金详情对话框 */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>佣金记录详情</DialogTitle>
            <DialogDescription>佣金编号：{selectedRecord?.id}</DialogDescription>
          </DialogHeader>
          
          {selectedRecord && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">时间</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedRecord.timestamp}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">订单编号</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1 font-mono">{selectedRecord.orderId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">商户名称</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedRecord.merchantName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">商户ID</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedRecord.merchantId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">订单类型</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                      {typeLabels[selectedRecord.type]}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">状态</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[selectedRecord.status]}`}>
                      {statusLabels[selectedRecord.status]}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">订单金额</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1 font-bold">¥{selectedRecord.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">佣金金额</label>
                  <p className="text-sm text-custom-green mt-1 font-bold">¥{selectedRecord.commission.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">费率</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedRecord.rate}%</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">渠道</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedRecord.channel}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </CommissionLayout>
  )
}
