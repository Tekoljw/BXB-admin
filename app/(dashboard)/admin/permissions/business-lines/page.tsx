"use client"

import React, { useState } from "react"
import PermissionsLayout from "@/components/permissions-layout"
import { useMaintenance } from "@/contexts/maintenance-context"
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
  UserCheck,
  Construction,
  PlayCircle,
  X
} from "lucide-react"

interface MenuItem {
  id: string
  label: string
  icon: any
  visible: boolean
  roles: string[]
}

export default function BusinessManagementPage() {
  const { isModuleUnderMaintenance, setModuleMaintenance } = useMaintenance()
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [showRoleModal, setShowRoleModal] = useState(false)
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "permissions", label: "权限管理", icon: Shield, visible: true, roles: ["超级管理员", "系统管理员"] },
    { id: "operations", label: "运营报表", icon: BarChart3, visible: true, roles: ["超级管理员", "运营人员", "数据分析师"] },
    { id: "users", label: "用户管理", icon: Users, visible: true, roles: ["超级管理员", "用户管理员"] },
    { id: "im", label: "IM管理", icon: MessageSquare, visible: true, roles: ["超级管理员", "客服主管"] },
    { id: "social", label: "社交管理", icon: Share2, visible: true, roles: ["超级管理员", "内容审核员"] },
    { id: "c2c", label: "C2C", icon: DollarSign, visible: true, roles: ["超级管理员", "财务主管"] },
    { id: "escrow", label: "担保管理", icon: Shield, visible: true, roles: ["超级管理员", "风控专员"] },
    { id: "ucard", label: "U卡管理", icon: CreditCard, visible: true, roles: ["超级管理员", "卡务管理员"] },
    { id: "spot", label: "现货管理", icon: TrendingUp, visible: true, roles: ["超级管理员", "交易管理员"] },
    { id: "futures", label: "合约管理", icon: TrendingUp, visible: true, roles: ["超级管理员", "合约管理员"] },
    { id: "copytrade", label: "跟单管理", icon: Copy, visible: true, roles: ["超级管理员", "跟单审核员"] },
    { id: "finance", label: "理财管理", icon: PiggyBank, visible: true, roles: ["超级管理员", "理财顾问"] },
    { id: "commission", label: "佣金管理", icon: Percent, visible: true, roles: ["超级管理员", "财务专员"] },
    { id: "fiat", label: "法币", icon: Store, visible: true, roles: ["超级管理员", "支付管理员"] },
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

  const toggleMaintenance = (id: string) => {
    const isMaintenance = isModuleUnderMaintenance(id)
    setModuleMaintenance(id, !isMaintenance)
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
    
    // 同时更新弹窗中的选中项
    if (selectedItem && selectedItem.id === itemId) {
      const updatedItem = menuItems.find(item => item.id === itemId)
      if (updatedItem) {
        const hasRole = updatedItem.roles.includes(role)
        setSelectedItem({
          ...updatedItem,
          roles: hasRole
            ? updatedItem.roles.filter(r => r !== role)
            : [...updatedItem.roles, role]
        })
      }
    }
  }

  const openRoleModal = (item: MenuItem) => {
    setSelectedItem(item)
    setShowRoleModal(true)
  }

  const closeRoleModal = () => {
    setShowRoleModal(false)
    setSelectedItem(null)
  }

  const maintenanceCount = menuItems.filter(item => isModuleUnderMaintenance(item.id)).length

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
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>维护中: {maintenanceCount}</span>
              </div>
            </div>
          </div>

          {/* 卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isMaintenance = isModuleUnderMaintenance(item.id)
              
              return (
                <div
                  key={item.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border transition-all hover:shadow-md ${
                    isMaintenance
                      ? 'border-yellow-500/50 dark:border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-900/10'
                      : item.visible
                      ? 'border-custom-green/30 dark:border-custom-green/20'
                      : 'border-gray-200 dark:border-gray-700 opacity-75'
                  }`}
                >
                  {/* 卡片头部 */}
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`p-2.5 rounded-lg flex-shrink-0 ${
                          isMaintenance
                            ? 'bg-yellow-100 dark:bg-yellow-900/30'
                            : item.visible 
                            ? 'bg-custom-green/10' 
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            isMaintenance
                              ? 'text-yellow-600 dark:text-yellow-500'
                              : item.visible 
                              ? 'text-custom-green' 
                              : 'text-gray-400'
                          }`} />
                        </div>
                        <h3 className={`font-semibold text-sm truncate ${
                          isMaintenance
                            ? 'text-yellow-700 dark:text-yellow-400'
                            : item.visible 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {item.label}
                        </h3>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <button
                          onClick={() => toggleVisibility(item.id)}
                          className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
                            item.visible
                              ? 'bg-custom-green/10 text-custom-green hover:bg-custom-green/20'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                          title={item.visible ? '点击隐藏' : '点击显示'}
                        >
                          {item.visible ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => toggleMaintenance(item.id)}
                          className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${
                            isMaintenance
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 hover:bg-yellow-200 dark:hover:bg-yellow-900/40'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                          title={isMaintenance ? '结束维护' : '开启维护'}
                        >
                          {isMaintenance ? (
                            <Construction className="w-4 h-4" />
                          ) : (
                            <PlayCircle className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* 维护状态标签 */}
                    {isMaintenance && (
                      <div className="mt-2 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded text-xs font-medium text-yellow-700 dark:text-yellow-400 flex items-center gap-1.5">
                        <Construction className="w-3 h-3" />
                        <span>维护中</span>
                      </div>
                    )}
                  </div>

                  {/* 卡片内容 */}
                  <div className="p-4 space-y-3">
                    {/* 角色权限信息 */}
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      已分配角色: <span className="font-medium text-gray-900 dark:text-white">{item.roles.length}</span> 个
                    </div>

                    {/* 操作按钮 */}
                    <button 
                      onClick={() => openRoleModal(item)}
                      className="w-full px-3 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      配置权限
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 说明提示 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-semibold mb-1">权限说明</p>
                <ul className="space-y-1 text-blue-700 dark:text-blue-400">
                  <li>• <strong>显示/隐藏</strong>：控制该菜单是否在顶部导航栏中显示</li>
                  <li>• <strong>维护模式</strong>：开启后访问该业务线时将显示维护页面，所有功能不可用</li>
                  <li>• <strong>角色权限</strong>：控制哪些角色可以访问该业务线，点击"配置权限"按钮进行设置</li>
                  <li>• <strong>超级管理员</strong>：默认拥有所有业务线的访问权限</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 角色权限配置弹窗 */}
      {showRoleModal && selectedItem && (
        <>
          {/* 遮罩层 */}
          <div 
            className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={closeRoleModal}
          ></div>
          
          {/* 弹窗 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
              {/* 弹窗头部 */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  {React.createElement(selectedItem.icon, {
                    className: "w-6 h-6 text-custom-green"
                  })}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedItem.label}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      配置访问权限
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeRoleModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* 弹窗内容 */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      选择可访问的角色
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      已选择: <span className="font-medium text-custom-green">{selectedItem.roles.length}</span> 个
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {allRoles.map(role => {
                      const isSelected = selectedItem.roles.includes(role)
                      return (
                        <button
                          key={role}
                          onClick={() => toggleRole(selectedItem.id, role)}
                          className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                            isSelected
                              ? 'border-custom-green bg-custom-green/5 dark:bg-custom-green/10'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-custom-green bg-custom-green'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {isSelected && (
                              <UserCheck className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className={`text-sm font-medium ${
                            isSelected
                              ? 'text-custom-green'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {role}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* 弹窗底部 */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  点击角色进行选择或取消
                </p>
                <button
                  onClick={closeRoleModal}
                  className="px-6 py-2 bg-custom-green text-white rounded-lg hover:bg-custom-green/90 transition-colors font-medium"
                >
                  完成
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </PermissionsLayout>
  )
}
