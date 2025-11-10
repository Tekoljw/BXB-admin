"use client"

import React, { useState } from "react"
import { Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface NFTWithdrawalOrder {
  id: string
  userId: string
  userName: string
  nftName: string
  nftCollection: string
  tokenId: string
  chain: string
  fromAddress: string
  toAddress: string
  txHash?: string
  status: "pending" | "processing" | "completed" | "rejected"
  createdAt: string
  completedAt?: string
}

const mockOrders: NFTWithdrawalOrder[] = [
  {
    id: "NFT-WD-001",
    userId: "U100001",
    userName: "user001@example.com",
    nftName: "Mutant Ape #2345",
    nftCollection: "Mutant Ape Yacht Club",
    tokenId: "2345",
    chain: "Ethereum",
    fromAddress: "0xabcd...ef01",
    toAddress: "0x1234...5678",
    txHash: "0xabcdef123456...",
    status: "completed",
    createdAt: "2024-11-10 08:30:00",
    completedAt: "2024-11-10 08:45:00"
  },
  {
    id: "NFT-WD-002",
    userId: "U100002",
    userName: "user002@example.com",
    nftName: "Moonbird #6789",
    nftCollection: "Moonbirds",
    tokenId: "6789",
    chain: "Ethereum",
    fromAddress: "0xbcde...f012",
    toAddress: "0x2345...6789",
    status: "processing",
    createdAt: "2024-11-10 10:15:00"
  },
  {
    id: "NFT-WD-003",
    userId: "U100003",
    userName: "user003@example.com",
    nftName: "Clone X #4567",
    nftCollection: "Clone X",
    tokenId: "4567",
    chain: "Ethereum",
    fromAddress: "0xcdef...0123",
    toAddress: "0x3456...7890",
    status: "pending",
    createdAt: "2024-11-10 11:30:00"
  },
  {
    id: "NFT-WD-004",
    userId: "U100004",
    userName: "user004@example.com",
    nftName: "Pudgy Penguin #8901",
    nftCollection: "Pudgy Penguins",
    tokenId: "8901",
    chain: "Ethereum",
    fromAddress: "0xdef0...1234",
    toAddress: "0x4567...8901",
    status: "rejected",
    createdAt: "2024-11-09 15:20:00"
  },
  {
    id: "NFT-WD-005",
    userId: "U100005",
    userName: "user005@example.com",
    nftName: "Otherdeed #1122",
    nftCollection: "Otherdeed for Otherside",
    tokenId: "1122",
    chain: "Ethereum",
    fromAddress: "0xef01...2345",
    toAddress: "0x5678...9012",
    txHash: "0xdef012345678...",
    status: "completed",
    createdAt: "2024-11-09 14:10:00",
    completedAt: "2024-11-09 14:25:00"
  }
]

export default function NFTWithdrawalOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [chainFilter, setChainFilter] = useState<string>("all")

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.nftName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.nftCollection.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.txHash && order.txHash.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesChain = chainFilter === "all" || order.chain === chainFilter
    
    return matchesSearch && matchesStatus && matchesChain
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          已完成
        </span>
      case "processing":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          处理中
        </span>
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
          待处理
        </span>
      case "rejected":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          已拒绝
        </span>
      default:
        return null
    }
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">NFT提出订单</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                查看和管理NFT提出订单
              </p>
            </div>
            <Button className="bg-custom-green hover:bg-green-600">
              <Download className="w-4 h-4 mr-2" />
              导出订单
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">订单总数</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{mockOrders.length}</h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已完成</p>
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                {mockOrders.filter(o => o.status === "completed").length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">处理中</p>
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {mockOrders.filter(o => o.status === "processing").length}
              </h3>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">待处理</p>
              <h3 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {mockOrders.filter(o => o.status === "pending").length}
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
                  placeholder="搜索订单号、用户、NFT名称、合集或交易哈希..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={chainFilter} onValueChange={setChainFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="链筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部链</SelectItem>
                  <SelectItem value="Ethereum">Ethereum</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                  <SelectItem value="BNB Chain">BNB Chain</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue placeholder="状态筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="processing">处理中</SelectItem>
                  <SelectItem value="pending">待处理</SelectItem>
                  <SelectItem value="rejected">已拒绝</SelectItem>
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
                    NFT信息
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    链
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    目标地址
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    交易哈希
                  </th>
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
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {order.nftName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {order.nftCollection} #{order.tokenId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {order.chain}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        {order.toAddress}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {order.createdAt}
                      </div>
                      {order.completedAt && (
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
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">没有找到符合条件的订单</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
