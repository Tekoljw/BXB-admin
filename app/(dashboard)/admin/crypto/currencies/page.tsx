"use client"

import React, { useState, useMemo, useRef } from "react"
import { Search, Plus, Settings, Activity, TrendingUp, Network, Upload, X, Edit2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
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
  minWithdraw: string
  withdrawFee: string
  maxWithdrawFee: string
  depositEnabled: boolean
  withdrawEnabled: boolean
  visible: boolean
  precision: number
  sort: number
  logoUrl?: string
}

export default function DepositWithdrawalCurrenciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState<CryptoCurrency | null>(null)
  const [showConfigSheet, setShowConfigSheet] = useState(false)
  const [showNetworksDialog, setShowNetworksDialog] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingConfig, setEditingConfig] = useState<Partial<CryptoCurrency>>({})
  const [categoryTab, setCategoryTab] = useState("all")
  const [networkTab, setNetworkTab] = useState("all")
  const logoInputRef = useRef<HTMLInputElement>(null)
  const [editingMinWithdraw, setEditingMinWithdraw] = useState<string | null>(null)
  const [editingWithdrawFee, setEditingWithdrawFee] = useState<string | null>(null)
  const [tempMinWithdraw, setTempMinWithdraw] = useState("")
  const [tempWithdrawFee, setTempWithdrawFee] = useState("")
  const [newCurrency, setNewCurrency] = useState<Partial<CryptoCurrency>>({
    name: "",
    symbol: "",
    icon: "",
    category: "stablecoin",
    networks: [],
    minWithdraw: "",
    withdrawFee: "",
    maxWithdrawFee: "",
    depositEnabled: true,
    withdrawEnabled: true,
    visible: true,
    precision: 6,
    sort: 0
  })

  // 示例币种数据
  const [currencies, setCurrencies] = useState<CryptoCurrency[]>([
    {
      id: '1',
      name: 'Tether',
      symbol: 'USDT',
      icon: '₮',
      category: 'stablecoin',
      networks: ['TRC20', 'ERC20', 'BSC', 'Polygon'],
      minWithdraw: '20.00',
      withdrawFee: '1.00',
      maxWithdrawFee: '50.00',
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
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
      minWithdraw: '0.001',
      withdrawFee: '0.0005',
      maxWithdrawFee: '0.01',
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
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
      minWithdraw: '0.02',
      withdrawFee: '0.005',
      maxWithdrawFee: '0.05',
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
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
      minWithdraw: '0.02',
      withdrawFee: '0.001',
      maxWithdrawFee: '0.01',
      depositEnabled: true,
      withdrawEnabled: false,
      visible: true,
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
      minWithdraw: '20.00',
      withdrawFee: '1.00',
      maxWithdrawFee: '50.00',
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
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
      minWithdraw: '0.2',
      withdrawFee: '0.01',
      maxWithdrawFee: '0.1',
      depositEnabled: false,
      withdrawEnabled: false,
      visible: false,
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
      minWithdraw: '20',
      withdrawFee: '5',
      maxWithdrawFee: '50',
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
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
      minWithdraw: '2000000',
      withdrawFee: '500000',
      maxWithdrawFee: '5000000',
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
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

  const toggleVisible = (id: string) => {
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === id) {
        const newStatus = !currency.visible
        toast.success(newStatus ? "显示已启用" : "显示已禁用", {
          description: `${currency.symbol} 已${newStatus ? '显示' : '隐藏'}`,
        })
        return { ...currency, visible: newStatus }
      }
      return currency
    }))
  }

  const updateSort = (id: string, newSort: number) => {
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === id) {
        toast.success("排序已更新", {
          description: `${currency.symbol} 排序已更新为 ${newSort}`,
        })
        return { ...currency, sort: newSort }
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error("文件过大", { description: "图片大小不能超过2MB" })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setEditingConfig({ ...editingConfig, logoUrl: result })
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveLogo = () => {
    setEditingConfig({ ...editingConfig, logoUrl: undefined })
  }

  const handleInlineLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, currencyId: string) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error("文件过大", { description: "图片大小不能超过2MB" })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setCurrencies(prev => prev.map(currency => {
        if (currency.id === currencyId) {
          toast.success("LOGO已更新")
          return { ...currency, logoUrl: result }
        }
        return currency
      }))
    }
    reader.readAsDataURL(file)
    
    // 重置input值以便重复上传同一文件
    e.target.value = ''
  }

  const saveMinWithdraw = (id: string) => {
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === id) {
        toast.success("最小提现已更新", {
          description: `${currency.symbol} 最小提现金额已更新为 ${tempMinWithdraw}`,
        })
        return { ...currency, minWithdraw: tempMinWithdraw }
      }
      return currency
    }))
    setEditingMinWithdraw(null)
  }

  const saveWithdrawFee = (id: string) => {
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === id) {
        toast.success("提现手续费已更新", {
          description: `${currency.symbol} 提现手续费已更新为 ${tempWithdrawFee}`,
        })
        return { ...currency, withdrawFee: tempWithdrawFee }
      }
      return currency
    }))
    setEditingWithdrawFee(null)
  }

  const handleAddCurrency = () => {
    if (!newCurrency.name || !newCurrency.symbol) {
      toast.error("请填写完整信息", { description: "币种名称和代码为必填项" })
      return
    }

    const currency: CryptoCurrency = {
      id: `${Date.now()}`,
      name: newCurrency.name!,
      symbol: newCurrency.symbol!,
      icon: newCurrency.icon || newCurrency.symbol![0],
      category: newCurrency.category!,
      networks: newCurrency.networks || [],
      minWithdraw: newCurrency.minWithdraw || "0",
      withdrawFee: newCurrency.withdrawFee || "0",
      maxWithdrawFee: newCurrency.maxWithdrawFee || "0",
      depositEnabled: newCurrency.depositEnabled ?? true,
      withdrawEnabled: newCurrency.withdrawEnabled ?? true,
      visible: newCurrency.visible ?? true,
      precision: newCurrency.precision || 6,
      sort: newCurrency.sort || currencies.length + 1,
      logoUrl: newCurrency.logoUrl
    }

    setCurrencies([...currencies, currency])
    setNewCurrency({
      name: "",
      symbol: "",
      icon: "",
      category: "stablecoin",
      networks: [],
      minWithdraw: "",
      withdrawFee: "",
      maxWithdrawFee: "",
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 6,
      sort: 0
    })
    setShowAddDialog(false)
    toast.success("币种已添加", { description: `${currency.symbol} 已成功添加` })
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
        <Button 
          className="bg-custom-green hover:bg-custom-green-dark text-white"
          onClick={() => setShowAddDialog(true)}
        >
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
                  显示
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  排序
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
                      <div 
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-80 transition-opacity relative group"
                        onClick={() => {
                          const input = document.getElementById(`logo-input-${currency.id}`) as HTMLInputElement
                          input?.click()
                        }}
                      >
                        {currency.logoUrl ? (
                          <img src={currency.logoUrl} alt={currency.symbol} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          currency.icon
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all">
                          <Upload className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <input
                        id={`logo-input-${currency.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleInlineLogoUpload(e, currency.id)}
                        className="hidden"
                      />
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
                    {editingMinWithdraw === currency.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          type="text"
                          value={tempMinWithdraw}
                          onChange={(e) => setTempMinWithdraw(e.target.value)}
                          className="w-24 h-7 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveMinWithdraw(currency.id)
                            if (e.key === 'Escape') setEditingMinWithdraw(null)
                          }}
                          autoFocus
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => saveMinWithdraw(currency.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                          onClick={() => setEditingMinWithdraw(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 inline-flex items-center gap-1"
                        onClick={() => {
                          setEditingMinWithdraw(currency.id)
                          setTempMinWithdraw(currency.minWithdraw)
                        }}
                      >
                        <span className="text-gray-900 dark:text-white font-medium">
                          {currency.minWithdraw}
                        </span>
                        <Edit2 className="h-3 w-3 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingWithdrawFee === currency.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          type="text"
                          value={tempWithdrawFee}
                          onChange={(e) => setTempWithdrawFee(e.target.value)}
                          className="w-24 h-7 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveWithdrawFee(currency.id)
                            if (e.key === 'Escape') setEditingWithdrawFee(null)
                          }}
                          autoFocus
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => saveWithdrawFee(currency.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                          onClick={() => setEditingWithdrawFee(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 inline-flex items-center gap-1"
                        onClick={() => {
                          setEditingWithdrawFee(currency.id)
                          setTempWithdrawFee(currency.withdrawFee)
                        }}
                      >
                        <span className="text-gray-900 dark:text-white font-medium">
                          {currency.withdrawFee}
                        </span>
                        <Edit2 className="h-3 w-3 text-gray-400" />
                      </div>
                    )}
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
                    <Switch
                      checked={currency.visible}
                      onCheckedChange={() => toggleVisible(currency.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Input
                      type="number"
                      value={currency.sort}
                      onChange={(e) => updateSort(currency.id, parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                      min="0"
                    />
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
                <Label>封顶提现手续费</Label>
                <Input 
                  value={editingConfig.maxWithdrawFee || ''} 
                  onChange={(e) => setEditingConfig({ ...editingConfig, maxWithdrawFee: e.target.value })}
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

              <div>
                <Label>LOGO上传</Label>
                <div className="mt-2 space-y-2">
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  {editingConfig.logoUrl ? (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <img 
                        src={editingConfig.logoUrl} 
                        alt="Logo预览" 
                        className="w-12 h-12 object-contain rounded"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">已上传LOGO</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={handleRemoveLogo}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      上传LOGO
                    </Button>
                  )}
                  <p className="text-xs text-gray-500">支持JPG、PNG格式，最大2MB</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>充值开关</Label>
                <Switch
                  checked={editingConfig.depositEnabled || false}
                  onCheckedChange={(checked) => setEditingConfig({ ...editingConfig, depositEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>提币开关</Label>
                <Switch
                  checked={editingConfig.withdrawEnabled || false}
                  onCheckedChange={(checked) => setEditingConfig({ ...editingConfig, withdrawEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>显示开关</Label>
                <Switch
                  checked={editingConfig.visible || false}
                  onCheckedChange={(checked) => setEditingConfig({ ...editingConfig, visible: checked })}
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

      {/* 添加币种Sheet */}
      <Sheet open={showAddDialog} onOpenChange={setShowAddDialog}>
        <SheetContent className="w-full sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>添加币种</SheetTitle>
            <SheetDescription>
              添加新的加密货币币种
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 py-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>币种名称 *</Label>
                <Input 
                  value={newCurrency.name || ''} 
                  onChange={(e) => setNewCurrency({ ...newCurrency, name: e.target.value })}
                  placeholder="例如：Bitcoin"
                  className="mt-2" 
                />
              </div>

              <div>
                <Label>币种代码 *</Label>
                <Input 
                  value={newCurrency.symbol || ''} 
                  onChange={(e) => setNewCurrency({ ...newCurrency, symbol: e.target.value })}
                  placeholder="例如：BTC"
                  className="mt-2" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>分类</Label>
                <Select 
                  value={newCurrency.category} 
                  onValueChange={(value: CurrencyCategory) => setNewCurrency({ ...newCurrency, category: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stablecoin">稳定币</SelectItem>
                    <SelectItem value="mainstream">主流币</SelectItem>
                    <SelectItem value="meme">MEME币</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>精度</Label>
                <Input 
                  type="number" 
                  value={newCurrency.precision || 0} 
                  onChange={(e) => setNewCurrency({ ...newCurrency, precision: parseInt(e.target.value) || 0 })}
                  className="mt-2" 
                  min="0"
                  max="18"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>最小提现</Label>
                <Input 
                  value={newCurrency.minWithdraw || ''} 
                  onChange={(e) => setNewCurrency({ ...newCurrency, minWithdraw: e.target.value })}
                  placeholder="0.01"
                  className="mt-2" 
                />
              </div>

              <div>
                <Label>提现手续费</Label>
                <Input 
                  value={newCurrency.withdrawFee || ''} 
                  onChange={(e) => setNewCurrency({ ...newCurrency, withdrawFee: e.target.value })}
                  placeholder="0.0005"
                  className="mt-2" 
                />
              </div>

              <div>
                <Label>封顶手续费</Label>
                <Input 
                  value={newCurrency.maxWithdrawFee || ''} 
                  onChange={(e) => setNewCurrency({ ...newCurrency, maxWithdrawFee: e.target.value })}
                  placeholder="0.01"
                  className="mt-2" 
                />
              </div>
            </div>

            <div>
              <Label>排序</Label>
              <Input 
                type="number" 
                value={newCurrency.sort || 0} 
                onChange={(e) => setNewCurrency({ ...newCurrency, sort: parseInt(e.target.value) || 0 })}
                className="mt-2" 
                min="0"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Label>充值</Label>
                <Switch
                  checked={newCurrency.depositEnabled || false}
                  onCheckedChange={(checked) => setNewCurrency({ ...newCurrency, depositEnabled: checked })}
                />
              </div>

              <div className="flex items-center gap-2">
                <Label>提现</Label>
                <Switch
                  checked={newCurrency.withdrawEnabled || false}
                  onCheckedChange={(checked) => setNewCurrency({ ...newCurrency, withdrawEnabled: checked })}
                />
              </div>

              <div className="flex items-center gap-2">
                <Label>显示</Label>
                <Switch
                  checked={newCurrency.visible || false}
                  onCheckedChange={(checked) => setNewCurrency({ ...newCurrency, visible: checked })}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white"
                onClick={handleAddCurrency}
              >
                <Plus className="w-4 h-4 mr-2" />
                添加
              </Button>
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => setShowAddDialog(false)}
              >
                取消
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
