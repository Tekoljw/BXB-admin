"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Wallet, 
  Lock,
  Coins,
  Layers,
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
      label: "总资产",
      hotWallet: "8,458,932.50",
      coldWallet: "4,000,000.00",
      icon: Wallet,
      hotColor: "text-orange-600",
      coldColor: "text-blue-600"
    },
    {
      label: "稳定币",
      hotWallet: "5,234,567.80",
      coldWallet: "2,500,000.00",
      icon: Coins,
      hotColor: "text-orange-600",
      coldColor: "text-blue-600"
    },
    {
      label: "主流币",
      hotWallet: "2,456,789.20",
      coldWallet: "1,200,000.00",
      icon: Lock,
      hotColor: "text-orange-600",
      coldColor: "text-blue-600"
    },
    {
      label: "其他资产",
      hotWallet: "767,575.50",
      coldWallet: "300,000.00",
      icon: Layers,
      hotColor: "text-orange-600",
      coldColor: "text-blue-600"
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
                <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">热钱包</span>
                    <span className={`text-xs font-medium ${stat.hotColor}`}>HOT</span>
                  </div>
                  <div className="text-xl font-bold">{stat.hotWallet} USDT</div>
                </div>
                <div className="border-t pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">冷钱包</span>
                    <span className={`text-xs font-medium ${stat.coldColor}`}>COLD</span>
                  </div>
                  <div className="text-xl font-bold">{stat.coldWallet} USDT</div>
                </div>
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
