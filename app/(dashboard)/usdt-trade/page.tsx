"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Star, Shield, Clock, TrendingUp, TrendingDown, Plus, MessageCircle, Filter, RefreshCw, Users, Zap, Building2, ChevronDown, CreditCard, Smartphone, MapPin, Banknote, Loader2, X } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { Button } from "@/components/ui/button"

export default function USDTTradePage() {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState("买入USDT")
  const [tradeMode, setTradeMode] = useState("C2C")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("CNY")
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false)
  const currencyDropdownRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [displayCount, setDisplayCount] = useState(2)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [purchaseAmount, setPurchaseAmount] = useState("")
  const [otcAmount, setOtcAmount] = useState("")
  const [showTradeModal, setShowTradeModal] = useState(false)
  const [tradeModalAnimating, setTradeModalAnimating] = useState(false)
  const [tradeModalClosing, setTradeModalClosing] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [publishModalAnimating, setPublishModalAnimating] = useState(false)
  const [publishModalClosing, setPublishModalClosing] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState<any>(null)
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")
  const [tradeAmount, setTradeAmount] = useState("")
  const [totalPrice, setTotalPrice] = useState("")
  const [publishOrderType, setPublishOrderType] = useState<"buy" | "sell">("buy")
  const [publishPrice, setPublishPrice] = useState("")
  const [publishMinAmount, setPublishMinAmount] = useState("")
  const [publishMaxAmount, setPublishMaxAmount] = useState("")
  const [publishPayments, setPublishPayments] = useState<string[]>([])
  const [publishPeriod, setPublishPeriod] = useState("24小时")
  const [customPayment, setCustomPayment] = useState("")
  const [publishCurrency, setPublishCurrency] = useState("CNY")

  // 支付方式图标映射
  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "银行卡":
        return <CreditCard className="w-3 h-3" />
      case "支付宝":
        return <Smartphone className="w-3 h-3" />
      case "微信":
        return <Smartphone className="w-3 h-3" />
      case "现金上门":
      case "现金交易":
        return <MapPin className="w-3 h-3" />
      default:
        return <Banknote className="w-3 h-3" />
    }
  }

  // 排序支付方式，现金上门排第一
  const sortPaymentMethods = (methods: string[]) => {
    return [...methods].sort((a, b) => {
      if (a.includes("现金")) return -1
      if (b.includes("现金")) return 1
      return 0
    })
  }

  const currencies = [
    { code: "CNY", name: "人民币", symbol: "¥" },
    { code: "USD", name: "美元", symbol: "$" },
    { code: "EUR", name: "欧元", symbol: "€" },
    { code: "HKD", name: "港币", symbol: "HK$" },
    { code: "JPY", name: "日元", symbol: "¥" },
    { code: "KRW", name: "韩元", symbol: "₩" }
  ]

  const paymentMethodsByCurrency: Record<string, string[]> = {
    "CNY": ["现金上门", "支付宝", "微信支付", "银行转账"],
    "USD": ["现金上门", "PayPal", "银行转账", "Western Union"],
    "EUR": ["现金上门", "银行转账", "SEPA", "PayPal"],
    "HKD": ["现金上门", "银行转账", "八达通", "支付宝HK"],
    "JPY": ["现金上门", "银行转账", "Line Pay", "PayPay"],
    "KRW": ["现金上门", "银行转账", "카카오페이", "네이버페이"]
  }

  const getCurrentPaymentMethods = () => {
    return paymentMethodsByCurrency[publishCurrency] || paymentMethodsByCurrency["CNY"]
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setCurrencyDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Auto-select first payment method when currency changes
  useEffect(() => {
    const currentMethods = getCurrentPaymentMethods()
    if (currentMethods.length > 0 && !publishPayments.some(method => currentMethods.includes(method))) {
      setPublishPayments([currentMethods[0]])
    }
  }, [publishCurrency])


  const cardStyle = isDark
    ? "bg-[#1a1c2e] border border-[#2a2d42] shadow"
    : "bg-white border border-gray-200 shadow"

  // C2C商家数据
  const c2cMerchants = [
    {
      name: "BitcoinMaster",
      verified: true,
      rating: 4.8,
      orders: 1923,
      price: "7.23",
      note: "要求担保周期12小时",
      limit: "500 - 100000",
      paymentMethods: ["现金交易", "银行卡", "支付宝"],
      responseTime: "剩余 无限制",
      completionRate: "99.2%",
      isFriend: true
    },
    {
      name: "SafeTrader", 
      verified: true,
      rating: 4.9,
      orders: 3521,
      price: "7.22",
      note: "要求担保周期6小时",
      limit: "1000 - 90000",
      paymentMethods: ["银行卡", "微信", "现金上门"],
      responseTime: "剩余 无限制",
      completionRate: "98.8%",
      isFriend: false
    },
    {
      name: "CryptoExpert",
      verified: true,
      rating: 4.7,
      orders: 2156,
      price: "7.24",
      note: "要求担保周期8小时",
      limit: "200 - 50000",
      paymentMethods: ["支付宝", "微信"],
      responseTime: "剩余 无限制",
      completionRate: "99.5%",
      isFriend: false
    },
    {
      name: "USDTKing",
      verified: true,
      rating: 4.6,
      orders: 1876,
      price: "7.26",
      note: "要求担保周期10小时",
      limit: "300 - 80000",
      paymentMethods: ["银行卡", "现金上门", "支付宝"],
      responseTime: "剩余 无限制",
      completionRate: "98.9%",
      isFriend: true
    },
    {
      name: "DigitalTrader",
      verified: true,
      rating: 4.5,
      orders: 1432,
      price: "7.25",
      note: "要求担保周期14小时",
      limit: "100 - 60000",
      paymentMethods: ["微信", "支付宝"],
      responseTime: "剩余 无限制",
      completionRate: "99.1%",
      isFriend: false
    },
    {
      name: "CoinMaster",
      verified: true,
      rating: 4.8,
      orders: 2645,
      price: "7.21",
      note: "要求担保周期4小时",
      limit: "500 - 120000",
      paymentMethods: ["银行卡", "现金交易", "微信", "支付宝"],
      responseTime: "剩余 无限制",
      completionRate: "99.7%",
      isFriend: false
    }
  ]

  // 快捷支付方式
  const paymentMethods = [
    {
      name: "支付宝",
      icon: "💰",
      rate: "7.24",
      fee: "0.1%",
      limit: "100 - 3000",
      status: "可用"
    },
    {
      name: "微信",
      icon: "💬",
      rate: "7.23", 
      fee: "0.15%",
      limit: "100 - 3000",
      status: "可用"
    },
    {
      name: "银行卡",
      icon: "🏦",
      rate: "7.25",
      fee: "0.05%", 
      limit: "500 - 3000",
      status: "可用"
    },
    {
      name: "PayPal",
      icon: "💳",
      rate: "7.20",
      fee: "0.2%",
      limit: "100 - 2000", 
      status: "可用"
    }
  ]

  // OTC服务商
  const otcProviders = [
    {
      name: "Ramp",
      label: "价格最优",
      price: "879.45",
      rate: "7.15",
      payments: ["银行卡", "支付宝", "微信", "Apple Pay"],
      icon: "⚡",
      fees: "1.5%",
      bgColor: "bg-yellow-50 border-yellow-200",
      iconBg: "bg-yellow-500"
    },
    {
      name: "MoonPay", 
      label: "",
      price: "883.14",
      rate: "7.18",
      payments: ["银行卡", "支付宝", "微信"],
      icon: "🌙",
      fees: "2.1%",
      bgColor: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-500"
    },
    {
      name: "Transak",
      label: "",
      price: "885.60",
      rate: "7.20",
      payments: ["银行卡", "支付宝"],
      icon: "🔄",
      fees: "2.3%",
      bgColor: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-500"
    },
    {
      name: "Simplex",
      label: "",
      price: "888.06",
      rate: "7.22",
      payments: ["银行卡", "PayPal"],
      icon: "💎",
      fees: "2.5%",
      bgColor: "bg-red-50 border-red-200",
      iconBg: "bg-red-500"
    }
  ]

  const filteredMerchants = c2cMerchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  // 加载更多功能
  const handleLoadMore = async () => {
    setIsLoading(true)
    // 模拟加载延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    setDisplayCount(prev => prev + 3)
    setIsLoading(false)
  }

  // 打开交易弹窗
  const handleOpenTradeModal = (merchant: any, type: "buy" | "sell") => {
    if (tradeModalClosing) return
    setSelectedMerchant(merchant)
    setTradeType(type)
    setTradeAmount("")
    setTotalPrice("")
    setTradeModalClosing(false)
    setShowTradeModal(true)
    requestAnimationFrame(() => {
      setTradeModalAnimating(true)
    })
  }

  // 关闭交易弹窗
  const handleCloseTradeModal = () => {
    if (tradeModalClosing) return
    setTradeModalClosing(true)
    setTradeModalAnimating(false)
    setTimeout(() => {
      setShowTradeModal(false)
      setSelectedMerchant(null)
      setTradeModalClosing(false)
    }, 300)
  }

  // 打开发布订单弹窗
  const handleOpenPublishModal = () => {
    if (publishModalClosing) return
    console.log('Opening publish modal')
    setPublishModalClosing(false)
    setShowPublishModal(true)
    requestAnimationFrame(() => {
      setPublishModalAnimating(true)
    })
    setPublishPrice("")
    setPublishMinAmount("")
    setPublishMaxAmount("")
    setPublishPayments([])
    console.log('Modal state set to:', true)
  }

  // 关闭发布订单弹窗
  const handleClosePublishModal = () => {
    if (publishModalClosing) return
    setPublishModalClosing(true)
    setPublishModalAnimating(false)
    setTimeout(() => {
      setShowPublishModal(false)
      setPublishModalClosing(false)
    }, 300)
  }

  // 计算总价
  const calculateTotal = (amount: string, price: string) => {
    const amountNum = parseFloat(amount) || 0
    const priceNum = parseFloat(price) || 0
    return (amountNum * priceNum).toFixed(2)
  }

  const displayedMerchants = filteredMerchants.slice(0, displayCount)
  const hasMore = displayCount < filteredMerchants.length

  // 检测屏幕宽度，决定弹窗行为
  const [isLargeScreen, setIsLargeScreen] = useState(true)
  // 控制弹窗模式：true=向外弹出(挤压内容), false=向内弹出(遮盖内容)
  const [isOutwardMode, setIsOutwardMode] = useState(true)
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1536) // 需要至少1536px才能外滑
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div 
      className={`min-h-screen p-6 transition-all duration-500 ease-in-out ${isDark ? "bg-background" : "bg-gray-50"}`}
      style={{ 
        marginRight: isLargeScreen && isOutwardMode && (showTradeModal || showPublishModal) ? '384px' : '0px',
        transition: 'margin-right 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
        <div className="max-w-full mx-auto">
          {/* 主要布局 */}
          <div className="grid grid-cols-12 gap-6">
          
          {/* 左侧筛选面板 */}
          <div className="col-span-3">
            <div className={`${cardStyle} rounded-lg p-4`}>
              
              {/* 弹窗模式切换 */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">弹窗模式</label>
                <div className="flex bg-gray-200 dark:bg-[#252842] rounded-md p-1">
                  <button
                    onClick={() => setIsOutwardMode(true)}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors duration-300 ${
                      isOutwardMode
                        ? "bg-custom-green text-white"
                        : isDark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    向外弹出
                  </button>
                  <button
                    onClick={() => setIsOutwardMode(false)}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors duration-300 ${
                      !isOutwardMode
                        ? "bg-custom-green text-white"
                        : isDark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    向内弹出
                  </button>
                </div>
              </div>

              {/* 买入/卖出切换和发布订单 */}
              <div className="mb-4 space-y-3">
                <div className="relative">
                  <div className="flex bg-gray-200 dark:bg-[#252842] rounded-md p-1">
                    {/* 滑动背景 */}
                    <div
                      className={`absolute top-1 bottom-1 w-1/2 rounded-md transition-all duration-300 ease-in-out ${
                        activeTab === "买入USDT" || activeTab === "买入" ? "bg-custom-green left-1" : "bg-red-500 left-1/2"
                      }`}
                    />

                    {/* 买入按钮 */}
                    <button
                      onClick={() => setActiveTab("买入USDT")}
                      className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                        activeTab === "买入USDT" || activeTab === "买入"
                          ? "text-white"
                          : isDark
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      买入USDT
                    </button>

                    {/* 卖出按钮 */}
                    <button
                      onClick={() => setActiveTab("卖出USDT")}
                      className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                        activeTab === "卖出USDT" || activeTab === "卖出"
                          ? "text-white"
                          : isDark
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      卖出USDT
                    </button>
                  </div>
                </div>


              </div>

              {/* 法币选择下拉框 */}
              <div className="mb-4 relative" ref={currencyDropdownRef}>
                <button
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                    isDark
                      ? "bg-[#252842] border-[#3a3d4a] text-white hover:bg-[#2a2d42]"
                      : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{currencies.find(c => c.code === selectedCurrency)?.symbol}</span>
                    <span>{currencies.find(c => c.code === selectedCurrency)?.name}</span>
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      currencyDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* 下拉菜单 */}
                <div 
                  className={`absolute top-full left-0 right-0 mt-1 z-50 rounded-lg border shadow-lg transition-all duration-200 ${
                    currencyDropdownOpen 
                      ? "opacity-100 visible translate-y-0" 
                      : "opacity-0 invisible -translate-y-2"
                  } ${
                    isDark
                      ? "bg-[#252842] border-[#3a3d4a]"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency.code)
                        setCurrencyDropdownOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedCurrency === currency.code
                          ? isDark
                            ? "bg-custom-green/20 text-custom-green"
                            : "bg-custom-green/10 text-custom-green"
                          : isDark
                            ? "text-gray-300 hover:bg-[#2a2d42]"
                            : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-medium">{currency.symbol}</span>
                      <span>{currency.name}</span>
                      <span className="text-xs text-gray-500">({currency.code})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 交易模式 */}
              <div className="mb-4">
                <div className="space-y-2">
                  {[
                    { 
                      mode: "C2C", 
                      icon: Users, 
                      advantages: ["价格灵活", "支付多样"],
                      disadvantages: ["交易时间长", "需要沟通", "风险较高"]
                    },
                    { 
                      mode: "快捷", 
                      icon: Zap, 
                      advantages: ["交易快速", "操作简单", "手续费低"],
                      disadvantages: ["价格固定"]
                    },
                    { 
                      mode: "OTC", 
                      icon: Building2, 
                      advantages: ["大额交易", "专业服务", "安全可靠"],
                      disadvantages: ["门槛较高", "定制化"]
                    }
                  ].map(({ mode, icon: Icon, advantages, disadvantages }) => (
                    <button
                      key={mode}
                      onClick={() => setTradeMode(mode)}
                      className={`w-full px-3 py-3 rounded-lg text-sm transition-all cursor-pointer ${
                        tradeMode === mode
                          ? isDark 
                            ? "border-2 border-custom-green bg-[#1a1c2e]/50 text-white shadow-lg" 
                            : "border-2 border-custom-green bg-custom-green/5 text-gray-900 shadow-lg"
                          : isDark
                            ? "border border-[#3a3d4a] text-gray-300 hover:bg-[#2a2d42] hover:border-custom-green/50"
                            : "border border-gray-200 text-gray-600 hover:border-custom-green hover:bg-gray-50 hover:shadow-md"
                      }`}
                      style={{ transform: 'none' }}
                    >
                      <div className="flex flex-col space-y-2">
                        <div className="font-bold text-left text-base flex items-center space-x-2">
                          <Icon className="w-4 h-4" />
                          <span>{mode}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {advantages.map((tag, index) => (
                            <span 
                              key={`adv-${index}`}
                              className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700"
                            >
                              {tag}
                            </span>
                          ))}
                          {disadvantages.map((tag, index) => (
                            <span 
                              key={`dis-${index}`}
                              className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 筛选支付方式 */}
              <div className="mb-4">
                <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                  筛选支付方式
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sortPaymentMethods(["现金交易", "银行卡", "支付宝", "微信", "现金上门"]).map((payment) => {
                    const isCash = payment.includes("现金")
                    return (
                      <button
                        key={payment}
                        onClick={() => {
                          if (selectedPayments.includes(payment)) {
                            setSelectedPayments(prev => prev.filter(p => p !== payment))
                          } else {
                            setSelectedPayments(prev => [...prev, payment])
                          }
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border-2 flex items-center gap-1 ${
                          selectedPayments.includes(payment)
                            ? "border-custom-green bg-custom-green/10 text-custom-green"
                            : isCash
                              ? "border-orange-200 bg-orange-50 text-orange-800 hover:bg-orange-100"
                              : isDark
                                ? "border-[#3a3d4a] bg-[#2a2d42] text-gray-300 hover:bg-[#3a3d4a]"
                                : "border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {getPaymentIcon(payment)}
                        {payment}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 筛选交易金额 */}
              <div className="mb-4">
                <h3 className={`font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                  筛选交易金额
                </h3>
                <div className="space-y-3">
                  {/* 快捷金额 */}
                  <div>
                    <p className={`text-xs mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>快捷金额</p>
                    <div className="grid grid-cols-2 gap-2">
                      {["1000", "5000", "10000", "50000"].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => {
                            setMinAmount("")
                            setMaxAmount(amount)
                          }}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border-2 ${
                            maxAmount === amount && !minAmount
                              ? "border-custom-green bg-custom-green/10 text-custom-green"
                              : isDark
                                ? "border-[#3a3d4a] bg-[#2a2d42] text-gray-300 hover:bg-[#3a3d4a]"
                                : "border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {amount} USDT
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 自定义金额 */}
                  <div>
                    <p className={`text-xs mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>自定义范围</p>
                    <div className="space-y-2">
                      <input
                        type="number"
                        placeholder="最小 USDT"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                          isDark
                            ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                        }`}
                      />
                      <input
                        type="number"
                        placeholder="最大 USDT"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                          isDark
                            ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                        }`}
                      />
                      <button
                        onClick={() => {
                          // Apply filter logic here
                          console.log('Filtering with amounts:', minAmount, maxAmount)
                        }}
                        className="w-full px-3 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all"
                      >
                        筛选
                      </button>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

          {/* 主要内容区域 */}
          <div className="col-span-9">
            
            {/* 搜索和操作栏 */}
            <div className={`${cardStyle} rounded-lg p-4 mb-6`}>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`} />
                  <input
                    type="text"
                    placeholder="搜索商家或订单"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                      isDark
                        ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500"
                        : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
                    }`}
                  />
                </div>
                
                {/* 排序下拉框 */}
                <select
                  className={`px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-custom-green/50 ${
                    isDark
                      ? "bg-[#252842] border-[#3a3d4a] text-white"
                      : "bg-white border-gray-300 text-gray-800"
                  }`}
                >
                  <option value="price">价格排序</option>
                  <option value="time">时间排序</option>
                  <option value="reputation">信誉排序</option>
                </select>
                
                <button className={`p-2 rounded-lg border transition-all ${
                  isDark ? "border-[#3a3d4a] hover:bg-[#2a2d42]" : "border-gray-300 hover:bg-gray-50"
                }`}>
                  <RefreshCw className="w-4 h-4" />
                </button>
                
                {tradeMode === "C2C" && (
                  <button 
                    onClick={handleOpenPublishModal}
                    className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>发布订单</span>
                  </button>
                )}
              </div>
            </div>

            {/* 内容展示区域 */}
            <div className={`${cardStyle} rounded-lg`}>
              
              {/* C2C模式 */}
              {tradeMode === "C2C" && (
                <div className="divide-y divide-gray-200 dark:divide-[#3a3d4a]">
                  {/* 商家卡片列表 */}
                  {displayedMerchants.map((merchant, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-[#252842] transition-all">
                      {/* 卡片布局 - 对齐设计 */}
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* 商家信息 */}
                        <div className="col-span-3 flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-300">
                              {merchant.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-1">
                              <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                                {merchant.name}
                              </span>
                              {merchant.verified && (
                                <Shield className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                {merchant.rating}
                              </div>
                              <span>•</span>
                              <span>{merchant.orders}单</span>
                            </div>
                          </div>
                        </div>

                        {/* 价格 */}
                        <div className="col-span-2">
                          <div className="text-lg font-bold text-custom-green">¥{merchant.price}</div>
                          <div className="text-xs text-gray-400">{merchant.responseTime}</div>
                        </div>

                        {/* 限额 */}
                        <div className="col-span-2">
                          <div className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                            ¥{merchant.limit}
                          </div>
                          <div className="text-xs text-blue-600">{merchant.note}</div>
                        </div>

                        {/* 支付方式 */}
                        <div className="col-span-3">
                          <div className="flex flex-wrap gap-1">
                            {sortPaymentMethods(merchant.paymentMethods).slice(0, 2).map((method, index) => {
                              const isCash = method.includes("现金")
                              return (
                                <span 
                                  key={index}
                                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                                    isCash 
                                      ? "bg-orange-100 text-orange-800 border border-orange-200 font-medium" 
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {getPaymentIcon(method)}
                                  {method}
                                </span>
                              )
                            })}
                            {merchant.paymentMethods.length > 2 && (
                              <span className="text-xs text-gray-500">+{merchant.paymentMethods.length - 2}</span>
                            )}
                          </div>
                        </div>

                        {/* 操作按钮 */}
                        <div className="col-span-2 flex items-center justify-end space-x-2">
                          <button 
                            className="bg-white border border-black text-black px-2 py-1.5 rounded text-xs hover:bg-gray-50 transition-all h-8 flex items-center justify-center"
                            onClick={() => {
                              if (merchant.isFriend) {
                                console.log('开始对话:', merchant.name)
                              } else {
                                console.log('添加好友:', merchant.name)
                              }
                            }}
                          >
                            {merchant.isFriend ? <MessageCircle className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          </button>
                          <button 
                            className={`px-3 py-1.5 rounded text-xs font-medium transition-all h-8 flex items-center justify-center ${
                              activeTab.includes("买入") 
                                ? "bg-custom-green text-white hover:bg-custom-green/90" 
                                : "bg-red-500 text-white hover:bg-red-600"
                            }`}
                            onClick={() => handleOpenTradeModal(merchant, activeTab.includes("买入") ? "buy" : "sell")}
                          >
                            {activeTab.includes("买入") ? "买入" : "卖出"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* 加载更多按钮 */}
                  {hasMore && (
                    <div className="p-4 border-t border-gray-200 dark:border-[#3a3d4a] flex justify-center">
                      <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                          isDark
                            ? "bg-[#252842] border border-[#3a3d4a] text-gray-300 hover:bg-[#2a2d42] disabled:opacity-50"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        }`}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>加载中...</span>
                          </>
                        ) : (
                          <>
                            <span>加载更多</span>
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 快捷模式 */}
              {tradeMode === "快捷" && (
                <div className="p-6">
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className={`rounded-lg border transition-all ${
                        isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"
                      }`}>
                        {/* 卡片主体 - 横向布局 */}
                        <div 
                          className={`p-4 cursor-pointer transition-all hover:border-custom-green hover:shadow-md ${
                            expandedCard === index ? "border-custom-green" : ""
                          }`}
                          onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{method.icon}</span>
                              <div>
                                <div className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                                  {method.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  汇率: ¥{method.rate} • 手续费: {method.fee}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-custom-green">
                                ¥{method.limit.split(" - ")[0]} - ¥{method.limit.split(" - ")[1]}
                              </div>
                              <div className="text-xs text-gray-400">
                                {method.status}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 展开内容 */}
                        <div 
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedCard === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className={`px-4 pb-4 border-t ${
                            isDark ? "border-[#3a3d4a] bg-[#252842]" : "border-gray-200 bg-gray-50"
                          }`}>
                            <div className={`pt-4 transform transition-transform duration-300 ease-in-out ${
                              expandedCard === index ? "translate-y-0" : "-translate-y-2"
                            }`}>
                              <h4 className={`text-sm font-medium mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                                购买金额
                              </h4>
                              
                              <div className="mb-4">
                                <input
                                  type="text"
                                  placeholder={`输入金额 (¥${method.limit.split(" - ")[0]} - ¥${method.limit.split(" - ")[1]})`}
                                  value={purchaseAmount}
                                  onChange={(e) => setPurchaseAmount(e.target.value)}
                                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green transition-all ${
                                    isDark 
                                      ? "bg-[#1a1c2e] border-[#3a3d4a] text-white" 
                                      : "bg-white border-gray-300 text-gray-900"
                                  }`}
                                />
                              </div>

                              <div className="mb-4">
                                <div className={`text-sm transition-all ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                                  约合 0 USDT （今日刹余额度1000USDT）
                                </div>
                              </div>

                              <div className="grid grid-cols-4 gap-2 mb-4">
                                {["100", "500", "1000", "3000"].map((amount) => (
                                  <button
                                    key={amount}
                                    onClick={() => setPurchaseAmount(amount)}
                                    className={`py-2 px-3 text-sm border rounded-lg transition-all hover:border-custom-green transform hover:scale-105 ${
                                      isDark 
                                        ? "border-[#3a3d4a] text-gray-300 hover:bg-[#2a2d42]" 
                                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                                  >
                                    ¥{amount}
                                  </button>
                                ))}
                              </div>

                              <button className={`w-full py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] ${
                                activeTab.includes("买入")
                                  ? "bg-custom-green text-white hover:bg-custom-green/90"
                                  : "bg-red-500 text-white hover:bg-red-600"
                              }`}>
                                {activeTab.includes("买入") ? "确认购买" : "确认卖出"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OTC模式 */}
              {tradeMode === "OTC" && (
                <div className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
                    请选择服务商
                  </h3>
                  
                  <div className="space-y-3">
                    {otcProviders.map((provider, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md hover:border-custom-green ${
                          isDark 
                            ? "border-[#3a3d4a] bg-[#1a1c2e] hover:bg-[#252842]" 
                            : "border-gray-200 bg-white hover:shadow-lg"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              isDark ? "bg-[#3a3d4a] text-white" : "bg-gray-100 text-gray-600"
                            }`}>
                              <span className="text-xl">{provider.icon}</span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                                  {provider.name}
                                </span>
                                {provider.label && (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    {provider.label}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-4">
                                {provider.payments.slice(0, 4).map((payment, payIndex) => (
                                  <div key={payIndex} className="flex items-center space-x-1">
                                    {getPaymentIcon(payment)}
                                    <span className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                                      {payment}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                              ¥{provider.price}
                            </div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                              折合 ¥{provider.rate}/USDT
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 交易弹窗 */}
      {showTradeModal && selectedMerchant && (
        <>
          {/* 点击外部区域关闭弹窗 - 大屏幕模式遮罩 */}
          {isLargeScreen && (
            <div 
              className={`fixed inset-0 z-40 transition-opacity duration-500 ${
                isOutwardMode ? "" : "bg-black bg-opacity-30"
              }`}
              onClick={handleCloseTradeModal}
            />
          )}
          
          <div className={`fixed z-50 overflow-hidden ${
            isLargeScreen 
              ? "right-0 top-0 h-full w-96"
              : "inset-0"
          }`}>
            {/* 小屏幕模式的遮罩 */}
            {!isLargeScreen && (
              <div 
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-500" 
                onClick={handleCloseTradeModal}
              />
            )}
          <div 
            className={`h-full w-96 transform transition-all duration-500 ${
              tradeModalAnimating 
                ? isOutwardMode 
                  ? "translate-x-0"      // 向外模式：显示在正常位置
                  : "translate-x-0"      // 向内模式：显示在正常位置
                : isOutwardMode 
                  ? "-translate-x-full"  // 向外模式：隐藏在左侧，从左往右滑出
                  : "translate-x-full"   // 向内模式：隐藏在右侧，从右往左滑入
            } ${isDark ? "bg-[#1a1c2e]" : "bg-white"} shadow-2xl ${
              isLargeScreen 
                ? "border-l" 
                : "absolute right-0 top-0"
            } ${isDark ? "border-[#3a3d4a]" : "border-gray-200"}`}
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform'
            }}
          >
            <div className="p-6 h-full overflow-y-auto">
              {/* 商家信息 */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      {selectedMerchant.name}
                    </span>
                    {selectedMerchant.verified && (
                      <Shield className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {selectedMerchant.rating}★ • {selectedMerchant.orders}单 • 1分钟响应
                  </div>
                </div>
              </div>

              {/* 交易信息 */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>单价</span>
                  <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    ¥{selectedMerchant.price}/USDT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>限额</span>
                  <span className={isDark ? "text-white" : "text-gray-900"}>
                    ¥{selectedMerchant.limit}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? "text-gray-400" : "text-gray-600"}>库存</span>
                  <span className={isDark ? "text-white" : "text-gray-900"}>
                    {tradeType === "buy" ? "无限制 USDT" : "48,500 USDT"}
                  </span>
                </div>
              </div>

              {/* 交易数量输入 */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {tradeType === "buy" ? "买入数量 (USDT)" : "卖出数量 (USDT)"}
                </label>
                <input
                  type="text"
                  placeholder={tradeType === "buy" ? "最少 500" : "最少 100"}
                  value={tradeAmount}
                  onChange={(e) => {
                    setTradeAmount(e.target.value)
                    setTotalPrice(calculateTotal(e.target.value, selectedMerchant.price))
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green ${
                    isDark 
                      ? "bg-[#252842] border-[#3a3d4a] text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
                <div className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  总价: ¥{totalPrice || "0.00"}
                </div>
              </div>

              {/* 支付方式 */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                  支付方式
                </label>
                <div className="space-y-2">
                  {selectedMerchant.paymentMethods.slice(0, 3).map((method: string, index: number) => (
                    <div key={index} className={`p-3 border rounded-lg flex items-center space-x-2 ${
                      isDark ? "border-[#3a3d4a] bg-[#252842]" : "border-gray-200 bg-gray-50"
                    }`}>
                      {getPaymentIcon(method)}
                      <span className={isDark ? "text-white" : "text-gray-900"}>{method}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className={`w-full py-3 rounded-lg font-medium transition-all ${
                tradeType === "buy"
                  ? "bg-custom-green text-white hover:bg-custom-green/90"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}>
                下一步
              </button>
            </div>
          </div>
          </div>
        </>
      )}

      {/* 发布订单弹窗 */}
      {showPublishModal && (
        <>
          {/* 点击外部区域关闭弹窗 - 大屏幕模式遮罩 */}
          {isLargeScreen && (
            <div 
              className={`fixed inset-0 z-40 transition-opacity duration-500 ${
                isOutwardMode ? "" : "bg-black bg-opacity-30"
              }`}
              onClick={handleClosePublishModal}
            />
          )}
          
          <div className={`fixed z-[9999] overflow-hidden ${
            isLargeScreen 
              ? "right-0 top-0 h-full w-96"
              : "inset-0"
          }`}>
            {/* 小屏幕模式的遮罩 */}
            {!isLargeScreen && (
              <div 
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-500" 
                onClick={handleClosePublishModal}
              />
            )}
          <div 
            className={`h-full w-96 transform transition-all duration-500 ${
              publishModalAnimating 
                ? isOutwardMode 
                  ? "translate-x-0"      // 向外模式：显示在正常位置
                  : "translate-x-0"      // 向内模式：显示在正常位置
                : isOutwardMode 
                  ? "-translate-x-full"  // 向外模式：隐藏在左侧，从左往右滑出
                  : "translate-x-full"   // 向内模式：隐藏在右侧，从右往左滑入
            } ${isDark ? "bg-[#1a1c2e]" : "bg-white"} shadow-2xl ${
              isLargeScreen 
                ? "border-l" 
                : "absolute right-0 top-0"
            } ${isDark ? "border-[#3a3d4a]" : "border-gray-200"}`}
            style={{ 
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform'
            }}
          >
            <div className="p-6 h-full overflow-y-auto">
              {/* 页签切换 */}
              <div className="mb-6">
                <div className={`flex rounded-lg border ${isDark ? "border-[#3a3d4a] bg-[#252842]" : "border-gray-200 bg-gray-50"}`}>
                  <button
                    onClick={() => setPublishOrderType("buy")}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-all rounded-l-lg ${
                      publishOrderType === "buy"
                        ? "bg-white text-gray-900 shadow-sm"
                        : isDark 
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    买入
                  </button>
                  <button
                    onClick={() => setPublishOrderType("sell")}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-all rounded-r-lg ${
                      publishOrderType === "sell"
                        ? "bg-white text-gray-900 shadow-sm"
                        : isDark 
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    卖出
                  </button>
                </div>
              </div>

              {/* 法币选择 */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  法币币种
                </label>
                <select 
                  value={publishCurrency}
                  onChange={(e) => setPublishCurrency(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green ${
                    isDark 
                      ? "bg-[#252842] border-[#3a3d4a] text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}>
                  <option value="CNY">CNY - 人民币</option>
                  <option value="USD">USD - 美元</option>
                  <option value="EUR">EUR - 欧元</option>
                  <option value="HKD">HKD - 港币</option>
                  <option value="JPY">JPY - 日元</option>
                  <option value="KRW">KRW - 韩元</option>
                </select>
              </div>

              {/* 支付方式选择 */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                  支付方式
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {getCurrentPaymentMethods().map((method) => (
                    <button
                      key={method}
                      onClick={() => {
                        if (publishPayments.includes(method)) {
                          setPublishPayments(publishPayments.filter(p => p !== method))
                        } else {
                          setPublishPayments([...publishPayments, method])
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-xs flex items-center space-x-1 transition-all ${
                        publishPayments.includes(method)
                          ? "bg-green-100 text-green-800 border border-green-300"
                          : isDark 
                            ? "bg-[#252842] text-gray-300 border border-[#3a3d4a] hover:bg-[#2a2d42]"
                            : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      {getPaymentIcon(method)}
                      <span>
                        {method}
                      </span>
                    </button>
                  ))}
                </div>
                
                {/* 手动添加支付方式 */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="手动输入支付方式"
                    value={customPayment}
                    onChange={(e) => setCustomPayment(e.target.value)}
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-custom-green ${
                      isDark 
                        ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-500" 
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    }`}
                  />
                  <button
                    onClick={() => {
                      if (customPayment.trim() && !publishPayments.includes(customPayment.trim())) {
                        setPublishPayments([...publishPayments, customPayment.trim()])
                        setCustomPayment("")
                      }
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isDark 
                        ? "bg-[#252842] text-gray-300 border border-[#3a3d4a] hover:bg-[#2a2d42]"
                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    添加
                  </button>
                </div>
              </div>

              {/* 交易总金额 */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  交易总金额
                </label>
                <input
                  type="text"
                  placeholder="输入交易总金额"
                  value={publishPrice}
                  onChange={(e) => setPublishPrice(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green ${
                    isDark 
                      ? "bg-[#252842] border-[#3a3d4a] text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              {/* 要求担保周期 */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  要求担保周期
                </label>
                <select
                  value={publishPeriod}
                  onChange={(e) => setPublishPeriod(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green ${
                    isDark 
                      ? "bg-[#252842] border-[#3a3d4a] text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="24小时">24小时</option>
                  <option value="12小时">12小时</option>
                  <option value="6小时">6小时</option>
                  <option value="3小时">3小时</option>
                </select>
              </div>

              <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all">
                发布订单
              </button>
            </div>
          </div>
          </div>
        </>
      )}
    </div>
  )
}