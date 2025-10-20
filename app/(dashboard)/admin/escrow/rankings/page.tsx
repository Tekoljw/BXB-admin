"use client"

import React from "react"
import EscrowLayout from "@/components/escrow-layout"
import { Award, TrendingUp, Users, Star } from "lucide-react"

export default function EscrowRankingsPage() {
  return (
    <EscrowLayout>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">信誉担保排名</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">担保商家</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">356</h3>
                </div>
                <Users className="w-10 h-10 text-custom-green" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">五星商家</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">89</h3>
                </div>
                <Star className="w-10 h-10 text-yellow-500" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">排名前10</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">10</h3>
                </div>
                <Award className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">信誉增长</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">+12%</h3>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">信誉排行榜</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-12">
              担保商家信誉评分和排名管理
            </div>
          </div>
        </div>
      </div>
    </EscrowLayout>
  )
}
