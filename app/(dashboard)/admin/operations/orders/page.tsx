"use client"

import OperationsLayout from "@/components/operations-layout"
import { 
  ShoppingCart, 
  CheckCircle, 
  XCircle, 
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  TrendingUp,
  DollarSign,
  FileText,
  BarChart2,
  LineChart,
  PiggyBank,
  CreditCard,
  HandCoins,
  Receipt
} from "lucide-react"
import { useState } from "react"

export default function OrdersManagementPage() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [primaryTab, setPrimaryTab] = useState("资金记录")
  const [secondaryTab, setSecondaryTab] = useState("deposit")

  // 第一级页签配置
  const primaryTabs = [
    { id: "资金记录", label: "资金记录", icon: FileText },
    { id: "USDT买卖记录", label: "USDT买卖记录", icon: DollarSign },
    { id: "现货订单", label: "现货订单", icon: BarChart2 },
    { id: "合约订单", label: "合约订单", icon: LineChart },
    { id: "理财订单", label: "理财订单", icon: PiggyBank },
    { id: "U卡订单", label: "U卡订单", icon: CreditCard },
    { id: "担保记录", label: "担保记录", icon: HandCoins },
    { id: "支付订单", label: "支付订单", icon: Receipt }
  ]

  // 第二级页签配置
  const secondaryTabsConfig: Record<string, { key: string; label: string }[]> = {
    "资金记录": [
      { key: "deposit", label: "入金记录" },
      { key: "withdraw", label: "手动代付记录" },
      { key: "internal_transfer", label: "内转记录" },
      { key: "transfer", label: "划转记录" },
      { key: "commission", label: "佣金结算记录" },
      { key: "other", label: "其他记录" }
    ],
    "USDT买卖记录": [
      { key: "c2c", label: "C2C" },
      { key: "quick", label: "快捷" },
      { key: "otc", label: "OTC" }
    ],
    "现货订单": [
      { key: "current", label: "当前委托" },
      { key: "history", label: "历史委托" },
      { key: "trades", label: "成交明细" }
    ],
    "合约订单": [
      { key: "current", label: "当前委托" },
      { key: "plan", label: "计划委托" },
      { key: "history", label: "历史委托" },
      { key: "trades", label: "成交明细" },
      { key: "funding", label: "资金记录" },
      { key: "fees", label: "资金费用" }
    ],
    "理财订单": [
      { key: "invest", label: "投资订单" },
      { key: "account", label: "理财资金记录" }
    ],
    "U卡订单": [
      { key: "recharge", label: "充值记录" },
      { key: "consume", label: "消费记录" }
    ],
    "担保记录": [
      { key: "receive", label: "担保收款记录" },
      { key: "payment", label: "担保付款记录" },
      { key: "credit", label: "信用担保资金记录" }
    ],
    "支付订单": [
      { key: "fiatReceive", label: "法币代收" },
      { key: "fiatPay", label: "法币代付" },
      { key: "cryptoReceive", label: "加密货币代收" },
      { key: "cryptoPay", label: "加密货币代付" }
    ]
  }

  // 获取当前的二级页签列表
  const currentSecondaryTabs = secondaryTabsConfig[primaryTab] || []

  // 切换第一级页签时，重置第二级页签
  const handlePrimaryTabChange = (tabId: string) => {
    setPrimaryTab(tabId)
    const newSecondaryTabs = secondaryTabsConfig[tabId] || []
    if (newSecondaryTabs.length > 0) {
      setSecondaryTab(newSecondaryTabs[0].key)
    }
  }

  const orders = [
    { id: "#2024012001", user: "张三", userId: "user_12345", amount: "¥12,500", type: "现货交易", status: "completed", createTime: "2024-01-20 14:30", completeTime: "2024-01-20 14:32" },
    { id: "#2024012002", user: "李四", userId: "user_23456", amount: "¥8,900", type: "合约交易", status: "processing", createTime: "2024-01-20 14:25", completeTime: "-" },
    { id: "#2024012003", user: "王五", userId: "user_34567", amount: "¥25,000", type: "法币交易", status: "processing", createTime: "2024-01-20 14:20", completeTime: "-" },
    { id: "#2024012004", user: "赵六", userId: "user_45678", amount: "¥3,200", type: "担保交易", status: "completed", createTime: "2024-01-20 14:15", completeTime: "2024-01-20 14:18" },
    { id: "#2024012005", user: "孙七", userId: "user_56789", amount: "¥15,600", type: "现货交易", status: "cancelled", createTime: "2024-01-20 14:10", completeTime: "-" },
    { id: "#2024012006", user: "周八", userId: "user_67890", amount: "¥45,300", type: "合约交易", status: "completed", createTime: "2024-01-20 14:05", completeTime: "2024-01-20 14:08" }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">已完成</span>
      case "processing":
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">处理中</span>
      case "cancelled":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">已取消</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">未知</span>
    }
  }

  return (
    <OperationsLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">订单管理</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">查看和管理所有交易订单</p>
          </div>
          <button className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>导出订单</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs text-green-600 font-semibold">+12.3%</span>
            </div>
            <div className="text-2xl font-bold">8,901</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">总订单数</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-xs text-green-600 font-semibold">81.3%</span>
            </div>
            <div className="text-2xl font-bold">7,234</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">已完成</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-xs text-blue-600 font-semibold">16.4%</span>
            </div>
            <div className="text-2xl font-bold">1,456</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">处理中</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-xs text-red-600 font-semibold">2.3%</span>
            </div>
            <div className="text-2xl font-bold">211</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">已取消</div>
          </div>
        </div>

        {/* 两级页签 */}
        <div className="mb-6 space-y-4">
          {/* 第一级页签 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-1">
            <div className="flex items-center overflow-x-auto">
              {primaryTabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => handlePrimaryTabChange(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 ${
                      primaryTab === tab.id
                        ? "bg-custom-green text-white shadow-md"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 第二级页签 */}
          {currentSecondaryTabs.length > 0 && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {currentSecondaryTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSecondaryTab(tab.key)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                    secondaryTab === tab.key
                      ? "bg-custom-green/10 text-custom-green border-2 border-custom-green"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-custom-green/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-4">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索订单号、用户名..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green"
                />
              </div>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green"
              >
                <option value="all">全部类型</option>
                <option value="spot">现货交易</option>
                <option value="futures">合约交易</option>
                <option value="fiat">法币交易</option>
                <option value="guarantee">担保交易</option>
              </select>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green"
              >
                <option value="all">全部状态</option>
                <option value="completed">已完成</option>
                <option value="processing">处理中</option>
                <option value="cancelled">已取消</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">订单编号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">用户</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">创建时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-mono text-sm font-medium">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium">{order.user}</div>
                        <div className="text-xs text-gray-500">{order.userId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-custom-green">{order.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                        {order.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.createTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        {order.status === "processing" && (
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <Edit className="w-4 h-4 text-green-600" />
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
            <div className="text-sm text-gray-500">显示 1-6 条，共 8,901 条</div>
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
