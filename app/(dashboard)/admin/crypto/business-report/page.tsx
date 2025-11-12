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
  Loader2,
  CalendarIcon,
} from "lucide-react"
import { toast } from "sonner"

export default function CryptoBusinessReportPage() {
  const [timeRange, setTimeRange] = useState("today")
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false)

  // 根据时间范围生成动态数据
  const generateDataByTimeRange = (range: string) => {
    const multipliers = {
      today: 1,
      yesterday: 0.92,
      week: 7,
      month: 30,
      custom: 15,
    }
    const multiplier = multipliers[range as keyof typeof multipliers] || 1

    return {
      totalRevenue: (1245678.9 * multiplier).toFixed(2),
      totalOrders: Math.floor(8432 * multiplier).toString(),
      totalUsers: Math.floor(3567 * multiplier * 0.8).toString(),
      avgOrderAmount: (147.65 / Math.sqrt(multiplier)).toFixed(2),
      revenueChange: range === "yesterday" ? "+8.2%" : "+15.3%",
      ordersChange: range === "yesterday" ? "+5.1%" : "+8.7%",
      usersChange: range === "yesterday" ? "+7.8%" : "+12.4%",
      avgChange: range === "yesterday" ? "+1.5%" : "+3.2%",
    }
  }

  const summaryData = useMemo(() => {
    return generateDataByTimeRange(timeRange)
  }, [timeRange])

  // 币种统计数据
  const currencyStats = useMemo(() => {
    const baseData = [
      {
        currency: "USDT",
        network: "全网络",
        depositCount: 3245,
        depositAmount: 456789.12,
        withdrawalCount: 2876,
        withdrawalAmount: 398234.56,
      },
      {
        currency: "USDC",
        network: "全网络",
        depositCount: 1876,
        depositAmount: 234567.89,
        withdrawalCount: 1654,
        withdrawalAmount: 198765.43,
      },
      {
        currency: "BTC",
        network: "Bitcoin",
        depositCount: 456,
        depositAmount: 123456.78,
        withdrawalCount: 398,
        withdrawalAmount: 98765.43,
      },
      {
        currency: "ETH",
        network: "Ethereum",
        depositCount: 892,
        depositAmount: 178934.56,
        withdrawalCount: 734,
        withdrawalAmount: 145678.9,
      },
    ]

    const multipliers = {
      today: 1,
      yesterday: 0.92,
      week: 7,
      month: 30,
      custom: 15,
    }
    const multiplier = multipliers[timeRange as keyof typeof multipliers] || 1

    return baseData.map((item) => {
      const revenue = (item.depositAmount + item.withdrawalAmount) * 0.01 * multiplier
      const totalAmount = (item.depositAmount + item.withdrawalAmount) * multiplier
      return {
        ...item,
        depositCount: Math.floor(item.depositCount * multiplier),
        depositAmount: (item.depositAmount * multiplier).toFixed(2),
        withdrawalCount: Math.floor(item.withdrawalCount * multiplier),
        withdrawalAmount: (item.withdrawalAmount * multiplier).toFixed(2),
        revenue: revenue.toFixed(2),
        revenueRate: ((revenue / totalAmount) * 100).toFixed(1) + "%",
      }
    })
  }, [timeRange])

  // 网络统计数据
  const networkStats = useMemo(() => {
    const baseData = [
      {
        network: "Ethereum",
        depositCount: 2345,
        depositAmount: 389456.78,
        withdrawalCount: 2012,
        withdrawalAmount: 334567.89,
        gasFee: 12345.67,
      },
      {
        network: "BSC",
        depositCount: 1876,
        depositAmount: 267890.12,
        withdrawalCount: 1654,
        withdrawalAmount: 223456.78,
        gasFee: 1234.56,
      },
      {
        network: "Polygon",
        depositCount: 1234,
        depositAmount: 178934.56,
        withdrawalCount: 1098,
        withdrawalAmount: 156789.01,
        gasFee: 234.56,
      },
      {
        network: "Tron",
        depositCount: 987,
        depositAmount: 145678.9,
        withdrawalCount: 876,
        withdrawalAmount: 123456.78,
        gasFee: 123.45,
      },
      {
        network: "Bitcoin",
        depositCount: 456,
        depositAmount: 123456.78,
        withdrawalCount: 398,
        withdrawalAmount: 98765.43,
        gasFee: 4567.89,
      },
    ]

    const multipliers = {
      today: 1,
      yesterday: 0.92,
      week: 7,
      month: 30,
      custom: 15,
    }
    const multiplier = multipliers[timeRange as keyof typeof multipliers] || 1

    return baseData.map((item) => {
      const totalGas = item.gasFee * multiplier
      const totalRevenue =
        (item.depositAmount + item.withdrawalAmount) * multiplier * 0.01 - totalGas
      return {
        network: item.network,
        depositCount: Math.floor(item.depositCount * multiplier),
        depositAmount: (item.depositAmount * multiplier).toFixed(2),
        withdrawalCount: Math.floor(item.withdrawalCount * multiplier),
        withdrawalAmount: (item.withdrawalAmount * multiplier).toFixed(2),
        gasFee: totalGas.toFixed(2),
        revenue: totalRevenue.toFixed(2),
      }
    })
  }, [timeRange])

  // OTC统计数据
  const otcStats = useMemo(() => {
    const baseData = [
      {
        supplier: "OTC供应商A",
        buyOrders: 234,
        buyAmount: 345678.9,
        sellOrders: 198,
        sellAmount: 298765.43,
        commissionRate: 0.01,
      },
      {
        supplier: "OTC供应商B",
        buyOrders: 187,
        buyAmount: 278934.56,
        sellOrders: 165,
        sellAmount: 234567.89,
        commissionRate: 0.01,
      },
      {
        supplier: "OTC供应商C",
        buyOrders: 156,
        buyAmount: 198765.43,
        sellOrders: 134,
        sellAmount: 176543.21,
        commissionRate: 0.01,
      },
    ]

    const multipliers = {
      today: 1,
      yesterday: 0.92,
      week: 7,
      month: 30,
      custom: 15,
    }
    const multiplier = multipliers[timeRange as keyof typeof multipliers] || 1

    return baseData.map((item) => {
      const totalAmount = (item.buyAmount + item.sellAmount) * multiplier
      const commission = totalAmount * item.commissionRate
      return {
        supplier: item.supplier,
        buyOrders: Math.floor(item.buyOrders * multiplier),
        buyAmount: (item.buyAmount * multiplier).toFixed(2),
        sellOrders: Math.floor(item.sellOrders * multiplier),
        sellAmount: (item.sellAmount * multiplier).toFixed(2),
        commission: commission.toFixed(2),
        commissionRate: (item.commissionRate * 100).toFixed(1) + "%",
      }
    })
  }, [timeRange])

  // 处理时间范围变更
  const handleTimeRangeChange = (value: string) => {
    if (value === "custom") {
      setShowCustomDatePicker(true)
    } else {
      setShowCustomDatePicker(false)
      setIsLoading(true)
      setTimeRange(value)
      // 模拟数据加载
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  // 应用自定义时间范围
  const applyCustomDateRange = () => {
    if (!customStartDate || !customEndDate) {
      toast.error("请选择开始和结束日期")
      return
    }
    setIsLoading(true)
    setTimeRange("custom")
    setShowCustomDatePicker(false)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("已应用自定义时间范围")
    }, 500)
  }

  // 导出报表为CSV
  const exportToCSV = () => {
    toast.info("导出功能开发中，即将推出")
    
    // 示例：生成CSV内容
    const csvContent = [
      ["币种", "网络", "充值笔数", "充值金额", "提现笔数", "提现金额", "总收益", "收益率"],
      ...currencyStats.map((stat) => [
        stat.currency,
        stat.network,
        stat.depositCount,
        stat.depositAmount,
        stat.withdrawalCount,
        stat.withdrawalAmount,
        stat.revenue,
        stat.revenueRate,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    // 创建下载链接（示例，实际项目中需要更完善的实现）
    // const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    // const link = document.createElement("a")
    // link.href = URL.createObjectURL(blob)
    // link.download = `crypto-report-${timeRange}.csv`
    // link.click()
  }

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
          {!showCustomDatePicker ? (
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="today">今天</option>
              <option value="yesterday">昨天</option>
              <option value="week">最近7天</option>
              <option value="month">最近30天</option>
              <option value="custom">自定义时间</option>
            </select>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100"
              />
              <span className="text-gray-500">至</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100"
              />
              <button
                onClick={applyCustomDateRange}
                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded transition-colors"
              >
                确定
              </button>
              <button
                onClick={() => {
                  setShowCustomDatePicker(false)
                  setTimeRange("today")
                }}
                className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded transition-colors"
              >
                取消
              </button>
            </div>
          )}
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            导出报表
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      ) : (
        <>
          {/* 核心指标卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">总收益</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {parseFloat(summaryData.totalRevenue).toLocaleString()} USDT
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
                    {parseInt(summaryData.totalOrders).toLocaleString()}
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
                    {parseInt(summaryData.totalUsers).toLocaleString()}
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
                    {parseFloat(summaryData.avgOrderAmount).toLocaleString()} USDT
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
                              {parseFloat(stat.depositAmount).toLocaleString()} USDT
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900 dark:text-gray-100">
                              {stat.withdrawalCount.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900 dark:text-gray-100">
                              {parseFloat(stat.withdrawalAmount).toLocaleString()} USDT
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                              {parseFloat(stat.revenue).toLocaleString()} USDT
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
                              {parseFloat(stat.depositAmount).toLocaleString()} USDT
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900 dark:text-gray-100">
                              {stat.withdrawalCount.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900 dark:text-gray-100">
                              {parseFloat(stat.withdrawalAmount).toLocaleString()} USDT
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-red-600 dark:text-red-400">
                              -{parseFloat(stat.gasFee).toLocaleString()} USDT
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                              {parseFloat(stat.revenue).toLocaleString()} USDT
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
                              {parseFloat(stat.buyAmount).toLocaleString()} USDT
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900 dark:text-gray-100">
                              {stat.sellOrders.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm text-gray-900 dark:text-gray-100">
                              {parseFloat(stat.sellAmount).toLocaleString()} USDT
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                              {parseFloat(stat.commission).toLocaleString()} USDT
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
        </>
      )}
    </div>
  )
}
