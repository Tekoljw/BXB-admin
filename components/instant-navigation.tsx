"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { useAdmin } from "@/contexts/admin-context"
import { useMaintenance } from "@/contexts/maintenance-context"
import AdminTopNav from "@/components/admin-top-nav"
import AdminSidebar from "@/components/admin-sidebar"
import MaintenancePage from "@/components/maintenance-page"
import { getModuleFromPath as getModuleFromPathUtil, getModuleDefaultPath as getModuleDefaultPathUtil, getModuleName as getModuleNameUtil } from "@/router/route-paths"

// 只导入管理后台页面组件
import AdminPage from "@/app/(dashboard)/admin/page"
import AdminLoginPage from "@/app/(dashboard)/admin/login/page"
import BusinessLinesPage from "@/app/(dashboard)/admin/permissions/business-lines/page"
import PermissionsAuditConfigPage from "@/app/(dashboard)/admin/permissions/audit-config/page"
import StaffManagementPage from "@/app/(dashboard)/admin/permissions/staff-management/page"
import UserPermissionsPage from "@/app/(dashboard)/admin/permissions/user-permissions/page"
import PermissionsSystemManagementPage from "@/app/(dashboard)/admin/permissions/system-management/page"
import SystemLogsPage from "@/app/(dashboard)/admin/permissions/system-logs/page"
import ManualCreditPage from "@/app/(dashboard)/admin/orders/manual-credit/page"
import ManualTransferPage from "@/app/(dashboard)/admin/orders/manual-transfer/page"
import LargeWithdrawalAuditPage from "@/app/(dashboard)/admin/orders/large-withdrawal-audit/page"
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
import UCardShippingOrdersPage from "@/app/(dashboard)/admin/ucard/shipping-orders/page"
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
import CryptoUsersPage from "@/app/(dashboard)/admin/crypto/crypto-users/page"
import CryptoCurrenciesPage from "@/app/(dashboard)/admin/crypto/currencies/page"
import CustodialWalletsPage from "@/app/(dashboard)/admin/crypto/custodial-wallets/page"
import AddressesManagementPage from "@/app/(dashboard)/admin/crypto/addresses/page"
import OTCSuppliersPage from "@/app/(dashboard)/admin/crypto/otc-suppliers/page"
import OTCOrdersPage from "@/app/(dashboard)/admin/crypto/otc-orders/page"
import OnchainDepositOrdersPage from "@/app/(dashboard)/admin/crypto/onchain-deposit-orders/page"
import CryptoFreezeRecordsPage from "@/app/(dashboard)/admin/crypto/freeze-records/page"
import CryptoSpotMarketPage from "@/app/(dashboard)/admin/crypto/spot-market/page"
import CryptoSpotMarketMakerPage from "@/app/(dashboard)/admin/crypto/spot-market-maker/page"
import CryptoOrderManagementPage from "@/app/(dashboard)/admin/crypto/order-management/page"
import CryptoKlineManagementPage from "@/app/(dashboard)/admin/crypto/kline-management/page"
import CryptoTradeHistoryPage from "@/app/(dashboard)/admin/crypto/trade-history/page"
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
  // 初始化时从 URL 读取当前路径，避免刷新时显示登录页
  const getInitialPage = () => {
    if (typeof window === 'undefined') return "/admin/login"
    const path = window.location.pathname
    return path || "/admin/login"
  }
  
  const [currentPage, setCurrentPage] = useState(getInitialPage)
  const [currentModule, setCurrentModule] = useState(() => {
    if (typeof window === 'undefined') return "operations"
    return getModuleFromPathUtil(window.location.pathname)
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const { theme } = useTheme()
  const { isAdminLoggedIn, isLoggingOut } = useAdmin()
  const { isModuleUnderMaintenance } = useMaintenance()

  // 根据路径确定当前模块（使用统一的路由配置）
  const getModuleFromPath = (path: string): string => {
    return getModuleFromPathUtil(path) || "operations"
  }

  // 获取模块的默认页面（使用统一的路由配置，但保留业务特定的默认路径）
  const getModuleDefaultPath = (module: string): string => {
    // 业务特定的默认路径映射（覆盖路由配置中的默认值）
    const businessDefaults: Record<string, string> = {
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
      'crypto': '/admin/crypto/business-report',
      fiat: '/admin/fiat/reports',
      orders: '/admin/orders/business-overview',
      options: '/admin/options',
      system: '/admin/system/users',
      maintenance: '/admin/maintenance/plan',
    }
    
    // 优先使用业务特定的默认路径，否则使用路由配置中的默认路径
    return businessDefaults[module] || getModuleDefaultPathUtil(module) || '/admin/permissions/business-lines'
  }

  useEffect(() => {
    // 初始化当前页面
    const path = window.location.pathname || "/admin/login"
    
    // 检查登录状态：优先从 storage 读取（同步，避免闪烁）
    const isLoggedIn = sessionStorage.getItem("isAdminLoggedIn") === "true" || 
                      localStorage.getItem("isAdminLoggedIn") === "true" ||
                      isAdminLoggedIn
    
    // 如果已登录但当前页是登录页，且URL不是登录页，立即更新到实际页面
    if (isLoggedIn && path !== "/admin/login") {
      setCurrentPage(path)
      setCurrentModule(getModuleFromPath(path))
    } else if (path !== currentPage) {
      // 如果路径变化了，更新状态
      setCurrentPage(path)
      setCurrentModule(getModuleFromPath(path))
    }
    
    // 标记初始化完成
    setIsInitializing(false)

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

  // 获取模块的中文名称（使用统一的路由配置）
  const getModuleName = (moduleId: string): string => {
    // 业务特定的模块名称映射（覆盖路由配置中的名称）
    const businessNames: Record<string, string> = {
      operations: '运营报表', // operations在业务上属于marketing模块，但保留独立名称
      maintenance: '维护管理',
    }
    
    // 优先使用业务特定的名称，否则使用路由配置中的名称
    return businessNames[moduleId] || getModuleNameUtil(moduleId) || '此模块'
  }

  const renderCurrentPage = () => {
    // 登录页面不受维护影响
    // 只有在确实需要显示登录页时才显示（路径是登录页 且 未登录）
    if (currentPage === "/admin/login") {
      // 如果已登录但路径是登录页，可能是刷新时的短暂状态，检查实际URL
      const actualPath = typeof window !== 'undefined' ? window.location.pathname : currentPage
      if (actualPath !== "/admin/login" && isAdminLoggedIn) {
        // 已登录但状态未更新，返回null等待状态更新
        return null
      }
      return <AdminLoginPage />
    }
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
    if (currentPage === "/admin/orders/manual-credit") return <ManualCreditPage />
    if (currentPage === "/admin/orders/manual-transfer") return <ManualTransferPage />
    if (currentPage === "/admin/orders/large-withdrawal-audit") return <LargeWithdrawalAuditPage />
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
    if (currentPage === "/admin/ucard/shipping-orders") return <UCardShippingOrdersPage />
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
    if (currentPage === "/admin/crypto/crypto-users") return <CryptoUsersPage />
    if (currentPage === "/admin/crypto/currencies") return <CryptoCurrenciesPage />
    if (currentPage === "/admin/crypto/custodial-wallets") return <CustodialWalletsPage />
    if (currentPage === "/admin/crypto/addresses") return <AddressesManagementPage />
    if (currentPage === "/admin/crypto/otc-suppliers") return <OTCSuppliersPage />
    if (currentPage === "/admin/crypto/otc-orders") return <OTCOrdersPage />
    if (currentPage === "/admin/crypto/onchain-deposit-orders") return <OnchainDepositOrdersPage />
    if (currentPage === "/admin/crypto/freeze-records") return <CryptoFreezeRecordsPage />
    if (currentPage === "/admin/crypto/spot-market") return <CryptoSpotMarketPage />
    if (currentPage === "/admin/crypto/spot-market-maker") return <CryptoSpotMarketMakerPage />
    if (currentPage === "/admin/crypto/order-management") return <CryptoOrderManagementPage />
    if (currentPage === "/admin/crypto/kline-management") return <CryptoKlineManagementPage />
    if (currentPage === "/admin/crypto/trade-history") return <CryptoTradeHistoryPage />
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

  // 初始化中：显示加载状态，避免闪烁登录页
  if (isInitializing) {
    return (
      <div className={`h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-700 border-t-custom-green rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-custom-green/30 rounded-full animate-spin mx-auto" style={{ animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-6 text-gray-400 text-lg font-medium">加载中...</p>
        </div>
      </div>
    )
  }

  // 登出中或登录页面不显示导航栏
  // 但需要检查：如果已登录且实际URL不是登录页，不应该显示登录页
  const actualPath = typeof window !== 'undefined' ? window.location.pathname : currentPage
  const shouldShowLoginPage = currentPage === "/admin/login" && 
                              actualPath === "/admin/login" && 
                              !isAdminLoggedIn
  
  if (isLoggingOut || shouldShowLoginPage) {
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
