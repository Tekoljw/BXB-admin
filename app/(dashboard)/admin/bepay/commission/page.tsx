"use client"

import React, { useState } from "react"
import { Trophy, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface UserCommission {
  userId: string
  userName: string
  email: string
  totalCommission: number
  monthlyCommission: number
  orderCount: number
  successRate: number
  rank: number
}

interface CommissionRecord {
  id: string
  orderId: string
  amount: number
  commission: number
  rate: string
  merchantId: string
  createdAt: string
  status: "pending" | "settled"
}

const mockUsers: UserCommission[] = [
  {
    userId: "U001",
    userName: "张三",
    email: "zhangsan@example.com",
    totalCommission: 125000.50,
    monthlyCommission: 12500.00,
    orderCount: 1523,
    successRate: 98.5,
    rank: 1
  },
  {
    userId: "U002",
    userName: "李四",
    email: "lisi@example.com",
    totalCommission: 98500.25,
    monthlyCommission: 9850.00,
    orderCount: 987,
    successRate: 97.2,
    rank: 2
  },
  {
    userId: "U003",
    userName: "王五",
    email: "wangwu@example.com",
    totalCommission: 85200.00,
    monthlyCommission: 8520.00,
    orderCount: 765,
    successRate: 96.8,
    rank: 3
  },
  {
    userId: "U004",
    userName: "赵六",
    email: "zhaoliu@example.com",
    totalCommission: 72000.75,
    monthlyCommission: 7200.00,
    orderCount: 654,
    successRate: 95.5,
    rank: 4
  },
  {
    userId: "U005",
    userName: "孙七",
    email: "sunqi@example.com",
    totalCommission: 68500.00,
    monthlyCommission: 6850.00,
    orderCount: 589,
    successRate: 94.2,
    rank: 5
  },
  {
    userId: "U006",
    userName: "周八",
    email: "zhouba@example.com",
    totalCommission: 55000.00,
    monthlyCommission: 5500.00,
    orderCount: 432,
    successRate: 93.8,
    rank: 6
  },
]

const mockRecords: Record<string, CommissionRecord[]> = {
  "U001": [
    {
      id: "COM001",
      orderId: "ORD2024110601",
      amount: 1500.00,
      commission: 15.00,
      rate: "1.0%",
      merchantId: "M001",
      createdAt: "2024-11-06 10:30:00",
      status: "settled"
    },
    {
      id: "COM002",
      orderId: "ORD2024110602",
      amount: 2800.00,
      commission: 28.00,
      rate: "1.0%",
      merchantId: "M002",
      createdAt: "2024-11-06 10:45:00",
      status: "settled"
    },
    {
      id: "COM003",
      orderId: "ORD2024110603",
      amount: 5000.00,
      commission: 50.00,
      rate: "1.0%",
      merchantId: "M001",
      createdAt: "2024-11-06 11:00:00",
      status: "pending"
    },
    {
      id: "COM004",
      orderId: "ORD2024110604",
      amount: 3200.00,
      commission: 32.00,
      rate: "1.0%",
      merchantId: "M003",
      createdAt: "2024-11-06 11:15:00",
      status: "settled"
    },
  ],
  "U002": [
    {
      id: "COM005",
      orderId: "ORD2024110605",
      amount: 8500.00,
      commission: 85.00,
      rate: "1.0%",
      merchantId: "M004",
      createdAt: "2024-11-06 11:30:00",
      status: "settled"
    },
    {
      id: "COM006",
      orderId: "ORD2024110606",
      amount: 950.00,
      commission: 9.50,
      rate: "1.0%",
      merchantId: "M002",
      createdAt: "2024-11-06 11:45:00",
      status: "settled"
    },
  ],
}

export default function CommissionPage() {
  const [users] = useState<UserCommission[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserCommission | null>(null)
  const [userRecords, setUserRecords] = useState<CommissionRecord[]>([])

  const filteredUsers = users.filter(user => 
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openDetailDialog = (user: UserCommission) => {
    setSelectedUser(user)
    setUserRecords(mockRecords[user.userId] || [])
    setIsDetailDialogOpen(true)
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />
    if (rank === 3) return <Trophy className="w-5 h-5 text-orange-600" />
    return null
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500 font-bold"
    if (rank === 2) return "text-gray-400 font-bold"
    if (rank === 3) return "text-orange-600 font-bold"
    return "text-gray-900 dark:text-white"
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">用户佣金排行榜</h2>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="搜索用户名、邮箱或ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  排名
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  用户信息
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  佣金数据
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  交易数据
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      {getRankIcon(user.rank)}
                      <span className={getRankColor(user.rank)}>#{user.rank}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">{user.userName}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{user.userId}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">{user.email}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="font-semibold text-green-600 dark:text-green-400">
                      累计: ${user.totalCommission.toLocaleString()}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                      本月: ${user.monthlyCommission.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <div className="text-gray-900 dark:text-gray-300">
                      订单: {user.orderCount.toLocaleString()}
                    </div>
                    <div className={`text-xs mt-1 font-medium ${
                      user.successRate >= 98 ? "text-green-600 dark:text-green-400" :
                      user.successRate >= 95 ? "text-yellow-600 dark:text-yellow-400" :
                      "text-red-600 dark:text-red-400"
                    }`}>
                      成功率: {user.successRate}%
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDetailDialog(user)}
                      className="text-custom-green hover:text-custom-green/80"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      查看详情
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            暂无数据
          </div>
        )}
      </div>

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>佣金详细记录 - {selectedUser?.userName}</DialogTitle>
            <DialogDescription>
              用户ID: {selectedUser?.userId} | 累计佣金: ${selectedUser?.totalCommission.toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      记录ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      订单号
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      商户ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      订单金额
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      佣金比例
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      佣金金额
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      创建时间
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      状态
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {userRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {record.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {record.orderId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {record.merchantId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        ${record.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {record.rate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ${record.commission.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {record.createdAt}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === "settled"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        }`}>
                          {record.status === "settled" ? "已结算" : "待结算"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {userRecords.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                该用户暂无佣金记录
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
