"use client"

import React, { useState } from "react"
import { Search, Plus, Edit, Settings, Ban, Check, X, Eye, EyeOff } from "lucide-react"
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
}

const initialMockInterfaces: CustodialInterface[] = [
  {
    id: "CI001",
    providerId: "PRV001",
    providerName: "BePay托管钱包",
    accountName: "service_account_001",
    accountPhone: "+86 138 0000 0001",
    accountEmail: "account001@bepay.com",
    buyInterfaceCode: "BEPAY_BUY_USDT_001",
    status: "active",
    createdAt: "2024-01-15 10:30:00"
  },
  {
    id: "CI002",
    providerId: "PRV002",
    providerName: "快钱包",
    accountName: "service_account_002",
    accountPhone: "+86 138 0000 0002",
    accountEmail: "account002@quickwallet.com",
    buyInterfaceCode: "QUICK_BUY_USDT_002",
    status: "active",
    createdAt: "2024-02-20 14:15:00"
  },
  {
    id: "CI003",
    providerId: "PRV003",
    providerName: "云端钱包",
    accountName: "service_account_003",
    accountPhone: "+86 138 0000 0003",
    accountEmail: "account003@cloudwallet.com",
    buyInterfaceCode: "CLOUD_BUY_USDT_003",
    status: "inactive",
    createdAt: "2024-03-10 09:45:00"
  },
  {
    id: "CI004",
    providerId: "PRV004",
    providerName: "极速钱包",
    accountName: "service_account_004",
    accountPhone: "+86 138 0000 0004",
    accountEmail: "account004@speedwallet.com",
    buyInterfaceCode: "SPEED_BUY_USDT_004",
    status: "active",
    createdAt: "2024-04-05 16:20:00"
  },
  {
    id: "CI005",
    providerId: "PRV005",
    providerName: "安全钱包",
    accountName: "service_account_005",
    accountPhone: "+86 138 0000 0005",
    accountEmail: "account005@securewallet.com",
    buyInterfaceCode: "SECURE_BUY_USDT_005",
    status: "suspended",
    createdAt: "2024-05-12 11:10:00"
  },
  {
    id: "CI006",
    providerId: "PRV006",
    providerName: "智付钱包",
    accountName: "service_account_006",
    accountPhone: "+86 138 0000 0006",
    accountEmail: "account006@smartpay.com",
    buyInterfaceCode: "SMART_BUY_USDT_006",
    status: "active",
    createdAt: "2024-06-18 13:25:00"
  }
]

export default function CustodialInterfacesPage() {
  const [interfaces, setInterfaces] = useState<CustodialInterface[]>(initialMockInterfaces)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showConfigSheet, setShowConfigSheet] = useState(false)
  const [showDisableDialog, setShowDisableDialog] = useState(false)
  const [selectedInterface, setSelectedInterface] = useState<CustodialInterface | null>(null)
  
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

  const handleEdit = (item: CustodialInterface) => {
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
    
    const newInterfaceData: CustodialInterface = {
      id: newId,
      providerId: newInterface.providerId,
      providerName: newInterface.providerName,
      accountName: newInterface.accountName,
      accountPhone: newInterface.accountPhone,
      accountEmail: newInterface.accountEmail,
      buyInterfaceCode: newInterface.buyInterfaceCode,
      status: "active",
      createdAt: now
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">托管钱包接口管理</h1>
          <Button onClick={() => setShowAddDialog(true)} className="bg-custom-green hover:bg-custom-green/90">
            <Plus className="w-4 h-4 mr-2" />
            添加接口
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">接口总数</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{interfaces.length}</h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">正常运行</p>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                {interfaces.filter(i => i.status === "active").length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已停用</p>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {interfaces.filter(i => i.status === "inactive").length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已暂停</p>
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
                {interfaces.filter(i => i.status === "suspended").length}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
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
                  <SelectValue />
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    提供商编号
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    提供商名称
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    账号
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    手机号
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    邮箱
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    买币接口代码
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    创建日期
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredInterfaces.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.providerId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.providerName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.accountName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.accountPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.accountEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {item.buyInterfaceCode}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {item.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleConfig(item)}
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDisable(item)}
                          className={
                            item.status === "inactive"
                              ? "text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                              : "text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          }
                        >
                          {item.status === "inactive" ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <Ban className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInterfaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">没有找到符合条件的接口</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>添加托管钱包接口</DialogTitle>
            <DialogDescription>
              填写以下信息以添加新的托管钱包接口
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
                placeholder="例如: BePay托管钱包"
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
                placeholder="例如: BEPAY_BUY_USDT_001"
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
              修改托管钱包接口的基本信息
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
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>基础配置</SheetTitle>
            <SheetDescription>
              配置 {selectedInterface?.providerName} 的接口参数
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">API配置</h3>
              <div className="space-y-2">
                <Label>API密钥</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>API Secret</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>回调地址</Label>
                <Input placeholder="https://api.example.com/callback" />
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">交易配置</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>单笔最小金额 (USDT)</Label>
                  <Input type="number" placeholder="10" />
                </div>
                <div className="space-y-2">
                  <Label>单笔最大金额 (USDT)</Label>
                  <Input type="number" placeholder="50000" />
                </div>
                <div className="space-y-2">
                  <Label>手续费率 (%)</Label>
                  <Input type="number" step="0.01" placeholder="0.5" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">功能开关</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>启用自动确认</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">自动确认买币订单</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>启用风控检测</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">对交易进行风险检测</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>启用限额保护</Label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">超额自动拒绝订单</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setShowConfigSheet(false)}>
              取消
            </Button>
            <Button onClick={() => setShowConfigSheet(false)} className="bg-custom-green hover:bg-custom-green/90">
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
                ? `确定要启用 ${selectedInterface?.providerName} 的接口吗？`
                : `确定要停用 ${selectedInterface?.providerName} 的接口吗？停用后将无法使用该接口进行交易。`
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
              {selectedInterface?.status === "inactive" ? "确认启用" : "确认停用"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
