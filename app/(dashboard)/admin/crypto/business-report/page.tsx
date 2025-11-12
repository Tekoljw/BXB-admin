"use client"

import React, { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ArrowUpDown,
  Calendar,
  Download,
} from "lucide-react"

export default function CryptoBusinessReportPage() {
  const [timeRange, setTimeRange] = useState("today")

  // 模拟数据
  const summaryData = {
    totalRevenue: "1,245,678.90",
    totalOrders: "8,432",
    totalUsers: "3,567",
    avgOrderAmount: "147.65",
    revenueChange: "+15.3%",
    ordersChange: "+8.7%",
    usersChange: "+12.4%",
    avgChange: "+3.2%",
  }

  const currencyStats = [
    {
      currency: "USDT",
      network: "全网络",
      depositCount: 3245,
      depositAmount: "456,789.12",
      withdrawalCount: 2876,
      withdrawalAmount: "398,234.56",
      revenue: "58,554.56",
      revenueRate: "12.8%",
    },
    {
      currency: "USDC",
      network: "全网络",
      depositCount: 1876,
      depositAmount: "234,567.89",
      withdrawalCount: 1654,
      withdrawalAmount: "198,765.43",
      revenue: "35,802.46",
      revenueRate: "15.3%",
    },
    {
      currency: "BTC",
      network: "Bitcoin",
      depositCount: 456,
      depositAmount: "123,456.78",
      withdrawalCount: 398,
      withdrawalAmount: "98,765.43",
      revenue: "24,691.35",
      revenueRate: "20.0%",
    },
    {
      currency: "ETH",
      network: "Ethereum",
      depositCount: 892,
      depositAmount: "178,934.56",
      withdrawalCount: 734,
      withdrawalAmount: "145,678.90",
      revenue: "33,256.66",
      revenueRate: "18.6%",
    },
  ]

  const networkStats = [
    {
      network: "Ethereum",
      depositCount: 2345,
      depositAmount: "389,456.78",
      withdrawalCount: 2012,
      withdrawalAmount: "334,567.89",
      gasFee: "12,345.67",
      revenue: "54,888.89",
    },
    {
      network: "BSC",
      depositCount: 1876,
      depositAmount: "267,890.12",
      withdrawalCount: 1654,
      withdrawalAmount: "223,456.78",
      gasFee: "1,234.56",
      revenue: "44,433.34",
    },
    {
      network: "Polygon",
      depositCount: 1234,
      depositAmount: "178,934.56",
      withdrawalCount: 1098,
      withdrawalAmount: "156,789.01",
      gasFee: "234.56",
      revenue: "22,145.55",
    },
    {
      network: "Tron",
      depositCount: 987,
      depositAmount: "145,678.90",
      withdrawalCount: 876,
      withdrawalAmount: "123,456.78",
      gasFee: "123.45",
      revenue: "22,222.12",
    },
    {
      network: "Bitcoin",
      depositCount: 456,
      depositAmount: "123,456.78",
      withdrawalCount: 398,
      withdrawalAmount: "98,765.43",
      gasFee: "4,567.89",
      revenue: "24,691.35",
    },
  ]

  const otcStats = [
    {
      supplier: "OTC供应商A",
      buyOrders: 234,
      buyAmount: "345,678.90",
      sellOrders: 198,
      sellAmount: "298,765.43",
      commission: "6,444.44",
      commissionRate: "1.0%",
    },
    {
      supplier: "OTC供应商B",
      buyOrders: 187,
      buyAmount: "278,934.56",
      sellOrders: 165,
      sellAmount: "234,567.89",
      commission: "5,135.02",
      commissionRate: "1.0%",
    },
    {
      supplier: "OTC供应商C",
      buyOrders: 156,
      buyAmount: "198,765.43",
      sellOrders: 134,
      sellAmount: "176,543.21",
      commission: "3,753.09",
      commissionRate: "1.0%",
    },
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题和操作栏 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Crypto经营报表
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            查看和分析Crypto业务的经营数据和收益情况
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="today">今天</option>
            <option value="yesterday">昨天</option>
            <option value="week">最近7天</option>
            <option value="month">最近30天</option>
            <option value="custom">自定义时间</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            导出报表
          </button>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">总收益</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {summaryData.totalRevenue} USDT
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {summaryData.revenueChange}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">订单总数</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {summaryData.totalOrders}
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {summaryData.ordersChange}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ArrowUpDown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">活跃用户</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {summaryData.totalUsers}
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {summaryData.usersChange}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">平均订单额</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {summaryData.avgOrderAmount} USDT
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {summaryData.avgChange}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* 详细报表 */}
      <Tabs defaultValue="currency" className="space-y-4">
        <TabsList>
          <TabsTrigger value="currency">币种收益统计</TabsTrigger>
          <TabsTrigger value="network">网络收益统计</TabsTrigger>
          <TabsTrigger value="otc">OTC业务统计</TabsTrigger>
        </TabsList>

        {/* 币种收益统计 */}
        <TabsContent value="currency" className="space-y-4">
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      币种
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      网络
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      充值笔数
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      充值金额
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      提现笔数
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      提现金额
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      总收益
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      收益率
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {currencyStats.map((stat, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {stat.currency}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {stat.network}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.depositCount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.depositAmount} USDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.withdrawalCount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.withdrawalAmount} USDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {stat.revenue} USDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-emerald-600 dark:text-emerald-400">
                          {stat.revenueRate}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* 网络收益统计 */}
        <TabsContent value="network" className="space-y-4">
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      网络
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      充值笔数
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      充值金额
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      提现笔数
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      提现金额
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Gas费用
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      净收益
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {networkStats.map((stat, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {stat.network}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.depositCount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.depositAmount} USDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.withdrawalCount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.withdrawalAmount} USDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-red-600 dark:text-red-400">
                          -{stat.gasFee} USDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {stat.revenue} USDT
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* OTC业务统计 */}
        <TabsContent value="otc" className="space-y-4">
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      供应商
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      买入订单
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      买入金额
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      卖出订单
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      卖出金额
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      佣金收益
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      佣金率
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {otcStats.map((stat, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {stat.supplier}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.buyOrders.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.buyAmount} USDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.sellOrders.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {stat.sellAmount} USDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {stat.commission} USDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {stat.commissionRate}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
