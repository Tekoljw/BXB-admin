"use client"

import OperationsLayout from "@/components/operations-layout"
import { 
  Calendar, 
  Gift, 
  TrendingUp, 
  Users,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Eye,
  Copy,
  BarChart3
} from "lucide-react"
import { useState } from "react"

export default function ActivitiesConfigPage() {
  const [activeTab, setActiveTab] = useState("list")

  const activities = [
    { 
      id: 1, 
      name: "新年交易大礼包", 
      type: "交易返利", 
      startDate: "2024-01-15", 
      endDate: "2024-02-15",
      participants: 3245,
      budget: "¥50,000",
      spent: "¥32,500",
      conversion: "23.5%",
      status: "active" 
    },
    { 
      id: 2, 
      name: "邀请好友送U卡", 
      type: "邀请奖励", 
      startDate: "2024-01-10", 
      endDate: "2024-03-10",
      participants: 5678,
      budget: "¥100,000",
      spent: "¥45,200",
      conversion: "18.2%",
      status: "active" 
    },
    { 
      id: 3, 
      name: "新用户注册送现金", 
      type: "注册奖励", 
      startDate: "2024-01-01", 
      endDate: "2024-01-31",
      participants: 12456,
      budget: "¥200,000",
      spent: "¥198,500",
      conversion: "45.8%",
      status: "completed" 
    },
    { 
      id: 4, 
      name: "春节特惠交易", 
      type: "交易返利", 
      startDate: "2024-02-01", 
      endDate: "2024-02-28",
      participants: 0,
      budget: "¥80,000",
      spent: "¥0",
      conversion: "-",
      status: "scheduled" 
    }
  ]

  const templates = [
    { name: "新用户注册礼包", icon: Gift, color: "blue", desc: "新用户注册即可获得奖励" },
    { name: "交易返佣活动", icon: TrendingUp, color: "green", desc: "交易额达标返佣奖励" },
    { name: "邀请好友奖励", icon: Users, color: "purple", desc: "邀请好友注册双方获奖" },
    { name: "节日特惠活动", icon: Calendar, color: "orange", desc: "节日期间专属优惠" },
    { name: "充值赠送活动", icon: Gift, color: "pink", desc: "充值达标赠送额外奖励" },
    { name: "签到打卡活动", icon: Calendar, color: "indigo", desc: "每日签到领取奖励" }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">进行中</span>
      case "scheduled":
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">已排期</span>
      case "completed":
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">已结束</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">未知</span>
    }
  }

  return (
    <OperationsLayout>
      <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">活动配置</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">创建和管理营销活动</p>
          </div>
          <button className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>创建活动</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">进行中活动</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">21,379</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">总参与人数</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">¥276,200</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">奖励发放总额</div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="text-2xl font-bold">28.8%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">平均转化率</div>
          </div>
        </div>

        <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "list"
                ? "text-custom-green border-b-2 border-custom-green"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            活动列表
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "templates"
                ? "text-custom-green border-b-2 border-custom-green"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            活动模板
          </button>
        </div>

        {activeTab === "list" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">活动名称</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">类型</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">时间范围</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">参与人数</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">预算/支出</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">转化率</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {activities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{activity.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                          {activity.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div>{activity.startDate}</div>
                        <div className="text-xs text-gray-500">至 {activity.endDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {activity.participants.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="text-gray-500">{activity.budget}</div>
                        <div className="text-orange-600 font-medium">{activity.spent}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-custom-green">{activity.conversion}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(activity.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <Edit className="w-4 h-4 text-green-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <Copy className="w-4 h-4 text-purple-600" />
                          </button>
                          {activity.status === "active" ? (
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                              <Pause className="w-4 h-4 text-orange-600" />
                            </button>
                          ) : activity.status === "scheduled" ? (
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                              <Play className="w-4 h-4 text-green-600" />
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "templates" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => {
              const Icon = template.icon
              return (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-custom-green transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      template.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' :
                      template.color === 'green' ? 'bg-green-100 dark:bg-green-900/20' :
                      template.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20' :
                      template.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/20' :
                      template.color === 'pink' ? 'bg-pink-100 dark:bg-pink-900/20' :
                      'bg-indigo-100 dark:bg-indigo-900/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        template.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                        template.color === 'green' ? 'text-green-600 dark:text-green-400' :
                        template.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                        template.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                        template.color === 'pink' ? 'text-pink-600 dark:text-pink-400' :
                        'text-indigo-600 dark:text-indigo-400'
                      }`} />
                    </div>
                    <Plus className="w-5 h-5 text-gray-400 group-hover:text-custom-green transition-colors" />
                  </div>
                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{template.desc}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </OperationsLayout>
  )
}
