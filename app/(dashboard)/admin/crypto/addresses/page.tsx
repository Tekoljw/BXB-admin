"use client"

import React, { useState, useMemo } from "react"
import { Eye, Copy, Ban, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

interface WalletAddress {
  id: string
  address: string
  userId: string
  userName: string
  currency: string
  network: string
  provider: 'cobo' | 'matrixport'
  addressType: 'deposit' | 'withdraw' | 'hot' | 'cold'
  balance: string
  tag?: string
  status: 'active' | 'disabled' | 'frozen'
  createdAt: string
  lastUsedAt?: string
  remark?: string
}

export default function AddressesManagementPage() {
  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [currencyFilter, setCurrencyFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedAddress, setSelectedAddress] = useState<WalletAddress | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [networkTab, setNetworkTab] = useState("all")
  const [providerTab, setProviderTab] = useState("all")
  const [statusTab, setStatusTab] = useState("all")
  const [displayedCount, setDisplayedCount] = useState(20)

  // 示例地址数据
  const [addresses, setAddresses] = useState<WalletAddress[]>([
    {
      id: '1',
      address: 'TXm9HkF4K8UqwVZPaGsRj3BwH8TJgMxK9d',
      userId: 'U123456',
      userName: '张三',
      currency: 'USDT',
      network: 'TRC20',
      provider: 'cobo',
      addressType: 'deposit',
      balance: '1250.50',
      status: 'active',
      createdAt: '2024-11-01 10:00:00',
      lastUsedAt: '2024-11-11 09:30:00',
    },
    {
      id: '2',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7',
      userId: 'U789012',
      userName: '李四',
      currency: 'ETH',
      network: 'Ethereum',
      provider: 'matrixport',
      addressType: 'withdraw',
      balance: '0.5678',
      status: 'active',
      createdAt: '2024-11-05 14:30:00',
      lastUsedAt: '2024-11-10 16:45:00',
    },
    {
      id: '3',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      userId: 'U345678',
      userName: '王五',
      currency: 'BTC',
      network: 'Bitcoin',
      provider: 'cobo',
      addressType: 'deposit',
      balance: '0.0125',
      status: 'active',
      createdAt: '2024-11-08 11:20:00',
    },
    {
      id: '4',
      address: '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
      userId: 'U901234',
      userName: '赵六',
      currency: 'USDT',
      network: 'ERC20',
      provider: 'cobo',
      addressType: 'deposit',
      balance: '5000.00',
      status: 'frozen',
      createdAt: '2024-10-15 09:00:00',
      lastUsedAt: '2024-10-20 10:30:00',
      remark: '异常交易，已冻结',
    },
    {
      id: '5',
      address: 'TYmJKQp8VkY5wJkV8UqwVZPaGsRj3BwH8T',
      userId: 'SYSTEM',
      userName: '系统热钱包',
      currency: 'USDT',
      network: 'TRC20',
      provider: 'matrixport',
      addressType: 'hot',
      balance: '150000.00',
      status: 'active',
      createdAt: '2024-09-01 00:00:00',
      lastUsedAt: '2024-11-11 12:00:00',
    },
    {
      id: '6',
      address: '3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy',
      userId: 'SYSTEM',
      userName: '系统冷钱包',
      currency: 'BTC',
      network: 'Bitcoin',
      provider: 'cobo',
      addressType: 'cold',
      balance: '5.2500',
      status: 'active',
      createdAt: '2024-08-01 00:00:00',
    },
    {
      id: '7',
      address: 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2',
      userId: 'U567890',
      userName: '钱七',
      currency: 'BNB',
      network: 'BSC',
      provider: 'matrixport',
      addressType: 'deposit',
      balance: '2.3400',
      status: 'disabled',
      createdAt: '2024-10-10 15:00:00',
      remark: '用户申请禁用',
    },
  ])

  // 三级链式过滤：搜索 → 网络 → 供应商 → 状态
  const filteredAddresses = useMemo(() => {
    // 第一步：搜索过滤
    let filtered = addresses.filter(address => {
      const matchesSearch = 
        address.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        address.userId.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCurrency = currencyFilter === "all" || address.currency === currencyFilter
      const matchesType = typeFilter === "all" || address.addressType === typeFilter
      
      return matchesSearch && matchesCurrency && matchesType
    })

    // 第二步：网络页签过滤
    if (networkTab !== "all") {
      if (networkTab === "ERC") {
        filtered = filtered.filter(a => a.network === "ERC20" || a.network === "Ethereum")
      } else if (networkTab === "TRX") {
        filtered = filtered.filter(a => a.network === "TRC20")
      }
    }

    // 第三步：供应商页签过滤
    if (providerTab !== "all") {
      filtered = filtered.filter(a => a.provider === providerTab)
    }

    // 第四步：状态/分配状态页签过滤
    if (statusTab !== "all") {
      filtered = filtered.filter(a => {
        // 传统状态过滤（active, frozen, disabled）
        if (statusTab === 'active' || statusTab === 'frozen' || statusTab === 'disabled') {
          return a.status === statusTab
        }
        
        // 分配状态过滤
        if (statusTab === 'bound') {
          // 已绑定用户地址：userId不为空且不是系统标记
          return a.userId && a.userId !== 'SYSTEM' && a.userId !== 'PLATFORM'
        }
        
        if (statusTab === 'idle') {
          // 闲置地址：userId为空或是系统标记
          return !a.userId || a.userId === 'SYSTEM' || a.userId === 'PLATFORM'
        }
        
        return true
      })
    }

    return filtered
  }, [addresses, searchTerm, currencyFilter, typeFilter, networkTab, providerTab, statusTab])

  // 显示的地址列表（分页）
  const displayedAddresses = filteredAddresses.slice(0, displayedCount)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="w-3 h-3 mr-1" />
          正常
        </span>
      case "frozen":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          <AlertCircle className="w-3 h-3 mr-1" />
          已冻结
        </span>
      case "disabled":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
          <Ban className="w-3 h-3 mr-1" />
          已禁用
        </span>
      default:
        return null
    }
  }

  const getTypeBadge = (type: string) => {
    const badges = {
      deposit: { label: '充值地址', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
      withdraw: { label: '提现地址', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
      hot: { label: '热钱包', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
      cold: { label: '冷钱包', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
    }
    const badge = badges[type as keyof typeof badges]
    return badge ? (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.label}
      </span>
    ) : null
  }

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast.success("地址已复制", {
      description: "钱包地址已复制到剪贴板",
    })
  }

  const handleViewDetail = (address: WalletAddress) => {
    setSelectedAddress(address)
    setShowDetailDialog(true)
  }

  const handleFreezeAddress = (id: string) => {
    setAddresses(prev => prev.map(address => {
      if (address.id === id) {
        return { ...address, status: 'frozen' as const }
      }
      return address
    }))
    
    toast.success("地址已冻结", {
      description: "该地址已被冻结，无法进行交易",
    })
  }

  const handleEnableAddress = (id: string) => {
    setAddresses(prev => prev.map(address => {
      if (address.id === id) {
        return { ...address, status: 'active' as const }
      }
      return address
    }))
    
    toast.success("地址已启用", {
      description: "该地址已恢复正常使用",
    })
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">地址管理</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          管理用户钱包地址、系统热冷钱包和地址状态
        </p>
      </div>

      {/* 三级页签过滤系统 */}
      <Tabs value={networkTab} onValueChange={setNetworkTab} className="mb-6">
        <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <TabsTrigger value="all">全部网络</TabsTrigger>
          <TabsTrigger value="ERC">ERC</TabsTrigger>
          <TabsTrigger value="TRX">TRX</TabsTrigger>
        </TabsList>

        <TabsContent value={networkTab} className="mt-0">
          <Tabs value={providerTab} onValueChange={setProviderTab}>
            <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-4">
              <TabsTrigger value="all">全部供应商</TabsTrigger>
              <TabsTrigger value="cobo">Cobo</TabsTrigger>
              <TabsTrigger value="matrixport">Matrixport</TabsTrigger>
            </TabsList>

            <TabsContent value={providerTab} className="mt-0">
              <Tabs value={statusTab} onValueChange={setStatusTab}>
                <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-4">
                  <TabsTrigger value="all">全部状态</TabsTrigger>
                  <TabsTrigger value="active">正常</TabsTrigger>
                  <TabsTrigger value="frozen">已冻结</TabsTrigger>
                  <TabsTrigger value="disabled">已禁用</TabsTrigger>
                  <TabsTrigger value="bound">已绑定用户地址</TabsTrigger>
                  <TabsTrigger value="idle">闲置地址</TabsTrigger>
                </TabsList>
              </Tabs>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* 搜索和筛选 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <SearchControls
              placeholder="搜索地址、用户..."
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              onReset={handleReset}
            />
          </div>

          <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="币种" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部币种</SelectItem>
              <SelectItem value="USDT">USDT</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="BNB">BNB</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="deposit">充值地址</SelectItem>
              <SelectItem value="withdraw">提现地址</SelectItem>
              <SelectItem value="hot">热钱包</SelectItem>
              <SelectItem value="cold">冷钱包</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 地址列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  地址信息
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  用户
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  币种/网络
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  供应商
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  余额
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  创建时间
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {displayedAddresses.map((address) => (
                <tr key={address.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-gray-900 dark:text-white">
                        {address.address.substring(0, 12)}...{address.address.substring(address.address.length - 8)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyAddress(address.address)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {address.userName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {address.userId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {address.currency}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {address.network}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      address.provider === 'cobo' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                    }`}>
                      {address.provider === 'cobo' ? 'Cobo' : 'Matrixport'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(address.addressType)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {address.balance}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {address.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(address.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {address.createdAt}
                    </div>
                    {address.lastUsedAt && (
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        最近: {address.lastUsedAt}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetail(address)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {address.status === 'active' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFreezeAddress(address.id)}
                        >
                          <Ban className="w-4 h-4 text-red-500" />
                        </Button>
                      )}
                      {address.status === 'frozen' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEnableAddress(address.id)}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAddresses.length === 0 && (
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">未找到地址</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">尝试调整筛选条件</p>
          </div>
        )}

        {/* 加载更多按钮 */}
        {filteredAddresses.length > displayedCount && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setDisplayedCount(prev => prev + 20)}
              className="min-w-[200px]"
            >
              加载更多 ({displayedCount} / {filteredAddresses.length})
            </Button>
          </div>
        )}
      </div>

      {/* 地址详情对话框 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>地址详情</DialogTitle>
            <DialogDescription>
              查看钱包地址的详细信息
            </DialogDescription>
          </DialogHeader>

          {selectedAddress && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">完整地址</label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 text-sm font-mono text-gray-900 dark:text-white p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    {selectedAddress.address}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyAddress(selectedAddress.address)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">用户</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {selectedAddress.userName} ({selectedAddress.userId})
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">类型</label>
                  <div className="mt-1">{getTypeBadge(selectedAddress.addressType)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">币种</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedAddress.currency}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">网络</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedAddress.network}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">余额</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {selectedAddress.balance} {selectedAddress.currency}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">状态</label>
                  <div className="mt-1">{getStatusBadge(selectedAddress.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">创建时间</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedAddress.createdAt}</p>
                </div>
                {selectedAddress.lastUsedAt && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">最近使用</label>
                    <p className="text-sm text-gray-900 dark:text-white mt-1">{selectedAddress.lastUsedAt}</p>
                  </div>
                )}
              </div>

              {selectedAddress.tag && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">标签/Memo</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    {selectedAddress.tag}
                  </p>
                </div>
              )}

              {selectedAddress.remark && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">备注</label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    {selectedAddress.remark}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
