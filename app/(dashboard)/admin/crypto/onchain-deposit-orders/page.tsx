"use client"

import React, { useState, useMemo } from "react"
import { Download, Coins, ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type OrderType = "deposit" | "withdrawal"

interface CryptoOnchainOrder {
  id: string
  type: OrderType
  userId: string
  userName: string
  currency: string
  amount: string
  chain: string
  createdAt: string
  
  fromAddress?: string
  toAddress?: string
  txHash?: string
  
  confirmations?: number
  requiredConfirmations?: number
  confirmedAt?: string
  
  fee?: string
  actualAmount?: string
  completedAt?: string
  remark?: string
  
  status: string
}

export default function OnchainOrdersPage() {
  const { searchInput, setSearchInput, searchTerm, handleSearch } = useDeferredSearch()
  const [typeTab, setTypeTab] = useState<OrderType>("deposit")
  const [statusTab, setStatusTab] = useState<string>("pending_review")
  const [currencyTab, setCurrencyTab] = useState<string>("all")
  const [chainTab, setChainTab] = useState<string>("all")

  const orders: CryptoOnchainOrder[] = []

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesType = order.type === typeTab
      
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.toAddress && order.toAddress.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.fromAddress && order.fromAddress.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (order.txHash && order.txHash.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesStatus = statusTab === "all" || order.status === statusTab
      const matchesChain = chainTab === "all" || order.chain === chainTab
      const matchesCurrency = currencyTab === "all" || order.currency === currencyTab
      
      return matchesType && matchesSearch && matchesStatus && matchesChain && matchesCurrency
    })
  }, [orders, typeTab, searchTerm, statusTab, chainTab, currencyTab])

  const getStatusBadge = (status: string, type: OrderType) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending_review: { label: "待审核", className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" },
      confirmed: { label: "已确认", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
      confirming: { label: "确认中", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
      pending: { label: type === "deposit" ? "待确认" : "待处理", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
      completed: { label: "已完成", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
      processing: { label: "处理中", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
      reviewing: { label: "审核中", className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
      rejected: { label: "已拒绝", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
      failed: { label: "失败", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" },
    }

    const statusInfo = statusMap[status]
    if (!statusInfo) return null

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Crypto出入金订单</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              查看和管理加密货币充值和提币订单
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Tabs value={typeTab} onValueChange={(value) => {
              setTypeTab(value as OrderType)
              setStatusTab("pending_review")
            }}>
              <TabsList>
                <TabsTrigger value="deposit" className="flex items-center gap-2">
                  <ArrowDownToLine className="w-4 h-4" />
                  入金
                </TabsTrigger>
                <TabsTrigger value="withdrawal" className="flex items-center gap-2">
                  <ArrowUpFromLine className="w-4 h-4" />
                  出金
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button className="bg-custom-green hover:bg-green-600">
              <Download className="w-4 h-4 mr-2" />
              导出订单
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 space-y-4">
          <div>
            <Tabs value={currencyTab} onValueChange={(value) => {
              setCurrencyTab(value)
              setChainTab("all")
            }}>
              <TabsList>
                <TabsTrigger value="all">全部币种</TabsTrigger>
                <TabsTrigger value="BTC">BTC</TabsTrigger>
                <TabsTrigger value="ETH">ETH</TabsTrigger>
                <TabsTrigger value="USDT">USDT</TabsTrigger>
                <TabsTrigger value="USDC">USDC</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <Tabs value={chainTab} onValueChange={setChainTab}>
              <TabsList>
                <TabsTrigger value="all">全部链</TabsTrigger>
                <TabsTrigger value="Bitcoin">Bitcoin</TabsTrigger>
                <TabsTrigger value="Ethereum">Ethereum</TabsTrigger>
                <TabsTrigger value="BSC">BSC</TabsTrigger>
                <TabsTrigger value="Polygon">Polygon</TabsTrigger>
                <TabsTrigger value="Tron">Tron</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-4">
            <Tabs value={statusTab} onValueChange={setStatusTab}>
              <TabsList>
                <TabsTrigger value="pending_review">待审核</TabsTrigger>
                <TabsTrigger value="all">全部状态</TabsTrigger>
                {typeTab === "deposit" ? (
                  <>
                    <TabsTrigger value="pending">待确认</TabsTrigger>
                    <TabsTrigger value="confirming">确认中</TabsTrigger>
                    <TabsTrigger value="confirmed">已确认</TabsTrigger>
                    <TabsTrigger value="failed">失败</TabsTrigger>
                  </>
                ) : (
                  <>
                    <TabsTrigger value="pending">待处理</TabsTrigger>
                    <TabsTrigger value="reviewing">审核中</TabsTrigger>
                    <TabsTrigger value="processing">处理中</TabsTrigger>
                    <TabsTrigger value="completed">已完成</TabsTrigger>
                    <TabsTrigger value="rejected">已拒绝</TabsTrigger>
                    <TabsTrigger value="failed">失败</TabsTrigger>
                  </>
                )}
              </TabsList>
            </Tabs>
            <SearchControls
              placeholder={typeTab === "deposit" ? "搜索订单号、用户、币种或交易哈希..." : "搜索订单号、用户、币种、地址或交易哈希..."}
              value={searchInput}
              onChange={setSearchInput}
              onSearch={handleSearch}
              className="flex-1"
              showReset={false}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  订单号
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  用户
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  币种/金额
                </th>
                {typeTab === "withdrawal" && (
                  <>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      手续费
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      实际到账
                    </th>
                  </>
                )}
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  链
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {typeTab === "deposit" ? "充值地址" : "目标地址"}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  交易哈希
                </th>
                {typeTab === "deposit" && (
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    确认数
                  </th>
                )}
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  创建时间
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {order.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {order.userName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {order.userId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {order.amount} {order.currency}
                    </div>
                  </td>
                  {typeTab === "withdrawal" && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {order.fee} {order.currency}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600 dark:text-green-400">
                          {order.actualAmount} {order.currency}
                        </div>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {order.chain}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-mono text-gray-600 dark:text-gray-400 truncate max-w-xs">
                      {typeTab === "deposit" ? order.toAddress : order.toAddress}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {order.txHash ? (
                      <div className="text-sm font-mono text-blue-600 dark:text-blue-400 truncate max-w-xs">
                        {order.txHash}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 dark:text-gray-600">
                        -
                      </div>
                    )}
                  </td>
                  {typeTab === "deposit" && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {order.confirmations}/{order.requiredConfirmations}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status, order.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {order.createdAt}
                    </div>
                    {typeTab === "deposit" && order.confirmedAt && (
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        确认: {order.confirmedAt}
                      </div>
                    )}
                    {typeTab === "withdrawal" && order.completedAt && (
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        完成: {order.completedAt}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <Coins className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
              暂无{typeTab === "deposit" ? "入金" : "出金"}订单
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              当用户进行加密货币{typeTab === "deposit" ? "充值" : "提币"}时，订单将显示在此处
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
