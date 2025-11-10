'use client'

import { useState } from 'react'
import { Users, Search, Eye, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// 用户类型定义
interface UCardUser {
  id: string
  userId: string
  username: string
  phone: string
  email: string
  cardCount: number
  totalRecharge: string
  totalConsumption: string
  status: 'active' | 'frozen' | 'inactive'
  registeredAt: string
  lastLoginAt: string
}

export default function UCardUsersPage() {
  // 示例数据
  const [users] = useState<UCardUser[]>([
    {
      id: '1',
      userId: 'U123456',
      username: '张三',
      phone: '138****8888',
      email: 'zhang***@gmail.com',
      cardCount: 2,
      totalRecharge: '50,000.00',
      totalConsumption: '35,678.90',
      status: 'active',
      registeredAt: '2024-01-15 10:30:00',
      lastLoginAt: '2024-11-10 08:45:00',
    },
    {
      id: '2',
      userId: 'U234567',
      username: '李四',
      phone: '139****6666',
      email: 'li***@gmail.com',
      cardCount: 1,
      totalRecharge: '30,000.00',
      totalConsumption: '28,500.00',
      status: 'active',
      registeredAt: '2024-02-20 14:20:00',
      lastLoginAt: '2024-11-09 15:30:00',
    },
    {
      id: '3',
      userId: 'U345678',
      username: '王五',
      phone: '136****9999',
      email: 'wang***@gmail.com',
      cardCount: 3,
      totalRecharge: '100,000.00',
      totalConsumption: '85,234.56',
      status: 'active',
      registeredAt: '2024-01-05 08:00:00',
      lastLoginAt: '2024-11-10 09:15:00',
    },
    {
      id: '4',
      userId: 'U456789',
      username: '赵六',
      phone: '137****7777',
      email: 'zhao***@gmail.com',
      cardCount: 0,
      totalRecharge: '0',
      totalConsumption: '0',
      status: 'inactive',
      registeredAt: '2024-03-10 16:00:00',
      lastLoginAt: '2024-09-20 11:00:00',
    },
    {
      id: '5',
      userId: 'U567890',
      username: '孙七',
      phone: '135****5555',
      email: 'sun***@gmail.com',
      cardCount: 1,
      totalRecharge: '20,000.00',
      totalConsumption: '15,678.00',
      status: 'frozen',
      registeredAt: '2024-02-15 13:00:00',
      lastLoginAt: '2024-10-15 14:30:00',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedUser, setSelectedUser] = useState<UCardUser | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  // 统计数据
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    withCards: users.filter(u => u.cardCount > 0).length,
    frozen: users.filter(u => u.status === 'frozen').length,
  }

  // 过滤用户
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.includes(searchQuery) ||
                         user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    const badges = {
      active: <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">活跃</span>,
      frozen: <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">冻结</span>,
      inactive: <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded-full">未激活</span>,
    }
    return badges[status as keyof typeof badges]
  }

  // 查看用户详情
  const viewUserDetail = (user: UCardUser) => {
    setSelectedUser(user)
    setShowDetailDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡用户列表</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          管理平台所有U卡用户的基本信息和使用情况
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">总用户数</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">活跃用户</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.active}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">持卡用户</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.withCards}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">冻结用户</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{stats.frozen}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索用户ID、姓名、手机号、邮箱..."
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
            <SelectItem value="active">活跃</SelectItem>
            <SelectItem value="inactive">未激活</SelectItem>
            <SelectItem value="frozen">冻结</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 用户列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    用户信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    联系方式
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    持卡数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    总充值
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    总消费
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    注册时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-custom-green to-custom-green-dark flex items-center justify-center text-white font-semibold">
                          {user.username.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.username}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {user.userId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {user.phone}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                        <CreditCard className="w-4 h-4" />
                        {user.cardCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        ${user.totalRecharge}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        ${user.totalConsumption}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {user.registeredAt}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        上次登录: {user.lastLoginAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewUserDetail(user)}
                      >
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
            <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无用户数据</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">用户注册后将显示在此处</p>
          </div>
        )}
      </div>

      {/* 用户详情弹窗 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>用户详情</DialogTitle>
            <DialogDescription>
              查看用户的完整信息和U卡使用情况
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              {/* 基本信息 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">基本信息</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">用户ID：</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedUser.userId}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">用户名：</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedUser.username}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">手机号：</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedUser.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">邮箱：</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedUser.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">状态：</span>
                    {getStatusBadge(selectedUser.status)}
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">注册时间：</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedUser.registeredAt}</span>
                  </div>
                </div>
              </div>

              {/* 财务统计 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">财务统计</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">持卡数</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">{selectedUser.cardCount}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">总充值</div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">${selectedUser.totalRecharge}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">总消费</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">${selectedUser.totalConsumption}</div>
                  </div>
                </div>
              </div>

              {/* U卡列表 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">持有U卡</h3>
                {selectedUser.cardCount > 0 ? (
                  <div className="space-y-2">
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">**** **** **** 5678</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">虚拟卡 · 已激活</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">$14,321.10</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">余额</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 dark:text-gray-600">该用户暂无U卡</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
