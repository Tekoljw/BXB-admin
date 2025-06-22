'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, DollarSign, ArrowDown, ArrowUp, TrendingUp, TrendingDown, Plus, ArrowLeftRight, FileText, X, MessageCircle, Users, CheckCircle, Eye } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

export default function WalletPage() {
  const { isDark } = useTheme()
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showAddCreditModal, setShowAddCreditModal] = useState(false)
  const [showExtendTimeModal, setShowExtendTimeModal] = useState(false)
  const [transferAmount, setTransferAmount] = useState("")
  const [creditAmount, setCreditAmount] = useState("")
  const [extendDays, setExtendDays] = useState("30")

  const cardStyle = isDark 
    ? 'bg-gray-800/50 border-gray-700/50' 
    : 'bg-white border-gray-200/50'

  const handleCardClick = (cardType: string) => {
    setSelectedCard(cardType)
  }

  const renderGuaranteeContent = () => {
    if (!selectedCard) return null

    switch (selectedCard) {
      case "receivable":
        return (
          <div className="space-y-4">
            {/* USDT买卖担保 */}
            <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm hover:shadow-md transition-all duration-200`}>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="px-3 py-1 bg-[#00D4AA] text-black rounded-full text-xs font-semibold">
                      USDT买卖担保
                    </span>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>交易对象：</span>
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">U</div>
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-black'} font-medium`}>123789</span>
                        <button className="text-[#00D4AA] hover:text-[#00B894] transition-colors" title="联系用户">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>担保群：</span>
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">G</div>
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-black'} font-medium`}>123123</span>
                        <button className="text-blue-500 hover:text-blue-600 transition-colors" title="进入担保群">
                          <Users className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      5,000.00 USDT
                    </span>
                  </div>
                  
                  <div>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>担保内容 </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                      购买5000 USDT，汇率7.20，总价36000元人民币，银行卡转账支付，商户信誉良好
                    </span>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      查看合同
                    </Button>
                    <div className="text-right">
                      <span className="text-sm text-yellow-600">等待对方确认</span>
                      <div className="text-xs text-gray-500 mt-1">自动确认：<span className="font-mono">23:45:12</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 其他担保交易记录 - 9条更多数据 */}
            {[
              { id: 1, type: "其他担保交易", amount: "2,500.00", status: "争议中，等待仲裁", user: "456456", content: "虚拟商品交易担保，游戏道具出售，价值2500 USDT，买方已付款等待确认收货" },
              { id: 2, type: "USDT买卖担保", amount: "1,800.00", status: "等待对方确认", user: "789789", content: "出售1800 USDT给用户，汇率7.25，总价13050元，微信转账支付", countdown: "15:30:45" },
              { id: 3, type: "其他担保交易", amount: "3,200.00", status: "争议中，等待仲裁", user: "321321", content: "NFT艺术品交易，数字收藏品买卖，买方质疑作品真实性" },
              { id: 4, type: "USDT买卖担保", amount: "950.00", status: "等待对方确认", user: "654654", content: "购买950 USDT，汇率7.18，总价6821元，支付宝转账", countdown: "08:22:15" },
              { id: 5, type: "其他担保交易", amount: "4,500.00", status: "等待对方确认", user: "987987", content: "域名交易担保，优质域名出售，买方已确认域名价值", countdown: "04:15:30" },
              { id: 6, type: "USDT买卖担保", amount: "2,100.00", status: "争议中，等待仲裁", user: "147147", content: "出售2100 USDT，买方声称未收到货币，正在仲裁处理中" },
              { id: 7, type: "其他担保交易", amount: "1,200.00", status: "等待对方确认", user: "258258", content: "软件开发服务担保，定制化程序开发项目", countdown: "12:45:20" },
              { id: 8, type: "USDT买卖担保", amount: "5,800.00", status: "等待对方确认", user: "369369", content: "购买5800 USDT，汇率7.22，总价41876元，银行转账支付", countdown: "20:10:35" },
              { id: 9, type: "其他担保交易", amount: "800.00", status: "等待对方确认", user: "741741", content: "知识产权交易，专利授权使用，等待最终确认", countdown: "06:18:42" }
            ].map((record) => (
              <div key={record.id} className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm hover:shadow-md transition-all duration-200`}>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${record.type === "USDT买卖担保" ? "bg-[#00D4AA] text-black" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}>
                        {record.type}
                      </span>
                      <div className="flex flex-col items-end space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>交易对象：</span>
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">U</div>
                          <span className={`text-sm ${isDark ? 'text-white' : 'text-black'} font-medium`}>{record.user}</span>
                          <button className="text-[#00D4AA] hover:text-[#00B894] transition-colors" title="联系用户">
                            <MessageCircle className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>担保群：</span>
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">G</div>
                          <span className={`text-sm ${isDark ? 'text-white' : 'text-black'} font-medium`}>{record.user}</span>
                          <button className="text-blue-500 hover:text-blue-600 transition-colors" title="进入担保群">
                            <Users className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {record.amount} USDT
                      </span>
                    </div>
                    
                    <div>
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>担保内容 </span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                        {record.content}
                      </span>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        查看合同
                      </Button>
                      <div className="text-right">
                        {record.status.includes("争议") ? (
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Button className="bg-black hover:bg-gray-800 text-white h-7 text-xs px-3">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                确认结束争议
                              </Button>
                            </div>
                            <span className="text-sm text-red-600">{record.status}</span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-sm text-yellow-600">{record.status}</span>
                            {record.countdown && (
                              <div className="text-xs text-gray-500 mt-1">自动确认：<span className="font-mono">{record.countdown}</span></div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 查看更多按钮 */}
            <div className="flex justify-center pt-4">
              <Button 
                variant="outline" 
                className={`${isDark ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'} px-8`}
              >
                查看更多
              </Button>
            </div>
          </div>
        )

      case "payable":
        return (
          <div className="space-y-4">
            {/* USDT买卖担保 */}
            <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm hover:shadow-md transition-all duration-200`}>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="px-3 py-1 bg-[#00D4AA] text-black rounded-full text-xs font-semibold">
                      USDT买卖担保
                    </span>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>交易对象：</span>
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">U</div>
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-black'} font-medium`}>123456</span>
                        <button className="text-[#00D4AA] hover:text-[#00B894] transition-colors" title="联系用户">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>担保群：</span>
                        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">G</div>
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-black'} font-medium`}>123456</span>
                        <button className="text-blue-500 hover:text-blue-600 transition-colors" title="进入担保群">
                          <Users className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      3,000.00 USDT
                    </span>
                  </div>
                  
                  <div>
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>担保内容 </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                      出售3000 USDT给用户，汇率7.18，总价21540元，支付宝转账，已收到买方付款
                    </span>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      查看合同
                    </Button>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Button className="bg-black hover:bg-gray-800 text-white h-7 text-xs px-3">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          确认
                        </Button>
                        <Button variant="outline" className="h-7 text-xs px-3 text-red-600 border-red-600 hover:bg-red-50">
                          请求仲裁
                        </Button>
                      </div>
                      <div className="text-xs text-gray-500">自动确认：<span className="font-mono">12:34:56</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 其他担保交易记录 - 应付款 9条数据 */}
            {[
              { id: 1, type: "其他担保交易", amount: "1,200.00", status: "争议中，等待仲裁", user: "987987", content: "数字艺术品交易，NFT作品出售，买方质疑作品真实性，目前在仲裁阶段处理中" },
              { id: 2, type: "USDT买卖担保", amount: "2,800.00", status: "等待对方确认", user: "654321", content: "购买2800 USDT，汇率7.19，总价20132元，支付宝转账", countdown: "18:25:40" },
              { id: 3, type: "其他担保交易", amount: "3,500.00", status: "等待对方确认", user: "111222", content: "软件授权交易，企业级软件许可证购买", countdown: "06:30:15" },
              { id: 4, type: "USDT买卖担保", amount: "1,500.00", status: "争议中，等待仲裁", user: "333444", content: "出售1500 USDT，买方声称转账失败，正在调查中" },
              { id: 5, type: "其他担保交易", amount: "4,200.00", status: "等待对方确认", user: "555666", content: "高端设备交易，专业摄影器材买卖", countdown: "14:45:22" },
              { id: 6, type: "USDT买卖担保", amount: "750.00", status: "等待对方确认", user: "777888", content: "购买750 USDT，汇率7.23，总价5422.5元，银行转账", countdown: "03:12:08" },
              { id: 7, type: "其他担保交易", amount: "2,100.00", status: "争议中，等待仲裁", user: "999000", content: "域名服务交易，premium域名转让争议" },
              { id: 8, type: "USDT买卖担保", amount: "6,200.00", status: "等待对方确认", user: "852852", content: "出售6200 USDT，汇率7.21，总价44702元，微信支付", countdown: "09:33:17" },
              { id: 9, type: "其他担保交易", amount: "1,750.00", status: "等待对方确认", user: "963963", content: "在线课程交易，专业技能培训服务", countdown: "11:27:09" }
            ].map((record) => (
              <div key={record.id} className={`${isDark ? 'bg-gray-800/50' : 'bg-white'} rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-sm hover:shadow-md transition-all duration-200`}>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${record.type === "USDT买卖担保" ? "bg-[#00D4AA] text-black" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}>
                        {record.type}
                      </span>
                      <div className="flex flex-col items-end space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>交易对象：</span>
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">U</div>
                          <span className={`text-sm ${isDark ? 'text-white' : 'text-black'} font-medium`}>{record.user}</span>
                          <button className="text-[#00D4AA] hover:text-[#00B894] transition-colors" title="联系用户">
                            <MessageCircle className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>担保群：</span>
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs">G</div>
                          <span className={`text-sm ${isDark ? 'text-white' : 'text-black'} font-medium`}>{record.user}</span>
                          <button className="text-blue-500 hover:text-blue-600 transition-colors" title="进入担保群">
                            <Users className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {record.amount} USDT
                      </span>
                    </div>
                    
                    <div>
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>担保内容 </span>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                        {record.content}
                      </span>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        查看合同
                      </Button>
                      <div className="text-right">
                        {record.status.includes("争议") ? (
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Button className="bg-black hover:bg-gray-800 text-white h-7 text-xs px-3">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                确认结束争议
                              </Button>
                            </div>
                            <span className="text-sm text-red-600">{record.status}</span>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Button className="bg-black hover:bg-gray-800 text-white h-7 text-xs px-3">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                确认
                              </Button>
                              <Button variant="outline" className="h-7 text-xs px-3 text-red-600 border-red-600 hover:bg-red-50">
                                请求仲裁
                              </Button>
                            </div>
                            <span className="text-sm text-yellow-600">{record.status}</span>
                            {record.countdown && (
                              <div className="text-xs text-gray-500 mt-1">自动确认：<span className="font-mono">{record.countdown}</span></div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 查看更多按钮 */}
            <div className="flex justify-center pt-4">
              <Button 
                variant="outline" 
                className={`${isDark ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'} px-8`}
              >
                查看更多
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className={`${cardStyle} rounded-lg p-6 space-y-6`}>
            {/* 担保账户卡片区域 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              
              {/* 应收担保金额 */}
              <Card 
                className={`${cardStyle} cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCard === "receivable" ? "ring-2 ring-[#00D4AA] shadow-lg shadow-[#00D4AA]/20" : ""
                }`}
                onClick={() => handleCardClick("receivable")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center justify-between`}>
                    <div className="flex items-center">
                      <ArrowDown className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                      应收担保金额
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-[#00D4AA] font-medium">USDT</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${isDark ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'} h-6 text-xs px-2`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        记录
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-1">
                        <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          1,234.56
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="text-xs text-gray-500">
                      3 笔担保中
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400">
                      24H内将到账：12,345 USDT
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 应付担保金额 */}
              <Card 
                className={`${cardStyle} cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCard === "payable" ? "ring-2 ring-[#00D4AA] shadow-lg shadow-[#00D4AA]/20" : ""
                }`}
                onClick={() => handleCardClick("payable")}
              >
                <CardHeader className="pb-3">
                  <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center justify-between`}>
                    <div className="flex items-center">
                      <ArrowUp className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                      应付担保金额
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-[#00D4AA] font-medium">USDT</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${isDark ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'} h-6 text-xs px-2`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        记录
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-1">
                        <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          987.65
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="text-xs text-gray-500">
                      2 笔担保中
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">
                      24H内将释放：87,654 USDT
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 信誉担保金额 */}
              <Card className={`${cardStyle} ${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-50/50 border-gray-200/50'} relative opacity-75`}>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center justify-between`}>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-blue-400 dark:text-blue-500" />
                      信誉担保金额
                    </div>
                    <span className="text-xs text-[#00D4AA] font-medium">USDT</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          5,000.00
                        </span>
                        <Button
                          size="sm"
                          className="h-6 w-6 p-0 bg-white hover:bg-gray-100 text-black border border-black rounded"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowAddCreditModal(true)
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      剩余 42 天到期
                    </span>
                    <Button
                      size="sm"
                      className="h-5 px-2 text-xs bg-black hover:bg-gray-800 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowExtendTimeModal(true)
                      }}
                    >
                      延长
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 可用余额 */}
              <Card className={`${cardStyle} ${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-50/50 border-gray-200/50'} relative opacity-75`}>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center justify-between`}>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-[#00D4AA]" />
                      可用余额
                    </div>
                    <span className="text-xs text-[#00D4AA] font-medium">USDT</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-1">
                        <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          2,456.78
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-black hover:bg-gray-800 text-white"
                      onClick={() => setShowTransferModal(true)}
                    >
                      <ArrowLeftRight className="h-3 w-3 mr-1" />
                      划转
                    </Button>
                    <Button
                      size="sm"
                      className="h-7 text-xs bg-white hover:bg-gray-100 text-black border border-black"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      记录
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 担保详情内容 */}
            {selectedCard && (
              <div className="mt-8">
                {renderGuaranteeContent()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}