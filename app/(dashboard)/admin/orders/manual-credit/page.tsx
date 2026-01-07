"use client"

import React, { useState } from "react"
import OrdersLayout from "@/components/orders-layout"
import { 
  FileEdit, 
  Search, 
  Plus, 
  Eye, 
  Clock, 
  User, 
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Download,
  TrendingUp,
  TrendingDown
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

interface CreditRecord {
  id: string
  orderId: string
  userId: string
  userName: string
  userEmail: string
  type: "credit" | "debit"
  amount: string
  currency: string
  walletType: string
  balanceBefore: string
  balanceAfter: string
  reason: string
  remark: string
  operator: string
  operatorId: string
  createdAt: string
  status: "pending" | "completed" | "rejected"
  auditTime?: string
  auditor?: string
}

const mockRecords: CreditRecord[] = [
  {
    id: "MC001",
    orderId: "ORD20260107001",
    userId: "U10001",
    userName: "张三",
    userEmail: "zhangsan@example.com",
    type: "credit",
    amount: "1000.00",
    currency: "USDT",
    walletType: "现货钱包",
    balanceBefore: "5000.00",
    balanceAfter: "6000.00",
    reason: "活动补偿",
    remark: "2025年12月活动奖励补发",
    operator: "admin",
    operatorId: "A001",
    createdAt: "2026-01-07 10:30:25",
    status: "completed",
    auditTime: "2026-01-07 10:35:00",
    auditor: "审核员A"
  },
  {
    id: "MC002",
    orderId: "ORD20260107002",
    userId: "U10002",
    userName: "李四",
    userEmail: "lisi@example.com",
    type: "debit",
    amount: "500.00",
    currency: "USDT",
    walletType: "合约钱包",
    balanceBefore: "8000.00",
    balanceAfter: "7500.00",
    reason: "系统调账",
    remark: "订单异常扣减",
    operator: "admin",
    operatorId: "A001",
    createdAt: "2026-01-07 09:15:10",
    status: "completed",
    auditTime: "2026-01-07 09:20:00",
    auditor: "审核员B"
  },
  {
    id: "MC003",
    orderId: "ORD20260107003",
    userId: "U10003",
    userName: "王五",
    userEmail: "wangwu@example.com",
    type: "credit",
    amount: "2000.00",
    currency: "USDT",
    walletType: "现货钱包",
    balanceBefore: "10000.00",
    balanceAfter: "12000.00",
    reason: "VIP奖励",
    remark: "VIP等级升级奖励",
    operator: "manager",
    operatorId: "A002",
    createdAt: "2026-01-07 08:45:33",
    status: "pending"
  },
  {
    id: "MC004",
    orderId: "ORD20260106001",
    userId: "U10004",
    userName: "赵六",
    userEmail: "zhaoliu@example.com",
    type: "credit",
    amount: "3000.00",
    currency: "BTC",
    walletType: "现货钱包",
    balanceBefore: "0.5",
    balanceAfter: "0.5003",
    reason: "充值异常补发",
    remark: "用户充值未到账，手动补发",
    operator: "admin",
    operatorId: "A001",
    createdAt: "2026-01-06 16:20:15",
    status: "rejected",
    auditTime: "2026-01-06 17:00:00",
    auditor: "审核员A"
  },
]

export default function ManualCreditPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [addSheetOpen, setAddSheetOpen] = useState(false)
  const [detailSheetOpen, setDetailSheetOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<CreditRecord | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const stats = {
    todayCount: 5,
    todayCredit: "8,500.00",
    todayDebit: "1,200.00",
    pendingCount: 2
  }

  const filteredRecords = mockRecords.filter(record => {
    if (activeTab !== "all" && record.status !== activeTab) return false
    if (typeFilter !== "all" && record.type !== typeFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        record.userId.toLowerCase().includes(query) ||
        record.userName.toLowerCase().includes(query) ||
        record.orderId.toLowerCase().includes(query)
      )
    }
    return true
  })

  const totalPages = Math.ceil(filteredRecords.length / pageSize)
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const openDetail = (record: CreditRecord) => {
    setSelectedRecord(record)
    setDetailSheetOpen(true)
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      completed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    }
    const labels: Record<string, string> = {
      pending: "待审核",
      completed: "已完成",
      rejected: "已拒绝"
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{labels[status]}</span>
  }

  return (
    <OrdersLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">手动开分</h1>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                导出
              </Button>
              <Button onClick={() => setAddSheetOpen(true)} className="bg-custom-green hover:bg-custom-green/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                新增开分
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日开分</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.todayCount}</h3>
                </div>
                <FileEdit className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日增加</p>
                  <h3 className="text-2xl font-bold text-green-500">+{stats.todayCredit}</h3>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日扣减</p>
                  <h3 className="text-2xl font-bold text-red-500">-{stats.todayDebit}</h3>
                </div>
                <TrendingDown className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">待审核</p>
                  <h3 className="text-2xl font-bold text-yellow-500">{stats.pendingCount}</h3>
                </div>
                <Clock className="w-10 h-10 text-yellow-500" />
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
                    <TabsTrigger value="pending" className="h-7 px-3 text-xs">待审核</TabsTrigger>
                    <TabsTrigger value="completed" className="h-7 px-3 text-xs">已完成</TabsTrigger>
                    <TabsTrigger value="rejected" className="h-7 px-3 text-xs">已拒绝</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setCurrentPage(1); }}>
                  <SelectTrigger className="w-28 h-9">
                    <SelectValue placeholder="类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="credit">增加</SelectItem>
                    <SelectItem value="debit">扣减</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">订单号</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">用户</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">类型</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">金额</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">币种</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">钱包</th>
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
                        <div className="font-medium text-gray-900 dark:text-white">{record.userName}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs">{record.userId}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                          record.type === 'credit' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {record.type === 'credit' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {record.type === 'credit' ? '增加' : '扣减'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{record.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{record.currency}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{record.walletType}</td>
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
              新增手动开分
            </SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-1.5">
              <Label>用户ID</Label>
              <Input placeholder="请输入用户ID" />
            </div>
            <div className="space-y-1.5">
              <Label>操作类型</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit">增加余额</SelectItem>
                  <SelectItem value="debit">扣减余额</SelectItem>
                </SelectContent>
              </Select>
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
              <Label>金额</Label>
              <Input type="number" placeholder="请输入金额" />
            </div>
            <div className="space-y-1.5">
              <Label>原因</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择原因" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compensation">活动补偿</SelectItem>
                  <SelectItem value="adjustment">系统调账</SelectItem>
                  <SelectItem value="reward">奖励发放</SelectItem>
                  <SelectItem value="refund">退款</SelectItem>
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
              <Button className="flex-1 bg-custom-green hover:bg-custom-green/90 text-white" onClick={() => setAddSheetOpen(false)}>提交审核</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={detailSheetOpen} onOpenChange={setDetailSheetOpen}>
        <SheetContent className="w-[500px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-custom-green" />
              开分详情
            </SheetTitle>
          </SheetHeader>
          {selectedRecord && (
            <div className="py-4 space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  订单信息
                </h3>
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
                    <p className="text-gray-500 dark:text-gray-400">操作类型</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      selectedRecord.type === 'credit' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {selectedRecord.type === 'credit' ? '增加' : '扣减'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">金额</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedRecord.amount} {selectedRecord.currency}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4" />
                  用户信息
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">用户ID</p>
                    <p className="font-mono text-gray-900 dark:text-white">{selectedRecord.userId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">用户名</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.userName}</p>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">邮箱</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.userEmail}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  余额变动
                </h3>
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">变动前</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedRecord.balanceBefore} {selectedRecord.currency}</p>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="text-right">
                      <p className="text-gray-500 dark:text-gray-400">变动后</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedRecord.balanceAfter} {selectedRecord.currency}</p>
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
                  {selectedRecord.auditor && (
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400">审核员</p>
                      <p className="text-gray-900 dark:text-white">{selectedRecord.auditor}</p>
                    </div>
                  )}
                  <div className="col-span-2 space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">备注</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.remark}</p>
                  </div>
                </div>
              </div>

              {selectedRecord.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50">拒绝</Button>
                  <Button className="flex-1 bg-custom-green hover:bg-custom-green/90 text-white">通过</Button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </OrdersLayout>
  )
}
