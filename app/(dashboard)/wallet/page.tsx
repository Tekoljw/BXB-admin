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
  HandCoins,
  Coins,
  CurrencyDollar,
  Clock,
  CheckCircle,
  Calendar,
  User,
  Briefcase,
  Rocket,
  MessageCircle,
  Users,
  UserPlus,
  Activity,
  ExternalLink,
  Receipt,
  Target,
  HelpCircle,
  Zap,
  Unlock,
  MapPin,
  Crown,
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
  Play,
  Menu
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
  const [secondaryTab, setSecondaryTab] = useState<string>("") // 二级页签状态 // 订单记录子页签
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
  const [showMobileSidebar, setShowMobileSidebar] = useState(false) // 移动端侧边栏状态
  const [mobileSidebarAnimating, setMobileSidebarAnimating] = useState(false) // 移动端侧边栏动画状态
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
  const [commissionTab, setCommissionTab] = useState("邀请好友") // 佣金页签状态
  // 佣金结算记录筛选状态
  const [commissionSearchTerm, setCommissionSearchTerm] = useState("") // 搜索关键词
  const [commissionTypeFilter, setCommissionTypeFilter] = useState("全部") // 佣金类型筛选
  const [commissionReferralFilter, setCommissionReferralFilter] = useState("全部") // 推荐类型筛选
  const [commissionStatusFilter, setCommissionStatusFilter] = useState("全部") // 状态筛选
  const [commissionTimeFilter, setCommissionTimeFilter] = useState("全部") // 时间筛选
  const [uCardSubTab, setUCardSubTab] = useState("开卡佣金") // U卡佣金子页签: "开卡佣金" | "充值佣金"
  const [showCommissionRuleModal, setShowCommissionRuleModal] = useState(false) // 佣金规则弹窗
  const [showUserListModal, setShowUserListModal] = useState<{type: 'direct' | 'indirect' | 'active', isOpen: boolean}>({type: 'direct', isOpen: false}) // 用户名单弹窗
  const [showSettlementModal, setShowSettlementModal] = useState(false) // 结算弹窗
  const [userSearchTerm, setUserSearchTerm] = useState("") // 用户搜索关键词
  const [userDateFilter, setUserDateFilter] = useState("") // 注册时间筛选
  const [userCountryFilter, setUserCountryFilter] = useState("") // 注册国家筛选
  const [userCityFilter, setUserCityFilter] = useState("") // 注册城市筛选
  
  // API文档和生成密钥弹窗状态
  const [showApiDocsModal, setShowApiDocsModal] = useState(false) // API文档选择弹窗
  const [showGenerateKeyModal, setShowGenerateKeyModal] = useState(false) // 生成密钥弹窗
  const [generatedApiKey, setGeneratedApiKey] = useState("") // 生成的临时密钥
  
  // 确保当前币种页签在选中的币种列表中
  useEffect(() => {
    if (!selectedCurrencies.includes(currencyTab) && selectedCurrencies.length > 0) {
      setCurrencyTab(selectedCurrencies[0])
    }
  }, [selectedCurrencies, currencyTab])

  // 当订单类型切换时自动设置默认的二级页签
  useEffect(() => {
    const categoryKey = getCategoryKey(orderTab)
    const category = orderCategories[categoryKey]
    
    if (category && Object.keys(category.tabs).length > 0) {
      const firstTabKey = Object.keys(category.tabs)[0]
      if (secondaryTab === "" || !Object.keys(category.tabs).includes(secondaryTab)) {
        setSecondaryTab(firstTabKey)
      }
    }
  }, [orderTab, secondaryTab])
  

  
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

  // 移动端侧边栏动画函数
  const openMobileSidebar = () => {
    setShowMobileSidebar(true)
    setTimeout(() => setMobileSidebarAnimating(true), 10)
  }

  const closeMobileSidebar = () => {
    setMobileSidebarAnimating(false)
    setTimeout(() => setShowMobileSidebar(false), 300)
  }

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
    { id: "担保记录", label: "担保记录", icon: HandCoins },
    { id: "支付订单", label: "支付订单", icon: Receipt }
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
        commission: '佣金结算记录',
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
        account: '理财资金记录'
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

  // 筛选佣金结算记录
  const filterCommissionRecords = (records: any[]) => {
    return records.filter(record => {
      // 搜索筛选 - 用户ID或用户名
      const searchMatch = commissionSearchTerm === "" || 
        record.userId.toLowerCase().includes(commissionSearchTerm.toLowerCase()) ||
        record.userName.toLowerCase().includes(commissionSearchTerm.toLowerCase())

      // 佣金类型筛选
      const typeMatch = commissionTypeFilter === "全部" || record.type === commissionTypeFilter

      // 推荐类型筛选
      const referralMatch = commissionReferralFilter === "全部" || record.referralType === commissionReferralFilter

      // 状态筛选
      const statusMatch = commissionStatusFilter === "全部" || record.status === commissionStatusFilter

      // 时间筛选
      let timeMatch = true
      if (commissionTimeFilter !== "全部") {
        const recordDate = new Date(record.time)
        const now = new Date()
        
        switch (commissionTimeFilter) {
          case "今日":
            timeMatch = recordDate.toDateString() === now.toDateString()
            break
          case "本周":
            const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
            timeMatch = recordDate >= weekStart
            break
          case "本月":
            timeMatch = recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear()
            break
          case "近三个月":
            const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3))
            timeMatch = recordDate >= threeMonthsAgo
            break
        }
      }

      return searchMatch && typeMatch && referralMatch && statusMatch && timeMatch
    })
  }



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
      ],
      "佣金结算记录": [
        {
          id: "CM001",
          type: "合约佣金",
          referralType: "直推",
          userId: "user123456",
          userName: "张三",
          tradingPair: "BTCUSDT",
          commissionAmount: "125.50",
          commissionRate: "0.02%",
          feeAmount: "6,275.00",
          currency: "USDT",
          creditAmount: "123.24",
          creditCurrency: "USDT",
          status: "已结算",
          time: "2024-01-20 14:30:22",
          settledTime: "2024-01-20 14:35:45",
          remark: "合约交易返佣"
        },
        {
          id: "CM002",
          type: "合约佣金",
          referralType: "间推",
          userId: "user789012",
          userName: "李四",
          tradingPair: "ETHUSDT",
          commissionAmount: "89.20",
          commissionRate: "0.015%",
          feeAmount: "5,946.67",
          currency: "USDT",
          creditAmount: "87.63",
          creditCurrency: "USDT",
          status: "已结算",
          time: "2024-01-19 16:45:11",
          settledTime: "2024-01-19 16:50:33",
          remark: "推荐用户合约交易"
        },
        {
          id: "WM001",
          type: "理财佣金",
          referralType: "直推",
          userId: "user345678",
          userName: "王五",
          productName: "USDT活期理财",
          commissionAmount: "56.80",
          commissionRate: "0.5%",
          feeAmount: "11,360.00",
          currency: "USDT",
          creditAmount: "55.82",
          creditCurrency: "USDT",
          status: "已结算",
          time: "2024-01-20 16:20:15",
          settledTime: "2024-01-20 16:25:40",
          remark: "理财产品佣金"
        },
        {
          id: "WM002",
          type: "理财佣金",
          referralType: "间推",
          userId: "user567890",
          userName: "赵六",
          productName: "BTC定期理财",
          commissionAmount: "34.90",
          commissionRate: "0.3%",
          feeAmount: "11,633.33",
          currency: "USDT",
          creditAmount: "34.27",
          creditCurrency: "USDT",
          status: "已结算",
          time: "2024-01-19 14:10:30",
          settledTime: "2024-01-19 14:15:55",
          remark: "推荐用户理财"
        },
        {
          id: "UC001",
          type: "U卡佣金",
          referralType: "直推",
          userId: "user234567",
          userName: "孙七",
          cardType: "虚拟卡",
          commissionAmount: "25.00",
          commissionRate: "2.5%",
          feeAmount: "1,000.00",
          currency: "USDT",
          creditAmount: "24.58",
          creditCurrency: "USDT",
          status: "已结算",
          time: "2024-01-20 11:45:30",
          settledTime: "2024-01-20 11:50:15",
          remark: "推荐用户开卡"
        },
        {
          id: "UC002",
          type: "U卡佣金",
          referralType: "直推",
          userId: "user456789",
          userName: "周八",
          cardType: "充值",
          commissionAmount: "15.60",
          commissionRate: "0.8%",
          feeAmount: "1,950.00",
          currency: "USDT",
          creditAmount: "15.32",
          creditCurrency: "USDT",
          status: "已结算",
          time: "2024-01-19 16:20:18",
          settledTime: "2024-01-19 16:25:42",
          remark: "用户卡片充值佣金"
        },
        {
          id: "GT001",
          type: "担保佣金",
          referralType: "直推",
          userId: "user678901",
          userName: "吴九",
          tradingPair: "BTCUSDT",
          commissionAmount: "45.30",
          commissionRate: "0.3%",
          feeAmount: "15,100.00",
          currency: "USDT",
          creditAmount: "44.52",
          creditCurrency: "USDT",
          status: "已结算",
          time: "2024-01-20 13:15:25",
          settledTime: "2024-01-20 13:20:50",
          remark: "担保交易佣金"
        },
        {
          id: "GT002",
          type: "担保佣金",
          referralType: "间推",
          userId: "user890123",
          userName: "郑十",
          tradingPair: "ETHUSDT",
          commissionAmount: "78.90",
          commissionRate: "0.25%",
          feeAmount: "31,560.00",
          currency: "USDT",
          creditAmount: "77.56",
          creditCurrency: "USDT",
          status: "已结算",
          time: "2024-01-19 09:40:55",
          settledTime: "2024-01-19 09:45:20",
          remark: "信用担保服务佣金"
        },
        {
          id: "PM001",
          type: "支付佣金",
          referralType: "直推",
          userId: "user012345",
          userName: "钱一",
          channel: "支付宝",
          commissionAmount: "120.00",
          commissionRate: "0.15%",
          feeAmount: "80,000.00",
          currency: "CNY",
          creditAmount: "117.80",
          creditCurrency: "CNY",
          status: "已结算",
          time: "2024-01-20 15:25:40",
          settledTime: "2024-01-20 15:30:15",
          remark: "支付通道佣金"
        },
        {
          id: "PM002",
          type: "支付佣金",
          referralType: "间推",
          userId: "user123450",
          userName: "孔二",
          channel: "微信支付",
          commissionAmount: "85.50",
          commissionRate: "0.12%",
          feeAmount: "71,250.00",
          currency: "CNY",
          creditAmount: "83.92",
          creditCurrency: "CNY",
          status: "已结算",
          time: "2024-01-19 12:10:33",
          settledTime: "2024-01-19 12:15:18",
          remark: "推荐商户佣金"
        },
        {
          id: "CM003",
          type: "合约佣金",
          referralType: "直推",
          userId: "user345612",
          userName: "冯三",
          tradingPair: "BNBUSDT",
          commissionAmount: "67.80",
          commissionRate: "0.018%",
          feeAmount: "3,766.67",
          currency: "USDT",
          creditAmount: "66.66",
          creditCurrency: "USDT",
          status: "待结算",
          time: "2024-01-21 09:30:15",
          settledTime: "",
          remark: "合约交易返佣"
        },
        {
          id: "WM003",
          type: "理财佣金",
          referralType: "间推",
          userId: "user567834",
          userName: "陈四",
          productName: "ETH灵活理财",
          commissionAmount: "43.20",
          commissionRate: "0.4%",
          feeAmount: "10,800.00",
          currency: "USDT",
          creditAmount: "42.48",
          creditCurrency: "USDT",
          status: "待结算",
          time: "2024-01-21 11:15:22",
          settledTime: "",
          remark: "推荐用户理财收益"
        },
        {
          id: "UC003",
          type: "U卡佣金",
          referralType: "直推",
          userId: "user789456",
          userName: "卫五",
          cardType: "实体卡",
          commissionAmount: "30.00",
          commissionRate: "3.0%",
          feeAmount: "1,000.00",
          currency: "USD",
          creditAmount: "29.45",
          creditCurrency: "USD",
          status: "处理中",
          time: "2024-01-21 14:20:30",
          settledTime: "",
          remark: "实体卡开卡佣金"
        },
        {
          id: "GT003",
          type: "担保佣金",
          referralType: "直推",
          userId: "user901567",
          userName: "蒋六",
          tradingPair: "SOLUSDT",
          commissionAmount: "38.90",
          commissionRate: "0.28%",
          feeAmount: "13,892.86",
          currency: "USDT",
          creditAmount: "38.23",
          creditCurrency: "USDT",
          status: "失败",
          time: "2024-01-21 16:45:18",
          settledTime: "",
          remark: "担保交易异常，待重新结算"
        },
        {
          id: "PM003",
          type: "支付佣金",
          referralType: "间推",
          userId: "user112233",
          userName: "沈七",
          channel: "银行卡",
          commissionAmount: "156.80",
          commissionRate: "0.18%",
          feeAmount: "87,111.11",
          currency: "CNY",
          creditAmount: "154.17",
          creditCurrency: "CNY",
          status: "结算中",
          time: "2024-01-21 18:20:30",
          settledTime: "",
          remark: "银行卡支付通道佣金"
        },
        {
          id: "CM006",
          type: "合约佣金",
          referralType: "间推",
          userId: "user334455",
          userName: "韩八",
          tradingPair: "ADAUSDT",
          commissionAmount: "38.90",
          commissionRate: "0.012%",
          feeAmount: "3,241.67",
          currency: "USDT",
          creditAmount: "38.22",
          creditCurrency: "USDT",
          status: "已完成",
          time: "2024-01-18 10:25:40",
          settledTime: "2024-01-18 10:30:55",
          remark: "ADA合约返佣"
        },
        {
          id: "WM006", 
          type: "理财佣金",
          referralType: "直推",
          userId: "user556677",
          userName: "杨九",
          productName: "BNB锁仓理财",
          commissionAmount: "71.50",
          commissionRate: "0.6%",
          feeAmount: "11,916.67",
          currency: "USDT",
          creditAmount: "70.28",
          creditCurrency: "USDT",
          status: "已完成",
          time: "2024-01-18 15:10:20",
          settledTime: "2024-01-18 15:15:45",
          remark: "BNB理财产品佣金"
        },
        {
          id: "UC005",
          type: "U卡佣金",
          referralType: "间推", 
          userId: "user778899",
          userName: "朱十",
          cardType: "充值",
          commissionAmount: "22.40",
          commissionRate: "0.9%",
          feeAmount: "2,488.89",
          currency: "EUR",
          creditAmount: "21.96",
          creditCurrency: "EUR",
          status: "已完成",
          time: "2024-01-17 09:45:15",
          settledTime: "2024-01-17 09:50:30",
          remark: "欧元卡充值佣金"
        },
        {
          id: "GT005",
          type: "担保佣金",
          referralType: "间推",
          userId: "user990011",
          userName: "秦十一",
          tradingPair: "DOTUSDT",
          commissionAmount: "64.20",
          commissionRate: "0.28%",
          feeAmount: "22,928.57",
          currency: "USDT",
          creditAmount: "63.06",
          creditCurrency: "USDT",
          status: "已完成",
          time: "2024-01-17 13:20:50",
          settledTime: "2024-01-17 13:25:15",
          remark: "DOT担保服务佣金"
        },
        {
          id: "PM005",
          type: "支付佣金",
          referralType: "直推",
          userId: "user112244",
          userName: "尤十二",
          channel: "数字钱包",
          commissionAmount: "198.60",
          commissionRate: "0.22%",
          feeAmount: "90,272.73",
          currency: "USD",
          creditAmount: "195.24",
          creditCurrency: "USD",
          status: "已完成",
          time: "2024-01-16 11:35:25",
          settledTime: "2024-01-16 11:40:50",
          remark: "数字钱包支付佣金"
        },
        {
          id: "CM007",
          type: "合约佣金",
          referralType: "直推",
          userId: "user335566",
          userName: "许十三",
          tradingPair: "LINKUSDT",
          commissionAmount: "105.30",
          commissionRate: "0.025%",
          feeAmount: "4,212.00",
          currency: "USDT",
          creditAmount: "103.61",
          creditCurrency: "USDT",
          status: "已完成",
          time: "2024-01-15 16:45:30",
          settledTime: "2024-01-15 16:50:15",
          remark: "LINK合约交易返佣"
        },
        {
          id: "WM007",
          type: "理财佣金",
          referralType: "间推",
          userId: "user557788",
          userName: "卫十四",
          productName: "稳定币套利",
          commissionAmount: "89.70",
          commissionRate: "0.7%",
          feeAmount: "12,814.29",
          currency: "USDT",
          creditAmount: "88.19",
          creditCurrency: "USDT",
          status: "已完成",
          time: "2024-01-14 08:20:40",
          settledTime: "2024-01-14 08:25:55",
          remark: "套利产品推荐佣金"
        },
        {
          id: "UC006",
          type: "U卡佣金",
          referralType: "直推",
          userId: "user779900",
          userName: "应十五",
          cardType: "虚拟卡",
          commissionAmount: "18.75",
          commissionRate: "2.5%",
          feeAmount: "750.00",
          currency: "USDT",
          creditAmount: "18.39",
          creditCurrency: "USDT",
          status: "已完成",
          time: "2024-01-13 12:30:45",
          settledTime: "2024-01-13 12:35:20",
          remark: "虚拟卡开卡佣金"
        },
        {
          id: "GT006",
          type: "担保佣金",
          referralType: "直推",
          userId: "user991122",
          userName: "冯十六",
          tradingPair: "AVAXUSDT",
          commissionAmount: "76.40",
          commissionRate: "0.32%",
          feeAmount: "23,875.00",
          currency: "USDT",
          creditAmount: "75.06",
          creditCurrency: "USDT",
          status: "已完成",
          time: "2024-01-12 14:15:30",
          settledTime: "2024-01-12 14:20:45",
          remark: "AVAX担保交易佣金"
        },
        {
          id: "PM006",
          type: "支付佣金",
          referralType: "间推",
          userId: "user113355",
          userName: "陈十七",
          channel: "PayPal",
          commissionAmount: "234.90",
          commissionRate: "0.26%",
          feeAmount: "90,346.15",
          currency: "USD",
          creditAmount: "230.62",
          creditCurrency: "USD",
          status: "已完成",
          time: "2024-01-11 16:20:15",
          settledTime: "2024-01-11 16:25:40",
          remark: "PayPal支付通道佣金"
        },
        {
          id: "CM008",
          type: "合约佣金",
          referralType: "间推",
          userId: "user446677",
          userName: "褚十八",
          tradingPair: "MATICUSDT",
          commissionAmount: "52.80",
          commissionRate: "0.015%",
          feeAmount: "3,520.00",
          currency: "USDT",
          creditAmount: "51.95",
          creditCurrency: "USDT",
          status: "已完成",
          time: "2024-01-10 09:45:20",
          settledTime: "2024-01-10 09:50:35",
          remark: "MATIC合约返佣"
        },
        {
          id: "WM008",
          type: "理财佣金",
          referralType: "直推",
          userId: "user668899",
          userName: "卫十九",
          productName: "USDC固定收益",
          commissionAmount: "95.60",
          commissionRate: "0.8%",
          feeAmount: "11,950.00",
          currency: "USDT",
          creditAmount: "93.99",
          creditCurrency: "USDT",
          status: "已完成",
          time: "2024-01-09 11:30:10",
          settledTime: "2024-01-09 11:35:25",
          remark: "USDC理财产品佣金"
        },
        {
          id: "CM_TODAY_001",
          type: "合约佣金",
          referralType: "直推",
          userId: "user_today_001",
          userName: "张今天",
          tradingPair: "BTCUSDT",
          commissionAmount: "88.50",
          commissionRate: "0.02%",
          feeAmount: "4,425.00",
          currency: "USDT",
          creditAmount: "87.01",
          creditCurrency: "USDT",
          status: "已结算",
          time: "2025-01-17 10:30:15",
          settledTime: "2025-01-17 10:35:22",
          remark: "今日合约交易返佣"
        },
        {
          id: "WM_TODAY_001",
          type: "理财佣金",
          referralType: "间推",
          userId: "user_today_002",
          userName: "李今天",
          productName: "USDT活期理财",
          commissionAmount: "45.80",
          commissionRate: "0.5%",
          feeAmount: "9,160.00",
          currency: "USDT",
          creditAmount: "45.03",
          creditCurrency: "USDT",
          status: "结算中",
          time: "2025-01-17 14:20:30",
          settledTime: "",
          remark: "今日理财产品推荐佣金"
        },
        {
          id: "UC_TODAY_001",
          type: "U卡佣金",
          referralType: "直推",
          userId: "user_today_003",
          userName: "王今天",
          cardType: "虚拟卡",
          commissionAmount: "20.00",
          commissionRate: "2.5%",
          feeAmount: "800.00",
          currency: "USDT",
          creditAmount: "19.65",
          creditCurrency: "USDT",
          status: "待结算",
          time: "2025-01-17 16:45:18",
          settledTime: "",
          remark: "今日开卡佣金"
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
    } else if (action === "finance-fund-records") {
      // 理财账户资金记录按钮跳转到订单记录-理财订单-理财资金记录
      setTopLevelTab("订单记录")
      setOrderTab("理财订单")
      setSecondaryTab("account")
    } else if (action === "finance-investment-records") {
      // 理财投资记录按钮跳转到订单记录-理财订单-投资订单
      setTopLevelTab("订单记录")
      setOrderTab("理财订单")
      setSecondaryTab("invest")
    } else if (action === "ucard-fund-records") {
      // U卡账户充值记录按钮跳转到订单记录-U卡订单-充值记录
      setTopLevelTab("订单记录")
      setOrderTab("U卡订单")
      setSecondaryTab("recharge")
    } else if (action === "ucard-consume-records") {
      // U卡账户消费记录按钮跳转到订单记录-U卡订单-消费记录
      setTopLevelTab("订单记录")
      setOrderTab("U卡订单")
      setSecondaryTab("consume")
    } else if (action === "guarantee-fund-records") {
      // 担保账户资金记录按钮跳转到订单记录-担保记录-信用担保资金记录
      setTopLevelTab("订单记录")
      setOrderTab("担保记录")
      setSecondaryTab("credit")
    } else if (action === "guarantee-trade-records") {
      // 担保账户交易记录按钮跳转到订单记录-担保记录
      setTopLevelTab("订单记录")
      setOrderTab("担保记录")
      setSecondaryTab("")
    } else if (action === "bepay-fiat-orders") {
      // Bepay账户商户资产法币订单跳转到订单记录-支付订单-法币代收
      setTopLevelTab("订单记录")
      setOrderTab("支付订单")
      setSecondaryTab("fiatReceive")
    } else if (action === "bepay-crypto-orders") {
      // Bepay账户加密货币订单跳转到订单记录-支付订单-加密货币代收
      setTopLevelTab("订单记录")
      setOrderTab("支付订单")
      setSecondaryTab("cryptoReceive")
    } else {
      setSelectedAction(selectedAction === action ? "" : action)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "钱包总览":
        return (
          <div className="space-y-6">
            {/* 移动端账户类型选择和图标按钮 - 仅在移动端显示 */}
            <div className="md:hidden flex justify-between items-center">
              {/* 左侧：页签居左对齐 */}
              <div className={`relative flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'}`}>
                {/* 滑动背景 */}
                <div
                  className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'}`}
                  style={{
                    width: overviewTab === "现金账户" ? '80px' : '64px',
                    left: overviewTab === "现金账户" ? '4px' : '84px'
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
                      width: tab === "现金账户" ? '80px' : '64px',
                      height: '36px'
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

              {/* 右侧：图标按钮区域 */}
              <div className="flex items-center gap-2">
                {/* 资金记录图标 */}
                <Button
                  onClick={() => {
                    setTopLevelTab("订单记录")
                    setOrderTab("资金记录")
                    setSecondaryTab("deposit")
                  }}
                  className={`h-9 w-9 transition-all duration-200 bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800`}
                  variant="outline"
                  title="资金记录"
                >
                  <FileText className="h-4 w-4 text-black dark:text-white" />
                </Button>

                {/* 交易记录图标 */}
                <Button
                  onClick={() => {
                    setTopLevelTab("订单记录")
                    setOrderTab("现货订单")
                    setSecondaryTab("current")
                  }}
                  className={`h-9 w-9 transition-all duration-200 bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800`}
                  variant="outline"
                  title="交易记录"
                >
                  <BarChart2 className="h-4 w-4 text-black dark:text-white" />
                </Button>

                {/* 仓位分布图标 */}
                <Button
                  onClick={handlePositionModalClick}
                  className={`h-9 w-9 transition-all duration-200 bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800`}
                  variant="outline"
                  title="仓位分布"
                >
                  <PieChart className="h-4 w-4 text-black dark:text-white" />
                </Button>
              </div>
            </div>

            {/* 主要卡片选择 - 桌面端显示全部，移动端只显示选中的 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 现金账户卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-6 transition-all duration-300 ease-out ${
                  overviewMode === "现金账户" 
                    ? "ring-2 ring-[#00D4AA] border-[#00D4AA]/50 shadow-lg" 
                    : ""
                } ${overviewTab !== "现金账户" ? "hidden md:block" : ""}`}
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
                } ${overviewTab !== "总资产" ? "hidden md:block" : ""}`}
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

            {/* 钱包总览标签页和操作按钮 - 桌面端显示 */}
            <div className="hidden md:flex justify-between items-center">
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
                    onClick={() => {
                      setTopLevelTab("订单记录")
                      setOrderTab("资金记录")
                      setSecondaryTab("deposit")
                    }}
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
                    onClick={() => {
                      setTopLevelTab("订单记录")
                      setOrderTab("现货订单")
                      setSecondaryTab("current")
                    }}
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

            {/* 移动端操作按钮 - 仅在移动端显示 */}
            <div className="md:hidden flex gap-2">
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
                    className={`h-16 px-2 transition-all duration-200 text-xs font-bold flex-1 flex-col ${
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
                    <Icon className="h-6 w-6 mb-1" />
                    <span>{button.label}</span>
                  </Button>
                )
              })}
              

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
                      <div className={`hidden md:flex rounded-full p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-100'}`}>
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
                          <span className="hidden md:inline">按余额排序</span>
                          <span className="md:hidden">余额</span>
                          {sortBy === "value" && (sortOrder === "desc" ? <ArrowDown className="inline h-3 w-3 ml-1" /> : <ArrowUp className="inline h-3 w-3 ml-1" />)}
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
                          <span className="hidden md:inline">按市值排序</span>
                          <span className="md:hidden">市值</span>
                          {sortBy === "marketCap" && (sortOrder === "desc" ? <ArrowDown className="inline h-3 w-3 ml-1" /> : <ArrowUp className="inline h-3 w-3 ml-1" />)}
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
                            {/* 桌面端：显示百分比和进度条 */}
                            <div className="hidden md:flex flex-col items-end space-y-2">
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
                            {/* 桌面端：显示三个按钮 */}
                            <div className="hidden md:flex space-x-2">
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
                            {/* 移动端：显示划转和查看按钮，隐藏记录按钮和进度条 */}
                            <div className="md:hidden flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-9 px-3 text-sm font-medium border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA]/10"
                              >
                                划转
                              </Button>
                              <Button 
                                size="sm"
                                className="h-9 px-3 text-sm font-medium bg-black text-white hover:bg-gray-800"
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
            {/* 六个卡片布局 - 移动端和桌面端都是三列 */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {/* 第一排 */}
              <div className={`${cardStyle} rounded-lg p-2 md:p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs md:text-sm font-medium">总资产</h3>
                  <button
                    onClick={handleCurrencyModalClick}
                    className={`flex items-center space-x-1 text-xs font-medium transition-all duration-300  ${
                      isDark 
                        ? "text-white hover:text-gray-300" 
                        : "text-black hover:text-gray-600"
                    }`}
                  >
                    {/* 桌面端：显示完整的按钮样式 */}
                    <div className="hidden md:flex items-center space-x-1 px-2 py-1 rounded-full border border-black">
                      <div className={`w-3 h-3 rounded-full flex items-center justify-center text-xs font-bold ${
                        availableCurrencies.find(c => c.symbol === selectedDisplayCurrency)?.color || 'bg-gray-500'
                      }`}>
                        <span className="text-white text-[10px]">{selectedDisplayCurrency.charAt(0)}</span>
                      </div>
                      <span>{selectedDisplayCurrency}</span>
                      <ChevronDown className="h-2 w-2" />
                    </div>
                    {/* 移动端：只显示文字和箭头 */}
                    <div className="md:hidden flex items-center space-x-1">
                      <span>{selectedDisplayCurrency}</span>
                      <ChevronDown className="h-3 w-3" />
                    </div>
                  </button>
                </div>
                <div className="text-lg md:text-2xl font-bold transition-all duration-500">
                  {balanceVisible ? convertBalance(contractData.totalBalance, "USDT", selectedDisplayCurrency) : "****"}
                </div>
              </div>
              
              <div className={`${cardStyle} rounded-lg p-2 md:p-4`}>
                <h3 className="text-xs md:text-sm font-medium mb-2">净资产</h3>
                <div className="text-lg md:text-2xl font-bold text-[#00D4AA] transition-all duration-500">
                  {balanceVisible ? convertBalance("8,734.56", "USDT", selectedDisplayCurrency) : "****"}
                </div>
              </div>
              
              <div className={`${cardStyle} rounded-lg p-2 md:p-4`}>
                <h3 className="text-xs md:text-sm font-medium mb-2">未实现盈亏</h3>
                <div className="text-lg md:text-2xl font-bold text-green-500 transition-all duration-500">
                  {balanceVisible ? contractData.unrealizedPnL : "****"}
                </div>
              </div>
              
              {/* 第二排 */}
              <div className={`${cardStyle} rounded-lg p-2 md:p-4`}>
                <h3 className="text-xs md:text-sm font-medium mb-2">已实现盈亏</h3>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">今日</span>
                    <span className="text-xs md:text-sm font-bold text-green-500 transition-all duration-300">+123.45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">本月</span>
                    <span className="text-xs md:text-sm font-bold text-red-500 transition-all duration-300">-234.56</span>
                  </div>
                </div>
              </div>
              
              <div className={`${cardStyle} rounded-lg p-2 md:p-4`}>
                <h3 className="text-xs md:text-sm font-medium mb-2">已用保证金</h3>
                <div className="text-lg md:text-2xl font-bold transition-all duration-500">
                  {balanceVisible ? convertBalance(contractData.marginUsed, "USDT", selectedDisplayCurrency) : "****"}
                </div>
              </div>
              
              <div className={`${cardStyle} rounded-lg p-2 md:p-4`}>
                <h3 className="text-xs md:text-sm font-medium mb-2">可用保证金</h3>
                <div className="text-lg md:text-2xl font-bold transition-all duration-500">
                  {balanceVisible ? convertBalance(contractData.marginAvailable, "USDT", selectedDisplayCurrency) : "****"}
                </div>
              </div>
            </div>

            {/* 桌面端：合约账户标签页和操作按钮在同一行 */}
            <div className="hidden md:flex justify-between items-center">
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
                  onClick={() => {
                    setTopLevelTab("订单记录")
                    setOrderTab("合约订单")
                    setSecondaryTab("funding")
                  }}
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
                  onClick={() => {
                    setTopLevelTab("订单记录")
                    setOrderTab("合约订单")
                    setSecondaryTab("current")
                  }}
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

            {/* 移动端：操作按钮 */}
            <div className="md:hidden">
              {/* 操作按钮行 - 四个按钮均匀分布 */}
              <div className="flex gap-2">
                {/* 划转和交易按钮 - 垂直布局 */}
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
                      className={`h-16 flex flex-col items-center justify-center px-2 transition-all duration-200 text-xs font-bold flex-1 ${
                        isClicked
                          ? "bg-[#00D4AA] text-white border-[#00D4AA]"
                          : isSelected 
                            ? "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]" 
                            : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                      }`}
                      variant="outline"
                    >
                      <Icon className="h-6 w-6 mb-1" />
                      {button.label}
                    </Button>
                  )
                })}
                
                {/* 资金记录按钮 - 垂直布局 */}
                <Button
                  onClick={() => {
                    setTopLevelTab("订单记录")
                    setOrderTab("合约订单")
                    setSecondaryTab("funding")
                  }}
                  onMouseDown={() => setClickedAction("contract-fund-records")}
                  onMouseUp={() => setClickedAction("")}
                  onMouseLeave={() => setClickedAction("")}
                  className={`h-16 flex flex-col items-center justify-center px-2 transition-all duration-200 text-xs font-bold flex-1 ${
                    clickedAction === "contract-fund-records"
                      ? "bg-[#00D4AA] text-white border-[#00D4AA]"
                      : selectedAction === "contract-fund-records"
                        ? "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]"
                        : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <FileText 
                    className={`h-6 w-6 mb-1 transition-colors ${
                      clickedAction === "contract-fund-records"
                        ? "text-white"
                        : selectedAction === "contract-fund-records" 
                          ? "text-[#00D4AA]"
                          : "text-black dark:text-white"
                    }`} 
                  />
                  资金记录
                </Button>

                {/* 交易记录按钮 - 垂直布局 */}
                <Button
                  onClick={() => {
                    setTopLevelTab("订单记录")
                    setOrderTab("合约订单")
                    setSecondaryTab("current")
                  }}
                  onMouseDown={() => setClickedAction("contract-trade-records")}
                  onMouseUp={() => setClickedAction("")}
                  onMouseLeave={() => setClickedAction("")}
                  className={`h-16 flex flex-col items-center justify-center px-2 transition-all duration-200 text-xs font-bold flex-1 ${
                    clickedAction === "contract-trade-records"
                      ? "bg-[#00D4AA] text-white border-[#00D4AA]"
                      : selectedAction === "contract-trade-records"
                        ? "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]"
                        : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                >
                  <BarChart2 
                    className={`h-6 w-6 mb-1 transition-colors ${
                      clickedAction === "contract-trade-records"
                        ? "text-white"
                        : selectedAction === "contract-trade-records" 
                          ? "text-[#00D4AA]"
                          : "text-black dark:text-white"
                    }`} 
                  />
                  交易记录
                </Button>
              </div>
            </div>
            
            {/* 内容区域 - 根据选中的按钮显示不同内容 */}
            <div className={`${cardStyle} rounded-lg p-6`}>
              {/* 移动端：在内容卡片内显示标签页和仓位分布按钮 */}
              <div className="md:hidden mb-4 flex justify-between items-center">
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
                
                {/* 右侧：仓位分布按钮 */}
                <Button
                  onClick={() => setShowPositionModal(true)}
                  className={`h-10 w-10 transition-all duration-200 bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:hover:bg-gray-800`}
                  variant="outline"
                  title="仓位分布"
                >
                  <PieChart className="h-4 w-4 text-black dark:text-white" />
                </Button>
              </div>

              {selectedAction === "account-balance" ? (
                /* 账户余额界面 */
                <div className="space-y-4">
                  {/* 桌面端：表格布局 */}
                  <div className="hidden md:block overflow-x-auto">
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

                  {/* 移动端：重新设计的卡片布局 */}
                  <div className="md:hidden space-y-4">
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
                      <div key={currency.symbol} className={`p-4 rounded-lg border ${
                        isDark 
                          ? 'border-[#3a3d4a] bg-[#1a1d29]' 
                          : 'border-gray-200 bg-white'
                      }`}>
                        {/* 顶部：币种信息和账户余额 */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                              <span className="text-[#00D4AA] font-bold text-lg">{currency.symbol.charAt(0)}</span>
                            </div>
                            <div>
                              <div className="font-semibold text-lg">{currency.symbol}</div>
                              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {currency.name}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>账户余额</div>
                            <div className="font-bold text-lg">
                              {balanceVisible ? currency.accountBalance : "****"}
                            </div>
                          </div>
                        </div>

                        {/* 底部：三个数据项横向排列 */}
                        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200 dark:border-[#3a3d4a]">
                          <div className="text-center">
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>未实现盈亏</div>
                            <div className={`font-semibold text-sm ${
                              currency.unrealizedPnL.startsWith('+') ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {balanceVisible ? currency.unrealizedPnL : "****"}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>净资产余额</div>
                            <div className="font-semibold text-sm text-[#00D4AA]">
                              {balanceVisible ? currency.netAssets : "****"}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>保证金余额</div>
                            <div className="font-semibold text-sm">
                              {balanceVisible ? currency.marginBalance : "****"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
            {/* 三个卡片选择 - 移动端也显示三列 */}
            <div className="grid grid-cols-3 gap-2 md:gap-6">
              {/* 理财收益卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-2 md:p-6`}
              >
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <PiggyBank className="hidden md:block h-6 w-6 text-[#00D4AA]" />
                    <h3 className="text-[10px] md:text-lg font-semibold">理财收益</h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCurrencyModalClick()
                    }}
                    className={`transition-all duration-300 text-xs ${
                      isDark 
                        ? "text-white hover:text-gray-300" 
                        : "text-black hover:text-gray-600"
                    } md:flex md:items-center md:space-x-1 md:px-2 md:py-1 md:rounded-full md:font-medium md:border md:border-black ${
                      isDark 
                        ? "md:bg-transparent md:hover:bg-gray-800" 
                        : "md:bg-white md:hover:bg-gray-50"
                    }`}
                  >
                    {/* 移动端：仅显示货币符号 */}
                    <span className="md:hidden">{selectedDisplayCurrency}</span>
                    
                    {/* 桌面端：完整样式 */}
                    <div className={`hidden md:flex w-3 h-3 rounded-full items-center justify-center text-xs font-bold ${
                      availableCurrencies.find(c => c.symbol === selectedDisplayCurrency)?.color || 'bg-gray-500'
                    }`}>
                      <span className="text-white text-[10px]">{selectedDisplayCurrency.charAt(0)}</span>
                    </div>
                    <span className="hidden md:inline">{selectedDisplayCurrency}</span>
                    <ChevronDown className="hidden md:block h-2 w-2" />
                  </button>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className={`text-sm md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {balanceVisible ? convertBalance(financeData.totalAssets, "USDT", selectedDisplayCurrency) : "****"}
                    <span className={`hidden md:inline text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} ml-2`}>
                      {selectedDisplayCurrency}
                    </span>
                  </div>
                  <div className="flex-shrink-0 hidden md:block">
                    <TrendChart 
                      data={generateTrendData(true)} 
                      isPositive={true}
                      height={32}
                    />
                  </div>
                </div>
                <div className={`hidden md:block text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  总收益 {balanceVisible ? convertBalance(financeData.totalEarnings, "USDT", selectedDisplayCurrency) : "****"} {selectedDisplayCurrency}
                </div>
              </div>

              {/* 理财持仓卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-2 md:p-6`}
              >
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <BarChart3 className="hidden md:block h-6 w-6 text-[#00D4AA]" />
                    <h3 className="text-[10px] md:text-lg font-semibold">理财持仓</h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCurrencyModalClick()
                    }}
                    className={`transition-all duration-300 text-xs ${
                      isDark 
                        ? "text-white hover:text-gray-300" 
                        : "text-black hover:text-gray-600"
                    } md:flex md:items-center md:space-x-1 md:px-2 md:py-1 md:rounded-full md:font-medium md:border md:border-black ${
                      isDark 
                        ? "md:bg-transparent md:hover:bg-gray-800" 
                        : "md:bg-white md:hover:bg-gray-50"
                    }`}
                  >
                    {/* 移动端：仅显示货币符号 */}
                    <span className="md:hidden">{selectedDisplayCurrency}</span>
                    
                    {/* 桌面端：完整样式 */}
                    <div className={`hidden md:flex w-3 h-3 rounded-full items-center justify-center text-xs font-bold ${
                      availableCurrencies.find(c => c.symbol === selectedDisplayCurrency)?.color || 'bg-gray-500'
                    }`}>
                      <span className="text-white text-[10px]">{selectedDisplayCurrency.charAt(0)}</span>
                    </div>
                    <span className="hidden md:inline">{selectedDisplayCurrency}</span>
                    <ChevronDown className="hidden md:block h-2 w-2" />
                  </button>
                </div>
                <div className={`text-sm md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {balanceVisible ? convertBalance("8,456.78", "USDT", selectedDisplayCurrency) : "****"}
                  <span className={`hidden md:inline text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} ml-2`}>
                    {selectedDisplayCurrency}
                  </span>
                </div>
                <div className={`hidden md:block text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                  持仓资产金额
                </div>
              </div>

              {/* 账户余额卡片 */}
              <div 
                className={`${cardStyle} rounded-lg p-2 md:p-6`}
              >
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <CreditCard className="hidden md:block h-6 w-6 text-[#00D4AA]" />
                    <h3 className="text-[10px] md:text-lg font-semibold">账户余额</h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCurrencyModalClick()
                    }}
                    className={`transition-all duration-300 text-xs ${
                      isDark 
                        ? "text-white hover:text-gray-300" 
                        : "text-black hover:text-gray-600"
                    } md:flex md:items-center md:space-x-1 md:px-2 md:py-1 md:rounded-full md:font-medium md:border md:border-black ${
                      isDark 
                        ? "md:bg-transparent md:hover:bg-gray-800" 
                        : "md:bg-white md:hover:bg-gray-50"
                    }`}
                  >
                    {/* 移动端：仅显示货币符号 */}
                    <span className="md:hidden">{selectedDisplayCurrency}</span>
                    
                    {/* 桌面端：完整样式 */}
                    <div className={`hidden md:flex w-3 h-3 rounded-full items-center justify-center text-xs font-bold ${
                      availableCurrencies.find(c => c.symbol === selectedDisplayCurrency)?.color || 'bg-gray-500'
                    }`}>
                      <span className="text-white text-[10px]">{selectedDisplayCurrency.charAt(0)}</span>
                    </div>
                    <span className="hidden md:inline">{selectedDisplayCurrency}</span>
                    <ChevronDown className="hidden md:block h-2 w-2" />
                  </button>
                </div>
                <div className={`text-sm md:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {balanceVisible ? convertBalance("2,345.67", "USDT", selectedDisplayCurrency) : "****"}
                  <span className={`hidden md:inline text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} ml-2`}>
                    {selectedDisplayCurrency}
                  </span>
                </div>
                <div className="hidden md:flex items-center justify-between mt-2">
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    可用于理财投资
                  </div>
                  <Button 
                    size="sm"
                    className="hidden md:flex h-8 px-3 text-xs font-medium bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
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

            {/* 移动端操作按钮行 */}
            <div className="md:hidden flex gap-2 justify-center">
              {/* 主要操作按钮 */}
              {[
                { id: "finance-transfer", label: "划转", icon: ArrowLeftRight },
                { id: "finance-exchange", label: "闪兑", icon: RefreshCw },
                { id: "finance-fund-records", label: "资金记录", icon: FileText },
                { id: "finance-investment-records", label: "投资记录", icon: Target }
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
                    className={`h-16 px-2 flex-col transition-all duration-200 text-xs font-bold flex-1 ${
                      isClicked
                        ? "bg-[#00D4AA] text-white border-[#00D4AA]"
                        : isSelected 
                          ? "bg-[#00D4AA]/10 text-[#00D4AA] border-[#00D4AA]" 
                          : "bg-transparent border-2 border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                    }`}
                    variant="outline"
                  >
                    <Icon className="h-6 w-6 mb-1" />
                    {button.label}
                  </Button>
                )
              })}
            </div>

            {/* 理财账户标签页和持仓分布按钮 */}
            <div className="flex justify-between items-center">
              {/* 左侧：标签页 */}
              <div className={`relative flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'} flex-1 max-w-xs`}>
                {/* 滑动背景 */}
                <div
                  className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'}`}
                  style={{
                    width: 'calc(33.333% - 8px)',
                    left: financeMode === "收益计算" ? '4px' : financeMode === "当前持仓" ? '33.333%' : '66.666%'
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
                    className={`relative z-10 flex items-center justify-center text-sm font-medium transition-all duration-300 flex-1 ${
                      financeMode === tab.id
                        ? isDark ? "text-black" : "text-white"
                        : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    style={{
                      height: '32px'
                    }}
                    onClick={() => {
                      setFinanceMode(tab.id)
                    }}
                  >
                    <span className="px-1 truncate text-xs md:text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* 右侧：桌面端操作按钮 */}
              <div className="hidden md:flex gap-2">
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
                {/* 理财资金记录按钮 */}
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
                  title="理财资金记录"
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
              </div>

              {/* 右侧：持仓分布按钮（移动端和桌面端都显示） */}
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

            {/* 动态内容区域 */}
            <div className={`${cardStyle} rounded-lg p-6`}>
              {financeMode === "收益计算" && (
                <div>
                  {/* 红色提示 */}
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      以下内容不需要改成跟原型一样，使用ubx原有页面，排版和手机端适配需要根据原型适当优化即可。
                    </p>
                  </div>
                  
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
                  {/* 红色提示 */}
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                      以下内容不需要改成跟原型一样，使用ubx原有页面，排版和手机端适配需要根据原型适当优化即可。
                    </p>
                  </div>
                  
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
                    {/* 桌面端表格视图 */}
                    <div className="hidden md:block overflow-x-auto">
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

                    {/* 移动端卡片视图 */}
                    <div className="md:hidden space-y-3">
                      {[
                        { symbol: "USDT", name: "Tether USD", available: "2,345.67", frozen: "0.00" },
                        { symbol: "BTC", name: "Bitcoin", available: "0.05234", frozen: "0.00" },
                        { symbol: "ETH", name: "Ethereum", available: "1.2345", frozen: "0.00" },
                        { symbol: "UBX", name: "UBX Token", available: "1,000.00", frozen: "50.00" },
                        { symbol: "UBC", name: "UBC Token", available: "500.00", frozen: "25.00" }
                      ].map((currency, index) => (
                        <div key={currency.symbol} className={`${cardStyle} rounded-lg p-4`}>
                          {/* 顶部：币种信息和可用余额 */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                                <span className="text-[#00D4AA] font-bold text-base">{currency.symbol.charAt(0)}</span>
                              </div>
                              <div>
                                <div className="font-bold text-base">{currency.symbol}</div>
                                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {currency.name}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-base font-bold">
                                {balanceVisible ? currency.available : "****"}
                              </div>
                              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                可用余额
                              </div>
                            </div>
                          </div>

                          {/* 底部：冻结金额和操作按钮 */}
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <div className="text-sm font-medium text-gray-500">
                                {balanceVisible ? currency.frozen : "****"}
                              </div>
                              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                冻结金额
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
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

      case "担保账户":
        return (
          <div className="space-y-6">
            {/* 担保账户卡片区域 */}
            <div className="grid grid-cols-3 gap-2 md:gap-6">
              
              {/* 交易担保金额 (合并应收应付) */}
              <Card 
                className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <CardHeader className="pb-1 md:pb-2">
                  <CardTitle className={`text-[10px] md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} md:flex md:items-center text-left`}>
                    <ArrowLeftRight className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-[#00D4AA] hidden md:block" />
                    交易担保金额
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 p-2 md:p-6">
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <ArrowDown className="h-2 w-2 md:h-4 md:w-4 text-green-600 dark:text-green-400 hidden md:block" />
                        <span className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400">应收</span>
                      </div>
                      <div className="flex items-baseline space-x-1">
                        <span className={`text-xs md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          1,234.56
                        </span>
                        <span className="text-[8px] md:text-sm text-[#00D4AA] font-medium hidden md:inline">USDT</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <ArrowUp className="h-2 w-2 md:h-4 md:w-4 text-red-600 dark:text-red-400 hidden md:block" />
                        <span className="text-[10px] md:text-sm text-gray-600 dark:text-gray-400">应付</span>
                      </div>
                      <div className="flex items-baseline space-x-1">
                        <span className={`text-xs md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          987.65
                        </span>
                        <span className="text-[8px] md:text-sm text-[#00D4AA] font-medium hidden md:inline">USDT</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 信誉担保金额 */}
              <Card 
                className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <CardHeader className="pb-1 md:pb-2">
                  <CardTitle className={`text-[10px] md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} md:flex md:items-center text-left`}>
                    <Shield className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-blue-400 dark:text-blue-500 hidden md:block" />
                    信誉担保金额
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 p-2 md:p-6">
                  <div className="flex items-baseline space-x-1 mb-1 md:mb-4">
                    <span className={`text-sm md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      5,000.00
                    </span>
                    <span className="text-[8px] md:text-sm text-[#00D4AA] font-medium hidden md:inline">USDT</span>
                  </div>
                  <div className="block">
                    <span className="text-[8px] md:text-sm text-blue-600 dark:text-blue-400 font-medium">
                      解冻：00:00:00:00
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* 可用余额 */}
              <Card className="bg-white dark:bg-[#1a1d29] border border-gray-200 dark:border-[#252842] rounded-xl shadow-sm hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-1 md:pb-2">
                  <CardTitle className={`text-[10px] md:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} md:flex md:items-center text-left`}>
                    <DollarSign className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-[#00D4AA] hidden md:block" />
                    可用余额
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 p-2 md:p-6">
                  <div className="flex items-baseline space-x-1 mb-1 md:mb-2">
                    <span className={`text-sm md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      2,456.78
                    </span>
                    <span className="text-[8px] md:text-sm text-[#00D4AA] font-medium hidden md:inline">USDT</span>
                  </div>
                  <div className="block">
                    <span className="text-[8px] md:text-sm text-gray-500 dark:text-gray-400">
                      可划转至现金账户
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 移动端操作按钮 */}
            <div className="md:hidden">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { id: "add-credit", label: "增加信誉担保", icon: Shield },
                  { id: "extend-time", label: "延长信誉担保", icon: Clock },
                  { id: "transfer", label: "划转", icon: ArrowLeftRight },
                  { id: "应收担保交易", label: "应收担保交易", icon: TrendingUp }
                ].map((button) => {
                  const Icon = button.icon
                  const isSelected = selectedAction === button.id
                  const isClicked = clickedAction === button.id
                  
                  return (
                    <button
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
                      className={`h-16 flex flex-col items-center justify-center gap-1 transition-all duration-200 text-xs font-medium rounded-lg ${
                        isClicked
                          ? "bg-[#00D4AA] text-white"
                          : isSelected 
                            ? "bg-[#00D4AA]/10 text-[#00D4AA]" 
                            : "bg-transparent border border-black text-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                      {button.label}
                    </button>
                  )
                })}
              </div>
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

              {/* 右侧：操作按钮和记录按钮 */}
              <div className="flex gap-2">
                {/* 桌面端主要操作按钮 */}
                <div className="hidden md:flex gap-2">
                  {[
                    { id: "add-credit", label: "增加信誉担保", icon: Shield },
                    { id: "extend-time", label: "延长信誉担保", icon: Clock },
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
                </div>
                
                {/* 图标按钮区域 - 只保留资金记录和担保记录，删除最后一个 */}
                {/* 信誉担保资金记录按钮 */}
                <Button
                  onClick={() => handleActionClick("guarantee-fund-records")}
                  className={`h-10 w-10 transition-all duration-200 ${
                    selectedGuaranteeTab === "资金记录"
                      ? "bg-[#00D4AA] border-[#00D4AA] text-white"
                      : "bg-transparent border-2 border-black hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
                  }`}
                  variant="outline"
                  title="信誉担保资金记录"
                >
                  <FileText 
                    className={`h-4 w-4 transition-colors ${
                      selectedGuaranteeTab === "资金记录"
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
          { id: "资金记录", icon: Banknote },
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
          { id: "划转记录", icon: Coins },
          { id: "订单记录", icon: BarChart2 },
          { id: "资产分布", icon: PieChart }
        ]
        
        return (
          <div className="space-y-6">
            {/* 移动端：商户信息卡片置顶 */}
            <div className="md:hidden mb-6">
              <div className={`${cardStyle} rounded-lg p-4 flex flex-col justify-between`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className={`text-sm font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          MP2025001234
                        </div>
                        <button
                          onClick={() => navigator.clipboard.writeText("MP2025001234")}
                          className={`p-1 rounded transition-colors ${
                            isDark 
                              ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                          }`}
                          title="复制商户ID"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        BeDAO科技有限公司
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900 dark:text-green-200">
                    已认证
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowApiDocsModal(true)}
                    className={`flex-1 inline-flex items-center justify-center space-x-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all border-2 ${
                      isDark 
                        ? 'bg-transparent border-white text-white hover:bg-gray-800' 
                        : 'bg-white border-black text-black hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>API文档</span>
                  </button>

                  <button
                    onClick={() => setShowGenerateKeyModal(true)}
                    className={`flex-1 inline-flex items-center justify-center space-x-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isDark 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                    </svg>
                    <span>生成密钥</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 移动端：支付API卡片两个一行 */}
            <div className="md:hidden mb-6">
              <div className={`rounded-lg p-3 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                <div className="grid grid-cols-2 gap-3">
                {/* 商户法币资产卡片 */}
                <div 
                  onClick={() => setSelectedPaymentCard("fiat")}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedPaymentCard === "fiat" 
                      ? isDark 
                        ? "bg-gray-700 ring-2 ring-[#00D4AA] ring-opacity-50" 
                        : "bg-white ring-2 ring-[#00D4AA] ring-opacity-50"
                      : isDark 
                        ? "bg-gray-700/50 hover:bg-gray-700" 
                        : "bg-white/50 hover:bg-white"
                  } rounded-lg p-3 shadow-sm`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Banknote className={`h-4 w-4 ${selectedPaymentCard !== "fiat" ? "text-gray-400" : "text-[#00D4AA]"}`} />
                      <h3 className={`text-xs font-semibold ${selectedPaymentCard !== "fiat" ? "text-gray-400" : ""}`}>法币支付API</h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-xs font-medium border border-black transition-all ${
                        isDark 
                          ? "bg-transparent text-white hover:bg-gray-800" 
                          : "bg-white text-black hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-[10px]">USD</span>
                      <ChevronDown className="h-2 w-2" />
                    </button>
                  </div>
                  <div className={`text-lg font-bold mb-1 ${selectedPaymentCard !== "fiat" ? "text-gray-400" : isDark ? 'text-white' : 'text-gray-900'}`}>
                    {balanceVisible ? "$125,860" : "****"}
                  </div>
                  <div className={`text-xs ${selectedPaymentCard !== "fiat" ? "text-gray-400" : "text-gray-500"}`}>
                    代付备用金：$38,520
                  </div>
                </div>

                {/* 商户加密货币资产卡片 */}
                <div 
                  onClick={() => setSelectedPaymentCard("crypto")}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedPaymentCard === "crypto" 
                      ? isDark 
                        ? "bg-gray-700 ring-2 ring-[#00D4AA] ring-opacity-50" 
                        : "bg-white ring-2 ring-[#00D4AA] ring-opacity-50"
                      : isDark 
                        ? "bg-gray-700/50 hover:bg-gray-700" 
                        : "bg-white/50 hover:bg-white"
                  } rounded-lg p-3 shadow-sm`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Coins className={`h-4 w-4 ${selectedPaymentCard !== "crypto" ? "text-gray-400" : "text-[#3B82F6]"}`} />
                      <h3 className={`text-xs font-semibold ${selectedPaymentCard !== "crypto" ? "text-gray-400" : ""}`}>加密货币支付API</h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-xs font-medium border border-black transition-all ${
                        isDark 
                          ? "bg-transparent text-white hover:bg-gray-800" 
                          : "bg-white text-black hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-[10px]">USDT</span>
                      <ChevronDown className="h-2 w-2" />
                    </button>
                  </div>
                  <div className={`text-lg font-bold mb-1 ${selectedPaymentCard !== "crypto" ? "text-gray-400" : isDark ? 'text-white' : 'text-gray-900'}`}>
                    {balanceVisible ? "45,230.50" : "****"}
                  </div>
                  <div className={`text-xs ${selectedPaymentCard !== "crypto" ? "text-gray-400" : "text-gray-500"}`}>
                    当前地址数：12312u
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* 桌面端：商户信息卡片 */}
            <div className="hidden md:block">
              <div className={`${cardStyle} rounded-lg p-6 flex items-center justify-between`}>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className={`text-lg font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        MP2025001234
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText("MP2025001234")}
                        className={`p-1 rounded transition-colors ${
                          isDark 
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}
                        title="复制商户ID"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      BeDAO科技有限公司
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full dark:bg-green-900 dark:text-green-200">
                    已认证
                  </span>
                  <button
                    onClick={() => setShowApiDocsModal(true)}
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all border-2 ${
                      isDark 
                        ? 'bg-transparent border-white text-white hover:bg-gray-800' 
                        : 'bg-white border-black text-black hover:bg-gray-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>API文档</span>
                  </button>

                  <button
                    onClick={() => setShowGenerateKeyModal(true)}
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      isDark 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                    </svg>
                    <span>生成密钥</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 桌面端：支付API卡片布局 - 全屏宽度 */}
            <div className="hidden md:block">
              <div className={`rounded-lg p-4 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                <div className="grid grid-cols-2 gap-4">
                    {/* 商户法币资产卡片 */}
                    <div 
                      onClick={() => setSelectedPaymentCard("fiat")}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedPaymentCard === "fiat" 
                          ? isDark 
                            ? "bg-gray-700 ring-2 ring-[#00D4AA] ring-opacity-50" 
                            : "bg-white ring-2 ring-[#00D4AA] ring-opacity-50"
                          : isDark 
                            ? "bg-gray-700/50 hover:bg-gray-700" 
                            : "bg-white/50 hover:bg-white"
                      } rounded-lg p-6 shadow-sm`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Banknote className={`h-6 w-6 ${selectedPaymentCard !== "fiat" ? "text-gray-400" : "text-[#00D4AA]"}`} />
                          <h3 className={`text-lg font-semibold ${selectedPaymentCard !== "fiat" ? "text-gray-400" : ""}`}>法币支付API</h3>
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
                      <div className="text-gray-500 text-sm">
                        代付备用金：$38,520.00
                      </div>
                    </div>

                    {/* 商户加密货币资产卡片 */}
                    <div 
                      onClick={() => setSelectedPaymentCard("crypto")}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedPaymentCard === "crypto" 
                          ? isDark 
                            ? "bg-gray-700 ring-2 ring-[#00D4AA] ring-opacity-50" 
                            : "bg-white ring-2 ring-[#00D4AA] ring-opacity-50"
                          : isDark 
                            ? "bg-gray-700/50 hover:bg-gray-700" 
                            : "bg-white/50 hover:bg-white"
                      } rounded-lg p-6 shadow-sm`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Coins className={`h-6 w-6 ${selectedPaymentCard !== "crypto" ? "text-gray-400" : "text-[#3B82F6]"}`} />
                          <h3 className={`text-lg font-semibold ${selectedPaymentCard !== "crypto" ? "text-gray-400" : ""}`}>加密货币支付API</h3>
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
                      <div className="text-gray-500 text-sm">
                        当前地址数：12312u
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content will be rendered based on selected tabs */}
            <div className="mt-6">
              {/* Tab content will be implemented here */}
            </div>
            
            {/* Modals and other components */}
            {showExchangeModal && (
              <div>Exchange Modal Content</div>
            )}
            
            {showStandbyRechargeModal && (
              <div>Standby Recharge Modal Content</div>
            )}
          </div>
        )

      default:
        return <div>内容加载中...</div>
    }
  }
  const getOrderRecords = (orderTab: string, secondaryTab: string) => {
    const categoryKey = getCategoryKey(orderTab)
    
    // 资金记录数据
    const fundsData = {
      "入金记录": [
        {
          time: "2024-01-15 14:25:30",
          currency: "USDT",
          amount: "1,000.00",
          address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
          txHash: "0x123...abc",
          status: "已完成"
        },
        {
          time: "2024-01-15 10:15:20",
          currency: "BTC",
          amount: "0.05",
          address: "招商银行尾号1234",
          txHash: "0x789...ghi",
          status: "已完成"
        },
        {
          time: "2024-01-14 18:30:15",
          currency: "ETH",
          amount: "2.5",
          address: "0x742d35Cc6563C...3892",
          txHash: "0xdef...456",
          status: "处理中"
        }
      ],
      "出金记录": [
        {
          time: "2024-01-14 20:30:15",
          currency: "USDT",
          amount: "500.00",
          network: "TRC20",
          address: "TNGjYc8Mq4LWjSBh8kBF...7X9K",
          txHash: "0x456...def",
          status: "已完成"
        },
        {
          time: "2024-01-14 16:45:10",
          currency: "ETH",
          amount: "2.5",
          network: "ERC20",
          address: "0x8ba1f109551bD...892c",
          txHash: "0xabc...123",
          status: "处理中"
        },
        {
          time: "2024-01-13 22:15:30",
          currency: "BTC",
          amount: "0.1",
          network: "Bitcoin",
          address: "工商银行尾号5678",
          txHash: "0x987...654",
          status: "已完成"
        }
      ],
      "内转记录": [
        {
          time: "2024-01-15 16:20:30",
          currency: "USDT",
          direction: "转出",
          amount: "100.00",
          status: "已完成"
        },
        {
          time: "2024-01-15 15:45:15",
          currency: "USDT",
          direction: "转入",
          amount: "200.00",
          status: "已完成"
        },
        {
          time: "2024-01-14 19:30:45",
          currency: "BTC",
          direction: "转出",
          amount: "0.05",
          status: "已完成"
        },
        {
          time: "2024-01-14 14:20:15",
          currency: "ETH",
          direction: "转入",
          amount: "1.5",
          status: "处理中"
        }
      ],
      "划转记录": [
        {
          time: "2024-01-15 12:45:30",
          currency: "USDT",
          fromAccount: "现货账户",
          toAccount: "合约账户",
          amount: "1,000.00"
        },
        {
          time: "2024-01-15 11:30:20",
          currency: "USDT",
          fromAccount: "合约账户",
          toAccount: "理财账户",
          amount: "500.00"
        },
        {
          time: "2024-01-14 16:15:45",
          currency: "BTC",
          fromAccount: "现货账户",
          toAccount: "合约账户",
          amount: "0.2"
        },
        {
          time: "2024-01-14 10:20:30",
          currency: "ETH",
          fromAccount: "理财账户",
          toAccount: "现货账户",
          amount: "3.0"
        }
      ],
      "佣金结算记录": orderRecordsData["资金记录"]["佣金结算记录"] || [],
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
    
    // 佣金记录数据
    const commissionData = [
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
    
    // 划转记录数据
    const transferData = [
      {
        id: "TR001",
        type: "账户划转",
        from: "现货账户",
        to: "合约账户",
        currency: "USDT",
        amount: "1,000.00",
        status: "已完成",
        time: "2024-01-15 12:45:30"
      },
      {
        id: "TR002",
        type: "账户划转",
        from: "合约账户",
        to: "理财账户",
        currency: "USDT",
        amount: "500.00",
        status: "已完成",
        time: "2024-01-15 11:30:20"
      }
    ]
    
    switch (categoryKey) {
      case "funds":
        const tabNameMap = {
          deposit: "入金记录",
          withdraw: "出金记录",
          internal_transfer: "内转记录",
          transfer: "划转记录",
          commission: "佣金结算记录",
          other: "其他记录"
        }
        if (secondaryTab === "commission") {
          // 对佣金结算记录应用筛选功能
          const allCommissionRecords = fundsData["佣金结算记录"] || []
          return filterCommissionRecords(allCommissionRecords)
        }
        return fundsData[tabNameMap[secondaryTab]] || []
      case "commission":
        // 从新的数据结构中获取对应类型的佣金记录
        const commissionData = orderRecordsData["佣金结算记录"]
        if (commissionData && typeof commissionData === 'object' && !Array.isArray(commissionData)) {
          return commissionData[secondaryTab] || []
        }
        return []
      case "transfer":
        return transferData
      case "usdtTrading":
        // 根据页签类型返回不同的USDT买卖记录数据
        const usdtTradingData = {
          c2c: [
            {
              id: "C2C001",
              type: "买入",
              amount: "1,000.00 USDT",
              price: "7.20 CNY",
              total: "7,200.00 CNY",
              fiatCurrency: "CNY",
              method: "银行卡",
              status: "已完成",
              time: "2024-01-15 16:45:30",
              counterparty: "Bitcoin99"
            },
            {
              id: "C2C002",
              type: "卖出",
              amount: "500.00 USDT",
              price: "1.02 USD",
              total: "510.00 USD",
              fiatCurrency: "USD",
              method: "银行转账",
              status: "处理中",
              time: "2024-01-15 14:30:20",
              counterparty: "CryptoTrader88"
            },
            {
              id: "C2C003",
              type: "买入",
              amount: "800.00 USDT",
              price: "0.95 EUR",
              total: "760.00 EUR",
              fiatCurrency: "EUR",
              method: "SEPA转账",
              status: "已完成",
              time: "2024-01-15 13:15:10",
              counterparty: "EuroExchange"
            }
          ],
          quick: [
            {
              id: "QUICK001",
              type: "快捷买入",
              amount: "2,000.00 USDT",
              price: "7.22 CNY",
              total: "14,440.00 CNY",
              fiatCurrency: "CNY",
              method: "微信支付",
              status: "已完成",
              time: "2024-01-15 18:15:45",
              fee: "28.88 CNY"
            },
            {
              id: "QUICK002",
              type: "快捷卖出",
              amount: "800.00 USDT",
              price: "1.01 USD",
              total: "808.00 USD",
              fiatCurrency: "USD",
              method: "PayPal",
              status: "已完成",
              time: "2024-01-15 12:20:15",
              fee: "1.62 USD"
            },
            {
              id: "QUICK003",
              type: "快捷买入",
              amount: "1,500.00 USDT",
              price: "154.50 JPY",
              total: "231,750.00 JPY",
              fiatCurrency: "JPY",
              method: "银行转账",
              status: "已完成",
              time: "2024-01-15 10:30:25",
              fee: "4,635.00 JPY"
            }
          ],
          otc: [
            {
              id: "OTC001",
              type: "OTC买入",
              amount: "5,000.00 USDT",
              price: "7.25 CNY",
              total: "36,250.00 CNY",
              fiatCurrency: "CNY",
              method: "银行转账",
              status: "已完成",
              time: "2024-01-15 20:30:00",
              provider: "MoonPay"
            },
            {
              id: "OTC002",
              type: "OTC卖出",
              amount: "3,000.00 USDT",
              price: "1.03 USD",
              total: "3,090.00 USD",
              fiatCurrency: "USD",
              method: "Wire Transfer",
              status: "处理中",
              time: "2024-01-15 10:45:30",
              provider: "Ramp"
            },
            {
              id: "OTC003",
              type: "OTC买入",
              amount: "10,000.00 USDT",
              price: "0.96 EUR",
              total: "9,600.00 EUR",
              fiatCurrency: "EUR",
              method: "SWIFT转账",
              status: "已完成",
              time: "2024-01-15 09:15:20",
              provider: "Simplex"
            }
          ]
        }
        return usdtTradingData[secondaryTab] || []
      case "wealth":
        // 理财订单数据
        const wealthData = {
          invest: [
            {
              id: "INV001",
              product: "USDT活期理财",
              pledgeValue: "1,000.00 USDT",
              pledgeAmount: "1,000.00",
              earnAmount: "+12.34 USDT",
              pledgeLevel: "活期",
              expectedRedeem: "随时",
              expireTime: "无期限",
              status: "持有中"
            },
            {
              id: "INV002", 
              product: "BTC定期理财30天",
              pledgeValue: "0.5 BTC",
              pledgeAmount: "0.5000",
              earnAmount: "+0.015 BTC",
              pledgeLevel: "30天定期",
              expectedRedeem: "2024-02-10",
              expireTime: "2024-02-10 10:20:00",
              status: "已到期"
            },
            {
              id: "INV003",
              product: "ETH流动性挖矿",
              pledgeValue: "5.0 ETH",
              pledgeAmount: "5.0000",
              earnAmount: "+0.25 ETH",
              pledgeLevel: "高收益",
              expectedRedeem: "2024-01-25",
              expireTime: "2024-01-25 15:30:00",
              status: "投资中"
            }
          ],
          exchange: [
            {
              id: "EX001",
              type: "USDT → BTC",
              fromAmount: "1,500.00 USDT",
              toAmount: "0.035 BTC",
              rate: "42,857.14",
              status: "已完成",
              time: "2024-01-15 16:45:00",
              fee: "1.50 USDT"
            },
            {
              id: "EX002",
              type: "ETH → USDT", 
              fromAmount: "2.0 ETH",
              toAmount: "4,200.00 USDT",
              rate: "2,100.00",
              status: "已完成",
              time: "2024-01-14 12:30:00",
              fee: "4.20 USDT"
            }
          ],
          earnings: [
            {
              id: "ER001",
              currency: "USDT",
              amount: "+2.45",
              type: "日收益",
              time: "2024-01-15 00:00:00"
            },
            {
              id: "ER002",
              currency: "BTC",
              amount: "+0.002", 
              type: "到期收益",
              time: "2024-01-14 23:59:59"
            },
            {
              id: "ER003",
              currency: "ETH",
              amount: "+0.125",
              type: "周收益",
              time: "2024-01-13 23:59:59"
            },
            {
              id: "ER004",
              currency: "USDT",
              amount: "+15.67",
              type: "月收益",
              time: "2024-01-12 23:59:59"
            }
          ],
          account: [
            {
              id: "AC001",
              type: "理财转入",
              currency: "USDT",
              amount: "+2,000.00",
              fromAccount: "现货账户",
              status: "已完成",
              time: "2024-01-15 15:20:00"
            },
            {
              id: "AC002",
              type: "理财转出",
              currency: "USDT", 
              amount: "-500.00",
              toAccount: "现货账户",
              status: "已完成",
              time: "2024-01-14 11:30:00"
            },
            {
              id: "AC003",
              type: "收益发放",
              currency: "BTC",
              amount: "+0.015",
              source: "BTC定期理财到期",
              status: "已完成",
              time: "2024-01-13 09:15:00"
            }
          ]
        }
        return wealthData[secondaryTab] || []
      case "ucard":
        // U卡订单数据
        const ucardData = {
          open: [
            {
              id: "OPEN001",
              type: "虚拟卡开卡",
              cardNumber: "****1234",
              cardType: "Visa虚拟卡",
              region: "欧洲",
              status: "激活成功",
              time: "2024-01-15 10:30:00",
              fee: "5.00 USD"
            },
            {
              id: "OPEN002", 
              type: "实体卡开卡",
              cardNumber: "****5678",
              cardType: "Mastercard实体卡",
              region: "香港",
              status: "制卡中",
              time: "2024-01-14 16:45:00",
              fee: "15.00 USD"
            },
            {
              id: "OPEN003",
              type: "虚拟卡开卡", 
              cardNumber: "****9012",
              cardType: "Visa虚拟卡",
              region: "美国",
              status: "激活成功",
              time: "2024-01-13 09:20:00",
              fee: "5.00 USD"
            }
          ],
          recharge: [
            {
              id: "RC001",
              type: "USDT充值",
              cardNumber: "****1234",
              amount: "500.00",
              currency: "USDT",
              creditAmount: "497.50",
              creditCurrency: "USDT",
              status: "已完成",
              time: "2024-01-15 14:20:00",
              fee: "2.50 USDT"
            },
            {
              id: "RC002",
              type: "BTC充值",
              cardNumber: "****5678", 
              amount: "0.01",
              currency: "BTC",
              creditAmount: "0.0099",
              creditCurrency: "BTC",
              status: "已完成",
              time: "2024-01-14 11:30:00",
              fee: "0.0001 BTC"
            },
            {
              id: "RC003",
              type: "USDT充值",
              cardNumber: "****9012",
              amount: "1000.00", 
              currency: "USDT",
              creditAmount: "995.00",
              creditCurrency: "USDT",
              status: "处理中",
              time: "2024-01-13 18:45:00",
              fee: "5.00 USDT"
            }
          ],
          consume: [
            {
              id: "CS001",
              type: "在线消费",
              merchant: "Amazon",
              cardNumber: "****1234",
              amount: "89.99",
              currency: "USD",
              status: "已完成",
              time: "2024-01-15 18:45:30",
              category: "购物",
              location: "美国"
            },
            {
              id: "CS002",
              type: "订阅服务",
              merchant: "Netflix",
              cardNumber: "****1234", 
              amount: "15.99",
              currency: "USD",
              status: "已完成",
              time: "2024-01-13 20:15:30",
              category: "娱乐",
              location: "美国"
            },
            {
              id: "CS003",
              type: "云服务",
              merchant: "AWS",
              cardNumber: "****5678",
              amount: "156.78",
              currency: "USD",
              status: "已完成", 
              time: "2024-01-11 08:15:30",
              category: "云服务",
              location: "美国"
            },
            {
              id: "CS004",
              type: "应用购买",
              merchant: "Apple Store",
              cardNumber: "****9012",
              amount: "99.99",
              currency: "USD",
              status: "已完成",
              time: "2024-01-12 11:45:00",
              category: "购物",
              location: "美国"
            }
          ],
          refund: [
            {
              id: "WD001",
              type: "余额提取",
              cardNumber: "****1234",
              amount: "500.00",
              currency: "USD",
              creditAmount: "3,400.00",
              creditCurrency: "USDT",
              status: "已完成",
              time: "2024-01-15 16:20:00",
              toAccount: "现货账户",
              fee: "5.00 USD",
              exchangeRate: "6.80"
            },
            {
              id: "WD002",
              type: "余额提取",
              cardNumber: "****5678",
              amount: "200.00",
              currency: "USD",
              creditAmount: "1,360.00",
              creditCurrency: "USDT",
              status: "处理中",
              time: "2024-01-14 14:30:00",
              toAccount: "理财账户",
              fee: "2.00 USD",
              exchangeRate: "6.80"
            },
            {
              id: "WD003",
              type: "余额提取",
              cardNumber: "****9012",
              amount: "1000.00",
              currency: "USD",
              creditAmount: "6,795.00",
              creditCurrency: "USDT",
              status: "已完成",
              time: "2024-01-13 11:45:00",
              toAccount: "现货账户",
              fee: "5.00 USD",
              exchangeRate: "6.80"
            },
            {
              id: "WD004",
              type: "余额提取",
              cardNumber: "****1234",
              amount: "150.00",
              currency: "EUR",
              creditAmount: "1,122.00",
              creditCurrency: "USDT",
              status: "已完成",
              time: "2024-01-12 09:20:00",
              toAccount: "现货账户",
              fee: "3.00 EUR",
              exchangeRate: "7.48"
            }
          ]
        }
        return ucardData[secondaryTab] || []
      case "guarantee":
        // 担保记录数据
        const guaranteeData = {
          receive: [
            {
              id: "GR001",
              type: "收款担保",
              tradePartner: "用户A1B2C3",
              amount: "5,000.00",
              currency: "USDT",
              guaranteeAmount: "500.00",
              guaranteeCurrency: "USDT",
              status: "进行中",
              time: "2024-01-15 14:30:00",
              tradeType: "数字货币交易",
              progress: "已付担保金"
            },
            {
              id: "GR002",
              type: "收款担保",
              tradePartner: "用户D4E5F6",
              amount: "2,000.00",
              currency: "USDT",
              guaranteeAmount: "200.00",
              guaranteeCurrency: "USDT",
              status: "已完成",
              time: "2024-01-14 11:20:00",
              tradeType: "NFT交易",
              progress: "交易完成"
            },
            {
              id: "GR003",
              type: "收款担保",
              tradePartner: "用户G7H8I9",
              amount: "0.5",
              currency: "BTC",
              guaranteeAmount: "1,000.00",
              guaranteeCurrency: "USDT",
              status: "争议中",
              time: "2024-01-13 16:45:00",
              tradeType: "数字货币交易",
              progress: "申请仲裁"
            }
          ],
          payment: [
            {
              id: "GP001",
              type: "付款担保",
              tradePartner: "用户J1K2L3",
              amount: "3,000.00",
              currency: "USDT",
              guaranteeAmount: "300.00",
              guaranteeCurrency: "USDT",
              status: "进行中",
              time: "2024-01-15 18:20:00",
              tradeType: "数字货币交易",
              progress: "等待付款确认"
            },
            {
              id: "GP002",
              type: "付款担保",
              tradePartner: "用户M4N5O6",
              amount: "1,500.00",
              currency: "USDT",
              guaranteeAmount: "150.00",
              guaranteeCurrency: "USDT",
              status: "已完成",
              time: "2024-01-14 09:30:00",
              tradeType: "商品交易",
              progress: "交易完成"
            },
            {
              id: "GP003",
              type: "付款担保",
              tradePartner: "用户P7Q8R9",
              amount: "800.00",
              currency: "USDT",
              guaranteeAmount: "80.00",
              guaranteeCurrency: "USDT",
              status: "已取消",
              time: "2024-01-12 13:15:00",
              tradeType: "服务交易",
              progress: "用户取消"
            }
          ],
          credit: [
            {
              id: "GC001",
              type: "信用担保充值",
              amount: "10,000.00",
              currency: "USDT",
              creditLimit: "50,000.00",
              usedCredit: "15,000.00",
              availableCredit: "35,000.00",
              status: "已完成",
              time: "2024-01-15 10:00:00",
              purpose: "增加信用额度"
            },
            {
              id: "GC002",
              type: "信用担保使用",
              amount: "5,000.00",
              currency: "USDT",
              creditLimit: "50,000.00",
              usedCredit: "20,000.00",
              availableCredit: "30,000.00",
              status: "已完成",
              time: "2024-01-14 15:45:00",
              purpose: "担保交易GR001"
            },
            {
              id: "GC003",
              type: "信用担保释放",
              amount: "2,000.00",
              currency: "USDT",
              creditLimit: "50,000.00",
              usedCredit: "18,000.00",
              availableCredit: "32,000.00",
              status: "已完成",
              time: "2024-01-13 12:30:00",
              purpose: "担保交易GR002完成"
            }
          ]
        }
        return guaranteeData[secondaryTab] || []
      case "payment":
        // 支付订单数据从新的数据结构中获取
        const paymentData = orderRecordsData["支付订单"]
        return paymentData[secondaryTab] || []
      default:
        return []
    }
  }

  // 渲染订单记录内容
  const renderOrderContent = () => {
    const categoryKey = getCategoryKey(orderTab)
    const currentCategory = orderCategories[categoryKey]
    if (!currentCategory) return null

    const records = getOrderRecords(orderTab, secondaryTab)
    const cardStyle = isDark ? 'bg-[#1a1d29] text-white' : 'bg-white text-gray-900'

    return (
      <div className={`${cardStyle} rounded-lg overflow-hidden`}>
        {/* 二级页签导航 - 滑动页签组件 */}
        {currentCategory && Object.keys(currentCategory.tabs).length > 1 && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className={`relative flex rounded-lg p-1 overflow-hidden ${isDark ? 'bg-[#252842]' : 'bg-gray-200'}`}>
              {/* 滑动背景 */}
              {(() => {
                const tabKeys = Object.keys(currentCategory.tabs)
                const currentIndex = tabKeys.findIndex(key => key === secondaryTab)
                const tabWidth = 100 / tabKeys.length
                const leftPosition = currentIndex >= 0 ? currentIndex * tabWidth : 0
                
                return (
                  <div
                    className="absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out bg-white"
                    style={{
                      width: `${tabWidth}%`,
                      left: `${leftPosition}%`
                    }}
                  />
                )
              })()}
              
              {/* 页签按钮 */}
              {Object.entries(currentCategory.tabs).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSecondaryTab(key)}
                  className={`relative z-10 flex-1 px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    secondaryTab === key
                      ? "text-black"
                      : isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
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
            {/* 检索功能 */}
            {(() => {
              const getSearchFilters = (orderTabType: string, secondaryTabKey: string) => {
                // 首先检查是否是资金记录的特殊情况
                if (orderTabType === "资金记录") {
                  const tabMap = {
                    deposit: "入金记录",
                    withdraw: "出金记录", 
                    internal_transfer: "内转记录",
                    transfer: "划转记录",
                    commission: "佣金结算记录",
                    other: "其他记录"
                  }
                  const recordType = tabMap[secondaryTabKey]
                  
                  switch (recordType) {
                    case "入金记录":
                    case "出金记录":
                    case "内转记录":
                      return (
                        <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} mb-4`}>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                币种
                              </label>
                              <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                <option>全部</option>
                                <option>USDT</option>
                                <option>BTC</option>
                                <option>ETH</option>
                                <option>BNB</option>
                              </select>
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                状态
                              </label>
                              <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                <option>全部</option>
                                <option>已完成</option>
                                <option>处理中</option>
                                <option>失败</option>
                              </select>
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                时间
                              </label>
                              <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                <option>全部</option>
                                <option>今天</option>
                                <option>最近7天</option>
                                <option>最近30天</option>
                                <option>最近90天</option>
                              </select>
                            </div>
                            <div className="flex items-end gap-2">
                              <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                重置
                              </button>
                              <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                筛选
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    case "佣金结算记录":
                      return (
                        <div className="mb-4">
                          {/* 搜索框 */}
                          <div className="mb-4">
                            <input
                              type="text"
                              placeholder="搜索用户ID或用户名..."
                              value={commissionSearchTerm}
                              onChange={(e) => setCommissionSearchTerm(e.target.value)}
                              className={`w-full px-4 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                            />
                          </div>
                          
                          {/* 筛选条件 */}
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                佣金类型
                              </label>
                              <select 
                                value={commissionTypeFilter}
                                onChange={(e) => setCommissionTypeFilter(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                              >
                                <option>全部</option>
                                <option>合约佣金</option>
                                <option>理财佣金</option>
                                <option>U卡佣金</option>
                                <option>担保佣金</option>
                                <option>支付佣金</option>
                              </select>
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                推荐类型
                              </label>
                              <select 
                                value={commissionReferralFilter}
                                onChange={(e) => setCommissionReferralFilter(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                              >
                                <option>全部</option>
                                <option>直推</option>
                                <option>间推</option>
                              </select>
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                状态
                              </label>
                              <select 
                                value={commissionStatusFilter}
                                onChange={(e) => setCommissionStatusFilter(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                              >
                                <option>全部</option>
                                <option>已结算</option>
                                <option>结算中</option>
                                <option>已完成</option>
                              </select>
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                时间范围
                              </label>
                              <select 
                                value={commissionTimeFilter}
                                onChange={(e) => setCommissionTimeFilter(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                              >
                                <option>全部</option>
                                <option>今日</option>
                                <option>本周</option>
                                <option>本月</option>
                                <option>近三个月</option>
                              </select>
                            </div>
                            <div className="flex items-end gap-2">
                              <button 
                                onClick={() => {
                                  setCommissionSearchTerm("")
                                  setCommissionTypeFilter("全部")
                                  setCommissionReferralFilter("全部")
                                  setCommissionStatusFilter("全部")
                                  setCommissionTimeFilter("全部")
                                }}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}
                              >
                                重置
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    case "其他记录":
                      return (
                        <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} mb-4`}>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                币种
                              </label>
                              <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                <option>全部</option>
                                <option>USDT</option>
                                <option>BTC</option>
                                <option>ETH</option>
                                <option>BNB</option>
                                <option>ADA</option>
                                <option>SOL</option>
                              </select>
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                类型
                              </label>
                              <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                <option>全部</option>
                                <option>抵扣金</option>
                                <option>系统发放</option>
                                <option>系统减扣</option>
                                <option>期权交易</option>
                                <option>手续费</option>
                              </select>
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                时间
                              </label>
                              <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                <option>全部</option>
                                <option>今天</option>
                                <option>最近7天</option>
                                <option>最近30天</option>
                                <option>最近90天</option>
                              </select>
                            </div>
                            <div className="flex items-end gap-2">
                              <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                重置
                              </button>
                              <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                筛选
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    case "划转记录":
                      return (
                        <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} mb-4`}>
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                币种
                              </label>
                              <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                <option>全部</option>
                                <option>USDT</option>
                                <option>BTC</option>
                                <option>ETH</option>
                                <option>BNB</option>
                              </select>
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                划出账户
                              </label>
                              <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                <option>全部</option>
                                <option>现货账户</option>
                                <option>合约账户</option>
                                <option>理财账户</option>
                              </select>
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                划入账户
                              </label>
                              <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                <option>全部</option>
                                <option>现货账户</option>
                                <option>合约账户</option>
                                <option>理财账户</option>
                              </select>
                            </div>
                            <div>
                              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                时间
                              </label>
                              <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                <option>全部</option>
                                <option>今天</option>
                                <option>最近7天</option>
                                <option>最近30天</option>
                                <option>最近90天</option>
                              </select>
                            </div>
                            <div className="flex items-end gap-2">
                              <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                重置
                              </button>
                              <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                筛选
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    default:
                      return null
                  }
                }
                
                // 其他订单类型的通用检索
                switch (orderTabType) {
                  case "USDT买卖记录":
                    return (
                      <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} mb-4`}>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              类型
                            </label>
                            <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                              <option>全部</option>
                              <option>买入</option>
                              <option>卖出</option>
                            </select>
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              状态
                            </label>
                            <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                              <option>全部</option>
                              <option>已完成</option>
                              <option>处理中</option>
                              <option>已取消</option>
                            </select>
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              法币币种
                            </label>
                            <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                              <option>全部</option>
                              <option>CNY</option>
                              <option>USD</option>
                              <option>EUR</option>
                              <option>GBP</option>
                              <option>JPY</option>
                              <option>KRW</option>
                              <option>HKD</option>
                            </select>
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              时间
                            </label>
                            <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                              <option>全部</option>
                              <option>今天</option>
                              <option>最近7天</option>
                              <option>最近30天</option>
                              <option>最近90天</option>
                            </select>
                          </div>
                          <div className="flex items-end gap-2">
                            <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                              重置
                            </button>
                            <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                              筛选
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  case "理财订单":
                    return (
                      <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} mb-4`}>
                        {(() => {
                          // 根据不同页签显示不同的搜索选项
                          if (secondaryTabKey === 'invest') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    产品
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>USDT理财</option>
                                    <option>BTC定期</option>
                                    <option>ETH流动性</option>
                                    <option>DeFi挖矿</option>
                                    <option>双币投资</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    币种
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>USDT</option>
                                    <option>BTC</option>
                                    <option>ETH</option>
                                    <option>BNB</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    状态
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>投资中</option>
                                    <option>已到期</option>
                                    <option>已赎回</option>
                                    <option>已取消</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    日期
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>今天</option>
                                    <option>最近7天</option>
                                    <option>最近30天</option>
                                    <option>最近90天</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          } else if (secondaryTabKey === 'exchange') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    兑换类型
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>USDT转BTC</option>
                                    <option>BTC转USDT</option>
                                    <option>ETH转USDT</option>
                                    <option>法币兑换</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    币种
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>USDT</option>
                                    <option>BTC</option>
                                    <option>ETH</option>
                                    <option>BNB</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    状态
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>兑换成功</option>
                                    <option>兑换中</option>
                                    <option>兑换失败</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          } else if (secondaryTabKey === 'earnings') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    币种
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>USDT</option>
                                    <option>BTC</option>
                                    <option>ETH</option>
                                    <option>BNB</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    收益类型
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>日收益</option>
                                    <option>周收益</option>
                                    <option>月收益</option>
                                    <option>到期收益</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    日期
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>今天</option>
                                    <option>最近7天</option>
                                    <option>最近30天</option>
                                    <option>最近90天</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          } else if (secondaryTabKey === 'account') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    操作类型
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>转入</option>
                                    <option>转出</option>
                                    <option>收益发放</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    币种
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>USDT</option>
                                    <option>BTC</option>
                                    <option>ETH</option>
                                    <option>BNB</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    相关账户
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>现货账户</option>
                                    <option>合约账户</option>
                                    <option>资金账户</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          } else if (secondaryTabKey === 'commission') {
                            // 佣金结算记录的专门筛选功能
                            return (
                              <div className="mb-4">
                                {/* 搜索框 */}
                                <div className="mb-4">
                                  <input
                                    type="text"
                                    placeholder="搜索用户ID或用户名..."
                                    value={commissionSearchTerm}
                                    onChange={(e) => setCommissionSearchTerm(e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                                  />
                                </div>
                                
                                {/* 筛选条件 */}
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                  <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                      佣金类型
                                    </label>
                                    <select 
                                      value={commissionTypeFilter}
                                      onChange={(e) => setCommissionTypeFilter(e.target.value)}
                                      className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                    >
                                      <option>全部</option>
                                      <option>合约佣金</option>
                                      <option>理财佣金</option>
                                      <option>U卡佣金</option>
                                      <option>担保佣金</option>
                                      <option>支付佣金</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                      推荐类型
                                    </label>
                                    <select 
                                      value={commissionReferralFilter}
                                      onChange={(e) => setCommissionReferralFilter(e.target.value)}
                                      className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                    >
                                      <option>全部</option>
                                      <option>直推</option>
                                      <option>间推</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                      状态
                                    </label>
                                    <select 
                                      value={commissionStatusFilter}
                                      onChange={(e) => setCommissionStatusFilter(e.target.value)}
                                      className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                    >
                                      <option>全部</option>
                                      <option>已结算</option>
                                      <option>结算中</option>
                                      <option>已完成</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                      时间范围
                                    </label>
                                    <select 
                                      value={commissionTimeFilter}
                                      onChange={(e) => setCommissionTimeFilter(e.target.value)}
                                      className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                                    >
                                      <option>全部</option>
                                      <option>今日</option>
                                      <option>本周</option>
                                      <option>本月</option>
                                      <option>近三个月</option>
                                    </select>
                                  </div>
                                  <div className="flex items-end gap-2">
                                    <button 
                                      onClick={() => {
                                        setCommissionSearchTerm("")
                                        setCommissionTypeFilter("全部")
                                        setCommissionReferralFilter("全部")
                                        setCommissionStatusFilter("全部")
                                        setCommissionTimeFilter("全部")
                                      }}
                                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}
                                    >
                                      重置
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          
                          // 默认搜索选项
                          return (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  类型
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>投资</option>
                                  <option>兑换</option>
                                  <option>收益</option>
                                </select>
                              </div>
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  币种
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>USDT</option>
                                  <option>BTC</option>
                                  <option>ETH</option>
                                  <option>BNB</option>
                                </select>
                              </div>
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  时间
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>今天</option>
                                  <option>最近7天</option>
                                  <option>最近30天</option>
                                  <option>最近90天</option>
                                </select>
                              </div>
                              <div className="flex items-end gap-2">
                                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                  重置
                                </button>
                                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                  筛选
                                </button>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )
                  case "佣金记录":
                    return (
                      <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} mb-4`}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              类型
                            </label>
                            <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                              <option>全部</option>
                              <option>交易返佣</option>
                              <option>邀请返佣</option>
                              <option>奖励佣金</option>
                            </select>
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              币种
                            </label>
                            <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                              <option>全部</option>
                              <option>USDT</option>
                              <option>BTC</option>
                              <option>ETH</option>
                            </select>
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              时间
                            </label>
                            <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                              <option>全部</option>
                              <option>今天</option>
                              <option>最近7天</option>
                              <option>最近30天</option>
                              <option>最近90天</option>
                            </select>
                          </div>
                          <div className="flex items-end gap-2">
                            <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                              重置
                            </button>
                            <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                              筛选
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  case "U卡订单":
                    return (
                      <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} mb-4`}>
                        {(() => {
                          // 根据不同页签显示不同的搜索选项
                          if (secondaryTabKey === 'open') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    卡片类型
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>Visa虚拟卡</option>
                                    <option>Mastercard虚拟卡</option>
                                    <option>Visa实体卡</option>
                                    <option>Mastercard实体卡</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    地区
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>欧洲</option>
                                    <option>美国</option>
                                    <option>香港</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    状态
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>激活成功</option>
                                    <option>制卡中</option>
                                    <option>已寄出</option>
                                    <option>申请失败</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          } else if (secondaryTabKey === 'recharge') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    币种
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>USDT</option>
                                    <option>BTC</option>
                                    <option>ETH</option>
                                    <option>BNB</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    卡号
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部卡片</option>
                                    <option>****1234</option>
                                    <option>****5678</option>
                                    <option>****9012</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    状态
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>已完成</option>
                                    <option>处理中</option>
                                    <option>失败</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          } else if (secondaryTabKey === 'consume') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    商户
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>Amazon</option>
                                    <option>Netflix</option>
                                    <option>Apple Store</option>
                                    <option>Google Play</option>
                                    <option>AWS</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    消费类别
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>购物</option>
                                    <option>娱乐</option>
                                    <option>云服务</option>
                                    <option>应用服务</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    消费地区
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>美国</option>
                                    <option>欧洲</option>
                                    <option>亚洲</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    状态
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>已完成</option>
                                    <option>处理中</option>
                                    <option>失败</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          } else if (secondaryTabKey === 'refund') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    提取币种
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>USD</option>
                                    <option>EUR</option>
                                    <option>GBP</option>
                                    <option>JPY</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    目标账户
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>现货账户</option>
                                    <option>理财账户</option>
                                    <option>合约账户</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    状态
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>已完成</option>
                                    <option>处理中</option>
                                    <option>失败</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          }
                          
                          // 默认搜索选项
                          return (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  类型
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>消费</option>
                                  <option>充值</option>
                                  <option>提现</option>
                                  <option>退款</option>
                                </select>
                              </div>
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  状态
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>已完成</option>
                                  <option>处理中</option>
                                  <option>已取消</option>
                                  <option>失败</option>
                                </select>
                              </div>
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  时间
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>今天</option>
                                  <option>最近7天</option>
                                  <option>最近30天</option>
                                  <option>最近90天</option>
                                </select>
                              </div>
                              <div className="flex items-end gap-2">
                                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                  重置
                                </button>
                                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                  筛选
                                </button>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )
                  case "担保记录":
                    return (
                      <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} mb-4`}>
                        {(() => {
                          // 根据不同页签显示不同的搜索选项
                          if (secondaryTabKey === 'receive' || secondaryTabKey === 'payment') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    交易类型
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>数字货币交易</option>
                                    <option>NFT交易</option>
                                    <option>商品交易</option>
                                    <option>服务交易</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    币种
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>USDT</option>
                                    <option>BTC</option>
                                    <option>ETH</option>
                                    <option>BNB</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    状态
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>进行中</option>
                                    <option>等待确认</option>
                                    <option>已完成</option>
                                    <option>争议中</option>
                                    <option>已取消</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          } else if (secondaryTabKey === 'credit') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    操作类型
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>信用担保充值</option>
                                    <option>信用担保使用</option>
                                    <option>信用担保释放</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    币种
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>USDT</option>
                                    <option>BTC</option>
                                    <option>ETH</option>
                                    <option>BNB</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    状态
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>已完成</option>
                                    <option>处理中</option>
                                    <option>失败</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          }
                          
                          // 默认搜索选项
                          return (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  类型
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>担保交易</option>
                                  <option>信用担保</option>
                                </select>
                              </div>
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  状态
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>进行中</option>
                                  <option>已完成</option>
                                  <option>争议中</option>
                                  <option>已取消</option>
                                </select>
                              </div>
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  时间
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>今天</option>
                                  <option>最近7天</option>
                                  <option>最近30天</option>
                                  <option>最近90天</option>
                                </select>
                              </div>
                              <div className="flex items-end gap-2">
                                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                  重置
                                </button>
                                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                  筛选
                                </button>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )
                  case "支付订单":
                    return (
                      <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} mb-4`}>
                        {(() => {
                          // 根据不同页签显示不同的搜索选项
                          if (secondaryTabKey === 'fiatReceive' || secondaryTabKey === 'fiatPay') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    商户
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>电商平台A</option>
                                    <option>游戏平台B</option>
                                    <option>在线教育C</option>
                                    <option>供应商A</option>
                                    <option>服务商B</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    币种
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>CNY</option>
                                    <option>USD</option>
                                    <option>EUR</option>
                                    <option>GBP</option>
                                    <option>JPY</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    支付渠道
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>支付宝</option>
                                    <option>微信支付</option>
                                    <option>银行转账</option>
                                    <option>信用卡</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          } else if (secondaryTabKey === 'cryptoReceive' || secondaryTabKey === 'cryptoPay') {
                            return (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    商户
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>NFT市场A</option>
                                    <option>DeFi平台B</option>
                                    <option>交易所C</option>
                                    <option>矿池A</option>
                                    <option>游戏公会B</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    币种
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>USDT</option>
                                    <option>BTC</option>
                                    <option>ETH</option>
                                    <option>BNB</option>
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    网络
                                  </label>
                                  <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                    <option>全部</option>
                                    <option>TRC20</option>
                                    <option>ERC20</option>
                                    <option>Bitcoin</option>
                                    <option>Ethereum</option>
                                    <option>BSC</option>
                                  </select>
                                </div>
                                <div className="flex items-end gap-2">
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                    重置
                                  </button>
                                  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                    筛选
                                  </button>
                                </div>
                              </div>
                            )
                          }
                          
                          // 默认搜索选项
                          return (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  类型
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>法币支付</option>
                                  <option>加密货币支付</option>
                                </select>
                              </div>
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  状态
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>已完成</option>
                                  <option>处理中</option>
                                  <option>已确认</option>
                                  <option>确认中</option>
                                  <option>已发送</option>
                                </select>
                              </div>
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  时间
                                </label>
                                <select className={`w-full px-3 py-2 border rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
                                  <option>全部</option>
                                  <option>今天</option>
                                  <option>最近7天</option>
                                  <option>最近30天</option>
                                  <option>最近90天</option>
                                </select>
                              </div>
                              <div className="flex items-end gap-2">
                                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border-2 ${isDark ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-gray-50'}`}>
                                  重置
                                </button>
                                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                  筛选
                                </button>
                              </div>
                            </div>
                          )
                        })()}
                      </div>
                    )
                  default:
                    return null
                }
              }
              
              return getSearchFilters(orderTab, secondaryTab)
            })()}

            {/* 理财账户记录特殊提示 */}
            {orderTab === "理财订单" && secondaryTab === "account" ? (
              <div className={`p-6 rounded-lg border ${isDark ? 'border-red-600/20 bg-red-900/10' : 'border-red-200 bg-red-50'} text-center`}>
                <div className={`text-sm ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                  本页面使用原交易所——现货账户——资金记录——理财账户中的页面
                </div>
              </div>
            ) : (
              <>
                {/* PC端表格视图 */}
                <div className="hidden md:block">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                  <thead>
                    <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      {(() => {
                        // 获取通用表头配置
                        const getGenericHeaders = (orderTabType: string, secondaryTabKey: string) => {
                          // 首先检查是否是资金记录的特殊情况
                          if (orderTabType === "资金记录") {
                            const tabMap = {
                              deposit: "入金记录",
                              withdraw: "出金记录", 
                              internal_transfer: "内转记录",
                              transfer: "划转记录",
                              commission: "佣金结算记录"
                            }
                            const recordType = tabMap[secondaryTabKey]
                            
                            switch (recordType) {
                              case "入金记录":
                                return ['时间', '币种', '数量', '地址/收款账号', '交易哈希', '状态']
                              case "出金记录":
                                return ['时间', '币种', '数量', '提币网络', '地址/收款账号', '交易哈希', '状态']
                              case "内转记录":
                                return ['时间', '币种', '转入/转出', '数量', '状态']
                              case "划转记录":
                                return ['时间', '币种', '划出账户', '划入账户', '数量']
                              case "佣金结算记录":
                                return ['结算时间', '交易类型', '币种', '结算金额', '到账金额', '到账币种', '状态', '备注']
                              case "其他记录":
                                return ['时间', '币种', '数量', '类型', '备注']
                            }
                          }
                          
                          // 其他订单类型的通用表头
                          switch (orderTabType) {
                            case "USDT买卖记录":
                              // 根据不同页签返回不同的表头
                              if (secondaryTab === 'c2c') {
                                return ['时间', '类型', '数量', '价格', '总金额', '支付方式', '交易对象', '状态']
                              } else if (secondaryTab === 'quick') {
                                return ['时间', '类型', '数量', '价格', '总金额', '支付方式', '手续费', '状态']
                              } else if (secondaryTab === 'otc') {
                                return ['时间', '类型', '数量', '价格', '总金额', '支付方式', '供应商', '状态']
                              }
                              return ['时间', '类型', '数量', '价格', '总金额', '支付方式', '状态']
                            case "现货订单":
                              return ['时间', '交易对', '类型', '数量', '价格', '成交金额', '手续费', '状态']
                            case "合约订单":
                              return ['时间', '合约', '方向', '数量', '开仓价', '平仓价', '盈亏', '状态']
                            case "理财订单":
                              // 根据不同页签返回不同的表头
                              if (secondaryTabKey === 'invest') {
                                return ['理财产品', '质押价值', '质押数量', '收益数量', '质押档位', '预计赎回', '到期时间', '状态', '操作']
                              } else if (secondaryTabKey === 'exchange') {
                                return ['时间', '兑换类型', '兑换金额', '兑换汇率', '手续费', '状态']
                              } else if (secondaryTabKey === 'earnings') {
                                return ['时间', '币种', '数量', '类型', '操作']
                              } else if (secondaryTabKey === 'account') {
                                return ['时间', '类型', '币种', '金额', '相关账户', '状态']
                              }
                              return ['时间', '类型', '金额', '状态']
                            case "佣金记录":
                              return ['结算时间', '结算金额', '到账金额', '结算状态']
                            case "佣金结算记录":
                              return ['结算时间', '交易类型', '币种', '结算金额', '到账金额', '到账币种', '状态', '备注']
                            case "U卡订单":
                              // 根据不同页签返回不同的表头
                              if (secondaryTabKey === 'open') {
                                return ['时间', '类型', '卡号', '卡片类型', '地区', '手续费', '状态']
                              } else if (secondaryTabKey === 'recharge') {
                                return ['时间', '类型', '卡号', '金额', '币种', '到账金额', '到账币种', '状态']
                              } else if (secondaryTabKey === 'consume') {
                                return ['时间', '类型', '商户', '卡号', '金额', '消费地区', '状态']
                              } else if (secondaryTabKey === 'refund') {
                                return ['时间', '类型', '卡号', '提取金额', '到账金额', '到账币种', '目标账户', '状态']
                              }
                              return ['时间', '类型', '商户', '金额', '币种', '卡号', '状态']
                            case "担保记录":
                              // 根据不同页签返回不同的表头
                              if (secondaryTabKey === 'receive') {
                                return ['时间', '类型', '交易对象', '交易金额', '担保金额', '交易类型', '进度', '状态']
                              } else if (secondaryTabKey === 'payment') {
                                return ['时间', '类型', '交易对象', '交易金额', '担保金额', '交易类型', '进度', '状态']
                              } else if (secondaryTabKey === 'credit') {
                                return ['时间', '类型', '金额', '信用额度', '已用额度', '可用额度', '用途', '状态']
                              }
                              return ['时间', '类型', '金额', '状态']
                            case "支付订单":
                              // 根据不同页签返回不同的表头
                              if (secondaryTabKey === 'fiatReceive') {
                                return ['时间', '类型', '商户', '客户姓名', '金额', '支付渠道', '银行账户', '手续费', '结算状态', '状态']
                              } else if (secondaryTabKey === 'fiatPay') {
                                return ['时间', '类型', '商户', '收款人', '金额', '支付渠道', '银行账户', '手续费', '用途', '状态']
                              } else if (secondaryTabKey === 'cryptoReceive') {
                                return ['时间', '类型', '商户', '客户钱包', '金额', '网络', '交易哈希', '手续费', '确认数', '状态']
                              } else if (secondaryTabKey === 'cryptoPay') {
                                return ['时间', '类型', '商户', '收款钱包', '金额', '网络', '交易哈希', '手续费', '用途', '状态']
                              }
                              return ['时间', '类型', '商户', '金额', '状态']
                            default:
                              return ['时间', '类型', '金额', '状态']
                          }
                        }
                        
                        const headers = getGenericHeaders(orderTab, secondaryTab)
                        return headers.map((header, index) => (
                          <th key={index} className={`px-4 py-3 text-left text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {header}
                          </th>
                        ))
                      })()}
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => {
                      // 获取通用单元格数据
                      const getGenericCellData = (orderTabType: string, secondaryTabKey: string, record: any) => {
                        // 首先检查是否是资金记录的特殊情况
                        if (orderTabType === "资金记录") {
                          const tabMap = {
                            deposit: "入金记录",
                            withdraw: "出金记录", 
                            internal_transfer: "内转记录",
                            transfer: "划转记录",
                            commission: "佣金结算记录"
                          }
                          const recordType = tabMap[secondaryTabKey]
                          
                          switch (recordType) {
                            case "入金记录":
                              return [record.time, record.currency, record.amount, record.address, record.txHash, record.status]
                            case "出金记录":
                              return [record.time, record.currency, record.amount, record.network, record.address, record.txHash, record.status]
                            case "内转记录":
                              return [record.time, record.currency, record.direction, record.amount, record.status]
                            case "划转记录":
                              return [record.time, record.currency, record.fromAccount, record.toAccount, record.amount]
                            case "佣金结算记录":
                              return [
                                record.settledTime || record.time, 
                                record.type, 
                                record.currency, 
                                `${record.commissionAmount} ${record.currency}`, 
                                `${record.creditAmount} ${record.creditCurrency}`, 
                                record.creditCurrency, 
                                record.status, 
                                record.remark
                              ]
                            case "其他记录":
                              return [record.time, record.currency, record.amount, record.type, record.remark]
                          }
                        }
                        
                        // 其他订单类型的通用数据
                        switch (orderTabType) {
                          case "USDT买卖记录":
                            // 根据不同页签返回不同的数据字段
                            if (secondaryTab === 'c2c') {
                              return [record.time, record.type, record.amount, record.price, record.total, record.method, record.counterparty, record.status]
                            } else if (secondaryTab === 'quick') {
                              return [record.time, record.type, record.amount, record.price, record.total, record.method, record.fee, record.status]
                            } else if (secondaryTab === 'otc') {
                              return [record.time, record.type, record.amount, record.price, record.total, record.method, record.provider, record.status]
                            }
                            return [record.time, record.type, record.amount, record.price, record.total, record.method, record.status]
                          case "理财订单":
                            // 根据不同页签返回不同的数据字段
                            if (secondaryTabKey === 'invest') {
                              return [record.product, record.pledgeValue, record.pledgeAmount, record.earnAmount, record.pledgeLevel, record.expectedRedeem, record.expireTime, record.status, '操作']
                            } else if (secondaryTabKey === 'exchange') {
                              return [record.time, record.type, record.fromAmount, record.rate, record.fee, record.status]
                            } else if (secondaryTabKey === 'earnings') {
                              return [record.time, record.currency, record.amount, record.type, '操作']
                            } else if (secondaryTabKey === 'account') {
                              return [record.time, record.type, record.currency, record.amount, record.fromAccount || record.toAccount || record.source, record.status]
                            }
                            return [record.time, record.type, record.amount, record.status]
                          case "佣金记录":
                            return [record.time, `${record.amount} ${record.currency}`, `${record.creditAmount || record.amount} ${record.creditCurrency || record.currency}`, record.status]
                          case "佣金结算记录":
                            return [
                              record.settledTime || record.time, 
                              record.type, 
                              record.currency, 
                              `${record.commissionAmount} ${record.currency}`, 
                              `${record.creditAmount} ${record.creditCurrency}`, 
                              record.creditCurrency, 
                              record.status, 
                              record.remark
                            ]
                          case "U卡订单":
                            // 根据不同页签返回不同的数据字段
                            if (secondaryTabKey === 'open') {
                              return [record.time, record.type, record.cardNumber, record.cardType, record.region, record.fee, record.status]
                            } else if (secondaryTabKey === 'recharge') {
                              return [record.time, record.type, record.cardNumber, `${record.amount} ${record.currency}`, record.currency, `${record.creditAmount} ${record.creditCurrency}`, record.creditCurrency, record.status]
                            } else if (secondaryTabKey === 'consume') {
                              return [record.time, record.type, record.merchant, record.cardNumber, `${record.amount} ${record.currency}`, record.location, record.status]
                            } else if (secondaryTabKey === 'refund') {
                              return [record.time, record.type, record.cardNumber, `${record.amount} ${record.currency}`, `${record.creditAmount} ${record.creditCurrency}`, record.creditCurrency, record.toAccount, record.status]
                            }
                            return [record.time, record.type, record.merchant, `${record.amount} ${record.currency}`, record.currency, record.cardNumber, record.status]
                          case "担保记录":
                            // 根据不同页签返回不同的数据字段
                            if (secondaryTabKey === 'receive') {
                              return [record.time, record.type, record.tradePartner, `${record.amount} ${record.currency}`, `${record.guaranteeAmount} ${record.guaranteeCurrency}`, record.tradeType, record.progress, record.status]
                            } else if (secondaryTabKey === 'payment') {
                              // 担保付款记录特殊处理：进行中状态显示按钮
                              const statusDisplay = record.status === '进行中' ? 
                                <button className={`px-3 py-1 rounded text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}>
                                  确认付款
                                </button> : record.status
                              return [record.time, record.type, record.tradePartner, `${record.amount} ${record.currency}`, `${record.guaranteeAmount} ${record.guaranteeCurrency}`, record.tradeType, record.progress, statusDisplay]
                            } else if (secondaryTabKey === 'credit') {
                              return [record.time, record.type, `${record.amount} ${record.currency}`, `${record.creditLimit} ${record.currency}`, `${record.usedCredit} ${record.currency}`, `${record.availableCredit} ${record.currency}`, record.purpose, record.status]
                            }
                            return [record.time, record.type, record.amount, record.status]
                          case "支付订单":
                            // 根据不同页签返回不同的数据字段
                            if (secondaryTabKey === 'fiatReceive') {
                              return [record.time, record.type, record.merchant, record.customerName, `${record.amount} ${record.currency}`, record.channel, record.bankAccount, record.fee, record.settlement, record.status]
                            } else if (secondaryTabKey === 'fiatPay') {
                              return [record.time, record.type, record.merchant, record.recipientName, `${record.amount} ${record.currency}`, record.channel, record.bankAccount, record.fee, record.purpose, record.status]
                            } else if (secondaryTabKey === 'cryptoReceive') {
                              return [record.time, record.type, record.merchant, record.customerWallet, `${record.amount} ${record.currency}`, record.network, record.txHash, record.fee, record.confirmations, record.status]
                            } else if (secondaryTabKey === 'cryptoPay') {
                              return [record.time, record.type, record.merchant, record.recipientWallet, `${record.amount} ${record.currency}`, record.network, record.txHash, record.fee, record.purpose, record.status]
                            }
                            return [record.time, record.type, record.merchant, `${record.amount} ${record.currency}`, record.status]
                          default:
                            return Object.values(record).slice(0, 4) // 取前4个值作为默认显示
                        }
                      }
                      
                      const cellData = getGenericCellData(orderTab, secondaryTab, record)
                      
                      return (
                        <tr key={index} className={`border-b ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
                          {cellData.map((cell, cellIndex) => (
                            <td key={cellIndex} className={`px-4 py-3 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {typeof cell === 'object' ? JSON.stringify(cell) : (cell || '-')}
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

                {/* 移动端卡片视图 */}
                <div className="md:hidden space-y-3">
                  {records.map((record, index) => (
                    <div key={record.id || index} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {Object.entries(record).map(([key, value]) => (
                          <div key={key}>
                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                              {key === 'id' ? 'ID' : 
                               key === 'type' ? '类型' :
                               key === 'amount' ? '金额' :
                               key === 'status' ? '状态' :
                               key === 'time' ? '时间' :
                               key === 'currency' ? '币种' :
                               key === 'address' ? '地址/收款账号' :
                               key === 'txHash' ? '交易哈希' :
                               key === 'network' ? '提币网络' :
                               key === 'direction' ? '转入/转出' :
                               key === 'fromAccount' ? '划出账户' :
                               key === 'toAccount' ? '划入账户' :
                               key === 'source' ? '来源' :
                               key === 'rate' ? '费率' :
                               key === 'price' ? '价格' :
                               key === 'total' ? '总金额' :
                               key === 'method' ? '支付方式' :
                               key === 'merchant' ? '商户' :
                               key === 'counterparty' ? '交易对象' :
                               key === 'fee' ? '手续费' :
                               key === 'provider' ? '供应商' :
                               key === 'fiatCurrency' ? '法币币种' :
                               key === 'source' ? '来源' :
                               key === 'description' ? '描述' :
                               key === 'remark' ? '备注' :
                               key === 'product' ? '理财产品' :
                               key === 'apy' ? '年化收益' :
                               key === 'earnings' ? '当前收益' :
                               key === 'fromAmount' ? '兑换金额' :
                               key === 'toAmount' ? '兑换数量' :
                               key === 'rate' ? '兑换汇率' :
                               key === 'cardNumber' ? '卡号' :
                               key === 'cardType' ? '卡片类型' :
                               key === 'category' ? '类别' :
                               key === 'region' ? '地区' :
                               key === 'location' ? '消费地区' :
                               key === 'reason' ? '退款原因' :
                               key === 'originalOrderId' ? '原订单号' :
                               key === 'creditAmount' ? '到账金额' :
                               key === 'creditCurrency' ? '到账币种' :
                               key === 'toAccount' ? '目标账户' :
                               key === 'exchangeRate' ? '汇率' :
                               key === 'tradePartner' ? '交易对象' :
                               key === 'guaranteeAmount' ? '担保金额' :
                               key === 'guaranteeCurrency' ? '担保币种' :
                               key === 'tradeType' ? '交易类型' :
                               key === 'progress' ? '进度' :
                               key === 'creditLimit' ? '信用额度' :
                               key === 'usedCredit' ? '已用额度' :
                               key === 'availableCredit' ? '可用额度' :
                               key === 'purpose' ? '用途' :
                               key === 'customerName' ? '客户姓名' :
                               key === 'recipientName' ? '收款人' :
                               key === 'recipientWallet' ? '收款钱包' :
                               key === 'customerWallet' ? '客户钱包' :
                               key === 'channel' ? '支付渠道' :
                               key === 'bankAccount' ? '银行账户' :
                               key === 'settlement' ? '结算状态' :
                               key === 'txHash' ? '交易哈希' :
                               key === 'confirmations' ? '确认数' :
                               key === 'orderNo' ? '订单号' : key}
                            </div>
                            <div className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium break-all`}>
                              {typeof value === 'object' ? JSON.stringify(value) : (value || '-')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {/* 支付订单页面底部红色提示 */}
            {orderTab === "支付订单" && (
              <div className="mt-6 p-4 rounded-lg border-l-4 border-red-500 bg-red-50/80 dark:bg-red-900/20">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      这个页面的列表需要按照Bepay商户后台的订单页面设计
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-gray-50'}`}>
      {isMobile ? (
        <div className="relative">{/* Mobile Layout - Top Header with Hamburger Menu */}
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4">
            {/* 左侧汉堡菜单按钮和标题 */}
            <div className="flex items-center space-x-3">
              <button
                onClick={openMobileSidebar}
                className={`w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110 group ${
                  isDark 
                    ? 'text-white hover:text-gray-300' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <Menu className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
              </button>
              
              {/* 当前页面标题 */}
              <h1 className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {topLevelTab === "账户资产" 
                  ? walletTabs.find(tab => tab.id === activeTab)?.label || "钱包总览"
                  : orderTabs.find(tab => tab.id === orderTab)?.label || "资金记录"
                }
              </h1>
            </div>

            {/* 右侧顶级页签导航 - 移动端文字+下划线样式 */}
            <div className="flex items-center space-x-6">
              {["账户资产", "订单记录"].map((tab) => (
                <button
                  key={tab}
                  className={`relative pb-1 transition-all duration-300 ${
                    topLevelTab === tab
                      ? isDark ? "text-base font-bold text-white" : "text-base font-bold text-gray-900"
                      : isDark
                      ? "text-sm font-medium text-gray-400 hover:text-gray-200"
                      : "text-sm font-medium text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setTopLevelTab(tab)}
                >
                  {tab}
                  {/* 下划线 */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
                      topLevelTab === tab
                        ? isDark ? "h-1 bg-white" : "h-1 bg-gray-900"
                        : "h-0 bg-transparent"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {showMobileSidebar && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div 
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                  mobileSidebarAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
                }`}
                onClick={closeMobileSidebar} 
              />
              <div className={`fixed top-0 left-0 h-full w-80 ${isDark ? 'bg-[#1a1d29]' : 'bg-white'} shadow-xl transform transition-transform duration-300 ease-out ${
                mobileSidebarAnimating ? 'translate-x-0' : '-translate-x-full'
              }`}>
                {/* Sidebar Content - 直接内容无标题 */}
                <div className="p-4 pt-6">
                  {/* 账户资产菜单 */}
                  {topLevelTab === "账户资产" && (
                    <div className="space-y-1">
                      {walletTabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              handleTabChange(tab.id)
                              closeMobileSidebar()
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                              activeTab === tab.id
                                ? "border-[#00D4AA] text-[#00D4AA] bg-[#00D4AA]/5 shadow-sm scale-105"
                                : isDark
                                  ? "border-transparent text-gray-300 hover:text-white hover:bg-[#252842]"
                                  : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{tab.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}

                  {/* 订单记录菜单 */}
                  {topLevelTab === "订单记录" && (
                    <div className="space-y-1">
                      {orderTabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              handleOrderTabChange(tab.id)
                              closeMobileSidebar()
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                              orderTab === tab.id
                                ? "border-[#00D4AA] text-[#00D4AA] bg-[#00D4AA]/5 shadow-sm scale-105"
                                : isDark
                                  ? "border-transparent text-gray-300 hover:text-white hover:bg-[#252842]"
                                  : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{tab.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Mobile Content Container */}
          <div className="container mx-auto p-4 space-y-6">
            {/* Content */}
            <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {topLevelTab === "账户资产" ? renderTabContent() : renderOrderContent()}
            </div>
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

      {/* 币种选择弹窗 - PC从右侧滑出，移动端从底部滑出 */}
      {showCurrencyModal && (
        <div className="fixed inset-0 z-50">
          {/* 背景遮罩 */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              currencyModalAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            onClick={closeCurrencyModal}
          />
          {/* 弹窗容器 - 响应式定位 */}
          <div className={`absolute ${cardStyle} transition-all duration-300 ease-out 
            md:right-0 md:top-0 md:h-full md:w-80 md:max-w-[90vw] ${
              currencyModalAnimating ? 'md:translate-x-0' : 'md:translate-x-full'
            }
            max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:max-h-[80vh] max-md:rounded-t-2xl ${
              currencyModalAnimating ? 'max-md:translate-y-0' : 'max-md:translate-y-full'
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

      {/* 添加资产弹窗 - PC从右侧滑出，移动端从底部滑出 */}
      {showAddAssetModal && (
        <div className="fixed inset-0 z-50">
          {/* 背景遮罩 */}
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              addAssetModalAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            onClick={closeAddAssetModal}
          />
          {/* 弹窗容器 - 响应式定位 */}
          <div className={`absolute ${cardStyle} transition-all duration-300 ease-out 
            md:right-0 md:top-0 md:h-full md:w-96 md:max-w-[90vw] ${
              addAssetModalAnimating ? 'md:translate-x-0' : 'md:translate-x-full'
            }
            max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:max-h-[80vh] max-md:rounded-t-2xl ${
              addAssetModalAnimating ? 'max-md:translate-y-0' : 'max-md:translate-y-full'
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

              {/* 手续费说明 */}
              <div className="mb-4">
                <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#2a2d42] border-[#3a3d4a]' : 'bg-orange-50 border-orange-200'}`}>
                  <div className={`text-sm font-medium ${isDark ? 'text-orange-400' : 'text-orange-700'} mb-2`}>
                    手续费明细
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        充值金额
                      </span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {standbyRechargeAmount || "0"} {standbyRechargeTab === "法币充值" ? standbyRechargeCurrency : "USDT"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        平台手续费 (0.5%)
                      </span>
                      <span className={isDark ? 'text-orange-400' : 'text-orange-600'}>
                        -{standbyRechargeAmount ? (parseFloat(standbyRechargeAmount) * 0.005).toFixed(4) : "0"} {standbyRechargeTab === "法币充值" ? standbyRechargeCurrency : "USDT"}
                      </span>
                    </div>
                    <div className={`flex justify-between items-center text-sm font-medium pt-1 border-t ${isDark ? 'border-gray-600' : 'border-orange-200'}`}>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        实际到账
                      </span>
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>
                        {standbyRechargeAmount ? (parseFloat(standbyRechargeAmount) * 0.995).toFixed(4) : "0"} {standbyRechargeTab === "法币充值" ? standbyRechargeCurrency : "USDT"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

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

      {/* 立即确认弹窗 */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowConfirmDialog(false)}>
          <div 
            className={`max-w-md w-full mx-4 rounded-2xl shadow-xl ${
              isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 弹窗头部 */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  确认交易
                </h3>
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* 弹窗内容 */}
            <div className="p-6 space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
                <div className={`text-sm ${isDark ? 'text-red-300' : 'text-red-800'}`}>
                  ⚠️ 重要提醒
                </div>
                <div className={`text-sm mt-2 ${isDark ? 'text-red-200' : 'text-red-700'}`}>
                  如果确认，则交易资金会解除担保，对方将收到这一笔钱！
                </div>
              </div>

              <div className="space-y-3">
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="font-medium">交易金额：</span>
                  <span className="font-bold text-green-500">{confirmTransactionInfo.amount} {confirmTransactionInfo.currency}</span>
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span className="font-medium">交易对象：</span>
                  <span>{confirmTransactionInfo.partner}</span>
                </div>
              </div>
            </div>

            {/* 弹窗按钮 */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                  isDark 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                取消
              </button>
              <button
                onClick={() => {
                  // 确认交易逻辑
                  console.log('确认交易:', confirmTransactionInfo);
                  setShowConfirmDialog(false);
                  // 这里可以添加成功提示和更新交易状态
                }}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 资金分布弹窗 */}
      {showFundDistribution && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-2xl ${isDark ? 'bg-[#1a1d29]' : 'bg-white'} shadow-2xl border ${isDark ? 'border-[#252842]' : 'border-gray-200'} overflow-hidden`}>
            {/* 弹窗头部 */}
            <div className={`px-6 py-4 border-b ${isDark ? 'border-[#252842]' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  资金分布
                </h3>
                <button
                  onClick={() => setShowFundDistribution(false)}
                  className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>

            {/* 弹窗内容 */}
            <div className="px-6 py-6">
              {/* 总资产 */}
              <div className={`text-center mb-6 p-4 rounded-lg ${isDark ? 'bg-[#252842]' : 'bg-gray-50'}`}>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
                  总资产
                </div>
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  5,679.00 USDT
                </div>
              </div>

              {/* 饼图区域 */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  {/* 简化的饼图显示 */}
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* 虚拟卡1 - 39% */}
                    <circle cx="50" cy="50" r="25" fill="none" stroke="#00D4AA" strokeWidth="20" 
                           strokeDasharray="61.26 96.3" strokeDashoffset="0" />
                    {/* 虚拟卡2 - 23% */}
                    <circle cx="50" cy="50" r="25" fill="none" stroke="#3B82F6" strokeWidth="20" 
                           strokeDasharray="36.19 121.37" strokeDashoffset="-61.26" />
                    {/* 实体卡 - 21% */}
                    <circle cx="50" cy="50" r="25" fill="none" stroke="#F59E0B" strokeWidth="20" 
                           strokeDasharray="33.06 124.5" strokeDashoffset="-97.45" />
                    {/* 余额 - 17% */}
                    <circle cx="50" cy="50" r="25" fill="none" stroke="#EF4444" strokeWidth="20" 
                           strokeDasharray="26.7 130.86" strokeDashoffset="-130.51" />
                  </svg>
                  
                  {/* 中心文字 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <div className="text-sm font-medium">U卡资金</div>
                      <div className="text-xs text-gray-500">分布情况</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 图例 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#00D4AA] mr-3"></div>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>虚拟卡1</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>2,222.22 USDT</div>
                    <div className="text-xs text-gray-500">39%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#3B82F6] mr-3"></div>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>虚拟卡2</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>1,306.11 USDT</div>
                    <div className="text-xs text-gray-500">23%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#F59E0B] mr-3"></div>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>实体卡</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>1,192.59 USDT</div>
                    <div className="text-xs text-gray-500">21%</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#EF4444] mr-3"></div>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>账户余额</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>958.08 USDT</div>
                    <div className="text-xs text-gray-500">17%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 弹窗底部 */}
            <div className={`px-6 py-4 border-t ${isDark ? 'border-[#252842]' : 'border-gray-100'}`}>
              <Button
                onClick={() => setShowFundDistribution(false)}
                className={`w-full ${
                  isDark 
                    ? "bg-white text-black hover:bg-gray-200" 
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                知道了
              </Button>
            </div>
          </div>
        </div>
      )}



      {/* PIN码查看弹窗 */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPinModal(false)}>
          <div 
            className={`max-w-md w-full mx-4 rounded-2xl shadow-xl ${
              isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 弹窗头部 */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  查看卡片PIN码
                </h3>
                <button
                  onClick={() => setShowPinModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* 弹窗内容 */}
            <div className="p-6 space-y-4">
              {!showPin ? (
                <>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    为了保护您的卡片安全，请输入转账密码以查看PIN码
                  </div>
                  
                  <div className="space-y-3">
                    <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      转账密码
                    </label>
                    <input
                      type="password"
                      value={transferPassword}
                      onChange={(e) => setTransferPassword(e.target.value)}
                      placeholder="请输入6位转账密码"
                      maxLength={6}
                      className={`w-full px-3 py-3 rounded-lg border text-center font-mono tracking-widest ${
                        isDark 
                          ? 'bg-[#2a2d3a] border-[#3a3f54] text-white placeholder-gray-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      } focus:outline-none focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowPinModal(false)}
                      className="flex-1"
                    >
                      取消
                    </Button>
                    <Button
                      onClick={() => {
                        if (transferPassword === "123456") {
                          setShowPin(true)
                        } else {
                          alert("密码错误，请重试")
                        }
                      }}
                      disabled={transferPassword.length !== 6}
                      className="flex-1 bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-white"
                    >
                      确认
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className={`text-center py-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <div className="text-sm text-gray-500 mb-6">卡片PIN码</div>
                    <div className="flex justify-center mb-6">
                      <div className={`inline-flex items-center px-6 py-4 rounded-xl font-mono text-2xl font-bold tracking-wider ${
                        isDark ? 'bg-[#00D4AA]/20 text-[#00D4AA] border border-[#00D4AA]/30' : 'bg-[#00D4AA]/10 text-[#00D4AA] border border-[#00D4AA]/20'
                      }`}>
                        {selectedCardId === "card-1" ? "123" : 
                         selectedCardId === "card-2" ? "456" : "789"}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      请妥善保管PIN码，切勿泄露给他人
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => {
                      setShowPinModal(false)
                      setShowPin(false)
                      setTransferPassword("")
                    }}
                    className="w-full bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-white"
                  >
                    知道了
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 充值弹窗 */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowRechargeModal(false)}
          />
          <div className={`relative w-full max-w-md mx-4 p-6 rounded-xl ${
            isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'
          } shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                卡片充值
              </h3>
              <button
                onClick={() => setShowRechargeModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* 1. 卡类型选择页签 */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  选择卡类型
                </label>
                <div className={`relative flex rounded-lg p-1 ${isDark ? 'bg-[#252842]' : 'bg-gray-200'}`}>
                  <div
                    className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-black'}`}
                    style={{
                      width: '50%',
                      left: rechargeCardType === "virtual" ? '4px' : '50%'
                    }}
                  />
                  <button
                    className={`relative z-10 flex-1 text-sm font-medium py-2 transition-all duration-300 ${
                      rechargeCardType === "virtual"
                        ? isDark ? "text-black" : "text-white"
                        : isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    onClick={() => setRechargeCardType("virtual")}
                  >
                    虚拟卡
                  </button>
                  <button
                    className={`relative z-10 flex-1 text-sm font-medium py-2 transition-all duration-300 ${
                      rechargeCardType === "physical"
                        ? isDark ? "text-black" : "text-white"
                        : isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                    onClick={() => setRechargeCardType("physical")}
                  >
                    实体卡
                  </button>
                </div>
              </div>

              {/* 2. 卡片选择 */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  选择卡片
                </label>
                <div className="relative card-dropdown">
                  <button
                    type="button"
                    onClick={() => setShowCardDropdown(!showCardDropdown)}
                    className={`w-full px-3 py-2 border rounded-lg text-left flex items-center justify-between transition-all duration-200 ${
                      theme === "dark" 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white hover:border-[#4a4d5a]' 
                        : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400'
                    } ${showCardDropdown ? 'ring-2 ring-[#00D4AA] ring-opacity-50' : ''}`}
                  >
                    <span>
                      {rechargeCardType === "virtual" ? (
                        selectedRechargeCard === "shopping" ? "购物专用卡 - **** 1122" :
                        selectedRechargeCard === "travel" ? "旅行专用卡 - **** 3344" :
                        selectedRechargeCard === "entertainment" ? "娱乐专用卡 - **** 5432" :
                        selectedRechargeCard === "investment" ? "投资理财卡 - **** 9999" : "请选择卡片"
                      ) : (
                        selectedRechargeCard === "platinum" ? "白金卡 - **** 1234" :
                        selectedRechargeCard === "gold" ? "金卡 - **** 5678" :
                        selectedRechargeCard === "diamond" ? "钻石卡 - **** 9012" : "请选择卡片"
                      )}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showCardDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* 下拉菜单 */}
                  {showCardDropdown && (
                    <div className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg border animate-in fade-in-0 slide-in-from-top-2 duration-200 ${
                      theme === "dark" ? 'bg-[#252842] border-[#3a3d4a]' : 'bg-white border-gray-200'
                    }`}>
                      <div className="py-1 max-h-60 overflow-y-auto">
                        {rechargeCardType === "virtual" ? (
                          <>
                            <button
                              onClick={() => {
                                setSelectedRechargeCard("shopping")
                                setShowCardDropdown(false)
                              }}
                              className={`w-full px-3 py-2 text-left hover:bg-opacity-10 transition-all duration-150 ${
                                theme === "dark" 
                                  ? 'text-white hover:bg-white' 
                                  : 'text-gray-900 hover:bg-gray-900'
                              } ${selectedRechargeCard === "shopping" ? 'bg-[#00D4AA] bg-opacity-10 text-[#00D4AA]' : ''}`}
                            >
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                购物专用卡 - **** 1122
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRechargeCard("travel")
                                setShowCardDropdown(false)
                              }}
                              className={`w-full px-3 py-2 text-left hover:bg-opacity-10 transition-all duration-150 ${
                                theme === "dark" 
                                  ? 'text-white hover:bg-white' 
                                  : 'text-gray-900 hover:bg-gray-900'
                              } ${selectedRechargeCard === "travel" ? 'bg-[#00D4AA] bg-opacity-10 text-[#00D4AA]' : ''}`}
                            >
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                旅行专用卡 - **** 3344
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRechargeCard("entertainment")
                                setShowCardDropdown(false)
                              }}
                              className={`w-full px-3 py-2 text-left hover:bg-opacity-10 transition-all duration-150 ${
                                theme === "dark" 
                                  ? 'text-white hover:bg-white' 
                                  : 'text-gray-900 hover:bg-gray-900'
                              } ${selectedRechargeCard === "entertainment" ? 'bg-[#00D4AA] bg-opacity-10 text-[#00D4AA]' : ''}`}
                            >
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                                娱乐专用卡 - **** 5432
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRechargeCard("investment")
                                setShowCardDropdown(false)
                              }}
                              className={`w-full px-3 py-2 text-left hover:bg-opacity-10 transition-all duration-150 ${
                                theme === "dark" 
                                  ? 'text-white hover:bg-white' 
                                  : 'text-gray-900 hover:bg-gray-900'
                              } ${selectedRechargeCard === "investment" ? 'bg-[#00D4AA] bg-opacity-10 text-[#00D4AA]' : ''}`}
                            >
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                                投资理财卡 - **** 9999
                              </div>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setSelectedRechargeCard("platinum")
                                setShowCardDropdown(false)
                              }}
                              className={`w-full px-3 py-2 text-left hover:bg-opacity-10 transition-all duration-150 ${
                                theme === "dark" 
                                  ? 'text-white hover:bg-white' 
                                  : 'text-gray-900 hover:bg-gray-900'
                              } ${selectedRechargeCard === "platinum" ? 'bg-[#00D4AA] bg-opacity-10 text-[#00D4AA]' : ''}`}
                            >
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                                白金卡 - **** 1234
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRechargeCard("gold")
                                setShowCardDropdown(false)
                              }}
                              className={`w-full px-3 py-2 text-left hover:bg-opacity-10 transition-all duration-150 ${
                                theme === "dark" 
                                  ? 'text-white hover:bg-white' 
                                  : 'text-gray-900 hover:bg-gray-900'
                              } ${selectedRechargeCard === "gold" ? 'bg-[#00D4AA] bg-opacity-10 text-[#00D4AA]' : ''}`}
                            >
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                                金卡 - **** 5678
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRechargeCard("diamond")
                                setShowCardDropdown(false)
                              }}
                              className={`w-full px-3 py-2 text-left hover:bg-opacity-10 transition-all duration-150 ${
                                theme === "dark" 
                                  ? 'text-white hover:bg-white' 
                                  : 'text-gray-900 hover:bg-gray-900'
                              } ${selectedRechargeCard === "diamond" ? 'bg-[#00D4AA] bg-opacity-10 text-[#00D4AA]' : ''}`}
                            >
                              <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-black mr-2"></div>
                                钻石卡 - **** 9012
                              </div>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 3. USDT金额输入 */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  充值金额 (USDT)
                </label>
                <input
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  placeholder="请输入USDT金额"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                {rechargeAmount && (
                  <div className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    到账后余额: {(parseFloat(rechargeAmount || '0') + 3456.78).toFixed(2)} USDT
                    <div className="flex space-x-4 mt-1">
                      <span>≈ ${(parseFloat(rechargeAmount || '0') + 3456.78).toFixed(2)} 美金</span>
                      <span>≈ ${((parseFloat(rechargeAmount || '0') + 3456.78) * 7.8).toFixed(2)} 港币</span>
                      <span>≈ €{((parseFloat(rechargeAmount || '0') + 3456.78) * 0.92).toFixed(2)} 欧元</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. 账户余额显示 */}
              <div className={`flex items-center justify-between p-3 rounded-lg ${
                isDark ? 'bg-[#252842]/50' : 'bg-gray-50'
              }`}>
                <div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    当前账户余额
                  </div>
                  <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    3,456.78 USDT
                  </div>
                </div>
                
                {/* 5. 划款按钮 */}
                <button
                  onClick={() => {
                    setShowRechargeModal(false)
                    handleTransferClick()
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                    isDark
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  划款
                </button>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowRechargeModal(false)}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                onClick={() => {
                  setShowRechargeModal(false)
                  alert("充值申请已提交")
                }}
                className={`flex-1 ${
                  isDark 
                    ? 'bg-white hover:bg-gray-100 text-black' 
                    : 'bg-black hover:bg-gray-900 text-white'
                }`}
              >
                确认充值
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 申请新卡弹窗 */}
      {showNewCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => {
              setShowNewCardModal(false)
              resetNewCardModal()
            }}
          />
          <div className={`relative w-full max-w-2xl mx-4 p-6 rounded-xl ${
            theme === "dark" ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'
          } shadow-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className={`text-lg font-semibold ${theme === "dark" ? 'text-white' : 'text-gray-900'}`}>
                  申请新卡
                </h3>
                <p className={`text-sm ${theme === "dark" ? 'text-gray-400' : 'text-gray-600'}`}>
                  步骤 {newCardStep} / 5
                </p>
              </div>
              <button
                onClick={() => {
                  setShowNewCardModal(false)
                  resetNewCardModal()
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* 步骤指示器 */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= newCardStep
                      ? 'bg-[#00D4AA] text-white'
                      : theme === "dark" 
                        ? 'bg-[#252842] text-gray-400 border border-[#3a3d4a]'
                        : 'bg-gray-100 text-gray-400 border border-gray-300'
                  }`}>
                    {step}
                  </div>
                  {step < 5 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      step < newCardStep ? 'bg-[#00D4AA]' : theme === "dark" ? 'bg-[#3a3d4a]' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            {/* 步骤内容 */}
            <div className="space-y-6">
              {/* 第一步：选择卡片类型、品牌和地区 */}
              {newCardStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                      卡片类型
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "virtual", label: "虚拟卡", desc: "即时发卡，在线支付" },
                        { value: "physical", label: "实体卡", desc: "实体卡片，全球通用" }
                      ].map((type) => (
                        <div
                          key={type.value}
                          onClick={() => setNewCardType(type.value as "virtual" | "physical")}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            newCardType === type.value
                              ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                              : theme === "dark"
                                ? 'border-[#3a3d4a] hover:border-[#00D4AA]/50'
                                : 'border-gray-200 hover:border-[#00D4AA]/50'
                          }`}
                        >
                          <div className={`font-medium ${theme === "dark" ? 'text-white' : 'text-gray-900'}`}>
                            {type.label}
                          </div>
                          <div className={`text-sm ${theme === "dark" ? 'text-gray-400' : 'text-gray-600'}`}>
                            {type.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                      卡片品牌
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "visa", label: "Visa", desc: "全球通用，支付范围广" },
                        { value: "master", label: "Mastercard", desc: "国际品牌，安全可靠" }
                      ].map((brand) => (
                        <div
                          key={brand.value}
                          onClick={() => setNewCardBrand(brand.value as "visa" | "master")}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            newCardBrand === brand.value
                              ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                              : theme === "dark"
                                ? 'border-[#3a3d4a] hover:border-[#00D4AA]/50'
                                : 'border-gray-200 hover:border-[#00D4AA]/50'
                          }`}
                        >
                          <div className={`font-medium ${theme === "dark" ? 'text-white' : 'text-gray-900'}`}>
                            {brand.label}
                          </div>
                          <div className={`text-sm ${theme === "dark" ? 'text-gray-400' : 'text-gray-600'}`}>
                            {brand.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                      发卡地区
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "europe", label: "欧洲", desc: "欧盟地区发卡" },
                        { value: "hongkong", label: "香港", desc: "香港地区发卡" },
                        { value: "usa", label: "美国", desc: "美国地区发卡" }
                      ].map((region) => (
                        <div
                          key={region.value}
                          onClick={() => setNewCardRegion(region.value as "europe" | "hongkong" | "usa")}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            newCardRegion === region.value
                              ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                              : theme === "dark"
                                ? 'border-[#3a3d4a] hover:border-[#00D4AA]/50'
                                : 'border-gray-200 hover:border-[#00D4AA]/50'
                          }`}
                        >
                          <div className={`font-medium ${theme === "dark" ? 'text-white' : 'text-gray-900'}`}>
                            {region.label}
                          </div>
                          <div className={`text-sm ${theme === "dark" ? 'text-gray-400' : 'text-gray-600'}`}>
                            {region.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* 第二步：是否需要在中国大陆使用 */}
              {newCardStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                      是否需要在中国大陆地区使用？
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: true, label: "是", desc: "需要在中国大陆使用" },
                        { value: false, label: "否", desc: "不需要在中国大陆使用" }
                      ].map((option) => (
                        <div
                          key={option.value.toString()}
                          onClick={() => setNeedMainlandChina(option.value)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            needMainlandChina === option.value
                              ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                              : theme === "dark"
                                ? 'border-[#3a3d4a] hover:border-[#00D4AA]/50'
                                : 'border-gray-200 hover:border-[#00D4AA]/50'
                          }`}
                        >
                          <div className={`font-medium ${theme === "dark" ? 'text-white' : 'text-gray-900'}`}>
                            {option.label}
                          </div>
                          <div className={`text-sm ${theme === "dark" ? 'text-gray-400' : 'text-gray-600'}`}>
                            {option.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {needMainlandChina && (
                    <div className={`p-4 rounded-lg ${
                      theme === "dark" ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'
                    }`}>
                      <div className={`text-sm ${theme === "dark" ? 'text-yellow-400' : 'text-yellow-800'}`}>
                        <strong>温馨提示：</strong>在中国大陆使用可能会有额外的限制和手续费，建议根据实际需求选择。
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* 第三步：虚拟卡付款场景选择 */}
              {newCardStep === 3 && newCardType === "virtual" && (
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                      选择付款场景（可多选）
                    </label>
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                      {paymentScenarios.map((scenario) => (
                        <div
                          key={scenario}
                          onClick={() => {
                            setSelectedScenarios(prev => 
                              prev.includes(scenario) 
                                ? prev.filter(s => s !== scenario)
                                : [...prev, scenario]
                            )
                          }}
                          className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${
                            selectedScenarios.includes(scenario)
                              ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                              : theme === "dark"
                                ? 'border-[#3a3d4a] hover:border-[#00D4AA]/50'
                                : 'border-gray-200 hover:border-[#00D4AA]/50'
                          }`}
                        >
                          <div className={`text-sm font-medium ${theme === "dark" ? 'text-white' : 'text-gray-900'}`}>
                            {scenario}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={`text-sm ${theme === "dark" ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                      已选择 {selectedScenarios.length} 个场景
                    </div>
                  </div>
                </div>
              )}
              
              {/* 第四步：填写开卡信息 */}
              {newCardStep === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                        持卡人姓名
                      </label>
                      <input
                        type="text"
                        value={cardApplicationInfo.holderName}
                        onChange={(e) => setCardApplicationInfo(prev => ({ ...prev, holderName: e.target.value }))}
                        placeholder="请输入持卡人姓名"
                        className={`w-full px-3 py-2 border rounded-lg ${
                          theme === "dark"
                            ? 'bg-[#252842] border-[#3a3d4a] text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                        手机号码
                      </label>
                      <input
                        type="tel"
                        value={cardApplicationInfo.phoneNumber}
                        onChange={(e) => setCardApplicationInfo(prev => ({ ...prev, phoneNumber: e.target.value }))}
                        placeholder="请输入手机号码"
                        className={`w-full px-3 py-2 border rounded-lg ${
                          theme === "dark"
                            ? 'bg-[#252842] border-[#3a3d4a] text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                        邮箱地址
                      </label>
                      <input
                        type="email"
                        value={cardApplicationInfo.email}
                        onChange={(e) => setCardApplicationInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="请输入邮箱地址"
                        className={`w-full px-3 py-2 border rounded-lg ${
                          theme === "dark"
                            ? 'bg-[#252842] border-[#3a3d4a] text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                        身份证号码
                      </label>
                      <input
                        type="text"
                        value={cardApplicationInfo.idNumber}
                        onChange={(e) => setCardApplicationInfo(prev => ({ ...prev, idNumber: e.target.value }))}
                        placeholder="请输入身份证号码"
                        className={`w-full px-3 py-2 border rounded-lg ${
                          theme === "dark"
                            ? 'bg-[#252842] border-[#3a3d4a] text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>
                  
                  {newCardType === "physical" && (
                    <>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                          邮寄地址
                        </label>
                        <input
                          type="text"
                          value={cardApplicationInfo.address}
                          onChange={(e) => setCardApplicationInfo(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="请输入详细地址"
                          className={`w-full px-3 py-2 border rounded-lg ${
                            theme === "dark"
                              ? 'bg-[#252842] border-[#3a3d4a] text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                            城市
                          </label>
                          <input
                            type="text"
                            value={cardApplicationInfo.city}
                            onChange={(e) => setCardApplicationInfo(prev => ({ ...prev, city: e.target.value }))}
                            placeholder="城市"
                            className={`w-full px-3 py-2 border rounded-lg ${
                              theme === "dark"
                                ? 'bg-[#252842] border-[#3a3d4a] text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                            邮政编码
                          </label>
                          <input
                            type="text"
                            value={cardApplicationInfo.postalCode}
                            onChange={(e) => setCardApplicationInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                            placeholder="邮政编码"
                            className={`w-full px-3 py-2 border rounded-lg ${
                              theme === "dark"
                                ? 'bg-[#252842] border-[#3a3d4a] text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                            国家
                          </label>
                          <input
                            type="text"
                            value={cardApplicationInfo.country}
                            onChange={(e) => setCardApplicationInfo(prev => ({ ...prev, country: e.target.value }))}
                            placeholder="国家"
                            className={`w-full px-3 py-2 border rounded-lg ${
                              theme === "dark"
                                ? 'bg-[#252842] border-[#3a3d4a] text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {/* 第五步：确认提交 */}
              {newCardStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h4 className={`text-lg font-semibold mb-4 ${theme === "dark" ? 'text-white' : 'text-gray-900'}`}>
                      确认申请信息
                    </h4>
                    <div className={`p-4 rounded-lg ${
                      theme === "dark" ? 'bg-[#252842]/50' : 'bg-gray-50'
                    }`}>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>卡片类型：</span>
                          <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                            {newCardType === "virtual" ? "虚拟卡" : "实体卡"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>卡片品牌：</span>
                          <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                            {newCardBrand === "visa" ? "Visa" : "Mastercard"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>发卡地区：</span>
                          <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                            {newCardRegion === "europe" ? "欧洲" : newCardRegion === "hongkong" ? "香港" : "美国"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>中国大陆使用：</span>
                          <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                            {needMainlandChina ? "是" : "否"}
                          </span>
                        </div>
                        {newCardType === "virtual" && selectedScenarios.length > 0 && (
                          <div className="flex justify-between">
                            <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>付款场景：</span>
                            <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                              {selectedScenarios.length} 个场景
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>持卡人姓名：</span>
                          <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                            {cardApplicationInfo.holderName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>联系方式：</span>
                          <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                            {cardApplicationInfo.phoneNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${
                    theme === "dark" ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <div className={`text-sm ${theme === "dark" ? 'text-blue-400' : 'text-blue-800'}`}>
                      <strong>申请须知：</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• 虚拟卡申请后即时生效，可立即使用</li>
                        <li>• 实体卡需要7-15个工作日邮寄到指定地址</li>
                        <li>• 申请提交后将无法修改，请确认信息无误</li>
                        <li>• 如有问题请联系客服</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 底部按钮 */}
            <div className="flex space-x-3 mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  if (newCardStep > 1) {
                    // 实体卡从第4步返回第2步，跳过第3步
                    if (newCardType === "physical" && newCardStep === 4) {
                      setNewCardStep(2)
                    } else {
                      setNewCardStep(prev => prev - 1)
                    }
                  } else {
                    setShowNewCardModal(false)
                    resetNewCardModal()
                  }
                }}
                className="flex-1"
              >
                {newCardStep > 1 ? "上一步" : "取消"}
              </Button>
              <Button
                onClick={() => {
                  if (newCardStep === 5) {
                    setShowNewCardModal(false)
                    resetNewCardModal()
                    alert("新卡申请已提交，请耐心等待审核")
                  } else {
                    // 实体卡从第2步跳到第4步，虚拟卡正常进行
                    if (newCardType === "physical" && newCardStep === 2) {
                      setNewCardStep(4)
                    } else {
                      setNewCardStep(prev => prev + 1)
                    }
                  }
                }}
                className={`flex-1 ${
                  isDark 
                    ? 'bg-white hover:bg-gray-100 text-black' 
                    : 'bg-black hover:bg-gray-900 text-white'
                }`}
              >
                {newCardStep === 5 ? "提交申请" : "下一步"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 激活卡片弹窗 */}
      {showActivateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => {
              setShowActivateModal(false)
              resetActivateModal()
            }}
          />
          <div className={`relative w-full max-w-2xl mx-4 p-6 rounded-xl ${
            theme === "dark" ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'
          } shadow-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className={`text-lg font-semibold ${theme === "dark" ? 'text-white' : 'text-gray-900'}`}>
                  激活卡片
                </h3>
                <p className={`text-sm ${theme === "dark" ? 'text-gray-400' : 'text-gray-600'}`}>
                  步骤 {activateStep} / 4
                </p>
              </div>
              <button
                onClick={() => {
                  setShowActivateModal(false)
                  resetActivateModal()
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* 步骤指示器 */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= activateStep
                      ? 'bg-[#00D4AA] text-white'
                      : theme === "dark" 
                        ? 'bg-[#252842] text-gray-400 border border-[#3a3d4a]'
                        : 'bg-gray-100 text-gray-400 border border-gray-300'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      step < activateStep ? 'bg-[#00D4AA]' : theme === "dark" ? 'bg-[#3a3d4a]' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            {/* 步骤内容 */}
            <div className="space-y-6">
              {/* 第一步：选择要激活的卡片类型 */}
              {activateStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                      选择要激活的卡片类型
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "virtual", label: "虚拟卡", desc: "在线支付，即时激活" },
                        { value: "physical", label: "实体卡", desc: "实体卡片，全球通用" }
                      ].map((type) => (
                        <div
                          key={type.value}
                          onClick={() => setActivateCardType(type.value as "virtual" | "physical")}
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${
                            activateCardType === type.value
                              ? 'border-[#00D4AA] bg-[#00D4AA]/10'
                              : theme === "dark"
                                ? 'border-[#3a3d4a] hover:border-[#00D4AA]/50'
                                : 'border-gray-200 hover:border-[#00D4AA]/50'
                          }`}
                        >
                          <div className={`font-medium ${theme === "dark" ? 'text-white' : 'text-gray-900'}`}>
                            {type.label}
                          </div>
                          <div className={`text-sm ${theme === "dark" ? 'text-gray-400' : 'text-gray-600'}`}>
                            {type.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${
                    theme === "dark" ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <div className={`text-sm ${theme === "dark" ? 'text-blue-400' : 'text-blue-800'}`}>
                      <strong>激活说明：</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• 请选择您要激活的卡片类型</li>
                        <li>• 虚拟卡可立即激活使用</li>
                        <li>• 实体卡需要卡片到手后才能激活</li>
                        <li>• 激活后卡片即可正常使用</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 第二步：填写卡片信息 */}
              {activateStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                      填写{activateCardType === "virtual" ? "虚拟卡" : "实体卡"}信息
                    </label>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                          卡号
                        </label>
                        <input
                          type="text"
                          value={activationData.cardNumber}
                          onChange={(e) => setActivationData(prev => ({ ...prev, cardNumber: e.target.value }))}
                          placeholder="请输入16位卡号"
                          maxLength={19}
                          className={`w-full px-3 py-2 border rounded-lg ${
                            theme === "dark"
                              ? 'bg-[#252842] border-[#3a3d4a] text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            let value = target.value.replace(/\s/g, '').replace(/[^\d]/g, '');
                            value = value.substring(0, 16);
                            value = value.replace(/(.{4})/g, '$1 ').trim();
                            target.value = value;
                            setActivationData(prev => ({ ...prev, cardNumber: value }));
                          }}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                            有效期
                          </label>
                          <input
                            type="text"
                            value={activationData.expiryDate}
                            onChange={(e) => setActivationData(prev => ({ ...prev, expiryDate: e.target.value }))}
                            placeholder="MM/YY"
                            maxLength={5}
                            className={`w-full px-3 py-2 border rounded-lg ${
                              theme === "dark"
                                ? 'bg-[#252842] border-[#3a3d4a] text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            onInput={(e) => {
                              const target = e.target as HTMLInputElement;
                              let value = target.value.replace(/[^\d]/g, '');
                              if (value.length >= 2) {
                                value = value.substring(0, 2) + '/' + value.substring(2, 4);
                              }
                              target.value = value;
                              setActivationData(prev => ({ ...prev, expiryDate: value }));
                            }}
                          />
                        </div>
                        
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                            CVV
                          </label>
                          <input
                            type="text"
                            value={activationData.cvv}
                            onChange={(e) => setActivationData(prev => ({ ...prev, cvv: e.target.value }))}
                            placeholder="3位安全码"
                            maxLength={3}
                            className={`w-full px-3 py-2 border rounded-lg ${
                              theme === "dark"
                                ? 'bg-[#252842] border-[#3a3d4a] text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                            onInput={(e) => {
                              const target = e.target as HTMLInputElement;
                              target.value = target.value.replace(/[^\d]/g, '');
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${
                    theme === "dark" ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <div className={`text-sm ${theme === "dark" ? 'text-yellow-400' : 'text-yellow-800'}`}>
                      <strong>安全提示：</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• 请确保卡片信息准确无误</li>
                        <li>• 卡号和CVV将用于验证卡片有效性</li>
                        <li>• 您的信息将被加密保存</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 第三步：设置银行卡密码 */}
              {activateStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                      设置银行卡密码
                    </label>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                          设置密码
                        </label>
                        <input
                          type="password"
                          value={activationData.bankPassword}
                          onChange={(e) => setActivationData(prev => ({ ...prev, bankPassword: e.target.value }))}
                          placeholder="请设置6位数字密码"
                          maxLength={6}
                          className={`w-full px-3 py-2 border rounded-lg text-center text-lg tracking-widest ${
                            theme === "dark"
                              ? 'bg-[#252842] border-[#3a3d4a] text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            target.value = target.value.replace(/[^\d]/g, '');
                          }}
                        />
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === "dark" ? 'text-gray-300' : 'text-gray-700'}`}>
                          确认密码
                        </label>
                        <input
                          type="password"
                          value={activationData.confirmBankPassword}
                          onChange={(e) => setActivationData(prev => ({ ...prev, confirmBankPassword: e.target.value }))}
                          placeholder="请再次输入密码"
                          maxLength={6}
                          className={`w-full px-3 py-2 border rounded-lg text-center text-lg tracking-widest ${
                            theme === "dark"
                              ? 'bg-[#252842] border-[#3a3d4a] text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                          onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            target.value = target.value.replace(/[^\d]/g, '');
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {activationData.bankPassword && activationData.confirmBankPassword && activationData.bankPassword !== activationData.confirmBankPassword && (
                    <div className={`p-3 rounded-lg ${
                      theme === "dark" ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className={`text-sm ${theme === "dark" ? 'text-red-400' : 'text-red-800'}`}>
                        两次输入的密码不一致，请重新输入
                      </div>
                    </div>
                  )}
                  
                  <div className={`p-4 rounded-lg ${
                    theme === "dark" ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <div className={`text-sm ${theme === "dark" ? 'text-yellow-400' : 'text-yellow-800'}`}>
                      <strong>密码安全提示：</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• 密码用于卡片支付验证</li>
                        <li>• 请勿使用连续数字或重复数字</li>
                        <li>• 请妥善保管，切勿告知他人</li>
                        <li>• 连续输错3次将锁定卡片</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 第四步：提交激活 */}
              {activateStep === 4 && (
                <div className="space-y-6">
                  <div className={`p-6 rounded-lg ${theme === "dark" ? 'bg-[#252842]/50' : 'bg-gray-50'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${theme === "dark" ? 'text-white' : 'text-gray-900'}`}>
                      确认激活信息
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>卡片类型：</span>
                        <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                          {activateCardType === "virtual" ? "虚拟卡" : "实体卡"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>卡号：</span>
                        <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                          {activationData.cardNumber || "未填写"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>有效期：</span>
                        <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                          {activationData.expiryDate || "未填写"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>密码状态：</span>
                        <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                          {activationData.bankPassword ? "已设置" : "未设置"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={theme === "dark" ? 'text-gray-400' : 'text-gray-600'}>激活时间：</span>
                        <span className={theme === "dark" ? 'text-white' : 'text-gray-900'}>
                          {new Date().toLocaleString('zh-CN')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${
                    theme === "dark" ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'
                  }`}>
                    <div className={`text-sm ${theme === "dark" ? 'text-green-400' : 'text-green-800'}`}>
                      <strong>即将完成激活：</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• 点击"完成激活"后卡片将立即生效</li>
                        <li>• 激活后可在"我的卡片"中查看和管理</li>
                        <li>• 如有疑问请联系客服</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* 底部按钮 */}
            <div className="flex space-x-3 mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  if (activateStep > 1) {
                    setActivateStep(prev => prev - 1)
                  } else {
                    setShowActivateModal(false)
                    resetActivateModal()
                  }
                }}
                className="flex-1"
              >
                {activateStep > 1 ? "上一步" : "取消"}
              </Button>
              <Button
                onClick={() => {
                  if (activateStep === 4) {
                    if (activateCardType && activationData.cardNumber && activationData.expiryDate && 
                        activationData.cvv && activationData.bankPassword && 
                        activationData.bankPassword === activationData.confirmBankPassword) {
                      setShowActivateModal(false)
                      resetActivateModal()
                      alert("🎉 卡片激活成功！现在可以正常使用了")
                    } else {
                      alert("请完善所有必填信息")
                    }
                  } else {
                    // 验证当前步骤
                    if (activateStep === 1 && !activateCardType) {
                      alert("请选择卡片类型")
                      return
                    }
                    if (activateStep === 2 && (!activationData.cardNumber || !activationData.expiryDate || !activationData.cvv)) {
                      alert("请完善卡片信息")
                      return
                    }
                    if (activateStep === 3 && (!activationData.bankPassword || activationData.bankPassword !== activationData.confirmBankPassword)) {
                      alert("请正确设置银行卡密码")
                      return
                    }
                    setActivateStep(prev => prev + 1)
                  }
                }}
                className={`flex-1 ${
                  isDark 
                    ? 'bg-white hover:bg-gray-100 text-black' 
                    : 'bg-black hover:bg-gray-900 text-white'
                }`}
              >
                {activateStep === 4 ? "完成激活" : "下一步"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 划款弹窗 */}
      {showCardTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowCardTransferModal(false)}
          />
          <div className={`relative w-full max-w-md mx-4 p-6 rounded-xl ${
            isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'
          } shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                卡片划款
              </h3>
              <button
                onClick={() => setShowCardTransferModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  转出卡片: {selectedCardInfo.name}
                </label>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  卡号: {selectedCardInfo.number}
                </p>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  转入账户
                </label>
                <select className={`w-full px-3 py-2 border rounded-lg ${
                  isDark 
                    ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}>
                  <option>现货账户</option>
                  <option>合约账户</option>
                  <option>理财账户</option>
                  <option>担保账户</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  划款金额
                </label>
                <input
                  type="number"
                  placeholder="请输入划款金额"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  交易密码
                </label>
                <input
                  type="password"
                  placeholder="请输入交易密码"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCardTransferModal(false)}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                onClick={() => {
                  setShowCardTransferModal(false)
                  alert("划款申请已提交")
                }}
                className="flex-1 bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-white"
              >
                确认划款
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 个人信息弹窗 */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowProfileModal(false)}
          />
          <div className={`relative w-full max-w-md mx-4 p-6 rounded-xl ${
            isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'
          } shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                个人信息
              </h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  持卡人姓名
                </label>
                <input
                  type="text"
                  value={selectedCardInfo.name}
                  readOnly
                  className={`w-full px-3 py-2 border rounded-lg bg-gray-100 ${
                    isDark 
                      ? 'border-[#3a3d4a] text-gray-400' 
                      : 'border-gray-300 text-gray-600'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  身份证号
                </label>
                <input
                  type="text"
                  placeholder="请输入身份证号"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  手机号码
                </label>
                <input
                  type="tel"
                  placeholder="请输入手机号码"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  邮箱地址
                </label>
                <input
                  type="email"
                  placeholder="请输入邮箱地址"
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  地址信息
                </label>
                <textarea
                  placeholder="请输入详细地址"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowProfileModal(false)}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                onClick={() => {
                  setShowProfileModal(false)
                  alert("个人信息已更新")
                }}
                className={`flex-1 ${
                  isDark 
                    ? 'bg-white hover:bg-gray-100 text-black' 
                    : 'bg-black hover:bg-gray-900 text-white'
                }`}
              >
                保存信息
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 个人信息弹窗 */}
      {showPersonalInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => {
              setShowPersonalInfoModal(false)
              setIsEditingPersonalInfo(false)
            }}
          />
          <div className={`relative w-full max-w-2xl mx-4 p-6 rounded-xl ${
            isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'
          } shadow-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                个人信息
              </h3>
              <button
                onClick={() => {
                  setShowPersonalInfoModal(false)
                  setIsEditingPersonalInfo(false)
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  持卡人姓名
                </label>
                {isEditingPersonalInfo ? (
                  <input
                    type="text"
                    value={cardApplicationInfo.holderName}
                    onChange={(e) => setCardApplicationInfo(prev => ({
                      ...prev,
                      holderName: e.target.value
                    }))}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="请输入持卡人姓名"
                  />
                ) : (
                  <div className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#1a1d29] border-[#3a3d4a] text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    {cardApplicationInfo.holderName || '未设置'}
                  </div>
                )}
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  手机号码
                </label>
                {isEditingPersonalInfo ? (
                  <input
                    type="tel"
                    value={cardApplicationInfo.phoneNumber}
                    onChange={(e) => setCardApplicationInfo(prev => ({
                      ...prev,
                      phoneNumber: e.target.value
                    }))}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="请输入手机号码"
                  />
                ) : (
                  <div className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#1a1d29] border-[#3a3d4a] text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    {cardApplicationInfo.phoneNumber || '未设置'}
                  </div>
                )}
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  电子邮箱
                </label>
                {isEditingPersonalInfo ? (
                  <input
                    type="email"
                    value={cardApplicationInfo.email}
                    onChange={(e) => setCardApplicationInfo(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="请输入电子邮箱"
                  />
                ) : (
                  <div className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#1a1d29] border-[#3a3d4a] text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    {cardApplicationInfo.email || '未设置'}
                  </div>
                )}
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  身份证号
                </label>
                {isEditingPersonalInfo ? (
                  <input
                    type="text"
                    value={cardApplicationInfo.idNumber}
                    onChange={(e) => setCardApplicationInfo(prev => ({
                      ...prev,
                      idNumber: e.target.value
                    }))}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="请输入身份证号"
                  />
                ) : (
                  <div className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#1a1d29] border-[#3a3d4a] text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    {cardApplicationInfo.idNumber || '未设置'}
                  </div>
                )}
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  国籍
                </label>
                {isEditingPersonalInfo ? (
                  <input
                    type="text"
                    value={cardApplicationInfo.nationality}
                    onChange={(e) => setCardApplicationInfo(prev => ({
                      ...prev,
                      nationality: e.target.value
                    }))}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="请输入国籍"
                  />
                ) : (
                  <div className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#1a1d29] border-[#3a3d4a] text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    {cardApplicationInfo.nationality || '未设置'}
                  </div>
                )}
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  护照号
                </label>
                {isEditingPersonalInfo ? (
                  <input
                    type="text"
                    value={cardApplicationInfo.passportNumber}
                    onChange={(e) => setCardApplicationInfo(prev => ({
                      ...prev,
                      passportNumber: e.target.value
                    }))}
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="请输入护照号"
                  />
                ) : (
                  <div className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#1a1d29] border-[#3a3d4a] text-white' 
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}>
                    {cardApplicationInfo.passportNumber || '未设置'}
                  </div>
                )}
              </div>
              
              {/* 地址信息 - 竖版布局 */}
              <div className="space-y-6">
                {/* 居住地址 */}
                <div className={`p-4 border rounded-lg ${
                  isDark ? 'border-[#3a3d4a] bg-[#1a1d29]' : 'border-gray-200 bg-gray-50'
                }`}>
                <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  居住地址
                </label>
                
                {/* 国家/地区 */}
                <div className="mb-3">
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    国家/地区
                  </label>
                  {isEditingPersonalInfo ? (
                    <select
                      value={cardApplicationInfo.country}
                      onChange={(e) => setCardApplicationInfo(prev => ({
                        ...prev,
                        country: e.target.value
                      }))}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isDark 
                          ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="">请选择国家/地区</option>
                      <option value="CN">中国</option>
                      <option value="HK">香港</option>
                      <option value="US">美国</option>
                      <option value="GB">英国</option>
                      <option value="DE">德国</option>
                      <option value="FR">法国</option>
                      <option value="JP">日本</option>
                      <option value="SG">新加坡</option>
                    </select>
                  ) : (
                    <div className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}>
                      {cardApplicationInfo.country ? 
                        {
                          "CN": "中国",
                          "HK": "香港", 
                          "US": "美国",
                          "GB": "英国",
                          "DE": "德国",
                          "FR": "法国",
                          "JP": "日本",
                          "SG": "新加坡"
                        }[cardApplicationInfo.country] || cardApplicationInfo.country
                        : '未设置'
                      }
                    </div>
                  )}
                </div>
                
                {/* 城市和邮编 */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      城市
                    </label>
                    {isEditingPersonalInfo ? (
                      <input
                        type="text"
                        value={cardApplicationInfo.city}
                        onChange={(e) => setCardApplicationInfo(prev => ({
                          ...prev,
                          city: e.target.value
                        }))}
                        className={`w-full px-3 py-2 border rounded-lg ${
                          isDark 
                            ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                        }`}
                        placeholder="城市"
                      />
                    ) : (
                      <div className={`w-full px-3 py-2 border rounded-lg ${
                        isDark 
                          ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}>
                        {cardApplicationInfo.city || '未设置'}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      邮政编码
                    </label>
                    {isEditingPersonalInfo ? (
                      <input
                        type="text"
                        value={cardApplicationInfo.postalCode}
                        onChange={(e) => setCardApplicationInfo(prev => ({
                          ...prev,
                          postalCode: e.target.value
                        }))}
                        className={`w-full px-3 py-2 border rounded-lg ${
                          isDark 
                            ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                        }`}
                        placeholder="邮编"
                      />
                    ) : (
                      <div className={`w-full px-3 py-2 border rounded-lg ${
                        isDark 
                          ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}>
                        {cardApplicationInfo.postalCode || '未设置'}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 详细地址 */}
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    详细地址
                  </label>
                  {isEditingPersonalInfo ? (
                    <textarea
                      value={cardApplicationInfo.address}
                      onChange={(e) => setCardApplicationInfo(prev => ({
                        ...prev,
                        address: e.target.value
                      }))}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg ${
                        isDark 
                          ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="请输入详细地址"
                    />
                  ) : (
                    <div className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}>
                      {cardApplicationInfo.address || '未设置'}
                    </div>
                  )}
                </div>
                </div>

                {/* 收款地址 */}
                <div className={`p-4 border rounded-lg ${
                  isDark ? 'border-[#3a3d4a] bg-[#1a1d29]' : 'border-gray-200 bg-gray-50'
                }`}>
                <div className="flex justify-between items-center mb-3">
                  <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    收款地址
                  </label>
                </div>
                
                {/* 与居住地址相同的复选框 */}
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    id="sameAsResidential"
                    checked={shippingAddresses[0]?.sameAsResidential || false}
                    onChange={(e) => {
                      const isChecked = e.target.checked
                      setShowShippingAddress(!isChecked)
                      setShippingAddresses(prev => prev.map((addr, index) => 
                        index === 0 
                          ? { 
                              ...addr, 
                              sameAsResidential: isChecked,
                              // 如果勾选，则复制居住地址信息
                              ...(isChecked ? {
                                country: cardApplicationInfo.country,
                                city: cardApplicationInfo.city,
                                postalCode: cardApplicationInfo.postalCode,
                                address: cardApplicationInfo.address
                              } : {})
                            }
                          : addr
                      ))
                    }}
                    className="mr-2"
                  />
                  <label 
                    htmlFor="sameAsResidential" 
                    className={`text-sm cursor-pointer ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    与居住地址相同
                  </label>
                </div>
                
                {/* 收款地址详情 - 只在未勾选"与居住地址相同"时显示 */}
                {showShippingAddress && (
                  <div className="space-y-4">
                    {/* 添加地址按钮 */}
                    {isEditingPersonalInfo && shippingAddresses.length < 3 && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            const newId = Math.max(...shippingAddresses.map(addr => addr.id)) + 1
                            setShippingAddresses(prev => [...prev, { 
                              id: newId, 
                              address: '', 
                              city: '', 
                              postalCode: '', 
                              country: '',
                              sameAsResidential: false
                            }])
                          }}
                          className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
                            isDark 
                              ? 'border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA] hover:text-black' 
                              : 'border-[#00D4AA] text-[#00D4AA] hover:bg-[#00D4AA] hover:text-white'
                          }`}
                        >
                          + 添加地址
                        </button>
                      </div>
                    )}
                    
                    {shippingAddresses.map((shippingAddr, index) => (
                      <div key={shippingAddr.id} className="space-y-3">
                      {isEditingPersonalInfo && shippingAddresses.length > 1 && (
                        <div className="flex justify-end mb-3">
                          <button
                            onClick={() => {
                              setShippingAddresses(prev => prev.filter(addr => addr.id !== shippingAddr.id))
                            }}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            删除
                          </button>
                        </div>
                      )}
                      
                      {/* 与居住地址相同选项 */}
                      {isEditingPersonalInfo && (
                        <div className="flex items-center mb-3">
                          <input
                            type="checkbox"
                            id={`same-as-residential-${shippingAddr.id}`}
                            checked={shippingAddr.sameAsResidential}
                            onChange={(e) => {
                              setShippingAddresses(prev => prev.map(addr => 
                                addr.id === shippingAddr.id 
                                  ? { 
                                      ...addr, 
                                      sameAsResidential: e.target.checked,
                                      // 如果勾选，复制居住地址信息
                                      ...(e.target.checked ? {
                                        country: cardApplicationInfo.country,
                                        city: cardApplicationInfo.city,
                                        postalCode: cardApplicationInfo.postalCode,
                                        address: cardApplicationInfo.address
                                      } : {})
                                    }
                                  : addr
                              ))
                            }}
                            className="mr-2 w-4 h-4 text-[#00D4AA] border-gray-300 rounded focus:ring-[#00D4AA]"
                          />
                          <label 
                            htmlFor={`same-as-residential-${shippingAddr.id}`}
                            className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} cursor-pointer`}
                          >
                            与居住地址相同
                          </label>
                        </div>
                      )}
                      
                      {!isEditingPersonalInfo && shippingAddr.sameAsResidential && (
                        <div className={`mb-3 px-3 py-2 rounded-lg text-sm ${
                          isDark ? 'bg-[#252842] text-gray-400' : 'bg-gray-100 text-gray-600'
                        }`}>
                          与居住地址相同
                        </div>
                      )}
                      
                      {!shippingAddr.sameAsResidential && (
                        <div className="space-y-3">
                          {/* 国家/地区 */}
                          <div>
                            <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              国家/地区
                            </label>
                            {isEditingPersonalInfo ? (
                              <select
                                value={shippingAddr.country}
                                onChange={(e) => {
                                  setShippingAddresses(prev => prev.map(addr => 
                                    addr.id === shippingAddr.id 
                                      ? { ...addr, country: e.target.value }
                                      : addr
                                  ))
                                }}
                                className={`w-full px-3 py-2 border rounded-lg text-sm ${
                                  isDark 
                                    ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}
                              >
                                <option value="">请选择国家/地区</option>
                                <option value="CN">中国</option>
                                <option value="HK">香港</option>
                                <option value="US">美国</option>
                                <option value="GB">英国</option>
                                <option value="DE">德国</option>
                                <option value="FR">法国</option>
                                <option value="JP">日本</option>
                                <option value="SG">新加坡</option>
                              </select>
                            ) : (
                              <div className={`w-full px-3 py-2 border rounded-lg text-sm ${
                                isDark 
                                  ? 'bg-[#1a1d29] border-[#3a3d4a] text-white' 
                                  : 'bg-white border-gray-300 text-gray-900'
                              }`}>
                                {shippingAddr.country ? 
                                  {
                                    "CN": "中国",
                                    "HK": "香港", 
                                    "US": "美国",
                                    "GB": "英国",
                                    "DE": "德国",
                                    "FR": "法国",
                                    "JP": "日本",
                                    "SG": "新加坡"
                                  }[shippingAddr.country] || shippingAddr.country
                                  : '未设置'
                                }
                              </div>
                            )}
                          </div>
                          
                          {/* 城市和邮编 */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                城市
                              </label>
                              {isEditingPersonalInfo ? (
                                <input
                                  type="text"
                                  value={shippingAddr.city}
                                  onChange={(e) => {
                                    setShippingAddresses(prev => prev.map(addr => 
                                      addr.id === shippingAddr.id 
                                        ? { ...addr, city: e.target.value }
                                        : addr
                                    ))
                                  }}
                                  className={`w-full px-3 py-2 border rounded-lg text-sm ${
                                    isDark 
                                      ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                                  }`}
                                  placeholder="城市"
                                />
                              ) : (
                                <div className={`w-full px-3 py-2 border rounded-lg text-sm ${
                                  isDark 
                                    ? 'bg-[#1a1d29] border-[#3a3d4a] text-white' 
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}>
                                  {shippingAddr.city || '未设置'}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                邮编
                              </label>
                              {isEditingPersonalInfo ? (
                                <input
                                  type="text"
                                  value={shippingAddr.postalCode}
                                  onChange={(e) => {
                                    setShippingAddresses(prev => prev.map(addr => 
                                      addr.id === shippingAddr.id 
                                        ? { ...addr, postalCode: e.target.value }
                                        : addr
                                    ))
                                  }}
                                  className={`w-full px-3 py-2 border rounded-lg text-sm ${
                                    isDark 
                                      ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                                  }`}
                                  placeholder="邮编"
                                />
                              ) : (
                                <div className={`w-full px-3 py-2 border rounded-lg text-sm ${
                                  isDark 
                                    ? 'bg-[#1a1d29] border-[#3a3d4a] text-white' 
                                    : 'bg-white border-gray-300 text-gray-900'
                                }`}>
                                  {shippingAddr.postalCode || '未设置'}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* 详细地址 */}
                          <div>
                            <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              详细地址
                            </label>
                            {isEditingPersonalInfo ? (
                              <textarea
                                value={shippingAddr.address}
                                onChange={(e) => {
                                  setShippingAddresses(prev => prev.map(addr => 
                                    addr.id === shippingAddr.id 
                                      ? { ...addr, address: e.target.value }
                                      : addr
                                  ))
                                }}
                                rows={2}
                                className={`w-full px-3 py-2 border rounded-lg text-sm ${
                                  isDark 
                                    ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                                }`}
                                placeholder="请输入详细收款地址"
                              />
                            ) : (
                              <div className={`w-full px-3 py-2 border rounded-lg text-sm ${
                                isDark 
                                  ? 'bg-[#1a1d29] border-[#3a3d4a] text-white' 
                                  : 'bg-white border-gray-300 text-gray-900'
                              }`}>
                                {shippingAddr.address || '未设置'}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    ))}
                  </div>
                )}
                </div>
              </div>
            </div>
            
            {/* 底部按钮 */}
            <div className="flex space-x-3 mt-8">
              {isEditingPersonalInfo ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingPersonalInfo(false)}
                    className="flex-1"
                  >
                    取消
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditingPersonalInfo(false)
                      alert("个人信息已更新")
                    }}
                    className={`flex-1 ${
                      isDark 
                        ? 'bg-white hover:bg-gray-100 text-black' 
                        : 'bg-black hover:bg-gray-900 text-white'
                    }`}
                  >
                    保存信息
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPersonalInfoModal(false)
                      setIsEditingPersonalInfo(false)
                    }}
                    className="flex-1"
                  >
                    关闭
                  </Button>
                  <Button
                    onClick={() => setIsEditingPersonalInfo(true)}
                    className={`flex-1 ${
                      isDark 
                        ? 'bg-white hover:bg-gray-100 text-black' 
                        : 'bg-black hover:bg-gray-900 text-white'
                    }`}
                  >
                    编辑
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 冻结卡片弹窗 */}
      {showFreezeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowFreezeModal(false)}
          />
          <div className={`relative w-full max-w-md mx-4 p-6 rounded-xl ${
            isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'
          } shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                冻结卡片
              </h3>
              <button
                onClick={() => setShowFreezeModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-orange-50 border border-orange-200'}`}>
                <div className="flex items-center">
                  <PauseCircle className="h-5 w-5 text-orange-500 mr-2" />
                  <p className={`text-sm ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
                    冻结后，此卡片将无法进行任何交易操作
                  </p>
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  冻结原因
                </label>
                <select className={`w-full px-3 py-2 border rounded-lg ${
                  isDark 
                    ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}>
                  <option value="">请选择冻结原因</option>
                  <option value="suspicious">异常交易检测</option>
                  <option value="loss">卡片丢失</option>
                  <option value="theft">卡片被盗</option>
                  <option value="voluntary">主动冻结</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  备注说明（可选）
                </label>
                <textarea
                  rows={3}
                  placeholder="请输入备注说明..."
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isDark 
                      ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowFreezeModal(false)}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                onClick={() => {
                  setShowFreezeModal(false)
                  alert("卡片已冻结")
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                确认冻结
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 删除卡片弹窗 */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowDeleteModal(false)}
          />
          <div className={`relative w-full max-w-md mx-4 p-6 rounded-xl ${
            isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'
          } shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                删除卡片
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center">
                  <Trash2 className="h-5 w-5 text-red-500 mr-2" />
                  <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                    删除后无法恢复，请确认是否继续？
                  </p>
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  删除原因
                </label>
                <select className={`w-full px-3 py-2 border rounded-lg ${
                  isDark 
                    ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}>
                  <option value="">请选择删除原因</option>
                  <option value="unused">不再使用</option>
                  <option value="replaced">已被替换</option>
                  <option value="security">安全原因</option>
                  <option value="other">其他原因</option>
                </select>
              </div>
              
              <div>
                <label className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <input type="checkbox" className="rounded" />
                  <span>我确认要删除此卡片，并了解此操作不可撤销</span>
                </label>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1"
              >
                取消
              </Button>
              <Button
                onClick={() => {
                  setShowDeleteModal(false)
                  alert("卡片已删除")
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              >
                确认删除
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 修改密码弹窗 - 三步流程 */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => {
              setShowChangePasswordModal(false)
              resetChangePasswordModal()
            }}
          />
          <div className={`relative w-full max-w-md mx-4 p-6 rounded-xl ${
            isDark ? 'bg-[#1a1d29] border border-[#252842]' : 'bg-white border border-gray-200'
          } shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                修改密码 - 第{changePasswordStep}步
              </h3>
              <button
                onClick={() => {
                  setShowChangePasswordModal(false)
                  resetChangePasswordModal()
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* 步骤指示器 */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= changePasswordStep 
                        ? 'bg-[#00D4AA] text-white' 
                        : isDark ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-8 h-0.5 mx-1 ${
                        step < changePasswordStep ? 'bg-[#00D4AA]' : isDark ? 'bg-gray-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 第1步：输入当前密码 */}
            {changePasswordStep === 1 && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-[#00D4AA]/10 border border-[#00D4AA]/20' : 'bg-[#00D4AA]/5 border border-[#00D4AA]/20'}`}>
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-[#00D4AA] mr-2" />
                    <p className={`text-sm ${isDark ? 'text-[#00D4AA]' : 'text-[#00D4AA]'}`}>
                      请输入当前PIN码进行身份验证
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    当前PIN码
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    value={currentPin}
                    onChange={(e) => setCurrentPin(e.target.value)}
                    placeholder="请输入当前PIN码"
                    className={`w-full px-3 py-2 border rounded-lg text-center tracking-widest ${
                      isDark 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => {
                      setResetPasswordMode(true)
                      setChangePasswordStep(3)
                    }}
                    className="text-sm text-[#00D4AA] hover:text-[#00D4AA]/80 underline"
                  >
                    忘记PIN码？点击重置
                  </button>
                </div>
              </div>
            )}
            
            {/* 第2步：设置新密码 */}
            {changePasswordStep === 2 && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-[#00D4AA]/10 border border-[#00D4AA]/20' : 'bg-[#00D4AA]/5 border border-[#00D4AA]/20'}`}>
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-[#00D4AA] mr-2" />
                    <p className={`text-sm ${isDark ? 'text-[#00D4AA]' : 'text-[#00D4AA]'}`}>
                      请设置新的PIN码
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    新PIN码
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="请输入新PIN码"
                    className={`w-full px-3 py-2 border rounded-lg text-center tracking-widest ${
                      isDark 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    确认新PIN码
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    value={confirmNewPin}
                    onChange={(e) => setConfirmNewPin(e.target.value)}
                    placeholder="请再次输入新PIN码"
                    className={`w-full px-3 py-2 border rounded-lg text-center tracking-widest ${
                      isDark 
                        ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
                
                {newPin && confirmNewPin && newPin !== confirmNewPin && (
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                      两次输入的PIN码不一致
                    </p>
                  </div>
                )}
                
                <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    PIN码要求：
                  </p>
                  <ul className={`text-xs mt-1 space-y-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <li>• 6位数字</li>
                    <li>• 不能使用连续数字（如123456）</li>
                    <li>• 不能使用重复数字（如111111）</li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* 第3步：验证码验证（重置密码时） */}
            {changePasswordStep === 3 && resetPasswordMode && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-orange-50 border border-orange-200'}`}>
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 text-orange-500 mr-2" />
                    <p className={`text-sm ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>
                      请验证您的身份以完成密码重置
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    手机验证码
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={phoneVerificationCode}
                      onChange={(e) => setPhoneVerificationCode(e.target.value)}
                      placeholder="请输入手机验证码"
                      className={`flex-1 px-3 py-2 border rounded-lg text-center tracking-widest ${
                        isDark 
                          ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert("验证码已发送到您的手机")}
                      className="px-3"
                    >
                      获取验证码
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    邮箱验证码
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={emailVerificationCode}
                      onChange={(e) => setEmailVerificationCode(e.target.value)}
                      placeholder="请输入邮箱验证码"
                      className={`flex-1 px-3 py-2 border rounded-lg text-center tracking-widest ${
                        isDark 
                          ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert("验证码已发送到您的邮箱")}
                      className="px-3"
                    >
                      获取验证码
                    </Button>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${isDark ? 'bg-[#00D4AA]/10 border border-[#00D4AA]/20' : 'bg-[#00D4AA]/5 border border-[#00D4AA]/20'}`}>
                  <p className={`text-xs ${isDark ? 'text-[#00D4AA]' : 'text-[#00D4AA]'}`}>
                    为了您的账户安全，重置密码需要同时验证手机号和邮箱
                  </p>
                </div>
              </div>
            )}
            
            {/* 底部按钮 */}
            <div className="flex space-x-3 mt-6">
              {changePasswordStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (changePasswordStep === 3 && resetPasswordMode) {
                      // 从重置模式的第3步返回到第1步
                      setChangePasswordStep(1)
                      setResetPasswordMode(false)
                    } else {
                      setChangePasswordStep(changePasswordStep - 1)
                    }
                  }}
                  className="flex-1"
                >
                  上一步
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={() => {
                  setShowChangePasswordModal(false)
                  resetChangePasswordModal()
                }}
                className="flex-1"
              >
                取消
              </Button>
              
              <Button
                onClick={() => {
                  if (changePasswordStep === 1) {
                    if (currentPin.length === 6) {
                      setChangePasswordStep(2)
                    } else {
                      alert("请输入当前PIN码")
                    }
                  } else if (changePasswordStep === 2) {
                    if (newPin === confirmNewPin && newPin.length === 6) {
                      setShowChangePasswordModal(false)
                      resetChangePasswordModal()
                      alert("PIN码修改成功")
                    } else {
                      alert("请确认PIN码输入正确")
                    }
                  } else if (changePasswordStep === 3) {
                    if (phoneVerificationCode && emailVerificationCode) {
                      setShowChangePasswordModal(false)
                      resetChangePasswordModal()
                      alert("PIN码重置成功")
                    } else {
                      alert("请输入手机和邮箱验证码")
                    }
                  }
                }}
                className={`flex-1 ${
                  isDark 
                    ? 'bg-white hover:bg-gray-100 text-black' 
                    : 'bg-black hover:bg-gray-900 text-white'
                }`}
              >
                {changePasswordStep === 1 ? '下一步' : 
                 changePasswordStep === 2 ? '确认修改' : 
                 '完成重置'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* API文档选择弹窗 */}
      {showApiDocsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`relative w-full max-w-md mx-4 rounded-lg p-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <button
              onClick={() => setShowApiDocsModal(false)}
              className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <div className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                选择文档语言
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                请选择您需要的API文档语言版本
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setShowApiDocsModal(false)
                  window.open('/docs/bepay-integration/zh', '_blank')
                }}
                className={`w-full flex items-center justify-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                  isDark 
                    ? 'border-gray-600 hover:border-white bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'border-gray-200 hover:border-black bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">中</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">中文文档</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    完整的中文API接入指南
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowApiDocsModal(false)
                  window.open('/docs/bepay-integration/en', '_blank')
                }}
                className={`w-full flex items-center justify-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                  isDark 
                    ? 'border-gray-600 hover:border-white bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'border-gray-200 hover:border-black bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EN</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">English Documentation</div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Complete English API integration guide
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 生成密钥弹窗 */}
      {showGenerateKeyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`relative w-full max-w-md mx-4 rounded-lg p-6 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <button
              onClick={() => {
                setShowGenerateKeyModal(false)
                setGeneratedApiKey("")
              }}
              className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
                isDark 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <div className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                生成API密钥
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                为您的商户账户生成新的临时API密钥
              </div>
            </div>

            {!generatedApiKey ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                    密钥权限范围：
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>创建支付订单</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>查询订单状态</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>接收回调通知</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    const newApiKey = 'sk_live_' + Math.random().toString(36).substr(2, 32)
                    setGeneratedApiKey(newApiKey)
                  }}
                  className={`w-full ${
                    isDark 
                      ? 'bg-white hover:bg-gray-100 text-black' 
                      : 'bg-black hover:bg-gray-900 text-white'
                  }`}
                >
                  生成新密钥
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                    您的新API密钥：
                  </div>
                  <div className={`font-mono text-sm p-3 rounded bg-gray-900 text-green-400 break-all`}>
                    {generatedApiKey}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-yellow-300' : 'text-yellow-600'} mt-2`}>
                    ⚠️ 请立即复制并保存此密钥，关闭弹窗后将无法再次查看
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedApiKey)
                      alert('API密钥已复制到剪贴板')
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    复制密钥
                  </Button>
                  
                  <Button
                    onClick={() => {
                      setShowGenerateKeyModal(false)
                      setGeneratedApiKey("")
                    }}
                    className={`flex-1 ${
                      isDark 
                        ? 'bg-white hover:bg-gray-100 text-black' 
                        : 'bg-black hover:bg-gray-900 text-white'
                    }`}
                  >
                    完成
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 用户名单弹窗 */}
      {showUserListModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {showUserListModal.type === 'direct' ? '直推用户名单' : 
                   showUserListModal.type === 'indirect' ? '间推用户名单' : '活跃用户名单'}
                </h3>
                <button
                  onClick={() => setShowUserListModal({...showUserListModal, isOpen: false})}
                  className={`p-2 rounded-lg hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''} transition-colors`}
                >
                  <X className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* 搜索和筛选区域 */}
              <div className="mb-6 space-y-4">
                {/* 搜索框 */}
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    placeholder="搜索用户ID或用户名..."
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                </div>
                
                {/* 筛选条件 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      注册时间
                    </label>
                    <select
                      value={userDateFilter}
                      onChange={(e) => setUserDateFilter(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    >
                      <option value="">全部时间</option>
                      <option value="today">今日</option>
                      <option value="week">本周</option>
                      <option value="month">本月</option>
                      <option value="quarter">近3个月</option>
                      <option value="year">本年</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      注册国家
                    </label>
                    <select
                      value={userCountryFilter}
                      onChange={(e) => setUserCountryFilter(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    >
                      <option value="">全部国家</option>
                      <option value="CN">中国</option>
                      <option value="US">美国</option>
                      <option value="SG">新加坡</option>
                      <option value="JP">日本</option>
                      <option value="KR">韩国</option>
                      <option value="UK">英国</option>
                      <option value="CA">加拿大</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      注册城市
                    </label>
                    <select
                      value={userCityFilter}
                      onChange={(e) => setUserCityFilter(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    >
                      <option value="">全部城市</option>
                      <option value="北京">北京</option>
                      <option value="上海">上海</option>
                      <option value="深圳">深圳</option>
                      <option value="广州">广州</option>
                      <option value="杭州">杭州</option>
                      <option value="纽约">纽约</option>
                      <option value="新加坡">新加坡</option>
                      <option value="东京">东京</option>
                      <option value="首尔">首尔</option>
                      <option value="伦敦">伦敦</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                      <th className={`text-left py-3 px-2 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        用户ID
                      </th>
                      <th className={`text-left py-3 px-2 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        用户名
                      </th>
                      <th className={`text-left py-3 px-2 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        注册时间
                      </th>
                      <th className={`text-left py-3 px-2 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        注册国家
                      </th>
                      <th className={`text-left py-3 px-2 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        注册城市
                      </th>
                      <th className={`text-left py-3 px-2 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        状态
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const getUserData = () => {
                        let allUsers = []
                        if (showUserListModal.type === 'direct') {
                          allUsers = [
                            { userId: "U12345678", username: "crypto_trader1", registerTime: "2024-01-15 10:30", country: "中国", city: "北京", status: "活跃" },
                            { userId: "U87654321", username: "bitcoin_holder", registerTime: "2024-02-20 09:15", country: "美国", city: "纽约", status: "活跃" },
                            { userId: "U11223344", username: "eth_investor", registerTime: "2024-03-10 16:20", country: "新加坡", city: "新加坡", status: "休眠" },
                            { userId: "U99887766", username: "defi_user", registerTime: "2024-04-05 12:10", country: "日本", city: "东京", status: "活跃" },
                            { userId: "U55443322", username: "nft_collector", registerTime: "2024-05-12 08:45", country: "韩国", city: "首尔", status: "活跃" },
                            { userId: "U33445566", username: "trader_pro", registerTime: "2024-06-01 14:20", country: "中国", city: "上海", status: "活跃" },
                            { userId: "U77889911", username: "hodl_master", registerTime: "2024-06-15 11:30", country: "英国", city: "伦敦", status: "休眠" }
                          ]
                        } else if (showUserListModal.type === 'indirect') {
                          allUsers = [
                            { userId: "U22334455", username: "altcoin_fan", registerTime: "2024-02-01 14:20", country: "加拿大", city: "多伦多", status: "活跃" },
                            { userId: "U66778899", username: "yield_farmer", registerTime: "2024-02-15 11:10", country: "中国", city: "深圳", status: "休眠" },
                            { userId: "U44556677", username: "dao_member", registerTime: "2024-03-05 09:30", country: "美国", city: "洛杉矶", status: "活跃" },
                            { userId: "U77889900", username: "staking_pro", registerTime: "2024-03-20 15:45", country: "中国", city: "广州", status: "活跃" },
                            { userId: "U12378945", username: "defi_lover", registerTime: "2024-04-10 16:20", country: "新加坡", city: "新加坡", status: "活跃" }
                          ]
                        } else {
                          allUsers = [
                            { userId: "U12345678", username: "crypto_trader1", registerTime: "2024-01-15 10:30", country: "中国", city: "北京", status: "在线" },
                            { userId: "U87654321", username: "bitcoin_holder", registerTime: "2024-02-20 09:15", country: "美国", city: "纽约", status: "在线" },
                            { userId: "U22334455", username: "altcoin_fan", registerTime: "2024-02-01 14:20", country: "加拿大", city: "多伦多", status: "离线" },
                            { userId: "U99887766", username: "defi_user", registerTime: "2024-04-05 12:10", country: "日本", city: "东京", status: "在线" },
                            { userId: "U55443322", username: "nft_collector", registerTime: "2024-05-12 08:45", country: "韩国", city: "首尔", status: "在线" }
                          ]
                        }
                        
                        // 筛选逻辑
                        return allUsers.filter(user => {
                          // 搜索关键词筛选
                          if (userSearchTerm && !user.userId.toLowerCase().includes(userSearchTerm.toLowerCase()) && 
                              !user.username.toLowerCase().includes(userSearchTerm.toLowerCase())) {
                            return false
                          }
                          
                          // 国家筛选
                          if (userCountryFilter && user.country !== userCountryFilter) {
                            return false
                          }
                          
                          // 城市筛选
                          if (userCityFilter && user.city !== userCityFilter) {
                            return false
                          }
                          
                          // 时间筛选（简化处理，实际应用中需要更复杂的日期计算）
                          if (userDateFilter) {
                            const registerDate = new Date(user.registerTime)
                            const now = new Date()
                            
                            switch (userDateFilter) {
                              case 'today':
                                return registerDate.toDateString() === now.toDateString()
                              case 'week':
                                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                                return registerDate >= weekAgo
                              case 'month':
                                return registerDate.getMonth() === now.getMonth() && registerDate.getFullYear() === now.getFullYear()
                              case 'quarter':
                                const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
                                return registerDate >= threeMonthsAgo
                              case 'year':
                                return registerDate.getFullYear() === now.getFullYear()
                              default:
                                return true
                            }
                          }
                          
                          return true
                        })
                      }
                      
                      return getUserData().map((user, index) => (
                        <tr key={index} className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                          <td className={`py-3 px-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {user.userId}
                          </td>
                          <td className={`py-3 px-2 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user.username}
                          </td>
                          <td className={`py-3 px-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {user.registerTime}
                          </td>
                          <td className={`py-3 px-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {user.country}
                          </td>
                          <td className={`py-3 px-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {user.city}
                          </td>
                          <td className={`py-3 px-2 text-sm`}>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === "活跃" || user.status === "在线"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : user.status === "休眠" || user.status === "离线"
                                ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    })()}
                  </tbody>
                </table>
              </div>
              
              {/* 加载更多按钮 */}
              <div className="mt-6 text-center">
                <button
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    isDark 
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  加载更多
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 结算弹窗 */}
      {showSettlementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg shadow-xl w-full max-w-md ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  佣金结算
                </h3>
                <button
                  onClick={() => setShowSettlementModal(false)}
                  className={`p-2 rounded-lg hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''} transition-colors`}
                >
                  <X className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {/* 结算金额 */}
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      未结算佣金
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      1,234.56 USDT
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      结算手续费 (0.5%)
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      -6.17 USDT
                    </span>
                  </div>
                  
                  <div className={`border-t pt-2 mt-2 ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-center">
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        实际到账金额
                      </span>
                      <span className="font-bold text-[#14C2A3] text-lg">
                        1,228.39 USDT
                      </span>
                    </div>
                  </div>
                </div>

                {/* 到账说明 */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <div className="flex items-start space-x-2">
                    <div className={`w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5`}></div>
                    <div>
                      <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                        结算说明
                      </p>
                      <p className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'} mt-1`}>
                        结算后，资金将自动进入您的现货账户，通常在1-3分钟内到账
                      </p>
                    </div>
                  </div>
                </div>

                {/* 即将过期提醒 */}
                <div className={`p-3 rounded-lg ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
                  <div className="flex items-start space-x-2">
                    <div className={`w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5`}></div>
                    <div>
                      <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                        过期提醒
                      </p>
                      <p className={`text-xs ${isDark ? 'text-red-400' : 'text-red-600'} mt-1`}>
                        45.30 USDT 佣金将在3天后过期，建议尽快结算
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 按钮组 */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowSettlementModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all border ${
                    isDark 
                      ? "border-gray-600 bg-transparent hover:bg-gray-700 text-gray-300" 
                      : "border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    // 这里处理结算逻辑
                    alert('结算成功！资金已转入现货账户')
                    setShowSettlementModal(false)
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    isDark 
                      ? "bg-[#14C2A3] hover:bg-[#0ea888] text-white" 
                      : "bg-[#14C2A3] hover:bg-[#0ea888] text-white"
                  }`}
                >
                  确认结算
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}