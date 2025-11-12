"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

type CurrencyCategory = "stablecoin" | "mainstream" | "meme" | "other"

interface AssetDetail {
  currency: string
  network: string
  category: CurrencyCategory
  hotWalletTotal: string
  coldWalletTotal: string
  totalAssets: string
  userAssets: string
  companyNetWorth: string
  custodian: string
}

const categoryLabels: Record<CurrencyCategory, string> = {
  stablecoin: "稳定币",
  mainstream: "主流币",
  meme: "MEME币",
  other: "其他"
}

const categoryColors: Record<CurrencyCategory, string> = {
  stablecoin: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  mainstream: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  meme: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
}

export default function CryptoAssetStatisticsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryTab, setCategoryTab] = useState<string>("all")
  const [custodianTab, setCustodianTab] = useState<string>("all")
  const [displayCount, setDisplayCount] = useState(10)

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

  const assetDetails: AssetDetail[] = [
    { 
      currency: "USDT", 
      network: "TRC20",
      category: "stablecoin",
      hotWalletTotal: "3,500,000.00",
      coldWalletTotal: "2,426,924.90",
      totalAssets: "5,926,924.90", 
      userAssets: "4,500,000.00", 
      companyNetWorth: "1,426,924.90",
      custodian: "Fireblocks"
    },
    { 
      currency: "USDT", 
      network: "ERC20",
      category: "stablecoin",
      hotWalletTotal: "1,500,000.00",
      coldWalletTotal: "981,481.45",
      totalAssets: "2,481,481.45", 
      userAssets: "2,000,000.00", 
      companyNetWorth: "481,481.45",
      custodian: "Copper"
    },
    { 
      currency: "BTC", 
      network: "Bitcoin",
      category: "mainstream",
      hotWalletTotal: "35.00000000",
      coldWalletTotal: "25.27014720",
      totalAssets: "60.27014720", 
      userAssets: "50.00000000", 
      companyNetWorth: "10.27014720",
      custodian: "Fireblocks"
    },
    { 
      currency: "ETH", 
      network: "Ethereum",
      category: "mainstream",
      hotWalletTotal: "180.00000000",
      coldWalletTotal: "134.81468147",
      totalAssets: "314.81468147", 
      userAssets: "250.00000000", 
      companyNetWorth: "64.81468147",
      custodian: "Copper"
    },
    { 
      currency: "USDC", 
      network: "ERC20",
      category: "stablecoin",
      hotWalletTotal: "900,000.00",
      coldWalletTotal: "703,703.67",
      totalAssets: "1,603,703.67", 
      userAssets: "1,200,000.00", 
      companyNetWorth: "403,703.67",
      custodian: "Fireblocks"
    },
    { 
      currency: "BNB", 
      network: "BSC",
      category: "mainstream",
      hotWalletTotal: "400.00000000",
      coldWalletTotal: "324.90370368",
      totalAssets: "724.90370368", 
      userAssets: "600.00000000", 
      companyNetWorth: "124.90370368",
      custodian: "BitGo"
    },
    { 
      currency: "DOGE", 
      network: "Dogecoin",
      category: "meme",
      hotWalletTotal: "500,000.00000000",
      coldWalletTotal: "250,000.00000000",
      totalAssets: "750,000.00000000", 
      userAssets: "600,000.00000000", 
      companyNetWorth: "150,000.00000000",
      custodian: "Fireblocks"
    },
    { 
      currency: "SHIB", 
      network: "Ethereum",
      category: "meme",
      hotWalletTotal: "15,000,000.00000000",
      coldWalletTotal: "10,000,000.00000000",
      totalAssets: "25,000,000.00000000", 
      userAssets: "20,000,000.00000000", 
      companyNetWorth: "5,000,000.00000000",
      custodian: "Copper"
    },
    { 
      currency: "XRP", 
      network: "Ripple",
      category: "other",
      hotWalletTotal: "80,000.00000000",
      coldWalletTotal: "50,000.00000000",
      totalAssets: "130,000.00000000", 
      userAssets: "100,000.00000000", 
      companyNetWorth: "30,000.00000000",
      custodian: "BitGo"
    },
    { 
      currency: "LTC", 
      network: "Litecoin",
      category: "mainstream",
      hotWalletTotal: "250.00000000",
      coldWalletTotal: "150.00000000",
      totalAssets: "400.00000000", 
      userAssets: "320.00000000", 
      companyNetWorth: "80.00000000",
      custodian: "Fireblocks"
    },
    { 
      currency: "DAI", 
      network: "ERC20",
      category: "stablecoin",
      hotWalletTotal: "800,000.00",
      coldWalletTotal: "500,000.00",
      totalAssets: "1,300,000.00", 
      userAssets: "1,000,000.00", 
      companyNetWorth: "300,000.00",
      custodian: "Copper"
    },
    { 
      currency: "SOL", 
      network: "Solana",
      category: "mainstream",
      hotWalletTotal: "1,200.00000000",
      coldWalletTotal: "800.00000000",
      totalAssets: "2,000.00000000", 
      userAssets: "1,600.00000000", 
      companyNetWorth: "400.00000000",
      custodian: "Fireblocks"
    },
  ]

  const searchFiltered = useMemo(() => {
    if (!searchQuery) return assetDetails
    const query = searchQuery.toLowerCase()
    return assetDetails.filter(asset =>
      asset.currency.toLowerCase().includes(query) ||
      asset.network.toLowerCase().includes(query) ||
      asset.custodian.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const categoryFiltered = useMemo(() => {
    if (categoryTab === "all") return searchFiltered
    return searchFiltered.filter(asset => asset.category === categoryTab)
  }, [searchFiltered, categoryTab])

  const availableCustodians = useMemo(() => {
    const custodians = Array.from(new Set(categoryFiltered.map(a => a.custodian)))
    return custodians.sort()
  }, [categoryFiltered])

  const custodianFiltered = useMemo(() => {
    if (custodianTab === "all") return categoryFiltered
    return categoryFiltered.filter(asset => asset.custodian === custodianTab)
  }, [categoryFiltered, custodianTab])

  const displayedAssets = useMemo(() => {
    return custodianFiltered.slice(0, displayCount)
  }, [custodianFiltered, displayCount])

  const hasMore = displayCount < custodianFiltered.length

  useEffect(() => {
    setDisplayCount(10)
  }, [searchQuery])

  useEffect(() => {
    if (custodianTab !== "all" && !availableCustodians.includes(custodianTab)) {
      setCustodianTab("all")
    }
  }, [availableCustodians, custodianTab])

  const handleCategoryChange = (value: string) => {
    setCategoryTab(value)
    setCustodianTab("all")
    setDisplayCount(10)
  }

  const handleCustodianChange = (value: string) => {
    setCustodianTab(value)
    setDisplayCount(10)
  }

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 10)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Crypto资产统计</h1>
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
        <CardHeader className="space-y-4">
          <CardTitle>资产明细</CardTitle>

          <div className="flex flex-wrap items-center gap-4">
            <Tabs value={categoryTab} onValueChange={handleCategoryChange}>
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="stablecoin">稳定币</TabsTrigger>
                <TabsTrigger value="mainstream">主流币</TabsTrigger>
                <TabsTrigger value="meme">MEME币</TabsTrigger>
                <TabsTrigger value="other">其他</TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs value={custodianTab} onValueChange={handleCustodianChange}>
              <TabsList>
                <TabsTrigger value="all">全部供应商</TabsTrigger>
                {availableCustodians.map(custodian => (
                  <TabsTrigger key={custodian} value={custodian}>
                    {custodian}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-2 ml-auto">
              <div className="relative min-w-[200px] md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索币种、网络或托管供应商..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button variant="outline" size="default">
                <Search className="h-4 w-4 mr-2" />
                搜索
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>类型</TableHead>
                  <TableHead>币种</TableHead>
                  <TableHead>网络</TableHead>
                  <TableHead className="text-right">热钱包总资产</TableHead>
                  <TableHead className="text-right">冷钱包总资产</TableHead>
                  <TableHead className="text-right">总计资产</TableHead>
                  <TableHead className="text-right">用户资产</TableHead>
                  <TableHead className="text-right">公司净值</TableHead>
                  <TableHead>托管供应商</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedAssets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      暂无数据
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedAssets.map((asset, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[asset.category]}`}>
                          {categoryLabels[asset.category]}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium">{asset.currency}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          {asset.network}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-orange-600">{asset.hotWalletTotal}</TableCell>
                      <TableCell className="text-right font-mono text-blue-600">{asset.coldWalletTotal}</TableCell>
                      <TableCell className="text-right font-mono font-semibold">{asset.totalAssets}</TableCell>
                      <TableCell className="text-right font-mono text-blue-600">{asset.userAssets}</TableCell>
                      <TableCell className="text-right font-mono text-green-600">{asset.companyNetWorth}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          {asset.custodian}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={handleLoadMore}
                className="w-full max-w-xs"
              >
                加载更多
              </Button>
            </div>
          )}

          {!hasMore && custodianFiltered.length > 0 && (
            <div className="text-center text-sm text-muted-foreground mt-6">
              已显示全部 {custodianFiltered.length} 条数据
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
