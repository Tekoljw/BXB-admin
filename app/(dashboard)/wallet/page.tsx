"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
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
  PieChart,
  ShoppingCart,
  LineChart,
  Banknote,
  Percent,
  CreditCard as CardIcon,
  Clock,
  CheckCircle,
  Calendar
} from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import SkeletonLoader from "@/components/skeleton-loader"

export default function WalletPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [topLevelTab, setTopLevelTab] = useState("账户资产") // "账户资产" or "订单记录"
  const [activeTab, setActiveTab] = useState("钱包总览")
  const [orderTab, setOrderTab] = useState("现货订单") // 订单记录子页签
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
  // 移除加载动画状态
  const [showPositionModal, setShowPositionModal] = useState(false) // 仓位分布弹窗
  const [positionModalAnimating, setPositionModalAnimating] = useState(false) // 仓位弹窗动画状态
  const [showTransferModal, setShowTransferModal] = useState(false) // 划转弹窗
  const [transferModalAnimating, setTransferModalAnimating] = useState(false) // 划转弹窗动画状态
  const [transferFrom, setTransferFrom] = useState("现货账户") // 划转来源账户
  const [transferTo, setTransferTo] = useState("合约账户") // 划转目标账户
  const [transferCurrency, setTransferCurrency] = useState("USDT") // 划转币种
  const [transferAmount, setTransferAmount] = useState("") // 划转金额

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

  // 处理划转弹窗
  const handleTransferClick = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!showTransferModal) {
      setShowTransferModal(true)
      setTimeout(() => setTransferModalAnimating(true), 50)
    }
  }

  const closeTransferModal = () => {
    setTransferModalAnimating(false)
    setTimeout(() => setShowTransferModal(false), 300)
  }

  // 交换划转账户
  const swapTransferAccounts = () => {
    const temp = transferFrom
    setTransferFrom(transferTo)
    setTransferTo(temp)
  }
  // 移除页面加载状态
  const isDark = theme === "dark"

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveTab(tabId)
      setIsAnimating(false)
    }, 150)
  }

  // 移除加载函数

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 移除初始加载动画

  const walletTabs = [
    { id: "钱包总览", label: "钱包总览", icon: Wallet },
    { id: "合约账户", label: "合约账户", icon: BarChart3 },
    { id: "理财账户", label: "理财账户", icon: PiggyBank },
    { id: "U卡账户", label: "U卡账户", icon: DollarSign },
    { id: "佣金账户", label: "佣金账户", icon: Gift },
    { id: "担保账户", label: "担保账户", icon: Shield }
  ]

  const orderTabs = [
    { id: "现货订单", label: "现货订单", icon: ShoppingCart },
    { id: "合约订单", label: "合约订单", icon: LineChart },
    { id: "理财订单", label: "理财订单", icon: PiggyBank },
    { id: "U卡订单", label: "U卡订单", icon: CardIcon },
    { id: "佣金记录", label: "佣金记录", icon: Percent },
    { id: "担保记录", label: "担保记录", icon: Shield },
    { id: "充提币记录", label: "充提币记录", icon: ArrowUpDown },
    { id: "划转记录", label: "划转记录", icon: ArrowLeftRight },
    { id: "USDT买卖记录", label: "USDT买卖记录", icon: Banknote }
  ]

  // 币种汇率数据
  const exchangeRates = {
    USDT: 1,
    BTC: 0.000024,
    ETH: 0.00041,
    CNY: 7.2
  }

  // 订单记录数据
  const orderRecordsData = {
    "现货订单": [
      {
        id: "SP001",
        pair: "BTC/USDT",
        type: "买入",
        side: "限价",
        price: "67,234.56",
        amount: "0.001",
        filled: "0.001",
        total: "67.23",
        status: "已完成",
        time: "2024-01-15 14:25:30",
        fee: "0.0675 USDT"
      },
      {
        id: "SP002", 
        pair: "ETH/USDT",
        type: "卖出",
        side: "市价",
        price: "3,456.78",
        amount: "0.1",
        filled: "0.1",
        total: "345.68",
        status: "已完成",
        time: "2024-01-15 13:45:20",
        fee: "0.346 USDT"
      },
      {
        id: "SP003",
        pair: "BNB/USDT", 
        type: "买入",
        side: "限价",
        price: "320.50",
        amount: "1.0",
        filled: "0.5",
        total: "160.25",
        status: "部分成交",
        time: "2024-01-15 12:30:15",
        fee: "0.160 USDT"
      }
    ],
    "合约订单": [
      {
        id: "FU001",
        pair: "BTCUSDT",
        type: "开多",
        side: "限价",
        price: "67,150.00",
        amount: "0.01",
        filled: "0.01",
        leverage: "10x",
        margin: "67.15",
        status: "已完成",
        time: "2024-01-15 15:10:45",
        pnl: "+12.50"
      },
      {
        id: "FU002",
        pair: "ETHUSDT",
        type: "开空",
        side: "市价",
        price: "3,400.00",
        amount: "0.1", 
        filled: "0.1",
        leverage: "5x",
        margin: "68.00",
        status: "已完成",
        time: "2024-01-15 14:55:30",
        pnl: "-5.60"
      }
    ],
    "理财订单": [
      {
        id: "FI001",
        product: "USDT活期理财",
        type: "申购",
        amount: "1,000.00",
        apy: "8.5%",
        duration: "活期",
        status: "收益中",
        time: "2024-01-10 09:30:00",
        earned: "1.15 USDT"
      },
      {
        id: "FI002",
        product: "BTC定期理财",
        type: "申购", 
        amount: "0.01 BTC",
        apy: "6.2%",
        duration: "30天",
        status: "收益中",
        time: "2024-01-05 16:20:15",
        earned: "0.000051 BTC"
      }
    ],
    "U卡订单": [
      {
        id: "UC001",
        type: "消费",
        merchant: "Amazon",
        amount: "89.99",
        currency: "USD",
        status: "已完成",
        time: "2024-01-15 18:45:30",
        cardNumber: "****1234"
      },
      {
        id: "UC002",
        type: "充值",
        amount: "500.00",
        currency: "USDT",
        status: "已完成", 
        time: "2024-01-14 10:20:15",
        cardNumber: "****1234"
      }
    ],
    "佣金记录": [
      {
        id: "CM001",
        type: "推荐佣金",
        user: "用户A",
        amount: "+15.67 USDT",
        rate: "20%",
        source: "现货交易",
        status: "已发放",
        time: "2024-01-15 16:30:00"
      },
      {
        id: "CM002",
        type: "返佣奖励",
        user: "用户B",
        amount: "+8.32 USDT", 
        rate: "15%",
        source: "合约交易",
        status: "已发放",
        time: "2024-01-15 14:20:45"
      }
    ],
    "担保记录": [
      {
        id: "GR001",
        type: "担保交易",
        pair: "BTC/USDT",
        amount: "0.001 BTC",
        guaranteeFee: "0.50 USDT",
        status: "交易完成",
        time: "2024-01-15 15:30:20",
        counterparty: "用户***456"
      },
      {
        id: "GR002",
        type: "保证金冻结",
        amount: "100.00 USDT",
        reason: "担保交易保证金",
        status: "已解冻",
        time: "2024-01-15 13:15:10"
      }
    ],
    "充提币记录": [
      {
        id: "DW001",
        type: "充币",
        currency: "BTC",
        amount: "+0.01",
        address: "bc1q...xyz",
        txHash: "abc123...def",
        status: "已确认",
        time: "2024-01-15 12:45:30",
        confirmations: "6/6"
      },
      {
        id: "DW002",
        type: "提币",
        currency: "USDT",
        amount: "-500.00",
        address: "0x123...abc",
        txHash: "def456...ghi",
        status: "已完成",
        time: "2024-01-14 20:30:15",
        fee: "1.00 USDT"
      }
    ],
    "划转记录": [
      {
        id: "TR001",
        type: "内部划转",
        from: "现货账户",
        to: "合约账户",
        currency: "USDT",
        amount: "1,000.00",
        status: "已完成",
        time: "2024-01-15 14:15:45"
      },
      {
        id: "TR002",
        type: "内部划转",
        from: "合约账户",
        to: "理财账户",
        currency: "USDT",
        amount: "500.00",
        status: "已完成",
        time: "2024-01-15 11:30:20"
      }
    ],
    "USDT买卖记录": [
      {
        id: "OTC001",
        type: "买入",
        amount: "1,000.00 USDT",
        price: "7.20 CNY",
        total: "7,200.00 CNY",
        method: "银行卡",
        status: "已完成",
        time: "2024-01-15 16:45:30",
        merchant: "商户A"
      },
      {
        id: "OTC002",
        type: "卖出",
        amount: "500.00 USDT",
        price: "7.22 CNY",
        total: "3,610.00 CNY",
        method: "支付宝",
        status: "已完成",
        time: "2024-01-14 19:20:15",
        merchant: "商户B"
      }
    ]
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

  // 统一的卡片样式，参考行情页面 - 使用更浅的黑夜模式颜色
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
    { id: "交易", label: "交易", icon: RefreshCw, color: "blue", bgColor: "bg-transparent", hoverColor: "hover:bg-gray-50" },
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
    
    if (action === "划转" || action === "transfer") {
      handleTransferClick()
    } else if (action === "交易") {
      // 现金账户的交易按钮跳转到现货交易页面
      router.push("/spot-trading")
    } else if (action === "trade") {
      // 合约账户的交易按钮跳转到合约交易页面
      router.push("/usdt-trade")
    } else {
      setSelectedAction(selectedAction === action ? "" : action)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "钱包总览":
        return (
          <div className="space-y-6">
            {/* 主要卡片选择 - 增强动画效果 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 现金账户卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-6 cursor-pointer transform transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 ${
                  overviewMode === "现金账户" 
                    ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50 shadow-lg scale-102" 
                    : "hover:shadow-lg"
                }`}
                onClick={() => setOverviewMode("现金账户")}
              >
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
              </div>

              {/* 总资产卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-6 cursor-pointer transform transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 ${
                  overviewMode === "总资产" 
                    ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50 shadow-lg scale-102" 
                    : "hover:shadow-lg"
                }`}
                onClick={() => setOverviewMode("总资产")}
              >
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
              </div>
            </div>

            {/* 操作按钮区域（仅现金账户时显示） */}
            {overviewMode === "现金账户" && (
              <div className="transform transition-all duration-300 ease-out">
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
            <div className="transition-all duration-300">
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
                            ? "border-[#252842] hover:bg-[#252842]" 
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                        title="管理资产"
                      >
                        <div className="flex flex-col items-center">
                          <Plus className="h-3 w-3" />
                          <Minus className="h-3 w-3 -mt-1" />
                        </div>
                      </button>
                      <div className={`flex rounded-full p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-100'}`}>
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
            {/* 六个卡片布局 - 两排三列，增强动画效果 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 第一排 */}
              <div className={`${cardStyle} rounded-lg p-4 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">总余额</h3>
                  <button
                    onClick={handleCurrencyModalClick}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border border-black transition-all duration-300 hover:scale-105 ${
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
                <div className="text-2xl font-bold transition-all duration-500">
                  {balanceVisible ? convertBalance(contractData.totalBalance, "USDT", selectedDisplayCurrency) : "****"}
                </div>
              </div>
              
              <div className={`${cardStyle} rounded-lg p-4 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl`}>
                <h3 className="text-sm font-medium mb-2">净资产</h3>
                <div className="text-2xl font-bold text-[#00D4AA] transition-all duration-500">
                  {balanceVisible ? convertBalance("8,734.56", "USDT", selectedDisplayCurrency) : "****"}
                </div>
              </div>
              
              <div className={`${cardStyle} rounded-lg p-4 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl`}>
                <h3 className="text-sm font-medium mb-2">未实现盈亏</h3>
                <div className="text-2xl font-bold text-green-500 transition-all duration-500">
                  {balanceVisible ? contractData.unrealizedPnL : "****"}
                </div>
              </div>
              
              {/* 第二排 */}
              <div className={`${cardStyle} rounded-lg p-4 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl`}>
                <h3 className="text-sm font-medium mb-2">已实现盈亏</h3>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">今日</span>
                    <span className="text-sm font-bold text-green-500 transition-all duration-300">+123.45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">本月</span>
                    <span className="text-sm font-bold text-red-500 transition-all duration-300">-234.56</span>
                  </div>
                </div>
              </div>
              
              <div className={`${cardStyle} rounded-lg p-4 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl`}>
                <h3 className="text-sm font-medium mb-2">已用保证金</h3>
                <div className="text-2xl font-bold transition-all duration-500">
                  {balanceVisible ? convertBalance(contractData.marginUsed, "USDT", selectedDisplayCurrency) : "****"}
                </div>
              </div>
              
              <div className={`${cardStyle} rounded-lg p-4 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl`}>
                <h3 className="text-sm font-medium mb-2">可用保证金</h3>
                <div className="text-2xl font-bold transition-all duration-500">
                  {balanceVisible ? convertBalance(contractData.marginAvailable, "USDT", selectedDisplayCurrency) : "****"}
                </div>
              </div>
            </div>

            {/* 操作按钮区域 */}
            <div className="transform transition-all duration-300 ease-out">
              <div className="flex flex-col md:flex-row gap-4">
                {/* 主要操作按钮 */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: "current-positions", label: "当前持仓", icon: BarChart2 },
                    { id: "account-balance", label: "账户余额", icon: Wallet },
                    { id: "transfer", label: "划转", icon: ArrowLeftRight },
                    { id: "trade", label: "交易", icon: TrendingUp }
                  ].map((button) => {
                    const Icon = button.icon
                    const isSelected = selectedAction === button.id
                    const isClicked = clickedAction === button.id
                    
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
                              : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                        }`}
                        variant="outline"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {button.label}
                      </Button>
                    )
                  })}
                </div>
                
                {/* 记录按钮区域 */}
                <div className="flex justify-end md:justify-center gap-3">
                  {/* 资金记录按钮 */}
                  <Button
                    onClick={() => handleActionClick("contract-fund-records")}
                    onMouseDown={() => setClickedAction("contract-fund-records")}
                    onMouseUp={() => setClickedAction("")}
                    onMouseLeave={() => setClickedAction("")}
                    className={`h-12 w-12 transition-all duration-200 ${
                      clickedAction === "contract-fund-records"
                        ? "bg-[#00D4AA] border-[#00D4AA]"
                        : selectedAction === "contract-fund-records"
                          ? "bg-[#00D4AA]/10 border-[#00D4AA]"
                          : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                    }`}
                    variant="outline"
                    title="资金记录"
                  >
                    <FileText 
                      className={`h-4 w-4 transition-colors ${
                        clickedAction === "contract-fund-records"
                          ? "text-white"
                          : selectedAction === "contract-fund-records" 
                            ? "text-[#00D4AA]"
                            : "text-black dark:text-white"
                      }`} 
                    />
                  </Button>

                  {/* 交易记录按钮 */}
                  <Button
                    onClick={() => handleActionClick("contract-trade-records")}
                    onMouseDown={() => setClickedAction("contract-trade-records")}
                    onMouseUp={() => setClickedAction("")}
                    onMouseLeave={() => setClickedAction("")}
                    className={`h-12 w-12 transition-all duration-200 ${
                      clickedAction === "contract-trade-records"
                        ? "bg-[#00D4AA] border-[#00D4AA]"
                        : selectedAction === "contract-trade-records"
                          ? "bg-[#00D4AA]/10 border-[#00D4AA]"
                          : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                    }`}
                    variant="outline"
                    title="交易记录"
                  >
                    <BarChart2 
                      className={`h-4 w-4 transition-colors ${
                        clickedAction === "contract-trade-records"
                          ? "text-white"
                          : selectedAction === "contract-trade-records" 
                            ? "text-[#00D4AA]"
                            : "text-black dark:text-white"
                      }`} 
                    />
                  </Button>

                  {/* 仓位分布按钮 */}
                  <Button
                    onClick={() => setShowPositionModal(true)}
                    className={`h-12 w-12 transition-all duration-200 bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800`}
                    variant="outline"
                    title="仓位分布"
                  >
                    <PieChart className="h-4 w-4 text-black dark:text-white" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* 内容区域 - 根据选中的按钮显示不同内容 */}
            <div className={`${cardStyle} rounded-lg p-6`}>
              {selectedAction === "account-balance" ? (
                /* 账户余额界面 */
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-[#3a3d4a]' : 'border-gray-200'}`}>
                          <th className="text-left py-3 px-4 font-medium">币种</th>
                          <th className="text-right py-3 px-4 font-medium">账户余额</th>
                          <th className="text-right py-3 px-4 font-medium">未实现盈亏</th>
                          <th className="text-right py-3 px-4 font-medium">净资产余额</th>
                          <th className="text-right py-3 px-4 font-medium">保证金余额</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            symbol: "USDT",
                            name: "Tether USD",
                            accountBalance: "8,567.89",
                            unrealizedPnL: "+234.56",
                            netAssets: "8,802.45",
                            marginBalance: "2,500.00"
                          },
                          {
                            symbol: "BTC",
                            name: "Bitcoin",
                            accountBalance: "0.15234",
                            unrealizedPnL: "-45.67",
                            netAssets: "6,789.23",
                            marginBalance: "1,200.00"
                          },
                          {
                            symbol: "ETH",
                            name: "Ethereum",
                            accountBalance: "2.5678",
                            unrealizedPnL: "+123.45",
                            netAssets: "8,456.78",
                            marginBalance: "800.00"
                          },
                          {
                            symbol: "BNB",
                            name: "BNB",
                            accountBalance: "12.4567",
                            unrealizedPnL: "+67.89",
                            netAssets: "3,234.56",
                            marginBalance: "500.00"
                          }
                        ].map((currency, index) => (
                          <tr key={currency.symbol} className={`border-b ${isDark ? 'border-[#252842]' : 'border-gray-100'} hover:bg-gray-50 dark:hover:bg-[#252842]`}>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                                  <span className="text-[#00D4AA] font-bold text-sm">{currency.symbol.charAt(0)}</span>
                                </div>
                                <div>
                                  <div className="font-medium">{currency.symbol}</div>
                                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {currency.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="text-right py-4 px-4 font-medium">
                              {balanceVisible ? currency.accountBalance : "****"}
                            </td>
                            <td className={`text-right py-4 px-4 font-medium ${
                              currency.unrealizedPnL.startsWith('+') ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {balanceVisible ? currency.unrealizedPnL : "****"}
                            </td>
                            <td className="text-right py-4 px-4 font-medium text-[#00D4AA]">
                              {balanceVisible ? currency.netAssets : "****"}
                            </td>
                            <td className="text-right py-4 px-4 font-medium">
                              {balanceVisible ? currency.marginBalance : "****"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* 默认显示当前持仓 */
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
              )}
            </div>
          </div>
        )

      case "担保账户":
        return (
          <div className={`${cardStyle} rounded-lg p-6 space-y-6`}>
            {/* 页面标题 */}
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-8 w-8 text-[#00D4AA]" />
              <h1 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                担保账户
              </h1>
              <span className="px-2 py-1 text-xs bg-[#00D4AA] text-black rounded-full font-semibold">
                USDT ONLY
              </span>
            </div>

            {/* 担保账户卡片区域 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              
              {/* 应收担保金额 */}
              <Card 
                className={`${cardStyle} cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCard === "receivable" ? "ring-2 ring-[#00D4AA] ring-opacity-50" : ""
                }`}
                onClick={() => handleCardClick("receivable")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
                    <TrendingUp className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                    应收担保金额
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        1,234.56
                      </div>
                      <div className="text-xs text-[#00D4AA] font-medium">USDT</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    2 笔担保中
                  </div>
                </CardContent>
              </Card>

              {/* 应付担保金额 */}
              <Card 
                className={`${cardStyle} cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCard === "payable" ? "ring-2 ring-[#00D4AA] ring-opacity-50" : ""
                }`}
                onClick={() => handleCardClick("payable")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
                    <TrendingDown className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                    应付担保金额
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        987.65
                      </div>
                      <div className="text-xs text-[#00D4AA] font-medium">USDT</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    2 笔担保中
                  </div>
                </CardContent>
              </Card>

              {/* 信誉担保金额 */}
              <Card 
                className={`${cardStyle} ${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-50/50 border-gray-200/50'} relative opacity-75`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
                    <Shield className="h-4 w-4 mr-2 text-blue-400 dark:text-blue-500" />
                    信誉担保金额
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-2xl font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          5,000.00
                        </span>
                        <Button
                          size="sm"
                          className="h-6 w-6 p-0 bg-[#00D4AA] hover:bg-[#00B894] text-black rounded"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowAddCreditModal(true)
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-xs text-[#00D4AA]/60 font-medium">USDT</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    到期时间: 2024-03-15
                  </div>
                </CardContent>
              </Card>

              {/* 可用余额 - 不可点击 */}
              <Card className={`${cardStyle} ${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-50/50 border-gray-200/50'} relative opacity-75`}>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
                    可用余额
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
                      仅显示
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        2,456.78
                      </div>
                      <div className="text-xs text-[#00D4AA]/60 font-medium">USDT</div>
                    </div>
                    <div className="h-12 w-12 bg-[#00D4AA]/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-[#00D4AA]/60" />
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button
                      size="sm"
                      className="h-7 px-3 text-xs bg-[#00D4AA] hover:bg-[#00B894] text-black"
                      onClick={() => setShowTransferModal(true)}
                    >
                      <ArrowLeftRight className="h-3 w-3 mr-1" />
                      划转
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-3 text-xs"
                      onClick={() => router.push('/wallet?tab=order-records')}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      记录
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 详细内容区域 */}
            <div className={`${cardStyle} rounded-lg overflow-hidden`}>
              {renderGuaranteeContent()}
            </div>

            {/* 模态框 */}
            {showTransferModal && renderTransferModal()}
            {showAddCreditModal && renderAddCreditModal()}
            {showExtendTimeModal && renderExtendTimeModal()}
            {showContractModal && selectedContract && renderContractModal()}
          </div>
        )

      default:
        return <div>内容加载中...</div>
    }
  }

  // 担保账户相关状态和函数
  const [selectedCard, setSelectedCard] = useState("receivable")
  const [showAddCreditModal, setShowAddCreditModal] = useState(false)
  const [showExtendTimeModal, setShowExtendTimeModal] = useState(false)
  const [showContractModal, setShowContractModal] = useState(false)
  const [selectedContract, setSelectedContract] = useState(null)
  const [creditAmount, setCreditAmount] = useState("")
  const [extendDays, setExtendDays] = useState("30")

  const handleCardClick = (cardType: string) => {
    if (cardType !== "balance") {
      setSelectedCard(cardType)
    }
  }

  // 应收担保记录
  const receivableRecords = [
    {
      id: "RG001",
      amount: "500.00 USDT",
      counterparty: "用户***789",
      status: "担保中",
      startTime: "2024-01-15 10:30:00",
      estimatedRelease: "2024-01-20 10:30:00",
      contractId: "CT001",
      description: "BTC交易担保"
    },
    {
      id: "RG002", 
      amount: "734.56 USDT",
      counterparty: "用户***456",
      status: "担保中",
      startTime: "2024-01-14 15:20:00",
      estimatedRelease: "2024-01-19 15:20:00",
      contractId: "CT002",
      description: "ETH交易担保"
    }
  ]

  // 应付担保记录
  const payableRecords = [
    {
      id: "PG001",
      amount: "300.00 USDT",
      counterparty: "用户***123",
      status: "等待确认",
      startTime: "2024-01-16 09:15:00",
      estimatedRelease: "2024-01-21 09:15:00",
      contractId: "CT003",
      description: "USDT交易担保"
    },
    {
      id: "PG002",
      amount: "687.65 USDT", 
      counterparty: "用户***321",
      status: "担保中",
      startTime: "2024-01-13 16:45:00",
      estimatedRelease: "2024-01-18 16:45:00",
      contractId: "CT004",
      description: "多币种交易担保"
    }
  ]

  // 合同详情数据
  const contractDetails = {
    "CT001": {
      id: "CT001",
      title: "BTC交易担保合同",
      parties: {
        guarantor: "用户***789",
        beneficiary: "当前用户"
      },
      amount: "500.00 USDT",
      tradePair: "BTC/USDT",
      tradeAmount: "0.01 BTC",
      guaranteePeriod: "5天",
      terms: [
        "担保方需在交易完成后确认收货",
        "如有争议，平台将介入处理",
        "担保期内资金将被冻结",
        "双方同意遵守平台交易规则"
      ],
      createdTime: "2024-01-15 10:30:00",
      status: "执行中"
    },
    "CT002": {
      id: "CT002", 
      title: "ETH交易担保合同",
      parties: {
        guarantor: "用户***456",
        beneficiary: "当前用户"
      },
      amount: "734.56 USDT",
      tradePair: "ETH/USDT", 
      tradeAmount: "0.5 ETH",
      guaranteePeriod: "5天",
      terms: [
        "担保方需在交易完成后确认收货",
        "如有争议，平台将介入处理", 
        "担保期内资金将被冻结",
        "双方同意遵守平台交易规则"
      ],
      createdTime: "2024-01-14 15:20:00",
      status: "执行中"
    }
  }

  const handleViewContract = (contractId: string) => {
    setSelectedContract(contractDetails[contractId])
    setShowContractModal(true)
  }

  const handleTransfer = () => {
    console.log("划转金额:", transferAmount)
    setShowTransferModal(false)
    setTransferAmount("")
  }

  const handleAddCredit = () => {
    console.log("添加信誉担保:", creditAmount)
    setShowAddCreditModal(false)
    setCreditAmount("")
  }

  const handleExtendTime = () => {
    console.log("延长天数:", extendDays)
    setShowExtendTimeModal(false)
    setExtendDays("30")
  }

  // 渲染担保内容
  const renderGuaranteeContent = () => {
    switch (selectedCard) {
      case "receivable":
        return (
          <div>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                应收担保记录
              </h3>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                当前正在担保中的资金，一旦解除担保，您将收到这些资金
              </p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {receivableRecords.map((record) => (
                <div key={record.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {record.amount}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {record.status}
                        </span>
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div>对方用户: {record.counterparty}</div>
                        <div>交易描述: {record.description}</div>
                        <div>开始时间: {record.startTime}</div>
                        <div>预计解除: {record.estimatedRelease}</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewContract(record.contractId)}
                      className="ml-4"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      查看合同
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "payable":
        return (
          <div>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                应付担保记录
              </h3>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                您需要向对方支付的担保资金，等待对方确认后解除
              </p>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {payableRecords.map((record) => (
                <div key={record.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {record.amount}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === "等待确认" 
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }`}>
                          {record.status}
                        </span>
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div>对方用户: {record.counterparty}</div>
                        <div>交易描述: {record.description}</div>
                        <div>开始时间: {record.startTime}</div>
                        <div>预计解除: {record.estimatedRelease}</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewContract(record.contractId)}
                      className="ml-4"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      查看合同
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "credit":
        return (
          <div>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                信誉担保设置
              </h3>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                通过添加信誉担保金额提升您的交易信誉度
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      当前信誉担保金额
                    </span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    5,000.00 USDT
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      到期时间
                    </span>
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    2024-03-15
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  信誉担保金额越高，您在平台的信誉度越高，更容易获得其他用户的信任
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setShowAddCreditModal(true)}
                    className="bg-[#00D4AA] hover:bg-[#00B894] text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    添加担保金额
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowExtendTimeModal(true)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    延长有效期
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return <div>请选择一个功能卡片</div>
    }
  }

  // 渲染模态框
  const renderTransferModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${cardStyle} rounded-lg w-full max-w-md`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              资金划转
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTransferModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                划转金额 (USDT)
              </label>
              <input
                type="text"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="请输入划转金额"
                className={`w-full px-3 py-2 border rounded-lg ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleTransfer}
                className="flex-1 bg-[#00D4AA] hover:bg-[#00B894] text-black"
              >
                确认划转
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTransferModal(false)}
                className="flex-1"
              >
                取消
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAddCreditModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${cardStyle} rounded-lg w-full max-w-md`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              添加信誉担保金额
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddCreditModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                添加金额 (USDT)
              </label>
              <input
                type="text"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                placeholder="请输入添加金额"
                className={`w-full px-3 py-2 border rounded-lg ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleAddCredit}
                className="flex-1 bg-[#00D4AA] hover:bg-[#00B894] text-black"
              >
                确认添加
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddCreditModal(false)}
                className="flex-1"
              >
                取消
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderExtendTimeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${cardStyle} rounded-lg w-full max-w-md`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              延长有效期
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExtendTimeModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                延长天数
              </label>
              <select
                value={extendDays}
                onChange={(e) => setExtendDays(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="30">30天</option>
                <option value="60">60天</option>
                <option value="90">90天</option>
                <option value="180">180天</option>
                <option value="365">365天</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleExtendTime}
                className="flex-1 bg-[#00D4AA] hover:bg-[#00B894] text-black"
              >
                确认延长
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowExtendTimeModal(false)}
                className="flex-1"
              >
                取消
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContractModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${cardStyle} rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {selectedContract.title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowContractModal(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  合同编号
                </span>
                <div className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedContract.id}
                </div>
              </div>
              <div>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  担保金额
                </span>
                <div className={`text-lg font-semibold text-[#00D4AA]`}>
                  {selectedContract.amount}
                </div>
              </div>
              <div>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  交易对
                </span>
                <div className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedContract.tradePair}
                </div>
              </div>
              <div>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  交易数量
                </span>
                <div className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedContract.tradeAmount}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className={`text-md font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                合同条款
              </h4>
              <ul className="space-y-2">
                {selectedContract.terms.map((term, index) => (
                  <li key={index} className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    • {term}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  创建时间: {selectedContract.createdTime}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                {selectedContract.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // 渲染订单记录内容
  const renderOrderContent = () => {
    const records = orderRecordsData[orderTab] || []
    
    if (records.length === 0) {
      return (
        <div className={`${cardStyle} rounded-lg p-6`}>
          <div className="text-center py-12">
            <div className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {orderTab}
            </div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              暂无{orderTab}数据
            </div>
          </div>
        </div>
      )
    }

    // 根据不同类型渲染不同的表格
    switch (orderTab) {
      case "现货订单":
        return (
          <div className={`${cardStyle} rounded-lg overflow-hidden`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>现货订单记录</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>订单ID</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>交易对</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>类型</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>价格</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>数量</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>成交</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>状态</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>时间</th>
                  </tr>
                </thead>
                <tbody className={`${isDark ? 'bg-gray-900' : 'bg-white'} divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {records.map((record, index) => (
                    <tr key={record.id} className={`hover:${isDark ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {record.id}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {record.pair}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.type === "买入" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}>
                          {record.type} · {record.side}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        ${record.price}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {record.amount}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {record.filled}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === "已完成" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : record.status === "部分成交"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {record.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case "合约订单":
        return (
          <div className={`${cardStyle} rounded-lg overflow-hidden`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>合约订单记录</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>订单ID</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>合约</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>类型</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>价格</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>杠杆</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>保证金</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>盈亏</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>状态</th>
                  </tr>
                </thead>
                <tbody className={`${isDark ? 'bg-gray-900' : 'bg-white'} divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {records.map((record, index) => (
                    <tr key={record.id} className={`hover:${isDark ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {record.id}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {record.pair}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.type.includes("开多") 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}>
                          {record.type} · {record.side}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        ${record.price}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {record.leverage}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        ${record.margin}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        record.pnl.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {record.pnl}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case "充提币记录":
        return (
          <div className={`${cardStyle} rounded-lg overflow-hidden`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>充提币记录</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>类型</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>币种</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>数量</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>地址</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>交易哈希</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>状态</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>时间</th>
                  </tr>
                </thead>
                <tbody className={`${isDark ? 'bg-gray-900' : 'bg-white'} divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {records.map((record, index) => (
                    <tr key={record.id} className={`hover:${isDark ? 'bg-gray-800' : 'bg-gray-50'} transition-colors`}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.type === "充币" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        }`}>
                          {record.type}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {record.currency}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {record.amount}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'} font-mono`}>
                        {record.address}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'} font-mono`}>
                        {record.txHash}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {record.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {record.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      default:
        return (
          <div className={`${cardStyle} rounded-lg p-6`}>
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{orderTab}</h3>
              <div className="space-y-3">
                {records.map((record, index) => (
                  <div key={record.id || index} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {Object.entries(record).map(([key, value]) => (
                        <div key={key}>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                            {key === 'id' ? 'ID' : 
                             key === 'type' ? '类型' :
                             key === 'amount' ? '金额' :
                             key === 'status' ? '状态' :
                             key === 'time' ? '时间' : key}
                          </div>
                          <div className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-gray-50'}`}>
      {isMobile ? (
        /* Mobile Layout - Top Tabs */
        <div className="container mx-auto p-4 space-y-6">
          {/* 顶级页签导航 - 移动端 */}
          <div className="relative mb-2">
            <div className={`flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'}`}>
              {/* 滑动背景 */}
              <div
                className={`absolute top-1 bottom-1 w-1/2 rounded-md transition-all duration-300 ease-in-out bg-black ${
                  topLevelTab === "账户资产" ? "left-1" : "left-1/2"
                }`}
              />
              {/* 按钮 */}
              {["账户资产", "订单记录"].map((tab) => (
                <button
                  key={tab}
                  className={`relative z-10 flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    topLevelTab === tab
                      ? "text-white"
                      : isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  onClick={() => setTopLevelTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 子页签导航 */}
          {topLevelTab === "账户资产" ? (
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
                          ? "border-transparent text-gray-300 hover:text-white hover:bg-[#252842]"
                          : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 p-1 bg-gray-200 dark:bg-[#252842] rounded-lg">
              {orderTabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setOrderTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 border ${
                      orderTab === tab.id
                        ? isDark
                          ? "border-white bg-white text-black shadow-sm"
                          : "border-[#00D4AA] text-[#00D4AA] bg-[#00D4AA]/5 shadow-sm"
                        : isDark
                          ? "border-transparent text-gray-300 hover:text-white hover:bg-[#252842]"
                          : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Content */}
          <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {topLevelTab === "账户资产" ? renderTabContent() : renderOrderContent()}
          </div>
        </div>
      ) : (
        /* Desktop Layout - Left Sidebar */
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <div className={`w-64 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'} border-r ${isDark ? 'border-[#252842]' : 'border-gray-200'} flex flex-col`}>
            {/* 顶级页签导航 - 聊天界面风格 */}
            <div className="p-3 pt-6">
              <div className="relative mb-3">
                <div className={`flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'}`}>
                  {/* 滑动背景 */}
                  <div
                    className={`absolute top-1 bottom-1 w-1/2 rounded-md transition-all duration-300 ease-in-out bg-black ${
                      topLevelTab === "账户资产" ? "left-1" : "left-1/2"
                    }`}
                  />
                  {/* 按钮 */}
                  {["账户资产", "订单记录"].map((tab) => (
                    <button
                      key={tab}
                      className={`relative z-10 flex-1 px-3 py-2 text-xs font-medium transition-all duration-300 ${
                        topLevelTab === tab
                          ? "text-white"
                          : isDark
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                      onClick={() => setTopLevelTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <nav className="flex-1 px-3">
              {/* 账户资产页签 */}
              {topLevelTab === "账户资产" && (
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
                              ? "border-transparent text-gray-300 hover:text-white hover:bg-[#252842] hover:scale-102"
                              : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:scale-102"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
              
              {/* 订单记录页签 */}
              {topLevelTab === "订单记录" && (
                <div className="space-y-1">
                  {orderTabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setOrderTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform border ${
                          orderTab === tab.id
                            ? "border-[#00D4AA] text-[#00D4AA] bg-[#00D4AA]/5 shadow-sm scale-105"
                            : isDark
                              ? "border-transparent text-gray-300 hover:text-white hover:bg-[#252842] hover:scale-102"
                              : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:scale-102"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}
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
                {topLevelTab === "账户资产" ? renderTabContent() : renderOrderContent()}
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
                <div className={`flex rounded-full p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-100'}`}>
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
                          ? "border-[#252842] hover:border-[#00D4AA]/50 hover:bg-[#252842]"
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

      {/* 划转弹窗 */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50">
          {/* 背景遮罩 */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              transferModalAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            onClick={closeTransferModal}
          />
          {/* 弹窗内容 */}
          <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] transition-all duration-300 ease-out ${
            transferModalAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${
            isDark 
              ? 'bg-[#1a1d29] border border-[#252842]' 
              : 'bg-white border border-gray-200 shadow-xl'
          } rounded-lg`}>
            <div className="p-6">
              {/* 标题 */}
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  划转
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeTransferModal}
                  className={`h-8 w-8 p-0 ${
                    isDark 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* 账户选择区域 */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-3 items-end">
                  {/* 从账户 */}
                  <div>
                    <label className={`block text-sm mb-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      从
                    </label>
                    <div className={`relative ${
                      isDark 
                        ? 'bg-[#2a2d42] border-[#3a3d4a]' 
                        : 'bg-gray-50 border-gray-200'
                    } border rounded-lg`}>
                      <select
                        value={transferFrom}
                        onChange={(e) => setTransferFrom(e.target.value)}
                        className={`w-full p-3 bg-transparent text-sm focus:outline-none appearance-none ${
                          isDark 
                            ? 'text-white focus:border-[#00D4AA]' 
                            : 'text-gray-900 focus:border-[#00D4AA]'
                        }`}
                      >
                        <option value="现货账户">现货账户</option>
                        <option value="合约账户">合约账户</option>
                        <option value="理财账户">理财账户</option>
                        <option value="U卡账户">U卡账户</option>
                      </select>
                      <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    </div>
                  </div>

                  {/* 交换按钮 */}
                  <div className="flex justify-center pb-1">
                    <Button
                      onClick={swapTransferAccounts}
                      variant="ghost"
                      size="sm"
                      className={`h-10 w-10 p-0 ${
                        isDark 
                          ? 'text-gray-400 hover:text-white hover:bg-[#252842]' 
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* 到账户 */}
                  <div>
                    <label className={`block text-sm mb-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      到
                    </label>
                    <div className={`relative ${
                      isDark 
                        ? 'bg-[#2a2d42] border-[#3a3d4a]' 
                        : 'bg-gray-50 border-gray-200'
                    } border rounded-lg`}>
                      <select
                        value={transferTo}
                        onChange={(e) => setTransferTo(e.target.value)}
                        className={`w-full p-3 bg-transparent text-sm focus:outline-none appearance-none ${
                          isDark 
                            ? 'text-white focus:border-[#00D4AA]' 
                            : 'text-gray-900 focus:border-[#00D4AA]'
                        }`}
                      >
                        <option value="现货账户">现货账户</option>
                        <option value="合约账户">合约账户</option>
                        <option value="理财账户">理财账户</option>
                        <option value="U卡账户">U卡账户</option>
                      </select>
                      <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 币种选择 */}
              <div className="mb-6">
                <label className={`block text-sm mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  币种
                </label>
                <div className={`relative ${
                  isDark 
                    ? 'bg-[#2a2d42] border-[#3a3d4a]' 
                    : 'bg-gray-50 border-gray-200'
                } border rounded-lg`}>
                  <div className="flex items-center p-3">
                    <div className="w-6 h-6 bg-[#00D4AA] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">U</span>
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        USDT
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Tether USDt
                      </div>
                    </div>
                    <ChevronDown className={`h-4 w-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  </div>
                </div>
              </div>

              {/* 数量输入 */}
              <div className="mb-4">
                <label className={`block text-sm mb-2 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  数量
                </label>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="0"
                    className={`flex-1 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00D4AA] ${
                      isDark 
                        ? 'bg-[#252842] border-[#252842] text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                    } border`}
                  />
                  <Button
                    variant="outline"
                    className={`px-4 py-3 text-sm ${
                      isDark 
                        ? 'border-[#3a3d4a] text-[#00D4AA] hover:text-white hover:border-[#00D4AA]' 
                        : 'border-gray-200 text-[#00D4AA] hover:text-white hover:bg-[#00D4AA] hover:border-[#00D4AA]'
                    }`}
                    onClick={() => setTransferAmount("0.00")}
                  >
                    全部
                  </Button>
                </div>
              </div>

              {/* 可用余额 */}
              <div className="mb-6">
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  可用 USDT 资产: <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>0.00</span>
                </div>
              </div>

              {/* 确认按钮 */}
              <Button
                className="w-full bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white font-medium py-3 rounded-lg disabled:opacity-50"
                disabled={!transferAmount || transferAmount === "0"}
              >
                确定
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}