"use client"

import { useTheme } from "@/contexts/theme-context"

export default function Loading() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={`p-6 min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* 搜索栏骨架 */}
      <div className={`p-4 rounded-lg mb-6 ${isDark ? "bg-card" : "bg-white"} shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>

      {/* 表格头部骨架 */}
      <div className={`p-4 rounded-lg ${isDark ? "bg-card" : "bg-white"} shadow-sm`}>
        {/* 表头 */}
        <div className="grid grid-cols-6 gap-4 py-3 border-b border-gray-200 dark:border-gray-700">
          {["币种", "最新价", "24h涨跌", "24h涨跌幅", "24h成交量", "图表"].map((_, index) => (
            <div key={index} className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
          ))}
        </div>

        {/* 表格行骨架 */}
        <div className="space-y-1">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 py-4 border-b border-gray-100 dark:border-gray-800">
              {/* 币种信息 */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                </div>
              </div>

              {/* 价格 */}
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse"></div>

              {/* 24h涨跌 */}
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16 animate-pulse"></div>

              {/* 涨跌幅 */}
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-12 animate-pulse"></div>

              {/* 成交量 */}
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"></div>

              {/* 图表 */}
              <div className="w-28 h-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
