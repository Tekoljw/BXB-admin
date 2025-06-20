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
import { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import SkeletonLoader from "@/components/skeleton-loader"

export default function WalletPage() {
  const { theme } = useTheme()
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [activeTab, setActiveTab] = useState("钱包总览")
  const [overviewMode, setOverviewMode] = useState("现金账户") // "现金账户" or "总资产"
  const [selectedCurrency, setSelectedCurrency] = useState("USDT")
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [loadingSteps, setLoadingSteps] = useState({
    balance: false,
    assets: false,
    transactions: false,
    charts: false
  })
  const [isPageLoading, setIsPageLoading] = useState(true)
  const isDark = theme === "dark"

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setIsAnimating(false)
      // Reset loading state for new tab
      startStepLoading()
    }, 150)
  }

  const startStepLoading = () => {
    setIsPageLoading(true)
    setLoadingSteps({
      balance: false,
      assets: false,
      transactions: false,
      charts: false
    })

    // Step 1: Balance info
    setTimeout(() => {
      setLoadingSteps(prev => ({ ...prev, balance: true }))
    }, 200)

    // Step 2: Assets
    setTimeout(() => {
      setLoadingSteps(prev => ({ ...prev, assets: true }))
    }, 600)

    // Step 3: Transactions
    setTimeout(() => {
      setLoadingSteps(prev => ({ ...prev, transactions: true }))
    }, 1000)

    // Step 4: Charts
    setTimeout(() => {
      setLoadingSteps(prev => ({ ...prev, charts: true }))
      setIsPageLoading(false)
    }, 1400)
  }

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Start loading animation on initial load
    startStepLoading()
  }, [])

  const walletTabs = [
    { id: "钱包总览", label: "钱包总览", icon: Wallet },
    { id: "合约账户", label: "合约账户", icon: BarChart3 },
    { id: "理财账户", label: "理财账户", icon: PiggyBank },
    { id: "U卡账户", label: "U卡账户", icon: DollarSign },
    { id: "佣金账户", label: "佣金账户", icon: Gift },
    { id: "担保账户", label: "担保账户", icon: Shield }
  ]

  // 添加新的数据结构
  const accountsData = {
    现金账户: {
      balance: "8,567.89",
      currency: "USDT",
      currencies: [
        { symbol: "USDT", balance: "5,000.00", value: "5,000.00" },
        { symbol: "BTC", balance: "0.15", value: "2,500.00" },
        { symbol: "ETH", balance: "2.5", value: "1,067.89" }
      ]
    },
    总资产: {
      total: "19,134.34",
      accounts: [
        { name: "合约账户", balance: "3,456.78", icon: BarChart3 },
        { name: "理财账户", balance: "2,345.67", icon: PiggyBank },
        { name: "U卡账户", balance: "1,234.56", icon: DollarSign },
        { name: "佣金账户", balance: "567.89", icon: Gift },
        { name: "担保账户", balance: "5,000.00", icon: Shield }
      ]
    }
  }

  const walletData = {
    合约账户: {
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
    理财账户: {
      totalAssets: "2,345.67",
      totalEarnings: "+145.89",
      products: [
        { name: "USDT活期", amount: "1,000.00", apy: "3.5%", earnings: "+35.00" },
        { name: "BTC定期30天", amount: "0.05", apy: "5.2%", earnings: "+26.78" },
        { name: "ETH灵活理财", amount: "1.0", apy: "4.8%", earnings: "+84.11" }
      ]
    },
    佣金账户: {
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
    "U卡账户": {
      cardBalance: "1,234.56",
      cardLimit: "10,000.00",
      monthlySpent: "765.43",
      transactions: [
        { date: "2024-01-15", merchant: "Amazon", amount: "-89.99", status: "已完成" },
        { date: "2024-01-14", merchant: "餐厅消费", amount: "-45.67", status: "已完成" },
        { date: "2024-01-13", merchant: "充值", amount: "+500.00", status: "已完成" }
      ]
    },
    担保账户: {
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
    switch (activeTab) {
      case "钱包总览":
        return (
          <div className="space-y-6">
            {/* 主要卡片选择 */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 ${
              loadingSteps.balance ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              {/* 现金账户卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                  overviewMode === "现金账户" ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50" : ""
                }`}
                onClick={() => setOverviewMode("现金账户")}
              >
                {!loadingSteps.balance ? (
                  <div className="space-y-3">
                    <SkeletonLoader height="h-6" width="w-20" />
                    <SkeletonLoader height="h-8" width="w-32" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">现金账户</h3>
                      <CreditCard className="h-6 w-6 text-[#00D4AA]" />
                    </div>
                    <div className="text-3xl font-bold text-[#00D4AA]">
                      {balanceVisible ? `${accountsData.现金账户.balance} ${selectedCurrency}` : "****"}
                    </div>
                  </>
                )}
              </div>

              {/* 总资产卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                  overviewMode === "总资产" ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50" : ""
                }`}
                onClick={() => setOverviewMode("总资产")}
              >
                {!loadingSteps.balance ? (
                  <div className="space-y-3">
                    <SkeletonLoader height="h-6" width="w-20" />
                    <SkeletonLoader height="h-8" width="w-32" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">总资产</h3>
                      <Wallet className="h-6 w-6 text-[#00D4AA]" />
                    </div>
                    <div className="text-3xl font-bold text-[#00D4AA]">
                      {balanceVisible ? `${accountsData.总资产.total} USDT` : "****"}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 操作按钮区域（仅现金账户时显示） */}
            {overviewMode === "现金账户" && (
              <div className={`transition-all duration-500 ${
                loadingSteps.balance ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-12 bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    入金
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Minus className="h-4 w-4 mr-2" />
                    提币
                  </Button>
                  <Button variant="outline" className="h-12">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    买卖
                  </Button>
                  <Button variant="outline" className="h-12">
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    划转
                  </Button>
                </div>
              </div>
            )}

            {/* 详细内容区域 */}
            <div className={`transition-all duration-500 ${
              loadingSteps.assets ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              {overviewMode === "现金账户" ? (
                /* 现金账户模式：显示各币种余额 */
                <div className={`${cardStyle} rounded-lg p-6`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">币种资产</h3>
                    <select 
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className={`px-3 py-2 rounded-lg border text-sm ${
                        isDark 
                          ? "bg-[#252842] border-[#3a3d4a] text-white" 
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    >
                      <option value="USDT">USDT</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    {accountsData.现金账户.currencies.map((currency, index) => (
                      <div key={currency.symbol} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-[#3a3d4a]">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                            <span className="text-[#00D4AA] font-bold">{currency.symbol.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-semibold">{currency.symbol}</div>
                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {currency.symbol === 'BTC' ? 'Bitcoin' : currency.symbol === 'ETH' ? 'Ethereum' : 'Tether'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{balanceVisible ? currency.balance : "****"}</div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            ≈ ${balanceVisible ? currency.value : "****"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* 总资产模式：显示各账户分配 */
                <div className="space-y-6">
                  <div className={`${cardStyle} rounded-lg p-6`}>
                    <h3 className="text-lg font-semibold mb-6">账户分配</h3>
                    <div className="space-y-4">
                      {accountsData.总资产.accounts.map((account, index) => {
                        const IconComponent = account.icon
                        return (
                          <div key={account.name} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-[#3a3d4a] hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                                <IconComponent className="h-5 w-5 text-[#00D4AA]" />
                              </div>
                              <div>
                                <div className="font-semibold">{account.name}</div>
                                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {balanceVisible ? `${account.balance} USDT` : "****"}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                划转
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => setActiveTab(account.name)}
                              >
                                进入
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* 订单记录 */}
                  <div className={`${cardStyle} rounded-lg p-6`}>
                    <h3 className="text-lg font-semibold mb-6">最近记录</h3>
                    <div className="space-y-3">
                      {[
                        { type: "划转", from: "现金账户", to: "合约账户", amount: "1,000.00", time: "2024-01-15 14:30" },
                        { type: "入金", from: "银行卡", to: "现金账户", amount: "5,000.00", time: "2024-01-15 12:15" },
                        { type: "提币", from: "现金账户", to: "外部钱包", amount: "2,000.00", time: "2024-01-14 16:45" }
                      ].map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-[#3a3d4a]">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              record.type === "入金" ? "bg-green-100 text-green-600" :
                              record.type === "提币" ? "bg-red-100 text-red-600" :
                              "bg-blue-100 text-blue-600"
                            }`}>
                              {record.type === "入金" ? <Plus className="h-4 w-4" /> :
                               record.type === "提币" ? <Minus className="h-4 w-4" /> :
                               <ArrowUpRight className="h-4 w-4" />}
                            </div>
                            <div>
                              <div className="font-medium">{record.type}</div>
                              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {record.from} → {record.to}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{record.amount} USDT</div>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {record.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      
      case "合约账户":
        const contractData = walletData["合约账户"]
        return (
          <div className="space-y-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-500 ${
              loadingSteps.balance ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">总余额</h3>
                <div className="text-2xl font-bold">{balanceVisible ? `$${contractData.totalBalance}` : "****"}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">未实现盈亏</h3>
                <div className="text-2xl font-bold text-green-500">{balanceVisible ? contractData.unrealizedPnL : "****"}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">已用保证金</h3>
                <div className="text-2xl font-bold">{balanceVisible ? `$${contractData.marginUsed}` : "****"}</div>
              </div>
              <div className={`${cardStyle} rounded-lg p-4`}>
                <h3 className="text-sm font-medium mb-2">可用保证金</h3>
                <div className="text-2xl font-bold">{balanceVisible ? `$${contractData.marginAvailable}` : "****"}</div>
              </div>
            </div>
            
            <div className={`${cardStyle} rounded-lg p-6`}>
              <h3 className="text-lg font-semibold mb-4">当前持仓</h3>
              <div className="space-y-4">
                {contractData.positions.map((position, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-[#3a3d4a]">
                    <div>
                      <div className="font-medium">{position.symbol}</div>
                      <div className={`text-sm ${position.side === "多" ? "text-green-500" : "text-red-500"}`}>
                        {position.side} {position.size}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${position.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {position.pnl}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        保证金: ${position.margin}
                      </div>
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
      {isMobile ? (
        /* Mobile Layout - Top Tabs */
        <div className="container mx-auto p-4 space-y-6">
          {/* Mobile Tab Navigation */}
          <div className="flex flex-wrap gap-2 p-1 bg-gray-200 dark:bg-[#252842] rounded-lg">
            {walletTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 border ${
                    activeTab === tab.id
                      ? isDark
                        ? "border-white bg-white text-black shadow-sm"
                        : "border-[#00D4AA] text-[#00D4AA] bg-[#00D4AA]/5 shadow-sm"
                      : isDark
                        ? "border-transparent text-gray-300 hover:text-white hover:bg-[#2a2d42]"
                        : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Content */}
          <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {renderTabContent()}
          </div>
        </div>
      ) : (
        /* Desktop Layout - Side Tabs */
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="col-span-3">
              <div className={`${cardStyle} rounded-lg p-1`}>
                <div className="space-y-1">
                  {walletTabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 border ${
                          activeTab === tab.id
                            ? isDark
                              ? "border-white bg-white text-black shadow-sm"
                              : "border-[#00D4AA] text-[#00D4AA] bg-[#00D4AA]/5 shadow-sm"
                            : isDark
                              ? "border-transparent text-gray-300 hover:text-white hover:bg-[#2a2d42]"
                              : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9">
              <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}