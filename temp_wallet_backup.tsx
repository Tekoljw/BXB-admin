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
  Power,
  BookOpen,
  ShoppingCart,
  LineChart,
  Banknote,
  Percent,
  CreditCard as CardIcon,
  Clock,
  CheckCircle,
  Calendar,
  User,
  Briefcase,
  Rocket,
  MessageCircle,
  Users,
  ExternalLink,
  Receipt,
  Coins,
  Target,
  HelpCircle,
  Zap,
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
  Edit2,
  Trash2,
  Lock,
  Key,
  Ban,
  Unlink,
  ChevronRight,
  PauseCircle,
  Play
} from "lucide-react"
import React, { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useTranslation } from "@/hooks/use-translation"
import SkeletonLoader from "@/components/skeleton-loader"
import DollarRefreshIcon from "@/components/dollar-refresh-icon"
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
  const [secondaryTab, setSecondaryTab] = useState<string>("deposit") // 二级页签状态 // 订单记录子页签
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
  const [showFundDistribution, setShowFundDistribution] = useState(false) // 资金分布弹窗
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
  
  // 卡片操作弹窗状态
  const [showRechargeModal, setShowRechargeModal] = useState(false)
  const [showNewCardModal, setShowNewCardModal] = useState(false)
  const [showActivateModal, setShowActivateModal] = useState(false)
  const [showCardTransferModal, setShowCardTransferModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false) // 个人信息弹窗
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false) // 个人信息编辑状态
  const [shippingAddresses, setShippingAddresses] = useState([
    { id: 1, address: '', city: '', postalCode: '', country: '', sameAsResidential: true },
  ]) // 收款地址列表
  const [showShippingAddress, setShowShippingAddress] = useState(false) // 是否显示收款地址详情
  const [selectedCardInfo, setSelectedCardInfo] = useState({ name: '', number: '', type: '' })
  
  // 新增卡片操作弹窗状态
  const [showFreezeModal, setShowFreezeModal] = useState(false) // 冻结卡片弹窗
  const [showDeleteModal, setShowDeleteModal] = useState(false) // 删除卡片弹窗
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false) // 修改密码弹窗
  const [changePasswordStep, setChangePasswordStep] = useState(1) // 修改密码步骤
  const [currentPin, setCurrentPin] = useState("") // 当前PIN码
  const [newPin, setNewPin] = useState("") // 新PIN码
  const [confirmNewPin, setConfirmNewPin] = useState("") // 确认新PIN码
  const [resetPasswordMode, setResetPasswordMode] = useState(false) // 重置密码模式
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("") // 手机验证码
  const [emailVerificationCode, setEmailVerificationCode] = useState("") // 邮箱验证码
  const [currentCardId, setCurrentCardId] = useState('') // 当前操作的卡片ID
  
  // 激活卡片多步骤状态
  const [activateStep, setActivateStep] = useState(1)
  const [activateCardType, setActivateCardType] = useState<"virtual" | "physical">("virtual")
  const [activationData, setActivationData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    bankPassword: "",
    confirmBankPassword: ""
  })
  
  // 申请新卡多步骤状态
  const [newCardStep, setNewCardStep] = useState(1)
  const [newCardType, setNewCardType] = useState<"virtual" | "physical">("virtual")
  const [newCardBrand, setNewCardBrand] = useState<"visa" | "master">("visa")
  const [newCardRegion, setNewCardRegion] = useState<"europe" | "hongkong" | "usa">("europe")
  const [needMainlandChina, setNeedMainlandChina] = useState(false)
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([])
  const [cardApplicationInfo, setCardApplicationInfo] = useState({
    holderName: "",
    phoneNumber: "",
    email: "",
    idNumber: "",
    nationality: "",
    passportNumber: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
  })
  
  // 50个付款场景选项
  const paymentScenarios = [
    "Amazon", "AWS", "Google Pay", "Apple Pay", "PayPal", "Alipay", "WeChat Pay", "Microsoft", 
    "Netflix", "Spotify", "YouTube Premium", "Adobe Creative Cloud", "Dropbox", "iCloud", 
    "OneDrive", "Zoom", "Slack", "Discord Nitro", "Twitch", "Steam", "Epic Games", "PlayStation", 
    "Xbox Live", "Nintendo eShop", "App Store", "Google Play", "Uber", "Lyft", "DoorDash", 
    "Grubhub", "Airbnb", "Booking.com", "Expedia", "Skyscanner", "Facebook Ads", "Instagram Ads", 
    "Twitter Ads", "TikTok Ads", "LinkedIn Ads", "Shopify", "WooCommerce", "Etsy", "eBay", 
    "AliExpress", "Wish", "Temu", "Stripe", "Square", "Venmo", "Revolut"
  ]
  
  // 重置修改密码弹窗状态
  const resetChangePasswordModal = () => {
    setChangePasswordStep(1)
    setCurrentPin("")
    setNewPin("")
    setConfirmNewPin("")
    setResetPasswordMode(false)
    setPhoneVerificationCode("")
    setEmailVerificationCode("")
  }

  // 重置申请新卡弹窗状态
  const resetNewCardModal = () => {
    setNewCardStep(1)
    setNewCardType("virtual")
    setNewCardBrand("visa")
    setNewCardRegion("europe")
    setNeedMainlandChina(false)
    setSelectedScenarios([])
    setCardApplicationInfo({
      holderName: "",
      phoneNumber: "",
      email: "",
      idNumber: "",
      nationality: "",
      passportNumber: "",
      address: "",
      city: "",
      postalCode: "",
      country: ""
    })
  }
  
  // 重置激活卡片弹窗状态
  const resetActivateModal = () => {
    setActivateStep(1)
    setActivateCardType("virtual")
    setActivationData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      bankPassword: "",
      confirmBankPassword: ""
    })
  }
  
  // 充值弹窗状态
  const [rechargeCardType, setRechargeCardType] = useState<"virtual" | "physical">("virtual")
  const [selectedRechargeCard, setSelectedRechargeCard] = useState("shopping")
  const [rechargeAmount, setRechargeAmount] = useState("")
  const [showCardDropdown, setShowCardDropdown] = useState(false)
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCardDropdown) {
        const target = event.target as HTMLElement
        if (!target.closest('.card-dropdown')) {
          setShowCardDropdown(false)
        }
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showCardDropdown])

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

  // 立即确认弹窗状态
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmTransactionInfo, setConfirmTransactionInfo] = useState({
    id: "",
    amount: "",
    currency: "",
    partner: ""
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
  const [showVirtualCardApplication, setShowVirtualCardApplication] = useState(false)
  const [showPhysicalCardApplication, setShowPhysicalCardApplication] = useState(false)
  const [selectedUCardView, setSelectedUCardView] = useState("virtual") // 控制顶部卡片选中状态
  const [showPinModal, setShowPinModal] = useState(false) // PIN码查看弹窗
  const [selectedCardId, setSelectedCardId] = useState("") // 选中的卡片ID
  const [transferPassword, setTransferPassword] = useState("") // 转账密码
  const [showPin, setShowPin] = useState(false) // 是否显示PIN码
  const [editingCardId, setEditingCardId] = useState("") // 正在编辑的卡片ID
  const [editingCardName, setEditingCardName] = useState("") // 编辑中的卡片名称
  
  // 卡片操作弹窗状态

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

    { id: "担保账户", label: "担保账户", icon: Shield },
    { id: "BePAY账户", label: "BePAY账户", icon: Receipt },
    { id: "佣金账户", label: "佣金账户", icon: Percent }
  ]

  const orderTabs = [
    { id: "资金记录", label: "资金记录", icon: FileText },
    { id: "USDT买卖记录", label: "USDT买卖记录", icon: DollarSign },
    { id: "现货订单", label: "现货订单", icon: BarChart2 },
    { id: "合约订单", label: "合约订单", icon: LineChart },
    { id: "理财订单", label: "理财订单", icon: PiggyBank },
    { id: "U卡订单", label: "U卡订单", icon: CreditCard },
    { id: "担保记录", label: "担保记录", icon: Shield },
    { id: "支付订单", label: "支付订单", icon: Receipt },
    { id: "佣金记录", label: "佣金记录", icon: Percent }
  ]

  // 二级页签配置
  const orderCategories = {
    funds: {
      name: '资金记录',
      tabs: {
        deposit: '入金记录',
        withdraw: '出金记录',
        internal_transfer: '内转记录',
        transfer: '划转记录',
        other: '其他记录'
      }
    },
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
        earnings: '理财收益记录',
        account: '理财账户记录'
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

    guarantee: {
      name: '担保记录',
      tabs: {
        receive: '担保收款记录',
        payment: '担保付款记录',
        credit: '信用担保资金记录'
      }
    },
    transfer: {
      name: '划转记录',
      tabs: {
        records: '划转记录'
      }
    },
    usdtTrading: {
      name: 'USDT买卖记录',
      tabs: {
        c2c: 'C2C',
        quick: '快捷',
        otc: 'OTC'
      }
    },
    commission: {
      name: '佣金记录',
      tabs: {
        trading: '交易返佣',
        referral: '邀请返佣',
        bonus: '奖励佣金'
      }
    },
    payment: {
      name: '支付订单',
      tabs: {
        fiatReceive: '法币代收',
        fiatPay: '法币代付',
        cryptoReceive: '加密货币代收',
        cryptoPay: '加密货币代付'
      }
    }
  }

  // 根据主页签ID获取对应的category key
  const getCategoryKey = (orderTabId: string) => {
    const mapping = {
      "资金记录": "funds",
      "USDT买卖记录": "usdtTrading",
      "现货订单": "spot",
      "合约订单": "futures", 
      "理财订单": "wealth",
      "U卡订单": "ucard",
      "担保记录": "guarantee",
      "划转记录": "transfer",
      "佣金记录": "commission",
      "支付订单": "payment"
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
    "资金记录": {
      "出金入金记录": [
        {
          id: "FD001",
          type: "充值",
          currency: "USDT",
          amount: "+1,000.00",
          channel: "银行卡",
          status: "已完成",
          time: "2024-01-15 14:25:30",
          fee: "0.00 USDT",
          txHash: "0x123...abc"
        },
        {
          id: "FD002",
          type: "提现",
          currency: "USDT",
          amount: "-500.00",
          channel: "银行卡",
          status: "已完成",
          time: "2024-01-14 20:30:15",
          fee: "2.00 USDT",
          txHash: "0x456...def"
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
    },
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
        cardNumber: "****1234",
        cardType: "虚拟卡",
        category: "购物"
      },
      {
        id: "UC002",
        type: "充值",
        merchant: "平台充值",
        amount: "500.00",
        currency: "USDT",
        status: "已完成", 
        time: "2024-01-14 10:20:15",
        cardNumber: "****1234",
        cardType: "虚拟卡",
        category: "充值"
      },
      {
        id: "UC003",
        type: "消费",
        merchant: "Google Play",
        amount: "29.99",
        currency: "USD",
        status: "已完成",
        time: "2024-01-14 15:30:45",
        cardNumber: "****5678",
        cardType: "虚拟卡",
        category: "应用服务"
      },
      {
        id: "UC004",
        type: "消费",
        merchant: "Netflix",
        amount: "15.99",
        currency: "USD",
        status: "已完成",
        time: "2024-01-13 20:15:30",
        cardNumber: "****1234",
        cardType: "虚拟卡",
        category: "娱乐"
      },
      {
        id: "UC005",
        type: "提现",
        merchant: "银行提现",
        amount: "200.00",
        currency: "USD",
        status: "处理中",
        time: "2024-01-13 14:22:10",
        cardNumber: "****5678",
        cardType: "实体卡",
        category: "提现"
      },
      {
        id: "UC006",
        type: "消费",
        merchant: "Apple Store",
        amount: "99.99",
        currency: "USD",
        status: "已完成",
        time: "2024-01-12 11:45:00",
        cardNumber: "****9012",
        cardType: "实体卡",
        category: "购物"
      },
      {
        id: "UC007",
        type: "充值",
        merchant: "平台充值",
        amount: "1000.00",
        currency: "USDT",
        status: "已完成",
        time: "2024-01-12 09:30:20",
        cardNumber: "****9012",
        cardType: "实体卡",
        category: "充值"
      },
      {
        id: "UC008",
        type: "消费",
        merchant: "Spotify",
        amount: "9.99",
        currency: "USD",
        status: "已完成",
        time: "2024-01-11 16:20:15",
        cardNumber: "****1234",
        cardType: "虚拟卡",
        category: "娱乐"
      },
      {
        id: "UC009",
        type: "消费",
        merchant: "AWS",
        amount: "156.78",
        currency: "USD",
        status: "已完成",
        time: "2024-01-11 08:15:30",
        cardNumber: "****5678",
        cardType: "虚拟卡",
        category: "云服务"
      },
      {
        id: "UC010",
        type: "退款",
        merchant: "Amazon",
        amount: "45.99",
        currency: "USD",
        status: "已完成",
        time: "2024-01-10 13:40:25",
        cardNumber: "****1234",
        cardType: "虚拟卡",
        category: "退款"
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
    "支付订单": {
      fiatReceive: [
        {
          id: "FR001",
          type: "法币代收",
          merchant: "电商平台A", 
          customerName: "张三",
          amount: "6,800.00",
          currency: "CNY",
          channel: "支付宝",
          bankAccount: "中国银行****1234",
          status: "已完成",
          time: "2024-01-15 16:30:25",
          orderNo: "FR202401151630001",
          fee: "68.00 CNY",
          settlement: "已结算"
        },
        {
          id: "FR002",
          type: "法币代收",
          merchant: "游戏平台B",
          customerName: "李四",
          amount: "1,200.00",
          currency: "USD",
          channel: "信用卡",
          bankAccount: "花旗银行****5678",
          status: "处理中",
          time: "2024-01-15 14:45:18",
          orderNo: "FR202401151445002",
          fee: "24.00 USD",
          settlement: "待结算"
        },
        {
          id: "FR003",
          type: "法币代收",
          merchant: "在线教育C",
          customerName: "王五",
          amount: "850.00",
          currency: "EUR",
          channel: "银行转账",
          bankAccount: "德意志银行****9012",
          status: "已完成",
          time: "2024-01-15 12:20:30",
          orderNo: "FR202401151220003",
          fee: "12.75 EUR",
          settlement: "已结算"
        }
      ],
      fiatPay: [
        {
          id: "FP001",
          type: "法币代付",
          merchant: "供应商A",
          recipientName: "赵六",
          amount: "3,500.00",
          currency: "CNY",
          channel: "微信支付",
          bankAccount: "工商银行****3456",
          status: "已完成",
          time: "2024-01-15 15:20:45",
          orderNo: "FP202401151520001",
          fee: "35.00 CNY",
          purpose: "货款支付"
        },
        {
          id: "FP002",
          type: "法币代付",
          merchant: "服务商B",
          recipientName: "陈七",
          amount: "2,200.00",
          currency: "USD",
          channel: "银行转账",
          bankAccount: "摩根大通****7890",
          status: "处理中",
          time: "2024-01-15 13:35:20",
          orderNo: "FP202401151335002",
          fee: "44.00 USD",
          purpose: "服务费支付"
        }
      ],
      cryptoReceive: [
        {
          id: "CR001",
          type: "加密货币代收",
          merchant: "NFT市场A",
          customerWallet: "0x1234...abcd",
          amount: "1,250.00",
          currency: "USDT",
          network: "TRC20",
          txHash: "0xabcd1234...efgh5678",
          status: "已确认",
          time: "2024-01-15 17:10:25",
          orderNo: "CR202401151710001",
          fee: "1.00 USDT",
          confirmations: "32/32"
        },
        {
          id: "CR002",
          type: "加密货币代收",
          merchant: "DeFi平台B",
          customerWallet: "0x5678...efgh",
          amount: "0.035",
          currency: "BTC",
          network: "Bitcoin",
          txHash: "bc1234...def567",
          status: "确认中",
          time: "2024-01-15 16:25:18",
          orderNo: "CR202401151625002",
          fee: "0.0001 BTC",
          confirmations: "2/6"
        },
        {
          id: "CR003",
          type: "加密货币代收",
          merchant: "交易所C",
          customerWallet: "0x9012...ijkl",
          amount: "2.5",
          currency: "ETH",
          network: "Ethereum",
          txHash: "0xef123...456789",
          status: "已确认",
          time: "2024-01-15 14:40:30",
          orderNo: "CR202401151440003",
          fee: "0.001 ETH",
          confirmations: "12/12"
        }
      ],
      cryptoPay: [
        {
          id: "CP001",
          type: "加密货币代付",
          merchant: "矿池A",
          recipientWallet: "0xabcd...1234",
          amount: "5,000.00",
          currency: "USDT",
          network: "ERC20",
          txHash: "0x1234abcd...5678efgh",
          status: "已发送",
          time: "2024-01-15 18:15:45",
          orderNo: "CP202401151815001",
          fee: "2.50 USDT",
          purpose: "挖矿收益分配"
        },
        {
          id: "CP002",
          type: "加密货币代付",
          merchant: "游戏公会B",
          recipientWallet: "0xefgh...5678",
          amount: "0.8",
          currency: "BNB",
          network: "BSC",
          txHash: "0x5678efgh...9012ijkl",
          status: "处理中",
          time: "2024-01-15 16:45:20",
          orderNo: "CP202401151645002",
          fee: "0.001 BNB",
          purpose: "公会奖励发放"
        }
      ]
    },
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
    "其他记录": [
      {
        id: "OTH001",
        time: "2024-01-15 14:20:15",
        currency: "USDT",
        amount: "+50.00",
        type: "抵扣金",
        status: "已完成",
        remark: "新用户注册奖励"
      },
      {
        id: "OTH002", 
        time: "2024-01-15 10:35:45",
        currency: "BTC",
        amount: "+0.001",
        type: "系统发放",
        status: "已完成",
        remark: "成功邀请用户注册"
      },
      {
        id: "OTH003",
        time: "2024-01-14 22:10:30", 
        currency: "USDT",
        amount: "-2.50",
        type: "系统减扣",
        status: "已完成",
        remark: "网络费用调整"
      }
    ],
    "佣金记录": [
      {
        id: "CM001",
        type: "交易返佣",
        currency: "USDT",
        amount: "+12.34",
        source: "BTC/USDT交易",
        status: "已到账",
        time: "2024-01-15 16:30:45",
        rate: "0.1%"
      },
      {
        id: "CM002",
        type: "邀请返佣",
        currency: "USDT",
        amount: "+8.90",
        source: "用户A邀请奖励",
        status: "已到账",
        time: "2024-01-14 14:20:30",
        rate: "20%"
      },
      {
        id: "CM003",
        type: "奖励佣金",
        currency: "USDT",
        amount: "+50.00",
        source: "月度活动奖励",
        status: "已到账",
        time: "2024-01-13 10:15:20",
        rate: "固定"
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

        { name: "担保账户", balance: "5,000.00", icon: Shield, percentage: "22.5%" },
        { name: "BePAY账户", balance: "1,125.47", icon: Receipt, percentage: "5.0%" },
        { name: "佣金账户", balance: "567.89", icon: Percent, percentage: "2.5%" }
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
                          handleTransferClick()
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
        );

      case "BePAY账户":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">BePAY账户</h2>
            <div className="p-8 text-center text-gray-500">
              BePAY账户功能正在开发中...
            </div>
          </div>
        );
