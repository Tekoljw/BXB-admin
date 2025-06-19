"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Search, Plus, MessageCircle, Phone, Video, User, Users, Star, Shield, BookOpen, Smile, Paperclip, Scissors, ArrowUp, MoreHorizontal, X } from "lucide-react"
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
  const [profileTab, setProfileTab] = useState("动态")
  const [showGroupInfo, setShowGroupInfo] = useState(false)
  const [groupInfoAnimating, setGroupInfoAnimating] = useState(false)
  const [groupInfoClosing, setGroupInfoClosing] = useState(false)
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

  // Screen size detection for modal animation
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setScreenWidth(width)
      setIsMobile(width < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Handle group info modal
  const handleOpenGroupInfo = () => {
    if (groupInfoClosing) return
    setGroupInfoClosing(false)
    setShowGroupInfo(true)
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setGroupInfoAnimating(true)
      })
    })
  }

  const handleCloseGroupInfo = () => {
    if (groupInfoClosing) return
    setGroupInfoClosing(true)
    setGroupInfoAnimating(false)
    
    setTimeout(() => {
      setShowGroupInfo(false)
      setGroupInfoClosing(false)
    }, 400)
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
    },
    {
      id: "req-3",
      name: "王强",
      avatar: "👨‍🎓",
      message: "看到您在投资群里的分享很有见地，希望能交流学习。",
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
              {/* Search Box */}
              <div className={`p-4 border-b ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"}`}>
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="搜索好友请求"
                    className={`pl-10 pr-4 py-2 w-full rounded-lg border text-sm transition-colors ${
                      isDark
                        ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400 focus:border-[#00D4AA]"
                        : "bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-[#00D4AA]"
                    } focus:outline-none focus:ring-2 focus:ring-[#00D4AA]/20`}
                  />
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
                          <div className="mb-2">
                            <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                              {request.name}
                            </h3>
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
                        </div>
                        
                        {/* Status and Action Buttons */}
                        <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                          {request.status === "pending" && (
                            <>
                              <div className="flex space-x-2">
                                <button className="bg-[#00D4AA] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#00B394] transition-colors whitespace-nowrap">
                                  接受
                                </button>
                                <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                  isDark 
                                    ? "bg-[#252842] text-gray-300 hover:bg-[#3a3d4a]" 
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}>
                                  拒绝
                                </button>
                              </div>
                              <span className="text-xs text-gray-400">{request.time}</span>
                            </>
                          )}
                          
                          {request.status === "accepted" && (
                            <>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-green-500 font-medium">已接受</span>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              </div>
                              <span className="text-xs text-gray-400">{request.time}</span>
                            </>
                          )}
                          
                          {request.status === "rejected" && (
                            <>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-red-500 font-medium">已拒绝</span>
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              </div>
                              <span className="text-xs text-gray-400">{request.time}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : selectedContact === "ai-escrow" || selectedContact === "ai-trading" || selectedContact === "ai-customer" ? (
            // AI Assistant Detail View
            <>
              {(() => {
                const aiData = {
                  "ai-escrow": {
                    name: "AI担保助手",
                    avatar: "🛡️",
                    gradient: "from-blue-500 to-cyan-500",
                    description: "专业的担保交易助手，为您的交易提供安全保障",
                    features: [
                      "🔒 安全托管资金",
                      "📋 智能合约生成",
                      "⚖️ 争议调解服务",
                      "📊 交易风险评估",
                      "🕒 24/7 交易监控",
                      "💼 多币种支持"
                    ],
                    capabilities: "我可以帮助您创建安全的担保交易，监控交易过程，并在出现争议时提供调解服务。所有交易都受到智能合约保护，确保双方利益。"
                  },
                  "ai-trading": {
                    name: "AI交易助手", 
                    avatar: "🤖",
                    gradient: "from-green-500 to-emerald-500",
                    description: "智能交易分析师，提供专业的市场分析和交易建议",
                    features: [
                      "📈 实时市场分析",
                      "🎯 个性化交易策略",
                      "⚠️ 风险管理建议",
                      "📱 交易信号推送",
                      "📊 投资组合优化",
                      "🔍 技术指标分析"
                    ],
                    capabilities: "我拥有强大的市场分析能力，可以为您提供实时的价格预测、技术分析和交易建议。基于您的风险偏好定制专属交易策略。"
                  },
                  "ai-customer": {
                    name: "AI客服助手",
                    avatar: "👩‍💻", 
                    gradient: "from-purple-500 to-pink-500",
                    description: "贴心的客户服务专家，随时为您解答疑问",
                    features: [
                      "❓ 常见问题解答",
                      "🔧 技术支持服务",
                      "📞 人工客服转接",
                      "📝 意见反馈收集",
                      "🎓 平台使用教程",
                      "🌐 多语言支持"
                    ],
                    capabilities: "我可以快速解答您的疑问，提供平台使用指导，处理技术问题，并在需要时为您转接人工客服。致力于为您提供最佳的用户体验。"
                  }
                }
                
                const currentAI = aiData[selectedContact as keyof typeof aiData]
                
                return (
                  <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
                    <div className="max-w-md w-full text-center space-y-8">
                      {/* AI Avatar and Name */}
                      <div className="space-y-4">
                        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentAI.gradient} flex items-center justify-center text-white text-3xl font-bold mx-auto`}>
                          {currentAI.avatar}
                        </div>
                        <div>
                          <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                            {currentAI.name}
                          </h2>
                          <p className={`text-base ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                            {currentAI.description}
                          </p>
                        </div>
                      </div>

                      {/* Capabilities Section */}
                      <div className="space-y-4">
                        <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                          能力介绍
                        </h3>
                        <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          {currentAI.capabilities}
                        </p>
                      </div>

                      {/* Features Section */}
                      <div className="space-y-4">
                        <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                          主要功能
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {currentAI.features.map((feature, index) => (
                            <div 
                              key={index}
                              className={`${cardStyle} p-3 rounded-lg text-center space-y-1 hover:shadow-md transition-shadow`}
                            >
                              <div className="text-lg">{feature.split(' ')[0]}</div>
                              <div className={`text-xs font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                {feature.substring(feature.indexOf(' ') + 1)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-4">
                        <button 
                          onClick={() => console.log(`开始与${currentAI.name}对话`)}
                          className="bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2 mx-auto text-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>立即开始对话</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </>
          ) : selectedContact && activeTab === "通讯录" && (selectedContact.startsWith("friend-") && !selectedContact.includes("request")) ? (
            // Friend Profile View
            <>
              {(() => {
                const friendProfiles = {
                  "friend-1": {
                    name: "张三",
                    avatar: "👨‍💼",
                    status: "在线",
                    bio: "资深投资者，专注于数字货币市场分析",
                    joinDate: "2023年1月",
                    mutualFriends: 5,
                    stats: {
                      trades: 128,
                      success: "92%",
                      rating: 4.8
                    },
                    interests: ["BTC交易", "市场分析", "技术指标", "投资策略"],
                    recentActivity: "刚刚分享了一篇关于BTC走势的分析"
                  },
                  "friend-2": {
                    name: "李四", 
                    avatar: "👩‍💼",
                    status: "在线",
                    bio: "量化交易专家，擅长算法交易策略",
                    joinDate: "2022年8月",
                    mutualFriends: 8,
                    stats: {
                      trades: 256,
                      success: "95%",
                      rating: 4.9
                    },
                    interests: ["量化交易", "算法策略", "风险管理", "数据分析"],
                    recentActivity: "2小时前更新了投资组合"
                  },
                  "friend-3": {
                    name: "王五",
                    avatar: "👨‍🎓",
                    status: "离线",
                    bio: "区块链技术爱好者，长期价值投资者",
                    joinDate: "2023年3月",
                    mutualFriends: 3,
                    stats: {
                      trades: 67,
                      success: "88%",
                      rating: 4.6
                    },
                    interests: ["区块链技术", "价值投资", "DeFi", "NFT"],
                    recentActivity: "昨天参与了社区讨论"
                  },
                  "friend-alex": {
                    name: "Alex Chen",
                    avatar: "👨‍💼",
                    status: "在线",
                    bio: "Professional trader with 5+ years experience",
                    joinDate: "2022年12月",
                    mutualFriends: 12,
                    stats: {
                      trades: 445,
                      success: "94%",
                      rating: 4.9
                    },
                    interests: ["Futures Trading", "Options", "Technical Analysis", "Risk Management"],
                    recentActivity: "30分钟前发布了交易信号"
                  },
                  "friend-bob": {
                    name: "Bob Wang",
                    avatar: "👨‍🎓",
                    status: "离线",
                    bio: "Crypto enthusiast and long-term hodler",
                    joinDate: "2023年5月",
                    mutualFriends: 6,
                    stats: {
                      trades: 89,
                      success: "90%",
                      rating: 4.7
                    },
                    interests: ["HODLing", "Altcoins", "Market Research", "Community"],
                    recentActivity: "3小时前点赞了一个交易策略"
                  },
                  "friend-charlie": {
                    name: "Charlie Li",
                    avatar: "👨‍🔬",
                    status: "在线",
                    bio: "Financial analyst specializing in crypto markets",
                    joinDate: "2022年11月",
                    mutualFriends: 9,
                    stats: {
                      trades: 178,
                      success: "91%",
                      rating: 4.8
                    },
                    interests: ["Market Analysis", "Financial Modeling", "Economic Indicators", "Research"],
                    recentActivity: "1小时前发布了市场报告"
                  },
                  "friend-david": {
                    name: "David Zhang",
                    avatar: "👨‍💻",
                    status: "离线",
                    bio: "Software engineer turned crypto trader",
                    joinDate: "2023年2月",
                    mutualFriends: 4,
                    stats: {
                      trades: 134,
                      success: "89%",
                      rating: 4.6
                    },
                    interests: ["Automated Trading", "Programming", "Smart Contracts", "DApps"],
                    recentActivity: "6小时前更新了交易机器人"
                  },
                  "friend-eric": {
                    name: "Eric Liu",
                    avatar: "👨‍🏫",
                    status: "在线",
                    bio: "Education specialist in cryptocurrency trading",
                    joinDate: "2022年9月",
                    mutualFriends: 15,
                    stats: {
                      trades: 223,
                      success: "93%",
                      rating: 4.8
                    },
                    interests: ["Trading Education", "Mentoring", "Strategy Development", "Community Building"],
                    recentActivity: "刚刚回复了一个学习问题"
                  }
                }
                
                const currentFriend = friendProfiles[selectedContact as keyof typeof friendProfiles]
                
                return (
                  <div className="flex-1 overflow-y-auto">
                    <div className={`${cardStyle} p-6 m-4 rounded-lg`}>
                      {/* Profile Header */}
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                            {currentFriend.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                            isDark ? "border-[#1a1c2e]" : "border-white"
                          } ${currentFriend.status === "在线" ? "bg-green-500" : "bg-gray-400"}`}></div>
                        </div>
                        <div className="flex-1">
                          <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                            {currentFriend.name}
                          </h2>
                          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            专业交易员
                          </p>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                        {currentFriend.bio}
                      </p>

                      {/* Location and Join Date */}
                      <div className="flex items-center space-x-4 mb-6 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <span>📍</span>
                          <span>上海</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>📅</span>
                          <span>{currentFriend.joinDate}加入</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-6 mb-6">
                        <div className="text-center">
                          <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                            {currentFriend.stats.trades}
                          </div>
                          <div className="text-xs text-gray-400">动态</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                            12800
                          </div>
                          <div className="text-xs text-gray-400">粉丝</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                            89
                          </div>
                          <div className="text-xs text-gray-400">关注</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <button className="bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
                          关注
                        </button>
                        <button className={`py-2.5 rounded-lg font-medium transition-colors text-sm border ${
                          isDark 
                            ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}>
                          加好友
                        </button>
                        <button className={`py-2.5 rounded-lg font-medium transition-colors text-sm border ${
                          isDark 
                            ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}>
                          跟单
                        </button>
                      </div>

                      {/* Tabs */}
                      <div className="border-b border-gray-200 dark:border-gray-700 mb-6 mt-8">
                        <div className="flex space-x-8">
                          <button 
                            onClick={() => setProfileTab("动态")}
                            className={`pb-3 text-base font-medium border-b-2 transition-colors ${
                              profileTab === "动态" 
                                ? `border-black ${isDark ? "text-white" : "text-black"}` 
                                : "border-transparent text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            动态
                          </button>
                          <button 
                            onClick={() => setProfileTab("合约交易")}
                            className={`pb-3 text-base font-medium border-b-2 transition-colors ${
                              profileTab === "合约交易" 
                                ? `border-black ${isDark ? "text-white" : "text-black"}` 
                                : "border-transparent text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            合约交易
                          </button>
                          <button 
                            onClick={() => setProfileTab("合约持仓")}
                            className={`pb-3 text-base font-medium border-b-2 transition-colors ${
                              profileTab === "合约持仓" 
                                ? `border-black ${isDark ? "text-white" : "text-black"}` 
                                : "border-transparent text-gray-400 hover:text-gray-600"
                            }`}
                          >
                            合约持仓
                          </button>
                        </div>
                      </div>

                      {/* Tab Content */}
                      {profileTab === "动态" && (
                        <div className="space-y-6">
                          <div className={`${cardStyle} rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:${
                            isDark ? "bg-[#1e2332]" : "bg-gray-50"
                          }`}>
                            {/* 头部 - 用户信息和操作 */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                                  {currentFriend.avatar}
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className={`font-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                                      {currentFriend.name}
                                    </span>
                                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="text-sm text-gray-500">4小时前</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <button className="p-2 rounded-full text-gray-400 hover:text-yellow-500 hover:bg-gray-50 transition-all duration-200">
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                  </svg>
                                </button>
                                <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200">
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* 内容 */}
                            <div className="mb-4">
                              <p className={`text-base leading-relaxed ${isDark ? "text-gray-100" : "text-gray-800"}`}>
                                刚刚发现一个新的DeFi协议，APY高达200%！但是大家要注意风险，高收益往往伴随高风险。DYOR！💰
                              </p>
                            </div>

                            {/* 标签 */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {["DeFi", "流动性挖矿", "风险提示"].map((tag, index) => (
                                <span 
                                  key={index} 
                                  className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 ${
                                    isDark 
                                      ? "bg-[#00D4AA]/30 text-[#00D4AA] hover:bg-[#00D4AA]/50" 
                                      : "bg-[#00D4AA]/10 text-[#00D4AA] hover:bg-[#00D4AA]/20"
                                  }`}
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {/* 底部操作栏 */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                              <div className="flex items-center space-x-6">
                                <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-red-500 bg-red-50 hover:bg-red-100 transition-all duration-200">
                                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                  </svg>
                                  <span className="text-sm font-medium">1876</span>
                                </button>

                                <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-500 hover:text-[#00D4AA] hover:bg-[#00D4AA]/10 transition-all duration-200">
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                  </svg>
                                  <span className="text-sm font-medium">234</span>
                                </button>

                                <button className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-500 hover:text-[#00D4AA] hover:bg-[#00D4AA]/10 transition-all duration-200">
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                  </svg>
                                  <span className="text-sm font-medium">67</span>
                                </button>
                              </div>

                              {/* 数据统计 */}
                              <div className="text-sm text-gray-400">
                                2,177 次互动
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {profileTab === "合约交易" && (
                        <div className="space-y-4">
                          {/* Stats Cards */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className={`p-3 rounded-lg text-center ${
                              isDark ? "bg-green-900/20" : "bg-green-50"
                            }`}>
                              <div className="text-green-500 font-bold text-lg">+158.7%</div>
                              <div className="text-xs text-gray-400">总收益</div>
                            </div>
                            <div className={`p-3 rounded-lg text-center ${
                              isDark ? "bg-blue-900/20" : "bg-blue-50"
                            }`}>
                              <div className="text-blue-500 font-bold text-lg">85.2%</div>
                              <div className="text-xs text-gray-400">胜率</div>
                            </div>
                            <div className={`p-3 rounded-lg text-center ${
                              isDark ? "bg-purple-900/20" : "bg-purple-50"
                            }`}>
                              <div className="text-purple-500 font-bold text-lg">1234</div>
                              <div className="text-xs text-gray-400">交易笔数</div>
                            </div>
                          </div>

                          {/* Trading Records */}
                          <div className="space-y-3">
                            <div className={`p-4 rounded-lg ${cardStyle}`}>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">BTC/USDT</span>
                                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">多单</span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">已平仓</span>
                                </div>
                                <span className="text-green-500 font-medium">+2.3%</span>
                              </div>
                              <div className="text-sm text-gray-500 space-y-1">
                                <div className="flex justify-between">
                                  <span>买入：$42,150</span>
                                  <span>卖出：$43,120</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-500">开仓 +15%</span>
                                  <span className="text-gray-400">10:30</span>
                                </div>
                              </div>
                            </div>

                            <div className={`p-4 rounded-lg ${cardStyle}`}>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">ETH/USDT</span>
                                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">空单</span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">已平仓</span>
                                </div>
                                <span className="text-green-500 font-medium">+1.8%</span>
                              </div>
                              <div className="text-sm text-gray-500 space-y-1">
                                <div className="flex justify-between">
                                  <span>买入：$2,450</span>
                                  <span>卖出：$2,406</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-500">开仓 -8%</span>
                                  <span className="text-gray-400">09:15</span>
                                </div>
                              </div>
                            </div>

                            <div className={`p-4 rounded-lg ${cardStyle}`}>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">BNB/USDT</span>
                                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">多单</span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">已平仓</span>
                                </div>
                                <span className="text-green-500 font-medium">+3.5%</span>
                              </div>
                              <div className="text-sm text-gray-500 space-y-1">
                                <div className="flex justify-between">
                                  <span>买入：$285</span>
                                  <span>卖出：$295</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-500">开仓 +22%</span>
                                  <span className="text-gray-400">昨天</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {profileTab === "合约持仓" && (
                        <div className="space-y-4">
                          {/* Stats Cards */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className={`p-3 rounded-lg text-center ${
                              isDark ? "bg-green-900/20" : "bg-green-50"
                            }`}>
                              <div className="text-green-500 font-bold text-lg">+3.2%</div>
                              <div className="text-xs text-gray-400">今日盈亏</div>
                            </div>
                            <div className={`p-3 rounded-lg text-center ${
                              isDark ? "bg-blue-900/20" : "bg-blue-50"
                            }`}>
                              <div className="text-blue-500 font-bold text-lg">+15.8%</div>
                              <div className="text-xs text-gray-400">本月盈亏</div>
                            </div>
                            <div className={`p-3 rounded-lg text-center bg-[#00D4AA]/10`}>
                              <div className="text-[#00D4AA] font-bold text-lg">+68.4%</div>
                              <div className="text-xs text-gray-400">12个月盈亏</div>
                            </div>
                          </div>

                          {/* Holdings */}
                          <div>
                            <h3 className={`text-sm font-medium mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                              持仓详情
                            </h3>
                            <div className="space-y-3">
                              <div className={`p-4 rounded-lg ${cardStyle}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                      BT
                                    </div>
                                    <div>
                                      <div className="font-medium">BTC</div>
                                      <div className="text-xs text-gray-400">多头</div>
                                      <div className="text-xs text-gray-400">持仓占比</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold">35.2%</div>
                                    <div className="text-green-500 text-sm">+2.34%</div>
                                  </div>
                                </div>
                              </div>

                              <div className={`p-4 rounded-lg ${cardStyle}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                      ET
                                    </div>
                                    <div>
                                      <div className="font-medium">ETH</div>
                                      <div className="text-xs text-gray-400">空头</div>
                                      <div className="text-xs text-gray-400">持仓占比</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold">28.1%</div>
                                    <div className="text-green-500 text-sm">+1.23%</div>
                                  </div>
                                </div>
                              </div>

                              <div className={`p-4 rounded-lg ${cardStyle}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                      BN
                                    </div>
                                    <div>
                                      <div className="font-medium">BNB</div>
                                      <div className="text-xs text-gray-400">多头</div>
                                      <div className="text-xs text-gray-400">持仓占比</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold">18.7%</div>
                                    <div className="text-green-500 text-sm">+0.89%</div>
                                  </div>
                                </div>
                              </div>

                              <div className={`p-4 rounded-lg ${cardStyle}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                      SO
                                    </div>
                                    <div>
                                      <div className="font-medium">SOL</div>
                                      <div className="text-xs text-gray-400">空头</div>
                                      <div className="text-xs text-gray-400">持仓占比</div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold">18.0%</div>
                                    <div className="text-red-500 text-sm">-1.13%</div>
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
              })()}
            </>
          ) : (
            // Regular Chat View
            <>
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

          {/* Group Info Panel */}
          {showGroupInfo && selectedContact?.startsWith("group-") && (
            <>
              {/* 点击外部区域关闭弹窗 */}
              {shouldUseOutwardMode ? (
                /* 向外弹出模式：覆盖被压缩的内容区域 */
                <div 
                  className="fixed left-0 top-0 z-40"
                  style={{ 
                    width: 'calc(100% - 384px)',
                    height: '100%',
                    backgroundColor: groupInfoAnimating ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    transition: 'background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onClick={handleCloseGroupInfo}
                />
              ) : (
                /* 向内弹出模式：全屏半透明遮罩 */
                <div 
                  className="fixed inset-0 z-40 bg-black"
                  style={{
                    opacity: groupInfoAnimating ? 0.4 : 0,
                    transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onClick={handleCloseGroupInfo}
                />
              )}
              
              <div className="fixed z-[9999] overflow-hidden right-0 top-0 h-full w-96">
              <div 
                className={`h-full w-96 ${isDark ? "bg-[#1a1c2e]" : "bg-white"} shadow-2xl border-l ${
                  isDark ? "border-[#3a3d4a]" : "border-gray-200"
                }`}
                style={{
                  transform: groupInfoAnimating 
                    ? 'translateX(0) scale(1)' 
                    : screenWidth >= 1440 
                      ? 'translateX(-100%) scale(0.98)'
                      : 'translateX(100%) scale(0.98)',
                  opacity: groupInfoAnimating ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformOrigin: screenWidth >= 1440 ? 'left center' : 'right center',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <div 
                  className="p-6 h-full overflow-y-auto"
                  style={{
                    transform: groupInfoAnimating 
                      ? 'translateX(0)' 
                      : screenWidth >= 1440 
                        ? 'translateX(-30px)' 
                        : 'translateX(30px)',
                    opacity: groupInfoAnimating ? 1 : 0,
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: groupInfoAnimating ? '0.15s' : '0s'
                  }}
                >
                {(() => {
                  const currentGroup = groupContacts.find(c => c.id === selectedContact)
                  const memberCount = Math.floor(Math.random() * 50) + 10
                  
                  return (
                    <>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                          群组信息
                        </h2>
                        <button 
                          onClick={handleCloseGroupInfo}
                          className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
                            isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Group Basic Info */}
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                          {currentGroup?.avatar}
                        </div>
                        <h3 className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                          {currentGroup?.name}
                        </h3>
                        <p className="text-sm text-gray-400">{memberCount}位成员</p>
                      </div>

                      {/* Group Announcement */}
                      <div className={`${isDark ? "bg-[#252842]" : "bg-gray-50"} p-4 rounded-lg mb-6`}>
                        <h4 className={`text-sm font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                          群公告
                        </h4>
                        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                          欢迎加入{currentGroup?.name}！请大家文明交流，分享有价值的交易心得和市场分析。禁止发布广告和无关内容。
                        </p>
                        <div className="text-xs text-gray-400 mt-2">
                          管理员 · 2024年1月15日
                        </div>
                      </div>

                      {/* Group Members */}
                      <div className="mb-6">
                        <h4 className={`text-sm font-semibold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}>
                          群成员 ({memberCount})
                        </h4>
                        <div className="space-y-3">
                          {[
                            { name: "张三", avatar: "👨‍💼", role: "群主", status: "在线" },
                            { name: "李四", avatar: "👩‍💼", role: "管理员", status: "在线" },
                            { name: "王五", avatar: "👨‍🎓", role: "成员", status: "离线" },
                            { name: "赵六", avatar: "👨‍💻", role: "成员", status: "在线" },
                            { name: "钱七", avatar: "👩‍🔬", role: "成员", status: "在线" }
                          ].map((member, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                  {member.avatar}
                                </div>
                                <div>
                                  <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                                    {member.name}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-400">{member.role}</span>
                                    <div className={`w-2 h-2 rounded-full ${member.status === "在线" ? "bg-green-500" : "bg-gray-400"}`}></div>
                                  </div>
                                </div>
                              </div>
                              {member.role !== "群主" && (
                                <button className={`text-xs px-2 py-1 rounded transition-colors ${
                                  isDark ? "bg-[#252842] text-gray-300 hover:bg-[#3a3d4a]" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}>
                                  @{member.name}
                                </button>
                              )}
                            </div>
                          ))}
                          
                          {memberCount > 5 && (
                            <button className={`w-full text-center py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors`}>
                              查看全部 {memberCount} 位成员
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
                          邀请朋友
                        </button>
                        <button className={`flex-1 py-2.5 rounded-lg font-medium transition-colors text-sm border ${
                          isDark 
                            ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}>
                          群设置
                        </button>
                      </div>
                    </>
                  )
                })()}
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