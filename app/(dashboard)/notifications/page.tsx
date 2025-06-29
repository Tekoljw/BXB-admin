"use client"

import React, { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { Bell, Check, X, Settings, Filter, Search } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: "price" | "trade" | "system" | "social"
  read: boolean
  priority: "high" | "medium" | "low"
}

export default function NotificationsPage() {
  const { isDark } = useTheme()
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "price" | "trade" | "system" | "social">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "价格提醒",
      message: "BTC 价格突破 $95,000",
      time: "2分钟前",
      type: "price",
      read: false,
      priority: "high"
    },
    {
      id: "2", 
      title: "交易成功",
      message: "您的 ETH 买入订单已成功执行",
      time: "15分钟前",
      type: "trade",
      read: false,
      priority: "medium"
    },
    {
      id: "3",
      title: "系统维护",
      message: "平台将于今晚22:00进行例行维护",
      time: "1小时前",
      type: "system",
      read: true,
      priority: "medium"
    },
    {
      id: "4",
      title: "好友动态",
      message: "张三发布了新的投资分享",
      time: "2小时前",
      type: "social",
      read: false,
      priority: "low"
    },
    {
      id: "5",
      title: "价格提醒",
      message: "USDT 余额不足 1000",
      time: "3小时前",
      type: "price",
      read: true,
      priority: "high"
    }
  ])

  const cardStyle = isDark ? "bg-[#1a1d29] border-[#252842]" : "bg-white border-gray-200"

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = activeFilter === "all" || 
                         (activeFilter === "unread" && !notif.read) ||
                         notif.type === activeFilter
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const getTypeColor = (type: string) => {
    switch (type) {
      case "price": return "text-orange-500"
      case "trade": return "text-green-500"
      case "system": return "text-blue-500"
      case "social": return "text-purple-500"
      default: return "text-gray-500"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "price": return "价格"
      case "trade": return "交易"
      case "system": return "系统"
      case "social": return "社交"
      default: return "其他"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500"
      case "medium": return "border-l-yellow-500"
      case "low": return "border-l-gray-400"
      default: return "border-l-gray-400"
    }
  }

  return (
    <div className={`p-6 min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* Header */}
      <div className={`${cardStyle} rounded-lg p-6 border mb-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-3 mr-4 dark:bg-blue-900">
              <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                通知中心
              </h1>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {unreadCount > 0 ? `${unreadCount} 条未读通知` : "所有通知已读"}
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={unreadCount === 0}
            >
              全部标记已读
            </button>
            <button className={`p-2 rounded-lg border ${isDark ? "border-gray-600 hover:bg-[#252842]" : "border-gray-300 hover:bg-gray-50"}`}>
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="col-span-3">
          <div className={`${cardStyle} rounded-lg border p-4`}>
            <h3 className={`font-medium mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              筛选通知
            </h3>
            
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className={`absolute left-3 top-3 h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type="text"
                  placeholder="搜索通知..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                    isDark 
                      ? "bg-[#252842] border-gray-600 text-white placeholder-gray-400" 
                      : "bg-white border-gray-300 placeholder-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="space-y-2">
              {[
                { key: "all", label: "全部", count: notifications.length },
                { key: "unread", label: "未读", count: unreadCount },
                { key: "price", label: "价格提醒", count: notifications.filter(n => n.type === "price").length },
                { key: "trade", label: "交易通知", count: notifications.filter(n => n.type === "trade").length },
                { key: "system", label: "系统通知", count: notifications.filter(n => n.type === "system").length },
                { key: "social", label: "社交动态", count: notifications.filter(n => n.type === "social").length },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeFilter === filter.key
                      ? isDark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-[#252842]"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeFilter === filter.key
                      ? "bg-gray-200 text-gray-800"
                      : isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-600"
                  }`}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content - Notifications List */}
        <div className="col-span-9">
          <div className={`${cardStyle} rounded-lg border`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                通知列表 ({filteredNotifications.length})
              </h2>
            </div>
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className={`mx-auto h-12 w-12 mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                  <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    暂无通知
                  </p>
                  <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    当有新的通知时，会在这里显示
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border-l-4 ${getPriorityColor(notification.priority)} p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#252842] transition-colors ${
                      !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(notification.type)} bg-current bg-opacity-10`}>
                            {getTypeLabel(notification.type)}
                          </span>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <h4 className={`font-medium mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                          {notification.title}
                        </h4>
                        <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                          {notification.message}
                        </p>
                        <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded transition-colors"
                            title="标记已读"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                          title="删除通知"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}