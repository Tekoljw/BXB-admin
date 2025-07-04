"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import TransactionProgress from "@/components/transaction-progress"


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
  Calendar,
  MessageCircle,
  Users,
  User,
  ExternalLink,
  Receipt,
  Coins,
  Target,
  HelpCircle,
  Zap,
  Lock,
  Unlock,
  MapPin,
  Building2,
  University,
  Link,
  Landmark,
  Network,
  Repeat,
  Copy,
  Edit,
  Trash2,
  Unlink,
  ChevronRight
} from "lucide-react"
import React, { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useTranslation } from "@/hooks/use-translation"
import SkeletonLoader from "@/components/skeleton-loader"
import TrendChart from "@/components/wallet/trend-chart"
import KlineChart from "@/components/wallet/kline-chart"

export default function WalletPage() {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const router = useRouter()
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [topLevelTab, setTopLevelTab] = useState("账户资产") // "账户资产" or "订单记录"
  const [activeTab, setActiveTab] = useState("钱包总览")
  const [orderTab, setOrderTab] = useState("现货订单")
  const [secondaryTab, setSecondaryTab] = useState<string>("current") // 二级页签状态 // 订单记录子页签
  const [activeOrderCategory, setActiveOrderCategory] = useState('spot')
  const [activeOrderSubTab, setActiveOrderSubTab] = useState('current')
  const [overviewMode, setOverviewMode] = useState("现金账户") // "现金账户" or "总资产"
  const [overviewTab, setOverviewTab] = useState("现金账户") // Tab for wallet overview: "现金账户" or "总资产"
  const [selectedCurrency, setSelectedCurrency] = useState("USDT")
  const [selectedDisplayCurrency, setSelectedDisplayCurrency] = useState("USDT") // 卡片显示币种
  const [selectedAction, setSelectedAction] = useState("current-positions") // 选中的操作按钮
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
  const [selectedPaymentCard, setSelectedPaymentCard] = useState<"fiat" | "crypto">("fiat") // BePAY支付卡片选择
  const [fiatTab, setFiatTab] = useState("商户资产") // 法币卡片页签
  const [cryptoTab, setCryptoTab] = useState("商户资产") // 加密货币卡片页签
  const [currencyTab, setCurrencyTab] = useState("CNY") // 通道配置币种页签
  const [paymentMethodTab, setPaymentMethodTab] = useState("代收") // 通道配置支付方式页签
  const [showMoreCurrencies, setShowMoreCurrencies] = useState(false) // 显示更多币种弹窗
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>(["CNY", "USD", "EUR", "GBP", "JPY"]) // 多选币种列表
  const [financeMode, setFinanceMode] = useState("收益计算") // 理财账户模式选择
  const [expandedContractItems, setExpandedContractItems] = useState<Set<string>>(new Set()) // 合同展开状态
  
  // 确保当前币种页签在选中的币种列表中
  useEffect(() => {
    if (!selectedCurrencies.includes(currencyTab) && selectedCurrencies.length > 0) {
      setCurrencyTab(selectedCurrencies[0])
    }
  }, [selectedCurrencies, currencyTab])
  
  // 代付备用金充值弹窗状态
  const [showStandbyRechargeModal, setShowStandbyRechargeModal] = useState(false)
  const [standbyRechargeAnimating, setStandbyRechargeAnimating] = useState(false)
  const [standbyRechargeCurrency, setStandbyRechargeCurrency] = useState("USD") // 选择的充值币种
  const [standbyRechargeTab, setStandbyRechargeTab] = useState("法币充值") // 充值方式：法币充值/USDT充值
  const [standbyRechargeAmount, setStandbyRechargeAmount] = useState("") // 充值金额
  
  // 兑换USDT弹窗状态
  const [showExchangeModal, setShowExchangeModal] = useState(false)
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState("")
  const [exchangeAmount, setExchangeAmount] = useState("")
  const [estimatedUSDT, setEstimatedUSDT] = useState("")
  
  // OTC供应商选择状态
  const [selectedSupplier, setSelectedSupplier] = useState("MoonPay")

  // 今日汇率 (示例汇率)
  const exchangeRates = {
    USD: 1.0,
    EUR: 1.08,
    GBP: 1.27,
    JPY: 0.0067
  }

  // 计算估算USDT金额
  const calculateEstimatedUSDT = (amount: string, currency: string) => {
    if (!amount || !currency) return ""
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount)) return ""
    const rate = exchangeRates[currency as keyof typeof exchangeRates] || 1
    return (numAmount * rate).toFixed(2)
  }

  // 处理兑换金额变化
  const handleExchangeAmountChange = (value: string) => {
    setExchangeAmount(value)
    setEstimatedUSDT(calculateEstimatedUSDT(value, selectedFiatCurrency))
  }

  // 处理法币选择变化
  const handleFiatCurrencyChange = (currency: string) => {
    setSelectedFiatCurrency(currency)
    setEstimatedUSDT(calculateEstimatedUSDT(exchangeAmount, currency))
  }

  // 确认兑换
  const handleExchangeConfirm = () => {
    if (!selectedFiatCurrency || !exchangeAmount || !estimatedUSDT) return
    
    // 生成兑换订单（这里可以添加到支付订单列表中）
    const exchangeOrder = {
      id: Date.now().toString(),
      type: "法币兑换",
      fromCurrency: selectedFiatCurrency,
      toCurrency: "USDT",
      amount: exchangeAmount,
      estimatedAmount: estimatedUSDT,
      rate: exchangeRates[selectedFiatCurrency as keyof typeof exchangeRates],
      status: "等待审核",
      createTime: new Date().toLocaleString(),
      category: "下发订单"
    }
    
    // 关闭弹窗并重置状态
    setShowExchangeModal(false)
    setSelectedFiatCurrency("")
    setExchangeAmount("")
    setEstimatedUSDT("")
    
    // 这里可以添加成功提示
    console.log("兑换订单已生成:", exchangeOrder)
  }

  // 地址管理相关状态
  const [selectedAddressCoin, setSelectedAddressCoin] = useState("全部")
  const [showAddAddressModal, setShowAddAddressModal] = useState(false)
  const [newAddress, setNewAddress] = useState({
    currency: "",
    label: "",
    address: "",
    type: "充值",
    isDefault: false
  })

  // 地址列表数据
  const addressList = [
    {
      id: "addr001",
      currency: "USDT",
      label: "主钱包",
      address: "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE",
      type: "充值",
      isDefault: true,
      totalDeposits: "15,230.50 USDT",
      totalWithdrawals: "8,450.20 USDT",
      usageCount: 156,
      createdAt: "2024-01-15"
    },
    {
      id: "addr002", 
      currency: "BTC",
      label: "交易所钱包",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      type: "提现",
      isDefault: false,
      totalDeposits: "2.45 BTC",
      totalWithdrawals: "1.89 BTC",
      usageCount: 43,
      createdAt: "2024-01-20"
    },
    {
      id: "addr003",
      currency: "ETH", 
      label: "DeFi钱包",
      address: "0x742d35Cc6634C0532925a3b8D09C1F1c3b3e6d1F",
      type: "充值",
      isDefault: true,
      totalDeposits: "12.8 ETH",
      totalWithdrawals: "7.2 ETH", 
      usageCount: 89,
      createdAt: "2024-01-18"
    },
    {
      id: "addr004",
      currency: "BNB",
      label: "BSC钱包",
      address: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",
      type: "提现",
      isDefault: false,
      totalDeposits: "456.7 BNB",
      totalWithdrawals: "234.1 BNB",
      usageCount: 67,
      createdAt: "2024-01-22"
    }
  ]

  // 地址管理相关函数
  const handleAddAddress = () => {
    if (!newAddress.currency || !newAddress.label || !newAddress.address) {
      return
    }
    
    console.log("添加新地址:", newAddress)
    setShowAddAddressModal(false)
    setNewAddress({
      currency: "",
      label: "",
      address: "",
      type: "充值",
      isDefault: false
    })
  }

  const handleEditAddress = (address: any) => {
    console.log("编辑地址:", address)
  }

  const handleDeleteAddress = (addressId: string) => {
    console.log("删除地址:", addressId)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    console.log("已复制到剪贴板:", text)
  }

  // U卡相关状态
  const [selectedCardType, setSelectedCardType] = useState("virtual")
  const [showVirtualCardApplication, setShowVirtualCardApplication] = useState(false)
  const [showPhysicalCardApplication, setShowPhysicalCardApplication] = useState(false)
  const [selectedUCardView, setSelectedUCardView] = useState("virtual") // 控制顶部卡片选中状态
  const [cardApplicationStep, setCardApplicationStep] = useState(1)
  const [virtualCardApplicationData, setVirtualCardApplicationData] = useState({
    fullName: "",
    idNumber: "",
    email: "",
    phone: "",
    agreeTerms: false
  })
  const [physicalCardApplicationData, setPhysicalCardApplicationData] = useState({
    fullName: "",
    idNumber: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    agreeTerms: false,
    cardDesign: "classic"
  })

  // OTC供应商相关状态
  const [selectedSupplierStatus, setSelectedSupplierStatus] = useState("全部")
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false)
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    apiUrl: "",
    apiKey: "",
    supportedCurrencies: "",
    isPreferred: false
  })

  // OTC供应商列表数据
  const otcSupplierList = [
    {
      id: "sup001",
      name: "AlphaTrade OTC",
      status: "正常",
      supportedCurrencies: ["USDT", "BTC", "ETH"],
      feeRate: "0.15%",
      limits: "1,000-50,000 USDT",
      successRate: "99.8%",
      responseTime: "2.3s",
      monthlyVolume: "2.8M USDT",
      rating: "A+",
      isPreferred: true
    },
    {
      id: "sup002",
      name: "BetaExchange Pro",
      status: "正常",
      supportedCurrencies: ["USDT", "BTC", "ETH", "BNB"],
      feeRate: "0.12%",
      limits: "500-100,000 USDT",
      successRate: "99.5%",
      responseTime: "1.8s",
      monthlyVolume: "4.2M USDT",
      rating: "A",
      isPreferred: false
    },
    {
      id: "sup003",
      name: "GammaLiquidity",
      status: "维护中",
      supportedCurrencies: ["USDT", "BTC"],
      feeRate: "0.18%",
      limits: "2,000-30,000 USDT",
      successRate: "98.9%",
      responseTime: "3.1s",
      monthlyVolume: "1.5M USDT",
      rating: "B+",
      isPreferred: false
    },
    {
      id: "sup004",
      name: "DeltaOTC Solutions",
      status: "暂停",
      supportedCurrencies: ["USDT", "ETH", "ADA"],
      feeRate: "0.20%",
      limits: "1,500-25,000 USDT",
      successRate: "97.2%",
      responseTime: "4.5s",
      monthlyVolume: "0.8M USDT",
      rating: "B",
      isPreferred: false
    }
  ]

  // OTC供应商相关函数
  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.apiUrl || !newSupplier.apiKey) {
      return
    }
    
    console.log("添加新供应商:", newSupplier)
    setShowAddSupplierModal(false)
    setNewSupplier({
      name: "",
      apiUrl: "",
      apiKey: "",
      supportedCurrencies: "",
      isPreferred: false
    })
  }

  const handleEditSupplier = (supplier: any) => {
    console.log("编辑供应商:", supplier)
  }

  const handleDeleteSupplier = (supplierId: string) => {
    console.log("删除供应商:", supplierId)
  }

  const handleTestSupplier = (supplier: any) => {
    console.log("测试供应商连接:", supplier)
  }

  // 地址管理相关状态
  const [selectedNetwork, setSelectedNetwork] = useState("TRC20")
  const [selectedAddressCurrency, setSelectedAddressCurrency] = useState("全部")
  const [addressSearchTerm, setAddressSearchTerm] = useState("")
  
  // 添加地址弹窗状态
  const [showPurchaseAddressModal, setShowPurchaseAddressModal] = useState(false)
  const [selectedChain, setSelectedChain] = useState("TRC20")
  const [addressQuantity, setAddressQuantity] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  
  // 释放地址弹窗状态
  const [showReleaseModal, setShowReleaseModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<any>(null)
  
  // 各链地址价格 (USDT/个)
  const chainPrices = {
    TRC20: 0.1,
    ERC20: 0.5,
    BTC: 1.0,
    BSC: 0.2,
    XRP: 0.3,
    Solana: 0.15,
    Matrix: 0.08
  }
  
  // 计算总价格
  useEffect(() => {
    const quantity = parseInt(addressQuantity) || 0
    const price = chainPrices[selectedChain as keyof typeof chainPrices] || 0
    setTotalPrice(quantity * price)
  }, [addressQuantity, selectedChain])
  
  // 处理购买地址
  const handlePurchaseAddress = () => {
    console.log("购买地址:", {
      chain: selectedChain,
      quantity: addressQuantity,
      unitPrice: chainPrices[selectedChain as keyof typeof chainPrices],
      totalPrice: totalPrice
    })
    setShowPurchaseAddressModal(false)
    setAddressQuantity("")
    setTotalPrice(0)
  }
  
  // 处理释放地址
  const handleReleaseAddress = (address: any) => {
    setSelectedAddress(address)
    setShowReleaseModal(true)
  }
  
  // 确认释放地址
  const confirmReleaseAddress = () => {
    console.log("释放地址:", selectedAddress)
    setShowReleaseModal(false)
    setSelectedAddress(null)
  }
  
  // 获取网络Logo
  const getNetworkLogo = (network: string) => {
    const logos: { [key: string]: string } = {
      TRC20: "🟢", // Tron
      ERC20: "🔵", // Ethereum
      BTC: "🟠", // Bitcoin
      BSC: "🟡", // Binance Smart Chain
      XRP: "⚪", // Ripple
      Solana: "🟣", // Solana
      Matrix: "🔴" // Matrix
    }
    return logos[network] || "⚫"
  }

  // 地址管理数据
  const addressTableData = [
    {
      currency: "USDT",
      network: "TRC20",
      shortAddress: "TKE5JeJQJWJBouRoNAoS...",
      fullAddress: "TKE5JeJQJWJBouRoNAoSQxMqKRzG7H8JBouRoNAoS",
      userId: "U10001",
      username: "李明",
      phone: "13800138001",
      email: "liming@example.com",
      isActive: true
    },
    {
      currency: "TRX",
      network: "TRC20",
      shortAddress: "TJDE5JWJBoCkyZH3aJQxR...",
      fullAddress: "TJDE5JWJBoCkyZH3aJQxRMqKRzG7H8JBouRoNAoS",
      userId: "U10002",
      username: "王芳",
      phone: "13900139002",
      email: "wangfang@example.com",
      isActive: true
    }
  ]

  // 筛选后的地址列表
  const filteredAddressList = addressTableData.filter(address => {
    const matchesNetwork = selectedNetwork === "TRC20" ? true : address.network === selectedNetwork
    const matchesSearch = addressSearchTerm === "" || 
      address.fullAddress.toLowerCase().includes(addressSearchTerm.toLowerCase()) ||
      address.userId.toLowerCase().includes(addressSearchTerm.toLowerCase()) ||
      address.username.includes(addressSearchTerm)
    
    return matchesNetwork && matchesSearch
  })

  // 地址管理相关函数
  const handleRefreshAddress = (address: any) => {
    console.log("刷新地址:", address)
  }

  // 更多币种列表
  const moreCurrencies = ["CNY", "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "SEK", "NOK"]

  // 获取支付方式列表 - 只有代收/代付
  const getPaymentMethods = (currency: string) => {
    return ["代收", "代付"]
  }

  // 获取通道数据 - 只支持法币币种，区分代收/代付
  const getChannelsByCategory = (currency: string, method: string) => {
    const allChannels = [
      // CNY 代收通道
      {
        name: "支付宝扫码",
        type: "第三方支付",
        status: "正常",
        successRate: "97.5%",
        dailyLimit: "200万",
        minLimit: "10",
        maxLimit: "5万",
        fee: "0.3%",
        color: "green",
        currency: "CNY",
        method: "代收",
        enabled: true
      },
      {
        name: "微信扫码",
        type: "第三方支付",
        status: "维护中",
        successRate: "95.8%",
        dailyLimit: "300万",
        minLimit: "10",
        maxLimit: "5万",
        fee: "0.3%",
        color: "yellow",
        currency: "CNY",
        method: "代收",
        enabled: false
      },
      {
        name: "银行卡快捷支付",
        type: "银行卡",
        status: "正常",
        successRate: "98.2%",
        dailyLimit: "500万",
        minLimit: "100",
        maxLimit: "50万",
        fee: "0.5%",
        color: "green",
        currency: "CNY",
        method: "代收",
        enabled: true
      },
      // CNY 代付通道
      {
        name: "支付宝转账",
        type: "第三方支付",
        status: "正常",
        successRate: "98.1%",
        dailyLimit: "500万",
        minLimit: "10",
        maxLimit: "10万",
        fee: "0.2%",
        color: "green",
        currency: "CNY",
        method: "代付",
        enabled: true
      },
      {
        name: "网银转账",
        type: "银行转账",
        status: "正常",
        successRate: "99.1%",
        dailyLimit: "1000万",
        minLimit: "100",
        maxLimit: "100万",
        fee: "0.8%",
        color: "green",
        currency: "CNY",
        method: "代付",
        enabled: true
      },
      // USD 代收通道
      {
        name: "USD银行卡",
        type: "银行卡",
        status: "正常",
        successRate: "96.5%",
        dailyLimit: "$100万",
        minLimit: "$10",
        maxLimit: "$10万",
        fee: "1.0%",
        color: "green",
        currency: "USD",
        method: "代收",
        enabled: true
      },
      {
        name: "PayPal收款",
        type: "第三方支付",
        status: "正常",
        successRate: "94.2%",
        dailyLimit: "$50万",
        minLimit: "$5",
        maxLimit: "$5万",
        fee: "2.5%",
        color: "green",
        currency: "USD",
        method: "代收",
        enabled: true
      },
      // USD 代付通道
      {
        name: "USD电汇",
        type: "银行转账",
        status: "正常",
        successRate: "98.8%",
        dailyLimit: "$200万",
        minLimit: "$100",
        maxLimit: "$50万",
        fee: "1.5%",
        color: "green",
        currency: "USD",
        method: "代付",
        enabled: true
      },
      // EUR 代收通道
      {
        name: "EUR银行卡",
        type: "银行卡",
        status: "正常",
        successRate: "97.1%",
        dailyLimit: "€80万",
        minLimit: "€10",
        maxLimit: "€8万",
        fee: "1.2%",
        color: "green",
        currency: "EUR",
        method: "代收",
        enabled: true
      },
      // EUR 代付通道
      {
        name: "SEPA转账",
        type: "银行转账",
        status: "正常",
        successRate: "98.5%",
        dailyLimit: "€150万",
        minLimit: "€50",
        maxLimit: "€20万",
        fee: "0.8%",
        color: "green",
        currency: "EUR",
        method: "代付",
        enabled: true
      }
    ]

    return allChannels.filter(channel => {
      const currencyMatch = channel.currency === currency
      const methodMatch = channel.method === method
      return currencyMatch && methodMatch
    })
  }

  // 处理仓位分布弹窗
  const handlePositionModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!showPositionModal) {
      setShowPositionModal(true)
      setTimeout(() => setPositionModalAnimating(true), 50)
    }
  }

  const handleStandbyRechargeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!showStandbyRechargeModal) {
      setShowStandbyRechargeModal(true)
      setTimeout(() => setStandbyRechargeAnimating(true), 50)
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

  // 趋势图数据
  const generateTrendData = (isPositive = true) => {
    const base = 100
    const data = []
    for (let i = 0; i < 10; i++) {
      const variance = Math.random() * 10 - 5
      const trend = isPositive ? i * 2 : -i * 1.5
      data.push(base + trend + variance)
    }
    return data
  }

  // K线数据
  const generateKlineData = () => {
    const data = []
    let basePrice = 67000
    for (let i = 0; i < 8; i++) {
      const open = basePrice + (Math.random() - 0.5) * 200
      const close = open + (Math.random() - 0.5) * 500
      const high = Math.max(open, close) + Math.random() * 200
      const low = Math.min(open, close) - Math.random() * 200
      data.push({
        open: open,
        high: high,
        low: low,
        close: close,
        volume: Math.random() * 1000
      })
      basePrice = close
    }
    return data
  }

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
    { id: "U卡账户", label: "U卡账户", icon: CreditCard },
    { id: "佣金账户", label: "佣金账户", icon: Percent },
    { id: "担保账户", label: "担保账户", icon: Shield },
    { id: "BePAY账户", label: "BePAY账户", icon: Receipt }
  ]

  const orderTabs = [
    { id: "现货订单", label: "现货订单", icon: BarChart2 },
    { id: "合约订单", label: "合约订单", icon: LineChart },
    { id: "理财订单", label: "理财订单", icon: PiggyBank },
    { id: "U卡订单", label: "U卡订单", icon: CreditCard },
    { id: "佣金记录", label: "佣金记录", icon: Percent },
    { id: "担保记录", label: "担保记录", icon: Shield },
    { id: "支付订单", label: "支付订单", icon: Receipt },
    { id: "入金提币记录", label: "入金提币记录", icon: ArrowUpDown },
    { id: "内转记录", label: "内转记录", icon: ArrowLeftRight },
    { id: "划转记录", label: "划转记录", icon: ArrowLeftRight },
    { id: "USDT买卖记录", label: "USDT买卖记录", icon: Banknote }
  ]

  // 二级页签配置
  const orderCategories = {
    spot: {
      name: '现货订单',
      tabs: {
        current: '当前委托',
        history: '历史委托', 
        trades: '成交明细'
      }
    },
    futures: {
      name: '合约订单',
      tabs: {
        current: '当前委托',
        plan: '计划委托',
        history: '历史委托',
        trades: '成交明细',
        funding: '资金记录',
        fees: '资金费用'
      }
    },
    wealth: {
      name: '理财订单',
      tabs: {
        invest: '投资订单',
        exchange: '闪兑记录',
        earnings: '理财收益记录'
      }
    },
    ucard: {
      name: 'U卡订单',
      tabs: {
        open: '开卡记录',
        recharge: '充值记录',
        consume: '消费记录',
        refund: '退款记录'
      }
    },
    commission: {
      name: '佣金记录',
      tabs: {
        futures: '合约佣金',
        wealth: '理财佣金',
        payment: '支付佣金',
        ucard: 'U卡佣金'
      }
    },
    guarantee: {
      name: '担保记录',
      tabs: {
        receive: '担保收款记录',
        payment: '担保付款记录',
        credit: '信用担保资金记录'
      }
    },
    deposit: {
      name: '入金提币记录',
      tabs: {
        deposit: '入金记录',
        withdraw: '提币记录'
      }
    },
    internal: {
      name: '内转记录',
      tabs: {
        records: '内转记录'
      }
    },
    transfer: {
      name: '划转记录',
      tabs: {
        records: '划转记录'
      }
    },
    usdt: {
      name: 'USDT买卖记录',
      tabs: {
        c2c: 'C2C记录',
        otc: 'OTC记录',
        quick: '快捷买卖记录'
      }
    },
    payment: {
      name: '支付订单',
      tabs: {
        collect: '收款记录',
        proxy: '代付记录',
        refund: '退款记录'
      }
    }
  }

  // 根据主页签ID获取对应的category key
  const getCategoryKey = (orderTabId: string) => {
    const mapping = {
      "现货订单": "spot",
      "合约订单": "futures", 
      "理财订单": "wealth",
      "U卡订单": "ucard",
      "佣金记录": "commission",
      "担保记录": "guarantee",
      "入金提币记录": "deposit",
      "内转记录": "internal",
      "划转记录": "transfer",
      "USDT买卖记录": "usdt"
    }
    return mapping[orderTabId] || "spot"
  }

  // 切换主页签时重置二级页签
  const handleOrderTabChange = (newTab: string) => {
    setOrderTab(newTab)
    const categoryKey = getCategoryKey(newTab)
    const firstSubTab = Object.keys(orderCategories[categoryKey]?.tabs || {})[0]
    setSecondaryTab(firstSubTab || "current")
  }

  // 初始化二级页签
  useEffect(() => {
    const categoryKey = getCategoryKey(orderTab)
    const firstSubTab = Object.keys(orderCategories[categoryKey]?.tabs || {})[0]
    if (firstSubTab && secondaryTab === "current" && !orderCategories[categoryKey]?.tabs[secondaryTab]) {
      setSecondaryTab(firstSubTab)
    }
  }, [orderTab, secondaryTab])



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
    "支付订单": [
      {
        id: "PAY001",
        type: "收款",
        merchant: "商户A",
        amount: "1,250.00 USDT",
        channel: "支付宝",
        status: "已完成",
        time: "2024-01-15 16:30:25",
        orderNo: "P202401151630001",
        fee: "3.75 USDT"
      },
      {
        id: "PAY002", 
        type: "代付",
        merchant: "商户B",
        amount: "850.00 USDT",
        channel: "微信支付",
        status: "处理中",
        time: "2024-01-15 14:20:18",
        orderNo: "P202401151420002",
        fee: "2.55 USDT"
      },
      {
        id: "PAY003",
        type: "退款",
        merchant: "商户C",
        amount: "320.00 USDT",
        channel: "银行卡",
        status: "已完成",
        time: "2024-01-15 11:45:30",
        orderNo: "P202401151145003",
        fee: "0.96 USDT"
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
    "内转记录": [
      {
        id: "IT001",
        type: "用户转账",
        from: "自己",
        to: "用户A",
        currency: "USDT",
        amount: "-100.00",
        status: "已完成",
        time: "2024-01-15 16:20:30",
        note: "朋友转账"
      },
      {
        id: "IT002",
        type: "接收转账",
        from: "用户B",
        to: "自己",
        currency: "USDT",
        amount: "+200.00",
        status: "已完成",
        time: "2024-01-15 15:45:15",
        note: "业务合作款"
      },
      {
        id: "IT003",
        type: "群组空投",
        from: "自己",
        to: "交易群",
        currency: "USDT",
        amount: "-50.00",
        status: "已完成",
        time: "2024-01-15 14:30:45",
        note: "感谢支持，空投奖励！"
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
        { name: "现金账户", balance: "8,567.89", icon: CreditCard, percentage: "38.5%" },
        { name: "合约账户", balance: "3,456.78", icon: BarChart3, percentage: "15.5%" },
        { name: "理财账户", balance: "2,345.67", icon: PiggyBank, percentage: "10.5%" },
        { name: "U卡账户", balance: "1,234.56", icon: DollarSign, percentage: "5.5%" },
        { name: "佣金账户", balance: "567.89", icon: Gift, percentage: "2.5%" },
        { name: "担保账户", balance: "5,000.00", icon: Shield, percentage: "22.5%" },
        { name: "BePAY账户", balance: "1,125.47", icon: Receipt, percentage: "5.0%" }
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
    U卡账户: {
      cardBalance: "1,234.56",
      cardLimit: "5,000.00",
      monthlySpent: "456.78",
      hasVirtualCard: false,
      hasPhysicalCard: false,
      transactions: [
        { 
          id: "UC001", 
          merchant: "Amazon", 
          amount: "-89.99", 
          date: "2024-01-15", 
          status: "已完成",
          type: "online" 
        },
        { 
          id: "UC002", 
          merchant: "钱包充值", 
          amount: "+500.00", 
          date: "2024-01-14", 
          status: "已完成",
          type: "recharge" 
        },
        { 
          id: "UC003", 
          merchant: "Spotify", 
          amount: "-15.99", 
          date: "2024-01-13", 
          status: "已完成",
          type: "online" 
        }
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
    },
    BePAY账户: {
      merchantAssets: "1,125.47",
      standbyFunds: "2,800.00",
      totalBalance: "3,925.47",
      todayRevenue: "+45.67",
      monthRevenue: "+1,234.56",
      successRate: "99.2%",
      totalOrders: 1847,
      activeChannels: 5,
      channels: [
        { name: "支付宝", status: "正常", successRate: "99.8%", todayAmount: "15,678.00", icon: "💰" },
        { name: "微信支付", status: "正常", successRate: "99.5%", todayAmount: "12,345.00", icon: "💬" },
        { name: "银行卡", status: "维护中", successRate: "98.9%", todayAmount: "8,900.00", icon: "🏦" },
        { name: "云闪付", status: "正常", successRate: "99.1%", todayAmount: "5,600.00", icon: "⚡" },
        { name: "数字钱包", status: "正常", successRate: "99.3%", todayAmount: "3,200.00", icon: "📱" }
      ],
      recentTransactions: [
        { orderId: "BP001", type: "收款", amount: "1,250.00", channel: "支付宝", status: "成功", time: "16:30" },
        { orderId: "BP002", type: "代付", amount: "850.00", channel: "微信支付", status: "处理中", time: "16:25" },
        { orderId: "BP003", type: "退款", amount: "320.00", channel: "银行卡", status: "成功", time: "16:20" }
      ],
      assetDistribution: [
        { name: "商户资产", value: 1125.47, percentage: 28.7, color: "#00D4AA" },
        { name: "代付备用金", value: 2800.00, percentage: 71.3, color: "#3B82F6" }
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
            {/* 主要卡片选择 - 移除点击功能 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 现金账户卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-6 transition-all duration-300 ease-out ${
                  overviewMode === "现金账户" 
                    ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50 shadow-lg" 
                    : ""
                }`}
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
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {balanceVisible ? `${convertBalance(accountsData.现金账户.balance, "USDT", selectedDisplayCurrency)} ${selectedDisplayCurrency}` : "****"}
                    </div>
                    <div className="flex-shrink-0">
                      <TrendChart 
                        data={generateTrendData(true)} 
                        isPositive={true}
                        height={32}
                      />
                    </div>
                  </div>
                </>
              </div>

              {/* 总资产卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-6 transition-all duration-300 ease-out ${
                  overviewMode === "总资产" 
                    ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50 shadow-lg" 
                    : ""
                }`}
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
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {balanceVisible ? `${convertBalance(accountsData.总资产.total, "USDT", selectedDisplayCurrency)} ${selectedDisplayCurrency}` : "****"}
                    </div>
                    <div className="flex-shrink-0">
                      <TrendChart 
                        data={generateTrendData(true)} 
                        isPositive={true}
                        height={32}
                      />
                    </div>
                  </div>
                </>
              </div>
            </div>

            {/* 钱包总览标签页和操作按钮 */}
            <div className="flex justify-between items-center">
              {/* 左侧：标签页 */}
              <div className={`relative flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'}`}>
                {/* 滑动背景 */}
                <div
                  className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'}`}
                  style={{
                    width: overviewTab === "现金账户" ? '96px' : '80px',
                    left: overviewTab === "现金账户" ? '4px' : '100px'
                  }}
                />
                {/* 按钮 */}
                {["现金账户", "总资产"].map((tab, index) => (
                  <button
                    key={tab}
                    className={`relative z-10 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      overviewTab === tab
                        ? isDark ? "text-black" : "text-white"
                        : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    style={{
                      width: tab === "现金账户" ? '96px' : '80px',
                      height: '32px'
                    }}
                    onClick={() => {
                      setOverviewTab(tab)
                      setOverviewMode(tab)
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* 右侧：操作按钮 */}
              <div className="flex gap-2">
                  {/* 主要操作按钮 */}
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
                        className={`h-10 px-3 transition-all duration-200 text-sm font-bold ${
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
                        <Icon className="h-4 w-4 mr-1" />
                        {button.label}
                      </Button>
                    )
                  })}
                  
                  {/* 分隔线 */}
                  <div className={`w-px h-10 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
                  
                  {/* 图标按钮区域 */}
                  {/* 资金记录按钮 */}
                  <Button
                    onClick={() => handleActionClick("fund-records")}
                    onMouseDown={() => setClickedAction("fund-records")}
                    onMouseUp={() => setClickedAction("")}
                    onMouseLeave={() => setClickedAction("")}
                    className={`h-10 w-10 transition-all duration-200 ${
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
                    className={`h-10 w-10 transition-all duration-200 ${
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
                    className={`h-10 w-10 transition-all duration-200 ${
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

            {/* 详细内容区域 */}
            <div className="transition-all duration-300">
              {overviewMode === "现金账户" ? (
                /* 现金账户模式：显示各币种余额 */
                <div className={`${cardStyle} rounded-lg p-6`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                        className={`w-10 h-10 rounded-lg border transition-all hover:shadow-md flex items-center justify-center ${
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
                              ? isDark ? "bg-white text-black" : "bg-black text-white"
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
                              ? isDark ? "bg-white text-black" : "bg-black text-white"
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
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <KlineChart 
                              height={28}
                              width={64}
                            />
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
              <div className={`${cardStyle} rounded-lg p-4 transition-all duration-300 ease-out  hover:shadow-xl`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">总资产</h3>
                  <button
                    onClick={handleCurrencyModalClick}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border border-black transition-all duration-300  ${
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
              
              <div className={`${cardStyle} rounded-lg p-4 transition-all duration-300 ease-out  hover:shadow-xl`}>
                <h3 className="text-sm font-medium mb-2">净资产</h3>
                <div className="text-2xl font-bold text-[#00D4AA] transition-all duration-500">
                  {balanceVisible ? convertBalance("8,734.56", "USDT", selectedDisplayCurrency) : "****"}
                </div>
              </div>
              
              <div className={`${cardStyle} rounded-lg p-4 transition-all duration-300 ease-out  hover:shadow-xl`}>
                <h3 className="text-sm font-medium mb-2">未实现盈亏</h3>
                <div className="text-2xl font-bold text-green-500 transition-all duration-500">
                  {balanceVisible ? contractData.unrealizedPnL : "****"}
                </div>
              </div>
              
              {/* 第二排 */}
              <div className={`${cardStyle} rounded-lg p-4 transition-all duration-300 ease-out  hover:shadow-xl`}>
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
              
              <div className={`${cardStyle} rounded-lg p-4 transition-all duration-300 ease-out  hover:shadow-xl`}>
                <h3 className="text-sm font-medium mb-2">已用保证金</h3>
                <div className="text-2xl font-bold transition-all duration-500">
                  {balanceVisible ? convertBalance(contractData.marginUsed, "USDT", selectedDisplayCurrency) : "****"}
                </div>
              </div>
              
              <div className={`${cardStyle} rounded-lg p-4 transition-all duration-300 ease-out  hover:shadow-xl`}>
                <h3 className="text-sm font-medium mb-2">可用保证金</h3>
                <div className="text-2xl font-bold transition-all duration-500">
                  {balanceVisible ? convertBalance(contractData.marginAvailable, "USDT", selectedDisplayCurrency) : "****"}
                </div>
              </div>
            </div>

            {/* 合约账户标签页和操作按钮 */}
            <div className="flex justify-between items-center">
              {/* 左侧：标签页 */}
              <div className={`relative flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'}`}>
                {/* 滑动背景 */}
                <div
                  className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'}`}
                  style={{
                    width: selectedAction === "current-positions" ? '96px' : '96px',
                    left: selectedAction === "current-positions" ? '4px' : '100px'
                  }}
                />
                {/* 按钮 */}
                {[
                  { id: "current-positions", label: "当前持仓" },
                  { id: "account-balance", label: "账户余额" }
                ].map((tab, index) => (
                  <button
                    key={tab.id}
                    className={`relative z-10 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      selectedAction === tab.id
                        ? isDark ? "text-black" : "text-white"
                        : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    style={{
                      width: '96px',
                      height: '32px'
                    }}
                    onClick={() => {
                      setSelectedAction(tab.id)
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 右侧：操作按钮 */}
              <div className="flex gap-2">
                {/* 划转和交易按钮 */}
                {[
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
                      className={`h-10 px-3 transition-all duration-200 text-sm font-bold ${
                        isClicked
                          ? "bg-[#00D4AA] text-white border-[#00D4AA]"
                          : isSelected 
                            ? "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]" 
                            : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                      }`}
                      variant="outline"
                    >
                      <Icon className="h-4 w-4 mr-1" />
                      {button.label}
                    </Button>
                  )
                })}
                
                {/* 图标按钮区域 */}
                {/* 资金记录按钮 */}
                <Button
                  onClick={() => handleActionClick("contract-fund-records")}
                  onMouseDown={() => setClickedAction("contract-fund-records")}
                  onMouseUp={() => setClickedAction("")}
                  onMouseLeave={() => setClickedAction("")}
                  className={`h-10 w-10 transition-all duration-200 ${
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
                  className={`h-10 w-10 transition-all duration-200 ${
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
                  className={`h-10 w-10 transition-all duration-200 bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800`}
                  variant="outline"
                  title="仓位分布"
                >
                  <PieChart className="h-4 w-4 text-black dark:text-white" />
                </Button>
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
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-[#3a3d4a] hover:shadow-md transition-all">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                          <span className="text-[#00D4AA] font-bold">{position.symbol.substring(0, 3).charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{position.symbol}</div>
                          <div className={`text-sm ${position.side === "多" ? "text-green-500" : "text-red-500"}`}>
                            {position.side} {position.size}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <TrendChart 
                            isPositive={position.pnl.startsWith('+')}
                            height={28}
                            width={64}
                          />
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case "理财账户":
        const financeData = walletData["理财账户"]
        
        return (
          <div className="space-y-6">
            {/* 三个卡片选择 - 增强动画效果 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 理财收益卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-6 transition-all duration-300 ease-out ${
                  financeMode === "收益计算" 
                    ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50 shadow-lg" 
                    : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <PiggyBank className="h-6 w-6 text-[#00D4AA]" />
                    <h3 className="text-lg font-semibold">理财收益</h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCurrencyModalClick()
                    }}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border border-black transition-all duration-300  ${
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
                <div className="flex items-center gap-4">
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {balanceVisible ? convertBalance(financeData.totalAssets, "USDT", selectedDisplayCurrency) : "****"}
                    <span className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} ml-2`}>
                      {selectedDisplayCurrency}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <TrendChart 
                      data={generateTrendData(true)} 
                      isPositive={true}
                      height={32}
                    />
                  </div>
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  总收益 {balanceVisible ? convertBalance(financeData.totalEarnings, "USDT", selectedDisplayCurrency) : "****"} {selectedDisplayCurrency}
                </div>
              </div>

              {/* 理财持仓卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-6 transition-all duration-300 ease-out ${
                  financeMode === "当前持仓" 
                    ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50 shadow-lg" 
                    : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-6 w-6 text-[#00D4AA]" />
                    <h3 className="text-lg font-semibold">理财持仓</h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCurrencyModalClick()
                    }}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border border-black transition-all duration-300  ${
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
                <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {balanceVisible ? convertBalance("8,456.78", "USDT", selectedDisplayCurrency) : "****"}
                  <span className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} ml-2`}>
                    {selectedDisplayCurrency}
                  </span>
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  持仓资产金额
                </div>
              </div>

              {/* 账户余额卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-6 transition-all duration-300 ease-out ${
                  financeMode === "账户余额" 
                    ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50 shadow-lg" 
                    : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-6 w-6 text-[#00D4AA]" />
                    <h3 className="text-lg font-semibold">账户余额</h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCurrencyModalClick()
                    }}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border border-black transition-all duration-300  ${
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
                <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {balanceVisible ? convertBalance("2,345.67", "USDT", selectedDisplayCurrency) : "****"}
                  <span className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} ml-2`}>
                    {selectedDisplayCurrency}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    可用于理财投资
                  </div>
                  <Button 
                    size="sm"
                    className="h-8 px-3 text-xs font-medium bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      // 划转功能
                    }}
                  >
                    <ArrowLeftRight className="h-3 w-3 mr-1" />
                    划转
                  </Button>
                </div>
              </div>
            </div>

            {/* 理财账户标签页和操作按钮 */}
            <div className="flex justify-between items-center">
              {/* 左侧：标签页 */}
              <div className={`relative flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'}`}>
                {/* 滑动背景 */}
                <div
                  className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'}`}
                  style={{
                    width: '96px',
                    left: financeMode === "收益计算" ? '4px' : financeMode === "当前持仓" ? '100px' : '196px'
                  }}
                />
                {/* 按钮 */}
                {[
                  { id: "收益计算", label: "收益计算" },
                  { id: "当前持仓", label: "当前持仓" },
                  { id: "账户余额", label: "账户余额" }
                ].map((tab, index) => (
                  <button
                    key={tab.id}
                    className={`relative z-10 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      financeMode === tab.id
                        ? isDark ? "text-black" : "text-white"
                        : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    style={{
                      width: '96px',
                      height: '32px'
                    }}
                    onClick={() => {
                      setFinanceMode(tab.id)
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 右侧：操作按钮 */}
              <div className="flex gap-2">
                {/* 主要操作按钮 */}
                {[
                  { id: "finance-transfer", label: "划转", icon: ArrowLeftRight },
                  { id: "finance-exchange", label: "闪兑", icon: RefreshCw }
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
                      className={`h-10 px-3 transition-all duration-200 text-sm font-bold ${
                        isClicked
                          ? "bg-[#00D4AA] text-white border-[#00D4AA]"
                          : isSelected 
                            ? "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]" 
                            : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                      }`}
                      variant="outline"
                    >
                      <Icon className="h-4 w-4 mr-1" />
                      {button.label}
                    </Button>
                  )
                })}
                
                {/* 分隔线 */}
                <div className={`w-px h-10 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
                
                {/* 图标按钮区域 */}
                {/* 资金记录按钮 */}
                <Button
                  onClick={() => handleActionClick("finance-fund-records")}
                  onMouseDown={() => setClickedAction("finance-fund-records")}
                  onMouseUp={() => setClickedAction("")}
                  onMouseLeave={() => setClickedAction("")}
                  className={`h-10 w-10 transition-all duration-200 ${
                    clickedAction === "finance-fund-records"
                      ? "bg-[#00D4AA] border-[#00D4AA]"
                      : selectedAction === "finance-fund-records"
                        ? "bg-[#00D4AA]/10 border-[#00D4AA]"
                        : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                  title="资金记录"
                >
                  <FileText 
                    className={`h-4 w-4 transition-colors ${
                      clickedAction === "finance-fund-records"
                        ? "text-white"
                        : selectedAction === "finance-fund-records" 
                          ? "text-[#00D4AA]"
                          : "text-black dark:text-white"
                    }`} 
                  />
                </Button>

                {/* 投资记录按钮 */}
                <Button
                  onClick={() => handleActionClick("finance-investment-records")}
                  onMouseDown={() => setClickedAction("finance-investment-records")}
                  onMouseUp={() => setClickedAction("")}
                  onMouseLeave={() => setClickedAction("")}
                  className={`h-10 w-10 transition-all duration-200 ${
                    clickedAction === "finance-investment-records"
                      ? "bg-[#00D4AA] border-[#00D4AA]"
                      : selectedAction === "finance-investment-records"
                        ? "bg-[#00D4AA]/10 border-[#00D4AA]"
                        : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                  title="投资记录"
                >
                  <Target 
                    className={`h-4 w-4 transition-colors ${
                      clickedAction === "finance-investment-records"
                        ? "text-white"
                        : selectedAction === "finance-investment-records" 
                          ? "text-[#00D4AA]"
                          : "text-black dark:text-white"
                    }`} 
                  />
                </Button>

                {/* 持仓分布按钮 */}
                <Button
                  onClick={() => handleActionClick("finance-position-distribution")}
                  onMouseDown={() => setClickedAction("finance-position-distribution")}
                  onMouseUp={() => setClickedAction("")}
                  onMouseLeave={() => setClickedAction("")}
                  className={`h-10 w-10 transition-all duration-200 ${
                    clickedAction === "finance-position-distribution"
                      ? "bg-[#00D4AA] border-[#00D4AA]"
                      : selectedAction === "finance-position-distribution"
                        ? "bg-[#00D4AA]/10 border-[#00D4AA]"
                        : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                  title="持仓分布"
                >
                  <PieChart 
                    className={`h-4 w-4 transition-colors ${
                      clickedAction === "finance-position-distribution"
                        ? "text-white"
                        : selectedAction === "finance-position-distribution" 
                          ? "text-[#00D4AA]"
                          : "text-black dark:text-white"
                    }`} 
                  />
                </Button>
              </div>
            </div>

            {/* 动态内容区域 */}
            <div className={`${cardStyle} rounded-lg p-6`}>
              {financeMode === "收益计算" && (
                <div>
                  
                  {/* UBX收益概览 */}
                  <div className="mb-8">
                    <h4 className="text-md font-medium mb-4">UBX收益概览</h4>
                    
                    {/* Top Row - 4 Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {/* 今日收益 */}
                      <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                        <div className="text-xs text-gray-500 mb-1">今日收益 ⓘ</div>
                        <div className="text-lg font-bold text-[#00D4AA]">+0.0000</div>
                        <div className="text-xs text-[#00D4AA]">UBX</div>
                        <div className="text-xs text-gray-500">≈0.00 USDT</div>
                      </div>

                      {/* 今日挖矿 */}
                      <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                        <div className="text-xs text-gray-500 mb-1">今日挖矿</div>
                        <div className="text-lg font-bold text-[#00D4AA]">+0.0000</div>
                        <div className="text-xs text-[#00D4AA]">UBX</div>
                        <div className="text-xs text-gray-500">≈0.00 USDT</div>
                      </div>

                      {/* 当前可收挖矿量 */}
                      <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                        <div className="text-xs text-gray-500 mb-1">当前可收挖矿量</div>
                        <div className="text-lg font-bold">0.0000</div>
                        <div className="text-xs">UBX</div>
                        <button className="mt-2 px-3 py-1 bg-[#00D4AA] text-black text-xs rounded">
                          领取UBX
                        </button>
                      </div>

                      {/* 超出领取挖矿量 */}
                      <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                        <div className="text-xs text-gray-500 mb-1">超出领取挖矿量</div>
                        <div className="text-lg font-bold">0.0000</div>
                        <div className="text-xs">UBX</div>
                        <button className="mt-2 px-3 py-1 border border-gray-400 text-xs rounded">
                          提升额度
                        </button>
                        <span className="text-xs ml-1">ⓘ</span>
                      </div>
                    </div>

                    {/* Alert Box */}
                    <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded-lg p-3 mb-6">
                      <div className="text-orange-800 dark:text-orange-300 text-sm">
                        <span className="font-medium">超出挖矿收益警告</span>
                        <span className="ml-2">时间: 16:19:02</span>
                      </div>
                      <div className="text-orange-700 dark:text-orange-400 text-xs mt-1">
                        可挖矿额度不足小于每日挖矿收益，超出部分会在明日00:00(UTC+1)清零。
                      </div>
                    </div>
                  </div>

                  {/* UBC收益概览 */}
                  <div className="mb-8">
                    <h4 className="text-md font-medium mb-4">UBC收益概览</h4>
                    
                    {/* UBC Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* 来矿可领取 */}
                      <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                        <div className="text-xs text-gray-500 mb-1">来矿可领取 ⓘ</div>
                        <div className="text-lg font-bold text-[#00D4AA]">+0.0000</div>
                        <div className="text-xs text-[#00D4AA]">UBC</div>
                        <div className="text-xs text-gray-500">≈0.00 USDT</div>
                      </div>

                      {/* 今日挖矿 */}
                      <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                        <div className="text-xs text-gray-500 mb-1">今日挖矿</div>
                        <div className="text-lg font-bold text-[#00D4AA]">+0.0000</div>
                        <div className="text-xs text-[#00D4AA]">UBC</div>
                        <div className="text-xs text-gray-500">≈0.00 USDT</div>
                        <button className="mt-2 px-3 py-1 border border-gray-400 text-xs rounded">
                          领取UBC
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 累计发放收益 */}
                  <div>
                    <h4 className="text-md font-medium mb-4">累计发放收益</h4>
                    
                    <div className="grid grid-cols-2 gap-6">
                      {/* UBX Statistics */}
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-sm font-medium mb-2">UBX</div>
                          <div className="text-2xl font-bold">0.0000</div>
                          <div className="text-xs text-gray-500">≈0.00 USDT</div>
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>今日 +0.0000</span>
                            <span>月累计 +0.0000</span>
                          </div>
                        </div>
                      </div>

                      {/* UBC Statistics */}
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-sm font-medium mb-2">UBC</div>
                          <div className="text-2xl font-bold">0.0000</div>
                          <div className="text-xs text-gray-500">≈0.00 USDT</div>
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>今日 +0.0000</span>
                            <span>月累计 +0.0000</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Final Summary */}
                    <div className="mt-6 text-center">
                      <div className="flex items-center justify-center space-x-4 text-sm">
                        <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          合计: <span className="font-medium">0.00 USDT</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {financeMode === "当前持仓" && (
                <div>
                  <div className="space-y-4">
                    {financeData.products.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-[#3a3d4a] hover:shadow-md transition-all">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                            <PiggyBank className="h-5 w-5 text-[#00D4AA]" />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              年化收益率: {product.apy}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{balanceVisible ? product.amount : "****"}</div>
                          <div className={`text-sm text-[#00D4AA]`}>
                            {balanceVisible ? product.earnings : "****"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {financeMode === "账户余额" && (
                <div>
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className={`border-b ${isDark ? 'border-[#3a3d4a]' : 'border-gray-200'}`}>
                            <th className="text-left py-3 px-4 font-medium">币种</th>
                            <th className="text-right py-3 px-4 font-medium">可用余额</th>
                            <th className="text-right py-3 px-4 font-medium">冻结金额</th>
                            <th className="text-center py-3 px-4 font-medium">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { symbol: "USDT", name: "Tether USD", available: "2,345.67", frozen: "0.00" },
                            { symbol: "BTC", name: "Bitcoin", available: "0.05234", frozen: "0.00" },
                            { symbol: "ETH", name: "Ethereum", available: "1.2345", frozen: "0.00" },
                            { symbol: "UBX", name: "UBX Token", available: "1,000.00", frozen: "50.00" },
                            { symbol: "UBC", name: "UBC Token", available: "500.00", frozen: "25.00" }
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
                                {balanceVisible ? currency.available : "****"}
                              </td>
                              <td className="text-right py-4 px-4 font-medium text-gray-500">
                                {balanceVisible ? currency.frozen : "****"}
                              </td>
                              <td className="text-center py-4 px-4">
                                <div className="flex items-center justify-center space-x-2">
                                  <Button 
                                    size="sm"
                                    className="h-8 px-3 text-xs font-medium bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                  >
                                    划转
                                  </Button>
                                  <Button 
                                    size="sm"
                                    className="h-8 px-3 text-xs font-medium bg-transparent border border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                                  >
                                    闪兑
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case "担保账户":
        return (
          <div className="space-y-6">
            {/* 担保账户卡片区域 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 交易担保金额 (合并应收应付) */}
              <Card 
                className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <CardHeader className="pb-2">
                  <CardTitle className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center`}>
                    <ArrowLeftRight className="h-4 w-4 mr-2 text-[#00D4AA]" />
                    交易担保金额
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ArrowDown className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">应收</span>
                      </div>
                      <div className="flex items-baseline space-x-1">
                        <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          1,234.56
                        </span>
                        <span className="text-sm text-[#00D4AA] font-medium">USDT</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ArrowUp className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">应付</span>
                      </div>
                      <div className="flex items-baseline space-x-1">
                        <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          987.65
                        </span>
                        <span className="text-sm text-[#00D4AA] font-medium">USDT</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 信誉担保金额 */}
              <Card 
                className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <CardHeader className="pb-2">
                  <CardTitle className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center`}>
                    <Shield className="h-4 w-4 mr-2 text-blue-400 dark:text-blue-500" />
                    信誉担保金额
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-baseline space-x-1 mb-4">
                    <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      5,000.00
                    </span>
                    <span className="text-sm text-[#00D4AA] font-medium">USDT</span>
                  </div>
                  <div>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      担保解冻时间：00天00小时00分钟00秒
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* 可用余额 */}
              <Card className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-2">
                  <CardTitle className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center`}>
                    <DollarSign className="h-4 w-4 mr-2 text-[#00D4AA]" />
                    可用余额
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      2,456.78
                    </span>
                    <span className="text-sm text-[#00D4AA] font-medium">USDT</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      可划转至现金账户
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 担保账户标签页和操作按钮 */}
            <div className="flex justify-between items-center">
              {/* 左侧：标签页 */}
              <div className={`relative flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'}`}>
                {/* 滑动背景 */}
                <div
                  className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'}`}
                  style={{
                    width: '120px',
                    left: selectedGuaranteeTab === "收款担保" ? '4px' : '124px'
                  }}
                />
                {/* 按钮 */}
                {[
                  { id: "收款担保", label: "收款担保" },
                  { id: "付款担保", label: "付款担保" }
                ].map((tab, index) => (
                  <button
                    key={tab.id}
                    className={`relative z-10 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      selectedGuaranteeTab === tab.id
                        ? isDark ? "text-black" : "text-white"
                        : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    style={{
                      width: '120px',
                      height: '32px'
                    }}
                    onClick={() => {
                      setSelectedGuaranteeTab(tab.id)
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 右侧：操作按钮 */}
              <div className="flex gap-2">
                {/* 主要操作按钮 */}
                {[
                  { id: "add-credit", label: "增加信誉担保金", icon: Shield },
                  { id: "extend-time", label: "延长信誉担保时间", icon: Clock },
                  { id: "transfer", label: "划转", icon: ArrowLeftRight }
                ].map((button) => {
                  const Icon = button.icon
                  const isSelected = selectedAction === button.id
                  const isClicked = clickedAction === button.id
                  
                  return (
                    <Button 
                      key={button.id}
                      onClick={() => {
                        if (button.id === "add-credit") {
                          setShowAddCreditModal(true)
                        } else if (button.id === "extend-time") {
                          setShowExtendTimeModal(true)
                        } else if (button.id === "transfer") {
                          setShowTransferModal(true)
                        }
                      }}
                      onMouseDown={() => setClickedAction(button.id)}
                      onMouseUp={() => setClickedAction("")}
                      onMouseLeave={() => setClickedAction("")}
                      className={`h-10 px-3 transition-all duration-200 text-sm font-bold ${
                        isClicked
                          ? "bg-[#00D4AA] text-white border-[#00D4AA]"
                          : isSelected 
                            ? "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]" 
                            : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                      }`}
                      variant="outline"
                    >
                      <Icon className="h-4 w-4 mr-1" />
                      {button.label}
                    </Button>
                  )
                })}
                
                {/* 分隔线 */}
                <div className={`w-px h-10 ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
                
                {/* 图标按钮区域 */}
                {/* 资金记录按钮 */}
                <Button
                  onClick={() => setSelectedGuaranteeTab("资金记录")}
                  className={`h-10 w-10 transition-all duration-200 ${
                    selectedGuaranteeTab === "资金记录"
                      ? "bg-[#00D4AA] border-[#00D4AA] text-white"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                  title="资金记录"
                >
                  <FileText 
                    className={`h-4 w-4 transition-colors ${
                      selectedGuaranteeTab === "资金记录"
                        ? "text-white"
                        : "text-black dark:text-white"
                    }`} 
                  />
                </Button>

                {/* 交易记录按钮 */}
                <Button
                  onClick={() => setSelectedGuaranteeTab("交易记录")}
                  className={`h-10 w-10 transition-all duration-200 ${
                    selectedGuaranteeTab === "交易记录"
                      ? "bg-[#00D4AA] border-[#00D4AA] text-white"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                  title="交易记录"
                >
                  <BarChart3 
                    className={`h-4 w-4 transition-colors ${
                      selectedGuaranteeTab === "交易记录"
                        ? "text-white"
                        : "text-black dark:text-white"
                    }`} 
                  />
                </Button>

                {/* 担保记录按钮 */}
                <Button
                  onClick={() => setSelectedGuaranteeTab("担保记录")}
                  className={`h-10 w-10 transition-all duration-200 ${
                    selectedGuaranteeTab === "担保记录"
                      ? "bg-[#00D4AA] border-[#00D4AA] text-white"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                  title="担保记录"
                >
                  <History 
                    className={`h-4 w-4 transition-colors ${
                      selectedGuaranteeTab === "担保记录"
                        ? "text-white"
                        : "text-black dark:text-white"
                    }`} 
                  />
                </Button>
              </div>

            </div>

            {/* 详细内容区域 */}
            <div className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm overflow-hidden">
              {renderGuaranteeContent()}
            </div>

            {/* 模态框 */}
            {showTransferModal && renderTransferModal()}
            {showAddCreditModal && renderAddCreditModal()}
            {showExtendTimeModal && renderExtendTimeModal()}
            {showContractModal && selectedContract && renderContractModal()}
          </div>
        )

      case "BePAY账户":
        // 定义法币和加密货币页签
        const fiatTabs = [
          { id: "商户资产", label: "商户资产", icon: Landmark },
          { id: "通道配置", label: "通道配置", icon: Network },
          { id: "法币下发", label: "法币下发", icon: Repeat },
          { id: "代付金充值", label: "代付金充值", icon: Plus }
        ]
        const fiatIconTabs = [
          { id: "资金记录", icon: FileText },
          { id: "订单记录", icon: BarChart2 },
          { id: "资产分布", icon: PieChart }
        ]
        
        const cryptoTabs = [
          { id: "商户资产", label: "商户资产", icon: Landmark },
          { id: "地址管理", label: "地址管理", icon: Link },
          { id: "OTC供应商", label: "OTC供应商", icon: Network },
          { id: "划转", label: "划转", icon: ArrowLeftRight }
        ]
        const cryptoIconTabs = [
          { id: "划转记录", icon: FileText },
          { id: "订单记录", icon: BarChart2 },
          { id: "资产分布", icon: PieChart }
        ]
        
        return (
          <div className="space-y-6">
            {/* 顶部卡片：法币支付API和加密货币支付API */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 商户法币资产卡片 */}
              <div 
                onClick={() => setSelectedPaymentCard("fiat")}
                className={`cursor-pointer transition-all duration-300 ${cardStyle} rounded-lg p-6 ${
                  selectedPaymentCard === "fiat" ? "ring-2 ring-[#00D4AA] ring-opacity-50" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Banknote className="h-6 w-6 text-[#00D4AA]" />
                    <h3 className="text-lg font-semibold">法币支付API</h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border-2 border-black transition-all ${
                      isDark 
                        ? "bg-transparent text-white hover:bg-gray-800" 
                        : "bg-white text-black hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
                      <span className="text-white text-[8px]">$</span>
                    </div>
                    <span>USD</span>
                    <ChevronDown className="h-2 w-2" />
                  </button>
                </div>
                <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {balanceVisible ? "$125,860.00" : "****"}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 text-sm">
                    代付备用金：$38,520.00
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle API documentation click
                    }}
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                      isDark 
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                    }`}
                    title="API文档"
                  >
                    API文档
                  </button>
                </div>
              </div>

              {/* 商户加密货币资产卡片 */}
              <div 
                onClick={() => setSelectedPaymentCard("crypto")}
                className={`cursor-pointer transition-all duration-300 ${cardStyle} rounded-lg p-6 ${
                  selectedPaymentCard === "crypto" ? "ring-2 ring-[#00D4AA] ring-opacity-50" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Coins className="h-6 w-6 text-[#3B82F6]" />
                    <h3 className="text-lg font-semibold">加密货币支付API</h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border-2 border-black transition-all ${
                      isDark 
                        ? "bg-transparent text-white hover:bg-gray-800" 
                        : "bg-white text-black hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">
                      <span className="text-white text-[8px]">₮</span>
                    </div>
                    <span>USDT</span>
                    <ChevronDown className="h-2 w-2" />
                  </button>
                </div>
                <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {balanceVisible ? "45,230.50 USDT" : "****"}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-500 text-sm">
                    其他币种：28.95 ETH + 1.26 BTC
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle API documentation click
                    }}
                    className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                      isDark 
                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                    }`}
                    title="API文档"
                  >
                    API文档
                  </button>
                </div>
              </div>
            </div>

            {/* 操作按钮区域 */}
            <div className="transition-all duration-300 ease-out">
              <div className="flex flex-col md:flex-row gap-4">
                {/* 主要操作按钮 - 自动适配屏幕宽度 */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {selectedPaymentCard === "fiat" ? (
                    fiatTabs.map((tab) => {
                      const Icon = tab.icon
                      const isSelected = fiatTab === tab.id
                      
                      return (
                        <Button 
                          key={tab.id}
                          onClick={() => {
                            if (tab.id === "法币下发") {
                              setSelectedFiatCurrency("USD")
                              setShowExchangeModal(true)
                            } else if (tab.id === "代付金充值") {
                              setStandbyRechargeCurrency("USD")
                              setShowStandbyRechargeModal(true)
                              setTimeout(() => setStandbyRechargeAnimating(true), 50)
                            } else {
                              setFiatTab(tab.id)
                            }
                          }}
                          className={`h-12 transition-all duration-200 text-base font-bold ${
                            isSelected
                              ? "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]" 
                              : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                          }`}
                          variant="outline"
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {tab.label}
                        </Button>
                      )
                    })
                  ) : (
                    cryptoTabs.map((tab) => {
                      const Icon = tab.icon
                      const isSelected = cryptoTab === tab.id
                      
                      return (
                        <Button 
                          key={tab.id}
                          onClick={() => setCryptoTab(tab.id)}
                          className={`h-12 transition-all duration-200 text-base font-bold ${
                            isSelected
                              ? "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]" 
                              : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                          }`}
                          variant="outline"
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {tab.label}
                        </Button>
                      )
                    })
                  )}
                </div>
                
                {/* 图标按钮区域 - 右对齐 */}
                <div className="flex justify-end md:justify-center gap-3">
                  {selectedPaymentCard === "fiat" ? (
                    fiatIconTabs.map((tab) => {
                      const Icon = tab.icon
                      const isSelected = fiatTab === tab.id
                      
                      return (
                        <Button
                          key={tab.id}
                          onClick={tab.id === "资产分布" ? handlePositionModalClick : () => setFiatTab(tab.id)}
                          className={`h-12 w-12 transition-all duration-200 ${
                            isSelected
                              ? "bg-[#00D4AA]/10 border-[#00D4AA]"
                              : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                          }`}
                          variant="outline"
                          title={tab.id}
                        >
                          <Icon 
                            className={`h-4 w-4 transition-colors ${
                              isSelected 
                                ? "text-[#00D4AA]"
                                : "text-black dark:text-white"
                            }`} 
                          />
                        </Button>
                      )
                    })
                  ) : (
                    cryptoIconTabs.map((tab) => {
                      const Icon = tab.icon
                      const isSelected = cryptoTab === tab.id
                      
                      return (
                        <Button
                          key={tab.id}
                          onClick={tab.id === "资产分布" ? handlePositionModalClick : () => setCryptoTab(tab.id)}
                          className={`h-12 w-12 transition-all duration-200 ${
                            isSelected
                              ? "bg-[#00D4AA]/10 border-[#00D4AA]"
                              : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800"
                          }`}
                          variant="outline"
                          title={tab.id}
                        >
                          <Icon 
                            className={`h-4 w-4 transition-colors ${
                              isSelected 
                                ? "text-[#00D4AA]"
                                : "text-black dark:text-white"
                            }`} 
                          />
                        </Button>
                      )
                    })
                  )}
                </div>
              </div>
            </div>

            {/* 页签内容 */}
            <div className={`${cardStyle} rounded-lg p-6`}>
              {selectedPaymentCard === "fiat" ? (
                <div>
                  {fiatTab === "商户资产" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="搜索法币..."
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
                            className={`w-10 h-10 rounded-lg border transition-all  flex items-center justify-center ${
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
                        </div>
                      </div>

                      {/* 法币资产列表 */}
                      <div className="grid gap-4">
                        {[
                          { currency: "USD", merchantBalance: "85,430.50", standbyBalance: "25,430.50", symbol: "$" },
                          { currency: "EUR", merchantBalance: "12,680.25", standbyBalance: "8,680.25", symbol: "€" },
                          { currency: "GBP", merchantBalance: "8,950.75", standbyBalance: "3,950.75", symbol: "£" },
                          { currency: "JPY", merchantBalance: "2,580,000", standbyBalance: "890,000", symbol: "¥" }
                        ].map((asset) => (
                          <div key={asset.currency} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 商户资产卡片 */}
                            <div className={`flex items-center justify-between p-4 rounded-lg ${cardStyle} cursor-pointer hover:bg-opacity-80 transition-colors`}
                                 onClick={() => {
                                   setSelectedFiatCurrency(asset.currency)
                                   setShowExchangeModal(true)
                                 }}>
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-[#00D4AA]`}>
                                  {asset.symbol}
                                </div>
                                <div className="flex-1">
                                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.currency}</div>
                                  <div className="text-sm text-gray-500">商户资产</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-6">
                                <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.merchantBalance}</div>
                                <Button 
                                  size="sm" 
                                  className="bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800 w-10 h-10 p-0"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedFiatCurrency(asset.currency)
                                    setShowExchangeModal(true)
                                  }}
                                >
                                  <ArrowUpRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* 代付备用金卡片 */}
                            <div 
                              className={`flex items-center justify-between p-4 rounded-lg ${cardStyle} cursor-pointer hover:bg-opacity-80 transition-colors`}
                              onClick={(e) => {
                                setStandbyRechargeCurrency(asset.currency)
                                handleStandbyRechargeClick(e)
                              }}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-[#00D4AA]`}>
                                  {asset.symbol}
                                </div>
                                <div className="flex-1">
                                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.currency}</div>
                                  <div className="text-sm text-gray-500">代付备用金</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-6">
                                <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.standbyBalance}</div>
                                <Button 
                                  size="sm" 
                                  className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 border-0 w-10 h-10 p-0"
                                  variant="outline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ArrowDownLeft className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 加载更多按钮 */}
                      <div className="text-center pt-4">
                        <Button
                          variant="outline"
                          className={`px-6 py-2 ${isDark ? 'border-[#3a3d4a] text-gray-300 hover:bg-[#2a2d3a]' : 'border-gray-300'}`}
                        >
                          加载更多 (4)
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {fiatTab === "通道配置" && (
                    <div className="space-y-6">
                      {/* 页签导航 - 币种和代收/代付在同一行 */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between">
                            {/* 左侧 - 币种页签 */}
                            <div className="flex items-center space-x-2">
                              {selectedCurrencies.map((currency, index) => (
                                <button
                                  key={currency}
                                  onClick={() => {
                                    setCurrencyTab(currency);
                                    setPaymentMethodTab("代收");
                                  }}
                                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                    currencyTab === currency
                                      ? isDark 
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                      : isDark
                                        ? "text-gray-300 hover:text-white"
                                        : "text-gray-700 hover:text-gray-900"
                                  }`}
                                >
                                  {currency}
                                </button>
                              ))}
                              <button
                                onClick={() => setShowMoreCurrencies(true)}
                                className={`w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center ${
                                  isDark
                                    ? "text-gray-300 hover:text-white hover:bg-[#2a2d3a]"
                                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                }`}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            {/* 右侧 - 代收/代付页签 */}
                            <div className={`flex rounded-full p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-100'}`}>
                              {getPaymentMethods(currencyTab).map((method, index) => (
                                <button
                                  key={method}
                                  onClick={() => setPaymentMethodTab(method)}
                                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                                    paymentMethodTab === method
                                      ? isDark ? "bg-white text-black" : "bg-black text-white"
                                      : isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
                                  }`}
                                >
                                  {method}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {getChannelsByCategory(currencyTab, paymentMethodTab).map((channel, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-[#3a3d4a] rounded-lg hover:shadow-md transition-all">
                              <div className="flex items-center space-x-4">
                                <div className={`w-3 h-3 rounded-full ${
                                  channel.color === 'green' ? 'bg-green-500' :
                                  channel.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}></div>
                                <div>
                                  <div className="font-semibold">{channel.name}</div>
                                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {channel.type} • 成功率 {channel.successRate}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-6 text-sm">
                                <div className="text-center">
                                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>日限额</div>
                                  <div className="font-semibold">{channel.dailyLimit}</div>
                                </div>
                                <div className="text-center">
                                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>单笔限额</div>
                                  <div className="font-semibold">{channel.minLimit}~{channel.maxLimit}</div>
                                </div>
                                <div className="text-center">
                                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>手续费</div>
                                  <div className="font-semibold">{channel.fee}</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="h-8 px-3 text-xs"
                                    onClick={() => {
                                      // 打开收银台测试页面
                                      window.open('/test-cashier?channel=' + encodeURIComponent(channel.name), '_blank');
                                    }}
                                  >
                                    测试
                                  </Button>
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => {
                                        // 切换通道开关状态的逻辑
                                        console.log(`切换 ${channel.name} 状态:`, !channel.enabled);
                                      }}
                                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        channel.enabled 
                                          ? 'bg-[#00D4AA]' 
                                          : isDark ? 'bg-gray-600' : 'bg-gray-300'
                                      }`}
                                    >
                                      <span
                                        className={`inline-block h-4 w-4 rounded-full bg-white transition-${
                                          channel.enabled ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                    </div>
                  )}
                  
                  {/* 其他法币功能页签内容 */}
                </div>
              ) : (
                <div>
                  {cryptoTab === "商户资产" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="搜索加密货币..."
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
                            className={`w-10 h-10 rounded-lg border transition-all  flex items-center justify-center ${
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
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[
                          { symbol: "USDT", name: "Tether", balance: "45,230.50", value: "45,230.50", marketCap: "117.9B" },
                          { symbol: "BTC", name: "Bitcoin", balance: "1.25680", value: "62,450.00", marketCap: "1.2T" },
                          { symbol: "ETH", name: "Ethereum", balance: "28.9520", value: "89,756.30", marketCap: "400.8B" },
                          { symbol: "BNB", name: "BNB", balance: "156.750", value: "67,043.75", marketCap: "85.6B" }
                        ].map((currency, index) => (
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
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0">
                                <KlineChart 
                                  height={28}
                                  width={64}
                                />
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
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {cryptoTab === "地址管理" && (
                    <div className="space-y-6">
                      {/* 网络筛选 */}
                      <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
                        {["TRC20", "ERC20", "BTC", "BSC", "XRP", "Solana", "Matrix"].map((network) => (
                          <button
                            key={network}
                            onClick={() => setSelectedNetwork(network)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all border ${
                              selectedNetwork === network
                                ? isDark 
                                  ? "bg-white text-black border-white"
                                  : "bg-black text-white border-black"
                                : isDark 
                                  ? "bg-transparent text-white border-white hover:bg-white hover:text-black"
                                  : "bg-transparent text-black border-black hover:bg-black hover:text-white"
                            }`}
                          >
                            {network}
                          </button>
                        ))}
                      </div>

                      {/* 合并统计卡片 */}
                      <div className="grid grid-cols-6 gap-4">
                        {/* 卡片1: TRC20地址总数 */}
                        <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                          <div className="flex items-center justify-center">
                            <span className="text-2xl font-bold">4</span>
                            <span className="text-lg font-medium mx-1">/</span>
                            <span className="text-blue-500 text-sm font-medium">18</span>
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-1`}>TRC20地址总数</div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>总地址数</div>
                        </div>
                        
                        {/* 卡片2: 已分配TRC20地址数 */}
                        <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                          <div className="flex items-center justify-center">
                            <span className="text-2xl font-bold text-green-500">3</span>
                            <span className="text-lg font-medium mx-1">/</span>
                            <span className="text-red-500 text-sm font-medium">1</span>
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-1`}>已分配TRC20地址数</div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>未分配TRC20地址数</div>
                        </div>
                        
                        {/* 卡片3: 已分配总地址数 */}
                        <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                          <div className="flex items-center justify-center">
                            <span className="text-2xl font-bold text-green-500">16</span>
                            <span className="text-lg font-medium mx-1">/</span>
                            <span className="text-red-500 text-sm font-medium">2</span>
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-1`}>已分配总地址数</div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>未分配总地址数</div>
                        </div>
                        
                        {/* 卡片4: 本月地址费用 */}
                        <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                          <div className="flex items-center justify-center">
                            <span className="text-2xl font-bold text-orange-500">7</span>
                            <span className="text-lg font-medium mx-1">/</span>
                            <span className="text-purple-500 text-sm font-medium">6</span>
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} ml-1`}>U</span>
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-1`}>本月地址费用</div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>上月地址费用</div>
                        </div>
                        
                        {/* 卡片5: 本月TRC20地址费用 */}
                        <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                          <div className="flex items-center justify-center">
                            <span className="text-2xl font-bold text-orange-500">1</span>
                            <span className="text-lg font-medium mx-1">/</span>
                            <span className="text-purple-500 text-sm font-medium">0.8</span>
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} ml-1`}>U</span>
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-1`}>本月TRC20地址费用</div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>上月TRC20费用</div>
                        </div>
                        
                        {/* 卡片6: TRC20地址价格 */}
                        <div className={`${cardStyle} rounded-lg p-4 text-center`}>
                          <div className="text-2xl font-bold text-blue-500">100 <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>U</span></div>
                          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-1`}>TRC20地址价格</div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>计费单位：<span className="text-green-500">1000</span>地址</div>
                        </div>
                      </div>

                      {/* 搜索栏 */}
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            value={addressSearchTerm}
                            onChange={(e) => setAddressSearchTerm(e.target.value)}
                            placeholder="搜索地址或用户ID..."
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border text-sm ${
                              isDark 
                                ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400" 
                                : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                            }`}
                          />
                        </div>
                        <button
                          onClick={() => setShowPurchaseAddressModal(true)}
                          className={`px-4 py-3 rounded-lg text-sm font-medium border transition-all ${
                            isDark 
                              ? "bg-white text-black border-white hover:bg-gray-100"
                              : "bg-black text-white border-black hover:bg-gray-800"
                          }`}
                        >
                          添加地址
                        </button>
                      </div>

                      {/* 地址表格 */}
                      <div className={`${cardStyle} rounded-lg overflow-hidden`}>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className={`border-b ${isDark ? 'border-[#3a3d4a]' : 'border-gray-200'}`}>
                                <th className={`text-left py-4 px-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>网络</th>
                                <th className={`text-left py-4 px-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>地址</th>
                                <th className={`text-left py-4 px-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>用户ID</th>
                                <th className={`text-left py-4 px-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>状态</th>
                                <th className={`text-left py-4 px-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>操作</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredAddressList.map((address, index) => (
                                <tr key={index} className={`border-b ${isDark ? 'border-[#3a3d4a]' : 'border-gray-100'} hover:bg-gray-50 dark:hover:bg-[#3a3d4a] transition-all`}>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-lg">{getNetworkLogo(address.network)}</span>
                                      <span className="text-sm font-medium">{address.network}</span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm font-mono">{address.shortAddress}</span>
                                      <button
                                        onClick={() => copyToClipboard(address.fullAddress)}
                                        className="text-gray-400 hover:text-gray-600 transition-all"
                                        title="复制地址"
                                      >
                                        <Copy className="h-3 w-3" />
                                      </button>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className="text-sm">{address.userId}</span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className={`w-8 h-4 rounded-full transition-all ${address.isActive ? 'bg-green-500' : 'bg-gray-300'} relative`}>
                                      <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-all ${address.isActive ? 'left-4' : 'left-0.5'}`}></div>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <button
                                      onClick={() => handleReleaseAddress(address)}
                                      className={`px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
                                        isDark 
                                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                                      }`}
                                      title="释放地址"
                                    >
                                      <Unlink className="w-3 h-3" />
                                      释放地址
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* 添加地址模态框 */}
                      {showAddAddressModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAddAddressModal(false)}>
                          <div className={`${cardStyle} rounded-lg p-6 w-full max-w-md mx-4`} onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold">添加新地址</h3>
                              <button onClick={() => setShowAddAddressModal(false)}>
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium mb-2">币种</label>
                                <select 
                                  value={newAddress.currency}
                                  onChange={(e) => setNewAddress({...newAddress, currency: e.target.value})}
                                  className={`w-full p-3 rounded-lg border text-sm ${
                                    isDark 
                                      ? "bg-[#252842] border-[#3a3d4a] text-white" 
                                      : "bg-white border-gray-300 text-gray-800"
                                  }`}
                                >
                                  <option value="">选择币种</option>
                                  <option value="USDT">USDT</option>
                                  <option value="BTC">BTC</option>
                                  <option value="ETH">ETH</option>
                                  <option value="BNB">BNB</option>
                                  <option value="ADA">ADA</option>
                                  <option value="SOL">SOL</option>
                                </select>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium mb-2">地址标签</label>
                                <input
                                  type="text"
                                  value={newAddress.label}
                                  onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                                  placeholder="例如：主钱包、交易所钱包"
                                  className={`w-full p-3 rounded-lg border text-sm ${
                                    isDark 
                                      ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400" 
                                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                                  }`}
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium mb-2">钱包地址</label>
                                <textarea
                                  value={newAddress.address}
                                  onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                                  placeholder="输入或粘贴钱包地址"
                                  rows={3}
                                  className={`w-full p-3 rounded-lg border text-sm font-mono ${
                                    isDark 
                                      ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400" 
                                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                                  }`}
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium mb-2">地址类型</label>
                                <select 
                                  value={newAddress.type}
                                  onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                                  className={`w-full p-3 rounded-lg border text-sm ${
                                    isDark 
                                      ? "bg-[#252842] border-[#3a3d4a] text-white" 
                                      : "bg-white border-gray-300 text-gray-800"
                                  }`}
                                >
                                  <option value="充值">充值地址</option>
                                  <option value="提现">提现地址</option>
                                </select>
                              </div>
                              
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id="setDefault"
                                  checked={newAddress.isDefault}
                                  onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                                  className="rounded border-gray-300"
                                />
                                <label htmlFor="setDefault" className="ml-2 text-sm">设为默认地址</label>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3 mt-6">
                              <button
                                onClick={() => setShowAddAddressModal(false)}
                                className={`flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                                  isDark 
                                    ? "border-[#3a3d4a] text-gray-300 hover:bg-[#3a3d4a]" 
                                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                                }`}
                              >
                                取消
                              </button>
                              <button
                                onClick={handleAddAddress}
                                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                  isDark 
                                    ? "bg-[#00D4AA] text-black hover:bg-[#00B894]" 
                                    : "bg-[#00D4AA] text-white hover:bg-[#00B894]"
                                }`}
                              >
                                添加地址
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {cryptoTab === "OTC供应商" && (
                    <div className="space-y-6">
                      {/* 供应商选择标签 */}
                      <div className="flex items-center space-x-2 overflow-x-auto">
                        {[
                          { name: "MoonPay", status: "启用" },
                          { name: "Simplex", status: "启用" },
                          { name: "Banxa", status: "启用" },
                          { name: "Mercuryo", status: "暂停" }
                        ].map((supplier) => (
                          <button
                            key={supplier.name}
                            onClick={() => setSelectedSupplier(supplier.name)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                              selectedSupplier === supplier.name
                                ? isDark 
                                  ? "bg-transparent border border-white text-white"
                                  : "bg-transparent border border-black text-black"
                                : isDark 
                                  ? "bg-transparent border border-gray-600 text-white hover:border-white"
                                  : "bg-transparent border border-gray-300 text-gray-700 hover:border-black"
                            }`}
                          >
                            {supplier.name}
                            <span className={`px-1.5 py-0.5 rounded text-xs ${
                              supplier.status === "启用" 
                                ? "bg-green-500 text-white" 
                                : "bg-red-500 text-white"
                            }`}>
                              {supplier.status}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* MoonPay 供应商详情 */}
                      {selectedSupplier === "MoonPay" && (
                        <div className={`${cardStyle} rounded-lg p-6`}>
                          {/* 供应商信息 */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold">MoonPay</h3>
                                <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-[#3a3d4a]">
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                              <span className="text-sm text-gray-500">接入费/月：1000 USDT</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="px-3 py-1 rounded text-sm bg-green-500 text-white">启用</button>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                              </label>
                            </div>
                          </div>

                          {/* 支付方式表格 */}
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className={`border-b ${isDark ? 'border-[#3a3d4a]' : 'border-gray-200'}`}>
                                  <th className={`text-left py-3 px-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>支付货币</th>
                                  <th className={`text-left py-3 px-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>支付方式</th>
                                  <th className={`text-left py-3 px-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>可购买加密货币</th>
                                  <th className={`text-left py-3 px-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>汇率</th>
                                  <th className={`text-left py-3 px-4 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>买卖</th>
                                </tr>
                              </thead>
                              <tbody>
                                {/* USD 美元 */}
                                <tr className={`border-b ${isDark ? 'border-[#3a3d4a]' : 'border-gray-100'}`}>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                                        $
                                      </div>
                                      <span className="font-medium">USD</span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex flex-wrap gap-1">
                                      {["信用卡", "银行转账", "Apple Pay", "Google Pay"].map((method) => (
                                        <span 
                                          key={method}
                                          className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700"
                                        >
                                          {method}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex flex-wrap gap-1">
                                      {["BTC", "ETH", "USDT", "BNB", "SOL", "MATIC", "AVAX"].map((crypto) => (
                                        <span 
                                          key={crypto}
                                          className="px-2 py-1 rounded text-xs bg-green-100 text-green-700"
                                        >
                                          {crypto}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">1.02</span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="text-sm font-medium">
                                      <span className="text-green-600">买</span>
                                      <span className="mx-1">/</span>
                                      <span className="text-green-600">卖</span>
                                    </div>
                                  </td>
                                </tr>

                                {/* EUR 欧元 */}
                                <tr className={`border-b ${isDark ? 'border-[#3a3d4a]' : 'border-gray-100'}`}>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                        €
                                      </div>
                                      <span className="font-medium">EUR</span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex flex-wrap gap-1">
                                      {["信用卡", "SEPA转账", "Apple Pay", "iDEAL"].map((method) => (
                                        <span 
                                          key={method}
                                          className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700"
                                        >
                                          {method}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex flex-wrap gap-1">
                                      {["BTC", "ETH", "USDT", "SOL", "AVAX", "DOT"].map((crypto) => (
                                        <span 
                                          key={crypto}
                                          className="px-2 py-1 rounded text-xs bg-green-100 text-green-700"
                                        >
                                          {crypto}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">1.10</span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="text-sm font-medium">
                                      <span className="text-green-600">买</span>
                                      <span className="mx-1">/</span>
                                      <span className="text-green-600">卖</span>
                                    </div>
                                  </td>
                                </tr>

                                {/* GBP 英镑 */}
                                <tr className={`border-b ${isDark ? 'border-[#3a3d4a]' : 'border-gray-100'}`}>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                        £
                                      </div>
                                      <span className="font-medium">GBP</span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex flex-wrap gap-1">
                                      {["信用卡", "银行转账", "Apple Pay"].map((method) => (
                                        <span 
                                          key={method}
                                          className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700"
                                        >
                                          {method}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex flex-wrap gap-1">
                                      {["BTC", "ETH", "USDT", "SOL"].map((crypto) => (
                                        <span 
                                          key={crypto}
                                          className="px-2 py-1 rounded text-xs bg-green-100 text-green-700"
                                        >
                                          {crypto}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">1.29</span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="text-sm font-medium">
                                      <span className="text-green-600">买</span>
                                      <span className="mx-1">/</span>
                                      <span className="text-gray-400">卖</span>
                                    </div>
                                  </td>
                                </tr>

                                {/* JPY 日元 */}
                                <tr>
                                  <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
                                        ¥
                                      </div>
                                      <span className="font-medium">JPY</span>
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex flex-wrap gap-1">
                                      {["信用卡", "银行转账"].map((method) => (
                                        <span 
                                          key={method}
                                          className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700"
                                        >
                                          {method}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="flex flex-wrap gap-1">
                                      {["BTC", "ETH", "USDT", "SOL"].map((crypto) => (
                                        <span 
                                          key={crypto}
                                          className="px-2 py-1 rounded text-xs bg-green-100 text-green-700"
                                        >
                                          {crypto}
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                  <td className="py-4 px-4">
                                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">0.0070</span>
                                  </td>
                                  <td className="py-4 px-4">
                                    <div className="text-sm font-medium">
                                      <span className="text-gray-400">买</span>
                                      <span className="mx-1">/</span>
                                      <span className="text-gray-400">卖</span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* 其他供应商的占位符 */}
                      {selectedSupplier !== "MoonPay" && (
                        <div className={`${cardStyle} rounded-lg p-8 text-center`}>
                          <div className="text-gray-500">
                            <h3 className="text-lg font-medium mb-2">{selectedSupplier}</h3>
                            <p className="text-sm">供应商配置页面开发中...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* 其他加密货币功能页签内容 */}
                </div>
              )}
            </div>
          </div>
        )

      case "U卡账户":
        return (
          <div className="space-y-6">
            {/* 两个账户卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 虚拟卡账户总览 */}
              <div 
                className={`rounded-lg p-6 transition-all duration-200 ${cardStyle} ${
                  selectedUCardView === "virtual"
                    ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50 shadow-lg" 
                    : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold">虚拟卡总余额</h3>
                  <CreditCard className={`h-5 w-5 ${
                    selectedUCardView === "virtual" ? "text-[#00D4AA]" : "text-gray-600 dark:text-gray-400"
                  }`} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-lg font-bold mr-1">{balanceVisible ? "2,222.22" : "****"}</span>
                    <span className="text-xs text-gray-500">USDT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">本月消费</span>
                      <span className="text-sm text-red-500">-678.90 USDT</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">卡片数</span>
                      <span className="text-sm text-blue-600 font-medium">2张</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gray-300 p-1.5 h-7 w-7"
                      >
                        <TrendingUp className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gray-300 p-1.5 h-7 w-7"
                      >
                        <FileText className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 实体卡账户总览 */}
              <div 
                className={`rounded-lg p-6 transition-all duration-200 ${cardStyle} ${
                  selectedUCardView === "physical"
                    ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50 shadow-lg" 
                    : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold">实体卡总余额</h3>
                  <CreditCard className={`h-5 w-5 ${
                    selectedUCardView === "physical" ? "text-[#00D4AA]" : "text-gray-600 dark:text-gray-400"
                  }`} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-lg font-bold mr-1">{balanceVisible ? "1,234.56" : "****"}</span>
                    <span className="text-xs text-gray-500">USDT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">本月消费</span>
                      <span className="text-sm text-red-500">-456.78 USDT</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">卡片数</span>
                      <span className="text-sm text-blue-600 font-medium">1张</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gray-300 p-1.5 h-7 w-7"
                      >
                        <TrendingUp className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gray-300 p-1.5 h-7 w-7"
                      >
                        <FileText className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 动态内容区域 */}
            {selectedUCardView === "virtual" && (
              <div className={`${cardStyle} rounded-lg p-6`}>
                <h3 className="text-lg font-semibold mb-4">虚拟卡管理</h3>
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">显示虚拟卡详情和管理功能</p>
                  <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black">
                    管理虚拟卡
                  </Button>
                </div>
              </div>
            )}

            {selectedUCardView === "physical" && (
              <div className={`${cardStyle} rounded-lg p-6`}>
                <h3 className="text-lg font-semibold mb-4">实体卡管理</h3>
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">您还没有申请实体卡</p>
                  <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black">
                    立即申请实体卡
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
      case "佣金账户":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 虚拟卡 */}
              <div 
                className="relative cursor-pointer"
                onClick={() => setSelectedCardType("virtual")}
              >
                <div className={`w-full rounded-2xl p-8 relative transition-all duration-300 ${
                  isDark 
                    ? "bg-gradient-to-br from-[#2a2d3a] to-[#1e1f2e]" 
                    : "bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]"
                } ${
                  selectedCardType === "virtual" 
                    ? "shadow-lg ring-2 ring-[#00D4AA] ring-opacity-40" 
                    : "shadow-lg hover:shadow-xl"
                }`}>
                  
                  {/* 选中指示器 */}
                  {selectedCardType === "virtual" && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 rounded-full bg-[#00D4AA] flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    {/* 标题区域 */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                          虚拟U卡
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>
                          币种换算
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            const currencies = ["USD", "EUR", "GBP", "JPY"]
                            const currentIndex = currencies.indexOf(selectedDisplayCurrency)
                            const nextCurrency = currencies[(currentIndex + 1) % currencies.length]
                            setSelectedDisplayCurrency(nextCurrency)
                          }}
                          className={`text-sm font-medium transition-colors ${
                            isDark ? "text-white hover:text-[#00D4AA]" : "text-gray-900 hover:text-[#00D4AA]"
                          }`}
                        >
                          {balanceVisible ? convertBalance(walletData["U卡账户"].cardBalance, "USDT", selectedDisplayCurrency) : "****"} {selectedDisplayCurrency}
                        </button>
                      </div>
                    </div>
                    
                    {/* 余额区域 */}
                    <div>
                      <div className="flex items-baseline space-x-3">
                        <div className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                          {balanceVisible ? convertBalance(walletData["U卡账户"].cardBalance, "USDT", selectedDisplayCurrency) : "****"}
                        </div>
                        <span className="text-lg font-medium text-[#00D4AA]">
                          USDT
                        </span>
                      </div>
                    </div>
                    
                    {/* VISA & MasterCard logos */}
                    <div className="flex justify-end mt-4">
                      <img 
                        src="/visa-mastercard-logo.png" 
                        alt="VISA MasterCard" 
                        className="h-6 opacity-80"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 实体卡 */}
              <div 
                className="relative cursor-pointer"
                onClick={() => setSelectedCardType("physical")}
              >
                <div className={`w-full rounded-2xl p-8 relative transition-all duration-300 ${
                  isDark 
                    ? "bg-gradient-to-br from-[#2a2d3a] to-[#1e1f2e]" 
                    : "bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]"
                } ${
                  selectedCardType === "physical" 
                    ? "shadow-lg ring-2 ring-[#00D4AA] ring-opacity-40" 
                    : "shadow-lg hover:shadow-xl"
                }`}>
                  
                  {/* 选中指示器 */}
                  {selectedCardType === "physical" && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 rounded-full bg-[#00D4AA] flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    {/* 标题区域 */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                          实体U卡
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"} mb-1`}>
                          币种换算
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            const currencies = ["USD", "EUR", "GBP", "JPY"]
                            const currentIndex = currencies.indexOf(selectedDisplayCurrency)
                            const nextCurrency = currencies[(currentIndex + 1) % currencies.length]
                            setSelectedDisplayCurrency(nextCurrency)
                          }}
                          className={`text-sm font-medium transition-colors ${
                            isDark ? "text-white hover:text-[#00D4AA]" : "text-gray-900 hover:text-[#00D4AA]"
                          }`}
                        >
                          {balanceVisible ? convertBalance(walletData["U卡账户"].cardBalance, "USDT", selectedDisplayCurrency) : "****"} {selectedDisplayCurrency}
                        </button>
                      </div>
                    </div>
                    
                    {/* 余额区域 */}
                    <div>
                      <div className="flex items-baseline space-x-3">
                        <div className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                          {balanceVisible ? convertBalance(walletData["U卡账户"].cardBalance, "USDT", selectedDisplayCurrency) : "****"}
                        </div>
                        <span className="text-lg font-medium text-[#00D4AA]">
                          USDT
                        </span>
                      </div>
                    </div>
                    
                    {/* VISA & MasterCard logos */}
                    <div className="flex justify-end mt-4">
                      <img 
                        src="/visa-mastercard-logo.png" 
                        alt="VISA MasterCard" 
                        className="h-6 opacity-80"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 功能按钮区域 */}
            {selectedCardType === "virtual" ? (
              /* 虚拟卡按钮 */
              <div className="grid grid-cols-7 gap-3">
                <Button 
                  onClick={() => setSelectedAction("my-virtual-cards")}
                  className={`h-16 flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                    selectedAction === "my-virtual-cards"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <CreditCard className="h-5 w-5" />
                  <span className="text-xs">我的虚拟卡</span>
                </Button>
                
                <Button 
                  onClick={() => setShowVirtualCardApplication(true)}
                  className={`h-16 flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                    selectedAction === "apply-new-card"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <Plus className="h-5 w-5" />
                  <span className="text-xs">申请新卡</span>
                </Button>
                
                <Button 
                  onClick={() => setSelectedAction("how-to-use")}
                  className={`h-16 flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                    selectedAction === "how-to-use"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <HelpCircle className="h-5 w-5" />
                  <span className="text-xs">如何使用虚拟卡</span>
                </Button>
                
                <Button 
                  onClick={() => setSelectedAction("transfer")}
                  className={`h-16 flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                    selectedAction === "transfer"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <ArrowLeftRight className="h-5 w-5" />
                  <span className="text-xs">划款</span>
                </Button>
                
                {/* 仅图标按钮 */}
                <Button 
                  onClick={() => setSelectedAction("fund-records")}
                  className={`h-16 flex items-center justify-center transition-all duration-200 ${
                    selectedAction === "fund-records"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <Wallet className="h-5 w-5" />
                </Button>
                
                <Button 
                  onClick={() => setSelectedAction("usage-bills")}
                  className={`h-16 flex items-center justify-center transition-all duration-200 ${
                    selectedAction === "usage-bills"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <Receipt className="h-5 w-5" />
                </Button>
                
                <Button 
                  onClick={() => setSelectedAction("operation-records")}
                  className={`h-16 flex items-center justify-center transition-all duration-200 ${
                    selectedAction === "operation-records"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <FileText className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              /* 实体卡按钮 */
              <div className="grid grid-cols-7 gap-3">
                <Button 
                  onClick={() => setSelectedAction("my-cards")}
                  className={`h-16 flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                    selectedAction === "my-cards"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <CardIcon className="h-5 w-5" />
                  <span className="text-xs">我的卡片</span>
                </Button>
                
                <Button 
                  onClick={() => setShowPhysicalCardApplication(true)}
                  className={`h-16 flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                    selectedAction === "apply-new-card"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <Plus className="h-5 w-5" />
                  <span className="text-xs">申请新卡</span>
                </Button>
                
                <Button 
                  onClick={() => setSelectedAction("activate-card")}
                  className={`h-16 flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                    selectedAction === "activate-card"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <Zap className="h-5 w-5" />
                  <span className="text-xs">激活卡片</span>
                </Button>
                
                <Button 
                  onClick={() => setSelectedAction("transfer")}
                  className={`h-16 flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                    selectedAction === "transfer"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <ArrowLeftRight className="h-5 w-5" />
                  <span className="text-xs">划款</span>
                </Button>
                
                {/* 仅图标按钮 */}
                <Button 
                  onClick={() => setSelectedAction("fund-records")}
                  className={`h-16 flex items-center justify-center transition-all duration-200 ${
                    selectedAction === "fund-records"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <Wallet className="h-5 w-5" />
                </Button>
                
                <Button 
                  onClick={() => setSelectedAction("usage-bills")}
                  className={`h-16 flex items-center justify-center transition-all duration-200 ${
                    selectedAction === "usage-bills"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <Receipt className="h-5 w-5" />
                </Button>
                
                <Button 
                  onClick={() => setSelectedAction("operation-records")}
                  className={`h-16 flex items-center justify-center transition-all duration-200 ${
                    selectedAction === "operation-records"
                      ? "bg-[#00D4AA] text-black"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <FileText className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* 内容区域 */}
            <div className={`${cardStyle} rounded-lg p-6 min-h-[400px]`}>
              {selectedAction === "my-virtual-cards" ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">我的虚拟卡</h3>
                  
                  {/* 虚拟卡列表 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-lg border ${isDark ? 'border-[#3a3d4a]' : 'border-gray-200'} hover:shadow-md transition-all`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-medium">主卡 - USDT</h4>
                          <p className="text-sm text-gray-500">虚拟借记卡</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">正常</span>
                          <Button size="sm" variant="outline" className="border-[#00D4AA] text-[#00D4AA]">
                            管理
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">卡号</span>
                          <span className="text-sm font-mono">**** **** **** 5678</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">余额</span>
                          <span className="text-sm font-bold text-[#00D4AA]">
                            {balanceVisible ? "1,234.56 USDT" : "****"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">有效期</span>
                          <span className="text-sm">12/28</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="flex-1 bg-[#00D4AA] hover:bg-[#00B894] text-black">
                          充值
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-red-500 text-red-500 hover:bg-red-50">
                          冻结
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedAction === "my-cards" ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">我的卡片</h3>
                  
                  {/* 实体卡列表 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-lg border ${isDark ? 'border-[#3a3d4a]' : 'border-gray-200'} hover:shadow-md transition-all`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-medium">白金卡 - USDT</h4>
                          <p className="text-sm text-gray-500">实体借记卡</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">激活</span>
                          <Button size="sm" variant="outline" className="border-[#00D4AA] text-[#00D4AA]">
                            管理
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">卡号</span>
                          <span className="text-sm font-mono">**** **** **** 1234</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">余额</span>
                          <span className="text-sm font-bold text-[#00D4AA]">
                            {balanceVisible ? "1,234.56 USDT" : "****"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">有效期</span>
                          <span className="text-sm">12/28</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">持卡人</span>
                          <span className="text-sm">JOHN DOE</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="flex-1 bg-[#00D4AA] hover:bg-[#00B894] text-black">
                          充值
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-red-500 text-red-500 hover:bg-red-50">
                          冻结
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4">请选择功能</div>
                  <p className="text-sm text-gray-400">选择上方按钮查看相应功能</p>
                </div>
              )}
            </div>

            {/* 虚拟卡申请流程模态框 */}
            {showVirtualCardApplication && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`${cardStyle} rounded-lg p-6 w-full max-w-md mx-4`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">申请虚拟U卡</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowVirtualCardApplication(false)
                        setCardApplicationStep(1)
                        setVirtualCardApplicationData({
                          fullName: "",
                          idNumber: "",
                          email: "",
                          phone: "",
                          agreeTerms: false
                        })
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {cardApplicationStep === 1 && (
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                          <CreditCard className="h-8 w-8 text-[#00D4AA]" />
                        </div>
                        <p className="text-sm text-gray-500">填写个人信息完成虚拟卡申请</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">真实姓名</label>
                        <input
                          type="text"
                          value={virtualCardApplicationData.fullName}
                          onChange={(e) => setVirtualCardApplicationData({
                            ...virtualCardApplicationData,
                            fullName: e.target.value
                          })}
                          className={`w-full p-2 border rounded-lg ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                          }`}
                          placeholder="请输入真实姓名"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">身份证号</label>
                        <input
                          type="text"
                          value={virtualCardApplicationData.idNumber}
                          onChange={(e) => setVirtualCardApplicationData({
                            ...virtualCardApplicationData,
                            idNumber: e.target.value
                          })}
                          className={`w-full p-2 border rounded-lg ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                          }`}
                          placeholder="请输入身份证号"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">邮箱地址</label>
                        <input
                          type="email"
                          value={virtualCardApplicationData.email}
                          onChange={(e) => setVirtualCardApplicationData({
                            ...virtualCardApplicationData,
                            email: e.target.value
                          })}
                          className={`w-full p-2 border rounded-lg ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                          }`}
                          placeholder="请输入邮箱地址"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">手机号码</label>
                        <input
                          type="tel"
                          value={virtualCardApplicationData.phone}
                          onChange={(e) => setVirtualCardApplicationData({
                            ...virtualCardApplicationData,
                            phone: e.target.value
                          })}
                          className={`w-full p-2 border rounded-lg ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                          }`}
                          placeholder="请输入手机号码"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="agreeTerms"
                          checked={virtualCardApplicationData.agreeTerms}
                          onChange={(e) => setVirtualCardApplicationData({
                            ...virtualCardApplicationData,
                            agreeTerms: e.target.checked
                          })}
                          className="rounded"
                        />
                        <label htmlFor="agreeTerms" className="text-sm">
                          我已阅读并同意《U卡服务协议》和《隐私政策》
                        </label>
                      </div>

                      <Button
                        onClick={() => setCardApplicationStep(2)}
                        disabled={!virtualCardApplicationData.fullName || !virtualCardApplicationData.idNumber || 
                                 !virtualCardApplicationData.email || !virtualCardApplicationData.phone || 
                                 !virtualCardApplicationData.agreeTerms}
                        className="w-full bg-[#00D4AA] hover:bg-[#00B894] text-black"
                      >
                        下一步
                      </Button>
                    </div>
                  )}

                  {cardApplicationStep === 2 && (
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <h4 className="text-lg font-semibold">申请提交成功！</h4>
                      <p className="text-sm text-gray-500 mb-6">
                        您的虚拟U卡申请已提交，预计3-5分钟内完成审核并自动开通
                      </p>
                      
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'} text-left`}>
                        <h5 className="font-medium mb-2">申请信息</h5>
                        <div className="space-y-1 text-sm">
                          <div>姓名: {virtualCardApplicationData.fullName}</div>
                          <div>身份证: {virtualCardApplicationData.idNumber.replace(/(.{6}).*(.{4})/, '$1****$2')}</div>
                          <div>邮箱: {virtualCardApplicationData.email}</div>
                          <div>手机: {virtualCardApplicationData.phone.replace(/(.{3}).*(.{4})/, '$1****$2')}</div>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          // 模拟开卡成功
                          walletData["U卡账户"].hasVirtualCard = true
                          setShowVirtualCardApplication(false)
                          setCardApplicationStep(1)
                          setVirtualCardApplicationData({
                            fullName: "",
                            idNumber: "",
                            email: "",
                            phone: "",
                            agreeTerms: false
                          })
                        }}
                        className="w-full bg-[#00D4AA] hover:bg-[#00B894] text-black"
                      >
                        完成申请
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 实体卡申请流程模态框 */}
            {showPhysicalCardApplication && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`${cardStyle} rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">申请实体U卡</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowPhysicalCardApplication(false)
                        setCardApplicationStep(1)
                        setPhysicalCardApplicationData({
                          fullName: "",
                          idNumber: "",
                          email: "",
                          phone: "",
                          address: "",
                          city: "",
                          country: "",
                          postalCode: "",
                          agreeTerms: false,
                          cardDesign: "classic"
                        })
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {cardApplicationStep === 1 && (
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                          <CardIcon className="h-8 w-8 text-[#00D4AA]" />
                        </div>
                        <p className="text-sm text-gray-500">填写个人信息和邮寄地址</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">真实姓名</label>
                        <input
                          type="text"
                          value={physicalCardApplicationData.fullName}
                          onChange={(e) => setPhysicalCardApplicationData({
                            ...physicalCardApplicationData,
                            fullName: e.target.value
                          })}
                          className={`w-full p-2 border rounded-lg ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                          }`}
                          placeholder="请输入真实姓名"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">身份证号</label>
                        <input
                          type="text"
                          value={physicalCardApplicationData.idNumber}
                          onChange={(e) => setPhysicalCardApplicationData({
                            ...physicalCardApplicationData,
                            idNumber: e.target.value
                          })}
                          className={`w-full p-2 border rounded-lg ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                          }`}
                          placeholder="请输入身份证号"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">邮箱地址</label>
                        <input
                          type="email"
                          value={physicalCardApplicationData.email}
                          onChange={(e) => setPhysicalCardApplicationData({
                            ...physicalCardApplicationData,
                            email: e.target.value
                          })}
                          className={`w-full p-2 border rounded-lg ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                          }`}
                          placeholder="请输入邮箱地址"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">手机号码</label>
                        <input
                          type="tel"
                          value={physicalCardApplicationData.phone}
                          onChange={(e) => setPhysicalCardApplicationData({
                            ...physicalCardApplicationData,
                            phone: e.target.value
                          })}
                          className={`w-full p-2 border rounded-lg ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                          }`}
                          placeholder="请输入手机号码"
                        />
                      </div>

                      <Button
                        onClick={() => setCardApplicationStep(2)}
                        disabled={!physicalCardApplicationData.fullName || !physicalCardApplicationData.idNumber || 
                                 !physicalCardApplicationData.email || !physicalCardApplicationData.phone}
                        className="w-full bg-[#00D4AA] hover:bg-[#00B894] text-black"
                      >
                        下一步 - 邮寄地址
                      </Button>
                    </div>
                  )}

                  {cardApplicationStep === 2 && (
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                          <MapPin className="h-8 w-8 text-[#00D4AA]" />
                        </div>
                        <p className="text-sm text-gray-500">填写卡片邮寄地址</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">详细地址</label>
                        <input
                          type="text"
                          value={physicalCardApplicationData.address}
                          onChange={(e) => setPhysicalCardApplicationData({
                            ...physicalCardApplicationData,
                            address: e.target.value
                          })}
                          className={`w-full p-2 border rounded-lg ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                          }`}
                          placeholder="请输入详细地址"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">城市</label>
                          <input
                            type="text"
                            value={physicalCardApplicationData.city}
                            onChange={(e) => setPhysicalCardApplicationData({
                              ...physicalCardApplicationData,
                              city: e.target.value
                            })}
                            className={`w-full p-2 border rounded-lg ${
                              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                            }`}
                            placeholder="城市"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">邮政编码</label>
                          <input
                            type="text"
                            value={physicalCardApplicationData.postalCode}
                            onChange={(e) => setPhysicalCardApplicationData({
                              ...physicalCardApplicationData,
                              postalCode: e.target.value
                            })}
                            className={`w-full p-2 border rounded-lg ${
                              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                            }`}
                            placeholder="邮编"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">国家/地区</label>
                        <select
                          value={physicalCardApplicationData.country}
                          onChange={(e) => setPhysicalCardApplicationData({
                            ...physicalCardApplicationData,
                            country: e.target.value
                          })}
                          className={`w-full p-2 border rounded-lg ${
                            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
                          }`}
                        >
                          <option value="">请选择国家/地区</option>
                          <option value="CN">中国</option>
                          <option value="US">美国</option>
                          <option value="UK">英国</option>
                          <option value="JP">日本</option>
                          <option value="KR">韩国</option>
                          <option value="SG">新加坡</option>
                          <option value="CA">加拿大</option>
                          <option value="AU">澳大利亚</option>
                        </select>
                      </div>

                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          onClick={() => setCardApplicationStep(1)}
                          className="flex-1"
                        >
                          上一步
                        </Button>
                        <Button
                          onClick={() => setCardApplicationStep(3)}
                          disabled={!physicalCardApplicationData.address || !physicalCardApplicationData.city || 
                                   !physicalCardApplicationData.country || !physicalCardApplicationData.postalCode}
                          className="flex-1 bg-[#00D4AA] hover:bg-[#00B894] text-black"
                        >
                          下一步 - 卡片设计
                        </Button>
                      </div>
                    </div>
                  )}

                  {cardApplicationStep === 3 && (
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                          <CreditCard className="h-8 w-8 text-[#00D4AA]" />
                        </div>
                        <p className="text-sm text-gray-500">选择卡片设计样式</p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div 
                          onClick={() => setPhysicalCardApplicationData({
                            ...physicalCardApplicationData,
                            cardDesign: "classic"
                          })}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            physicalCardApplicationData.cardDesign === "classic"
                              ? "border-[#00D4AA] bg-[#00D4AA]/10"
                              : isDark ? "border-gray-700" : "border-gray-300"
                          }`}
                        >
                          <div className="w-full h-24 rounded-lg bg-gradient-to-r from-gray-800 to-black mb-3 flex items-center justify-center text-white text-sm">
                            经典黑金
                          </div>
                          <div className="font-medium">经典款</div>
                          <div className="text-sm text-gray-500">经典黑金设计，商务专业</div>
                        </div>

                        <div 
                          onClick={() => setPhysicalCardApplicationData({
                            ...physicalCardApplicationData,
                            cardDesign: "premium"
                          })}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            physicalCardApplicationData.cardDesign === "premium"
                              ? "border-[#00D4AA] bg-[#00D4AA]/10"
                              : isDark ? "border-gray-700" : "border-gray-300"
                          }`}
                        >
                          <div className="w-full h-24 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 mb-3 flex items-center justify-center text-white text-sm">
                            高端紫蓝
                          </div>
                          <div className="font-medium">高端款</div>
                          <div className="text-sm text-gray-500">紫蓝渐变设计，时尚高端</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="agreeTermsPhysical"
                          checked={physicalCardApplicationData.agreeTerms}
                          onChange={(e) => setPhysicalCardApplicationData({
                            ...physicalCardApplicationData,
                            agreeTerms: e.target.checked
                          })}
                          className="rounded"
                        />
                        <label htmlFor="agreeTermsPhysical" className="text-sm">
                          我已阅读并同意《实体U卡服务协议》，确认支付$15 USDT开卡费
                        </label>
                      </div>

                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          onClick={() => setCardApplicationStep(2)}
                          className="flex-1"
                        >
                          上一步
                        </Button>
                        <Button
                          onClick={() => setCardApplicationStep(4)}
                          disabled={!physicalCardApplicationData.agreeTerms}
                          className="flex-1 bg-[#00D4AA] hover:bg-[#00B894] text-black"
                        >
                          提交申请
                        </Button>
                      </div>
                    </div>
                  )}

                  {cardApplicationStep === 4 && (
                    <div className="space-y-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <h4 className="text-lg font-semibold">申请提交成功！</h4>
                      <p className="text-sm text-gray-500 mb-6">
                        您的实体U卡申请已提交，预计1-2个工作日审核，审核通过后7-14个工作日内邮寄到您的地址
                      </p>
                      
                      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'} text-left`}>
                        <h5 className="font-medium mb-2">申请信息</h5>
                        <div className="space-y-1 text-sm">
                          <div>姓名: {physicalCardApplicationData.fullName}</div>
                          <div>邮寄地址: {physicalCardApplicationData.address}, {physicalCardApplicationData.city}</div>
                          <div>国家: {physicalCardApplicationData.country}</div>
                          <div>邮编: {physicalCardApplicationData.postalCode}</div>
                          <div>卡片设计: {physicalCardApplicationData.cardDesign === "classic" ? "经典款" : "高端款"}</div>
                          <div>开卡费用: $15 USDT</div>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          // 模拟申请提交成功
                          walletData["U卡账户"].hasPhysicalCard = true
                          setShowPhysicalCardApplication(false)
                          setCardApplicationStep(1)
                          setPhysicalCardApplicationData({
                            fullName: "",
                            idNumber: "",
                            email: "",
                            phone: "",
                            address: "",
                            city: "",
                            country: "",
                            postalCode: "",
                            agreeTerms: false,
                            cardDesign: "classic"
                          })
                        }}
                        className="w-full bg-[#00D4AA] hover:bg-[#00B894] text-black"
                      >
                        完成申请
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )

      default:
        return <div>内容加载中...</div>
    }
  }

  // 担保账户相关状态和函数
  const [selectedCard, setSelectedCard] = useState("receivable")
  const [selectedGuaranteeTab, setSelectedGuaranteeTab] = useState("收款担保") // 新增担保页签状态
  const [expandedGuaranteeItems, setExpandedGuaranteeItems] = useState<Set<string>>(new Set()) // 展开的担保项目
  const [tradingPartnerDialog, setTradingPartnerDialog] = useState<{isOpen: boolean, partnerName: string, partnerId: string}>({
    isOpen: false,
    partnerName: '',
    partnerId: ''
  }) // 交易伙伴对话框状态
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

  // 切换担保项目展开状态
  const toggleGuaranteeItem = (itemId: string) => {
    const newExpanded = new Set(expandedGuaranteeItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedGuaranteeItems(newExpanded)
  }

  // 渲染担保内容
  const renderGuaranteeContent = () => {
    switch (selectedGuaranteeTab) {
      case "收款担保":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm overflow-hidden">
              {/* USDT买卖担保 */}
              <div 
                className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-all duration-200 cursor-pointer"
                onClick={() => toggleGuaranteeItem("guarantee-1")}
              >
                <div className="flex items-start justify-between mb-3 mt-2">
                  <div className="flex flex-col space-y-5">
                    <span className="px-3 py-1.5 bg-[#00D4AA] text-black rounded-full text-xs font-semibold w-fit">
                      USDT买卖担保
                    </span>
                    <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      5,000.00 <span className="text-base font-normal text-gray-500">USDT</span>
                    </div>
                    
                    {/* 查看合同按钮和联系人 */}
                    <div className="flex items-center gap-3">
                      {/* 查看合同按钮 */}
                      <button 
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-blue-500 hover:text-blue-600 transition-colors border ${
                          isDark 
                            ? 'border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/10' 
                            : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleGuaranteeItem("guarantee-1");
                        }}
                      >
                        查看合同
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      
                      {/* 头像图标 */}
                      <button 
                        className={`p-2 rounded-lg transition-all duration-200 hover:shadow-sm active:scale-[0.95] ${
                          isDark 
                            ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400 hover:text-green-300' 
                            : 'bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-700'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setTradingPartnerDialog({
                            isOpen: true,
                            partnerName: '123789',
                            partnerId: 'user-123789'
                          });
                        }}
                        title="联系交易对象"
                      >
                        <User className="h-5 w-5" />
                      </button>
                    </div>

                  </div>
                  
                  {/* 进度条 - 与左上角标签对齐 */}
                  <div className="flex-shrink-0 ml-6 -mt-3">
                    <TransactionProgress 
                      steps={[
                        { id: '1', label: '发起交易', status: 'completed' },
                        { id: '2', label: '已付担保金', status: 'completed' },
                        { id: '3', label: '等待确认', status: 'current' },
                        { id: '4', label: '争议仲裁', status: 'pending' },
                        { id: '5', label: '完成交易', status: 'pending' }
                      ]}
                      className="w-auto"
                    />
                    {/* 交易发起时间和自动确认 */}
                    <div className="mt-1 flex items-center justify-between">
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        发起时间: 2025-01-29
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className="text-orange-500 font-medium">自动确认: 23小时42分钟</span>
                      </div>
                    </div>
                  </div>
                </div>

                
                {/* 展开的合同内容 */}
                {expandedGuaranteeItems.has("guarantee-1") && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg p-4`}>
                      <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        数字资产担保交易合同
                      </h3>
                      
                      <div className={`space-y-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                        <div>
                          <strong>合同编号：</strong>CT-2025012901-USDT-5000
                        </div>
                        
                        <div>
                          <strong>交易标的：</strong>USDT (Tether USD)
                        </div>
                        
                        <div>
                          <strong>交易数量：</strong>5,000.00 USDT
                        </div>
                        
                        <div>
                          <strong>交易汇率：</strong>1 USDT = 7.20 人民币
                        </div>
                        
                        <div>
                          <strong>交易金额：</strong>36,000.00 人民币
                        </div>
                        
                        <div>
                          <strong>付款方式：</strong>银行卡转账
                        </div>
                        
                        <div>
                          <strong>买方：</strong>用户123789
                        </div>
                        
                        <div>
                          <strong>卖方：</strong>商户 CryptoTrade Pro
                        </div>
                        
                        <div>
                          <strong>担保方：</strong>BeDAO担保平台
                        </div>
                        
                        <div>
                          <strong>担保金额：</strong>5,000.00 USDT
                        </div>
                        
                        <div>
                          <strong>交易流程：</strong>
                          <ol className="list-decimal list-inside mt-2 ml-4 space-y-1">
                            <li>买方发起交易申请</li>
                            <li>双方缴纳担保金至平台</li>
                            <li>买方转账法币至卖方指定账户</li>
                            <li>卖方确认收款后释放USDT至买方钱包</li>
                            <li>平台释放双方担保金</li>
                          </ol>
                        </div>
                        
                        <div>
                          <strong>自动确认时间：</strong>24小时（如卖方未在规定时间内确认，系统将自动释放数字资产）
                        </div>
                        
                        <div>
                          <strong>争议处理：</strong>如发生争议，由BeDAO仲裁委员会进行仲裁
                        </div>
                        
                        <div className="pt-3 border-t border-gray-300 dark:border-gray-600 mt-4">
                          <strong>签署时间：</strong>2025年1月29日 14:23:15
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        )

      case "付款担保":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm overflow-hidden">
              {/* USDT买卖担保 */}
              <div 
                className="p-5 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-all duration-200 cursor-pointer"
                onClick={() => toggleGuaranteeItem("pay-guarantee-1")}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-col space-y-3">
                    <span className="px-3 py-1.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full text-xs font-semibold w-fit">
                      BTC交易担保
                    </span>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      0.15 <span className="text-sm font-normal text-gray-500">BTC</span>
                    </div>
                    
                    {/* 交易对象和担保群 - 放在担保金额下面 */}
                    <div className="flex gap-2 mt-3">
                      {/* 交易对象标签 */}
                      <button 
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all duration-200 hover:shadow-sm active:scale-[0.98] ${
                          isDark 
                            ? 'border-gray-600 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white' 
                            : 'border-gray-300 bg-gray-100/50 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('点击交易对象');
                        }}
                      >
                        <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                          <User className="h-3 w-3 text-white" />
                        </div>
                        <span>交易对象: Bitcoin99</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* 进度条和时间信息 */}
                  <div className="flex flex-col items-end -mt-3">
                    <TransactionProgress 
                      steps={[
                        { id: 'start', label: '发起交易', status: 'completed' },
                        { id: 'deposit', label: '对方/您已付担保金', status: 'current' },
                        { id: 'confirm', label: '等待确认完成交易', status: 'pending' },
                        { id: 'complete', label: '完成收款/争议待仲裁', status: 'pending' }
                      ]}
                      className=""
                    />
                    <div className={`text-xs mt-1 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>发起时间：2025-01-29</span>
                      <span className="mx-2">|</span>
                      <span>自动确认：24小时</span>
                    </div>
                    
                    {/* 查看合同链接 */}
                    <div className="mt-2">
                      <button 
                        className={`flex items-center gap-1 text-xs transition-colors ${
                          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedContractItems(prev => 
                            prev.has("guarantee-2-new") 
                              ? new Set([...prev].filter(id => id !== "guarantee-2-new"))
                              : new Set([...prev, "guarantee-2-new"])
                          );
                        }}
                      >
                        查看合同
                        <ChevronDown className={`h-3 w-3 transition-transform ${
                          expandedContractItems.has("guarantee-2-new") ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 可展开的内容简介和操作按钮 */}
                {expandedGuaranteeItems.has("guarantee-2-new") && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      <div>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>担保内容：</span>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mt-1`}>
                          BTC场外交易担保，交易金额0.15 BTC，单价65,000 USDT，总价值9,750 USDT。买方需要在24小时内完成付款，超时将自动取消交易。
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <button className={`px-4 py-2 rounded-lg border transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                          查看详情
                        </button>
                        <button className="px-4 py-2 bg-[#00D4AA] text-white rounded-lg hover:bg-[#00B894] transition-colors">
                          催促对方
                        </button>
                        <button className={`px-4 py-2 rounded-lg border transition-colors ${isDark ? 'border-red-600 text-red-400 hover:bg-red-900/20' : 'border-red-300 text-red-600 hover:bg-red-50'}`}>
                          取消交易
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 第三个担保交易卡片 */}
            <div className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm overflow-hidden">
              {/* 第三个担保交易 - 完成状态 */}
              <div 
                className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-all duration-200 cursor-pointer"
                onClick={() => toggleGuaranteeItem("guarantee-3-complete")}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-col space-y-3">
                    <span className="px-3 py-1.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-xs font-semibold w-fit">
                      ETH交易担保
                    </span>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      2.5 <span className="text-sm font-normal text-gray-500">ETH</span>
                    </div>
                    
                    {/* 交易对象和担保群 - 放在担保金额下面 */}
                    <div className="flex gap-2 mt-3">
                      {/* 交易对象标签 */}
                      <button 
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all duration-200 hover:shadow-sm active:scale-[0.98] ${
                          isDark 
                            ? 'border-gray-600 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white' 
                            : 'border-gray-300 bg-gray-100/50 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('点击交易对象');
                        }}
                      >
                        <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <User className="h-3 w-3 text-white" />
                        </div>
                        <span>交易对象: ETH_Safe_777</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* 进度条和时间信息 */}
                  <div className="flex flex-col items-end -mt-3">
                    <TransactionProgress 
                      steps={[
                        { id: 'start', label: '发起交易', status: 'completed' },
                        { id: 'deposit', label: '对方/您已付担保金', status: 'completed' },
                        { id: 'confirm', label: '等待确认完成交易', status: 'completed' },
                        { id: 'complete', label: '完成收款/争议待仲裁', status: 'completed' }
                      ]}
                      className=""
                    />
                    <div className={`text-xs mt-1 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>发起时间：2025-01-28</span>
                      <span className="mx-2">|</span>
                      <span>已完成</span>
                    </div>
                    
                    {/* 查看合同链接 */}
                    <div className="mt-2">
                      <button 
                        className={`flex items-center gap-1 text-xs transition-colors ${
                          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedContractItems(prev => 
                            prev.has("guarantee-3-complete") 
                              ? new Set([...prev].filter(id => id !== "guarantee-3-complete"))
                              : new Set([...prev, "guarantee-3-complete"])
                          );
                        }}
                      >
                        查看合同
                        <ChevronDown className={`h-3 w-3 transition-transform ${
                          expandedContractItems.has("guarantee-3-complete") ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 可展开的内容简介和操作按钮 */}
                {expandedGuaranteeItems.has("guarantee-3-complete") && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      <div>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>担保内容：</span>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mt-1`}>
                          ETH场外交易担保，交易金额2.5 ETH，单价3,200 USDT，总价值8,000 USDT。交易已顺利完成，双方评价良好。
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <button className={`px-4 py-2 rounded-lg border transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                          查看详情
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          评价交易
                        </button>
                        <button className={`px-4 py-2 rounded-lg border transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                          下载凭证
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 其他担保交易 - 独立卡片 */}
            <div className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm overflow-hidden">
              <div 
                className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-all duration-200 cursor-pointer"
                onClick={() => toggleGuaranteeItem("guarantee-other")}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-col space-y-3">
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-semibold w-fit">
                      其他担保交易
                    </span>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      2,500.00 <span className="text-sm font-normal text-gray-500">USDT</span>
                    </div>
                    
                    {/* 交易对象 - 放在担保金额下面 */}
                    <div className="flex gap-2 mt-3">
                      {/* 交易对象标签 */}
                      <button 
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all duration-200 hover:shadow-sm active:scale-[0.98] ${
                          isDark 
                            ? 'border-gray-600 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white' 
                            : 'border-gray-300 bg-gray-100/50 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('点击交易对象');
                        }}
                      >
                        <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                          <User className="h-3 w-3 text-white" />
                        </div>
                        <span>交易对象: TradeMaster456</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* 进度条和时间信息 */}
                  <div className="flex flex-col items-end -mt-3">
                    <TransactionProgress 
                      steps={[
                        { id: 'start', label: '发起交易', status: 'completed' },
                        { id: 'deposit', label: '对方/您已付担保金', status: 'completed' },
                        { id: 'confirm', label: '等待确认完成交易', status: 'completed' },
                        { id: 'complete', label: '完成收款/争议待仲裁', status: 'completed' }
                      ]}
                      className=""
                    />
                    <div className={`text-xs mt-1 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>发起时间：2025-01-27</span>
                      <span className="mx-2">|</span>
                      <span>已完成</span>
                    </div>
                    
                    {/* 查看合同链接 */}
                    <div className="mt-2">
                      <button 
                        className={`flex items-center gap-1 text-xs transition-colors ${
                          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedContractItems(prev => 
                            prev.has("guarantee-other") 
                              ? new Set([...prev].filter(id => id !== "guarantee-other"))
                              : new Set([...prev, "guarantee-other"])
                          );
                        }}
                      >
                        查看合同
                        <ChevronDown className={`h-3 w-3 transition-transform ${
                          expandedContractItems.has("guarantee-other") ? 'rotate-180' : ''
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                
                {/* 可展开的内容简介和操作按钮 */}
                {expandedGuaranteeItems.has("guarantee-other") && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      <div>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>担保内容：</span>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mt-1`}>
                          虚拟商品交易担保，游戏道具出售，价值2500 USDT，买方已付款等待确认收货
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          className={`h-8 text-xs px-4 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-gray-600 text-gray-600 hover:bg-gray-50'}`} 
                          onClick={(e) => { e.stopPropagation(); }}
                        >
                          查看合同
                        </Button>
                        <div className="text-right">
                          <span className="text-sm text-red-600 font-medium">争议中，等待仲裁</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case "付款担保":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm overflow-hidden">
              {/* USDT买卖担保 */}
              <div 
                className="p-5 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-all duration-200 cursor-pointer"
                onClick={() => toggleGuaranteeItem("guarantee-2")}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex flex-col space-y-3">
                    <span className="px-3 py-1.5 bg-[#00D4AA] text-black rounded-full text-xs font-semibold w-fit">
                      USDT买卖担保
                    </span>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      3,000.00 <span className="text-sm font-normal text-gray-500">USDT</span>
                    </div>
                    

                  </div>
                  
                  {/* 交易对象和担保群 - 右侧显示 */}
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button 
                            className="text-[#00D4AA] hover:text-[#00B894] transition-colors" 
                            title="联系用户"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MessageCircle className="h-6 w-6" />
                          </button>
                          <span className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>交易对象：</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <span className={`text-base ${isDark ? 'text-white' : 'text-black'} font-semibold`}>123456</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button 
                            className="text-blue-500 hover:text-blue-600 transition-colors" 
                            title="进入担保群"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Users className="h-6 w-6" />
                          </button>
                          <span className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>担保群：</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className={`text-base ${isDark ? 'text-white' : 'text-black'} font-semibold`}>123456</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
                {/* 可展开的内容简介和操作按钮 */}
                {expandedGuaranteeItems.has("guarantee-2") && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      <div>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>担保内容：</span>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mt-1`}>
                          出售3000 USDT给用户，汇率7.18，总价21540元，支付宝转账，已收到买方付款
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          className={`h-8 text-xs px-4 ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-gray-600 text-gray-600 hover:bg-gray-50'}`} 
                          onClick={(e) => { e.stopPropagation(); }}
                        >
                          查看合同
                        </Button>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <Button 
                              className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black hover:bg-gray-800 text-white'} h-7 text-xs px-3`}
                              onClick={(e) => { e.stopPropagation(); }}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              确认
                            </Button>
                            <Button 
                              variant="outline" 
                              className={`h-7 text-xs px-3 text-red-600 ${isDark ? 'border-white hover:bg-white hover:text-red-600' : 'border-red-600 hover:bg-red-50'}`}
                              onClick={(e) => { e.stopPropagation(); }}
                            >
                              请求仲裁
                            </Button>
                          </div>
                          <div className="text-xs text-gray-500">自动确认：<span className="font-mono">12:34:56</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 第二个付款担保 - 等待确认 */}
              <div 
                className="p-5 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-all duration-200 cursor-pointer"
                onClick={() => toggleGuaranteeItem("pay-guarantee-2")}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex flex-col space-y-3">
                    <span className="px-3 py-1.5 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 rounded-full text-xs font-semibold w-fit">
                      SOL交易担保
                    </span>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      50.0 <span className="text-sm font-normal text-gray-500">SOL</span>
                    </div>
                    
                    <TransactionProgress 
                      steps={[
                        { id: '1', label: '发起交易', status: 'completed' },
                        { id: '2', label: '您已付担保金', status: 'completed' },
                        { id: '3', label: '等待确认', status: 'completed' },
                        { id: '4', label: '争议仲裁', status: 'current' },
                        { id: '5', label: '完成交易', status: 'pending' }
                      ]}
                      className="mt-6"
                    />

                  </div>
                  
                  {/* 交易对象和担保群 - 右侧显示 */}
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button 
                            className="text-[#00D4AA] hover:text-[#00B894] transition-colors" 
                            title="联系用户"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MessageCircle className="h-6 w-6" />
                          </button>
                          <span className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>交易对象：</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <span className={`text-base ${isDark ? 'text-white' : 'text-black'} font-semibold`}>SolanaKing</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button 
                            className="text-blue-500 hover:text-blue-600 transition-colors" 
                            title="进入担保群"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Users className="h-6 w-6" />
                          </button>
                          <span className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>担保群：</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className={`text-base ${isDark ? 'text-white' : 'text-black'} font-semibold`}>SOL_Trade_888</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 可展开的内容简介和操作按钮 */}
                {expandedGuaranteeItems.has("pay-guarantee-2") && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      <div>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>担保内容：</span>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mt-1`}>
                          SOL场外交易担保，交易金额50 SOL，单价120 USDT，总价值6,000 USDT。您需要确认收到货物后点击完成交易。
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <button className={`px-4 py-2 rounded-lg border transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                          查看详情
                        </button>
                        <button className="px-4 py-2 bg-[#00D4AA] text-white rounded-lg hover:bg-[#00B894] transition-colors">
                          确认收款
                        </button>
                        <button className={`px-4 py-2 rounded-lg border transition-colors ${isDark ? 'border-red-600 text-red-400 hover:bg-red-900/20' : 'border-red-300 text-red-600 hover:bg-red-50'}`}>
                          申请仲裁
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 第三个付款担保 - 争议状态 */}
              <div 
                className="p-5 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-all duration-200 cursor-pointer"
                onClick={() => toggleGuaranteeItem("pay-guarantee-3")}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex flex-col space-y-3">
                    <span className="px-3 py-1.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded-full text-xs font-semibold w-fit">
                      NFT交易担保
                    </span>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      1,200.00 <span className="text-sm font-normal text-gray-500">USDT</span>
                    </div>
                    

                  </div>
                  
                  {/* 交易对象和担保群 - 右侧显示 */}
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'}`}>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button 
                            className="text-[#00D4AA] hover:text-[#00B894] transition-colors" 
                            title="联系用户"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MessageCircle className="h-6 w-6" />
                          </button>
                          <span className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>交易对象：</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <span className={`text-base ${isDark ? 'text-white' : 'text-black'} font-semibold`}>NFTCollector</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button 
                            className="text-blue-500 hover:text-blue-600 transition-colors" 
                            title="进入担保群"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Users className="h-6 w-6" />
                          </button>
                          <span className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>担保群：</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className={`text-base ${isDark ? 'text-white' : 'text-black'} font-semibold`}>NFT_Safe_555</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 可展开的内容简介和操作按钮 */}
                {expandedGuaranteeItems.has("pay-guarantee-3") && (
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                      <div>
                        <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>担保内容：</span>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mt-1`}>
                          NFT数字艺术品交易担保，价值1,200 USDT。买方质疑作品真实性，目前在仲裁阶段处理中。
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <button className={`px-4 py-2 rounded-lg border transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                          查看详情
                        </button>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                          查看仲裁
                        </button>
                        <button className={`px-4 py-2 rounded-lg border transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                          提交证据
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 其他担保交易 */}
              <div className={isDark ? "p-4 hover:bg-gray-700/30 transition-colors" : "p-4 hover:bg-gray-50 transition-colors"}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-semibold">
                      其他担保交易
                    </span>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>交易对象：</span>
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">U</div>
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-black'} font-medium`}>987987</span>
                        <button className="text-[#00D4AA] hover:text-[#00B894] transition-colors" title="联系用户">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>担保群：</span>
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">G</div>
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-black'} font-medium`}>987987</span>
                        <button className="text-blue-500 hover:text-blue-600 transition-colors" title="进入担保群">
                          <Users className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      1,200.00 USDT
                    </span>
                  </div>
                  
                  <div>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>担保内容 </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                      数字艺术品交易，NFT作品出售，买方质疑作品真实性，目前在仲裁阶段处理中
                    </span>
                  </div>
                  
                  <div className="flex items-end justify-end">
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Button className={`${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black hover:bg-gray-800 text-white'} h-7 text-xs px-3`}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          确认结束争议
                        </Button>
                      </div>
                      <span className="text-sm text-red-600">争议中，等待仲裁</span>
                    </div>
                  </div>
                </div>
              </div>
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

      case "BePAY账户":
        return (
          <div className="space-y-6">
            {/* 顶部卡片：商户资产和代付备用金 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 商户资产卡片 */}
              <div className={`${cardStyle} rounded-lg p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Receipt className="h-6 w-6 text-[#00D4AA]" />
                    <h3 className="text-lg font-semibold">商户资产</h3>
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {balanceVisible ? `${walletData.BePAY账户.merchantAssets} USDT` : "****"}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 text-sm font-medium">今日收益: {walletData.BePAY账户.todayRevenue}</span>
                </div>
              </div>

              {/* 代付备用金卡片 */}
              <div className={`${cardStyle} rounded-lg p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <PiggyBank className="h-6 w-6 text-[#3B82F6]" />
                    <h3 className="text-lg font-semibold">代付备用金</h3>
                  </div>
                </div>
                <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {balanceVisible ? `${walletData.BePAY账户.standbyFunds} USDT` : "****"}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500 text-sm font-medium">本月收益: {walletData.BePAY账户.monthRevenue}</span>
                </div>
              </div>
            </div>

            {/* 功能按钮组 */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* 主要操作按钮 - 自动适配屏幕宽度 */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3">
                <Button 
                  onClick={handlePositionModalClick}
                  className="h-12 transition-all duration-200 text-base font-bold bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  variant="outline"
                >
                  <PieChart className="h-4 w-4 mr-2" />
                  资产分布
                </Button>
                <Button 
                  className="h-12 transition-all duration-200 text-base font-bold bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  variant="outline"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  通道配置
                </Button>
                <Button 
                  onClick={handleTransferClick}
                  className="h-12 transition-all duration-200 text-base font-bold bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  variant="outline"
                >
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  划转
                </Button>
              </div>
            </div>

            {/* 统计信息 */}
            <div className={`${cardStyle} rounded-lg p-6`}>
              <h3 className="text-lg font-semibold mb-4">支付统计</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {walletData.BePAY账户.successRate}
                  </div>
                  <div className="text-sm text-gray-500">成功率</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {walletData.BePAY账户.totalOrders.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">总订单数</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {walletData.BePAY账户.activeChannels}
                  </div>
                  <div className="text-sm text-gray-500">活跃通道</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-green-500`}>
                    {walletData.BePAY账户.monthRevenue}
                  </div>
                  <div className="text-sm text-gray-500">月收益</div>
                </div>
              </div>
            </div>



            {/* 支付通道状态 */}
            <div className={`${cardStyle} rounded-lg p-6`}>
              <h3 className="text-lg font-semibold mb-4">支付通道状态</h3>
              <div className="space-y-4">
                {walletData.BePAY账户.channels.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{channel.icon}</span>
                      <div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {channel.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          成功率: {channel.successRate}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ¥{channel.todayAmount}
                      </div>
                      <div className="text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          channel.status === '正常' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {channel.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 最近交易 */}
            <div className={`${cardStyle} rounded-lg p-6`}>
              <h3 className="text-lg font-semibold mb-4">最近交易</h3>
              <div className="space-y-3">
                {walletData.BePAY账户.recentTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Receipt className="h-5 w-5 text-[#00D4AA]" />
                      <div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {tx.type} - {tx.channel}
                        </div>
                        <div className="text-sm text-gray-500">
                          {tx.orderId} • {tx.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {tx.amount} USDT
                      </div>
                      <div className="text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tx.status === '成功' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "增加信誉担保":
        return (
          <div className="p-6">
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  增加信誉担保
                </h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  增加信誉担保金额可以提升您的交易信誉度
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      担保金额
                    </label>
                    <input
                      type="number"
                      placeholder="请输入担保金额"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDark 
                          ? "bg-[#252842] border-[#3a3d4a] text-white" 
                          : "bg-white border-gray-300 text-gray-800"
                      } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      担保期限
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${
                      isDark 
                        ? "bg-[#252842] border-[#3a3d4a] text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}>
                      <option value="30">30天</option>
                      <option value="60">60天</option>
                      <option value="90">90天</option>
                      <option value="180">180天</option>
                    </select>
                  </div>
                  
                  <Button
                    className={`w-full ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}
                  >
                    确认添加
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case "划转":
        return (
          <div className="p-6">
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  账户划转
                </h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  在不同账户之间转移资金
                </p>
              </div>
              
              <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      从
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${
                      isDark 
                        ? "bg-[#252842] border-[#3a3d4a] text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}>
                      <option value="担保账户">担保账户</option>
                      <option value="现金账户">现金账户</option>
                      <option value="合约账户">合约账户</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      到
                    </label>
                    <select className={`w-full px-3 py-2 rounded-lg border ${
                      isDark 
                        ? "bg-[#252842] border-[#3a3d4a] text-white" 
                        : "bg-white border-gray-300 text-gray-800"
                    }`}>
                      <option value="现金账户">现金账户</option>
                      <option value="合约账户">合约账户</option>
                      <option value="担保账户">担保账户</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      划转金额
                    </label>
                    <input
                      type="number"
                      placeholder="请输入划转金额"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDark 
                          ? "bg-[#252842] border-[#3a3d4a] text-white" 
                          : "bg-white border-gray-300 text-gray-800"
                      } focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                    />
                  </div>
                  
                  <Button
                    className={`w-full ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}
                  >
                    确认划转
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case "资金记录":
        return (
          <div className="p-6">
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                资金记录
              </h3>
              
              <div className="space-y-3">
                {[
                  { type: "担保冻结", amount: "-1,234.56 USDT", time: "2024-01-15 14:30", status: "已冻结" },
                  { type: "信誉担保", amount: "-5,000.00 USDT", time: "2024-01-14 10:20", status: "已冻结" },
                  { type: "担保解冻", amount: "+987.65 USDT", time: "2024-01-13 16:45", status: "已解冻" },
                  { type: "划转入账", amount: "+2,000.00 USDT", time: "2024-01-12 11:15", status: "已完成" }
                ].map((record, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {record.type}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {record.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${record.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {record.amount}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {record.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "交易记录":
        return (
          <div className="p-6">
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                交易记录
              </h3>
              
              <div className="space-y-3">
                {[
                  { type: "USDT买卖", amount: "1,234.56 USDT", partner: "123789", status: "已完成", time: "2024-01-15 14:30" },
                  { type: "其他担保", amount: "987.65 USDT", partner: "456456", status: "争议中", time: "2024-01-14 10:20" },
                  { type: "USDT买卖", amount: "2,000.00 USDT", partner: "789123", status: "已完成", time: "2024-01-13 16:45" }
                ].map((record, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {record.type}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          交易对象: {record.partner}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {record.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {record.amount}
                        </div>
                        <div className={`text-sm ${
                          record.status === '已完成' ? 'text-green-600' : 
                          record.status === '争议中' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {record.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "担保记录":
        return (
          <div className="p-6">
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                担保记录
              </h3>
              
              <div className="space-y-3">
                {[
                  { id: "G001", type: "信誉担保", amount: "5,000.00 USDT", period: "180天", status: "进行中", createTime: "2024-01-15 14:30", expireTime: "2024-07-13" },
                  { id: "G002", type: "交易担保", amount: "1,234.56 USDT", period: "7天", status: "已结束", createTime: "2024-01-14 10:20", expireTime: "2024-01-21" },
                  { id: "G003", type: "交易担保", amount: "987.65 USDT", period: "5天", status: "争议处理", createTime: "2024-01-13 16:45", expireTime: "2024-01-18" }
                ].map((record, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          record.type === '信誉担保' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}>
                          {record.type}
                        </span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          #{record.id}
                        </span>
                      </div>
                      <div className={`text-sm px-2 py-1 rounded ${
                        record.status === '进行中' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                        record.status === '已结束' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {record.status}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>担保金额</div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{record.amount}</div>
                      </div>
                      <div>
                        <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>担保期限</div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{record.period}</div>
                      </div>
                      <div>
                        <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>创建时间</div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{record.createTime}</div>
                      </div>
                      <div>
                        <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>到期时间</div>
                        <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{record.expireTime}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return <div>请选择一个功能</div>
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
    const categoryKey = getCategoryKey(orderTab)
    const currentCategory = orderCategories[categoryKey]
    
    if (records.length === 0) {
      return (
        <div className={`${cardStyle} rounded-lg overflow-hidden`}>
          {/* 二级页签导航 */}
          {currentCategory && Object.keys(currentCategory.tabs).length > 1 && (
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {Object.entries(currentCategory.tabs).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSecondaryTab(key)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${
                      secondaryTab === key
                        ? isDark 
                          ? "bg-white text-black border-white" 
                          : "bg-black text-white border-black"
                        : isDark
                          ? "bg-transparent text-white border-white hover:bg-white hover:text-black"
                          : "bg-transparent text-black border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-6">
            <div className="text-center py-12">
              <div className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {currentCategory?.tabs[secondaryTab] || orderTab}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                暂无{currentCategory?.tabs[secondaryTab] || orderTab}数据
              </div>
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
            {/* 二级页签导航 */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {Object.entries(currentCategory.tabs).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSecondaryTab(key)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${
                      secondaryTab === key
                        ? isDark 
                          ? "bg-white text-black border-white" 
                          : "bg-black text-white border-black"
                        : isDark
                          ? "bg-transparent text-white border-white hover:bg-white hover:text-black"
                          : "bg-transparent text-black border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
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
            {/* 二级页签导航 */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {Object.entries(currentCategory.tabs).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSecondaryTab(key)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${
                      secondaryTab === key
                        ? isDark 
                          ? "bg-white text-black border-white" 
                          : "bg-black text-white border-black"
                        : isDark
                          ? "bg-transparent text-white border-white hover:bg-white hover:text-black"
                          : "bg-transparent text-black border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
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
            {/* 二级页签导航 */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {Object.entries(currentCategory.tabs).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSecondaryTab(key)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${
                      secondaryTab === key
                        ? isDark 
                          ? "bg-white text-black border-white" 
                          : "bg-black text-white border-black"
                        : isDark
                          ? "bg-transparent text-white border-white hover:bg-white hover:text-black"
                          : "bg-transparent text-black border-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
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
          <div className={`${cardStyle} rounded-lg overflow-hidden`}>
            {/* 二级页签导航 */}
            {currentCategory && Object.keys(currentCategory.tabs).length > 1 && (
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {Object.entries(currentCategory.tabs).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setSecondaryTab(key)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border-2 ${
                        secondaryTab === key
                          ? isDark 
                            ? "bg-white text-black border-white" 
                            : "bg-black text-white border-black"
                          : isDark
                            ? "bg-transparent text-white border-white hover:bg-white hover:text-black"
                            : "bg-transparent text-black border-black hover:bg-black hover:text-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="space-y-4">
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
                className={`absolute top-1 bottom-1 w-1/2 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'} ${
                  topLevelTab === "账户资产" ? "left-1" : "left-1/2"
                }`}
              />
              {/* 按钮 */}
              {["账户资产", "订单记录"].map((tab) => (
                <button
                  key={tab}
                  className={`relative z-10 flex-1 px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    topLevelTab === tab
                      ? isDark ? "text-black" : "text-white"
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
                    onClick={() => handleOrderTabChange(tab.id)}
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
                    className={`absolute top-1 bottom-1 w-1/2 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'} ${
                      topLevelTab === "账户资产" ? "left-1" : "left-1/2"
                    }`}
                  />
                  {/* 按钮 */}
                  {["账户资产", "订单记录"].map((tab) => (
                    <button
                      key={tab}
                      className={`relative z-10 flex-1 px-3 py-2 text-xs font-medium transition-all duration-300 ${
                        topLevelTab === tab
                          ? isDark ? "text-black" : "text-white"
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
                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                          activeTab === tab.id
                            ? "border-[#00D4AA] text-[#00D4AA] bg-[#00D4AA]/5 shadow-sm scale-105"
                            : isDark
                              ? "border-transparent text-gray-300 hover:text-white hover:bg-[#252842] "
                              : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100 "
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
                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                          orderTab === tab.id
                            ? "border-[#00D4AA] text-[#00D4AA] bg-[#00D4AA]/5 shadow-sm scale-105"
                            : isDark
                              ? "border-transparent text-gray-300 hover:text-white hover:bg-[#252842] "
                              : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100 "
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
              <div className={`transition-all duration-300 ${
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
          <div className={`absolute right-0 top-0 h-full w-80 max-w-[90vw] ${cardStyle} transition-duration-300 ease-out ${
            currencyModalAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="p-6 h-full overflow-y-auto">
              {/* 币种类型切换 */}
              <div className="flex justify-center mb-6">
                <div className={`flex rounded-full p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-100'}`}>
                  <button
                    onClick={() => handleCurrencyTypeChange("crypto")}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      currencyType === "crypto"
                        ? isDark ? "bg-white text-black scale-105" : "bg-black text-white scale-105"
                        : isDark ? "text-gray-400 hover:text-white " : "text-gray-600 hover:text-black "
                    }`}
                  >
                    加密货币
                  </button>
                  <button
                    onClick={() => handleCurrencyTypeChange("fiat")}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      currencyType === "fiat"
                        ? isDark ? "bg-white text-black scale-105" : "bg-black text-white scale-105"
                        : isDark ? "text-gray-400 hover:text-white " : "text-gray-600 hover:text-black "
                    }`}
                  >
                    法币
                  </button>
                </div>
              </div>
              <div className={`space-y-3 transition-all duration-300 ${currencyTypeAnimating ? 'opacity-50 translate-x-2' : 'opacity-100 translate-x-0'}`}>
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
          <div className={`absolute left-0 top-0 h-full w-96 max-w-[90vw] ${cardStyle} transition-duration-300 ${
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
          <div className={`absolute right-0 top-0 h-full w-96 max-w-[90vw] ${cardStyle} transition-duration-300 ease-out ${
            addAssetModalAnimating ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="p-6 h-full flex flex-col">
              
              {/* 搜索框 */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] ${cardStyle} rounded-lg transition-all duration-300 ease-out ${
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
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
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
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] transition-all duration-300 ease-out ${
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
                      <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none ${
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
                      <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none ${
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

      {/* 兑换USDT弹窗 */}
      {showExchangeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowExchangeModal(false)}
          />
          
          {/* 弹窗内容 */}
          <div className={`relative w-full max-w-md mx-4 rounded-lg shadow-lg ${isDark ? 'bg-[#1a1b23] border border-[#3a3d4a]' : 'bg-white border border-gray-200'}`}>
            <div className="p-6">
              {/* 标题 */}
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  兑换成USDT
                </h2>
                <button
                  onClick={() => setShowExchangeModal(false)}
                  className={`p-2 rounded-lg hover:bg-opacity-80 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* 选择法币资产 */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium block ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    选择法币资产
                  </label>
                  <select
                    value={selectedFiatCurrency}
                    onChange={(e) => handleFiatCurrencyChange(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-[#2a2d3a] border-[#3a3d4a] text-white' : 'bg-white border-gray-300'}`}
                  >
                    <option value="">选择法币</option>
                    <option value="USD">USD - 美元</option>
                    <option value="EUR">EUR - 欧元</option>
                    <option value="GBP">GBP - 英镑</option>
                    <option value="JPY">JPY - 日元</option>
                  </select>
                </div>

                {/* 输入金额 */}
                <div className="space-y-2">
                  <label className={`text-sm font-medium block ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    输入金额
                  </label>
                  <input
                    type="number"
                    placeholder="请输入兑换金额"
                    value={exchangeAmount}
                    onChange={(e) => handleExchangeAmountChange(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${isDark ? 'bg-[#2a2d3a] border-[#3a3d4a] text-white placeholder-gray-400' : 'bg-white border-gray-300'}`}
                  />
                </div>

                {/* 今日汇率显示 */}
                {selectedFiatCurrency && (
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-[#2a2d3a]' : 'bg-gray-50'}`}>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      今日汇率
                    </div>
                    <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      1 {selectedFiatCurrency} = {exchangeRates[selectedFiatCurrency as keyof typeof exchangeRates]} USDT
                    </div>
                  </div>
                )}

                {/* 估算USDT金额 */}
                {estimatedUSDT && (
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-[#00D4AA]/10 border border-[#00D4AA]/30' : 'bg-[#00D4AA]/10 border border-[#00D4AA]/30'}`}>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      预计可兑换
                    </div>
                    <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {estimatedUSDT} USDT
                    </div>
                  </div>
                )}

                {/* 确认按钮 */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowExchangeModal(false)}
                    className={`flex-1 ${isDark ? 'border-[#3a3d4a] text-gray-300 hover:bg-[#2a2d3a]' : 'border-gray-300'}`}
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleExchangeConfirm}
                    disabled={!selectedFiatCurrency || !exchangeAmount || !estimatedUSDT}
                    className="flex-1 bg-[#00D4AA] hover:bg-[#00B895] text-white disabled:opacity-50"
                  >
                    确认兑换
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 代付备用金充值弹窗 */}
      {showStandbyRechargeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`relative max-w-md w-full max-h-[90vh] overflow-y-auto ${
            standbyRechargeAnimating 
              ? "transition-all duration-300 ease-out scale-100 opacity-100" 
              : "scale-95 opacity-0"
          }`}>
            <div className={`${cardStyle} rounded-lg p-6 relative`}>
              {/* 标题栏 */}
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  充值代付备用金
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setStandbyRechargeAnimating(false)
                    setTimeout(() => setShowStandbyRechargeModal(false), 200)
                  }}
                  className={`h-8 w-8 p-0 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* 币种选择 */}
              <div className="mb-6">
                <label className={`block text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  选择充值币种
                </label>
                <div className={`relative ${isDark ? 'bg-[#2a2d42] border-[#3a3d4a]' : 'bg-gray-50 border-gray-200'} border rounded-lg`}>
                  <select
                    value={standbyRechargeCurrency}
                    onChange={(e) => setStandbyRechargeCurrency(e.target.value)}
                    className={`w-full p-3 bg-transparent text-sm focus:outline-none appearance-none ${
                      isDark ? 'text-white focus:border-[#00D4AA]' : 'text-gray-900 focus:border-[#00D4AA]'
                    }`}
                  >
                    <option value="USD">USD - 美元</option>
                    <option value="EUR">EUR - 欧元</option>
                    <option value="GBP">GBP - 英镑</option>
                    <option value="JPY">JPY - 日元</option>
                  </select>
                  <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
              </div>

              {/* 充值方式选择 */}
              <div className="mb-6">
                <div className="flex space-x-1 p-1 rounded-lg bg-gray-100 dark:bg-[#252842]">
                  {["法币充值", "USDT充值"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setStandbyRechargeTab(tab)}
                      className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        standbyRechargeTab === tab
                          ? 'bg-white dark:bg-[#1a1d29] text-[#00D4AA] shadow-sm'
                          : isDark ? 'text-gray-300 hover:text-white hover:bg-[#2a2d3a]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* 当前余额显示 */}
              <div className="mb-4">
                <div className={`p-3 rounded-lg ${isDark ? 'bg-[#2a2d42]' : 'bg-gray-50'}`}>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {standbyRechargeTab === "法币充值" ? `当前${standbyRechargeCurrency}余额` : "当前USDT余额"}
                  </div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {standbyRechargeTab === "法币充值" 
                      ? `${standbyRechargeCurrency === "USD" ? "$85,430.50" : 
                          standbyRechargeCurrency === "EUR" ? "€12,680.25" : 
                          standbyRechargeCurrency === "GBP" ? "£8,950.75" : "¥2,580,000"}`
                      : "45,890.50 USDT"
                    }
                  </div>
                </div>
              </div>

              {/* 充值金额输入 */}
              <div className="mb-4">
                <label className={`block text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  充值金额
                </label>
                <div className={`relative ${isDark ? 'bg-[#2a2d42] border-[#3a3d4a]' : 'bg-white border-gray-200'} border rounded-lg`}>
                  <input
                    type="number"
                    value={standbyRechargeAmount}
                    onChange={(e) => setStandbyRechargeAmount(e.target.value)}
                    placeholder={standbyRechargeTab === "法币充值" ? `输入${standbyRechargeCurrency}金额` : "输入USDT金额"}
                    className={`w-full p-3 bg-transparent text-sm focus:outline-none ${
                      isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {standbyRechargeTab === "法币充值" ? standbyRechargeCurrency : "USDT"}
                  </div>
                </div>
              </div>

              {/* USDT充值时显示汇率和计算结果 */}
              {standbyRechargeTab === "USDT充值" && standbyRechargeAmount && (
                <div className="mb-4">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-[#2a2d42]' : 'bg-blue-50'} border ${isDark ? 'border-[#3a3d4a]' : 'border-blue-200'}`}>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-600'} mb-1`}>
                      今日汇率：1 USDT = {exchangeRates[standbyRechargeCurrency as keyof typeof exchangeRates] || 1} {standbyRechargeCurrency}
                    </div>
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-blue-800'}`}>
                      可充值：{(parseFloat(standbyRechargeAmount) * (exchangeRates[standbyRechargeCurrency as keyof typeof exchangeRates] || 1)).toFixed(2)} {standbyRechargeCurrency}
                    </div>
                  </div>
                </div>
              )}

              {/* 确认按钮 */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStandbyRechargeAnimating(false)
                    setTimeout(() => setShowStandbyRechargeModal(false), 200)
                  }}
                  className={`flex-1 ${isDark ? 'border-[#3a3d4a] text-gray-300 hover:bg-[#2a2d3a]' : 'border-gray-300'}`}
                >
                  取消
                </Button>
                <Button
                  onClick={() => {
                    console.log("代付备用金充值确认:", {
                      currency: standbyRechargeCurrency,
                      method: standbyRechargeTab,
                      amount: standbyRechargeAmount
                    })
                    setStandbyRechargeAnimating(false)
                    setTimeout(() => setShowStandbyRechargeModal(false), 200)
                  }}
                  disabled={!standbyRechargeAmount}
                  className="flex-1 bg-[#00D4AA] hover:bg-[#00B895] text-white disabled:opacity-50"
                >
                  确认充值
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 更多币种弹窗 */}
      {showMoreCurrencies && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardStyle} rounded-lg p-6 max-w-md w-full mx-4`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">选择显示币种</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMoreCurrencies(false)}
                className="p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* 多选提示 */}
            <div className="mb-4 text-sm text-gray-500">
              最多可选择5个币种 ({selectedCurrencies.length}/5)
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {moreCurrencies.map((currency) => {
                const isSelected = selectedCurrencies.includes(currency);
                return (
                  <button
                    key={currency}
                    onClick={() => {
                      if (isSelected) {
                        // 取消选择
                        setSelectedCurrencies(prev => prev.filter(c => c !== currency));
                      } else if (selectedCurrencies.length < 5) {
                        // 添加选择
                        setSelectedCurrencies(prev => [...prev, currency]);
                      }
                    }}
                    disabled={!isSelected && selectedCurrencies.length >= 5}
                    className={`p-3 rounded-lg border-2 text-center transition-all flex items-center space-x-2 ${
                      isSelected
                        ? "border-[#00D4AA] bg-[#00D4AA]/10 text-[#00D4AA]"
                        : selectedCurrencies.length >= 5
                          ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                          : isDark
                            ? "border-transparent bg-transparent hover:border-[#00D4AA]/50 hover:bg-[#00D4AA]/5"
                            : "border-transparent bg-transparent hover:border-[#00D4AA]/50 hover:bg-[#00D4AA]/5"
                    }`}
                  >
                    {/* 法币图标 */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      currency === 'CNY' ? 'bg-red-500' :
                      currency === 'USD' ? 'bg-green-500' :
                      currency === 'EUR' ? 'bg-blue-500' :
                      currency === 'GBP' ? 'bg-purple-500' :
                      currency === 'JPY' ? 'bg-orange-500' :
                      currency === 'CAD' ? 'bg-red-400' :
                      currency === 'AUD' ? 'bg-green-400' :
                      currency === 'CHF' ? 'bg-red-600' :
                      currency === 'SEK' ? 'bg-blue-400' :
                      currency === 'NOK' ? 'bg-blue-600' :
                      'bg-gray-500'
                    }`}>
                      <span className="text-white">{currency.charAt(0)}</span>
                    </div>
                    <div className="text-sm font-medium">{currency}</div>
                  </button>
                );
              })}
            </div>
            
            {/* 确认按钮 */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowMoreCurrencies(false)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  isDark 
                    ? "border-[#3a3d4a] text-gray-300 hover:bg-[#252842]" 
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                取消
              </button>
              <button
                onClick={() => setShowMoreCurrencies(false)}
                className="px-4 py-2 rounded-lg bg-[#00D4AA] text-white hover:bg-[#00D4AA]/90 transition-all"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 购买地址弹窗 */}
      {showPurchaseAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardStyle} rounded-lg p-6 w-full max-w-md mx-4`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              购买地址
            </h3>
            
            <div className="space-y-4">
              {/* 选择链 */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  选择区块链网络
                </label>
                <select
                  value={selectedChain}
                  onChange={(e) => setSelectedChain(e.target.value)}
                  className={`w-full p-3 rounded-lg border text-sm ${
                    isDark 
                      ? "bg-[#252842] border-[#3a3d4a] text-white" 
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                >
                  {Object.keys(chainPrices).map((chain) => (
                    <option key={chain} value={chain}>{chain}</option>
                  ))}
                </select>
              </div>

              {/* 显示单价 */}
              <div className={`p-3 rounded-lg ${isDark ? 'bg-[#252842]' : 'bg-gray-50'}`}>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedChain} 地址单价
                </div>
                <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {chainPrices[selectedChain as keyof typeof chainPrices]} <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>USDT/个</span>
                </div>
              </div>

              {/* 输入数量 */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  购买数量
                </label>
                <input
                  type="number"
                  value={addressQuantity}
                  onChange={(e) => setAddressQuantity(e.target.value)}
                  placeholder="请输入地址数量"
                  className={`w-full p-3 rounded-lg border text-sm ${
                    isDark 
                      ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400" 
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
                />
              </div>

              {/* 显示总价 */}
              <div className={`p-3 rounded-lg ${isDark ? 'bg-[#252842]' : 'bg-gray-50'}`}>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  总费用
                </div>
                <div className={`text-xl font-bold text-[#00D4AA]`}>
                  {totalPrice.toFixed(2)} <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>USDT</span>
                </div>
              </div>
            </div>
            
            {/* 按钮 */}
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={() => setShowPurchaseAddressModal(false)}
                className={`flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                  isDark 
                    ? "border-[#3a3d4a] text-gray-300 hover:bg-[#3a3d4a]" 
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                取消
              </button>
              <button
                onClick={handlePurchaseAddress}
                disabled={!addressQuantity || parseInt(addressQuantity) <= 0}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  !addressQuantity || parseInt(addressQuantity) <= 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#00D4AA] text-white hover:bg-[#00D4AA]/90"
                }`}
              >
                确认购买
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 释放地址确认弹窗 */}
      {showReleaseModal && selectedAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardStyle} rounded-lg p-6 w-full max-w-md mx-4`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              确认释放地址
            </h3>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-[#252842]' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{getNetworkLogo(selectedAddress.network)}</span>
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {selectedAddress.network}
                  </span>
                </div>
                <div className={`text-sm font-mono ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedAddress.fullAddress}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                  用户ID: {selectedAddress.userId}
                </div>
              </div>
              
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                是否确认释放该地址？释放后该地址将与该用户解绑，重新回到未分配地址库，以后随机分配给其他用户。
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={() => setShowReleaseModal(false)}
                className={`flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                  isDark 
                    ? "border-[#3a3d4a] text-gray-300 hover:bg-[#3a3d4a]" 
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                取消
              </button>
              <button
                onClick={confirmReleaseAddress}
                className="flex-1 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all text-sm font-medium"
              >
                确认释放
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 交易伙伴操作对话框 */}
      {tradingPartnerDialog.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl ${isDark ? 'bg-[#1a1d29]' : 'bg-white'} shadow-2xl border ${isDark ? 'border-[#252842]' : 'border-gray-200'} overflow-hidden`}>
            {/* 对话框头部 */}
            <div className={`px-6 py-4 border-b ${isDark ? 'border-[#252842]' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  交易伙伴: {tradingPartnerDialog.partnerName}
                </h3>
                <button
                  onClick={() => setTradingPartnerDialog({isOpen: false, partnerName: '', partnerId: ''})}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>

            {/* 对话框内容 */}
            <div className="px-6 py-6 space-y-4">
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                选择与交易伙伴的联系方式
              </p>

              {/* 私聊选项 */}
              <button
                onClick={() => {
                  // 这里可以跳转到私聊页面或打开聊天功能
                  console.log('打开私聊:', tradingPartnerDialog.partnerName);
                  setTradingPartnerDialog({isOpen: false, partnerName: '', partnerId: ''});
                }}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  isDark 
                    ? 'border-[#252842] bg-[#0f1219] hover:bg-[#1a1d29] text-white' 
                    : 'border-gray-200 bg-gray-50 hover:bg-white text-gray-900'
                }`}
              >
                <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
                  <MessageCircle className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div className="text-left">
                  <div className="font-medium">发起私聊</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    与 {tradingPartnerDialog.partnerName} 进行私人对话
                  </div>
                </div>
                <ChevronRight className={`h-5 w-5 ml-auto ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              </button>

              {/* 担保群选项 */}
              <button
                onClick={() => {
                  // 这里可以跳转到担保群或打开群聊功能
                  console.log('进入担保群:', tradingPartnerDialog.partnerName);
                  setTradingPartnerDialog({isOpen: false, partnerName: '', partnerId: ''});
                }}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  isDark 
                    ? 'border-[#252842] bg-[#0f1219] hover:bg-[#1a1d29] text-white' 
                    : 'border-gray-200 bg-gray-50 hover:bg-white text-gray-900'
                }`}
              >
                <div className={`p-2 rounded-lg ${isDark ? 'bg-green-500/20' : 'bg-green-50'}`}>
                  <Users className={`h-5 w-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <div className="text-left">
                  <div className="font-medium">进入担保群</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    在担保群中协商交易细节
                  </div>
                </div>
                <ChevronRight className={`h-5 w-5 ml-auto ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}