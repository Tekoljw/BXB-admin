'use client'

import { useState } from 'react'
import { Users, Eye, CreditCard, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"

// 卡片类型定义
interface Card {
  id: string
  cardNumber: string
  cardType: 'virtual' | 'physical'
  supplier: string
  network: 'VISA' | 'MASTER'
  currency: string
  balance: string
}

// 用户类型定义
interface UCardUser {
  id: string
  userId: string
  username: string
  phone: string
  email: string
  isKYC: boolean
  virtualCardCount: number
  physicalCardCount: number
  accountBalance: string // 账户总余额(USDT)
  cardBalance: string // 卡内总余额
  totalRecharge: string // U卡总充值
  totalConsumption: string // U卡总消费
  rechargeFeePro: string // 充值手续费利润
  cardOpeningFeePro: string // 开卡费利润
  status: 'active' | 'frozen' | 'inactive'
  registeredAt: string
  cards: Card[] // 用户持有的卡片列表
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
      isKYC: true,
      virtualCardCount: 2,
      physicalCardCount: 1,
      accountBalance: '10,500.00',
      cardBalance: '25,320.00',
      totalRecharge: '50,000.00',
      totalConsumption: '35,678.90',
      rechargeFeePro: '1,034.56',
      cardOpeningFeePro: '200.00',
      status: 'active',
      registeredAt: '2024-01-15 10:30:00',
      cards: [
        {
          id: 'c1',
          cardNumber: '4532 **** **** 5678',
          cardType: 'virtual',
          supplier: 'CardPro',
          network: 'VISA',
          currency: 'USDT',
          balance: '10,500.00',
        },
        {
          id: 'c2',
          cardNumber: '5412 **** **** 9012',
          cardType: 'virtual',
          supplier: 'GlobalCard',
          network: 'MASTER',
          currency: 'USDT',
          balance: '8,820.00',
        },
        {
          id: 'c3',
          cardNumber: '4716 **** **** 3456',
          cardType: 'physical',
          supplier: 'CardPro',
          network: 'VISA',
          currency: 'USDT',
          balance: '6,000.00',
        },
      ],
    },
    {
      id: '2',
      userId: 'U234567',
      username: '李四',
      phone: '139****6666',
      email: 'li***@gmail.com',
      isKYC: true,
      virtualCardCount: 1,
      physicalCardCount: 0,
      accountBalance: '5,500.00',
      cardBalance: '12,500.00',
      totalRecharge: '30,000.00',
      totalConsumption: '28,500.00',
      rechargeFeePro: '689.00',
      cardOpeningFeePro: '100.00',
      status: 'active',
      registeredAt: '2024-02-20 14:20:00',
      cards: [
        {
          id: 'c4',
          cardNumber: '5234 **** **** 7890',
          cardType: 'virtual',
          supplier: 'FastPay',
          network: 'MASTER',
          currency: 'USDT',
          balance: '12,500.00',
        },
      ],
    },
    {
      id: '3',
      userId: 'U345678',
      username: '王五',
      phone: '136****9999',
      email: 'wang***@gmail.com',
      isKYC: false,
      virtualCardCount: 2,
      physicalCardCount: 2,
      accountBalance: '22,000.00',
      cardBalance: '48,234.56',
      totalRecharge: '100,000.00',
      totalConsumption: '85,234.56',
      rechargeFeePro: '2,167.89',
      cardOpeningFeePro: '400.00',
      status: 'active',
      registeredAt: '2024-01-05 08:00:00',
      cards: [
        {
          id: 'c5',
          cardNumber: '4539 **** **** 1234',
          cardType: 'virtual',
          supplier: 'CardPro',
          network: 'VISA',
          currency: 'USDT',
          balance: '15,000.00',
        },
        {
          id: 'c6',
          cardNumber: '5512 **** **** 5678',
          cardType: 'virtual',
          supplier: 'GlobalCard',
          network: 'MASTER',
          currency: 'USDT',
          balance: '12,234.56',
        },
        {
          id: 'c7',
          cardNumber: '4716 **** **** 9012',
          cardType: 'physical',
          supplier: 'CardPro',
          network: 'VISA',
          currency: 'USDT',
          balance: '11,000.00',
        },
        {
          id: 'c8',
          cardNumber: '5234 **** **** 3456',
          cardType: 'physical',
          supplier: 'FastPay',
          network: 'MASTER',
          currency: 'USDT',
          balance: '10,000.00',
        },
      ],
    },
    {
      id: '4',
      userId: 'U456789',
      username: '赵六',
      phone: '137****7777',
      email: 'zhao***@gmail.com',
      isKYC: false,
      virtualCardCount: 0,
      physicalCardCount: 0,
      accountBalance: '0',
      cardBalance: '0',
      totalRecharge: '0',
      totalConsumption: '0',
      rechargeFeePro: '0',
      cardOpeningFeePro: '0',
      status: 'inactive',
      registeredAt: '2024-03-10 16:00:00',
      cards: [],
    },
    {
      id: '5',
      userId: 'U567890',
      username: '孙七',
      phone: '135****5555',
      email: 'sun***@gmail.com',
      isKYC: true,
      virtualCardCount: 1,
      physicalCardCount: 0,
      accountBalance: '4,322.00',
      cardBalance: '8,678.00',
      totalRecharge: '20,000.00',
      totalConsumption: '15,678.00',
      rechargeFeePro: '356.78',
      cardOpeningFeePro: '100.00',
      status: 'frozen',
      registeredAt: '2024-02-15 13:00:00',
      cards: [
        {
          id: 'c9',
          cardNumber: '4532 **** **** 7890',
          cardType: 'virtual',
          supplier: 'GlobalCard',
          network: 'VISA',
          currency: 'USDT',
          balance: '8,678.00',
        },
      ],
    },
  ])

  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedUser, setSelectedUser] = useState<UCardUser | null>(null)
  const [showDetailSheet, setShowDetailSheet] = useState(false)

  // 统计数据
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    withCards: users.filter(u => u.virtualCardCount + u.physicalCardCount > 0).length,
    frozen: users.filter(u => u.status === 'frozen').length,
  }

  // 过滤用户
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.includes(searchTerm) ||
                         user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
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

  // 获取卡片类型徽章
  const getCardTypeBadge = (cardType: string) => {
    return cardType === 'virtual' 
      ? <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">虚拟卡</span>
      : <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full">实体卡</span>
  }

  // 查看用户详情
  const viewUserDetail = (user: UCardUser) => {
    setSelectedUser(user)
    setShowDetailSheet(true)
  }

  return (
    <div className="p-6 space-y-6">
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
        <SearchControls
          placeholder="搜索用户ID、姓名、手机号、邮箱..."
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
                    用户ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    联系方式
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    KYC
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    虚拟卡
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    实体卡
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    账户余额
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    卡内余额
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    总充值
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    总消费
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    总利润
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    注册时间
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map((user) => (
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
                      <div className="text-sm text-gray-900 dark:text-white">
                        {user.phone}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.isKYC ? (
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300 dark:text-gray-600 mx-auto" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.virtualCardCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.physicalCardCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {user.accountBalance} USDT
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {user.cardBalance} USDT
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {user.totalRecharge} USDT
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.totalConsumption} USDT
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                        {(parseFloat(user.rechargeFeePro.replace(/,/g, '')) + parseFloat(user.cardOpeningFeePro.replace(/,/g, ''))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USDT
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {user.registeredAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
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

      {/* 用户详情侧边栏 */}
      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>用户详情</SheetTitle>
            <SheetDescription>
              查看用户的完整信息和U卡详细情况
            </SheetDescription>
          </SheetHeader>
          {selectedUser && (
            <div className="mt-6 space-y-6">
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
                    <span className="text-gray-500 dark:text-gray-400">KYC认证：</span>
                    {selectedUser.isKYC ? (
                      <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                        <CheckCircle className="w-4 h-4" />
                        已认证
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">未认证</span>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">状态：</span>
                    {getStatusBadge(selectedUser.status)}
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500 dark:text-gray-400">注册时间：</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedUser.registeredAt}</span>
                  </div>
                </div>
              </div>

              {/* 财务统计 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">财务统计</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">账户余额</div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">{selectedUser.accountBalance} USDT</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">卡内总余额</div>
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">{selectedUser.cardBalance} USDT</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">U卡总充值</div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">{selectedUser.totalRecharge} USDT</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">U卡总消费</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">{selectedUser.totalConsumption} USDT</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">充值手续费利润</div>
                    <div className="text-xl font-bold text-orange-600 dark:text-orange-400 mt-1">{selectedUser.rechargeFeePro} USDT</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                    <div className="text-xs text-gray-500 dark:text-gray-400">开卡费利润</div>
                    <div className="text-xl font-bold text-pink-600 dark:text-pink-400 mt-1">{selectedUser.cardOpeningFeePro} USDT</div>
                  </div>
                </div>
              </div>

              {/* U卡列表 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  持有U卡 ({selectedUser.cards.length} 张)
                </h3>
                {selectedUser.cards.length > 0 ? (
                  <div className="space-y-3">
                    {selectedUser.cards.map((card) => (
                      <div 
                        key={card.id}
                        className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-lg p-4 text-white"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getCardTypeBadge(card.cardType)}
                            <span className="px-2 py-1 text-xs font-medium bg-white/10 rounded-full">
                              {card.network}
                            </span>
                          </div>
                          <CreditCard className="w-5 h-5 text-white/50" />
                        </div>
                        <div className="text-lg font-mono font-semibold tracking-wider mb-4">
                          {card.cardNumber}
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-white/60 text-xs">供应商</div>
                            <div className="font-medium">{card.supplier}</div>
                          </div>
                          <div>
                            <div className="text-white/60 text-xs">币种</div>
                            <div className="font-medium">{card.currency}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-white/60 text-xs">余额</div>
                            <div className="text-xl font-bold text-green-400">{card.balance} USDT</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 dark:text-gray-600 text-center py-8">该用户暂无U卡</p>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
