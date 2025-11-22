"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useAdmin } from "@/contexts/admin-context"
import { useMaintenance } from "@/contexts/maintenance-context"
import AdminTopNav from "@/components/admin-top-nav"
import AdminSidebar from "@/components/admin-sidebar"
import MaintenancePage from "@/components/maintenance-page"

// 只导入管理后台页面组件
import AdminPage from "@/app/(dashboard)/admin/page"
import AdminLoginPage from "@/app/(dashboard)/admin/login/page"
import BusinessLinesPage from "@/app/(dashboard)/admin/permissions/business-lines/page"
import PermissionsAuditConfigPage from "@/app/(dashboard)/admin/permissions/audit-config/page"
import StaffManagementPage from "@/app/(dashboard)/admin/permissions/staff-management/page"
import UserPermissionsPage from "@/app/(dashboard)/admin/permissions/user-permissions/page"
import PermissionsSystemManagementPage from "@/app/(dashboard)/admin/permissions/system-management/page"
import SystemLogsPage from "@/app/(dashboard)/admin/permissions/system-logs/page"
import ManualCreditPage from "@/app/(dashboard)/admin/permissions/manual-credit/page"
import ManualTransferPage from "@/app/(dashboard)/admin/permissions/manual-transfer/page"
import LargeWithdrawalAuditPage from "@/app/(dashboard)/admin/permissions/large-withdrawal-audit/page"
import RegistrationWhitelistPage from "@/app/(dashboard)/admin/marketing/registration-whitelist/page"
import OperationsDashboardPage from "@/app/(dashboard)/admin/operations/dashboard/page"
import OperationsActivitiesPage from "@/app/(dashboard)/admin/operations/activities/page"
import OperationsAuditPage from "@/app/(dashboard)/admin/operations/audit/page"
import OperationsFundsPage from "@/app/(dashboard)/admin/operations/funds/page"
import OperationsOrdersPage from "@/app/(dashboard)/admin/operations/orders/page"
import OperationsRetentionPage from "@/app/(dashboard)/admin/operations/retention/page"
import OperationsRiskPage from "@/app/(dashboard)/admin/operations/risk/page"
import MarketConfigPage from "@/app/(dashboard)/admin/operations/market-config/page"
import BusinessOverviewPage from "@/app/(dashboard)/admin/orders/business-overview/page"
import UCardAssetsPage from "@/app/(dashboard)/admin/orders/ucard-assets/page"
import IMAccountsPage from "@/app/(dashboard)/admin/im/accounts/page"
import IMGroupsPage from "@/app/(dashboard)/admin/im/groups/page"
import IMMessagesPage from "@/app/(dashboard)/admin/im/messages/page"
import IMLogsPage from "@/app/(dashboard)/admin/im/logs/page"
import IMReviewPage from "@/app/(dashboard)/admin/im/review/page"
import IMAutoJoinPage from "@/app/(dashboard)/admin/im/auto-join/page"
import IMGroupSearchPage from "@/app/(dashboard)/admin/im/group-search/page"
import AllUsersPage from "@/app/(dashboard)/admin/users/all/page"
import BlacklistPage from "@/app/(dashboard)/admin/users/blacklist/page"
import DeletedUsersPage from "@/app/(dashboard)/admin/users/deleted/page"
import UserBehaviorPage from "@/app/(dashboard)/admin/users/behavior/page"
import APIReviewPage from "@/app/(dashboard)/admin/users/api-review/page"
import APIManagePage from "@/app/(dashboard)/admin/users/api-manage/page"
import SMSLogsPage from "@/app/(dashboard)/admin/users/sms-logs/page"
import EmailLogsPage from "@/app/(dashboard)/admin/users/email-logs/page"
import F2AReviewPage from "@/app/(dashboard)/admin/users/f2a-review/page"
import VoiceLogsPage from "@/app/(dashboard)/admin/users/voice-logs/page"
import AccountTypesPage from "@/app/(dashboard)/admin/users/account-types/page"
import SpecialAccountsPage from "@/app/(dashboard)/admin/users/special-accounts/page"
import KYCReviewPage from "@/app/(dashboard)/admin/users/kyc-review/page"
import KYCRecordsPage from "@/app/(dashboard)/admin/users/kyc-records/page"
import SocialManagementPage from "@/app/(dashboard)/admin/social/page"
import MarketManagementPage from "@/app/(dashboard)/admin/market/page"
import C2CModulePage from "@/app/(dashboard)/admin/c2c/page"
import EscrowRulesPage from "@/app/(dashboard)/admin/escrow/rules/page"
import EscrowRecordsPage from "@/app/(dashboard)/admin/escrow/records/page"
import EscrowRankingsPage from "@/app/(dashboard)/admin/escrow/rankings/page"
import EscrowGroupsPage from "@/app/(dashboard)/admin/escrow/groups/page"
import ArbitratorsPage from "@/app/(dashboard)/admin/escrow/arbitrators/page"
import ComplaintsPage from "@/app/(dashboard)/admin/escrow/complaints/page"
import UCardUsersPage from "@/app/(dashboard)/admin/ucard/users/page"
import UCardSuppliersPage from "@/app/(dashboard)/admin/ucard/suppliers/page"
import UCardConfigPage from "@/app/(dashboard)/admin/ucard/config/page"
import NumberSegmentsPage from "@/app/(dashboard)/admin/ucard/number-segments/page"
import UCardApplicationsPage from "@/app/(dashboard)/admin/ucard/applications/page"
import UCardRechargeRecordsPage from "@/app/(dashboard)/admin/ucard/recharge-records/page"
import UCardTransactionsPage from "@/app/(dashboard)/admin/ucard/transactions/page"
import SpotCoinsPage from "@/app/(dashboard)/admin/spot/coins/page"
import SpotNetworksPage from "@/app/(dashboard)/admin/spot/networks/page"
import SpotMarketsPage from "@/app/(dashboard)/admin/spot/markets/page"
import SpotMarketMakersPage from "@/app/(dashboard)/admin/spot/market-makers/page"
import SpotSectorsPage from "@/app/(dashboard)/admin/spot/sectors/page"
import SpotRestrictedCountriesPage from "@/app/(dashboard)/admin/spot/restricted-countries/page"
import SpotWhitelistPage from "@/app/(dashboard)/admin/spot/whitelist/page"
import SpotDelegateOrdersPage from "@/app/(dashboard)/admin/spot/orders/page"
import SpotKlinePage from "@/app/(dashboard)/admin/spot/kline/page"
import SpotTransactionsPage from "@/app/(dashboard)/admin/spot/transactions/page"
import FuturesManagementPage from "@/app/(dashboard)/admin/futures/page"
import CopyTradeManagementPage from "@/app/(dashboard)/admin/copytrade/page"
import FinanceManagementPage from "@/app/(dashboard)/admin/finance/page"
import FuturesCommissionPage from "@/app/(dashboard)/admin/commission/futures/page"
import FinanceCommissionPage from "@/app/(dashboard)/admin/commission/finance/page"
import UCardCommissionPage from "@/app/(dashboard)/admin/commission/ucard/page"
import EscrowCommissionPage from "@/app/(dashboard)/admin/commission/escrow/page"
import PaymentCommissionPage from "@/app/(dashboard)/admin/commission/payment/page"
import WalletManagementPage from "@/app/(dashboard)/admin/wallet/page"
import ProfilePage from "@/app/(dashboard)/admin/profile/page"
import CryptoBusinessReportPage from "@/app/(dashboard)/admin/crypto/business-report/page"
import CryptoAssetStatisticsPage from "@/app/(dashboard)/admin/orders/crypto-assets/page"
import CryptoUsersPage from "@/app/(dashboard)/admin/crypto/users/page"
import CryptoCurrenciesPage from "@/app/(dashboard)/admin/crypto/currencies/page"
import CustodialWalletsPage from "@/app/(dashboard)/admin/crypto/custodial-wallets/page"
import AddressesManagementPage from "@/app/(dashboard)/admin/crypto/addresses/page"
import WalletAPIBusinessPage from "@/app/(dashboard)/admin/crypto/wallet-api-business/page"
import OTCSuppliersPage from "@/app/(dashboard)/admin/crypto/otc-suppliers/page"
import OTCOrdersPage from "@/app/(dashboard)/admin/crypto/otc-orders/page"
import OnchainDepositOrdersPage from "@/app/(dashboard)/admin/crypto/onchain-deposit-orders/page"
import FiatAssetStatisticsPage from "@/app/(dashboard)/admin/orders/fiat-assets/page"
import FiatUsersPage from "@/app/(dashboard)/admin/fiat/users/page"
import FiatManagementPage from "@/app/(dashboard)/admin/fiat/page"
import PermissionsManagementPage from "@/app/(dashboard)/admin/system/permissions/page"
import RolesManagementPage from "@/app/(dashboard)/admin/system/roles/page"
import SystemUsersManagementPage from "@/app/(dashboard)/admin/system/users/page"
import AuditConfigPage from "@/app/(dashboard)/admin/system/audit-config/page"
import AppManagementPage from "@/app/(dashboard)/admin/system/app/page"
import OperationsManagementPage from "@/app/(dashboard)/admin/system/operations/page"
import MaintenancePlanPage from "@/app/(dashboard)/admin/system/maintenance-plan/page"
import MaintenanceWhitelistPage from "@/app/(dashboard)/admin/system/maintenance-whitelist/page"

export default function InstantNavigation() {
  const [currentPage, setCurrentPage] = useState("/admin/login")
  const [currentModule, setCurrentModule] = useState("operations")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()
  const { isAdminLoggedIn, isLoggingOut } = useAdmin()
  const { isModuleUnderMaintenance } = useMaintenance()

  // 根据路径确定当前模块
  const getModuleFromPath = (path: string): string => {
    if (path.startsWith('/admin/permissions')) return 'permissions'
    if (path.startsWith('/admin/marketing')) return 'marketing'
    // operations页面现在属于marketing模块
    if (path.startsWith('/admin/operations')) return 'marketing'
    if (path.startsWith('/admin/system')) return 'system'
    if (path.startsWith('/admin/users')) return 'users'
    if (path.startsWith('/admin/im')) return 'im'
    if (path.startsWith('/admin/social')) return 'social'
    if (path.startsWith('/admin/c2c')) return 'c2c'
    if (path.startsWith('/admin/escrow')) return 'escrow'
    if (path.startsWith('/admin/ucard')) return 'ucard'
    if (path.startsWith('/admin/spot')) return 'spot'
    if (path.startsWith('/admin/futures')) return 'futures'
    if (path.startsWith('/admin/copytrade')) return 'copytrade'
    if (path.startsWith('/admin/finance')) return 'finance'
    if (path.startsWith('/admin/commission')) return 'commission'
    if (path.startsWith('/admin/crypto')) return 'crypto'
    if (path.startsWith('/admin/fiat')) return 'fiat'
    if (path.startsWith('/admin/orders')) return 'orders'
    if (path.startsWith('/admin/options')) return 'options'
    if (path.startsWith('/admin/maintenance')) return 'maintenance'
    return 'permissions'
  }

  // 获取模块的默认页面
  const getModuleDefaultPath = (module: string): string => {
    const defaults: Record<string, string> = {
      permissions: '/admin/permissions/business-lines',
      marketing: '/admin/marketing/registration-whitelist',
      operations: '/admin/operations/dashboard',
      users: '/admin/users/all',
      im: '/admin/im/accounts',
      social: '/admin/social',
      c2c: '/admin/c2c/c2c',
      escrow: '/admin/escrow/rules',
      ucard: '/admin/ucard/users',
      spot: '/admin/spot/coins',
      futures: '/admin/futures/config/sectors',
      copytrade: '/admin/copytrade',
      finance: '/admin/finance',
      commission: '/admin/commission/futures',
      'crypto': '/admin/crypto/currencies',
      fiat: '/admin/fiat/reports',
      orders: '/admin/orders/business-overview',
      options: '/admin/options',
      system: '/admin/system/users',
      maintenance: '/admin/maintenance/plan',
    }
    return defaults[module] || '/admin/permissions/business-lines'
  }

  useEffect(() => {
    // 初始化当前页面
    const path = window.location.pathname
    setCurrentPage(path || "/admin/login")
    setCurrentModule(getModuleFromPath(path))

    // 监听popstate事件，用于其他组件触发的导航
    const handlePopState = () => {
      const newPath = window.location.pathname
      setCurrentPage(newPath)
      setCurrentModule(getModuleFromPath(newPath))
    }

    // 监听自定义navigate事件（用于登录页面等触发的导航）
    const handleNavigate = (e: any) => {
      const newPath = e.detail?.path
      if (newPath) {
        // 如果是跳转到登录页（通常是logout触发），立即清除当前页面状态
        if (newPath === "/admin/login") {
          setCurrentPage("/admin/login")
          setCurrentModule("operations")
          window.history.pushState({}, "", "/admin/login")
        } else {
          // 其他导航使用常规流程（会检查登录状态，包括实时检查 storage）
          navigate(newPath)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('navigate', handleNavigate as EventListener)
    
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('navigate', handleNavigate as EventListener)
    }
  }, [isAdminLoggedIn])

  const navigate = (path: string) => {
    // 检查登录状态：优先从 storage 读取（实时），回退到 context 状态
    // 这样可以处理登录回调中状态还未更新的情况
    const isLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true" || 
                      localStorage.getItem("isAdminLoggedIn") === "true" ||
                      isAdminLoggedIn
    
    // 如果访问管理页面但未登录，跳转到登录页
    if (path.startsWith('/admin') && path !== '/admin/login' && !isLoggedIn) {
      setCurrentPage('/admin/login')
      window.history.pushState({}, "", '/admin/login')
      return
    }
    
    // 显示加载动画
    setIsLoading(true)
    
    // 使用 setTimeout 确保 UI 更新
    setTimeout(() => {
      setCurrentPage(path)
      setCurrentModule(getModuleFromPath(path))
      window.history.pushState({}, "", path)
      
      // 延迟隐藏加载动画，让用户能看到过渡效果
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }, 50)
  }

  const handleModuleChange = (module: string) => {
    const defaultPath = getModuleDefaultPath(module)
    navigate(defaultPath)
  }

  // 获取模块的中文名称
  const getModuleName = (moduleId: string): string => {
    const names: Record<string, string> = {
      permissions: '权限管理',
      marketing: '运营管理',
      operations: '运营报表',
      users: '用户管理',
      im: 'IM管理',
      social: '社交管理',
      c2c: 'C2C',
      escrow: '担保管理',
      ucard: 'U卡管理',
      spot: '现货管理',
      futures: '合约管理',
      copytrade: '跟单管理',
      finance: '理财管理',
      commission: '佣金管理',
      'crypto': 'Crypto',
      fiat: '法币',
      orders: '财务管理',
      options: '期权管理',
      system: '系统管理',
    }
    return names[moduleId] || '此模块'
  }

  const renderCurrentPage = () => {
    // 登录页面不受维护影响
    if (currentPage === "/admin/login") return <AdminLoginPage />
    if (currentPage === "/admin") return <AdminPage />
    
    // 检查当前模块是否处于维护状态（业务线配置页面除外）
    if (currentPage !== "/admin/permissions/business-lines" && 
        currentModule && 
        isModuleUnderMaintenance(currentModule)) {
      return <MaintenancePage moduleName={getModuleName(currentModule)} />
    }
    
    // 管理后台页面
    if (currentPage === "/admin/permissions") return <BusinessLinesPage />
    if (currentPage === "/admin/permissions/business-lines") return <BusinessLinesPage />
    if (currentPage === "/admin/permissions/audit-config") return <PermissionsAuditConfigPage />
    if (currentPage === "/admin/permissions/staff-management") return <StaffManagementPage />
    if (currentPage === "/admin/permissions/user-permissions") return <UserPermissionsPage />
    if (currentPage === "/admin/permissions/system-management") return <PermissionsSystemManagementPage />
    if (currentPage === "/admin/permissions/system-logs") return <SystemLogsPage />
    if (currentPage === "/admin/permissions/manual-credit") return <ManualCreditPage />
    if (currentPage === "/admin/permissions/manual-transfer") return <ManualTransferPage />
    if (currentPage === "/admin/permissions/large-withdrawal-audit") return <LargeWithdrawalAuditPage />
    if (currentPage === "/admin/marketing") return <RegistrationWhitelistPage />
    if (currentPage.startsWith("/admin/marketing/")) return <RegistrationWhitelistPage />
    if (currentPage === "/admin/operations") return <OperationsDashboardPage />
    if (currentPage === "/admin/operations/dashboard") return <OperationsDashboardPage />
    if (currentPage === "/admin/operations/activities") return <OperationsActivitiesPage />
    if (currentPage === "/admin/operations/audit") return <OperationsAuditPage />
    if (currentPage === "/admin/operations/funds") return <OperationsFundsPage />
    if (currentPage === "/admin/operations/orders") return <OperationsOrdersPage />
    if (currentPage === "/admin/operations/retention") return <OperationsRetentionPage />
    if (currentPage === "/admin/operations/risk") return <OperationsRiskPage />
    if (currentPage === "/admin/operations/market-config") return <MarketConfigPage />
    // 后备路由：处理未来可能添加的operations子页面
    if (currentPage.startsWith("/admin/operations/")) return <OperationsDashboardPage />
    if (currentPage === "/admin/orders") return <BusinessOverviewPage />
    if (currentPage === "/admin/orders/business-overview") return <BusinessOverviewPage />
    if (currentPage === "/admin/orders/ucard-assets") return <UCardAssetsPage />
    if (currentPage === "/admin/users") return <AllUsersPage />
    if (currentPage === "/admin/users/all") return <AllUsersPage />
    if (currentPage === "/admin/users/blacklist") return <BlacklistPage />
    if (currentPage === "/admin/users/deleted") return <DeletedUsersPage />
    if (currentPage === "/admin/users/behavior") return <UserBehaviorPage />
    if (currentPage === "/admin/users/api-review") return <APIReviewPage />
    if (currentPage === "/admin/users/api-manage") return <APIManagePage />
    if (currentPage === "/admin/users/sms-logs") return <SMSLogsPage />
    if (currentPage === "/admin/users/email-logs") return <EmailLogsPage />
    if (currentPage === "/admin/users/f2a-review") return <F2AReviewPage />
    if (currentPage === "/admin/users/voice-logs") return <VoiceLogsPage />
    if (currentPage === "/admin/users/account-types") return <AccountTypesPage />
    if (currentPage === "/admin/users/special-accounts") return <SpecialAccountsPage />
    if (currentPage === "/admin/users/kyc-review") return <KYCReviewPage />
    if (currentPage === "/admin/users/kyc-records") return <KYCRecordsPage />
    if (currentPage === "/admin/im") return <IMAccountsPage />
    if (currentPage === "/admin/im/accounts") return <IMAccountsPage />
    if (currentPage === "/admin/im/groups") return <IMGroupsPage />
    if (currentPage === "/admin/im/messages") return <IMMessagesPage />
    if (currentPage === "/admin/im/logs") return <IMLogsPage />
    if (currentPage === "/admin/im/review") return <IMReviewPage />
    if (currentPage === "/admin/im/auto-join") return <IMAutoJoinPage />
    if (currentPage === "/admin/im/group-search") return <IMGroupSearchPage />
    if (currentPage === "/admin/social") return <SocialManagementPage />
    if (currentPage === "/admin/market") return <MarketManagementPage />
    if (currentPage.startsWith("/admin/c2c")) return <C2CModulePage />
    if (currentPage === "/admin/escrow") return <EscrowRulesPage />
    if (currentPage === "/admin/escrow/rules") return <EscrowRulesPage />
    if (currentPage === "/admin/escrow/records") return <EscrowRecordsPage />
    if (currentPage === "/admin/escrow/rankings") return <EscrowRankingsPage />
    if (currentPage === "/admin/escrow/groups") return <EscrowGroupsPage />
    if (currentPage === "/admin/escrow/arbitrators") return <ArbitratorsPage />
    if (currentPage === "/admin/escrow/complaints") return <ComplaintsPage />
    if (currentPage === "/admin/ucard") return <UCardUsersPage />
    if (currentPage === "/admin/ucard/users") return <UCardUsersPage />
    if (currentPage === "/admin/ucard/suppliers") return <UCardSuppliersPage />
    if (currentPage === "/admin/ucard/config") return <UCardConfigPage />
    if (currentPage === "/admin/ucard/number-segments") return <NumberSegmentsPage />
    if (currentPage === "/admin/ucard/applications") return <UCardApplicationsPage />
    if (currentPage === "/admin/ucard/recharge-records") return <UCardRechargeRecordsPage />
    if (currentPage === "/admin/ucard/transactions") return <UCardTransactionsPage />
    if (currentPage === "/admin/spot") return <SpotCoinsPage />
    if (currentPage === "/admin/spot/coins") return <SpotCoinsPage />
    if (currentPage === "/admin/spot/networks") return <SpotNetworksPage />
    if (currentPage === "/admin/spot/markets") return <SpotMarketsPage />
    if (currentPage === "/admin/spot/market-makers") return <SpotMarketMakersPage />
    if (currentPage === "/admin/spot/sectors") return <SpotSectorsPage />
    if (currentPage === "/admin/spot/restricted-countries") return <SpotRestrictedCountriesPage />
    if (currentPage === "/admin/spot/whitelist") return <SpotWhitelistPage />
    if (currentPage === "/admin/spot/orders") return <SpotDelegateOrdersPage />
    if (currentPage === "/admin/spot/kline") return <SpotKlinePage />
    if (currentPage === "/admin/spot/transactions") return <SpotTransactionsPage />
    if (currentPage.startsWith("/admin/futures")) return <FuturesManagementPage />
    if (currentPage === "/admin/copytrade") return <CopyTradeManagementPage />
    if (currentPage === "/admin/finance") return <FinanceManagementPage />
    if (currentPage === "/admin/commission") return <FuturesCommissionPage />
    if (currentPage === "/admin/commission/futures") return <FuturesCommissionPage />
    if (currentPage === "/admin/commission/finance") return <FinanceCommissionPage />
    if (currentPage === "/admin/commission/ucard") return <UCardCommissionPage />
    if (currentPage === "/admin/commission/escrow") return <EscrowCommissionPage />
    if (currentPage === "/admin/commission/payment") return <PaymentCommissionPage />
    if (currentPage === "/admin/wallet") return <WalletManagementPage />
    if (currentPage === "/admin/profile") return <ProfilePage />
    if (currentPage === "/admin/crypto/business-report") return <CryptoBusinessReportPage />
    if (currentPage === "/admin/orders/crypto-assets") return <CryptoAssetStatisticsPage />
    if (currentPage === "/admin/crypto/users") {
      return (
        <div className="p-6">
          <h1 className="text-3xl font-bold text-red-600">🔴 诊断测试：这是内联组件</h1>
          <p className="mt-4 text-xl">如果您能看到这段红色文字，说明instant-navigation正常工作</p>
          <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg text-xl font-bold">
            诊断测试按钮
          </button>
        </div>
      )
    }
    if (currentPage === "/admin/crypto/currencies") return <CryptoCurrenciesPage />
    if (currentPage === "/admin/crypto/custodial-wallets") return <CustodialWalletsPage />
    if (currentPage === "/admin/crypto/addresses") return <AddressesManagementPage />
    if (currentPage === "/admin/crypto/wallet-api-business") return <WalletAPIBusinessPage />
    if (currentPage === "/admin/crypto/otc-suppliers") return <OTCSuppliersPage />
    if (currentPage === "/admin/crypto/otc-orders") return <OTCOrdersPage />
    if (currentPage === "/admin/crypto/onchain-deposit-orders") return <OnchainDepositOrdersPage />
    if (currentPage === "/admin/orders/fiat-assets") return <FiatAssetStatisticsPage />
    if (currentPage === "/admin/fiat/users") return <FiatUsersPage />
    if (currentPage.startsWith("/admin/fiat")) return <FiatManagementPage />
    if (currentPage === "/admin/system") return <PermissionsManagementPage />
    if (currentPage === "/admin/system/permissions") return <PermissionsManagementPage />
    if (currentPage === "/admin/system/roles") return <RolesManagementPage />
    if (currentPage === "/admin/system/users") return <SystemUsersManagementPage />
    if (currentPage === "/admin/system/audit-config") return <AuditConfigPage />
    if (currentPage === "/admin/system/app") return <AppManagementPage />
    if (currentPage === "/admin/system/operations") return <OperationsManagementPage />
    if (currentPage === "/admin/system/maintenance-plan") return <MaintenancePlanPage />
    if (currentPage === "/admin/system/maintenance-whitelist") return <MaintenanceWhitelistPage />

    // 默认显示登录页
    return <AdminLoginPage />
  }

  // 登出中或登录页面不显示导航栏
  if (isLoggingOut || currentPage === "/admin/login") {
    return (
      <div className={`h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} overflow-auto`}>
        {renderCurrentPage()}
      </div>
    )
  }

  // 个人中心页面：只显示顶部导航，不显示左侧边栏
  if (currentPage === "/admin/profile") {
    return (
      <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <AdminTopNav 
          currentModule={currentModule}
          onModuleChange={handleModuleChange}
        />
        <div className={`flex-1 overflow-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          {renderCurrentPage()}
        </div>
      </div>
    )
  }

  // 管理后台布局（顶部导航 + 左侧边栏 + 内容区）
  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* 顶部导航栏 */}
      <AdminTopNav 
        currentModule={currentModule}
        onModuleChange={handleModuleChange}
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
      />

      {/* 内容区域：左侧边栏 + 主内容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧二级菜单 */}
        <AdminSidebar
          currentModule={currentModule}
          currentPage={currentPage}
          onNavigate={navigate}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(prev => !prev)}
        />

        {/* 主内容区域 */}
        <div className="flex-1 overflow-auto relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">加载中...</p>
              </div>
            </div>
          )}
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  )
}
