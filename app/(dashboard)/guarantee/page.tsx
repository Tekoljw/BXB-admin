"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { 
  Shield, 
  ArrowLeftRight,
  FileText,
  Plus,
  Clock,
  Eye,
  ChevronRight,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  X
} from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"

export default function GuaranteePage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [selectedCard, setSelectedCard] = useState("receivable") // "receivable", "payable", "credit", "balance"
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showAddCreditModal, setShowAddCreditModal] = useState(false)
  const [showExtendTimeModal, setShowExtendTimeModal] = useState(false)
  const [showContractModal, setShowContractModal] = useState(false)
  const [selectedContract, setSelectedContract] = useState(null)
  const [transferAmount, setTransferAmount] = useState("")
  const [creditAmount, setCreditAmount] = useState("")
  const [extendDays, setExtendDays] = useState("30")
  const [isMobile, setIsMobile] = useState(false)

  const isDark = theme === "dark"

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 担保账户数据
  const guaranteeData = {
    availableBalance: "2,456.78",
    receivableAmount: "1,234.56",
    payableAmount: "987.65",
    creditAmount: "5,000.00",
    creditExpiry: "2024-03-15"
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

  const cardStyle = isDark 
    ? "bg-[#1a1d29] border-[#252842]" 
    : "bg-white border-gray-200"

  const handleCardClick = (cardType: string) => {
    if (cardType !== "balance") {
      setSelectedCard(cardType)
    }
  }

  const handleViewContract = (contractId: string) => {
    setSelectedContract(contractDetails[contractId])
    setShowContractModal(true)
  }

  const handleTransfer = () => {
    // 处理划转逻辑
    console.log("划转金额:", transferAmount)
    setShowTransferModal(false)
    setTransferAmount("")
  }

  const handleAddCredit = () => {
    // 处理添加信誉担保金额逻辑
    console.log("添加信誉担保:", creditAmount)
    setShowAddCreditModal(false)
    setCreditAmount("")
  }

  const handleExtendTime = () => {
    // 处理延长时间逻辑
    console.log("延长天数:", extendDays)
    setShowExtendTimeModal(false)
    setExtendDays("30")
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-background' : 'bg-gray-50'}`}>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        
        {/* 页面标题 */}
        <div className="flex items-center space-x-3">
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
              <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                应收担保金额
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {guaranteeData.receivableAmount}
                  </div>
                  <div className="text-xs text-[#00D4AA] font-medium">USDT</div>
                </div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                {receivableRecords.length} 笔担保中
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
              <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                应付担保金额
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {guaranteeData.payableAmount}
                  </div>
                  <div className="text-xs text-[#00D4AA] font-medium">USDT</div>
                </div>
                <div className="h-12 w-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                {payableRecords.length} 笔担保中
              </div>
            </CardContent>
          </Card>

          {/* 信誉担保金额 */}
          <Card 
            className={`${cardStyle} cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedCard === "credit" ? "ring-2 ring-[#00D4AA] ring-opacity-50" : ""
            }`}
            onClick={() => handleCardClick("credit")}
          >
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                信誉担保金额
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {guaranteeData.creditAmount}
                  </div>
                  <div className="text-xs text-[#00D4AA] font-medium">USDT</div>
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <Button
                  size="sm"
                  className="h-7 px-3 text-xs bg-[#00D4AA] hover:bg-[#00B894] text-black"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowAddCreditModal(true)
                  }}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  添加金额
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-3 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowExtendTimeModal(true)
                  }}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  延长时间
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 可用余额 */}
          <Card className={`${cardStyle}`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                可用余额
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {guaranteeData.availableBalance}
                  </div>
                  <div className="text-xs text-[#00D4AA] font-medium">USDT</div>
                </div>
                <div className="h-12 w-12 bg-[#00D4AA]/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-[#00D4AA]" />
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
          {selectedCard === "receivable" && (
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
          )}

          {selectedCard === "payable" && (
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
          )}

          {selectedCard === "credit" && (
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
                      {guaranteeData.creditAmount} USDT
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
                      {guaranteeData.creditExpiry}
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
          )}
        </div>

        {/* 划转弹窗 */}
        {showTransferModal && (
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
        )}

        {/* 添加信誉担保弹窗 */}
        {showAddCreditModal && (
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
        )}

        {/* 延长时间弹窗 */}
        {showExtendTimeModal && (
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
        )}

        {/* 合同查看弹窗 */}
        {showContractModal && selectedContract && (
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
        )}
      </div>
    </div>
  )
}