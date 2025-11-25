"use client"

import React, { useState } from "react"
import { Search, Calendar } from "lucide-react"
import { DataTotal } from "@/components/data-total"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FreezeRecord {
  id: string
  orderId: string
  userId: string
  userName: string
  type: "freeze" | "unfreeze"
  currency: string
  amount: number
  balanceBefore: number
  balanceAfter: number
  frozenBefore: number
  frozenAfter: number
  reason: string
  operator: string
  createdAt: string
}

const mockFreezeRecords: FreezeRecord[] = [
  {
    id: "FR001",
    orderId: "FRZ20241125001",
    userId: "U100003",
    userName: "云端收银",
    type: "freeze",
    currency: "CNY",
    amount: 50000,
    balanceBefore: 320000,
    balanceAfter: 270000,
    frozenBefore: 25000,
    frozenAfter: 75000,
    reason: "风控审核冻结",
    operator: "admin001",
    createdAt: "2024-11-25 10:30:00"
  },
  {
    id: "FR002",
    orderId: "UFR20241125001",
    userId: "U100003",
    userName: "云端收银",
    type: "unfreeze",
    currency: "CNY",
    amount: 20000,
    balanceBefore: 270000,
    balanceAfter: 290000,
    frozenBefore: 75000,
    frozenAfter: 55000,
    reason: "审核通过解冻",
    operator: "admin002",
    createdAt: "2024-11-25 11:45:00"
  },
  {
    id: "FR003",
    orderId: "FRZ20241124001",
    userId: "U100004",
    userName: "星际支付",
    type: "freeze",
    currency: "USD",
    amount: 10000,
    balanceBefore: 210000,
    balanceAfter: 200000,
    frozenBefore: 0,
    frozenAfter: 10000,
    reason: "大额交易冻结",
    operator: "admin001",
    createdAt: "2024-11-24 15:20:00"
  },
  {
    id: "FR004",
    orderId: "FRZ20241124002",
    userId: "U100006",
    userName: "聚合支付平台",
    type: "freeze",
    currency: "USDT",
    amount: 25000,
    balanceBefore: 125000,
    balanceAfter: 100000,
    frozenBefore: 5000,
    frozenAfter: 30000,
    reason: "账户异常冻结",
    operator: "admin003",
    createdAt: "2024-11-24 09:10:00"
  },
  {
    id: "FR005",
    orderId: "UFR20241123001",
    userId: "U100004",
    userName: "星际支付",
    type: "unfreeze",
    currency: "USD",
    amount: 5000,
    balanceBefore: 200000,
    balanceAfter: 205000,
    frozenBefore: 10000,
    frozenAfter: 5000,
    reason: "部分解冻",
    operator: "admin002",
    createdAt: "2024-11-23 16:30:00"
  },
  {
    id: "FR006",
    orderId: "FRZ20241123001",
    userId: "U100007",
    userName: "数字钱包",
    type: "freeze",
    currency: "EUR",
    amount: 8000,
    balanceBefore: 45000,
    balanceAfter: 37000,
    frozenBefore: 2000,
    frozenAfter: 10000,
    reason: "合规审查冻结",
    operator: "admin001",
    createdAt: "2024-11-23 11:00:00"
  },
  {
    id: "FR007",
    orderId: "UFR20241122001",
    userId: "U100006",
    userName: "聚合支付平台",
    type: "unfreeze",
    currency: "USDT",
    amount: 15000,
    balanceBefore: 100000,
    balanceAfter: 115000,
    frozenBefore: 30000,
    frozenAfter: 15000,
    reason: "风控审核通过",
    operator: "admin003",
    createdAt: "2024-11-22 14:20:00"
  },
  {
    id: "FR008",
    orderId: "FRZ20241122001",
    userId: "U100008",
    userName: "闪付通",
    type: "freeze",
    currency: "GBP",
    amount: 3000,
    balanceBefore: 18000,
    balanceAfter: 15000,
    frozenBefore: 0,
    frozenAfter: 3000,
    reason: "用户申诉冻结",
    operator: "admin002",
    createdAt: "2024-11-22 10:15:00"
  },
]

const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "CNY": return "¥"
    case "USD": return "$"
    case "EUR": return "€"
    case "GBP": return "£"
    case "USDT": return ""
    default: return ""
  }
}

const formatAmount = (amount: number, currency: string) => {
  const symbol = getCurrencySymbol(currency)
  if (currency === "USDT") {
    return `${amount.toLocaleString()} USDT`
  }
  return `${symbol}${amount.toLocaleString()}`
}

export default function FreezeRecordsPage() {
  const [records] = useState<FreezeRecord[]>(mockFreezeRecords)
  const [recordType, setRecordType] = useState<"all" | "freeze" | "unfreeze">("all")
  const [searchUserId, setSearchUserId] = useState("")
  const [searchOrderId, setSearchOrderId] = useState("")
  const [searchOperator, setSearchOperator] = useState("")
  const [dateRange, setDateRange] = useState("")

  const filteredRecords = records.filter(record => {
    if (recordType === "freeze" && record.type !== "freeze") return false
    if (recordType === "unfreeze" && record.type !== "unfreeze") return false
    
    if (searchUserId && !record.userId.toLowerCase().includes(searchUserId.toLowerCase()) &&
        !record.userName.toLowerCase().includes(searchUserId.toLowerCase())) {
      return false
    }
    
    if (searchOrderId && !record.orderId.toLowerCase().includes(searchOrderId.toLowerCase())) {
      return false
    }
    
    if (searchOperator && !record.operator.toLowerCase().includes(searchOperator.toLowerCase())) {
      return false
    }
    
    return true
  })

  const handleReset = () => {
    setSearchUserId("")
    setSearchOrderId("")
    setSearchOperator("")
    setDateRange("")
  }

  const freezeCount = records.filter(r => r.type === "freeze").length
  const unfreezeCount = records.filter(r => r.type === "unfreeze").length

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">冻解记录</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Tabs value={recordType} onValueChange={(value) => setRecordType(value as "all" | "freeze" | "unfreeze")}>
            <TabsList>
              <TabsTrigger value="all">
                全部记录
                <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  {records.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="freeze">
                冻结记录
                <span className="ml-2 px-2 py-0.5 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
                  {freezeCount}
                </span>
              </TabsTrigger>
              <TabsTrigger value="unfreeze">
                解冻记录
                <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                  {unfreezeCount}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Input
                placeholder="用户ID/用户名"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
                className="w-40"
              />
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="订单号"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                className="w-40"
              />
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="操作管理员"
                value={searchOperator}
                onChange={(e) => setSearchOperator(e.target.value)}
                className="w-40"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-36">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="时间筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">今天</SelectItem>
                  <SelectItem value="yesterday">昨天</SelectItem>
                  <SelectItem value="week">本周</SelectItem>
                  <SelectItem value="month">本月</SelectItem>
                  <SelectItem value="all">全部</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="default" size="sm" className="bg-custom-green hover:bg-custom-green/90">
              <Search className="w-4 h-4 mr-1" />
              搜索
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              重置
            </Button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      订单号
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      用户信息
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      类型
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      币种
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      金额
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      余额变动
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      冻结变动
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      原因
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      操作员
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      时间
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 text-sm">
                        <div className="font-mono text-blue-600 dark:text-blue-400">
                          {record.orderId}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {record.userName}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs">
                          {record.userId}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.type === "freeze"
                            ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                            : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        }`}>
                          {record.type === "freeze" ? "冻结" : "解冻"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium text-gray-700 dark:text-gray-300">
                          {record.currency}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className={`font-semibold ${
                          record.type === "freeze" 
                            ? "text-orange-600 dark:text-orange-400" 
                            : "text-green-600 dark:text-green-400"
                        }`}>
                          {record.type === "freeze" ? "-" : "+"}{formatAmount(record.amount, record.currency)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-gray-500 dark:text-gray-400 text-xs">
                          {formatAmount(record.balanceBefore, record.currency)}
                        </div>
                        <div className="text-gray-900 dark:text-white font-medium">
                          → {formatAmount(record.balanceAfter, record.currency)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-gray-500 dark:text-gray-400 text-xs">
                          {formatAmount(record.frozenBefore, record.currency)}
                        </div>
                        <div className="text-orange-600 dark:text-orange-400 font-medium">
                          → {formatAmount(record.frozenAfter, record.currency)}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-gray-700 dark:text-gray-300 max-w-[150px] truncate" title={record.reason}>
                          {record.reason}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="text-purple-600 dark:text-purple-400 font-medium">
                          {record.operator}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {record.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRecords.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                暂无数据
              </div>
            )}

            {filteredRecords.length > 0 && (
              <DataTotal total={filteredRecords.length} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
