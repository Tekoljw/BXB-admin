"use client"

import React, { useState, useMemo } from "react"
import { Eye, Search, Percent, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Agent {
  agentId: string
  agentName: string
  merchantId: string
  userId: string
  email: string
  phone: string
  todayCommission: number
  yesterdayCommission: number
  monthlyCommission: number
  totalCommission: number
  merchantCount: number
  status: "active" | "inactive"
}

interface ChannelCommission {
  channelId: string
  channelName: string
  paymentMethod: string
  commissionRate: number
  lastUpdated: string
}

interface CommissionRecord {
  id: string
  orderId: string
  amount: number
  commission: number
  rate: string
  merchantId: string
  createdAt: string
  status: "pending" | "settled"
}

const mockAgents: Agent[] = [
  {
    agentId: "AG001",
    agentName: "张三代理",
    merchantId: "M0001",
    userId: "U100001",
    email: "zhangsan@example.com",
    phone: "+86 138-0000-0001",
    todayCommission: 850.00,
    yesterdayCommission: 920.50,
    monthlyCommission: 12500.00,
    totalCommission: 125000.50,
    merchantCount: 15,
    status: "active"
  },
  {
    agentId: "AG002",
    agentName: "李四代理",
    merchantId: "M0002",
    userId: "U100002",
    email: "lisi@example.com",
    phone: "+86 138-0000-0002",
    todayCommission: 720.00,
    yesterdayCommission: 780.25,
    monthlyCommission: 9850.00,
    totalCommission: 98500.25,
    merchantCount: 12,
    status: "active"
  },
  {
    agentId: "AG003",
    agentName: "王五代理",
    merchantId: "M0003",
    userId: "U100003",
    email: "wangwu@example.com",
    phone: "+86 138-0000-0003",
    todayCommission: 650.00,
    yesterdayCommission: 690.00,
    monthlyCommission: 8520.00,
    totalCommission: 85200.00,
    merchantCount: 10,
    status: "active"
  },
  {
    agentId: "AG004",
    agentName: "赵六代理",
    merchantId: "M0004",
    userId: "U100004",
    email: "zhaoliu@example.com",
    phone: "+86 138-0000-0004",
    todayCommission: 580.00,
    yesterdayCommission: 610.75,
    monthlyCommission: 7200.00,
    totalCommission: 72000.75,
    merchantCount: 8,
    status: "active"
  },
  {
    agentId: "AG005",
    agentName: "孙七代理",
    merchantId: "M0005",
    userId: "U100005",
    email: "sunqi@example.com",
    phone: "+86 138-0000-0005",
    todayCommission: 550.00,
    yesterdayCommission: 590.00,
    monthlyCommission: 6850.00,
    totalCommission: 68500.00,
    merchantCount: 7,
    status: "inactive"
  },
]

const mockChannelCommissions: Record<string, ChannelCommission[]> = {
  "AG001": [
    {
      channelId: "CH001",
      channelName: "支付宝收款通道A",
      paymentMethod: "支付宝",
      commissionRate: 1.2,
      lastUpdated: "2024-11-01"
    },
    {
      channelId: "CH002",
      channelName: "微信收款通道B",
      paymentMethod: "微信支付",
      commissionRate: 1.0,
      lastUpdated: "2024-11-01"
    },
    {
      channelId: "CH003",
      channelName: "银行卡收款通道C",
      paymentMethod: "银行卡",
      commissionRate: 0.8,
      lastUpdated: "2024-11-01"
    },
    {
      channelId: "CH004",
      channelName: "USDT收款通道D",
      paymentMethod: "USDT",
      commissionRate: 1.5,
      lastUpdated: "2024-11-01"
    },
  ],
  "AG002": [
    {
      channelId: "CH001",
      channelName: "支付宝收款通道A",
      paymentMethod: "支付宝",
      commissionRate: 1.0,
      lastUpdated: "2024-10-28"
    },
    {
      channelId: "CH002",
      channelName: "微信收款通道B",
      paymentMethod: "微信支付",
      commissionRate: 0.9,
      lastUpdated: "2024-10-28"
    },
    {
      channelId: "CH005",
      channelName: "云闪付通道E",
      paymentMethod: "云闪付",
      commissionRate: 0.85,
      lastUpdated: "2024-10-28"
    },
  ],
  "AG003": [
    {
      channelId: "CH001",
      channelName: "支付宝收款通道A",
      paymentMethod: "支付宝",
      commissionRate: 0.95,
      lastUpdated: "2024-10-25"
    },
    {
      channelId: "CH003",
      channelName: "银行卡收款通道C",
      paymentMethod: "银行卡",
      commissionRate: 0.75,
      lastUpdated: "2024-10-25"
    },
    {
      channelId: "CH004",
      channelName: "USDT收款通道D",
      paymentMethod: "USDT",
      commissionRate: 1.3,
      lastUpdated: "2024-10-25"
    },
  ],
  "AG004": [
    {
      channelId: "CH002",
      channelName: "微信收款通道B",
      paymentMethod: "微信支付",
      commissionRate: 0.95,
      lastUpdated: "2024-10-20"
    },
    {
      channelId: "CH003",
      channelName: "银行卡收款通道C",
      paymentMethod: "银行卡",
      commissionRate: 0.7,
      lastUpdated: "2024-10-20"
    },
  ],
  "AG005": [
    {
      channelId: "CH001",
      channelName: "支付宝收款通道A",
      paymentMethod: "支付宝",
      commissionRate: 0.9,
      lastUpdated: "2024-10-15"
    },
    {
      channelId: "CH004",
      channelName: "USDT收款通道D",
      paymentMethod: "USDT",
      commissionRate: 1.2,
      lastUpdated: "2024-10-15"
    },
  ],
}

const generateMockRecords = (count: number): CommissionRecord[] => {
  const records: CommissionRecord[] = []
  const merchants = ["M001", "M002", "M003", "M004", "M005", "M006", "M007", "M008"]
  const statuses: ("pending" | "settled")[] = ["settled", "settled", "settled", "pending"]
  
  for (let i = 1; i <= count; i++) {
    const date = new Date(2024, 9, 1 + Math.floor(i / 20))
    const dateStr = date.toISOString().split('T')[0]
    const timeStr = `${String(9 + Math.floor(i / 10) % 12).padStart(2, '0')}:${String((i * 15) % 60).padStart(2, '0')}:00`
    
    records.push({
      id: `COM${String(i).padStart(4, '0')}`,
      orderId: `ORD${dateStr.replace(/-/g, '')}${String(i).padStart(3, '0')}`,
      amount: Math.floor(Math.random() * 9000) + 1000,
      commission: Math.floor(Math.random() * 90) + 10,
      rate: `${(Math.random() * 1.5 + 0.5).toFixed(1)}%`,
      merchantId: merchants[i % merchants.length],
      createdAt: `${dateStr} ${timeStr}`,
      status: statuses[i % statuses.length]
    })
  }
  
  return records
}

const mockRecords: Record<string, CommissionRecord[]> = {
  "AG001": generateMockRecords(120),
  "AG002": generateMockRecords(85),
  "AG003": generateMockRecords(65),
  "AG004": generateMockRecords(45),
  "AG005": generateMockRecords(30),
}

export default function CommissionPage() {
  const [agents] = useState<Agent[]>(mockAgents)
  const [searchTerm, setSearchTerm] = useState("")
  const [rankingType, setRankingType] = useState("today")
  const [isCommissionDialogOpen, setIsCommissionDialogOpen] = useState(false)
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [channelCommissions, setChannelCommissions] = useState<ChannelCommission[]>([])
  const [agentRecords, setAgentRecords] = useState<CommissionRecord[]>([])
  
  // 详情对话框的筛选和分页状态
  const [recordCurrentPage, setRecordCurrentPage] = useState(1)
  const [recordStartDate, setRecordStartDate] = useState("")
  const [recordEndDate, setRecordEndDate] = useState("")
  const [recordMerchantId, setRecordMerchantId] = useState("")
  const recordsPerPage = 50

  const filteredAgents = agents.filter(agent => 
    agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.merchantId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.phone.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (rankingType) {
      case "today":
        return b.todayCommission - a.todayCommission
      case "yesterday":
        return b.yesterdayCommission - a.yesterdayCommission
      case "month":
        return b.monthlyCommission - a.monthlyCommission
      case "total":
        return b.totalCommission - a.totalCommission
      case "merchants":
        return b.merchantCount - a.merchantCount
      default:
        return 0
    }
  })

  const openCommissionDialog = (agent: Agent) => {
    setSelectedAgent(agent)
    setChannelCommissions(mockChannelCommissions[agent.agentId] || [])
    setIsCommissionDialogOpen(true)
  }

  const openRecordDialog = (agent: Agent) => {
    setSelectedAgent(agent)
    setAgentRecords(mockRecords[agent.agentId] || [])
    // 重置筛选和分页状态
    setRecordCurrentPage(1)
    setRecordStartDate("")
    setRecordEndDate("")
    setRecordMerchantId("")
    setIsRecordDialogOpen(true)
  }

  // 筛选和分页佣金记录
  const { filteredRecords, totalPages, currentPageRecords } = useMemo(() => {
    // 先筛选
    let filtered = agentRecords.filter(record => {
      // 商户ID筛选
      if (recordMerchantId && !record.merchantId.toLowerCase().includes(recordMerchantId.toLowerCase())) {
        return false
      }

      // 日期筛选
      if (recordStartDate || recordEndDate) {
        const recordDate = new Date(record.createdAt.split(" ")[0])
        if (recordStartDate) {
          const startDate = new Date(recordStartDate)
          if (recordDate < startDate) return false
        }
        if (recordEndDate) {
          const endDate = new Date(recordEndDate)
          if (recordDate > endDate) return false
        }
      }

      return true
    })

    // 计算总页数
    const total = Math.ceil(filtered.length / recordsPerPage)

    // 分页
    const startIndex = (recordCurrentPage - 1) * recordsPerPage
    const endIndex = startIndex + recordsPerPage
    const paginated = filtered.slice(startIndex, endIndex)

    return {
      filteredRecords: filtered,
      totalPages: total,
      currentPageRecords: paginated
    }
  }, [agentRecords, recordMerchantId, recordStartDate, recordEndDate, recordCurrentPage, recordsPerPage])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">代理商管理</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          给自己配置了佣金大于0的用户则自动成为支付代理商，未配置过佣金的用户则不显示在本页面
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">排名筛选</label>
          <Tabs value={rankingType} onValueChange={setRankingType}>
            <TabsList className="grid grid-cols-5 w-full max-w-3xl">
              <TabsTrigger value="today">今日佣金排名</TabsTrigger>
              <TabsTrigger value="yesterday">昨日佣金排名</TabsTrigger>
              <TabsTrigger value="month">本月佣金排名</TabsTrigger>
              <TabsTrigger value="total">历史佣金排名</TabsTrigger>
              <TabsTrigger value="merchants">商户数排名</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索代理商名称、邮箱、电话、代理商ID、商户ID或UserID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  排名
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  代理商信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  联系方式
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  佣金数据
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  商户数量
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedAgents.map((agent, index) => {
                const getRankDisplay = () => {
                  if (index === 0) return <span className="text-yellow-500 font-bold text-lg">🥇</span>
                  if (index === 1) return <span className="text-gray-400 font-bold text-lg">🥈</span>
                  if (index === 2) return <span className="text-orange-600 font-bold text-lg">🥉</span>
                  return <span className="text-gray-600 dark:text-gray-400 font-medium">#{index + 1}</span>
                }

                const getCommissionDisplay = () => {
                  switch (rankingType) {
                    case "today":
                      return (
                        <>
                          <div className="font-semibold text-blue-600 dark:text-blue-400">
                            今日: ${agent.todayCommission.toLocaleString()}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                            累计: ${agent.totalCommission.toLocaleString()}
                          </div>
                        </>
                      )
                    case "yesterday":
                      return (
                        <>
                          <div className="font-semibold text-purple-600 dark:text-purple-400">
                            昨日: ${agent.yesterdayCommission.toLocaleString()}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                            累计: ${agent.totalCommission.toLocaleString()}
                          </div>
                        </>
                      )
                    case "month":
                      return (
                        <>
                          <div className="font-semibold text-orange-600 dark:text-orange-400">
                            本月: ${agent.monthlyCommission.toLocaleString()}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                            累计: ${agent.totalCommission.toLocaleString()}
                          </div>
                        </>
                      )
                    case "total":
                      return (
                        <>
                          <div className="font-semibold text-green-600 dark:text-green-400">
                            累计: ${agent.totalCommission.toLocaleString()}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                            本月: ${agent.monthlyCommission.toLocaleString()}
                          </div>
                        </>
                      )
                    case "merchants":
                      return (
                        <>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            商户数: {agent.merchantCount} 个
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                            累计佣金: ${agent.totalCommission.toLocaleString()}
                          </div>
                        </>
                      )
                    default:
                      return null
                  }
                }

                return (
                  <tr key={agent.agentId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 text-sm text-center">
                      {getRankDisplay()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">{agent.agentName}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        代理商ID: {agent.agentId}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                        商户ID: {agent.merchantId} | UserID: {agent.userId}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="text-gray-900 dark:text-gray-300">{agent.email}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{agent.phone}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {getCommissionDisplay()}
                    </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {agent.merchantCount} 个
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      agent.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300"
                    }`}>
                      {agent.status === "active" ? "启用" : "停用"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openCommissionDialog(agent)}
                        className="text-custom-green hover:text-custom-green/80"
                      >
                        <Percent className="w-4 h-4 mr-1" />
                        佣金比例
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openRecordDialog(agent)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        详情
                      </Button>
                    </div>
                  </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {sortedAgents.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            暂无数据
          </div>
        )}
      </div>

      {/* 佣金比例对话框 */}
      <Dialog open={isCommissionDialogOpen} onOpenChange={setIsCommissionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>佣金比例设置 - {selectedAgent?.agentName || "-"}</DialogTitle>
            <DialogDescription>
              代理商ID: {selectedAgent?.agentId || "-"} | 查看该代理商在各支付通道的佣金比例
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      通道ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      通道名称
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      支付方式
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      佣金比例
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      更新时间
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {channelCommissions.map((commission) => (
                    <tr key={commission.channelId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {commission.channelId}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                        {commission.channelName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                          {commission.paymentMethod}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="font-bold text-lg text-custom-green">
                          {commission.commissionRate}%
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {commission.lastUpdated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {channelCommissions.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                该代理商暂无佣金比例设置
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 佣金记录对话框 */}
      <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>佣金详细记录 - {selectedAgent?.agentName || "-"}</DialogTitle>
            <DialogDescription>
              代理商ID: {selectedAgent?.agentId || "-"} | 累计佣金: ${selectedAgent ? selectedAgent.totalCommission.toLocaleString() : "0"} | 共 {filteredRecords.length} 条记录
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {/* 筛选区域 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  开始日期
                </label>
                <Input
                  type="date"
                  value={recordStartDate}
                  onChange={(e) => {
                    setRecordStartDate(e.target.value)
                    setRecordCurrentPage(1) // 重置到第一页
                  }}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  结束日期
                </label>
                <Input
                  type="date"
                  value={recordEndDate}
                  onChange={(e) => {
                    setRecordEndDate(e.target.value)
                    setRecordCurrentPage(1) // 重置到第一页
                  }}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  商户ID搜索
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索商户ID..."
                    value={recordMerchantId}
                    onChange={(e) => {
                      setRecordMerchantId(e.target.value)
                      setRecordCurrentPage(1) // 重置到第一页
                    }}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      记录ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      订单号
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      商户ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      订单金额
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      佣金比例
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      佣金金额
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      创建时间
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      状态
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentPageRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {record.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {record.orderId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {record.merchantId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        ${record.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {record.rate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ${record.commission.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {record.createdAt}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === "settled"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        }`}>
                          {record.status === "settled" ? "已结算" : "待结算"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {currentPageRecords.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                {agentRecords.length === 0 ? "该代理商暂无佣金记录" : "没有符合条件的记录"}
              </div>
            )}

            {/* 分页控件 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  显示第 {((recordCurrentPage - 1) * recordsPerPage) + 1} - {Math.min(recordCurrentPage * recordsPerPage, filteredRecords.length)} 条，
                  共 {filteredRecords.length} 条
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRecordCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={recordCurrentPage === 1}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    上一页
                  </Button>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    第 {recordCurrentPage} / {totalPages} 页
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRecordCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={recordCurrentPage === totalPages}
                    className="flex items-center gap-1"
                  >
                    下一页
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
