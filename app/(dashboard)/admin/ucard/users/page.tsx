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
  isPriority: boolean
}

interface UCardUser {
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
  lastLoginLocation?: string
  lastLoginTime?: string
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
      kycRealName: '张三',
      kycIdNumber: '110101199001011234',
      kycCountry: '中国',
      kycIdType: '身份证',
      kycVerifiedAt: '2024-01-16 14:30:00',
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
      lastLoginLocation: '上海市浦东新区',
      lastLoginTime: '2024-11-15 10:30:00',
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
          isPriority: true,
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
          isPriority: false,
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
          isPriority: true,
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
      lastLoginLocation: '北京市朝阳区',
      lastLoginTime: '2024-11-14 18:45:00',
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
          isPriority: true,
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
      lastLoginLocation: '深圳市南山区',
      lastLoginTime: '2024-11-15 09:20:00',
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
          isPriority: true,
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
          isPriority: false,
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
          isPriority: true,
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
          isPriority: false,
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
      lastLoginLocation: '广州市天河区',
      lastLoginTime: '2024-11-10 14:15:00',
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
          isPriority: false,
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
      lastLoginLocation: '杭州市西湖区',
      lastLoginTime: '2024-11-02 16:30:00',
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
          isPriority: true,
        },
      ],
    },
  ])

  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [cardTypeTab, setCardTypeTab] = useState('all')
  const [activityTab, setActivityTab] = useState('all')
  const [sortTab, setSortTab] = useState('default')
  const [selectedUser, setSelectedUser] = useState<UCardUser | null>(null)
  const [showDetailSheet, setShowDetailSheet] = useState(false)
  const [showKYCSheet, setShowKYCSheet] = useState(false)
  const [selectedKYCUser, setSelectedKYCUser] = useState<UCardUser | null>(null)
  const [cardTypeTabInDetail, setCardTypeTabInDetail] = useState<'virtual' | 'physical'>('virtual')
  const [cardsToShow, setCardsToShow] = useState(6)

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
  }).sort((a, b) => {
    if (sortTab === 'profit') {
      const aTotalProfit = parseFloat(a.cardOpeningFeeProfit.replace(/,/g, '')) + parseFloat(a.transferFeeProfit.replace(/,/g, ''))
      const bTotalProfit = parseFloat(b.cardOpeningFeeProfit.replace(/,/g, '')) + parseFloat(b.transferFeeProfit.replace(/,/g, ''))
      return bTotalProfit - aTotalProfit
    } else if (sortTab === 'time') {
      const aTime = a.registeredAt.replace(' ', 'T')
      const bTime = b.registeredAt.replace(' ', 'T')
      return new Date(bTime).getTime() - new Date(aTime).getTime()
    }
    return 0
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
    setCardsToShow(6)
    setShowDetailSheet(true)
  }

  const viewKYCDetail = (user: UCardUser) => {
    setSelectedKYCUser(user)
    setShowKYCSheet(true)
  }

  const loadMoreCards = () => {
    setCardsToShow(prev => prev + 6)
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡用户管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理平台所有U卡用户的基本信息和使用情况
          </p>
        </div>
        <Tabs value={cardTypeTab} onValueChange={handleCardTypeChange}>
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="virtual">虚拟卡用户</TabsTrigger>
            <TabsTrigger value="physical">实体卡用户</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        <Tabs value={activityTab} onValueChange={handleActivityChange}>
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
                      <div className="text-sm text-gray-900 dark:text-white">
                        {user.phone}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
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
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedUser.cards
                      .filter(card => card.cardType === cardTypeTabInDetail)
                      .slice(0, cardsToShow)
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
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-md">
                                {card.supplier}
                              </span>
                              <span className="px-2.5 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-md">
                                {card.network}
                              </span>
                              <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-md">
                                {card.currency}
                              </span>
                              {card.isPriority ? (
                                <span className="px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-md">
                                  优选卡
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 rounded-md">
                                  非优选卡
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                              <span className="text-sm text-gray-500 dark:text-gray-400">余额</span>
                              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{card.balance} USDT</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  {selectedUser.cards.filter(c => c.cardType === cardTypeTabInDetail).length > cardsToShow && (
                    <div className="flex justify-center mt-4">
                      <Button 
                        variant="outline" 
                        onClick={loadMoreCards}
                        className="w-full max-w-md"
                      >
                        加载更多
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500 dark:text-gray-400">暂无{cardTypeTabInDetail === 'virtual' ? '虚拟' : '实体'}卡</p>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={showKYCSheet} onOpenChange={setShowKYCSheet}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>KYC认证信息</SheetTitle>
            <SheetDescription>
              查看用户的实名认证详细信息
            </SheetDescription>
          </SheetHeader>
          {selectedKYCUser && (
            <div className="mt-6 space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">已通过KYC认证</span>
                </div>
                {selectedKYCUser.kycVerifiedAt && (
                  <div className="text-sm text-green-600 dark:text-green-500 mt-1">
                    认证时间：{selectedKYCUser.kycVerifiedAt}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">基本信息</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-gray-500 dark:text-gray-400">真实姓名</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedKYCUser.kycRealName || '-'}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 dark:text-gray-400">证件类型</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedKYCUser.kycIdType || '-'}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 dark:text-gray-400">证件号码</span>
                    <div className="font-medium text-gray-900 dark:text-white font-mono">{selectedKYCUser.kycIdNumber || '-'}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 dark:text-gray-400">国家/地区</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedKYCUser.kycCountry || '-'}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">账户信息</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-gray-500 dark:text-gray-400">用户ID</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedKYCUser.userId}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 dark:text-gray-400">用户名</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedKYCUser.username}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 dark:text-gray-400">手机号</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedKYCUser.phone}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 dark:text-gray-400">邮箱</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedKYCUser.email}</div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-gray-500 dark:text-gray-400">注册时间</span>
                    <div className="font-medium text-gray-900 dark:text-white">{selectedKYCUser.registeredAt}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
