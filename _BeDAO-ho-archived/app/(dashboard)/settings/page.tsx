"use client"

import { useState } from "react"
import { Settings, User, Bell, Shield, Moon, Sun, Globe, CreditCard, Save, Monitor } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

// Translation object
const translations = {
  en: {
    settings: "Settings",
    managePreferences: "Manage your account preferences",
    account: "Account",
    notifications: "Notifications",
    appearance: "Appearance",
    languageRegion: "Language & Region",
    paymentMethods: "Payment Methods",
    security: "Security",
    accountSettings: "Account Settings",
    profilePicture: "Profile Picture",
    change: "Change",
    remove: "Remove",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    country: "Country",
    bio: "Bio",
    saveChanges: "Save Changes",
    notificationSettings: "Notification Settings",
    emailNotifications: "Email Notifications",
    priceAlerts: "Price Alerts",
    priceAlertsDesc: "Get notified when prices change significantly",
    accountActivity: "Account Activity",
    accountActivityDesc: "Get notified about sign-ins and security alerts",
    pushNotifications: "Push Notifications",
    tradingActivity: "Trading Activity",
    tradingActivityDesc: "Get notified about your trades and orders",
    smsNotifications: "SMS Notifications",
    securityAlerts: "Security Alerts",
    securityAlertsDesc: "Get notified about important security events",
    appearanceSettings: "Appearance Settings",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    colorScheme: "Color Scheme",
    emerald: "Emerald",
    blue: "Blue",
    purple: "Purple",
    orange: "Orange",
    languageRegionSettings: "Language & Region Settings",
    language: "Language",
    currency: "Currency",
    english: "English",
    chinese: "中文 (Chinese)",
    unitedStates: "United States",
    canada: "Canada",
    unitedKingdom: "United Kingdom",
    australia: "Australia",
    germany: "Germany",
    france: "France",
  },
  zh: {
    settings: "设置",
    managePreferences: "管理您的账户偏好设置",
    account: "账户",
    notifications: "通知",
    appearance: "外观",
    languageRegion: "语言和地区",
    paymentMethods: "支付方式",
    security: "安全",
    accountSettings: "账户设置",
    profilePicture: "头像",
    change: "更改",
    remove: "移除",
    fullName: "全名",
    emailAddress: "邮箱地址",
    phoneNumber: "电话号码",
    country: "国家",
    bio: "个人简介",
    saveChanges: "保存更改",
    notificationSettings: "通知设置",
    emailNotifications: "邮件通知",
    priceAlerts: "价格提醒",
    priceAlertsDesc: "当价格发生重大变化时获得通知",
    accountActivity: "账户活动",
    accountActivityDesc: "获得关于登录和安全警报的通知",
    pushNotifications: "推送通知",
    tradingActivity: "交易活动",
    tradingActivityDesc: "获得关于您的交易和订单的通知",
    smsNotifications: "短信通知",
    securityAlerts: "安全警报",
    securityAlertsDesc: "获得关于重要安全事件的通知",
    appearanceSettings: "外观设置",
    theme: "主题",
    light: "浅色",
    dark: "深色",
    system: "跟随系统",
    colorScheme: "配色方案",
    emerald: "翠绿",
    blue: "蓝色",
    purple: "紫色",
    orange: "橙色",
    languageRegionSettings: "语言和地区设置",
    language: "语言",
    currency: "货币",
    english: "English",
    chinese: "中文 (Chinese)",
    unitedStates: "美国",
    canada: "加拿大",
    unitedKingdom: "英国",
    australia: "澳大利亚",
    germany: "德国",
    france: "法国",
  },
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const { theme, setTheme, colorScheme, setColorScheme, language, setLanguage } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    browser: true,
  })
  const [currency, setCurrency] = useState("usd")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Add state for account activity and trading activity
  const [accountActivity, setAccountActivity] = useState(true)
  const [tradingActivity, setTradingActivity] = useState(true)

  const t = translations[language]

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-emerald-100 rounded-full p-2 mr-3 dark:bg-emerald-900">
            <Settings className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t.settings}</h1>
            <p className="text-gray-500 text-sm dark:text-gray-400">{t.managePreferences}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 border-b dark:border-gray-700">
              <h2 className="font-medium">{t.settings}</h2>
            </div>
            <nav className="p-2">
              <button
                onClick={() => setActiveTab("account")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeTab === "account" ? "bg-primary/10 text-primary" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <User className="h-4 w-4 mr-3" />
                <span>{t.account}</span>
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeTab === "notifications"
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <Bell className="h-4 w-4 mr-3" />
                <span>{t.notifications}</span>
              </button>
              <button
                onClick={() => setActiveTab("appearance")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeTab === "appearance" ? "bg-primary/10 text-primary" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <Moon className="h-4 w-4 mr-3" />
                <span>{t.appearance}</span>
              </button>
              <button
                onClick={() => setActiveTab("language")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeTab === "language" ? "bg-primary/10 text-primary" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <Globe className="h-4 w-4 mr-3" />
                <span>{t.languageRegion}</span>
              </button>
              <button
                onClick={() => setActiveTab("payment")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeTab === "payment" ? "bg-primary/10 text-primary" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <CreditCard className="h-4 w-4 mr-3" />
                <span>{t.paymentMethods}</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeTab === "security" ? "bg-primary/10 text-primary" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <Shield className="h-4 w-4 mr-3" />
                <span>{t.security}</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border p-6 dark:bg-gray-800 dark:border-gray-700">
            {/* Account Settings */}
            {activeTab === "account" && (
              <div>
                <h2 className="text-lg font-bold mb-6">{t.accountSettings}</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.profilePicture}
                    </label>
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-900">
                        <User className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="ml-5">
                        <button className="bg-white border border-gray-300 rounded px-3 py-1 text-sm font-medium hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-gray-200">
                          {t.change}
                        </button>
                        <button className="ml-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          {t.remove}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {t.fullName}
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        defaultValue="John Doe"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {t.emailAddress}
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue="john.doe@example.com"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {t.phoneNumber}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        {t.country}
                      </label>
                      <select
                        id="country"
                        defaultValue="us"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                      >
                        <option value="us">{t.unitedStates}</option>
                        <option value="ca">{t.canada}</option>
                        <option value="uk">{t.unitedKingdom}</option>
                        <option value="au">{t.australia}</option>
                        <option value="de">{t.germany}</option>
                        <option value="fr">{t.france}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.bio}
                    </label>
                    <textarea
                      id="bio"
                      rows={3}
                      defaultValue="Crypto enthusiast and investor since 2017."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    />
                  </div>

                  <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      {t.saveChanges}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-lg font-bold mb-6">{t.notificationSettings}</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">{t.emailNotifications}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{t.priceAlerts}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{t.priceAlertsDesc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.email}
                            onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary dark:bg-gray-700"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{t.accountActivity}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{t.accountActivityDesc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={accountActivity}
                            onChange={() => setAccountActivity(!accountActivity)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary dark:bg-gray-700"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">{t.pushNotifications}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{t.priceAlerts}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{t.priceAlertsDesc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.push}
                            onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary dark:bg-gray-700"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{t.tradingActivity}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{t.tradingActivityDesc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={tradingActivity}
                            onChange={() => setTradingActivity(!tradingActivity)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary dark:bg-gray-700"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">{t.smsNotifications}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{t.securityAlerts}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{t.securityAlertsDesc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications.sms}
                            onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary dark:bg-gray-700"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      {t.saveChanges}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div>
                <h2 className="text-lg font-bold mb-6">{t.appearanceSettings}</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">{t.theme}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer dark:border-gray-700 transition-all ${theme === "light" ? "ring-2 ring-primary bg-primary/5" : "hover:border-primary/50"}`}
                        onClick={() => setTheme("light")}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="font-medium">{t.light}</div>
                          <Sun className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div className="h-20 bg-white border rounded-md dark:border-gray-700 shadow-sm"></div>
                      </div>
                      <div
                        className={`border rounded-lg p-4 cursor-pointer dark:border-gray-700 transition-all ${theme === "dark" ? "ring-2 ring-primary bg-primary/5" : "hover:border-primary/50"}`}
                        onClick={() => setTheme("dark")}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="font-medium">{t.dark}</div>
                          <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div className="h-20 bg-gray-900 rounded-md"></div>
                      </div>
                      <div
                        className={`border rounded-lg p-4 cursor-pointer dark:border-gray-700 transition-all ${theme === "system" ? "ring-2 ring-primary bg-primary/5" : "hover:border-primary/50"}`}
                        onClick={() => setTheme("system")}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="font-medium">{t.system}</div>
                          <Monitor className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </div>
                        <div className="h-20 bg-gradient-to-r from-white to-gray-900 rounded-md"></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">{t.colorScheme}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div
                        className={`border rounded-lg p-2 cursor-pointer dark:border-gray-700 transition-all ${colorScheme === "teal" ? "ring-2 ring-primary" : "hover:border-primary/50"}`}
                        onClick={() => setColorScheme("teal")}
                      >
                        <div className="h-10 bg-teal-500 rounded-md"></div>
                        <div className="text-center mt-2 text-sm font-medium">Teal</div>
                      </div>
                      <div
                        className={`border rounded-lg p-2 cursor-pointer dark:border-gray-700 transition-all ${colorScheme === "emerald" ? "ring-2 ring-primary" : "hover:border-primary/50"}`}
                        onClick={() => setColorScheme("emerald")}
                      >
                        <div className="h-10 bg-emerald-500 rounded-md"></div>
                        <div className="text-center mt-2 text-sm font-medium">{t.emerald}</div>
                      </div>
                      <div
                        className={`border rounded-lg p-2 cursor-pointer dark:border-gray-700 transition-all ${colorScheme === "blue" ? "ring-2 ring-primary" : "hover:border-primary/50"}`}
                        onClick={() => setColorScheme("blue")}
                      >
                        <div className="h-10 bg-blue-500 rounded-md"></div>
                        <div className="text-center mt-2 text-sm font-medium">{t.blue}</div>
                      </div>
                      <div
                        className={`border rounded-lg p-2 cursor-pointer dark:border-gray-700 transition-all ${colorScheme === "purple" ? "ring-2 ring-primary" : "hover:border-primary/50"}`}
                        onClick={() => setColorScheme("purple")}
                      >
                        <div className="h-10 bg-purple-500 rounded-md"></div>
                        <div className="text-center mt-2 text-sm font-medium">{t.purple}</div>
                      </div>
                      <div
                        className={`border rounded-lg p-2 cursor-pointer dark:border-gray-700 transition-all ${colorScheme === "orange" ? "ring-2 ring-primary" : "hover:border-primary/50"}`}
                        onClick={() => setColorScheme("orange")}
                      >
                        <div className="h-10 bg-orange-500 rounded-md"></div>
                        <div className="text-center mt-2 text-sm font-medium">{t.orange}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      {t.saveChanges}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Language & Region Settings */}
            {activeTab === "language" && (
              <div>
                <h2 className="text-lg font-bold mb-6">{t.languageRegionSettings}</h2>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="language"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {t.language}
                    </label>
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as "en" | "zh")}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                      <option value="en">{t.english}</option>
                      <option value="zh">{t.chinese}</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="currency"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      {t.currency}
                    </label>
                    <select
                      id="currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    >
                      <option value="usd">USD - US Dollar</option>
                      <option value="eur">EUR - Euro</option>
                      <option value="gbp">GBP - British Pound</option>
                      <option value="jpy">JPY - Japanese Yen</option>
                      <option value="cad">CAD - Canadian Dollar</option>
                      <option value="aud">AUD - Australian Dollar</option>
                      <option value="cny">CNY - Chinese Yuan</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      {t.saveChanges}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs remain the same */}
            {activeTab === "payment" && (
              <div>
                <h2 className="text-lg font-bold mb-6">{t.paymentMethods}</h2>
                {/* Payment methods content */}
                <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    {t.saveChanges}
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <h2 className="text-lg font-bold mb-6">{t.security}</h2>
                {/* Security settings content */}
                <div className="pt-4 border-t dark:border-gray-700 flex justify-end">
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    {t.saveChanges}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
