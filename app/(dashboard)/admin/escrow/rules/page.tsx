"use client"

import React from "react"
import EscrowLayout from "@/components/escrow-layout"
import { Settings, Shield, CheckCircle, DollarSign } from "lucide-react"

export default function EscrowRulesPage() {
  return (
    <EscrowLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">担保规则配置</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">规则总数</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">28</h3>
                </div>
                <Settings className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">启用规则</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">24</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">担保费率</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1.5%</h3>
                </div>
                <DollarSign className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">风控规则</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12</h3>
                </div>
                <Shield className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">担保规则列表</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              担保交易规则配置和风控管理
            </div>
          </div>
        </div>
      </div>
    </EscrowLayout>
  )
}
