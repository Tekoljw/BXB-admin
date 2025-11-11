'use client'

import { useState } from 'react'
import { Coins, Plus, Search, Settings, ChevronDown, ChevronUp } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// 币种类型定义
interface Chain {
  id: string
  name: string
  enabled: boolean
  depositEnabled: boolean
  withdrawEnabled: boolean
  minDeposit: string
  minWithdraw: string
  withdrawFee: string
  confirmations: number
}

interface Currency {
  id: string
  symbol: string
  name: string
  icon: string
  enabled: boolean
  depositEnabled: boolean
  withdrawEnabled: boolean
  chains: Chain[]
  totalBalance: string
  totalAddresses: number
}

export default function CurrencyManagementPage() {
  // 示例数据（实际使用时从API获取）
  const [currencies, setCurrencies] = useState<Currency[]>([
    {
      id: '1',
      symbol: 'USDT',
      name: 'Tether',
      icon: '₮',
      enabled: true,
      depositEnabled: true,
      withdrawEnabled: true,
      totalBalance: '1,234,567.89',
      totalAddresses: 3456,
      chains: [
        {
          id: '1-1',
          name: 'TRC20',
          enabled: true,
          depositEnabled: true,
          withdrawEnabled: true,
          minDeposit: '10 USDT',
          minWithdraw: '20 USDT',
          withdrawFee: '1 USDT',
          confirmations: 19,
        },
        {
          id: '1-2',
          name: 'ERC20',
          enabled: true,
          depositEnabled: true,
          withdrawEnabled: false,
          minDeposit: '10 USDT',
          minWithdraw: '50 USDT',
          withdrawFee: '5 USDT',
          confirmations: 12,
        },
        {
          id: '1-3',
          name: 'BSC',
          enabled: true,
          depositEnabled: true,
          withdrawEnabled: true,
          minDeposit: '10 USDT',
          minWithdraw: '30 USDT',
          withdrawFee: '2 USDT',
          confirmations: 15,
        },
      ],
    },
    {
      id: '2',
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: '₿',
      enabled: true,
      depositEnabled: true,
      withdrawEnabled: true,
      totalBalance: '45.67890123',
      totalAddresses: 1234,
      chains: [
        {
          id: '2-1',
          name: 'Bitcoin',
          enabled: true,
          depositEnabled: true,
          withdrawEnabled: true,
          minDeposit: '0.0001 BTC',
          minWithdraw: '0.001 BTC',
          withdrawFee: '0.0005 BTC',
          confirmations: 3,
        },
      ],
    },
    {
      id: '3',
      symbol: 'ETH',
      name: 'Ethereum',
      icon: 'Ξ',
      enabled: true,
      depositEnabled: true,
      withdrawEnabled: true,
      totalBalance: '234.567890',
      totalAddresses: 2345,
      chains: [
        {
          id: '3-1',
          name: 'ERC20',
          enabled: true,
          depositEnabled: true,
          withdrawEnabled: true,
          minDeposit: '0.01 ETH',
          minWithdraw: '0.05 ETH',
          withdrawFee: '0.005 ETH',
          confirmations: 12,
        },
      ],
    },
    {
      id: '4',
      symbol: 'TRX',
      name: 'TRON',
      icon: '🔺',
      enabled: false,
      depositEnabled: false,
      withdrawEnabled: false,
      totalBalance: '0',
      totalAddresses: 0,
      chains: [
        {
          id: '4-1',
          name: 'TRC20',
          enabled: false,
          depositEnabled: false,
          withdrawEnabled: false,
          minDeposit: '10 TRX',
          minWithdraw: '100 TRX',
          withdrawFee: '10 TRX',
          confirmations: 19,
        },
      ],
    },
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [expandedCurrency, setExpandedCurrency] = useState<string | null>(null)

  // 过滤币种
  const filteredCurrencies = currencies.filter(currency => {
    const matchesSearch = currency.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         currency.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'enabled' && currency.enabled) ||
                         (filterStatus === 'disabled' && !currency.enabled)
    return matchesSearch && matchesStatus
  })

  // 切换币种展开/收起
  const toggleExpand = (currencyId: string) => {
    setExpandedCurrency(expandedCurrency === currencyId ? null : currencyId)
  }

  // 切换币种启用/禁用
  const toggleCurrencyStatus = (currencyId: string) => {
    setCurrencies(prev =>
      prev.map(currency =>
        currency.id === currencyId
          ? { ...currency, enabled: !currency.enabled }
          : currency
      )
    )
  }

  // 切换链启用/禁用
  const toggleChainStatus = (currencyId: string, chainId: string) => {
    setCurrencies(prev =>
      prev.map(currency =>
        currency.id === currencyId
          ? {
              ...currency,
              chains: currency.chains.map(chain =>
                chain.id === chainId
                  ? { ...chain, enabled: !chain.enabled }
                  : chain
              ),
            }
          : currency
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">币种管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理平台支持的加密货币和链网络配置
          </p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-custom-green hover:bg-custom-green-dark text-white">
              <Plus className="w-4 h-4 mr-2" />
              添加币种
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>添加币种</SheetTitle>
              <SheetDescription>
                配置新的加密货币和支持的链网络
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>币种符号</Label>
                  <Input placeholder="如: BTC, ETH, USDT" className="mt-2" />
                </div>
                <div>
                  <Label>币种全称</Label>
                  <Input placeholder="如: Bitcoin, Ethereum" className="mt-2" />
                </div>
                <div>
                  <Label>币种图标URL</Label>
                  <Input placeholder="图标地址或emoji" className="mt-2" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>启用币种</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>开放充值</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>开放提币</Label>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-sm font-semibold mb-4">支持的链网络</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg space-y-4">
                    <div>
                      <Label>链名称</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="选择链" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TRC20">TRC20 (Tron)</SelectItem>
                          <SelectItem value="ERC20">ERC20 (Ethereum)</SelectItem>
                          <SelectItem value="BSC">BSC (BNB Chain)</SelectItem>
                          <SelectItem value="Polygon">Polygon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>最小充值</Label>
                        <Input type="number" placeholder="0" className="mt-2" />
                      </div>
                      <div>
                        <Label>最小提币</Label>
                        <Input type="number" placeholder="0" className="mt-2" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>提币手续费</Label>
                        <Input type="number" placeholder="0" className="mt-2" />
                      </div>
                      <div>
                        <Label>确认数</Label>
                        <Input type="number" placeholder="12" className="mt-2" />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <Label className="text-sm">启用充值</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <Label className="text-sm">启用提币</Label>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    添加链
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white">
                  保存
                </Button>
                <Button variant="outline" className="flex-1">
                  取消
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索币种符号、名称..."
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
            <SelectItem value="enabled">已启用</SelectItem>
            <SelectItem value="disabled">已停用</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 币种列表 */}
      {filteredCurrencies.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredCurrencies.map((currency) => (
            <div
              key={currency.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* 币种主信息 */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-custom-green to-custom-green-dark flex items-center justify-center text-2xl">
                      {currency.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {currency.symbol}
                        </h3>
                        {currency.enabled ? (
                          <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                            启用
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded-full">
                            停用
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {currency.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch 
                      checked={currency.enabled} 
                      onCheckedChange={() => toggleCurrencyStatus(currency.id)}
                    />
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">支持链数</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      {currency.chains.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">总余额</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      {currency.totalBalance}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">总地址数</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                      {currency.totalAddresses}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">充值</p>
                      <p className={`text-sm font-semibold mt-1 ${currency.depositEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                        {currency.depositEnabled ? '开放' : '关闭'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">提币</p>
                      <p className={`text-sm font-semibold mt-1 ${currency.withdrawEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                        {currency.withdrawEnabled ? '开放' : '关闭'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 展开/收起按钮 */}
                <button
                  onClick={() => toggleExpand(currency.id)}
                  className="flex items-center gap-2 text-sm text-custom-green hover:text-custom-green-dark mt-4 transition-colors"
                >
                  {expandedCurrency === currency.id ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      收起链配置
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      查看链配置
                    </>
                  )}
                </button>
              </div>

              {/* 链网络详情（展开时显示） */}
              {expandedCurrency === currency.id && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900/50">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    链网络配置
                  </h4>
                  <div className="space-y-3">
                    {currency.chains.map((chain) => (
                      <div
                        key={chain.id}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {chain.name}
                            </h5>
                            {chain.enabled ? (
                              <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                                启用
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded-full">
                                停用
                              </span>
                            )}
                          </div>
                          <Switch 
                            checked={chain.enabled} 
                            onCheckedChange={() => toggleChainStatus(currency.id, chain.id)}
                          />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">最小充值：</span>
                            <span className="font-medium text-gray-900 dark:text-white ml-1">{chain.minDeposit}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">最小提币：</span>
                            <span className="font-medium text-gray-900 dark:text-white ml-1">{chain.minWithdraw}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">手续费：</span>
                            <span className="font-medium text-gray-900 dark:text-white ml-1">{chain.withdrawFee}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">确认数：</span>
                            <span className="font-medium text-gray-900 dark:text-white ml-1">{chain.confirmations}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">充值状态：</span>
                            <span className={`font-medium ml-1 ${chain.depositEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                              {chain.depositEnabled ? '开放' : '关闭'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">提币状态：</span>
                            <span className={`font-medium ml-1 ${chain.withdrawEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                              {chain.withdrawEnabled ? '开放' : '关闭'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Coins className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">暂无币种配置</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">请点击"添加币种"按钮添加平台支持的加密货币</p>
        </div>
      )}
    </div>
  )
}
