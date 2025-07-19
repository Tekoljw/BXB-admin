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

  const walletData = {
    钱包: {
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
    担保: {
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

  const renderTabContent = () => {
    const currentData = walletData[activeTab as keyof typeof walletData]

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
        );
      
      case "合约账户":
        return (
          <div className="space-y-6">
            <div className={`${cardStyle} bg-gradient-to-br from-[#00D4AA]/10 to-[#00D4AA]/5 border-[#00D4AA]/20 rounded-lg p-4`}>
                {!loadingSteps.balance ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <SkeletonLoader height="h-4" width="w-16" />
                      <SkeletonLoader height="h-4" width="w-4" variant="circle" />
                    </div>
                    <SkeletonLoader height="h-8" width="w-24" />
                    <SkeletonLoader height="h-3" width="w-12" />
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>

              <div className={`${cardStyle} rounded-lg p-4`}>
                {!loadingSteps.balance ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <SkeletonLoader height="h-4" width="w-16" />
                      <SkeletonLoader height="h-4" width="w-4" variant="circle" />
                    </div>
                    <SkeletonLoader height="h-8" width="w-24" />
                    <SkeletonLoader height="h-3" width="w-12" />
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>

              <div className={`${cardStyle} rounded-lg p-4`}>
                {!loadingSteps.balance ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <SkeletonLoader height="h-4" width="w-16" />
                      <SkeletonLoader height="h-4" width="w-4" variant="circle" />
                    </div>
                    <SkeletonLoader height="h-8" width="w-24" />
                    <SkeletonLoader height="h-3" width="w-12" />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="text-sm font-medium">今日盈亏</h3>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {balanceVisible ? "+234.56" : "****"}
                      </div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+2.1%</p>
                    </div>
                  </>
                )}
              </div>

              <div className={`${cardStyle} rounded-lg p-4`}>
                {!loadingSteps.balance ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <SkeletonLoader height="h-4" width="w-16" />
                      <SkeletonLoader height="h-4" width="w-4" variant="circle" />
                    </div>
                    <SkeletonLoader height="h-8" width="w-24" />
                    <SkeletonLoader height="h-3" width="w-12" />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <h3 className="text-sm font-medium">总盈亏</h3>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {balanceVisible ? "+1,234.56" : "****"}
                      </div>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>+11.2%</p>
                    </div>
                  </>
                )}
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

          {/* Mobile Content */}
          <div className={`transition-all duration-300 transform ${
            isAnimating 
              ? 'translate-x-4 opacity-0 scale-95' 
              : 'translate-x-0 opacity-100 scale-100'
          }`}>
            {renderTabContent()}
          </div>
        </div>
      ) : (
        /* Desktop Layout - Left Sidebar */
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <div className={`w-64 ${isDark ? 'bg-[#1a1c2e]' : 'bg-white'} border-r ${isDark ? 'border-[#3a3d4a]' : 'border-gray-200'} flex flex-col`}>
            <nav className="flex-1 px-3 pt-6">
              <div className="space-y-1">
                {walletTabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform border ${
                        activeTab === tab.id
                          ? "border-[#00D4AA] text-[#00D4AA] bg-[#00D4AA]/5 shadow-sm scale-105"
                          : isDark
                            ? "border-transparent text-gray-300 hover:text-white hover:bg-[#2a2d42] hover:scale-102"
                            : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:scale-102"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              <div className={`transition-all duration-300 transform ${
                isAnimating 
                  ? 'translate-x-8 opacity-0 scale-95' 
                  : 'translate-x-0 opacity-100 scale-100'
              }`}>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}