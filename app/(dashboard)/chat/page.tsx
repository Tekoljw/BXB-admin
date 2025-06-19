"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Search, Plus, MessageCircle, Phone, Video, User, Users, Star, Shield, BookOpen, Smile, Paperclip, Scissors, ArrowUp, MoreHorizontal, X, ChevronRight, Bell, Image } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import GroupInfoModal from "@/components/group-info-modal"

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
  const [screenWidth, setScreenWidth] = useState(0)

  // Refs
  const addMenuRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<HTMLDivElement>(null)
  const memberSidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      const width = window.innerWidth
      setScreenWidth(width)
      setIsMobile(width < 768)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Event handlers
  const handleCloseGroupInfo = useCallback(() => {
    setGroupInfoAnimating(false)
    setTimeout(() => setShowGroupInfo(false), 300)
  }, [])

  const handleShowGroupInfo = useCallback(() => {
    setShowGroupInfo(true)
    setTimeout(() => setGroupInfoAnimating(true), 50)
  }, [])

  if (!mounted) {
    return <div className="flex h-screen bg-gray-50" />
  }

  // Contact data
  const contacts: Contact[] = [
    {
      id: "contact-1",
      name: "AI交易助手",
      avatar: "🤖",
      lastMessage: "您好，我是您的AI交易助手，有什么可以帮您的吗？",
      time: "刚刚",
      unread: 0,
      isOnline: true,
      isActive: true,
      isAI: true
    },
    {
      id: "contact-2",
      name: "张三",
      avatar: "👨‍💼",
      lastMessage: "今天的市场行情不错，你觉得呢？",
      time: "5分钟前",
      unread: 2,
      isOnline: true
    },
    {
      id: "contact-3",
      name: "李四",
      avatar: "👩‍💻",
      lastMessage: "那个项目的进展如何了？",
      time: "1小时前",
      unread: 0,
      isOnline: false
    }
  ]

  const groupContacts: Contact[] = [
    {
      id: "group-1",
      name: "BTC交易群",
      avatar: "₿",
      lastMessage: "王五: 今天突破了重要阻力位",
      time: "2分钟前",
      unread: 5,
      isOnline: true
    },
    {
      id: "group-2", 
      name: "ETH研究小组",
      avatar: "Ξ",
      lastMessage: "赵六: 这次升级值得关注",
      time: "10分钟前",
      unread: 12,
      isOnline: true
    }
  ]

  const cardStyle = `w-96 ${isDark ? "bg-[#1a1c2e]" : "bg-white"} border-r ${
    isDark ? "border-[#3a3d4a]" : "border-gray-200"
  } flex-shrink-0`

  const addMenuItems = [
    { icon: User, label: "添加好友", action: () => console.log("添加好友") },
    { icon: Users, label: "创建群聊", action: () => console.log("创建群聊") },
    { icon: Shield, label: "担保交易", action: () => console.log("担保交易") },
    { icon: BookOpen, label: "通讯录", action: () => console.log("通讯录") },
  ]

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
        style={{
          width: isMobile ? '100%' : '384px'
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
              消息
            </h1>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAddMenu(!showAddMenu)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? "hover:bg-[#2a2d42] text-gray-400" 
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`} />
            <input
              type="text"
              placeholder="搜索联系人..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                isDark 
                  ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400" 
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {["好友", "群组"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? isDark 
                    ? "text-white border-b-2 border-blue-500" 
                    : "text-gray-900 border-b-2 border-blue-500"
                  : isDark 
                    ? "text-gray-400 hover:text-gray-300" 
                    : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {(activeTab === "好友" ? contacts : groupContacts).map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={`p-4 border-b cursor-pointer transition-colors ${
                isDark ? "border-[#3a3d4a]" : "border-gray-100"
              } ${
                selectedContact === contact.id
                  ? isDark 
                    ? "bg-[#252842]" 
                    : "bg-blue-50"
                  : isDark 
                    ? "hover:bg-[#252842]" 
                    : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                    {contact.avatar}
                  </div>
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold truncate ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}>
                      {contact.name}
                    </h3>
                    <span className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {contact.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-sm truncate ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}>
                      {contact.lastMessage}
                    </p>
                    {contact.unread && contact.unread > 0 && (
                      <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] text-center">
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
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className={`p-4 border-b ${
              isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"
            } flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {(activeTab === "好友" ? contacts : groupContacts).find(c => c.id === selectedContact)?.avatar}
                </div>
                <div>
                  <h2 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {(activeTab === "好友" ? contacts : groupContacts).find(c => c.id === selectedContact)?.name}
                  </h2>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {selectedContact.startsWith("group-") ? "群组聊天" : "在线"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={`p-2 rounded-lg transition-colors ${
                  isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                }`}>
                  <Phone className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg transition-colors ${
                  isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                }`}>
                  <Video className="w-5 h-5" />
                </button>
                {selectedContact.startsWith("group-") && (
                  <button 
                    onClick={handleShowGroupInfo}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                    }`}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isDark ? "bg-[#252842] text-white" : "bg-gray-100 text-gray-900"
                  }`}>
                    <p>您好，我是您的AI交易助手，有什么可以帮您的吗？</p>
                    <span className={`text-xs mt-1 block ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}>
                      09:30
                    </span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-blue-500 text-white">
                    <p>你好，我想了解一下比特币最近的走势</p>
                    <span className="text-xs mt-1 block text-blue-100">09:31</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className={`p-4 border-t ${
              isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"
            }`}>
              <div className="flex items-end gap-3">
                <div className="flex gap-2">
                  <button className={`p-2 rounded-lg transition-colors ${
                    isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                  }`}>
                    <Smile className="w-5 h-5" />
                  </button>
                  <button className={`p-2 rounded-lg transition-colors ${
                    isDark ? "hover:bg-[#2a2d42] text-gray-400" : "hover:bg-gray-100 text-gray-500"
                  }`}>
                    <Paperclip className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="输入消息..."
                    className={`w-full px-4 py-3 rounded-lg border resize-none transition-colors ${
                      isDark 
                        ? "bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400" 
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    rows={3}
                  />
                </div>
                <button 
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  onClick={() => {
                    if (message.trim()) {
                      console.log("发送消息:", message)
                      setMessage("")
                    }
                  }}
                >
                  发送
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className={`w-16 h-16 mx-auto mb-4 ${
                isDark ? "text-gray-600" : "text-gray-400"
              }`} />
              <h3 className={`text-lg font-semibold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}>
                选择一个聊天
              </h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                从左侧选择一个联系人开始聊天
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Group Info Modal */}
      <GroupInfoModal
        isOpen={showGroupInfo && selectedContact?.startsWith("group-") || false}
        onClose={handleCloseGroupInfo}
        group={selectedContact ? groupContacts.find(c => c.id === selectedContact) || null : null}
        isDark={isDark}
      />
    </div>
  )
}