"use client"

import React from "react"
import SystemLayout from "@/components/system-layout"
import { Smartphone, Download, Users, TrendingUp } from "lucide-react"

export default function AppManagementPage() {
  return (
    <SystemLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">APP管理</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">当前版本</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">v2.8.5</h3>
                </div>
                <Smartphone className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总下载量</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">856K</h3>
                </div>
                <Download className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">活跃用户</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">125K</h3>
                </div>
                <Users className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日新增</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2,345</h3>
                </div>
                <TrendingUp className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">APP版本管理</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              移动应用版本发布和更新管理
            </div>
          </div>
        </div>
      </div>
    </SystemLayout>
  )
}
