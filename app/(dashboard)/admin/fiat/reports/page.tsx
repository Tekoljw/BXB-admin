"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronRight, TrendingUp } from "lucide-react"
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
    return `¥${value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
            查看平台整体经营数据和利润分析
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <Tabs value={reportType} onValueChange={(value) => setReportType(value as "daily" | "monthly")}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="daily">每日报表</TabsTrigger>
              <TabsTrigger value="monthly">每月报表</TabsTrigger>
            </TabsList>
          </Tabs>
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
    </div>
  )
}
