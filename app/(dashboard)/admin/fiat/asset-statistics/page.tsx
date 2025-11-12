"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Search,
  Download,
  RefreshCw
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function FiatAssetStatisticsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const assetStats = [
    {
      label: "总资产价值",
      value: "45,678,123.40",
      change: "+6.8%",
      trend: "up" as const,
      icon: Wallet,
      color: "text-green-600"
    },
    {
      label: "可用余额",
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
      label: "待结算金额",
      value: "7,543,100.10",
      change: "+12.3%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ]

  const assetDetails = [
    { merchant: "商户001", merchantName: "全球支付", balance: "12,345,678.90", frozen: "1,234,567.89", pending: "2,345,678.90", total: "15,925,925.69" },
    { merchant: "商户002", merchantName: "快捷支付", balance: "8,234,567.80", frozen: "823,456.78", pending: "1,234,567.89", total: "10,292,592.47" },
    { merchant: "商户003", merchantName: "国际结算", balance: "5,678,123.40", frozen: "567,812.34", pending: "1,123,456.78", total: "7,369,392.52" },
    { merchant: "商户004", merchantName: "跨境汇款", balance: "4,567,890.12", frozen: "456,789.01", pending: "890,123.45", total: "5,914,802.58" },
    { merchant: "商户005", merchantName: "移动支付", balance: "3,456,789.01", frozen: "345,678.90", pending: "678,901.23", total: "4,481,369.14" },
    { merchant: "商户006", merchantName: "电子钱包", balance: "2,345,678.90", frozen: "234,567.89", pending: "456,789.01", total: "3,037,035.80" },
  ]

  const filteredAssets = assetDetails.filter(asset =>
    asset.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.merchantName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">法币资产统计</h1>
          <p className="text-sm text-muted-foreground mt-1">
            实时监控平台法币资产分布与商户余额状态
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
          <div className="flex items-center justify-between">
            <CardTitle>商户资产明细</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索商户编号或名称..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>商户编号</TableHead>
                <TableHead>商户名称</TableHead>
                <TableHead className="text-right">可用余额</TableHead>
                <TableHead className="text-right">冻结金额</TableHead>
                <TableHead className="text-right">待结算</TableHead>
                <TableHead className="text-right">总计</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium font-mono">{asset.merchant}</TableCell>
                  <TableCell>{asset.merchantName}</TableCell>
                  <TableCell className="text-right font-mono">{asset.balance}</TableCell>
                  <TableCell className="text-right font-mono text-orange-600">{asset.frozen}</TableCell>
                  <TableCell className="text-right font-mono text-purple-600">{asset.pending}</TableCell>
                  <TableCell className="text-right font-mono font-semibold">{asset.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
