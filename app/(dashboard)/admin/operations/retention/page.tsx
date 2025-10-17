"use client"

import OperationsLayout from "@/components/operations-layout"
import { 
  Users, 
  TrendingUp,
  Calendar,
  Activity,
  Clock,
  ArrowUp,
  ArrowDown,
  UserCheck,
  UserPlus,
  Percent,
  BarChart3
} from "lucide-react"

export default function RetentionAnalysisPage() {
  const coreMetrics = [
    { label: "日活跃用户(DAU)", value: "45,678", change: "+8.3%", trend: "up", icon: Users, color: "blue" },
    { label: "月活跃用户(MAU)", value: "158,234", change: "+12.5%", trend: "up", icon: UserCheck, color: "green" },
    { label: "次日留存率", value: "68.5%", change: "+3.2%", trend: "up", icon: Percent, color: "purple" },
    { label: "7日留存率", value: "45.8%", change: "+2.1%", trend: "up", icon: Percent, color: "orange" },
    { label: "30日留存率", value: "28.3%", change: "-1.5%", trend: "down", icon: Percent, color: "red" },
    { label: "平均使用时长", value: "32分钟", change: "+5.7%", trend: "up", icon: Clock, color: "indigo" }
  ]

  const retentionData = [
    { date: "01-14", day1: 72, day3: 58, day7: 46, day30: 30 },
    { date: "01-15", day1: 70, day3: 56, day7: 44, day30: 29 },
    { date: "01-16", day1: 69, day3: 55, day7: 45, day30: 28 },
    { date: "01-17", day1: 71, day3: 57, day7: 46, day30: 29 },
    { date: "01-18", day1: 68, day3: 54, day7: 43, day30: 27 },
    { date: "01-19", day1: 70, day3: 56, day7: 45, day30: 28 },
    { date: "01-20", day1: 69, day3: 55, day7: 46, day30: 28 }
  ]

  const activityLevels = [
    { level: "高度活跃", description: "每日使用>5次", count: 12456, percentage: 27 },
    { level: "活跃", description: "每周使用3-5次", count: 18234, percentage: 40 },
    { level: "一般活跃", description: "每周使用1-2次", count: 9678, percentage: 21 },
    { level: "低活跃", description: "每月使用<3次", count: 5432, percentage: 12 }
  ]

  const userGrowth = [
    { date: "周一", new: 1234, retained: 8456 },
    { date: "周二", new: 1567, retained: 8234 },
    { date: "周三", new: 1345, retained: 8567 },
    { date: "周四", new: 1456, retained: 8123 },
    { date: "周五", new: 1678, retained: 8789 },
    { date: "周六", new: 2345, retained: 9234 },
    { date: "周日", new: 2123, retained: 8901 }
  ]

  return (
    <OperationsLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">留存与活跃分析报表</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">监控用户留存率和活跃度趋势</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>最近30天</span>
            </button>
            <button className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors">
              导出报表
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {coreMetrics.map((metric, index) => {
            const Icon = metric.icon
            const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown
            return (
              <div key={index} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                    metric.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                    metric.color === 'green' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                    metric.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' :
                    metric.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' :
                    metric.color === 'red' ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                    'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`flex items-center text-xs font-semibold ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="w-3 h-3 mr-1" />
                    {metric.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4">留存率趋势</h2>
            <div className="space-y-3">
              {retentionData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500 dark:text-gray-400">{data.date}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-blue-600">次日:{data.day1}%</span>
                      <span className="text-green-600">3日:{data.day3}%</span>
                      <span className="text-orange-600">7日:{data.day7}%</span>
                      <span className="text-red-600">30日:{data.day30}%</span>
                    </div>
                  </div>
                  <div className="flex h-6 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                    <div className="bg-blue-500" style={{ width: `${data.day1}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold mb-4">用户活跃度分布</h2>
            <div className="space-y-4">
              {activityLevels.map((level, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-sm">{level.level}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{level.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-custom-green">{level.percentage}%</div>
                      <div className="text-xs text-gray-500">{level.count.toLocaleString()}人</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-custom-green h-2 rounded-full transition-all duration-500"
                      style={{ width: `${level.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">新增用户 vs 留存用户（本周）</h2>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>新增用户</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>留存用户</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {userGrowth.map((day, index) => {
              const total = day.new + day.retained
              const newPercent = (day.new / total) * 100
              const retainedPercent = (day.retained / total) * 100
              return (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{day.date}</div>
                  <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded flex flex-col-reverse overflow-hidden">
                    <div 
                      className="bg-blue-500"
                      style={{ height: `${retainedPercent}%` }}
                    ></div>
                    <div 
                      className="bg-green-500"
                      style={{ height: `${newPercent}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs">
                    <div className="text-green-600 font-medium">{day.new}</div>
                    <div className="text-blue-600 font-medium">{day.retained}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </OperationsLayout>
  )
}
