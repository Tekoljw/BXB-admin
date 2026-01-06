"use client"

import React, { useState } from "react"
import IMLayout from "@/components/im-layout"
import { Users, UserCheck, UserX, Shield } from "lucide-react"
import { LoadMoreButton } from "@/components/load-more-button"

export default function IMAccountsPage() {
  const [displayedCount, setDisplayedCount] = useState(20)
  
  const accounts = [
    { id: 1, username: "user001", nickname: "张三", status: "在线", lastLogin: "2024-10-17 15:30:20", deviceCount: 2, role: "普通用户" },
    { id: 2, username: "user002", nickname: "李四", status: "离线", lastLogin: "2024-10-17 14:20:15", deviceCount: 1, role: "VIP用户" },
    { id: 3, username: "user003", nickname: "王五", status: "在线", lastLogin: "2024-10-17 15:45:30", deviceCount: 3, role: "普通用户" },
    { id: 4, username: "admin001", nickname: "管理员", status: "在线", lastLogin: "2024-10-17 15:50:45", deviceCount: 1, role: "管理员" },
    { id: 5, username: "user004", nickname: "赵六", status: "封禁", lastLogin: "2024-10-16 18:30:45", deviceCount: 0, role: "普通用户" },
  ]

  const displayedAccounts = accounts.slice(0, displayedCount)

  const handleLoadMore = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    setDisplayedCount(prev => Math.min(prev + 20, accounts.length))
  }

  return (
    <IMLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">账号管理</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">总账号</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12,456</h3>
              </div>
              <Users className="w-8 h-8 text-custom-green" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">在线用户</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3,245</h3>
              </div>
              <UserCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">封禁账号</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">28</h3>
              </div>
              <UserX className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">VIP用户</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,234</h3>
              </div>
              <Shield className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">用户名</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">昵称</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">最后登录</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">设备数</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">角色</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {displayedAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{account.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{account.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{account.nickname}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        account.status === '在线' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        account.status === '封禁' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {account.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{account.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{account.deviceCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{account.role}</td>
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
            currentCount={displayedAccounts.length}
            totalCount={accounts.length}
            disabled={displayedAccounts.length >= accounts.length}
          />
        </div>
      </div>
    </IMLayout>
  )
}
