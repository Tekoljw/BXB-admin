"use client"

import React, { useState } from "react"
import { Plus, Edit, Settings, Ban, Check, Eye, EyeOff, DollarSign, TrendingUp, MapPin, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadMoreButton } from "@/components/load-more-button"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
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

interface CustodialInterface {
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
  weight: number
}

const initialMockInterfaces: CustodialInterface[] = [
  {
    id: "CI001",
    providerId: "COBO001",
    providerName: "Cobo钱包",
    accountName: "cobo_custody_main",
    accountPhone: "+86 138 0000 0001",
    accountEmail: "custody@cobo.com",
    buyInterfaceCode: "COBO_CUSTODY_001",
    status: "active",
    createdAt: "2024-01-15 10:30:00",
    lastMonthFee: 25680.50,
    totalFee: 456789.30,
    appliedAddresses: 1000,
    usedAddresses: 857,
    weight: 30
  },
  {
    id: "CI002",
    providerId: "MATRIX001",
    providerName: "Matrixport钱包",
    accountName: "matrixport_custody_01",
    accountPhone: "+65 9123 4567",
    accountEmail: "custody@matrixport.com",
    buyInterfaceCode: "MATRIX_CUSTODY_001",
    status: "active",
    createdAt: "2024-02-20 14:15:00",
    lastMonthFee: 18960.20,
    totalFee: 328450.80,
    appliedAddresses: 800,
    usedAddresses: 645,
    weight: 25
  },
  {
    id: "CI003",
    providerId: "FIREBLOCKS001",
    providerName: "Fireblocks",
    accountName: "fireblocks_main_account",
    accountPhone: "+1 650 555 0001",
    accountEmail: "custody@fireblocks.com",
    buyInterfaceCode: "FIREBLOCKS_001",
    status: "active",
    createdAt: "2024-03-10 09:45:00",
    lastMonthFee: 32150.75,
    totalFee: 595620.40,
    appliedAddresses: 1500,
    usedAddresses: 1289,
    weight: 20
  },
  {
    id: "CI004",
    providerId: "CEFFU001",
    providerName: "Ceffu托管",
    accountName: "ceffu_custody_account",
    accountPhone: "+65 8765 4321",
    accountEmail: "custody@ceffu.com",
    buyInterfaceCode: "CEFFU_CUSTODY_001",
    status: "active",
    createdAt: "2024-04-05 16:20:00",
    lastMonthFee: 28420.75,
    totalFee: 512560.90,
    appliedAddresses: 1200,
    usedAddresses: 982,
    weight: 15
  },
  {
    id: "CI005",
    providerId: "BITGO001",
    providerName: "BitGo钱包",
    accountName: "bitgo_enterprise_01",
    accountPhone: "+1 408 555 0002",
    accountEmail: "enterprise@bitgo.com",
    buyInterfaceCode: "BITGO_CUSTODY_001",
    status: "active",
    createdAt: "2024-05-12 11:10:00",
    lastMonthFee: 21250.00,
    totalFee: 385870.20,
    appliedAddresses: 900,
    usedAddresses: 756,
    weight: 10
  },
  {
    id: "CI006",
    providerId: "GNOSIS001",
    providerName: "Gnosis Safe",
    accountName: "gnosis_safe_multisig",
    accountPhone: "+49 30 1234 5678",
    accountEmail: "custody@gnosis.io",
    buyInterfaceCode: "GNOSIS_SAFE_001",
    status: "inactive",
    createdAt: "2024-06-18 13:25:00",
    lastMonthFee: 0,
    totalFee: 128540.30,
    appliedAddresses: 600,
    usedAddresses: 600,
    weight: 0
  }
]

export default function CustodialInterfacesPage() {
  const [interfaces, setInterfaces] = useState<CustodialInterface[]>(initialMockInterfaces)
  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showConfigSheet, setShowConfigSheet] = useState(false)
  const [showDisableDialog, setShowDisableDialog] = useState(false)
  const [selectedInterface, setSelectedInterface] = useState<CustodialInterface | null>(null)
  const [editingWeightId, setEditingWeightId] = useState<string | null>(null)
  const [tempWeight, setTempWeight] = useState<string>("")
  
  const [newInterface, setNewInterface] = useState({
    providerId: "",
    providerName: "",
    weight: "0",
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

  const handleEdit = (item: CustodialInterface) => {
    setSelectedInterface(item)
    setNewInterface({
      providerId: item.providerId,
      providerName: item.providerName,
      weight: item.weight.toString(),
    })
    setShowEditDialog(true)
  }

  const handleConfig = (item: CustodialInterface) => {
    setSelectedInterface(item)
    setShowConfigSheet(true)
  }

  const handleDisable = (item: CustodialInterface) => {
    setSelectedInterface(item)
    setShowDisableDialog(true)
  }

  const handleAddInterface = () => {
    const newId = `CI${String(interfaces.length + 1).padStart(3, '0')}`
    const now = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-')
    
    const weight = parseInt(newInterface.weight) || 0
    const validWeight = Math.min(Math.max(weight, 0), 100)
    
    const newInterfaceData: CustodialInterface = {
      id: newId,
      providerId: newInterface.providerId,
      providerName: newInterface.providerName,
      accountName: "",
      accountPhone: "",
      accountEmail: "",
      buyInterfaceCode: "",
      status: "active",
      createdAt: now,
      lastMonthFee: 0,
      totalFee: 0,
      appliedAddresses: 0,
      usedAddresses: 0,
      weight: validWeight
    }
    
    setInterfaces([...interfaces, newInterfaceData])
    setShowAddDialog(false)
    setNewInterface({
      providerId: "",
      providerName: "",
      weight: "0",
    })
  }

  const handleSaveEdit = () => {
    if (!selectedInterface) return
    
    const weight = parseInt(newInterface.weight) || 0
    const validWeight = Math.min(Math.max(weight, 0), 100)
    
    setInterfaces(interfaces.map(item => 
      item.id === selectedInterface.id 
        ? {
            ...item,
            providerId: newInterface.providerId,
            providerName: newInterface.providerName,
            weight: validWeight,
          }
        : item
    ))
    
    setShowEditDialog(false)
    setSelectedInterface(null)
    setNewInterface({
      providerId: "",
      providerName: "",
      weight: "0",
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

  const handleStatusToggle = (item: CustodialInterface, checked: boolean) => {
    const newStatus = checked ? "active" : "suspended"
    setInterfaces(interfaces.map(i =>
      i.id === item.id ? { ...i, status: newStatus } : i
    ))
  }

  const handleWeightClick = (item: CustodialInterface) => {
    setEditingWeightId(item.id)
    setTempWeight(item.weight.toString())
  }

  const handleWeightBlur = (item: CustodialInterface) => {
    const weight = parseInt(tempWeight) || 0
    const validWeight = Math.min(Math.max(weight, 0), 100)
    
    setInterfaces(interfaces.map(i =>
      i.id === item.id ? { ...i, weight: validWeight } : i
    ))
    
    setEditingWeightId(null)
    setTempWeight("")
  }

  const handleWeightKeyDown = (e: React.KeyboardEvent, item: CustodialInterface) => {
    if (e.key === 'Enter') {
      handleWeightBlur(item)
    } else if (e.key === 'Escape') {
      setEditingWeightId(null)
      setTempWeight("")
    }
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">托管钱包接口管理</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              管理托管钱包接口和配置
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
            <SearchControls
              placeholder="搜索提供商名称、编号、账号或接口代码..."
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              onReset={handleReset}
              className="flex-1"
            />
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
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(item.status)}
                    <Switch
                      checked={item.status === "active"}
                      onCheckedChange={(checked) => handleStatusToggle(item, checked)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">分配权重：</span>
                    {editingWeightId === item.id ? (
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={tempWeight}
                        onChange={(e) => setTempWeight(e.target.value)}
                        onBlur={() => handleWeightBlur(item)}
                        onKeyDown={(e) => handleWeightKeyDown(e, item)}
                        className="w-16 h-7 text-xs text-center px-2"
                        autoFocus
                      />
                    ) : (
                      <span
                        onClick={() => handleWeightClick(item)}
                        className="w-16 h-7 text-xs font-semibold text-gray-900 dark:text-white flex items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded border border-gray-300 dark:border-gray-600"
                      >
                        {item.weight}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
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

      {filteredInterfaces.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <LoadMoreButton 
            totalCount={filteredInterfaces.length}
          />
        </div>
      )}

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>添加托管钱包接口</DialogTitle>
            <DialogDescription>
              填写以下信息以添加新的托管钱包接口
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>提供商编号 *</Label>
              <Input
                placeholder="例如: COBO001"
                value={newInterface.providerId}
                onChange={(e) => setNewInterface({ ...newInterface, providerId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>提供商名称 *</Label>
              <Input
                placeholder="例如: Cobo钱包"
                value={newInterface.providerName}
                onChange={(e) => setNewInterface({ ...newInterface, providerName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>分配权重 * (0-100)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="例如: 30"
                value={newInterface.weight}
                onChange={(e) => setNewInterface({ ...newInterface, weight: e.target.value })}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>编辑接口信息</DialogTitle>
            <DialogDescription>
              修改托管钱包接口的基本信息
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
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
              <Label>分配权重 * (0-100)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={newInterface.weight}
                onChange={(e) => setNewInterface({ ...newInterface, weight: e.target.value })}
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
