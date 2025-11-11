'use client'

import { useState } from 'react'
import { ArrowDownToLine, Search, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// 充值记录类型定义
interface RechargeRecord {
  id: string
  recordId: string
  userId: string
  username: string
  cardNumber: string
  amount: string
  method: string
  status: 'completed' | 'pending' | 'failed'
  createdAt: string
  completedAt: string | null
}

export default function UCardRechargeRecordsPage() {
  // 示例数据
  const [records] = useState<RechargeRecord[]>([
    {
      id: '1',
      recordId: 'RC-20241110-001',
      userId: 'U123456',
      username: '张三',
      cardNumber: '**** **** **** 5678',
      amount: '500.00',
      method: 'USDT',
      status: 'completed',
      createdAt: '2024-11-10 08:30:00',
      completedAt: '2024-11-10 08:31:00',
    },
    {
      id: '2',
      recordId: 'RC-20241110-002',
      userId: 'U234567',
      username: '李四',
      cardNumber: '**** **** **** 1234',
      amount: '1000.00',
      method: 'Bank Transfer',
      status: 'completed',
      createdAt: '2024-11-10 09:15:00',
      completedAt: '2024-11-10 09:20:00',
    },
    {
      id: '3',
      recordId: 'RC-20241110-003',
      userId: 'U345678',
      username: '王五',
      cardNumber: '**** **** **** 9012',
      amount: '300.00',
      method: 'USDT',
      status: 'pending',
      createdAt: '2024-11-10 10:00:00',
      completedAt: null,
    },
    {
      id: '4',
      recordId: 'RC-20241109-020',
      userId: 'U456789',
      username: '赵六',
      cardNumber: '**** **** **** 3456',
      amount: '200.00',
      method: 'Bank Transfer',
      status: 'failed',
      createdAt: '2024-11-09 16:30:00',
      completedAt: null,
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // 统计数据
  const stats = {
    total: records.length,
    completed: records.filter(r => r.status === 'completed').length,
    pending: records.filter(r => r.status === 'pending').length,
    totalAmount: records.filter(r => r.status === 'completed').reduce((sum, r) => sum + parseFloat(r.amount), 0).toFixed(2),
  }

  // 过滤记录
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.recordId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.username.includes(searchQuery)
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    const badges = {
      completed: <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">已完成</span>,
      pending: <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">处理中</span>,
      failed: <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">失败</span>,
    }
    return badges[status as keyof typeof badges]
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡充值记录</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            查看和管理所有U卡的充值记录
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          导出记录
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">总记录数</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">已完成</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.completed}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">处理中</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.pending}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">充值总额</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">${stats.totalAmount}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索记录ID、用户ID、用户名..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-green"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="全部状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="completed">已完成</SelectItem>
            <SelectItem value="pending">处理中</SelectItem>
            <SelectItem value="failed">失败</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 充值记录列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    记录ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    用户信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    卡号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    充值金额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    充值方式
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    创建时间
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {record.recordId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {record.username}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {record.userId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        {record.cardNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                        ${record.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {record.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(record.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {record.createdAt}
                      </div>
                      {record.completedAt && (
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          完成: {record.completedAt}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <ArrowDownToLine className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无充值记录</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">用户的充值记录将显示在此处</p>
          </div>
        )}
      </div>
    </div>
  )
}
