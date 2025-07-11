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
  
  // 佣金账户相关状态
  const [commissionCategory, setCommissionCategory] = useState("合约佣金") // 佣金分类：合约佣金/理财佣金/U卡佣金/担保佣金/支付佣金
  const [commissionSubTab, setCommissionSubTab] = useState("佣金规则") // 佣金子页签：佣金规则/查看记录
  
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
        );

      case "U卡账户":
        return (
          <div className="space-y-6">
            {/* 两个顶部卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 卡内余额 */}
              <div className={`rounded-lg p-6 ${cardStyle}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <CreditCard className={`h-6 w-6 mr-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        卡内余额
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-2xl font-bold mr-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {balanceVisible ? "2,222.22" : "****"}
                      </span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>USDT</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4 flex flex-col items-center">
                    <TrendChart 
                      data={generateTrendData(false)} 
                      isPositive={false}
                      height={50}
                      width={80}
                    />
                    <div className="flex items-center mt-2">
                      <span className={`text-xs mr-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        本月消费
                      </span>
                      <span className="text-xs text-red-500">-678.90 USDT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 账户余额 */}
              <div className={`rounded-lg p-6 ${cardStyle}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <Wallet className={`h-6 w-6 mr-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        账户余额
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-2xl font-bold mr-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {balanceVisible ? "3,456.78" : "****"}
                      </span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>USDT</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4 flex flex-col items-center">
                    <TrendChart 
                      data={generateTrendData(true)} 
                      isPositive={true}
                      height={50}
                      width={80}
                    />
                    <div className="flex items-center mt-2">
                      <span className={`text-xs mr-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        本月充值
                      </span>
                      <span className={`text-xs font-medium ${isDark ? 'text-[#00D4AA]' : 'text-blue-600'}`}>
                        +1,500.00 USDT
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 页签和功能按钮 */}
            <div className="flex items-center justify-between">
              {/* 虚拟卡/实体卡页签 - 滑动样式 */}
              <div className={`relative flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'}`}>
                {/* 滑动背景 */}
                <div
                  className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'}`}
                  style={{
                    width: '64px',
                    left: selectedUCardView === "virtual" ? '4px' : '68px'
                  }}
                />
                
                {/* 页签按钮 */}
                {["virtual", "physical"].map((tab) => (
                  <button
                    key={tab}
                    className={`relative z-10 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      selectedUCardView === tab
                        ? isDark ? "text-black" : "text-white"
                        : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    style={{
                      width: '64px',
                      height: '32px'
                    }}
                    onClick={() => setSelectedUCardView(tab)}
                  >
                    {tab === "virtual" ? "虚拟卡" : "实体卡"}
                  </button>
                ))}
              </div>

              {/* 功能按钮 */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log("顶部充值按钮被点击")
                    setSelectedCardInfo({ name: 'U卡账户', number: '**** **** **** 0000', type: 'virtual' })
                    setShowRechargeModal(true)
                  }}
                  className="px-4 py-2 bg-[#00D4AA] text-white border-[#00D4AA] hover:bg-[#00D4AA]/90 transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  卡片充值
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log("顶部申请新卡按钮被点击")
                    setShowNewCardModal(true)
                  }}
                  className={`px-4 py-2 border transition-colors ${
                    isDark
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  申请新卡
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log("顶部激活卡片按钮被点击")
                    setSelectedCardInfo({ name: 'U卡账户', number: '**** **** **** 0000', type: 'virtual' })
                    setShowActivateModal(true)
                  }}
                  className={`px-4 py-2 border transition-colors ${
                    isDark
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <Power className="h-4 w-4 mr-2" />
                  激活卡片
                </Button>
                <Button
                  variant="outline"
                  onClick={handleTransferClick}
                  className={`px-4 py-2 border transition-colors ${
                    isDark
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  划款
                </Button>
                <Button
                  variant="outline"
                  className={`p-2 border transition-colors ${
                    isDark
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                  title="个人信息"
                  onClick={() => setShowPersonalInfoModal(true)}
                >
                  <User className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className={`p-2 border transition-colors ${
                    isDark
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                  title="资金记录"
                  onClick={() => {
                    // 跳转到订单记录页签并设置为资金记录
                    setTopLevelTab("订单记录")
                    setOrderTab("资金记录")
                  }}
                >
                  <FileText className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className={`p-2 border transition-colors ${
                    isDark
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                  title="账单记录"
                >
                  <History className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowFundDistribution(true)}
                  className={`p-2 border transition-colors ${
                    isDark
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                  title="资金分布"
                >
                  <PieChart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 页签内容区域 */}
            <div className={`${cardStyle} rounded-lg p-6`}>
              {selectedUCardView === "virtual" && (
                <div className="space-y-6">
                  {/* 虚拟卡列表 */}
                  <div className="grid gap-6" style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    maxWidth: '100%'
                  }}>
                    {/* 虚拟卡1 - 冻结状态演示 */}
                    <div 
                      className={`w-full min-w-[280px] max-w-[400px] border rounded-lg transition-all opacity-75 ${
                        isDark ? 'bg-gray-800/50 border-red-700' : 'bg-white border-red-200'
                      }`}
                    >
                      <div className="relative">
                        <div className={`relative p-3 rounded-t-lg ${
                          isDark ? 'bg-gradient-to-r from-gray-600 to-gray-700' : 'bg-gradient-to-r from-gray-400 to-gray-500'
                        }`} style={{aspectRatio: '24/9'}}>
                          <div className="text-white h-full flex flex-col justify-between opacity-60">
                            {/* 顶部logo区域 */}
                            <div className="flex justify-between items-start">
                              <div className="text-sm font-bold">BeDAO</div>
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-red-500 -mr-0.5"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                              </div>
                            </div>

                            {/* 卡号和有效期区域 */}
                            <div className="text-left mt-3">
                              <div className="flex items-center">
                                <span className="text-sm font-mono tracking-wider font-bold">4323 4323 4323 7777</span>
                                <button 
                                  className="ml-2 opacity-50 cursor-not-allowed"
                                  disabled
                                >
                                  <Copy className="h-3 w-3" />
                                </button>
                              </div>
                              <div className="text-xs opacity-50 mt-2">有效期: 05/29</div>
                            </div>

                            {/* Pin码区域 - 右下角 */}
                            <div className="absolute bottom-3 right-3 flex items-center">
                              <button 
                                className="text-xs opacity-50 cursor-not-allowed mr-2"
                                disabled
                              >
                                <Eye className="h-2.5 w-2.5" />
                              </button>
                              <div className="flex items-center">
                                <span className="text-xs mr-1 font-medium">Pin码</span>
                                <div className="bg-white/10 rounded px-2 py-0.5 text-xs font-mono font-bold">***</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* 冻结覆盖层 */}
                          <div className="absolute inset-0 bg-black/30 rounded-t-lg">
                            {/* 左上角冻结标签 */}
                            <div className="absolute top-2 left-2 z-10">
                              <div className={`px-2 py-1 rounded text-xs font-medium flex items-center ${
                                isDark ? 'bg-red-900/80 text-red-400' : 'bg-red-100/90 text-red-700'
                              }`}>
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="10" strokeWidth={2}/>
                                  <path d="m4.9 4.9 14.2 14.2" strokeWidth={2}/>
                                </svg>
                                冻结
                              </div>
                            </div>
                            
                            {/* 右上角冻结信息 */}
                            <div className="absolute top-2 right-2 z-10 text-right">
                              <div className="text-white text-xs">
                                <div className="font-medium">2025-01-29 14:32</div>
                                <div className="opacity-90">异常交易检测</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 卡名和余额信息 */}
                      <div className="flex justify-between items-center px-4 py-2">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>工薪卡专用</span>
                          <div className={`h-2 w-2 ml-2 rounded-full ${isDark ? 'bg-red-400' : 'bg-red-500'}`}></div>
                        </div>
                        <div className="flex items-center">
                          <div className={`text-lg font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>4,750.23 USDT</div>
                        </div>
                      </div>

                      {/* 操作按钮 */}
                      <div className="px-4 pb-3">
                        <div className="grid grid-cols-4 gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedCardInfo({ name: '工薪卡专用', number: '4323 4323 4323 7777', type: 'virtual' })
                              setShowRechargeModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                          >
                            <DollarSign className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-frozen')
                              setShowFreezeModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                            }`}
                          >
                            <PauseCircle className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-frozen')
                              setShowDeleteModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-frozen')
                              setShowChangePasswordModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 虚拟卡2 - 购物专用卡 */}
                    <div 
                      className={`w-full min-w-[280px] max-w-[400px] border rounded-lg transition-all ${
                        isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className={`relative p-3 rounded-t-lg ${
                        isDark ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`} style={{aspectRatio: '24/9'}}>
                        <div className="text-white h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="text-sm font-bold">BeDAO</div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-blue-500 -mr-0.5"></div>
                              <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                          </div>
                          <div className="text-left mt-3">
                            <div className="flex items-center">
                              <span className="text-sm font-mono tracking-wider font-bold">5124 5124 5124 8888</span>
                              <button 
                                className="ml-2 opacity-90 hover:opacity-100"
                                onClick={() => navigator.clipboard.writeText("5124512451248888")}
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="text-xs opacity-75 mt-2">有效期: 08/28</div>
                          </div>
                          <div className="absolute bottom-3 right-3 flex items-center">
                            <button 
                              className="text-xs opacity-90 hover:opacity-100 mr-2"
                              onClick={() => {
                                setSelectedCardId("card-shopping")
                                setShowPinModal(true)
                                setShowPin(false)
                                setTransferPassword("")
                              }}
                            >
                              <Eye className="h-2.5 w-2.5" />
                            </button>
                            <div className="flex items-center">
                              <span className="text-xs mr-1 font-medium">Pin码</span>
                              <div className="bg-white/20 rounded px-2 py-0.5 text-xs font-mono font-bold">***</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center px-4 py-2">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>购物专用卡</span>
                          <div className={`h-2 w-2 ml-2 rounded-full ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`}></div>
                        </div>
                        <div className="flex items-center">
                          <div className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>2,180.50 USDT</div>
                        </div>
                      </div>
                      <div className="px-4 pb-3">
                        <div className="grid grid-cols-4 gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedCardInfo({ name: '购物专用卡', number: '5124 5124 5124 8888', type: 'virtual' })
                              setShowRechargeModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                            }`}
                          >
                            <DollarSign className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-shopping')
                              setShowFreezeModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                            }`}
                          >
                            <PauseCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-shopping')
                              setShowDeleteModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-shopping')
                              setShowChangePasswordModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 虚拟卡3 - 旅行消费卡 */}
                    <div 
                      className={`w-full min-w-[280px] max-w-[400px] border rounded-lg transition-all ${
                        isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className={`relative p-3 rounded-t-lg ${
                        isDark ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                      }`} style={{aspectRatio: '24/9'}}>
                        <div className="text-white h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="text-sm font-bold">BeDAO</div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-orange-500 -mr-0.5"></div>
                              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                            </div>
                          </div>
                          <div className="text-left mt-3">
                            <div className="flex items-center">
                              <span className="text-sm font-mono tracking-wider font-bold">6789 6789 6789 1234</span>
                              <button 
                                className="ml-2 opacity-90 hover:opacity-100"
                                onClick={() => navigator.clipboard.writeText("6789678967891234")}
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="text-xs opacity-75 mt-2">有效期: 12/27</div>
                          </div>
                          <div className="absolute bottom-3 right-3 flex items-center">
                            <button 
                              className="text-xs opacity-90 hover:opacity-100 mr-2"
                              onClick={() => {
                                setSelectedCardId("card-travel")
                                setShowPinModal(true)
                                setShowPin(false)
                                setTransferPassword("")
                              }}
                            >
                              <Eye className="h-2.5 w-2.5" />
                            </button>
                            <div className="flex items-center">
                              <span className="text-xs mr-1 font-medium">Pin码</span>
                              <div className="bg-white/20 rounded px-2 py-0.5 text-xs font-mono font-bold">***</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center px-4 py-2">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>旅行消费卡</span>
                          <div className={`h-2 w-2 ml-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                        </div>
                        <div className="flex items-center">
                          <div className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>8,950.75 USDT</div>
                        </div>
                      </div>
                      <div className="px-4 pb-3">
                        <div className="grid grid-cols-4 gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedCardInfo({ name: '旅行消费卡', number: '6789 6789 6789 1234', type: 'virtual' })
                              setShowRechargeModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                            }`}
                          >
                            <DollarSign className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-travel')
                              setShowFreezeModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                            }`}
                          >
                            <PauseCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-travel')
                              setShowDeleteModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-travel')
                              setShowChangePasswordModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 虚拟卡4 - 娱乐专用卡 */}
                    <div 
                      className={`w-full min-w-[280px] max-w-[400px] border rounded-lg transition-all ${
                        isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className={`relative p-3 rounded-t-lg ${
                        isDark ? 'bg-gradient-to-r from-orange-600 to-red-600' : 'bg-gradient-to-r from-orange-500 to-red-500'
                      }`} style={{aspectRatio: '24/9'}}>
                        <div className="text-white h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="text-sm font-bold">BeDAO</div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-yellow-500 -mr-0.5"></div>
                              <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                            </div>
                          </div>
                          <div className="text-left mt-3">
                            <div className="flex items-center">
                              <span className="text-sm font-mono tracking-wider font-bold">9876 9876 9876 5432</span>
                              <button 
                                className="ml-2 opacity-90 hover:opacity-100"
                                onClick={() => navigator.clipboard.writeText("9876987698765432")}
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="text-xs opacity-75 mt-2">有效期: 03/29</div>
                          </div>
                          <div className="absolute bottom-3 right-3 flex items-center">
                            <button 
                              className="text-xs opacity-90 hover:opacity-100 mr-2"
                              onClick={() => {
                                setSelectedCardId("card-entertainment")
                                setShowPinModal(true)
                                setShowPin(false)
                                setTransferPassword("")
                              }}
                            >
                              <Eye className="h-2.5 w-2.5" />
                            </button>
                            <div className="flex items-center">
                              <span className="text-xs mr-1 font-medium">Pin码</span>
                              <div className="bg-white/20 rounded px-2 py-0.5 text-xs font-mono font-bold">***</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center px-4 py-2">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>娱乐专用卡</span>
                          <div className={`h-2 w-2 ml-2 rounded-full ${isDark ? 'bg-orange-400' : 'bg-orange-500'}`}></div>
                        </div>
                        <div className="flex items-center">
                          <div className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>1,356.89 USDT</div>
                        </div>
                      </div>
                      <div className="px-4 pb-3">
                        <div className="grid grid-cols-4 gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedCardInfo({ name: '娱乐专用卡', number: '9876 9876 9876 5432', type: 'virtual' })
                              setShowRechargeModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                            }`}
                          >
                            <DollarSign className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-entertainment')
                              setShowFreezeModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30' : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                            }`}
                          >
                            <PauseCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-entertainment')
                              setShowDeleteModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-entertainment')
                              setShowChangePasswordModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 虚拟卡5 - 投资理财卡 */}
                    <div 
                      className={`w-full min-w-[280px] max-w-[400px] border rounded-lg transition-all ${
                        isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className={`relative p-3 rounded-t-lg ${
                        isDark ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                      }`} style={{aspectRatio: '24/9'}}>
                        <div className="text-white h-full flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="text-sm font-bold">BeDAO</div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-purple-500 -mr-0.5"></div>
                              <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                            </div>
                          </div>
                          <div className="text-left mt-3">
                            <div className="flex items-center">
                              <span className="text-sm font-mono tracking-wider font-bold">1122 1122 1122 9999</span>
                              <button 
                                className="ml-2 opacity-90 hover:opacity-100"
                                onClick={() => navigator.clipboard.writeText("1122112211229999")}
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="text-xs opacity-75 mt-2">有效期: 11/30</div>
                          </div>
                          <div className="absolute bottom-3 right-3 flex items-center">
                            <button 
                              className="text-xs opacity-90 hover:opacity-100 mr-2"
                              onClick={() => {
                                setSelectedCardId("card-investment")
                                setShowPinModal(true)
                                setShowPin(false)
                                setTransferPassword("")
                              }}
                            >
                              <Eye className="h-2.5 w-2.5" />
                            </button>
                            <div className="flex items-center">
                              <span className="text-xs mr-1 font-medium">Pin码</span>
                              <div className="bg-white/20 rounded px-2 py-0.5 text-xs font-mono font-bold">***</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center px-4 py-2">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>投资理财卡</span>
                          <div className={`h-2 w-2 ml-2 rounded-full ${isDark ? 'bg-indigo-400' : 'bg-indigo-500'}`}></div>
                        </div>
                        <div className="flex items-center">
                          <div className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>15,642.30 USDT</div>
                        </div>
                      </div>
                      <div className="px-4 pb-3">
                        <div className="grid grid-cols-4 gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedCardInfo({ name: '投资理财卡', number: '1122 1122 1122 9999', type: 'virtual' })
                              setShowRechargeModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                            }`}
                          >
                            <DollarSign className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-investment')
                              setShowFreezeModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                            }`}
                          >
                            <PauseCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-investment')
                              setShowDeleteModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentCardId('card-investment')
                              setShowChangePasswordModal(true)
                            }}
                            className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                              isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                            }`}
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 申请新卡空白卡片 */}
                    <div 
                      className={`w-full min-w-[280px] max-w-[400px] border rounded-lg transition-all cursor-pointer hover:shadow-lg ${
                        isDark ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setSelectedCardInfo({ name: '申请新卡', number: '', type: 'virtual' })
                        setShowNewCardModal(true)
                      }}
                    >
                      {/* 空白卡片区域 */}
                      <div className={`relative p-3 rounded-t-lg ${
                        isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                      }`} style={{aspectRatio: '24/9'}}>
                        <div className="h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                              isDark ? 'bg-gray-600' : 'bg-gray-200'
                            }`}>
                              <Plus className={`h-6 w-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            </div>
                            <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              申请新卡
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 底部信息区域 */}
                      <div className="px-4 py-3">
                        <div className="text-center">
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            点击申请新的虚拟卡片
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedUCardView === "physical" && (
                <div className="grid gap-6" style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                  maxWidth: '100%'
                }}>
                  {/* 实体卡1 - 白金卡 */}
                  <div className="w-full min-w-[350px] max-w-[450px]">
                    <div className={`relative rounded-2xl p-4 sm:p-6 w-full z-10 ${
                      isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    } shadow-lg transition-all hover:shadow-xl`} style={{aspectRatio: '16/9'}}>
                      {/* 顶部logo区域 */}
                      <div className="flex justify-between items-start mb-6">
                        <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>BeDAO</div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 -mr-0.5"></div>
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        </div>
                      </div>

                      {/* 芯片图标 */}
                      <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                        <div className={`w-8 h-6 rounded border-2 ${
                          isDark ? 'border-gray-400 bg-gray-300' : 'border-gray-600 bg-gray-400'
                        } flex items-center justify-center`}>
                          <div className={`w-4 h-3 rounded-sm ${
                            isDark ? 'bg-gray-500' : 'bg-gray-600'
                          }`}></div>
                        </div>
                      </div>

                      {/* 卡号区域 */}
                      <div className={`mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        <div className="flex items-center">
                          <span className="text-sm font-mono tracking-wider font-bold">5234 5234 5234 1234</span>
                          <button 
                            className="ml-2 opacity-70 hover:opacity-100"
                            onClick={() => navigator.clipboard.writeText("5234523452341234")}
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <div className={`text-xs opacity-75 mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>有效期: 12/28</div>
                      </div>

                      {/* 卡片余额 */}
                      <div className="absolute bottom-4 left-6">
                        <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>卡片余额</div>
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>2,345.67 USDT</div>
                      </div>
                    </div>

                    {/* 实体卡1操作按钮 - 小舌头设计 */}
                    <div className="relative -mt-1 mx-auto w-[90%] rounded-b-lg px-4 py-3 z-0 shadow-md">
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("充值按钮被点击")
                            setSelectedCardInfo({ name: '白金卡', number: '**** **** **** 1234', type: 'physical' })
                            setShowRechargeModal(true)
                            console.log("showRechargeModal 设置为 true")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title="充值"
                        >
                          <DollarSign className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentCardId('physical-platinum')
                            setShowFreezeModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                          }`}
                          title="冻结"
                        >
                          <PauseCircle className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentCardId('physical-platinum')
                            setShowDeleteModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                          title="删除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentCardId('physical-platinum')
                            setShowChangePasswordModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title="修改密码"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 实体卡2 - 钻石卡 */}
                  <div className="w-full min-w-[350px] max-w-[450px]">
                    <div className={`relative rounded-2xl p-4 sm:p-6 w-full z-10 ${
                      isDark ? 'bg-gradient-to-br from-purple-800 to-purple-900' : 'bg-gradient-to-br from-purple-500 to-purple-600'
                    } shadow-lg transition-all hover:shadow-xl text-white`} style={{aspectRatio: '16/9'}}>
                      {/* 顶部logo区域 */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="text-sm font-bold">BeDAO</div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-400 -mr-0.5"></div>
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        </div>
                      </div>

                      {/* 芯片图标 */}
                      <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                        <div className="w-8 h-6 rounded border-2 border-yellow-300 bg-yellow-200 flex items-center justify-center">
                          <div className="w-4 h-3 rounded-sm bg-yellow-400"></div>
                        </div>
                      </div>

                      {/* 卡号区域 */}
                      <div className="mb-4">
                        <div className="flex items-center">
                          <span className="text-sm font-mono tracking-wider font-bold">4456 4456 4456 7890</span>
                          <button 
                            className="ml-2 opacity-70 hover:opacity-100"
                            onClick={() => navigator.clipboard.writeText("4456445644567890")}
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-xs opacity-75 mt-2">有效期: 08/29</div>
                      </div>

                      {/* 卡片余额 */}
                      <div className="absolute bottom-4 left-6">
                        <div className="text-xs opacity-75">卡片余额</div>
                        <div className="text-sm font-medium">5,678.90 USDT</div>
                      </div>
                    </div>

                    {/* 实体卡2操作按钮 - 小舌头设计 */}
                    <div className="relative -mt-1 mx-auto w-[90%] rounded-b-lg px-4 py-3 z-0 shadow-md">
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCardInfo({ name: '钻石卡', number: '**** **** **** 5678', type: 'physical' })
                            setShowRechargeModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title="充值"
                        >
                          <DollarSign className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("冻结 for 钻石卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                          }`}
                          title="冻结"
                        >
                          <PauseCircle className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("删除 for 钻石卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                          title="删除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCardInfo({ name: '钻石卡', number: '**** **** **** 5678', type: 'physical' })
                            setShowProfileModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                          title="个人信息"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 实体卡3 - 黑金卡 */}
                  <div className="w-full min-w-[350px] max-w-[450px]">
                    <div className={`relative rounded-2xl p-4 sm:p-6 w-full z-10 ${
                      isDark ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-gray-800 to-gray-900'
                    } shadow-lg transition-all hover:shadow-xl text-white`} style={{aspectRatio: '16/9'}}>
                      {/* 顶部logo区域 */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="text-sm font-bold">BeDAO</div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-gold -mr-0.5" style={{backgroundColor: '#FFD700'}}></div>
                          <div className="w-3 h-3 rounded-full bg-silver" style={{backgroundColor: '#C0C0C0'}}></div>
                        </div>
                      </div>

                      {/* 芯片图标 */}
                      <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                        <div className="w-8 h-6 rounded border-2 border-gray-400 bg-gray-300 flex items-center justify-center">
                          <div className="w-4 h-3 rounded-sm bg-gray-500"></div>
                        </div>
                      </div>

                      {/* 卡号区域 */}
                      <div className="mb-4">
                        <div className="flex items-center">
                          <span className="text-sm font-mono tracking-wider font-bold">6789 6789 6789 0123</span>
                          <button 
                            className="ml-2 opacity-70 hover:opacity-100"
                            onClick={() => navigator.clipboard.writeText("6789678967890123")}
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-xs opacity-75 mt-2">有效期: 05/30</div>
                      </div>

                      {/* 卡片余额 */}
                      <div className="absolute bottom-4 left-6">
                        <div className="text-xs opacity-75">卡片余额</div>
                        <div className="text-sm font-medium">12,345.12 USDT</div>
                      </div>
                    </div>

                    {/* 实体卡3操作按钮 - 小舌头设计 */}
                    <div className="relative -mt-1 mx-auto w-[90%] rounded-b-lg px-4 py-3 z-0 shadow-md">
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCardInfo({ name: '黑金卡', number: '**** **** **** 6789', type: 'physical' })
                            setShowRechargeModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title="充值"
                        >
                          <DollarSign className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("冻结 for 黑金卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                          }`}
                          title="冻结"
                        >
                          <PauseCircle className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("删除 for 黑金卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                          title="删除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCardInfo({ name: '黑金卡', number: '**** **** **** 6789', type: 'physical' })
                            setShowProfileModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                          title="个人信息"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 实体卡4 - 商务卡 */}
                  <div className="w-full min-w-[350px] max-w-[450px]">
                    <div className={`relative rounded-2xl p-4 sm:p-6 w-full z-10 ${
                      isDark ? 'bg-gradient-to-br from-green-800 to-green-900' : 'bg-gradient-to-br from-green-600 to-green-700'
                    } shadow-lg transition-all hover:shadow-xl text-white`} style={{aspectRatio: '16/9'}}>
                      {/* 顶部logo区域 */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="text-sm font-bold">BeDAO</div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-400 -mr-0.5"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                      </div>

                      {/* 芯片图标 */}
                      <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                        <div className="w-8 h-6 rounded border-2 border-green-300 bg-green-200 flex items-center justify-center">
                          <div className="w-4 h-3 rounded-sm bg-green-400"></div>
                        </div>
                      </div>

                      {/* 卡号区域 */}
                      <div className="mb-4">
                        <div className="flex items-center">
                          <span className="text-sm font-mono tracking-wider font-bold">7890 7890 7890 4567</span>
                          <button 
                            className="ml-2 opacity-70 hover:opacity-100"
                            onClick={() => navigator.clipboard.writeText("7890789078904567")}
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-xs opacity-75 mt-2">有效期: 03/31</div>
                      </div>

                      {/* 卡片余额 */}
                      <div className="absolute bottom-4 left-6">
                        <div className="text-xs opacity-75">卡片余额</div>
                        <div className="text-sm font-medium">8,901.23 USDT</div>
                      </div>
                    </div>

                    {/* 实体卡4操作按钮 - 小舌头设计 */}
                    <div className="relative -mt-1 mx-auto w-[90%] rounded-b-lg px-4 py-3 z-0 shadow-md">
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCardInfo({ name: '商务卡', number: '**** **** **** 7890', type: 'physical' })
                            setShowRechargeModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title="充值"
                        >
                          <DollarSign className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("冻结 for 商务卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                          }`}
                          title="冻结"
                        >
                          <PauseCircle className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("删除 for 商务卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                          title="删除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCardInfo({ name: '商务卡', number: '**** **** **** 7890', type: 'physical' })
                            setShowProfileModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                          title="个人信息"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 实体卡5 - 学生卡 */}
                  <div className="w-full min-w-[350px] max-w-[450px]">
                    <div className={`relative rounded-2xl p-4 sm:p-6 w-full z-10 ${
                      isDark ? 'bg-gradient-to-br from-blue-800 to-blue-900' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                    } shadow-lg transition-all hover:shadow-xl text-white`} style={{aspectRatio: '16/9'}}>
                      {/* 顶部logo区域 */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="text-sm font-bold">BeDAO</div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-cyan-400 -mr-0.5"></div>
                          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        </div>
                      </div>

                      {/* 芯片图标 */}
                      <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                        <div className="w-8 h-6 rounded border-2 border-blue-300 bg-blue-200 flex items-center justify-center">
                          <div className="w-4 h-3 rounded-sm bg-blue-400"></div>
                        </div>
                      </div>

                      {/* 卡号区域 */}
                      <div className="mb-4">
                        <div className="flex items-center">
                          <span className="text-sm font-mono tracking-wider font-bold">1234 1234 1234 5678</span>
                          <button 
                            className="ml-2 opacity-70 hover:opacity-100"
                            onClick={() => navigator.clipboard.writeText("1234123412345678")}
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-xs opacity-75 mt-2">有效期: 01/32</div>
                      </div>

                      {/* 卡片余额 */}
                      <div className="absolute bottom-4 left-6">
                        <div className="text-xs opacity-75">卡片余额</div>
                        <div className="text-sm font-medium">1,567.45 USDT</div>
                      </div>
                    </div>

                    {/* 实体卡5操作按钮 - 小舌头设计 */}
                    <div className="relative -mt-1 mx-auto w-[90%] rounded-b-lg px-4 py-3 z-0 shadow-md">
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCardInfo({ name: '学生卡', number: '**** **** **** 1234', type: 'physical' })
                            setShowRechargeModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title="充值"
                        >
                          <DollarSign className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("冻结 for 学生卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                          }`}
                          title="冻结"
                        >
                          <PauseCircle className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("删除 for 学生卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                          title="删除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCardInfo({ name: '学生卡', number: '**** **** **** 1234', type: 'physical' })
                            setShowProfileModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                          title="个人信息"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 实体卡6 - 高级卡 */}
                  <div className="w-full min-w-[350px] max-w-[450px]">
                    <div className={`relative rounded-2xl p-4 sm:p-6 w-full z-10 ${
                      isDark ? 'bg-gradient-to-br from-red-800 to-red-900' : 'bg-gradient-to-br from-red-500 to-red-600'
                    } shadow-lg transition-all hover:shadow-xl text-white`} style={{aspectRatio: '16/9'}}>
                      {/* 顶部logo区域 */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="text-sm font-bold">BeDAO</div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-pink-400 -mr-0.5"></div>
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        </div>
                      </div>

                      {/* 芯片图标 */}
                      <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                        <div className="w-8 h-6 rounded border-2 border-red-300 bg-red-200 flex items-center justify-center">
                          <div className="w-4 h-3 rounded-sm bg-red-400"></div>
                        </div>
                      </div>

                      {/* 卡号区域 */}
                      <div className="mb-4">
                        <div className="flex items-center">
                          <span className="text-sm font-mono tracking-wider font-bold">9876 9876 9876 5432</span>
                          <button 
                            className="ml-2 opacity-70 hover:opacity-100"
                            onClick={() => navigator.clipboard.writeText("9876987698765432")}
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-xs opacity-75 mt-2">有效期: 11/33</div>
                      </div>

                      {/* 卡片余额 */}
                      <div className="absolute bottom-4 left-6">
                        <div className="text-xs opacity-75">卡片余额</div>
                        <div className="text-sm font-medium">6,789.01 USDT</div>
                      </div>
                    </div>

                    {/* 实体卡6操作按钮 - 小舌头设计 */}
                    <div className="relative -mt-1 mx-auto w-[90%] rounded-b-lg px-4 py-3 z-0 shadow-md">
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCardInfo({ name: '高级卡', number: '**** **** **** 9876', type: 'physical' })
                            setShowRechargeModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title="充值"
                        >
                          <DollarSign className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("冻结 for 高级卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                          }`}
                          title="冻结"
                        >
                          <PauseCircle className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("删除 for 高级卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                          title="删除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCardInfo({ name: '高级卡', number: '**** **** **** 9876', type: 'physical' })
                            setShowProfileModal(true)
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                          title="个人信息"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 冻结状态实体卡 */}
                  <div className="w-full min-w-[350px] max-w-[450px]">
                    <div className={`relative rounded-2xl p-4 sm:p-6 w-full z-10 ${
                      isDark ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                    } shadow-lg text-white transition-all hover:shadow-xl`} style={{aspectRatio: '16/9'}}>
                      {/* 冻结覆盖层 */}
                      <div className="absolute inset-0 bg-gray-900/60 rounded-2xl z-10 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <PauseCircle className="h-8 w-8 text-blue-300 mb-2" />
                          <span className="text-sm font-bold text-white">已冻结</span>
                        </div>
                      </div>

                      {/* 卡片内容 - 保持与普通卡片相同的布局 */}
                      <div className="relative z-0">
                        {/* 顶部logo区域 */}
                        <div className="flex justify-between items-start mb-6">
                          <div className="text-sm font-bold">BeDAO</div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gray-400 -mr-0.5"></div>
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          </div>
                        </div>

                        {/* 芯片图标 */}
                        <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
                          <div className="w-8 h-6 rounded border-2 border-gray-500 bg-gray-400 flex items-center justify-center">
                            <div className="w-4 h-3 rounded-sm bg-gray-600"></div>
                          </div>
                        </div>

                        {/* 卡号区域 */}
                        <div className="mb-4">
                          <div className="flex items-center">
                            <span className="text-sm font-mono tracking-wider font-bold">5555 5555 5555 5555</span>
                            <button 
                              className="ml-2 opacity-70 hover:opacity-100"
                              onClick={() => navigator.clipboard.writeText("5555555555555555")}
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="text-xs opacity-75 mt-2">有效期: 06/30</div>
                        </div>

                        {/* 卡片余额 */}
                        <div className="absolute bottom-4 left-6">
                          <div className="text-xs opacity-75">卡片余额</div>
                          <div className="text-sm font-medium">0.00 USDT</div>
                        </div>

                        {/* 冻结标识 - 替换右下角的支付标识 */}
                        <div className="absolute bottom-4 right-6">
                          <div className="flex items-center bg-blue-500/30 rounded-full px-2 py-1">
                            <PauseCircle className="h-3 w-3 text-blue-200 mr-1" />
                            <span className="text-xs font-medium text-blue-100">FROZEN</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 冻结实体卡操作按钮 - 小舌头设计 */}
                    <div className="relative -mt-1 mx-auto w-[90%] rounded-b-lg px-4 py-3 z-0 shadow-md">
                      <div className="grid grid-cols-4 gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("充值 for 冻结卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title="充值"
                        >
                          <DollarSign className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("解冻 for 冻结卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                          title="解冻"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("删除 for 冻结卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                          title="删除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log("设置 for 冻结卡")
                          }}
                          className={`flex items-center justify-center p-2 rounded-lg transition-all hover:scale-105 ${
                            isDark ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                          title="设置"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 申请新卡空白卡片 - 实体卡 */}
                  <div className="w-full min-w-[350px] max-w-[450px]">
                    <div 
                      className={`relative rounded-2xl p-4 sm:p-6 w-full z-10 cursor-pointer transition-all hover:shadow-xl ${
                        isDark ? 'bg-gray-800/50 border-2 border-gray-700 hover:border-gray-600' : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                      }`} 
                      style={{aspectRatio: '16/9'}}
                      onClick={() => {
                        setSelectedCardInfo({ name: '申请新卡', number: '', type: 'physical' })
                        setShowNewCardModal(true)
                      }}
                    >
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                            isDark ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <Plus className={`h-8 w-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          </div>
                          <div className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            申请新卡
                          </div>
                          <div className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            点击申请新的实体卡片
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      case "佣金账户":
        return (
          <div className="space-y-6">
            {/* 顶部统计卡片 */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { title: "本月合约佣金", amount: "1,234.56", currency: "USDT", icon: BarChart3, color: "blue" },
                { title: "本月理财佣金", amount: "567.89", currency: "USDT", icon: PiggyBank, color: "green" },
                { title: "本月U卡佣金", amount: "345.67", currency: "USDT", icon: CreditCard, color: "purple" },
                { title: "本月担保佣金", amount: "123.45", currency: "USDT", icon: Shield, color: "orange" },
                { title: "本月支付佣金", amount: "789.12", currency: "USDT", icon: Receipt, color: "pink" }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className={`${cardStyle} rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${
                        stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                        stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                        'bg-pink-100 dark:bg-pink-900/30'
                      }`}>
                        <Icon className={`h-4 w-4 ${
                          stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                          stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                          stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                          stat.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                          'text-pink-600 dark:text-pink-400'
                        }`} />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">{stat.title}</div>
                    <div className="text-lg font-bold">{balanceVisible ? stat.amount : "****"}</div>
                    <div className="text-xs text-gray-500">{stat.currency}</div>
                  </div>
                )
              })}
            </div>

            {/* 佣金分类标签 */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "合约佣金", label: "合约佣金", icon: BarChart3 },
                { id: "理财佣金", label: "理财佣金", icon: PiggyBank },
                { id: "U卡佣金", label: "U卡佣金", icon: CreditCard },
                { id: "担保佣金", label: "担保佣金", icon: Shield },
                { id: "支付佣金", label: "支付佣金", icon: Receipt }
              ].map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setCommissionCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      commissionCategory === category.id
                        ? 'bg-[#00D4AA] text-white'
                        : isDark
                          ? 'bg-[#252842] text-gray-300 hover:bg-[#2d3748]'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.label}
                  </button>
                )
              })}
            </div>

            {/* 佣金详情卡片 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "未领取金额", amount: "456.78", currency: "USDT", status: "pending" },
                { title: "已领取金额", amount: "1,234.56", currency: "USDT", status: "claimed" },
                { title: "今日佣金", amount: "23.45", currency: "USDT", status: "today" },
                { title: "本月佣金", amount: "1,691.34", currency: "USDT", status: "month" }
              ].map((item, index) => (
                <div key={index} className={`${cardStyle} rounded-lg p-4`}>
                  <div className="text-xs text-gray-500 mb-2">{item.title}</div>
                  <div className="text-xl font-bold mb-1">{balanceVisible ? item.amount : "****"}</div>
                  <div className="text-xs text-gray-500 mb-3">{item.currency}</div>
                  {item.status === "pending" && (
                    <button className="w-full bg-[#00D4AA] text-white text-sm py-2 rounded-lg hover:bg-[#00D4AA]/90 transition-colors">
                      领取佣金
                    </button>
                  )}
                  {item.status === "today" && (
                    <div className="text-xs text-green-500">
                      +12.3% 较昨日
                    </div>
                  )}
                  {item.status === "month" && (
                    <div className="text-xs text-blue-500">
                      +8.5% 较上月
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 佣金规则和记录标签 */}
            <div className="flex space-x-4 border-b dark:border-gray-700">
              {[
                { id: "佣金规则", label: "佣金规则" },
                { id: "查看记录", label: "查看记录" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCommissionSubTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    commissionSubTab === tab.id
                      ? 'border-[#00D4AA] text-[#00D4AA]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 内容区域 */}
            {commissionSubTab === "佣金规则" ? (
              <div className={`${cardStyle} rounded-lg p-6`}>
                <h3 className="text-lg font-semibold mb-4">{commissionCategory}规则</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">基础佣金率</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">一级推荐用户</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">二级推荐用户</span>
                          <span className="font-medium">10%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">三级推荐用户</span>
                          <span className="font-medium">5%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">等级加成</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">VIP1</span>
                          <span className="font-medium">+5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">VIP2</span>
                          <span className="font-medium">+10%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">VIP3</span>
                          <span className="font-medium">+15%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t dark:border-gray-700 pt-4">
                    <h4 className="font-medium mb-2">结算规则</h4>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• 佣金每日自动结算，次日可领取</li>
                      <li>• 佣金有效期为90天，逾期自动失效</li>
                      <li>• 最低领取金额为1 USDT</li>
                      <li>• 佣金将自动发放到您的现货账户</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${cardStyle} rounded-lg p-6`}>
                <h3 className="text-lg font-semibold mb-4">{commissionCategory}记录</h3>
                <div className="space-y-3">
                  {[
                    { date: "2024-01-15", user: "用户A***123", amount: "+15.67", status: "已发放", source: "现货交易" },
                    { date: "2024-01-14", user: "用户B***456", amount: "+8.32", status: "已发放", source: "合约交易" },
                    { date: "2024-01-13", user: "用户C***789", amount: "+23.45", status: "已发放", source: "理财投资" },
                    { date: "2024-01-12", user: "用户D***012", amount: "+12.89", status: "待发放", source: "U卡消费" },
                    { date: "2024-01-11", user: "用户E***345", amount: "+6.78", status: "已发放", source: "担保交易" }
                  ].map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium">{record.user}</div>
                        <div className="text-sm text-gray-500">{record.date} • {record.source}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-500">{record.amount} USDT</div>
                        <div className={`text-xs ${
                          record.status === "已发放" ? "text-green-500" : "text-yellow-500"
                        }`}>
                          {record.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      
      default:
        return (
          <div className={`${cardStyle} rounded-lg overflow-hidden`}>
            <div className="p-6">
              <div className="text-center text-gray-500">
                <p>暂无数据</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen flex relative">
      {/* 左侧导航栏 */}
      <div className={`
        fixed left-0 top-0 h-full z-30 transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block
        w-48
      `}>
        <div className={`h-full ${cardStyle}`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              钱包
            </h2>
          </div>
          <nav className="p-4 space-y-2">
            {walletTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center ${
                    activeTab === tab.id
                      ? isDark 
                        ? "bg-white text-black" 
                        : "bg-black text-white"
                      : isDark
                        ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                        : "hover:bg-gray-100 text-gray-600 hover:text-black"
                  }`}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* 右侧内容区 */}
      <div className="flex-1 md:ml-0">
        <div className="p-6">
          {/* 移动端侧边栏toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              {isMobileSidebarOpen ? <X className="h-6 w-6" /> : <Wallet className="h-6 w-6" />}
            </button>
          </div>

          {renderTabContent()}
        </div>
      </div>

      {/* 移动端背景遮罩 */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* 密码修改弹窗 */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardStyle} p-6 rounded-lg w-full max-w-md mx-4`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">修改登录密码</h3>
              <button onClick={() => setIsPasswordModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">当前密码</label>
                <input
                  type="password"
                  className={`w-full p-3 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-black'
                  }`}
                  placeholder="请输入当前密码"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">新密码</label>
                <input
                  type="password"
                  className={`w-full p-3 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-black'
                  }`}
                  placeholder="请输入新密码"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">确认新密码</label>
                <input
                  type="password"
                  className={`w-full p-3 border rounded-lg ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-black'
                  }`}
                  placeholder="请再次输入新密码"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 ${
                    isDark
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  取消
                </button>
                <button
                  className="flex-1 py-3 px-4 rounded-lg bg-[#00D4AA] text-white hover:bg-[#00C199] transition-all duration-200"
                >
                  确认修改
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
      
      case 'commission':
        return (
