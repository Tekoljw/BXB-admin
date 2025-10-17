"use client"

import OperationsLayout from "@/components/operations-layout"
import { 
  FileCheck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  DollarSign,
  TrendingUp,
  Users
} from "lucide-react"
import { useState } from "react"

export default function AuditPage() {
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const auditItems = [
    { 
      id: "#WD2024012001", 
      type: "提现审核", 
      user: "user_123456", 
      userName: "张三",
      amount: "¥50,000", 
      applyTime: "2024-01-20 15:30",
      riskLevel: "中",
      status: "pending",
      reason: "-"
    },
    { 
      id: "#DP2024012002", 
      type: "充值审核", 
      user: "user_789012", 
      userName: "李四",
      amount: "¥30,000", 
      applyTime: "2024-01-20 14:20",
      riskLevel: "低",
      status: "pending",
      reason: "-"
    },
    { 
      id: "#TR2024012003", 
      type: "交易审核", 
      user: "user_345678", 
      userName: "王五",
      amount: "¥120,000", 
      applyTime: "2024-01-20 13:15",
      riskLevel: "高",
      status: "approved",
      reason: "审核通过"
    },
    { 
      id: "#WD2024012004", 
      type: "提现审核", 
      user: "user_456789", 
      userName: "赵六",
      amount: "¥25,000", 
      applyTime: "2024-01-20 12:45",
      riskLevel: "低",
      status: "rejected",
      reason: "银行卡信息不符"
    },
    { 
      id: "#DP2024012005", 
      type: "充值审核", 
      user: "user_567890", 
      userName: "孙七",
      amount: "¥80,000", 
      applyTime: "2024-01-20 11:30",
      riskLevel: "中",
      status: "approved",
      reason: "审核通过"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">待审核</span>
      case "approved":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">已通过</span>
      case "rejected":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">已拒绝</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">未知</span>
    }
  }

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "高":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">高风险</span>
      case "中":
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">中风险</span>
      case "低":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">低风险</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">未知</span>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "提现审核":
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">提现审核</span>
      case "充值审核":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">充值审核</span>
      case "交易审核":
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">交易审核</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">{type}</span>
    }
  }

  return (
    <OperationsLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">财务审核</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">处理充值、提现和交易审核</p>
          </div>
          <button className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>导出报表</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">45</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">待审核</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">已通过</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">89</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">已拒绝</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">异常记录</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-4">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索申请编号、用户ID..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green"
                />
              </div>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green"
              >
                <option value="all">全部类型</option>
                <option value="withdraw">提现审核</option>
                <option value="deposit">充值审核</option>
                <option value="trade">交易审核</option>
              </select>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green"
              >
                <option value="all">全部状态</option>
                <option value="pending">待审核</option>
                <option value="approved">已通过</option>
                <option value="rejected">已拒绝</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">申请编号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">用户</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">风险等级</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">申请时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {auditItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-mono text-sm font-medium">{item.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(item.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium">{item.userName}</div>
                        <div className="text-xs text-gray-500">{item.user}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-custom-green">{item.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRiskBadge(item.riskLevel)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.applyTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {item.status === "pending" ? (
                          <>
                            <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors">
                              通过
                            </button>
                            <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors">
                              拒绝
                            </button>
                          </>
                        ) : (
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-500">显示 1-5 条，共 1,380 条</div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
                上一页
              </button>
              <button className="px-3 py-1 bg-custom-green text-white rounded hover:bg-custom-green/90">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
    </OperationsLayout>
  )
}
