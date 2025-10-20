"use client"

import React from "react"
import EscrowLayout from "@/components/escrow-layout"
import { Users, MessageSquare, UserPlus, Shield } from "lucide-react"

export default function EscrowGroupsPage() {
  return (
    <EscrowLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">担保群管理</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">担保群数</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">128</h3>
                </div>
                <Users className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">群成员</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12.5K</h3>
                </div>
                <UserPlus className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日消息</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3,567</h3>
                </div>
                <MessageSquare className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">认证群</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">98</h3>
                </div>
                <Shield className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">担保群列表</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              担保交易群组创建和管理
            </div>
          </div>
        </div>
      </div>
    </EscrowLayout>
  )
}
