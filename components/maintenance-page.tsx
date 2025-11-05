"use client"

import React from 'react'
import { Construction, AlertTriangle, Clock } from 'lucide-react'

interface MaintenancePageProps {
  moduleName?: string
}

export default function MaintenancePage({ moduleName = "此模块" }: MaintenancePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* 顶部装饰条 */}
          <div className="h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"></div>
          
          <div className="p-12 text-center">
            {/* 图标 */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full"></div>
                <div className="relative bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-6">
                  <Construction className="w-16 h-16 text-yellow-600 dark:text-yellow-500" />
                </div>
              </div>
            </div>

            {/* 标题 */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              系统维护中
            </h1>

            {/* 描述 */}
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {moduleName}正在进行系统维护升级，暂时无法访问
            </p>

            {/* 信息卡片 */}
            <div className="space-y-4 mb-8">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                      维护提醒
                    </p>
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">
                      我们正在进行系统优化和功能升级，以提供更好的服务体验
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                      预计恢复时间
                    </p>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      维护完成后将立即恢复访问，感谢您的耐心等待
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部提示 */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              如有紧急问题，请联系系统管理员
            </div>
          </div>
        </div>

        {/* 底部装饰 */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
            <Construction className="w-4 h-4 animate-pulse" />
            <span>BXB 管理后台</span>
          </div>
        </div>
      </div>
    </div>
  )
}
