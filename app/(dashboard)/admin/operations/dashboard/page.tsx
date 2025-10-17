import OperationsLayout from "@/components/operations-layout"
import { LayoutDashboard, DollarSign, Users, TrendingUp, ShoppingCart } from "lucide-react"

export default function DashboardPage() {
  return (
    <OperationsLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">总仪表盘</h1>
        
        {/* 核心指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-green-600 text-sm font-medium">+12.5%</span>
            </div>
            <div className="text-2xl font-bold">¥15,678,900</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">今日交易额</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-green-600 text-sm font-medium">+8.2%</span>
            </div>
            <div className="text-2xl font-bold">1,234</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">今日新增用户</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-green-600 text-sm font-medium">+5.3%</span>
            </div>
            <div className="text-2xl font-bold">45,678</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">活跃用户数</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-red-600 text-sm font-medium">-2.1%</span>
            </div>
            <div className="text-2xl font-bold">8,901</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">今日订单量</div>
          </div>
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">交易趋势</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <LayoutDashboard className="w-16 h-16 opacity-20" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">用户增长</h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <TrendingUp className="w-16 h-16 opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </OperationsLayout>
  )
}
