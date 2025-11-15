'use client'

import { useState } from 'react'
import { Users, Eye, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"

interface Card {
  id: string
  cardNumber: string
  cardType: 'virtual' | 'physical'
  supplier: string
  network: 'VISA' | 'MASTER'
  currency: string
  balance: string
  status: 'active' | 'frozen'
}

interface UCardUser {
  id: string
  userId: string
  username: string
  phone: string
  email: string
  isKYC: boolean
  virtualCardCount: number
  physicalCardCount: number
  cardBalance: string
  monthlyRecharge: string
  totalRecharge: string
  monthlyConsumption: string
  totalConsumption: string
  cardOpeningFeeProfit: string
  transferFeeProfit: string
  lastActiveDate: string
  registeredAt: string
  cards: Card[]
}

export default function UCardUsersPage() {
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getDaysAgo = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date.toISOString().split('T')[0]
  }

  const [users, setUsers] = useState<UCardUser[]>([
    {
      id: '1',
      userId: 'U123456',
      username: '张三',
      phone: '138****8888',
      email: 'zhang***@gmail.com',
      isKYC: true,
      virtualCardCount: 2,
      physicalCardCount: 1,
      cardBalance: '25,320.00',
      monthlyRecharge: '15,000.00',
      totalRecharge: '50,000.00',
      monthlyConsumption: '12,345.67',
      totalConsumption: '35,678.90',
      cardOpeningFeeProfit: '200.00',
      transferFeeProfit: '834.56',
      lastActiveDate: getTodayDate(),
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
          status: 'active',
        },
        {
          id: 'c2',
          cardNumber: '5412 **** **** 9012',
          cardType: 'virtual',
          supplier: 'GlobalCard',
          network: 'MASTER',
          currency: 'USDT',
          balance: '8,820.00',
          status: 'active',
        },
        {
          id: 'c3',
          cardNumber: '4716 **** **** 3456',
          cardType: 'physical',
          supplier: 'CardPro',
          network: 'VISA',
          currency: 'USDT',
          balance: '6,000.00',
          status: 'active',
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
      cardBalance: '12,500.00',
      monthlyRecharge: '10,000.00',
      totalRecharge: '30,000.00',
      monthlyConsumption: '8,500.00',
      totalConsumption: '28,500.00',
      cardOpeningFeeProfit: '100.00',
      transferFeeProfit: '589.00',
      lastActiveDate: getDaysAgo(1),
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
          status: 'active',
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
      cardBalance: '48,234.56',
      monthlyRecharge: '25,000.00',
      totalRecharge: '100,000.00',
      monthlyConsumption: '18,234.56',
      totalConsumption: '85,234.56',
      cardOpeningFeeProfit: '400.00',
      transferFeeProfit: '1,767.89',
      lastActiveDate: getTodayDate(),
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
          status: 'active',
        },
        {
          id: 'c6',
          cardNumber: '5512 **** **** 5678',
          cardType: 'virtual',
          supplier: 'GlobalCard',
          network: 'MASTER',
          currency: 'USDT',
          balance: '12,234.56',
          status: 'frozen',
        },
        {
          id: 'c7',
          cardNumber: '4716 **** **** 9012',
          cardType: 'physical',
          supplier: 'CardPro',
          network: 'VISA',
          currency: 'USDT',
          balance: '11,000.00',
          status: 'active',
        },
        {
          id: 'c8',
          cardNumber: '5234 **** **** 3456',
          cardType: 'physical',
          supplier: 'FastPay',
          network: 'MASTER',
          currency: 'USDT',
          balance: '10,000.00',
          status: 'active',
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
      physicalCardCount: 1,
      cardBalance: '3,500.00',
      monthlyRecharge: '2,000.00',
      totalRecharge: '5,000.00',
      monthlyConsumption: '1,500.00',
      totalConsumption: '1,500.00',
      cardOpeningFeeProfit: '100.00',
      transferFeeProfit: '120.00',
      lastActiveDate: getDaysAgo(5),
      registeredAt: '2024-03-10 16:00:00',
      cards: [
        {
          id: 'c9',
          cardNumber: '4532 **** **** 7890',
          cardType: 'physical',
          supplier: 'GlobalCard',
          network: 'VISA',
          currency: 'USDT',
          balance: '3,500.00',
          status: 'active',
        },
      ],
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
      cardBalance: '8,678.00',
      monthlyRecharge: '5,000.00',
      totalRecharge: '20,000.00',
      monthlyConsumption: '4,322.00',
      totalConsumption: '15,678.00',
      cardOpeningFeeProfit: '100.00',
      transferFeeProfit: '256.78',
      lastActiveDate: getDaysAgo(13),
      registeredAt: '2024-02-15 13:00:00',
      cards: [
        {
          id: 'c10',
          cardNumber: '4532 **** **** 7890',
          cardType: 'virtual',
          supplier: 'GlobalCard',
          network: 'VISA',
          currency: 'USDT',
          balance: '8,678.00',
          status: 'active',
        },
      ],
    },
  ])

  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [cardTypeTab, setCardTypeTab] = useState('all')
  const [activityTab, setActivityTab] = useState('all')
  const [selectedUser, setSelectedUser] = useState<UCardUser | null>(null)
  const [showDetailSheet, setShowDetailSheet] = useState(false)
  const [cardTypeTabInDetail, setCardTypeTabInDetail] = useState<'virtual' | 'physical'>('virtual')

  const isWithinDays = (dateStr: string, days: number) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays <= days
  }

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = user.username.toLowerCase().includes(searchLower) ||
                         user.userId.toLowerCase().includes(searchLower) ||
                         user.phone.includes(searchTerm) ||
                         user.email.toLowerCase().includes(searchLower)
    
    let matchesCardType = true
    if (cardTypeTab === 'virtual') {
      matchesCardType = user.virtualCardCount > 0
    } else if (cardTypeTab === 'physical') {
      matchesCardType = user.physicalCardCount > 0
    }

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

    return matchesSearch && matchesCardType && matchesActivity
  })

  const handleCardTypeChange = (value: string) => {
    setCardTypeTab(value)
  }

  const handleActivityChange = (value: string) => {
    setActivityTab(value)
  }

  const getCardTypeBadge = (cardType: string) => {
    return cardType === 'virtual' 
      ? <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">虚拟卡</span>
      : <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-full">实体卡</span>
  }

  const viewUserDetail = (user: UCardUser) => {
    setSelectedUser(user)
    setCardTypeTabInDetail(user.virtualCardCount > 0 ? 'virtual' : 'physical')
    setShowDetailSheet(true)
  }

  const toggleCardStatus = (userId: string, cardId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          cards: user.cards.map(card => 
            card.id === cardId 
              ? { ...card, status: card.status === 'active' ? 'frozen' : 'active' }
              : card
          )
        }
      }
      return user
    }))
    
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({
        ...selectedUser,
        cards: selectedUser.cards.map(card =>
          card.id === cardId
            ? { ...card, status: card.status === 'active' ? 'frozen' : 'active' }
            : card
        )
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡用户管理</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          管理平台所有U卡用户的基本信息和使用情况
        </p>
      </div>

      <div className="space-y-4">
        <Tabs value={cardTypeTab} onValueChange={handleCardTypeChange}>
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="virtual">虚拟卡用户</TabsTrigger>
            <TabsTrigger value="physical">实体卡用户</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Tabs value={activityTab} onValueChange={handleActivityChange} className="flex-shrink-0">
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="today">今日活跃</TabsTrigger>
              <TabsTrigger value="7days">7日活跃</TabsTrigger>
              <TabsTrigger value="15days">15日活跃</TabsTrigger>
              <TabsTrigger value="30days">30日活跃</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex-1 w-full sm:w-auto">
            <SearchControls
              placeholder="搜索用户ID、姓名、手机号、邮箱..."
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>

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
                    卡片数量
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    卡内余额
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    充值划款
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    刷卡消费
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    贡献开卡费利润
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    贡献划转费利润
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
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        实体卡：{user.physicalCardCount}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        虚拟卡：{user.virtualCardCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {user.cardBalance} USDT
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        本月：{user.monthlyRecharge} USDT
                      </div>
                      <div className="text-xs font-medium text-green-600 dark:text-green-400">
                        累计：{user.totalRecharge} USDT
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-xs font-medium text-orange-600 dark:text-orange-400">
                        本月：{user.monthlyConsumption} USDT
                      </div>
                      <div className="text-xs font-medium text-red-600 dark:text-red-400">
                        累计：{user.totalConsumption} USDT
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {user.cardOpeningFeeProfit} USDT
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                        {user.transferFeeProfit} USDT
                      </span>
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

      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>用户卡片</SheetTitle>
            <SheetDescription>
              查看和管理用户的U卡信息
            </SheetDescription>
          </SheetHeader>
          {selectedUser && (
            <div className="mt-6 space-y-4">
              <Tabs value={cardTypeTabInDetail} onValueChange={(value) => setCardTypeTabInDetail(value as 'virtual' | 'physical')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="virtual">虚拟卡 ({selectedUser.cards.filter(c => c.cardType === 'virtual').length})</TabsTrigger>
                  <TabsTrigger value="physical">实体卡 ({selectedUser.cards.filter(c => c.cardType === 'physical').length})</TabsTrigger>
                </TabsList>
              </Tabs>

              {selectedUser.cards.filter(c => c.cardType === cardTypeTabInDetail).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedUser.cards
                    .filter(card => card.cardType === cardTypeTabInDetail)
                    .map((card) => (
                      <div key={card.id} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                            {card.cardNumber}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium ${card.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {card.status === 'active' ? '激活' : '冻结'}
                            </span>
                            <Switch 
                              checked={card.status === 'active'} 
                              onCheckedChange={() => toggleCardStatus(selectedUser.id, card.id)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">供应商</span>
                            <span className="text-gray-900 dark:text-white font-medium">{card.supplier}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">卡组织</span>
                            <span className="text-gray-900 dark:text-white font-medium">{card.network}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">币种</span>
                            <span className="text-gray-900 dark:text-white font-medium">{card.currency}</span>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-gray-500 dark:text-gray-400">余额</span>
                            <span className="font-bold text-purple-600 dark:text-purple-400">{card.balance} USDT</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500 dark:text-gray-400">暂无{cardTypeTabInDetail === 'virtual' ? '虚拟' : '实体'}卡</p>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
