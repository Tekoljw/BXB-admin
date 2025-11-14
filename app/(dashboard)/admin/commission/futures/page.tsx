"use client"

import React from "react"
import CommissionLayout from "@/components/commission-layout"
import { Construction } from "lucide-react"

export default function FuturesCommissionPage() {
  return (
    <CommissionLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Construction className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">开发中···</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">合约佣金功能正在开发中，敬请期待</p>
        </div>
      </div>
    </CommissionLayout>
  )
}
