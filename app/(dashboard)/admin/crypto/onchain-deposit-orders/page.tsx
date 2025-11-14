"use client"

import React, { useState, useMemo } from "react"
import { Download, Coins, ArrowDownToLine, ArrowUpFromLine, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoadMoreButton } from "@/components/load-more-button"
import { SearchControls } from "@/components/admin/search-controls"
import { useDeferredSearch } from "@/hooks/use-deferred-search"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

type OrderType = "deposit" | "withdrawal"

const AddressDisplay = ({ address }: { address?: string }) => {
  const [copied, setCopied] = useState(false)

  if (!address) return (
    <div className="text-sm text-gray-400 dark:text-gray-600">-</div>
  )

  const truncateAddress = (addr: string) => {
    if (addr.length <= 20) return addr
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      toast.success("已复制到剪贴板")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("复制失败")
    }
  }

  return (
    <div className="flex items-center gap-2 group">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate" title={address}>
          {truncateAddress(address)}
        </div>
      </div>
      <button
        onClick={copyToClipboard}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        title="复制地址"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-600" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-gray-400" />
        )}
      </button>
    </div>
  )
}

const HashCopyButton = ({ txHash }: { txHash?: string }) => {
  const [copied, setCopied] = useState(false)

  if (!txHash) return (
    <div className="text-sm text-gray-400 dark:text-gray-600">-</div>
  )

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(txHash)
      setCopied(true)
      toast.success("交易哈希已复制")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("复制失败")
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={copyToClipboard}
      className="h-7 text-xs"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 mr-1 text-green-600" />
          已复制
        </>
      ) : (
        <>
          <Copy className="w-3 h-3 mr-1" />
          复制交易哈希
        </>
      )}
    </Button>
  )
}

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

  const orders: CryptoOnchainOrder[] = [
    {
      id: "DEP-20240112-001",
      type: "deposit",
      userId: "USR-10001",
      userName: "张三",
      currency: "USDT",
      amount: "5000.00",
      chain: "Tron",
      createdAt: "2024-01-12 14:30:25",
      fromAddress: "TRX7n2H9gHcYs5t3kYp4mBvQxJ8K2LmP9a",
      toAddress: "TRX9m3K6hLbXr2pN5jYt8cVwQz1MnO4Pa",
      txHash: "0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
      status: "pending_review",
    },
    {
      id: "DEP-20240112-002",
      type: "deposit",
      userId: "USR-10002",
      userName: "李四",
      currency: "BTC",
      amount: "0.5",
      chain: "Bitcoin",
      createdAt: "2024-01-12 13:15:42",
      fromAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      toAddress: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
      txHash: "0xb2c3d4e5f6a789012345678901234567890abcdef1234567890abcdef234567",
      confirmations: 2,
      requiredConfirmations: 6,
      status: "confirming",
    },
    {
      id: "DEP-20240112-003",
      type: "deposit",
      userId: "USR-10003",
      userName: "王五",
      currency: "ETH",
      amount: "10.0",
      chain: "Ethereum",
      createdAt: "2024-01-12 12:45:18",
      fromAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      toAddress: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
      txHash: "0xc3d4e5f6a7b89012345678901234567890abcdef1234567890abcdef345678",
      confirmations: 15,
      requiredConfirmations: 12,
      confirmedAt: "2024-01-12 12:50:30",
      status: "confirmed",
    },
    {
      id: "DEP-20240112-004",
      type: "deposit",
      userId: "USR-10004",
      userName: "赵六",
      currency: "USDT",
      amount: "10000.00",
      chain: "BSC",
      createdAt: "2024-01-12 11:20:35",
      fromAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      toAddress: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
      txHash: "0xd4e5f6a7b8c9012345678901234567890abcdef1234567890abcdef456789",
      status: "pending",
    },
    {
      id: "DEP-20240112-005",
      type: "deposit",
      userId: "USR-10005",
      userName: "孙七",
      currency: "USDC",
      amount: "3000.00",
      chain: "Polygon",
      createdAt: "2024-01-12 10:05:12",
      fromAddress: "0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5",
      toAddress: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
      txHash: "0xe5f6a7b8c9d0123456789012345678901234567890abcdef1234567890abc",
      status: "pending_review",
    },
    {
      id: "DEP-20240111-006",
      type: "deposit",
      userId: "USR-10006",
      userName: "周八",
      currency: "BTC",
      amount: "0.25",
      chain: "Bitcoin",
      createdAt: "2024-01-11 18:30:45",
      fromAddress: "3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy",
      toAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      status: "failed",
      remark: "交易超时未确认",
    },
    {
      id: "WTD-20240112-007",
      type: "withdrawal",
      userId: "USR-10007",
      userName: "吴九",
      currency: "USDT",
      amount: "8000.00",
      chain: "Tron",
      createdAt: "2024-01-12 15:20:18",
      toAddress: "TRX8n4K7jMdZt6rQ8mXv9cWyRz2NoP5Qb",
      status: "pending_review",
      fee: "1.00",
    },
    {
      id: "WTD-20240112-008",
      type: "withdrawal",
      userId: "USR-10008",
      userName: "郑十",
      currency: "ETH",
      amount: "5.0",
      chain: "Ethereum",
      createdAt: "2024-01-12 14:15:30",
      toAddress: "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359",
      status: "reviewing",
      fee: "0.005",
    },
    {
      id: "WTD-20240112-009",
      type: "withdrawal",
      userId: "USR-10009",
      userName: "冯十一",
      currency: "BTC",
      amount: "1.2",
      chain: "Bitcoin",
      createdAt: "2024-01-12 13:45:22",
      toAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
      txHash: "0xf6a7b8c9d0e1234567890123456789012345678901234567890abcdef567890",
      status: "processing",
      fee: "0.0005",
    },
    {
      id: "WTD-20240112-010",
      type: "withdrawal",
      userId: "USR-10010",
      userName: "陈十二",
      currency: "USDT",
      amount: "15000.00",
      chain: "BSC",
      createdAt: "2024-01-12 12:30:15",
      toAddress: "0x4E83362442B8d1beC281594cEa3050c8EB01311C",
      txHash: "0xa7b8c9d0e1f2345678901234567890123456789012345678901234567890ab",
      actualAmount: "14999.00",
      completedAt: "2024-01-12 12:35:48",
      status: "completed",
      fee: "1.00",
    },
    {
      id: "WTD-20240112-011",
      type: "withdrawal",
      userId: "USR-10011",
      userName: "褚十三",
      currency: "USDC",
      amount: "6000.00",
      chain: "Polygon",
      createdAt: "2024-01-12 11:10:05",
      toAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      status: "pending",
      fee: "0.50",
    },
    {
      id: "WTD-20240111-012",
      type: "withdrawal",
      userId: "USR-10012",
      userName: "卫十四",
      currency: "ETH",
      amount: "3.5",
      chain: "Ethereum",
      createdAt: "2024-01-11 16:25:33",
      toAddress: "0x583031D1113aD414F02576BD6afaBfb302140225",
      status: "rejected",
      remark: "用户提币地址未通过验证",
    },
    {
      id: "WTD-20240111-013",
      type: "withdrawal",
      userId: "USR-10013",
      userName: "蒋十五",
      currency: "BTC",
      amount: "0.8",
      chain: "Bitcoin",
      createdAt: "2024-01-11 15:40:28",
      toAddress: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
      status: "failed",
      remark: "网络拥堵导致交易失败",
    },
    {
      id: "DEP-20240112-014",
      type: "deposit",
      userId: "USR-10014",
      userName: "沈十六",
      currency: "USDT",
      amount: "20000.00",
      chain: "Ethereum",
      createdAt: "2024-01-12 09:15:42",
      fromAddress: "0x28C6c06298d514Db089934071355E5743bf21d60",
      toAddress: "0x2B5634C42055806a59e9107ED44D43c426E58258",
      txHash: "0xb8c9d0e1f23456789012345678901234567890123456789012345678901bcd",
      status: "pending_review",
    },
    {
      id: "WTD-20240112-015",
      type: "withdrawal",
      userId: "USR-10015",
      userName: "韩十七",
      currency: "USDT",
      amount: "12000.00",
      chain: "Tron",
      createdAt: "2024-01-12 08:50:17",
      toAddress: "TRX5m2J4kPbYs9uK7nXq6dVzRw8LpO3Nc",
      status: "pending_review",
      fee: "1.00",
    },
  ]

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
                {typeTab === "deposit" && (
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    来源地址
                  </th>
                )}
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
                  {typeTab === "deposit" && (
                    <td className="px-6 py-4">
                      <AddressDisplay address={order.fromAddress} />
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <AddressDisplay address={order.toAddress} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <HashCopyButton txHash={order.txHash} />
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

        {filteredOrders.length > 0 && (
          <LoadMoreButton 
            totalCount={filteredOrders.length}
          />
        )}
      </div>
    </div>
  )
}
