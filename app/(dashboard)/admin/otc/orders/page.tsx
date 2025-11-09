"use client"

import React, { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OTCOrdersPage() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">OTC订单管理</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          查看和管理OTC交易订单
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">全部订单</TabsTrigger>
              <TabsTrigger value="pending">待处理</TabsTrigger>
              <TabsTrigger value="processing">处理中</TabsTrigger>
              <TabsTrigger value="completed">已完成</TabsTrigger>
              <TabsTrigger value="cancelled">已取消</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400">OTC订单管理功能开发中...</p>
        </div>
      </div>
    </div>
  )
}
