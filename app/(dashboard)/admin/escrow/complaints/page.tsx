"use client"

import React from "react"
import EscrowLayout from "@/components/escrow-layout"
import { AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react"

export default function ComplaintsPage() {
  return (
    <EscrowLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">仲裁投诉记录</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">待处理</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">23</h3>
                </div>
                <Clock className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已解决</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,234</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已驳回</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">89</h3>
                </div>
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总投诉</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,346</h3>
                </div>
                <AlertCircle className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">投诉记录列表</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              担保纠纷仲裁投诉记录管理
            </div>
          </div>
        </div>
      </div>
    </EscrowLayout>
  )
}
