"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "@/contexts/theme-context"
import { fetchMenu } from "@/lib/menu-api"
import { convertMenuDataToUI, type UIMenuConfig, type UIMenuItem, type UIMenuGroup } from "@/lib/menu-utils"
import {
  BarChart3,
  TrendingUp,
  Activity,
  Shield,
  Zap,
  FileCheck,
  Users,
  UserX,
  Trash2,
  MousePointerClick,
  CheckCircle,
  Settings,
  MessageSquare,
  Mail,
  Phone,
  Key,
  UserCog,
  FileText,
  MessageCircle,
  UsersRound,
  Search,
  DollarSign,
  CreditCard,
  ShoppingCart,
  Wallet,
  Store,
  Percent,
  FileBarChart,
  Copy,
  PiggyBank,
  Coins,
  Network,
  TrendingDown,
  Globe,
  Ban,
  List,
  Timer,
  BarChart,
  ClipboardCheck,
  Banknote,
  ArrowLeftRight,
  ArrowDownToLine,
  ArrowUpFromLine,
  Hash,
  Code,
  UserCheck,
  Lock,
  Image,
  MapPin,
  SmartphoneNfc,
  AlertCircle,
  Grid3x3,
  Radio,
  Megaphone,
  LayoutGrid,
  Award,
  Bell,
  MailOpen,
  Send,
  Calendar,
  Mic,
  FileEdit,
  Minus,
  Plus,
  Gift,
  Ticket,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Truck,
  ClipboardList,
  History,
} from "lucide-react"

interface AdminSidebarV2Props {
  currentModule: string
  currentPage: string
  onNavigate: (path: string) => void
}

// 定义菜单项类型
type MenuItem = { path: string; icon: any; label: string }
type MenuGroup = { group: string; icon?: any; items: MenuItem[] }
type MenuConfig = MenuItem[] | MenuGroup[]

// 定义每个模块的二级菜单
const moduleMenus: Record<string, MenuConfig> = {
  "crypto": [
    { path: "/admin/crypto/business-report", icon: FileBarChart, label: "经营报表" },
    { path: "/admin/crypto/crypto-users", icon: Users, label: "Crypto用户管理" },
    { path: "/admin/crypto/currencies", icon: DollarSign, label: "币种管理" },
    { path: "/admin/crypto/addresses", icon: Network, label: "地址管理" },
    { path: "/admin/crypto/custodial-wallets", icon: Wallet, label: "供应商接口" },
    { path: "/admin/crypto/onchain-deposit-orders", icon: ArrowLeftRight, label: "Crypto出入金订单" },
    { path: "/admin/crypto/freeze-records", icon: Lock, label: "冻解记录" },
    { path: "/admin/crypto/otc-suppliers", icon: ArrowLeftRight, label: "OTC供应商" },
    { path: "/admin/crypto/otc-orders", icon: List, label: "OTC订单" },
    { path: "/admin/crypto/spot-market", icon: TrendingUp, label: "现货市场管理" },
    { path: "/admin/crypto/spot-market-maker", icon: Activity, label: "现货做市商" },
    { path: "/admin/crypto/order-management", icon: ClipboardList, label: "委托管理" },
    { path: "/admin/crypto/kline-management", icon: BarChart3, label: "K线管理" },
    { path: "/admin/crypto/trade-history", icon: History, label: "成交记录" },
  ],
  permissions: [
    { path: "/admin/permissions/business-lines", icon: BarChart3, label: "业务线" },
    { path: "/admin/permissions/audit-config", icon: FileCheck, label: "审核配置" },
    { path: "/admin/permissions/staff-management", icon: Users, label: "人员管理" },
    { path: "/admin/permissions/user-permissions", icon: Key, label: "用户权限" },
    { path: "/admin/permissions/system-management", icon: Settings, label: "系统管理" },
    { path: "/admin/permissions/system-logs", icon: FileText, label: "系统日志" },
  ],
  marketing: [
    {
      group: "用户管理",
      icon: Users,
      items: [
        { path: "/admin/marketing/registration-whitelist", icon: UserCheck, label: "注册白名单" },
        { path: "/admin/marketing/kyc-limits", icon: Lock, label: "KYC限额管理" },
        { path: "/admin/marketing/spot-rates", icon: Percent, label: "现货费率管理" },
      ]
    },
    {
      group: "运营配置",
      icon: Settings,
      items: [
        { path: "/admin/marketing/web-registration-ads", icon: Image, label: "WEB注册页广告" },
        { path: "/admin/marketing/country-region", icon: MapPin, label: "国家/地区管理" },
        { path: "/admin/marketing/2fa-scenarios", icon: SmartphoneNfc, label: "2FA场景配置" },
        { path: "/admin/marketing/prompt-config", icon: AlertCircle, label: "提示语配置" },
        { path: "/admin/marketing/diamond-zone", icon: Grid3x3, label: "金刚区管理" },
        { path: "/admin/marketing/official-channels", icon: Radio, label: "官方渠道配置" },
        { path: "/admin/marketing/ad-placement", icon: Megaphone, label: "广告位管理" },
        { path: "/admin/marketing/ranking-config", icon: LayoutGrid, label: "榜单配置" },
        { path: "/admin/marketing/homepage-popup", icon: Award, label: "首页弹窗" },
        { path: "/admin/marketing/push-notifications", icon: Bell, label: "Push通知" },
        { path: "/admin/marketing/banner-management", icon: Image, label: "Banner管理" },
        { path: "/admin/marketing/in-app-messages", icon: MessageSquare, label: "站内配置" },
        { path: "/admin/operations/market-config", icon: TrendingUp, label: "行情配置" },
      ]
    },
    {
      group: "内容管理",
      icon: FileText,
      items: [
        { path: "/admin/marketing/email-content", icon: MailOpen, label: "邮件内容" },
        { path: "/admin/marketing/email-send", icon: Send, label: "邮件发送" },
        { path: "/admin/marketing/honor-management", icon: Award, label: "荣誉管理" },
        { path: "/admin/marketing/schedule-management", icon: Calendar, label: "日程安排管理" },
        { path: "/admin/marketing/voice-materials", icon: Mic, label: "语音发料" },
        { path: "/admin/marketing/message-send", icon: Send, label: "消息发送" },
        { path: "/admin/marketing/create-email", icon: FileEdit, label: "创建邮件" },
      ]
    },
    {
      group: "运营活动",
      icon: Activity,
      items: [
        { path: "/admin/marketing/deduction-details", icon: Minus, label: "抵扣金明细" },
        { path: "/admin/marketing/trial-details", icon: Plus, label: "体验金明细" },
        { path: "/admin/marketing/user-deduction", icon: DollarSign, label: "用户抵扣金" },
        { path: "/admin/marketing/user-trial", icon: Gift, label: "用户体验金" },
        { path: "/admin/marketing/coupon-config", icon: Ticket, label: "卡券配置" },
      ]
    },
    {
      group: "运营报表",
      icon: BarChart3,
      items: [
        { path: "/admin/operations/dashboard", icon: BarChart3, label: "运营报表" },
        { path: "/admin/operations/activities", icon: Activity, label: "运营活动" },
        { path: "/admin/operations/audit", icon: FileCheck, label: "审核监控" },
        { path: "/admin/operations/funds", icon: Wallet, label: "资金流水" },
        { path: "/admin/operations/orders", icon: ShoppingCart, label: "订单监控" },
        { path: "/admin/operations/retention", icon: Users, label: "留存分析" },
        { path: "/admin/operations/risk", icon: AlertCircle, label: "风控预警" },
      ]
    },
    {
      group: "运维管理",
      icon: Settings,
      items: [
        { path: "/admin/system/permissions", icon: Key, label: "权限管理" },
        { path: "/admin/system/roles", icon: UserCog, label: "角色管理" },
        { path: "/admin/system/users", icon: Users, label: "用户管理" },
        { path: "/admin/system/audit-config", icon: Settings, label: "审核配置" },
        { path: "/admin/system/app", icon: Settings, label: "APP管理" },
        { path: "/admin/system/operations", icon: Settings, label: "运维管理" },
        { path: "/admin/system/maintenance-plan", icon: Timer, label: "维护计划配置" },
        { path: "/admin/system/maintenance-whitelist", icon: ClipboardCheck, label: "维护白名单管理" },
      ]
    },
  ],
  users: [
    { path: "/admin/users/all", icon: Users, label: "用户总表" },
    { path: "/admin/users/blacklist", icon: UserX, label: "黑名单管理" },
    { path: "/admin/users/deleted", icon: Trash2, label: "已删除账户" },
    { path: "/admin/users/behavior", icon: MousePointerClick, label: "用户行为" },
    { path: "/admin/users/api-review", icon: CheckCircle, label: "API审核" },
    { path: "/admin/users/api-manage", icon: Settings, label: "API管理" },
    { path: "/admin/users/sms-logs", icon: MessageSquare, label: "短信日志" },
    { path: "/admin/users/email-logs", icon: Mail, label: "邮箱日志" },
    { path: "/admin/users/f2a-review", icon: Shield, label: "F2A审核" },
    { path: "/admin/users/voice-logs", icon: Phone, label: "语音日志" },
    { path: "/admin/users/account-types", icon: UserCog, label: "账户类型管理" },
    { path: "/admin/users/special-accounts", icon: Key, label: "特殊账户管理" },
    { path: "/admin/users/kyc-review", icon: FileCheck, label: "KYC审核" },
    { path: "/admin/users/kyc-records", icon: FileText, label: "KYC审核记录" },
  ],
  im: [
    { path: "/admin/im/accounts", icon: Users, label: "账号管理" },
    { path: "/admin/im/groups", icon: UsersRound, label: "群组管理" },
    { path: "/admin/im/messages", icon: MessageCircle, label: "消息管理" },
    { path: "/admin/im/logs", icon: FileText, label: "日志查询" },
    { path: "/admin/im/review", icon: CheckCircle, label: "审核管理" },
    { path: "/admin/im/auto-join", icon: Zap, label: "自动加群" },
    { path: "/admin/im/group-search", icon: Search, label: "群搜索" },
  ],
  social: [
    { path: "/admin/social", icon: MessageCircle, label: "社交管理" },
  ],
  c2c: [
    { path: "/admin/c2c/c2c", icon: DollarSign, label: "C2C管理" },
    { path: "/admin/c2c/c2c-orders", icon: ShoppingCart, label: "C2C订单" },
    { path: "/admin/c2c/quick-config", icon: Settings, label: "法币快捷配置" },
    { path: "/admin/c2c/quick-orders", icon: List, label: "法币快捷订单" },
    { path: "/admin/c2c/otc-config", icon: Settings, label: "OTC配置" },
    { path: "/admin/c2c/otc-orders", icon: ShoppingCart, label: "OTC订单" },
  ],
  escrow: [
    { path: "/admin/escrow/rules", icon: Settings, label: "担保规则配置" },
    { path: "/admin/escrow/records", icon: FileText, label: "担保记录" },
    { path: "/admin/escrow/rankings", icon: BarChart, label: "信誉担保排名" },
    { path: "/admin/escrow/groups", icon: UsersRound, label: "担保群管理" },
    { path: "/admin/escrow/arbitrators", icon: Shield, label: "仲裁员管理" },
    { path: "/admin/escrow/complaints", icon: FileCheck, label: "仲裁投诉记录" },
  ],
  ucard: [
    { path: "/admin/ucard/users", icon: Users, label: "U卡用户管理" },
    { path: "/admin/ucard/suppliers", icon: Store, label: "U卡供应商" },
    { path: "/admin/ucard/config", icon: Settings, label: "U卡基础配置" },
    { path: "/admin/ucard/number-segments", icon: Hash, label: "U卡号段管理" },
    { path: "/admin/ucard/applications", icon: CreditCard, label: "U卡开卡记录" },
    { path: "/admin/ucard/shipping-orders", icon: Truck, label: "实体卡寄送订单" },
    { path: "/admin/ucard/recharge-records", icon: ArrowDownToLine, label: "U卡划转兑换" },
    { path: "/admin/ucard/transactions", icon: ShoppingCart, label: "U卡消费记录" },
  ],
  spot: [
    { path: "/admin/spot/coins", icon: Coins, label: "币种管理" },
    { path: "/admin/spot/networks", icon: Network, label: "网络管理" },
    { path: "/admin/spot/markets", icon: TrendingUp, label: "市场管理" },
    { path: "/admin/spot/market-makers", icon: Users, label: "做市账户" },
    { path: "/admin/spot/sectors", icon: BarChart, label: "板块管理" },
    { path: "/admin/spot/restricted-countries", icon: Ban, label: "交易受限国家" },
    { path: "/admin/spot/whitelist", icon: CheckCircle, label: "用户白名单" },
    { path: "/admin/spot/orders", icon: List, label: "委托管理" },
    { path: "/admin/spot/kline", icon: BarChart, label: "K线管理" },
    { path: "/admin/spot/transactions", icon: ShoppingCart, label: "成交记录" },
  ],
  futures: [
    { path: "/admin/futures/config/sectors", icon: Settings, label: "合约配置" },
    { path: "/admin/futures/special-accounts", icon: Key, label: "特殊账户管理" },
    { path: "/admin/futures/positions", icon: BarChart, label: "持仓管理" },
  ],
  copytrade: [
    { path: "/admin/copytrade", icon: Copy, label: "跟单管理" },
  ],
  finance: [
    { path: "/admin/finance", icon: PiggyBank, label: "理财管理" },
  ],
  commission: [
    { path: "/admin/commission/futures", icon: Percent, label: "合约佣金" },
    { path: "/admin/commission/finance", icon: Percent, label: "理财佣金" },
    { path: "/admin/commission/ucard", icon: Percent, label: "U卡佣金" },
    { path: "/admin/commission/escrow", icon: Percent, label: "担保佣金" },
    { path: "/admin/commission/payment", icon: Percent, label: "支付佣金" },
  ],
  fiat: [
    { path: "/admin/fiat/reports", icon: FileBarChart, label: "经营报表" },
    { path: "/admin/fiat/users", icon: Users, label: "法币用户管理" },
    { path: "/admin/fiat/currencies", icon: DollarSign, label: "币种管理" },
    { path: "/admin/fiat/suppliers", icon: Store, label: "供应商管理" },
    { path: "/admin/fiat/interfaces", icon: Network, label: "接口管理" },
    { path: "/admin/fiat/channels", icon: Network, label: "通道管理" },
    { path: "/admin/fiat/commission", icon: Percent, label: "代理商管理" },
    { path: "/admin/fiat/orders", icon: ShoppingCart, label: "法币订单管理" },
    { path: "/admin/fiat/freeze-records", icon: Lock, label: "冻解记录" },
    { path: "/admin/fiat/exchange-orders", icon: Globe, label: "兑换订单" },
  ],
  orders: [
    { path: "/admin/orders/business-overview", icon: FileBarChart, label: "财务经营报表" },
    { path: "/admin/orders/crypto-assets", icon: BarChart3, label: "Crypto资产管理" },
    { path: "/admin/orders/fiat-assets", icon: BarChart3, label: "法币资产管理" },
    { path: "/admin/orders/ucard-assets", icon: CreditCard, label: "U卡资产管理" },
    { path: "/admin/orders/manual-credit", icon: DollarSign, label: "手动开分" },
    { path: "/admin/orders/manual-transfer", icon: ArrowLeftRight, label: "手动转账" },
    { path: "/admin/orders/large-withdrawal-audit", icon: ShieldCheck, label: "大额提币审核" },
  ],
  system: [
    {
      group: "用户管理",
      icon: Users,
      items: [
        { path: "/admin/system/users", icon: Users, label: "用户管理" },
        { path: "/admin/system/blacklist", icon: Ban, label: "黑名单管理" },
        { path: "/admin/system/deleted-accounts", icon: Trash2, label: "已删除账户" },
        { path: "/admin/system/user-behavior", icon: Activity, label: "用户行为" },
        { path: "/admin/system/api-audit", icon: CheckCircle, label: "API审核" },
        { path: "/admin/system/api-management", icon: Code, label: "API管理" },
        { path: "/admin/system/sms-logs", icon: Phone, label: "短信日志" },
        { path: "/admin/system/email-logs", icon: Mail, label: "邮箱日志" },
        { path: "/admin/system/2fa-reset-audit", icon: Shield, label: "重置2FA审核" },
        { path: "/admin/system/voice-logs", icon: Mic, label: "语音日志" },
      ]
    },
    {
      group: "特殊账户管理",
      icon: UserCog,
      items: [
        { path: "/admin/system/account-types", icon: UserCog, label: "账户类型管理" },
        { path: "/admin/system/special-accounts", icon: UserCheck, label: "特殊账户管理" },
      ]
    },
    {
      group: "实名认证",
      icon: FileCheck,
      items: [
        { path: "/admin/system/kyc-audit", icon: FileCheck, label: "KYC审核" },
        { path: "/admin/system/audit-history", icon: FileText, label: "审核历史" },
      ]
    },
    {
      group: "资金管理",
      icon: Wallet,
      items: [
        { path: "/admin/system/user-assets", icon: Wallet, label: "用户资产" },
        { path: "/admin/system/fund-records", icon: List, label: "资金记录" },
        { path: "/admin/system/deposit-fast-track", icon: ArrowDownToLine, label: "充值速进" },
        { path: "/admin/system/withdraw-fast-track", icon: ArrowUpFromLine, label: "提现速进" },
        { path: "/admin/system/small-withdraw", icon: Coins, label: "小额快速提现" },
        { path: "/admin/system/fund-freeze", icon: Lock, label: "资金冻结" },
        { path: "/admin/system/deposit-records", icon: ArrowDownToLine, label: "充值记录" },
        { path: "/admin/system/hot-wallet-balance", icon: Wallet, label: "热钱包余额" },
        { path: "/admin/system/withdraw-records", icon: ArrowUpFromLine, label: "提现记录" },
        { path: "/admin/system/deposit-credit-application", icon: FileCheck, label: "充值入账申请" },
        { path: "/admin/system/withdraw-audit", icon: CheckCircle, label: "提现审核" },
      ]
    },
  ],
}

interface AdminSidebarV2PropsExtended extends AdminSidebarV2Props {
  isOpen?: boolean
  onToggle?: () => void
}

export default function AdminSidebarV2({ currentModule, currentPage, onNavigate, isOpen = false, onToggle }: AdminSidebarV2PropsExtended) {
  const { theme } = useTheme()
  const [apiMenuData, setApiMenuData] = useState<UIMenuConfig | null>(null)
  const [isLoadingMenu, setIsLoadingMenu] = useState(true)
  
  // 从API获取菜单数据
  useEffect(() => {
    const loadMenu = async () => {
      try {
        setIsLoadingMenu(true)
        const apiData = await fetchMenu()
        if (apiData && apiData.length > 0) {
          const convertedMenu = convertMenuDataToUI(apiData)
          setApiMenuData(convertedMenu)
        }
      } catch (error) {
        console.error('Failed to load menu from API:', error)
        // API失败时使用硬编码菜单
        setApiMenuData(null)
      } finally {
        setIsLoadingMenu(false)
      }
    }
    
    loadMenu()
  }, [])
  
  // 优先使用API菜单，如果不存在则使用硬编码菜单
  const getMenuConfig = (): MenuConfig => {
    if (apiMenuData) {
      return apiMenuData as MenuConfig
    }
    return moduleMenus[currentModule] || []
  }
  
  const menuConfig = getMenuConfig()
  
  // 检查是否为分组菜单
  const isGroupedMenu = menuConfig.length > 0 && 'group' in menuConfig[0]
  
  // 管理分组的展开/收起状态，默认全部展开
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})
  
  // 当切换模块或菜单数据变化时，重新初始化展开状态
  useEffect(() => {
    const config = getMenuConfig()
    const isGrouped = config.length > 0 && 'group' in config[0]
    
    if (isGrouped) {
      const initialState: Record<string, boolean> = {}
      ;(config as MenuGroup[]).forEach(group => {
        initialState[group.group] = false // 默认全部折叠
      })
      setExpandedGroups(initialState)
    } else {
      setExpandedGroups({})
    }
  }, [currentModule, apiMenuData])
  
  // 切换分组展开/收起
  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }))
  }

  const handleNavigate = (path: string) => {
    onNavigate(path)
    if (onToggle && isOpen) {
      onToggle() // 移动端点击后关闭侧边栏
    }
  }
  
  const handleClose = () => {
    if (onToggle) {
      onToggle()
    }
  }
  
  // 渲染菜单项
  const renderMenuItem = (item: MenuItem) => {
    const Icon = item.icon
    const isActive = currentPage === item.path
    
    return (
      <button
        key={item.path}
        onClick={() => handleNavigate(item.path)}
        className={`
          w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
          ${isActive 
            ? 'bg-custom-green text-white'
            : theme === 'dark'
              ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }
        `}
      >
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{item.label}</span>
      </button>
    )
  }

  return (
    <>

      {/* 移动端二级菜单遮罩层 */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/50 z-45 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* 侧边栏 - 桌面端左侧，移动端右侧 */}
      <div className={`
        w-56 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} flex flex-col h-full
        md:relative md:translate-x-0 md:border-r
        fixed inset-y-0 right-0 z-50 transition-transform duration-300 shadow-2xl md:shadow-none
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* 移动端标题栏 */}
        <div className={`md:hidden flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            子菜单
          </h2>
          <button
            onClick={handleClose}
            className={`p-2 rounded-lg transition-colors ${
              theme === 'dark' 
                ? 'text-gray-400 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 二级菜单列表 */}
        <div className="flex-1 overflow-y-auto py-4">
          {isLoadingMenu ? (
            <div className="flex items-center justify-center py-8">
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                加载菜单中...
              </div>
            </div>
          ) : isGroupedMenu ? (
            // 分组菜单渲染
            <nav className="space-y-3 px-3">
              {(menuConfig as MenuGroup[] | UIMenuGroup[]).map((group, index) => {
                const isExpanded = expandedGroups[group.group]
                const ChevronIcon = isExpanded ? ChevronDown : ChevronRight
                const GroupIcon = group.icon
                
                return (
                  <div key={group.group || index}>
                    {/* 可点击的分组标题 */}
                    <button
                      onClick={() => toggleGroup(group.group)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm font-semibold rounded-md transition-colors ${
                        theme === 'dark' 
                          ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {GroupIcon && <GroupIcon className="w-4 h-4 flex-shrink-0" />}
                      <span className="flex-1 text-left">{group.group}</span>
                      <ChevronIcon className="w-4 h-4 flex-shrink-0" />
                    </button>
                    
                    {/* 分组菜单项 - 可折叠 */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="space-y-1 mt-2">
                        {group.items.map(item => renderMenuItem(item))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </nav>
          ) : (
            // 平面菜单渲染
            <nav className="space-y-1 px-3">
              {(menuConfig as MenuItem[] | UIMenuItem[]).map(item => renderMenuItem(item))}
            </nav>
          )}
        </div>
      </div>
    </>
  )
}
