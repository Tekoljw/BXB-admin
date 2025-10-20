"use client"

import React from "react"
import SystemLayout from "@/components/system-layout"
import { Settings, CheckCircle, Clock, XCircle } from "lucide-react"

export default function AuditConfigPage() {
  return (
    <SystemLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">审核配置</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">审核规则</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">36</h3>
                </div>
                <Settings className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">自动审核</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">24</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">人工审核</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
                </div>
                <Clock className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">禁用规则</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">5</h3>
                </div>
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">审核配置列表</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              系统审核流程和规则配置管理
            </div>
          </div>
        </div>
      </div>
    </SystemLayout>
  )
}
