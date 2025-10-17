import OperationsLayout from "@/components/operations-layout"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"

export default function FundsAnalysisPage() {
  return (
    <OperationsLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">出入金分析报表</h1>
        
        {/* 汇总数据 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-green-600 text-sm font-medium">+15.8%</span>
            </div>
            <div className="text-2xl font-bold">¥8,456,320</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">今日入金总额</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-red-600 text-sm font-medium">-8.3%</span>
            </div>
            <div className="text-2xl font-bold">¥6,234,580</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">今日出金总额</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-green-600 text-sm font-medium">+2.5%</span>
            </div>
            <div className="text-2xl font-bold">¥2,221,740</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">净入金额</div>
          </div>
        </div>

        {/* 出入金趋势图表 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">出入金趋势（最近30天）</h2>
          <div className="h-80 flex items-center justify-center text-gray-400">
            <TrendingUp className="w-16 h-16 opacity-20" />
          </div>
        </div>

        {/* 详细数据表格 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">明细数据</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">日期</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">入金金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">出金金额</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">净入金</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">环比</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2024-01-20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">¥8,456,320</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">¥6,234,580</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">¥2,221,740</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+15.8%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OperationsLayout>
  )
}
