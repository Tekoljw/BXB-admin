'use client'

import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import { UserDetailDrawer } from "@/components/admin/user-detail-drawer"

interface CryptoUser {
  id: string
  userId: string
  username: string
  phone: string
  email: string
  isKYC: boolean
  kycRealName?: string
  kycIdNumber?: string
  kycCountry?: string
  kycIdType?: string
  kycVerifiedAt?: string
  registeredAt: string
  registeredLocation?: string
  lastLoginLocation?: string
  lastLoginTime?: string
  lastActiveDate: string
  btcBalance: string
  ethBalance: string
  usdtBalance: string
  totalDeposits: number
  totalWithdrawals: number
  monthlyProfit: string
  totalProfit: string
}

export default function CryptoUsersPage() {
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getDaysAgo = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date.toISOString().split('T')[0]
  }

  const [users] = useState<CryptoUser[]>([
    {
      id: '1',
      userId: 'C123456',
      username: '张三',
      phone: '138****8888',
      email: 'zhang***@gmail.com',
      isKYC: true,
      kycRealName: '张三',
      kycIdNumber: '110101199001011234',
      kycCountry: '中国',
      kycIdType: '身份证',
      kycVerifiedAt: '2024-01-16 14:30:00',
      registeredAt: '2024-01-15 10:30:00',
      registeredLocation: '北京市朝阳区',
      lastLoginLocation: '上海市浦东新区',
      lastLoginTime: '2024-11-15 10:30:00',
      lastActiveDate: getTodayDate(),
      btcBalance: '0.5432',
      ethBalance: '12.3456',
      usdtBalance: '50,000.00',
      totalDeposits: 156,
      totalWithdrawals: 89,
      monthlyProfit: '2,345.67 USDT',
      totalProfit: '15,678.90 USDT',
    },
    {
      id: '2',
      userId: 'C234567',
      username: '李四',
      phone: '139****6666',
      email: 'li***@gmail.com',
      isKYC: true,
      registeredAt: '2024-02-20 14:20:00',
      registeredLocation: '上海市徐汇区',
      lastLoginLocation: '北京市朝阳区',
      lastLoginTime: '2024-11-14 18:45:00',
      lastActiveDate: getDaysAgo(1),
      btcBalance: '0.2100',
      ethBalance: '5.6789',
      usdtBalance: '25,000.00',
      totalDeposits: 78,
      totalWithdrawals: 45,
      monthlyProfit: '1,234.56 USDT',
      totalProfit: '8,900.00 USDT',
    },
    {
      id: '3',
      userId: 'C345678',
      username: '王五',
      phone: '136****9999',
      email: 'wang***@gmail.com',
      isKYC: false,
      registeredAt: '2024-01-05 08:00:00',
      registeredLocation: '广州市天河区',
      lastLoginLocation: '深圳市南山区',
      lastLoginTime: '2024-11-15 09:20:00',
      lastActiveDate: getTodayDate(),
      btcBalance: '1.2345',
      ethBalance: '25.4321',
      usdtBalance: '100,000.00',
      totalDeposits: 234,
      totalWithdrawals: 156,
      monthlyProfit: '5,678.90 USDT',
      totalProfit: '35,678.90 USDT',
    },
  ])

  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [activityTab, setActivityTab] = useState('all')
  const [sortTab, setSortTab] = useState('default')
  const [showUserDetailDrawer, setShowUserDetailDrawer] = useState(false)
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<CryptoUser | null>(null)

  const isWithinDays = (dateStr: string, days: number) => {
    const targetDate = new Date(dateStr)
    const today = new Date()
    const diffTime = today.getTime() - targetDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays <= days
  }

  const filteredAndSortedUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = !searchTerm ||
                         user.userId.toLowerCase().includes(searchLower) ||
                         user.username.toLowerCase().includes(searchLower) ||
                         user.phone.toLowerCase().includes(searchLower) ||
                         user.email.toLowerCase().includes(searchLower)
    
    let matchesActivity = true
    if (activityTab === 'today') {
      matchesActivity = isWithinDays(user.lastActiveDate, 1)
    } else if (activityTab === '7days') {
      matchesActivity = isWithinDays(user.lastActiveDate, 7)
    } else if (activityTab === '15days') {
      matchesActivity = isWithinDays(user.lastActiveDate, 15)
    } else if (activityTab === '30days') {
      matchesActivity = isWithinDays(user.lastActiveDate, 30)
    }

    return matchesSearch && matchesActivity
  }).sort((a, b) => {
    if (sortTab === 'profit') {
      const aTotalProfit = parseFloat(a.totalProfit.replace(/[^0-9.]/g, ''))
      const bTotalProfit = parseFloat(b.totalProfit.replace(/[^0-9.]/g, ''))
      return bTotalProfit - aTotalProfit
    } else if (sortTab === 'time') {
      return new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
    }
    return 0
  })

  const openUserDetailDrawer = (user: CryptoUser) => {
    console.log('Opening drawer for user:', user.userId)
    setSelectedUserForDetail(user)
    setShowUserDetailDrawer(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crypto用户管理</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          管理平台所有Crypto用户的基本信息和交易情况
        </p>
      </div>

      <div className="space-y-4">
        <Tabs value={activityTab} onValueChange={(value) => setActivityTab(value)}>
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="today">今日活跃</TabsTrigger>
            <TabsTrigger value="7days">7日活跃</TabsTrigger>
            <TabsTrigger value="15days">15日活跃</TabsTrigger>
            <TabsTrigger value="30days">30日活跃</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Tabs value={sortTab} onValueChange={(value) => setSortTab(value)} className="flex-shrink-0">
            <TabsList>
              <TabsTrigger value="default">默认排序</TabsTrigger>
              <TabsTrigger value="profit">利润贡献排名</TabsTrigger>
              <TabsTrigger value="time">时间排序</TabsTrigger>
            </TabsList>
          </Tabs>

          <SearchControls
            value={searchInput}
            onChange={setSearchInput}
            onSearch={handleSearch}
            onReset={handleReset}
            placeholder="搜索用户ID、姓名、手机号、邮箱..."
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {filteredAndSortedUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    用户ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    联系方式
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    KYC
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    最近登录
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    资产余额
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    出入金次数
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    贡献利润
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAndSortedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.userId}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-0.5">
                        <button
                          type="button"
                          onClick={() => openUserDetailDrawer(user)}
                          className="contact-phone block w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
                        >
                          {user.phone}
                        </button>
                        <button
                          type="button"
                          onClick={() => openUserDetailDrawer(user)}
                          className="contact-email block w-full text-left text-xs text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                          {user.email}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.isKYC ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-900 dark:text-white">
                        {user.lastLoginLocation || '-'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.lastLoginTime || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-xs font-medium text-orange-600 dark:text-orange-400">
                        BTC: {user.btcBalance}
                      </div>
                      <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        ETH: {user.ethBalance}
                      </div>
                      <div className="text-xs font-medium text-green-600 dark:text-green-400">
                        USDT: {user.usdtBalance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-xs text-green-600 dark:text-green-400">
                        入金：{user.totalDeposits}
                      </div>
                      <div className="text-xs text-red-600 dark:text-red-400">
                        出金：{user.totalWithdrawals}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-xs font-medium text-amber-600 dark:text-amber-400">
                        本月：{user.monthlyProfit}
                      </div>
                      <div className="text-xs font-medium text-amber-700 dark:text-amber-500">
                        累计：{user.totalProfit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openUserDetailDrawer(user)}
                      >
                        查看
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">暂无用户数据</p>
          </div>
        )}
      </div>

      <UserDetailDrawer
        open={showUserDetailDrawer}
        onClose={() => setShowUserDetailDrawer(false)}
        user={selectedUserForDetail}
        moduleSpecificContent={
          selectedUserForDetail && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Crypto资产信息</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">BTC余额</p>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mt-1">
                    {selectedUserForDetail.btcBalance}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ETH余额</p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                    {selectedUserForDetail.ethBalance}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">USDT余额</p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                    {selectedUserForDetail.usdtBalance}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">总入金次数</p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                    {selectedUserForDetail.totalDeposits}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">总出金次数</p>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mt-1">
                    {selectedUserForDetail.totalWithdrawals}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">本月贡献利润</p>
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mt-1">
                    {selectedUserForDetail.monthlyProfit}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">累计贡献利润</p>
                  <p className="text-sm font-medium text-amber-700 dark:text-amber-500 mt-1">
                    {selectedUserForDetail.totalProfit}
                  </p>
                </div>
              </div>
            </div>
          )
        }
      />
    </div>
  )
}
