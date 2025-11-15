"use client"

import React, { useState } from "react"
import OrdersLayout from "@/components/orders-layout"
import { CheckCircle, XCircle, Search, AlertTriangle } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"

export default function LargeWithdrawalAuditPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [isAuditDialogOpen, setIsAuditDialogOpen] = useState(false)
  const [auditAction, setAuditAction] = useState<'approve' | 'reject'>('approve')

  const records = [
    { 
      id: 1, 
      userId: "U10001", 
      userName: "张三",
      amount: "50000.00", 
      currency: "USDT", 
      network: "TRC20",
      address: "TXnh7a...kdj8s",
      submitTime: "2024-11-15 14:30:25",
      riskLevel: "高",
      status: "待审核" 
    },
    { 
      id: 2, 
      userId: "U10002", 
      userName: "李四",
      amount: "100000.00", 
      currency: "BTC", 
      network: "BTC",
      address: "1A1zP1...fHSeYi",
      submitTime: "2024-11-15 12:15:10",
      riskLevel: "中",
      status: "待审核" 
    },
    { 
      id: 3, 
      userId: "U10003", 
      userName: "王五",
      amount: "75000.00", 
      currency: "USDT", 
      network: "ERC20",
      address: "0x742d3...8a9bc",
      submitTime: "2024-11-15 09:45:33",
      riskLevel: "低",
      status: "已通过",
      auditor: "管理员A",
      auditTime: "2024-11-15 10:00:00"
    },
    { 
      id: 4, 
      userId: "U10004", 
      userName: "赵六",
      amount: "200000.00", 
      currency: "USDT", 
      network: "TRC20",
      address: "TYnh8b...lej9t",
      submitTime: "2024-11-14 18:20:15",
      riskLevel: "高",
      status: "已拒绝",
      auditor: "管理员B",
      auditTime: "2024-11-14 19:00:00",
      rejectReason: "地址异常"
    },
  ]

  const filteredRecords = records.filter(record => 
    record.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.userName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAudit = (record: any, action: 'approve' | 'reject') => {
    setSelectedRecord(record)
    setAuditAction(action)
    setIsAuditDialogOpen(true)
  }

  const pendingCount = records.filter(r => r.status === '待审核').length
  const approvedCount = records.filter(r => r.status === '已通过').length
  const rejectedCount = records.filter(r => r.status === '已拒绝').length

  return (
    <OrdersLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">大额提币审核</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">待审核</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pendingCount}</h3>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已通过</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{approvedCount}</h3>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已拒绝</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{rejectedCount}</h3>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日审核</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3</h3>
              </div>
              <CheckCircle className="w-8 h-8 text-custom-green" />
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">用户信息</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">金额</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">币种/网络</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">提币地址</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">风险等级</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">提交时间</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{record.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{record.userName}</div>
                        <div className="text-gray-500 dark:text-gray-400">{record.userId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">{record.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div>
                        <div className="text-gray-900 dark:text-white">{record.currency}</div>
                        <div className="text-gray-500 dark:text-gray-400">{record.network}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-gray-400">{record.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        record.riskLevel === '高' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                        record.riskLevel === '中' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {record.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{record.submitTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === '已通过' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                        record.status === '已拒绝' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {record.status === '待审核' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleAudit(record, 'approve')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleAudit(record, 'reject')}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                      {record.status === '已通过' && record.auditor && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {record.auditor}<br/>{record.auditTime}
                        </div>
                      )}
                      {record.status === '已拒绝' && record.auditor && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {record.auditor}<br/>{record.auditTime}
                        </div>
                      )}
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

      <Dialog open={isAuditDialogOpen} onOpenChange={setIsAuditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {auditAction === 'approve' ? '通过审核' : '拒绝审核'}
            </DialogTitle>
            <DialogDescription>
              {selectedRecord && (
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">用户：</span>
                    <span className="font-medium">{selectedRecord.userName} ({selectedRecord.userId})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">金额：</span>
                    <span className="font-medium">{selectedRecord.amount} {selectedRecord.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">网络：</span>
                    <span className="font-medium">{selectedRecord.network}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">地址：</span>
                    <span className="font-mono text-xs">{selectedRecord.address}</span>
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          {auditAction === 'reject' && (
            <div className="grid gap-2 py-4">
              <label className="text-sm font-medium">拒绝原因</label>
              <Textarea placeholder="请输入拒绝原因..." />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAuditDialogOpen(false)}>
              取消
            </Button>
            <Button 
              className={auditAction === 'approve' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}
              onClick={() => setIsAuditDialogOpen(false)}
            >
              确认{auditAction === 'approve' ? '通过' : '拒绝'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </OrdersLayout>
  )
}
