"use client"

import React, { useState } from "react"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"
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
    logo: "https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*3ijaRbx7JV0AAAAAAAAAAABkARQnAQ",
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
    logo: "https://www.wechat.com/app/img/logo.png",
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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("全部")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDemoDialogOpen, setIsDemoDialogOpen] = useState(false)
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null)
  const [isFeeRatesDialogOpen, setIsFeeRatesDialogOpen] = useState(false)
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
      feeRates: feeRatesFormData,
      createdAt: new Date().toLocaleString('zh-CN')
    }
    setChannels([...channels, newChannel])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (currentChannel) {
      setChannels(channels.map(c => 
        c.id === currentChannel.id ? { ...currentChannel, ...formData, feeRates: feeRatesFormData } : c
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
    setFeeRatesFormData(channel.feeRates)
    setIsEditDialogOpen(true)
  }

  const openFeeRatesDialog = (channel: Channel) => {
    setCurrentChannel(channel)
    setIsFeeRatesDialogOpen(true)
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
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">通道列表</h2>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-custom-green hover:bg-custom-green/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加通道
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="搜索通道名称、代码或接口..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  通道信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  币种
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  接口来源
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  阶梯费率
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
                      {channel.logo && (
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                          <Image 
                            src={channel.logo} 
                            alt={channel.name}
                            width={32}
                            height={32}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{channel.name}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{channel.displayName}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">ID: {channel.id} | {channel.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                      {channel.currency}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {channel.interface}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openFeeRatesDialog(channel)}
                      className="text-purple-600 hover:text-purple-800 dark:text-purple-400"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      查看三档费率
                    </Button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      channel.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    }`}>
                      {channel.status === "active" ? "启用" : "禁用"}
                    </span>
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
            <DialogTitle>添加通道</DialogTitle>
            <DialogDescription>添加新的支付通道</DialogDescription>
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
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-sm font-semibold">
                      第 {index + 1} 档
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      交易金额：{rate.minAmount.toLocaleString()} - {rate.maxAmount === Infinity ? '无上限' : rate.maxAmount.toLocaleString()}
                    </span>
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
            <DialogTitle>编辑通道</DialogTitle>
            <DialogDescription>修改通道配置信息</DialogDescription>
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
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-sm font-semibold">
                      第 {index + 1} 档
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      交易金额：{rate.minAmount.toLocaleString()} - {rate.maxAmount === Infinity ? '无上限' : rate.maxAmount.toLocaleString()}
                    </span>
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

      <Dialog open={isFeeRatesDialogOpen} onOpenChange={setIsFeeRatesDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>阶梯费率配置 - {currentChannel?.name}</DialogTitle>
            <DialogDescription>根据交易金额自动匹配对应档位的手续费率</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">阶梯费率说明：</p>
                  <ul className="space-y-1">
                    <li>• 系统根据订单金额自动匹配对应档位的费率</li>
                    <li>• 代收费率：用户向商户支付时收取的手续费（百分比）</li>
                    <li>• 最低代收费：单笔交易最低收取的代收手续费（固定金额）</li>
                    <li>• 代付费率：商户向用户付款时收取的手续费（百分比）</li>
                    <li>• 最低代付费：单笔交易最低收取的代付手续费（固定金额）</li>
                    <li>• 交易量越大，费率越低，鼓励大额交易</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {currentChannel?.feeRates.map((rate, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-sm font-semibold">
                    第 {index + 1} 档
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    交易金额范围：
                    <span className="font-medium text-gray-900 dark:text-white mx-1">
                      {rate.minAmount.toLocaleString()} - {rate.maxAmount === Infinity ? '无上限' : rate.maxAmount.toLocaleString()}
                    </span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                      代收费用
                    </h4>
                    <div className="space-y-1.5 pl-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">代收费率：</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">{rate.collectionFeeRate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">最低代收费：</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">{rate.minCollectionFee}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-orange-700 dark:text-orange-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                      代付费用
                    </h4>
                    <div className="space-y-1.5 pl-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">代付费率：</span>
                        <span className="font-semibold text-orange-600 dark:text-orange-400">{rate.paymentFeeRate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">最低代付费：</span>
                        <span className="font-semibold text-orange-600 dark:text-orange-400">{rate.minPaymentFee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFeeRatesDialogOpen(false)}>
              关闭
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
