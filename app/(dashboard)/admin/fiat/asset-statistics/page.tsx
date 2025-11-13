"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Search,
  Download,
  RefreshCw,
  History,
  Send,
  ChevronDown,
  X
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface FiatCurrency {
  id: string
  name: string
  code: string
  logo: string
  merchantAsset: string
  payoutAsset: string
  frozenAmount: string
  actualBalance: string
}

interface TransferRecord {
  id: string
  date: string
  time: string
  amount: string
  type: "划入" | "划出"
  operator: string
  remark: string
}

export default function FiatAssetStatisticsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [displayCount, setDisplayCount] = useState(10)
  const [selectedCurrency, setSelectedCurrency] = useState<FiatCurrency | null>(null)
  const [isRecordSheetOpen, setIsRecordSheetOpen] = useState(false)
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
  const [transferAmount, setTransferAmount] = useState("")
  const [transferRemark, setTransferRemark] = useState("")

  const assetStats = [
    {
      label: "总资产（代收-代付）",
      value: "45,678,123.40",
      change: "+6.8%",
      trend: "up" as const,
      icon: Wallet,
      color: "text-green-600"
    },
    {
      label: "代付金余额",
      value: "32,456,789.20",
      change: "+4.2%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      label: "冻结资金",
      value: "5,678,234.10",
      change: "-1.5%",
      trend: "down" as const,
      icon: TrendingDown,
      color: "text-orange-600"
    },
    {
      label: "待结算商户资产/净资产",
      value: "7,543,100.10",
      change: "+12.3%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ]

  const currencyData: FiatCurrency[] = [
    { 
      id: "1", 
      name: "人民币", 
      code: "CNY", 
      logo: "🇨🇳",
      merchantAsset: "12,345,678.90",
      payoutAsset: "8,234,567.80",
      frozenAmount: "1,234,567.89",
      actualBalance: "18,345,678.81"
    },
    { 
      id: "2", 
      name: "美元", 
      code: "USD", 
      logo: "🇺🇸",
      merchantAsset: "5,678,123.40",
      payoutAsset: "3,456,789.20",
      frozenAmount: "567,812.34",
      actualBalance: "8,567,100.26"
    },
    { 
      id: "3", 
      name: "欧元", 
      code: "EUR", 
      logo: "🇪🇺",
      merchantAsset: "4,567,890.12",
      payoutAsset: "2,789,456.30",
      frozenAmount: "456,789.01",
      actualBalance: "6,900,557.41"
    },
    { 
      id: "4", 
      name: "日元", 
      code: "JPY", 
      logo: "🇯🇵",
      merchantAsset: "3,456,789.01",
      payoutAsset: "1,987,654.20",
      frozenAmount: "345,678.90",
      actualBalance: "4,098,764.31"
    },
    { 
      id: "5", 
      name: "英镑", 
      code: "GBP", 
      logo: "🇬🇧",
      merchantAsset: "2,345,678.90",
      payoutAsset: "1,456,789.10",
      frozenAmount: "234,567.89",
      actualBalance: "3,567,900.11"
    },
    { 
      id: "6", 
      name: "港币", 
      code: "HKD", 
      logo: "🇭🇰",
      merchantAsset: "1,987,654.32",
      payoutAsset: "1,234,567.80",
      frozenAmount: "198,765.43",
      actualBalance: "3,024,456.69"
    },
    { 
      id: "7", 
      name: "新台币", 
      code: "TWD", 
      logo: "🇹🇼",
      merchantAsset: "1,654,321.09",
      payoutAsset: "987,654.32",
      frozenAmount: "165,432.11",
      actualBalance: "2,476,543.30"
    },
    { 
      id: "8", 
      name: "新加坡元", 
      code: "SGD", 
      logo: "🇸🇬",
      merchantAsset: "1,432,109.87",
      payoutAsset: "876,543.21",
      frozenAmount: "143,210.99",
      actualBalance: "2,165,442.09"
    },
    { 
      id: "9", 
      name: "韩元", 
      code: "KRW", 
      logo: "🇰🇷",
      merchantAsset: "1,234,567.89",
      payoutAsset: "765,432.10",
      frozenAmount: "123,456.79",
      actualBalance: "1,876,543.20"
    },
    { 
      id: "10", 
      name: "泰铢", 
      code: "THB", 
      logo: "🇹🇭",
      merchantAsset: "1,098,765.43",
      payoutAsset: "654,321.09",
      frozenAmount: "109,876.54",
      actualBalance: "1,643,209.98"
    },
    { 
      id: "11", 
      name: "马来西亚林吉特", 
      code: "MYR", 
      logo: "🇲🇾",
      merchantAsset: "987,654.32",
      payoutAsset: "543,210.98",
      frozenAmount: "98,765.43",
      actualBalance: "1,432,099.87"
    },
    { 
      id: "12", 
      name: "印尼盾", 
      code: "IDR", 
      logo: "🇮🇩",
      merchantAsset: "876,543.21",
      payoutAsset: "432,109.87",
      frozenAmount: "87,654.32",
      actualBalance: "1,221,098.76"
    },
  ]

  const transferRecords: TransferRecord[] = [
    {
      id: "1",
      date: "2024-01-15",
      time: "14:23:45",
      amount: "500,000.00",
      type: "划入",
      operator: "张三",
      remark: "补充代付金"
    },
    {
      id: "2",
      date: "2024-01-14",
      time: "10:15:22",
      amount: "300,000.00",
      type: "划出",
      operator: "李四",
      remark: "商户结算"
    },
    {
      id: "3",
      date: "2024-01-13",
      time: "16:45:10",
      amount: "750,000.00",
      type: "划入",
      operator: "王五",
      remark: "资金调拨"
    },
    {
      id: "4",
      date: "2024-01-12",
      time: "09:30:18",
      amount: "200,000.00",
      type: "划出",
      operator: "张三",
      remark: "代付支出"
    },
    {
      id: "5",
      date: "2024-01-11",
      time: "15:20:35",
      amount: "1,000,000.00",
      type: "划入",
      operator: "李四",
      remark: "月初充值"
    },
  ]

  const filteredCurrencies = currencyData.filter(currency =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const displayedCurrencies = filteredCurrencies.slice(0, displayCount)
  const hasMore = displayCount < filteredCurrencies.length

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 10)
  }

  const handleViewRecords = (currency: FiatCurrency) => {
    setSelectedCurrency(currency)
    setIsRecordSheetOpen(true)
  }

  const handleTransfer = (currency: FiatCurrency) => {
    setSelectedCurrency(currency)
    setIsTransferDialogOpen(true)
  }

  const handleTransferSubmit = () => {
    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      toast.error("请输入有效的划款金额")
      return
    }

    toast.success("划款成功", {
      description: `已向${selectedCurrency?.name}划款 ${transferAmount} USDT`
    })

    setIsTransferDialogOpen(false)
    setTransferAmount("")
    setTransferRemark("")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">法币资产统计</h1>
          <p className="text-sm text-muted-foreground mt-1">
            实时监控平台法币资产分布与余额状态
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新数据
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {assetStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value} USDT</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center gap-1 mt-1`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {stat.change} 较昨日
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索币种名称或代码..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Logo</TableHead>
                <TableHead>法币币种</TableHead>
                <TableHead className="text-right">商户资产</TableHead>
                <TableHead className="text-right">代付金资产</TableHead>
                <TableHead className="text-right">冻结资金</TableHead>
                <TableHead className="text-right">实际法币余额</TableHead>
                <TableHead className="text-center">查看划款记录</TableHead>
                <TableHead className="text-center">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedCurrencies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    暂无数据
                  </TableCell>
                </TableRow>
              ) : (
                displayedCurrencies.map((currency) => (
                  <TableRow key={currency.id}>
                    <TableCell>
                      <div className="text-3xl">{currency.logo}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{currency.name}</div>
                      <div className="text-sm text-muted-foreground">{currency.code}</div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-green-600 font-semibold">
                      {currency.merchantAsset}
                    </TableCell>
                    <TableCell className="text-right font-mono text-blue-600 font-semibold">
                      {currency.payoutAsset}
                    </TableCell>
                    <TableCell className="text-right font-mono text-orange-600">
                      {currency.frozenAmount}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-gray-900 dark:text-gray-100">
                      {currency.actualBalance}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewRecords(currency)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <History className="h-4 w-4 mr-1" />
                        查看记录
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTransfer(currency)}
                        className="bg-custom-green hover:bg-green-600 text-white border-0"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        划款
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                className="min-w-40"
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                加载更多
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={isRecordSheetOpen} onOpenChange={setIsRecordSheetOpen}>
        <SheetContent className="sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedCurrency?.logo}</span>
              {selectedCurrency?.name} ({selectedCurrency?.code}) 划款记录
            </SheetTitle>
            <SheetDescription>
              查看该币种的所有划款历史记录
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">商户资产</div>
                <div className="text-lg font-bold text-green-600 mt-1">
                  {selectedCurrency?.merchantAsset} USDT
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">代付金资产</div>
                <div className="text-lg font-bold text-blue-600 mt-1">
                  {selectedCurrency?.payoutAsset} USDT
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-muted-foreground">实际余额</div>
                <div className="text-lg font-bold mt-1">
                  {selectedCurrency?.actualBalance} USDT
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日期时间</TableHead>
                    <TableHead>类型</TableHead>
                    <TableHead className="text-right">金额</TableHead>
                    <TableHead>操作员</TableHead>
                    <TableHead>备注</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transferRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="font-medium">{record.date}</div>
                        <div className="text-sm text-muted-foreground">{record.time}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={record.type === "划入" ? "default" : "secondary"} className={record.type === "划入" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"}>
                          {record.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold">
                        {record.type === "划入" ? "+" : "-"}{record.amount}
                      </TableCell>
                      <TableCell>{record.operator}</TableCell>
                      <TableCell className="text-muted-foreground">{record.remark}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-green-600" />
              划款操作 – <span className="text-2xl">{selectedCurrency?.logo}</span> {selectedCurrency?.name} ({selectedCurrency?.code})
            </DialogTitle>
            <DialogDescription>
              请输入划款金额和备注信息
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div>
                <div className="text-sm text-muted-foreground">当前商户资产</div>
                <div className="text-lg font-bold text-green-600 mt-1">
                  {selectedCurrency?.merchantAsset}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">当前代付金资产</div>
                <div className="text-lg font-bold text-blue-600 mt-1">
                  {selectedCurrency?.payoutAsset}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">划款金额 (USDT)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="请输入划款金额"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remark">备注</Label>
              <Input
                id="remark"
                placeholder="请输入备注信息（可选）"
                value={transferRemark}
                onChange={(e) => setTransferRemark(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsTransferDialogOpen(false)
                setTransferAmount("")
                setTransferRemark("")
              }}
            >
              取消
            </Button>
            <Button
              onClick={handleTransferSubmit}
              className="bg-custom-green hover:bg-green-600"
            >
              确认划款
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
