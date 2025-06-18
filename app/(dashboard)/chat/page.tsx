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
    // Friend Requests Section
    { id: "req-1", name: "李明", avatar: "👤", lastMessage: "想要添加您为好友", time: "刚刚", isOnline: false, isSpecial: true },
    { id: "req-2", name: "张华", avatar: "👤", lastMessage: "请求添加好友", time: "5分钟前", isOnline: true, isSpecial: true },
    
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
    requests: filteredContacts.filter(c => c.isSpecial && !c.isAI),
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
          {/* Friend Requests */}
          {groupedContacts.requests.length > 0 && (
            <div className="mb-4">
              <div className={`px-4 py-2 text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                好友请求 ({groupedContacts.requests.length})
              </div>
              {groupedContacts.requests.map((contact) => (
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg">
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
                  <div className="flex space-x-2 ml-2">
                    <button className="px-3 py-1 bg-[#00D4AA] text-white text-xs rounded hover:bg-[#00b89a]">
                      接受
                    </button>
                    <button className={`px-3 py-1 text-xs rounded ${
                      isDark ? 'bg-[#3a3d4a] text-gray-300' : 'bg-gray-200 text-gray-600'
                    }`}>
                      忽略
                    </button>
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
                    setShowMemberSidebar(true)
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
                    setShowMemberSidebar(true)
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
        {/* Chat Area or Empty State */}
        {selectedContact && !showMemberSidebar ? (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-[#252842] rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                    💬
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                    与{contacts.find(c => c.id === selectedContact)?.name}聊天
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    开始你们的对话吧
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Regular Chat View
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

        {/* Member Profile Sidebar */}
        {showMemberSidebar && selectedContact && (
          <div 
            ref={memberSidebarRef}
            className={`w-96 ${cardStyle} flex flex-col transition-transform duration-500 ease-out transform`}
            style={{
              animation: 'slideInFromRight 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
            }}
          >
            {selectedContact?.startsWith("ai-") ? (
              // AI Assistant Profile Design
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
                        setShowAIProfile(false)
                        setShowMemberSidebar(false)
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
            ) : (
              // Regular User Profile with Facebook-style Layout
              <div className="h-full overflow-y-auto">
                {/* Profile Header */}
                <div className={`${cardStyle} mb-4 overflow-hidden`}>
                  {/* Cover Photo */}
                  <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
                      <Video className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  
                  {/* Profile Info */}
                  <div className="relative px-6 pb-6">
                    {/* Avatar */}
                    <div className="relative -mt-16 mb-4">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-6xl text-white border-4 border-white shadow-lg">
                        👨‍💼
                      </div>
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                    </div>
                    
                    {/* Name and Status */}
                    <div className="mb-4">
                      <h2 className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-800"}`}>
                        {contacts.find(c => c.id === selectedContact)?.name}
                      </h2>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>在线</span>
                      </div>
                    </div>

                    {/* User Description */}
                    <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      专注数字货币交易，擅长技术分析和风险控制。提供专业的市场分析和交易策略指导。
                    </p>

                    {/* User Info */}
                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">📍</span>
                        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>上海市</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">📅</span>
                        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>2019年加入</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">💼</span>
                        <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>专业交易5年</span>
                      </div>
                    </div>

                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>236</div>
                          <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>动态</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>12.8K</div>
                          <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>粉丝</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>89</div>
                          <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>关注</div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button className="px-6 py-2 bg-[#00D4AA] text-white text-sm rounded-lg hover:bg-[#00b89a] transition-colors">
                          发消息
                        </button>
                        <button className={`px-6 py-2 text-sm rounded-lg transition-colors ${
                          isDark
                            ? "bg-[#252842] text-gray-300 hover:bg-[#3a3d4a]"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}>
                          关注
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className={`${cardStyle} mb-4`}>
                  <div className="flex border-b border-gray-200 dark:border-[#3a3d4a]">
                    <button 
                      onClick={() => setActiveProfileTab("动态")}
                      className={`px-6 py-3 text-sm font-medium ${
                        activeProfileTab === "动态" 
                          ? "border-b-2 border-[#00D4AA] text-[#00D4AA]" 
                          : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      动态
                    </button>
                    <button 
                      onClick={() => setActiveProfileTab("交易记录")}
                      className={`px-6 py-3 text-sm font-medium ${
                        activeProfileTab === "交易记录" 
                          ? "border-b-2 border-[#00D4AA] text-[#00D4AA]" 
                          : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      交易记录
                    </button>
                    <button 
                      onClick={() => setActiveProfileTab("持仓分析")}
                      className={`px-6 py-3 text-sm font-medium ${
                        activeProfileTab === "持仓分析" 
                          ? "border-b-2 border-[#00D4AA] text-[#00D4AA]" 
                          : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      持仓分析
                    </button>
                  </div>
                </div>

                {/* Content Based on Active Tab */}
                <div className="flex-1 overflow-y-auto pb-6">
                  {activeProfileTab === "动态" && (
                    <div className="space-y-4">
                      {/* Post 1 */}
                      <div className={`${cardStyle} p-6`}>
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                            👨‍💼
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>Alex Chen</h4>
                              <span className="text-xs text-gray-500">2小时前</span>
                            </div>
                            <p className={`text-sm mb-4 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                              今日BTC突破关键阻力位，建议关注回调机会。技术面显示强势上涨趋势，但需要注意风险控制。
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-[#00D4AA]">+12.5%</span>
                                <div className="flex items-center space-x-1">
                                  <button className="text-red-500 hover:text-red-600">
                                    <span className="text-sm">❤️</span>
                                  </button>
                                  <span className="text-sm text-gray-500">156</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <button className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                                    <MessageCircle className="w-4 h-4" />
                                  </button>
                                  <span className="text-sm text-gray-500">23</span>
                                </div>
                              </div>
                              <button className={`text-xs px-3 py-1 rounded-full ${
                                isDark ? "bg-[#252842] text-gray-300" : "bg-gray-100 text-gray-600"
                              }`}>
                                BTC/USDT
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Post 2 */}
                      <div className={`${cardStyle} p-6`}>
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                            👨‍💼
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>Alex Chen</h4>
                              <span className="text-xs text-gray-500">6小时前</span>
                            </div>
                            <p className={`text-sm mb-4 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                              ETH/USDT 4小时级别形成看涨三角形突破，目标位看到2150附近。
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-[#00D4AA]">+8.3%</span>
                                <div className="flex items-center space-x-1">
                                  <button className="text-red-500 hover:text-red-600">
                                    <span className="text-sm">❤️</span>
                                  </button>
                                  <span className="text-sm text-gray-500">89</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <button className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}>
                                    <MessageCircle className="w-4 h-4" />
                                  </button>
                                  <span className="text-sm text-gray-500">12</span>
                                </div>
                              </div>
                              <button className={`text-xs px-3 py-1 rounded-full ${
                                isDark ? "bg-[#252842] text-gray-300" : "bg-gray-100 text-gray-600"
                              }`}>
                                ETH/USDT
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProfileTab === "交易记录" && (
                    <div className="space-y-4">
                      {/* Performance Stats */}
                      <div className={`${cardStyle} p-6`}>
                        <div className="grid grid-cols-3 gap-6 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#00D4AA]">+158.7%</div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>总收益</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>85.2%</div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>胜率</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>1234</div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>交易笔数</div>
                          </div>
                        </div>
                      </div>

                      {/* Trading Records */}
                      <div className={`${cardStyle}`}>
                        <div className="p-4 border-b border-gray-200 dark:border-[#3a3d4a]">
                          <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>最近交易</h3>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-[#3a3d4a]">
                          {/* BTC Trade */}
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  BTC
                                </div>
                                <div>
                                  <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>BTC/USDT</div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs px-2 py-1 bg-[#00D4AA] text-white rounded">多单</span>
                                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>已平仓</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-[#00D4AA] font-medium">+2.3%</div>
                                <div className="text-xs text-gray-500">10:30</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>买入: $42,150</span>
                              <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>卖出: $43,120</span>
                            </div>
                            <div className="mt-1">
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">开仓 +15%</span>
                            </div>
                          </div>

                          {/* ETH Trade */}
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  ETH
                                </div>
                                <div>
                                  <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>ETH/USDT</div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs px-2 py-1 bg-red-500 text-white rounded">空单</span>
                                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>已平仓</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-[#00D4AA] font-medium">+1.8%</div>
                                <div className="text-xs text-gray-500">09:15</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>买入: $2,450</span>
                              <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>卖出: $2,406</span>
                            </div>
                            <div className="mt-1">
                              <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded">平仓 -8%</span>
                            </div>
                          </div>

                          {/* BNB Trade */}
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                  BNB
                                </div>
                                <div>
                                  <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>BNB/USDT</div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs px-2 py-1 bg-[#00D4AA] text-white rounded">多单</span>
                                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>已平仓</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-[#00D4AA] font-medium">+3.5%</div>
                                <div className="text-xs text-gray-500">昨天</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>买入: $285</span>
                              <span className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>卖出: $295</span>
                            </div>
                            <div className="mt-1">
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">开仓 +22%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProfileTab === "持仓分析" && (
                    <div className="space-y-4">
                      {/* Performance Overview */}
                      <div className={`${cardStyle} p-6`}>
                        <div className="grid grid-cols-3 gap-6 mb-6">
                          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-[#00D4AA]">+3.2%</div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>今日盈亏</div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-blue-500">+15.8%</div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>本周盈亏</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <div className="text-2xl font-bold text-purple-500">+68.4%</div>
                            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>12个月盈亏</div>
                          </div>
                        </div>
                      </div>

                      {/* Portfolio Holdings */}
                      <div className={`${cardStyle}`}>
                        <div className="p-4 border-b border-gray-200 dark:border-[#3a3d4a]">
                          <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>持仓详情</h3>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-[#3a3d4a]">
                          {/* BTC Holding */}
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  BTC
                                </div>
                                <div>
                                  <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>BTC</div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs px-2 py-1 bg-[#00D4AA] text-white rounded">多单</span>
                                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>持仓占比</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>35.2%</div>
                                <div className="text-[#00D4AA] text-sm">+2.04%</div>
                              </div>
                            </div>
                          </div>

                          {/* ETH Holding */}
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  ETH
                                </div>
                                <div>
                                  <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>ETH</div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs px-2 py-1 bg-red-500 text-white rounded">空单</span>
                                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>持仓占比</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>28.1%</div>
                                <div className="text-red-500 text-sm">-1.23%</div>
                              </div>
                            </div>
                          </div>

                          {/* BNB Holding */}
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  BNB
                                </div>
                                <div>
                                  <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>BNB</div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs px-2 py-1 bg-[#00D4AA] text-white rounded">多单</span>
                                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>持仓占比</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>18.7%</div>
                                <div className="text-[#00D4AA] text-sm">+0.89%</div>
                              </div>
                            </div>
                          </div>

                          {/* SOL Holding */}
                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  SOL
                                </div>
                                <div>
                                  <div className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>SOL</div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs px-2 py-1 bg-red-500 text-white rounded">空单</span>
                                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>持仓占比</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>18.0%</div>
                                <div className="text-[#00D4AA] text-sm">+1.15%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}