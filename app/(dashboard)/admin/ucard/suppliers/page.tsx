'use client'

import { useState } from 'react'
import { Store, Plus, Settings, CreditCard, ChevronDown, ChevronUp, Hash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

interface NumberSegment {
  id: string
  segmentName: string
  startNumber: string
  endNumber: string
  totalCards: number
  usedCards: number
  status: 'active' | 'exhausted' | 'reserved'
  createdAt: string
}

interface CardType {
  id: string
  name: string
  type: 'virtual' | 'physical_black' | 'physical_white' | 'physical_standard'
  currency: string
  balance: number
  issuedCount: number
  monthlyIssued: number
  fee: string
  status: 'active' | 'inactive'
}

interface Supplier {
  id: string
  name: string
  logo: string
  status: 'active' | 'inactive'
  contactPerson: string
  contactPhone: string
  cooperationStartDate: string
  settlementCycle: string
  totalUsdtBalance: number
  cardTypes: CardType[]
  numberSegments: NumberSegment[]
}

const getCardTypeStyle = (type: CardType['type']) => {
  switch (type) {
    case 'virtual':
      return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
    case 'physical_black':
      return 'bg-gradient-to-r from-gray-900 to-black text-yellow-400'
    case 'physical_white':
      return 'bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800'
    case 'physical_standard':
      return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
    default:
      return 'bg-gray-200 text-gray-800'
  }
}

const getCardTypeName = (type: CardType['type']) => {
  switch (type) {
    case 'virtual':
      return '虚拟卡'
    case 'physical_black':
      return '黑金实体卡'
    case 'physical_white':
      return '白金实体卡'
    case 'physical_standard':
      return '标准实体卡'
    default:
      return '未知类型'
  }
}

const getCurrencyColor = (currency: string) => {
  const colors: Record<string, string> = {
    'USD': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'EUR': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'GBP': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'CNY': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'HKD': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    'JPY': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    'SGD': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  }
  return colors[currency] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
}

const getSegmentStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">使用中</span>
    case 'exhausted':
      return <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">已用完</span>
    case 'reserved':
      return <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded-full">保留中</span>
    default:
      return null
  }
}

export default function UCardSuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'CardPro International',
      logo: '🏦',
      status: 'active',
      contactPerson: '李经理',
      contactPhone: '138****8888',
      cooperationStartDate: '2023-06-15',
      settlementCycle: '每周',
      totalUsdtBalance: 2580000,
      cardTypes: [
        {
          id: '1-1',
          name: 'CardPro虚拟卡',
          type: 'virtual',
          currency: 'USD',
          balance: 856000,
          issuedCount: 8500,
          monthlyIssued: 680,
          fee: '$2.00',
          status: 'active',
        },
        {
          id: '1-2',
          name: 'CardPro黑金卡',
          type: 'physical_black',
          currency: 'EUR',
          balance: 425000,
          issuedCount: 3200,
          monthlyIssued: 280,
          fee: '$15.00',
          status: 'active',
        },
        {
          id: '1-3',
          name: 'CardPro白金卡',
          type: 'physical_white',
          currency: 'GBP',
          balance: 318000,
          issuedCount: 1980,
          monthlyIssued: 150,
          fee: '$10.00',
          status: 'active',
        },
        {
          id: '1-4',
          name: 'CardPro标准卡',
          type: 'physical_standard',
          currency: 'CNY',
          balance: 128000,
          issuedCount: 2000,
          monthlyIssued: 90,
          fee: '$5.00',
          status: 'inactive',
        },
      ],
      numberSegments: [
        {
          id: 'seg-1-1',
          segmentName: 'CP-2024-001',
          startNumber: '5200 0001 0000 0000',
          endNumber: '5200 0001 9999 9999',
          totalCards: 10000,
          usedCards: 8765,
          status: 'active',
          createdAt: '2024-01-15',
        },
        {
          id: 'seg-1-2',
          segmentName: 'CP-2024-002',
          startNumber: '5200 0010 0000 0000',
          endNumber: '5200 0010 9999 9999',
          totalCards: 10000,
          usedCards: 4320,
          status: 'active',
          createdAt: '2024-03-20',
        },
        {
          id: 'seg-1-3',
          segmentName: 'CP-2025-001',
          startNumber: '5200 0020 0000 0000',
          endNumber: '5200 0020 9999 9999',
          totalCards: 10000,
          usedCards: 0,
          status: 'reserved',
          createdAt: '2024-11-01',
        },
      ],
    },
    {
      id: '2',
      name: 'Global Card Solutions',
      logo: '💳',
      status: 'active',
      contactPerson: '王总监',
      contactPhone: '139****6666',
      cooperationStartDate: '2023-08-20',
      settlementCycle: '每月',
      totalUsdtBalance: 1850000,
      cardTypes: [
        {
          id: '2-1',
          name: 'GCS虚拟卡',
          type: 'virtual',
          currency: 'USD',
          balance: 682000,
          issuedCount: 5800,
          monthlyIssued: 520,
          fee: '$1.50',
          status: 'active',
        },
        {
          id: '2-2',
          name: 'GCS黑金卡',
          type: 'physical_black',
          currency: 'HKD',
          balance: 356000,
          issuedCount: 2100,
          monthlyIssued: 180,
          fee: '$18.00',
          status: 'active',
        },
        {
          id: '2-3',
          name: 'GCS标准卡',
          type: 'physical_standard',
          currency: 'EUR',
          balance: 245000,
          issuedCount: 1550,
          monthlyIssued: 150,
          fee: '$6.00',
          status: 'active',
        },
      ],
      numberSegments: [
        {
          id: 'seg-2-1',
          segmentName: 'GC-2024-001',
          startNumber: '5200 0002 0000 0000',
          endNumber: '5200 0002 9999 9999',
          totalCards: 10000,
          usedCards: 6543,
          status: 'active',
          createdAt: '2024-02-20',
        },
        {
          id: 'seg-2-2',
          segmentName: 'GC-2024-002',
          startNumber: '5200 0012 0000 0000',
          endNumber: '5200 0012 9999 9999',
          totalCards: 10000,
          usedCards: 2890,
          status: 'active',
          createdAt: '2024-06-15',
        },
      ],
    },
    {
      id: '3',
      name: 'VirtualCard Plus',
      logo: '🎫',
      status: 'active',
      contactPerson: '张经理',
      contactPhone: '136****9999',
      cooperationStartDate: '2023-09-10',
      settlementCycle: '每两周',
      totalUsdtBalance: 920000,
      cardTypes: [
        {
          id: '3-1',
          name: 'VCP虚拟卡标准版',
          type: 'virtual',
          currency: 'USD',
          balance: 523000,
          issuedCount: 4500,
          monthlyIssued: 420,
          fee: '$1.00',
          status: 'active',
        },
        {
          id: '3-2',
          name: 'VCP虚拟卡高级版',
          type: 'virtual',
          currency: 'EUR',
          balance: 397000,
          issuedCount: 2730,
          monthlyIssued: 230,
          fee: '$3.00',
          status: 'active',
        },
      ],
      numberSegments: [
        {
          id: 'seg-3-1',
          segmentName: 'VC-2024-001',
          startNumber: '5200 0003 0000 0000',
          endNumber: '5200 0003 9999 9999',
          totalCards: 10000,
          usedCards: 10000,
          status: 'exhausted',
          createdAt: '2024-01-10',
        },
        {
          id: 'seg-3-2',
          segmentName: 'VC-2024-002',
          startNumber: '5200 0013 0000 0000',
          endNumber: '5200 0013 9999 9999',
          totalCards: 10000,
          usedCards: 7230,
          status: 'active',
          createdAt: '2024-05-01',
        },
      ],
    },
    {
      id: '4',
      name: 'SecureCard Network',
      logo: '🔐',
      status: 'inactive',
      contactPerson: '赵总',
      contactPhone: '137****7777',
      cooperationStartDate: '2023-05-01',
      settlementCycle: '每月',
      totalUsdtBalance: 180000,
      cardTypes: [
        {
          id: '4-1',
          name: 'SCN虚拟卡',
          type: 'virtual',
          currency: 'USD',
          balance: 120000,
          issuedCount: 2200,
          monthlyIssued: 0,
          fee: '$2.50',
          status: 'inactive',
        },
        {
          id: '4-2',
          name: 'SCN白金卡',
          type: 'physical_white',
          currency: 'EUR',
          balance: 60000,
          issuedCount: 1000,
          monthlyIssued: 0,
          fee: '$12.00',
          status: 'inactive',
        },
      ],
      numberSegments: [
        {
          id: 'seg-4-1',
          segmentName: 'SC-2024-001',
          startNumber: '5200 0004 0000 0000',
          endNumber: '5200 0004 9999 9999',
          totalCards: 10000,
          usedCards: 3200,
          status: 'reserved',
          createdAt: '2024-10-01',
        },
      ],
    },
  ])

  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [filterStatus, setFilterStatus] = useState('all')
  const [expandedSuppliers, setExpandedSuppliers] = useState<Set<string>>(new Set(['1', '2', '3']))
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [showDetailSheet, setShowDetailSheet] = useState(false)
  const [showSegmentsDialog, setShowSegmentsDialog] = useState(false)
  const [segmentsDialogSupplier, setSegmentsDialogSupplier] = useState<Supplier | null>(null)

  const stats = {
    total: suppliers.length,
    active: suppliers.filter(s => s.status === 'active').length,
    totalCardTypes: suppliers.reduce((sum, s) => sum + s.cardTypes.length, 0),
    activeCardTypes: suppliers.reduce((sum, s) => sum + s.cardTypes.filter(c => c.status === 'active').length, 0),
    monthlyCards: suppliers.reduce((sum, s) => sum + s.cardTypes.reduce((cSum, c) => cSum + c.monthlyIssued, 0), 0),
    totalCards: suppliers.reduce((sum, s) => sum + s.cardTypes.reduce((cSum, c) => cSum + c.issuedCount, 0), 0),
  }

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.includes(searchTerm)
    const matchesStatus = filterStatus === 'all' || supplier.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const toggleSupplierStatus = (supplierId: string) => {
    setSuppliers(prev =>
      prev.map(supplier =>
        supplier.id === supplierId
          ? { ...supplier, status: supplier.status === 'active' ? 'inactive' : 'active' }
          : supplier
      )
    )
  }

  const toggleExpanded = (supplierId: string) => {
    setExpandedSuppliers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(supplierId)) {
        newSet.delete(supplierId)
      } else {
        newSet.add(supplierId)
      }
      return newSet
    })
  }

  const openSupplierDetail = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setShowDetailSheet(true)
  }

  const openSegmentsDialog = (supplier: Supplier, e: React.MouseEvent) => {
    e.stopPropagation()
    setSegmentsDialogSupplier(supplier)
    setShowSegmentsDialog(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡供应商</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理U卡发卡供应商、卡种配置和发卡统计
          </p>
        </div>
        <Button className="bg-custom-green hover:bg-custom-green-dark text-white">
          <Plus className="w-4 h-4 mr-2" />
          添加供应商
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">供应商总数</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">合作中</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.active}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">卡种总数</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.totalCardTypes}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">启用卡种</div>
          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mt-1">{stats.activeCardTypes}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">本月发卡</div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mt-1">{stats.monthlyCards.toLocaleString()}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">累计发卡</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{stats.totalCards.toLocaleString()}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchControls
          placeholder="搜索供应商名称、联系人..."
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
            <SelectItem value="active">合作中</SelectItem>
            <SelectItem value="inactive">已停用</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredSuppliers.length > 0 ? (
        <div className="space-y-4">
          {filteredSuppliers.map((supplier) => {
            const isExpanded = expandedSuppliers.has(supplier.id)
            const totalIssued = supplier.cardTypes.reduce((sum, c) => sum + c.issuedCount, 0)
            const monthlyIssued = supplier.cardTypes.reduce((sum, c) => sum + c.monthlyIssued, 0)
            const activeCardTypes = supplier.cardTypes.filter(c => c.status === 'active').length
            const activeSegments = supplier.numberSegments.filter(s => s.status === 'active').length
            
            return (
              <div
                key={supplier.id}
                className={`bg-white dark:bg-gray-800 rounded-lg border ${
                  supplier.status === 'active'
                    ? 'border-gray-200 dark:border-gray-700'
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50'
                } overflow-hidden`}
              >
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  onClick={() => toggleExpanded(supplier.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-custom-green to-custom-green-dark flex items-center justify-center text-2xl shrink-0">
                        {supplier.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {supplier.name}
                          </h3>
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-sm">
                            <span className="text-xs text-white/80">存入</span>
                            <span className="text-sm font-bold text-white">{supplier.totalUsdtBalance.toLocaleString()}</span>
                            <span className="text-xs font-semibold text-yellow-300">USDT</span>
                          </div>
                          {supplier.status === 'active' ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                              合作中
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded-full">
                              已停用
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                          <span>卡种: <span className="font-medium text-gray-700 dark:text-gray-300">{supplier.cardTypes.length}种</span> ({activeCardTypes}启用)</span>
                          <span>本月: <span className="font-medium text-blue-600 dark:text-blue-400">{monthlyIssued.toLocaleString()}</span></span>
                          <span>累计: <span className="font-medium text-purple-600 dark:text-purple-400">{totalIssued.toLocaleString()}</span></span>
                          <button
                            onClick={(e) => openSegmentsDialog(supplier, e)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                          >
                            <Hash className="w-3 h-3" />
                            <span>号段: {supplier.numberSegments.length}个</span>
                            <span className="text-xs">({activeSegments}使用中)</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <Switch
                          checked={supplier.status === 'active'}
                          onCheckedChange={() => toggleSupplierStatus(supplier.id)}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          openSupplierDetail(supplier)
                        }}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <div className="p-4">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">提供的卡种</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {supplier.cardTypes.map((cardType) => (
                          <div
                            key={cardType.id}
                            className={`rounded-lg border ${
                              cardType.status === 'active'
                                ? 'border-gray-200 dark:border-gray-600'
                                : 'border-gray-300 dark:border-gray-600 opacity-60'
                            } overflow-hidden`}
                          >
                            <div className={`px-4 py-3 ${getCardTypeStyle(cardType.type)}`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <CreditCard className="w-4 h-4" />
                                  <span className="font-medium text-sm">{getCardTypeName(cardType.type)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${getCurrencyColor(cardType.currency)}`}>
                                    {cardType.currency}
                                  </span>
                                  {cardType.status === 'inactive' && (
                                    <span className="text-xs px-1.5 py-0.5 bg-black/20 rounded">停用</span>
                                  )}
                                </div>
                              </div>
                              <div className="text-xs mt-1 opacity-80">{cardType.name}</div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-900/50">
                              <div className="mb-3 p-2.5 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-700/50">
                                <div className="text-xs text-amber-600 dark:text-amber-400 mb-0.5">卡种余额</div>
                                <div className="flex items-baseline gap-1">
                                  <span className="text-xl font-bold text-amber-700 dark:text-amber-300">
                                    {cardType.balance.toLocaleString()}
                                  </span>
                                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                                    {cardType.currency}
                                  </span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <div className="text-gray-500 dark:text-gray-400">本月开卡</div>
                                  <div className="font-semibold text-gray-900 dark:text-white">
                                    {cardType.monthlyIssued.toLocaleString()}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-gray-500 dark:text-gray-400">累计开卡</div>
                                  <div className="font-semibold text-gray-900 dark:text-white">
                                    {cardType.issuedCount.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-xs">
                                <span className="text-gray-500 dark:text-gray-400">开卡费</span>
                                <span className="font-medium text-gray-900 dark:text-white">{cardType.fee}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-16 text-center">
          <Store className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无供应商数据</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">请点击"添加供应商"按钮添加合作供应商</p>
        </div>
      )}

      <Sheet open={showSegmentsDialog} onOpenChange={setShowSegmentsDialog}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-indigo-600" />
              {segmentsDialogSupplier?.name} - 号段列表
            </SheetTitle>
            <SheetDescription>
              查看该供应商提供的所有卡号段信息
            </SheetDescription>
          </SheetHeader>
          {segmentsDialogSupplier && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400">号段总数</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                    {segmentsDialogSupplier.numberSegments.length}
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <div className="text-xs text-green-600 dark:text-green-400">使用中</div>
                  <div className="text-xl font-bold text-green-700 dark:text-green-300 mt-1">
                    {segmentsDialogSupplier.numberSegments.filter(s => s.status === 'active').length}
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                  <div className="text-xs text-purple-600 dark:text-purple-400">总容量</div>
                  <div className="text-xl font-bold text-purple-700 dark:text-purple-300 mt-1">
                    {segmentsDialogSupplier.numberSegments.reduce((sum, s) => sum + s.totalCards, 0).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {segmentsDialogSupplier.numberSegments.map((segment) => {
                  const usagePercent = Math.round((segment.usedCards / segment.totalCards) * 100)
                  return (
                    <div key={segment.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{segment.segmentName}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">创建于 {segment.createdAt}</div>
                        </div>
                        {getSegmentStatusBadge(segment.status)}
                      </div>
                      <div className="text-xs font-mono text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 rounded p-2 mb-3">
                        <div className="flex items-center justify-between">
                          <span>{segment.startNumber}</span>
                          <span className="text-gray-400 mx-2">→</span>
                          <span>{segment.endNumber}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500 dark:text-gray-400">
                          使用量: {segment.usedCards.toLocaleString()} / {segment.totalCards.toLocaleString()}
                        </span>
                        <span className={`font-medium ${usagePercent >= 90 ? 'text-red-600' : usagePercent >= 70 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {usagePercent}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            usagePercent >= 90 ? 'bg-red-500' : usagePercent >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${usagePercent}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={showDetailSheet} onOpenChange={setShowDetailSheet}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-3">
              {selectedSupplier && (
                <>
                  <span className="text-2xl">{selectedSupplier.logo}</span>
                  <span>{selectedSupplier.name}</span>
                </>
              )}
            </SheetTitle>
            <SheetDescription>
              供应商详情信息和卡种配置
            </SheetDescription>
          </SheetHeader>
          {selectedSupplier && (
            <div className="mt-6 space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">基本信息</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">状态</div>
                    <div className="mt-1">
                      {selectedSupplier.status === 'active' ? (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                          合作中
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded-full">
                          已停用
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">合作开始</div>
                    <div className="font-medium text-gray-900 dark:text-white mt-1">
                      {selectedSupplier.cooperationStartDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">联系人</div>
                    <div className="font-medium text-gray-900 dark:text-white mt-1">
                      {selectedSupplier.contactPerson}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">联系电话</div>
                    <div className="font-medium text-gray-900 dark:text-white mt-1">
                      {selectedSupplier.contactPhone}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">结算周期</div>
                    <div className="font-medium text-gray-900 dark:text-white mt-1">
                      {selectedSupplier.settlementCycle}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 dark:text-gray-400">卡种数量</div>
                    <div className="font-medium text-gray-900 dark:text-white mt-1">
                      {selectedSupplier.cardTypes.length} 种
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">存入余额</h4>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-center">
                  <div className="text-sm text-white/80 mb-1">存入总额</div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-bold text-white">
                      {selectedSupplier.totalUsdtBalance.toLocaleString()}
                    </span>
                    <span className="text-lg font-semibold text-yellow-300">USDT</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">发卡统计</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <div className="text-xs text-blue-600 dark:text-blue-400">本月发卡</div>
                    <div className="text-xl font-bold text-blue-700 dark:text-blue-300 mt-1">
                      {selectedSupplier.cardTypes.reduce((sum, c) => sum + c.monthlyIssued, 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                    <div className="text-xs text-purple-600 dark:text-purple-400">累计发卡</div>
                    <div className="text-xl font-bold text-purple-700 dark:text-purple-300 mt-1">
                      {selectedSupplier.cardTypes.reduce((sum, c) => sum + c.issuedCount, 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">号段信息</h4>
                <div className="space-y-2">
                  {selectedSupplier.numberSegments.map((segment) => {
                    const usagePercent = Math.round((segment.usedCards / segment.totalCards) * 100)
                    return (
                      <div key={segment.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">{segment.segmentName}</span>
                          {getSegmentStatusBadge(segment.status)}
                        </div>
                        <div className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
                          {segment.startNumber} - {segment.endNumber}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500 dark:text-gray-400">
                            使用: {segment.usedCards.toLocaleString()} / {segment.totalCards.toLocaleString()}
                          </span>
                          <span className={`font-medium ${usagePercent >= 90 ? 'text-red-600' : usagePercent >= 70 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {usagePercent}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
                          <div
                            className={`h-1 rounded-full ${
                              usagePercent >= 90 ? 'bg-red-500' : usagePercent >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">卡种详情</h4>
                <div className="space-y-3">
                  {selectedSupplier.cardTypes.map((cardType) => (
                    <div
                      key={cardType.id}
                      className={`rounded-lg border ${
                        cardType.status === 'active'
                          ? 'border-gray-200 dark:border-gray-600'
                          : 'border-gray-300 dark:border-gray-600 opacity-60'
                      } overflow-hidden`}
                    >
                      <div className={`px-3 py-2 ${getCardTypeStyle(cardType.type)}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span className="font-medium text-sm">{cardType.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded font-bold ${getCurrencyColor(cardType.currency)}`}>
                              {cardType.currency}
                            </span>
                            <span className="text-xs">{getCardTypeName(cardType.type)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 text-sm">
                        <div className="mb-3 p-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-700/50">
                          <div className="text-xs text-amber-600 dark:text-amber-400">卡种余额</div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-amber-700 dark:text-amber-300">
                              {cardType.balance.toLocaleString()}
                            </span>
                            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                              {cardType.currency}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">开卡费</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{cardType.fee}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">本月</div>
                            <div className="font-semibold text-blue-600 dark:text-blue-400">
                              {cardType.monthlyIssued.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">累计</div>
                            <div className="font-semibold text-purple-600 dark:text-purple-400">
                              {cardType.issuedCount.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
