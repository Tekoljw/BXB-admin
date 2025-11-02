"use client"

import React, { useState, useEffect } from "react"
import TopNavbar from "./top-navbar"
import LeftSidebar from "./left-sidebar"
import {
  MessageCircle,
  Compass,
  DollarSign,
  LineChart,
  ArrowLeftRight,
  BarChart3,
  Wallet,
  CreditCard,
  History,
  Send,
  PiggyBank,
  TrendingUp,
  Shield,
  Users,
  Settings,
  LayoutDashboard,
  FileText,
} from "lucide-react"

// Import all page components
import ChatPage from "@/app/(dashboard)/chat/page"
import MomentsPage from "@/app/(dashboard)/moments/page"
import USDTTradePage from "@/app/(dashboard)/usdt-trade/page"
import MarketPage from "@/app/(dashboard)/market/page"
import SpotPage from "@/app/(dashboard)/spot/page"
import FuturesPage from "@/app/(dashboard)/futures/page"
import FinancePage from "@/app/(dashboard)/finance/page"
import WalletPage from "@/app/(dashboard)/wallet/page"

// Import admin pages
import DashboardPage from "@/app/(dashboard)/admin/operations/dashboard/page"
import AllUsersPage from "@/app/(dashboard)/admin/users/all/page"
import IMAccountsPage from "@/app/(dashboard)/admin/im/accounts/page"
import SocialManagementPage from "@/app/(dashboard)/admin/social/page"
import C2CManagementPage from "@/app/(dashboard)/admin/fiat/c2c/page"
import EscrowRulesPage from "@/app/(dashboard)/admin/escrow/rules/page"
import UCardUsersPage from "@/app/(dashboard)/admin/ucard/users/page"
import SpotCoinsPage from "@/app/(dashboard)/admin/spot/coins/page"
import FuturesManagementPage from "@/app/(dashboard)/admin/futures/page"
import CopyTradeManagementPage from "@/app/(dashboard)/admin/copytrade/page"
import FinanceManagementPage from "@/app/(dashboard)/admin/finance/page"
import FuturesCommissionPage from "@/app/(dashboard)/admin/commission/futures/page"
import BePayManagementPage from "@/app/(dashboard)/admin/bepay/page"
import FundsRecordsPage from "@/app/(dashboard)/admin/orders/funds/page"
import PermissionsManagementPage from "@/app/(dashboard)/admin/system/permissions/page"

// 定义一级菜单
const topSections = [
  { id: "social", label: "社交", labelEn: "Social" },
  { id: "trading", label: "交易", labelEn: "Trading" },
  { id: "finance", label: "理财", labelEn: "Finance" },
  { id: "wallet", label: "钱包", labelEn: "Wallet" },
  { id: "admin", label: "管理", labelEn: "Admin" },
]

// 定义每个一级菜单对应的二级菜单
const sectionMenus = {
  social: [
    { id: "chat", label: "聊天", labelEn: "Chat", icon: MessageCircle, path: "/chat" },
    { id: "moments", label: "朋友圈", labelEn: "Moments", icon: Compass, path: "/moments" },
  ],
  trading: [
    { id: "market", label: "行情", labelEn: "Market", icon: LineChart, path: "/market" },
    { id: "usdt", label: "USDT交易", labelEn: "USDT Trade", icon: DollarSign, path: "/usdt-trade" },
    { id: "spot", label: "现货交易", labelEn: "Spot", icon: ArrowLeftRight, path: "/spot" },
    { id: "futures", label: "合约交易", labelEn: "Futures", icon: BarChart3, path: "/futures" },
  ],
  finance: [
    { id: "finance", label: "理财产品", labelEn: "Finance Products", icon: PiggyBank, path: "/finance" },
    { id: "earnings", label: "收益记录", labelEn: "Earnings", icon: TrendingUp, path: "/finance/earnings" },
  ],
  wallet: [
    { id: "wallet", label: "我的资产", labelEn: "My Assets", icon: Wallet, path: "/wallet" },
    { id: "deposit", label: "充值", labelEn: "Deposit", icon: CreditCard, path: "/wallet/deposit" },
    { id: "withdraw", label: "提现", labelEn: "Withdraw", icon: Send, path: "/wallet/withdraw" },
    { id: "history", label: "交易记录", labelEn: "History", icon: History, path: "/wallet/history" },
  ],
  admin: [
    { id: "operations", label: "运营报表", labelEn: "Operations", icon: LayoutDashboard, path: "/admin/operations/dashboard" },
    { id: "users", label: "用户管理", labelEn: "Users", icon: Users, path: "/admin/users/all" },
    { id: "im", label: "IM管理", labelEn: "IM", icon: MessageCircle, path: "/admin/im/accounts" },
    { id: "social", label: "社交管理", labelEn: "Social", icon: Compass, path: "/admin/social" },
    { id: "fiat", label: "法币管理", labelEn: "Fiat", icon: DollarSign, path: "/admin/fiat/c2c" },
    { id: "escrow", label: "担保管理", labelEn: "Escrow", icon: Shield, path: "/admin/escrow/rules" },
    { id: "ucard", label: "U卡管理", labelEn: "U-Card", icon: CreditCard, path: "/admin/ucard/users" },
    { id: "spot", label: "现货管理", labelEn: "Spot", icon: ArrowLeftRight, path: "/admin/spot/coins" },
    { id: "futures", label: "合约管理", labelEn: "Futures", icon: BarChart3, path: "/admin/futures/config/sectors" },
    { id: "copytrade", label: "跟单管理", labelEn: "Copy Trade", icon: Users, path: "/admin/copytrade" },
    { id: "finance", label: "理财管理", labelEn: "Finance", icon: PiggyBank, path: "/admin/finance" },
    { id: "commission", label: "佣金管理", labelEn: "Commission", icon: TrendingUp, path: "/admin/commission/futures" },
    { id: "bepay", label: "BePay管理", labelEn: "BePay", icon: Wallet, path: "/admin/bepay/channels" },
    { id: "orders", label: "财务管理", labelEn: "Financial", icon: FileText, path: "/admin/orders/funds" },
    { id: "system", label: "系统管理", labelEn: "System", icon: Settings, path: "/admin/system/permissions" },
  ],
}

export default function NewNavigation() {
  const [currentSection, setCurrentSection] = useState("social")
  const [currentPage, setCurrentPage] = useState("/chat")
  const [isExpanded, setIsExpanded] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // 从URL初始化当前页面
    const path = window.location.pathname
    setCurrentPage(path)
    
    // 根据路径确定当前section
    if (path.startsWith("/admin")) {
      setCurrentSection("admin")
    } else if (path.includes("wallet") || path.includes("deposit") || path.includes("withdraw")) {
      setCurrentSection("wallet")
    } else if (path.includes("finance")) {
      setCurrentSection("finance")
    } else if (path.includes("usdt") || path.includes("spot") || path.includes("futures") || path.includes("market")) {
      setCurrentSection("trading")
    } else {
      setCurrentSection("social")
    }
    
    // 监听popstate事件
    const handlePopState = () => {
      setCurrentPage(window.location.pathname)
    }
    
    window.addEventListener("popstate", handlePopState)
    
    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  const handleSectionChange = (section: string) => {
    setCurrentSection(section)
    // 切换section时，导航到该section的第一个页面
    const firstMenuItem = sectionMenus[section as keyof typeof sectionMenus][0]
    if (firstMenuItem) {
      handleNavigate(firstMenuItem.path)
    }
  }

  const handleNavigate = (path: string) => {
    setCurrentPage(path)
    window.history.pushState({}, "", path)
  }

  const getCurrentMenuItems = () => {
    return sectionMenus[currentSection as keyof typeof sectionMenus] || []
  }

  const renderCurrentPage = () => {
    // 社交页面
    if (currentPage === "/chat") return <ChatPage />
    if (currentPage === "/moments") return <MomentsPage />
    
    // 交易页面
    if (currentPage === "/market") return <MarketPage />
    if (currentPage === "/usdt-trade") return <USDTTradePage />
    if (currentPage === "/spot") return <SpotPage />
    if (currentPage === "/futures") return <FuturesPage />
    
    // 理财页面
    if (currentPage === "/finance") return <FinancePage />
    
    // 钱包页面
    if (currentPage === "/wallet") return <WalletPage />
    
    // 管理页面 - 15个模块
    if (currentPage.startsWith("/admin/operations")) return <DashboardPage />
    if (currentPage.startsWith("/admin/users")) return <AllUsersPage />
    if (currentPage.startsWith("/admin/im")) return <IMAccountsPage />
    if (currentPage === "/admin/social") return <SocialManagementPage />
    if (currentPage.startsWith("/admin/fiat")) return <C2CManagementPage />
    if (currentPage.startsWith("/admin/escrow")) return <EscrowRulesPage />
    if (currentPage.startsWith("/admin/ucard")) return <UCardUsersPage />
    if (currentPage.startsWith("/admin/spot")) return <SpotCoinsPage />
    if (currentPage.startsWith("/admin/futures")) return <FuturesManagementPage />
    if (currentPage === "/admin/copytrade") return <CopyTradeManagementPage />
    if (currentPage === "/admin/finance") return <FinanceManagementPage />
    if (currentPage.startsWith("/admin/commission")) return <FuturesCommissionPage />
    if (currentPage.startsWith("/admin/bepay")) return <BePayManagementPage />
    if (currentPage.startsWith("/admin/orders")) return <FundsRecordsPage />
    if (currentPage.startsWith("/admin/system")) return <PermissionsManagementPage />
    
    // 默认页面
    return <ChatPage />
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* 顶部导航栏 */}
      <TopNavbar
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        sections={topSections}
      />

      <div className="flex flex-1 overflow-hidden pt-16">
        {/* 左侧边栏 */}
        <LeftSidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          menuItems={getCurrentMenuItems()}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />

        {/* 主内容区域 */}
        <div
          className="flex-1 overflow-auto transition-all duration-300"
          style={{
            marginLeft: isExpanded ? "256px" : "80px",
          }}
        >
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  )
}
