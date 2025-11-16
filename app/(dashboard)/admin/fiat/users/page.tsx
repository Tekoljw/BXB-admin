'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import { UserDetailDrawer } from "@/components/admin/user-detail-drawer"
import { AuthorizationDrawer } from "@/components/admin/authorization-drawer"

interface FiatUser {
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
  cnyBalance: string
  usdBalance: string
  eurBalance: string
  settlementCurrency: string
  paymentOrders: number
  payoutOrders: number
  exchangeOrders: number
  monthlyProfit: string
  totalProfit: string
  complianceStatus: 'normal' | 'warning' | 'restricted'
}

interface AuthorizedUser {
  id: string
  userId: string
  username: string
  phone: string
  email: string
  authorizedAt: string
  authorizedLocation?: string
  permissions: string[]
}

export default function FiatUsersPage() {
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getDaysAgo = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date.toISOString().split('T')[0]
  }

  const [users, setUsers] = useState<FiatUser[]>([
    {
      id: '1',
      userId: 'F123456',
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
      cnyBalance: '125,320.00',
      usdBalance: '15,000.00',
      eurBalance: '5,000.00',
      settlementCurrency: 'CNY',
      paymentOrders: 234,
      payoutOrders: 156,
      exchangeOrders: 45,
      monthlyProfit: '3,456.78',
      totalProfit: '25,678.90',
      complianceStatus: 'normal',
    },
    {
      id: '2',
      userId: 'F234567',
      username: '李四',
      phone: '139****6666',
      email: 'li***@gmail.com',
      isKYC: true,
      registeredAt: '2024-02-20 14:20:00',
      registeredLocation: '上海市徐汇区',
      lastLoginLocation: '北京市朝阳区',
      lastLoginTime: '2024-11-14 18:45:00',
      lastActiveDate: getDaysAgo(1),
      cnyBalance: '68,900.00',
      usdBalance: '8,500.00',
      eurBalance: '2,000.00',
      settlementCurrency: 'CNY',
      paymentOrders: 145,
      payoutOrders: 89,
      exchangeOrders: 23,
      monthlyProfit: '2,123.45',
      totalProfit: '15,678.90',
      complianceStatus: 'normal',
    },
    {
      id: '3',
      userId: 'F345678',
      username: '王五',
      phone: '136****9999',
      email: 'wang***@gmail.com',
      isKYC: false,
      registeredAt: '2024-01-05 08:00:00',
      registeredLocation: '广州市天河区',
      lastLoginLocation: '深圳市南山区',
      lastLoginTime: '2024-11-15 09:20:00',
      lastActiveDate: getTodayDate(),
      cnyBalance: '256,789.00',
      usdBalance: '32,000.00',
      eurBalance: '10,000.00',
      settlementCurrency: 'USD',
      paymentOrders: 456,
      payoutOrders: 289,
      exchangeOrders: 78,
      monthlyProfit: '6,789.01',
      totalProfit: '45,678.90',
      complianceStatus: 'warning',
    },
    {
      id: '4',
      userId: 'F456789',
      username: '赵六',
      phone: '137****7777',
      email: 'zhao***@gmail.com',
      isKYC: false,
      registeredAt: '2024-03-10 16:00:00',
      registeredLocation: '深圳市福田区',
      lastLoginLocation: '广州市天河区',
      lastLoginTime: '2024-11-10 14:15:00',
      lastActiveDate: getDaysAgo(5),
      cnyBalance: '12,500.00',
      usdBalance: '1,500.00',
      eurBalance: '500.00',
      settlementCurrency: 'CNY',
      paymentOrders: 23,
      payoutOrders: 15,
      exchangeOrders: 5,
      monthlyProfit: '567.89',
      totalProfit: '2,345.67',
      complianceStatus: 'normal',
    },
    {
      id: '5',
      userId: 'F567890',
      username: '孙七',
      phone: '135****5555',
      email: 'sun***@gmail.com',
      isKYC: true,
      registeredAt: '2024-02-15 13:00:00',
      registeredLocation: '杭州市上城区',
      lastLoginLocation: '杭州市西湖区',
      lastLoginTime: '2024-11-02 16:30:00',
      lastActiveDate: getDaysAgo(13),
      cnyBalance: '45,678.00',
      usdBalance: '5,500.00',
      eurBalance: '1,800.00',
      settlementCurrency: 'CNY',
      paymentOrders: 89,
      payoutOrders: 56,
      exchangeOrders: 18,
      monthlyProfit: '1,234.56',
      totalProfit: '8,900.00',
      complianceStatus: 'normal',
    },
  ])

  const { searchInput, setSearchInput, searchTerm, handleSearch } = useDeferredSearch()
  const [activityTab, setActivityTab] = useState('all')
  const [sortTab, setSortTab] = useState('default')
  const [showUserDetailDrawer, setShowUserDetailDrawer] = useState(false)
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<FiatUser | null>(null)
  const [showKYCSheet, setShowKYCSheet] = useState(false)
  const [selectedKYCUser, setSelectedKYCUser] = useState<FiatUser | null>(null)
  const [showAuthorizationDrawer, setShowAuthorizationDrawer] = useState(false)
  const [selectedAuthUser, setSelectedAuthUser] = useState<FiatUser | null>(null)

  // 模拟授权用户数据 - 实际应从后端API获取
  const getAuthorizedUsers = (userId: string): AuthorizedUser[] => {
    // 为第一个用户添加授权数据
    if (userId === 'F123456') {
      return [
        {
          id: 'auth1',
          userId: 'F789012',
          username: '李四',
          phone: '139****9999',
          email: 'lisi***@gmail.com',
          authorizedAt: '2024-10-15 14:30:00',
          authorizedLocation: '北京市朝阳区',
          permissions: ['查看余额', '发起代收', '发起代付', '查看订单']
        },
        {
          id: 'auth2',
          userId: 'F345678',
          username: '王五',
          phone: '136****7777',
          email: 'wangwu***@gmail.com',
          authorizedAt: '2024-09-20 10:15:00',
          authorizedLocation: '上海市浦东新区',
          permissions: ['查看余额', '查看订单']
        }
      ]
    } else if (userId === 'F234567') {
      return [
        {
          id: 'auth3',
          userId: 'F456789',
          username: '赵六',
          phone: '137****6666',
          email: 'zhaoliu***@gmail.com',
          authorizedAt: '2024-11-01 16:20:00',
          authorizedLocation: '深圳市福田区',
          permissions: ['查看余额', '发起代收']
        }
      ]
    }
    return []
  }

  const isWithinDays = (dateStr: string, days: number) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays <= days
  }

  const filteredAndSortedUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = user.username.toLowerCase().includes(searchLower) ||
                         user.userId.toLowerCase().includes(searchLower) ||
                         user.phone.includes(searchTerm) ||
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
      const aTotalProfit = parseFloat(a.totalProfit.replace(/,/g, ''))
      const bTotalProfit = parseFloat(b.totalProfit.replace(/,/g, ''))
      return bTotalProfit - aTotalProfit
    } else if (sortTab === 'time') {
      const aTime = a.registeredAt.replace(' ', 'T')
      const bTime = b.registeredAt.replace(' ', 'T')
      return new Date(bTime).getTime() - new Date(aTime).getTime()
    }
    return 0
  })

  const openUserDetailDrawer = (user: FiatUser) => {
    setSelectedUserForDetail(user)
    setShowUserDetailDrawer(true)
  }

  const viewKYCDetail = (user: FiatUser) => {
    setSelectedKYCUser(user)
    setShowKYCSheet(true)
  }

  const openAuthorizationDrawer = (user: FiatUser) => {
    setSelectedAuthUser(user)
    setShowAuthorizationDrawer(true)
  }

  const getComplianceStatusBadge = (status: string) => {
    switch(status) {
      case 'normal':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">正常</span>
      case 'warning':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">警告</span>
      case 'restricted':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">限制</span>
      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">法币用户管理</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          管理平台所有法币用户的基本信息和交易情况
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

          <div className="flex-1 w-full sm:w-auto">
            <SearchControls
              placeholder="搜索用户ID、姓名、手机号、邮箱..."
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              showReset={false}
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredAndSortedUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
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
                    账户余额
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    订单统计
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    贡献利润
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    合规状态
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
                      <button
                        onClick={() => openUserDetailDrawer(user)}
                        className="text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1 -mx-2 -my-1 transition-colors"
                      >
                        <div className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                          {user.phone}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                          {user.email}
                        </div>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.isKYC ? (
                        <button 
                          onClick={() => viewKYCDetail(user)}
                          className="inline-block hover:scale-110 transition-transform cursor-pointer"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        </button>
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
                      <div className="text-xs font-medium text-red-600 dark:text-red-400">
                        CNY: {user.cnyBalance}
                      </div>
                      <div className="text-xs font-medium text-green-600 dark:text-green-400">
                        USD: {user.usdBalance}
                      </div>
                      <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        EUR: {user.eurBalance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-xs text-green-600 dark:text-green-400">
                        代收：{user.paymentOrders}
                      </div>
                      <div className="text-xs text-red-600 dark:text-red-400">
                        代付：{user.payoutOrders}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        兑换：{user.exchangeOrders}
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
                      {getComplianceStatusBadge(user.complianceStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          onClick={() => openUserDetailDrawer(user)}
                          variant="ghost"
                          size="sm"
                          className="text-custom-green hover:text-custom-green/80"
                        >
                          查看
                        </Button>
                        <Button
                          onClick={() => openAuthorizationDrawer(user)}
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Shield className="w-4 h-4" />
                        </Button>
                      </div>
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
              <h3 className="font-semibold text-gray-900 dark:text-white">法币账户信息</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CNY余额</p>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mt-1">
                    {selectedUserForDetail.cnyBalance}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">USD余额</p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                    {selectedUserForDetail.usdBalance}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">EUR余额</p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                    {selectedUserForDetail.eurBalance}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">结算币种</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                    {selectedUserForDetail.settlementCurrency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">代收订单数</p>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                    {selectedUserForDetail.paymentOrders}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">代付订单数</p>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mt-1">
                    {selectedUserForDetail.payoutOrders}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">兑换订单数</p>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                    {selectedUserForDetail.exchangeOrders}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">合规状态</p>
                  <div className="mt-1">
                    {selectedUserForDetail.complianceStatus === 'normal' ? (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">正常</span>
                    ) : selectedUserForDetail.complianceStatus === 'warning' ? (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">警告</span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">限制</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">本月贡献利润</p>
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mt-1">
                    {selectedUserForDetail.monthlyProfit}
                  </p>
                </div>
                <div>
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

      <AuthorizationDrawer
        open={showAuthorizationDrawer}
        onClose={() => setShowAuthorizationDrawer(false)}
        ownerUserId={selectedAuthUser?.userId || ''}
        ownerUsername={selectedAuthUser?.username || ''}
        authorizedUsers={selectedAuthUser ? getAuthorizedUsers(selectedAuthUser.userId) : []}
      />
    </div>
  )
}
