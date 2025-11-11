'use client'

import { useState } from 'react'
import { TrendingUp, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// 资产变化记录类型定义
interface AssetChange {
  id: string
  userId: string
  username: string
  balanceBefore: string
  changeAmount: string
  balanceAfter: string
  assetName: string
  changeType: 'increase' | 'decrease'
  changeTime: string
  reason: string
}

export default function AssetChangesPage() {
  // 示例数据
  const [changes] = useState<AssetChange[]>([
    {
      id: '1',
      userId: 'U123456',
      username: '张三',
      balanceBefore: '10,000.00',
      changeAmount: '+500.00',
      balanceAfter: '10,500.00',
      assetName: 'USDT',
      changeType: 'increase',
      changeTime: '2024-11-10 08:30:00',
      reason: '充值',
    },
    {
      id: '2',
      userId: 'U234567',
      username: '李四',
      balanceBefore: '5,000.00',
      changeAmount: '-200.00',
      balanceAfter: '4,800.00',
      assetName: 'USDT',
      changeType: 'decrease',
      changeTime: '2024-11-10 09:15:00',
      reason: '消费',
    },
    {
      id: '3',
      userId: 'U345678',
      username: '王五',
      balanceBefore: '15,000.00',
      changeAmount: '+1,000.00',
      balanceAfter: '16,000.00',
      assetName: 'USD',
      changeType: 'increase',
      changeTime: '2024-11-10 10:00:00',
      reason: '充值',
    },
    {
      id: '4',
      userId: 'U456789',
      username: '赵六',
      balanceBefore: '3,500.00',
      changeAmount: '-100.00',
      balanceAfter: '3,400.00',
      assetName: 'USDT',
      changeType: 'decrease',
      changeTime: '2024-11-10 11:20:00',
      reason: '手续费扣除',
    },
    {
      id: '5',
      userId: 'U567890',
      username: '孙七',
      balanceBefore: '8,000.00',
      changeAmount: '-500.00',
      balanceAfter: '7,500.00',
      assetName: 'USD',
      changeType: 'decrease',
      changeTime: '2024-11-10 12:10:00',
      reason: '退款',
    },
    {
      id: '6',
      userId: 'U123456',
      username: '张三',
      balanceBefore: '10,500.00',
      changeAmount: '+2,000.00',
      balanceAfter: '12,500.00',
      assetName: 'USDT',
      changeType: 'increase',
      changeTime: '2024-11-10 14:30:00',
      reason: '转入',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterAsset, setFilterAsset] = useState('all')
  const [filterType, setFilterType] = useState('all')

  // 统计数据
  const stats = {
    total: changes.length,
    increase: changes.filter(c => c.changeType === 'increase').length,
    decrease: changes.filter(c => c.changeType === 'decrease').length,
    totalIncrease: changes
      .filter(c => c.changeType === 'increase')
      .reduce((sum, c) => sum + parseFloat(c.changeAmount.replace(/[+,]/g, '')), 0)
      .toFixed(2),
  }

  // 过滤变化记录
  const filteredChanges = changes.filter(change => {
    const matchesSearch = change.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         change.username.includes(searchQuery) ||
                         change.reason.includes(searchQuery)
    const matchesAsset = filterAsset === 'all' || change.assetName === filterAsset
    const matchesType = filterType === 'all' || change.changeType === filterType
    return matchesSearch && matchesAsset && matchesType
  })

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡账户划转记录（原共管资产变动记录）</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          查看和管理所有用户的资产变动记录
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">总变动记录</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">增加记录</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.increase}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">减少记录</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{stats.decrease}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">累计增加</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">${stats.totalIncrease}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索用户ID、用户名、变动原因..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-green"
          />
        </div>
        <Select value={filterAsset} onValueChange={setFilterAsset}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="资产类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部资产</SelectItem>
            <SelectItem value="USDT">USDT</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="变动类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            <SelectItem value="increase">增加</SelectItem>
            <SelectItem value="decrease">减少</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 变化记录列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredChanges.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    用户信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    变动前余额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    变动金额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    当前余额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    资产名称
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    变动时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    变动原因
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredChanges.map((change) => (
                  <tr key={change.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {change.username}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {change.userId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        ${change.balanceBefore}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center gap-1 text-sm font-semibold ${
                        change.changeType === 'increase' 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {change.changeType === 'increase' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        ${change.changeAmount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${change.balanceAfter}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                        {change.assetName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {change.changeTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {change.reason}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <TrendingUp className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无资产变化记录</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">用户的资产变动将显示在此处</p>
          </div>
        )}
      </div>
    </div>
  )
}
