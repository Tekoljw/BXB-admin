"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { 
  Search, 
  Network,
  Eye,
  TrendingUp,
  Globe,
  Settings,
  Plus,
  Trash2,
  Check,
  X,
  RotateCcw
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SupplierConfig {
  supplierId: string
  supplierName: string
  upstreamMerchantId?: string
  hostApi?: string
  apiKey?: string
  customCode?: string
}

interface PaymentInterface {
  id: string
  name: string
  code: string
  description: string
  status: "active" | "inactive"
  type: "OTC" | "三方支付" | "四方支付" | "加密货币托管钱包"
  isUsed: boolean
  channelCount: number
  currencyCount: number
  createdAt: string
  supportedCurrencies: string[]
  supportedChannels: {
    name: string
    code: string
    type: string
  }[]
  supplierConfigs?: SupplierConfig[]
}

const mockSuppliers = [
  { id: "SUP001", name: "供应商A", tgAccount: "@supplier_a" },
  { id: "SUP002", name: "供应商B", tgAccount: "@supplier_b" },
  { id: "SUP003", name: "供应商C", tgAccount: "@supplier_c" },
  { id: "SUP004", name: "供应商D", tgAccount: "@supplier_d" },
]

export default function InterfacesPage() {
  const [searchInput, setSearchInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currencyFilter, setCurrencyFilter] = useState<string>("all")
  
  const handleSearch = () => {
    setSearchTerm(searchInput)
  }
  
  const handleReset = () => {
    setSearchInput("")
    setSearchTerm("")
  }
  const [isSupplierConfigDialogOpen, setIsSupplierConfigDialogOpen] = useState(false)
  const [currentConfigInterface, setCurrentConfigInterface] = useState<PaymentInterface | null>(null)
  const [supplierConfigs, setSupplierConfigs] = useState<SupplierConfig[]>([])
  const [expandedSuppliers, setExpandedSuppliers] = useState<string[]>([])
  const [enabledSuppliers, setEnabledSuppliers] = useState<string[]>([])
  const [editingNameId, setEditingNameId] = useState<string | null>(null)
  const [editingNameValue, setEditingNameValue] = useState("")
  const [editingDescId, setEditingDescId] = useState<string | null>(null)
  const [editingDescValue, setEditingDescValue] = useState("")
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedInterface, setSelectedInterface] = useState<PaymentInterface | null>(null)
  
  const [interfaces, setInterfaces] = useState<PaymentInterface[]>([
    {
      id: "IF001",
      name: "Bitzpay",
      code: "BITZPAY",
      description: "专业的数字货币支付接口",
      status: "active",
      type: "四方支付",
      isUsed: true,
      channelCount: 8,
      currencyCount: 5,
      createdAt: "2024-01-10",
      supportedCurrencies: ["CNY", "USD", "BRL", "INR", "EUR"],
      supportedChannels: [
        { name: "支付宝", code: "ALIPAY", type: "代收" },
        { name: "微信支付", code: "WECHAT", type: "代收" },
        { name: "银行卡", code: "BANKCARD", type: "代收" },
        { name: "Pix", code: "PIX", type: "代收" },
        { name: "UPI", code: "UPI", type: "代收" },
        { name: "银行转账", code: "BANK_TRANSFER", type: "代付" },
        { name: "快捷支付", code: "QUICK_PAY", type: "代付" },
        { name: "钱包", code: "WALLET", type: "代付" }
      ]
    },
    {
      id: "IF002",
      name: "BePayOTC",
      code: "BEPAY_OTC",
      description: "场外交易支付接口",
      status: "active",
      type: "OTC",
      isUsed: true,
      channelCount: 6,
      currencyCount: 4,
      createdAt: "2024-01-15",
      supportedCurrencies: ["CNY", "USD", "BRL", "INR"],
      supportedChannels: [
        { name: "银行卡", code: "BANKCARD", type: "代收" },
        { name: "支付宝", code: "ALIPAY", type: "代收" },
        { name: "微信支付", code: "WECHAT", type: "代收" },
        { name: "Pix", code: "PIX", type: "代收" },
        { name: "银行转账", code: "BANK_TRANSFER", type: "代付" },
        { name: "数字钱包", code: "DIGITAL_WALLET", type: "代付" }
      ]
    },
    {
      id: "IF003",
      name: "CFpay",
      code: "CFPAY",
      description: "跨境支付解决方案",
      status: "active",
      type: "三方支付",
      isUsed: false,
      channelCount: 10,
      currencyCount: 6,
      createdAt: "2024-01-20",
      supportedCurrencies: ["CNY", "USD", "BRL", "INR", "EUR", "GBP"],
      supportedChannels: [
        { name: "信用卡", code: "CREDIT_CARD", type: "代收" },
        { name: "借记卡", code: "DEBIT_CARD", type: "代收" },
        { name: "PayPal", code: "PAYPAL", type: "代收" },
        { name: "Stripe", code: "STRIPE", type: "代收" },
        { name: "支付宝", code: "ALIPAY", type: "代收" },
        { name: "微信支付", code: "WECHAT", type: "代收" },
        { name: "Apple Pay", code: "APPLE_PAY", type: "代收" },
        { name: "Google Pay", code: "GOOGLE_PAY", type: "代收" },
        { name: "银行转账", code: "BANK_TRANSFER", type: "代付" },
        { name: "电子钱包", code: "E_WALLET", type: "代付" }
      ]
    },
    {
      id: "IF004",
      name: "GlobalPay",
      code: "GLOBALPAY",
      description: "全球支付网关",
      status: "active",
      type: "四方支付",
      isUsed: true,
      channelCount: 12,
      currencyCount: 8,
      createdAt: "2024-02-01",
      supportedCurrencies: ["CNY", "USD", "BRL", "INR", "EUR", "GBP", "JPY", "KRW"],
      supportedChannels: [
        { name: "信用卡", code: "CREDIT_CARD", type: "代收" },
        { name: "借记卡", code: "DEBIT_CARD", type: "代收" },
        { name: "支付宝", code: "ALIPAY", type: "代收" },
        { name: "微信支付", code: "WECHAT", type: "代收" },
        { name: "银行卡", code: "BANKCARD", type: "代收" },
        { name: "Pix", code: "PIX", type: "代收" },
        { name: "UPI", code: "UPI", type: "代收" },
        { name: "SEPA", code: "SEPA", type: "代收" },
        { name: "银行转账", code: "BANK_TRANSFER", type: "代付" },
        { name: "快捷支付", code: "QUICK_PAY", type: "代付" },
        { name: "数字钱包", code: "DIGITAL_WALLET", type: "代付" },
        { name: "国际汇款", code: "INTL_REMIT", type: "代付" }
      ]
    },
    {
      id: "IF005",
      name: "CryptoPay",
      code: "CRYPTOPAY",
      description: "加密货币支付网关",
      status: "inactive",
      type: "OTC",
      isUsed: false,
      channelCount: 5,
      currencyCount: 3,
      createdAt: "2024-02-10",
      supportedCurrencies: ["USDT", "BTC", "ETH"],
      supportedChannels: [
        { name: "TRC20", code: "TRC20", type: "代收" },
        { name: "ERC20", code: "ERC20", type: "代收" },
        { name: "BEP20", code: "BEP20", type: "代收" },
        { name: "链上转账", code: "ONCHAIN", type: "代付" },
        { name: "闪电网络", code: "LIGHTNING", type: "代付" }
      ]
    },
    {
      id: "IF006",
      name: "CustodyWallet",
      code: "CUSTODY_WALLET",
      description: "企业级加密货币托管钱包服务",
      status: "active",
      type: "加密货币托管钱包",
      isUsed: true,
      channelCount: 6,
      currencyCount: 8,
      createdAt: "2024-02-15",
      supportedCurrencies: ["BTC", "ETH", "USDT", "USDC", "BNB", "SOL", "XRP", "ADA"],
      supportedChannels: [
        { name: "BTC主网", code: "BTC_MAINNET", type: "托管" },
        { name: "以太坊", code: "ETH_MAINNET", type: "托管" },
        { name: "币安智能链", code: "BSC", type: "托管" },
        { name: "波场", code: "TRON", type: "托管" },
        { name: "Solana", code: "SOLANA", type: "托管" },
        { name: "多签钱包", code: "MULTISIG", type: "托管" }
      ]
    }
  ])

  const allCurrencies = Array.from(
    new Set(interfaces.flatMap(iface => iface.supportedCurrencies))
  ).sort()

  const filteredInterfaces = interfaces.filter(iface => {
    const matchesSearch = iface.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iface.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iface.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = (() => {
      if (statusFilter === "all") return true
      if (statusFilter === "used") return iface.isUsed
      if (statusFilter === "unused") return !iface.isUsed
      if (statusFilter === "otc") return iface.type === "OTC"
      if (statusFilter === "third-party") return iface.type === "三方支付"
      if (statusFilter === "fourth-party") return iface.type === "四方支付"
      if (statusFilter === "crypto-wallet") return iface.type === "加密货币托管钱包"
      return true
    })()
    
    const matchesCurrency = currencyFilter === "all" || iface.supportedCurrencies.includes(currencyFilter)
    
    return matchesSearch && matchesStatus && matchesCurrency
  })

  const handleToggleStatus = (id: string) => {
    setInterfaces(interfaces.map(iface =>
      iface.id === id
        ? { ...iface, status: iface.status === 'active' ? 'inactive' : 'active' }
        : iface
    ))
  }

  const handleStartEditName = (id: string, currentName: string) => {
    setEditingNameId(id)
    setEditingNameValue(currentName)
  }

  const handleSaveName = (id: string) => {
    if (editingNameValue.trim()) {
      setInterfaces(interfaces.map(iface =>
        iface.id === id ? { ...iface, name: editingNameValue.trim() } : iface
      ))
    }
    setEditingNameId(null)
    setEditingNameValue("")
  }

  const handleCancelEditName = () => {
    setEditingNameId(null)
    setEditingNameValue("")
  }

  const handleStartEditDesc = (id: string, currentDesc: string) => {
    setEditingDescId(id)
    setEditingDescValue(currentDesc)
  }

  const handleSaveDesc = (id: string) => {
    if (editingDescValue.trim()) {
      setInterfaces(interfaces.map(iface =>
        iface.id === id ? { ...iface, description: editingDescValue.trim() } : iface
      ))
    }
    setEditingDescId(null)
    setEditingDescValue("")
  }

  const handleCancelEditDesc = () => {
    setEditingDescId(null)
    setEditingDescValue("")
  }

  const handleViewDetails = (iface: PaymentInterface) => {
    setSelectedInterface(iface)
    setIsDetailDialogOpen(true)
  }

  const handleOpenSupplierConfig = (iface: PaymentInterface) => {
    setCurrentConfigInterface(iface)
    setSupplierConfigs(iface.supplierConfigs || [])
    setExpandedSuppliers([])
    setEnabledSuppliers(iface.supplierConfigs?.filter(c => 
      c.upstreamMerchantId || c.hostApi || c.apiKey || c.customCode
    ).map(c => c.supplierId) || [])
    setIsSupplierConfigDialogOpen(true)
  }

  const handleToggleSupplierExpand = (supplierId: string, supplierName: string) => {
    if (expandedSuppliers.includes(supplierId)) {
      setExpandedSuppliers(expandedSuppliers.filter(id => id !== supplierId))
    } else {
      setExpandedSuppliers([...expandedSuppliers, supplierId])
      
      if (!supplierConfigs.find(c => c.supplierId === supplierId)) {
        setSupplierConfigs([...supplierConfigs, {
          supplierId,
          supplierName,
          upstreamMerchantId: "",
          hostApi: "",
          apiKey: "",
          customCode: ""
        }])
      }
    }
  }

  const isSupplierConfigured = (supplierId: string): boolean => {
    const config = supplierConfigs.find(c => c.supplierId === supplierId)
    if (!config) return false
    return !!(config.upstreamMerchantId || config.hostApi || config.apiKey || config.customCode)
  }

  const handleToggleSupplierEnabled = (supplierId: string, supplierName: string, checked: boolean) => {
    if (checked) {
      if (!isSupplierConfigured(supplierId)) {
        setExpandedSuppliers(prev => {
          if (!prev.includes(supplierId)) {
            return [...prev, supplierId]
          }
          return prev
        })
        if (!supplierConfigs.find(c => c.supplierId === supplierId)) {
          setSupplierConfigs([...supplierConfigs, {
            supplierId,
            supplierName,
            upstreamMerchantId: "",
            hostApi: "",
            apiKey: "",
            customCode: ""
          }])
        }
        return
      }
      setEnabledSuppliers([...enabledSuppliers, supplierId])
    } else {
      setEnabledSuppliers(enabledSuppliers.filter(id => id !== supplierId))
    }
  }

  const handleUpdateSupplierConfig = (supplierId: string, field: string, value: string) => {
    setSupplierConfigs(supplierConfigs.map(config => 
      config.supplierId === supplierId 
        ? { ...config, [field]: value }
        : config
    ))
  }

  const handleSaveSupplierConfigs = () => {
    console.log("Saving supplier configs:", supplierConfigs)
    setIsSupplierConfigDialogOpen(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">接口管理</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            查看和管理所有支付接口
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索接口名称、代码或描述..."
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

      <div className="space-y-4">
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="used">使用中</TabsTrigger>
            <TabsTrigger value="unused">未使用</TabsTrigger>
            <TabsTrigger value="otc">合规OTC</TabsTrigger>
            <TabsTrigger value="third-party">合规三方支付</TabsTrigger>
            <TabsTrigger value="fourth-party">合规四方支付</TabsTrigger>
            <TabsTrigger value="crypto-wallet">加密货币托管钱包</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs value={currencyFilter} onValueChange={setCurrencyFilter}>
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="all">全部币种</TabsTrigger>
            {allCurrencies.map(currency => (
              <TabsTrigger key={currency} value={currency}>
                {currency}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredInterfaces.map((iface) => (
          <Card 
            key={iface.id} 
            className={`p-4 hover:shadow-lg transition-all ${
              iface.status === 'inactive' 
                ? 'bg-gray-100 dark:bg-gray-800 opacity-60' 
                : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                {editingNameId === iface.id ? (
                  <div className="flex items-center gap-1">
                    <Input
                      value={editingNameValue}
                      onChange={(e) => setEditingNameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveName(iface.id)
                        if (e.key === 'Escape') handleCancelEditName()
                      }}
                      className="h-6 text-sm font-semibold"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
                      onClick={() => handleSaveName(iface.id)}
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                      onClick={handleCancelEditName}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <h3 
                    className="text-base font-semibold text-gray-900 dark:text-white hover:text-custom-green transition-colors cursor-pointer"
                    onClick={() => handleStartEditName(iface.id, iface.name)}
                  >
                    {iface.name}
                  </h3>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400">{iface.code}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  iface.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {iface.status === 'active' ? '启用' : '停用'}
                </span>
                <Switch
                  checked={iface.status === 'active'}
                  onCheckedChange={() => handleToggleStatus(iface.id)}
                  className="scale-75"
                />
              </div>
            </div>

            {editingDescId === iface.id ? (
              <div className="mb-3">
                <Input
                  value={editingDescValue}
                  onChange={(e) => setEditingDescValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveDesc(iface.id)
                    if (e.key === 'Escape') handleCancelEditDesc()
                  }}
                  className="h-7 text-xs"
                  autoFocus
                />
                <div className="flex gap-1 mt-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs text-green-600 hover:text-green-800 hover:bg-green-50"
                    onClick={() => handleSaveDesc(iface.id)}
                  >
                    <Check className="w-3 h-3 mr-1" />
                    保存
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs text-red-600 hover:text-red-800 hover:bg-red-50"
                    onClick={handleCancelEditDesc}
                  >
                    <X className="w-3 h-3 mr-1" />
                    取消
                  </Button>
                </div>
              </div>
            ) : (
              <p 
                className="text-xs text-gray-600 dark:text-gray-400 mb-3 cursor-pointer hover:text-custom-green"
                onClick={() => handleStartEditDesc(iface.id, iface.description)}
              >
                {iface.description}
              </p>
            )}

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div 
                className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                onClick={() => handleViewDetails(iface)}
              >
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {iface.channelCount}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">支付通道</div>
              </div>
              <div 
                className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                onClick={() => handleViewDetails(iface)}
              >
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {iface.currencyCount}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">支持币种</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {iface.createdAt}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400"
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpenSupplierConfig(iface)
                }}
                title="供应商配置"
              >
                <Settings className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredInterfaces.length === 0 && (
        <div className="text-center py-12">
          <Network className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">未找到相关接口</p>
        </div>
      )}

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Network className="w-5 h-5 text-custom-green" />
              {selectedInterface?.name} - 接口详情
            </DialogTitle>
          </DialogHeader>
          {selectedInterface && (
            <div className="space-y-6 py-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-custom-green" />
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    支持的币种
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedInterface.supportedCurrencies.map((currency) => (
                    <span
                      key={currency}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                    >
                      {currency}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-custom-green" />
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    支持的支付通道
                  </h3>
                </div>
                <div className="space-y-2">
                  {selectedInterface.supportedChannels.map((channel, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-custom-green"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {channel.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {channel.code}
                          </p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        channel.type === '代收'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                      }`}>
                        {channel.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button
              onClick={() => setIsDetailDialogOpen(false)}
              variant="outline"
            >
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={isSupplierConfigDialogOpen} onOpenChange={setIsSupplierConfigDialogOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              {currentConfigInterface?.name} - 供应商配置
            </SheetTitle>
          </SheetHeader>
          {currentConfigInterface && (
            <div className="space-y-6 py-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  <strong>安全提示：</strong>此功能仅用于演示。在生产环境中，API密钥应该通过安全的后端系统管理，使用环境变量或密钥管理服务存储，而不是在前端处理。
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  选择支持的供应商并配置密钥
                </h3>
                <div className="space-y-3">
                  {mockSuppliers.map(supplier => {
                    const isExpanded = expandedSuppliers.includes(supplier.id)
                    const isEnabled = enabledSuppliers.includes(supplier.id)
                    const config = supplierConfigs.find(c => c.supplierId === supplier.id)
                    
                    return (
                      <div key={supplier.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div 
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/30 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                          onClick={() => handleToggleSupplierExpand(supplier.id, supplier.name)}
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{supplier.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{supplier.tgAccount}</p>
                          </div>
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {!isEnabled && !isSupplierConfigured(supplier.id) && (
                              <span className="text-xs text-orange-600 dark:text-orange-400">
                                需要配置
                              </span>
                            )}
                            {isEnabled && (
                              <span className="text-xs text-green-600 dark:text-green-400">
                                已启用
                              </span>
                            )}
                            {!isEnabled && isSupplierConfigured(supplier.id) && (
                              <span className="text-xs text-gray-400">
                                未启用
                              </span>
                            )}
                            <Switch
                              checked={isEnabled}
                              onCheckedChange={(checked) => handleToggleSupplierEnabled(supplier.id, supplier.name, checked)}
                              className="scale-75"
                            />
                          </div>
                        </div>
                        
                        {isExpanded && config && (
                          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                            <Tabs defaultValue="standard" className="w-full">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="standard">通用格式</TabsTrigger>
                                <TabsTrigger value="custom">自定义代码</TabsTrigger>
                              </TabsList>
                              <TabsContent value="standard" className="space-y-3 mt-3">
                                <div>
                                  <Label htmlFor={`merchant-${config.supplierId}`} className="text-xs">上游接口商户ID</Label>
                                  <Input
                                    id={`merchant-${config.supplierId}`}
                                    placeholder="请输入上游接口商户ID"
                                    value={config.upstreamMerchantId || ''}
                                    onChange={(e) => handleUpdateSupplierConfig(config.supplierId, 'upstreamMerchantId', e.target.value)}
                                    className="mt-1 h-9"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`hostapi-${config.supplierId}`} className="text-xs">hostApi</Label>
                                  <Input
                                    id={`hostapi-${config.supplierId}`}
                                    placeholder="请输入hostApi地址"
                                    value={config.hostApi || ''}
                                    onChange={(e) => handleUpdateSupplierConfig(config.supplierId, 'hostApi', e.target.value)}
                                    className="mt-1 h-9"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`apikey-${config.supplierId}`} className="text-xs">API密钥</Label>
                                  <Input
                                    id={`apikey-${config.supplierId}`}
                                    type="password"
                                    placeholder="请输入API密钥"
                                    value={config.apiKey || ''}
                                    onChange={(e) => handleUpdateSupplierConfig(config.supplierId, 'apiKey', e.target.value)}
                                    className="mt-1 h-9"
                                  />
                                </div>
                              </TabsContent>
                              <TabsContent value="custom" className="mt-3">
                                <Label htmlFor={`code-${config.supplierId}`} className="text-xs">自定义配置代码</Label>
                                <Textarea
                                  id={`code-${config.supplierId}`}
                                  placeholder="请输入JSON配置或其他自定义代码..."
                                  rows={6}
                                  value={config.customCode || ''}
                                  onChange={(e) => handleUpdateSupplierConfig(config.supplierId, 'customCode', e.target.value)}
                                  className="font-mono text-xs mt-1"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  支持JSON格式或其他自定义配置格式
                                </p>
                              </TabsContent>
                            </Tabs>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-background">
            <Button
              onClick={() => setIsSupplierConfigDialogOpen(false)}
              variant="outline"
            >
              取消
            </Button>
            <Button
              onClick={handleSaveSupplierConfigs}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              保存配置
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
