"use client"

import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { User, Shield, Key, CreditCard, Settings, Home, ChevronRight, Camera, X } from "lucide-react"

interface ProfileMenuItem {
  id: string
  name: string
  icon: React.ComponentType<any>
  description?: string
}

export default function ProfilePage() {
  const { isDark } = useTheme()
  const [activeSection, setActiveSection] = useState("personal")
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedApiType, setSelectedApiType] = useState("bedao")
  const [editForm, setEditForm] = useState({
    nickname: '交易达人',
    bio: 'Professional trader with 5+ years experience',
    avatar: null as File | null
  })

  const handleSaveProfile = () => {
    console.log('Saving profile:', editForm)
    setShowEditModal(false)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setEditForm(prev => ({ ...prev, avatar: file }))
    }
  }

  const cardStyle = isDark ? "bg-[#1a1d29] border-[#252842]" : "bg-white border-gray-200"

  const menuItems: ProfileMenuItem[] = [
    { id: "personal", name: "个人主页", icon: Home, description: "查看和编辑个人资料" },
    { id: "commission", name: "我的佣金", icon: CreditCard, description: "佣金收益和明细" },
    { id: "security", name: "安全中心", icon: Shield, description: "账户安全设置" },
    { id: "identity", name: "身份认证", icon: User, description: "实名认证管理" },
    { id: "api", name: "API管理", icon: Key, description: "API密钥管理" },
    { id: "settings", name: "设置", icon: Settings, description: "账户偏好设置" }
  ]

  const renderPersonalHomepage = () => (
    <div className="space-y-6">
      {/* Profile Header - New Left-Right Layout */}
      <div className={`${cardStyle} rounded-lg p-6 border`}>
        <div className="flex items-start justify-between">
          {/* Left Side - Profile Info */}
          <div className="flex-1">
            {/* Avatar and Basic Info */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                我
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              
              <div className="flex-1">
                {/* Name with verification badge */}
                <div className="flex items-center space-x-2 mb-1">
                  <h1 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                    交易达人
                  </h1>
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                {/* Title */}
                <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  专业交易员
                </p>
                
                {/* Bio */}
                <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Professional trader with 5+ years experience
                </p>
              </div>
            </div>

            {/* Location and Join Date */}
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <span>📍</span>
                <span>上海</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>📅</span>
                <span>2022年12月加入</span>
              </div>
            </div>
          </div>

          {/* Right Side - Stats and Edit Button */}
          <div className="flex flex-col items-end">
            <div className="flex space-x-8 mb-4">
              <div className="text-center">
                <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  445
                </div>
                <div className="text-xs text-gray-400">动态</div>
              </div>
              <div className="text-center">
                <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  12800
                </div>
                <div className="text-xs text-gray-400">粉丝</div>
              </div>
              <div className="text-center">
                <div className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                  89
                </div>
                <div className="text-xs text-gray-400">关注</div>
              </div>
            </div>
            
            {/* Edit Button */}
            <button 
              onClick={() => setShowEditModal(true)}
              className="bg-black text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
            >
              编辑资料
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button className="px-4 py-3 text-sm font-medium border-b-2 border-black text-black dark:border-white dark:text-white">
              我的动态
            </button>
            <button className={`px-4 py-3 text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              我的收藏
            </button>
            <button className={`px-4 py-3 text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              我的点赞
            </button>
            <button className={`px-4 py-3 text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              我的圈子
            </button>
          </div>
        </div>

        {/* Sample Post Content */}
        <div className={`${cardStyle} rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:${
          isDark ? "bg-[#1e2332]" : "bg-gray-50"
        }`}>
          {/* 头部 - 用户信息和操作 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                我
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                    交易达人
                  </span>
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {/* 信誉担保标签 */}
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    信誉担保$123K
                  </span>
                </div>
                <div className="text-sm text-gray-500">4小时前</div>
              </div>
            </div>
          </div>

          {/* 内容 */}
          <div className="mb-4">
            <p className={`text-base leading-relaxed ${isDark ? "text-gray-100" : "text-gray-800"}`}>
              刚刚发现一个新的DeFi协议，APY高达200%！但是大家要注意风险，高收益往往伴随高风险。DYOR! 💰
            </p>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 ${
              isDark 
                ? "bg-[#00D4AA]/30 text-[#00D4AA] hover:bg-[#00D4AA]/50" 
                : "bg-[#00D4AA]/10 text-[#00D4AA] hover:bg-[#00D4AA]/20"
            }`}>
              #DeFi
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 ${
              isDark 
                ? "bg-yellow-500/30 text-yellow-400 hover:bg-yellow-500/50" 
                : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"
            }`}>
              #高收益挖矿
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 ${
              isDark 
                ? "bg-blue-500/30 text-blue-400 hover:bg-blue-500/50" 
                : "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"
            }`}>
              #风险提示
            </span>
          </div>

          {/* 底部操作栏 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                <span>❤️</span>
                <span className="text-sm font-medium">1876</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                <span>💬</span>
                <span className="text-sm font-medium">234</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                <span>🔄</span>
                <span className="text-sm font-medium">67</span>
              </button>
            </div>
            
            {/* 右下角跟单信息 */}
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500">已有2,177人跟单</span>
              <button className="px-3 py-1.5 bg-[#00D4AA] text-black text-sm font-medium rounded-lg hover:bg-[#00B894] transition-colors">
                跟单
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCommissionPage = () => (
    <div className={`${cardStyle} rounded-lg p-6 border`}>
      <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
        我的佣金
      </h2>
      <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
        佣金管理功能正在开发中...
      </p>
    </div>
  )

  const renderSecurityCenter = () => (
    <div className={`${cardStyle} rounded-lg p-6 border`}>
      <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
        安全中心
      </h2>
      <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
        安全设置功能正在开发中...
      </p>
    </div>
  )

  const renderIdentityVerification = () => (
    <div className={`${cardStyle} rounded-lg p-6 border`}>
      <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
        身份认证
      </h2>
      <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
        身份认证功能正在开发中...
      </p>
    </div>
  )

  const renderApiManagement = () => {
    return (
      <div className="space-y-6">
        <div className={`${cardStyle} rounded-lg p-6 border`}>
          {/* API Type Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6">
            <button
              onClick={() => setSelectedApiType("bedao")}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedApiType === "bedao"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              BeDAO API【交易】
            </button>
            <button
              onClick={() => setSelectedApiType("bepay")}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedApiType === "bepay"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              BePAY API【支付】
            </button>
          </div>
          
          {/* API Content */}
          {selectedApiType === "bedao" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    BeDAO 交易API
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mt-1`}>
                    用于加密货币交易、市场数据、订单管理等功能
                  </p>
                </div>
                <button className="px-4 py-2 bg-[#00D4AA] text-black rounded-lg text-sm font-medium hover:bg-[#00B894] transition-colors">
                  创建API密钥
                </button>
              </div>
              
              <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                <h4 className={`font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  功能权限
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="trade" className="rounded" />
                    <label htmlFor="trade" className={isDark ? "text-gray-300" : "text-gray-700"}>现货交易</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="futures" className="rounded" />
                    <label htmlFor="futures" className={isDark ? "text-gray-300" : "text-gray-700"}>合约交易</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="market" className="rounded" />
                    <label htmlFor="market" className={isDark ? "text-gray-300" : "text-gray-700"}>市场数据</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="account" className="rounded" />
                    <label htmlFor="account" className={isDark ? "text-gray-300" : "text-gray-700"}>账户信息</label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    BePAY 支付API
                  </h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} mt-1`}>
                    用于法币支付、加密货币支付、商户管理等功能
                  </p>
                </div>
                <button className="px-4 py-2 bg-[#00D4AA] text-black rounded-lg text-sm font-medium hover:bg-[#00B894] transition-colors">
                  创建API密钥
                </button>
              </div>
              
              <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                <h4 className={`font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                  功能权限
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="fiat-payment" className="rounded" />
                    <label htmlFor="fiat-payment" className={isDark ? "text-gray-300" : "text-gray-700"}>法币支付</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="crypto-payment" className="rounded" />
                    <label htmlFor="crypto-payment" className={isDark ? "text-gray-300" : "text-gray-700"}>加密货币支付</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="merchant" className="rounded" />
                    <label htmlFor="merchant" className={isDark ? "text-gray-300" : "text-gray-700"}>商户管理</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="webhook" className="rounded" />
                    <label htmlFor="webhook" className={isDark ? "text-gray-300" : "text-gray-700"}>回调通知</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderSettingsPage = () => (
    <div className={`${cardStyle} rounded-lg p-6 border`}>
      <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
        设置
      </h2>
      <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
        设置功能正在开发中...
      </p>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "personal":
        return renderPersonalHomepage()
      case "commission":
        return renderCommissionPage()
      case "security":
        return renderSecurityCenter()
      case "identity":
        return renderIdentityVerification()
      case "api":
        return renderApiManagement()
      case "settings":
        return renderSettingsPage()
      default:
        return renderPersonalHomepage()
    }
  }

  return (
    <div className={`p-6 min-h-screen ${isDark ? "bg-background" : "bg-[#f5f8fa]"}`}>
      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${cardStyle} rounded-lg w-full max-w-md border`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                编辑资料
              </h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {/* Avatar Upload */}
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    我
                  </div>
                  <label className="absolute bottom-0 right-0 w-6 h-6 bg-[#00D4AA] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#00C097] transition-colors">
                    <Camera className="w-3 h-3 text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarChange}
                      className="hidden" 
                    />
                  </label>
                </div>
                <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  点击相机图标更换头像
                </p>
              </div>

              {/* Nickname */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
                  昵称
                </label>
                <input
                  type="text"
                  value={editForm.nickname}
                  onChange={(e) => setEditForm(prev => ({ ...prev, nickname: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent ${
                    isDark 
                      ? "bg-[#252842] border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="输入昵称"
                />
              </div>

              {/* Bio */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-700"}`}>
                  简介
                </label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D4AA] focus:border-transparent resize-none ${
                    isDark 
                      ? "bg-[#252842] border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="介绍一下自己..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowEditModal(false)}
                className={`flex-1 py-2 px-4 border rounded-lg font-medium transition-colors ${
                  isDark 
                    ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                取消
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 py-2 px-4 bg-[#00D4AA] text-white rounded-lg font-medium hover:bg-[#00C097] transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar - Navigation */}
        <div className="col-span-3">
          <div className={`${cardStyle} rounded-lg border sticky top-6 overflow-hidden`}>
            <div className="space-y-1 p-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-2 px-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? isDark
                          ? "bg-white text-black"
                          : "bg-black text-white"
                        : isDark
                          ? "text-gray-300 hover:text-white hover:bg-[#252842]"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="col-span-9">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}