'use client'

import { useState } from 'react'
import { Wallet, Search, Download, Plus, Copy, Check } from 'lucide-react'
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
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// 地址类型定义
interface Address {
  id: string
  address: string
  currency: string
  chain: string
  assignedTo: string | null
  userId: string | null
  balance: string
  totalDeposits: number
  totalAmount: string
  status: 'active' | 'inactive' | 'frozen'
  createdAt: string
  lastUsedAt: string | null
}

export default function AddressManagementPage() {
  // 示例数据（实际使用时从API获取）
  const [addresses] = useState<Address[]>([
    {
      id: '1',
      address: 'TJDENsfBJs4RFETt1X1W8wMDc8M5XnJhCe',
      currency: 'USDT',
      chain: 'TRC20',
      assignedTo: '张三',
      userId: 'user_123456',
      balance: '1,234.56',
      totalDeposits: 15,
      totalAmount: '45,678.90',
      status: 'active',
      createdAt: '2024-01-15 10:30:00',
      lastUsedAt: '2024-11-09 15:45:00',
    },
    {
      id: '2',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      currency: 'USDT',
      chain: 'ERC20',
      assignedTo: '李四',
      userId: 'user_789012',
      balance: '567.89',
      totalDeposits: 8,
      totalAmount: '12,345.67',
      status: 'active',
      createdAt: '2024-02-20 14:20:00',
      lastUsedAt: '2024-11-08 10:30:00',
    },
    {
      id: '3',
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFF958023239c6A063',
      currency: 'USDT',
      chain: 'BSC',
      assignedTo: null,
      userId: null,
      balance: '0',
      totalDeposits: 0,
      totalAmount: '0',
      status: 'inactive',
      createdAt: '2024-03-10 09:00:00',
      lastUsedAt: null,
    },
    {
      id: '4',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      currency: 'BTC',
      chain: 'Bitcoin',
      assignedTo: '王五',
      userId: 'user_345678',
      balance: '0.12345678',
      totalDeposits: 3,
      totalAmount: '0.45678901',
      status: 'active',
      createdAt: '2024-01-05 08:00:00',
      lastUsedAt: '2024-11-05 12:00:00',
    },
    {
      id: '5',
      address: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
      currency: 'ETH',
      chain: 'ERC20',
      assignedTo: '赵六',
      userId: 'user_901234',
      balance: '2.34567890',
      totalDeposits: 12,
      totalAmount: '15.67890123',
      status: 'active',
      createdAt: '2024-02-01 11:30:00',
      lastUsedAt: '2024-11-10 08:15:00',
    },
    {
      id: '6',
      address: 'TXJDENsfBJs4RFETt1X1W8wMDc8M5XnJhCf',
      currency: 'USDT',
      chain: 'TRC20',
      assignedTo: null,
      userId: null,
      balance: '0',
      totalDeposits: 0,
      totalAmount: '0',
      status: 'inactive',
      createdAt: '2024-03-25 16:00:00',
      lastUsedAt: null,
    },
    {
      id: '7',
      address: '0x123456789abcdef0123456789abcdef012345678',
      currency: 'USDT',
      chain: 'BSC',
      assignedTo: '孙七',
      userId: 'user_567890',
      balance: '890.12',
      totalDeposits: 5,
      totalAmount: '5,678.90',
      status: 'frozen',
      createdAt: '2024-02-15 13:00:00',
      lastUsedAt: '2024-10-20 14:30:00',
    },
    {
      id: '8',
      address: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy',
      currency: 'BTC',
      chain: 'Bitcoin',
      assignedTo: null,
      userId: null,
      balance: '0',
      totalDeposits: 0,
      totalAmount: '0',
      status: 'inactive',
      createdAt: '2024-04-01 10:00:00',
      lastUsedAt: null,
    },
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCurrency, setFilterCurrency] = useState('all')
  const [filterChain, setFilterChain] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterAssigned, setFilterAssigned] = useState('all')
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  // 统计数据
  const stats = {
    total: addresses.length,
    assigned: addresses.filter(a => a.assignedTo).length,
    unassigned: addresses.filter(a => !a.assignedTo).length,
    active: addresses.filter(a => a.status === 'active').length,
  }

  // 复制地址
  const copyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  // 过滤地址
  const filteredAddresses = addresses.filter(address => {
    const matchesSearch = address.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         address.userId?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCurrency = filterCurrency === 'all' || address.currency === filterCurrency
    const matchesChain = filterChain === 'all' || address.chain === filterChain
    const matchesStatus = filterStatus === 'all' || address.status === filterStatus
    const matchesAssigned = filterAssigned === 'all' ||
                           (filterAssigned === 'assigned' && address.assignedTo) ||
                           (filterAssigned === 'unassigned' && !address.assignedTo)
    
    return matchesSearch && matchesCurrency && matchesChain && matchesStatus && matchesAssigned
  })

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    const badges = {
      active: <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">活跃</span>,
      inactive: <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded-full">未使用</span>,
      frozen: <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-full">冻结</span>,
    }
    return badges[status as keyof typeof badges]
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">地址管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理平台充值地址的分配和监控
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {/* 导出功能 */}}
          >
            <Download className="w-4 h-4 mr-2" />
            导出地址
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-custom-green hover:bg-custom-green-dark text-white">
                <Plus className="w-4 h-4 mr-2" />
                生成地址
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>生成新地址</SheetTitle>
                <SheetDescription>
                  为指定币种和链生成新的充值地址
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <Label>选择币种</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>选择链</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRC20">TRC20</SelectItem>
                      <SelectItem value="ERC20">ERC20</SelectItem>
                      <SelectItem value="BSC">BSC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>生成数量</Label>
                  <Input type="number" defaultValue="1" min="1" max="100" className="mt-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    一次最多生成100个地址
                  </p>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white">
                    生成
                  </Button>
                  <Button variant="outline" className="flex-1">
                    取消
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">总地址数</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">已分配</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.assigned}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">未分配</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.unassigned}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">活跃地址</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.active}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索地址、用户ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-green"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <Select value={filterCurrency} onValueChange={setFilterCurrency}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部币种</SelectItem>
              <SelectItem value="USDT">USDT</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="ETH">ETH</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterChain} onValueChange={setFilterChain}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部链</SelectItem>
              <SelectItem value="TRC20">TRC20</SelectItem>
              <SelectItem value="ERC20">ERC20</SelectItem>
              <SelectItem value="BSC">BSC</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterAssigned} onValueChange={setFilterAssigned}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="assigned">已分配</SelectItem>
              <SelectItem value="unassigned">未分配</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="active">活跃</SelectItem>
              <SelectItem value="inactive">未使用</SelectItem>
              <SelectItem value="frozen">冻结</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 地址列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredAddresses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    地址
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    币种/链
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    分配给
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    余额
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    充值统计
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    创建时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    最后使用
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAddresses.map((address) => (
                  <tr key={address.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-mono text-gray-900 dark:text-white truncate max-w-xs">
                          {address.address}
                        </div>
                        <button
                          onClick={() => copyAddress(address.address)}
                          className="text-gray-400 hover:text-custom-green transition-colors"
                        >
                          {copiedAddress === address.address ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {address.currency}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {address.chain}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {address.assignedTo ? (
                        <div>
                          <div className="text-sm text-gray-900 dark:text-white">
                            {address.assignedTo}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {address.userId}
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-600">未分配</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {address.balance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {address.totalDeposits} 次
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {address.totalAmount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(address.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {address.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {address.lastUsedAt ? (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {address.lastUsedAt}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-600">从未使用</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <Wallet className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无充值地址</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">请点击"生成地址"按钮创建新的充值地址</p>
          </div>
        )}
      </div>
    </div>
  )
}
