"use client"

import React from "react"
import PermissionsLayout from "@/components/permissions-layout"
import { FileCheck, Settings, CheckCircle, XCircle } from "lucide-react"

export default function AuditConfigPage() {
  return (
    <PermissionsLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">审核配置</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">审核规则</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">28</h3>
                </div>
                <FileCheck className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">配置项</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">156</h3>
                </div>
                <Settings className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已通过</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,234</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已拒绝</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">89</h3>
                </div>
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">审核配置管理</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              审核流程和规则配置
            </div>
          </div>
        </div>
      </div>
    </PermissionsLayout>
  )
}
