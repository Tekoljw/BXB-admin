"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import SideNavigation from "@/components/side-navigation"
import MobileSidebarToggle from "@/components/mobile-sidebar-toggle"
import ChatInput from "@/components/chat-input"
import { useTheme } from "@/contexts/theme-context"
import { 
  Bot, 
  User, 
  LogOut
} from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '欢迎来到UBX交易助手！我可以帮助您了解市场动态、分析交易策略和回答相关问题。请问有什么我可以帮助您的吗？',
      sender: 'assistant',
      timestamp: new Date()
    }
  ])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { isDark } = useTheme()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      router.push('/login')
      return
    }

    setIsLoggedIn(true)
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(message),
        sender: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('价格') || lowerMessage.includes('行情')) {
      return '当前BTC价格为$67,234.56，24小时涨幅+2.34%。ETH价格为$3,456.78，24小时涨幅+1.87%。市场整体表现良好，建议关注风险控制。'
    }
    
    if (lowerMessage.includes('交易') || lowerMessage.includes('买入') || lowerMessage.includes('卖出')) {
      return '在进行交易前，建议您：1. 分析市场趋势 2. 设置止损点 3. 控制仓位大小 4. 分散投资风险。UBX平台提供担保交易服务，为您的资金安全保驾护航。'
    }
    
    if (lowerMessage.includes('安全') || lowerMessage.includes('保障')) {
      return 'UBX采用银行级安全措施：多重签名钱包、冷热钱包分离、SSL加密传输、24/7安全监控。我们还提供担保交易服务，确保每笔交易的安全性。'
    }
    
    if (lowerMessage.includes('手续费') || lowerMessage.includes('费率')) {
      return 'UBX交易手续费结构：基础用户0.1%，专业用户0.08%，VIP用户0.05%。担保交易服务费用根据交易金额和风险等级动态调整。'
    }
    
    return '感谢您的提问！我会尽力为您提供专业的交易建议和市场分析。如需了解更多详细信息，请联系我们的人工客服。'
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#1a1d29]' : 'bg-gray-50'}`}>
        <div className={`${isDark ? 'text-white' : 'text-gray-900'}`}>正在验证登录状态...</div>
      </div>
    )
  }

  return (
    <div className={`flex h-screen ${isDark ? 'bg-[#1a1d29]' : 'bg-gray-50'}`}>
      <SideNavigation onCloseMobile={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden p-4">
          <MobileSidebarToggle 
            onToggle={setSidebarOpen}
            isOpen={sidebarOpen}
          />
        </div>

        {/* Chat header */}
        <div className={`border-b px-6 py-4 flex items-center justify-between ${isDark ? 'border-[#252842] bg-[#1a1d29]' : 'border-gray-200 bg-white'}`}>
          <div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              UBX AI 交易助手
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              专业的加密货币交易建议和市场分析
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#00D4AA] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user.username || user.email}
                </span>
              </div>
            )}
            
            <button 
              onClick={handleLogout}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-[#252842]' : 'hover:bg-gray-100'}`}
            >
              <LogOut className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-blue-500' : 'bg-[#00D4AA]'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-black" />
                  )}
                </div>
                <div
                  className={`p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : isDark 
                        ? 'bg-[#252842] text-white border border-[#2a2f42]'
                        : 'bg-gray-100 text-gray-900 border border-gray-200'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' 
                      ? 'text-blue-100' 
                      : isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <div className={`border-t p-6 ${isDark ? 'border-[#252842] bg-[#1a1d29]' : 'border-gray-200 bg-white'}`}>
          <ChatInput 
            onSendMessage={handleSendMessage}
            placeholder="输入您的问题，例如：当前BTC价格如何？"
          />
          
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => handleSendMessage('当前BTC价格如何？')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                isDark ? 'bg-[#252842] hover:bg-[#2a2f42] text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              BTC价格查询
            </button>
            <button
              onClick={() => handleSendMessage('如何进行安全交易？')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                isDark ? 'bg-[#252842] hover:bg-[#2a2f42] text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              安全交易指南
            </button>
            <button
              onClick={() => handleSendMessage('交易手续费是多少？')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                isDark ? 'bg-[#252842] hover:bg-[#2a2f42] text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              费率查询
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}