"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Search, Plus, MessageCircle, Phone, Video, User, Users, Star, Shield, BookOpen, Smile, Paperclip, Scissors, ArrowUp, MoreHorizontal, X, ChevronRight, Bell, Image, Check } from "lucide-react"
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
  isSpecial?: boolean
  isAI?: boolean
  isGuarantee?: boolean
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
  const [profileTab, setProfileTab] = useState("动态")
  const [showGroupInfo, setShowGroupInfo] = useState(false)
  const [groupInfoAnimating, setGroupInfoAnimating] = useState(false)
  const [groupInfoClosing, setGroupInfoClosing] = useState(false)
  
  // Guarantee process states
  const [showGuaranteeFlow, setShowGuaranteeFlow] = useState(false)
  const [guaranteeStep, setGuaranteeStep] = useState(1)
  const [guaranteeData, setGuaranteeData] = useState({
    amount: "",
    currency: "USDT",
    tradePair: "",
    tradeAmount: "",
    guaranteePeriod: "3",
    description: "",
    paymentMethod: "",
    guarantorId: "",
    beneficiaryId: "",
    contractTerms: []
  })
  const [screenWidth, setScreenWidth] = useState(0)
  
  // All refs
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const addMenuRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<HTMLDivElement>(null)

  // Handle resize
  const handleMouseDown = useCallback(() => {
    setIsResizing(true)
  }, [])

  const handleTextareaMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newHeight = Math.max(100, Math.min(400, window.innerHeight - e.clientY + 20))
      setInputHeight(newHeight)
    }
  }, [isResizing])

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  // Handle clicks outside to close menus
  const handleCloseMenu = useCallback(() => {
    setIsMenuAnimating(false)
    setTimeout(() => setShowAddMenu(false), 150)
  }, [])

  const handleOpenMenu = useCallback(() => {
    setShowAddMenu(true)
    setTimeout(() => setIsMenuAnimating(true), 10)
  }, [])

  const handleCloseGroupInfo = useCallback(() => {
    setGroupInfoClosing(true)
    setGroupInfoAnimating(false)
    setTimeout(() => {
      setShowGroupInfo(false)
      setGroupInfoClosing(false)
    }, 400)
  }, [])

  const handleOpenGroupInfo = useCallback(() => {
    setShowGroupInfo(true)
    setTimeout(() => setGroupInfoAnimating(true), 10)
  }, [])

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setScreenWidth(window.innerWidth)
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Mount effect
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedContact])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        handleCloseMenu()
      }
    }

    if (showAddMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showAddMenu, handleCloseMenu])

  // Guarantee flow functions
  const startGuaranteeFlow = () => {
    setShowGuaranteeFlow(true)
    setGuaranteeStep(1)
  }

  const nextGuaranteeStep = () => {
    if (guaranteeStep < 5) {
      setGuaranteeStep(guaranteeStep + 1)
    }
  }

  const prevGuaranteeStep = () => {
    if (guaranteeStep > 1) {
      setGuaranteeStep(guaranteeStep - 1)
    }
  }

  const updateGuaranteeData = (field: string, value: string) => {
    setGuaranteeData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const closeGuaranteeFlow = () => {
    setShowGuaranteeFlow(false)
    setGuaranteeStep(1)
    setGuaranteeData({
      amount: "",
      currency: "USDT",
      tradePair: "",
      tradeAmount: "",
      guaranteePeriod: "3",
      description: "",
      paymentMethod: "",
      guarantorId: "",
      beneficiaryId: "",
      contractTerms: []
    })
  }

  // Contact data
  const friendContacts: Contact[] = [
    {
      id: "contact-1",
      name: "AI交易助手",
      avatar: "🤖",
      lastMessage: "当前BTC价格: $89,234",
      time: "刚刚",
      unread: 2,
      isOnline: true,
      isActive: true,
      isAI: true,
    },
    {
      id: "contact-2", 
      name: "张伟",
      avatar: "👨‍💼",
      lastMessage: "明天的会议记得参加",
      time: "5分钟前",
      isOnline: true,
    },
    {
      id: "contact-3",
      name: "李明",
      avatar: "👨‍🎓",
      lastMessage: "项目进度如何？",
      time: "1小时前",
      unread: 1,
      isOnline: false,
    },
    {
      id: "contact-4",
      name: "王芳",
      avatar: "👩‍💻",
      lastMessage: "代码已经提交了",
      time: "2小时前",
      isOnline: true,
    },
    {
      id: "contact-5",
      name: "刘强",
      avatar: "👨‍🔬",
      lastMessage: "数据分析报告已完成",
      time: "昨天",
      isOnline: false,
    },
  ]

  const groupContacts: Contact[] = [
    {
      id: "group-1",
      name: "区块链技术交流",
      avatar: "🔗",
      lastMessage: "小李: 新项目很有前景",
      time: "10分钟前",
      unread: 5,
      isOnline: true,
    },
    {
      id: "group-2",
      name: "投资策略讨论",
      avatar: "💼",
      lastMessage: "老王: 市场走势分析",
      time: "30分钟前",
      unread: 2,
      isOnline: true,
    },
    {
      id: "group-3",
      name: "技术开发团队",
      avatar: "💻",
      lastMessage: "产品经理: 下周发布新版本",
      time: "1小时前",
      isOnline: true,
    },
  ]

  const escrowContacts: Contact[] = [
    {
      id: "ai-escrow",
      name: "AI担保助手",
      avatar: "🛡️",
      lastMessage: "担保服务已就绪",
      time: "在线",
      isOnline: true,
      isGuarantee: true,
      isSpecial: true,
    },
    {
      id: "escrow-1", 
      name: "担保交易001",
      avatar: "🔒",
      lastMessage: "交易进行中...",
      time: "5分钟前",
      isOnline: true,
      isGuarantee: true,
    },
    {
      id: "escrow-2",
      name: "担保交易002",
      avatar: "✅",
      lastMessage: "交易已完成",
      time: "1小时前",
      isOnline: false,
      isGuarantee: true,
    },
  ]

  const addressBookContacts: Contact[] = [
    {
      id: "address-1",
      name: "赵敏",
      avatar: "👩‍🏫",
      lastMessage: "下周聚餐安排",
      time: "1周前",
      isOnline: true,
    },
  ]

  // Get contacts based on active tab
  const getContactsByTab = () => {
    switch (activeTab) {
      case "好友":
        return friendContacts
      case "群组":
        return groupContacts
      case "担保":
        return escrowContacts
      case "通讯录":
        return addressBookContacts
      default:
        return friendContacts
    }
  }

  const contacts = getContactsByTab()

  // Friend request data
  const friendRequests = [
    {
      id: "req-1",
      name: "张伟",
      avatar: "👨‍💼",
      message: "您好，我想和您交流一下投资经验。",
      mutualFriends: ["李四", "王五"],
      time: "2小时前",
      status: "pending"
    },
    {
      id: "req-2",
      name: "李红",
      avatar: "👩‍💼",
      message: "通过朋友介绍认识您，希望能加个好友。",
      mutualFriends: ["张三"],
      time: "1天前",
      status: "pending"
    },
    {
      id: "req-3",
      name: "王强",
      avatar: "👨‍🏫",
      message: "您好，我对您的项目很感兴趣。",
      mutualFriends: ["李四", "张三"],
      time: "昨天",
      status: "accepted"
    },
    {
      id: "req-4",
      name: "李娜",
      avatar: "👩‍🏫",
      message: "您好，我想了解更多关于区块链投资的信息。",
      mutualFriends: ["王五"],
      time: "2天前",
      status: "rejected"
    }
  ]

  // Message data
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
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
    "ai-escrow": [
      {
        id: "msg-1",
        senderId: "ai-escrow",
        text: "您好！我是AI担保助手，可以为您提供安全可靠的担保交易服务。请告诉我您需要什么帮助？",
        time: "10:00",
        isRead: true,
      },
      {
        id: "msg-2",
        senderId: "ai-escrow",
        text: "我可以帮您：1. 发起担保交易 2. 查看担保记录 3. 解答担保相关问题 输入担保开始流程",
        time: "10:01",
        isRead: true,
      },
    ]
  })

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addMenuItems = [
    { icon: User, label: "添加好友", action: () => console.log("添加好友") },
    { icon: Users, label: "创建群聊", action: () => console.log("创建群聊") },
    { icon: Shield, label: "担保交易", action: () => console.log("担保交易") },
    { icon: BookOpen, label: "通讯录", action: () => console.log("通讯录") },
  ]

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!message.trim() || !selectedContact) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "user",
      text: message.trim(),
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    }

    setMessages(prev => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), newMessage]
    }))

    setMessage("")

    // Auto-reply for AI contacts
    if (selectedContact === "contact-1" || selectedContact === "ai-escrow") {
      setTimeout(() => {
        const aiReply: Message = {
          id: `msg-ai-${Date.now()}`,
          senderId: selectedContact,
          text: selectedContact === "ai-escrow" 
            ? "收到您的消息，我正在为您处理相关事务..."
            : "收到您的消息，让我为您分析一下市场情况...",
          time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          isRead: true,
        }

        setMessages(prev => ({
          ...prev,
          [selectedContact]: [...(prev[selectedContact] || []), aiReply]
        }))
      }, 1000)
    }
  }

  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"

  return (
    <div 
      className={`flex h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} overflow-hidden`}
      style={{
        transform: showGroupInfo && screenWidth >= 1440 && groupInfoAnimating 
          ? 'translateX(-384px)' 
          : 'translateX(0)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform'
      }}
    >
      {/* Contact List Sidebar */}
      <div 
        className={`${cardStyle} flex flex-col`}
        style={isMobile ? { width: '100vw', minWidth: '100vw', maxWidth: '100vw' } : { minWidth: '416px', maxWidth: '500px', width: 'clamp(416px, 30vw, 500px)' }}
      >
        {/* Search and Add Button */}
        <div className="flex items-center gap-2 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索联系人"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isDark 
                  ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          <div className="relative" ref={addMenuRef}>
            <button
              onClick={handleOpenMenu}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
              }`}
            >
              <Plus className="w-5 h-5" />
            </button>
            
            {/* Add Menu Dropdown */}
            {showAddMenu && (
              <div 
                className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-50 ${
                  isDark ? "bg-[#1a1d29] border-[#3a3d4a]" : "bg-white border-gray-200"
                }`}
                style={{
                  opacity: isMenuAnimating ? 1 : 0,
                  transform: isMenuAnimating ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)',
                  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="py-2">
                  {addMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action()
                        handleCloseMenu()
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        isDark ? "hover:bg-[#252842] text-white" : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-[#3a3d4a] px-4">
          {["好友", "群组", "担保", "通讯录"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-[#00D4AA] text-[#00D4AA]"
                  : isDark
                    ? "border-transparent text-gray-400 hover:text-gray-300"
                    : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {tab === "担保" && escrowContacts.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-[#00D4AA] text-black rounded-full">
                  {escrowContacts.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={`p-4 border-b cursor-pointer transition-colors ${
                selectedContact === contact.id
                  ? isDark
                    ? "bg-[#252842] border-[#3a3d4a]"
                    : "bg-blue-50 border-blue-200"
                  : isDark
                    ? "hover:bg-[#252842] border-[#3a3d4a]"
                    : "hover:bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl">
                    {contact.avatar}
                  </div>
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#1a1d29] rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium truncate ${isDark ? "text-white" : "text-gray-900"}`}>
                      {contact.name}
                      {contact.isSpecial && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-[#00D4AA] text-black rounded-full">
                          官方
                        </span>
                      )}
                    </h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">{contact.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-sm truncate ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {contact.lastMessage}
                    </p>
                    {contact.unread && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0 ml-2">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedContact && !isMobile ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className={`p-4 border-b ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"} flex items-center justify-between`}>
            {(() => {
              const isGroupChat = selectedContact?.startsWith("group-")
              const currentContact = isGroupChat 
                ? groupContacts.find(c => c.id === selectedContact)
                : friendContacts.find(c => c.id === selectedContact) || escrowContacts.find(c => c.id === selectedContact)
              
              return (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {currentContact?.avatar || "🤖"}
                    </div>
                    <div>
                      <h2 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                        {currentContact?.name || "交易助手"}
                      </h2>
                      <p className="text-sm text-green-500">
                        {isGroupChat ? `${Math.floor(Math.random() * 50) + 10}位成员` : "在线"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!isGroupChat && (
                      <>
                        <button className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                          isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
                        }`}>
                          <Phone className="w-5 h-5" />
                        </button>
                        <button className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                          isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
                        }`}>
                          <Video className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {isGroupChat && (
                      <button 
                        onClick={handleOpenGroupInfo}
                        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                          isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </>
              )
            })()}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {(messages[selectedContact] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.senderId === 'user'
                        ? 'bg-[#00D4AA] text-white'
                        : isDark
                          ? 'bg-[#252842] text-white'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderId === 'user' 
                        ? 'text-green-100' 
                        : 'text-gray-400'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div 
            className={`border-t ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"}`}
            style={{ height: `${inputHeight}px` }}
          >
            <div className="h-full flex flex-col">
              {/* Guarantee Flow Quick Actions */}
              {selectedContact && getContactsByTab().find(c => c.id === selectedContact)?.isGuarantee && (
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={startGuaranteeFlow}
                      className="px-3 py-2 text-xs bg-[#00D4AA] text-black rounded-lg hover:bg-[#00B894] transition-colors"
                    >
                      <Shield className="h-3 w-3 mr-1 inline" />
                      发起担保
                    </button>
                    <button className="px-3 py-2 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      查看担保记录
                    </button>
                    <button className="px-3 py-2 text-xs bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      担保帮助
                    </button>
                  </div>
                </div>
              )}
              
              <div 
                ref={resizeRef}
                onMouseDown={handleTextareaMouseDown}
                className={`h-1 cursor-row-resize hover:bg-[#00D4AA] transition-colors ${
                  isResizing ? "bg-[#00D4AA]" : "transparent"
                }`}
              />
              
              <div className="flex-1 p-4">
                <form onSubmit={handleSendMessage} className="h-full flex flex-col">
                  <div className="flex-1 mb-3">
                    <textarea
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="输入消息..."
                      className={`w-full h-full resize-none border-0 bg-transparent text-sm placeholder-gray-400 focus:outline-none ${
                        isDark ? "text-white" : "text-gray-800"
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Smile className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                        message.trim()
                          ? isDark
                            ? "bg-white text-black hover:bg-gray-200"
                            : "bg-black text-white hover:bg-gray-800"
                          : "border border-gray-400 text-gray-400 cursor-not-allowed bg-transparent"
                      }`}
                    >
                      发送
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : !isMobile ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className={`text-lg font-medium mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
              选择一个联系人开始聊天
            </h3>
            <p className="text-gray-400">从左侧列表选择一个联系人或群组</p>
          </div>
        </div>
      ) : null}

      {/* Guarantee Flow Modal */}
      {showGuaranteeFlow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDark ? 'bg-[#1a1d29]' : 'bg-white'} rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
            {/* Header */}
            <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-[#00D4AA]" />
                  <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    担保交易流程
                  </h2>
                </div>
                <button
                  onClick={closeGuaranteeFlow}
                  className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="mt-6 flex items-center justify-between">
                {[
                  { step: 1, title: "发起担保" },
                  { step: 2, title: "设置条件" },
                  { step: 3, title: "确认条件" },
                  { step: 4, title: "执行中" },
                  { step: 5, title: "完成" }
                ].map((item, index) => (
                  <div key={item.step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      guaranteeStep >= item.step
                        ? "bg-[#00D4AA] text-black"
                        : isDark
                          ? "bg-gray-700 text-gray-400"
                          : "bg-gray-200 text-gray-500"
                    }`}>
                      {item.step}
                    </div>
                    <span className={`ml-2 text-sm ${
                      guaranteeStep >= item.step
                        ? isDark ? 'text-white' : 'text-gray-900'
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {item.title}
                    </span>
                    {index < 4 && (
                      <div className={`w-8 h-0.5 mx-4 ${
                        guaranteeStep > item.step
                          ? "bg-[#00D4AA]"
                          : isDark ? "bg-gray-700" : "bg-gray-200"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {guaranteeStep === 1 && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    发起担保交易
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        担保金额
                      </label>
                      <div className="flex">
                        <input
                          type="number"
                          value={guaranteeData.amount}
                          onChange={(e) => updateGuaranteeData('amount', e.target.value)}
                          placeholder="输入金额"
                          className={`flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA] ${
                            isDark 
                              ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                        <select
                          value={guaranteeData.currency}
                          onChange={(e) => updateGuaranteeData('currency', e.target.value)}
                          className={`px-3 py-2 border-l-0 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA] ${
                            isDark 
                              ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="USDT">USDT</option>
                          <option value="BTC">BTC</option>
                          <option value="ETH">ETH</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        担保期限
                      </label>
                      <select
                        value={guaranteeData.guaranteePeriod}
                        onChange={(e) => updateGuaranteeData('guaranteePeriod', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA] ${
                          isDark 
                            ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="1">1天</option>
                        <option value="3">3天</option>
                        <option value="7">7天</option>
                        <option value="15">15天</option>
                        <option value="30">30天</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      交易描述
                    </label>
                    <textarea
                      value={guaranteeData.description}
                      onChange={(e) => updateGuaranteeData('description', e.target.value)}
                      placeholder="描述交易内容和要求..."
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA] ${
                        isDark 
                          ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>
              )}

              {guaranteeStep === 2 && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    设置交易条件
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        交易对
                      </label>
                      <input
                        type="text"
                        value={guaranteeData.tradePair}
                        onChange={(e) => updateGuaranteeData('tradePair', e.target.value)}
                        placeholder="如: BTC/USDT"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA] ${
                          isDark 
                            ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        交易数量
                      </label>
                      <input
                        type="text"
                        value={guaranteeData.tradeAmount}
                        onChange={(e) => updateGuaranteeData('tradeAmount', e.target.value)}
                        placeholder="如: 0.1 BTC"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA] ${
                          isDark 
                            ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      支付方式
                    </label>
                    <select
                      value={guaranteeData.paymentMethod}
                      onChange={(e) => updateGuaranteeData('paymentMethod', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D4AA] ${
                        isDark 
                          ? 'bg-[#252842] border-[#3a3d4a] text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="">选择支付方式</option>
                      <option value="支付宝">支付宝</option>
                      <option value="微信支付">微信支付</option>
                      <option value="银行转账">银行转账</option>
                      <option value="数字货币">数字货币</option>
                    </select>
                  </div>
                </div>
              )}

              {guaranteeStep === 3 && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    确认担保条件
                  </h3>
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-[#252842]' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>担保金额:</span>
                        <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{guaranteeData.amount} {guaranteeData.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>担保期限:</span>
                        <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{guaranteeData.guaranteePeriod}天</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>交易对:</span>
                        <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{guaranteeData.tradePair}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>交易数量:</span>
                        <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{guaranteeData.tradeAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>支付方式:</span>
                        <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{guaranteeData.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/20`}>
                    <p className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-800'}`}>
                      <strong>注意:</strong> 一旦确认担保条件，担保金额将被冻结直到交易完成或争议解决。
                    </p>
                  </div>
                </div>
              )}

              {guaranteeStep === 4 && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    担保执行中
                  </h3>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-[#00D4AA] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-black" />
                    </div>
                    <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      担保正在执行中
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      资金已冻结，等待交易双方完成交易
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-[#252842]' : 'border-gray-200 bg-gray-50'}`}>
                    <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>担保状态</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>担保ID:</span>
                        <span className={`text-sm font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>GT{Date.now().toString().slice(-6)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>创建时间:</span>
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{new Date().toLocaleString('zh-CN')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>预计到期:</span>
                        <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {new Date(Date.now() + parseInt(guaranteeData.guaranteePeriod) * 24 * 60 * 60 * 1000).toLocaleString('zh-CN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {guaranteeStep === 5 && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    担保完成
                  </h3>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-white" />
                    </div>
                    <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      担保交易已完成
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      资金已释放，交易成功完成
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`p-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex justify-between`}>
              <button
                onClick={prevGuaranteeStep}
                disabled={guaranteeStep === 1}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  guaranteeStep === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : isDark
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                上一步
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={closeGuaranteeFlow}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    isDark
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  取消
                </button>
                <button
                  onClick={nextGuaranteeStep}
                  disabled={guaranteeStep === 5}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    guaranteeStep === 5
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#00D4AA] text-black hover:bg-[#00B894]'
                  }`}
                >
                  {guaranteeStep === 3 ? '确认担保' : guaranteeStep === 4 ? '完成担保' : '下一步'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}