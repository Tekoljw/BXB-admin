"use client"

import React from "react"
import CommissionLayout from "@/components/commission-layout"
import { Button } from "@/components/ui/button"
import { Wrench } from "lucide-react"

export default function PaymentCommissionPage() {
  return (
    <CommissionLayout>
      <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">支付佣金</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">代收、代付、兑换订单佣金统计与管理</p>
          </div>
        </div>

        {/* 开发中提示 */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
              <Wrench className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              页面开发中
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              支付佣金管理页面正在重新设计开发中，敬请期待...
            </p>
          </div>
        </div>
      </div>
    </CommissionLayout>
  )
}
