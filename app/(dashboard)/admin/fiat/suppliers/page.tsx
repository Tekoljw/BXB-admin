"use client"

import React, { useState } from "react"
import { Eye, Search, RotateCcw, Edit, Check, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ChannelCost {
  channelName: string
  interface: string
  feeRate: string
  minFee: string
}

interface Supplier {
  id: number
  tgid: string
  name: string
  tgAccount: string
  status: "active" | "inactive" | "suspended"
  merchantId: string
  apiKey: string
  supportedInterfaces: string[]
  supportedMerchants: string[]
  balances: Array<{ currency: string; deposit: string; pending: string }>
  channelCosts: ChannelCost[]
}

const mockInterfaces = [
  { id: "IF001", name: "Bitzpay", status: "active" },
  { id: "IF002", name: "BePayOTC", status: "active" },
  { id: "IF003", name: "CFpay", status: "active" },
  { id: "IF004", name: "PayTrust", status: "active" },
  { id: "IF005", name: "FastPay", status: "active" },
]

const mockSuppliers: Supplier[] = [
  {
    id: 1,
    tgid: "TG001",
    name: "供应商A",
    tgAccount: "@supplier_a",
    status: "active",
    merchantId: "MERCHANT_A_001",
    apiKey: "sk_live_abc123xyz456",
    supportedInterfaces: ["Bitzpay", "BePayOTC", "CFpay"],
    supportedMerchants: ["云端收银", "星际支付", "月光商户"],
    balances: [
      { currency: "USDT", deposit: "10,000", pending: "2,500" },
      { currency: "BTC", deposit: "1.5", pending: "0.3" },
      { currency: "CNY", deposit: "50,000", pending: "12,000" },
    ],
    channelCosts: [
      { channelName: "支付宝", interface: "Bitzpay", feeRate: "0.5%", minFee: "¥1.00" },
      { channelName: "微信支付", interface: "Bitzpay", feeRate: "0.5%", minFee: "¥1.00" },
      { channelName: "银行转账", interface: "BePayOTC", feeRate: "0.4%", minFee: "¥0.80" },
      { channelName: "PIX支付", interface: "BePayOTC", feeRate: "0.4%", minFee: "¥0.80" },
      { channelName: "云闪付", interface: "CFpay", feeRate: "0.6%", minFee: "¥1.20" },
      { channelName: "数字钱包", interface: "CFpay", feeRate: "0.6%", minFee: "¥1.20" },
    ],
  },
  {
    id: 2,
    tgid: "TG002",
    name: "供应商B",
    tgAccount: "@supplier_b",
    status: "active",
    merchantId: "MERCHANT_B_002",
    apiKey: "sk_live_def789uvw321",
    supportedInterfaces: ["Bitzpay", "PayTrust"],
    supportedMerchants: ["快捷支付", "安全商户"],
    balances: [
      { currency: "USDT", deposit: "25,000", pending: "5,000" },
      { currency: "ETH", deposit: "10.5", pending: "2.1" },
    ],
    channelCosts: [
      { channelName: "支付宝", interface: "Bitzpay", feeRate: "0.45%", minFee: "¥0.90" },
      { channelName: "微信支付", interface: "Bitzpay", feeRate: "0.45%", minFee: "¥0.90" },
      { channelName: "信用卡", interface: "PayTrust", feeRate: "0.55%", minFee: "¥1.10" },
      { channelName: "借记卡", interface: "PayTrust", feeRate: "0.55%", minFee: "¥1.10" },
    ],
  },
  {
    id: 3,
    tgid: "TG003",
    name: "供应商C",
    tgAccount: "@supplier_c",
    status: "inactive",
    merchantId: "MERCHANT_C_003",
    apiKey: "sk_live_ghi012rst654",
    supportedInterfaces: ["BePayOTC", "FastPay"],
    supportedMerchants: ["便利商户"],
    balances: [
      { currency: "USDT", deposit: "5,000", pending: "1,000" },
    ],
    channelCosts: [
      { channelName: "银行转账", interface: "BePayOTC", feeRate: "0.7%", minFee: "¥1.40" },
      { channelName: "PIX支付", interface: "BePayOTC", feeRate: "0.7%", minFee: "¥1.40" },
      { channelName: "PayPal", interface: "FastPay", feeRate: "0.5%", minFee: "¥1.00" },
    ],
  },
]

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers)
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isParamSheetOpen, setIsParamSheetOpen] = useState(false)
  const [isInterfaceSheetOpen, setIsInterfaceSheetOpen] = useState(false)
  const [isMerchantSheetOpen, setIsMerchantSheetOpen] = useState(false)
  const [isBalanceDialogOpen, setIsBalanceDialogOpen] = useState(false)
  const [isFeeSheetOpen, setIsFeeSheetOpen] = useState(false)
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [tempMerchantId, setTempMerchantId] = useState("")
  const [tempApiKey, setTempApiKey] = useState("")
  const [tempInterfaces, setTempInterfaces] = useState<string[]>([])
  const [selectedFeeInterface, setSelectedFeeInterface] = useState("全部")
  const [editingTgAccount, setEditingTgAccount] = useState<number | null>(null)
  const [tempTgAccount, setTempTgAccount] = useState("")
  const [newSupplierForm, setNewSupplierForm] = useState({
    tgid: "",
    name: "",
    tgAccount: "",
    merchantId: "",
    apiKey: "",
    status: "active" as "active" | "inactive" | "suspended"
  })

  const handleSearch = () => {
    setSearchTerm(searchInput)
  }

  const handleReset = () => {
    setSearchInput("")
    setSearchTerm("")
  }

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.tgid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.tgAccount.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openParamSheet = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setTempMerchantId(supplier.merchantId)
    setTempApiKey(supplier.apiKey)
    setIsParamSheetOpen(true)
  }

  const saveParams = () => {
    if (selectedSupplier) {
      setSuppliers(suppliers.map(s =>
        s.id === selectedSupplier.id
          ? { ...s, merchantId: tempMerchantId, apiKey: tempApiKey }
          : s
      ))
      setIsParamSheetOpen(false)
    }
  }

  const openInterfaceSheet = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setTempInterfaces([...supplier.supportedInterfaces])
    setIsInterfaceSheetOpen(true)
  }

  const toggleInterface = (interfaceName: string) => {
    setTempInterfaces(prev =>
      prev.includes(interfaceName)
        ? prev.filter(i => i !== interfaceName)
        : [...prev, interfaceName]
    )
  }

  const saveInterfaces = () => {
    if (selectedSupplier) {
      setSuppliers(suppliers.map(s =>
        s.id === selectedSupplier.id
          ? { ...s, supportedInterfaces: tempInterfaces }
          : s
      ))
      setIsInterfaceSheetOpen(false)
    }
  }

  const openMerchantSheet = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setIsMerchantSheetOpen(true)
  }

  const openBalanceDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setIsBalanceDialogOpen(true)
  }

  const openFeeSheet = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    setSelectedFeeInterface("全部")
    setIsFeeSheetOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "活跃"
      case "inactive":
        return "停用"
      case "suspended":
        return "暂停"
      default:
        return status
    }
  }

  const startEditTgAccount = (supplierId: number, currentTgAccount: string) => {
    setEditingTgAccount(supplierId)
    setTempTgAccount(currentTgAccount)
  }

  const saveTgAccount = () => {
    if (editingTgAccount !== null) {
      setSuppliers(suppliers.map(s =>
        s.id === editingTgAccount
          ? { ...s, tgAccount: tempTgAccount }
          : s
      ))
      setEditingTgAccount(null)
      setTempTgAccount("")
    }
  }

  const cancelEditTgAccount = () => {
    setEditingTgAccount(null)
    setTempTgAccount("")
  }

  const openAddSheet = () => {
    setNewSupplierForm({
      tgid: "",
      name: "",
      tgAccount: "",
      merchantId: "",
      apiKey: "",
      status: "active"
    })
    setIsAddSheetOpen(true)
  }

  const addSupplier = () => {
    if (!newSupplierForm.tgid || !newSupplierForm.name || !newSupplierForm.tgAccount) {
      alert("请填写TGID、供应商名称和TG账号")
      return
    }

    const maxId = suppliers.length ? Math.max(...suppliers.map(s => s.id)) : 0
    const newId = maxId + 1
    const newSupplier: Supplier = {
      id: newId,
      tgid: newSupplierForm.tgid,
      name: newSupplierForm.name,
      tgAccount: newSupplierForm.tgAccount,
      status: newSupplierForm.status,
      merchantId: newSupplierForm.merchantId,
      apiKey: newSupplierForm.apiKey,
      supportedInterfaces: [],
      supportedMerchants: [],
      balances: [],
      channelCosts: []
    }
    setSuppliers([...suppliers, newSupplier])
    setIsAddSheetOpen(false)
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      <div className="max-w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">供应商管理</h1>
          <Button
            onClick={openAddSheet}
            className="bg-custom-green hover:bg-custom-green/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            添加供应商
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索供应商名称、TGID或TG账号..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-custom-green"
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
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">TGID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">TG账号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">参数配置</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">支持接口</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">支持商户</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">余额查询</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">费率成本</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {supplier.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {supplier.tgid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {supplier.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {editingTgAccount === supplier.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={tempTgAccount}
                            onChange={(e) => setTempTgAccount(e.target.value)}
                            className="h-8 text-sm py-1 px-2 w-32"
                            placeholder="TG账号"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveTgAccount()
                              else if (e.key === 'Escape') cancelEditTgAccount()
                            }}
                          />
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600" onClick={saveTgAccount}>
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500" onClick={cancelEditTgAccount}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div 
                          className="text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 group"
                          onClick={() => startEditTgAccount(supplier.id, supplier.tgAccount)}
                        >
                          <span>{supplier.tgAccount}</span>
                          <Edit className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(supplier.status)}`}>
                        {getStatusText(supplier.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openParamSheet(supplier)}
                        className="inline-flex items-center gap-1 text-sm text-custom-green hover:text-custom-green/80 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>编辑</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openInterfaceSheet(supplier)}
                        className="inline-flex items-center gap-1 text-sm text-custom-green hover:text-custom-green/80 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>管理</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openMerchantSheet(supplier)}
                        className="inline-flex items-center gap-1 text-sm text-custom-green hover:text-custom-green/80 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>查看</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openBalanceDialog(supplier)}
                        className="inline-flex items-center gap-1 text-sm text-custom-green hover:text-custom-green/80 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>查询</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openFeeSheet(supplier)}
                        className="inline-flex items-center gap-1 text-sm text-custom-green hover:text-custom-green/80 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>查看</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              暂无数据
            </div>
          )}
        </div>
      </div>

      <Sheet open={isParamSheetOpen} onOpenChange={setIsParamSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>参数配置</SheetTitle>
            <SheetDescription>
              编辑供应商 {selectedSupplier?.name} 的参数配置
            </SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="merchantId">供应商ID</Label>
              <Input
                id="merchantId"
                value={tempMerchantId}
                onChange={(e) => setTempMerchantId(e.target.value)}
                placeholder="输入供应商ID..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">BePay供应商系统API密钥</Label>
              <Input
                id="apiKey"
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="输入BePay供应商系统API密钥..."
              />
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsParamSheetOpen(false)}>
              取消
            </Button>
            <Button onClick={saveParams} className="bg-custom-green hover:bg-custom-green/90">
              保存
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={isInterfaceSheetOpen} onOpenChange={setIsInterfaceSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>支持接口管理</SheetTitle>
            <SheetDescription>
              管理供应商 {selectedSupplier?.name} 支持的接口
            </SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-3">
            {mockInterfaces.map((iface) => (
              <div
                key={iface.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{iface.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">ID: {iface.id}</div>
                </div>
                <Switch
                  checked={tempInterfaces.includes(iface.name)}
                  onCheckedChange={() => toggleInterface(iface.name)}
                />
              </div>
            ))}
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsInterfaceSheetOpen(false)}>
              取消
            </Button>
            <Button onClick={saveInterfaces} className="bg-custom-green hover:bg-custom-green/90">
              保存
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={isMerchantSheetOpen} onOpenChange={setIsMerchantSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>支持的商户</SheetTitle>
            <SheetDescription>
              供应商 {selectedSupplier?.name} 当前支持的商户列表
            </SheetDescription>
          </SheetHeader>
          <div className="py-6">
            {selectedSupplier && selectedSupplier.supportedMerchants.length > 0 ? (
              <div className="space-y-2">
                {selectedSupplier.supportedMerchants.map((merchant, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{merchant}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                暂无支持的商户
              </div>
            )}
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsMerchantSheetOpen(false)}>
              关闭
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog open={isBalanceDialogOpen} onOpenChange={setIsBalanceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>余额查询</DialogTitle>
            <DialogDescription>
              供应商 {selectedSupplier?.name} 的各币种余额详情
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedSupplier && selectedSupplier.balances.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">币种</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">保证金</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">待结算金额</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {selectedSupplier.balances.map((balance, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{balance.currency}</td>
                        <td className="px-4 py-3 text-sm text-right text-green-600 dark:text-green-400 font-medium">{balance.deposit}</td>
                        <td className="px-4 py-3 text-sm text-right text-orange-600 dark:text-orange-400 font-medium">{balance.pending}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                暂无余额数据
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={isFeeSheetOpen} onOpenChange={setIsFeeSheetOpen}>
        <SheetContent className="sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>费率成本</SheetTitle>
            <SheetDescription>
              供应商 {selectedSupplier?.name} 各支付通道的成本费率（数据从供应商后台获取，仅供参考）
            </SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-4">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-semibold">提示：</span>以下费率数据从供应商后台实时同步获取，仅供查看，无法在此处修改。
              </p>
            </div>

            <Tabs value={selectedFeeInterface} onValueChange={setSelectedFeeInterface}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="全部">全部</TabsTrigger>
                <TabsTrigger value="Bitzpay">Bitzpay</TabsTrigger>
                <TabsTrigger value="BePayOTC">BePayOTC</TabsTrigger>
                <TabsTrigger value="CFpay">CFpay</TabsTrigger>
              </TabsList>
            </Tabs>

            {selectedSupplier && selectedSupplier.channelCosts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">通道名称</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">接口来源</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">手续费率</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">单笔最低手续费</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {selectedSupplier.channelCosts
                      .filter(cost => selectedFeeInterface === "全部" || cost.interface === selectedFeeInterface)
                      .map((cost, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/30'}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{cost.channelName}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{cost.interface}</td>
                          <td className="px-4 py-3 text-sm text-right text-yellow-600 dark:text-yellow-400 font-medium">{cost.feeRate}</td>
                          <td className="px-4 py-3 text-sm text-right text-yellow-600 dark:text-yellow-400 font-medium">{cost.minFee}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                暂无通道成本数据
              </div>
            )}
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsFeeSheetOpen(false)}>
              关闭
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>添加供应商</SheetTitle>
            <SheetDescription>
              填写新供应商的基本信息
            </SheetDescription>
          </SheetHeader>
          <div className="py-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-tgid">TGID</Label>
              <Input
                id="add-tgid"
                value={newSupplierForm.tgid}
                onChange={(e) => setNewSupplierForm({...newSupplierForm, tgid: e.target.value})}
                placeholder="例如：TG004"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-name">供应商名称</Label>
              <Input
                id="add-name"
                value={newSupplierForm.name}
                onChange={(e) => setNewSupplierForm({...newSupplierForm, name: e.target.value})}
                placeholder="例如：供应商D"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-tgAccount">TG账号</Label>
              <Input
                id="add-tgAccount"
                value={newSupplierForm.tgAccount}
                onChange={(e) => setNewSupplierForm({...newSupplierForm, tgAccount: e.target.value})}
                placeholder="例如：@supplier_d"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-merchantId">供应商ID</Label>
              <Input
                id="add-merchantId"
                value={newSupplierForm.merchantId}
                onChange={(e) => setNewSupplierForm({...newSupplierForm, merchantId: e.target.value})}
                placeholder="输入供应商ID..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-apiKey">BePay供应商系统API密钥</Label>
              <Input
                id="add-apiKey"
                type="password"
                value={newSupplierForm.apiKey}
                onChange={(e) => setNewSupplierForm({...newSupplierForm, apiKey: e.target.value})}
                placeholder="输入BePay供应商系统API密钥..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-status">状态</Label>
              <select
                id="add-status"
                value={newSupplierForm.status}
                onChange={(e) => setNewSupplierForm({...newSupplierForm, status: e.target.value as "active" | "inactive" | "suspended"})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-custom-green"
              >
                <option value="active">活跃</option>
                <option value="inactive">停用</option>
                <option value="suspended">暂停</option>
              </select>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsAddSheetOpen(false)}>
              取消
            </Button>
            <Button onClick={addSupplier} className="bg-custom-green hover:bg-custom-green/90">
              添加
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
