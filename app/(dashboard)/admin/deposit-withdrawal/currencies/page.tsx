"use client"

import React, { useState } from "react"
import { Search, Plus, Settings, Activity, TrendingUp, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
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
import { toast } from "sonner"

interface CryptoCurrency {
  id: string
  name: string
  symbol: string
  icon: string
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

  // 示例币种数据
  const [currencies, setCurrencies] = useState<CryptoCurrency[]>([
    {
      id: '1',
      name: 'Tether',
      symbol: 'USDT',
      icon: '₮',
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
      networks: ['Solana'],
      minDeposit: '0.1',
      minWithdraw: '0.2',
      withdrawFee: '0.01',
      depositEnabled: false,
      withdrawEnabled: false,
      precision: 8,
      sort: 6,
    },
  ])

  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">币种管理</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              管理支持的加密货币币种、网络和配置参数
            </p>
          </div>
          <Button className="bg-custom-green hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            添加币种
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总币种数</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</h3>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">充值已启用</p>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.depositEnabled}</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">提现已启用</p>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.withdrawEnabled}</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">支持网络</p>
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.networks}</h3>
            </div>
            <Network className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* 搜索栏 */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索币种名称或代码..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* 币种卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCurrencies.map((currency) => (
          <Card key={currency.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                  {currency.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currency.symbol}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {currency.name}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleConfigure(currency)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">支持网络</span>
                <button
                  onClick={() => handleViewNetworks(currency)}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {currency.networks.length} 个网络
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">最小充值</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {currency.minDeposit} {currency.symbol}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">最小提现</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {currency.minWithdraw} {currency.symbol}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">提现手续费</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {currency.withdrawFee} {currency.symbol}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor={`deposit-${currency.id}`} className="text-sm">
                  充值功能
                </Label>
                <Switch
                  id={`deposit-${currency.id}`}
                  checked={currency.depositEnabled}
                  onCheckedChange={() => toggleDeposit(currency.id)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor={`withdraw-${currency.id}`} className="text-sm">
                  提现功能
                </Label>
                <Switch
                  id={`withdraw-${currency.id}`}
                  checked={currency.withdrawEnabled}
                  onCheckedChange={() => toggleWithdraw(currency.id)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCurrencies.length === 0 && (
        <div className="text-center py-16">
          <Activity className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">未找到币种</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">尝试调整搜索条件</p>
        </div>
      )}

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
                  className="w-full bg-custom-green hover:bg-green-600"
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
