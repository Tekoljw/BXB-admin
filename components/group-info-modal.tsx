"use client"

import React from "react"
import { X, Users, Image, Bell } from "lucide-react"

interface GroupInfoModalProps {
  isOpen: boolean
  onClose: () => void
  group: {
    id: string
    name: string
    avatar: string
  } | null
  isDark: boolean
}

export default function GroupInfoModal({ isOpen, onClose, group, isDark }: GroupInfoModalProps) {
  if (!isOpen || !group) return null

  const memberCount = Math.floor(Math.random() * 50) + 10

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300`}>
          {/* Header */}
          <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                群组信息
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Group Avatar and Name */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                {group.avatar}
              </div>
              <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {group.name}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{memberCount}位成员</p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}>
                <Users className="w-6 h-6 text-blue-500 mb-1" />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>成员</span>
              </button>
              <button className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}>
                <Image className="w-6 h-6 text-green-500 mb-1" />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>文件</span>
              </button>
              <button className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}>
                <Bell className="w-6 h-6 text-orange-500 mb-1" />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>通知</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                邀请好友
              </button>
              <button className={`w-full py-3 rounded-lg font-medium transition-colors border ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}>
                群组设置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}