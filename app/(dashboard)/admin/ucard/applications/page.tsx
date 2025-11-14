'use client'

import { useState } from 'react'
import { CreditCard, Eye } from 'lucide-react'
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

// 开卡记录类型定义
interface Application {
  id: string
  applicationId: string
  userId: string
  username: string
  cardType: string
  supplier: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  appliedAt: string
  processedAt: string | null
}

export default function UCardApplicationsPage() {
  // 示例数据
  const [applications] = useState<Application[]>([
    {
      id: '1',
      applicationId: 'APP-20241110-001',
      userId: 'U123456',
      username: '张三',
      cardType: '虚拟卡',
      supplier: 'CardPro International',
      status: 'completed',
      appliedAt: '2024-11-10 08:30:00',
      processedAt: '2024-11-10 08:35:00',
    },
    {
      id: '2',
      applicationId: 'APP-20241110-002',
      userId: 'U234567',
      username: '李四',
      cardType: '实体卡',
      supplier: 'Global Card Solutions',
      status: 'approved',
      appliedAt: '2024-11-10 09:15:00',
      processedAt: '2024-11-10 09:20:00',
    },
    {
      id: '3',
      applicationId: 'APP-20241110-003',
      userId: 'U345678',
      username: '王五',
      cardType: '虚拟卡',
      supplier: 'VirtualCard Plus',
      status: 'pending',
      appliedAt: '2024-11-10 10:00:00',
      processedAt: null,
    },
    {
      id: '4',
      applicationId: 'APP-20241109-015',
      userId: 'U456789',
      username: '赵六',
      cardType: '虚拟卡',
      supplier: 'CardPro International',
      status: 'rejected',
      appliedAt: '2024-11-09 14:30:00',
      processedAt: '2024-11-09 14:45:00',
    },
  ])

  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [filterStatus, setFilterStatus] = useState('all')

  // 统计数据
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved' || a.status === 'completed').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  }

  // 过滤申请
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.username.includes(searchTerm)
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    const badges = {
      pending: <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">待审核</span>,
      approved: <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">已批准</span>,
      completed: <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">已完成</span>,
      rejected: <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">已拒绝</span>,
    }
    return badges[status as keyof typeof badges]
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡开卡记录</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          查看和管理所有用户的U卡开卡申请记录
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">总申请数</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">待审核</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.pending}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">已批准</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.approved}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">已拒绝</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{stats.rejected}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchControls
          placeholder="搜索申请ID、用户ID、用户名..."
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearch}
          onReset={handleReset}
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="pending">待审核</SelectItem>
            <SelectItem value="approved">已批准</SelectItem>
            <SelectItem value="completed">已完成</SelectItem>
            <SelectItem value="rejected">已拒绝</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 申请列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    申请ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    用户信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    卡类型
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    供应商
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    申请时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {app.applicationId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {app.username}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {app.userId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {app.cardType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {app.supplier}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {app.appliedAt}
                      </div>
                      {app.processedAt && (
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          处理: {app.processedAt}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        详情
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <CreditCard className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无开卡记录</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">用户的开卡申请将显示在此处</p>
          </div>
        )}
      </div>
    </div>
  )
}
