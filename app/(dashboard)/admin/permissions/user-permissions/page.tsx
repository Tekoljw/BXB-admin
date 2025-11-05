"use client"

import React from "react"
import PermissionsLayout from "@/components/permissions-layout"
import { Key, Shield, Lock, CheckCircle } from "lucide-react"

export default function UserPermissionsPage() {
  return (
    <PermissionsLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">用户权限</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">权限组</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">18</h3>
                </div>
                <Key className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">角色数量</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">28</h3>
                </div>
                <Shield className="w-10 h-10 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">权限点</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">456</h3>
                </div>
                <Lock className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">已分配</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">142</h3>
                </div>
                <CheckCircle className="w-10 h-10 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">权限配置</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              用户权限和角色管理
            </div>
          </div>
        </div>
      </div>
    </PermissionsLayout>
  )
}
