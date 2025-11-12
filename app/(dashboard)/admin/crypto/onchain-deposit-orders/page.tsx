"use client"

import React, { useState, useMemo } from "react"
import { Download, Coins, ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  const { searchInput, setSearchInput, searchTerm, handleSearch, handleReset } = useDeferredSearch()
  const [typeTab, setTypeTab] = useState<OrderType>("deposit")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [chainFilter, setChainFilter] = useState<string>("all")
  const [currencyFilter, setCurrencyFilter] = useState<string>("all")

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
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      const matchesChain = chainFilter === "all" || order.chain === chainFilter
      const matchesCurrency = currencyFilter === "all" || order.currency === currencyFilter
      
      return matchesType && matchesSearch && matchesStatus && matchesChain && matchesCurrency
    })
  }, [orders, typeTab, searchTerm, statusFilter, chainFilter, currencyFilter])

  const getStatusBadge = (status: string, type: OrderType) => {
    if (type === "deposit") {
      switch (status) {
        case "confirmed":
          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            已确认
          </span>
        case "confirming":
          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            确认中
          </span>
        case "pending":
          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            待确认
          </span>
        case "failed":
          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            失败
          </span>
      }
    } else {
      switch (status) {
        case "completed":
          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            已完成
          </span>
        case "processing":
          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            处理中
          </span>
        case "reviewing":
          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            审核中
          </span>
        case "pending":
          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            待处理
          </span>
        case "rejected":
          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            已拒绝
          </span>
        case "failed":
          return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            失败
          </span>
      }
    }
    return null
  }

  const getStatsCards = () => {
    if (typeTab === "deposit") {
      return (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">订单总数</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{filteredOrders.length}</h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已确认</p>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                {filteredOrders.filter(o => o.status === "confirmed").length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">确认中</p>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {filteredOrders.filter(o => o.status === "confirming").length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">待确认</p>
              <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {filteredOrders.filter(o => o.status === "pending").length}
              </h3>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">订单总数</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{filteredOrders.length}</h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已完成</p>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                {filteredOrders.filter(o => o.status === "completed").length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">处理中</p>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {filteredOrders.filter(o => o.status === "processing").length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">审核中</p>
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {filteredOrders.filter(o => o.status === "reviewing").length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">待处理</p>
              <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {filteredOrders.filter(o => o.status === "pending").length}
              </h3>
            </div>
          </div>
        </>
      )
    }
  }

  const getStatusFilterOptions = () => {
    if (typeTab === "deposit") {
      return (
        <>
          <SelectItem value="all">全部状态</SelectItem>
          <SelectItem value="confirmed">已确认</SelectItem>
          <SelectItem value="confirming">确认中</SelectItem>
          <SelectItem value="pending">待确认</SelectItem>
          <SelectItem value="failed">失败</SelectItem>
        </>
      )
    } else {
      return (
        <>
          <SelectItem value="all">全部状态</SelectItem>
          <SelectItem value="completed">已完成</SelectItem>
          <SelectItem value="processing">处理中</SelectItem>
          <SelectItem value="reviewing">审核中</SelectItem>
          <SelectItem value="pending">待处理</SelectItem>
          <SelectItem value="rejected">已拒绝</SelectItem>
          <SelectItem value="failed">失败</SelectItem>
        </>
      )
    }
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
              setStatusFilter("all")
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

        <div className={`grid grid-cols-1 gap-6 mb-6 ${typeTab === "deposit" ? "md:grid-cols-4" : "md:grid-cols-5"}`}>
          {getStatsCards()}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <SearchControls
                placeholder={typeTab === "deposit" ? "搜索订单号、用户、币种或交易哈希..." : "搜索订单号、用户、币种、地址或交易哈希..."}
                value={searchInput}
                onChange={setSearchInput}
                onSearch={handleSearch}
                onReset={handleReset}
                className="flex-1"
              />
              <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="币种筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部币种</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                </SelectContent>
              </Select>
              <Select value={chainFilter} onValueChange={setChainFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="链筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部链</SelectItem>
                  <SelectItem value="Bitcoin">Bitcoin</SelectItem>
                  <SelectItem value="Ethereum">Ethereum</SelectItem>
                  <SelectItem value="BSC">BSC</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                  <SelectItem value="Tron">Tron</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  {getStatusFilterOptions()}
                </SelectContent>
              </Select>
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
