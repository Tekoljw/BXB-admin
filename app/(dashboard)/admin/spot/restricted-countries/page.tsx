"use client"

import React, { useState } from "react"
import SpotLayout from "@/components/spot-layout"
import { Globe, Plus, Search, Edit, Trash2 } from "lucide-react"
import { LoadMoreButton } from "@/components/load-more-button"

export default function RestrictedCountriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [displayedCount, setDisplayedCount] = useState(20)

  const countries = [
    { id: 1, code: "US", name: "美国", reason: "监管限制", addedDate: "2024-01-15" },
    { id: 2, code: "CN", name: "中国", reason: "政策限制", addedDate: "2024-01-20" },
    { id: 3, code: "KP", name: "朝鲜", reason: "制裁", addedDate: "2024-02-01" },
  ]

  const filteredCountries = countries.filter(country =>
    country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayedCountries = filteredCountries.slice(0, displayedCount)

  const handleLoadMore = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    setDisplayedCount(prev => Math.min(prev + 20, filteredCountries.length))
  }

  return (
    <SpotLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-custom-green/10 flex items-center justify-center">
              <Globe className="text-custom-green" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">交易受限国家</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">管理受限国家和地区</p>
            </div>
          </div>
          <button className="bg-custom-green text-white px-4 py-2 rounded-lg hover:bg-custom-green/90 transition-colors flex items-center space-x-2">
            <Plus size={18} />
            <span>添加国家</span>
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="搜索国家名称..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-custom-green focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">国家代码</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">国家名称</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">限制原因</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">添加日期</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {displayedCountries.map((country) => (
                  <tr key={country.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{country.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{country.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{country.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{country.addedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          <Edit size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <LoadMoreButton
            onLoadMore={handleLoadMore}
            currentCount={displayedCountries.length}
            totalCount={filteredCountries.length}
            disabled={displayedCountries.length >= filteredCountries.length}
          />
        </div>
      </div>
    </SpotLayout>
  )
}
