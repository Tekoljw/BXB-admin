'use client'

import { useState } from 'react'
import { Wallet, Search, Lock, Minus } from 'lucide-react'
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

// 用户资产类型定义
interface UserAsset {
  id: string
  userId: string
  username: string
  currency: string
  availableBalance: string
  retainedBalance: string
  totalBalance: string
  marketValue: string
  status: 'active' | 'frozen'
}

export default function UserAssetsPage() {
  // 示例数据
  const [assets, setAssets] = useState<UserAsset[]>([
    {
      id: '1',
      userId: 'U123456',
      username: '张三',
      currency: 'USDT',
      availableBalance: '10,500.00',
      retainedBalance: '2,000.00',
      totalBalance: '12,500.00',
      marketValue: '12,500.00',
      status: 'active',
    },
    {
      id: '2',
      userId: 'U234567',
      username: '李四',
      currency: 'USDT',
      availableBalance: '4,800.00',
      retainedBalance: '1,200.00',
      totalBalance: '6,000.00',
      marketValue: '6,000.00',
      status: 'active',
    },
    {
      id: '3',
      userId: 'U345678',
      username: '王五',
      currency: 'USD',
      availableBalance: '16,000.00',
      retainedBalance: '3,500.00',
      totalBalance: '19,500.00',
      marketValue: '19,500.00',
      status: 'active',
    },
    {
      id: '4',
      userId: 'U456789',
      username: '赵六',
      currency: 'USDT',
      availableBalance: '0.00',
      retainedBalance: '3,400.00',
      totalBalance: '3,400.00',
      marketValue: '3,400.00',
      status: 'frozen',
    },
    {
      id: '5',
      userId: 'U567890',
      username: '孙七',
      currency: 'EUR',
      availableBalance: '7,500.00',
      retainedBalance: '1,800.00',
      totalBalance: '9,300.00',
      marketValue: '9,765.00',
      status: 'active',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterCurrency, setFilterCurrency] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  
  // 弹窗状态
  const [showFreezeDialog, setShowFreezeDialog] = useState(false)
  const [showDeductDialog, setShowDeductDialog] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<UserAsset | null>(null)
  const [freezeAmount, setFreezeAmount] = useState('')
  const [deductAmount, setDeductAmount] = useState('')
  const [deductReason, setDeductReason] = useState('')

  // 统计数据
  const stats = {
    totalUsers: new Set(assets.map(a => a.userId)).size,
    totalAssets: assets.length,
    totalValue: assets.reduce((sum, a) => sum + parseFloat(a.marketValue.replace(/,/g, '')), 0).toFixed(2),
    frozenAssets: assets.filter(a => a.status === 'frozen').length,
  }

  // 过滤资产
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.username.includes(searchQuery)
    const matchesCurrency = filterCurrency === 'all' || asset.currency === filterCurrency
    const matchesStatus = filterStatus === 'all' || asset.status === filterStatus
    return matchesSearch && matchesCurrency && matchesStatus
  })

  // 手动冻结
  const handleFreeze = (asset: UserAsset) => {
    setSelectedAsset(asset)
    setFreezeAmount('')
    setShowFreezeDialog(true)
  }

  const confirmFreeze = () => {
    if (!selectedAsset || !freezeAmount) return

    const amount = parseFloat(freezeAmount)
    const available = parseFloat(selectedAsset.availableBalance.replace(/,/g, ''))

    // 表单验证
    if (isNaN(amount) || amount <= 0) {
      toast.error("冻结失败", {
        description: "请输入有效的冻结金额",
      })
      return
    }

    if (amount > available) {
      toast.error("冻结失败", {
        description: `冻结金额不能超过可用余额 $${selectedAsset.availableBalance}`,
      })
      return
    }

    // 更新资产状态 - 冻结是把资金从可用转移到留存
    setAssets(prev => prev.map(asset => {
      if (asset.id === selectedAsset.id) {
        const retained = parseFloat(asset.retainedBalance.replace(/,/g, ''))
        const newAvailable = available - amount
        const newRetained = retained + amount
        
        return {
          ...asset,
          availableBalance: newAvailable.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          retainedBalance: newRetained.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          // totalBalance 和 marketValue 保持不变，因为只是内部转移
          status: newAvailable === 0 ? 'frozen' : 'active'
        }
      }
      return asset
    }))

    toast.success("冻结成功", {
      description: `已冻结用户 ${selectedAsset.username} 的 $${freezeAmount} ${selectedAsset.currency}`,
    })

    setShowFreezeDialog(false)
    setSelectedAsset(null)
    setFreezeAmount('')
  }

  // 手动扣除
  const handleDeduct = (asset: UserAsset) => {
    setSelectedAsset(asset)
    setDeductAmount('')
    setDeductReason('')
    setShowDeductDialog(true)
  }

  const confirmDeduct = () => {
    if (!selectedAsset || !deductAmount || !deductReason) return

    const amount = parseFloat(deductAmount)
    const available = parseFloat(selectedAsset.availableBalance.replace(/,/g, ''))
    const retained = parseFloat(selectedAsset.retainedBalance.replace(/,/g, ''))
    const actualTotal = available + retained

    // 表单验证
    if (isNaN(amount) || amount <= 0) {
      toast.error("扣除失败", {
        description: "请输入有效的扣除金额",
      })
      return
    }

    // 基于实际可用总额（可用+留存）校验
    if (amount > actualTotal) {
      toast.error("扣除失败", {
        description: `扣除金额不能超过实际可用总额 $${actualTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
      })
      return
    }

    if (deductReason.trim().length < 2) {
      toast.error("扣除失败", {
        description: "请输入扣除原因（至少2个字符）",
      })
      return
    }

    // 更新资产余额
    setAssets(prev => prev.map(asset => {
      if (asset.id === selectedAsset.id) {
        // 优先从可用余额扣除，不足时再从留存余额扣除
        let newAvailable = available
        let newRetained = retained
        
        if (amount <= available) {
          newAvailable = available - amount
        } else {
          newAvailable = 0
          newRetained = retained - (amount - available)
        }

        // 重新计算总余额和市值
        const newTotal = newAvailable + newRetained

        return {
          ...asset,
          availableBalance: newAvailable.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          retainedBalance: newRetained.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          totalBalance: newTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          marketValue: newTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        }
      }
      return asset
    }))

    toast.success("扣除成功", {
      description: `已从用户 ${selectedAsset.username} 扣除 $${deductAmount} ${selectedAsset.currency}`,
    })

    setShowDeductDialog(false)
    setSelectedAsset(null)
    setDeductAmount('')
    setDeductReason('')
  }

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">正常</span>
    }
    return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">已冻结</span>
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">用户资产列表</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          管理所有用户的共管资产余额和状态
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">总用户数</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalUsers}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">资产记录</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.totalAssets}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">总市值</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">${stats.totalValue}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">已冻结</div>
          <div className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{stats.frozenAssets}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索用户ID、用户名..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-green"
          />
        </div>
        <Select value={filterCurrency} onValueChange={setFilterCurrency}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="币种" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部币种</SelectItem>
            <SelectItem value="USDT">USDT</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">正常</SelectItem>
            <SelectItem value="frozen">已冻结</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 资产列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredAssets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    用户信息
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    币种
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    可用共管资金余额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    留存的用户总余额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    用户共管总余额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    市值
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {asset.username}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {asset.userId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                        {asset.currency}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                        ${asset.availableBalance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        ${asset.retainedBalance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${asset.totalBalance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        ${asset.marketValue}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(asset.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFreeze(asset)}
                          disabled={asset.status === 'frozen'}
                        >
                          <Lock className="w-4 h-4 mr-1" />
                          冻结
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeduct(asset)}
                        >
                          <Minus className="w-4 h-4 mr-1" />
                          扣除
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <Wallet className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无资产记录</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">用户的资产信息将显示在此处</p>
          </div>
        )}
      </div>

      {/* 手动冻结弹窗 */}
      <Dialog open={showFreezeDialog} onOpenChange={setShowFreezeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>手动冻结资产</DialogTitle>
            <DialogDescription>
              冻结用户的部分或全部资产，冻结后用户无法使用该资产
            </DialogDescription>
          </DialogHeader>
          {selectedAsset && (
            <div className="space-y-4">
              <div>
                <Label>用户信息</Label>
                <div className="text-sm text-gray-900 dark:text-white mt-1">
                  {selectedAsset.username} (ID: {selectedAsset.userId})
                </div>
              </div>
              <div>
                <Label>币种</Label>
                <div className="text-sm text-gray-900 dark:text-white mt-1">
                  {selectedAsset.currency}
                </div>
              </div>
              <div>
                <Label>可用余额</Label>
                <div className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                  ${selectedAsset.availableBalance}
                </div>
              </div>
              <div>
                <Label htmlFor="freezeAmount">冻结金额</Label>
                <Input
                  id="freezeAmount"
                  type="number"
                  placeholder="请输入冻结金额"
                  value={freezeAmount}
                  onChange={(e) => setFreezeAmount(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFreezeDialog(false)}>
              取消
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={confirmFreeze}
              disabled={!freezeAmount}
            >
              确认冻结
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 手动扣除弹窗 */}
      <Dialog open={showDeductDialog} onOpenChange={setShowDeductDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>手动扣除资产</DialogTitle>
            <DialogDescription>
              从用户账户扣除指定金额，请谨慎操作并填写扣除原因
            </DialogDescription>
          </DialogHeader>
          {selectedAsset && (
            <div className="space-y-4">
              <div>
                <Label>用户信息</Label>
                <div className="text-sm text-gray-900 dark:text-white mt-1">
                  {selectedAsset.username} (ID: {selectedAsset.userId})
                </div>
              </div>
              <div>
                <Label>币种</Label>
                <div className="text-sm text-gray-900 dark:text-white mt-1">
                  {selectedAsset.currency}
                </div>
              </div>
              <div>
                <Label>总余额</Label>
                <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                  ${selectedAsset.totalBalance}
                </div>
              </div>
              <div>
                <Label htmlFor="deductAmount">扣除金额</Label>
                <Input
                  id="deductAmount"
                  type="number"
                  placeholder="请输入扣除金额"
                  value={deductAmount}
                  onChange={(e) => setDeductAmount(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="deductReason">扣除原因</Label>
                <Input
                  id="deductReason"
                  type="text"
                  placeholder="请输入扣除原因"
                  value={deductReason}
                  onChange={(e) => setDeductReason(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeductDialog(false)}>
              取消
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={confirmDeduct}
              disabled={!deductAmount || !deductReason}
            >
              确认扣除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
