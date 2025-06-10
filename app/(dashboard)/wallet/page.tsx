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
  Minus,
  BarChart3,
  Shield,
  Gift,
  DollarSign,
  PiggyBank
} from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"

export default function WalletPage() {
  const { theme } = useTheme()
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [activeTab, setActiveTab] = useState("总览")
  const isDark = theme === "dark"

  const walletTabs = [
    { id: "总览", label: "总览", icon: Wallet },
    { id: "现货", label: "现货", icon: CreditCard },
    { id: "合约", label: "合约", icon: BarChart3 },
    { id: "理财", label: "理财", icon: PiggyBank },
    { id: "佣金", label: "佣金", icon: Gift },
    { id: "U卡", label: "U卡", icon: DollarSign },
    { id: "保证金", label: "保证金", icon: Shield }
  ]

  const walletData = {
    总览: {
      totalBalance: "12,345.67",
      availableBalance: "11,234.56",
      frozenBalance: "1,111.11",
      todayPnL: "+234.56",
      totalPnL: "+1,234.56"
    },
    现货: {
      totalBalance: "8,567.89",
      availableBalance: "8,000.00",
      frozenBalance: "567.89",
      assets: [
        { symbol: "USDT", balance: "5,000.00", value: "5,000.00", change: "+0.00%" },
        { symbol: "BTC", balance: "0.15", value: "2,500.00", change: "+2.34%" },
        { symbol: "ETH", balance: "2.5", value: "1,067.89", change: "-1.23%" }
      ]
    },
    合约: {
      totalBalance: "3,456.78",
      unrealizedPnL: "+123.45",
      realizedPnL: "+678.90",
      marginUsed: "2,000.00",
      marginAvailable: "1,456.78",
      positions: [
        { symbol: "BTCUSDT", side: "多", size: "0.5", pnl: "+234.56", margin: "1,000.00" },
        { symbol: "ETHUSDT", side: "空", size: "2.0", pnl: "-45.67", margin: "800.00" }
      ]
    },
    理财: {
      totalAssets: "2,345.67",
      totalEarnings: "+145.89",
      products: [
        { name: "USDT活期", amount: "1,000.00", apy: "3.5%", earnings: "+35.00" },
        { name: "BTC定期30天", amount: "0.05", apy: "5.2%", earnings: "+26.78" },
        { name: "ETH灵活理财", amount: "1.0", apy: "4.8%", earnings: "+84.11" }
      ]
    },
    佣金: {
      totalCommission: "567.89",
      todayCommission: "+12.34",
      thisMonthCommission: "+234.56",
      referrals: 25,
      commissionHistory: [
        { date: "2024-01-15", amount: "+12.34", source: "交易返佣" },
        { date: "2024-01-14", amount: "+8.90", source: "邀请返佣" },
        { date: "2024-01-13", amount: "+15.67", source: "交易返佣" }
      ]
    },
    "U卡": {
      cardBalance: "1,234.56",
      cardLimit: "10,000.00",
      monthlySpent: "765.43",
      transactions: [
        { date: "2024-01-15", merchant: "Amazon", amount: "-89.99", status: "已完成" },
        { date: "2024-01-14", merchant: "餐厅消费", amount: "-45.67", status: "已完成" },
        { date: "2024-01-13", merchant: "充值", amount: "+500.00", status: "已完成" }
      ]
    },
    保证金: {
      totalMargin: "5,000.00",
      usedMargin: "3,200.00",
      availableMargin: "1,800.00",
      marginLevel: "156.25%",
      positions: [
        { pair: "BTCUSDT", margin: "2,000.00", leverage: "10x", status: "正常" },
        { pair: "ETHUSDT", margin: "1,200.00", leverage: "5x", status: "正常" }
      ]
    }
  }

  // 统一的卡片样式，参考行情页面
  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"

  const renderTabContent = () => {
    const currentData = walletData[activeTab as keyof typeof walletData]

    switch (activeTab) {
      case "总览":
        return (
          <div className="space-y-6">
            {/* Balance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`${cardStyle} bg-gradient-to-br from-[#00D4AA]/10 to-[#00D4AA]/5 border-[#00D4AA]/20 rounded-lg p-4`}>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-sm font-medium">总资产</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="h-6 w-6 p-0"
                  >
                    {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#00D4AA]">
                    {balanceVisible ? `$${currentData.totalBalance}` : "****"}
                  </div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>USDT</p>
                </div>
              </div>

              <div className={`${cardStyle} rounded-lg p-4`}>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-sm font-medium">可用余额</h3>
                  <CreditCard className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {balanceVisible ? `$${currentData.availableBalance}` : "****"}
                  </div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>USDT</p>
                </div>
              </div>

              <div className={`${cardStyle} rounded-lg p-4`}>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-sm font-medium">今日盈亏</h3>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">
                    {balanceVisible ? currentData.todayPnL : "****"}
                  </div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+2.1%</p>
                </div>
              </div>

              <div className={`${cardStyle} rounded-lg p-4`}>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-sm font-medium">总盈亏</h3>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">
                    {balanceVisible ? currentData.totalPnL : "****"}
                  </div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+11.2%</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`${cardStyle} rounded-lg p-4`}>
              <h3 className="text-lg font-semibold mb-4">快速操作</h3>
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
            </div>
          </div>
        )

      case "现货":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">现货总资产</h3>
                <div className="text-2xl font-bold">${currentData.totalBalance}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">可用余额</h3>
                <div className="text-2xl font-bold">${currentData.availableBalance}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">冻结资产</h3>
                <div className="text-2xl font-bold">${currentData.frozenBalance}</div>
              </div>
            </div>
            
            <div className={`${cardStyle} rounded-lg p-4`}>
              <h3 className="text-lg font-semibold mb-4">现货资产</h3>
              <div className="space-y-4">
                {currentData.assets.map((asset, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 ${isDark ? 'border-[#252842]' : 'border-gray-200'} border rounded-lg`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#00D4AA] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium">{asset.symbol}</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{asset.balance}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${asset.value}</div>
                      <div className={`text-sm ${asset.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {asset.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "合约":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">合约资产</h3>
                <div className="text-2xl font-bold">${currentData.totalBalance}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">未实现盈亏</h3>
                <div className="text-2xl font-bold text-green-500">{currentData.unrealizedPnL}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">已用保证金</h3>
                <div className="text-2xl font-bold">${currentData.marginUsed}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">可用保证金</h3>
                <div className="text-2xl font-bold">${currentData.marginAvailable}</div>
              </div>
            </div>

            <div className={`${cardStyle} rounded-lg p-4`}>
              <h3 className="text-lg font-semibold mb-4">持仓</h3>
              <div className="space-y-4">
                {currentData.positions.map((position, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 ${isDark ? 'border-[#252842]' : 'border-gray-200'} border rounded-lg`}>
                    <div>
                      <div className="font-medium">{position.symbol}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{position.side} {position.size}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${position.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {position.pnl}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>保证金: ${position.margin}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "理财":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">理财总资产</h3>
                <div className="text-2xl font-bold">${currentData.totalAssets}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">累计收益</h3>
                <div className="text-2xl font-bold text-green-500">{currentData.totalEarnings}</div>
              </div>
            </div>

            <div className={`${cardStyle} rounded-lg p-4`}>
              <h3 className="text-lg font-semibold mb-4">理财产品</h3>
              <div className="space-y-4">
                {currentData.products.map((product, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 ${isDark ? 'border-[#252842]' : 'border-gray-200'} border rounded-lg`}>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>金额: {product.amount}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>年化: {product.apy}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-500">{product.earnings}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>收益</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "佣金":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">总佣金</h3>
                <div className="text-2xl font-bold">${currentData.totalCommission}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">今日佣金</h3>
                <div className="text-2xl font-bold text-green-500">{currentData.todayCommission}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">本月佣金</h3>
                <div className="text-2xl font-bold text-green-500">{currentData.thisMonthCommission}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">邀请人数</h3>
                <div className="text-2xl font-bold">{currentData.referrals}</div>
              </div>
            </div>

            <div className={`${cardStyle} rounded-lg p-4`}>
              <h3 className="text-lg font-semibold mb-4">佣金记录</h3>
              <div className="space-y-4">
                {currentData.commissionHistory.map((record, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 ${isDark ? 'border-[#252842]' : 'border-gray-200'} border rounded-lg`}>
                    <div>
                      <div className="font-medium">{record.source}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{record.date}</div>
                    </div>
                    <div className="text-green-500 font-medium">{record.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "U卡":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">卡片余额</h3>
                <div className="text-2xl font-bold">${currentData.cardBalance}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">信用额度</h3>
                <div className="text-2xl font-bold">${currentData.cardLimit}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">本月消费</h3>
                <div className="text-2xl font-bold">${currentData.monthlySpent}</div>
              </div>
            </div>

            <div className={`${cardStyle} rounded-lg p-4`}>
              <h3 className="text-lg font-semibold mb-4">交易记录</h3>
              <div className="space-y-4">
                {currentData.transactions.map((transaction, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 ${isDark ? 'border-[#252842]' : 'border-gray-200'} border rounded-lg`}>
                    <div>
                      <div className="font-medium">{transaction.merchant}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.date}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${transaction.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.amount}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{transaction.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "保证金":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">总保证金</h3>
                <div className="text-2xl font-bold">${currentData.totalMargin}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">已用保证金</h3>
                <div className="text-2xl font-bold">${currentData.usedMargin}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">可用保证金</h3>
                <div className="text-2xl font-bold">${currentData.availableMargin}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">保证金率</h3>
                <div className="text-2xl font-bold text-green-500">{currentData.marginLevel}</div>
              </div>
            </div>

            <div className={`${cardStyle} rounded-lg p-4`}>
              <h3 className="text-lg font-semibold mb-4">保证金仓位</h3>
              <div className="space-y-4">
                {currentData.positions.map((position, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 ${isDark ? 'border-[#252842]' : 'border-gray-200'} border rounded-lg`}>
                    <div>
                      <div className="font-medium">{position.pair}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>杠杆: {position.leverage}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${position.margin}</div>
                      <div className="text-sm text-green-500">{position.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return <div>内容加载中...</div>
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#1a1d29]' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-4 space-y-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 p-1 bg-gray-200 dark:bg-[#252842] rounded-lg">
          {walletTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#00D4AA] text-white shadow-sm"
                    : isDark
                      ? "text-gray-300 hover:text-white hover:bg-[#2a2d42]"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  )
}