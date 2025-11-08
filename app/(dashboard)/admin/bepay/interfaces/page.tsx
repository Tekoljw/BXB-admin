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
  Trash2
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface SupplierConfig {
  supplierId: string
  supplierName: string
  keyFormat: "standard" | "custom"
  merchantId?: string
  apiKey?: string
  customCode?: string
}

interface PaymentInterface {
  id: string
  name: string
  code: string
  description: string
  status: "active" | "inactive"
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
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInterface, setSelectedInterface] = useState<PaymentInterface | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isSupplierConfigDialogOpen, setIsSupplierConfigDialogOpen] = useState(false)
  const [currentConfigInterface, setCurrentConfigInterface] = useState<PaymentInterface | null>(null)
  const [supplierConfigs, setSupplierConfigs] = useState<SupplierConfig[]>([])
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])
  
  const [interfaces] = useState<PaymentInterface[]>([
    {
      id: "IF001",
      name: "Bitzpay",
      code: "BITZPAY",
      description: "专业的数字货币支付接口",
      status: "active",
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
      status: "active",
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
    }
  ])

  const filteredInterfaces = interfaces.filter(iface =>
    iface.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    iface.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    iface.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewDetails = (iface: PaymentInterface) => {
    setSelectedInterface(iface)
    setIsDetailDialogOpen(true)
  }

  const handleOpenSupplierConfig = (iface: PaymentInterface) => {
    setCurrentConfigInterface(iface)
    setSupplierConfigs(iface.supplierConfigs || [])
    setSelectedSuppliers(iface.supplierConfigs?.map(c => c.supplierId) || [])
    setIsSupplierConfigDialogOpen(true)
  }

  const handleToggleSupplier = (supplierId: string, supplierName: string) => {
    if (selectedSuppliers.includes(supplierId)) {
      setSelectedSuppliers(selectedSuppliers.filter(id => id !== supplierId))
      setSupplierConfigs(supplierConfigs.filter(c => c.supplierId !== supplierId))
    } else {
      setSelectedSuppliers([...selectedSuppliers, supplierId])
      setSupplierConfigs([...supplierConfigs, {
        supplierId,
        supplierName,
        keyFormat: "standard",
        merchantId: "",
        apiKey: "",
        customCode: ""
      }])
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
    // In production, this would save to backend
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
        <Search className="w-4 h-4 text-gray-400" />
        <Input
          placeholder="搜索接口名称、代码或描述..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInterfaces.map((iface) => (
          <Card 
            key={iface.id} 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => handleViewDetails(iface)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-custom-green/10 flex items-center justify-center">
                  <Network className="w-6 h-6 text-custom-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-custom-green transition-colors">
                    {iface.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{iface.code}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                iface.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
              }`}>
                {iface.status === 'active' ? '运行中' : '已停用'}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {iface.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {iface.channelCount}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">支付通道</div>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {iface.currencyCount}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">支持币种</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                创建于 {iface.createdAt}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleOpenSupplierConfig(iface)
                  }}
                  title="供应商配置"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-custom-green hover:text-custom-green/80 hover:bg-custom-green/10"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleViewDetails(iface)
                  }}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  查看详情
                </Button>
              </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">接口代码</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                    {selectedInterface.code}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">状态</p>
                  <p className="text-base font-medium text-gray-900 dark:text-white mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedInterface.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {selectedInterface.status === 'active' ? '运行中' : '已停用'}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">支付通道数</p>
                  <p className="text-base font-medium text-blue-600 dark:text-blue-400 mt-1">
                    {selectedInterface.channelCount} 个
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">支持币种数</p>
                  <p className="text-base font-medium text-purple-600 dark:text-purple-400 mt-1">
                    {selectedInterface.currencyCount} 种
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">接口描述</p>
                <p className="text-base text-gray-700 dark:text-gray-300">
                  {selectedInterface.description}
                </p>
              </div>

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

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  创建时间: {selectedInterface.createdAt}
                </p>
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
                    const isSelected = selectedSuppliers.includes(supplier.id)
                    const config = supplierConfigs.find(c => c.supplierId === supplier.id)
                    
                    return (
                      <div key={supplier.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/30">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggleSupplier(supplier.id, supplier.name)}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{supplier.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{supplier.tgAccount}</p>
                          </div>
                        </div>
                        
                        {isSelected && config && (
                          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-3">
                              <Label className="text-xs font-semibold text-gray-700 dark:text-gray-300">密钥格式</Label>
                              <Select
                                value={config.keyFormat}
                                onValueChange={(value) => handleUpdateSupplierConfig(config.supplierId, 'keyFormat', value)}
                              >
                                <SelectTrigger className="w-[140px] h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="standard">通用格式</SelectItem>
                                  <SelectItem value="custom">自定义代码</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {config.keyFormat === 'standard' ? (
                              <div className="space-y-3">
                                <div>
                                  <Label htmlFor={`merchant-${config.supplierId}`} className="text-xs">商户ID</Label>
                                  <Input
                                    id={`merchant-${config.supplierId}`}
                                    placeholder="请输入商户ID"
                                    value={config.merchantId || ''}
                                    onChange={(e) => handleUpdateSupplierConfig(config.supplierId, 'merchantId', e.target.value)}
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
                              </div>
                            ) : (
                              <div>
                                <Label htmlFor={`code-${config.supplierId}`} className="text-xs">自定义配置代码</Label>
                                <Textarea
                                  id={`code-${config.supplierId}`}
                                  placeholder="请输入JSON配置或其他自定义代码..."
                                  rows={5}
                                  value={config.customCode || ''}
                                  onChange={(e) => handleUpdateSupplierConfig(config.supplierId, 'customCode', e.target.value)}
                                  className="font-mono text-xs mt-1"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  支持JSON格式或其他自定义配置格式
                                </p>
                              </div>
                            )}
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
