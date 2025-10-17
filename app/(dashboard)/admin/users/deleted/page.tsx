"use client"

import React from "react"
import UsersLayout from "@/components/users-layout"
import { Trash2, RotateCcw } from "lucide-react"

export default function DeletedUsersPage() {
  const deletedUsers = [
    { id: 1, username: "deleted001", email: "deleted001@example.com", deleteDate: "2024-10-10 15:30", deleteReason: "用户主动注销", canRestore: true },
    { id: 2, username: "deleted002", email: "deleted002@example.com", deleteDate: "2024-10-05 10:20", deleteReason: "违规封禁", canRestore: false },
    { id: 3, username: "deleted003", email: "deleted003@example.com", deleteDate: "2024-09-28 14:45", deleteReason: "用户主动注销", canRestore: true },
  ]

  return (
    <UsersLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">已删除账户</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已删除账户</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">3,456</h3>
              </div>
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">可恢复账户</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,234</h3>
              </div>
              <RotateCcw className="w-8 h-8 text-custom-green" />
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">邮箱</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">删除时间</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">删除原因</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {deletedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.deleteDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.deleteReason}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.canRestore ? (
                        <button className="text-custom-green hover:text-custom-green/80">恢复</button>
                      ) : (
                        <span className="text-gray-400">无法恢复</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </UsersLayout>
  )
}
