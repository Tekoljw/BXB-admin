"use client"

import React, { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ArrowUpDown,
  Download,
  Loader2,
  CalendarIcon,
  Wallet,
  PiggyBank,
  Percent,
} from "lucide-react"
import { toast } from "sonner"

export default function FiatBusinessReportPage() {
  const [timeRange, setTimeRange] = useState("today")
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")
  const [customDays, setCustomDays] = useState(15)
  const [isLoading, setIsLoading] = useState(false)
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false)

  // 计算日期差（天数）
  const calculateDaysDifference = (start: string, end: string): number => {
    if (!start || !end) return 15
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  // 根据时间范围生成动态数据
  const summaryData = useMemo(() => {
    const getMultiplier = () => {
      const multipliers: Record<string, number> = {
        today: 1,
        yesterday: 0.92,
        week: 7,
        month: 30,
      }
      if (timeRange === "custom") {
        return customDays
      }
      return multipliers[timeRange] || 1
    }

    const multiplier = getMultiplier()

    return {
      activeMerchants: Math.floor(125 * multiplier * 0.6).toString(),
      
      todayCollection: (345678.9 * multiplier).toFixed(2),
      yesterdayCollection: (345678.9 * multiplier * 0.92).toFixed(2),
      
      todayPayout: (289456.78 * multiplier).toFixed(2),
      yesterdayPayout: (289456.78 * multiplier * 0.92).toFixed(2),
      
      todayDisbursement: (178934.56 * multiplier).toFixed(2),
      yesterdayDisbursement: (178934.56 * multiplier * 0.92).toFixed(2),
      
      merchantAssets: (8765432.1).toFixed(2),
      paymentFunds: (5432109.87).toFixed(2),
      
      todayDisbursement2: (178934.56 * multiplier).toFixed(2),
      yesterdayDisbursement2: (178934.56 * multiplier * 0.92).toFixed(2),
      
      todayFeeProfit: (12345.67 * multiplier).toFixed(2),
      yesterdayFeeProfit: (12345.67 * multiplier * 0.92).toFixed(2),
      
      todayExchangeProfit: (8765.43 * multiplier).toFixed(2),
      yesterdayExchangeProfit: (8765.43 * multiplier * 0.92).toFixed(2),
      
      todayTotalProfit: (21111.1 * multiplier).toFixed(2),
      yesterdayTotalProfit: (21111.1 * multiplier * 0.92).toFixed(2),
    }
  }, [timeRange, customDays])

  // 处理时间范围变更
  const handleTimeRangeChange = (value: string) => {
    if (value === "custom") {
      setShowCustomDatePicker(true)
    } else {
      setShowCustomDatePicker(false)
      setIsLoading(true)
      setTimeRange(value)
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  // 应用自定义时间范围
  const applyCustomDateRange = () => {
    if (!customStartDate || !customEndDate) {
      toast.error("请选择开始和结束日期")
      return
    }

    const start = new Date(customStartDate)
    const end = new Date(customEndDate)

    if (start > end) {
      toast.error("结束日期必须晚于开始日期")
      return
    }

    const days = calculateDaysDifference(customStartDate, customEndDate)
    setCustomDays(days)
    setTimeRange("custom")
    setShowCustomDatePicker(false)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success(`已应用自定义时间范围（${days}天）`)
    }, 500)
  }

  // 导出CSV
  const exportToCSV = () => {
    try {
      const timeRangeText = {
        today: "今天",
        yesterday: "昨天",
        week: "最近7天",
        month: "最近30天",
        custom: `自定义（${customStartDate} 至 ${customEndDate}）`,
      }[timeRange] || "今天"

      let csvContent = "\ufeff"
      csvContent += `法币经营报表\n`
      csvContent += `导出时间: ${new Date().toLocaleString('zh-CN')}\n`
      csvContent += `统计范围: ${timeRangeText}\n\n`

      csvContent += "核心业务指标\n"
      csvContent += "指标名称,数值\n"
      csvContent += `活跃商户数,${summaryData.activeMerchants}\n`
      csvContent += `今日代收,${summaryData.todayCollection} USDT\n`
      csvContent += `昨日代收,${summaryData.yesterdayCollection} USDT\n`
      csvContent += `今日代付,${summaryData.todayPayout} USDT\n`
      csvContent += `昨日代付,${summaryData.yesterdayPayout} USDT\n`
      csvContent += `今日下发,${summaryData.todayDisbursement} USDT\n`
      csvContent += `昨日下发,${summaryData.yesterdayDisbursement} USDT\n`
      csvContent += `商户资产,${summaryData.merchantAssets} USDT\n`
      csvContent += `代付金,${summaryData.paymentFunds} USDT\n`
      csvContent += `今日手续费利润,${summaryData.todayFeeProfit} USDT\n`
      csvContent += `昨日手续费利润,${summaryData.yesterdayFeeProfit} USDT\n`
      csvContent += `今日汇率利润,${summaryData.todayExchangeProfit} USDT\n`
      csvContent += `昨日汇率利润,${summaryData.yesterdayExchangeProfit} USDT\n`
      csvContent += `今日总利润,${summaryData.todayTotalProfit} USDT\n`
      csvContent += `昨日总利润,${summaryData.yesterdayTotalProfit} USDT\n`

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute(
        "download",
        `法币经营报表_${timeRangeText}_${new Date().getTime()}.csv`
      )
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success("CSV文件已导出")
    } catch (error) {
      console.error("CSV导出失败:", error)
      toast.error("CSV导出失败，请重试")
    }
  }

  const calculateChange = (today: string, yesterday: string) => {
    const todayNum = parseFloat(today)
    const yesterdayNum = parseFloat(yesterday)
    if (yesterdayNum === 0) return "+0%"
    const change = ((todayNum - yesterdayNum) / yesterdayNum) * 100
    return change >= 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-custom-green" />
            经营报表
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            查看法币业务经营数据和核心指标
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Tabs value={timeRange} onValueChange={handleTimeRangeChange}>
            <TabsList>
              <TabsTrigger value="today">今天</TabsTrigger>
              <TabsTrigger value="yesterday">昨天</TabsTrigger>
              <TabsTrigger value="week">最近7天</TabsTrigger>
              <TabsTrigger value="month">最近30天</TabsTrigger>
              <TabsTrigger value="custom">自定义</TabsTrigger>
            </TabsList>
          </Tabs>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-custom-green hover:bg-custom-green/90 text-white rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            导出CSV
          </button>
        </div>
      </div>

      {showCustomDatePicker && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <label className="text-sm font-medium">开始日期:</label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="px-3 py-1.5 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">结束日期:</label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="px-3 py-1.5 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
            <button
              onClick={applyCustomDateRange}
              className="px-4 py-1.5 bg-custom-green hover:bg-custom-green/90 text-white rounded-lg transition-colors"
            >
              应用
            </button>
            <button
              onClick={() => setShowCustomDatePicker(false)}
              className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              取消
            </button>
          </div>
        </Card>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-custom-green mb-4" />
          <p className="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    活跃商户数
                  </h3>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {summaryData.activeMerchants}
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    今日代收/昨日代收
                  </h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData.todayCollection} USDT
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  昨日: {summaryData.yesterdayCollection} USDT
                  <span className={`ml-2 ${parseFloat(summaryData.todayCollection) >= parseFloat(summaryData.yesterdayCollection) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {calculateChange(summaryData.todayCollection, summaryData.yesterdayCollection)}
                  </span>
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <ArrowUpDown className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    今日代付/昨日代付
                  </h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData.todayPayout} USDT
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  昨日: {summaryData.yesterdayPayout} USDT
                  <span className={`ml-2 ${parseFloat(summaryData.todayPayout) >= parseFloat(summaryData.yesterdayPayout) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {calculateChange(summaryData.todayPayout, summaryData.yesterdayPayout)}
                  </span>
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 border-orange-200 dark:border-orange-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <TrendingDown className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    今日下发/昨日下发
                  </h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData.todayDisbursement} USDT
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  昨日: {summaryData.yesterdayDisbursement} USDT
                  <span className={`ml-2 ${parseFloat(summaryData.todayDisbursement) >= parseFloat(summaryData.yesterdayDisbursement) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {calculateChange(summaryData.todayDisbursement, summaryData.yesterdayDisbursement)}
                  </span>
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950/50 dark:to-cyan-900/50 border-cyan-200 dark:border-cyan-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cyan-500 rounded-lg">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    商户资产/代付金
                  </h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData.merchantAssets} USDT
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  代付金: {summaryData.paymentFunds} USDT
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/50 border-pink-200 dark:border-pink-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-pink-500 rounded-lg">
                    <TrendingDown className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    今日下发/昨日下发
                  </h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData.todayDisbursement2} USDT
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  昨日: {summaryData.yesterdayDisbursement2} USDT
                  <span className={`ml-2 ${parseFloat(summaryData.todayDisbursement2) >= parseFloat(summaryData.yesterdayDisbursement2) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {calculateChange(summaryData.todayDisbursement2, summaryData.yesterdayDisbursement2)}
                  </span>
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/50 dark:to-yellow-900/50 border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <Percent className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    今日手续费利润/昨日手续费利润
                  </h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData.todayFeeProfit} USDT
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  昨日: {summaryData.yesterdayFeeProfit} USDT
                  <span className={`ml-2 ${parseFloat(summaryData.todayFeeProfit) >= parseFloat(summaryData.yesterdayFeeProfit) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {calculateChange(summaryData.todayFeeProfit, summaryData.yesterdayFeeProfit)}
                  </span>
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/50 dark:to-indigo-900/50 border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-500 rounded-lg">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    今日汇率利润/昨日汇率利润
                  </h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData.todayExchangeProfit} USDT
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  昨日: {summaryData.yesterdayExchangeProfit} USDT
                  <span className={`ml-2 ${parseFloat(summaryData.todayExchangeProfit) >= parseFloat(summaryData.yesterdayExchangeProfit) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {calculateChange(summaryData.todayExchangeProfit, summaryData.yesterdayExchangeProfit)}
                  </span>
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-500 rounded-lg">
                    <PiggyBank className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    今日总利润/昨日总利润
                  </h3>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summaryData.todayTotalProfit} USDT
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  昨日: {summaryData.yesterdayTotalProfit} USDT
                  <span className={`ml-2 ${parseFloat(summaryData.todayTotalProfit) >= parseFloat(summaryData.yesterdayTotalProfit) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {calculateChange(summaryData.todayTotalProfit, summaryData.yesterdayTotalProfit)}
                  </span>
                </p>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
