import OperationsLayout from "@/components/operations-layout"
import { Calendar, Gift, TrendingUp, Users } from "lucide-react"

export default function ActivitiesConfigPage() {
  return (
    <OperationsLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">活动配置</h1>
        
        {/* 活动统计 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">进行中活动</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">12,456</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">总参与人数</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">¥234,500</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">奖励发放总额</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">23.5%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">平均转化率</div>
          </div>
        </div>

        {/* 活动列表 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold">活动列表</h2>
            <button className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors">
              创建活动
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">活动名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">时间范围</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">参与人数</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">新年交易大礼包</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">交易返利</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2024-01-15 至 2024-02-15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">3,245</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      进行中
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button className="text-custom-green hover:underline">编辑</button>
                    <button className="text-red-600 hover:underline">结束</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">邀请好友送U卡</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">邀请奖励</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">2024-01-10 至 2024-03-10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">5,678</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      进行中
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button className="text-custom-green hover:underline">编辑</button>
                    <button className="text-red-600 hover:underline">结束</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 活动模板 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">活动模板</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-custom-green transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="font-medium">新用户注册礼包</div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">新用户注册即可获得奖励</p>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-custom-green transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="font-medium">交易返佣活动</div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">交易额达标返佣奖励</p>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-custom-green transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="font-medium">邀请好友奖励</div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">邀请好友注册双方获奖</p>
            </div>
          </div>
        </div>
      </div>
    </OperationsLayout>
  )
}
