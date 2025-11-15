"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CreditCard, 
  Wallet, 
  Users, 
  Building2,
  Search,
  Download,
  RefreshCw,
  Lock
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type CardType = "virtual" | "physical"
type SupplierStatus = "active" | "inactive"

interface UCardAssetDetail {
  supplierId: string
  supplierName: string
  supplierStatus: SupplierStatus
  cardType: CardType
  totalCards: number
  activeCards: number
  frozenCards: number
  totalBalance: string
  userBalance: string
  companyNetWorth: string
  frozenAmount: string
  availableBalance: string
  settlementCycle: string
}

const cardTypeLabels: Record<CardType, string> = {
  virtual: "虚拟卡",
  physical: "实体卡"
}

const cardTypeColors: Record<CardType, string> = {
  virtual: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  physical: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
}

const statusLabels: Record<SupplierStatus, string> = {
  active: "运营中",
  inactive: "已停用"
}

const statusColors: Record<SupplierStatus, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
}

export default function UCardAssetStatisticsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cardTypeTab, setCardTypeTab] = useState<string>("all")
  const [supplierTab, setSupplierTab] = useState<string>("all")
  const [displayCount, setDisplayCount] = useState(10)

  const assetStats = [
    {
      label: "总资产",
      totalValue: "12,458,932.50",
      userValue: "9,234,567.80",
      icon: Wallet,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600",
      isCurrency: true
    },
    {
      label: "活跃卡片",
      totalValue: "12,876",
      userValue: "15,234 张总卡",
      icon: CreditCard,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600",
      isCurrency: false
    },
    {
      label: "平台净资产",
      totalValue: "3,224,364.70",
      userValue: "利润和储备金",
      icon: Building2,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600",
      isCurrency: true
    },
    {
      label: "冻结金额",
      totalValue: "567,234.10",
      userValue: "1,234 张冻结卡",
      icon: Lock,
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600",
      isCurrency: true
    }
  ]

  const assetDetails: UCardAssetDetail[] = [
    {
      supplierId: "SUP001",
      supplierName: "Mastercard Global",
      supplierStatus: "active",
      cardType: "virtual",
      totalCards: 5432,
      activeCards: 4987,
      frozenCards: 234,
      totalBalance: "4,567,890.12",
      userBalance: "3,456,789.01",
      companyNetWorth: "1,111,101.11",
      frozenAmount: "234,567.89",
      availableBalance: "4,333,322.23",
      settlementCycle: "T+1"
    },
    {
      supplierId: "SUP002",
      supplierName: "Visa International",
      supplierStatus: "active",
      cardType: "virtual",
      totalCards: 4321,
      activeCards: 3876,
      frozenCards: 187,
      totalBalance: "3,456,789.23",
      userBalance: "2,567,890.12",
      companyNetWorth: "888,899.11",
      frozenAmount: "156,789.01",
      availableBalance: "3,300,000.22",
      settlementCycle: "T+1"
    },
    {
      supplierId: "SUP003",
      supplierName: "UnionPay Card Services",
      supplierStatus: "active",
      cardType: "physical",
      totalCards: 2876,
      activeCards: 2543,
      frozenCards: 145,
      totalBalance: "2,345,678.90",
      userBalance: "1,789,012.34",
      companyNetWorth: "556,666.56",
      frozenAmount: "98,765.43",
      availableBalance: "2,246,913.47",
      settlementCycle: "T+0"
    },
    {
      supplierId: "SUP004",
      supplierName: "American Express Digital",
      supplierStatus: "active",
      cardType: "virtual",
      totalCards: 1654,
      activeCards: 1432,
      frozenCards: 98,
      totalBalance: "1,234,567.89",
      userBalance: "987,654.32",
      companyNetWorth: "246,913.57",
      frozenAmount: "45,678.90",
      availableBalance: "1,188,888.99",
      settlementCycle: "T+1"
    },
    {
      supplierId: "SUP005",
      supplierName: "Discover Card Network",
      supplierStatus: "active",
      cardType: "virtual",
      totalCards: 987,
      activeCards: 876,
      frozenCards: 67,
      totalBalance: "567,890.12",
      userBalance: "456,789.01",
      companyNetWorth: "111,101.11",
      frozenAmount: "23,456.78",
      availableBalance: "544,433.34",
      settlementCycle: "T+2"
    },
    {
      supplierId: "SUP006",
      supplierName: "JCB Card Solutions",
      supplierStatus: "inactive",
      cardType: "virtual",
      totalCards: 543,
      activeCards: 0,
      frozenCards: 543,
      totalBalance: "234,567.89",
      userBalance: "0.00",
      companyNetWorth: "234,567.89",
      frozenAmount: "234,567.89",
      availableBalance: "0.00",
      settlementCycle: "T+1"
    },
    {
      supplierId: "SUP007",
      supplierName: "DinersClub Premium",
      supplierStatus: "active",
      cardType: "physical",
      totalCards: 321,
      activeCards: 298,
      frozenCards: 12,
      totalBalance: "123,456.78",
      userBalance: "98,765.43",
      companyNetWorth: "24,691.35",
      frozenAmount: "5,678.90",
      availableBalance: "117,777.88",
      settlementCycle: "T+0"
    },
    {
      supplierId: "SUP008",
      supplierName: "China T-Union Card",
      supplierStatus: "active",
      cardType: "virtual",
      totalCards: 100,
      activeCards: 84,
      frozenCards: 8,
      totalBalance: "45,678.90",
      userBalance: "34,567.89",
      companyNetWorth: "11,111.01",
      frozenAmount: "2,345.67",
      availableBalance: "43,333.23",
      settlementCycle: "T+1"
    }
  ]

  const searchFiltered = useMemo(() => {
    if (!searchQuery) return assetDetails
    const query = searchQuery.toLowerCase()
    return assetDetails.filter(asset =>
      asset.supplierName.toLowerCase().includes(query) ||
      asset.supplierId.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const cardTypeFiltered = useMemo(() => {
    if (cardTypeTab === "all") return searchFiltered
    return searchFiltered.filter(asset => asset.cardType === cardTypeTab)
  }, [searchFiltered, cardTypeTab])

  const allSuppliers = useMemo(() => {
    const suppliers = Array.from(new Set(assetDetails.map(a => a.supplierName)))
    return suppliers.sort()
  }, [])

  const supplierFiltered = useMemo(() => {
    if (supplierTab === "all") return cardTypeFiltered
    return cardTypeFiltered.filter(asset => asset.supplierName === supplierTab)
  }, [cardTypeFiltered, supplierTab])

  const displayedAssets = useMemo(() => {
    return supplierFiltered.slice(0, displayCount)
  }, [supplierFiltered, displayCount])

  const hasMore = displayCount < supplierFiltered.length

  useEffect(() => {
    setDisplayCount(10)
  }, [searchQuery, cardTypeTab, supplierTab])

  const handleCardTypeChange = (value: string) => {
    setCardTypeTab(value)
  }

  const handleSupplierChange = (value: string) => {
    setSupplierTab(value)
  }

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 10)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">U卡资产统计</h1>
          <p className="text-sm text-muted-foreground mt-1">
            实时监控平台U卡资产分布与供应商状态
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
                <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                  <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">
                  {stat.isCurrency ? `${stat.totalValue} USDT` : stat.totalValue}
                </div>
                <p className="text-xs text-muted-foreground">{stat.userValue}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Tabs value={cardTypeTab} onValueChange={handleCardTypeChange}>
              <TabsList>
                <TabsTrigger value="all">全部类型</TabsTrigger>
                <TabsTrigger value="virtual">虚拟卡</TabsTrigger>
                <TabsTrigger value="physical">实体卡</TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs value={supplierTab} onValueChange={handleSupplierChange}>
              <TabsList>
                <TabsTrigger value="all">全部供应商</TabsTrigger>
                {allSuppliers.map(supplier => (
                  <TabsTrigger key={supplier} value={supplier}>
                    {supplier}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex flex-wrap gap-2 ml-auto">
              <div className="relative min-w-[200px] md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索供应商名称或ID..."
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
                  <TableHead>卡类型</TableHead>
                  <TableHead>供应商</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">总卡数</TableHead>
                  <TableHead className="text-right">活跃卡</TableHead>
                  <TableHead className="text-right">冻结卡</TableHead>
                  <TableHead className="text-right">总余额</TableHead>
                  <TableHead className="text-right">用户余额</TableHead>
                  <TableHead className="text-right">平台净资产</TableHead>
                  <TableHead className="text-right">冻结金额</TableHead>
                  <TableHead className="text-right">可用余额</TableHead>
                  <TableHead>结算周期</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedAssets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center text-muted-foreground py-8">
                      暂无数据
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedAssets.map((asset) => (
                    <TableRow key={asset.supplierId}>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${cardTypeColors[asset.cardType]}`}>
                          {cardTypeLabels[asset.cardType]}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{asset.supplierName}</div>
                          <div className="text-xs text-muted-foreground">{asset.supplierId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[asset.supplierStatus]}`}>
                          {statusLabels[asset.supplierStatus]}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono">{asset.totalCards.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-green-600">{asset.activeCards.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-orange-600">{asset.frozenCards.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono font-semibold">{asset.totalBalance} USDT</TableCell>
                      <TableCell className="text-right font-mono text-blue-600">{asset.userBalance} USDT</TableCell>
                      <TableCell className="text-right font-mono text-green-600">{asset.companyNetWorth} USDT</TableCell>
                      <TableCell className="text-right font-mono text-orange-600">{asset.frozenAmount} USDT</TableCell>
                      <TableCell className="text-right font-mono text-green-600">{asset.availableBalance} USDT</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                          {asset.settlementCycle}
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

          {!hasMore && supplierFiltered.length > 0 && (
            <div className="text-center text-sm text-muted-foreground mt-6">
              已显示全部 {supplierFiltered.length} 条数据
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
