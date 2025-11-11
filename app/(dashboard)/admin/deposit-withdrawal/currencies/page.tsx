"use client"

import React, { useState, useMemo } from "react"
import { Search, Plus, Settings, Activity, TrendingUp, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

type CurrencyCategory = "stablecoin" | "mainstream" | "meme"

interface CryptoCurrency {
  id: string
  name: string
  symbol: string
  icon: string
  category: CurrencyCategory
  networks: string[]
  minDeposit: string
  minWithdraw: string
  withdrawFee: string
  depositEnabled: boolean
  withdrawEnabled: boolean
  precision: number
  sort: number
}

export default function DepositWithdrawalCurrenciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState<CryptoCurrency | null>(null)
  const [showConfigSheet, setShowConfigSheet] = useState(false)
  const [showNetworksDialog, setShowNetworksDialog] = useState(false)
  const [editingConfig, setEditingConfig] = useState<Partial<CryptoCurrency>>({})
  const [categoryTab, setCategoryTab] = useState("all")
  const [networkTab, setNetworkTab] = useState("all")

  // 示例币种数据
  const [currencies, setCurrencies] = useState<CryptoCurrency[]>([
    {
      id: '1',
      name: 'Tether',
      symbol: 'USDT',
      icon: '₮',
      category: 'stablecoin',
      networks: ['TRC20', 'ERC20', 'BSC', 'Polygon'],
      minDeposit: '10.00',
      minWithdraw: '20.00',
      withdrawFee: '1.00',
      depositEnabled: true,
      withdrawEnabled: true,
      precision: 6,
      sort: 1,
    },
    {
      id: '2',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      category: 'mainstream',
      networks: ['Bitcoin'],
      minDeposit: '0.0001',
      minWithdraw: '0.001',
      withdrawFee: '0.0005',
      depositEnabled: true,
      withdrawEnabled: true,
      precision: 8,
      sort: 2,
    },
    {
      id: '3',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'Ξ',
      category: 'mainstream',
      networks: ['Ethereum', 'Arbitrum', 'Optimism'],
      minDeposit: '0.01',
      minWithdraw: '0.02',
      withdrawFee: '0.005',
      depositEnabled: true,
      withdrawEnabled: true,
      precision: 8,
      sort: 3,
    },
    {
      id: '4',
      name: 'Binance Coin',
      symbol: 'BNB',
      icon: 'B',
      category: 'mainstream',
      networks: ['BSC'],
      minDeposit: '0.01',
      minWithdraw: '0.02',
      withdrawFee: '0.001',
      depositEnabled: true,
      withdrawEnabled: false,
      precision: 8,
      sort: 4,
    },
    {
      id: '5',
      name: 'USD Coin',
      symbol: 'USDC',
      icon: '$',
      category: 'stablecoin',
      networks: ['ERC20', 'BSC', 'Polygon', 'Solana'],
      minDeposit: '10.00',
      minWithdraw: '20.00',
      withdrawFee: '1.00',
      depositEnabled: true,
      withdrawEnabled: true,
      precision: 6,
      sort: 5,
    },
    {
      id: '6',
      name: 'Solana',
      symbol: 'SOL',
      icon: 'S',
      category: 'mainstream',
      networks: ['Solana'],
      minDeposit: '0.1',
      minWithdraw: '0.2',
      withdrawFee: '0.01',
      depositEnabled: false,
      withdrawEnabled: false,
      precision: 8,
      sort: 6,
    },
    {
      id: '7',
      name: 'Dogecoin',
      symbol: 'DOGE',
      icon: 'Ð',
      category: 'meme',
      networks: ['Dogecoin'],
      minDeposit: '10',
      minWithdraw: '20',
      withdrawFee: '5',
      depositEnabled: true,
      withdrawEnabled: true,
      precision: 8,
      sort: 7,
    },
    {
      id: '8',
      name: 'Shiba Inu',
      symbol: 'SHIB',
      icon: '柴',
      category: 'meme',
      networks: ['ERC20'],
      minDeposit: '1000000',
      minWithdraw: '2000000',
      withdrawFee: '500000',
      depositEnabled: true,
      withdrawEnabled: true,
      precision: 0,
      sort: 8,
    },
  ])

  // 动态生成可用的网络选项
  const availableNetworks = useMemo(() => {
    const networksSet = new Set<string>()
    currencies.forEach(currency => {
      if (categoryTab === "all" || currency.category === categoryTab) {
        currency.networks.forEach(network => networksSet.add(network))
      }
    })
    return Array.from(networksSet).sort()
  }, [currencies, categoryTab])

  // 链式过滤逻辑
  const filteredCurrencies = useMemo(() => {
    return currencies.filter(currency => {
      // 搜索词过滤
      const matchesSearch = 
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      
      // 一级页签（分类）过滤
      const matchesCategory = categoryTab === "all" || currency.category === categoryTab
      
      // 二级页签（网络）过滤
      const matchesNetwork = networkTab === "all" || currency.networks.includes(networkTab)
      
      return matchesSearch && matchesCategory && matchesNetwork
    })
  }, [currencies, searchTerm, categoryTab, networkTab])
  
  // 当一级页签改变时，重置二级页签
  const handleCategoryChange = (value: string) => {
    setCategoryTab(value)
    setNetworkTab("all")
  }

  const stats = {
    total: currencies.length,
    depositEnabled: currencies.filter(c => c.depositEnabled).length,
    withdrawEnabled: currencies.filter(c => c.withdrawEnabled).length,
    networks: new Set(currencies.flatMap(c => c.networks)).size,
  }

  const toggleDeposit = (id: string) => {
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === id) {
        const newStatus = !currency.depositEnabled
        toast.success(newStatus ? "充值已启用" : "充值已禁用", {
          description: `${currency.symbol} 充值功能已${newStatus ? '开启' : '关闭'}`,
        })
        return { ...currency, depositEnabled: newStatus }
      }
      return currency
    }))
  }

  const toggleWithdraw = (id: string) => {
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === id) {
        const newStatus = !currency.withdrawEnabled
        toast.success(newStatus ? "提现已启用" : "提现已禁用", {
          description: `${currency.symbol} 提现功能已${newStatus ? '开启' : '关闭'}`,
        })
        return { ...currency, withdrawEnabled: newStatus }
      }
      return currency
    }))
  }

  const handleConfigure = (currency: CryptoCurrency) => {
    setSelectedCurrency(currency)
    setEditingConfig({ ...currency })
    setShowConfigSheet(true)
  }

  const handleSaveConfig = () => {
    if (!selectedCurrency) return
    
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === selectedCurrency.id) {
        return { ...currency, ...editingConfig }
      }
      return currency
    }))
    
    toast.success("配置已保存", {
      description: `${selectedCurrency.symbol} 的配置已成功更新`,
    })
    setShowConfigSheet(false)
  }

  const handleViewNetworks = (currency: CryptoCurrency) => {
    setSelectedCurrency(currency)
    setShowNetworksDialog(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">币种管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理支持的加密货币币种、网络和配置参数
          </p>
        </div>
        <Button className="bg-custom-green hover:bg-custom-green-dark text-white">
          <Plus className="w-4 h-4 mr-2" />
          添加币种
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">总币种数</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</h3>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">充值已启用</p>
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.depositEnabled}</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">提现已启用</p>
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.withdrawEnabled}</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">支持网络</p>
              <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.networks}</h3>
            </div>
            <Network className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* 搜索栏 */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索币种名称或代码..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 两级页签过滤 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        {/* 一级页签：币种分类 */}
        <Tabs value={categoryTab} onValueChange={handleCategoryChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="stablecoin">稳定币</TabsTrigger>
            <TabsTrigger value="mainstream">主流币</TabsTrigger>
            <TabsTrigger value="meme">MEME币</TabsTrigger>
          </TabsList>
          
          {/* 二级页签：网络类型 */}
          <Tabs value={networkTab} onValueChange={setNetworkTab}>
            <TabsList className="flex-wrap h-auto">
              <TabsTrigger value="all">全部</TabsTrigger>
              {availableNetworks.map(network => (
                <TabsTrigger key={network} value={network}>
                  {network}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Tabs>
      </div>

      {/* 币种列表表格 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  币种
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  支持网络
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  最小充值
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  最小提现
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  提现手续费
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  充值
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  提现
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCurrencies.map((currency) => (
                <tr 
                  key={currency.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {currency.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {currency.symbol}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {currency.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewNetworks(currency)}
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Network className="w-4 h-4" />
                      {currency.networks.length} 个网络
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {currency.minDeposit}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {currency.minWithdraw}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-900 dark:text-white font-medium">
                      {currency.withdrawFee}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Switch
                      checked={currency.depositEnabled}
                      onCheckedChange={() => toggleDeposit(currency.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Switch
                      checked={currency.withdrawEnabled}
                      onCheckedChange={() => toggleWithdraw(currency.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleConfigure(currency)}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCurrencies.length === 0 && (
          <div className="text-center py-16">
            <Activity className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">未找到币种</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">尝试调整搜索条件</p>
          </div>
        )}
      </div>

      {/* 配置侧边栏 */}
      <Sheet open={showConfigSheet} onOpenChange={setShowConfigSheet}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>币种配置</SheetTitle>
            <SheetDescription>
              配置 {selectedCurrency?.symbol} 的详细参数
            </SheetDescription>
          </SheetHeader>

          {selectedCurrency && (
            <div className="mt-6 space-y-4">
              <div>
                <Label>币种名称</Label>
                <Input 
                  value={editingConfig.name || ''} 
                  onChange={(e) => setEditingConfig({ ...editingConfig, name: e.target.value })}
                  className="mt-2" 
                />
              </div>

              <div>
                <Label>币种代码</Label>
                <Input 
                  value={editingConfig.symbol || ''} 
                  onChange={(e) => setEditingConfig({ ...editingConfig, symbol: e.target.value })}
                  className="mt-2" 
                />
              </div>

              <div>
                <Label>精度</Label>
                <Input 
                  type="number" 
                  value={editingConfig.precision || 0} 
                  onChange={(e) => setEditingConfig({ ...editingConfig, precision: parseInt(e.target.value) })}
                  className="mt-2" 
                />
              </div>

              <div>
                <Label>最小充值金额</Label>
                <Input 
                  value={editingConfig.minDeposit || ''} 
                  onChange={(e) => setEditingConfig({ ...editingConfig, minDeposit: e.target.value })}
                  className="mt-2" 
                />
              </div>

              <div>
                <Label>最小提现金额</Label>
                <Input 
                  value={editingConfig.minWithdraw || ''} 
                  onChange={(e) => setEditingConfig({ ...editingConfig, minWithdraw: e.target.value })}
                  className="mt-2" 
                />
              </div>

              <div>
                <Label>提现手续费</Label>
                <Input 
                  value={editingConfig.withdrawFee || ''} 
                  onChange={(e) => setEditingConfig({ ...editingConfig, withdrawFee: e.target.value })}
                  className="mt-2" 
                />
              </div>

              <div>
                <Label>排序</Label>
                <Input 
                  type="number" 
                  value={editingConfig.sort || 0} 
                  onChange={(e) => setEditingConfig({ ...editingConfig, sort: parseInt(e.target.value) })}
                  className="mt-2" 
                />
              </div>

              <div className="pt-4 space-y-4 border-t">
                <Button 
                  className="w-full bg-custom-green hover:bg-custom-green-dark text-white"
                  onClick={handleSaveConfig}
                >
                  保存配置
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setShowConfigSheet(false)}>
                  取消
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* 网络列表对话框 */}
      <Dialog open={showNetworksDialog} onOpenChange={setShowNetworksDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCurrency?.symbol} 支持的网络</DialogTitle>
            <DialogDescription>
              查看和管理 {selectedCurrency?.name} 支持的区块链网络
            </DialogDescription>
          </DialogHeader>

          {selectedCurrency && (
            <div className="space-y-2">
              {selectedCurrency.networks.map((network, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Network className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900 dark:text-white">{network}</span>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                    已启用
                  </span>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
