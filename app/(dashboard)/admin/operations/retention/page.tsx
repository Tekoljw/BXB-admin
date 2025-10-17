import OperationsLayout from "@/components/operations-layout"
import { Users, Activity, Clock } from "lucide-react"

export default function RetentionAnalysisPage() {
  return (
    <OperationsLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">留存与活跃分析报表</h1>
        
        {/* 核心指标 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-green-600 text-sm font-medium">+5.2%</span>
            </div>
            <div className="text-2xl font-bold">68.5%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">次日留存率</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-green-600 text-sm font-medium">+3.8%</span>
            </div>
            <div className="text-2xl font-bold">45,678</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">日活跃用户(DAU)</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-green-600 text-sm font-medium">+12.3%</span>
            </div>
            <div className="text-2xl font-bold">28.5分钟</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">平均使用时长</div>
          </div>
        </div>

        {/* 留存率趋势图 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">留存率趋势</h2>
          <div className="h-80 flex items-center justify-center text-gray-400">
            <Users className="w-16 h-16 opacity-20" />
          </div>
        </div>

        {/* 活跃度分析 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">用户活跃度分布</h2>
          <div className="h-80 flex items-center justify-center text-gray-400">
            <Activity className="w-16 h-16 opacity-20" />
          </div>
        </div>
      </div>
    </OperationsLayout>
  )
}
