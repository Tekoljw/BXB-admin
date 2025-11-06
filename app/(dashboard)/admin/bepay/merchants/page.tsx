"use client"

import React, { useState } from "react"
import { Search, Plus, Edit, Trash2, Lock, Unlock, Settings } from "lucide-react"
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

interface Merchant {
  id: string
  name: string
  bxbUserId: string
  email: string
  phone: string
  apiKey: string
  balance: number
  frozenBalance: number
  totalOrders: number
  successRate: number
  collectionFee: string
  paymentFee: string
  status: "active" | "frozen" | "disabled"
  createdAt: string
}

const mockMerchants: Merchant[] = [
  {
    id: "M001",
    name: "优付商城",
    bxbUserId: "BXB001",
    email: "youfu@example.com",
    phone: "+86 138 0000 0001",
    apiKey: "sk_live_xxxxxxxxxxxxxx01",
    balance: 125000.50,
    frozenBalance: 0,
    totalOrders: 15234,
    successRate: 98.5,
    collectionFee: "0.5%",
    paymentFee: "0.3%",
    status: "active",
    createdAt: "2024-01-10 10:00:00"
  },
  {
    id: "M002",
    name: "快捷支付平台",
    bxbUserId: "BXB002",
    email: "kuaijie@example.com",
    phone: "+86 138 0000 0002",
    apiKey: "sk_live_xxxxxxxxxxxxxx02",
    balance: 89500.25,
    frozenBalance: 5000,
    totalOrders: 9876,
    successRate: 97.2,
    collectionFee: "0.6%",
    paymentFee: "0.4%",
    status: "active",
    createdAt: "2024-01-12 14:30:00"
  },
  {
    id: "M003",
    name: "云端收银",
    bxbUserId: "BXB003",
    email: "yunduan@example.com",
    phone: "+86 138 0000 0003",
    apiKey: "sk_live_xxxxxxxxxxxxxx03",
    balance: 45200.00,
    frozenBalance: 10000,
    totalOrders: 5432,
    successRate: 95.8,
    collectionFee: "0.5%",
    paymentFee: "0.3%",
    status: "frozen",
    createdAt: "2024-01-15 09:15:00"
  },
  {
    id: "M004",
    name: "星际支付",
    bxbUserId: "BXB004",
    email: "xingji@example.com",
    phone: "+86 138 0000 0004",
    apiKey: "sk_live_xxxxxxxxxxxxxx04",
    balance: 210000.75,
    frozenBalance: 0,
    totalOrders: 23456,
    successRate: 99.1,
    collectionFee: "0.4%",
    paymentFee: "0.2%",
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
  const [currentMerchant, setCurrentMerchant] = useState<Merchant | null>(null)
  const [freezeAmount, setFreezeAmount] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    bxbUserId: "",
    email: "",
    phone: "",
    collectionFee: "",
    paymentFee: "",
    status: "active" as "active" | "frozen" | "disabled"
  })

  const filteredMerchants = merchants.filter(merchant => 
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    const newMerchant: Merchant = {
      id: `M${String(merchants.length + 1).padStart(3, '0')}`,
      name: formData.name,
      bxbUserId: formData.bxbUserId,
      email: "",
      phone: "",
      apiKey: `sk_live_${Math.random().toString(36).substring(2, 18)}`,
      balance: 0,
      frozenBalance: 0,
      totalOrders: 0,
      successRate: 0,
      collectionFee: "0%",
      paymentFee: "0%",
      status: "active",
      createdAt: new Date().toLocaleString('zh-CN')
    }
    setMerchants([...merchants, newMerchant])
    setIsAddDialogOpen(false)
    resetForm()
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

  const handleUpdateFee = () => {
    if (currentMerchant) {
      setMerchants(merchants.map(m => 
        m.id === currentMerchant.id 
          ? { 
              ...m, 
              collectionFee: formData.collectionFee,
              paymentFee: formData.paymentFee
            } 
          : m
      ))
      setIsFeeConfigDialogOpen(false)
      setCurrentMerchant(null)
      resetForm()
    }
  }

  const openEditDialog = (merchant: Merchant) => {
    setCurrentMerchant(merchant)
    setFormData({
      name: merchant.name,
      email: merchant.email,
      phone: merchant.phone,
      collectionFee: merchant.collectionFee,
      paymentFee: merchant.paymentFee,
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
    setFormData({
      name: merchant.name,
      email: merchant.email,
      phone: merchant.phone,
      collectionFee: merchant.collectionFee,
      paymentFee: merchant.paymentFee,
      status: merchant.status
    })
    setIsFeeConfigDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      bxbUserId: "",
      email: "",
      phone: "",
      collectionFee: "",
      paymentFee: "",
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
          placeholder="搜索商户名称、邮箱或ID..."
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
                  成功率
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
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{merchant.id}</div>
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
                    <span className={`font-medium ${
                      merchant.successRate >= 98 ? "text-green-600 dark:text-green-400" :
                      merchant.successRate >= 95 ? "text-yellow-600 dark:text-yellow-400" :
                      "text-red-600 dark:text-red-400"
                    }`}>
                      {merchant.successRate}%
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      merchant.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : merchant.status === "frozen"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    }`}>
                      {merchant.status === "active" ? "正常" : merchant.status === "frozen" ? "冻结" : "禁用"}
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
              <Select value={formData.status} onValueChange={(value: "active" | "frozen" | "disabled") => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">正常</SelectItem>
                  <SelectItem value="frozen">冻结</SelectItem>
                  <SelectItem value="disabled">禁用</SelectItem>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>配置费率 - {currentMerchant?.name}</DialogTitle>
            <DialogDescription>设置商户的手续费率</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fee-collection">代收手续费</Label>
              <Input
                id="fee-collection"
                placeholder="例如：0.5%"
                value={formData.collectionFee}
                onChange={(e) => setFormData({...formData, collectionFee: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fee-payment">代付手续费</Label>
              <Input
                id="fee-payment"
                placeholder="例如：0.3%"
                value={formData.paymentFee}
                onChange={(e) => setFormData({...formData, paymentFee: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFeeConfigDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleUpdateFee} className="bg-custom-green hover:bg-custom-green/90">
              保存
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
