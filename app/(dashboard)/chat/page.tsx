"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Search,
  Star,
  MessageCircle,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Smile,
  Paperclip,
  Mic,
  Plus,
  Users,
  Shield,
  UserPlus,
  QrCode,
  Scissors,
  GripHorizontal,
} from "lucide-react"
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

  // All hooks must be called before any conditional returns
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("好友")
  const [selectedContact, setSelectedContact] = useState<string | null>("contact-1")
  const [message, setMessage] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["contact-1", "contact-3"])
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [isMenuAnimating, setIsMenuAnimating] = useState(false)
  const [showUnreadIndicator, setShowUnreadIndicator] = useState(false)
  const [inputHeight, setInputHeight] = useState(120)
  const [isResizing, setIsResizing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const addMenuRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const firstUnreadRef = useRef<HTMLDivElement>(null)

  // 处理输入框拖拽调整高度
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
    const startY = e.clientY
    const startHeight = inputHeight

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = startY - e.clientY
      const newHeight = Math.max(80, Math.min(400, startHeight + deltaY))
      setInputHeight(newHeight)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // 处理菜单显示
  const handleShowMenu = useCallback(() => {
    setShowAddMenu(true)
    setIsMenuAnimating(true)
  }, [])

  // 处理菜单关闭
  const handleCloseMenu = useCallback(() => {
    setIsMenuAnimating(false)
    setTimeout(() => {
      setShowAddMenu(false)
    }, 200) // 等待动画完成
  }, [])

  // 解决闪烁问题
  useEffect(() => {
    setMounted(true)
  }, [])

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedContact])

  // 点击外部关闭添加菜单
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
  }, [handleCloseMenu])



  // 检查滚动位置显示未读指示器
  useEffect(() => {
    if (!mounted) return
    
    const chatContainer = chatContainerRef.current
    if (!chatContainer) {
      setShowUnreadIndicator(false)
      return
    }

    const handleScroll = () => {
      if (firstUnreadRef.current && chatContainer) {
        const containerRect = chatContainer.getBoundingClientRect()
        const unreadRect = firstUnreadRef.current.getBoundingClientRect()
        
        // 如果第一条未读消息不在视口内，显示指示器
        const isVisible = unreadRect.top >= containerRect.top && 
                         unreadRect.bottom <= containerRect.bottom
        setShowUnreadIndicator(!isVisible)
      }
    }

    chatContainer.addEventListener('scroll', handleScroll)
    handleScroll() // 初始检查

    return () => chatContainer.removeEventListener('scroll', handleScroll)
  }, [selectedContact, mounted])

  // 如果组件未挂载，返回空白内容，避免闪烁
  if (!mounted) {
    return <div className="min-h-screen bg-[#f5f8fa] dark:bg-background"></div>
  }

  // 统一的卡片样式
  const cardStyle = isDark ? "bg-[#1a1d29] border border-[#252842] shadow" : "bg-white border border-gray-200 shadow"

  // 页签
  const tabs = ["好友", "群组", "担保", "通讯录"]

  // 联系人数据
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
      name: "BTC交易群",
      avatar: "₿",
      lastMessage: "张三: 今天BTC走势如何？",
      time: "09:15",
      unread: 5,
      isOnline: true,
    },
    {
      id: "contact-3",
      name: "李四",
      avatar: "👨‍💼",
      lastMessage: "我刚看了那个分析报告，非常有见地",
      time: "昨天",
      isOnline: false,
    },
    {
      id: "contact-4",
      name: "王五",
      avatar: "👩‍💼",
      lastMessage: "下周一我们讨论一下那个新项目",
      time: "昨天",
      isOnline: true,
    },
    {
      id: "contact-5",
      name: "ETH爱好者群",
      avatar: "🔷",
      lastMessage: "赵六: 以太坊2.0的进展如何？",
      time: "周一",
      isOnline: true,
    },
    {
      id: "contact-6",
      name: "赵六",
      avatar: "👨‍🚀",
      lastMessage: "我对那个NFT项目很感兴趣",
      time: "周日",
      isOnline: false,
    },
    {
      id: "contact-7",
      name: "DeFi研究小组",
      avatar: "🏦",
      lastMessage: "钱七: 最新的流动性挖矿机会分享",
      time: "上周",
      isOnline: true,
    },
    {
      id: "contact-8",
      name: "孙八",
      avatar: "👨‍💻",
      lastMessage: "我们来讨论一下最新的市场趋势",
      time: "05/15",
      isOnline: false,
    },
  ]

  // 消息数据
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
      {
        id: "msg-3",
        senderId: "contact-1",
        text: "根据最近的数据分析，比特币在过去一周呈现震荡上行趋势，突破了68,000美元的阻力位。技术指标RSI显示目前处于65左右，表明有适度的上行动能但尚未进入超买区间。",
        time: "09:32",
        isRead: true,
      },
      {
        id: "msg-4",
        senderId: "user",
        text: "你认为现在是买入的好时机吗？",
        time: "09:33",
        isRead: true,
      },
      {
        id: "msg-5",
        senderId: "contact-1",
        text: "从技术面来看，当前价格处于上升通道中，但接近短期阻力位。如果您是长期投资者，可以考虑分批买入策略；如果是短期交易，建议等待回调至支撑位再入场，并设置止损。请注意，这不构成投资建议，市场有风险，投资需谨慎。",
        time: "09:34",
        isRead: false,
      },
      {
        id: "msg-6",
        senderId: "contact-1",
        text: "您还想了解其他加密货币的情况吗？例如以太坊或其他热门代币？",
        time: "09:35",
        isRead: false,
      },
    ],
    "contact-3": [
      {
        id: "msg-1",
        senderId: "contact-3",
        text: "嗨，你看了最新的市场分析报告了吗？",
        time: "昨天 18:30",
        isRead: true,
      },
      {
        id: "msg-2",
        senderId: "user",
        text: "还没有，有什么重要的发现吗？",
        time: "昨天 18:35",
        isRead: true,
      },
      {
        id: "msg-3",
        senderId: "contact-3",
        text: "报告指出机构投资者正在增加比特币持仓，这可能预示着未来几周会有大幅上涨",
        time: "昨天 18:40",
        isRead: true,
      },
      {
        id: "msg-4",
        senderId: "user",
        text: "这很有趣，你觉得现在应该增加仓位吗？",
        time: "昨天 18:42",
        isRead: true,
      },
      {
        id: "msg-5",
        senderId: "contact-3",
        text: "我刚看了那个分析报告，非常有见地",
        time: "昨天 18:45",
        isRead: true,
      },
    ],
  }

  // 过滤联系人
  const filteredContacts = contacts.filter((contact) => {
    if (activeTab === "好友" && contact.name.includes("群")) return false
    if (activeTab === "群组" && !contact.name.includes("群")) return false
    if (activeTab === "担保") return false // 暂时没有担保相关联系人
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const selectedContactData = contacts.find((contact) => contact.id === selectedContact)
  const selectedMessages = selectedContact ? messages[selectedContact] || [] : []
  
  // 计算未读消息数量
  const unreadMessages = selectedMessages.filter(msg => !msg.isRead && msg.senderId !== "user")
  const unreadCount = unreadMessages.length
  const firstUnreadMessage = unreadMessages[0]

  // 处理发送消息
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !selectedContact) return

    // 在实际应用中，这里会调用API发送消息
    console.log(`发送消息到 ${selectedContact}: ${message}`)
    setMessage("")
  }

  const toggleFavorite = (contactId: string) => {
    setFavorites((prev) => (prev.includes(contactId) ? prev.filter((f) => f !== contactId) : [...prev, contactId]))
  }

  // 跳转到未读消息
  const jumpToUnreadMessages = () => {
    if (firstUnreadRef.current) {
      firstUnreadRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "center" 
      })
    }
  }



  // 添加功能菜单项
  const addMenuItems = [
    { icon: Users, label: "发起群聊", action: () => console.log("发起群聊") },
    { icon: Shield, label: "发起担保", action: () => console.log("发起担保") },
    { icon: UserPlus, label: "添加好友", action: () => console.log("添加好友") },
    { icon: QrCode, label: "扫一扫", action: () => console.log("扫一扫") },
  ]

  return (
    <div className={`min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* 主聊天区域 */}
      <div className="flex h-screen">
        {/* 左侧联系人列表 - 移动端全屏显示 */}
        <div className={`${cardStyle} ${selectedContact && 'hidden'} md:block md:w-1/3 lg:w-1/4 xl:w-1/3 h-screen flex flex-col w-full`}>
          {/* 搜索框和添加按钮 */}
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

            {/* 添加按钮和弹出菜单 */}
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

              {/* 弹出菜单 */}
              {showAddMenu && (
                <div
                  className={`absolute top-full right-0 mt-2 w-48 ${cardStyle} rounded-lg shadow-lg z-50 transition-all duration-200 origin-top-right ${
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
                        className={`w-full flex items-center px-4 py-3 text-sm transition-all duration-150 ${
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

          {/* 页签 */}
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

          {/* 联系人列表 */}
          <div className="flex-1 px-4 pb-4 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <div className="space-y-2">
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 flex items-center transform hover:scale-102 ${
                      selectedContact === contact.id
                        ? isDark
                          ? "bg-[#252842] text-white shadow-md scale-102"
                          : "bg-gray-100 text-gray-800 shadow-md scale-102"
                        : isDark
                          ? "hover:bg-[#252842]/50 text-white"
                          : "hover:bg-gray-100/50 text-gray-800"
                    }`}
                    onClick={() => setSelectedContact(contact.id)}
                  >
                    <div className="relative mr-3">
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                        {contact.avatar}
                      </div>
                      {contact.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-custom-green rounded-full border-2 border-card animate-pulse"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-400">{contact.time}</span>
                      </div>
                      <p className="text-sm truncate text-gray-400">{contact.lastMessage}</p>
                    </div>
                    {contact.unread && (
                      <div className="ml-2 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-xs text-white">{contact.unread}</span>
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(contact.id)
                      }}
                      className={`ml-2 p-1 rounded-full transition-all duration-200 hover:scale-110 ${
                        favorites.includes(contact.id) ? "text-yellow-500" : "text-gray-400"
                      } hover:bg-gray-200/20`}
                    >
                      <Star className="h-4 w-4" fill={favorites.includes(contact.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-sm">{activeTab === "担保" ? "暂无担保记录" : "暂无联系人"}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧聊天窗口 - 移动端全屏显示 */}
        <div 
          className={`${cardStyle} ${!selectedContact && 'hidden'} md:block md:flex-1 flex flex-col w-full`}
          style={{ height: `calc(100vh - ${inputHeight}px)` }}
        >
          {selectedContactData ? (
            <>
              {/* 聊天头部 - 移动端添加返回按钮 */}
              <div className="p-3 md:p-4 border-b border-gray-200 dark:border-[#252842] flex items-center justify-between">
                <div className="flex items-center">
                  {/* 移动端返回按钮 */}
                  <button
                    onClick={() => setSelectedContact("")}
                    className="md:hidden mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#252842]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="relative mr-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                      {selectedContactData.avatar}
                    </div>
                    {selectedContactData.isOnline && (
                      <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-custom-green rounded-full border-2 border-card"></div>
                    )}
                  </div>
                  <div>
                    <h2 className={`font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                      {selectedContactData.name}
                    </h2>
                    <div className="text-xs text-gray-400">{selectedContactData.isOnline ? "在线" : "离线"}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                      isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"
                    }`}
                  >
                    <Phone className="h-5 w-5 text-gray-400" />
                  </button>
                  <button
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                      isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"
                    }`}
                  >
                    <Video className="h-5 w-5 text-gray-400" />
                  </button>
                  <button
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                      isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"
                    }`}
                  >
                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* 聊天内容 */}
              <div
                ref={chatContainerRef}
                className={`flex-1 p-4 overflow-y-auto relative ${isDark ? "bg-[#0f1419]" : "bg-gray-50"}`}
                style={{ minHeight: "300px" }}
              >
                {/* 未读消息指示器 - 右上角 */}
                {unreadCount > 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={jumpToUnreadMessages}
                      className="bg-custom-green text-white px-3 py-1 rounded-full shadow-lg hover:bg-custom-green/80 transition-all duration-200 flex items-center space-x-1 text-sm font-medium"
                    >
                      <span>↑</span>
                      <span>{unreadCount}条新消息</span>
                    </button>
                  </div>
                )}
                <div className="space-y-4">
                  {selectedMessages.map((msg, index) => {
                    const isFirstUnread = msg.id === firstUnreadMessage?.id
                    return (
                      <div 
                        key={msg.id} 
                        ref={isFirstUnread ? firstUnreadRef : null}
                        className={`flex ${msg.senderId === "user" ? "justify-end" : "justify-start"} ${!msg.isRead && msg.senderId !== "user" ? "relative" : ""}`}
                      >
                        {msg.senderId !== "user" && (
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                            {selectedContactData.avatar}
                          </div>
                        )}
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            msg.senderId === "user"
                              ? "bg-custom-green text-white"
                              : isDark
                                ? "bg-[#252842] text-white"
                                : "bg-white text-gray-800 border border-gray-200"
                          }`}
                        >
                          <div className="text-sm">{msg.text}</div>
                          <div className="text-xs mt-1 opacity-70 text-right">{msg.time}</div>
                        </div>
                        {msg.senderId === "user" && (
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm ml-2 flex-shrink-0">
                            👤
                          </div>
                        )}
                        {/* 未读消息标记 */}
                        {!msg.isRead && msg.senderId !== "user" && isFirstUnread && (
                          <div className="absolute -left-2 top-0 w-1 h-full bg-custom-green rounded-full"></div>
                        )}
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* 浮动未读消息指示器 */}
                {showUnreadIndicator && unreadCount > 0 && (
                  <div className="absolute bottom-4 right-4 z-10">
                    <button
                      onClick={jumpToUnreadMessages}
                      className="bg-custom-green text-white px-4 py-2 rounded-full shadow-lg hover:bg-custom-green/80 transition-all duration-200 flex items-center space-x-2 animate-bounce"
                    >
                      <span className="text-sm font-medium">{unreadCount} 条未读</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>


            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className={`text-lg font-medium mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>
                  选择一个联系人开始聊天
                </h3>
                <p className="text-gray-400">从左侧列表选择一个联系人或群组</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 底部可调整大小的输入区域 - 仅在选择联系人时显示 */}
      {selectedContact && (
        <div 
          className={`fixed bottom-0 left-0 right-0 border-t ${
            isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"
          }`}
          style={{ height: `${inputHeight}px` }}
        >
        {/* 拖拽调整高度的手柄 */}
        <div 
          className={`w-full h-2 cursor-ns-resize flex items-center justify-center ${
            isDark ? "hover:bg-[#2a2d42]" : "hover:bg-gray-100"
          } ${isResizing ? (isDark ? "bg-[#2a2d42]" : "bg-gray-100") : ""}`}
          onMouseDown={handleMouseDown}
        >
          <GripHorizontal className="w-4 h-4 text-gray-400 rotate-90" />
        </div>

        {/* 输入区域内容 */}
        <div className="flex flex-col h-full p-4">
          {/* 功能按钮行 */}
          <div className="flex items-center space-x-2 mb-3">
            <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
            }`}>
              <Smile className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
            }`}>
              <Paperclip className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
            }`}>
              <Scissors className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
            }`}>
              <MessageCircle className="w-5 h-5" />
            </button>
            
            {/* 右侧功能按钮 */}
            <div className="flex-1"></div>
            <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
            }`}>
              <Phone className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isDark ? "hover:bg-[#2a2d42] text-gray-400" : "text-gray-500"
            }`}>
              <Video className="w-5 h-5" />
            </button>
          </div>

          {/* 输入框区域 */}
          <div className="flex-1 flex">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(e as any)
                }
              }}
              placeholder="123123"
              className={`flex-1 p-3 border rounded-lg resize-none outline-none text-base ${
                isDark 
                  ? "bg-[#252842] text-white border-[#3a3d4a] placeholder-gray-500" 
                  : "bg-white text-gray-900 border-gray-300 placeholder-gray-400"
              } focus:ring-2 focus:ring-custom-green/20 focus:border-custom-green`}
              style={{ minHeight: '60px' }}
            />
          </div>
        </div>

        {/* 固定在右下角的发送按钮 */}
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-full text-sm font-medium transition-all shadow-lg ${
            message.trim()
              ? "bg-custom-green text-white hover:bg-custom-green/90 hover:scale-105"
              : isDark
                ? "bg-[#3a3d4a] text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          发送(S)
        </button>
        </div>
      )}
    </div>
  )
}
