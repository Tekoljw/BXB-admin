"use client"

import React, { useState } from "react"
import { Eye, Search, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  email: string
  phone: string
  totalCommission: number
  monthlyCommission: number
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
    email: "zhangsan@example.com",
    phone: "+86 138-0000-0001",
    totalCommission: 125000.50,
    monthlyCommission: 12500.00,
    merchantCount: 15,
    status: "active"
  },
  {
    agentId: "AG002",
    agentName: "李四代理",
    email: "lisi@example.com",
    phone: "+86 138-0000-0002",
    totalCommission: 98500.25,
    monthlyCommission: 9850.00,
    merchantCount: 12,
    status: "active"
  },
  {
    agentId: "AG003",
    agentName: "王五代理",
    email: "wangwu@example.com",
    phone: "+86 138-0000-0003",
    totalCommission: 85200.00,
    monthlyCommission: 8520.00,
    merchantCount: 10,
    status: "active"
  },
  {
    agentId: "AG004",
    agentName: "赵六代理",
    email: "zhaoliu@example.com",
    phone: "+86 138-0000-0004",
    totalCommission: 72000.75,
    monthlyCommission: 7200.00,
    merchantCount: 8,
    status: "active"
  },
  {
    agentId: "AG005",
    agentName: "孙七代理",
    email: "sunqi@example.com",
    phone: "+86 138-0000-0005",
    totalCommission: 68500.00,
    monthlyCommission: 6850.00,
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

const mockRecords: Record<string, CommissionRecord[]> = {
  "AG001": [
    {
      id: "COM001",
      orderId: "ORD2024110601",
      amount: 1500.00,
      commission: 15.00,
      rate: "1.0%",
      merchantId: "M001",
      createdAt: "2024-11-06 10:30:00",
      status: "settled"
    },
    {
      id: "COM002",
      orderId: "ORD2024110602",
      amount: 2800.00,
      commission: 28.00,
      rate: "1.0%",
      merchantId: "M002",
      createdAt: "2024-11-06 10:45:00",
      status: "settled"
    },
  ],
  "AG002": [
    {
      id: "COM005",
      orderId: "ORD2024110605",
      amount: 8500.00,
      commission: 85.00,
      rate: "1.0%",
      merchantId: "M004",
      createdAt: "2024-11-06 11:30:00",
      status: "settled"
    },
  ],
}

export default function CommissionPage() {
  const [agents] = useState<Agent[]>(mockAgents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCommissionDialogOpen, setIsCommissionDialogOpen] = useState(false)
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [channelCommissions, setChannelCommissions] = useState<ChannelCommission[]>([])
  const [agentRecords, setAgentRecords] = useState<CommissionRecord[]>([])

  const filteredAgents = agents.filter(agent => 
    agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.phone.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openCommissionDialog = (agent: Agent) => {
    setSelectedAgent(agent)
    setChannelCommissions(mockChannelCommissions[agent.agentId] || [])
    setIsCommissionDialogOpen(true)
  }

  const openRecordDialog = (agent: Agent) => {
    setSelectedAgent(agent)
    setAgentRecords(mockRecords[agent.agentId] || [])
    setIsRecordDialogOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">代理商管理</h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="搜索代理商名称、邮箱、电话或ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
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
              {filteredAgents.map((agent) => (
                <tr key={agent.agentId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">{agent.agentName}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{agent.agentId}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="text-gray-900 dark:text-gray-300">{agent.email}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{agent.phone}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="font-semibold text-green-600 dark:text-green-400">
                      累计: ${agent.totalCommission.toLocaleString()}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                      本月: ${agent.monthlyCommission.toLocaleString()}
                    </div>
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
              ))}
            </tbody>
          </table>
        </div>

        {filteredAgents.length === 0 && (
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
              代理商ID: {selectedAgent?.agentId || "-"} | 累计佣金: ${selectedAgent ? selectedAgent.totalCommission.toLocaleString() : "0"}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
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
                  {agentRecords.map((record) => (
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

            {agentRecords.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                该代理商暂无佣金记录
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
