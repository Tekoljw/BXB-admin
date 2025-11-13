'use client'

import { useState, useMemo } from 'react'
import { Users, Search, Plus, Eye, Lock, Unlock } from 'lucide-react'
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from '@/components/ui/label'
import { toast } from "sonner"

// 资产信息
interface Asset {
  symbol: string
  available: string
  locked: string
}

// 用户类型定义
interface CryptoUser {
  id: string
  displayName: string
  email: string
  registrationAt: string
  type: 'retail' | 'custody'
  status: 'active' | 'suspended' | 'frozen'
  kycTier: '未认证' | 'KYC1' | 'KYC2' | 'KYC3'
  assets: Asset[]
  totalValueUSD: string
  lastLoginAt: string
}

export default function CryptoUserManagementPage() {
  const [userType, setUserType] = useState<'retail' | 'custody'>('retail')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedUser, setSelectedUser] = useState<CryptoUser | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  // 示例用户数据
  const [users, setUsers] = useState<CryptoUser[]>([
    {
      id: 'U001',
      displayName: '张三',
      email: 'zhangsan@example.com',
      registrationAt: '2024-01-15 10:00:00',
      type: 'retail',
      status: 'active',
      kycTier: 'KYC2',
      assets: [
        { symbol: 'USDT', available: '1,250.50', locked: '0.00' },
        { symbol: 'BTC', available: '0.0125', locked: '0.00' },
        { symbol: 'ETH', available: '0.5678', locked: '0.10' },
      ],
      totalValueUSD: '5,234.80',
      lastLoginAt: '2024-11-11 09:30:00',
    },
    {
      id: 'U002',
      displayName: '李四',
      email: 'lisi@example.com',
      registrationAt: '2024-02-20 14:30:00',
      type: 'retail',
      status: 'active',
      kycTier: 'KYC1',
      assets: [
        { symbol: 'USDT', available: '500.00', locked: '100.00' },
        { symbol: 'BTC', available: '0.0050', locked: '0.00' },
      ],
      totalValueUSD: '1,200.00',
      lastLoginAt: '2024-11-10 16:45:00',
    },
    {
      id: 'M001',
      displayName: '游戏平台商户',
      email: 'game@merchant.com',
      registrationAt: '2024-03-10 08:00:00',
      type: 'custody',
      status: 'active',
      kycTier: 'KYC3',
      assets: [
        { symbol: 'USDT', available: '150,000.00', locked: '20,000.00' },
        { symbol: 'BTC', available: '5.2500', locked: '0.50' },
        { symbol: 'ETH', available: '25.3400', locked: '2.00' },
        { symbol: 'TRX', available: '500,000.00', locked: '0.00' },
      ],
      totalValueUSD: '350,234.50',
      lastLoginAt: '2024-11-11 09:45:00',
    },
    {
      id: 'M002',
      displayName: '电商平台商户',
      email: 'ecommerce@merchant.com',
      registrationAt: '2024-04-05 16:20:00',
      type: 'custody',
      status: 'active',
      kycTier: 'KYC3',
      assets: [
        { symbol: 'USDT', available: '80,000.00', locked: '5,000.00' },
        { symbol: 'USDC', available: '50,000.00', locked: '0.00' },
      ],
      totalValueUSD: '135,000.00',
      lastLoginAt: '2024-11-11 08:30:00',
    },
    {
      id: 'U003',
      displayName: '王五',
      email: 'wangwu@example.com',
      registrationAt: '2024-05-12 11:15:00',
      type: 'retail',
      status: 'suspended',
      kycTier: '未认证',
      assets: [
        { symbol: 'USDT', available: '100.00', locked: '0.00' },
      ],
      totalValueUSD: '100.00',
      lastLoginAt: '2024-11-08 14:20:00',
    },
    {
      id: 'M003',
      displayName: '支付网关商户',
      email: 'payment@merchant.com',
      registrationAt: '2024-06-18 09:30:00',
      type: 'custody',
      status: 'frozen',
      kycTier: 'KYC2',
      assets: [
        { symbol: 'USDT', available: '0.00', locked: '10,000.00' },
        { symbol: 'BTC', available: '0.0000', locked: '0.5000' },
      ],
      totalValueUSD: '25,000.00',
      lastLoginAt: '2024-11-05 10:00:00',
    },
  ])

  // 过滤用户
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesType = user.type === userType
      const matchesSearch = 
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus
      return matchesType && matchesSearch && matchesStatus
    })
  }, [users, userType, searchQuery, filterStatus])

  // 查看详情
  const handleViewDetail = (user: CryptoUser) => {
    setSelectedUser(user)
    setShowDetailDialog(true)
  }

  // 冻结/解冻用户 - 只允许 active ↔ frozen 状态切换
  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(user => {
      if (user.id === id) {
        // 只允许 active 和 frozen 之间切换，suspended 状态需要单独处理
        if (user.status === 'suspended') {
          toast.error("暂停状态的用户不能直接冻结或解冻", {
            description: "请先恢复用户状态后再进行操作",
          })
          return user
        }
        
        const newStatus = user.status === 'active' ? 'frozen' : 'active'
        toast.success(newStatus === 'active' ? "用户已解冻" : "用户已冻结", {
          description: `${user.displayName} 状态已更新`,
        })
        return { ...user, status: newStatus }
      }
      return user
    }))
  }

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">正常</span>
    } else if (status === 'suspended') {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">已暂停</span>
    }
    return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">已冻结</span>
  }

  // 获取KYC徽章
  const getKYCBadge = (kycTier: string) => {
    const badges: Record<string, string> = {
      '未认证': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
      'KYC1': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'KYC2': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      'KYC3': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badges[kycTier] || badges['未认证']}`}>
        {kycTier}
      </span>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题和用户类型页签 */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crypto用户管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理平台用户账户和资产信息
          </p>
        </div>
        <Button className="bg-custom-green hover:bg-green-600">
          <Plus className="w-4 h-4 mr-2" />
          添加用户
        </Button>
      </div>

      {/* 用户分类页签 */}
      <Tabs value={userType} onValueChange={(v) => setUserType(v as 'retail' | 'custody')}>
        <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <TabsTrigger value="retail">普通用户</TabsTrigger>
          <TabsTrigger value="custody">托管商户</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索用户ID、姓名或邮箱..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-custom-green focus:border-transparent"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">正常</SelectItem>
            <SelectItem value="suspended">已暂停</SelectItem>
            <SelectItem value="frozen">已冻结</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 用户列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">用户信息</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">资产概览</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">总资产(USD)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">KYC等级</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">注册时间</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    暂无数据
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{user.displayName}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{user.id}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.assets.slice(0, 3).map((asset) => (
                          <span key={asset.symbol} className="px-2 py-0.5 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-800">
                            {asset.symbol}: {asset.available}
                          </span>
                        ))}
                        {user.assets.length > 3 && (
                          <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                            +{user.assets.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">${user.totalValueUSD}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getKYCBadge(user.kycTier)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{user.registrationAt}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(user)}
                          title="查看详情"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {/* 只为 active 或 frozen 状态的用户显示冻结/解冻按钮 */}
                        {(user.status === 'active' || user.status === 'frozen') && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleUserStatus(user.id)}
                            className={user.status === 'active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                            title={user.status === 'active' ? '冻结用户' : '解冻用户'}
                          >
                            {user.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </Button>
                        )}
                        {/* suspended 状态用户显示禁用的按钮和提示 */}
                        {user.status === 'suspended' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled
                            className="text-gray-400 cursor-not-allowed"
                            title="暂停状态的用户需要单独处理"
                          >
                            <Lock className="w-4 h-4" />
                          </Button>
                        )}
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>用户详情</DialogTitle>
            <DialogDescription>查看用户的详细信息和资产明细</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">用户ID</Label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedUser.id}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">用户名称</Label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{selectedUser.displayName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">邮箱地址</Label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">用户类型</Label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedUser.type === 'retail' ? '普通用户' : '托管商户'}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">KYC等级</Label>
                  <div className="mt-1">{getKYCBadge(selectedUser.kycTier)}</div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">状态</Label>
                  <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">总资产</Label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">${selectedUser.totalValueUSD}</p>
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">资产明细</Label>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-3">
                  {selectedUser.assets.map((asset) => (
                    <div key={asset.symbol} className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{asset.symbol}</span>
                      <div className="text-right">
                        <div className="text-sm text-gray-900 dark:text-white">可用: {asset.available}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">冻结: {asset.locked}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">注册时间</Label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedUser.registrationAt}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">最后登录</Label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedUser.lastLoginAt}</p>
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
