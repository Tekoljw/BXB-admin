"use client"

import React, { useState, useMemo } from "react"
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown, Download, Calendar, DollarSign, Wallet, CreditCard, Shield, PiggyBank } from "lucide-react"
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
import { Card } from "@/components/ui/card"

interface BusinessModuleData {
  moduleName: string
  icon: any
  revenue: number
  cost: number
  profit: number
  profitRate: number
  orderCount: number
  activeUsers: number
}

interface ReportRow {
  period: string
  totalRevenue: number
  totalCost: number
  totalProfit: number
  profitRate: number
  modules: BusinessModuleData[]
}

const mockDailyReports: ReportRow[] = [
  {
    period: "2024-11-15",
    totalRevenue: 2845678.90,
    totalCost: 1234567.80,
    totalProfit: 1611111.10,
    profitRate: 56.62,
    modules: [
      {
        moduleName: "Crypto业务",
        icon: Wallet,
        revenue: 856789.12,
        cost: 398234.56,
        profit: 458554.56,
        profitRate: 53.52,
        orderCount: 6121,
        activeUsers: 1567,
      },
      {
        moduleName: "法币支付",
        icon: DollarSign,
        revenue: 734560.45,
        cost: 312345.67,
        profit: 422214.78,
        profitRate: 57.48,
        orderCount: 8934,
        activeUsers: 2134,
      },
      {
        moduleName: "现货交易",
        icon: TrendingUp,
        revenue: 567890.23,
        cost: 198765.43,
        profit: 369124.80,
        profitRate: 65.00,
        orderCount: 12456,
        activeUsers: 3421,
      },
      {
        moduleName: "合约交易",
        icon: TrendingDown,
        revenue: 445678.90,
        cost: 167890.12,
        profit: 277788.78,
        profitRate: 62.33,
        orderCount: 5678,
        activeUsers: 1897,
      },
      {
        moduleName: "U卡业务",
        icon: CreditCard,
        revenue: 123456.78,
        cost: 78901.23,
        profit: 44555.55,
        profitRate: 36.09,
        orderCount: 2345,
        activeUsers: 876,
      },
      {
        moduleName: "理财业务",
        icon: PiggyBank,
        revenue: 89765.43,
        cost: 56789.01,
        profit: 32976.42,
        profitRate: 36.73,
        orderCount: 1234,
        activeUsers: 456,
      },
      {
        moduleName: "担保业务",
        icon: Shield,
        revenue: 27537.99,
        cost: 21641.78,
        profit: 5896.21,
        profitRate: 21.41,
        orderCount: 234,
        activeUsers: 123,
      },
    ]
  },
  {
    period: "2024-11-14",
    totalRevenue: 2634567.89,
    totalCost: 1145678.90,
    totalProfit: 1488888.99,
    profitRate: 56.51,
    modules: [
      {
        moduleName: "Crypto业务",
        icon: Wallet,
        revenue: 784560.45,
        cost: 364123.34,
        profit: 420437.11,
        profitRate: 53.59,
        orderCount: 5666,
        activeUsers: 1432,
      },
      {
        moduleName: "法币支付",
        icon: DollarSign,
        revenue: 678901.23,
        cost: 289012.34,
        profit: 389888.89,
        profitRate: 57.43,
        orderCount: 8234,
        activeUsers: 1987,
      },
      {
        moduleName: "现货交易",
        icon: TrendingUp,
        revenue: 523456.78,
        cost: 183456.78,
        profit: 340000.00,
        profitRate: 64.96,
        orderCount: 11567,
        activeUsers: 3187,
      },
      {
        moduleName: "合约交易",
        icon: TrendingDown,
        revenue: 412345.67,
        cost: 155678.90,
        profit: 256666.77,
        profitRate: 62.24,
        orderCount: 5234,
        activeUsers: 1765,
      },
      {
        moduleName: "U卡业务",
        icon: CreditCard,
        revenue: 114567.89,
        cost: 73456.78,
        profit: 41111.11,
        profitRate: 35.89,
        orderCount: 2167,
        activeUsers: 812,
      },
      {
        moduleName: "理财业务",
        icon: PiggyBank,
        revenue: 83456.78,
        cost: 52890.12,
        profit: 30566.66,
        profitRate: 36.63,
        orderCount: 1145,
        activeUsers: 423,
      },
      {
        moduleName: "担保业务",
        icon: Shield,
        revenue: 37279.09,
        cost: 27060.64,
        profit: 10218.45,
        profitRate: 27.41,
        orderCount: 198,
        activeUsers: 109,
      },
    ]
  },
  {
    period: "2024-11-13",
    totalRevenue: 2456789.12,
    totalCost: 1087654.32,
    totalProfit: 1369134.80,
    profitRate: 55.73,
    modules: [
      {
        moduleName: "Crypto业务",
        icon: Wallet,
        revenue: 723456.78,
        cost: 345678.90,
        profit: 377777.88,
        profitRate: 52.22,
        orderCount: 5321,
        activeUsers: 1345,
      },
      {
        moduleName: "法币支付",
        icon: DollarSign,
        revenue: 623456.78,
        cost: 267890.12,
        profit: 355566.66,
        profitRate: 57.03,
        orderCount: 7654,
        activeUsers: 1834,
      },
      {
        moduleName: "现货交易",
        icon: TrendingUp,
        revenue: 487654.32,
        cost: 171234.56,
        profit: 316419.76,
        profitRate: 64.88,
        orderCount: 10876,
        activeUsers: 2987,
      },
      {
        moduleName: "合约交易",
        icon: TrendingDown,
        revenue: 387654.32,
        cost: 146543.21,
        profit: 241111.11,
        profitRate: 62.20,
        orderCount: 4876,
        activeUsers: 1654,
      },
      {
        moduleName: "U卡业务",
        icon: CreditCard,
        revenue: 106789.01,
        cost: 68765.43,
        profit: 38023.58,
        profitRate: 35.61,
        orderCount: 2012,
        activeUsers: 756,
      },
      {
        moduleName: "理财业务",
        icon: PiggyBank,
        revenue: 78901.23,
        cost: 49876.54,
        profit: 29024.69,
        profitRate: 36.78,
        orderCount: 1087,
        activeUsers: 398,
      },
      {
        moduleName: "担保业务",
        icon: Shield,
        revenue: 48876.68,
        cost: 37665.56,
        profit: 11211.12,
        profitRate: 22.94,
        orderCount: 176,
        activeUsers: 98,
      },
    ]
  },
]

const mockMonthlyReports: ReportRow[] = [
  {
    period: "2024-11",
    totalRevenue: 45678901.23,
    totalCost: 19876543.21,
    totalProfit: 25802358.02,
    profitRate: 56.49,
    modules: [
      {
        moduleName: "Crypto业务",
        icon: Wallet,
        revenue: 13456789.12,
        cost: 6234567.89,
        profit: 7222221.23,
        profitRate: 53.67,
        orderCount: 98765,
        activeUsers: 24567,
      },
      {
        moduleName: "法币支付",
        icon: DollarSign,
        revenue: 11234567.89,
        cost: 4789012.34,
        profit: 6445555.55,
        profitRate: 57.38,
        orderCount: 134567,
        activeUsers: 32145,
      },
      {
        moduleName: "现货交易",
        icon: TrendingUp,
        revenue: 9876543.21,
        cost: 3456789.01,
        profit: 6419754.20,
        profitRate: 65.00,
        orderCount: 198765,
        activeUsers: 54321,
      },
      {
        moduleName: "合约交易",
        icon: TrendingDown,
        revenue: 7234567.89,
        cost: 2734567.89,
        profit: 4500000.00,
        profitRate: 62.20,
        orderCount: 87654,
        activeUsers: 29876,
      },
      {
        moduleName: "U卡业务",
        icon: CreditCard,
        revenue: 2123456.78,
        cost: 1367890.12,
        profit: 755566.66,
        profitRate: 35.58,
        orderCount: 34567,
        activeUsers: 12345,
      },
      {
        moduleName: "理财业务",
        icon: PiggyBank,
        revenue: 1456789.01,
        cost: 923456.78,
        profit: 533332.23,
        profitRate: 36.61,
        orderCount: 18765,
        activeUsers: 6789,
      },
      {
        moduleName: "担保业务",
        icon: Shield,
        revenue: 296187.33,
        cost: 370259.18,
        profit: -74071.85,
        profitRate: -25.00,
        orderCount: 3456,
        activeUsers: 1678,
      },
    ]
  },
  {
    period: "2024-10",
    totalRevenue: 42345678.90,
    totalCost: 18456789.01,
    totalProfit: 23888889.89,
    profitRate: 56.42,
    modules: [
      {
        moduleName: "Crypto业务",
        icon: Wallet,
        revenue: 12456789.01,
        cost: 5789012.34,
        profit: 6667776.67,
        profitRate: 53.53,
        orderCount: 91234,
        activeUsers: 22678,
      },
      {
        moduleName: "法币支付",
        icon: DollarSign,
        revenue: 10456789.12,
        cost: 4456789.01,
        profit: 6000000.11,
        profitRate: 57.38,
        orderCount: 124567,
        activeUsers: 29876,
      },
      {
        moduleName: "现货交易",
        icon: TrendingUp,
        revenue: 9234567.89,
        cost: 3234567.89,
        profit: 6000000.00,
        profitRate: 64.97,
        orderCount: 187654,
        activeUsers: 50987,
      },
      {
        moduleName: "合约交易",
        icon: TrendingDown,
        revenue: 6789012.34,
        cost: 2567890.12,
        profit: 4221122.22,
        profitRate: 62.18,
        orderCount: 81234,
        activeUsers: 27654,
      },
      {
        moduleName: "U卡业务",
        icon: CreditCard,
        revenue: 1987654.32,
        cost: 1278901.23,
        profit: 708753.09,
        profitRate: 35.66,
        orderCount: 32145,
        activeUsers: 11456,
      },
      {
        moduleName: "理财业务",
        icon: PiggyBank,
        revenue: 1345678.90,
        cost: 854321.01,
        profit: 491357.89,
        profitRate: 36.52,
        orderCount: 17234,
        activeUsers: 6234,
      },
      {
        moduleName: "担保业务",
        icon: Shield,
        revenue: 75187.32,
        cost: 275308.41,
        profit: -200121.09,
        profitRate: -266.22,
        orderCount: 3187,
        activeUsers: 1543,
      },
    ]
  },
]

export default function BusinessOverviewPage() {
  const [timeRange, setTimeRange] = useState("today")
  const [viewType, setViewType] = useState<"daily" | "monthly">("daily")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [customDateOpen, setCustomDateOpen] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const reports = viewType === "daily" ? mockDailyReports : mockMonthlyReports

  const filteredReports = useMemo(() => {
    if (timeRange === "custom") {
      return reports
    }
    return reports
  }, [reports, timeRange])

  const summaryData = useMemo(() => {
    if (filteredReports.length === 0) return null
    return filteredReports[0]
  }, [filteredReports])

  const toggleRowExpansion = (period: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(period)) {
      newExpanded.delete(period)
    } else {
      newExpanded.add(period)
    }
    setExpandedRows(newExpanded)
  }

  const handleExport = () => {
    toast.success("导出成功", {
      description: `已导出 ${filteredReports.length} 条${viewType === 'daily' ? '每日' : '每月'}经营数据`,
    })
  }

  const handleCustomDateApply = () => {
    if (!startDate || !endDate) {
      toast.error("请选择日期范围")
      return
    }
    toast.success("自定义日期已应用", {
      description: `${startDate} 至 ${endDate}`,
    })
    setCustomDateOpen(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 2,
    }).format(value).replace('CN', '')
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">财务经营总表</h1>
          <p className="text-muted-foreground mt-1">
            各业务模块收入、成本和利润汇总
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={viewType} onValueChange={(v) => setViewType(v as "daily" | "monthly")}>
            <TabsList>
              <TabsTrigger value="daily">每日报表</TabsTrigger>
              <TabsTrigger value="monthly">每月报表</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">今天</SelectItem>
              <SelectItem value="yesterday">昨天</SelectItem>
              <SelectItem value="last7days">最近7天</SelectItem>
              <SelectItem value="last30days">最近30天</SelectItem>
              <SelectItem value="custom">自定义</SelectItem>
            </SelectContent>
          </Select>
          {timeRange === "custom" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCustomDateOpen(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              选择日期
            </Button>
          )}
          <Button onClick={handleExport} size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出CSV
          </Button>
        </div>
      </div>

      {summaryData && (
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">总收入</p>
                <p className="text-2xl font-bold">{formatCurrency(summaryData.totalRevenue)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <TrendingDown className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">总成本</p>
                <p className="text-2xl font-bold">{formatCurrency(summaryData.totalCost)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">总利润</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(summaryData.totalProfit)}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">利润率</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatPercent(summaryData.profitRate)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">时间周期</TableHead>
              <TableHead className="text-right">总收入</TableHead>
              <TableHead className="text-right">总成本</TableHead>
              <TableHead className="text-right">总利润</TableHead>
              <TableHead className="text-right">利润率</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <React.Fragment key={report.period}>
                <TableRow className="cursor-pointer hover:bg-muted/50" onClick={() => toggleRowExpansion(report.period)}>
                  <TableCell className="font-medium">{report.period}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(report.totalRevenue)}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(report.totalCost)}</TableCell>
                  <TableCell className="text-right font-mono">
                    <span className={report.totalProfit >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      {formatCurrency(report.totalProfit)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    <span className={report.profitRate >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                      {formatPercent(report.profitRate)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      {expandedRows.has(report.period) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRows.has(report.period) && (
                  <TableRow>
                    <TableCell colSpan={6} className="bg-muted/30 p-0">
                      <div className="p-6 space-y-4">
                        <h3 className="font-semibold text-sm mb-4">业务模块明细</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {report.modules.map((module) => {
                            const Icon = module.icon
                            return (
                              <Card key={module.moduleName} className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                      <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold mb-1">{module.moduleName}</h4>
                                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                        <span>订单: {module.orderCount.toLocaleString()}</span>
                                        <span>活跃用户: {module.activeUsers.toLocaleString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 gap-8 text-right">
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">收入</p>
                                      <p className="font-semibold">{formatCurrency(module.revenue)}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">成本</p>
                                      <p className="font-semibold">{formatCurrency(module.cost)}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">利润</p>
                                      <p className={`font-semibold ${module.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {formatCurrency(module.profit)}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-1">利润率</p>
                                      <p className={`font-semibold ${module.profitRate >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {formatPercent(module.profitRate)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            )
                          })}
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

      <DataTotal 
        total={filteredReports.length}
        label={viewType === 'daily' ? '日报表' : '月报表'}
      />

      <Dialog open={customDateOpen} onOpenChange={setCustomDateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>选择自定义日期范围</DialogTitle>
            <DialogDescription>
              请选择要查询的起止日期
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="start-date">开始日期</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
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
            <Button variant="outline" onClick={() => setCustomDateOpen(false)}>
              取消
            </Button>
            <Button onClick={handleCustomDateApply}>
              应用
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
