import OperationsLayout from "@/components/operations-layout"
import { FileCheck, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"

export default function AuditPage() {
  return (
    <OperationsLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">财务审核</h1>
        
        {/* 审核统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">45</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">待审核</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">已通过</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">已拒绝</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">异常记录</div>
          </div>
        </div>

        {/* 审核列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">审核队列</h2>
            <div className="flex space-x-2">
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm">
                <option>全部类型</option>
                <option>提现审核</option>
                <option>充值审核</option>
                <option>交易审核</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm">
                <option>全部状态</option>
                <option>待审核</option>
                <option>已通过</option>
                <option>已拒绝</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">申请编号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">用户</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">申请时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">#WD2024012001</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      提现审核
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">user_123456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">¥50,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2024-01-20 15:30</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      待审核
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                      通过
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                      拒绝
                    </button>
                    <button className="text-custom-green hover:underline">详情</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">#DP2024012002</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      充值审核
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">user_789012</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">¥30,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2024-01-20 14:20</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      待审核
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                      通过
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                      拒绝
                    </button>
                    <button className="text-custom-green hover:underline">详情</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">#TR2024012003</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                      交易审核
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">user_345678</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">¥120,000</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2024-01-20 13:15</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      已通过
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button className="text-custom-green hover:underline">详情</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OperationsLayout>
  )
}
