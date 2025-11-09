"use client"

import { useState, useRef, useEffect } from "react"
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
  Search, 
  Plus, 
  Trash2, 
  Edit2,
  Upload,
  DollarSign,
  X,
  Settings,
  Check,
  AlertTriangle
} from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

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
  status: "active" | "inactive"
  createdAt: string
  exchangeRate?: {
    buyPrice: number
    sellPrice: number
    config: ExchangeRateConfig
  }
}

export default function CurrenciesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null)
  const [isRateConfigOpen, setIsRateConfigOpen] = useState(false)
  const [configCurrency, setConfigCurrency] = useState<Currency | null>(null)
  const [editingBuyPrice, setEditingBuyPrice] = useState<string | null>(null)
  const [editingSellPrice, setEditingSellPrice] = useState<string | null>(null)
  const [tempBuyPrice, setTempBuyPrice] = useState("")
  const [tempSellPrice, setTempSellPrice] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)
  const initialCurrencies: Currency[] = [
    {
      id: "CUR001",
      code: "CNY",
      name: "人民币",
      shortName: "¥",
      icon: "🇨🇳",
      status: "active",
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
      status: "active",
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
      status: "active",
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
      status: "active",
      createdAt: "2024-01-18 14:20:00"
    },
    {
      id: "CUR005",
      code: "EUR",
      name: "欧元",
      shortName: "€",
      icon: "🇪🇺",
      status: "active",
      createdAt: "2024-01-20 09:15:00"
    }
  ]

  const [currencies, setCurrencies] = useState<Currency[]>(initialCurrencies)

  useEffect(() => {
    localStorage.setItem("fiat_currencies", JSON.stringify(currencies))
  }, [currencies])
  
  const [newCurrency, setNewCurrency] = useState({
    code: "",
    name: "",
    shortName: "",
    icon: ""
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

  const saveBuyPrice = (currencyId: string) => {
    const value = parseFloat(tempBuyPrice)
    if (isNaN(value) || value <= 0) {
      alert("请输入有效的买入价")
      return
    }
    
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
  }

  const saveSellPrice = (currencyId: string) => {
    const value = parseFloat(tempSellPrice)
    if (isNaN(value) || value <= 0) {
      alert("请输入有效的卖出价")
      return
    }
    
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
  }

  const openRateConfig = (currency: Currency) => {
    setConfigCurrency(currency)
    setIsRateConfigOpen(true)
  }

  const filteredCurrencies = currencies.filter(currency =>
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  const handleAddCurrency = () => {
    const currency: Currency = {
      id: `CUR${String(currencies.length + 1).padStart(3, '0')}`,
      ...newCurrency,
      status: "active",
      createdAt: new Date().toLocaleString('zh-CN')
    }
    setCurrencies([...currencies, currency])
    setNewCurrency({ code: "", name: "", shortName: "", icon: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditCurrency = () => {
    if (!selectedCurrency) return
    
    setCurrencies(currencies.map(c => 
      c.id === selectedCurrency.id ? selectedCurrency : c
    ))
    setIsEditDialogOpen(false)
    setSelectedCurrency(null)
  }

  const handleDeleteCurrency = (id: string) => {
    if (confirm("确定要删除这个币种吗？")) {
      setCurrencies(currencies.filter(c => c.id !== id))
    }
  }

  const openEditDialog = (currency: Currency) => {
    setSelectedCurrency({ ...currency })
    setIsEditDialogOpen(true)
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
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索币种代码、名称或简称..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
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
              {filteredCurrencies.map((currency) => (
                <tr key={currency.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    {currency.id}
                  </td>
                  <td className="py-3 px-4">
                    {currency.icon ? (
                      currency.icon.startsWith('data:') ? (
                        <img src={currency.icon} alt={currency.code} className="w-6 h-6 object-contain" />
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      currency.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {currency.status === 'active' ? '启用' : '禁用'}
                    </span>
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
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false)
                setNewCurrency({ code: "", name: "", shortName: "", icon: "" })
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
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={(configCurrency.exchangeRate?.config.source || "exchange") === "exchange" ? "default" : "outline"}
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
                    className={(configCurrency.exchangeRate?.config.source || "exchange") === "exchange" ? "bg-custom-green hover:bg-custom-green/90" : ""}
                  >
                    交易所
                  </Button>
                  <Button
                    type="button"
                    variant={(configCurrency.exchangeRate?.config.source || "exchange") === "manual" ? "default" : "outline"}
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
                    className={(configCurrency.exchangeRate?.config.source || "exchange") === "manual" ? "bg-custom-green hover:bg-custom-green/90" : ""}
                  >
                    手动更新
                  </Button>
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
