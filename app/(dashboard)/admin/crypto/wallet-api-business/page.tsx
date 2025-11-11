'use client'

import { useState } from 'react'
import { Code, Search, Plus, Eye, Settings, Activity } from 'lucide-react'
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from "sonner"

// API业务类型定义
interface WalletAPIBusiness {
  id: string
  businessName: string
  apiKey: string
  businessType: 'deposit' | 'withdrawal' | 'transfer' | 'query'
  supportedCoins: string[]
  callbackUrl: string
  dailyLimit: string
  usedToday: string
  status: 'active' | 'suspended' | 'disabled'
  createTime: string
  lastCallTime: string
}

export default function WalletAPIBusinessPage() {
  // 示例数据
  const [businesses, setBusinesses] = useState<WalletAPIBusiness[]>([
    {
      id: '1',
      businessName: '游戏充值业务',
      apiKey: 'wapi_live_4xKq9Jm2nP7sB8vC',
      businessType: 'deposit',
      supportedCoins: ['USDT', 'BTC', 'ETH'],
      callbackUrl: 'https://api.game.com/webhook/deposit',
      dailyLimit: '100,000.00',
      usedToday: '45,678.50',
      status: 'active',
      createTime: '2024-01-15 10:00:00',
      lastCallTime: '2024-11-11 09:30:00',
    },
    {
      id: '2',
      businessName: '电商提现业务',
      apiKey: 'wapi_live_8zRt3Hn5mW2qD9fG',
      businessType: 'withdrawal',
      supportedCoins: ['USDT', 'USDC'],
      callbackUrl: 'https://api.ecommerce.com/webhook/withdraw',
      dailyLimit: '50,000.00',
      usedToday: '28,500.00',
      status: 'active',
      createTime: '2024-02-20 14:30:00',
      lastCallTime: '2024-11-11 08:45:00',
    },
    {
      id: '3',
      businessName: '转账服务',
      apiKey: 'wapi_live_6yPl1Km4nT8sV3xB',
      businessType: 'transfer',
      supportedCoins: ['USDT', 'BTC', 'ETH', 'TRX'],
      callbackUrl: 'https://api.transfer.com/webhook/tx',
      dailyLimit: '200,000.00',
      usedToday: '150,234.80',
      status: 'active',
      createTime: '2024-03-10 08:00:00',
      lastCallTime: '2024-11-11 09:45:00',
    },
    {
      id: '4',
      businessName: '余额查询服务',
      apiKey: 'wapi_test_2wJk7Lp9mN5rQ4vX',
      businessType: 'query',
      supportedCoins: ['ALL'],
      callbackUrl: 'https://api.balance.com/webhook/query',
      dailyLimit: '无限制',
      usedToday: '0.00',
      status: 'suspended',
      createTime: '2024-04-05 16:20:00',
      lastCallTime: '2024-11-10 18:00:00',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedBusiness, setSelectedBusiness] = useState<WalletAPIBusiness | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  // 统计信息
  const stats = {
    totalBusinesses: businesses.length,
    activeBusinesses: businesses.filter(b => b.status === 'active').length,
    totalDailyLimit: businesses
      .filter(b => b.dailyLimit !== '无限制')
      .reduce((sum, b) => sum + parseFloat(b.dailyLimit.replace(/,/g, '')), 0)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    totalUsedToday: businesses
      .reduce((sum, b) => sum + parseFloat(b.usedToday.replace(/,/g, '')), 0)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  }

  // 过滤数据
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         business.apiKey.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || business.businessType === filterType
    const matchesStatus = filterStatus === 'all' || business.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  // 查看详情
  const handleViewDetail = (business: WalletAPIBusiness) => {
    setSelectedBusiness(business)
    setShowDetailDialog(true)
  }

  // 启用/停用业务
  const toggleBusinessStatus = (id: string) => {
    setBusinesses(prev => prev.map(business => {
      if (business.id === id) {
        const newStatus = business.status === 'active' ? 'suspended' : 'active'
        toast.success(newStatus === 'active' ? "业务已启用" : "业务已停用", {
          description: `${business.businessName} 状态已更新`,
        })
        return { ...business, status: newStatus }
      }
      return business
    }))
  }

  // 获取业务类型标签
  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      deposit: '入金',
      withdrawal: '提现',
      transfer: '转账',
      query: '查询',
    }
    return types[type] || type
  }

  // 获取业务类型徽章
  const getTypeBadge = (type: string) => {
    const badges: Record<string, string> = {
      deposit: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      withdrawal: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      transfer: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      query: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badges[type] || badges.query}`}>
        {getTypeLabel(type)}
      </span>
    )
  }

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">运行中</span>
    } else if (status === 'suspended') {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">已暂停</span>
    }
    return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full">已禁用</span>
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">钱包API业务</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理所有接入的钱包API业务和调用配置
          </p>
        </div>
        <Button className="bg-custom-green hover:bg-green-600">
          <Plus className="w-4 h-4 mr-2" />
          添加业务
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">总业务数</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalBusinesses}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">运行中</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.activeBusinesses}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">每日限额</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">${stats.totalDailyLimit}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">今日已用</div>
          <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">${stats.totalUsedToday}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索业务名称或API密钥..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-custom-green focus:border-transparent"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="业务类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            <SelectItem value="deposit">入金</SelectItem>
            <SelectItem value="withdrawal">提现</SelectItem>
            <SelectItem value="transfer">转账</SelectItem>
            <SelectItem value="query">查询</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">运行中</SelectItem>
            <SelectItem value="suspended">已暂停</SelectItem>
            <SelectItem value="disabled">已禁用</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 业务列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">业务信息</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">业务类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">支持币种</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">额度使用</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">最后调用</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBusinesses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    暂无数据
                  </td>
                </tr>
              ) : (
                filteredBusinesses.map((business) => (
                  <tr key={business.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{business.businessName}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">{business.apiKey}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getTypeBadge(business.businessType)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {business.supportedCoins.map((coin) => (
                          <span key={coin} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                            {coin}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900 dark:text-white">${business.usedToday}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">/ ${business.dailyLimit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(business.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{business.lastCallTime}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(business)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBusinessStatus(business.id)}
                          className={business.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                        >
                          <Activity className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 详情对话框 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>业务详情</DialogTitle>
            <DialogDescription>查看钱包API业务的详细信息</DialogDescription>
          </DialogHeader>
          {selectedBusiness && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">业务名称</Label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedBusiness.businessName}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">业务类型</Label>
                  <div className="mt-1">{getTypeBadge(selectedBusiness.businessType)}</div>
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">API密钥</Label>
                <p className="text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">{selectedBusiness.apiKey}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">回调地址</Label>
                <p className="text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1 break-all">{selectedBusiness.callbackUrl}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">每日限额</Label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">${selectedBusiness.dailyLimit}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">今日已用</Label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">${selectedBusiness.usedToday}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">创建时间</Label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedBusiness.createTime}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">最后调用</Label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedBusiness.lastCallTime}</p>
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">支持币种</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedBusiness.supportedCoins.map((coin) => (
                    <span key={coin} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                      {coin}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
