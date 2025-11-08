"use client"

import React, { useState } from "react"
import { Search, Plus, Edit, Trash2, Eye, Check, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

interface FeeRate {
  minAmount: number
  maxAmount: number
  collectionFeeRate: string
  minCollectionFee: string
  paymentFeeRate: string
  minPaymentFee: string
}

interface Channel {
  id: string
  code: string
  name: string
  displayName: string
  logo?: string
  currency: string
  interface: string
  feeRates: FeeRate[]
  demoVideo?: string
  status: "active" | "inactive"
  createdAt: string
}

const mockChannels: Channel[] = [
  {
    id: "CH001",
    code: "ALIPAY_CN",
    name: "支付宝",
    displayName: "支付宝收款",
    logo: "💰",
    currency: "CNY",
    interface: "Bitzpay",
    feeRates: [
      { minAmount: 0, maxAmount: 10000, collectionFeeRate: "0.6%", minCollectionFee: "¥1.00", paymentFeeRate: "0.4%", minPaymentFee: "¥0.50" },
      { minAmount: 10000, maxAmount: 100000, collectionFeeRate: "0.5%", minCollectionFee: "¥1.00", paymentFeeRate: "0.3%", minPaymentFee: "¥0.50" },
      { minAmount: 100000, maxAmount: Infinity, collectionFeeRate: "0.4%", minCollectionFee: "¥1.00", paymentFeeRate: "0.25%", minPaymentFee: "¥0.50" }
    ],
    demoVideo: "https://example.com/demo1.mp4",
    status: "active",
    createdAt: "2024-01-15 10:30:00"
  },
  {
    id: "CH002",
    code: "WECHAT_CN",
    name: "微信支付",
    displayName: "微信收款码",
    logo: "💬",
    currency: "CNY",
    interface: "Bitzpay",
    feeRates: [
      { minAmount: 0, maxAmount: 10000, collectionFeeRate: "0.6%", minCollectionFee: "¥1.00", paymentFeeRate: "0.4%", minPaymentFee: "¥0.50" },
      { minAmount: 10000, maxAmount: 100000, collectionFeeRate: "0.5%", minCollectionFee: "¥1.00", paymentFeeRate: "0.3%", minPaymentFee: "¥0.50" },
      { minAmount: 100000, maxAmount: Infinity, collectionFeeRate: "0.4%", minCollectionFee: "¥1.00", paymentFeeRate: "0.25%", minPaymentFee: "¥0.50" }
    ],
    demoVideo: "https://example.com/demo2.mp4",
    status: "active",
    createdAt: "2024-01-15 10:35:00"
  },
  {
    id: "CH003",
    code: "BANK_CN",
    name: "银行转账",
    displayName: "银行卡转账",
    logo: "🏦",
    currency: "CNY",
    interface: "BePayOTC",
    feeRates: [
      { minAmount: 0, maxAmount: 10000, collectionFeeRate: "0.4%", minCollectionFee: "¥0.80", paymentFeeRate: "0.3%", minPaymentFee: "¥0.40" },
      { minAmount: 10000, maxAmount: 100000, collectionFeeRate: "0.3%", minCollectionFee: "¥0.80", paymentFeeRate: "0.2%", minPaymentFee: "¥0.40" },
      { minAmount: 100000, maxAmount: Infinity, collectionFeeRate: "0.25%", minCollectionFee: "¥0.80", paymentFeeRate: "0.15%", minPaymentFee: "¥0.40" }
    ],
    status: "active",
    createdAt: "2024-01-16 09:20:00"
  },
  {
    id: "CH004",
    code: "PIX_BR",
    name: "PIX支付",
    displayName: "PIX即时转账",
    logo: "🇧🇷",
    currency: "BRL",
    interface: "CFpay",
    feeRates: [
      { minAmount: 0, maxAmount: 5000, collectionFeeRate: "1.0%", minCollectionFee: "R$2.00", paymentFeeRate: "0.6%", minPaymentFee: "R$1.00" },
      { minAmount: 5000, maxAmount: 50000, collectionFeeRate: "0.8%", minCollectionFee: "R$2.00", paymentFeeRate: "0.5%", minPaymentFee: "R$1.00" },
      { minAmount: 50000, maxAmount: Infinity, collectionFeeRate: "0.6%", minCollectionFee: "R$2.00", paymentFeeRate: "0.4%", minPaymentFee: "R$1.00" }
    ],
    demoVideo: "https://example.com/demo3.mp4",
    status: "active",
    createdAt: "2024-01-17 14:15:00"
  },
  {
    id: "CH005",
    code: "UPI_IN",
    name: "UPI支付",
    displayName: "UPI快速支付",
    logo: "🇮🇳",
    currency: "INR",
    interface: "CFpay",
    feeRates: [
      { minAmount: 0, maxAmount: 50000, collectionFeeRate: "0.8%", minCollectionFee: "₹10", paymentFeeRate: "0.5%", minPaymentFee: "₹5" },
      { minAmount: 50000, maxAmount: 500000, collectionFeeRate: "0.6%", minCollectionFee: "₹10", paymentFeeRate: "0.4%", minPaymentFee: "₹5" },
      { minAmount: 500000, maxAmount: Infinity, collectionFeeRate: "0.5%", minCollectionFee: "₹10", paymentFeeRate: "0.3%", minPaymentFee: "₹5" }
    ],
    status: "active",
    createdAt: "2024-01-18 11:00:00"
  },
]

const currencies = ["全部", "CNY", "BRL", "INR", "USD", "EUR"]

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>(mockChannels)
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("全部")
  
  const handleSearch = () => setSearchTerm(searchInput)
  const handleReset = () => { setSearchInput(""); setSearchTerm("") }
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false)
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null)
  const [editingDisplayName, setEditingDisplayName] = useState<string | null>(null)
  const [tempDisplayName, setTempDisplayName] = useState("")
  const [editingName, setEditingName] = useState<string | null>(null)
  const [tempName, setTempName] = useState("")
  const [editingFee, setEditingFee] = useState<{
    channelId: string
    tier: number
    field: 'minAmount' | 'maxAmount' | 'collectionFeeRate' | 'minCollectionFee' | 'paymentFeeRate' | 'minPaymentFee'
    value: string
  } | null>(null)
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    displayName: "",
    logo: "",
    currency: "",
    interface: "",
    demoVideo: "",
    status: "active" as "active" | "inactive"
  })
  const [feeRatesFormData, setFeeRatesFormData] = useState<FeeRate[]>([
    { minAmount: 0, maxAmount: 10000, collectionFeeRate: "", minCollectionFee: "", paymentFeeRate: "", minPaymentFee: "" },
    { minAmount: 10000, maxAmount: 100000, collectionFeeRate: "", minCollectionFee: "", paymentFeeRate: "", minPaymentFee: "" },
    { minAmount: 100000, maxAmount: Infinity, collectionFeeRate: "", minCollectionFee: "", paymentFeeRate: "", minPaymentFee: "" }
  ])

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = 
      channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.interface.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCurrency = selectedCurrency === "全部" || channel.currency === selectedCurrency
    
    return matchesSearch && matchesCurrency
  })

  const handleAdd = () => {
    const newChannel: Channel = {
      id: `CH${String(channels.length + 1).padStart(3, '0')}`,
      ...formData,
      feeRates: feeRatesFormData.map(rate => ({...rate})),
      createdAt: new Date().toLocaleString('zh-CN')
    }
    setChannels([...channels, newChannel])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (currentChannel) {
      setChannels(channels.map(c => 
        c.id === currentChannel.id ? { ...currentChannel, ...formData, feeRates: feeRatesFormData.map(rate => ({...rate})) } : c
      ))
      setIsEditDialogOpen(false)
      setCurrentChannel(null)
      resetForm()
    }
  }

  const handleDelete = () => {
    if (currentChannel) {
      setChannels(channels.filter(c => c.id !== currentChannel.id))
      setIsDeleteDialogOpen(false)
      setCurrentChannel(null)
    }
  }

  const openEditDialog = (channel: Channel) => {
    setCurrentChannel(channel)
    setFormData({
      code: channel.code,
      name: channel.name,
      displayName: channel.displayName,
      logo: channel.logo || "",
      currency: channel.currency,
      interface: channel.interface,
      demoVideo: channel.demoVideo || "",
      status: channel.status
    })
    setFeeRatesFormData(channel.feeRates.map(rate => ({...rate})))
    setIsEditDialogOpen(true)
  }

  const startEditDisplayName = (channelId: string, currentDisplayName: string) => {
    setEditingDisplayName(channelId)
    setTempDisplayName(currentDisplayName)
  }

  const saveDisplayName = (channelId: string) => {
    setChannels(channels.map(c => 
      c.id === channelId ? { ...c, displayName: tempDisplayName } : c
    ))
    setEditingDisplayName(null)
    setTempDisplayName("")
  }

  const cancelEditDisplayName = () => {
    setEditingDisplayName(null)
    setTempDisplayName("")
  }

  const startEditName = (channelId: string, currentName: string) => {
    setEditingName(channelId)
    setTempName(currentName)
  }

  const saveName = (channelId: string) => {
    setChannels(channels.map(c => 
      c.id === channelId ? { ...c, name: tempName } : c
    ))
    setEditingName(null)
    setTempName("")
  }

  const cancelEditName = () => {
    setEditingName(null)
    setTempName("")
  }

  const startEditFee = (channelId: string, tier: number, field: 'minAmount' | 'maxAmount' | 'collectionFeeRate' | 'minCollectionFee' | 'paymentFeeRate' | 'minPaymentFee', currentValue: any) => {
    setEditingFee({
      channelId,
      tier,
      field,
      value: String(currentValue === Infinity ? '' : currentValue)
    })
  }

  const saveFee = () => {
    if (!editingFee) return
    
    setChannels(channels.map(channel => {
      if (channel.id !== editingFee.channelId) return channel
      
      const updatedFeeRates = channel.feeRates.map((rate, index) => {
        if (index !== editingFee.tier) return rate
        
        const newRate = { ...rate }
        if (editingFee.field === 'minAmount' || editingFee.field === 'maxAmount') {
          newRate[editingFee.field] = editingFee.value === '' ? Infinity : Number(editingFee.value)
        } else {
          newRate[editingFee.field] = editingFee.value
        }
        return newRate
      })
      
      return { ...channel, feeRates: updatedFeeRates }
    }))
    
    setEditingFee(null)
  }

  const cancelEditFee = () => {
    setEditingFee(null)
  }

  const toggleChannelStatus = (channelId: string) => {
    setChannels(channels.map(c => 
      c.id === channelId 
        ? { ...c, status: c.status === "active" ? "inactive" : "active" } 
        : c
    ))
  }

  const openDeleteDialog = (channel: Channel) => {
    setCurrentChannel(channel)
    setIsDeleteDialogOpen(true)
  }

  const openDemoDialog = (channel: Channel) => {
    setCurrentChannel(channel)
    setIsDemoDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      displayName: "",
      logo: "",
      currency: "",
      interface: "",
      demoVideo: "",
      status: "active"
    })
    setFeeRatesFormData([
      { minAmount: 0, maxAmount: 10000, collectionFeeRate: "", minCollectionFee: "", paymentFeeRate: "", minPaymentFee: "" },
      { minAmount: 10000, maxAmount: 100000, collectionFeeRate: "", minCollectionFee: "", paymentFeeRate: "", minPaymentFee: "" },
      { minAmount: 100000, maxAmount: Infinity, collectionFeeRate: "", minCollectionFee: "", paymentFeeRate: "", minPaymentFee: "" }
    ])
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">支付方式列表</h2>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-custom-green hover:bg-custom-green/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加支付方式
        </Button>
      </div>

      <Tabs value={selectedCurrency} onValueChange={setSelectedCurrency}>
        <TabsList className="grid grid-cols-6 w-full max-w-2xl">
          {currencies.map(currency => (
            <TabsTrigger key={currency} value={currency}>
              {currency}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索支付方式名称、代码或接口..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-custom-green hover:bg-custom-green/90 text-white"
        >
          <Search className="w-4 h-4 mr-1" />
          搜索
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          重置
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  支付方式信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  外显名称
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  币种
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  接口来源
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  流水
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  代收费率
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  代收单笔
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  代付费率
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  代付单笔
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredChannels.map((channel) => (
                <tr key={channel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                        {channel.logo ? (
                          channel.logo.startsWith('http') ? (
                            <Image 
                              src={channel.logo} 
                              alt={channel.name}
                              width={40}
                              height={40}
                              className="object-contain"
                              unoptimized
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  parent.innerHTML = channel.name.substring(0, 2);
                                }
                              }}
                            />
                          ) : (
                            <span>{channel.logo}</span>
                          )
                        ) : (
                          <span className="text-blue-600 dark:text-blue-300">{channel.name.substring(0, 2)}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        {editingName === channel.id ? (
                          <div className="flex items-center gap-1 mb-1">
                            <Input
                              value={tempName}
                              onChange={(e) => setTempName(e.target.value)}
                              className="h-7 text-sm py-1 px-2 max-w-[150px]"
                              placeholder="输入通道名称"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  saveName(channel.id)
                                } else if (e.key === 'Escape') {
                                  cancelEditName()
                                }
                              }}
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => saveName(channel.id)}
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                              onClick={cancelEditName}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <div 
                            className="font-medium text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group"
                            onClick={() => startEditName(channel.id, channel.name)}
                          >
                            <span>{channel.name}</span>
                            <Edit className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )}
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">ID: {channel.id} | {channel.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {editingDisplayName === channel.id ? (
                      <div className="flex items-center gap-1">
                        <Input
                          value={tempDisplayName}
                          onChange={(e) => setTempDisplayName(e.target.value)}
                          className="h-8 text-sm py-1 px-2 max-w-[200px]"
                          placeholder="输入外显名称"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              saveDisplayName(channel.id)
                            } else if (e.key === 'Escape') {
                              cancelEditDisplayName()
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => saveDisplayName(channel.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          onClick={cancelEditDisplayName}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group"
                        onClick={() => startEditDisplayName(channel.id, channel.displayName)}
                      >
                        <span>{channel.displayName}</span>
                        <Edit className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                      {channel.currency}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {channel.interface}
                  </td>
                  <td className="px-2 py-3 text-xs">
                    <div className="space-y-1">
                      {channel.feeRates.map((rate, index) => (
                        <div key={index}>
                          {editingFee?.channelId === channel.id && editingFee?.tier === index && editingFee?.field === 'minAmount' ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={editingFee.value}
                                onChange={(e) => setEditingFee({ ...editingFee, value: e.target.value })}
                                className="h-6 text-xs py-1 px-2 w-20"
                                placeholder="最小值"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveFee()
                                  else if (e.key === 'Escape') cancelEditFee()
                                }}
                              />
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-green-600" onClick={saveFee}>
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500" onClick={cancelEditFee}>
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div 
                              className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group"
                              onClick={() => startEditFee(channel.id, index, 'minAmount', rate.minAmount)}
                            >
                              <span>{rate.minAmount.toLocaleString()}{rate.maxAmount !== Infinity ? ` - ${rate.maxAmount.toLocaleString()}` : '+'}</span>
                              <Edit className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-3 text-xs">
                    <div className="space-y-1">
                      {channel.feeRates.map((rate, index) => (
                        <div key={index}>
                          {editingFee?.channelId === channel.id && editingFee?.tier === index && editingFee?.field === 'collectionFeeRate' ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={editingFee.value}
                                onChange={(e) => setEditingFee({ ...editingFee, value: e.target.value })}
                                className="h-6 text-xs py-1 px-2 w-16"
                                placeholder="费率"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveFee()
                                  else if (e.key === 'Escape') cancelEditFee()
                                }}
                              />
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-green-600" onClick={saveFee}>
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500" onClick={cancelEditFee}>
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div 
                              className="text-gray-900 dark:text-white font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group"
                              onClick={() => startEditFee(channel.id, index, 'collectionFeeRate', rate.collectionFeeRate)}
                            >
                              <span>{rate.collectionFeeRate}</span>
                              <Edit className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-3 text-xs">
                    <div className="space-y-1">
                      {channel.feeRates.map((rate, index) => (
                        <div key={index}>
                          {editingFee?.channelId === channel.id && editingFee?.tier === index && editingFee?.field === 'minCollectionFee' ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={editingFee.value}
                                onChange={(e) => setEditingFee({ ...editingFee, value: e.target.value })}
                                className="h-6 text-xs py-1 px-2 w-16"
                                placeholder="单笔"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveFee()
                                  else if (e.key === 'Escape') cancelEditFee()
                                }}
                              />
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-green-600" onClick={saveFee}>
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500" onClick={cancelEditFee}>
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div 
                              className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group"
                              onClick={() => startEditFee(channel.id, index, 'minCollectionFee', rate.minCollectionFee)}
                            >
                              <span>{rate.minCollectionFee}</span>
                              <Edit className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-3 text-xs">
                    <div className="space-y-1">
                      {channel.feeRates.map((rate, index) => (
                        <div key={index}>
                          {editingFee?.channelId === channel.id && editingFee?.tier === index && editingFee?.field === 'paymentFeeRate' ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={editingFee.value}
                                onChange={(e) => setEditingFee({ ...editingFee, value: e.target.value })}
                                className="h-6 text-xs py-1 px-2 w-16"
                                placeholder="费率"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveFee()
                                  else if (e.key === 'Escape') cancelEditFee()
                                }}
                              />
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-green-600" onClick={saveFee}>
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500" onClick={cancelEditFee}>
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div 
                              className="text-gray-900 dark:text-white font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group"
                              onClick={() => startEditFee(channel.id, index, 'paymentFeeRate', rate.paymentFeeRate)}
                            >
                              <span>{rate.paymentFeeRate}</span>
                              <Edit className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-3 text-xs">
                    <div className="space-y-1">
                      {channel.feeRates.map((rate, index) => (
                        <div key={index}>
                          {editingFee?.channelId === channel.id && editingFee?.tier === index && editingFee?.field === 'minPaymentFee' ? (
                            <div className="flex items-center gap-1">
                              <Input
                                value={editingFee.value}
                                onChange={(e) => setEditingFee({ ...editingFee, value: e.target.value })}
                                className="h-6 text-xs py-1 px-2 w-16"
                                placeholder="单笔"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveFee()
                                  else if (e.key === 'Escape') cancelEditFee()
                                }}
                              />
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-green-600" onClick={saveFee}>
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-500" onClick={cancelEditFee}>
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div 
                              className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group"
                              onClick={() => startEditFee(channel.id, index, 'minPaymentFee', rate.minPaymentFee)}
                            >
                              <span>{rate.minPaymentFee}</span>
                              <Edit className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        channel.status === "active"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                      }`}>
                        {channel.status === "active" ? "启用" : "禁用"}
                      </span>
                      <Switch
                        checked={channel.status === "active"}
                        onCheckedChange={() => toggleChannelStatus(channel.id)}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1">
                      {channel.demoVideo && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDemoDialog(channel)}
                          className="text-custom-green hover:text-custom-green/80"
                          title="查看演示"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(channel)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(channel)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                        title="删除"
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

        {filteredChannels.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            暂无数据
          </div>
        )}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>添加支付方式</DialogTitle>
            <DialogDescription>添加新的支付方式</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">通道代码</Label>
                <Input
                  id="code"
                  placeholder="例如：ALIPAY_CN"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">通道名称</Label>
                <Input
                  id="name"
                  placeholder="例如：支付宝"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayName">外显名称</Label>
                <Input
                  id="displayName"
                  placeholder="例如：支付宝扫码支付"
                  value={formData.displayName}
                  onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">LOGO链接</Label>
                <Input
                  id="logo"
                  placeholder="https://example.com/logo.png"
                  value={formData.logo}
                  onChange={(e) => setFormData({...formData, logo: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">币种</Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择币种" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CNY">CNY</SelectItem>
                    <SelectItem value="BRL">BRL</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interface">接口来源</Label>
                <Select value={formData.interface} onValueChange={(value) => setFormData({...formData, interface: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择接口" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bitzpay">Bitzpay</SelectItem>
                    <SelectItem value="BePayOTC">BePayOTC</SelectItem>
                    <SelectItem value="CFpay">CFpay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="demoVideo">Demo视频链接</Label>
                <Input
                  id="demoVideo"
                  placeholder="https://example.com/demo.mp4"
                  value={formData.demoVideo}
                  onChange={(e) => setFormData({...formData, demoVideo: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">启用</SelectItem>
                    <SelectItem value="inactive">禁用</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <h3 className="text-lg font-semibold">阶梯费率配置</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">（根据交易金额自动匹配费率）</span>
              </div>
              
              {feeRatesFormData.map((rate, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-sm font-semibold">
                      第 {index + 1} 档
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-xs text-gray-600 dark:text-gray-400">最小金额</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={rate.minAmount === Infinity ? '' : rate.minAmount}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].minAmount = e.target.value === '' ? 0 : Number(e.target.value)
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600 dark:text-gray-400">最大金额（留空表示无上限）</Label>
                      <Input
                        type="number"
                        placeholder="无上限"
                        value={rate.maxAmount === Infinity ? '' : rate.maxAmount}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].maxAmount = e.target.value === '' ? Infinity : Number(e.target.value)
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-green-700 dark:text-green-400">代收费用</h4>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">代收费率（%）</Label>
                          <Input
                            placeholder="例如：0.5%"
                            value={rate.collectionFeeRate}
                            onChange={(e) => {
                              const newRates = [...feeRatesFormData]
                              newRates[index].collectionFeeRate = e.target.value
                              setFeeRatesFormData(newRates)
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">最低代收费</Label>
                          <Input
                            placeholder="例如：¥1.00"
                            value={rate.minCollectionFee}
                            onChange={(e) => {
                              const newRates = [...feeRatesFormData]
                              newRates[index].minCollectionFee = e.target.value
                              setFeeRatesFormData(newRates)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-orange-700 dark:text-orange-400">代付费用</h4>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">代付费率（%）</Label>
                          <Input
                            placeholder="例如：0.3%"
                            value={rate.paymentFeeRate}
                            onChange={(e) => {
                              const newRates = [...feeRatesFormData]
                              newRates[index].paymentFeeRate = e.target.value
                              setFeeRatesFormData(newRates)
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">最低代付费</Label>
                          <Input
                            placeholder="例如：¥0.50"
                            value={rate.minPaymentFee}
                            onChange={(e) => {
                              const newRates = [...feeRatesFormData]
                              newRates[index].minPaymentFee = e.target.value
                              setFeeRatesFormData(newRates)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAdd} className="bg-custom-green hover:bg-custom-green/90">
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑支付方式</DialogTitle>
            <DialogDescription>修改支付方式配置信息</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-code">通道代码</Label>
                <Input
                  id="edit-code"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name">通道名称</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-displayName">外显名称</Label>
                <Input
                  id="edit-displayName"
                  placeholder="例如：支付宝扫码支付"
                  value={formData.displayName}
                  onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-logo">LOGO链接</Label>
                <Input
                  id="edit-logo"
                  placeholder="https://example.com/logo.png"
                  value={formData.logo}
                  onChange={(e) => setFormData({...formData, logo: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-currency">币种</Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CNY">CNY</SelectItem>
                    <SelectItem value="BRL">BRL</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-interface">接口来源</Label>
                <Select value={formData.interface} onValueChange={(value) => setFormData({...formData, interface: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bitzpay">Bitzpay</SelectItem>
                    <SelectItem value="BePayOTC">BePayOTC</SelectItem>
                    <SelectItem value="CFpay">CFpay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-demoVideo">Demo视频链接</Label>
                <Input
                  id="edit-demoVideo"
                  value={formData.demoVideo}
                  onChange={(e) => setFormData({...formData, demoVideo: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">状态</Label>
                <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">启用</SelectItem>
                    <SelectItem value="inactive">禁用</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <h3 className="text-lg font-semibold">阶梯费率配置</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">（根据交易金额自动匹配费率）</span>
              </div>
              
              {feeRatesFormData.map((rate, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-sm font-semibold">
                      第 {index + 1} 档
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-xs text-gray-600 dark:text-gray-400">最小金额</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={rate.minAmount === Infinity ? '' : rate.minAmount}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].minAmount = e.target.value === '' ? 0 : Number(e.target.value)
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600 dark:text-gray-400">最大金额（留空表示无上限）</Label>
                      <Input
                        type="number"
                        placeholder="无上限"
                        value={rate.maxAmount === Infinity ? '' : rate.maxAmount}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].maxAmount = e.target.value === '' ? Infinity : Number(e.target.value)
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-green-700 dark:text-green-400">代收费用</h4>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">代收费率（%）</Label>
                          <Input
                            placeholder="例如：0.5%"
                            value={rate.collectionFeeRate}
                            onChange={(e) => {
                              const newRates = [...feeRatesFormData]
                              newRates[index].collectionFeeRate = e.target.value
                              setFeeRatesFormData(newRates)
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">最低代收费</Label>
                          <Input
                            placeholder="例如：¥1.00"
                            value={rate.minCollectionFee}
                            onChange={(e) => {
                              const newRates = [...feeRatesFormData]
                              newRates[index].minCollectionFee = e.target.value
                              setFeeRatesFormData(newRates)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-orange-700 dark:text-orange-400">代付费用</h4>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">代付费率（%）</Label>
                          <Input
                            placeholder="例如：0.3%"
                            value={rate.paymentFeeRate}
                            onChange={(e) => {
                              const newRates = [...feeRatesFormData]
                              newRates[index].paymentFeeRate = e.target.value
                              setFeeRatesFormData(newRates)
                            }}
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600 dark:text-gray-400">最低代付费</Label>
                          <Input
                            placeholder="例如：¥0.50"
                            value={rate.minPaymentFee}
                            onChange={(e) => {
                              const newRates = [...feeRatesFormData]
                              newRates[index].minPaymentFee = e.target.value
                              setFeeRatesFormData(newRates)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEdit} className="bg-custom-green hover:bg-custom-green/90">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>删除支付方式</DialogTitle>
            <DialogDescription>
              确定要删除支付方式 "{currentChannel?.name}" 吗？此操作不可恢复。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Demo视频 - {currentChannel?.name}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            {currentChannel?.demoVideo ? (
              <video
                src={currentChannel.demoVideo}
                controls
                className="w-full h-full rounded-lg"
              >
                您的浏览器不支持视频播放
              </video>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">暂无视频</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
