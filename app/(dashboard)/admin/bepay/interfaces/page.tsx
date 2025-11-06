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
  Search, 
  Network,
  Eye,
  TrendingUp,
  Globe
} from "lucide-react"

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
}

export default function InterfacesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInterface, setSelectedInterface] = useState<PaymentInterface | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  
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
    </div>
  )
}
