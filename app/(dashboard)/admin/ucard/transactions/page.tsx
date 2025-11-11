'use client'

import { useState } from 'react'
import { ShoppingCart, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"

// 消费记录类型定义
interface Transaction {
  id: string
  transactionId: string
  userId: string
  username: string
  cardNumber: string
  merchant: string
  category: string
  amount: string
  status: 'completed' | 'pending' | 'declined'
  transactionAt: string
}

export default function UCardTransactionsPage() {
  // 示例数据
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      transactionId: 'TX-20241110-001',
      userId: 'U123456',
      username: '张三',
      cardNumber: '**** **** **** 5678',
      merchant: 'Amazon',
      category: '网购',
      amount: '89.99',
      status: 'completed',
      transactionAt: '2024-11-10 08:30:00',
    },
    {
      id: '2',
      transactionId: 'TX-20241110-002',
      userId: 'U234567',
      username: '李四',
      cardNumber: '**** **** **** 1234',
      merchant: 'Netflix',
      category: '订阅服务',
      amount: '15.99',
      status: 'completed',
      transactionAt: '2024-11-10 09:15:00',
    },
    {
      id: '3',
      transactionId: 'TX-20241110-003',
      userId: 'U345678',
      username: '王五',
      cardNumber: '**** **** **** 9012',
      merchant: 'Google Play',
      category: '应用购买',
      amount: '9.99',
      status: 'pending',
      transactionAt: '2024-11-10 10:00:00',
    },
    {
      id: '4',
      transactionId: 'TX-20241110-004',
      userId: 'U456789',
      username: '赵六',
      cardNumber: '**** **** **** 3456',
      merchant: 'Uber',
      category: '交通出行',
      amount: '25.50',
      status: 'completed',
      transactionAt: '2024-11-10 11:20:00',
    },
    {
      id: '5',
      transactionId: 'TX-20241109-050',
      userId: 'U567890',
      username: '孙七',
      cardNumber: '**** **** **** 7890',
      merchant: 'Unknown Merchant',
      category: '其他',
      amount: '500.00',
      status: 'declined',
      transactionAt: '2024-11-09 22:30:00',
    },
  ])

  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [filterStatus, setFilterStatus] = useState('all')

  // 统计数据
  const stats = {
    total: transactions.length,
    completed: transactions.filter(t => t.status === 'completed').length,
    pending: transactions.filter(t => t.status === 'pending').length,
    totalAmount: transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + parseFloat(t.amount), 0).toFixed(2),
  }

  // 过滤交易
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.username.includes(searchTerm) ||
                         tx.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    const badges = {
      completed: <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">成功</span>,
      pending: <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">处理中</span>,
      declined: <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">拒绝</span>,
    }
    return badges[status as keyof typeof badges]
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡消费记录</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            查看和管理所有U卡的消费交易记录
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
          <div className="text-sm text-gray-500 dark:text-gray-400">总交易数</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">成功交易</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.completed}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">处理中</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.pending}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">消费总额</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">${stats.totalAmount}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchControls
          placeholder="搜索交易ID、用户、商户..."
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearch}
          onReset={handleReset}
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="全部状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="completed">成功</SelectItem>
            <SelectItem value="pending">处理中</SelectItem>
            <SelectItem value="declined">拒绝</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 交易记录列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    交易ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    用户信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    卡号
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    商户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    类别
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    金额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    交易时间
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {tx.transactionId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {tx.username}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {tx.userId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        {tx.cardNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {tx.merchant}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {tx.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${tx.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(tx.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {tx.transactionAt}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无消费记录</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">用户的消费交易将显示在此处</p>
          </div>
        )}
      </div>
    </div>
  )
}
