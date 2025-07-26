"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Check, X, UserPlus, MessageCircle, Shield } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useChat } from "@/contexts/chat-context"

interface FriendRequest {
  id: string
  name: string
  avatar: string
  message: string
  time: string
  mutualFriends: number
  status: 'pending' | 'accepted' | 'rejected'
  requestType: 'received' | 'sent'
}

export default function FriendRequestsPage() {
  const { theme } = useTheme()
  const { setShowMobileChat } = useChat()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("received") // received, sent

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mock friend requests data
  const friendRequests: FriendRequest[] = [
    {
      id: "req-1",
      name: "张小明",
      avatar: "👨",
      message: "你好，我们可以成为朋友吗？我对加密货币投资很感兴趣。",
      time: "2小时前",
      mutualFriends: 3,
      status: "pending",
      requestType: "received"
    },
    {
      id: "req-2", 
      name: "李小红",
      avatar: "👩",
      message: "通过群聊认识的，希望能添加好友交流投资心得。",
      time: "5小时前",
      mutualFriends: 1,
      status: "pending",
      requestType: "received"
    },
    {
      id: "req-3",
      name: "王老师",
      avatar: "👨‍🏫",
      message: "",
      time: "1天前",
      mutualFriends: 0,
      status: "accepted",
      requestType: "received"
    },
    {
      id: "req-4",
      name: "陈大华",
      avatar: "👨‍💻",
      message: "想请教一些DeFi相关问题",
      time: "3天前",
      mutualFriends: 2,
      status: "rejected",
      requestType: "received"
    },
    {
      id: "req-5",
      name: "赵小姐",
      avatar: "👩‍💼",
      message: "",
      time: "1天前",
      mutualFriends: 0,
      status: "pending",
      requestType: "sent"
    }
  ]

  const handleAcceptRequest = (requestId: string) => {
    console.log("接受好友请求:", requestId)
    // 这里可以添加接受好友请求的逻辑
  }

  const handleRejectRequest = (requestId: string) => {
    console.log("拒绝好友请求:", requestId)
    // 这里可以添加拒绝好友请求的逻辑
  }

  const handleGoBack = () => {
    if (isMobile) {
      setShowMobileChat(false)
    }
    // 返回到聊天页面
    window.history.back()
  }

  const filteredRequests = friendRequests.filter(request => 
    activeTab === "received" ? request.requestType === "received" : request.requestType === "sent"
  )

  const pendingCount = friendRequests.filter(req => req.status === "pending" && req.requestType === "received").length

  if (!mounted) return null

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-[#f5f8fa] dark:bg-background z-[100] flex flex-col">
        {/* Mobile Header */}
        <div className={`p-4 border-b ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"} flex items-center space-x-3`}>
          <button
            onClick={handleGoBack}
            className={`p-2 rounded-lg ${isDark ? "hover:bg-[#252842]" : "hover:bg-gray-100"}`}
          >
            <ArrowLeft className={`h-5 w-5 ${isDark ? "text-white" : "text-gray-800"}`} />
          </button>
          <div className="flex-1">
            <h1 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
              新的朋友
            </h1>
            {pendingCount > 0 && (
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {pendingCount}条新消息
              </p>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`px-4 py-3 border-b ${isDark ? "border-[#3a3d4a] bg-[#1a1c2e]" : "border-gray-200 bg-white"}`}>
          <div className="flex space-x-1">
            {[
              { key: "received", label: "收到的请求", count: friendRequests.filter(req => req.requestType === "received").length },
              { key: "sent", label: "发出的请求", count: friendRequests.filter(req => req.requestType === "sent").length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? isDark
                      ? "bg-[#252842] text-white"
                      : "bg-gray-100 text-gray-900"
                    : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Friend Requests List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12">
                <UserPlus className={`h-12 w-12 mx-auto mb-4 ${isDark ? "text-gray-600" : "text-gray-400"}`} />
                <p className={`text-lg font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  暂无好友请求
                </p>
                <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                  {activeTab === "received" ? "还没有收到新的好友请求" : "还没有发送过好友请求"}
                </p>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className={`p-4 rounded-lg border ${
                    isDark ? "border-gray-700 bg-[#1a1c2e]" : "border-gray-200 bg-white"
                  }`}
                >
                  {/* User Info */}
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                      {request.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                          {request.name}
                        </h3>
                        <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {request.time}
                        </span>
                      </div>
                      {request.mutualFriends > 0 && (
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {request.mutualFriends}个共同好友
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Request Message */}
                  {request.message && (
                    <div className={`p-3 rounded-lg mb-3 ${
                      isDark ? "bg-[#252842]" : "bg-gray-50"
                    }`}>
                      <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        {request.message}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {request.status === "pending" && request.requestType === "received" && (
                      <>
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                            isDark
                              ? "bg-white text-black hover:bg-gray-100"
                              : "bg-black text-white hover:bg-gray-800"
                          } flex items-center justify-center space-x-1`}
                        >
                          <Check className="h-4 w-4" />
                          <span>接受</span>
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                            isDark
                              ? "border-gray-600 text-gray-300 hover:bg-[#252842]"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          } flex items-center justify-center`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {request.status === "accepted" && (
                      <div className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium text-center ${
                        isDark ? "bg-green-900/20 text-green-400" : "bg-green-50 text-green-700"
                      }`}>
                        已接受
                      </div>
                    )}
                    {request.status === "rejected" && (
                      <div className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium text-center ${
                        isDark ? "bg-red-900/20 text-red-400" : "bg-red-50 text-red-700"
                      }`}>
                        已拒绝
                      </div>
                    )}
                    {request.status === "pending" && request.requestType === "sent" && (
                      <div className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium text-center ${
                        isDark ? "bg-yellow-900/20 text-yellow-400" : "bg-yellow-50 text-yellow-700"
                      }`}>
                        等待回复
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

  // Desktop view (可以根据需要添加桌面端布局)
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          新的朋友
        </h1>
      </div>
      <div className="flex-1 p-6">
        <p className="text-gray-600 dark:text-gray-400">
          桌面端好友请求页面 - 待实现
        </p>
      </div>
    </div>
  )
}