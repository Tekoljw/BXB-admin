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
      {/* Profile Header - Exact Copy from Friend Profile */}
      <div className={`${cardStyle} rounded-lg p-6 border`}>
        {/* Avatar */}
        <div className="text-center mb-4">
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
            我
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          {/* Name with verification badge */}
          <div className="flex items-center justify-center space-x-2 mb-1">
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
          <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            专业交易员
          </p>
        </div>

        {/* Bio */}
        <div className="text-center mb-4">
          <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Professional trader with 5+ years experience
          </p>
        </div>

        {/* Location and Join Date */}
        <div className="flex items-center justify-center space-x-4 mb-6 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <span>📍</span>
            <span>上海</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>📅</span>
            <span>2022年12月加入</span>
          </div>
        </div>

        {/* Stats - Exactly like friend profile */}
        <div className="grid grid-cols-3 gap-6 mb-6">
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

        {/* Personal profile buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button 
            onClick={() => setShowEditModal(true)}
            className="bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
          >
            编辑资料
          </button>
          <button className={`py-2.5 rounded-lg font-medium transition-colors text-sm border ${
            isDark 
              ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}>
            分享主页
          </button>
          <button className={`py-2.5 rounded-lg font-medium transition-colors text-sm border ${
            isDark 
              ? "border-gray-600 text-gray-300 hover:bg-[#252842]" 
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}>
            设置
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button className="px-4 py-3 text-sm font-medium border-b-2 border-black text-black dark:border-white dark:text-white">
              动态
            </button>
            <button className={`px-4 py-3 text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              收藏
            </button>
            <button className={`px-4 py-3 text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              我的圈子
            </button>
          </div>
        </div>

        {/* Sample Post Content */}
        <div className={`${isDark ? "bg-[#252842]" : "bg-gray-50"} rounded-lg p-4`}>
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              我
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                  交易达人
                </span>
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400">4小时前</span>
              </div>
              <div className="mt-2">
                <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  刚刚发现一个新的DeFi协议，APY高达200%！但是大家要注意风险，高收益往往伴随高风险。DYOR! 💰
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-1 bg-[#00D4AA]/20 text-[#00D4AA] rounded text-xs">#DeFi</span>
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-600 rounded text-xs">#高收益挖矿</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-600 rounded text-xs">#风险提示</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Post Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-1 text-red-500">
                <span>❤️</span>
                <span className="text-sm">1876</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400">
                <span>💬</span>
                <span className="text-sm">234</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400">
                <span>🔄</span>
                <span className="text-sm">67</span>
              </button>
            </div>
            <span className="text-xs text-gray-400">2,177 次互动</span>
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

  const renderApiManagement = () => (
    <div className={`${cardStyle} rounded-lg p-6 border`}>
      <h2 className={`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
        API管理
      </h2>
      <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
        API管理功能正在开发中...
      </p>
    </div>
  )

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