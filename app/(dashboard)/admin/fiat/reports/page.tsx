"use client"

import React, { useState, useMemo } from "react"
import { ChevronDown, ChevronRight, TrendingUp, Download, Calendar, Loader2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LoadMoreButton } from "@/components/load-more-button"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface ChannelProfit {
  channelName: string
  collectionRateProfit: number
  collectionFixedProfit: number
  payoutRateProfit: number
  payoutFixedProfit: number
  totalProfit: number
}

interface MerchantProfit {
  merchantId: string
  merchantName: string
  collectionRateProfit: number
  collectionFixedProfit: number
  payoutRateProfit: number
  payoutFixedProfit: number
  totalProfit: number
}

interface ReportRow {
  period: string
  activeMerchants: number
  activeAgents: number
  collectionRateProfit: number
  collectionFixedProfit: number
  payoutRateProfit: number
  payoutFixedProfit: number
  totalProfit: number
  topChannels: ChannelProfit[]
  topMerchants: MerchantProfit[]
}

const mockDailyReports: ReportRow[] = [
  {
    period: "2024-11-09",
    activeMerchants: 45,
    activeAgents: 12,
    collectionRateProfit: 12500.50,
    collectionFixedProfit: 3200.00,
    payoutRateProfit: 8900.25,
    payoutFixedProfit: 2100.50,
    totalProfit: 26700.25,
    topChannels: [
      { channelName: "支付宝", collectionRateProfit: 5200.00, collectionFixedProfit: 1200.00, payoutRateProfit: 3500.00, payoutFixedProfit: 800.00, totalProfit: 10700.00 },
      { channelName: "微信支付", collectionRateProfit: 4100.00, collectionFixedProfit: 900.00, payoutRateProfit: 2800.00, payoutFixedProfit: 650.00, totalProfit: 8450.00 },
      { channelName: "银行转账", collectionRateProfit: 2300.00, collectionFixedProfit: 600.00, payoutRateProfit: 1800.00, payoutFixedProfit: 420.00, totalProfit: 5120.00 },
      { channelName: "PIX支付", collectionRateProfit: 900.50, collectionFixedProfit: 500.00, payoutRateProfit: 800.25, payoutFixedProfit: 230.50, totalProfit: 2430.25 },
    ],
    topMerchants: [
      { merchantId: "M001", merchantName: "云端收银", collectionRateProfit: 6800.00, collectionFixedProfit: 1500.00, payoutRateProfit: 4200.00, payoutFixedProfit: 1000.00, totalProfit: 13500.00 },
      { merchantId: "M002", merchantName: "星际支付", collectionRateProfit: 3200.50, collectionFixedProfit: 900.00, payoutRateProfit: 2500.25, payoutFixedProfit: 600.50, totalProfit: 7200.25 },
      { merchantId: "M003", merchantName: "月光商户", collectionRateProfit: 2500.00, collectionFixedProfit: 800.00, payoutRateProfit: 2200.00, payoutFixedProfit: 500.00, totalProfit: 6000.00 },
    ]
  },
  {
    period: "2024-11-08",
    activeMerchants: 42,
    activeAgents: 11,
    collectionRateProfit: 11200.00,
    collectionFixedProfit: 2900.00,
    payoutRateProfit: 8100.50,
    payoutFixedProfit: 1950.00,
    totalProfit: 24150.50,
    topChannels: [
      { channelName: "支付宝", collectionRateProfit: 4800.00, collectionFixedProfit: 1100.00, payoutRateProfit: 3200.00, payoutFixedProfit: 750.00, totalProfit: 9850.00 },
      { channelName: "微信支付", collectionRateProfit: 3900.00, collectionFixedProfit: 850.00, payoutRateProfit: 2600.00, payoutFixedProfit: 600.00, totalProfit: 7950.00 },
    ],
    topMerchants: [
      { merchantId: "M001", merchantName: "云端收银", collectionRateProfit: 6200.00, collectionFixedProfit: 1400.00, payoutRateProfit: 3900.00, payoutFixedProfit: 950.00, totalProfit: 12450.00 },
    ]
  },
  {
    period: "2024-11-07",
    activeMerchants: 40,
    activeAgents: 10,
    collectionRateProfit: 10500.00,
    collectionFixedProfit: 2700.00,
    payoutRateProfit: 7500.00,
    payoutFixedProfit: 1800.00,
    totalProfit: 22500.00,
    topChannels: [
      { channelName: "支付宝", collectionRateProfit: 4500.00, collectionFixedProfit: 1000.00, payoutRateProfit: 3000.00, payoutFixedProfit: 700.00, totalProfit: 9200.00 },
    ],
    topMerchants: [
      { merchantId: "M001", merchantName: "云端收银", collectionRateProfit: 5800.00, collectionFixedProfit: 1300.00, payoutRateProfit: 3600.00, payoutFixedProfit: 900.00, totalProfit: 11600.00 },
    ]
  },
]

const mockMonthlyReports: ReportRow[] = [
  {
    period: "2024-11",
    activeMerchants: 58,
    activeAgents: 15,
    collectionRateProfit: 385000.00,
    collectionFixedProfit: 96000.00,
    payoutRateProfit: 275000.00,
    payoutFixedProfit: 65000.00,
    totalProfit: 821000.00,
    topChannels: [
      { channelName: "支付宝", collectionRateProfit: 165000.00, collectionFixedProfit: 38000.00, payoutRateProfit: 110000.00, payoutFixedProfit: 25000.00, totalProfit: 338000.00 },
      { channelName: "微信支付", collectionRateProfit: 128000.00, collectionFixedProfit: 28000.00, payoutRateProfit: 88000.00, payoutFixedProfit: 20000.00, totalProfit: 264000.00 },
      { channelName: "银行转账", collectionRateProfit: 72000.00, collectionFixedProfit: 18000.00, payoutRateProfit: 55000.00, payoutFixedProfit: 13000.00, totalProfit: 158000.00 },
      { channelName: "PIX支付", collectionRateProfit: 20000.00, collectionFixedProfit: 12000.00, payoutRateProfit: 22000.00, payoutFixedProfit: 7000.00, totalProfit: 61000.00 },
    ],
    topMerchants: [
      { merchantId: "M001", merchantName: "云端收银", collectionRateProfit: 210000.00, collectionFixedProfit: 48000.00, payoutRateProfit: 140000.00, payoutFixedProfit: 32000.00, totalProfit: 430000.00 },
      { merchantId: "M002", merchantName: "星际支付", collectionRateProfit: 96000.00, collectionFixedProfit: 27000.00, payoutRateProfit: 75000.00, payoutFixedProfit: 18000.00, totalProfit: 216000.00 },
      { merchantId: "M003", merchantName: "月光商户", collectionRateProfit: 79000.00, collectionFixedProfit: 21000.00, payoutRateProfit: 60000.00, payoutFixedProfit: 15000.00, totalProfit: 175000.00 },
    ]
  },
  {
    period: "2024-10",
    activeMerchants: 52,
    activeAgents: 14,
    collectionRateProfit: 356000.00,
    collectionFixedProfit: 89000.00,
    payoutRateProfit: 252000.00,
    payoutFixedProfit: 60000.00,
    totalProfit: 757000.00,
    topChannels: [
      { channelName: "支付宝", collectionRateProfit: 152000.00, collectionFixedProfit: 35000.00, payoutRateProfit: 101000.00, payoutFixedProfit: 23000.00, totalProfit: 311000.00 },
      { channelName: "微信支付", collectionRateProfit: 118000.00, collectionFixedProfit: 26000.00, payoutRateProfit: 81000.00, payoutFixedProfit: 18000.00, totalProfit: 243000.00 },
    ],
    topMerchants: [
      { merchantId: "M001", merchantName: "云端收银", collectionRateProfit: 195000.00, collectionFixedProfit: 44000.00, payoutRateProfit: 128000.00, payoutFixedProfit: 29000.00, totalProfit: 396000.00 },
    ]
  },
]

export default function ReportsPage() {
  const [reportType, setReportType] = useState<"daily" | "monthly">("daily")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [timeRange, setTimeRange] = useState<string>("today")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [customDays, setCustomDays] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const currentReports = reportType === "daily" ? mockDailyReports : mockMonthlyReports

  const toggleRowExpansion = (period: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(period)) {
      newExpanded.delete(period)
    } else {
      newExpanded.add(period)
    }
    setExpandedRows(newExpanded)
  }

  const formatCurrency = (value: number) => {
    return `${value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`
  }

  const formatNumber = (value: number) => {
    return value.toLocaleString('zh-CN')
  }

  const calculateDaysDifference = (start: string, end: string): number | null => {
    const startDateObj = new Date(start)
    const endDateObj = new Date(end)
    
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return null
    }
    
    if (endDateObj < startDateObj) {
      return null
    }
    
    const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  const handleTimeRangeChange = (value: string) => {
    if (value === "custom") {
      setShowDatePicker(true)
    } else {
      setTimeRange(value)
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  const handleCustomDateApply = () => {
    if (!startDate || !endDate) {
      toast.error("请选择开始日期和结束日期")
      return
    }

    const days = calculateDaysDifference(startDate, endDate)
    if (days === null) {
      toast.error("日期选择错误", {
        description: "结束日期必须晚于或等于开始日期"
      })
      return
    }

    setCustomDays(days)
    setTimeRange("custom")
    setShowDatePicker(false)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("时间范围已更新", {
        description: `已选择 ${days} 天的数据范围`
      })
    }, 500)
  }

  const topStats = useMemo(() => {
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

    const baseActiveMerchants = 45
    const baseTotalMerchants = 120
    const baseTodayCollection = 234567.89
    const baseTodayPayout = 189234.56
    const baseYesterdayCollection = 212345.67
    const baseYesterdayPayout = 178923.45
    const baseTodayDisbursement = 156789.23
    const baseYesterdayDisbursement = 145678.91
    const baseMerchantAssets = 5678900.00
    const basePaymentFunds = 2345678.00
    const baseTodayFeeProfit = 12345.67
    const baseTodayExchangeProfit = 8765.43
    const baseYesterdayFeeProfit = 11234.56
    const baseYesterdayExchangeProfit = 7654.32
    const baseMonthlyFeeProfit = 345678.90
    const baseMonthlyExchangeProfit = 234567.89

    return {
      activeMerchants: Math.floor(baseActiveMerchants * Math.min(multiplier / 7, 1.2)),
      totalMerchants: Math.floor(baseTotalMerchants * Math.min(multiplier / 7, 1.3)),
      todayCollection: (baseTodayCollection * multiplier * 0.15).toFixed(2),
      todayPayout: (baseTodayPayout * multiplier * 0.15).toFixed(2),
      yesterdayCollection: (baseYesterdayCollection * multiplier * 0.14).toFixed(2),
      yesterdayPayout: (baseYesterdayPayout * multiplier * 0.14).toFixed(2),
      todayDisbursement: (baseTodayDisbursement * multiplier * 0.13).toFixed(2),
      yesterdayDisbursement: (baseYesterdayDisbursement * multiplier * 0.12).toFixed(2),
      merchantAssets: (baseMerchantAssets * Math.min(multiplier / 10, 1.5)).toFixed(2),
      paymentFunds: (basePaymentFunds * Math.min(multiplier / 10, 1.5)).toFixed(2),
      todayFeeProfit: (baseTodayFeeProfit * multiplier * 0.15).toFixed(2),
      todayExchangeProfit: (baseTodayExchangeProfit * multiplier * 0.15).toFixed(2),
      todayTotalProfit: ((baseTodayFeeProfit + baseTodayExchangeProfit) * multiplier * 0.15).toFixed(2),
      yesterdayFeeProfit: (baseYesterdayFeeProfit * multiplier * 0.14).toFixed(2),
      yesterdayExchangeProfit: (baseYesterdayExchangeProfit * multiplier * 0.14).toFixed(2),
      yesterdayTotalProfit: ((baseYesterdayFeeProfit + baseYesterdayExchangeProfit) * multiplier * 0.14).toFixed(2),
      monthlyFeeProfit: (baseMonthlyFeeProfit * Math.min(multiplier / 5, 1.8)).toFixed(2),
      monthlyExchangeProfit: (baseMonthlyExchangeProfit * Math.min(multiplier / 5, 1.8)).toFixed(2),
      monthlyTotalProfit: ((baseMonthlyFeeProfit + baseMonthlyExchangeProfit) * Math.min(multiplier / 5, 1.8)).toFixed(2),
    }
  }, [timeRange, customDays])

  const handleExportCSV = () => {
    try {
      const timeRangeText = {
        today: "今天",
        yesterday: "昨天",
        week: "最近7天",
        month: "最近30天",
        custom: `自定义 (${customDays}天)`
      }[timeRange] || "全部"

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]
      const currentTime = new Date().toLocaleString('zh-CN')

      let csvContent = "\uFEFF"
      csvContent += `法币经营报表\n`
      csvContent += `导出时间,${currentTime}\n`
      csvContent += `时间范围,${timeRangeText}\n\n`

      csvContent += `核心指标\n`
      csvContent += `指标名称,数值\n`
      csvContent += `活跃商户数,${topStats.activeMerchants}\n`
      csvContent += `总商户数,${topStats.totalMerchants}\n`
      csvContent += `今日代收,${topStats.todayCollection} USDT\n`
      csvContent += `今日代付,${topStats.todayPayout} USDT\n`
      csvContent += `昨日代收,${topStats.yesterdayCollection} USDT\n`
      csvContent += `昨日代付,${topStats.yesterdayPayout} USDT\n`
      csvContent += `今日下发,${topStats.todayDisbursement} USDT\n`
      csvContent += `昨日下发,${topStats.yesterdayDisbursement} USDT\n`
      csvContent += `商户资产,${topStats.merchantAssets} USDT\n`
      csvContent += `代付金,${topStats.paymentFunds} USDT\n`
      csvContent += `今日手续费利润,${topStats.todayFeeProfit} USDT\n`
      csvContent += `今日下发汇率利润,${topStats.todayExchangeProfit} USDT\n`
      csvContent += `今日总利润,${topStats.todayTotalProfit} USDT\n`
      csvContent += `昨日手续费利润,${topStats.yesterdayFeeProfit} USDT\n`
      csvContent += `昨日下发利润,${topStats.yesterdayExchangeProfit} USDT\n`
      csvContent += `昨日总利润,${topStats.yesterdayTotalProfit} USDT\n`
      csvContent += `本月手续费利润,${topStats.monthlyFeeProfit} USDT\n`
      csvContent += `本月下发汇率利润,${topStats.monthlyExchangeProfit} USDT\n`
      csvContent += `本月总利润,${topStats.monthlyTotalProfit} USDT\n\n`

      csvContent += `${reportType === "daily" ? "每日" : "每月"}报表详情\n`
      csvContent += `${reportType === "daily" ? "日期" : "月份"},活跃商户数,活跃代理商数,代收费率利润,代收单笔利润,代付费率利润,代付单笔利润,总利润\n`
      currentReports.forEach(report => {
        csvContent += `${report.period},${report.activeMerchants},${report.activeAgents},${report.collectionRateProfit},${report.collectionFixedProfit},${report.payoutRateProfit},${report.payoutFixedProfit},${report.totalProfit}\n`
      })

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `法币经营报表_${timestamp}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success("导出成功", {
        description: "报表已成功导出为CSV文件"
      })
    } catch (error) {
      console.error('Export error:', error)
      toast.error("导出失败", {
        description: "导出过程中出现错误，请重试"
      })
    }
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
            查看法币业务的整体经营数据和利润分析
          </p>
        </div>
        <Button onClick={handleExportCSV} className="bg-custom-green hover:bg-green-600">
          <Download className="w-4 h-4 mr-2" />
          导出CSV
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-custom-green mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">加载中...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">商户统计</div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-custom-green">{formatNumber(topStats.activeMerchants)}</span>
                <span className="text-lg text-gray-400">/</span>
                <span className="text-lg font-medium text-gray-600 dark:text-gray-300">{formatNumber(topStats.totalMerchants)}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">活跃 / 总数</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">今日业务</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">代收</span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{formatCurrency(parseFloat(topStats.todayCollection))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">代付</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{formatCurrency(parseFloat(topStats.todayPayout))}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">昨日业务</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">代收</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.yesterdayCollection))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">代付</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.yesterdayPayout))}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">下发统计</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">今日</span>
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{formatCurrency(parseFloat(topStats.todayDisbursement))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">昨日</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.yesterdayDisbursement))}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">资金统计</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">商户资产</span>
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{formatCurrency(parseFloat(topStats.merchantAssets))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">代付金</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.paymentFunds))}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">今日利润</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">手续费</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{formatCurrency(parseFloat(topStats.todayFeeProfit))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">汇率</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">{formatCurrency(parseFloat(topStats.todayExchangeProfit))}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">总计</span>
                  <span className="text-sm font-bold text-green-700 dark:text-green-300">{formatCurrency(parseFloat(topStats.todayTotalProfit))}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">昨日利润</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">手续费</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.yesterdayFeeProfit))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">汇率</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.yesterdayExchangeProfit))}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">总计</span>
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{formatCurrency(parseFloat(topStats.yesterdayTotalProfit))}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">本月利润</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">手续费</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{formatCurrency(parseFloat(topStats.monthlyFeeProfit))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">汇率</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{formatCurrency(parseFloat(topStats.monthlyExchangeProfit))}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">总计</span>
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300">{formatCurrency(parseFloat(topStats.monthlyTotalProfit))}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Tabs value={reportType} onValueChange={(value) => setReportType(value as "daily" | "monthly")}>
                  <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="daily">每日报表</TabsTrigger>
                    <TabsTrigger value="monthly">每月报表</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="ml-auto">
                  <Select value={timeRange} onValueChange={handleTimeRangeChange}>
                    <SelectTrigger className="w-40">
                      <Calendar className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">今天</SelectItem>
                      <SelectItem value="yesterday">昨天</SelectItem>
                      <SelectItem value="week">最近7天</SelectItem>
                      <SelectItem value="month">最近30天</SelectItem>
                      <SelectItem value="custom">自定义</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>{reportType === "daily" ? "日期" : "月份"}</TableHead>
                    <TableHead className="text-center">活跃商户数</TableHead>
                    <TableHead className="text-center">活跃代理商数</TableHead>
                    <TableHead className="text-right">代收费率利润</TableHead>
                    <TableHead className="text-right">代收单笔利润</TableHead>
                    <TableHead className="text-right">代付费率利润</TableHead>
                    <TableHead className="text-right">代付单笔利润</TableHead>
                    <TableHead className="text-right">总利润</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentReports.map((report) => (
                    <React.Fragment key={report.period}>
                      <TableRow
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        onClick={() => toggleRowExpansion(report.period)}
                      >
                        <TableCell>
                          {expandedRows.has(report.period) ? (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{report.period}</TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {report.activeMerchants}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                            {report.activeAgents}
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-green-600 dark:text-green-400 font-medium">
                          {formatCurrency(report.collectionRateProfit)}
                        </TableCell>
                        <TableCell className="text-right text-green-600 dark:text-green-400 font-medium">
                          {formatCurrency(report.collectionFixedProfit)}
                        </TableCell>
                        <TableCell className="text-right text-green-600 dark:text-green-400 font-medium">
                          {formatCurrency(report.payoutRateProfit)}
                        </TableCell>
                        <TableCell className="text-right text-green-600 dark:text-green-400 font-medium">
                          {formatCurrency(report.payoutFixedProfit)}
                        </TableCell>
                        <TableCell className="text-right font-bold text-green-700 dark:text-green-300">
                          {formatCurrency(report.totalProfit)}
                        </TableCell>
                      </TableRow>

                      {expandedRows.has(report.period) && (
                        <TableRow>
                          <TableCell colSpan={9} className="bg-gray-50 dark:bg-gray-900/50 p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                  利润前10支付渠道
                                </h3>
                                <div className="space-y-2">
                                  {report.topChannels.slice(0, 10).map((channel, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                          {idx + 1}. {channel.channelName}
                                        </span>
                                        <span className="font-bold text-green-700 dark:text-green-300">
                                          {formatCurrency(channel.totalProfit)}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                                        <div>代收费率: {formatCurrency(channel.collectionRateProfit)}</div>
                                        <div>代收单笔: {formatCurrency(channel.collectionFixedProfit)}</div>
                                        <div>代付费率: {formatCurrency(channel.payoutRateProfit)}</div>
                                        <div>代付单笔: {formatCurrency(channel.payoutFixedProfit)}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                  利润前10商户
                                </h3>
                                <div className="space-y-2">
                                  {report.topMerchants.slice(0, 10).map((merchant, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <div>
                                          <span className="font-medium text-gray-900 dark:text-white">
                                            {idx + 1}. {merchant.merchantName}
                                          </span>
                                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                            ({merchant.merchantId})
                                          </span>
                                        </div>
                                        <span className="font-bold text-green-700 dark:text-green-300">
                                          {formatCurrency(merchant.totalProfit)}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                                        <div>代收费率: {formatCurrency(merchant.collectionRateProfit)}</div>
                                        <div>代收单笔: {formatCurrency(merchant.collectionFixedProfit)}</div>
                                        <div>代付费率: {formatCurrency(merchant.payoutRateProfit)}</div>
                                        <div>代付单笔: {formatCurrency(merchant.payoutFixedProfit)}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>

            <LoadMoreButton />
          </div>
        </>
      )}

      <Dialog open={showDatePicker} onOpenChange={setShowDatePicker}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>选择自定义时间范围</DialogTitle>
            <DialogDescription>
              选择开始日期和结束日期以查看指定时间范围内的数据
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">开始日期</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">结束日期</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowDatePicker(false)}>
              取消
            </Button>
            <Button onClick={handleCustomDateApply} className="bg-custom-green hover:bg-green-600">
              应用
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
