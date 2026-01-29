"use client"

import React, { useState, useMemo, useEffect, useCallback, useRef } from "react"
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
import { DataTotal } from "@/components/data-total"
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
import { fiatReportsApis } from "@/router/fiat-reports-api"
import type {
  ReportsSummaryResponse,
  DailyReportRecord,
  MonthlyReportRecord,
  PaginatedResponse,
} from "@/router/fiat-reports-api"
import { APIError } from "@/utils/api-request-util"

// 统一的报表记录接口（用于显示）
interface ReportRow {
  period: string
  activeMerchants: number
  activeAgents: number
  collectionRateProfit: number
  collectionFixedProfit: number
  payoutRateProfit: number
  payoutFixedProfit: number
  totalProfit: number
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState<"daily" | "monthly">("daily")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [timeRange, setTimeRange] = useState<string>("today")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [customDays, setCustomDays] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  // API数据状态
  const [summaryData, setSummaryData] = useState<ReportsSummaryResponse | null>(null)
  const [dailyReports, setDailyReports] = useState<PaginatedResponse<DailyReportRecord> | null>(null)
  const [monthlyReports, setMonthlyReports] = useState<PaginatedResponse<MonthlyReportRecord> | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [error, setError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  // 转换API数据为显示格式
  const currentReports: ReportRow[] = useMemo(() => {
    if (reportType === "daily" && dailyReports) {
      return dailyReports.records.map(record => ({
        period: record.reportDate,
        activeMerchants: record.activeMerchantCount,
        activeAgents: record.activeAgentCount,
        collectionRateProfit: record.collectRateProfit,
        collectionFixedProfit: record.collectBasicProfit,
        payoutRateProfit: record.payoutRateProfit,
        payoutFixedProfit: record.payoutBasicProfit,
        totalProfit: record.totalProfit,
      }))
    } else if (reportType === "monthly" && monthlyReports) {
      return monthlyReports.records.map(record => ({
        period: record.reportMonth,
        activeMerchants: record.activeMerchantCount,
        activeAgents: record.activeAgentCount,
        collectionRateProfit: record.collectRateProfit,
        collectionFixedProfit: record.collectBasicProfit,
        payoutRateProfit: record.payoutRateProfit,
        payoutFixedProfit: record.payoutBasicProfit,
        totalProfit: record.totalProfit,
      }))
    }
    return []
  }, [reportType, dailyReports, monthlyReports])

  // 获取查询参数
  const getQueryParams = useCallback(() => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let queryDate: string | undefined
    let queryMonth: string | undefined

    if (timeRange === "today") {
      queryDate = today.toISOString().split('T')[0]
    } else if (timeRange === "yesterday") {
      queryDate = yesterday.toISOString().split('T')[0]
    } else if (timeRange === "custom" && startDate && endDate) {
      // 自定义日期范围：使用开始日期
      queryDate = startDate
    } else if (timeRange === "week") {
      const weekAgo = new Date(today)
      weekAgo.setDate(weekAgo.getDate() - 7)
      queryDate = weekAgo.toISOString().split('T')[0]
    } else if (timeRange === "month") {
      const monthAgo = new Date(today)
      monthAgo.setDate(monthAgo.getDate() - 30)
      queryDate = monthAgo.toISOString().split('T')[0]
    }

    if (reportType === "monthly" && timeRange !== "custom") {
      queryMonth = today.toISOString().slice(0, 7) // yyyy-MM
    }

    return { queryDate, queryMonth }
  }, [timeRange, startDate, endDate, reportType])

  // 获取概览数据
  const fetchSummary = useCallback(async () => {
    try {
      const data = await fiatReportsApis.getSummary()
      setSummaryData(data)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch summary:', err)
      const errorMessage = err instanceof APIError ? err.message : '获取概览数据失败'
      setError(errorMessage)
      toast.error('加载失败', {
        description: errorMessage
      })
    }
  }, [])

  // 获取每日报表
  const fetchDailyReports = useCallback(async () => {
    setIsLoading(true)
    try {
      const { queryDate } = getQueryParams()
      const data = await fiatReportsApis.getDailyReports({
        queryDate,
        pageNumber: currentPage,
        pageSize,
      })
      setDailyReports(data)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch daily reports:', err)
      const errorMessage = err instanceof APIError ? err.message : '获取每日报表失败'
      setError(errorMessage)
      toast.error('加载失败', {
        description: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }, [getQueryParams, currentPage, pageSize])

  // 获取每月报表
  const fetchMonthlyReports = useCallback(async () => {
    setIsLoading(true)
    try {
      const { queryMonth } = getQueryParams()
      const data = await fiatReportsApis.getMonthlyReports({
        queryMonth,
        pageNumber: currentPage,
        pageSize,
      })
      setMonthlyReports(data)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch monthly reports:', err)
      const errorMessage = err instanceof APIError ? err.message : '获取每月报表失败'
      setError(errorMessage)
      toast.error('加载失败', {
        description: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }, [getQueryParams, currentPage, pageSize])

  // 使用ref防止重复请求
  const fetchingRef = useRef<string>('')
  const prevQueryParamsRef = useRef<string>('')
  const summaryInitializedRef = useRef(false) // 防止 summary 重复请求
  const summaryAbortControllerRef = useRef<AbortController | null>(null) // summary 请求的 AbortController

  // 初始化加载数据 - 只在组件挂载时执行一次
  useEffect(() => {
    // 如果已经初始化过，直接返回（防止 React StrictMode 导致的重复执行）
    if (summaryInitializedRef.current) {
      return
    }

    // 标记为已初始化（必须在检查后立即设置，防止并发执行）
    summaryInitializedRef.current = true

    // 取消之前的请求（如果有）
    if (summaryAbortControllerRef.current) {
      summaryAbortControllerRef.current.abort()
    }

    // 创建新的 AbortController
    summaryAbortControllerRef.current = new AbortController()
    const signal = summaryAbortControllerRef.current.signal

    let isMounted = true

    const loadSummary = async () => {
      try {
        const data = await fiatReportsApis.getSummary({ signal })
        
        // 检查请求是否被取消或组件已卸载
        if (signal.aborted || !isMounted) {
          return
        }
        
        setSummaryData(data)
        setError(null)
      } catch (err) {
        // 如果请求被取消或组件已卸载，不更新状态
        if (signal.aborted || !isMounted) {
          return
        }
        
        // 如果是 AbortError，不显示错误
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        
        console.error('Failed to fetch summary:', err)
        const errorMessage = err instanceof APIError ? err.message : '获取概览数据失败'
        setError(errorMessage)
        toast.error('加载失败', {
          description: errorMessage
        })
      }
    }

    loadSummary()

    // 清理函数：组件卸载时取消未完成的请求并重置初始化标记
    return () => {
      isMounted = false
      summaryInitializedRef.current = false // 重置标记，允许下次挂载时重新初始化
      if (summaryAbortControllerRef.current) {
        summaryAbortControllerRef.current.abort()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 空依赖数组，只在组件挂载时执行一次

  // 加载报表数据 - 合并逻辑，避免重复请求
  useEffect(() => {
    // 生成查询参数的标识（不包括页码）
    const queryParamsKey = `${reportType}-${timeRange}-${startDate}-${endDate}`
    
    // 如果查询参数改变了，重置页码并清除请求标识
    if (prevQueryParamsRef.current && prevQueryParamsRef.current !== queryParamsKey) {
      prevQueryParamsRef.current = queryParamsKey
      fetchingRef.current = '' // 清除请求标识，允许下次请求
      setCurrentPage(1)
      return // 页码重置会触发下一次useEffect执行
    }
    
    // 更新查询参数标识（首次加载时）
    if (!prevQueryParamsRef.current) {
      prevQueryParamsRef.current = queryParamsKey
    }
    
    // 生成请求的唯一标识（包括页码）
    const requestKey = `${queryParamsKey}-${currentPage}-${pageSize}`
    
    // 如果正在请求相同的参数，跳过
    if (fetchingRef.current === requestKey) {
      return
    }
    
    fetchingRef.current = requestKey
    
    const loadReports = async () => {
      try {
        // 直接在useEffect中计算查询参数，避免依赖getQueryParams函数
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        let queryDate: string | undefined
        let queryMonth: string | undefined

        if (timeRange === "today") {
          queryDate = today.toISOString().split('T')[0]
        } else if (timeRange === "yesterday") {
          queryDate = yesterday.toISOString().split('T')[0]
        } else if (timeRange === "custom" && startDate && endDate) {
          queryDate = startDate
        } else if (timeRange === "week") {
          const weekAgo = new Date(today)
          weekAgo.setDate(weekAgo.getDate() - 7)
          queryDate = weekAgo.toISOString().split('T')[0]
        } else if (timeRange === "month") {
          const monthAgo = new Date(today)
          monthAgo.setDate(monthAgo.getDate() - 30)
          queryDate = monthAgo.toISOString().split('T')[0]
        }

        if (reportType === "monthly" && timeRange !== "custom") {
          queryMonth = today.toISOString().slice(0, 7) // yyyy-MM
        }
        
        setIsLoading(true)
        
        if (reportType === "daily") {
          const data = await fiatReportsApis.getDailyReports({
            queryDate,
            pageNumber: currentPage,
            pageSize,
          })
          setDailyReports(data)
          setError(null)
        } else {
          const data = await fiatReportsApis.getMonthlyReports({
            queryMonth,
            pageNumber: currentPage,
            pageSize,
          })
          setMonthlyReports(data)
          setError(null)
        }
      } catch (err) {
        console.error('Failed to fetch reports:', err)
        const errorMessage = err instanceof APIError ? err.message : '获取报表失败'
        setError(errorMessage)
        toast.error('加载失败', {
          description: errorMessage
        })
      } finally {
        setIsLoading(false)
        // 请求完成后清除标识，允许下次请求
        if (fetchingRef.current === requestKey) {
          fetchingRef.current = ''
        }
      }
    }
    
    loadReports()
  }, [reportType, timeRange, startDate, endDate, currentPage, pageSize])

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
    toast.success("时间范围已更新", {
      description: `已选择 ${days} 天的数据范围`
    })
  }

  const handleReportTypeChange = (value: string) => {
    setReportType(value as "daily" | "monthly")
    setCurrentPage(1)
  }

  // 使用API返回的概览数据
  const topStats = useMemo(() => {
    if (!summaryData) {
      return {
        activeMerchants: 0,
        totalMerchants: 0,
        todayCollection: "0.00",
        todayPayout: "0.00",
        yesterdayCollection: "0.00",
        yesterdayPayout: "0.00",
        todayDisbursement: "0.00",
        yesterdayDisbursement: "0.00",
        merchantAssets: "0.00",
        paymentFunds: "0.00",
        todayFeeProfit: "0.00",
        todayExchangeProfit: "0.00",
        todayTotalProfit: "0.00",
        yesterdayFeeProfit: "0.00",
        yesterdayExchangeProfit: "0.00",
        yesterdayTotalProfit: "0.00",
        monthlyFeeProfit: "0.00",
        monthlyExchangeProfit: "0.00",
        monthlyTotalProfit: "0.00",
      }
    }

    return {
      activeMerchants: summaryData.merchantStats.activeCount,
      totalMerchants: summaryData.merchantStats.totalCount,
      todayCollection: summaryData.todayBusiness.collectAmount.toFixed(2),
      todayPayout: summaryData.todayBusiness.payoutAmount.toFixed(2),
      yesterdayCollection: summaryData.yesterdayBusiness.collectAmount.toFixed(2),
      yesterdayPayout: summaryData.yesterdayBusiness.payoutAmount.toFixed(2),
      todayDisbursement: summaryData.payoutStats.todayPayout.toFixed(2),
      yesterdayDisbursement: summaryData.payoutStats.yesterdayPayout.toFixed(2),
      merchantAssets: summaryData.fundsStats.merchantAssets.toFixed(2),
      paymentFunds: summaryData.fundsStats.transferAssets.toFixed(2),
      todayFeeProfit: summaryData.todayProfit.feeProfit.toFixed(2),
      todayExchangeProfit: summaryData.todayProfit.exchangeProfit.toFixed(2),
      todayTotalProfit: summaryData.todayProfit.totalProfit.toFixed(2),
      yesterdayFeeProfit: summaryData.yesterdayProfit.feeProfit.toFixed(2),
      yesterdayExchangeProfit: summaryData.yesterdayProfit.exchangeProfit.toFixed(2),
      yesterdayTotalProfit: summaryData.yesterdayProfit.totalProfit.toFixed(2),
      monthlyFeeProfit: summaryData.monthProfit.feeProfit.toFixed(2),
      monthlyExchangeProfit: summaryData.monthProfit.exchangeProfit.toFixed(2),
      monthlyTotalProfit: summaryData.monthProfit.totalProfit.toFixed(2),
    }
  }, [summaryData])

  // 计算导出日期范围
  const getExportDateRange = (): { startDate: string; endDate: string } | null => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    let exportStartDate: Date
    let exportEndDate: Date = new Date(today)
    exportEndDate.setDate(exportEndDate.getDate() + 1) // 结束日期设为明天，确保包含今天

    if (timeRange === "today") {
      exportStartDate = new Date(today)
    } else if (timeRange === "yesterday") {
      exportStartDate = new Date(today)
      exportStartDate.setDate(exportStartDate.getDate() - 1)
      exportEndDate = new Date(today)
    } else if (timeRange === "week") {
      exportStartDate = new Date(today)
      exportStartDate.setDate(exportStartDate.getDate() - 7)
    } else if (timeRange === "month") {
      exportStartDate = new Date(today)
      exportStartDate.setDate(exportStartDate.getDate() - 30)
    } else if (timeRange === "custom" && startDate && endDate) {
      // 自定义日期范围：使用用户选择的日期
      const customStart = new Date(startDate)
      const customEnd = new Date(endDate)
      if (isNaN(customStart.getTime()) || isNaN(customEnd.getTime())) {
        return null
      }
      if (customEnd < customStart) {
        return null
      }
      return {
        startDate: startDate,
        endDate: endDate
      }
    } else {
      // 默认：最近30天
      exportStartDate = new Date(today)
      exportStartDate.setDate(exportStartDate.getDate() - 30)
    }

    return {
      startDate: exportStartDate.toISOString().split('T')[0],
      endDate: exportEndDate.toISOString().split('T')[0]
    }
  }

  const handleExportCSV = async () => {
    const dateRange = getExportDateRange()
    
    if (!dateRange) {
      toast.error("日期范围错误", {
        description: "请选择有效的日期范围"
      })
      return
    }

    setIsExporting(true)
    try {
      await fiatReportsApis.exportCSV(dateRange.startDate, dateRange.endDate)
      toast.success("导出成功", {
        description: `报表已成功导出（${dateRange.startDate} 至 ${dateRange.endDate}）`
      })
    } catch (error) {
      console.error('Export error:', error)
      const errorMessage = error instanceof Error ? error.message : '导出过程中出现错误，请重试'
      toast.error("导出失败", {
        description: errorMessage
      })
    } finally {
      setIsExporting(false)
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
        <Button 
          onClick={handleExportCSV} 
          className="bg-custom-green hover:bg-green-600"
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              导出中...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              导出CSV
            </>
          )}
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
                <Tabs value={reportType} onValueChange={handleReportTypeChange}>
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
                            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                              暂无详细数据
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <DataTotal 
                  total={
                    reportType === "daily" 
                      ? (dailyReports?.total || 0)
                      : (monthlyReports?.total || 0)
                  } 
                />
                {(() => {
                  const totalPages = reportType === "daily" 
                    ? (dailyReports?.pages || 0)
                    : (monthlyReports?.pages || 0)
                  
                  if (totalPages <= 1) return null
                  
                  return (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1 || isLoading}
                      >
                        上一页
                      </Button>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        第 {currentPage} / {totalPages} 页
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage >= totalPages || isLoading}
                      >
                        下一页
                      </Button>
                    </div>
                  )
                })()}
              </div>
            </div>
            {error && (
              <div className="p-4 text-center text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
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
