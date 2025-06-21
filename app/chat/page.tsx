"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Send, 
  Bot, 
  User, 
  TrendingUp, 
  DollarSign,
  BarChart3,
  Bell,
  Settings,
  LogOut
} from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatPage() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '欢迎来到UBX交易助手！我可以帮助您了解市场动态、分析交易策略和回答相关问题。请问有什么我可以帮助您的吗？',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(message),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">正在验证登录状态...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#00D4AA] rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-white font-bold">UBX 交易助手</h1>
              <p className="text-gray-400 text-sm">AI智能交易顾问</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 space-y-3">
          <button 
            onClick={() => router.push('/market')}
            className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <TrendingUp className="w-5 h-5 text-[#00D4AA]" />
            <span className="text-white">市场行情</span>
          </button>
          
          <button 
            onClick={() => router.push('/wallet')}
            className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <DollarSign className="w-5 h-5 text-[#00D4AA]" />
            <span className="text-white">我的钱包</span>
          </button>
          
          <button 
            onClick={() => router.push('/spot')}
            className="w-full flex items-center space-x-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <BarChart3 className="w-5 h-5 text-[#00D4AA]" />
            <span className="text-white">现货交易</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="mt-auto p-6 border-t border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-[#00D4AA] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{user?.username || user?.email}</p>
              <p className="text-gray-400 text-sm">在线</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 flex items-center justify-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <Settings className="w-4 h-4 text-gray-300" />
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#00D4AA] rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <h2 className="text-white font-semibold">AI交易助手</h2>
                <p className="text-gray-400 text-sm">专业的加密货币交易建议</p>
              </div>
            </div>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-2xl ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.sender === 'user' ? 'bg-blue-500' : 'bg-[#00D4AA]'
                }`}>
                  {msg.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-black" />
                  )}
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-800 text-white border border-gray-700'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-xs mt-2 ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-gray-700 bg-gray-800">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="输入您的问题，例如：当前BTC价格如何？"
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00D4AA] transition-colors"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="px-6 py-3 bg-[#00D4AA] hover:bg-[#00B894] disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>发送</span>
            </button>
          </form>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setMessage('当前BTC价格如何？')}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-full transition-colors"
            >
              BTC价格查询
            </button>
            <button
              onClick={() => setMessage('如何进行安全交易？')}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-full transition-colors"
            >
              安全交易指南
            </button>
            <button
              onClick={() => setMessage('交易手续费是多少？')}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-full transition-colors"
            >
              费率查询
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}