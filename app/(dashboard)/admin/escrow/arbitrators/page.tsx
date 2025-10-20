"use client"

import React from "react"
import EscrowLayout from "@/components/escrow-layout"
import { UserCheck, Award, CheckCircle, TrendingUp } from "lucide-react"

export default function ArbitratorsPage() {
  return (
    <EscrowLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">仲裁员管理</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">仲裁员数</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">45</h3>
                </div>
                <UserCheck className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">在线仲裁员</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">28</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日处理</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">156</h3>
                </div>
                <TrendingUp className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">优秀仲裁员</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
                </div>
                <Award className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">仲裁员列表</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              仲裁员账户管理和业绩统计
            </div>
          </div>
        </div>
      </div>
    </EscrowLayout>
  )
}
