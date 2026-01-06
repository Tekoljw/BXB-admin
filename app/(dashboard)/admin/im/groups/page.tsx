"use client"

import React, { useState } from "react"
import IMLayout from "@/components/im-layout"
import { UsersRound, Crown, Lock, Globe } from "lucide-react"
import { LoadMoreButton } from "@/components/load-more-button"

export default function IMGroupsPage() {
  const [displayedCount, setDisplayedCount] = useState(20)
  
  const groups = [
    { id: 1, name: "BTC交流群", type: "公开群", members: 1234, owner: "admin001", created: "2024-01-15", status: "正常" },
    { id: 2, name: "ETH爱好者", type: "公开群", members: 856, owner: "user001", created: "2024-02-20", status: "正常" },
    { id: 3, name: "VIP专属群", type: "私密群", members: 50, owner: "admin002", created: "2024-03-10", status: "正常" },
    { id: 4, name: "合约交易群", type: "公开群", members: 2345, owner: "user123", created: "2024-04-05", status: "正常" },
    { id: 5, name: "违规群组", type: "公开群", members: 123, owner: "user456", created: "2024-05-12", status: "封禁" },
  ]

  const displayedGroups = groups.slice(0, displayedCount)

  const handleLoadMore = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    setDisplayedCount(prev => Math.min(prev + 20, groups.length))
  }

  return (
    <IMLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">群组管理</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总群组</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2,456</h3>
              </div>
              <UsersRound className="w-8 h-8 text-custom-green" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">公开群</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2,180</h3>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">私密群</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">276</h3>
              </div>
              <Lock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">官方群</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">15</h3>
              </div>
              <Crown className="w-8 h-8 text-custom-green" />
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">群主</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">创建时间</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {displayedGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{group.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{group.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{group.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{group.members}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{group.owner}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{group.created}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        group.status === '正常' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {group.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-custom-green hover:text-custom-green/80">管理</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <LoadMoreButton
            onLoadMore={handleLoadMore}
            currentCount={displayedGroups.length}
            totalCount={groups.length}
            disabled={displayedGroups.length >= groups.length}
          />
        </div>
      </div>
    </IMLayout>
  )
}
