"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft,
  Eye,
  EyeOff,
  Plus,
  Minus
} from "lucide-react"
import { useState } from "react"

export default function WalletPage() {
  const [balanceVisible, setBalanceVisible] = useState(true)

  const walletData = {
    totalBalance: "12,345.67",
    availableBalance: "11,234.56",
    frozenBalance: "1,111.11",
    todayPnL: "+234.56",
    totalPnL: "+1,234.56"
  }

  const recentTransactions = [
    {
      id: 1,
      type: "deposit",
      amount: "+500.00",
      currency: "USDT",
      time: "2024-01-15 14:30",
      status: "completed"
    },
    {
      id: 2,
      type: "withdraw",
      amount: "-200.00",
      currency: "USDT",
      time: "2024-01-15 10:15",
      status: "pending"
    },
    {
      id: 3,
      type: "trade",
      amount: "+45.67",
      currency: "USDT",
      time: "2024-01-14 16:45",
      status: "completed"
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-end">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            充值
          </Button>
        </div>

        {/* Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[#00D4AA]/10 to-[#00D4AA]/5 border-[#00D4AA]/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总资产</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBalanceVisible(!balanceVisible)}
                className="h-6 w-6 p-0"
              >
                {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#00D4AA]">
                {balanceVisible ? `$${walletData.totalBalance}` : "****"}
              </div>
              <p className="text-xs text-muted-foreground">USDT</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">可用余额</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {balanceVisible ? `$${walletData.availableBalance}` : "****"}
              </div>
              <p className="text-xs text-muted-foreground">USDT</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今日盈亏</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {balanceVisible ? walletData.todayPnL : "****"}
              </div>
              <p className="text-xs text-muted-foreground">+2.1%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总盈亏</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {balanceVisible ? walletData.totalPnL : "****"}
              </div>
              <p className="text-xs text-muted-foreground">+11.2%</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                充值
              </Button>
              <Button variant="outline">
                <Minus className="h-4 w-4 mr-2" />
                提现
              </Button>
              <Button variant="outline">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                转账
              </Button>
              <Button variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                交易
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>最近交易</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === "deposit" 
                        ? "bg-green-500/10 text-green-500" 
                        : transaction.type === "withdraw"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-blue-500/10 text-blue-500"
                    }`}>
                      {transaction.type === "deposit" ? (
                        <ArrowDownLeft className="h-4 w-4" />
                      ) : transaction.type === "withdraw" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <TrendingUp className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">
                        {transaction.type === "deposit" ? "充值" : 
                         transaction.type === "withdraw" ? "提现" : "交易"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      transaction.amount.startsWith("+") ? "text-green-500" : "text-red-500"
                    }`}>
                      {transaction.amount} {transaction.currency}
                    </div>
                    <div className={`text-xs ${
                      transaction.status === "completed" 
                        ? "text-green-500" 
                        : "text-yellow-500"
                    }`}>
                      {transaction.status === "completed" ? "已完成" : "处理中"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}