"use client"

import React from "react"
import SystemLayout from "@/components/system-layout"
import { List, Users, CheckCircle, Shield } from "lucide-react"

export default function MaintenanceWhitelistPage() {
  return (
    <SystemLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">维护白名单管理</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">白名单总数</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">128</h3>
                </div>
                <List className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">启用用户</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">95</h3>
                </div>
                <Users className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">IP白名单</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">45</h3>
                </div>
                <Shield className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日访问</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">567</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">白名单列表</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              维护期间访问白名单用户管理
            </div>
          </div>
        </div>
      </div>
    </SystemLayout>
  )
}
