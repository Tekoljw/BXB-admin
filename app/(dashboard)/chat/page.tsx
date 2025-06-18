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
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const [showMemberSidebar, setShowMemberSidebar] = useState(false)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeProfileTab, setActiveProfileTab] = useState("动态")
  const [showAIProfile, setShowAIProfile] = useState(false)
  const addMenuRef = useRef<HTMLDivElement>(null)
  const memberSidebarRef = useRef<HTMLDivElement>(null)

  const cardStyle = `${isDark ? 'bg-[#1a1d29] border-[#3a3d4a]' : 'bg-white border-gray-200'} border rounded-lg shadow-sm`

  // Mock data
  const contacts: Contact[] = [
    // Single entry point for friend requests
    { id: "new-friends", name: "新好友", avatar: "👥", lastMessage: "3个新的好友请求", time: "", isOnline: false, isSpecial: true },
    
    // AI Assistants Section
    { id: "ai-trading", name: "交易顾问", avatar: "🤖", lastMessage: "市场分析已更新，建议查看BTC走势", time: "1分钟前", isOnline: true, isAI: true },
    { id: "ai-escrow", name: "担保专家", avatar: "🛡️", lastMessage: "您的担保交易已完成", time: "10分钟前", isOnline: true, isAI: true },
    { id: "ai-customer", name: "智能客服", avatar: "💬", lastMessage: "有什么可以帮您的吗？", time: "在线", isOnline: true, isAI: true },
    
    // Regular Friends (Alphabetically sorted)
    { id: "contact-1", name: "Alex Chen", avatar: "👨‍💼", lastMessage: "BTC今日走势如何？", time: "2分钟前", unread: 2, isOnline: true, isActive: true },
    { id: "contact-2", name: "Bob Wang", avatar: "👨‍🎓", lastMessage: "ETH合约建议做多", time: "15分钟前", isOnline: false },
    { id: "contact-3", name: "Carol Li", avatar: "👩‍💻", lastMessage: "今天收益不错", time: "1小时前", unread: 1, isOnline: true },
    { id: "contact-4", name: "David Liu", avatar: "👨‍🔬", lastMessage: "风险控制很重要", time: "2小时前", isOnline: false },
    { id: "contact-5", name: "Emma Zhang", avatar: "👩‍🎨", lastMessage: "新手求指导", time: "昨天", isOnline: true },
  ]

  // Friend requests data (separate from main contacts)
  const friendRequests = [
    { id: "req-1", name: "李明", avatar: "👤", message: "想要添加您为好友", time: "刚刚", isOnline: false },
    { id: "req-2", name: "张华", avatar: "👤", message: "请求添加好友", time: "5分钟前", isOnline: true },
    { id: "req-3", name: "王小红", avatar: "👤", message: "希望成为好友", time: "1小时前", isOnline: false },
  ]

  const messages: Record<string, Message[]> = {
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

  // Handle click outside for dropdowns
  const handleMouseMove = (e: MouseEvent) => {
    const sidebar = memberSidebarRef.current
    if (!sidebar) return

    const rect = sidebar.getBoundingClientRect()
    const isNearRightEdge = e.clientX > rect.right - 50

    if (showMemberSidebar && !isNearRightEdge && e.clientX < rect.left - 20) {
      setShowMemberSidebar(false)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
      setShowAddMenu(false)
    }
  }

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [showMemberSidebar])

  const groupedContacts = {
    newFriends: filteredContacts.filter(c => c.id === "new-friends"),
    ai: filteredContacts.filter(c => c.isAI),
    friends: filteredContacts.filter(c => !c.isSpecial && !c.isAI).sort((a, b) => a.name.localeCompare(b.name))
  }

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
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
            <input
              type="text"
              placeholder="搜索联系人..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
                isDark
                  ? 'bg-[#252842] border-[#3a3d4a] text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent`}
            />
          </div>
          <div className="relative" ref={addMenuRef}>
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'bg-[#252842] hover:bg-[#3a3d4a] text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              <Plus className="h-4 w-4" />
            </button>
            {showAddMenu && (
              <div className={`absolute right-0 top-full mt-2 w-48 ${cardStyle} py-2 z-50`}>
                {addMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action()
                      setShowAddMenu(false)
                    }}
                    className={`w-full flex items-center px-4 py-2 text-sm hover:${
                      isDark ? 'bg-[#252842]' : 'bg-gray-50'
                    } transition-colors`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Groups */}
        <div className="flex-1 overflow-y-auto">
          {/* New Friends Entry */}
          {groupedContacts.newFriends.length > 0 && (
            <div className="mb-4">
              {groupedContacts.newFriends.map((contact) => (
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-lg">
                      {contact.avatar}
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {friendRequests.length}
                    </div>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{contact.name}</h3>
                    </div>
                    <p className="text-sm opacity-70 truncate">{contact.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AI Assistants */}
          {groupedContacts.ai.length > 0 && (
            <div className="mb-4">
              <div className={`px-4 py-2 text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                AI助手
              </div>
              {groupedContacts.ai.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center p-3 mx-2 rounded-lg cursor-pointer transition-all ${
                    selectedContact === contact.id
                      ? 'bg-[#00D4AA] text-white'
                      : isDark
                      ? 'hover:bg-[#252842] text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => {
                    setSelectedContact(contact.id)
                    setShowMemberSidebar(false)
                    setShowAIProfile(true)
                  }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4AA] to-[#00b89a] flex items-center justify-center text-white text-lg">
                      {contact.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{contact.name}</h3>
                      <span className="text-xs opacity-70">{contact.time}</span>
                    </div>
                    <p className="text-sm opacity-70 truncate">{contact.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Regular Friends */}
          {groupedContacts.friends.length > 0 && (
            <div>
              <div className={`px-4 py-2 text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                好友 ({groupedContacts.friends.length})
              </div>
              {groupedContacts.friends.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center p-3 mx-2 rounded-lg cursor-pointer transition-all ${
                    selectedContact === contact.id
                      ? 'bg-[#00D4AA] text-white'
                      : isDark
                      ? 'hover:bg-[#252842] text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => {
                    setSelectedContact(contact.id)
                    setShowMemberSidebar(false)
                    setShowAIProfile(false)
                  }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg">
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
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {selectedContact ? (
          selectedContact === "new-friends" ? (
            // Friend Requests Page
            <div className="flex-1 flex flex-col p-6">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    新好友请求
                  </h1>
                  <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {friendRequests.length} 个待处理
                  </span>
                </div>

                {/* Friend Requests List */}
                <div className="flex-1 overflow-y-auto space-y-4">
                  {friendRequests.map((request) => (
                    <div key={request.id} className={`${cardStyle} p-6`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl">
                              {request.avatar}
                            </div>
                            {request.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-medium text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                              {request.name}
                            </h3>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                              {request.message}
                            </p>
                            <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                              {request.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button className="px-4 py-2 bg-[#00D4AA] text-white text-sm rounded-lg hover:bg-[#00b89a] transition-colors">
                            接受
                          </button>
                          <button className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                            isDark 
                              ? 'bg-[#3a3d4a] text-gray-300 hover:bg-[#454851]' 
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}>
                            忽略
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : selectedContact.startsWith("ai-") ? (
            // AI Assistant Profile in Main Area
            <div className="flex-1 flex flex-col p-6">
              <div className="flex flex-col h-full">
                {/* Hero Section */}
                <div className="text-center py-16 px-8">
                  {/* AI Avatar */}
                  <div className="relative mx-auto mb-8 w-32 h-32">
                    <div className={`w-full h-full rounded-full ${isDark ? 'bg-gradient-to-br from-[#00D4AA] to-[#00a389]' : 'bg-gradient-to-br from-[#00D4AA] to-[#00c5a5]'} flex items-center justify-center text-6xl text-white shadow-2xl`}>
                      {selectedContact === "ai-escrow" ? "🛡️" : 
                       selectedContact === "ai-trading" ? "📊" : "🤖"}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h1 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {selectedContact === "ai-escrow" ? "担保专家" : 
                     selectedContact === "ai-trading" ? "交易顾问" : "智能客服"}
                  </h1>
                  
                  <p className={`text-xl mb-8 max-w-md mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {selectedContact === "ai-escrow" ? "守护您的每一笔交易" : 
                     selectedContact === "ai-trading" ? "洞察市场 · 智慧投资" : "随时为您提供帮助"}
                  </p>

                  {/* Quick Stats */}
                  <div className="flex justify-center space-x-8 mb-12">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#00D4AA]">7×24</div>
                      <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>全天候服务</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#00D4AA]">&lt;1s</div>
                      <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>响应时间</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#00D4AA]">AI</div>
                      <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>智能驱动</div>
                    </div>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="flex-1 px-8 pb-8">
                  <div className="max-w-2xl mx-auto">
                    <h2 className={`text-lg font-semibold mb-6 text-center ${isDark ? "text-white" : "text-gray-800"}`}>
                      我能为您做什么？
                    </h2>
                    
                    <div className="space-y-4">
                      {selectedContact === "ai-escrow" && [
                        { icon: "🔐", title: "资金托管", desc: "安全托管交易资金，确保双方权益" },
                        { icon: "⚖️", title: "纠纷调解", desc: "公正处理交易争议，快速解决问题" },
                        { icon: "📝", title: "合约管理", desc: "智能合约生成与执行监控" }
                      ].map((item, index) => (
                        <div key={index} className={`flex items-center p-4 rounded-xl ${isDark ? "bg-[#252842] hover:bg-[#2a2d42]" : "bg-gray-50 hover:bg-gray-100"} transition-all cursor-pointer`}>
                          <div className="text-3xl mr-4">{item.icon}</div>
                          <div className="flex-1">
                            <h3 className={`font-medium mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>{item.title}</h3>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{item.desc}</p>
                          </div>
                          <div className="text-[#00D4AA]">→</div>
                        </div>
                      ))}
                      
                      {selectedContact === "ai-trading" && [
                        { icon: "📈", title: "市场分析", desc: "实时分析市场趋势和价格走向" },
                        { icon: "💡", title: "投资建议", desc: "基于数据提供个性化投资策略" },
                        { icon: "⚠️", title: "风险预警", desc: "及时提醒潜在风险和异常波动" }
                      ].map((item, index) => (
                        <div key={index} className={`flex items-center p-4 rounded-xl ${isDark ? "bg-[#252842] hover:bg-[#2a2d42]" : "bg-gray-50 hover:bg-gray-100"} transition-all cursor-pointer`}>
                          <div className="text-3xl mr-4">{item.icon}</div>
                          <div className="flex-1">
                            <h3 className={`font-medium mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>{item.title}</h3>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{item.desc}</p>
                          </div>
                          <div className="text-[#00D4AA]">→</div>
                        </div>
                      ))}
                      
                      {selectedContact === "ai-customer" && [
                        { icon: "💬", title: "即时问答", desc: "快速解答您的各种问题" },
                        { icon: "🔧", title: "技术支持", desc: "协助解决技术和操作问题" },
                        { icon: "📚", title: "使用指导", desc: "详细的功能介绍和操作教程" }
                      ].map((item, index) => (
                        <div key={index} className={`flex items-center p-4 rounded-xl ${isDark ? "bg-[#252842] hover:bg-[#2a2d42]" : "bg-gray-50 hover:bg-gray-100"} transition-all cursor-pointer`}>
                          <div className="text-3xl mr-4">{item.icon}</div>
                          <div className="flex-1">
                            <h3 className={`font-medium mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>{item.title}</h3>
                            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{item.desc}</p>
                          </div>
                          <div className="text-[#00D4AA]">→</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Area */}
                <div className="p-8 border-t border-gray-200 dark:border-[#3a3d4a]">
                  <div className="text-center">
                    <button 
                      onClick={() => {
                        console.log(`开始与${selectedContact}对话`)
                      }}
                      className="group relative overflow-hidden px-12 py-4 bg-[#00D4AA] text-white text-lg font-semibold rounded-full hover:bg-[#00b89a] transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <span className="mr-2">开始对话</span>
                        <span className="group-hover:translate-x-1 transition-transform">💬</span>
                      </span>
                    </button>
                    <p className={`text-sm mt-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      点击开始，我将为您提供专业服务
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedContact?.startsWith("req-") ? (
            // Friend Request Interface
            <div className="flex-1 flex flex-col p-6">
              <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl mb-6">
                  👤
                </div>
                
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  {contacts.find(c => c.id === selectedContact)?.name}
                </h2>
                
                <p className={`text-center mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  想要添加您为好友
                </p>
                
                <div className="flex space-x-4 w-full">
                  <button className="flex-1 py-3 px-6 bg-[#00D4AA] text-white rounded-lg hover:bg-[#00b89a] transition-colors font-medium">
                    接受
                  </button>
                  <button className={`flex-1 py-3 px-6 border rounded-lg transition-colors font-medium ${
                    isDark 
                      ? "border-[#3a3d4a] text-gray-300 hover:bg-[#252842]" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}>
                    拒绝
                  </button>
                </div>
                
                <div className={`mt-6 p-4 rounded-lg text-center ${isDark ? "bg-[#252842]" : "bg-gray-50"}`}>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    通过好友验证后，您可以开始聊天
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Regular User Profile in Main Area
            <div className="flex-1 overflow-y-auto p-6">
              {/* Profile Card */}
              <div className={`${cardStyle} mb-6`}>
                {/* Profile Content */}
                <div className="p-6">
                  {/* Avatar and Basic Info */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center text-white text-2xl">
                        👨‍💼
                      </div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                        {contacts.find(c => c.id === selectedContact)?.name}
                      </h2>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}>
                        专业交易员 • 5年经验
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>604位好友</span>
                        <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>4.5万粉丝</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row - Smaller and integrated */}
                  <div className="grid grid-cols-3 gap-6 mb-6 text-center">
                    <div>
                      <div className="text-lg font-bold text-[#00D4AA] mb-1">+158%</div>
                      <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>总收益率</div>
                    </div>
                    <div>
                      <div className={`text-lg font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>85.2%</div>
                      <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>胜率</div>
                    </div>
                    <div>
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
                </div>
              </div>

              {/* Tab Navigation - Text only */}
              <div className="mb-6">
                <div className="flex space-x-8 border-b border-gray-200 dark:border-[#3a3d4a]">
                  <button 
                    onClick={() => setActiveProfileTab("动态")}
                    className={`pb-3 text-sm font-medium ${
                      activeProfileTab === "动态" 
                        ? "border-b-2 border-[#00D4AA] text-[#00D4AA]" 
                        : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    动态
                  </button>
                  <button 
                    onClick={() => setActiveProfileTab("合约交易")}
                    className={`pb-3 text-sm font-medium ${
                      activeProfileTab === "合约交易" 
                        ? "border-b-2 border-[#00D4AA] text-[#00D4AA]" 
                        : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    合约交易
                  </button>
                  <button 
                    onClick={() => setActiveProfileTab("合约持仓")}
                    className={`pb-3 text-sm font-medium ${
                      activeProfileTab === "合约持仓" 
                        ? "border-b-2 border-[#00D4AA] text-[#00D4AA]" 
                        : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    合约持仓
                  </button>
                </div>
              </div>

              {/* Content Based on Active Tab */}
              <div className="flex-1 overflow-y-auto">
                {activeProfileTab === "动态" && (
                  <div className="space-y-6">
                    {/* Post with Image */}
                    <div className="pb-6 border-b border-gray-200 dark:border-[#3a3d4a]">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-lg">
                          👨‍💼
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                            {contacts.find(c => c.id === selectedContact)?.name}
                          </h4>
                          <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>2小时前</span>
                        </div>
                      </div>
                      <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        今日BTC突破关键阻力位，建议关注回调机会。技术面显示强势上涨趋势，但需要注意风险控制。
                      </p>
                      
                      {/* Post Image */}
                      <div className="h-48 bg-gradient-to-r from-cyan-400 to-cyan-500 flex items-center justify-center rounded-lg mb-4">
                        <div className="text-white text-6xl">📊</div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <button className={`flex items-center space-x-1 text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                          <span>❤️</span>
                          <span>156</span>
                        </button>
                        <button className={`flex items-center space-x-1 text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                          <span>💬</span>
                          <span>23</span>
                        </button>
                        <button className={`flex items-center space-x-1 text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                          <span>🔄</span>
                          <span>12</span>
                        </button>
                      </div>
                    </div>

                    {/* Text Post */}
                    <div className="pb-6 border-b border-gray-200 dark:border-[#3a3d4a]">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-lg">
                          👨‍💼
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                            {contacts.find(c => c.id === selectedContact)?.name}
                          </h4>
                          <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>6小时前</span>
                        </div>
                      </div>
                      <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        ETH/USDT 4小时级别形成看涨三角形突破，目标位看到2150附近。
                      </p>
                      <div className="flex items-center space-x-6">
                        <button className={`flex items-center space-x-1 text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                          <span>❤️</span>
                          <span>89</span>
                        </button>
                        <button className={`flex items-center space-x-1 text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                          <span>💬</span>
                          <span>12</span>
                        </button>
                        <button className={`flex items-center space-x-1 text-sm ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                          <span>🔄</span>
                          <span>5</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeProfileTab === "合约交易" && (
                  <div className={`${cardStyle} p-6`}>
                    {/* Header Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">+158.7%</div>
                        <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>总收益</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">85.2%</div>
                        <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>胜率</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>1234</div>
                        <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>交易笔数</div>
                      </div>
                    </div>

                    {/* Trading Positions */}
                    <div className="space-y-4">
                      {/* BTC Trade */}
                      <div className={`p-4 rounded-lg border ${isDark ? "bg-[#252842] border-[#3a3d4a]" : "bg-white border-gray-200"}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>BTC/USDT</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">多单</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">已平仓</span>
                          </div>
                          <div className="text-green-500 font-bold text-lg">+2.3%</div>
                        </div>
                        <div className="space-y-1">
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            买入：$42,150　卖出：$43,120
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-blue-500 text-sm">开仓 +15%</div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>10:30</div>
                          </div>
                        </div>
                      </div>

                      {/* ETH Trade */}
                      <div className={`p-4 rounded-lg border ${isDark ? "bg-[#252842] border-[#3a3d4a]" : "bg-white border-gray-200"}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>ETH/USDT</span>
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">空单</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">已平仓</span>
                          </div>
                          <div className="text-green-500 font-bold text-lg">+1.8%</div>
                        </div>
                        <div className="space-y-1">
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            买入：$2,450　卖出：$2,406
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-blue-500 text-sm">平仓 -8%</div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>09:15</div>
                          </div>
                        </div>
                      </div>

                      {/* BNB Trade */}
                      <div className={`p-4 rounded-lg border ${isDark ? "bg-[#252842] border-[#3a3d4a]" : "bg-white border-gray-200"}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>BNB/USDT</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">多单</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">已平仓</span>
                          </div>
                          <div className="text-green-500 font-bold text-lg">+3.5%</div>
                        </div>
                        <div className="space-y-1">
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            买入：$285　卖出：$295
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-blue-500 text-sm">开仓 +22%</div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>昨天</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeProfileTab === "合约持仓" && (
                  <div className={`${cardStyle} p-6`}>
                    {/* Performance Grid with colored backgrounds - exactly as shown */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="p-4 bg-green-100 rounded-lg text-center">
                        <div className="text-lg font-bold text-green-700 mb-1">+3.2%</div>
                        <div className="text-xs text-green-700">今日盈亏</div>
                      </div>
                      <div className="p-4 bg-blue-100 rounded-lg text-center">
                        <div className="text-lg font-bold text-blue-700 mb-1">+15.8%</div>
                        <div className="text-xs text-blue-700">本周盈亏</div>
                      </div>
                      <div className="p-4 bg-purple-100 rounded-lg text-center">
                        <div className="text-lg font-bold text-purple-700 mb-1">+68.4%</div>
                        <div className="text-xs text-purple-700">12个月盈亏</div>
                      </div>
                    </div>

                    {/* Holdings Section */}
                    <div>
                      <h3 className={`font-medium mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>持仓详情</h3>
                      
                      {/* BTC Holding */}
                      <div className={`p-4 rounded-lg border mb-4 ${isDark ? "bg-[#252842] border-[#3a3d4a]" : "bg-white border-gray-200"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              BT
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>BTC</span>
                                <span className="text-green-600 text-sm">多单</span>
                              </div>
                              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                持仓占比
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">35.2%</div>
                            <div className="text-[#00D4AA] text-sm">+2.34%</div>
                          </div>
                        </div>
                      </div>

                      {/* ETH Holding */}
                      <div className={`p-4 rounded-lg border mb-4 ${isDark ? "bg-[#252842] border-[#3a3d4a]" : "bg-white border-gray-200"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              ET
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>ETH</span>
                                <span className="text-red-600 text-sm">空单</span>
                              </div>
                              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                持仓占比
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">28.1%</div>
                            <div className="text-red-500 text-sm">-1.23%</div>
                          </div>
                        </div>
                      </div>

                      {/* BNB Holding */}
                      <div className={`p-4 rounded-lg border ${isDark ? "bg-[#252842] border-[#3a3d4a]" : "bg-white border-gray-200"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              BN
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>BNB</span>
                                <span className="text-green-600 text-sm">多单</span>
                              </div>
                              <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                持仓占比
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">18.7%</div>
                            <div className="text-[#00D4AA] text-sm">+0.89%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          // Empty State
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-[#252842] rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                    💬
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                    选择一个对话
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    从左侧选择一个联系人开始聊天
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
