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

export default function CryptoAssetStatisticsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const assetStats = [
    {
      label: "总资产价值",
      value: "12,458,932.50",
      change: "+5.2%",
      trend: "up" as const,
      icon: Wallet,
      color: "text-green-600"
    },
    {
      label: "可用余额",
      value: "8,234,567.80",
      change: "+3.1%",
      trend: "up" as const,
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      label: "冻结资金",
      value: "1,456,789.20",
      change: "-2.5%",
      trend: "down" as const,
      icon: TrendingDown,
      color: "text-orange-600"
    },
    {
      label: "待结算金额",
      value: "2,767,575.50",
      change: "+8.7%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ]

  const assetDetails = [
    { currency: "USDT", network: "TRC20", balance: "5,234,567.89", frozen: "234,567.89", pending: "456,789.12", total: "5,926,924.90" },
    { currency: "USDT", network: "ERC20", balance: "2,123,456.78", frozen: "123,456.78", pending: "234,567.89", total: "2,481,481.45" },
    { currency: "BTC", network: "Bitcoin", balance: "45.67834521", frozen: "5.67834521", pending: "8.92345678", total: "60.27014720" },
    { currency: "ETH", network: "Ethereum", balance: "234.56789012", frozen: "34.56789012", pending: "45.67890123", total: "314.81468147" },
    { currency: "USDC", network: "ERC20", balance: "1,234,567.89", frozen: "134,567.89", pending: "234,567.89", total: "1,603,703.67" },
    { currency: "BNB", network: "BSC", balance: "567.89012345", frozen: "67.89012345", pending: "89.12345678", total: "724.90370368" },
  ]

  const filteredAssets = assetDetails.filter(asset =>
    asset.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.network.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">链上资产统计</h1>
          <p className="text-sm text-muted-foreground mt-1">
            实时监控平台链上资产分布与状态
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
            <CardTitle>资产明细</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索币种或网络..."
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
                <TableHead>币种</TableHead>
                <TableHead>网络</TableHead>
                <TableHead className="text-right">可用余额</TableHead>
                <TableHead className="text-right">冻结金额</TableHead>
                <TableHead className="text-right">待结算</TableHead>
                <TableHead className="text-right">总计</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{asset.currency}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {asset.network}
                    </span>
                  </TableCell>
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
