"use client"

import React from "react"
import UCardLayout from "@/components/ucard-layout"
import { Settings, CreditCard, DollarSign, Shield } from "lucide-react"

export default function UCardConfigPage() {
  return (
    <UCardLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">U卡基础配置</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">卡类型</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">5</h3>
                </div>
                <CreditCard className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">开卡费用</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥50</h3>
                </div>
                <DollarSign className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">风控规则</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
                </div>
                <Shield className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">配置项</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">28</h3>
                </div>
                <Settings className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">配置管理</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              U卡产品配置和参数设置
            </div>
          </div>
        </div>
      </div>
    </UCardLayout>
  )
}
