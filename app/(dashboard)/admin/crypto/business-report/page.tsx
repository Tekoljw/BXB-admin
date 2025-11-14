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

interface CurrencyDetail {
  currency: string
  network: string
  depositCount: number
  depositAmount: number
  withdrawalCount: number
  withdrawalAmount: number
  feeRevenue: number
  profit: number
}

interface NetworkDetail {
  network: string
  depositCount: number
  depositAmount: number
  withdrawalCount: number
  withdrawalAmount: number
  gasFee: number
  feeRevenue: number
  profit: number
}

interface OTCDetail {
  supplier: string
  buyOrders: number
  buyAmount: number
  sellOrders: number
  sellAmount: number
  commission: number
}

interface ReportRow {
  period: string
  depositCount: number
  depositAmount: number
  withdrawalCount: number
  withdrawalAmount: number
  activeWallets: number
  feeRevenue: number
  gasCost: number
  otcVolume: number
  netProfit: number
  topCurrencies: CurrencyDetail[]
  topNetworks: NetworkDetail[]
  topOTCSuppliers: OTCDetail[]
}

const mockDailyReports: ReportRow[] = [
  {
    period: "2024-11-12",
    depositCount: 3245,
    depositAmount: 1456789.12,
    withdrawalCount: 2876,
    withdrawalAmount: 1198234.56,
    activeWallets: 1567,
    feeRevenue: 26458.23,
    gasCost: 12345.67,
    otcVolume: 644444.33,
    netProfit: 14112.56,
    topCurrencies: [
      { currency: "USDT", network: "全网络", depositCount: 1876, depositAmount: 856789.12, withdrawalCount: 1654, withdrawalAmount: 698234.56, feeRevenue: 15552.24, profit: 15552.24 },
      { currency: "USDC", network: "全网络", depositCount: 876, depositAmount: 334567.89, withdrawalCount: 754, withdrawalAmount: 298765.43, feeRevenue: 6333.33, profit: 6333.33 },
      { currency: "BTC", network: "Bitcoin", depositCount: 234, depositAmount: 123456.78, withdrawalCount: 198, withdrawalAmount: 98765.43, feeRevenue: 2222.22, profit: -1123.45 },
      { currency: "ETH", network: "Ethereum", depositCount: 259, depositAmount: 141975.33, withdrawalCount: 270, withdrawalAmount: 102469.14, feeRevenue: 2444.44, profit: -8899.88 },
    ],
    topNetworks: [
      { network: "Ethereum", depositCount: 1234, depositAmount: 689456.78, withdrawalCount: 1012, withdrawalAmount: 534567.89, feeRevenue: 12240.25, gasFee: 8345.67, profit: 3894.58 },
      { network: "BSC", depositCount: 987, depositAmount: 367890.12, withdrawalCount: 854, withdrawalAmount: 323456.78, feeRevenue: 6913.47, gasFee: 1234.56, profit: 5678.91 },
      { network: "Polygon", depositCount: 654, depositAmount: 228934.56, withdrawalCount: 598, withdrawalAmount: 186789.01, feeRevenue: 4157.24, gasFee: 234.56, profit: 3922.68 },
      { network: "Tron", depositCount: 432, depositAmount: 145678.9, withdrawalCount: 376, withdrawalAmount: 123456.78, feeRevenue: 2691.36, gasFee: 123.45, profit: 2567.91 },
      { network: "Bitcoin", depositCount: 234, depositAmount: 123456.78, withdrawalCount: 198, withdrawalAmount: 98765.43, feeRevenue: 2222.22, gasFee: 3567.89, profit: -1345.67 },
    ],
    topOTCSuppliers: [
      { supplier: "OTC供应商A", buyOrders: 234, buyAmount: 345678.9, sellOrders: 198, sellAmount: 298765.43, commission: 6444.44 },
      { supplier: "OTC供应商B", buyOrders: 187, buyAmount: 278934.56, sellOrders: 165, sellAmount: 234567.89, commission: 5135.03 },
      { supplier: "OTC供应商C", buyOrders: 156, buyAmount: 198765.43, sellOrders: 134, sellAmount: 176543.21, commission: 3753.09 },
    ]
  },
  {
    period: "2024-11-11",
    depositCount: 3012,
    depositAmount: 1334560.45,
    withdrawalCount: 2654,
    withdrawalAmount: 1089123.34,
    activeWallets: 1432,
    feeRevenue: 24236.84,
    gasCost: 11234.22,
    otcVolume: 587654.23,
    netProfit: 13002.62,
    topCurrencies: [
      { currency: "USDT", network: "全网络", depositCount: 1732, depositAmount: 784560.45, withdrawalCount: 1523, withdrawalAmount: 634123.34, feeRevenue: 14186.84, profit: 14186.84 },
      { currency: "USDC", network: "全网络", depositCount: 812, depositAmount: 306789.34, withdrawalCount: 698, withdrawalAmount: 272345.67, feeRevenue: 5791.35, profit: 5791.35 },
    ],
    topNetworks: [
      { network: "Ethereum", depositCount: 1145, depositAmount: 631234.56, withdrawalCount: 934, withdrawalAmount: 487234.56, feeRevenue: 11184.69, gasFee: 7623.45, profit: 3561.24 },
      { network: "BSC", depositCount: 912, depositAmount: 336789.45, withdrawalCount: 787, withdrawalAmount: 295678.34, feeRevenue: 6324.68, gasFee: 1123.67, profit: 5201.01 },
    ],
    topOTCSuppliers: [
      { supplier: "OTC供应商A", buyOrders: 216, buyAmount: 316789.45, sellOrders: 182, sellAmount: 270864.78, commission: 5876.54 },
      { supplier: "OTC供应商B", buyOrders: 172, buyAmount: 255234.67, sellOrders: 151, sellAmount: 214567.23, commission: 4697.02 },
    ]
  },
  {
    period: "2024-11-10",
    depositCount: 2876,
    depositAmount: 1223456.78,
    withdrawalCount: 2543,
    withdrawalAmount: 998765.43,
    activeWallets: 1354,
    feeRevenue: 22222.22,
    gasCost: 10345.67,
    otcVolume: 534567.89,
    netProfit: 11876.55,
    topCurrencies: [
      { currency: "USDT", network: "全网络", depositCount: 1654, depositAmount: 718234.56, withdrawalCount: 1456, withdrawalAmount: 581234.56, feeRevenue: 12997.69, profit: 12997.69 },
    ],
    topNetworks: [
      { network: "Ethereum", depositCount: 1089, depositAmount: 578234.56, withdrawalCount: 876, withdrawalAmount: 445678.34, feeRevenue: 10239.13, gasFee: 6989.45, profit: 3249.68 },
    ],
    topOTCSuppliers: [
      { supplier: "OTC供应商A", buyOrders: 198, buyAmount: 289234.56, sellOrders: 167, sellAmount: 245333.33, commission: 5345.68 },
    ]
  },
]

const mockMonthlyReports: ReportRow[] = [
  {
    period: "2024-11",
    depositCount: 95432,
    depositAmount: 45678900.00,
    withdrawalCount: 84321,
    withdrawalAmount: 38765400.00,
    activeWallets: 12456,
    feeRevenue: 845689.00,
    gasCost: 367890.00,
    otcVolume: 19234567.00,
    netProfit: 477799.00,
    topCurrencies: [
      { currency: "USDT", network: "全网络", depositCount: 54321, depositAmount: 26789000.00, withdrawalCount: 48765, withdrawalAmount: 22345600.00, feeRevenue: 491345.00, profit: 491345.00 },
      { currency: "USDC", network: "全网络", depositCount: 25678, depositAmount: 10234500.00, withdrawalCount: 22134, withdrawalAmount: 8876540.00, feeRevenue: 191110.00, profit: 191110.00 },
      { currency: "BTC", network: "Bitcoin", depositCount: 7234, depositAmount: 3876540.00, withdrawalCount: 6234, withdrawalAmount: 3098760.00, feeRevenue: 69753.00, profit: -38247.00 },
      { currency: "ETH", network: "Ethereum", depositCount: 8199, depositAmount: 4778860.00, withdrawalCount: 7188, withdrawalAmount: 4444500.00, feeRevenue: 92234.00, profit: -275656.00 },
    ],
    topNetworks: [
      { network: "Ethereum", depositCount: 38765, depositAmount: 21234560.00, withdrawalCount: 32456, withdrawalAmount: 17654320.00, feeRevenue: 388889.00, gasFee: 256789.00, profit: 132100.00 },
      { network: "BSC", depositCount: 28934, depositAmount: 11567890.00, withdrawalCount: 25678, withdrawalAmount: 9876540.00, feeRevenue: 214344.00, gasFee: 38901.00, profit: 175443.00 },
      { network: "Polygon", depositCount: 19234, depositAmount: 7234560.00, withdrawalCount: 17234, withdrawalAmount: 6123450.00, feeRevenue: 135796.00, gasFee: 7345.00, profit: 128451.00 },
      { network: "Tron", depositCount: 12789, depositAmount: 4567890.00, withdrawalCount: 11543, withdrawalAmount: 3876540.00, feeRevenue: 84443.00, gasFee: 3876.00, profit: 80567.00 },
      { network: "Bitcoin", depositCount: 7234, depositAmount: 3876540.00, withdrawalCount: 6234, withdrawalAmount: 3098760.00, feeRevenue: 69753.00, gasFee: 107979.00, profit: -38226.00 },
    ],
    topOTCSuppliers: [
      { supplier: "OTC供应商A", buyOrders: 6876, buyAmount: 10345678.00, sellOrders: 5987, sellAmount: 8888889.00, commission: 192346.00 },
      { supplier: "OTC供应商B", buyOrders: 5456, buyAmount: 8234567.00, sellOrders: 4876, sellAmount: 7123456.00, commission: 153580.00 },
      { supplier: "OTC供应商C", buyOrders: 4567, buyAmount: 6876543.00, sellOrders: 3987, sellAmount: 5876543.00, commission: 127532.00 },
    ]
  },
  {
    period: "2024-10",
    depositCount: 87654,
    depositAmount: 41234560.00,
    withdrawalCount: 76543,
    withdrawalAmount: 34876540.00,
    activeWallets: 11234,
    feeRevenue: 760594.00,
    gasCost: 328901.00,
    otcVolume: 17345678.00,
    netProfit: 431693.00,
    topCurrencies: [
      { currency: "USDT", network: "全网络", depositCount: 49876, depositAmount: 24123450.00, withdrawalCount: 44321, withdrawalAmount: 20098760.00, feeRevenue: 442221.00, profit: 442221.00 },
      { currency: "USDC", network: "全网络", depositCount: 23456, depositAmount: 9234567.00, withdrawalCount: 20123, withdrawalAmount: 7987654.00, feeRevenue: 172222.00, profit: 172222.00 },
    ],
    topNetworks: [
      { network: "Ethereum", depositCount: 35234, depositAmount: 19123450.00, withdrawalCount: 29456, withdrawalAmount: 15876540.00, feeRevenue: 349999.00, gasFee: 229876.00, profit: 120123.00 },
      { network: "BSC", depositCount: 26234, depositAmount: 10456780.00, withdrawalCount: 23234, withdrawalAmount: 8901230.00, feeRevenue: 193372.00, gasFee: 34567.00, profit: 158805.00 },
    ],
    topOTCSuppliers: [
      { supplier: "OTC供应商A", buyOrders: 6234, buyAmount: 9345678.00, sellOrders: 5432, sellAmount: 8012345.00, commission: 173581.00 },
    ]
  },
]

export default function CryptoBusinessReportPage() {
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

    const baseTodayDeposit = 1456789.12
    const baseYesterdayDeposit = 1334560.45
    const baseTodayWithdrawal = 1198234.56
    const baseYesterdayWithdrawal = 1089123.34
    const baseActiveWallets = 1567
    const baseTotalWallets = 15678
    const baseTodayFee = 26458.23
    const baseYesterdayFee = 24236.84
    const baseMonthlyFee = 845689.00
    const baseTodayGas = 12345.67
    const baseYesterdayGas = 11234.22
    const baseMonthlyGas = 367890.00
    const baseOTCBuy = 644444.33
    const baseOTCSell = 587654.23

    return {
      todayDeposit: (baseTodayDeposit * multiplier * 0.15).toFixed(2),
      yesterdayDeposit: (baseYesterdayDeposit * multiplier * 0.14).toFixed(2),
      todayWithdrawal: (baseTodayWithdrawal * multiplier * 0.15).toFixed(2),
      yesterdayWithdrawal: (baseYesterdayWithdrawal * multiplier * 0.14).toFixed(2),
      netFlow: ((baseTodayDeposit - baseTodayWithdrawal) * multiplier * 0.15).toFixed(2),
      activeWallets: Math.floor(baseActiveWallets * Math.min(multiplier / 7, 1.2)),
      totalWallets: Math.floor(baseTotalWallets * Math.min(multiplier / 7, 1.3)),
      todayFee: (baseTodayFee * multiplier * 0.15).toFixed(2),
      yesterdayFee: (baseYesterdayFee * multiplier * 0.14).toFixed(2),
      monthlyFee: (baseMonthlyFee * Math.min(multiplier / 5, 1.8)).toFixed(2),
      todayGas: (baseTodayGas * multiplier * 0.15).toFixed(2),
      yesterdayGas: (baseYesterdayGas * multiplier * 0.14).toFixed(2),
      monthlyGas: (baseMonthlyGas * Math.min(multiplier / 5, 1.8)).toFixed(2),
      todayProfit: ((baseTodayFee - baseTodayGas) * multiplier * 0.15).toFixed(2),
      yesterdayProfit: ((baseYesterdayFee - baseYesterdayGas) * multiplier * 0.14).toFixed(2),
      monthlyProfit: ((baseMonthlyFee - baseMonthlyGas) * Math.min(multiplier / 5, 1.8)).toFixed(2),
      otcBuyVolume: (baseOTCBuy * multiplier * 0.15).toFixed(2),
      otcSellVolume: (baseOTCSell * multiplier * 0.14).toFixed(2),
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
      csvContent += `Crypto经营报表\n`
      csvContent += `导出时间,${currentTime}\n`
      csvContent += `时间范围,${timeRangeText}\n\n`

      csvContent += `核心指标\n`
      csvContent += `指标名称,数值\n`
      csvContent += `今日充值,${topStats.todayDeposit} USDT\n`
      csvContent += `昨日充值,${topStats.yesterdayDeposit} USDT\n`
      csvContent += `今日提现,${topStats.todayWithdrawal} USDT\n`
      csvContent += `昨日提现,${topStats.yesterdayWithdrawal} USDT\n`
      csvContent += `净流入,${topStats.netFlow} USDT\n`
      csvContent += `活跃钱包数,${topStats.activeWallets}\n`
      csvContent += `总钱包数,${topStats.totalWallets}\n`
      csvContent += `今日手续费收益,${topStats.todayFee} USDT\n`
      csvContent += `昨日手续费收益,${topStats.yesterdayFee} USDT\n`
      csvContent += `本月手续费收益,${topStats.monthlyFee} USDT\n`
      csvContent += `今日Gas成本,${topStats.todayGas} USDT\n`
      csvContent += `昨日Gas成本,${topStats.yesterdayGas} USDT\n`
      csvContent += `本月Gas成本,${topStats.monthlyGas} USDT\n`
      csvContent += `今日净利润,${topStats.todayProfit} USDT\n`
      csvContent += `昨日净利润,${topStats.yesterdayProfit} USDT\n`
      csvContent += `本月净利润,${topStats.monthlyProfit} USDT\n`
      csvContent += `OTC买入量,${topStats.otcBuyVolume} USDT\n`
      csvContent += `OTC卖出量,${topStats.otcSellVolume} USDT\n\n`

      csvContent += `${reportType === "daily" ? "每日" : "每月"}报表详情\n`
      csvContent += `${reportType === "daily" ? "日期" : "月份"},充值笔数,充值金额,提现笔数,提现金额,活跃钱包,手续费收益,Gas成本,OTC交易量,净利润\n`
      currentReports.forEach(report => {
        csvContent += `${report.period},${report.depositCount},${report.depositAmount},${report.withdrawalCount},${report.withdrawalAmount},${report.activeWallets},${report.feeRevenue},${report.gasCost},${report.otcVolume},${report.netProfit}\n`
      })

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `Crypto经营报表_${timestamp}.csv`)
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
            查看Crypto业务的整体经营数据和利润分析
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
              <div className="text-sm text-gray-500 dark:text-gray-400">链上充值</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">今日</span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{formatCurrency(parseFloat(topStats.todayDeposit))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">昨日</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.yesterdayDeposit))}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">链上提现</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">今日</span>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400">{formatCurrency(parseFloat(topStats.todayWithdrawal))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">昨日</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.yesterdayWithdrawal))}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">净流入</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {formatCurrency(parseFloat(topStats.netFlow))}
              </div>
              <div className="text-xs text-gray-400 mt-1">充值 - 提现</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">活跃钱包</div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-custom-green">{formatNumber(topStats.activeWallets)}</span>
                <span className="text-lg text-gray-400">/</span>
                <span className="text-lg font-medium text-gray-600 dark:text-gray-300">{formatNumber(topStats.totalWallets)}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">活跃 / 总数</div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">手续费收益</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">今日</span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{formatCurrency(parseFloat(topStats.todayFee))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">昨日</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.yesterdayFee))}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">本月</span>
                  <span className="text-sm font-bold text-green-700 dark:text-green-300">{formatCurrency(parseFloat(topStats.monthlyFee))}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">Gas成本</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">今日</span>
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{formatCurrency(parseFloat(topStats.todayGas))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">昨日</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.yesterdayGas))}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">本月</span>
                  <span className="text-sm font-bold text-orange-700 dark:text-orange-300">{formatCurrency(parseFloat(topStats.monthlyGas))}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">净利润</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">今日</span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">{formatCurrency(parseFloat(topStats.todayProfit))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">昨日</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.yesterdayProfit))}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">本月</span>
                  <span className="text-sm font-bold text-green-700 dark:text-green-300">{formatCurrency(parseFloat(topStats.monthlyProfit))}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">OTC交易量</div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">买入</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{formatCurrency(parseFloat(topStats.otcBuyVolume))}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">卖出</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(parseFloat(topStats.otcSellVolume))}</span>
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
                    <TableHead className="text-right">充值笔数</TableHead>
                    <TableHead className="text-right">充值金额</TableHead>
                    <TableHead className="text-right">提现笔数</TableHead>
                    <TableHead className="text-right">提现金额</TableHead>
                    <TableHead className="text-center">活跃钱包</TableHead>
                    <TableHead className="text-right">手续费收益</TableHead>
                    <TableHead className="text-right">Gas成本</TableHead>
                    <TableHead className="text-right">净利润</TableHead>
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
                        <TableCell className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            {formatNumber(report.depositCount)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-green-600 dark:text-green-400 font-medium">
                          {formatCurrency(report.depositAmount)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                            {formatNumber(report.withdrawalCount)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-red-600 dark:text-red-400 font-medium">
                          {formatCurrency(report.withdrawalAmount)}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {formatNumber(report.activeWallets)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-green-600 dark:text-green-400 font-medium">
                          {formatCurrency(report.feeRevenue)}
                        </TableCell>
                        <TableCell className="text-right text-orange-600 dark:text-orange-400 font-medium">
                          {formatCurrency(report.gasCost)}
                        </TableCell>
                        <TableCell className="text-right font-bold text-green-700 dark:text-green-300">
                          {formatCurrency(report.netProfit)}
                        </TableCell>
                      </TableRow>

                      {expandedRows.has(report.period) && (
                        <TableRow>
                          <TableCell colSpan={10} className="bg-gray-50 dark:bg-gray-900/50 p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                  利润前10币种
                                </h3>
                                <div className="space-y-2">
                                  {report.topCurrencies.slice(0, 10).map((currency, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                          {idx + 1}. {currency.currency}
                                        </span>
                                        <span className={`font-bold ${parseFloat(currency.profit.toString()) >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                                          {formatCurrency(currency.profit)}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                                        <div>充值: {formatNumber(currency.depositCount)}笔</div>
                                        <div>提现: {formatNumber(currency.withdrawalCount)}笔</div>
                                        <div>充值额: {formatCurrency(currency.depositAmount)}</div>
                                        <div>提现额: {formatCurrency(currency.withdrawalAmount)}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                  利润前10网络
                                </h3>
                                <div className="space-y-2">
                                  {report.topNetworks.slice(0, 10).map((network, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                          {idx + 1}. {network.network}
                                        </span>
                                        <span className={`font-bold ${parseFloat(network.profit.toString()) >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                                          {formatCurrency(network.profit)}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                                        <div>充值: {formatNumber(network.depositCount)}笔</div>
                                        <div>提现: {formatNumber(network.withdrawalCount)}笔</div>
                                        <div>手续费: {formatCurrency(network.feeRevenue)}</div>
                                        <div>Gas: {formatCurrency(network.gasFee)}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                  成交前10 OTC供应商
                                </h3>
                                <div className="space-y-2">
                                  {report.topOTCSuppliers.slice(0, 10).map((supplier, idx) => (
                                    <div
                                      key={idx}
                                      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                          {idx + 1}. {supplier.supplier}
                                        </span>
                                        <span className="font-bold text-blue-700 dark:text-blue-300">
                                          {formatCurrency(supplier.commission)}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                                        <div>买入: {formatNumber(supplier.buyOrders)}笔</div>
                                        <div>卖出: {formatNumber(supplier.sellOrders)}笔</div>
                                        <div>买入额: {formatCurrency(supplier.buyAmount)}</div>
                                        <div>卖出额: {formatCurrency(supplier.sellAmount)}</div>
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

            <LoadMoreButton 
              totalCount={reportType === "daily" ? mockDailyReports.length : mockMonthlyReports.length}
              currentCount={currentReports.length}
            />
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
