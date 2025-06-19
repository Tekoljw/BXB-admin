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

      {/* Personal Profile Sidebar */}
      <div className={`flex-1 ${cardStyle} ml-4`}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl">
                A
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Alex Chen</h2>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>专业交易员 • 5年经验</p>
                <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>604位好友 • 4万粉丝</p>
              </div>
            </div>
            <button className="bg-[#00D4AA] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00b89a] transition-colors">
              发消息
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-lg text-center ${isDark ? "bg-[#252842]" : "bg-gray-100"}`}>
              <div className="text-2xl font-bold text-green-500 mb-1">+158%</div>
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>总收益率</div>
            </div>
            <div className={`p-4 rounded-lg text-center ${isDark ? "bg-[#252842]" : "bg-gray-100"}`}>
              <div className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>85.2%</div>
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>胜率</div>
            </div>
            <div className={`p-4 rounded-lg text-center ${isDark ? "bg-[#252842]" : "bg-gray-100"}`}>
              <div className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>1,234</div>
              <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>交易笔数</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button className={`py-2 px-3 border transition-colors text-sm ${
              isDark 
                ? "border-[#3a3d4a] text-gray-300 hover:bg-[#252842]" 
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } rounded-lg`}>
              关注
            </button>
            <button className={`py-2 px-3 border transition-colors text-sm ${
              isDark 
                ? "border-[#3a3d4a] text-gray-300 hover:bg-[#252842]" 
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } rounded-lg`}>
              加好友
            </button>
            <button className="py-2 px-3 bg-[#00D4AA] text-white rounded-lg hover:bg-[#00b89a] transition-colors text-sm">
              跟单
            </button>
          </div>

          {/* Profile Tabs */}
          <div className="mb-6">
            <div className="flex space-x-8 border-b border-gray-200 dark:border-[#3a3d4a]">
              {["动态", "交易记录", "持仓分析"].map((tab) => (
                <button
                  key={tab}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                    tab === "动态"
                      ? "border-[#00D4AA] text-[#00D4AA]"
                      : isDark
                        ? "border-transparent text-gray-400 hover:text-gray-300"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${isDark ? "bg-[#252842]" : "bg-gray-50"}`}>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm">
                  A
                </div>
                <div>
                  <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Alex Chen</h4>
                  <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>2小时前</p>
                </div>
              </div>
              <p className={`text-sm mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                今日BTC突破关键阻力位，建议关注回调机会。技术指标显示上涨趋势仍将持续。
              </p>
              <div className={`p-3 rounded-lg ${isDark ? "bg-[#1a1d29]" : "bg-white"} border ${isDark ? "border-[#3a3d4a]" : "border-gray-200"}`}>
                <div className="text-center py-8">
                  <div className="w-16 h-12 mx-auto mb-2 bg-gradient-to-r from-green-400 to-blue-500 rounded flex items-center justify-center">
                    <div className="text-white text-2xl">📊</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-sm">
                <div className="flex items-center space-x-4">
                  <button className={`flex items-center space-x-1 ${isDark ? "text-gray-400 hover:text-red-500" : "text-gray-500 hover:text-red-500"}`}>
                    <span>❤️</span>
                    <span>156</span>
                  </button>
                  <button className={`flex items-center space-x-1 ${isDark ? "text-gray-400 hover:text-blue-500" : "text-gray-500 hover:text-blue-500"}`}>
                    <span>💬</span>
                    <span>23</span>
                  </button>
                  <button className={`flex items-center space-x-1 ${isDark ? "text-gray-400 hover:text-green-500" : "text-gray-500 hover:text-green-500"}`}>
                    <span>🔄</span>
                    <span>12</span>
                  </button>
                </div>
                <button className={`${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"}`}>
                  <span>📤</span>
                </button>
              </div>
            </div>
          </div>
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