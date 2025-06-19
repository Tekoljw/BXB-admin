"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Search, Plus, MessageCircle, Phone, Video, User, Users, Star, Shield, BookOpen, Smile, Paperclip, Scissors, ArrowUp } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread?: number
  isOnline: boolean
  isActive?: boolean
}

interface Message {
  id: string
  senderId: string
  text: string
  time: string
  isRead: boolean
}

export default function ChatPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // All state hooks in consistent order
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("好友")
  const [selectedContact, setSelectedContact] = useState<string | null>("contact-1")
  const [message, setMessage] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["contact-1", "contact-3"])
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [isMenuAnimating, setIsMenuAnimating] = useState(false)
  const [showUnreadIndicator, setShowUnreadIndicator] = useState(false)
  const [inputHeight, setInputHeight] = useState(140)
  const [isResizing, setIsResizing] = useState(false)
  const [showMemberSidebar, setShowMemberSidebar] = useState(false)
  const [memberSidebarAnimating, setMemberSidebarAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // All refs
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const addMenuRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const firstUnreadRef = useRef<HTMLDivElement>(null)
  const memberSidebarRef = useRef<HTMLDivElement>(null)

  const cardStyle = `${isDark ? 'bg-[#1a1d29] border-[#3a3d4a]' : 'bg-white border-gray-200'} border rounded-lg shadow-sm`

  // Close menu handlers
  const handleShowMenu = useCallback(() => {
    setShowAddMenu(true)
    setIsMenuAnimating(true)
  }, [])

  const handleCloseMenu = useCallback(() => {
    setIsMenuAnimating(false)
    setTimeout(() => {
      setShowAddMenu(false)
    }, 200)
  }, [])

  // Handle send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !selectedContact) return
    console.log(`发送消息到 ${selectedContact}: ${message}`)
    setMessage("")
  }

  // Solve hydration issue
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const tabs = ["好友", "群组", "担保", "通讯录"]

  // Contact data
  const contacts: Contact[] = [
    {
      id: "contact-1",
      name: "交易助手",
      avatar: "🤖",
      lastMessage: "您好，我是您的AI交易助手，有什么可以帮您的吗？",
      time: "09:30",
      unread: 2,
      isOnline: true,
      isActive: true,
    },
    {
      id: "contact-2",
      name: "分析助手",
      avatar: "📊",
      lastMessage: "市场分析报告已生成",
      time: "09:00",
      unread: 1,
      isOnline: true,
    },
    {
      id: "contact-3",
      name: "风控助手",
      avatar: "🛡️",
      lastMessage: "检测到异常交易，请注意风险",
      time: "08:45",
      isOnline: true,
    },
    {
      id: "contact-4",
      name: "BTC交易群",
      avatar: "₿",
      lastMessage: "张三: 今天BTC走势如何？",
      time: "09:15",
      unread: 5,
      isOnline: true,
    },
    {
      id: "contact-5",
      name: "李四",
      avatar: "👨‍💼",
      lastMessage: "我刚看了那个分析报告，非常有见地",
      time: "昨天",
      isOnline: false,
    },
    {
      id: "contact-6",
      name: "王五",
      avatar: "👨‍💻",
      lastMessage: "新的投资策略分享",
      time: "前天",
      isOnline: true,
    },
  ]

  // Friend requests data
  const friendRequests = [
    {
      id: "req-1",
      name: "张三",
      avatar: "👨‍💼",
      message: "你好，我是通过币圈朋友介绍认识的",
      time: "2小时前",
      mutualFriends: 3
    },
    {
      id: "req-2", 
      name: "李娜",
      avatar: "👩‍💼",
      message: "看到你在交易群里的分析很棒",
      time: "5小时前",
      mutualFriends: 1
    },
    {
      id: "req-3",
      name: "赵六",
      avatar: "👨‍🔬",
      message: "一起交流DeFi项目",
      time: "1天前",
      mutualFriends: 0
    }
  ]

  // Message data
  const messages: { [key: string]: Message[] } = {
    "contact-1": [
      {
        id: "msg-1",
        senderId: "contact-1",
        text: "您好，我是您的AI交易助手，有什么可以帮您的吗？",
        time: "09:30",
        isRead: true,
      },
      {
        id: "msg-2",
        senderId: "user",
        text: "你好，我想了解一下比特币最近的走势",
        time: "09:31",
        isRead: true,
      },
    ],
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addMenuItems = [
    { icon: User, label: "添加好友", action: () => console.log("添加好友") },
    { icon: Users, label: "创建群聊", action: () => console.log("创建群聊") },
    { icon: Shield, label: "担保交易", action: () => console.log("担保交易") },
    { icon: BookOpen, label: "通讯录", action: () => console.log("通讯录") },
  ]

  // Render Address Book Layout
  const renderAddressBookLayout = () => (
    <div className={`flex h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} overflow-hidden`}>
      {/* Contact Groups Sidebar */}
      <div 
        className={`${cardStyle} flex flex-col`}
        style={isMobile ? { width: '100vw', minWidth: '100vw', maxWidth: '100vw' } : { minWidth: '416px', maxWidth: '500px', width: 'clamp(416px, 30vw, 500px)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 p-4">
          <div className="relative flex-1">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="搜索联系人"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm transition-colors ${
                isDark
                  ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400 focus:border-[#00D4AA]"
                  : "bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-[#00D4AA]"
              } focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/20`}
            />
          </div>
          <div className="relative" ref={addMenuRef}>
            <button
              onClick={showAddMenu ? handleCloseMenu : handleShowMenu}
              className={`p-2 rounded-lg border transition-all duration-200 ${
                isDark
                  ? "bg-[#252842] border-[#3a3d4a] text-white hover:bg-[#3a3d4a] hover:scale-105"
                  : "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200 hover:scale-105"
              } ${showAddMenu ? "scale-105" : ""}`}
            >
              <Plus className={`h-4 w-4 transition-transform duration-200 ${showAddMenu ? "rotate-45" : ""}`} />
            </button>
            {showAddMenu && (
              <div
                className={`absolute top-full right-0 mt-2 w-56 ${cardStyle} rounded-lg shadow-lg z-50 transition-all duration-150 origin-top-right ${
                  isMenuAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <div className="py-2">
                  {addMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action()
                        handleCloseMenu()
                      }}
                      className={`w-full flex items-center px-4 py-3 text-sm transition-all duration-100 ${
                        isDark
                          ? "text-white hover:bg-[#252842] hover:translate-x-1"
                          : "text-gray-800 hover:bg-gray-100 hover:translate-x-1"
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs for Address Book */}
        <div className={`${isDark ? "bg-[#252842]" : "bg-gray-100"} rounded-lg p-1 mx-4 mb-4`}>
          <div className="flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-2 py-2 text-xs font-medium rounded-md transition-all duration-300 whitespace-nowrap relative ${
                  activeTab === tab
                    ? isDark
                      ? "bg-black text-white shadow-sm"
                      : "bg-black text-white shadow-sm"
                    : isDark
                      ? "text-gray-300 hover:text-white hover:bg-[#1a1d29]/50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact Groups */}
        <div className="flex-1 overflow-y-auto">
          {/* New Friends Entry */}
          <div className="mb-4">
            <div
              className={`flex items-center p-3 mx-2 rounded-lg cursor-pointer transition-all ${
                isDark
                  ? 'hover:bg-[#252842] text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => setSelectedContact("new-friends")}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-lg">
                  👥
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">新好友</h3>
                </div>
                <p className="text-sm opacity-70 truncate">3个新的好友请求</p>
              </div>
            </div>
          </div>

          {/* AI Assistants */}
          <div className="mb-4">
            <div className={`px-4 py-2 text-xs font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              AI助手
            </div>
            {contacts.filter(c => c.name.includes("助手")).map((contact) => (
              <div
                key={contact.id}
                className={`flex items-center p-3 mx-2 rounded-lg cursor-pointer transition-all ${
                  selectedContact === contact.id
                    ? 'bg-[#00D4AA] text-white'
                    : isDark
                    ? 'hover:bg-[#252842] text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setSelectedContact(contact.id)}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg">
                    {contact.avatar}
                  </div>
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{contact.name}</h3>
                    <span className="text-xs opacity-70">{contact.time}</span>
                  </div>
                  <p className="text-sm opacity-70 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread && (
                  <div className="ml-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {contact.unread}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Regular Friends */}
          <div>
            <div className={`px-4 py-2 text-xs font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              好友 (2)
            </div>
            {filteredContacts.filter(c => !c.name.includes("群") && !c.name.includes("助手")).map((contact) => (
              <div
                key={contact.id}
                className={`flex items-center p-3 mx-2 rounded-lg cursor-pointer transition-all ${
                  selectedContact === contact.id
                    ? 'bg-[#00D4AA] text-white'
                    : isDark
                    ? 'hover:bg-[#252842] text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setSelectedContact(contact.id)}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg">
                    {contact.avatar}
                  </div>
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{contact.name}</h3>
                    <span className="text-xs opacity-70">{contact.time}</span>
                  </div>
                  <p className="text-sm opacity-70 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread && (
                  <div className="ml-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {contact.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Right Sidebar */}
      <div className={`flex-1 ${cardStyle} ml-4`}>
        <div className="p-6 h-full overflow-y-auto">
          {selectedContact === "new-friends" ? (
            // 好友添加记录页面 - 原始设计
            <div className="h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>好友添加记录</h2>
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>最近30天</span>
              </div>
              
              {/* 统计概览 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-lg text-center ${isDark ? "bg-[#1a1d29]" : "bg-blue-50"}`}>
                  <div className="text-2xl font-bold text-blue-500 mb-1">15</div>
                  <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>收到请求</div>
                </div>
                <div className={`p-4 rounded-lg text-center ${isDark ? "bg-[#1a1d29]" : "bg-green-50"}`}>
                  <div className="text-2xl font-bold text-green-500 mb-1">12</div>
                  <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>已通过</div>
                </div>
                <div className={`p-4 rounded-lg text-center ${isDark ? "bg-[#1a1d29]" : "bg-orange-50"}`}>
                  <div className="text-2xl font-bold text-orange-500 mb-1">3</div>
                  <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>待处理</div>
                </div>
              </div>

              {/* 筛选标签 */}
              <div className="flex space-x-2 mb-6">
                {["全部", "待处理", "已通过", "已拒绝"].map((filter) => (
                  <button
                    key={filter}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      filter === "待处理"
                        ? "bg-[#00D4AA] text-white"
                        : isDark
                          ? "bg-[#252842] text-gray-300 hover:bg-[#3a3d4a]"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* 好友请求列表 */}
              <div className="space-y-3">
                {friendRequests.map((request) => (
                  <div key={request.id} className={`p-4 rounded-lg border-l-4 border-l-orange-400 ${isDark ? "bg-[#252842] border-r border-t border-b border-[#3a3d4a]" : "bg-white border-r border-t border-b border-gray-200"}`}>
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg">
                          {request.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">!</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{request.name}</h3>
                          <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{request.time}</span>
                        </div>
                        <p className={`text-sm mb-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{request.message}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {request.mutualFriends > 0 && (
                              <span className={`text-xs px-2 py-1 rounded-full ${isDark ? "bg-[#1a1d29] text-blue-400" : "bg-blue-100 text-blue-600"}`}>
                                {request.mutualFriends} 位共同好友
                              </span>
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full ${isDark ? "bg-[#1a1d29] text-gray-400" : "bg-gray-100 text-gray-600"}`}>
                              通过好友推荐
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <button className="flex-1 bg-[#00D4AA] text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#00b89a] transition-colors">
                            通过
                          </button>
                          <button className={`flex-1 border py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            isDark 
                              ? "border-[#3a3d4a] text-gray-300 hover:bg-[#1a1d29]" 
                              : "border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}>
                            忽略
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedContact && contacts.find(c => c.id === selectedContact)?.name.includes("助手") ? (
            // AI助手介绍页面 - 原始设计
            (() => {
              const contact = contacts.find(c => c.id === selectedContact)
              if (!contact) return null
              
              const assistantData = {
                "交易助手": {
                  description: "专业的加密货币交易分析助手，提供实时市场分析和交易建议",
                  capabilities: ["技术分析", "风险评估", "交易策略", "市场预警"],
                  stats: { accuracy: "92.5%", trades: 1580, winRate: "78.3%" }
                },
                "分析助手": {
                  description: "深度市场分析专家，专注于宏观趋势和数据挖掘",
                  capabilities: ["数据分析", "趋势预测", "报告生成", "图表解读"],
                  stats: { accuracy: "89.7%", reports: 450, winRate: "85.1%" }
                },
                "风控助手": {
                  description: "专业风险管理助手，帮助识别和控制交易风险",
                  capabilities: ["风险识别", "止损建议", "仓位管理", "异常监控"],
                  stats: { accuracy: "94.2%", alerts: 2340, prevention: "96.8%" }
                }
              }
              
              const data = assistantData[contact.name] || assistantData["交易助手"]
              
              return (
                <div className="h-full">
                  {/* AI助手头部 */}
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl relative">
                      {contact.avatar}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                        <span className="text-white text-sm">AI</span>
                      </div>
                    </div>
                    <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>{contact.name}</h2>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} max-w-md mx-auto leading-relaxed`}>
                      {data.description}
                    </p>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full mt-4 ${isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"}`}>
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      在线服务中
                    </div>
                  </div>

                  {/* 能力展示 */}
                  <div className="mb-8">
                    <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>核心能力</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {data.capabilities.map((capability, index) => (
                        <div key={index} className={`p-4 rounded-lg text-center ${isDark ? "bg-[#252842]" : "bg-gray-50"}`}>
                          <div className="text-2xl mb-2">
                            {index === 0 ? "📊" : index === 1 ? "🎯" : index === 2 ? "💡" : "🛡️"}
                          </div>
                          <div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                            {capability}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 性能统计 */}
                  <div className="mb-8">
                    <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>性能表现</h3>
                    <div className="space-y-4">
                      {Object.entries(data.stats).map(([key, value], index) => (
                        <div key={key} className={`p-4 rounded-lg ${isDark ? "bg-[#1a1d29]" : "bg-white"} border ${isDark ? "border-[#3a3d4a]" : "border-gray-200"}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                              {key === "accuracy" ? "准确率" : key === "trades" ? "处理交易" : key === "reports" ? "生成报告" : key === "alerts" ? "风险预警" : key === "prevention" ? "风险防范" : "胜率"}
                            </span>
                            <span className={`text-lg font-bold ${index === 0 ? "text-green-500" : index === 1 ? "text-blue-500" : "text-purple-500"}`}>
                              {value}
                            </span>
                          </div>
                          <div className={`w-full h-2 rounded-full ${isDark ? "bg-[#252842]" : "bg-gray-200"}`}>
                            <div 
                              className={`h-2 rounded-full ${index === 0 ? "bg-green-500" : index === 1 ? "bg-blue-500" : "bg-purple-500"}`}
                              style={{ width: typeof value === 'string' && value.includes('%') ? value : '85%' }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="space-y-3">
                    <button className="w-full bg-[#00D4AA] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#00b89a] transition-colors">
                      开始对话
                    </button>
                    <button className={`w-full border py-3 px-4 rounded-lg font-medium transition-colors ${
                      isDark 
                        ? "border-[#3a3d4a] text-gray-300 hover:bg-[#252842]" 
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}>
                      查看历史对话
                    </button>
                  </div>
                </div>
              )
            })()
          ) : selectedContact && contacts.find(c => c.id === selectedContact) ? (
            // 好友个人主页 - 原始设计
            (() => {
              const contact = contacts.find(c => c.id === selectedContact)
              if (!contact) return null
              
              return (
                <div className="h-full">
                  {/* 个人资料头部 */}
                  <div className="relative mb-6">
                    {/* 背景封面 */}
                    <div className="h-32 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    {/* 头像和基本信息 */}
                    <div className="absolute -bottom-8 left-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl border-4 border-white">
                        {contact.avatar}
                      </div>
                    </div>
                    <div className="pt-10 px-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{contact.name}</h2>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>专业交易员 • 币圈老炮</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                              <strong>1.2K</strong> 关注者
                            </span>
                            <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                              <strong>456</strong> 关注中
                            </span>
                            <span className={`${contact.isOnline ? "text-green-500" : "text-gray-400"}`}>
                              {contact.isOnline ? "在线" : "离线"}
                            </span>
                          </div>
                        </div>
                        <button className="bg-[#00D4AA] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00b89a] transition-colors">
                          关注
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 交易成绩 */}
                  <div className="mb-6">
                    <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>交易表现</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${isDark ? "bg-[#252842]" : "bg-green-50"}`}>
                        <div className="text-2xl font-bold text-green-500 mb-1">+127.8%</div>
                        <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>总收益率</div>
                        <div className="flex items-center mt-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1">
                            <div className="bg-green-500 h-1 rounded-full" style={{width: '75%'}}></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">75%</span>
                        </div>
                      </div>
                      <div className={`p-4 rounded-lg ${isDark ? "bg-[#252842]" : "bg-blue-50"}`}>
                        <div className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>82.1%</div>
                        <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>胜率</div>
                        <div className="flex items-center mt-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1">
                            <div className="bg-blue-500 h-1 rounded-full" style={{width: '82%'}}></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">82%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 最近动态 */}
                  <div className="mb-6">
                    <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>最近动态</h3>
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg border-l-4 border-l-green-400 ${isDark ? "bg-[#252842]" : "bg-white"} border ${isDark ? "border-[#3a3d4a]" : "border-gray-200"}`}>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm">
                            {contact.avatar}
                          </div>
                          <div>
                            <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{contact.name}</h4>
                            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>3小时前</p>
                          </div>
                        </div>
                        <p className={`text-sm mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          刚刚在BTC/USDT上实现+15.8%收益，技术分析果然靠谱！下一个目标ETH 📈
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <button className={`flex items-center space-x-1 ${isDark ? "text-gray-400 hover:text-red-500" : "text-gray-500 hover:text-red-500"}`}>
                            <span>👍</span>
                            <span>24</span>
                          </button>
                          <button className={`flex items-center space-x-1 ${isDark ? "text-gray-400 hover:text-blue-500" : "text-gray-500 hover:text-blue-500"}`}>
                            <span>💬</span>
                            <span>8</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-[#00D4AA] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#00b89a] transition-colors">
                      发送消息
                    </button>
                    <button className={`border py-3 px-4 rounded-lg font-medium transition-colors ${
                      isDark 
                        ? "border-[#3a3d4a] text-gray-300 hover:bg-[#252842]" 
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}>
                      跟单交易
                    </button>
                  </div>
                </div>
              )
            })()
          ) : (
            // 默认空状态
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Users className={`h-16 w-16 mx-auto mb-4 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
                <h3 className={`text-lg font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                  选择联系人
                </h3>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  从左侧选择一个联系人查看详情
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Render Regular Chat Layout
  const renderChatLayout = () => (
    <div className={`flex h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} overflow-hidden`}>
      {/* Contact List Sidebar */}
      <div 
        className={`${cardStyle} flex flex-col`}
        style={isMobile ? { width: '100vw', minWidth: '100vw', maxWidth: '100vw' } : { minWidth: '416px', maxWidth: '500px', width: 'clamp(416px, 30vw, 500px)' }}
      >
        {/* Search and Add Button */}
        <div className="flex items-center gap-2 p-4">
          <div className="relative flex-1">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="搜索联系人"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm transition-colors ${
                isDark
                  ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400 focus:border-[#00D4AA]"
                  : "bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-[#00D4AA]"
              } focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/20`}
            />
          </div>

          {/* Add Button Menu */}
          <div className="relative" ref={addMenuRef}>
            <button
              onClick={showAddMenu ? handleCloseMenu : handleShowMenu}
              className={`p-2 rounded-lg border transition-all duration-200 ${
                isDark
                  ? "bg-[#252842] border-[#3a3d4a] text-white hover:bg-[#3a3d4a] hover:scale-105"
                  : "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200 hover:scale-105"
              } ${showAddMenu ? "scale-105" : ""}`}
            >
              <Plus className={`h-4 w-4 transition-transform duration-200 ${showAddMenu ? "rotate-45" : ""}`} />
            </button>

            {showAddMenu && (
              <div
                className={`absolute top-full right-0 mt-2 w-56 ${cardStyle} rounded-lg shadow-lg z-50 transition-all duration-150 origin-top-right ${
                  isMenuAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <div className="py-2">
                  {addMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action()
                        handleCloseMenu()
                      }}
                      className={`w-full flex items-center px-4 py-3 text-sm transition-all duration-100 ${
                        isDark
                          ? "text-white hover:bg-[#252842] hover:translate-x-1"
                          : "text-gray-800 hover:bg-gray-100 hover:translate-x-1"
                      }`}
                    >
                      <item.icon className="h-4 w-4 mr-3" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className={`${isDark ? "bg-[#252842]" : "bg-gray-100"} rounded-lg p-1 mx-4 mb-4`}>
          <div className="flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-2 py-2 text-xs font-medium rounded-md transition-all duration-300 whitespace-nowrap relative ${
                  activeTab === tab
                    ? isDark
                      ? "bg-black text-white shadow-sm"
                      : "bg-black text-white shadow-sm"
                    : isDark
                      ? "text-gray-300 hover:text-white hover:bg-[#1a1d29]/50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                }`}
              >
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          <div className="space-y-2">
            {activeTab === "担保" ? (
              // Guarantee View
              <div className="text-center py-12">
                <Shield className={`h-12 w-12 mx-auto mb-4 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>暂无担保记录</p>
              </div>
            ) : (
              // Chat Contacts View (好友 and 群组)
              filteredContacts
                .filter(contact => {
                  if (activeTab === "好友" && contact.name.includes("群")) return false
                  if (activeTab === "群组" && !contact.name.includes("群")) return false
                  return true
                })
                .map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => {
                      setSelectedContact(contact.id)
                      if (isMobile) {
                        // Mobile navigation logic would go here
                      }
                    }}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedContact === contact.id
                        ? isDark
                          ? "bg-[#252842] border border-[#00D4AA]/30"
                          : "bg-gray-100 border border-[#00D4AA]/30"
                        : isDark
                          ? "hover:bg-[#252842]/50"
                          : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                        {contact.avatar}
                      </div>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium truncate ${isDark ? "text-white" : "text-gray-800"}`}>
                          {contact.name}
                        </h3>
                        <span className="text-xs text-gray-400">{contact.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread && (
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{contact.unread}</span>
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      {selectedContact && !isMobile ? (
        <div className={`flex-1 ${cardStyle} ml-4 flex flex-col`}>
          <div className="flex-1 flex flex-col" style={{ height: `${inputHeight}px` }}>
            <div className="flex-1 p-4">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage(e as any)
                  }
                }}
                placeholder="123123"
                className={`w-full h-full p-3 resize-none outline-none text-base bg-transparent ${
                  isDark 
                    ? "text-white placeholder-gray-500" 
                    : "text-gray-900 placeholder-gray-400"
                }`}
                style={{ minHeight: '100px', maxHeight: '300px' }}
              />
            </div>
            
            {/* Send Button */}
            <div className="flex justify-end shrink-0">
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  message.trim()
                    ? "bg-black text-white hover:bg-gray-800"
                    : "border border-gray-400 text-gray-400 cursor-not-allowed bg-transparent"
                }`}
              >
                发送
              </button>
            </div>
          </div>
        </div>
      ) : !isMobile ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageCircle className={`h-16 w-16 mx-auto mb-4 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
            <h3 className={`text-lg font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
              选择一个对话
            </h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              从左侧选择一个联系人开始聊天
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )

  // Main render - switch between layouts based on activeTab
  if (activeTab === "通讯录") {
    return renderAddressBookLayout()
  } else {
    return renderChatLayout()
  }
}