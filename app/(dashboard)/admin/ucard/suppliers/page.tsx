'use client'

import { useState } from 'react'
import { Store, Plus, Search, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// 供应商类型定义
interface Supplier {
  id: string
  name: string
  logo: string
  status: 'active' | 'inactive'
  monthlyCards: number
  totalCards: number
  feeRate: string
  settlementCycle: string
  contactPerson: string
  contactPhone: string
  cooperationStartDate: string
}

export default function UCardSuppliersPage() {
  // 示例数据
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'CardPro International',
      logo: '🏦',
      status: 'active',
      monthlyCards: 1200,
      totalCards: 15680,
      feeRate: '2.5%',
      settlementCycle: '每周',
      contactPerson: '李经理',
      contactPhone: '138****8888',
      cooperationStartDate: '2023-06-15',
    },
    {
      id: '2',
      name: 'Global Card Solutions',
      logo: '💳',
      status: 'active',
      monthlyCards: 850,
      totalCards: 9450,
      feeRate: '3.0%',
      settlementCycle: '每月',
      contactPerson: '王总监',
      contactPhone: '139****6666',
      cooperationStartDate: '2023-08-20',
    },
    {
      id: '3',
      name: 'VirtualCard Plus',
      logo: '🎫',
      status: 'active',
      monthlyCards: 650,
      totalCards: 7230,
      feeRate: '2.8%',
      settlementCycle: '每两周',
      contactPerson: '张经理',
      contactPhone: '136****9999',
      cooperationStartDate: '2023-09-10',
    },
    {
      id: '4',
      name: 'SecureCard Network',
      logo: '🔐',
      status: 'inactive',
      monthlyCards: 0,
      totalCards: 3200,
      feeRate: '3.2%',
      settlementCycle: '每月',
      contactPerson: '赵总',
      contactPhone: '137****7777',
      cooperationStartDate: '2023-05-01',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // 统计数据
  const stats = {
    total: suppliers.length,
    active: suppliers.filter(s => s.status === 'active').length,
    monthlyCards: suppliers.filter(s => s.status === 'active').reduce((sum, s) => sum + s.monthlyCards, 0),
    totalCards: suppliers.reduce((sum, s) => sum + s.totalCards, 0),
  }

  // 过滤供应商
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         supplier.contactPerson.includes(searchQuery)
    const matchesStatus = filterStatus === 'all' || supplier.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // 切换供应商状态
  const toggleSupplierStatus = (supplierId: string) => {
    setSuppliers(prev =>
      prev.map(supplier =>
        supplier.id === supplierId
          ? { ...supplier, status: supplier.status === 'active' ? 'inactive' : 'active' }
          : supplier
      )
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">U卡供应商</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理U卡发卡供应商的合作关系和业绩统计
          </p>
        </div>
        <Button className="bg-custom-green hover:bg-custom-green-dark text-white">
          <Plus className="w-4 h-4 mr-2" />
          添加供应商
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">供应商总数</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">合作中</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.active}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">本月发卡</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.monthlyCards.toLocaleString()}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">累计发卡</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.totalCards.toLocaleString()}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索供应商名称、联系人..."
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
            <SelectItem value="active">合作中</SelectItem>
            <SelectItem value="inactive">已停用</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 供应商卡片列表 */}
      {filteredSuppliers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className={`bg-white dark:bg-gray-800 rounded-lg border ${
                supplier.status === 'active'
                  ? 'border-gray-200 dark:border-gray-700'
                  : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50'
              } overflow-hidden transition-all hover:shadow-lg`}
            >
              <div className="p-6">
                {/* 头部 */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-custom-green to-custom-green-dark flex items-center justify-center text-2xl">
                      {supplier.logo}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {supplier.name}
                      </h3>
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
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={supplier.status === 'active'}
                      onCheckedChange={() => toggleSupplierStatus(supplier.id)}
                    />
                  </div>
                </div>

                {/* 统计信息 */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">本月发卡</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                      {supplier.monthlyCards.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">累计发卡</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                      {supplier.totalCards.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* 详细信息 */}
                <div className="space-y-2 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">手续费率：</span>
                    <span className="font-medium text-gray-900 dark:text-white">{supplier.feeRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">结算周期：</span>
                    <span className="font-medium text-gray-900 dark:text-white">{supplier.settlementCycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">联系人：</span>
                    <span className="font-medium text-gray-900 dark:text-white">{supplier.contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">电话：</span>
                    <span className="font-medium text-gray-900 dark:text-white">{supplier.contactPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">合作开始：</span>
                    <span className="font-medium text-gray-900 dark:text-white">{supplier.cooperationStartDate}</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    管理设置
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-16 text-center">
          <Store className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无供应商数据</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">请点击"添加供应商"按钮添加合作供应商</p>
        </div>
      )}
    </div>
  )
}
