import OperationsLayout from "@/components/operations-layout"
import { Shield, AlertTriangle, Lock, Settings } from "lucide-react"

export default function RiskConfigPage() {
  return (
    <OperationsLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">风控配置</h1>
        
        {/* 风控状态 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                正常
              </span>
            </div>
            <div className="text-2xl font-bold">系统安全</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">风控系统运行正常</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-yellow-600 text-sm font-medium">12个</span>
            </div>
            <div className="text-2xl font-bold">待处理警报</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">需要人工审核</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-red-600 text-sm font-medium">3个</span>
            </div>
            <div className="text-2xl font-bold">账户冻结</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">触发风控规则</div>
          </div>
        </div>

        {/* 风控规则配置 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">风控规则配置</h2>
            <button className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors">
              新增规则
            </button>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <Settings className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">单日交易限额</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">单个账户每日最大交易金额：¥100,000</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  已启用
                </span>
                <button className="text-custom-green hover:underline">编辑</button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <Settings className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">异常IP检测</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">检测并拦截可疑IP地址登录</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  已启用
                </span>
                <button className="text-custom-green hover:underline">编辑</button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <Settings className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">大额提现审核</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">超过¥50,000的提现需要人工审核</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  已启用
                </span>
                <button className="text-custom-green hover:underline">编辑</button>
              </div>
            </div>
          </div>
        </div>

        {/* 风控日志 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">风控日志</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">用户</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">规则</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">处理结果</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2024-01-20 15:30</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      警告
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">user123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">单日交易限额</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">待审核</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-custom-green hover:underline">查看详情</button>
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
