"use client"

import React from "react"
import FiatLayout from "@/components/fiat-layout"
import { Globe, Settings, Users, DollarSign } from "lucide-react"

export default function OTCConfigPage() {
  return (
    <FiatLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">OTC配置</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">OTC商家</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">18</h3>
                </div>
                <Users className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">支持币种</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8</h3>
                </div>
                <Globe className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">手续费率</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">0.3%</h3>
                </div>
                <DollarSign className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">配置项</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">32</h3>
                </div>
                <Settings className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">OTC场外交易配置</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              OTC场外大宗交易配置管理
            </div>
          </div>
        </div>
      </div>
    </FiatLayout>
  )
}
