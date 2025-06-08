"use client"

import { useTheme } from "@/contexts/theme-context"

export default function Loading() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={`p-6 min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* 标题骨架 */}
      <div className="mb-6">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
      </div>

      {/* 搜索和筛选区域骨架 */}
      <div className={`p-4 rounded-lg mb-6 ${isDark ? "bg-card" : "bg-white"} shadow-sm`}>
        <div className="flex items-center justify-between mb-4">
          {/* 切换按钮骨架 */}
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mr-1"></div>
            <div className="w-20 h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          </div>

          {/* 搜索和筛选骨架 */}
          <div className="flex items-center space-x-3">
            <div className="w-32 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
            <div className="w-24 h-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* 表格头部骨架 */}
        <div className="grid grid-cols-7 gap-4 py-3 border-b border-gray-200 dark:border-gray-700">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          ))}
        </div>

        {/* 广告列表骨架 */}
        <div className="space-y-3 mt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border ${
                isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="grid grid-cols-7 gap-4 items-center">
                {/* 商家信息骨架 */}
                <div className="flex items-center space-x-2">
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                  </div>
                </div>

                {/* 价格骨架 */}
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse"></div>

                {/* 可用/限额骨架 */}
                <div className="space-y-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                </div>

                {/* 支付方式骨架 */}
                <div className="flex flex-wrap gap-1">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-10 animate-pulse"></div>
                </div>

                {/* 响应时间骨架 */}
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-14 animate-pulse"></div>

                {/* 成功率骨架 */}
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-10 animate-pulse"></div>

                {/* 操作按钮骨架 */}
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}