"use client"

import React from "react"
import { Button } from "@/components/ui/button"

export default function DepositWithdrawalCurrenciesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">币种管理</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              管理支持的加密货币币种和配置
            </p>
          </div>
          <Button className="bg-custom-green hover:bg-green-600">
            添加币种
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400">币种管理功能开发中...</p>
      </div>
    </div>
  )
}
