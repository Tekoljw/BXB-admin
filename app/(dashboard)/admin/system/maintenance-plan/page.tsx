"use client"

import React from "react"
import SystemLayout from "@/components/system-layout"
import { Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function MaintenancePlanPage() {
  return (
    <SystemLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">维护计划配置</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">计划总数</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">15</h3>
                </div>
                <Calendar className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">进行中</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2</h3>
                </div>
                <Clock className="w-10 h-10 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已完成</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">待执行</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">5</h3>
                </div>
                <AlertCircle className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">维护计划列表</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              系统维护计划制定和执行管理
            </div>
          </div>
        </div>
      </div>
    </SystemLayout>
  )
}
