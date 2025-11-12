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
    { 
      currency: "USDT", 
      network: "TRC20", 
      totalAssets: "5,926,924.90", 
      userAssets: "4,500,000.00", 
      companyNetWorth: "1,426,924.90",
      custodian: "Fireblocks"
    },
    { 
      currency: "USDT", 
      network: "ERC20", 
      totalAssets: "2,481,481.45", 
      userAssets: "2,000,000.00", 
      companyNetWorth: "481,481.45",
      custodian: "Copper"
    },
    { 
      currency: "BTC", 
      network: "Bitcoin", 
      totalAssets: "60.27014720", 
      userAssets: "50.00000000", 
      companyNetWorth: "10.27014720",
      custodian: "Fireblocks"
    },
    { 
      currency: "ETH", 
      network: "Ethereum", 
      totalAssets: "314.81468147", 
      userAssets: "250.00000000", 
      companyNetWorth: "64.81468147",
      custodian: "Copper"
    },
    { 
      currency: "USDC", 
      network: "ERC20", 
      totalAssets: "1,603,703.67", 
      userAssets: "1,200,000.00", 
      companyNetWorth: "403,703.67",
      custodian: "Fireblocks"
    },
    { 
      currency: "BNB", 
      network: "BSC", 
      totalAssets: "724.90370368", 
      userAssets: "600.00000000", 
      companyNetWorth: "124.90370368",
      custodian: "BitGo"
    },
  ]

  const filteredAssets = assetDetails.filter(asset =>
    asset.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.network.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.custodian.toLowerCase().includes(searchQuery.toLowerCase())
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
                  placeholder="搜索币种、网络或托管供应商..."
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
                <TableHead className="text-right">链上总资产</TableHead>
                <TableHead className="text-right">用户资产</TableHead>
                <TableHead className="text-right">公司净值</TableHead>
                <TableHead>托管供应商</TableHead>
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
                  <TableCell className="text-right font-mono font-semibold">{asset.totalAssets}</TableCell>
                  <TableCell className="text-right font-mono text-blue-600">{asset.userAssets}</TableCell>
                  <TableCell className="text-right font-mono text-green-600">{asset.companyNetWorth}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                      {asset.custodian}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
