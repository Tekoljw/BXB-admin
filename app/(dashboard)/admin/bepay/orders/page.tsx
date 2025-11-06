"use client"

import React, { useState } from "react"
import { Search, Send, RefreshCw, Lock, RotateCcw, Info } from "lucide-react"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Order {
  id: string
  upstreamOrderId: string
  downstreamOrderId: string
  merchantId: string
  currency: string
  paymentChannel: string
  amount: number
  fee: number
  createdAt: string
  paidAt?: string
  lastResent?: string
  status: "pending" | "success" | "failed"
}

const mockOrders: Order[] = [
  {
    id: "ORD2024110601",
    upstreamOrderId: "UP20241106001",
    downstreamOrderId: "DOWN20241106001",
    merchantId: "M001",
    currency: "CNY",
    paymentChannel: "支付宝",
    amount: 1500.00,
    fee: 7.50,
    createdAt: "2024-11-06 10:30:00",
    paidAt: "2024-11-06 10:32:15",
    status: "success"
  },
  {
    id: "ORD2024110602",
    upstreamOrderId: "UP20241106002",
    downstreamOrderId: "DOWN20241106002",
    merchantId: "M002",
    currency: "CNY",
    paymentChannel: "微信支付",
    amount: 2800.00,
    fee: 14.00,
    createdAt: "2024-11-06 10:45:00",
    paidAt: "2024-11-06 10:46:30",
    status: "success"
  },
  {
    id: "ORD2024110603",
    upstreamOrderId: "UP20241106003",
    downstreamOrderId: "DOWN20241106003",
    merchantId: "M001",
    currency: "CNY",
    paymentChannel: "银行转账",
    amount: 5000.00,
    fee: 15.00,
    createdAt: "2024-11-06 11:00:00",
    status: "pending"
  },
  {
    id: "ORD2024110604",
    upstreamOrderId: "UP20241106004",
    downstreamOrderId: "DOWN20241106004",
    merchantId: "M003",
    currency: "BRL",
    paymentChannel: "PIX支付",
    amount: 3200.00,
    fee: 25.60,
    createdAt: "2024-11-06 11:15:00",
    paidAt: "2024-11-06 11:16:05",
    status: "success"
  },
  {
    id: "ORD2024110605",
    upstreamOrderId: "UP20241106005",
    downstreamOrderId: "DOWN20241106005",
    merchantId: "M004",
    currency: "INR",
    paymentChannel: "UPI支付",
    amount: 8500.00,
    fee: 51.00,
    createdAt: "2024-11-06 11:30:00",
    status: "failed"
  },
  {
    id: "ORD2024110606",
    upstreamOrderId: "UP20241106006",
    downstreamOrderId: "DOWN20241106006",
    merchantId: "M002",
    currency: "CNY",
    paymentChannel: "支付宝",
    amount: 950.00,
    fee: 4.75,
    createdAt: "2024-11-06 11:45:00",
    paidAt: "2024-11-06 11:47:20",
    status: "success"
  },
]

const currencies = ["全部", "CNY", "BRL", "INR", "USD", "EUR"]
const paymentChannelsMap: Record<string, string[]> = {
  "全部": ["全部"],
  "CNY": ["全部", "支付宝", "微信支付", "银行转账"],
  "BRL": ["全部", "PIX支付"],
  "INR": ["全部", "UPI支付"],
  "USD": ["全部", "信用卡", "银行转账"],
  "EUR": ["全部", "SEPA转账", "信用卡"],
}

const getCollectionInfo = (channel: string) => {
  const infoMap: Record<string, { type: string; details: { label: string; value: string }[] }> = {
    "支付宝": {
      type: "支付宝收款",
      details: [
        { label: "收款账号", value: "bepay_collect@alipay.com" },
        { label: "收款姓名", value: "BeDAO支付服务有限公司" },
        { label: "收款二维码", value: "https://qr.alipay.com/abc123456" }
      ]
    },
    "微信支付": {
      type: "微信收款",
      details: [
        { label: "收款账号", value: "BeDAO-Pay" },
        { label: "商户号", value: "1234567890" },
        { label: "收款二维码", value: "weixin://wxpay/bizpayurl?pr=abc1234" }
      ]
    },
    "银行转账": {
      type: "银行转账收款",
      details: [
        { label: "收款银行", value: "中国工商银行" },
        { label: "收款账号", value: "6222 0212 3456 7890 123" },
        { label: "收款户名", value: "BeDAO支付服务有限公司" },
        { label: "开户行", value: "工商银行深圳分行" }
      ]
    },
    "PIX支付": {
      type: "PIX收款",
      details: [
        { label: "PIX Key", value: "bepay@pix.com.br" },
        { label: "收款人", value: "BeDAO Pagamentos Ltda" },
        { label: "PIX QR Code", value: "00020126580014br.gov.bcb.pix..." }
      ]
    },
    "UPI支付": {
      type: "UPI收款",
      details: [
        { label: "UPI ID", value: "bepay@upi" },
        { label: "收款人", value: "BeDAO Payments India" },
        { label: "UPI QR Code", value: "upi://pay?pa=bepay@upi&pn=BeDAO" }
      ]
    }
  }
  return infoMap[channel] || {
    type: "其他收款方式",
    details: [{ label: "收款信息", value: "暂无详细信息" }]
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("全部")
  const [selectedChannel, setSelectedChannel] = useState("全部")
  const [isResendDialogOpen, setIsResendDialogOpen] = useState(false)
  const [isReverifyDialogOpen, setIsReverifyDialogOpen] = useState(false)
  const [isFreezeDialogOpen, setIsFreezeDialogOpen] = useState(false)
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false)
  const [isCollectionInfoDialogOpen, setIsCollectionInfoDialogOpen] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  const availableChannels = paymentChannelsMap[selectedCurrency] || ["全部"]

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency)
    setSelectedChannel("全部")
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.upstreamOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.downstreamOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.merchantId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCurrency = selectedCurrency === "全部" || order.currency === selectedCurrency
    const matchesChannel = selectedChannel === "全部" || order.paymentChannel === selectedChannel
    
    return matchesSearch && matchesCurrency && matchesChannel
  })

  const handleResend = () => {
    if (currentOrder) {
      const updatedOrders = orders.map(order => {
        if (order.id === currentOrder.id) {
          return { ...order, lastResent: new Date().toLocaleString('zh-CN') }
        }
        return order
      })
      setOrders(updatedOrders)
      setActionMessage(`订单 ${currentOrder.id} 的通知已补发`)
      setTimeout(() => setActionMessage(null), 3000)
      setIsResendDialogOpen(false)
      setCurrentOrder(null)
    }
  }

  const handleReverify = () => {
    if (currentOrder) {
      const updatedOrders = orders.map(order => {
        if (order.id === currentOrder.id && order.status === "failed") {
          return { ...order, status: "success" as const, paidAt: new Date().toLocaleString('zh-CN') }
        }
        return order
      })
      setOrders(updatedOrders)
      setActionMessage(`订单 ${currentOrder.id} 已重新校验并更新为成功状态`)
      setTimeout(() => setActionMessage(null), 3000)
      setIsReverifyDialogOpen(false)
      setCurrentOrder(null)
    }
  }

  const handleFreeze = () => {
    if (currentOrder) {
      const updatedOrders = orders.map(order => {
        if (order.id === currentOrder.id) {
          return { ...order, status: "failed" as const }
        }
        return order
      })
      setOrders(updatedOrders)
      setActionMessage(`订单 ${currentOrder.id} 已冻结`)
      setTimeout(() => setActionMessage(null), 3000)
      setIsFreezeDialogOpen(false)
      setCurrentOrder(null)
    }
  }

  const handleRefund = () => {
    if (currentOrder) {
      const updatedOrders = orders.map(order => {
        if (order.id === currentOrder.id) {
          return { ...order, status: "failed" as const }
        }
        return order
      })
      setOrders(updatedOrders)
      setActionMessage(`订单 ${currentOrder.id} 已退款，金额 $${currentOrder.amount.toFixed(2)} 已退回用户账户`)
      setTimeout(() => setActionMessage(null), 3000)
      setIsRefundDialogOpen(false)
      setCurrentOrder(null)
    }
  }

  const openResendDialog = (order: Order) => {
    setCurrentOrder(order)
    setIsResendDialogOpen(true)
  }

  const openReverifyDialog = (order: Order) => {
    setCurrentOrder(order)
    setIsReverifyDialogOpen(true)
  }

  const openFreezeDialog = (order: Order) => {
    setCurrentOrder(order)
    setIsFreezeDialogOpen(true)
  }

  const openRefundDialog = (order: Order) => {
    setCurrentOrder(order)
    setIsRefundDialogOpen(true)
  }

  const openCollectionInfoDialog = (order: Order) => {
    setCurrentOrder(order)
    setIsCollectionInfoDialogOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      {actionMessage && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg">
          {actionMessage}
        </div>
      )}

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">代收订单列表</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">币种筛选</label>
          <Tabs value={selectedCurrency} onValueChange={handleCurrencyChange}>
            <TabsList className="grid grid-cols-6 w-full max-w-2xl">
              {currencies.map(currency => (
                <TabsTrigger key={currency} value={currency}>
                  {currency}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">支付通道筛选</label>
          <Tabs value={selectedChannel} onValueChange={setSelectedChannel}>
            <TabsList className={`grid w-full max-w-3xl`} style={{ gridTemplateColumns: `repeat(${availableChannels.length}, minmax(0, 1fr))` }}>
              {availableChannels.map(channel => (
                <TabsTrigger key={channel} value={channel}>
                  {channel}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜索订单号、商户ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  订单信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  商户
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  支付信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  金额
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  时间
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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">{order.id}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">上游: {order.upstreamOrderId}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">下游: {order.downstreamOrderId}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {order.merchantId}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
                        {order.currency}
                      </span>
                      <span className="text-gray-900 dark:text-gray-300 text-xs">{order.paymentChannel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="text-gray-900 dark:text-white font-medium">${order.amount.toFixed(2)}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">费: ${order.fee.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="text-gray-900 dark:text-gray-300 text-xs">{order.createdAt}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {order.paidAt ? `付: ${order.paidAt}` : "-"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "success"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : order.status === "pending"
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                    }`}>
                      {order.status === "success" ? "已成功" : order.status === "pending" ? "等待付款" : "已失效"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openCollectionInfoDialog(order)}
                        className="text-purple-600 hover:text-purple-800 dark:text-purple-400"
                        title="收款信息"
                      >
                        <Info className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openResendDialog(order)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="补发通知"
                        disabled={order.status !== "success"}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openReverifyDialog(order)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="重新校验"
                        disabled={order.status !== "failed"}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openFreezeDialog(order)}
                        className="text-orange-600 hover:text-orange-800 dark:text-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="冻结订单"
                        disabled={order.status !== "success"}
                      >
                        <Lock className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openRefundDialog(order)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="订单退款"
                        disabled={order.status !== "success"}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            暂无数据
          </div>
        )}
      </div>

      <Dialog open={isResendDialogOpen} onOpenChange={setIsResendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>补发通知</DialogTitle>
            <DialogDescription>
              确定要补发订单 "{currentOrder?.id}" 的通知吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResendDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleResend} className="bg-blue-600 hover:bg-blue-700">
              补发
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReverifyDialogOpen} onOpenChange={setIsReverifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>重新校验</DialogTitle>
            <DialogDescription>
              确定要重新校验订单 "{currentOrder?.id}" 吗？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReverifyDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleReverify} className="bg-green-600 hover:bg-green-700">
              校验
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFreezeDialogOpen} onOpenChange={setIsFreezeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>冻结订单</DialogTitle>
            <DialogDescription>
              确定要冻结订单 "{currentOrder?.id}" 吗？冻结后将暂停该订单的所有操作。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFreezeDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleFreeze} className="bg-orange-600 hover:bg-orange-700">
              冻结
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>订单退款</DialogTitle>
            <DialogDescription>
              确定要退款订单 "{currentOrder?.id}" 吗？金额 ${currentOrder?.amount.toFixed(2)} 将退回到用户账户。此操作不可撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRefundDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleRefund}>
              确认退款
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCollectionInfoDialogOpen} onOpenChange={setIsCollectionInfoDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>收款信息</DialogTitle>
            <DialogDescription>
              订单 "{currentOrder?.id}" 的收款账户详情
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-sm font-medium text-purple-900 dark:text-purple-300 mb-3">
                {currentOrder && getCollectionInfo(currentOrder.paymentChannel).type}
              </div>
              <div className="space-y-3">
                {currentOrder && getCollectionInfo(currentOrder.paymentChannel).details.map((detail, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{detail.label}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white break-all">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800 dark:text-blue-300">
                  <div className="font-medium mb-1">收款说明</div>
                  <div>请确保用户使用正确的收款信息进行支付。如有疑问，请联系技术支持。</div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsCollectionInfoDialogOpen(false)}>
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
