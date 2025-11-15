"use client"

import React, { useState } from "react"
import OrdersLayout from "@/components/orders-layout"
import { ArrowLeftRight, Search, Plus } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ManualTransferPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const records = [
    { 
      id: 1, 
      fromUserId: "U10001", 
      fromUserName: "张三",
      toUserId: "U10002",
      toUserName: "李四",
      amount: "500.00", 
      currency: "USDT", 
      reason: "用户申请转账", 
      operator: "管理员A", 
      time: "2024-11-15 14:30:25", 
      status: "已完成" 
    },
    { 
      id: 2, 
      fromUserId: "U10003", 
      fromUserName: "王五",
      toUserId: "U10004",
      toUserName: "赵六",
      amount: "1000.00", 
      currency: "BTC", 
      reason: "商户结算", 
      operator: "管理员B", 
      time: "2024-11-15 12:15:10", 
      status: "已完成" 
    },
    { 
      id: 3, 
      fromUserId: "U10005", 
      fromUserName: "孙七",
      toUserId: "U10006",
      toUserName: "周八",
      amount: "2000.00", 
      currency: "USDT", 
      reason: "资金归集", 
      operator: "管理员C", 
      time: "2024-11-15 09:45:33", 
      status: "处理中" 
    },
  ]

  const filteredRecords = records.filter(record => 
    record.fromUserId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.fromUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.toUserId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.toUserName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <OrdersLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">手动转账</h1>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-custom-green hover:bg-custom-green/90">
            <Plus className="w-4 h-4 mr-2" />
            新增转账
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日转账</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8</h3>
              </div>
              <ArrowLeftRight className="w-8 h-8 text-custom-green" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">处理中</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1</h3>
              </div>
              <ArrowLeftRight className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">本月总额</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">15,000 USDT</h3>
              </div>
              <ArrowLeftRight className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="搜索用户ID或用户名..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">转出用户</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">转入用户</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">金额</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">币种</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">原因</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作员</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{record.fromUserName}</div>
                        <div className="text-gray-500 dark:text-gray-400">{record.fromUserId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{record.toUserName}</div>
                        <div className="text-gray-500 dark:text-gray-400">{record.toUserId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{record.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.currency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{record.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.operator}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{record.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === '已完成' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              共 {filteredRecords.length} 条记录
            </p>
          </div>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>新增手动转账</DialogTitle>
            <DialogDescription>
              在用户之间转移资金
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fromUserId">转出用户ID</Label>
              <Input id="fromUserId" placeholder="请输入转出用户ID" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="toUserId">转入用户ID</Label>
              <Input id="toUserId" placeholder="请输入转入用户ID" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currency">币种</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="选择币种" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">金额</Label>
              <Input id="amount" type="number" placeholder="请输入转账金额" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">原因</Label>
              <Input id="reason" placeholder="请输入转账原因" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              取消
            </Button>
            <Button className="bg-custom-green hover:bg-custom-green/90" onClick={() => setIsAddDialogOpen(false)}>
              确认
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </OrdersLayout>
  )
}
