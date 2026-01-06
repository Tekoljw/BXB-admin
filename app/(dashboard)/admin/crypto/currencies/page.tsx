"use client"

import React, { useState, useMemo, useRef } from "react"
import { Plus, Settings, Activity, TrendingUp, Network, Upload, X, Edit2, Check, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTotal } from "@/components/data-total"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
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

type CurrencyCategory = "stablecoin" | "mainstream" | "meme" | "other"
type CurrencySector = "defi" | "gamefi" | "nft" | "layer1" | "layer2" | "meme" | "stablecoin" | "other"

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
  feePercentage: string
  gasEnabled: boolean
  depositEnabled: boolean
  withdrawEnabled: boolean
  visible: boolean
  precision: number
  sort: number
  logoUrl?: string
  listingName: string
  existsOnChain: boolean
  sector: CurrencySector
  transferEnabled: boolean
}

const ALL_NETWORKS = ['TRC20', 'ERC20', 'BSC', 'Polygon', 'Solana', 'Bitcoin', 'Ethereum', 'Arbitrum', 'Optimism', 'Dogecoin', 'Ripple']

export default function DepositWithdrawalCurrenciesPage() {
  const { searchInput, setSearchInput, searchTerm } = useDeferredSearch()
  const [selectedCurrency, setSelectedCurrency] = useState<CryptoCurrency | null>(null)
  const [showConfigSheet, setShowConfigSheet] = useState(false)
  const [showNetworksDialog, setShowNetworksDialog] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showFeeDialog, setShowFeeDialog] = useState(false)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [showNetworkManagementSheet, setShowNetworkManagementSheet] = useState(false)
  
  const [globalNetworks, setGlobalNetworks] = useState([
    { id: 'trc20', name: 'TRC20', fullName: 'Tron Network', enabled: true },
    { id: 'erc20', name: 'ERC20', fullName: 'Ethereum Network', enabled: true },
    { id: 'bsc', name: 'BSC', fullName: 'BNB Smart Chain', enabled: true },
    { id: 'polygon', name: 'Polygon', fullName: 'Polygon Network', enabled: true },
    { id: 'solana', name: 'Solana', fullName: 'Solana Network', enabled: true },
    { id: 'bitcoin', name: 'Bitcoin', fullName: 'Bitcoin Network', enabled: true },
    { id: 'ethereum', name: 'Ethereum', fullName: 'Ethereum Mainnet', enabled: true },
    { id: 'arbitrum', name: 'Arbitrum', fullName: 'Arbitrum One', enabled: false },
    { id: 'optimism', name: 'Optimism', fullName: 'Optimism Network', enabled: false },
    { id: 'dogecoin', name: 'Dogecoin', fullName: 'Dogecoin Network', enabled: true },
    { id: 'ripple', name: 'Ripple', fullName: 'XRP Ledger', enabled: true },
  ])
  const [editingCategory, setEditingCategory] = useState<CurrencyCategory>('stablecoin')
  const [editingConfig, setEditingConfig] = useState<Partial<CryptoCurrency>>({})
  const [categoryTab, setCategoryTab] = useState("all")
  const [networkTab, setNetworkTab] = useState("all")
  const logoInputRef = useRef<HTMLInputElement>(null)
  const [editingMinWithdraw, setEditingMinWithdraw] = useState<string | null>(null)
  const [tempMinWithdraw, setTempMinWithdraw] = useState("")
  const [editingPrecision, setEditingPrecision] = useState<string | null>(null)
  const [tempPrecision, setTempPrecision] = useState("")
  const [editingWeight, setEditingWeight] = useState<string | null>(null)
  const [tempWeight, setTempWeight] = useState("")
  const [editingNetworks, setEditingNetworks] = useState<string[]>([])
  const [editingFee, setEditingFee] = useState({
    minFee: "",
    maxFee: "",
    feePercentage: "",
    gasEnabled: false
  })
  const [newCurrency, setNewCurrency] = useState<Partial<CryptoCurrency>>({
    name: "",
    symbol: "",
    icon: "",
    category: "stablecoin",
    networks: [],
    minWithdraw: "",
    withdrawFee: "",
    maxWithdrawFee: "",
    feePercentage: "0",
    gasEnabled: false,
    depositEnabled: true,
    withdrawEnabled: true,
    visible: true,
    precision: 6,
    sort: 0,
    listingName: "",
    existsOnChain: true,
    sector: "other",
    transferEnabled: true
  })

  // 获取分类的中文显示名称
  const getCategoryLabel = (category: CurrencyCategory): string => {
    const labels = {
      stablecoin: "稳定币",
      mainstream: "主流币",
      meme: "MEME币",
      other: "其他"
    }
    return labels[category]
  }

  // 获取分类标签的颜色
  const getCategoryColor = (category: CurrencyCategory): string => {
    const colors = {
      stablecoin: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      mainstream: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      meme: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
    return colors[category]
  }

  // 获取板块的中文显示名称
  const getSectorLabel = (sector: CurrencySector): string => {
    const labels: Record<CurrencySector, string> = {
      defi: "DeFi",
      gamefi: "GameFi",
      nft: "NFT",
      layer1: "Layer1",
      layer2: "Layer2",
      meme: "Meme",
      stablecoin: "稳定币",
      other: "其他"
    }
    return labels[sector]
  }

  // 获取板块标签的颜色
  const getSectorColor = (sector: CurrencySector): string => {
    const colors: Record<CurrencySector, string> = {
      defi: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      gamefi: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      nft: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
      layer1: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      layer2: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
      meme: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      stablecoin: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
    return colors[sector]
  }

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
      feePercentage: '0.1',
      gasEnabled: true,
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 6,
      sort: 100,
      listingName: 'Tether USD',
      existsOnChain: true,
      sector: 'stablecoin',
      transferEnabled: true,
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
      feePercentage: '0.05',
      gasEnabled: true,
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 8,
      sort: 99,
      listingName: 'Bitcoin Core',
      existsOnChain: true,
      sector: 'layer1',
      transferEnabled: true,
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
      feePercentage: '0.1',
      gasEnabled: true,
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 8,
      sort: 98,
      listingName: 'Ethereum Mainnet',
      existsOnChain: true,
      sector: 'layer1',
      transferEnabled: true,
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
      feePercentage: '0.08',
      gasEnabled: false,
      depositEnabled: true,
      withdrawEnabled: false,
      visible: true,
      precision: 8,
      sort: 95,
      listingName: 'BNB Chain Token',
      existsOnChain: true,
      sector: 'layer1',
      transferEnabled: true,
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
      feePercentage: '0.1',
      gasEnabled: true,
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 6,
      sort: 97,
      listingName: 'USD Coin by Circle',
      existsOnChain: true,
      sector: 'stablecoin',
      transferEnabled: true,
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
      feePercentage: '0.05',
      gasEnabled: false,
      depositEnabled: false,
      withdrawEnabled: false,
      visible: false,
      precision: 8,
      sort: 90,
      listingName: 'Solana Mainnet',
      existsOnChain: true,
      sector: 'layer1',
      transferEnabled: false,
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
      feePercentage: '0.2',
      gasEnabled: false,
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 8,
      sort: 80,
      listingName: 'Dogecoin Original',
      existsOnChain: true,
      sector: 'meme',
      transferEnabled: true,
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
      feePercentage: '0.15',
      gasEnabled: true,
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 0,
      sort: 75,
      listingName: 'Shiba Inu Token',
      existsOnChain: true,
      sector: 'meme',
      transferEnabled: true,
    },
    {
      id: '9',
      name: 'Ripple',
      symbol: 'XRP',
      icon: 'X',
      category: 'other',
      networks: ['Ripple'],
      minWithdraw: '20',
      withdrawFee: '0.5',
      maxWithdrawFee: '5',
      feePercentage: '0.1',
      gasEnabled: false,
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 6,
      sort: 85,
      listingName: 'XRP Ledger',
      existsOnChain: true,
      sector: 'layer1',
      transferEnabled: true,
    },
    {
      id: '10',
      name: 'Uniswap',
      symbol: 'UNI',
      icon: 'U',
      category: 'other',
      networks: ['ERC20'],
      minWithdraw: '1',
      withdrawFee: '0.1',
      maxWithdrawFee: '5',
      feePercentage: '0.1',
      gasEnabled: true,
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 8,
      sort: 70,
      listingName: 'Uniswap Protocol',
      existsOnChain: true,
      sector: 'defi',
      transferEnabled: true,
    },
    {
      id: '11',
      name: 'Axie Infinity',
      symbol: 'AXS',
      icon: 'A',
      category: 'other',
      networks: ['ERC20'],
      minWithdraw: '0.5',
      withdrawFee: '0.05',
      maxWithdrawFee: '2',
      feePercentage: '0.1',
      gasEnabled: true,
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 8,
      sort: 65,
      listingName: 'Axie Infinity Shards',
      existsOnChain: true,
      sector: 'gamefi',
      transferEnabled: false,
    },
    {
      id: '12',
      name: 'Arbitrum',
      symbol: 'ARB',
      icon: 'A',
      category: 'other',
      networks: ['Arbitrum'],
      minWithdraw: '5',
      withdrawFee: '0.5',
      maxWithdrawFee: '10',
      feePercentage: '0.1',
      gasEnabled: false,
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 8,
      sort: 60,
      listingName: 'Arbitrum One Token',
      existsOnChain: true,
      sector: 'layer2',
      transferEnabled: true,
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
    setEditingNetworks([...currency.networks])
    setShowNetworksDialog(true)
  }

  const handleEditFee = (currency: CryptoCurrency) => {
    setSelectedCurrency(currency)
    setEditingFee({
      minFee: currency.withdrawFee,
      maxFee: currency.maxWithdrawFee,
      feePercentage: currency.feePercentage,
      gasEnabled: currency.gasEnabled
    })
    setShowFeeDialog(true)
  }

  const handleSaveFee = () => {
    if (!selectedCurrency) return
    
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === selectedCurrency.id) {
        return {
          ...currency,
          withdrawFee: editingFee.minFee,
          maxWithdrawFee: editingFee.maxFee,
          feePercentage: editingFee.feePercentage,
          gasEnabled: editingFee.gasEnabled
        }
      }
      return currency
    }))
    
    toast.success("手续费配置已保存", {
      description: `${selectedCurrency.symbol} 的手续费配置已成功更新`,
    })
    setShowFeeDialog(false)
  }

  const handleSaveNetworks = () => {
    if (!selectedCurrency) return
    
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === selectedCurrency.id) {
        return { ...currency, networks: editingNetworks }
      }
      return currency
    }))
    
    toast.success("网络配置已保存", {
      description: `${selectedCurrency.symbol} 的支持网络已成功更新`,
    })
    setShowNetworksDialog(false)
  }

  const toggleNetwork = (network: string) => {
    setEditingNetworks(prev => {
      if (prev.includes(network)) {
        return prev.filter(n => n !== network)
      } else {
        return [...prev, network]
      }
    })
  }

  const handleEditCategory = (currency: CryptoCurrency) => {
    setSelectedCurrency(currency)
    setEditingCategory(currency.category)
    setShowCategoryDialog(true)
  }

  const handleSaveCategory = () => {
    if (!selectedCurrency) return
    
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === selectedCurrency.id) {
        return { ...currency, category: editingCategory }
      }
      return currency
    }))
    
    toast.success("分类已更新", {
      description: `${selectedCurrency.symbol} 的分类已更新为${getCategoryLabel(editingCategory)}`,
    })
    setShowCategoryDialog(false)
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

  const savePrecision = (id: string) => {
    const precision = parseInt(tempPrecision)
    if (isNaN(precision) || precision < 0) {
      setEditingPrecision(null)
      return
    }
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === id) {
        toast.success("精度已更新", {
          description: `${currency.symbol} 精度已更新为 ${precision}`,
        })
        return { ...currency, precision }
      }
      return currency
    }))
    setEditingPrecision(null)
  }

  const saveWeight = (id: string) => {
    const weight = parseInt(tempWeight)
    if (isNaN(weight) || weight < 0) {
      setEditingWeight(null)
      return
    }
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === id) {
        toast.success("展示权重已更新", {
          description: `${currency.symbol} 展示权重已更新为 ${weight}`,
        })
        return { ...currency, sort: weight }
      }
      return currency
    }))
    setEditingWeight(null)
  }

  const toggleTransfer = (id: string) => {
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === id) {
        const newStatus = !currency.transferEnabled
        toast.success(newStatus ? "划转已开启" : "划转已关闭", {
          description: `${currency.symbol} 划转功能已${newStatus ? '开启' : '关闭'}`,
        })
        return { ...currency, transferEnabled: newStatus }
      }
      return currency
    }))
  }

  const handleSectorChange = (id: string, sector: CurrencySector) => {
    setCurrencies(prev => prev.map(currency => {
      if (currency.id === id) {
        toast.success("所属板块已更新", {
          description: `${currency.symbol} 板块已更新为 ${getSectorLabel(sector)}`,
        })
        return { ...currency, sector }
      }
      return currency
    }))
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
      feePercentage: newCurrency.feePercentage || "0",
      gasEnabled: newCurrency.gasEnabled ?? false,
      depositEnabled: newCurrency.depositEnabled ?? true,
      withdrawEnabled: newCurrency.withdrawEnabled ?? true,
      visible: newCurrency.visible ?? true,
      precision: newCurrency.precision || 6,
      sort: newCurrency.sort || currencies.length + 1,
      logoUrl: newCurrency.logoUrl,
      listingName: newCurrency.listingName || newCurrency.name!,
      existsOnChain: newCurrency.existsOnChain ?? true,
      sector: newCurrency.sector || "other",
      transferEnabled: newCurrency.transferEnabled ?? true
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
      feePercentage: "0",
      gasEnabled: false,
      depositEnabled: true,
      withdrawEnabled: true,
      visible: true,
      precision: 6,
      sort: 0
    })
    setShowAddDialog(false)
    toast.success("币种已添加", { description: `${currency.symbol} 已成功添加` })
  }

  const toggleGlobalNetwork = (networkId: string) => {
    setGlobalNetworks(prev => prev.map(network => {
      if (network.id === networkId) {
        const newStatus = !network.enabled
        toast.success(newStatus ? "网络已启用" : "网络已禁用", {
          description: `${network.name} 已${newStatus ? '启用' : '禁用'}`,
        })
        return { ...network, enabled: newStatus }
      }
      return network
    }))
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
        <div className="flex items-center gap-3">
          <span className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Activity className="w-4 h-4" />
            币种列表从供应商接口配置读取
          </span>
          <Button 
            variant="outline"
            onClick={() => setShowNetworkManagementSheet(true)}
          >
            <Network className="w-4 h-4 mr-2" />
            网络管理
          </Button>
        </div>
      </div>

      {/* 两级页签过滤 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
        {/* 一级页签：网络类型 */}
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
        
        {/* 二级页签：币种分类（与搜索框同一行） */}
        <div className="flex flex-wrap items-center gap-4">
          <Tabs value={categoryTab} onValueChange={handleCategoryChange}>
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="stablecoin">稳定币</TabsTrigger>
              <TabsTrigger value="mainstream">主流币</TabsTrigger>
              <TabsTrigger value="meme">MEME币</TabsTrigger>
              <TabsTrigger value="other">其他</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2 ml-auto flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索币种名称或代码..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              搜索
            </Button>
          </div>
        </div>
      </div>

      {/* 币种列表表格 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  币种ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  币种
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  收录名称
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  分类
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  精度
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  展示权重
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  链上存在
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  所属板块
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  支持网络
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  充值
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  提现
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  划转
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  显示
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCurrencies.map((currency) => (
                <tr 
                  key={currency.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {currency.id}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:opacity-80 transition-opacity relative group"
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
                          <Upload className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {currency.symbol}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {currency.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {currency.listingName}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      onClick={() => handleEditCategory(currency)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity group ${getCategoryColor(currency.category)}`}
                    >
                      {getCategoryLabel(currency.category)}
                      <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {editingPrecision === currency.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={tempPrecision}
                          onChange={(e) => setTempPrecision(e.target.value)}
                          className="w-16 h-7 text-sm text-center"
                          min="0"
                          max="18"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') savePrecision(currency.id)
                            if (e.key === 'Escape') setEditingPrecision(null)
                          }}
                          autoFocus
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => savePrecision(currency.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                          onClick={() => setEditingPrecision(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 inline-flex items-center gap-1"
                        onClick={() => {
                          setEditingPrecision(currency.id)
                          setTempPrecision(String(currency.precision))
                        }}
                      >
                        <span className="text-gray-900 dark:text-white font-medium text-sm">
                          {currency.precision}
                        </span>
                        <Edit2 className="h-3 w-3 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {editingWeight === currency.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={tempWeight}
                          onChange={(e) => setTempWeight(e.target.value)}
                          className="w-16 h-7 text-sm text-center"
                          min="0"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveWeight(currency.id)
                            if (e.key === 'Escape') setEditingWeight(null)
                          }}
                          autoFocus
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => saveWeight(currency.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                          onClick={() => setEditingWeight(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 inline-flex items-center gap-1"
                        onClick={() => {
                          setEditingWeight(currency.id)
                          setTempWeight(String(currency.sort))
                        }}
                      >
                        <span className="text-gray-900 dark:text-white font-medium text-sm">
                          {currency.sort}
                        </span>
                        <Edit2 className="h-3 w-3 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {currency.existsOnChain ? (
                      <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-xs">
                        <Check className="h-3 w-3" /> 是
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-400 text-xs">
                        <X className="h-3 w-3" /> 否
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Select
                      value={currency.sector}
                      onValueChange={(value) => handleSectorChange(currency.id, value as CurrencySector)}
                    >
                      <SelectTrigger className="w-24 h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="defi">DeFi</SelectItem>
                        <SelectItem value="gamefi">GameFi</SelectItem>
                        <SelectItem value="nft">NFT</SelectItem>
                        <SelectItem value="layer1">Layer1</SelectItem>
                        <SelectItem value="layer2">Layer2</SelectItem>
                        <SelectItem value="meme">Meme</SelectItem>
                        <SelectItem value="stablecoin">稳定币</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      onClick={() => handleViewNetworks(currency)}
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      <Network className="w-3 h-3" />
                      {currency.networks.length}个
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Switch
                      checked={currency.depositEnabled}
                      onCheckedChange={() => toggleDeposit(currency.id)}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Switch
                      checked={currency.withdrawEnabled}
                      onCheckedChange={() => toggleWithdraw(currency.id)}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Switch
                      checked={currency.transferEnabled}
                      onCheckedChange={() => toggleTransfer(currency.id)}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Switch
                      checked={currency.visible}
                      onCheckedChange={() => toggleVisible(currency.id)}
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

        {filteredCurrencies.length > 0 && (
          <DataTotal total={filteredCurrencies.length} />
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
                <Label>分类</Label>
                <Select 
                  value={editingConfig.category || 'stablecoin'} 
                  onValueChange={(value) => setEditingConfig({ ...editingConfig, category: value as CurrencyCategory })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stablecoin">稳定币</SelectItem>
                    <SelectItem value="mainstream">主流币</SelectItem>
                    <SelectItem value="meme">MEME币</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>收录名称</Label>
                <Input 
                  value={editingConfig.listingName || ''} 
                  onChange={(e) => setEditingConfig({ ...editingConfig, listingName: e.target.value })}
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
                <Label>展示权重</Label>
                <Input 
                  type="number" 
                  value={editingConfig.sort || 0} 
                  onChange={(e) => setEditingConfig({ ...editingConfig, sort: parseInt(e.target.value) })}
                  className="mt-2" 
                />
              </div>

              <div>
                <Label>所属板块</Label>
                <Select 
                  value={editingConfig.sector || 'other'} 
                  onValueChange={(value) => setEditingConfig({ ...editingConfig, sector: value as CurrencySector })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defi">DeFi</SelectItem>
                    <SelectItem value="gamefi">GameFi</SelectItem>
                    <SelectItem value="nft">NFT</SelectItem>
                    <SelectItem value="layer1">Layer1</SelectItem>
                    <SelectItem value="layer2">Layer2</SelectItem>
                    <SelectItem value="meme">Meme</SelectItem>
                    <SelectItem value="stablecoin">稳定币</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label>划转开关</Label>
                <Switch
                  checked={editingConfig.transferEnabled || false}
                  onCheckedChange={(checked) => setEditingConfig({ ...editingConfig, transferEnabled: checked })}
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

      {/* 网络列表右侧滑出面板 */}
      <Sheet open={showNetworksDialog} onOpenChange={setShowNetworksDialog}>
        <SheetContent className="w-full sm:max-w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{selectedCurrency?.symbol} 支持的网络</SheetTitle>
            <SheetDescription>
              选择 {selectedCurrency?.name} 支持的区块链网络
            </SheetDescription>
          </SheetHeader>

          {selectedCurrency && (
            <div className="space-y-4 py-6">
              <div className="space-y-2">
                {ALL_NETWORKS.map((network) => (
                  <div
                    key={network}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Network className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-gray-900 dark:text-white">{network}</span>
                    </div>
                    <Switch
                      checked={editingNetworks.includes(network)}
                      onCheckedChange={() => toggleNetwork(network)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white"
                  onClick={handleSaveNetworks}
                >
                  保存
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowNetworksDialog(false)}
                >
                  取消
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* 提现手续费编辑对话框 */}
      <Dialog open={showFeeDialog} onOpenChange={setShowFeeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedCurrency?.symbol} 提现手续费配置</DialogTitle>
            <DialogDescription>
              配置 {selectedCurrency?.name} 的提现手续费参数
            </DialogDescription>
          </DialogHeader>

          {selectedCurrency && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>单笔最低手续费</Label>
                  <Input
                    value={editingFee.minFee}
                    onChange={(e) => setEditingFee({ ...editingFee, minFee: e.target.value })}
                    placeholder="0.001"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>单笔最高手续费</Label>
                  <Input
                    value={editingFee.maxFee}
                    onChange={(e) => setEditingFee({ ...editingFee, maxFee: e.target.value })}
                    placeholder="0.01"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>百分比手续费 (%)</Label>
                <Input
                  value={editingFee.feePercentage}
                  onChange={(e) => setEditingFee({ ...editingFee, feePercentage: e.target.value })}
                  placeholder="0.1"
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  按提现金额的百分比收取手续费
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <Label className="text-base">提币Gas开关</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    开启后将额外收取网络Gas费用
                  </p>
                </div>
                <Switch
                  checked={editingFee.gasEnabled}
                  onCheckedChange={(checked) => setEditingFee({ ...editingFee, gasEnabled: checked })}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white"
                  onClick={handleSaveFee}
                >
                  保存
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowFeeDialog(false)}
                >
                  取消
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 分类编辑对话框 */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>修改 {selectedCurrency?.symbol} 分类</DialogTitle>
            <DialogDescription>
              选择 {selectedCurrency?.name} 的币种分类
            </DialogDescription>
          </DialogHeader>

          {selectedCurrency && (
            <div className="space-y-4">
              <div className="space-y-2">
                {(['stablecoin', 'mainstream', 'meme', 'other'] as CurrencyCategory[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => setEditingCategory(category)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                      editingCategory === category
                        ? 'border-custom-green bg-custom-green/5'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                        {getCategoryLabel(category)}
                      </span>
                    </div>
                    {editingCategory === category && (
                      <Check className="h-5 w-5 text-custom-green" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1 bg-custom-green hover:bg-custom-green-dark text-white"
                  onClick={handleSaveCategory}
                >
                  保存
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCategoryDialog(false)}
                >
                  取消
                </Button>
              </div>
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
                    <SelectItem value="other">其他</SelectItem>
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

      {/* 网络管理 Sheet */}
      <Sheet open={showNetworkManagementSheet} onOpenChange={setShowNetworkManagementSheet}>
        <SheetContent className="w-[400px] sm:w-[450px]">
          <SheetHeader>
            <SheetTitle>网络管理</SheetTitle>
            <SheetDescription>
              管理支持的区块链网络
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                仅读取供应商支持的网络
              </p>
            </div>

            <div className="space-y-3">
              {globalNetworks.map((network) => (
                <div 
                  key={network.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-custom-green/10 flex items-center justify-center">
                      <Network className="w-5 h-5 text-custom-green" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{network.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{network.fullName}</p>
                    </div>
                  </div>
                  <Switch
                    checked={network.enabled}
                    onCheckedChange={() => toggleGlobalNetwork(network.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
