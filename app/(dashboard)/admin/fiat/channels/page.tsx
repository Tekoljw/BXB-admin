"use client"

import React, { useState } from "react"
import { Search, Plus, Edit, Trash2, Eye, Check, X, RotateCcw } from "lucide-react"
import { LoadMoreButton } from "@/components/load-more-button"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
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
  feeRate: string
  minFee: string
}

interface Channel {
  id: string
  code: string
  name: string
  displayName: string
  logo?: string
  currency: string
  interface: string
  serviceType: "代收" | "代付"
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
    serviceType: "代收",
    feeRates: [
      { minAmount: 0, maxAmount: 10000, feeRate: "0.4%", minFee: "¥0.50" },
      { minAmount: 10000, maxAmount: 100000, feeRate: "0.3%", minFee: "¥0.50" },
      { minAmount: 100000, maxAmount: Infinity, feeRate: "0.25%", minFee: "¥0.50" }
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
    serviceType: "代收",
    feeRates: [
      { minAmount: 0, maxAmount: 10000, feeRate: "0.4%", minFee: "¥0.50" },
      { minAmount: 10000, maxAmount: 100000, feeRate: "0.3%", minFee: "¥0.50" },
      { minAmount: 100000, maxAmount: Infinity, feeRate: "0.25%", minFee: "¥0.50" }
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
    serviceType: "代付",
    feeRates: [
      { minAmount: 0, maxAmount: 10000, feeRate: "0.3%", minFee: "¥0.40" },
      { minAmount: 10000, maxAmount: 100000, feeRate: "0.2%", minFee: "¥0.40" },
      { minAmount: 100000, maxAmount: Infinity, feeRate: "0.15%", minFee: "¥0.40" }
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
    serviceType: "代收",
    feeRates: [
      { minAmount: 0, maxAmount: 5000, feeRate: "0.6%", minFee: "R$1.00" },
      { minAmount: 5000, maxAmount: 50000, feeRate: "0.5%", minFee: "R$1.00" },
      { minAmount: 50000, maxAmount: Infinity, feeRate: "0.4%", minFee: "R$1.00" }
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
    serviceType: "代付",
    feeRates: [
      { minAmount: 0, maxAmount: 50000, feeRate: "0.5%", minFee: "₹5" },
      { minAmount: 50000, maxAmount: 500000, feeRate: "0.4%", minFee: "₹5" },
      { minAmount: 500000, maxAmount: Infinity, feeRate: "0.3%", minFee: "₹5" }
    ],
    status: "active",
    createdAt: "2024-01-18 11:00:00"
  },
]

const currencies = ["全部", "CNY", "BRL", "INR", "USD", "EUR"]

// Mock接口数据
const mockInterfaces = [
  {
    id: "IF001",
    name: "Bitzpay",
    code: "BITZPAY",
    description: "专业的数字货币支付接口",
    status: "active" as const,
  },
  {
    id: "IF002",
    name: "BePayOTC",
    code: "BEPAYOTC",
    description: "高效的OTC支付解决方案",
    status: "active" as const,
  },
  {
    id: "IF003",
    name: "CFpay",
    code: "CFPAY",
    description: "跨境支付专业接口",
    status: "active" as const,
  },
  {
    id: "IF004",
    name: "PayTrust",
    code: "PAYTRUST",
    description: "可信赖的支付通道",
    status: "inactive" as const,
  },
]

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>(mockChannels)
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  
  // 获取所有唯一的接口名称
  const interfaces = ["全部", ...Array.from(new Set(mockChannels.map(ch => ch.interface)))]
  const [selectedInterface, setSelectedInterface] = useState("全部")
  const [selectedCurrency, setSelectedCurrency] = useState("全部")
  
  const handleSearch = () => setSearchTerm(searchInput)
  const handleReset = () => { setSearchInput(""); setSearchTerm("") }
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false)
  const [isInterfaceSelectOpen, setIsInterfaceSelectOpen] = useState(false)
  const [tempInterface, setTempInterface] = useState("")
  const [interfaceUsageFilter, setInterfaceUsageFilter] = useState<"使用中" | "未使用">("使用中")
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null)
  const [editingDisplayName, setEditingDisplayName] = useState<string | null>(null)
  const [tempDisplayName, setTempDisplayName] = useState("")
  const [editingName, setEditingName] = useState<string | null>(null)
  const [tempName, setTempName] = useState("")
  const [editingFee, setEditingFee] = useState<{
    channelId: string
    tier: number
    field: 'minAmount' | 'maxAmount' | 'feeRate' | 'minFee'
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
    { minAmount: 0, maxAmount: 10000, feeRate: "", minFee: "" },
    { minAmount: 10000, maxAmount: 100000, feeRate: "", minFee: "" },
    { minAmount: 100000, maxAmount: Infinity, feeRate: "", minFee: "" }
  ])

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = 
      channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.interface.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesInterface = selectedInterface === "全部" || channel.interface === selectedInterface
    const matchesCurrency = selectedCurrency === "全部" || channel.currency === selectedCurrency
    
    return matchesSearch && matchesInterface && matchesCurrency
  })

  const handleAdd = () => {
    const newChannel: Channel = {
      id: `CH${String(channels.length + 1).padStart(3, '0')}`,
      ...formData,
      serviceType: "代收",
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
    setTempInterface(channel.interface)
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

  const startEditFee = (channelId: string, tier: number, field: 'minAmount' | 'maxAmount' | 'feeRate' | 'minFee', currentValue: any) => {
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
      { minAmount: 0, maxAmount: 10000, feeRate: "", minFee: "" },
      { minAmount: 10000, maxAmount: 100000, feeRate: "", minFee: "" },
      { minAmount: 100000, maxAmount: Infinity, feeRate: "", minFee: "" }
    ])
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">通道列表</h2>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-custom-green hover:bg-custom-green/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加通道
        </Button>
      </div>

      {/* 一级页签：接口名称 */}
      <Tabs value={selectedInterface} onValueChange={(value) => {
        setSelectedInterface(value)
        setSelectedCurrency("全部") // 切换接口时重置币种
      }}>
        <TabsList className={`grid w-full max-w-3xl`} style={{ gridTemplateColumns: `repeat(${interfaces.length}, minmax(0, 1fr))` }}>
          {interfaces.map(interfaceName => (
            <TabsTrigger key={interfaceName} value={interfaceName}>
              {interfaceName}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* 二级页签：币种 */}
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
            placeholder="搜索通道名称、代码或接口..."
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
                  服务类型
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  通道信息
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
                  手续费率
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  单笔最低手续费
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
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      channel.serviceType === "代收" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}>
                      {channel.serviceType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-3">
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
                  <td 
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => {
                      setCurrentChannel(channel)
                      setTempInterface(channel.interface)
                      setIsInterfaceSelectOpen(true)
                    }}
                    title="点击选择接口"
                  >
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
                          {editingFee?.channelId === channel.id && editingFee?.tier === index && editingFee?.field === 'feeRate' ? (
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
                              onClick={() => startEditFee(channel.id, index, 'feeRate', rate.feeRate)}
                            >
                              <span>{rate.feeRate}</span>
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
                          {editingFee?.channelId === channel.id && editingFee?.tier === index && editingFee?.field === 'minFee' ? (
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
                              onClick={() => startEditFee(channel.id, index, 'minFee', rate.minFee)}
                            >
                              <span>{rate.minFee}</span>
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

        {filteredChannels.length > 0 && <LoadMoreButton />}
      </div>

      <Sheet open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <SheetContent side="right" className="w-full sm:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>添加通道</SheetTitle>
            <SheetDescription>添加新的支付通道</SheetDescription>
          </SheetHeader>
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
              <div className="space-y-2 col-span-2">
                <Label>接口来源</Label>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setTempInterface(formData.interface)
                    setIsInterfaceSelectOpen(true)
                  }}
                >
                  {formData.interface || "选择接口"}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <h3 className="text-lg font-semibold">三方费率配置（三档阶梯）</h3>
              </div>
              
              {feeRatesFormData.map((rate, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                  <h4 className="text-sm font-medium mb-3 text-blue-700 dark:text-blue-400">第 {index + 1} 档</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600 dark:text-gray-400">最小金额</Label>
                      <Input
                        type="number"
                        placeholder="例如：0"
                        value={rate.minAmount}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].minAmount = Number(e.target.value)
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600 dark:text-gray-400">最大金额（留空表示无上限）</Label>
                      <Input
                        type="number"
                        placeholder="例如：10000"
                        value={rate.maxAmount === Infinity ? '' : rate.maxAmount}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].maxAmount = e.target.value === '' ? Infinity : Number(e.target.value)
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600 dark:text-gray-400">手续费率</Label>
                      <Input
                        placeholder="例如：0.3%"
                        value={rate.feeRate}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].feeRate = e.target.value
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600 dark:text-gray-400">单笔最低手续费</Label>
                      <Input
                        placeholder="例如：¥0.50"
                        value={rate.minFee}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].minFee = e.target.value
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SheetFooter className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAdd} className="bg-custom-green hover:bg-custom-green/90">
              添加
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <SheetContent side="right" className="w-full sm:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>编辑通道</SheetTitle>
            <SheetDescription>修改通道配置信息</SheetDescription>
          </SheetHeader>
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
              <div className="space-y-2 col-span-2">
                <Label>接口来源</Label>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setTempInterface(formData.interface)
                    setIsInterfaceSelectOpen(true)
                  }}
                >
                  {formData.interface || "选择接口"}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <h3 className="text-lg font-semibold">三方费率配置（三档阶梯）</h3>
              </div>
              
              {feeRatesFormData.map((rate, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                  <h4 className="text-sm font-medium mb-3 text-blue-700 dark:text-blue-400">第 {index + 1} 档</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600 dark:text-gray-400">最小金额</Label>
                      <Input
                        type="number"
                        placeholder="例如：0"
                        value={rate.minAmount}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].minAmount = Number(e.target.value)
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600 dark:text-gray-400">最大金额（留空表示无上限）</Label>
                      <Input
                        type="number"
                        placeholder="例如：10000"
                        value={rate.maxAmount === Infinity ? '' : rate.maxAmount}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].maxAmount = e.target.value === '' ? Infinity : Number(e.target.value)
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600 dark:text-gray-400">手续费率</Label>
                      <Input
                        placeholder="例如：0.3%"
                        value={rate.feeRate}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].feeRate = e.target.value
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-gray-600 dark:text-gray-400">单笔最低手续费</Label>
                      <Input
                        placeholder="例如：¥0.50"
                        value={rate.minFee}
                        onChange={(e) => {
                          const newRates = [...feeRatesFormData]
                          newRates[index].minFee = e.target.value
                          setFeeRatesFormData(newRates)
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SheetFooter className="flex gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEdit} className="bg-custom-green hover:bg-custom-green/90">
              保存
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>删除通道</DialogTitle>
            <DialogDescription>
              确定要删除通道 "{currentChannel?.name}" 吗？此操作不可恢复。
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

      {/* 接口选择弹窗 */}
      <Sheet open={isInterfaceSelectOpen} onOpenChange={setIsInterfaceSelectOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>选择接口</SheetTitle>
            <SheetDescription>从列表中选择一个支付接口</SheetDescription>
          </SheetHeader>
          
          {/* 使用中/未使用页签 */}
          <Tabs value={interfaceUsageFilter} onValueChange={(value) => setInterfaceUsageFilter(value as "使用中" | "未使用")} className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="使用中">使用中</TabsTrigger>
              <TabsTrigger value="未使用">未使用</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="py-6 space-y-4">
            {mockInterfaces
              .filter(item => {
                // 检查接口是否被通道使用（包括当前正在选择的接口）
                const isUsedInChannels = channels.some(ch => ch.interface === item.name)
                const isCurrentSelection = tempInterface === item.name
                const isUsed = isUsedInChannels || isCurrentSelection
                
                return interfaceUsageFilter === "使用中" ? isUsed : !isUsed
              })
              .map((item) => (
              <div
                key={item.id}
                className={`border rounded-lg p-4 ${
                  item.status === "inactive" 
                    ? "bg-gray-100 dark:bg-gray-800 opacity-60" 
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        item.status === "active" 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      }`}>
                        {item.status === "active" ? "启用" : "停用"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      代码: {item.code}
                    </p>
                  </div>
                  <Switch
                    checked={tempInterface === item.name}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setTempInterface(item.name)
                      }
                    }}
                    disabled={item.status === "inactive"}
                  />
                </div>
              </div>
            ))}
          </div>
          <SheetFooter className="flex gap-2 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => {
                setTempInterface(formData.interface)
                setIsInterfaceSelectOpen(false)
              }}
              className="flex-1"
            >
              取消
            </Button>
            <Button 
              onClick={() => {
                setFormData(prev => ({ ...prev, interface: tempInterface }))
                setIsInterfaceSelectOpen(false)
              }}
              className="bg-custom-green hover:bg-custom-green/90 flex-1"
            >
              确认
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
