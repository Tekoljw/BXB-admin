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
  TrendingDown,
  ArrowUp,
  ArrowDown,
  History,
  FileText,
  BarChart2,
  PieChart
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
  const [clickedAction, setClickedAction] = useState("") // 点击的操作按钮
  const [showCurrencyModal, setShowCurrencyModal] = useState(false) // 币种选择弹窗
  const [currencyModalAnimating, setCurrencyModalAnimating] = useState(false) // 币种弹窗动画状态
  const [showAssetModal, setShowAssetModal] = useState(false) // 资产管理弹窗
  const [showAddAssetModal, setShowAddAssetModal] = useState(false) // 添加资产弹窗
  const [addAssetModalAnimating, setAddAssetModalAnimating] = useState(false) // 添加资产弹窗动画状态
  const [currencyType, setCurrencyType] = useState("crypto") // "crypto" or "fiat"
  const [currencyTypeAnimating, setCurrencyTypeAnimating] = useState(false) // 币种类型切换动画
  const [addAssetStates, setAddAssetStates] = useState<{[key: string]: boolean}>({}) // 添加资产状态
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
  const [showPositionModal, setShowPositionModal] = useState(false) // 仓位分布弹窗
  const [positionModalAnimating, setPositionModalAnimating] = useState(false) // 仓位弹窗动画状态

  // 处理仓位分布弹窗
  const handlePositionModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!showPositionModal) {
      setShowPositionModal(true)
      setTimeout(() => setPositionModalAnimating(true), 50)
    }
  }

  const closePositionModal = () => {
    setPositionModalAnimating(false)
    setTimeout(() => setShowPositionModal(false), 300)
  }
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
        { name: "现金账户", balance: "8,567.89", icon: CreditCard, percentage: "44.8%" },
        { name: "合约账户", balance: "3,456.78", icon: BarChart3, percentage: "18.1%" },
        { name: "理财账户", balance: "2,345.67", icon: PiggyBank, percentage: "12.3%" },
        { name: "U卡账户", balance: "1,234.56", icon: DollarSign, percentage: "6.5%" },
        { name: "佣金账户", balance: "567.89", icon: Gift, percentage: "3.0%" },
        { name: "担保账户", balance: "5,000.00", icon: Shield, percentage: "26.1%" }
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

  // 打开币种选择弹窗
  const openCurrencyModal = () => {
    setShowCurrencyModal(true)
    setTimeout(() => setCurrencyModalAnimating(true), 10)
  }

  // 关闭币种选择弹窗
  const closeCurrencyModal = () => {
    setCurrencyModalAnimating(false)
    setTimeout(() => setShowCurrencyModal(false), 300)
  }

  // 处理币种选择弹窗点击
  const handleCurrencyModalClick = () => {
    openCurrencyModal()
  }

  // 打开添加资产弹窗
  const openAddAssetModal = () => {
    setShowAddAssetModal(true)
    setTimeout(() => setAddAssetModalAnimating(true), 10)
  }

  // 关闭添加资产弹窗
  const closeAddAssetModal = () => {
    setAddAssetModalAnimating(false)
    setTimeout(() => setShowAddAssetModal(false), 300)
  }

  // 排序切换动画 - 优化性能
  const handleSortChange = (newSortBy: string) => {
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy)
    }
  }

  // 切换添加资产状态
  const toggleAddAsset = (symbol: string) => {
    setAddAssetStates(prev => ({
      ...prev,
      [symbol]: !prev[symbol]
    }))
  }

  // 处理币种类型切换动画
  const handleCurrencyTypeChange = (newType: string) => {
    if (newType !== currencyType) {
      setCurrencyTypeAnimating(true)
      setTimeout(() => {
        setCurrencyType(newType)
        setCurrencyTypeAnimating(false)
      }, 150)
    }
  }

  // 处理操作按钮点击
  const handleActionClick = (action: string) => {
    setClickedAction(action)
    setTimeout(() => setClickedAction(""), 150)
    setSelectedAction(selectedAction === action ? "" : action)
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
                        onClick={handleCurrencyModalClick}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium border-2 border-black transition-all ${
                          isDark 
                            ? "bg-transparent text-white hover:bg-gray-800" 
                            : "bg-white text-black hover:bg-gray-50"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                          availableCurrencies.find(c => c.symbol === selectedDisplayCurrency)?.color || 'bg-gray-500'
                        }`}>
                          <span className="text-white">{selectedDisplayCurrency.charAt(0)}</span>
                        </div>
                        <span>{selectedDisplayCurrency}</span>
                        <ChevronDown className="h-3 w-3" />
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
                        onClick={handleCurrencyModalClick}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium border-2 border-black transition-all ${
                          isDark 
                            ? "bg-transparent text-white hover:bg-gray-800" 
                            : "bg-white text-black hover:bg-gray-50"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                          availableCurrencies.find(c => c.symbol === selectedDisplayCurrency)?.color || 'bg-gray-500'
                        }`}>
                          <span className="text-white">{selectedDisplayCurrency.charAt(0)}</span>
                        </div>
                        <span>{selectedDisplayCurrency}</span>
                        <ChevronDown className="h-3 w-3" />
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
                <div className="flex flex-col md:flex-row gap-4">
                  {/* 主要操作按钮 - 自动适配屏幕宽度 */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {actionButtons.map((button) => {
                      const Icon = button.icon
                      const isSelected = selectedAction === button.id
                      const isClicked = clickedAction === button.id
                      const isDeposit = button.id === "入金"
                      
                      return (
                        <Button 
                          key={button.id}
                          onClick={() => handleActionClick(button.id)}
                          onMouseDown={() => setClickedAction(button.id)}
                          onMouseUp={() => setClickedAction("")}
                          onMouseLeave={() => setClickedAction("")}
                          className={`h-12 transition-all duration-200 text-base font-bold ${
                            isClicked
                              ? "bg-[#00D4AA] text-white border-[#00D4AA]"
                              : isSelected 
                                ? "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]" 
                                : isDeposit
                                  ? "bg-[#00D4AA] text-white border-[#00D4AA] hover:bg-[#00D4AA]/90"
                                  : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                          }`}
                          variant={isSelected ? "outline" : isDeposit ? "default" : "outline"}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {button.label}
                        </Button>
                      )
                    })}
                  </div>
                  
                  {/* 记录按钮区域 - 右对齐 */}
                  <div className="flex justify-end md:justify-center gap-3">
                    {/* 资金记录按钮 */}
                    <Button
                      onClick={() => handleActionClick("fund-records")}
                      onMouseDown={() => setClickedAction("fund-records")}
                      onMouseUp={() => setClickedAction("")}
                      onMouseLeave={() => setClickedAction("")}
                      className={`h-12 w-12 transition-all duration-200 ${
                        clickedAction === "fund-records"
                          ? "bg-[#00D4AA] border-[#00D4AA]"
                          : selectedAction === "fund-records"
                            ? "bg-[#00D4AA]/10 border-[#00D4AA]"
                            : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                      }`}
                      variant="outline"
                      title="资金记录"
                    >
                      <FileText 
                        className={`h-4 w-4 transition-colors ${
                          clickedAction === "fund-records"
                            ? "text-white"
                            : selectedAction === "fund-records" 
                              ? "text-[#00D4AA]"
                              : "text-black dark:text-white"
                        }`} 
                      />
                    </Button>

                    {/* 订单记录按钮 */}
                    <Button
                      onClick={() => handleActionClick("order-records")}
                      onMouseDown={() => setClickedAction("order-records")}
                      onMouseUp={() => setClickedAction("")}
                      onMouseLeave={() => setClickedAction("")}
                      className={`h-12 w-12 transition-all duration-200 ${
                        clickedAction === "order-records"
                          ? "bg-[#00D4AA] border-[#00D4AA]"
                          : selectedAction === "order-records"
                            ? "bg-[#00D4AA]/10 border-[#00D4AA]"
                            : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                      }`}
                      variant="outline"
                      title="订单记录"
                    >
                      <BarChart2 
                        className={`h-4 w-4 transition-colors ${
                          clickedAction === "order-records"
                            ? "text-white"
                            : selectedAction === "order-records" 
                              ? "text-[#00D4AA]"
                              : "text-black dark:text-white"
                        }`} 
                      />
                    </Button>

                    {/* 仓位分布按钮 */}
                    <Button
                      onClick={handlePositionModalClick}
                      onMouseDown={() => setClickedAction("position-distribution")}
                      onMouseUp={() => setClickedAction("")}
                      onMouseLeave={() => setClickedAction("")}
                      className={`h-12 w-12 transition-all duration-200 ${
                        clickedAction === "position-distribution"
                          ? "bg-[#00D4AA] border-[#00D4AA]"
                          : selectedAction === "position-distribution"
                            ? "bg-[#00D4AA]/10 border-[#00D4AA]"
                            : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                      }`}
                      variant="outline"
                      title="仓位分布"
                    >
                      <PieChart 
                        className={`h-4 w-4 transition-colors ${
                          clickedAction === "position-distribution"
                            ? "text-white"
                            : selectedAction === "position-distribution" 
                              ? "text-[#00D4AA]"
                              : "text-black dark:text-white"
                        }`} 
                      />
                    </Button>
                  </div>
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
                        onClick={openAddAssetModal}
                        className={`w-10 h-10 rounded-lg border transition-all transform hover:scale-105 flex items-center justify-center ${
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
                            handleSortChange("value")
                            setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                          }}
                          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                            sortBy === "value"
                              ? "bg-black text-white"
                              : isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          按余额排序 {sortBy === "value" && (sortOrder === "desc" ? <ArrowDown className="inline h-3 w-3 ml-1" /> : <ArrowUp className="inline h-3 w-3 ml-1" />)}
                        </button>
                        <button
                          onClick={() => {
                            handleSortChange("marketCap")
                            setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                          }}
                          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                            sortBy === "marketCap"
                              ? "bg-black text-white"
                              : isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          按市值排序 {sortBy === "marketCap" && (sortOrder === "desc" ? <ArrowDown className="inline h-3 w-3 ml-1" /> : <ArrowUp className="inline h-3 w-3 ml-1" />)}
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
                <div className={`${cardStyle} rounded-lg p-6`}>
                  <div className="space-y-4">
                    {accountsData.总资产.accounts.map((account, index) => {
                      const IconComponent = account.icon
                      return (
                        <div key={account.name} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-[#3a3d4a] hover:shadow-md transition-all cursor-pointer">
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
                            <div className="flex flex-col items-end space-y-2">
                              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                {account.percentage}
                              </span>
                              <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-[#00D4AA] transition-all duration-500 ease-out ml-auto"
                                  style={{ width: account.percentage, marginLeft: `calc(100% - ${account.percentage})` }}
                                />
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-9 px-4 text-sm font-medium border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA]/10"
                              >
                                记录
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-9 px-4 text-sm font-medium border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA]/10"
                              >
                                划转
                              </Button>
                              <Button 
                                size="sm"
                                className="h-9 px-4 text-sm font-medium bg-black text-white hover:bg-gray-800"
                                onClick={() => setActiveTab(account.name)}
                              >
                                查看
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
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
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">总余额</h3>
                  <button
                    onClick={handleCurrencyModalClick}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border border-black transition-all ${
                      isDark 
                        ? "bg-transparent text-white hover:bg-gray-800" 
                        : "bg-white text-black hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full flex items-center justify-center text-xs font-bold ${
                      availableCurrencies.find(c => c.symbol === selectedDisplayCurrency)?.color || 'bg-gray-500'
                    }`}>
                      <span className="text-white text-[10px]">{selectedDisplayCurrency.charAt(0)}</span>
                    </div>
                    <span>{selectedDisplayCurrency}</span>
                    <ChevronDown className="h-2 w-2" />
                  </button>
                </div>
                <div className="text-2xl font-bold">{balanceVisible ? `${convertBalance(contractData.totalBalance, "USDT", selectedDisplayCurrency)} ${selectedDisplayCurrency}` : "****"}</div>
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
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              currencyModalAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            onClick={closeCurrencyModal}
          />
          {/* 侧边栏 */}
          <div className={`absolute right-0 top-0 h-full w-80 max-w-[90vw] ${cardStyle} transform transition-transform duration-300 ease-out ${
            currencyModalAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="p-6 h-full overflow-y-auto">
              {/* 币种类型切换 */}
              <div className="flex justify-center mb-6">
                <div className={`flex rounded-full p-1 ${isDark ? 'bg-[#2a2d42]' : 'bg-gray-100'}`}>
                  <button
                    onClick={() => handleCurrencyTypeChange("crypto")}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 transform ${
                      currencyType === "crypto"
                        ? "bg-black text-white scale-105"
                        : isDark ? "text-gray-400 hover:text-white hover:scale-105" : "text-gray-600 hover:text-black hover:scale-105"
                    }`}
                  >
                    加密货币
                  </button>
                  <button
                    onClick={() => handleCurrencyTypeChange("fiat")}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 transform ${
                      currencyType === "fiat"
                        ? "bg-black text-white scale-105"
                        : isDark ? "text-gray-400 hover:text-white hover:scale-105" : "text-gray-600 hover:text-black hover:scale-105"
                    }`}
                  >
                    法币
                  </button>
                </div>
              </div>
              <div className={`space-y-3 transition-all duration-300 ${currencyTypeAnimating ? 'opacity-50 transform translate-x-2' : 'opacity-100 transform translate-x-0'}`}>
                {(currencyType === "crypto" ? availableCurrencies : [
                  { symbol: "USD", name: "美元", color: "bg-green-500" },
                  { symbol: "EUR", name: "欧元", color: "bg-blue-500" },
                  { symbol: "CNY", name: "人民币", color: "bg-red-500" },
                  { symbol: "JPY", name: "日元", color: "bg-orange-500" },
                  { symbol: "GBP", name: "英镑", color: "bg-purple-500" },
                  { symbol: "KRW", name: "韩元", color: "bg-gray-500" }
                ]).map((currency) => (
                  <button
                    key={currency.symbol}
                    onClick={() => {
                      setSelectedDisplayCurrency(currency.symbol)
                      closeCurrencyModal()
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

      {/* 资产管理弹窗 - 从左侧滑出 */}
      {showAssetModal && (
        <div className="fixed inset-0 z-50">
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setShowAssetModal(false)}
          />
          {/* 侧边栏 */}
          <div className={`absolute left-0 top-0 h-full w-96 max-w-[90vw] ${cardStyle} transform transition-transform duration-300 ${
            showAssetModal ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">管理显示资产</h3>
                <button
                  onClick={() => setShowAssetModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                选择要在资产列表中显示的币种
              </p>
              
              {/* 可滚动的资产列表 */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-6">
                {accountsData.现金账户.currencies.map((currency) => (
                  <div
                    key={currency.symbol}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${
                      isDark ? 'border-[#3a3d4a] hover:border-[#00D4AA]/30' : 'border-gray-200 hover:border-[#00D4AA]/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                        <span className="text-[#00D4AA] font-bold">{currency.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{currency.symbol}</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {currency.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          ${currency.value}
                        </div>
                        {currency.marketCap && (
                          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            市值: {currency.marketCap}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => toggleAssetVisibility(currency.symbol)}
                        className={`w-12 h-6 rounded-full transition-all duration-200 ${
                          visibleAssets.includes(currency.symbol)
                            ? "bg-[#00D4AA]"
                            : isDark ? "bg-gray-600" : "bg-gray-300"
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                          visibleAssets.includes(currency.symbol) ? "translate-x-7" : "translate-x-1"
                        }`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 底部操作按钮 */}
              <div className="flex justify-between space-x-3 pt-4 border-t border-gray-200 dark:border-[#3a3d4a]">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVisibleAssets(accountsData.现金账户.currencies.map(c => c.symbol))}
                    className="text-sm"
                  >
                    全选
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVisibleAssets([])}
                    className="text-sm"
                  >
                    全不选
                  </Button>
                </div>
                <Button
                  onClick={() => setShowAssetModal(false)}
                  className="text-sm bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-white"
                >
                  完成
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 添加资产弹窗 - 从右侧滑出 */}
      {showAddAssetModal && (
        <div className="fixed inset-0 z-50">
          {/* 背景遮罩 */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              addAssetModalAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            onClick={closeAddAssetModal}
          />
          {/* 侧边栏 */}
          <div className={`absolute right-0 top-0 h-full w-96 max-w-[90vw] ${cardStyle} transform transition-transform duration-300 ease-out ${
            addAssetModalAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="p-6 h-full flex flex-col">
              
              {/* 搜索框 */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索币种..."
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm ${
                    isDark 
                      ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                />
              </div>

              {/* 可滚动的币种列表 */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-6">
                {[
                  { symbol: "DOGE", name: "Dogecoin", icon: "D", price: "$0.08" },
                  { symbol: "MATIC", name: "Polygon", icon: "M", price: "$0.75" },
                  { symbol: "DOT", name: "Polkadot", icon: "D", price: "$6.20" },
                  { symbol: "AVAX", name: "Avalanche", icon: "A", price: "$15.40" },
                  { symbol: "ATOM", name: "Cosmos", icon: "A", price: "$8.90" },
                  { symbol: "FTM", name: "Fantom", icon: "F", price: "$0.32" }
                ].map((currency) => (
                  <div
                    key={currency.symbol}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                      isDark ? 'border-[#3a3d4a] hover:border-[#00D4AA]/30' : 'border-gray-200 hover:border-[#00D4AA]/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                        <span className="text-[#00D4AA] font-bold">{currency.icon}</span>
                      </div>
                      <div>
                        <div className="font-medium">{currency.symbol}</div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {currency.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {currency.price}
                      </div>
                      <button
                        onClick={() => toggleAddAsset(currency.symbol)}
                        className={`w-12 h-6 rounded-full transition-all duration-200 ${
                          addAssetStates[currency.symbol] ? "bg-[#00D4AA]" : isDark ? "bg-gray-600" : "bg-gray-300"
                        }`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                          addAssetStates[currency.symbol] ? "translate-x-7" : "translate-x-1"
                        }`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 取消底部操作按钮 */}
            </div>
          </div>
        </div>
      )}

      {/* 仓位分布弹窗 */}
      {showPositionModal && (
        <div className="fixed inset-0 z-50">
          {/* 背景遮罩 */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              positionModalAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            onClick={closePositionModal}
          />
          {/* 弹窗内容 */}
          <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] ${cardStyle} rounded-lg transition-all duration-300 ease-out ${
            positionModalAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="p-6">
              {/* 标题 */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">仓位分布</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closePositionModal}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* 饼图区域 */}
              <div className="mb-6">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  {/* SVG 饼图 */}
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* USDT - 40% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="transparent"
                      stroke="#00D4AA"
                      strokeWidth="15"
                      strokeDasharray="75.4 188.5"
                      strokeDashoffset="0"
                    />
                    {/* BTC - 30% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="transparent"
                      stroke="#F7931A"
                      strokeWidth="15"
                      strokeDasharray="56.55 188.5"
                      strokeDashoffset="-75.4"
                    />
                    {/* ETH - 20% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="transparent"
                      stroke="#627EEA"
                      strokeWidth="15"
                      strokeDasharray="37.7 188.5"
                      strokeDashoffset="-131.95"
                    />
                    {/* 其他 - 10% */}
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="transparent"
                      stroke="#8B5CF6"
                      strokeWidth="15"
                      strokeDasharray="18.85 188.5"
                      strokeDashoffset="-169.65"
                    />
                  </svg>
                  
                  {/* 中心总值 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">总资产</div>
                      <div className="text-lg font-bold text-[#00D4AA]">$12,847</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 图例 */}
              <div className="space-y-3">
                {[
                  { symbol: "USDT", percentage: "40%", value: "$5,139", color: "#00D4AA" },
                  { symbol: "BTC", percentage: "30%", value: "$3,854", color: "#F7931A" },
                  { symbol: "ETH", percentage: "20%", value: "$2,569", color: "#627EEA" },
                  { symbol: "其他", percentage: "10%", value: "$1,285", color: "#8B5CF6" }
                ].map((item) => (
                  <div key={item.symbol} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.symbol}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-500">{item.percentage}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}