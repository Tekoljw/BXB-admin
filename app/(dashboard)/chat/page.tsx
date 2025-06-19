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
  isSpecial?: boolean
  isAI?: boolean
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
  const resizeRef = useRef<HTMLDivElement>(null)

  // Handle resize
  const handleMouseDown = useCallback(() => {
    setIsResizing(true)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return
    
    const newHeight = Math.max(140, Math.min(300, window.innerHeight - e.clientY + 50))
    setInputHeight(newHeight)
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

  // Handle input area interaction
  const handleTextareaMouseDown = (e: React.MouseEvent) => {
    if (e.target === resizeRef.current) {
      e.preventDefault()
      setIsResizing(true)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Handle send message
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!message.trim()) return
    
    console.log(`发送消息到 ${selectedContact}: ${message}`)
    setMessage("")
  }

  // Handle add menu
  const handleShowMenu = () => {
    setShowAddMenu(true)
    setTimeout(() => setIsMenuAnimating(true), 10)
  }

  const handleCloseMenu = () => {
    setIsMenuAnimating(false)
    setTimeout(() => setShowAddMenu(false), 150)
  }

  // Handle mount and mobile detection
  useEffect(() => {
    setMounted(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Reset selected contact when tab changes
  useEffect(() => {
    setSelectedContact(null)
  }, [activeTab])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        handleCloseMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"
  const tabs = ["好友", "群组", "担保", "通讯录"]

  // Contact data for different tabs
  const friendContacts: Contact[] = [
    {
      id: "friend-1",
      name: "张三",
      avatar: "👨‍💼",
      lastMessage: "今天BTC走势不错",
      time: "10:30",
      unread: 1,
      isOnline: true,
      isActive: true,
    },
    {
      id: "friend-2",
      name: "李四",
      avatar: "👩‍💼",
      lastMessage: "我刚看了那个分析报告",
      time: "09:45",
      isOnline: true,
    },
    {
      id: "friend-3",
      name: "王五",
      avatar: "👨‍🎓",
      lastMessage: "明天见面聊聊",
      time: "昨天",
      isOnline: false,
    },
  ]

  const groupContacts: Contact[] = [
    {
      id: "group-1",
      name: "BTC交易群",
      avatar: "₿",
      lastMessage: "张三: 今天BTC走势如何？",
      time: "09:15",
      unread: 5,
      isOnline: true,
    },
    {
      id: "group-2",
      name: "USDT交易讨论",
      avatar: "💰",
      lastMessage: "李四: 稳定币市场分析",
      time: "08:30",
      unread: 3,
      isOnline: true,
    },
    {
      id: "group-3",
      name: "投资策略群",
      avatar: "📈",
      lastMessage: "王五: 下周市场预测",
      time: "昨天",
      isOnline: false,
    },
  ]

  const escrowContacts: Contact[] = [
    {
      id: "escrow-1",
      name: "担保交易 #001",
      avatar: "🛡️",
      lastMessage: "交易进行中，请等待确认",
      time: "11:00",
      unread: 1,
      isOnline: true,
    },
    {
      id: "escrow-2",
      name: "担保交易 #002",
      avatar: "🔒",
      lastMessage: "资金已托管，等待买家确认",
      time: "10:15",
      isOnline: true,
    },
    {
      id: "escrow-3",
      name: "担保交易 #003",
      avatar: "✅",
      lastMessage: "交易已完成",
      time: "2小时前",
      isOnline: false,
    },
  ]

  const addressBookContacts: Contact[] = [
    // 新好友请求
    {
      id: "friend-request-1",
      name: "新好友请求",
      avatar: "👋",
      lastMessage: "有 2 个新的好友请求",
      time: "刚刚",
      unread: 2,
      isOnline: true,
      isSpecial: true,
    },
    // AI助手
    {
      id: "ai-escrow",
      name: "AI担保助手",
      avatar: "🛡️",
      lastMessage: "我可以帮您进行安全的担保交易",
      time: "在线",
      isOnline: true,
      isAI: true,
    },
    {
      id: "ai-trading",
      name: "AI交易助手",
      avatar: "🤖",
      lastMessage: "为您提供专业的交易建议",
      time: "在线",
      isOnline: true,
      isAI: true,
    },
    {
      id: "ai-customer",
      name: "AI客服助手",
      avatar: "👩‍💻",
      lastMessage: "24小时为您服务",
      time: "在线",
      isOnline: true,
      isAI: true,
    },
    // 我的好友 (按字母排序)
    {
      id: "friend-alex",
      name: "Alex Chen",
      avatar: "👨‍💼",
      lastMessage: "明天的会议改时间了",
      time: "15:30",
      isOnline: true,
    },
    {
      id: "friend-bob",
      name: "Bob Wang",
      avatar: "👨‍🎓",
      lastMessage: "那个项目进展如何？",
      time: "昨天",
      isOnline: false,
    },
    {
      id: "friend-charlie",
      name: "Charlie Li",
      avatar: "👨‍🔬",
      lastMessage: "新的投资机会",
      time: "2天前",
      isOnline: true,
    },
    {
      id: "friend-david",
      name: "David Zhang",
      avatar: "👨‍💻",
      lastMessage: "技术分析报告已发送",
      time: "3天前",
      isOnline: false,
    },
    {
      id: "friend-eric",
      name: "Eric Liu",
      avatar: "👨‍🏫",
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
      message: "你好，我是通过共同好友李明找到你的，希望能加你为好友。",
      mutualFriends: ["李明", "王芳"],
      time: "2小时前",
      status: "pending"
    },
    {
      id: "req-2", 
      name: "刘小红",
      avatar: "👩‍💼",
      message: "我们在BTC交易群里聊过，希望能进一步交流投资心得。",
      mutualFriends: ["陈浩"],
      time: "5小时前",
      status: "pending"
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

  return (
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
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                        isDark
                          ? "hover:bg-[#252842] text-gray-300"
                          : "hover:bg-gray-50 text-gray-700"
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
        <div className="mx-4 mb-4">
          <div className="relative">
            <div className={`flex ${isDark ? "bg-[#252842]" : "bg-gray-200"} rounded-md p-1`}>
              {/* Sliding background */}
              <div
                className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out bg-black`}
                style={{
                  width: `${100 / tabs.length}%`,
                  left: `${(tabs.indexOf(activeTab) * 100) / tabs.length}%`
                }}
              />

              {/* Tab buttons */}
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-10 flex-1 py-2 text-xs font-medium rounded-md transition-colors duration-300 whitespace-nowrap ${
                    activeTab === tab
                      ? "text-white"
                      : isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          {activeTab === "通讯录" ? (
            // Address Book with sections
            <div className="space-y-4">
              {/* Friend Requests Section */}
              <div>
                <h4 className={`text-xs font-medium mb-2 px-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  新的朋友
                </h4>
                {filteredContacts.filter(contact => contact.isSpecial).map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => {
                      setSelectedContact(contact.id)
                      if (isMobile) {
                        // Mobile navigation logic would go here
                      }
                    }}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer mb-2 ${
                      selectedContact === contact.id
                        ? isDark
                          ? "bg-[#252842]"
                          : "bg-gray-100"
                        : isDark
                          ? "hover:bg-[#252842]/50"
                          : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-lg font-bold">
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
                ))}
              </div>

              {/* AI Assistants Section */}
              <div>
                <h4 className={`text-xs font-medium mb-2 px-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  AI助手
                </h4>
                {filteredContacts.filter(contact => contact.isAI).map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => {
                      setSelectedContact(contact.id)
                      if (isMobile) {
                        // Mobile navigation logic would go here
                      }
                    }}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer mb-2 ${
                      selectedContact === contact.id
                        ? isDark
                          ? "bg-[#252842]"
                          : "bg-gray-100"
                        : isDark
                          ? "hover:bg-[#252842]/50"
                          : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-lg font-bold">
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
                ))}
              </div>

              {/* Friends Section */}
              <div>
                <h4 className={`text-xs font-medium mb-2 px-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  我的好友
                </h4>
                {filteredContacts.filter(contact => !contact.isSpecial && !contact.isAI).map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => {
                      setSelectedContact(contact.id)
                      if (isMobile) {
                        // Mobile navigation logic would go here
                      }
                    }}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer mb-2 ${
                      selectedContact === contact.id
                        ? isDark
                          ? "bg-[#252842]"
                          : "bg-gray-100"
                        : isDark
                          ? "hover:bg-[#252842]/50"
                          : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold">
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
                ))}
              </div>
            </div>
          ) : (
            // Regular contact list for other tabs
            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    setSelectedContact(contact.id)
                    if (isMobile) {
                      // Mobile navigation logic would go here
                    }
                  }}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                    selectedContact === contact.id
                      ? isDark
                        ? "bg-[#252842]"
                        : "bg-gray-100"
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
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      {selectedContact && !isMobile ? (
        <div className="flex-1 flex flex-col">
          {selectedContact === "friend-request-1" ? (
            // Friend Request List View
            <>
              {/* Friend Request Header */}
              <div className={`p-4 border-b ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"} flex items-center justify-between`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                    👋
                  </div>
                  <div>
                    <h2 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>新的朋友</h2>
                    <p className="text-sm text-gray-400">{friendRequests.length} 个好友请求</p>
                  </div>
                </div>
              </div>

              {/* Friend Request List */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {friendRequests.map((request) => (
                    <div
                      key={request.id}
                      className={`${cardStyle} p-4 rounded-lg`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                          {request.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                              {request.name}
                            </h3>
                            <span className="text-xs text-gray-400">{request.time}</span>
                          </div>
                          
                          <p className={`text-sm mb-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            {request.message}
                          </p>
                          
                          {request.mutualFriends.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs text-gray-400 mb-1">
                                共同好友: {request.mutualFriends.join(", ")}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-[#00D4AA] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00B394] transition-colors">
                              接受
                            </button>
                            <button className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isDark 
                                ? "bg-[#252842] text-gray-300 hover:bg-[#3a3d4a]" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}>
                              拒绝
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Regular Chat View
            <>
              {/* Chat Header */}
              <div className={`p-4 border-b ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"} flex items-center justify-between`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    🤖
                  </div>
                  <div>
                    <h2 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>交易助手</h2>
                    <p className="text-sm text-green-500">在线</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
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
                </div>
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
                              ? "bg-black text-white hover:bg-gray-800"
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
            </>
          )}
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
    </div>
  )
}