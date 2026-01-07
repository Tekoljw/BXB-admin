"use client"

import React, { useState } from "react"
import OrdersLayout from "@/components/orders-layout"
import { 
  ShieldCheck,
  CheckCircle, 
  XCircle, 
  Search, 
  AlertTriangle,
  Eye,
  Clock,
  User,
  Wallet,
  Globe,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertCircle
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

interface WithdrawalRecord {
  id: string
  orderId: string
  userId: string
  userName: string
  userEmail: string
  userLevel: string
  amount: string
  currency: string
  network: string
  address: string
  txHash?: string
  fee: string
  actualAmount: string
  accountBalance: string
  riskLevel: "low" | "medium" | "high"
  riskReasons: string[]
  ipAddress: string
  device: string
  createdAt: string
  status: "pending" | "approved" | "rejected" | "processing"
  auditor?: string
  auditTime?: string
  auditRemark?: string
}

const mockRecords: WithdrawalRecord[] = [
  {
    id: "LW001",
    orderId: "WD20260107001",
    userId: "U10001",
    userName: "张三",
    userEmail: "zhangsan@example.com",
    userLevel: "VIP3",
    amount: "50000.00",
    currency: "USDT",
    network: "TRC20",
    address: "TXnh7a8kD9FjkL2mN3pQ4rS5tU6vW7xY8z",
    fee: "1.00",
    actualAmount: "49999.00",
    accountBalance: "125000.00",
    riskLevel: "high",
    riskReasons: ["首次提币地址", "金额超过日均10倍", "短时间内多次提币"],
    ipAddress: "103.25.44.78",
    device: "iPhone 15 Pro",
    createdAt: "2026-01-07 10:30:25",
    status: "pending"
  },
  {
    id: "LW002",
    orderId: "WD20260107002",
    userId: "U10002",
    userName: "李四",
    userEmail: "lisi@example.com",
    userLevel: "VIP5",
    amount: "100000.00",
    currency: "BTC",
    network: "BTC",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    fee: "0.0001",
    actualAmount: "0.9999",
    accountBalance: "5.5",
    riskLevel: "medium",
    riskReasons: ["大额提币"],
    ipAddress: "192.168.1.100",
    device: "Windows PC",
    createdAt: "2026-01-07 09:15:10",
    status: "pending"
  },
  {
    id: "LW003",
    orderId: "WD20260107003",
    userId: "U10003",
    userName: "王五",
    userEmail: "wangwu@example.com",
    userLevel: "VIP2",
    amount: "75000.00",
    currency: "USDT",
    network: "ERC20",
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    txHash: "0x123abc...def789",
    fee: "15.00",
    actualAmount: "74985.00",
    accountBalance: "80000.00",
    riskLevel: "low",
    riskReasons: [],
    ipAddress: "10.0.0.55",
    device: "MacBook Pro",
    createdAt: "2026-01-07 08:45:33",
    status: "approved",
    auditor: "审核员A",
    auditTime: "2026-01-07 09:00:00",
    auditRemark: "用户历史信用良好，通过"
  },
  {
    id: "LW004",
    orderId: "WD20260106001",
    userId: "U10004",
    userName: "赵六",
    userEmail: "zhaoliu@example.com",
    userLevel: "普通",
    amount: "200000.00",
    currency: "USDT",
    network: "TRC20",
    address: "TYnh8bLejT9kM2nO3pQ4rS5tU6vW7xY8z",
    fee: "1.00",
    actualAmount: "199999.00",
    accountBalance: "205000.00",
    riskLevel: "high",
    riskReasons: ["新注册用户", "大额提币", "提币地址在黑名单附近"],
    ipAddress: "45.33.32.156",
    device: "Android",
    createdAt: "2026-01-06 16:20:15",
    status: "rejected",
    auditor: "审核员B",
    auditTime: "2026-01-06 17:00:00",
    auditRemark: "地址风险较高，建议用户更换地址"
  },
]

export default function LargeWithdrawalAuditPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [riskFilter, setRiskFilter] = useState("all")
  const [detailSheetOpen, setDetailSheetOpen] = useState(false)
  const [auditSheetOpen, setAuditSheetOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<WithdrawalRecord | null>(null)
  const [auditAction, setAuditAction] = useState<"approve" | "reject">("approve")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const stats = {
    pendingCount: mockRecords.filter(r => r.status === 'pending').length,
    approvedCount: mockRecords.filter(r => r.status === 'approved').length,
    rejectedCount: mockRecords.filter(r => r.status === 'rejected').length,
    todayAmount: "425,000.00"
  }

  const filteredRecords = mockRecords.filter(record => {
    if (activeTab !== "all" && record.status !== activeTab) return false
    if (riskFilter !== "all" && record.riskLevel !== riskFilter) return false
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        record.userId.toLowerCase().includes(query) ||
        record.userName.toLowerCase().includes(query) ||
        record.orderId.toLowerCase().includes(query) ||
        record.address.toLowerCase().includes(query)
      )
    }
    return true
  })

  const totalPages = Math.ceil(filteredRecords.length / pageSize)
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const openDetail = (record: WithdrawalRecord) => {
    setSelectedRecord(record)
    setDetailSheetOpen(true)
  }

  const openAudit = (record: WithdrawalRecord, action: "approve" | "reject") => {
    setSelectedRecord(record)
    setAuditAction(action)
    setAuditSheetOpen(true)
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      processing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      approved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    }
    const labels: Record<string, string> = {
      pending: "待审核",
      processing: "处理中",
      approved: "已通过",
      rejected: "已拒绝"
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{labels[status]}</span>
  }

  const getRiskBadge = (level: string) => {
    const styles: Record<string, string> = {
      low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    }
    const labels: Record<string, string> = {
      low: "低风险",
      medium: "中风险",
      high: "高风险"
    }
    return <span className={`px-2 py-1 rounded text-xs font-medium ${styles[level]}`}>{labels[level]}</span>
  }

  return (
    <OrdersLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">大额提币审核</h1>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">待审核</p>
                  <h3 className="text-2xl font-bold text-yellow-500">{stats.pendingCount}</h3>
                </div>
                <AlertTriangle className="w-10 h-10 text-yellow-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已通过</p>
                  <h3 className="text-2xl font-bold text-green-500">{stats.approvedCount}</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已拒绝</p>
                  <h3 className="text-2xl font-bold text-red-500">{stats.rejectedCount}</h3>
                </div>
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日提币金额</p>
                  <h3 className="text-2xl font-bold text-custom-green">${stats.todayAmount}</h3>
                </div>
                <ShieldCheck className="w-10 h-10 text-custom-green" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索用户ID、用户名、订单号、地址..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-9"
                  />
                </div>

                <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setCurrentPage(1); }}>
                  <TabsList className="h-9">
                    <TabsTrigger value="all" className="h-7 px-3 text-xs">全部</TabsTrigger>
                    <TabsTrigger value="pending" className="h-7 px-3 text-xs">待审核</TabsTrigger>
                    <TabsTrigger value="approved" className="h-7 px-3 text-xs">已通过</TabsTrigger>
                    <TabsTrigger value="rejected" className="h-7 px-3 text-xs">已拒绝</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Select value={riskFilter} onValueChange={(v) => { setRiskFilter(v); setCurrentPage(1); }}>
                  <SelectTrigger className="w-28 h-9">
                    <SelectValue placeholder="风险" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部风险</SelectItem>
                    <SelectItem value="high">高风险</SelectItem>
                    <SelectItem value="medium">中风险</SelectItem>
                    <SelectItem value="low">低风险</SelectItem>
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">金额</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">币种/网络</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">提币地址</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">风险等级</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">提交时间</th>
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
                        <div className="text-gray-500 dark:text-gray-400 text-xs">{record.userId} · {record.userLevel}</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-white">{record.amount}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-gray-900 dark:text-white">{record.currency}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs">{record.network}</div>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-500 dark:text-gray-400 truncate max-w-[150px]" title={record.address}>
                        {record.address.slice(0, 10)}...{record.address.slice(-8)}
                      </td>
                      <td className="px-4 py-3">{getRiskBadge(record.riskLevel)}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{record.createdAt}</td>
                      <td className="px-4 py-3">{getStatusBadge(record.status)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDetail(record)}
                            className="h-7 px-2 text-custom-green hover:text-custom-green hover:bg-custom-green/10"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {record.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => openAudit(record, 'approve')}
                                className="h-7 px-2 bg-green-500 hover:bg-green-600 text-white"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => openAudit(record, 'reject')}
                                className="h-7 px-2"
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedRecords.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
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

      <Sheet open={detailSheetOpen} onOpenChange={setDetailSheetOpen}>
        <SheetContent className="w-[550px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-custom-green" />
              提币详情
            </SheetTitle>
          </SheetHeader>
          {selectedRecord && (
            <div className="py-4 space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Wallet className="w-4 h-4" />
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
                    <p className="text-gray-500 dark:text-gray-400">提币金额</p>
                    <p className="font-bold text-xl text-gray-900 dark:text-white">{selectedRecord.amount} {selectedRecord.currency}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">实际到账</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedRecord.actualAmount} {selectedRecord.currency}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">手续费</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.fee} {selectedRecord.currency}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">账户余额</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.accountBalance} {selectedRecord.currency}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  提币信息
                </h3>
                <div className="text-sm space-y-2">
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">网络</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.network}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">提币地址</p>
                    <p className="font-mono text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded break-all">{selectedRecord.address}</p>
                  </div>
                  {selectedRecord.txHash && (
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400">交易哈希</p>
                      <p className="font-mono text-xs text-custom-green">{selectedRecord.txHash}</p>
                    </div>
                  )}
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
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">用户等级</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.userLevel}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">邮箱</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.userEmail}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">IP地址</p>
                    <p className="font-mono text-gray-900 dark:text-white">{selectedRecord.ipAddress}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500 dark:text-gray-400">设备</p>
                    <p className="text-gray-900 dark:text-white">{selectedRecord.device}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  风险评估
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  {getRiskBadge(selectedRecord.riskLevel)}
                </div>
                {selectedRecord.riskReasons.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedRecord.riskReasons.map((reason, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                        <AlertTriangle className="w-3 h-3" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-green-600 dark:text-green-400">无风险提示</p>
                )}
              </div>

              {selectedRecord.auditor && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    审核信息
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400">审核员</p>
                      <p className="text-gray-900 dark:text-white">{selectedRecord.auditor}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400">审核时间</p>
                      <p className="text-gray-900 dark:text-white">{selectedRecord.auditTime}</p>
                    </div>
                    {selectedRecord.auditRemark && (
                      <div className="col-span-2 space-y-1">
                        <p className="text-gray-500 dark:text-gray-400">审核备注</p>
                        <p className="text-gray-900 dark:text-white">{selectedRecord.auditRemark}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedRecord.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => { setDetailSheetOpen(false); openAudit(selectedRecord, 'reject'); }}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    拒绝
                  </Button>
                  <Button 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => { setDetailSheetOpen(false); openAudit(selectedRecord, 'approve'); }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    通过
                  </Button>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={auditSheetOpen} onOpenChange={setAuditSheetOpen}>
        <SheetContent className="w-[450px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {auditAction === 'approve' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              {auditAction === 'approve' ? '通过审核' : '拒绝审核'}
            </SheetTitle>
          </SheetHeader>
          {selectedRecord && (
            <div className="py-4 space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">用户</span>
                  <span className="font-medium">{selectedRecord.userName} ({selectedRecord.userId})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">金额</span>
                  <span className="font-bold">{selectedRecord.amount} {selectedRecord.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">网络</span>
                  <span>{selectedRecord.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">风险等级</span>
                  {getRiskBadge(selectedRecord.riskLevel)}
                </div>
              </div>

              {auditAction === 'reject' && (
                <div className="space-y-1.5">
                  <Label>拒绝原因</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择拒绝原因" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="address_risk">地址风险</SelectItem>
                      <SelectItem value="amount_abnormal">金额异常</SelectItem>
                      <SelectItem value="user_risk">用户风险</SelectItem>
                      <SelectItem value="need_verify">需进一步验证</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-1.5">
                <Label>审核备注</Label>
                <Textarea 
                  placeholder={auditAction === 'approve' ? "可选：输入审核备注..." : "请输入拒绝原因说明..."} 
                  rows={3} 
                />
              </div>

              {auditAction === 'approve' && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    通过后将立即执行提币操作
                  </p>
                </div>
              )}

              {auditAction === 'reject' && (
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    拒绝后资金将退回用户账户
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setAuditSheetOpen(false)}>取消</Button>
                <Button 
                  className={`flex-1 ${auditAction === 'approve' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                  onClick={() => setAuditSheetOpen(false)}
                >
                  确认{auditAction === 'approve' ? '通过' : '拒绝'}
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </OrdersLayout>
  )
}
