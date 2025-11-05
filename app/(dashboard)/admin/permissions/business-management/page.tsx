"use client"

import React, { useState } from "react"
import PermissionsLayout from "@/components/permissions-layout"
import { 
  Shield, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Share2, 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Copy, 
  PiggyBank, 
  Percent, 
  Store, 
  FileText, 
  Settings,
  Eye,
  EyeOff,
  UserCheck
} from "lucide-react"

interface MenuItem {
  id: string
  label: string
  icon: any
  visible: boolean
  roles: string[]
}

export default function BusinessManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "permissions", label: "权限管理", icon: Shield, visible: true, roles: ["超级管理员", "系统管理员"] },
    { id: "operations", label: "运营报表", icon: BarChart3, visible: true, roles: ["超级管理员", "运营人员", "数据分析师"] },
    { id: "users", label: "用户管理", icon: Users, visible: true, roles: ["超级管理员", "用户管理员"] },
    { id: "im", label: "IM管理", icon: MessageSquare, visible: true, roles: ["超级管理员", "客服主管"] },
    { id: "social", label: "社交管理", icon: Share2, visible: true, roles: ["超级管理员", "内容审核员"] },
    { id: "fiat", label: "法币管理", icon: DollarSign, visible: true, roles: ["超级管理员", "财务主管"] },
    { id: "escrow", label: "担保管理", icon: Shield, visible: true, roles: ["超级管理员", "风控专员"] },
    { id: "ucard", label: "U卡管理", icon: CreditCard, visible: true, roles: ["超级管理员", "卡务管理员"] },
    { id: "spot", label: "现货管理", icon: TrendingUp, visible: true, roles: ["超级管理员", "交易管理员"] },
    { id: "futures", label: "合约管理", icon: TrendingUp, visible: true, roles: ["超级管理员", "合约管理员"] },
    { id: "copytrade", label: "跟单管理", icon: Copy, visible: true, roles: ["超级管理员", "跟单审核员"] },
    { id: "finance", label: "理财管理", icon: PiggyBank, visible: true, roles: ["超级管理员", "理财顾问"] },
    { id: "commission", label: "佣金管理", icon: Percent, visible: true, roles: ["超级管理员", "财务专员"] },
    { id: "bepay", label: "BePay管理", icon: Store, visible: true, roles: ["超级管理员", "支付管理员"] },
    { id: "orders", label: "财务管理", icon: FileText, visible: true, roles: ["超级管理员", "财务主管", "会计"] },
    { id: "system", label: "系统管理", icon: Settings, visible: true, roles: ["超级管理员"] },
  ])

  const allRoles = [
    "超级管理员",
    "系统管理员",
    "运营人员",
    "数据分析师",
    "用户管理员",
    "客服主管",
    "内容审核员",
    "财务主管",
    "风控专员",
    "卡务管理员",
    "交易管理员",
    "合约管理员",
    "跟单审核员",
    "理财顾问",
    "财务专员",
    "支付管理员",
    "会计"
  ]

  const toggleVisibility = (id: string) => {
    setMenuItems(items =>
      items.map(item =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    )
  }

  const toggleRole = (itemId: string, role: string) => {
    setMenuItems(items =>
      items.map(item => {
        if (item.id === itemId) {
          const hasRole = item.roles.includes(role)
          return {
            ...item,
            roles: hasRole
              ? item.roles.filter(r => r !== role)
              : [...item.roles, role]
          }
        }
        return item
      })
    )
  }

  return (
    <PermissionsLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">业务线管理</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-custom-green rounded-full"></div>
                <span>已启用: {menuItems.filter(m => m.visible).length}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span>已禁用: {menuItems.filter(m => !m.visible).length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      业务线
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      显示状态
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      角色权限
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${item.visible ? 'bg-custom-green/10' : 'bg-gray-100 dark:bg-gray-700'}`}>
                              <Icon className={`w-5 h-5 ${item.visible ? 'text-custom-green' : 'text-gray-400'}`} />
                            </div>
                            <span className={`font-medium ${item.visible ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                              {item.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => toggleVisibility(item.id)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-colors ${
                              item.visible
                                ? 'bg-custom-green/10 text-custom-green hover:bg-custom-green/20'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {item.visible ? (
                              <>
                                <Eye className="w-4 h-4" />
                                <span>显示</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-4 h-4" />
                                <span>隐藏</span>
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {item.roles.map(role => (
                              <span
                                key={role}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded-md"
                              >
                                <UserCheck className="w-3 h-3" />
                                {role}
                              </span>
                            ))}
                            {item.roles.length === 0 && (
                              <span className="text-sm text-gray-400 dark:text-gray-500">未分配角色</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="px-4 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors text-sm font-medium">
                            配置权限
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-semibold mb-1">权限说明</p>
                <ul className="space-y-1 text-blue-700 dark:text-blue-400">
                  <li>• 显示/隐藏控制该菜单是否在顶部导航栏中显示</li>
                  <li>• 角色权限控制哪些角色可以访问该业务线</li>
                  <li>• 超级管理员默认拥有所有业务线的访问权限</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PermissionsLayout>
  )
}
