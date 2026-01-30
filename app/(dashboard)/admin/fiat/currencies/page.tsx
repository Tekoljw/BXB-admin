"use client"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { 
  Plus, 
  Trash2, 
  Edit2,
  Upload,
  DollarSign,
  X,
  Settings,
  Check,
  AlertTriangle,
  Loader2
} from "lucide-react"
import { DataTotal } from "@/components/data-total"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fiatApis, type FiatCurrency as ApiFiatCurrency } from "@/router/fiat-api"

type CurrencyRegion = "asia" | "africa" | "americas" | "europe" | "other"

interface ExchangeRateConfig {
  source: "exchange" | "manual"
  floatType: "percentage" | "fixed"
  floatBuy: number
  floatSell: number
  exchangeConfig?: {
    exchange: "Binance" | "OKX"
    priceLevel: "first" | "second" | "third" | "average"
    lastFetched?: string
    baseBuyPrice?: number
    baseSellPrice?: number
  }
  manualConfig?: {
    validityPeriod: 4 | 12 | 24
    lastUpdated?: string
    expiresAt?: string
    baseBuyPrice: number
    baseSellPrice: number
  }
}

interface Currency {
  id: string
  code: string
  name: string
  shortName: string
  icon: string
  region: CurrencyRegion
  status: "active" | "inactive"
  createdAt: string
  sortOrder: number
  exchangeRate?: {
    buyPrice: number
    sellPrice: number
    config: ExchangeRateConfig
  }
}

export default function CurrenciesPage() {
  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null)
  const [isRateConfigOpen, setIsRateConfigOpen] = useState(false)
  const [configCurrency, setConfigCurrency] = useState<Currency | null>(null)
  const [editingBuyPrice, setEditingBuyPrice] = useState<string | null>(null)
  const [editingSellPrice, setEditingSellPrice] = useState<string | null>(null)
  const [tempBuyPrice, setTempBuyPrice] = useState("")
  const [tempSellPrice, setTempSellPrice] = useState("")
  const [statusTab, setStatusTab] = useState("all")
  const [regionTab, setRegionTab] = useState("all")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)
  const [editingSortOrder, setEditingSortOrder] = useState<string | null>(null)
  const [tempSortOrder, setTempSortOrder] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const initialCurrencies: Currency[] = [
    {
      id: "CUR001",
      code: "CNY",
      name: "人民币",
      shortName: "¥",
      icon: "🇨🇳",
      region: "asia",
      status: "active",
      sortOrder: 1,
      createdAt: "2024-01-15 10:30:00",
      exchangeRate: {
        buyPrice: 7.2456,
        sellPrice: 7.2589,
        config: {
          source: "exchange",
          floatType: "percentage",
          floatBuy: 0.1,
          floatSell: 0.1,
          exchangeConfig: {
            exchange: "Binance",
            priceLevel: "first",
            lastFetched: new Date().toISOString(),
            baseBuyPrice: 7.235,
            baseSellPrice: 7.248
          }
        }
      }
    },
    {
      id: "CUR002",
      code: "USD",
      name: "美元",
      shortName: "$",
      icon: "🇺🇸",
      region: "americas",
      status: "active",
      sortOrder: 2,
      createdAt: "2024-01-15 10:30:00",
      exchangeRate: {
        buyPrice: 1.0000,
        sellPrice: 1.0000,
        config: {
          source: "manual",
          floatType: "fixed",
          floatBuy: 0,
          floatSell: 0,
          manualConfig: {
            validityPeriod: 24,
            lastUpdated: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
            expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
            baseBuyPrice: 1.0000,
            baseSellPrice: 1.0000
          }
        }
      }
    },
    {
      id: "CUR003",
      code: "BRL",
      name: "巴西雷亚尔",
      shortName: "R$",
      icon: "🇧🇷",
      region: "americas",
      status: "active",
      sortOrder: 3,
      createdAt: "2024-01-15 10:30:00",
      exchangeRate: {
        buyPrice: 5.8234,
        sellPrice: 5.8456,
        config: {
          source: "exchange",
          floatType: "fixed",
          floatBuy: 0.05,
          floatSell: 0.05,
          exchangeConfig: {
            exchange: "OKX",
            priceLevel: "average",
            lastFetched: new Date().toISOString(),
            baseBuyPrice: 5.7734,
            baseSellPrice: 5.7956
          }
        }
      }
    },
    {
      id: "CUR004",
      code: "INR",
      name: "印度卢比",
      shortName: "₹",
      icon: "🇮🇳",
      region: "asia",
      status: "active",
      sortOrder: 4,
      createdAt: "2024-01-18 14:20:00"
    },
    {
      id: "CUR005",
      code: "EUR",
      name: "欧元",
      shortName: "€",
      icon: "🇪🇺",
      region: "europe",
      status: "active",
      sortOrder: 5,
      createdAt: "2024-01-20 09:15:00"
    },
    {
      id: "CUR006",
      code: "GBP",
      name: "英镑",
      shortName: "£",
      icon: "🇬🇧",
      region: "europe",
      status: "inactive",
      sortOrder: 6,
      createdAt: "2024-01-22 11:00:00"
    },
    {
      id: "CUR007",
      code: "NGN",
      name: "尼日利亚奈拉",
      shortName: "₦",
      icon: "🇳🇬",
      region: "africa",
      status: "active",
      sortOrder: 7,
      createdAt: "2024-01-25 15:30:00"
    }
  ]

  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetchingRef = useRef(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const hasInitializedRef = useRef(false)

  const mapApiDataToCurrency = useCallback((item: ApiFiatCurrency, index: number): Currency => ({
    id: item.id.toString(),
    code: item.currencyCode,
    name: item.currencyCode,
    shortName: item.currencyCode,
    icon: item.avatar || "",
    region: "asia" as CurrencyRegion,
    status: item.isShow && !item.deleted ? "active" : "inactive",
    sortOrder: index + 1,
    createdAt: item.createdAt || new Date().toISOString(),
    exchangeRate: {
      buyPrice: item.buyRate,
      sellPrice: item.sellRate,
      config: {
        source: "manual" as const,
        floatType: "percentage" as const,
        floatBuy: 0,
        floatSell: 0,
        manualConfig: {
          validityPeriod: 24 as const,
          baseBuyPrice: item.buyRate,
          baseSellPrice: item.sellRate,
          lastUpdated: item.updatedAt || item.createdAt || new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      }
    }
  }), [])

  const refreshCurrencies = useCallback(async (size: number = 1000) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    if (fetchingRef.current) {
      return
    }

    try {
      fetchingRef.current = true
      setIsLoading(true)
      setError(null)

      abortControllerRef.current = new AbortController()

      const response = await fiatApis.getFiatList({ 
        pageNumber: 1,
        pageSize: size,
        signal: abortControllerRef.current.signal
      })
      
      if (abortControllerRef.current?.signal.aborted) {
        return
      }
      
      const mappedCurrencies: Currency[] = response.records.map((item, index) => mapApiDataToCurrency(item, index))
      
      setCurrencies(mappedCurrencies)
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }
      
      console.error("获取币种列表失败:", err)
      setError(err instanceof Error ? err.message : "获取币种列表失败")
      setCurrencies(initialCurrencies)
    } finally {
      setIsLoading(false)
      fetchingRef.current = false
      abortControllerRef.current = null
    }
  }, [mapApiDataToCurrency])

  useEffect(() => {
    if (hasInitializedRef.current) {
      return
    }

    if (fetchingRef.current) {
      return
    }

    hasInitializedRef.current = true

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    let isMounted = true

    const loadData = async () => {
      try {
        fetchingRef.current = true
        setIsLoading(true)
        setError(null)

        const response = await fiatApis.getFiatList({ 
          pageNumber: 1,
          pageSize: 1000,
          signal
        })
        
        if (signal.aborted || !isMounted) {
          return
        }
        
        const mappedCurrencies: Currency[] = response.records.map((item, index) => mapApiDataToCurrency(item, index))
        
        setCurrencies(mappedCurrencies)
      } catch (err) {
        if (signal.aborted || !isMounted) {
          return
        }
        
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        
        console.error("获取币种列表失败:", err)
        setError(err instanceof Error ? err.message : "获取币种列表失败")
        setCurrencies(initialCurrencies)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
        fetchingRef.current = false
        abortControllerRef.current = null
      }
    }

    loadData()

    return () => {
      isMounted = false
      hasInitializedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      fetchingRef.current = false
    }
  }, [mapApiDataToCurrency])
  
  const [newCurrency, setNewCurrency] = useState({
    code: "",
    name: "",
    shortName: "",
    icon: "",
    region: "asia" as CurrencyRegion
  })

  const checkRateExpiry = (currency: Currency): { isExpired: boolean; isExpiringSoon: boolean; expiresAt?: string } => {
    if (!currency.exchangeRate || currency.exchangeRate.config.source !== "manual") {
      return { isExpired: false, isExpiringSoon: false }
    }
    
    const config = currency.exchangeRate.config.manualConfig
    if (!config?.expiresAt) return { isExpired: false, isExpiringSoon: false }
    
    const now = new Date().getTime()
    const expiresAt = new Date(config.expiresAt).getTime()
    const timeLeft = expiresAt - now
    const oneHour = 60 * 60 * 1000
    
    return {
      isExpired: timeLeft <= 0,
      isExpiringSoon: timeLeft > 0 && timeLeft <= oneHour,
      expiresAt: config.expiresAt
    }
  }

  const saveBuyPrice = async (currencyId: string) => {
    const value = parseFloat(tempBuyPrice)
    if (isNaN(value) || value <= 0) {
      alert("请输入有效的买入价")
      return
    }
    
    try {
      const currency = currencies.find(c => c.id === currencyId)
      if (!currency) return
      
      const id = parseInt(currencyId)
      await fiatApis.updateFiat(id, {
        currencyCode: currency.code,
        buyRate: value,
        sellRate: currency.exchangeRate?.sellPrice || 1.0,
        avatar: currency.icon || undefined,
        isShow: currency.status === "active",
        isUserShow: currency.status === "active"
      })
      
      setCurrencies(currencies.map(c => {
        if (c.id === currencyId && c.exchangeRate && c.exchangeRate.config.source === "manual") {
          const newExpiresAt = new Date(Date.now() + (c.exchangeRate.config.manualConfig?.validityPeriod || 24) * 60 * 60 * 1000).toISOString()
          return {
            ...c,
            exchangeRate: {
              ...c.exchangeRate,
              buyPrice: value,
              config: {
                ...c.exchangeRate.config,
                manualConfig: {
                  ...c.exchangeRate.config.manualConfig!,
                  baseBuyPrice: value,
                  lastUpdated: new Date().toISOString(),
                  expiresAt: newExpiresAt
                }
              }
            }
          }
        }
        return c
      }))
      setEditingBuyPrice(null)
    } catch (err) {
      console.error("更新买入价失败:", err)
      alert(err instanceof Error ? err.message : "更新买入价失败")
    }
  }

  const saveSellPrice = async (currencyId: string) => {
    const value = parseFloat(tempSellPrice)
    if (isNaN(value) || value <= 0) {
      alert("请输入有效的卖出价")
      return
    }
    
    try {
      const currency = currencies.find(c => c.id === currencyId)
      if (!currency) return
      
      const id = parseInt(currencyId)
      await fiatApis.updateFiat(id, {
        currencyCode: currency.code,
        buyRate: currency.exchangeRate?.buyPrice || 1.0,
        sellRate: value,
        avatar: currency.icon || undefined,
        isShow: currency.status === "active",
        isUserShow: currency.status === "active"
      })
      
      setCurrencies(currencies.map(c => {
        if (c.id === currencyId && c.exchangeRate && c.exchangeRate.config.source === "manual") {
          const newExpiresAt = new Date(Date.now() + (c.exchangeRate.config.manualConfig?.validityPeriod || 24) * 60 * 60 * 1000).toISOString()
          return {
            ...c,
            exchangeRate: {
              ...c.exchangeRate,
              sellPrice: value,
              config: {
                ...c.exchangeRate.config,
                manualConfig: {
                  ...c.exchangeRate.config.manualConfig!,
                  baseSellPrice: value,
                  lastUpdated: new Date().toISOString(),
                  expiresAt: newExpiresAt
                }
              }
            }
          }
        }
        return c
      }))
      setEditingSellPrice(null)
    } catch (err) {
      console.error("更新卖出价失败:", err)
      alert(err instanceof Error ? err.message : "更新卖出价失败")
    }
  }

  const saveSortOrder = async (currencyId: string) => {
    if (!tempSortOrder || tempSortOrder.trim() === '') {
      setEditingSortOrder(null)
      setTempSortOrder("")
      return
    }
    
    const value = parseInt(tempSortOrder)
    if (isNaN(value) || value <= 0) {
      alert("请输入有效的排序值")
      return
    }
    
    try {
      const currency = currencies.find(c => c.id === currencyId)
      if (!currency) return
      
      const id = parseInt(currencyId)
      await fiatApis.updateFiat(id, {
        currencyCode: currency.code,
        buyRate: currency.exchangeRate?.buyPrice || 1.0,
        sellRate: currency.exchangeRate?.sellPrice || 1.0,
        avatar: currency.icon || undefined,
        isShow: currency.status === "active",
        isUserShow: currency.status === "active",
        sortOrder: value
      })
      
      setCurrencies(currencies.map(c => 
        c.id === currencyId ? { ...c, sortOrder: value } : c
      ))
      setEditingSortOrder(null)
      setTempSortOrder("")
    } catch (err) {
      console.error("更新排序失败:", err)
      const errorMessage = err instanceof Error ? err.message : "更新排序失败"
      if (errorMessage.includes("sortOrder") || errorMessage.includes("排序")) {
        alert("后端API暂不支持排序字段，请联系开发人员添加支持")
      } else {
        alert(errorMessage)
      }
    }
  }

  const openRateConfig = (currency: Currency) => {
    setConfigCurrency(currency)
    setIsRateConfigOpen(true)
  }

  const filteredCurrencies = useMemo(() => {
    return currencies.filter(currency => {
      const matchesSearch = 
        currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.shortName.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = 
        statusTab === "all" || 
        (statusTab === "active" && currency.status === "active") ||
        (statusTab === "inactive" && currency.status === "inactive")
      
      const matchesRegion = regionTab === "all" || currency.region === regionTab
      
      return matchesSearch && matchesStatus && matchesRegion
    }).sort((a, b) => a.sortOrder - b.sortOrder)
  }, [currencies, searchTerm, statusTab, regionTab])

  const totalPages = Math.ceil(filteredCurrencies.length / pageSize)
  const paginatedCurrencies = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredCurrencies.slice(startIndex, endIndex)
  }, [filteredCurrencies, currentPage, pageSize])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusTab, regionTab])

  const handleStatusChange = (value: string) => {
    setStatusTab(value)
    setRegionTab("all")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("图片大小不能超过2MB")
        return
      }
      
      if (!file.type.startsWith('image/')) {
        alert("请上传图片文件")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (isEdit && selectedCurrency) {
          setSelectedCurrency({ ...selectedCurrency, icon: result })
        } else {
          setNewCurrency({ ...newCurrency, icon: result })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveIcon = (isEdit = false) => {
    if (isEdit && selectedCurrency) {
      setSelectedCurrency({ ...selectedCurrency, icon: "" })
    } else {
      setNewCurrency({ ...newCurrency, icon: "" })
    }
  }

  const handleAddCurrency = async () => {
    try {
      await fiatApis.createFiat({
        currencyCode: newCurrency.code,
        buyRate: 1.0,
        sellRate: 1.0,
        avatar: newCurrency.icon || undefined,
        isShow: true,
        isUserShow: true
      })
      
      await refreshCurrencies(1000)
      setNewCurrency({ code: "", name: "", shortName: "", icon: "", region: "asia" })
      setIsAddDialogOpen(false)
    } catch (err) {
      console.error("创建币种失败:", err)
      alert(err instanceof Error ? err.message : "创建币种失败")
    }
  }

  const handleEditCurrency = async () => {
    if (!selectedCurrency) return
    
    try {
      const currencyId = parseInt(selectedCurrency.id)
      await fiatApis.updateFiat(currencyId, {
        currencyCode: selectedCurrency.code,
        buyRate: selectedCurrency.exchangeRate?.buyPrice || 1.0,
        sellRate: selectedCurrency.exchangeRate?.sellPrice || 1.0,
        avatar: selectedCurrency.icon || undefined,
        isShow: selectedCurrency.status === "active",
        isUserShow: selectedCurrency.status === "active"
      })
      
      await refreshCurrencies(1000)
      setIsEditDialogOpen(false)
      setSelectedCurrency(null)
    } catch (err) {
      console.error("更新币种失败:", err)
      alert(err instanceof Error ? err.message : "更新币种失败")
    }
  }

  const handleDeleteCurrency = async (id: string) => {
    if (!confirm("确定要删除这个币种吗？")) return
    
    try {
      const currencyId = parseInt(id)
      await fiatApis.deleteFiat(currencyId)
      
      await refreshCurrencies(1000)
    } catch (err) {
      console.error("删除币种失败:", err)
      alert(err instanceof Error ? err.message : "删除币种失败")
    }
  }

  const toggleStatus = async (id: string) => {
    try {
      const currency = currencies.find(c => c.id === id)
      if (!currency) return
      
      const currencyId = parseInt(id)
      const newStatus = currency.status === "active" ? "inactive" : "active"
      
      await fiatApis.disableFiat(id, newStatus === "inactive")
      
      setCurrencies(currencies.map(c => 
        c.id === id ? { ...c, status: newStatus } : c
      ))
    } catch (err) {
      console.error("更新币种状态失败:", err)
      alert(err instanceof Error ? err.message : "更新币种状态失败")
    }
  }

  const openEditDialog = (currency: Currency) => {
    setSelectedCurrency({ ...currency })
    setIsEditDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-custom-green" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">加载中...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">错误: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">币种管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理平台支持的所有币种
          </p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-custom-green hover:bg-custom-green/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加币种
        </Button>
      </div>

      <Card className="p-4">
        <div className="mb-4">
          <SearchControls
            placeholder="搜索币种代码、名称或简称..."
            value={searchInput}
            onChange={setSearchInput}
            onSearch={handleSearch}
            onReset={handleReset}
          />
        </div>

        {/* 两级页签过滤 */}
        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          {/* 一级页签：状态过滤 */}
          <Tabs value={statusTab} onValueChange={handleStatusChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="active">已启用</TabsTrigger>
              <TabsTrigger value="inactive">已停用</TabsTrigger>
            </TabsList>
            
            {/* 二级页签：地区过滤 */}
            <Tabs value={regionTab} onValueChange={setRegionTab}>
              <TabsList className="flex-wrap h-auto">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="asia">亚洲</TabsTrigger>
                <TabsTrigger value="africa">非洲</TabsTrigger>
                <TabsTrigger value="americas">美洲</TabsTrigger>
                <TabsTrigger value="europe">欧洲</TabsTrigger>
                <TabsTrigger value="other">其他</TabsTrigger>
              </TabsList>
            </Tabs>
          </Tabs>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">排序</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">币种ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">图标</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">币种代码</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">币种名称</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">简称</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">买入价(USDT)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">卖出价(USDT)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">汇率来源</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">状态</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">创建时间</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">操作</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCurrencies.map((currency) => (
                <tr key={currency.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-sm">
                    {editingSortOrder === currency.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={tempSortOrder}
                          onChange={(e) => setTempSortOrder(e.target.value.replace(/\D/g, ''))}
                          className="h-8 text-sm py-1 px-2 w-20"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveSortOrder(currency.id)
                            if (e.key === 'Escape') {
                              setEditingSortOrder(null)
                              setTempSortOrder("")
                            }
                          }}
                          autoFocus
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => saveSortOrder(currency.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            setEditingSortOrder(null)
                            setTempSortOrder("")
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 inline-flex items-center gap-1"
                        onClick={() => {
                          setEditingSortOrder(currency.id)
                          setTempSortOrder(currency.sortOrder.toString())
                        }}
                      >
                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                          {currency.sortOrder}
                        </span>
                        <Edit2 className="h-3 w-3 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    {currency.id}
                  </td>
                  <td className="py-3 px-4">
                    {currency.icon ? (
                      currency.icon.startsWith('data:') || 
                      currency.icon.startsWith('http://') || 
                      currency.icon.startsWith('https://') ? (
                        <img 
                          src={currency.icon} 
                          alt={currency.code} 
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              parent.innerHTML = '<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                            }
                          }}
                        />
                      ) : (
                        <span className="text-2xl">{currency.icon}</span>
                      )
                    ) : (
                      <DollarSign className="w-6 h-6 text-gray-400" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {currency.code}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {currency.name}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-custom-green">
                    {currency.shortName}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {currency.exchangeRate ? (
                      currency.exchangeRate.config.source === "manual" ? (
                        editingBuyPrice === currency.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={tempBuyPrice}
                              onChange={(e) => setTempBuyPrice(e.target.value)}
                              className="h-8 text-sm py-1 px-2 w-28"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveBuyPrice(currency.id)
                                if (e.key === 'Escape') setEditingBuyPrice(null)
                              }}
                              autoFocus
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => saveBuyPrice(currency.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                              onClick={() => setEditingBuyPrice(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div
                            className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 inline-flex items-center gap-1"
                            onClick={() => {
                              setEditingBuyPrice(currency.id)
                              setTempBuyPrice(currency.exchangeRate!.buyPrice.toFixed(4))
                            }}
                          >
                            <span className="text-gray-900 dark:text-gray-100 font-medium">
                              {currency.exchangeRate.buyPrice.toFixed(4)}
                            </span>
                            <Edit2 className="h-3 w-3 text-gray-400" />
                          </div>
                        )
                      ) : (
                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                          {currency.exchangeRate.buyPrice.toFixed(4)}
                        </span>
                      )
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {currency.exchangeRate ? (
                      currency.exchangeRate.config.source === "manual" ? (
                        editingSellPrice === currency.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={tempSellPrice}
                              onChange={(e) => setTempSellPrice(e.target.value)}
                              className="h-8 text-sm py-1 px-2 w-28"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveSellPrice(currency.id)
                                if (e.key === 'Escape') setEditingSellPrice(null)
                              }}
                              autoFocus
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => saveSellPrice(currency.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                              onClick={() => setEditingSellPrice(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div
                            className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-2 py-1 inline-flex items-center gap-1"
                            onClick={() => {
                              setEditingSellPrice(currency.id)
                              setTempSellPrice(currency.exchangeRate!.sellPrice.toFixed(4))
                            }}
                          >
                            <span className="text-gray-900 dark:text-gray-100 font-medium">
                              {currency.exchangeRate.sellPrice.toFixed(4)}
                            </span>
                            <Edit2 className="h-3 w-3 text-gray-400" />
                          </div>
                        )
                      ) : (
                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                          {currency.exchangeRate.sellPrice.toFixed(4)}
                        </span>
                      )
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {currency.exchangeRate ? (
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            currency.exchangeRate.config.source === 'exchange'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                          }`}>
                            {currency.exchangeRate.config.source === 'exchange' 
                              ? `交易所 (${currency.exchangeRate.config.exchangeConfig?.exchange})` 
                              : '手动更新'}
                          </span>
                          {currency.exchangeRate.config.source === 'manual' && (() => {
                            const expiry = checkRateExpiry(currency)
                            return expiry.isExpired || expiry.isExpiringSoon ? (
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                expiry.isExpired
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                  : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                              }`}>
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                {expiry.isExpired ? '已失效' : '即将失效'}
                              </span>
                            ) : null
                          })()}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openRateConfig(currency)}
                          className="h-7 w-7 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">未配置</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openRateConfig(currency)}
                          className="h-7 w-7 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        currency.status === 'active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {currency.status === 'active' ? '启用' : '禁用'}
                      </span>
                      <Switch
                        checked={currency.status === 'active'}
                        onCheckedChange={() => toggleStatus(currency.id)}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-400">
                    {currency.createdAt}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(currency)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCurrency(currency.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCurrencies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">未找到相关币种</p>
          </div>
        )}

        {filteredCurrencies.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                显示 {Math.min((currentPage - 1) * pageSize + 1, filteredCurrencies.length)} - {Math.min(currentPage * pageSize, filteredCurrencies.length)} 条，共 {filteredCurrencies.length} 条
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => {
                    setPageSize(Number(value))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="h-8"
                  >
                    上一页
                  </Button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-8 ${currentPage === pageNum ? "bg-custom-green hover:bg-custom-green/90" : ""}`}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8"
                  >
                    下一页
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>添加币种</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>币种代码 *</Label>
              <Input
                placeholder="例如: CNY, USD, BRL"
                value={newCurrency.code}
                onChange={(e) => setNewCurrency({ ...newCurrency, code: e.target.value.toUpperCase() })}
              />
            </div>
            <div className="space-y-2">
              <Label>币种名称 *</Label>
              <Input
                placeholder="例如: 人民币, 美元, 巴西雷亚尔"
                value={newCurrency.name}
                onChange={(e) => setNewCurrency({ ...newCurrency, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>币种简称 *</Label>
              <Input
                placeholder="例如: ¥, $, R$"
                value={newCurrency.shortName}
                onChange={(e) => setNewCurrency({ ...newCurrency, shortName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>币种图标</Label>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, false)}
                  className="hidden"
                />
                <Input
                  placeholder="输入emoji或留空"
                  value={newCurrency.icon && !newCurrency.icon.startsWith('data:') ? newCurrency.icon : ''}
                  onChange={(e) => setNewCurrency({ ...newCurrency, icon: e.target.value })}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              {newCurrency.icon && newCurrency.icon.startsWith('data:') && (
                <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <img 
                    src={newCurrency.icon} 
                    alt="预览" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">图片已上传</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => handleRemoveIcon(false)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              <p className="text-xs text-gray-500">可以输入emoji（如🇨🇳）或上传图片（最大2MB）</p>
            </div>
            <div className="space-y-2">
              <Label>所属地区 *</Label>
              <Select
                value={newCurrency.region}
                onValueChange={(value: CurrencyRegion) => setNewCurrency({ ...newCurrency, region: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia">亚洲</SelectItem>
                  <SelectItem value="africa">非洲</SelectItem>
                  <SelectItem value="americas">美洲</SelectItem>
                  <SelectItem value="europe">欧洲</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false)
                setNewCurrency({ code: "", name: "", shortName: "", icon: "", region: "asia" })
              }}
            >
              取消
            </Button>
            <Button
              onClick={handleAddCurrency}
              disabled={!newCurrency.code || !newCurrency.name || !newCurrency.shortName}
              className="bg-custom-green hover:bg-custom-green/90"
            >
              确认添加
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>编辑币种</DialogTitle>
          </DialogHeader>
          {selectedCurrency && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>币种代码</Label>
                <Input
                  value={selectedCurrency.code}
                  disabled
                  className="bg-gray-100 dark:bg-gray-800"
                />
                <p className="text-xs text-gray-500">币种代码不可修改</p>
              </div>
              <div className="space-y-2">
                <Label>币种名称 *</Label>
                <Input
                  value={selectedCurrency.name}
                  onChange={(e) => setSelectedCurrency({ ...selectedCurrency, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>币种简称 *</Label>
                <Input
                  value={selectedCurrency.shortName}
                  onChange={(e) => setSelectedCurrency({ ...selectedCurrency, shortName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>币种图标</Label>
                <div className="flex items-center gap-2">
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, true)}
                    className="hidden"
                  />
                  <Input
                    placeholder="输入emoji或留空"
                    value={selectedCurrency.icon && !selectedCurrency.icon.startsWith('data:') ? selectedCurrency.icon : ''}
                    onChange={(e) => setSelectedCurrency({ ...selectedCurrency, icon: e.target.value })}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
                {selectedCurrency.icon && selectedCurrency.icon.startsWith('data:') && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <img 
                      src={selectedCurrency.icon} 
                      alt="预览" 
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">图片已上传</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      onClick={() => handleRemoveIcon(true)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <p className="text-xs text-gray-500">可以输入emoji（如🇨🇳）或上传图片（最大2MB）</p>
              </div>
              <div className="space-y-2">
                <Label>所属地区 *</Label>
                <Select
                  value={selectedCurrency.region}
                  onValueChange={(value: CurrencyRegion) => setSelectedCurrency({ ...selectedCurrency, region: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia">亚洲</SelectItem>
                    <SelectItem value="africa">非洲</SelectItem>
                    <SelectItem value="americas">美洲</SelectItem>
                    <SelectItem value="europe">欧洲</SelectItem>
                    <SelectItem value="other">其他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false)
                setSelectedCurrency(null)
              }}
            >
              取消
            </Button>
            <Button
              onClick={handleEditCurrency}
              className="bg-custom-green hover:bg-custom-green/90"
            >
              保存修改
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={isRateConfigOpen} onOpenChange={setIsRateConfigOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>汇率配置</SheetTitle>
            <SheetDescription>
              配置 {configCurrency?.name} 对 USDT 的汇率来源和浮动
            </SheetDescription>
          </SheetHeader>
          {configCurrency && (
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <Label>汇率来源</Label>
                <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 w-full max-w-md">
                  <button
                    type="button"
                    onClick={() => {
                      const newSource = "exchange" as const
                      if (!configCurrency.exchangeRate) {
                        setConfigCurrency({
                          ...configCurrency,
                          exchangeRate: {
                            buyPrice: 1,
                            sellPrice: 1,
                            config: {
                              source: newSource,
                              floatType: "percentage",
                              floatBuy: 0,
                              floatSell: 0,
                              exchangeConfig: {
                                exchange: "Binance",
                                priceLevel: "first",
                                baseBuyPrice: 1,
                                baseSellPrice: 1,
                                lastFetched: new Date().toISOString()
                              }
                            }
                          }
                        })
                      } else {
                        setConfigCurrency({
                          ...configCurrency,
                          exchangeRate: {
                            ...configCurrency.exchangeRate,
                            config: {
                              ...configCurrency.exchangeRate.config,
                              source: newSource,
                              exchangeConfig: configCurrency.exchangeRate.config.exchangeConfig || {
                                exchange: "Binance",
                                priceLevel: "first",
                                baseBuyPrice: configCurrency.exchangeRate.buyPrice,
                                baseSellPrice: configCurrency.exchangeRate.sellPrice,
                                lastFetched: new Date().toISOString()
                              },
                              manualConfig: undefined
                            }
                          }
                        })
                      }
                    }}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      (configCurrency.exchangeRate?.config.source || "exchange") === "exchange"
                        ? "bg-custom-green text-white shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    交易所
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const newSource = "manual" as const
                      if (!configCurrency.exchangeRate) {
                        setConfigCurrency({
                          ...configCurrency,
                          exchangeRate: {
                            buyPrice: 1,
                            sellPrice: 1,
                            config: {
                              source: newSource,
                              floatType: "percentage",
                              floatBuy: 0,
                              floatSell: 0,
                              manualConfig: {
                                validityPeriod: 24,
                                baseBuyPrice: 1,
                                baseSellPrice: 1,
                                lastUpdated: new Date().toISOString(),
                                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                              }
                            }
                          }
                        })
                      } else {
                        setConfigCurrency({
                          ...configCurrency,
                          exchangeRate: {
                            ...configCurrency.exchangeRate,
                            config: {
                              ...configCurrency.exchangeRate.config,
                              source: newSource,
                              manualConfig: configCurrency.exchangeRate.config.manualConfig || {
                                validityPeriod: 24,
                                baseBuyPrice: configCurrency.exchangeRate.buyPrice,
                                baseSellPrice: configCurrency.exchangeRate.sellPrice,
                                lastUpdated: new Date().toISOString(),
                                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                              },
                              exchangeConfig: undefined
                            }
                          }
                        })
                      }
                    }}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      (configCurrency.exchangeRate?.config.source || "exchange") === "manual"
                        ? "bg-custom-green text-white shadow-sm"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    手动更新
                  </button>
                </div>
              </div>

              {(configCurrency.exchangeRate?.config.source || "exchange") === "exchange" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>选择交易所</Label>
                    <Tabs
                      value={configCurrency.exchangeRate?.config.exchangeConfig?.exchange || "Binance"}
                      onValueChange={(value) => {
                        const newExchange = value as "Binance" | "OKX"
                        setConfigCurrency({
                          ...configCurrency,
                          exchangeRate: {
                            ...configCurrency.exchangeRate!,
                            config: {
                              ...configCurrency.exchangeRate!.config,
                              exchangeConfig: {
                                ...configCurrency.exchangeRate!.config.exchangeConfig!,
                                exchange: newExchange
                              }
                            }
                          }
                        })
                      }}
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="Binance">Binance</TabsTrigger>
                        <TabsTrigger value="OKX">OKX</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="space-y-2">
                    <Label>P2P市场价格档位</Label>
                    <Tabs
                      value={configCurrency.exchangeRate?.config.exchangeConfig?.priceLevel || "first"}
                      onValueChange={(value) => {
                        const newLevel = value as "first" | "second" | "third" | "average"
                        setConfigCurrency({
                          ...configCurrency,
                          exchangeRate: {
                            ...configCurrency.exchangeRate!,
                            config: {
                              ...configCurrency.exchangeRate!.config,
                              exchangeConfig: {
                                ...configCurrency.exchangeRate!.config.exchangeConfig!,
                                priceLevel: newLevel
                              }
                            }
                          }
                        })
                      }}
                    >
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="first">第一档</TabsTrigger>
                        <TabsTrigger value="second">第二档</TabsTrigger>
                        <TabsTrigger value="third">第三档</TabsTrigger>
                        <TabsTrigger value="average">平均价</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      系统将自动从 {configCurrency.exchangeRate?.config.exchangeConfig?.exchange} 获取P2P市场
                      {configCurrency.exchangeRate?.config.exchangeConfig?.priceLevel === "average" ? "前三档平均价" : `第${
                        configCurrency.exchangeRate?.config.exchangeConfig?.priceLevel === "first" ? "一" :
                        configCurrency.exchangeRate?.config.exchangeConfig?.priceLevel === "second" ? "二" : "三"
                      }档实时价`}作为基准汇率
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>买入价 (USDT)</Label>
                      <Input
                        type="number"
                        step="0.0001"
                        value={configCurrency.exchangeRate?.config.manualConfig?.baseBuyPrice || ""}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value)
                          setConfigCurrency({
                            ...configCurrency,
                            exchangeRate: {
                              ...configCurrency.exchangeRate!,
                              config: {
                                ...configCurrency.exchangeRate!.config,
                                manualConfig: {
                                  ...configCurrency.exchangeRate!.config.manualConfig!,
                                  baseBuyPrice: isNaN(value) ? 0 : value
                                }
                              }
                            }
                          })
                        }}
                        placeholder="例如: 7.2456"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>卖出价 (USDT)</Label>
                      <Input
                        type="number"
                        step="0.0001"
                        value={configCurrency.exchangeRate?.config.manualConfig?.baseSellPrice || ""}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value)
                          setConfigCurrency({
                            ...configCurrency,
                            exchangeRate: {
                              ...configCurrency.exchangeRate!,
                              config: {
                                ...configCurrency.exchangeRate!.config,
                                manualConfig: {
                                  ...configCurrency.exchangeRate!.config.manualConfig!,
                                  baseSellPrice: isNaN(value) ? 0 : value
                                }
                              }
                            }
                          })
                        }}
                        placeholder="例如: 7.2589"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>有效期</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[4, 12, 24].map((hours) => (
                        <Button
                          key={hours}
                          type="button"
                          variant={configCurrency.exchangeRate?.config.manualConfig?.validityPeriod === hours ? "default" : "outline"}
                          onClick={() => {
                            setConfigCurrency({
                              ...configCurrency,
                              exchangeRate: {
                                ...configCurrency.exchangeRate!,
                                config: {
                                  ...configCurrency.exchangeRate!.config,
                                  manualConfig: {
                                    ...configCurrency.exchangeRate!.config.manualConfig!,
                                    validityPeriod: hours as 4 | 12 | 24
                                  }
                                }
                              }
                            })
                          }}
                          className={configCurrency.exchangeRate?.config.manualConfig?.validityPeriod === hours ? "bg-custom-green hover:bg-custom-green/90" : ""}
                        >
                          {hours}小时
                        </Button>
                      ))}
                    </div>
                  </div>

                  {configCurrency.exchangeRate?.config.manualConfig?.expiresAt && (
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <p className="text-sm text-orange-800 dark:text-orange-200">
                        当前失效时间：{new Date(configCurrency.exchangeRate.config.manualConfig.expiresAt).toLocaleString('zh-CN')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="border-t pt-4 space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">浮动配置</h3>
                
                <div className="space-y-2">
                  <Label>浮动类型</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={configCurrency.exchangeRate?.config.floatType === "percentage" ? "default" : "outline"}
                      onClick={() => {
                        setConfigCurrency({
                          ...configCurrency,
                          exchangeRate: {
                            ...configCurrency.exchangeRate!,
                            config: {
                              ...configCurrency.exchangeRate!.config,
                              floatType: "percentage"
                            }
                          }
                        })
                      }}
                      className={configCurrency.exchangeRate?.config.floatType === "percentage" ? "bg-custom-green hover:bg-custom-green/90" : ""}
                    >
                      百分比 (%)
                    </Button>
                    <Button
                      type="button"
                      variant={configCurrency.exchangeRate?.config.floatType === "fixed" ? "default" : "outline"}
                      onClick={() => {
                        setConfigCurrency({
                          ...configCurrency,
                          exchangeRate: {
                            ...configCurrency.exchangeRate!,
                            config: {
                              ...configCurrency.exchangeRate!.config,
                              floatType: "fixed"
                            }
                          }
                        })
                      }}
                      className={configCurrency.exchangeRate?.config.floatType === "fixed" ? "bg-custom-green hover:bg-custom-green/90" : ""}
                    >
                      固定金额
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>买入价浮动 {configCurrency.exchangeRate?.config.floatType === "percentage" ? "(%)" : ""}</Label>
                    <Input
                      type="number"
                      step={configCurrency.exchangeRate?.config.floatType === "percentage" ? "0.01" : "0.0001"}
                      value={configCurrency.exchangeRate?.config.floatBuy || 0}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value)
                        setConfigCurrency({
                          ...configCurrency,
                          exchangeRate: {
                            ...configCurrency.exchangeRate!,
                            config: {
                              ...configCurrency.exchangeRate!.config,
                              floatBuy: isNaN(value) ? 0 : value
                            }
                          }
                        })
                      }}
                      placeholder={configCurrency.exchangeRate?.config.floatType === "percentage" ? "例如: 0.1" : "例如: 0.01"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>卖出价浮动 {configCurrency.exchangeRate?.config.floatType === "percentage" ? "(%)" : ""}</Label>
                    <Input
                      type="number"
                      step={configCurrency.exchangeRate?.config.floatType === "percentage" ? "0.01" : "0.0001"}
                      value={configCurrency.exchangeRate?.config.floatSell || 0}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value)
                        setConfigCurrency({
                          ...configCurrency,
                          exchangeRate: {
                            ...configCurrency.exchangeRate!,
                            config: {
                              ...configCurrency.exchangeRate!.config,
                              floatSell: isNaN(value) ? 0 : value
                            }
                          }
                        })
                      }}
                      placeholder={configCurrency.exchangeRate?.config.floatType === "percentage" ? "例如: 0.1" : "例如: 0.01"}
                    />
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">计算公式：</span>
                    {configCurrency.exchangeRate?.config.floatType === "percentage" 
                      ? " 最终价格 = 基准价格 × (1 + 浮动% / 100)"
                      : " 最终价格 = 基准价格 + 浮动金额"}
                  </p>
                </div>
              </div>
            </div>
          )}
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsRateConfigOpen(false)}>
              取消
            </Button>
            <Button
              onClick={() => {
                if (!configCurrency) return

                const config = configCurrency.exchangeRate!.config
                let buyPrice, sellPrice

                if (config.source === "exchange") {
                  const baseB = config.exchangeConfig!.baseBuyPrice || 1
                  const baseS = config.exchangeConfig!.baseSellPrice || 1
                  
                  if (config.floatType === "percentage") {
                    buyPrice = baseB * (1 + config.floatBuy / 100)
                    sellPrice = baseS * (1 + config.floatSell / 100)
                  } else {
                    buyPrice = baseB + config.floatBuy
                    sellPrice = baseS + config.floatSell
                  }
                } else {
                  const baseB = config.manualConfig!.baseBuyPrice
                  const baseS = config.manualConfig!.baseSellPrice
                  
                  if (config.floatType === "percentage") {
                    buyPrice = baseB * (1 + config.floatBuy / 100)
                    sellPrice = baseS * (1 + config.floatSell / 100)
                  } else {
                    buyPrice = baseB + config.floatBuy
                    sellPrice = baseS + config.floatSell
                  }
                  
                  config.manualConfig!.lastUpdated = new Date().toISOString()
                  config.manualConfig!.expiresAt = new Date(Date.now() + config.manualConfig!.validityPeriod * 60 * 60 * 1000).toISOString()
                }

                setCurrencies(currencies.map(c => 
                  c.id === configCurrency.id 
                    ? {
                        ...c,
                        exchangeRate: {
                          buyPrice,
                          sellPrice,
                          config
                        }
                      }
                    : c
                ))
                setIsRateConfigOpen(false)
              }}
              className="bg-custom-green hover:bg-custom-green/90"
            >
              保存配置
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
