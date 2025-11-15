"use client"

import React, { useState, useMemo } from "react"
import CommissionLayout from "@/components/commission-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, TrendingDown, Wallet, Trophy, ArrowUpRight, ArrowDownRight, ChevronDown } from "lucide-react"
import { DataTotal } from "@/components/data-total"

type RankingType = "commission" | "volume" | "referrals"
type Currency = "CNY" | "USD" | "EUR" | "JPY" | "KRW" | "THB" | "VND"

interface Promoter {
  id: string
  username: string
  email: string
  totalCommission: number
  totalVolume: number
  referralCount: number
  todayCommission: number
  yesterdayCommission: number
  monthCommission: number
  rank: number
  trend: "up" | "down" | "same"
  trendValue: number
}

const mockPromoters: Promoter[] = Array.from({ length: 50 }, (_, i) => ({
  id: `promoter-${i + 1}`,
  username: `推广员${String(i + 1).padStart(3, '0')}`,
  email: `promoter${i + 1}@example.com`,
  totalCommission: Math.floor(Math.random() * 1000000) + 10000,
  totalVolume: Math.floor(Math.random() * 10000000) + 100000,
  referralCount: Math.floor(Math.random() * 500) + 10,
  todayCommission: Math.floor(Math.random() * 5000) + 100,
  yesterdayCommission: Math.floor(Math.random() * 5000) + 100,
  monthCommission: Math.floor(Math.random() * 50000) + 1000,
  rank: i + 1,
  trend: ["up", "down", "same"][Math.floor(Math.random() * 3)] as "up" | "down" | "same",
  trendValue: Math.floor(Math.random() * 10) + 1,
}))

export default function PaymentCommissionPage() {
  const [rankingType, setRankingType] = useState<RankingType>("commission")
  const [currency, setCurrency] = useState<Currency>("CNY")
  const [displayCount, setDisplayCount] = useState(20)

  const sortedPromoters = useMemo(() => {
    const sorted = [...mockPromoters].sort((a, b) => {
      if (rankingType === "commission") return b.totalCommission - a.totalCommission
      if (rankingType === "volume") return b.totalVolume - a.totalVolume
      return b.referralCount - a.referralCount
    })
    return sorted.map((p, i) => ({ ...p, rank: i + 1 }))
  }, [rankingType])

  const displayedPromoters = sortedPromoters.slice(0, displayCount)
  const hasMore = displayCount < sortedPromoters.length

  const stats = useMemo(() => ({
    totalPromoters: mockPromoters.length,
    todayCommission: mockPromoters.reduce((sum, p) => sum + p.todayCommission, 0),
    yesterdayCommission: mockPromoters.reduce((sum, p) => sum + p.yesterdayCommission, 0),
    monthCommission: mockPromoters.reduce((sum, p) => sum + p.monthCommission, 0),
  }), [])

  const formatCurrency = (amount: number) => {
    const symbols: Record<Currency, string> = {
      CNY: "¥",
      USD: "$",
      EUR: "€",
      JPY: "¥",
      KRW: "₩",
      THB: "฿",
      VND: "₫",
    }
    return `${symbols[currency]}${amount.toLocaleString()}`
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
    if (rank === 2) return "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
    if (rank === 3) return "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
    return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
  }

  return (
    <CommissionLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">支付佣金</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">代收、代付、兑换订单佣金统计与管理</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">推广员总数</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.totalPromoters}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">活跃推广员数量</p>
                </div>
                <div className="p-3 bg-blue-500 rounded-full">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">今日支出佣金</p>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{formatCurrency(stats.todayCommission)}</p>
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>较昨日增长</span>
                  </div>
                </div>
                <div className="p-3 bg-green-500 rounded-full">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">昨日支出佣金</p>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{formatCurrency(stats.yesterdayCommission)}</p>
                  <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                    <TrendingDown className="w-3 h-3" />
                    <span>环比前日</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500 rounded-full">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">本月支出佣金</p>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{formatCurrency(stats.monthCommission)}</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">当前月累计</p>
                </div>
                <div className="p-3 bg-orange-500 rounded-full">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <Tabs value={rankingType} onValueChange={(v) => setRankingType(v as RankingType)}>
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 gap-1">
                <TabsTrigger value="commission">佣金排名</TabsTrigger>
                <TabsTrigger value="volume">交易量排名</TabsTrigger>
                <TabsTrigger value="referrals">推广下线数量排名</TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-7 gap-1">
                <TabsTrigger value="CNY">CNY</TabsTrigger>
                <TabsTrigger value="USD">USD</TabsTrigger>
                <TabsTrigger value="EUR">EUR</TabsTrigger>
                <TabsTrigger value="JPY">JPY</TabsTrigger>
                <TabsTrigger value="KRW">KRW</TabsTrigger>
                <TabsTrigger value="THB">THB</TabsTrigger>
                <TabsTrigger value="VND">VND</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">排名</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">推广员</th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">联系方式</th>
                    {rankingType === "commission" && (
                      <>
                        <th className="text-right p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">累计佣金</th>
                        <th className="text-right p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">今日佣金</th>
                        <th className="text-right p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">本月佣金</th>
                      </>
                    )}
                    {rankingType === "volume" && (
                      <>
                        <th className="text-right p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">累计交易量</th>
                        <th className="text-right p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">累计佣金</th>
                      </>
                    )}
                    {rankingType === "referrals" && (
                      <>
                        <th className="text-right p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">下线数量</th>
                        <th className="text-right p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">累计佣金</th>
                      </>
                    )}
                    <th className="text-center p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">趋势</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedPromoters.map((promoter) => (
                    <tr
                      key={promoter.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="p-3">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${getRankBadgeColor(promoter.rank)}`}>
                          {promoter.rank}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-gray-900 dark:text-white">{promoter.username}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">{promoter.email}</div>
                      </td>
                      {rankingType === "commission" && (
                        <>
                          <td className="p-3 text-right font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(promoter.totalCommission)}
                          </td>
                          <td className="p-3 text-right text-green-600 dark:text-green-400">
                            {formatCurrency(promoter.todayCommission)}
                          </td>
                          <td className="p-3 text-right text-blue-600 dark:text-blue-400">
                            {formatCurrency(promoter.monthCommission)}
                          </td>
                        </>
                      )}
                      {rankingType === "volume" && (
                        <>
                          <td className="p-3 text-right font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(promoter.totalVolume)}
                          </td>
                          <td className="p-3 text-right text-green-600 dark:text-green-400">
                            {formatCurrency(promoter.totalCommission)}
                          </td>
                        </>
                      )}
                      {rankingType === "referrals" && (
                        <>
                          <td className="p-3 text-right font-semibold text-gray-900 dark:text-white">
                            {promoter.referralCount}
                          </td>
                          <td className="p-3 text-right text-green-600 dark:text-green-400">
                            {formatCurrency(promoter.totalCommission)}
                          </td>
                        </>
                      )}
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-1">
                          {promoter.trend === "up" && (
                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                              <ArrowUpRight className="w-4 h-4" />
                              <span className="text-sm font-medium">+{promoter.trendValue}</span>
                            </div>
                          )}
                          {promoter.trend === "down" && (
                            <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                              <ArrowDownRight className="w-4 h-4" />
                              <span className="text-sm font-medium">-{promoter.trendValue}</span>
                            </div>
                          )}
                          {promoter.trend === "same" && (
                            <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <DataTotal total={sortedPromoters.length} label="推广员" />
              {hasMore && (
                <Button
                  variant="outline"
                  onClick={() => setDisplayCount((prev) => Math.min(prev + 20, sortedPromoters.length))}
                  className="gap-2"
                >
                  加载更多
                  <ChevronDown className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </CommissionLayout>
  )
}
