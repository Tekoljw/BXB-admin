"use client"

import React, { useState } from "react"
import OrdersLayout from "@/components/orders-layout"
import { 
  ArrowLeftRight, 
  Search, 
  Plus, 
  Eye, 
  Clock, 
  User,
  ChevronLeft,
  ChevronRight,
  Download,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TransferRecord {
  id: string
  orderId: string
  fromUserId: string
  fromUserName: string
  fromUserEmail: string
  toUserId: string
  toUserName: string
  toUserEmail: string
  amount: string
  currency: string
  walletType: string
  fromBalanceBefore: string
  fromBalanceAfter: string
  toBalanceBefore: string
  toBalanceAfter: string
  reason: string
  remark: string
  operator: string
  operatorId: string
  createdAt: string
  status: "pending" | "processing" | "completed" | "failed"
  completedAt?: string
}

const mockRecords: TransferRecord[] = [
  {
    id: "MT001",
    orderId: "TRF20260107001",
    fromUserId: "U10001",
    fromUserName: "张三",
    fromUserEmail: "zhangsan@example.com",
    toUserId: "U10002",
    toUserName: "李四",
    toUserEmail: "lisi@example.com",
    amount: "500.00",
    currency: "USDT",
    walletType: "现货钱包",
    fromBalanceBefore: "5000.00",
    fromBalanceAfter: "4500.00",
    toBalanceBefore: "3000.00",
    toBalanceAfter: "3500.00",
    reason: "用户申请转账",
    remark: "经双方确认同意",
    operator: "admin",
    operatorId: "A001",
    createdAt: "2026-01-07 10:30:25",
    status: "completed",
    completedAt: "2026-01-07 10:30:28"
  },
  {
    id: "MT002",
    orderId: "TRF20260107002",
    fromUserId: "U10003",
    fromUserName: "王五",
    fromUserEmail: "wangwu@example.com",
    toUserId: "U10004",
    toUserName: "赵六",
    toUserEmail: "zhaoliu@example.com",
    amount: "1000.00",
    currency: "BTC",
    walletType: "现货钱包",
    fromBalanceBefore: "2.5",
    fromBalanceAfter: "1.5",
    toBalanceBefore: "0.8",
    toBalanceAfter: "1.8",
    reason: "商户结算",
    remark: "月度结算转账",
    operator: "manager",
    operatorId: "A002",
    createdAt: "2026-01-07 09:15:10",
    status: "completed",
    completedAt: "2026-01-07 09:15:15"
  },
  {
    id: "MT003",
    orderId: "TRF20260107003",
    fromUserId: "U10005",
    fromUserName: "孙七",
    fromUserEmail: "sunqi@example.com",
    toUserId: "U10006",
    toUserName: "周八",
    toUserEmail: "zhouba@example.com",
    amount: "2000.00",
    currency: "USDT",
    walletType: "合约钱包",
    fromBalanceBefore: "10000.00",
    fromBalanceAfter: "8000.00",
    toBalanceBefore: "5000.00",
    toBalanceAfter: "7000.00",
    reason: "资金归集",
    remark: "子账户资金归集至主账户",
    operator: "admin",
    operatorId: "A001",
    createdAt: "2026-01-07 08:45:33",
    status: "processing"
  },
  {
    id: "MT004",
    orderId: "TRF20260106001",
    fromUserId: "U10007",
    fromUserName: "吴九",
    fromUserEmail: "wujiu@example.com",
    toUserId: "U10008",
    toUserName: "郑十",
    toUserEmail: "zhengshi@example.com",
    amount: "3000.00",
    currency: "ETH",
    walletType: "现货钱包",
    fromBalanceBefore: "5.0",
    fromBalanceAfter: "5.0",
    toBalanceBefore: "2.0",
    toBalanceAfter: "2.0",
    reason: "误操作转账",
    remark: "用户操作错误，转账取消",
    operator: "admin",
    operatorId: "A001",
    createdAt: "2026-01-06 16:20:15",
    status: "failed"
  },
]

export default function ManualTransferPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [addSheetOpen, setAddSheetOpen] = useState(false)
  const [detailSheetOpen, setDetailSheetOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<TransferRecord | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const stats = {
    todayCount: 8,
    todayAmount: "15,500.00",
    processingCount: 1,
    successRate: "98.5%"
  }

  const filteredRecords = mockRecords.filter(record => {
    if (activeTab !== "all" && record.status !== activeTab) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        record.fromUserId.toLowerCase().includes(query) ||
        record.fromUserName.toLowerCase().includes(query) ||
        record.toUserId.toLowerCase().includes(query) ||
        record.toUserName.toLowerCase().includes(query) ||
        record.orderId.toLowerCase().includes(query)
      )
    }
    return true
  })

  const totalPages = Math.ceil(filteredRecords.length / pageSize)
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const openDetail = (record: TransferRecord) => {
    setSelectedRecord(record)
    setDetailSheetOpen(true)
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    }
    const labels: Record<string, string> = {
      pending: "待处理",
      processing: "处理中",
      completed: "已完成",
      failed: "失败"
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{labels[status]}</span>
  }

  return (
    <OrdersLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">手动转账</h1>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                导出
              </Button>
              <Button onClick={() => setAddSheetOpen(true)} className="bg-custom-green hover:bg-custom-green/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                新增转账
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日转账</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.todayCount}</h3>
                </div>
                <ArrowLeftRight className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日金额</p>
                  <h3 className="text-2xl font-bold text-blue-500">{stats.todayAmount}</h3>
                </div>
                <ArrowLeftRight className="w-10 h-10 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">处理中</p>
                  <h3 className="text-2xl font-bold text-yellow-500">{stats.processingCount}</h3>
                </div>
                <Clock className="w-10 h-10 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">成功率</p>
                  <h3 className="text-2xl font-bold text-green-500">{stats.successRate}</h3>
                </div>
                <ArrowLeftRight className="w-10 h-10 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索用户ID、用户名、订单号..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9"
                  />
                </div>

                <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setCurrentPage(1); }}>
                  <TabsList className="h-9">
                    <TabsTrigger value="all" className="h-7 px-3 text-xs">全部</TabsTrigger>
                    <TabsTrigger value="processing" className="h-7 px-3 text-xs">处理中</TabsTrigger>
                    <TabsTrigger value="completed" className="h-7 px-3 text-xs">已完成</TabsTrigger>
                    <TabsTrigger value="failed" className="h-7 px-3 text-xs">失败</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">订单号</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">转出用户</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase"></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">转入用户</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">金额</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">币种</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">原因</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">操作员</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">时间</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">状态</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {paginatedRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">{record.orderId}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium text-gray-900 dark:text-white">{record.fromUserName}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs">{record.fromUserId}</div>
                      </td>
                      <td className="px-4 py-3">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium text-gray-900 dark:text-white">{record.toUserName}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs">{record.toUserId}</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{record.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{record.currency}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{record.reason}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{record.operator}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{record.createdAt}</td>
                      <td className="px-4 py-3">{getStatusBadge(record.status)}</td>
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDetail(record)}
                          className="h-7 px-2 text-custom-green hover:text-custom-green hover:bg-custom-green/10"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {paginatedRecords.length === 0 && (
                    <tr>
                      <td colSpan={11} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                        暂无记录
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                共 {filteredRecords.length} 条记录
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {currentPage} / {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="h-8"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen}>
        <SheetContent className="w-[500px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-custom-green" />
              新增手动转账
            </SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                手动转账将从转出用户账户扣除金额，并增加到转入用户账户
              </p>
            </div>
            <div className="space-y-1.5">
              <Label>转出用户ID</Label>
              <Input placeholder="请输入转出用户ID" />
            </div>
            <div className="space-y-1.5">
              <Label>转入用户ID</Label>
              <Input placeholder="请输入转入用户ID" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>币种</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择币种" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>钱包类型</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="选择钱包" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spot">现货钱包</SelectItem>
                    <SelectItem value="futures">合约钱包</SelectItem>
                    <SelectItem value="finance">理财钱包</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>转账金额</Label>
              <Input type="number" placeholder="请输入转账金额" />
            </div>
            <div className="space-y-1.5">
              <Label>转账原因</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择原因" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user_request">用户申请转账</SelectItem>
                  <SelectItem value="settlement">商户结算</SelectItem>
                  <SelectItem value="fund_collection">资金归集</SelectItem>
                  <SelectItem value="error_correction">错误更正</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>备注</Label>
              <Textarea placeholder="请输入详细备注..." rows={3} />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setAddSheetOpen(false)}>取消</Button>
              <Button className="flex-1 bg-custom-green hover:bg-custom-green/90 text-white" onClick={() => setAddSheetOpen(false)}>确认转账</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={detailSheetOpen} onOpenChange={setDetailSheetOpen}>
        <SheetContent className="w-[550px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-custom-green" />
              转账详情
            </SheetTitle>
          </SheetHeader>
          {selectedRecord && (
            <div className="py-4 space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">订单信息</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">订单号</p>
                    <p className="font-mono text-gray-900 dark:text-white">{selectedRecord.orderId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">状态</p>
                    {getStatusBadge(selectedRecord.status)}
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">转账金额</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedRecord.amount} {selectedRecord.currency}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">钱包类型</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.walletType}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">转出用户</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedRecord.fromUserName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedRecord.fromUserId}</p>
                    <div className="mt-2 text-xs">
                      <span className="text-gray-500">余额: </span>
                      <span className="text-red-500">{selectedRecord.fromBalanceBefore}</span>
                      <span className="text-gray-400 mx-1">→</span>
                      <span className="text-gray-900 dark:text-white">{selectedRecord.fromBalanceAfter}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-custom-green" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">转入用户</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedRecord.toUserName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedRecord.toUserId}</p>
                    <div className="mt-2 text-xs">
                      <span className="text-gray-500">余额: </span>
                      <span className="text-gray-500">{selectedRecord.toBalanceBefore}</span>
                      <span className="text-gray-400 mx-1">→</span>
                      <span className="text-green-500">{selectedRecord.toBalanceAfter}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  操作信息
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">操作员</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.operator}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">创建时间</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.createdAt}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">原因</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.reason}</p>
                  </div>
                  {selectedRecord.completedAt && (
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400">完成时间</p>
                      <p className="text-gray-900 dark:text-white">{selectedRecord.completedAt}</p>
                    </div>
                  )}
                  <div className="col-span-2 space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">备注</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.remark}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </OrdersLayout>
  )
}
