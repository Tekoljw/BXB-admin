"use client"

import React from "react"
import SystemLayout from "@/components/system-layout"
import { Users, UserCheck, UserX, TrendingUp } from "lucide-react"

export default function SystemUsersManagementPage() {
  return (
    <SystemLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">用户管理</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">系统用户</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">156</h3>
                </div>
                <Users className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">在线用户</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">45</h3>
                </div>
                <UserCheck className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">禁用用户</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8</h3>
                </div>
                <UserX className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日新增</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
                </div>
                <TrendingUp className="w-10 h-10 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">系统用户列表</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              系统管理员和操作员账户管理
            </div>
          </div>
        </div>
      </div>
    </SystemLayout>
  )
}
