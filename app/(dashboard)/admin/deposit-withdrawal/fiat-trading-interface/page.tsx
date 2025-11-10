"use client"

import React, { useState } from "react"
import { Search, Plus, Edit, Settings, Ban, Check, Eye, EyeOff, DollarSign, TrendingUp, MapPin, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
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
import { Switch } from "@/components/ui/switch"

interface FiatTradingInterface {
  id: string
  providerId: string
  providerName: string
  accountName: string
  accountPhone: string
  accountEmail: string
  buyInterfaceCode: string
  status: "active" | "inactive" | "suspended"
  createdAt: string
  lastMonthFee: number
  totalFee: number
  appliedAddresses: number
  usedAddresses: number
}

const initialMockInterfaces: FiatTradingInterface[] = [
  {
    id: "FI001",
    providerId: "PRV001",
    providerName: "Bitzpay买卖接口",
    accountName: "service_account_001",
    accountPhone: "+86 138 0000 0001",
    accountEmail: "account001@bitzpay.com",
    buyInterfaceCode: "BITZPAY_FIAT_001",
    status: "active",
    createdAt: "2024-01-15 10:30:00",
    lastMonthFee: 12580.50,
    totalFee: 256789.30,
    appliedAddresses: 500,
    usedAddresses: 387
  },
  {
    id: "FI002",
    providerId: "PRV002",
    providerName: "BePayOTC买卖接口",
    accountName: "service_account_002",
    accountPhone: "+86 138 0000 0002",
    accountEmail: "account002@bepayotc.com",
    buyInterfaceCode: "BEPAYOTC_FIAT_002",
    status: "active",
    createdAt: "2024-02-20 14:15:00",
    lastMonthFee: 8960.20,
    totalFee: 178450.80,
    appliedAddresses: 300,
    usedAddresses: 245
  },
  {
    id: "FI003",
    providerId: "PRV003",
    providerName: "CFpay买卖接口",
    accountName: "service_account_003",
    accountPhone: "+86 138 0000 0003",
    accountEmail: "account003@cfpay.com",
    buyInterfaceCode: "CFPAY_FIAT_003",
    status: "inactive",
    createdAt: "2024-03-10 09:45:00",
    lastMonthFee: 0,
    totalFee: 95620.40,
    appliedAddresses: 200,
    usedAddresses: 200
  },
  {
    id: "FI004",
    providerId: "PRV004",
    providerName: "PayPal买卖接口",
    accountName: "service_account_004",
    accountPhone: "+86 138 0000 0004",
    accountEmail: "account004@paypal-trading.com",
    buyInterfaceCode: "PAYPAL_FIAT_004",
    status: "active",
    createdAt: "2024-04-05 16:20:00",
    lastMonthFee: 15420.75,
    totalFee: 312560.90,
    appliedAddresses: 800,
    usedAddresses: 652
  },
  {
    id: "FI005",
    providerId: "PRV005",
    providerName: "Stripe买卖接口",
    accountName: "service_account_005",
    accountPhone: "+86 138 0000 0005",
    accountEmail: "account005@stripe-trading.com",
    buyInterfaceCode: "STRIPE_FIAT_005",
    status: "suspended",
    createdAt: "2024-05-12 11:10:00",
    lastMonthFee: 3250.00,
    totalFee: 45870.20,
    appliedAddresses: 150,
    usedAddresses: 98
  },
  {
    id: "FI006",
    providerId: "PRV006",
    providerName: "Alipay买卖接口",
    accountName: "service_account_006",
    accountPhone: "+86 138 0000 0006",
    accountEmail: "account006@alipay-trading.com",
    buyInterfaceCode: "ALIPAY_FIAT_006",
    status: "active",
    createdAt: "2024-06-18 13:25:00",
    lastMonthFee: 9870.60,
    totalFee: 198540.30,
    appliedAddresses: 400,
    usedAddresses: 321
  }
]

export default function FiatTradingInterfacePage() {
  const [interfaces, setInterfaces] = useState<FiatTradingInterface[]>(initialMockInterfaces)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showConfigSheet, setShowConfigSheet] = useState(false)
  const [showDisableDialog, setShowDisableDialog] = useState(false)
  const [selectedInterface, setSelectedInterface] = useState<FiatTradingInterface | null>(null)
  
  const [newInterface, setNewInterface] = useState({
    providerId: "",
    providerName: "",
    accountName: "",
    accountPhone: "",
    accountEmail: "",
    buyInterfaceCode: "",
  })

  const filteredInterfaces = interfaces.filter(item => {
    const matchesSearch = 
      item.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.providerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.buyInterfaceCode.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <Check className="w-3 h-3 mr-1" />
          正常
        </span>
      case "inactive":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
          <EyeOff className="w-3 h-3 mr-1" />
          停用
        </span>
      case "suspended":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          <Ban className="w-3 h-3 mr-1" />
          暂停
        </span>
      default:
        return null
    }
  }

  const handleEdit = (item: FiatTradingInterface) => {
    setSelectedInterface(item)
    setNewInterface({
      providerId: item.providerId,
      providerName: item.providerName,
      accountName: item.accountName,
      accountPhone: item.accountPhone,
      accountEmail: item.accountEmail,
      buyInterfaceCode: item.buyInterfaceCode,
    })
    setShowEditDialog(true)
  }

  const handleConfig = (item: FiatTradingInterface) => {
    setSelectedInterface(item)
    setShowConfigSheet(true)
  }

  const handleDisable = (item: FiatTradingInterface) => {
    setSelectedInterface(item)
    setShowDisableDialog(true)
  }

  const handleAddInterface = () => {
    const newId = `FI${String(interfaces.length + 1).padStart(3, '0')}`
    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-')
    
    const newInterfaceData: FiatTradingInterface = {
      id: newId,
      providerId: newInterface.providerId,
      providerName: newInterface.providerName,
      accountName: newInterface.accountName,
      accountPhone: newInterface.accountPhone,
      accountEmail: newInterface.accountEmail,
      buyInterfaceCode: newInterface.buyInterfaceCode,
      status: "active",
      createdAt: now,
      lastMonthFee: 0,
      totalFee: 0,
      appliedAddresses: 0,
      usedAddresses: 0
    }
    
    setInterfaces([...interfaces, newInterfaceData])
    setShowAddDialog(false)
    setNewInterface({
      providerId: "",
      providerName: "",
      accountName: "",
      accountPhone: "",
      accountEmail: "",
      buyInterfaceCode: "",
    })
  }

  const handleSaveEdit = () => {
    if (!selectedInterface) return
    
    setInterfaces(interfaces.map(item => 
      item.id === selectedInterface.id 
        ? {
            ...item,
            providerId: newInterface.providerId,
            providerName: newInterface.providerName,
            accountName: newInterface.accountName,
            accountPhone: newInterface.accountPhone,
            accountEmail: newInterface.accountEmail,
            buyInterfaceCode: newInterface.buyInterfaceCode,
          }
        : item
    ))
    
    setShowEditDialog(false)
    setSelectedInterface(null)
    setNewInterface({
      providerId: "",
      providerName: "",
      accountName: "",
      accountPhone: "",
      accountEmail: "",
      buyInterfaceCode: "",
    })
  }

  const handleToggleStatus = () => {
    if (!selectedInterface) return
    
    const newStatus = selectedInterface.status === "inactive" ? "active" : "inactive"
    
    setInterfaces(interfaces.map(item =>
      item.id === selectedInterface.id
        ? { ...item, status: newStatus }
        : item
    ))
    
    setShowDisableDialog(false)
    setSelectedInterface(null)
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">法币买卖接口管理</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              管理法币买卖接口和配置
            </p>
          </div>
          <Button onClick={() => setShowAddDialog(true)} className="bg-custom-green hover:bg-custom-green/90">
            <Plus className="w-4 h-4 mr-2" />
            添加接口
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索提供商名称、编号、账号或接口代码..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="状态筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部状态</SelectItem>
                <SelectItem value="active">正常</SelectItem>
                <SelectItem value="inactive">停用</SelectItem>
                <SelectItem value="suspended">暂停</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInterfaces.map((item) => (
          <Card key={item.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {item.providerName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.providerId}
                  </p>
                </div>
                {getStatusBadge(item.status)}
              </div>

              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">账号信息</p>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">{item.accountName}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.accountPhone}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.accountEmail}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">买币接口代码</p>
                    <p className="text-xs font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded break-all">
                      {item.buyInterfaceCode}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">上月费用</p>
                    </div>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      ${item.lastMonthFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">总费用</p>
                    </div>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      ${item.totalFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">已申请地址</p>
                    </div>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {item.appliedAddresses.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">已使用地址</p>
                    </div>
                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                      {item.usedAddresses.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    创建时间：{item.createdAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(item)}
                  className="flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  编辑
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConfig(item)}
                  className="flex-1 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  配置
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDisable(item)}
                  className={
                    item.status === "inactive"
                      ? "flex-1 text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                      : "flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  }
                >
                  {item.status === "inactive" ? (
                    <>
                      <Eye className="w-4 h-4 mr-1" />
                      启用
                    </>
                  ) : (
                    <>
                      <Ban className="w-4 h-4 mr-1" />
                      停用
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredInterfaces.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">没有找到符合条件的接口</p>
        </div>
      )}

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>添加法币买卖接口</DialogTitle>
            <DialogDescription>
              填写以下信息以添加新的法币买卖接口
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>提供商编号 *</Label>
              <Input
                placeholder="例如: PRV001"
                value={newInterface.providerId}
                onChange={(e) => setNewInterface({ ...newInterface, providerId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>提供商名称 *</Label>
              <Input
                placeholder="例如: Bitzpay买卖接口"
                value={newInterface.providerName}
                onChange={(e) => setNewInterface({ ...newInterface, providerName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>账号名称 *</Label>
              <Input
                placeholder="例如: service_account_001"
                value={newInterface.accountName}
                onChange={(e) => setNewInterface({ ...newInterface, accountName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>账号手机号 *</Label>
              <Input
                placeholder="例如: +86 138 0000 0001"
                value={newInterface.accountPhone}
                onChange={(e) => setNewInterface({ ...newInterface, accountPhone: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>账号邮箱 *</Label>
              <Input
                type="email"
                placeholder="例如: account@example.com"
                value={newInterface.accountEmail}
                onChange={(e) => setNewInterface({ ...newInterface, accountEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>买币接口代码 *</Label>
              <Input
                placeholder="例如: BITZPAY_FIAT_001"
                value={newInterface.buyInterfaceCode}
                onChange={(e) => setNewInterface({ ...newInterface, buyInterfaceCode: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              取消
            </Button>
            <Button onClick={handleAddInterface} className="bg-custom-green hover:bg-custom-green/90">
              添加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>编辑接口信息</DialogTitle>
            <DialogDescription>
              修改法币买卖接口的基本信息
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>提供商编号 *</Label>
              <Input
                value={newInterface.providerId}
                onChange={(e) => setNewInterface({ ...newInterface, providerId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>提供商名称 *</Label>
              <Input
                value={newInterface.providerName}
                onChange={(e) => setNewInterface({ ...newInterface, providerName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>账号名称 *</Label>
              <Input
                value={newInterface.accountName}
                onChange={(e) => setNewInterface({ ...newInterface, accountName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>账号手机号 *</Label>
              <Input
                value={newInterface.accountPhone}
                onChange={(e) => setNewInterface({ ...newInterface, accountPhone: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>账号邮箱 *</Label>
              <Input
                type="email"
                value={newInterface.accountEmail}
                onChange={(e) => setNewInterface({ ...newInterface, accountEmail: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>买币接口代码 *</Label>
              <Input
                value={newInterface.buyInterfaceCode}
                onChange={(e) => setNewInterface({ ...newInterface, buyInterfaceCode: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              取消
            </Button>
            <Button onClick={handleSaveEdit} className="bg-custom-green hover:bg-custom-green/90">
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={showConfigSheet} onOpenChange={setShowConfigSheet}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>接口基础配置</SheetTitle>
            <SheetDescription>
              配置 {selectedInterface?.providerName} 的基本参数
            </SheetDescription>
          </SheetHeader>
          {selectedInterface && (
            <div className="space-y-4 py-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">API配置</h3>
                <div className="space-y-2">
                  <Label>API密钥</Label>
                  <Input type="password" placeholder="输入API密钥" />
                </div>
                <div className="space-y-2">
                  <Label>API端点URL</Label>
                  <Input placeholder="https://api.example.com" />
                </div>
                <div className="space-y-2">
                  <Label>超时时间（秒）</Label>
                  <Input type="number" placeholder="30" defaultValue="30" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">费率配置</h3>
                <div className="space-y-2">
                  <Label>手续费率 (%)</Label>
                  <Input type="number" step="0.01" placeholder="0.5" defaultValue="0.5" />
                </div>
                <div className="space-y-2">
                  <Label>最低手续费 (USDT)</Label>
                  <Input type="number" step="0.01" placeholder="1.0" defaultValue="1.0" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">限额配置</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>单笔最小金额 (USDT)</Label>
                    <Input type="number" placeholder="10" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label>单笔最大金额 (USDT)</Label>
                    <Input type="number" placeholder="50000" defaultValue="50000" />
                  </div>
                  <div className="space-y-2">
                    <Label>日累计限额 (USDT)</Label>
                    <Input type="number" placeholder="100000" defaultValue="100000" />
                  </div>
                  <div className="space-y-2">
                    <Label>月累计限额 (USDT)</Label>
                    <Input type="number" placeholder="1000000" defaultValue="1000000" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">通知配置</h3>
                <div className="flex items-center justify-between">
                  <Label>启用订单通知</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>启用异常通知</Label>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>通知邮箱</Label>
                  <Input type="email" placeholder="notify@example.com" />
                </div>
              </div>
            </div>
          )}
          <SheetFooter>
            <Button variant="outline" onClick={() => setShowConfigSheet(false)}>
              取消
            </Button>
            <Button
              onClick={() => {
                setShowConfigSheet(false)
              }}
              className="bg-custom-green hover:bg-custom-green/90"
            >
              保存配置
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={showDisableDialog} onOpenChange={setShowDisableDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedInterface?.status === "inactive" ? "启用接口" : "停用接口"}
            </DialogTitle>
            <DialogDescription>
              {selectedInterface?.status === "inactive" 
                ? `确定要启用 ${selectedInterface?.providerName} 吗？启用后该接口将可以正常使用。`
                : `确定要停用 ${selectedInterface?.providerName} 吗？停用后该接口将无法使用。`
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisableDialog(false)}>
              取消
            </Button>
            <Button
              onClick={handleToggleStatus}
              className={
                selectedInterface?.status === "inactive"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }
            >
              确定{selectedInterface?.status === "inactive" ? "启用" : "停用"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
