"use client"

import React, { useState } from "react"
import IMLayout from "@/components/im-layout"
import { Search, TrendingUp, Users, Star } from "lucide-react"
import { LoadMoreButton } from "@/components/load-more-button"

export default function IMGroupSearchPage() {
  const [displayedCount, setDisplayedCount] = useState(20)
  
  const searchResults = [
    { id: 1, name: "BTC交流群", type: "公开群", members: 1234, category: "交易讨论", hotScore: 95, status: "活跃" },
    { id: 2, name: "ETH爱好者", type: "公开群", members: 856, category: "交易讨论", hotScore: 88, status: "活跃" },
    { id: 3, name: "合约精英群", type: "私密群", members: 234, category: "高级交易", hotScore: 92, status: "活跃" },
    { id: 4, name: "新手学习群", type: "公开群", members: 2345, category: "新手教育", hotScore: 78, status: "活跃" },
    { id: 5, name: "量化策略群", type: "私密群", members: 123, category: "量化交易", hotScore: 85, status: "活跃" },
  ]

  const displayedResults = searchResults.slice(0, displayedCount)

  const handleLoadMore = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    setDisplayedCount(prev => Math.min(prev + 20, searchResults.length))
  }

  return (
    <IMLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">群搜索</h1>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索群组名称、关键词..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-custom-green"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">可搜索群组</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2,180</h3>
              </div>
              <Search className="w-8 h-8 text-custom-green" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">热门群组</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">156</h3>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">推荐群组</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">89</h3>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">今日搜索</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3,456</h3>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">群ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">群名称</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">类型</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">成员数</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">分类</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">热度</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {displayedResults.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{group.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{group.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{group.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{group.members}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{group.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                          <div 
                            className="bg-custom-green h-2 rounded-full" 
                            style={{ width: `${group.hotScore}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-900 dark:text-white">{group.hotScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {group.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-custom-green hover:text-custom-green/80">查看</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <LoadMoreButton
            onLoadMore={handleLoadMore}
            currentCount={displayedResults.length}
            totalCount={searchResults.length}
            disabled={displayedResults.length >= searchResults.length}
          />
        </div>
      </div>
    </IMLayout>
  )
}
