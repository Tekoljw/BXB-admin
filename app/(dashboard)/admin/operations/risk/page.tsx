"use client"

import OperationsLayout from "@/components/operations-layout"
import { 
  Shield, 
  AlertTriangle,
  Ban,
  DollarSign,
  Clock,
  TrendingUp,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  X
} from "lucide-react"
import { useState } from "react"

export default function RiskConfigPage() {
  const [activeTab, setActiveTab] = useState("rules")

  const riskRules = [
    { id: 1, name: "单笔交易限额", type: "交易监控", status: "active", threshold: "¥50,000", action: "人工审核" },
    { id: 2, name: "日交易频次限制", type: "频次控制", status: "active", threshold: "20次/天", action: "暂停交易" },
    { id: 3, name: "异常IP检测", type: "安全防护", status: "active", threshold: "3个IP/小时", action: "冻结账户" },
    { id: 4, name: "大额充值监控", type: "资金监控", status: "active", threshold: "¥100,000", action: "人工审核" },
    { id: 5, name: "异常提现检测", type: "提现风控", status: "inactive", threshold: "连续3次失败", action: "锁定账户" }
  ]

  const blacklist = [
    { id: 1, type: "用户", value: "user_12345", reason: "涉嫌洗钱", addTime: "2024-01-15 14:30", operator: "管理员A" },
    { id: 2, type: "IP", value: "192.168.1.100", reason: "恶意攻击", addTime: "2024-01-14 10:20", operator: "管理员B" },
    { id: 3, type: "银行卡", value: "6222****1234", reason: "异常交易", addTime: "2024-01-13 16:45", operator: "管理员C" },
    { id: 4, type: "设备", value: "Device_ABCD1234", reason: "多账号关联", addTime: "2024-01-12 09:15", operator: "管理员A" }
  ]

  const alertLogs = [
    { id: 1, type: "高风险", user: "user_98765", event: "单笔交易超限", amount: "¥85,000", time: "2024-01-20 15:30", status: "待处理" },
    { id: 2, type: "中风险", user: "user_45678", event: "频繁交易", amount: "25笔/天", time: "2024-01-20 14:15", status: "已处理" },
    { id: 3, type: "低风险", user: "user_23456", event: "异地登录", amount: "-", time: "2024-01-20 13:00", status: "已忽略" },
    { id: 4, type: "高风险", user: "user_67890", event: "大额提现", amount: "¥120,000", time: "2024-01-20 11:45", status: "待处理" }
  ]

  return (
    <OperationsLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">风控配置</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">管理风险控制规则和黑名单</p>
          </div>
          <button className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>添加规则</span>
          </button>
        </div>

        <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "rules"
                ? "text-custom-green border-b-2 border-custom-green"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            风控规则
          </button>
          <button
            onClick={() => setActiveTab("blacklist")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "blacklist"
                ? "text-custom-green border-b-2 border-custom-green"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            黑名单管理
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "alerts"
                ? "text-custom-green border-b-2 border-custom-green"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            预警日志
          </button>
        </div>

        {activeTab === "rules" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">规则名称</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">类型</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">触发阈值</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">处理动作</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {riskRules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 text-blue-500 mr-2" />
                          <span className="font-medium">{rule.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                          {rule.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{rule.threshold}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{rule.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          rule.status === 'active'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {rule.status === 'active' ? '启用' : '禁用'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "blacklist" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索黑名单（用户ID、IP、银行卡号等）"
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green"
                />
              </div>
              <button className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                <Ban className="w-4 h-4" />
                <span>添加黑名单</span>
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">值</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">原因</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">添加时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">操作人</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {blacklist.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{item.value}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.reason}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.addTime}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{item.operator}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                              <Eye className="w-4 h-4 text-blue-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">风险等级</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">用户ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">事件</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">金额/次数</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">触发时间</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {alertLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          log.type === '高风险' 
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                            : log.type === '中风险'
                            ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                            : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {log.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{log.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{log.event}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{log.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          log.status === '待处理'
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : log.status === '已处理'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <Check className="w-4 h-4 text-green-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </OperationsLayout>
  )
}
