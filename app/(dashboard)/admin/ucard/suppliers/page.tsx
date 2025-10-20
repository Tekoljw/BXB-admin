"use client"

import React from "react"
import UCardLayout from "@/components/ucard-layout"
import { Building2, CheckCircle, DollarSign, TrendingUp } from "lucide-react"

export default function UCardSuppliersPage() {
  return (
    <UCardLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">U卡供应商</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">供应商总数</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">18</h3>
                </div>
                <Building2 className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">合作中</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">15</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">月发卡量</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2,345</h3>
                </div>
                <TrendingUp className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">合作金额</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">¥8.5M</h3>
                </div>
                <DollarSign className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">供应商列表</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              U卡供应商合作管理和业绩统计
            </div>
          </div>
        </div>
      </div>
    </UCardLayout>
  )
}
