"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Search, Plus, Eye, Edit, Trash2, Smartphone, Mail, Code } from "lucide-react"
import LoadMoreButton from "@/components/load-more-button"

// 数据类型定义
interface CustodialWallet {
  id: string
  providerId: string
  providerName: string
  accountNumber: string
  phone: string
  email: string
  buyInterfaceCode: string
  status: "active" | "inactive"
  createdAt: string
}

// 模拟数据
const mockData: CustodialWallet[] = [
  {
    id: "CW001",
    providerId: "PROV-001",
    providerName: "火币钱包",
    accountNumber: "HB2024001",
    phone: "+86 138-0000-1234",
    email: "wallet01@huobi.com",
    buyInterfaceCode: "HUOBI_BUY_V1",
    status: "active",
    createdAt: "2024-01-15 10:30:00"
  },
  {
    id: "CW002",
    providerId: "PROV-002",
    providerName: "币安钱包",
    accountNumber: "BN2024002",
    phone: "+86 139-0000-5678",
    email: "wallet02@binance.com",
    buyInterfaceCode: "BINANCE_BUY_V2",
    status: "active",
    createdAt: "2024-01-16 14:20:00"
  },
  {
    id: "CW003",
    providerId: "PROV-003",
    providerName: "OKX钱包",
    accountNumber: "OKX2024003",
    phone: "+86 136-0000-9012",
    email: "wallet03@okx.com",
    buyInterfaceCode: "OKX_BUY_V1",
    status: "inactive",
    createdAt: "2024-01-17 09:15:00"
  },
  {
    id: "CW004",
    providerId: "PROV-004",
    providerName: "Gate钱包",
    accountNumber: "GT2024004",
    phone: "+86 137-0000-3456",
    email: "wallet04@gate.io",
    buyInterfaceCode: "GATE_BUY_V1",
    status: "active",
    createdAt: "2024-01-18 16:45:00"
  },
  {
    id: "CW005",
    providerId: "PROV-005",
    providerName: "Kraken钱包",
    accountNumber: "KR2024005",
    phone: "+1 415-555-0100",
    email: "wallet05@kraken.com",
    buyInterfaceCode: "KRAKEN_BUY_V1",
    status: "active",
    createdAt: "2024-01-19 11:20:00"
  },
  {
    id: "CW006",
    providerId: "PROV-006",
    providerName: "Coinbase钱包",
    accountNumber: "CB2024006",
    phone: "+1 650-555-0200",
    email: "wallet06@coinbase.com",
    buyInterfaceCode: "COINBASE_BUY_V2",
    status: "inactive",
    createdAt: "2024-01-20 13:50:00"
  },
  {
    id: "CW007",
    providerId: "PROV-007",
    providerName: "Bitfinex钱包",
    accountNumber: "BF2024007",
    phone: "+852 2000-1234",
    email: "wallet07@bitfinex.com",
    buyInterfaceCode: "BITFINEX_BUY_V1",
    status: "active",
    createdAt: "2024-01-21 08:30:00"
  },
  {
    id: "CW008",
    providerId: "PROV-008",
    providerName: "Bybit钱包",
    accountNumber: "BY2024008",
    phone: "+65 6000-5678",
    email: "wallet08@bybit.com",
    buyInterfaceCode: "BYBIT_BUY_V1",
    status: "active",
    createdAt: "2024-01-22 15:10:00"
  }
]

export default function CustodialWalletsPage() {
  const [wallets] = useState<CustodialWallet[]>(mockData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  
  // Sheet 编辑弹窗
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<CustodialWallet | null>(null)
  
  // Dialog 详情弹窗
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  
  // 表单数据
  const [formData, setFormData] = useState({
    providerId: "",
    providerName: "",
    accountNumber: "",
    phone: "",
    email: "",
    buyInterfaceCode: "",
    status: "active" as "active" | "inactive"
  })

  // 筛选数据
  const filteredWallets = wallets.filter(wallet => {
    const matchesSearch = 
      wallet.providerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.phone.includes(searchTerm) ||
      wallet.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.buyInterfaceCode.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || wallet.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // 打开添加弹窗
  const openAddSheet = () => {
    setFormData({
      providerId: "",
      providerName: "",
      accountNumber: "",
      phone: "",
      email: "",
      buyInterfaceCode: "",
      status: "active"
    })
    setIsAddSheetOpen(true)
  }

  // 打开编辑弹窗
  const openEditSheet = (wallet: CustodialWallet) => {
    setSelectedWallet(wallet)
    setFormData({
      providerId: wallet.providerId,
      providerName: wallet.providerName,
      accountNumber: wallet.accountNumber,
      phone: wallet.phone,
      email: wallet.email,
      buyInterfaceCode: wallet.buyInterfaceCode,
      status: wallet.status
    })
    setIsEditSheetOpen(true)
  }

  // 打开详情弹窗
  const openDetailDialog = (wallet: CustodialWallet) => {
    setSelectedWallet(wallet)
    setIsDetailDialogOpen(true)
  }

  // 保存添加
  const handleAdd = () => {
    console.log("添加托管钱包接口:", formData)
    setIsAddSheetOpen(false)
  }

  // 保存编辑
  const handleEdit = () => {
    console.log("编辑托管钱包接口:", formData)
    setIsEditSheetOpen(false)
  }

  // 删除
  const handleDelete = (wallet: CustodialWallet) => {
    if (confirm(`确定要删除提供商 "${wallet.providerName}" 的托管钱包接口吗？`)) {
      console.log("删除托管钱包接口:", wallet.id)
    }
  }

  // 切换状态
  const toggleStatus = (wallet: CustodialWallet) => {
    const newStatus = wallet.status === "active" ? "inactive" : "active"
    console.log(`切换 ${wallet.providerName} 状态为:`, newStatus)
  }

  return (
    <div className="p-6">
      {/* 页面标题 */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">托管钱包接口</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              管理第三方托管钱包接口配置和账户信息
            </p>
          </div>
          <Button onClick={openAddSheet} className="bg-custom-green hover:bg-green-600">
            <Plus className="w-4 h-4 mr-2" />
            添加接口
          </Button>
        </div>
      </div>

      {/* 筛选和搜索 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 搜索框 */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索提供商编号、账号、手机号、邮箱、接口代码..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* 状态筛选 */}
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              size="sm"
            >
              全部
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              onClick={() => setStatusFilter("active")}
              size="sm"
              className={statusFilter === "active" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              启用
            </Button>
            <Button
              variant={statusFilter === "inactive" ? "default" : "outline"}
              onClick={() => setStatusFilter("inactive")}
              size="sm"
              className={statusFilter === "inactive" ? "bg-gray-600 hover:bg-gray-700" : ""}
            >
              停用
            </Button>
          </div>
        </div>
      </div>

      {/* 数据表格 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  提供商编号
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  提供商名称
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  提供商账号
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  联系方式
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  买币接口代码
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  创建日期
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredWallets.map((wallet) => (
                <tr key={wallet.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {wallet.providerId}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {wallet.providerName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {wallet.accountNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Smartphone className="w-3 h-3 text-gray-400" />
                        <span>{wallet.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs">{wallet.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1">
                      <Code className="w-3 h-3 text-blue-500" />
                      <code className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                        {wallet.buyInterfaceCode}
                      </code>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        wallet.status === "active"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                      }`}>
                        {wallet.status === "active" ? "启用" : "停用"}
                      </span>
                      <Switch
                        checked={wallet.status === "active"}
                        onCheckedChange={() => toggleStatus(wallet)}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {wallet.createdAt}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetailDialog(wallet)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        title="查看详情"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditSheet(wallet)}
                        className="text-custom-green hover:text-green-700 dark:text-green-400"
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(wallet)}
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

        {filteredWallets.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            暂无数据
          </div>
        )}

        {filteredWallets.length > 0 && <LoadMoreButton />}
      </div>

      {/* 添加接口 Sheet */}
      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>添加托管钱包接口</SheetTitle>
            <SheetDescription>添加新的第三方托管钱包接口配置</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-providerId">提供商编号 *</Label>
                <Input
                  id="add-providerId"
                  placeholder="如: PROV-009"
                  value={formData.providerId}
                  onChange={(e) => setFormData({...formData, providerId: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-providerName">提供商名称 *</Label>
                <Input
                  id="add-providerName"
                  placeholder="如: 火币钱包"
                  value={formData.providerName}
                  onChange={(e) => setFormData({...formData, providerName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-accountNumber">提供商账号 *</Label>
              <Input
                id="add-accountNumber"
                placeholder="如: HB2024009"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-phone">账号手机号 *</Label>
                <Input
                  id="add-phone"
                  placeholder="如: +86 138-0000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-email">账号邮箱 *</Label>
                <Input
                  id="add-email"
                  type="email"
                  placeholder="如: wallet@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-buyInterfaceCode">买币接口代码 *</Label>
              <Input
                id="add-buyInterfaceCode"
                placeholder="如: HUOBI_BUY_V1"
                value={formData.buyInterfaceCode}
                onChange={(e) => setFormData({...formData, buyInterfaceCode: e.target.value})}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                接口代码用于系统内部调用识别，建议使用大写字母和下划线
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <div>
                <Label htmlFor="add-status" className="text-base">接口状态</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  启用后该接口将可用于买币交易
                </p>
              </div>
              <Switch
                id="add-status"
                checked={formData.status === "active"}
                onCheckedChange={(checked) => setFormData({...formData, status: checked ? "active" : "inactive"})}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddSheetOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAdd} className="bg-custom-green hover:bg-green-600">
              确认添加
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* 编辑接口 Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>编辑托管钱包接口</SheetTitle>
            <SheetDescription>修改托管钱包接口配置信息</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-providerId">提供商编号 *</Label>
                <Input
                  id="edit-providerId"
                  value={formData.providerId}
                  onChange={(e) => setFormData({...formData, providerId: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-providerName">提供商名称 *</Label>
                <Input
                  id="edit-providerName"
                  value={formData.providerName}
                  onChange={(e) => setFormData({...formData, providerName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-accountNumber">提供商账号 *</Label>
              <Input
                id="edit-accountNumber"
                value={formData.accountNumber}
                onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-phone">账号手机号 *</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">账号邮箱 *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-buyInterfaceCode">买币接口代码 *</Label>
              <Input
                id="edit-buyInterfaceCode"
                value={formData.buyInterfaceCode}
                onChange={(e) => setFormData({...formData, buyInterfaceCode: e.target.value})}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                接口代码用于系统内部调用识别，建议使用大写字母和下划线
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <div>
                <Label htmlFor="edit-status" className="text-base">接口状态</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  启用后该接口将可用于买币交易
                </p>
              </div>
              <Switch
                id="edit-status"
                checked={formData.status === "active"}
                onCheckedChange={(checked) => setFormData({...formData, status: checked ? "active" : "inactive"})}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsEditSheetOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEdit} className="bg-custom-green hover:bg-green-600">
              保存修改
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* 详情 Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>托管钱包接口详情</DialogTitle>
            <DialogDescription>查看托管钱包接口的完整信息</DialogDescription>
          </DialogHeader>
          {selectedWallet && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-500 dark:text-gray-400">接口ID</Label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedWallet.id}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-500 dark:text-gray-400">提供商编号</Label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedWallet.providerId}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-500 dark:text-gray-400">提供商名称</Label>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedWallet.providerName}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-500 dark:text-gray-400">提供商账号</Label>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedWallet.accountNumber}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-500 dark:text-gray-400">账号手机号</Label>
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-400" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedWallet.phone}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-500 dark:text-gray-400">账号邮箱</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedWallet.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-500 dark:text-gray-400">买币接口代码</Label>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-500" />
                  <code className="text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded font-mono">
                    {selectedWallet.buyInterfaceCode}
                  </code>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-500 dark:text-gray-400">接口状态</Label>
                  <p className="text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedWallet.status === "active"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                    }`}>
                      {selectedWallet.status === "active" ? "启用" : "停用"}
                    </span>
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-500 dark:text-gray-400">创建日期</Label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedWallet.createdAt}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
