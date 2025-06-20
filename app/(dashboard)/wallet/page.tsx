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
  PiggyBank,
  Download,
  Upload,
  RefreshCw,
  ArrowLeftRight,
  ChevronDown,
  Search,
  Settings,
  X,
  Check,
  ArrowUpDown,
  TrendingDown
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
  const [selectedDisplayCurrency, setSelectedDisplayCurrency] = useState("USDT") // 卡片显示币种
  const [selectedAction, setSelectedAction] = useState("") // 选中的操作按钮
  const [showCurrencyModal, setShowCurrencyModal] = useState(false) // 币种选择弹窗
  const [showAssetModal, setShowAssetModal] = useState(false) // 资产管理弹窗
  const [searchTerm, setSearchTerm] = useState("") // 搜索关键词
  const [sortBy, setSortBy] = useState("value") // 排序方式：value, marketCap
  const [sortOrder, setSortOrder] = useState("desc") // 排序顺序：asc, desc
  const [visibleAssets, setVisibleAssets] = useState(["USDT", "BTC", "ETH", "BNB", "ADA", "SOL"]) // 可见资产
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

  // 币种汇率数据
  const exchangeRates = {
    USDT: 1,
    BTC: 0.000024,
    ETH: 0.00041,
    CNY: 7.2
  }

  // 添加新的数据结构
  const accountsData = {
    现金账户: {
      balance: "8,567.89",
      currency: "USDT",
      currencies: [
        { symbol: "USDT", balance: "5,000.00", value: "5,000.00", name: "Tether" },
        { symbol: "BTC", balance: "0.15", value: "2,500.00", name: "Bitcoin" },
        { symbol: "ETH", balance: "2.5", value: "1,067.89", name: "Ethereum" },
        { symbol: "BNB", balance: "15.2", value: "4,560.00", name: "Binance Coin", marketCap: "88.5B" },
        { symbol: "ADA", balance: "3,200.0", value: "1,280.00", name: "Cardano", marketCap: "15.2B" },
        { symbol: "SOL", balance: "8.5", value: "850.00", name: "Solana", marketCap: "45.8B" },
        { symbol: "DOT", balance: "120.0", value: "480.00", name: "Polkadot", marketCap: "8.9B" },
        { symbol: "MATIC", balance: "1,500.0", value: "600.00", name: "Polygon", marketCap: "9.4B" },
        { symbol: "AVAX", balance: "25.0", value: "750.00", name: "Avalanche", marketCap: "12.3B" },
        { symbol: "LINK", balance: "45.0", value: "540.00", name: "Chainlink", marketCap: "8.7B" },
        { symbol: "UNI", balance: "80.0", value: "400.00", name: "Uniswap", marketCap: "6.1B" }
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
  
  // 转换余额显示
  const convertBalance = (amount, fromCurrency, toCurrency) => {
    const numAmount = parseFloat(amount.replace(/,/g, ''))
    if (fromCurrency === toCurrency) return amount
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency]
    return (numAmount * rate).toLocaleString()
  }

  // 操作按钮配置
  const actionButtons = [
    { id: "入金", label: "入金", icon: Download, color: "green", bgColor: "bg-green-500", hoverColor: "hover:bg-green-600" },
    { id: "提币", label: "提币", icon: Upload, color: "red", bgColor: "bg-transparent", hoverColor: "hover:bg-gray-50" },
    { id: "买卖", label: "买卖", icon: RefreshCw, color: "blue", bgColor: "bg-transparent", hoverColor: "hover:bg-gray-50" },
    { id: "划转", label: "划转", icon: ArrowLeftRight, color: "purple", bgColor: "bg-transparent", hoverColor: "hover:bg-gray-50" }
  ]

  // 可选币种
  const availableCurrencies = [
    { symbol: "USDT", name: "Tether", color: "bg-green-500" },
    { symbol: "BTC", name: "Bitcoin", color: "bg-orange-500" },
    { symbol: "ETH", name: "Ethereum", color: "bg-blue-500" },
    { symbol: "CNY", name: "人民币", color: "bg-red-500" },
    { symbol: "USD", name: "美元", color: "bg-green-600" },
    { symbol: "EUR", name: "欧元", color: "bg-blue-600" }
  ]

  // 排序和过滤资产
  const getSortedAssets = () => {
    let assets = accountsData.现金账户.currencies.filter(asset => 
      visibleAssets.includes(asset.symbol) &&
      (asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
       asset.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    assets.sort((a, b) => {
      let aValue, bValue
      if (sortBy === "value") {
        aValue = parseFloat(a.value.replace(/,/g, ''))
        bValue = parseFloat(b.value.replace(/,/g, ''))
      } else if (sortBy === "marketCap") {
        aValue = parseFloat(a.marketCap?.replace(/[B,]/g, '') || "0")
        bValue = parseFloat(b.marketCap?.replace(/[B,]/g, '') || "0")
      }
      
      return sortOrder === "desc" ? bValue - aValue : aValue - bValue
    })

    return assets
  }

  // 切换资产可见性
  const toggleAssetVisibility = (symbol) => {
    setVisibleAssets(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    )
  }

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
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-6 w-6 text-[#00D4AA]" />
                        <h3 className="text-lg font-semibold">现金账户</h3>
                      </div>
                      <button
                        onClick={() => setShowCurrencyModal(true)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                          isDark 
                            ? "bg-[#252842] border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA] hover:text-black" 
                            : "bg-white border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA] hover:text-white"
                        }`}
                      >
                        {selectedDisplayCurrency}
                        <ChevronDown className="inline-block ml-1 h-3 w-3" />
                      </button>
                    </div>
                    <div className="text-3xl font-bold text-[#00D4AA]">
                      {balanceVisible ? `${convertBalance(accountsData.现金账户.balance, "USDT", selectedDisplayCurrency)} ${selectedDisplayCurrency}` : "****"}
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
                      <div className="flex items-center space-x-2">
                        <Wallet className="h-6 w-6 text-[#00D4AA]" />
                        <h3 className="text-lg font-semibold">总资产</h3>
                      </div>
                      <button
                        onClick={() => setShowCurrencyModal(true)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                          isDark 
                            ? "bg-[#252842] border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA] hover:text-black" 
                            : "bg-white border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA] hover:text-white"
                        }`}
                      >
                        {selectedDisplayCurrency}
                        <ChevronDown className="inline-block ml-1 h-3 w-3" />
                      </button>
                    </div>
                    <div className="text-3xl font-bold text-[#00D4AA]">
                      {balanceVisible ? `${convertBalance(accountsData.总资产.total, "USDT", selectedDisplayCurrency)} ${selectedDisplayCurrency}` : "****"}
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
                  {actionButtons.map((button) => {
                    const Icon = button.icon
                    const isSelected = selectedAction === button.id
                    const isDeposit = button.id === "入金"
                    
                    return (
                      <Button 
                        key={button.id}
                        onClick={() => setSelectedAction(isSelected ? "" : button.id)}
                        className={`h-12 transition-all duration-200 text-base font-bold ${
                          isSelected 
                            ? "bg-black text-white border-black hover:bg-gray-800" 
                            : isDeposit
                              ? "bg-[#00D4AA] text-white border-[#00D4AA] hover:bg-[#00D4AA]/90"
                              : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                        }`}
                        variant={isSelected ? "default" : isDeposit ? "default" : "outline"}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {button.label}
                      </Button>
                    )
                  })}
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
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="搜索币种..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                          isDark 
                            ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400" 
                            : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => setShowAssetModal(true)}
                        className={`p-2 rounded-lg border transition-all ${
                          isDark 
                            ? "border-[#3a3d4a] hover:bg-[#2a2d42]" 
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                        title="管理资产"
                      >
                        <div className="flex flex-col items-center">
                          <Plus className="h-3 w-3" />
                          <Minus className="h-3 w-3 -mt-1" />
                        </div>
                      </button>
                      <div className={`flex rounded-full p-1 ${isDark ? 'bg-[#2a2d42]' : 'bg-gray-100'}`}>
                        <button
                          onClick={() => {
                            setSortBy("value")
                            setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                          }}
                          className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                            sortBy === "value"
                              ? "bg-black text-white shadow-sm"
                              : isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          按余额排序 {sortBy === "value" && (sortOrder === "desc" ? <TrendingDown className="inline h-3 w-3 ml-1" /> : <TrendingUp className="inline h-3 w-3 ml-1" />)}
                        </button>
                        <button
                          onClick={() => {
                            setSortBy("marketCap")
                            setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                          }}
                          className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                            sortBy === "marketCap"
                              ? "bg-black text-white shadow-sm"
                              : isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          按市值排序 {sortBy === "marketCap" && (sortOrder === "desc" ? <TrendingDown className="inline h-3 w-3 ml-1" /> : <TrendingUp className="inline h-3 w-3 ml-1" />)}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {getSortedAssets().map((currency, index) => (
                      <div key={currency.symbol} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-[#3a3d4a] hover:shadow-md transition-all">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                            <span className="text-[#00D4AA] font-bold">{currency.symbol.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-semibold">{currency.symbol}</div>
                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {currency.name}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{balanceVisible ? currency.balance : "****"}</div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            ≈ ${balanceVisible ? convertBalance(currency.value, "USDT", selectedDisplayCurrency) : "****"} {selectedDisplayCurrency}
                          </div>
                          {currency.marketCap && (
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              市值: {currency.marketCap}
                            </div>
                          )}
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

      {/* 币种选择弹窗 - 从右侧滑出 */}
      {showCurrencyModal && (
        <div className="fixed inset-0 z-50">
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setShowCurrencyModal(false)}
          />
          {/* 侧边栏 */}
          <div className={`absolute right-0 top-0 h-full w-80 max-w-[90vw] ${cardStyle} transform transition-transform duration-300 ${
            showCurrencyModal ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">选择显示币种</h3>
                <button
                  onClick={() => setShowCurrencyModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3">
                {availableCurrencies.map((currency) => (
                  <button
                    key={currency.symbol}
                    onClick={() => {
                      setSelectedDisplayCurrency(currency.symbol)
                      setShowCurrencyModal(false)
                    }}
                    className={`w-full flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                      selectedDisplayCurrency === currency.symbol
                        ? "border-[#00D4AA] bg-[#00D4AA]/10"
                        : isDark
                          ? "border-[#3a3d4a] hover:border-[#00D4AA]/50 hover:bg-[#2a2d42]"
                          : "border-gray-200 hover:border-[#00D4AA]/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full ${currency.color} flex items-center justify-center`}>
                      <span className="text-white font-bold">{currency.symbol.charAt(0)}</span>
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-medium">{currency.symbol}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {currency.name}
                      </div>
                    </div>
                    {selectedDisplayCurrency === currency.symbol && (
                      <Check className="h-5 w-5 text-[#00D4AA]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 资产管理弹窗 */}
      {showAssetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardStyle} rounded-lg p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">管理显示资产</h3>
              <button
                onClick={() => setShowAssetModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              选择要在资产列表中显示的币种
            </p>
            <div className="space-y-3">
              {accountsData.现金账户.currencies.map((currency) => (
                <div
                  key={currency.symbol}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    isDark ? 'border-[#3a3d4a]' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                      <span className="text-[#00D4AA] font-bold text-sm">{currency.symbol.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium">{currency.symbol}</div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {currency.name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      ${currency.value}
                    </span>
                    <button
                      onClick={() => toggleAssetVisibility(currency.symbol)}
                      className={`w-12 h-6 rounded-full transition-all ${
                        visibleAssets.includes(currency.symbol)
                          ? "bg-[#00D4AA]"
                          : isDark ? "bg-gray-600" : "bg-gray-300"
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-all ${
                        visibleAssets.includes(currency.symbol) ? "translate-x-7" : "translate-x-1"
                      }`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setVisibleAssets(accountsData.现金账户.currencies.map(c => c.symbol))}
                className="text-sm"
              >
                全选
              </Button>
              <Button
                variant="outline"
                onClick={() => setVisibleAssets([])}
                className="text-sm"
              >
                全不选
              </Button>
              <Button
                onClick={() => setShowAssetModal(false)}
                className="text-sm bg-[#00D4AA] hover:bg-[#00D4AA]/90"
              >
                完成
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}