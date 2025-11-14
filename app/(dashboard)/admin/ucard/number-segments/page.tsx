'use client'

import { useState } from 'react'
import { Hash, Plus } from 'lucide-react'
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

// 号段类型定义
interface NumberSegment {
  id: string
  segmentName: string
  startNumber: string
  endNumber: string
  supplier: string
  totalCards: number
  usedCards: number
  status: 'active' | 'exhausted' | 'reserved'
  createdAt: string
}

export default function NumberSegmentsPage() {
  // 示例数据
  const [segments] = useState<NumberSegment[]>([
    {
      id: '1',
      segmentName: 'CP-2024-001',
      startNumber: '5200 0001 0000 0000',
      endNumber: '5200 0001 9999 9999',
      supplier: 'CardPro International',
      totalCards: 10000,
      usedCards: 8765,
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      segmentName: 'GC-2024-002',
      startNumber: '5200 0002 0000 0000',
      endNumber: '5200 0002 9999 9999',
      supplier: 'Global Card Solutions',
      totalCards: 10000,
      usedCards: 6543,
      status: 'active',
      createdAt: '2024-02-20',
    },
    {
      id: '3',
      segmentName: 'VC-2024-003',
      startNumber: '5200 0003 0000 0000',
      endNumber: '5200 0003 9999 9999',
      supplier: 'VirtualCard Plus',
      totalCards: 10000,
      usedCards: 10000,
      status: 'exhausted',
      createdAt: '2024-01-10',
    },
    {
      id: '4',
      segmentName: 'SC-2025-001',
      startNumber: '5200 0004 0000 0000',
      endNumber: '5200 0004 9999 9999',
      supplier: 'SecureCard Network',
      totalCards: 10000,
      usedCards: 0,
      status: 'reserved',
      createdAt: '2024-10-01',
    },
  ])

  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [filterStatus, setFilterStatus] = useState('all')

  // 统计数据
  const stats = {
    total: segments.length,
    active: segments.filter(s => s.status === 'active').length,
    totalCards: segments.reduce((sum, s) => sum + s.totalCards, 0),
    usedCards: segments.reduce((sum, s) => sum + s.usedCards, 0),
  }

  // 过滤号段
  const filteredSegments = segments.filter(segment => {
    const matchesSearch = segment.segmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         segment.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || segment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    const badges = {
      active: <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">使用中</span>,
      exhausted: <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">已用完</span>,
      reserved: <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded-full">保留中</span>,
    }
    return badges[status as keyof typeof badges]
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡号段管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理U卡号段的分配和使用情况
          </p>
        </div>
        <Button className="bg-custom-green hover:bg-custom-green-dark text-white">
          <Plus className="w-4 h-4 mr-2" />
          添加号段
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">号段总数</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">使用中</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.active}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">总卡数</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.totalCards.toLocaleString()}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">已使用</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.usedCards.toLocaleString()}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchControls
          placeholder="搜索号段名称、供应商..."
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
            <SelectItem value="active">使用中</SelectItem>
            <SelectItem value="exhausted">已用完</SelectItem>
            <SelectItem value="reserved">保留中</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 号段列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredSegments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    号段名称
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    起始号码
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    结束号码
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    供应商
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    使用情况
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
                {filteredSegments.map((segment) => {
                  const usage = (segment.usedCards / segment.totalCards * 100).toFixed(1)
                  return (
                    <tr key={segment.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {segment.segmentName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-600 dark:text-gray-400">
                          {segment.startNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-600 dark:text-gray-400">
                          {segment.endNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {segment.supplier}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900 dark:text-white">
                            {segment.usedCards.toLocaleString()} / {segment.totalCards.toLocaleString()}
                          </div>
                          <div className="mt-1 w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-custom-green h-2 rounded-full transition-all"
                              style={{ width: `${usage}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{usage}%</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(segment.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {segment.createdAt}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <Hash className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无号段数据</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">请点击"添加号段"按钮分配新号段</p>
          </div>
        )}
      </div>
    </div>
  )
}
