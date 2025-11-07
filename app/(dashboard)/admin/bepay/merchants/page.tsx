"use client"

import React, { useState } from "react"
import { Search, Plus, Edit, Trash2, Lock, Unlock, Settings, Key, Eye } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ApiKey {
  keyId: string
  key: string
  callbackDomain: string
  createdAt: string
}

interface FeeConfig {
  id: string
  currency: string
  channel: string
  collectionFee: string
  paymentFee: string
  minCollectionFee: string
  minPaymentFee: string
}

interface Merchant {
  id: string
  name: string
  userId: string
  bxbUserId: string
  email: string
  phone: string
  apiKeys: ApiKey[]
  balance: number
  frozenBalance: number
  totalOrders: number
  feeConfigs: FeeConfig[]
  status: "active" | "frozen" | "disabled" | "domain_pending"
  createdAt: string
}

const mockMerchants: Merchant[] = [
  {
    id: "M001",
    name: "优付商城",
    userId: "U100001",
    bxbUserId: "BXB001",
    email: "youfu@example.com",
    phone: "+86 138 0000 0001",
    apiKeys: [
      {
        keyId: "KEY001",
        key: "sk_live_4f8a9b2c3d1e5f6g7h8i9j0k1l2m3n4o",
        callbackDomain: "https://api.youfu.com",
        createdAt: "2024-01-10 10:00:00"
      },
      {
        keyId: "KEY002",
        key: "sk_live_9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k",
        callbackDomain: "https://backup.youfu.com",
        createdAt: "2024-02-15 14:30:00"
      }
    ],
    balance: 125000.50,
    frozenBalance: 0,
    totalOrders: 15234,
    feeConfigs: [
      { id: "FC001", currency: "CNY", channel: "支付宝", collectionFee: "0.5%", paymentFee: "0.3%", minCollectionFee: "¥1.00", minPaymentFee: "¥0.50" },
      { id: "FC002", currency: "CNY", channel: "微信支付", collectionFee: "0.5%", paymentFee: "0.3%", minCollectionFee: "¥1.00", minPaymentFee: "¥0.50" },
      { id: "FC003", currency: "USD", channel: "Stripe", collectionFee: "2.9%", paymentFee: "2.5%", minCollectionFee: "$0.30", minPaymentFee: "$0.25" },
      { id: "FC004", currency: "USDT", channel: "TRC20", collectionFee: "1.0%", paymentFee: "0.8%", minCollectionFee: "1 USDT", minPaymentFee: "0.5 USDT" },
    ],
    status: "active",
    createdAt: "2024-01-10 10:00:00"
  },
  {
    id: "M002",
    name: "快捷支付平台",
    userId: "U100002",
    bxbUserId: "BXB002",
    email: "kuaijie@example.com",
    phone: "+86 138 0000 0002",
    apiKeys: [
      {
        keyId: "KEY003",
        key: "sk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
        callbackDomain: "https://api.kuaijie.com",
        createdAt: "2024-01-12 14:30:00"
      }
    ],
    balance: 89500.25,
    frozenBalance: 5000,
    totalOrders: 9876,
    feeConfigs: [
      { id: "FC005", currency: "CNY", channel: "支付宝", collectionFee: "0.6%", paymentFee: "0.4%", minCollectionFee: "¥1.20", minPaymentFee: "¥0.80" },
      { id: "FC006", currency: "CNY", channel: "微信支付", collectionFee: "0.6%", paymentFee: "0.4%", minCollectionFee: "¥1.20", minPaymentFee: "¥0.80" },
      { id: "FC007", currency: "CNY", channel: "云闪付", collectionFee: "0.55%", paymentFee: "0.35%", minCollectionFee: "¥1.10", minPaymentFee: "¥0.70" },
    ],
    status: "domain_pending",
    createdAt: "2024-01-12 14:30:00"
  },
  {
    id: "M003",
    name: "云端收银",
    userId: "U100003",
    bxbUserId: "BXB003",
    email: "yunduan@example.com",
    phone: "+86 138 0000 0003",
    apiKeys: [
      {
        keyId: "KEY004",
        key: "sk_live_q1w2e3r4t5y6u7i8o9p0a1s2d3f4g5h6",
        callbackDomain: "https://api.yunduan.com",
        createdAt: "2024-01-15 09:15:00"
      },
      {
        keyId: "KEY005",
        key: "sk_live_z9x8c7v6b5n4m3l2k1j0h9g8f7d6s5a4",
        callbackDomain: "https://webhook.yunduan.com",
        createdAt: "2024-03-01 11:20:00"
      },
      {
        keyId: "KEY006",
        key: "sk_live_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p",
        callbackDomain: "https://notify.yunduan.com",
        createdAt: "2024-04-10 16:45:00"
      }
    ],
    balance: 45200.00,
    frozenBalance: 10000,
    totalOrders: 5432,
    feeConfigs: [
      { id: "FC008", currency: "CNY", channel: "支付宝", collectionFee: "0.5%", paymentFee: "0.3%", minCollectionFee: "¥1.00", minPaymentFee: "¥0.50" },
      { id: "FC009", currency: "CNY", channel: "微信支付", collectionFee: "0.5%", paymentFee: "0.3%", minCollectionFee: "¥1.00", minPaymentFee: "¥0.50" },
      { id: "FC010", currency: "USDT", channel: "TRC20", collectionFee: "1.2%", paymentFee: "1.0%", minCollectionFee: "1.2 USDT", minPaymentFee: "1.0 USDT" },
      { id: "FC011", currency: "USDT", channel: "ERC20", collectionFee: "1.5%", paymentFee: "1.3%", minCollectionFee: "2.0 USDT", minPaymentFee: "1.5 USDT" },
    ],
    status: "frozen",
    createdAt: "2024-01-15 09:15:00"
  },
  {
    id: "M004",
    name: "星际支付",
    userId: "U100004",
    bxbUserId: "BXB004",
    email: "xingji@example.com",
    phone: "+86 138 0000 0004",
    apiKeys: [
      {
        keyId: "KEY007",
        key: "sk_live_7h6g5f4d3s2a1p0o9i8u7y6t5r4e3w2q",
        callbackDomain: "https://api.xingji.com",
        createdAt: "2024-01-08 16:45:00"
      }
    ],
    balance: 210000.75,
    frozenBalance: 0,
    totalOrders: 23456,
    feeConfigs: [
      { id: "FC012", currency: "CNY", channel: "支付宝", collectionFee: "0.4%", paymentFee: "0.2%", minCollectionFee: "¥0.80", minPaymentFee: "¥0.40" },
      { id: "FC013", currency: "CNY", channel: "微信支付", collectionFee: "0.4%", paymentFee: "0.2%", minCollectionFee: "¥0.80", minPaymentFee: "¥0.40" },
      { id: "FC014", currency: "CNY", channel: "银行卡", collectionFee: "0.45%", paymentFee: "0.25%", minCollectionFee: "¥0.90", minPaymentFee: "¥0.50" },
      { id: "FC015", currency: "USD", channel: "Stripe", collectionFee: "2.8%", paymentFee: "2.4%", minCollectionFee: "$0.30", minPaymentFee: "$0.25" },
      { id: "FC016", currency: "USDT", channel: "TRC20", collectionFee: "0.9%", paymentFee: "0.7%", minCollectionFee: "0.9 USDT", minPaymentFee: "0.7 USDT" },
    ],
    status: "active",
    createdAt: "2024-01-08 16:45:00"
  },
]

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>(mockMerchants)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false)
  const [isFreezeFundsDialogOpen, setIsFreezeFundsDialogOpen] = useState(false)
  const [isFeeConfigDialogOpen, setIsFeeConfigDialogOpen] = useState(false)
  const [isAddFeeConfigDialogOpen, setIsAddFeeConfigDialogOpen] = useState(false)
  const [isApiKeysDialogOpen, setIsApiKeysDialogOpen] = useState(false)
  const [currentMerchant, setCurrentMerchant] = useState<Merchant | null>(null)
  const [freezeAmount, setFreezeAmount] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    bxbUserId: "",
    email: "",
    phone: "",
    status: "active" as "active" | "frozen" | "disabled" | "domain_pending"
  })
  const [feeFormData, setFeeFormData] = useState({
    currency: "",
    channel: "",
    collectionFee: "",
    paymentFee: "",
    minCollectionFee: "",
    minPaymentFee: ""
  })
  const [activeCurrency, setActiveCurrency] = useState<string>("")

  const filteredMerchants = merchants.filter(merchant => 
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.userId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    const newMerchant: Merchant = {
      id: `M${String(merchants.length + 1).padStart(3, '0')}`,
      name: formData.name,
      userId: `U${String(100000 + merchants.length + 1)}`,
      bxbUserId: formData.bxbUserId,
      email: "",
      phone: "",
      apiKeys: [],
      balance: 0,
      frozenBalance: 0,
      totalOrders: 0,
      feeConfigs: [],
      status: "active",
      createdAt: new Date().toLocaleString('zh-CN')
    }
    setMerchants([...merchants, newMerchant])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const openApiKeysDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setIsApiKeysDialogOpen(true)
  }

  const handleEdit = () => {
    if (currentMerchant) {
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id ? { ...m, ...formData } : m
      ))
      setIsEditDialogOpen(false)
      setCurrentMerchant(null)
      resetForm()
    }
  }

  const handleDelete = () => {
    if (currentMerchant) {
      setMerchants(merchants.filter(m => m.id !== currentMerchant.id))
      setIsDeleteDialogOpen(false)
      setCurrentMerchant(null)
    }
  }

  const handleToggleFreeze = () => {
    if (currentMerchant) {
      const newStatus = currentMerchant.status === "frozen" ? "active" : "frozen"
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id ? { ...m, status: newStatus } : m
      ))
      setIsFreezeDialogOpen(false)
      setCurrentMerchant(null)
    }
  }

  const handleFreezeFunds = () => {
    if (currentMerchant && freezeAmount) {
      const amount = parseFloat(freezeAmount)
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id 
          ? { 
              ...m, 
              frozenBalance: m.frozenBalance + amount,
              balance: m.balance - amount
            } 
          : m
      ))
      setIsFreezeFundsDialogOpen(false)
      setCurrentMerchant(null)
      setFreezeAmount("")
    }
  }

  const openEditDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setFormData({
      name: merchant.name,
      email: merchant.email,
      phone: merchant.phone,
      bxbUserId: merchant.bxbUserId,
      status: merchant.status
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setIsDeleteDialogOpen(true)
  }

  const openFreezeDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setIsFreezeDialogOpen(true)
  }

  const openFreezeFundsDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setIsFreezeFundsDialogOpen(true)
  }

  const openFeeConfigDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    const currencies = Array.from(new Set(merchant.feeConfigs.map(fc => fc.currency)))
    setActiveCurrency(currencies[0] || "")
    setIsFeeConfigDialogOpen(true)
  }

  const openAddFeeConfigDialog = () => {
    setFeeFormData({
      currency: "",
      channel: "",
      collectionFee: "",
      paymentFee: "",
      minCollectionFee: "",
      minPaymentFee: ""
    })
    setIsAddFeeConfigDialogOpen(true)
  }

  const handleAddFeeConfig = () => {
    if (currentMerchant) {
      const newFeeConfig: FeeConfig = {
        id: `FC${String(Date.now()).slice(-3)}`,
        currency: feeFormData.currency,
        channel: feeFormData.channel,
        collectionFee: feeFormData.collectionFee,
        paymentFee: feeFormData.paymentFee,
        minCollectionFee: feeFormData.minCollectionFee,
        minPaymentFee: feeFormData.minPaymentFee
      }
      const updatedFeeConfigs = [...currentMerchant.feeConfigs, newFeeConfig]
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id 
          ? { ...m, feeConfigs: updatedFeeConfigs }
          : m
      ))
      setCurrentMerchant({
        ...currentMerchant,
        feeConfigs: updatedFeeConfigs
      })
      if (!Array.from(new Set(currentMerchant.feeConfigs.map(fc => fc.currency))).includes(feeFormData.currency)) {
        setActiveCurrency(feeFormData.currency)
      }
      setIsAddFeeConfigDialogOpen(false)
      setFeeFormData({
        currency: "",
        channel: "",
        collectionFee: "",
        paymentFee: "",
        minCollectionFee: "",
        minPaymentFee: ""
      })
    }
  }

  const handleUpdateFeeConfig = (configId: string, field: keyof FeeConfig, value: string) => {
    if (currentMerchant) {
      const updatedConfigs = currentMerchant.feeConfigs.map(fc =>
        fc.id === configId ? { ...fc, [field]: value } : fc
      )
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id 
          ? { ...m, feeConfigs: updatedConfigs }
          : m
      ))
      setCurrentMerchant({
        ...currentMerchant,
        feeConfigs: updatedConfigs
      })
    }
  }

  const handleDeleteFeeConfig = (feeConfigId: string) => {
    if (currentMerchant) {
      const updatedFeeConfigs = currentMerchant.feeConfigs.filter(fc => fc.id !== feeConfigId)
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id 
          ? { ...m, feeConfigs: updatedFeeConfigs }
          : m
      ))
      setCurrentMerchant({
        ...currentMerchant,
        feeConfigs: updatedFeeConfigs
      })
      const remainingCurrencies = Array.from(new Set(updatedFeeConfigs.map(fc => fc.currency)))
      if (!remainingCurrencies.includes(activeCurrency) && remainingCurrencies.length > 0) {
        setActiveCurrency(remainingCurrencies[0])
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      bxbUserId: "",
      email: "",
      phone: "",
      status: "active"
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">商户列表</h2>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-custom-green hover:bg-custom-green/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加商户
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="搜索商户名称、邮箱、商户ID或UserID..."
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
                  商户信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  联系方式
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  账户余额
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  密钥
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
              {filteredMerchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">{merchant.name}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      商户ID: {merchant.id}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                      UserID: {merchant.userId}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="text-gray-900 dark:text-gray-300">{merchant.email}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{merchant.phone}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="text-gray-900 dark:text-gray-300">可用: ${merchant.balance.toLocaleString()}</div>
                    <div className={`text-xs mt-1 ${merchant.frozenBalance > 0 ? "text-red-600 dark:text-red-400 font-medium" : "text-gray-500 dark:text-gray-400"}`}>
                      冻结: ${merchant.frozenBalance.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openApiKeysDialog(merchant)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    >
                      <Key className="w-4 h-4 mr-1" />
                      查看密钥 ({merchant.apiKeys.length})
                    </Button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      merchant.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : merchant.status === "frozen"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : merchant.status === "domain_pending"
                        ? "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    }`}>
                      {merchant.status === "active" ? "正常" : 
                       merchant.status === "frozen" ? "冻结" : 
                       merchant.status === "domain_pending" ? "新域名待审核" : "禁用"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(merchant)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openFeeConfigDialog(merchant)}
                        className="text-purple-600 hover:text-purple-800 dark:text-purple-400"
                        title="配置费率"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openFreezeFundsDialog(merchant)}
                        className="text-orange-600 hover:text-orange-800 dark:text-orange-400"
                        title="冻结资金"
                      >
                        <Lock className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openFreezeDialog(merchant)}
                        className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400"
                        title={merchant.status === "frozen" ? "解冻商户" : "冻结商户"}
                      >
                        {merchant.status === "frozen" ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(merchant)}
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

        {filteredMerchants.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            暂无数据
          </div>
        )}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>添加商户</DialogTitle>
            <DialogDescription>添加新的商户账户</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">商户名称</Label>
              <Input
                id="name"
                placeholder="请输入商户名称"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bxbUserId">BXB UserID</Label>
              <Input
                id="bxbUserId"
                placeholder="请输入BXB UserID"
                value={formData.bxbUserId}
                onChange={(e) => setFormData({...formData, bxbUserId: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              取消
            </Button>
            <Button 
              onClick={handleAdd} 
              className="bg-custom-green hover:bg-custom-green/90"
              disabled={!formData.name || !formData.bxbUserId}
            >
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑商户</DialogTitle>
            <DialogDescription>修改商户信息</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">商户名称</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">联系邮箱</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">联系电话</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">状态</Label>
              <Select value={formData.status} onValueChange={(value: "active" | "frozen" | "disabled" | "domain_pending") => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">正常</SelectItem>
                  <SelectItem value="frozen">冻结</SelectItem>
                  <SelectItem value="disabled">禁用</SelectItem>
                  <SelectItem value="domain_pending">新域名待审核</SelectItem>
                </SelectContent>
              </Select>
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

      <Dialog open={isFeeConfigDialogOpen} onOpenChange={setIsFeeConfigDialogOpen}>
        <DialogContent className="max-w-7xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>配置费率 - {currentMerchant?.name}</DialogTitle>
            <DialogDescription>
              商户ID: {currentMerchant?.id} | 按币种和支付通道设置不同的手续费率
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {currentMerchant?.feeConfigs && currentMerchant.feeConfigs.length > 0 ? (
              <Tabs value={activeCurrency} onValueChange={setActiveCurrency}>
                <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${Array.from(new Set(currentMerchant.feeConfigs.map(fc => fc.currency))).length}, 1fr)` }}>
                  {Array.from(new Set(currentMerchant.feeConfigs.map(fc => fc.currency))).map(currency => (
                    <TabsTrigger key={currency} value={currency}>
                      {currency}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {Array.from(new Set(currentMerchant.feeConfigs.map(fc => fc.currency))).map(currency => (
                  <TabsContent key={currency} value={currency} className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                          <tr>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                              支付通道
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                              代收费率
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                              最低代收费
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                              代付费率
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                              最低代付费
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600">
                              操作
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {currentMerchant.feeConfigs.filter(fc => fc.currency === currency).map((config) => (
                            <tr key={config.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 font-medium">
                                {config.channel}
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={config.collectionFee}
                                  onChange={(e) => handleUpdateFeeConfig(config.id, 'collectionFee', e.target.value)}
                                  className="h-8 text-sm w-24 text-green-600 dark:text-green-400 font-semibold"
                                  placeholder="0.5%"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={config.minCollectionFee}
                                  onChange={(e) => handleUpdateFeeConfig(config.id, 'minCollectionFee', e.target.value)}
                                  className="h-8 text-sm w-28 text-green-600 dark:text-green-400"
                                  placeholder="¥1.00"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={config.paymentFee}
                                  onChange={(e) => handleUpdateFeeConfig(config.id, 'paymentFee', e.target.value)}
                                  className="h-8 text-sm w-24 text-orange-600 dark:text-orange-400 font-semibold"
                                  placeholder="0.3%"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <Input
                                  value={config.minPaymentFee}
                                  onChange={(e) => handleUpdateFeeConfig(config.id, 'minPaymentFee', e.target.value)}
                                  className="h-8 text-sm w-28 text-orange-600 dark:text-orange-400"
                                  placeholder="¥0.50"
                                />
                              </td>
                              <td className="px-3 py-3 whitespace-nowrap text-sm">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                                  onClick={() => handleDeleteFeeConfig(config.id)}
                                >
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  删除
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                该商户暂无费率配置
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">费率说明</h4>
                  <ul className="mt-2 text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• 不同币种和支付通道可以设置不同的费率</li>
                    <li>• 代收费率：用户向商户支付时收取的手续费（百分比）</li>
                    <li>• 最低代收费：单笔交易最低收取的手续费（固定金额）</li>
                    <li>• 代付费率：商户向用户付款时收取的手续费（百分比）</li>
                    <li>• 最低代付费：单笔交易最低收取的手续费（固定金额）</li>
                    <li>• 直接在输入框中修改费率，实时保存</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFeeConfigDialogOpen(false)}>
              关闭
            </Button>
            <Button className="bg-custom-green hover:bg-custom-green/90" onClick={openAddFeeConfigDialog}>
              <Plus className="w-4 h-4 mr-1" />
              添加费率配置
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddFeeConfigDialogOpen} onOpenChange={setIsAddFeeConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>添加费率配置</DialogTitle>
            <DialogDescription>
              为商户 {currentMerchant?.name} 添加新的币种和通道费率配置
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-currency">币种 *</Label>
                <Select value={feeFormData.currency} onValueChange={(value) => setFeeFormData({...feeFormData, currency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择币种" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CNY">CNY</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-channel">支付通道 *</Label>
                <Select value={feeFormData.channel} onValueChange={(value) => setFeeFormData({...feeFormData, channel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择通道" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="支付宝">支付宝</SelectItem>
                    <SelectItem value="微信支付">微信支付</SelectItem>
                    <SelectItem value="银行卡">银行卡</SelectItem>
                    <SelectItem value="云闪付">云闪付</SelectItem>
                    <SelectItem value="Stripe">Stripe</SelectItem>
                    <SelectItem value="PayPal">PayPal</SelectItem>
                    <SelectItem value="TRC20">TRC20</SelectItem>
                    <SelectItem value="ERC20">ERC20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-collection-fee">代收费率 *</Label>
                <Input
                  id="add-collection-fee"
                  placeholder="例如：0.5%"
                  value={feeFormData.collectionFee}
                  onChange={(e) => setFeeFormData({...feeFormData, collectionFee: e.target.value})}
                />
                <p className="text-xs text-gray-500">百分比费率</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-min-collection-fee">最低代收费 *</Label>
                <Input
                  id="add-min-collection-fee"
                  placeholder="例如：¥1.00"
                  value={feeFormData.minCollectionFee}
                  onChange={(e) => setFeeFormData({...feeFormData, minCollectionFee: e.target.value})}
                />
                <p className="text-xs text-gray-500">单笔最低手续费</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-payment-fee">代付费率 *</Label>
                <Input
                  id="add-payment-fee"
                  placeholder="例如：0.3%"
                  value={feeFormData.paymentFee}
                  onChange={(e) => setFeeFormData({...feeFormData, paymentFee: e.target.value})}
                />
                <p className="text-xs text-gray-500">百分比费率</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-min-payment-fee">最低代付费 *</Label>
                <Input
                  id="add-min-payment-fee"
                  placeholder="例如：¥0.50"
                  value={feeFormData.minPaymentFee}
                  onChange={(e) => setFeeFormData({...feeFormData, minPaymentFee: e.target.value})}
                />
                <p className="text-xs text-gray-500">单笔最低手续费</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddFeeConfigDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAddFeeConfig} className="bg-custom-green hover:bg-custom-green/90">
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFreezeFundsDialogOpen} onOpenChange={setIsFreezeFundsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>冻结资金 - {currentMerchant?.name}</DialogTitle>
            <DialogDescription>
              可用余额: ${currentMerchant?.balance.toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="freeze-amount">冻结金额</Label>
              <Input
                id="freeze-amount"
                type="number"
                placeholder="请输入冻结金额"
                value={freezeAmount}
                onChange={(e) => setFreezeAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFreezeFundsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleFreezeFunds} className="bg-orange-600 hover:bg-orange-700">
              冻结
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFreezeDialogOpen} onOpenChange={setIsFreezeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentMerchant?.status === "frozen" ? "解冻" : "冻结"}商户
            </DialogTitle>
            <DialogDescription>
              确定要{currentMerchant?.status === "frozen" ? "解冻" : "冻结"}商户 "{currentMerchant?.name}" 吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFreezeDialogOpen(false)}>
              取消
            </Button>
            <Button 
              onClick={handleToggleFreeze}
              className={currentMerchant?.status === "frozen" 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-yellow-600 hover:bg-yellow-700"
              }
            >
              {currentMerchant?.status === "frozen" ? "解冻" : "冻结"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isApiKeysDialogOpen} onOpenChange={setIsApiKeysDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>密钥管理 - {currentMerchant?.name}</DialogTitle>
            <DialogDescription>
              商户ID: {currentMerchant?.id} | UserID: {currentMerchant?.userId} | 共 {currentMerchant?.apiKeys.length} 个密钥
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {currentMerchant?.apiKeys && currentMerchant.apiKeys.length > 0 ? (
              <div className="space-y-4">
                {currentMerchant.apiKeys.map((apiKey) => (
                  <div 
                    key={apiKey.keyId} 
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-xs text-gray-500 dark:text-gray-400">密钥ID</Label>
                          <div className="mt-1 font-mono text-sm text-gray-900 dark:text-white">
                            {apiKey.keyId}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500 dark:text-gray-400">创建时间</Label>
                          <div className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                            {apiKey.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-gray-500 dark:text-gray-400">API密钥</Label>
                          <div className="mt-1 font-mono text-xs bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white break-all">
                            {apiKey.key}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500 dark:text-gray-400">回调主域名</Label>
                          <div className="mt-1 text-sm bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600">
                            <a 
                              href={apiKey.callbackDomain} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                            >
                              {apiKey.callbackDomain}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                该商户暂无密钥
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApiKeysDialogOpen(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>删除商户</DialogTitle>
            <DialogDescription>
              确定要删除商户 "{currentMerchant?.name}" 吗？此操作不可恢复。
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
    </div>
  )
}
