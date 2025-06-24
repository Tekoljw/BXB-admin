"use client"

import { useState } from "react"
import { useTheme } from "@/contexts/theme-context"
import { User, Shield, Key, CreditCard, Settings, Home, ChevronRight } from "lucide-react"

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
      {/* Profile Header */}
      <div className={`${cardStyle} rounded-lg p-6 border`}>
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              我
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                交易达人
              </h1>
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <p className={`text-lg mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              专业交易员・资深投资顾问
            </p>

            {/* Bio */}
            <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              专注数字货币交易5年，擅长技术分析和风险管理。致力于为用户提供专业的投资建议和交易策略。
            </p>

            {/* Location and Join Date */}
            <div className="flex items-center space-x-4 mb-6 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <span>📍</span>
                <span>上海</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>📅</span>
                <span>2019年加入</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isDark 
                  ? "bg-white text-black hover:bg-gray-200" 
                  : "bg-black text-white hover:bg-gray-800"
              }`}>
                编辑资料
              </button>
              <button className={`px-6 py-2 rounded-lg border transition-colors ${
                isDark 
                  ? "border-[#252842] text-white hover:bg-[#252842]" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}>
                分享主页
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${cardStyle} rounded-lg p-4 border`}>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00D4AA] mb-1">1,234</div>
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>关注者</div>
          </div>
        </div>
        
        <div className={`${cardStyle} rounded-lg p-4 border`}>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00D4AA] mb-1">567</div>
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>关注中</div>
          </div>
        </div>
        
        <div className={`${cardStyle} rounded-lg p-4 border`}>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00D4AA] mb-1">89</div>
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>动态</div>
          </div>
        </div>
      </div>

      {/* Trading Performance */}
      <div className={`${cardStyle} rounded-lg p-6 border`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
          交易表现
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-green-500 mb-1">+156.8%</div>
            <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>总收益率</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-[#00D4AA] mb-1">78.5%</div>
            <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>胜率</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-blue-500 mb-1">1,567</div>
            <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>交易次数</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-purple-500 mb-1">2.1M</div>
            <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>交易量 USDT</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`${cardStyle} rounded-lg p-6 border`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
          最近活动
        </h3>
        
        <div className="space-y-3">
          {[
            { action: "发布了新的交易策略", time: "2小时前", type: "post" },
            { action: "跟单 BTC/USDT 多单", time: "4小时前", type: "trade" },
            { action: "关注了 DeFi专家", time: "1天前", type: "follow" },
            { action: "发布了市场分析", time: "2天前", type: "post" }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 py-2">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'trade' ? 'bg-green-500' : 
                activity.type === 'follow' ? 'bg-blue-500' : 'bg-purple-500'
              }`}></div>
              <div className="flex-1">
                <span className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}>
                  {activity.action}
                </span>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
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
          <div className={`${cardStyle} rounded-lg p-4 border sticky top-6`}>
            <h2 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>
              个人中心
            </h2>
            
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      isActive
                        ? isDark
                          ? "bg-[#252842] text-white"
                          : "bg-gray-100 text-gray-900"
                        : isDark
                          ? "text-gray-300 hover:bg-[#252842] hover:text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                )
              })}
            </nav>
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