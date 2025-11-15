"use client"

import React from "react"
import { useTheme } from "@/contexts/theme-context"
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
} from "lucide-react"

interface AdminSidebarV2Props {
  currentModule: string
  currentPage: string
  onNavigate: (path: string) => void
}

// 定义每个模块的二级菜单
const moduleMenus: Record<string, Array<{ path: string; icon: any; label: string }>> = {
  "crypto": [
    { path: "/admin/crypto/business-report", icon: FileBarChart, label: "经营报表" },
    { path: "/admin/crypto/wallet-api-business", icon: Code, label: "Crypto用户管理" },
    { path: "/admin/crypto/currencies", icon: DollarSign, label: "币种管理" },
    { path: "/admin/crypto/addresses", icon: Network, label: "地址管理" },
    { path: "/admin/crypto/custodial-wallets", icon: Wallet, label: "供应商接口" },
    { path: "/admin/crypto/onchain-deposit-orders", icon: ArrowLeftRight, label: "Crypto出入金订单" },
    { path: "/admin/crypto/otc-suppliers", icon: ArrowLeftRight, label: "OTC供应商" },
    { path: "/admin/crypto/otc-orders", icon: List, label: "OTC订单" },
  ],
  permissions: [
    { path: "/admin/permissions/business-lines", icon: BarChart3, label: "业务线" },
    { path: "/admin/permissions/audit-config", icon: FileCheck, label: "审核配置" },
    { path: "/admin/permissions/staff-management", icon: Users, label: "人员管理" },
    { path: "/admin/permissions/user-permissions", icon: Key, label: "用户权限" },
    { path: "/admin/permissions/system-management", icon: Settings, label: "系统管理" },
    { path: "/admin/permissions/system-logs", icon: FileText, label: "系统日志" },
  ],
  operations: [
    { path: "/admin/operations/registration-whitelist", icon: UserCheck, label: "注册白名单" },
    { path: "/admin/operations/kyc-limits", icon: Lock, label: "KYC限额管理" },
    { path: "/admin/operations/spot-rates", icon: Percent, label: "现货费率管理" },
    { path: "/admin/operations/web-registration-ads", icon: Image, label: "WEB注册页广告" },
    { path: "/admin/operations/country-region", icon: MapPin, label: "国家/地区管理" },
    { path: "/admin/operations/2fa-scenarios", icon: SmartphoneNfc, label: "2FA场景配置" },
    { path: "/admin/operations/prompt-config", icon: AlertCircle, label: "提示语配置" },
    { path: "/admin/operations/diamond-zone", icon: Grid3x3, label: "金刚区管理" },
    { path: "/admin/operations/official-channels", icon: Radio, label: "官方渠道配置" },
    { path: "/admin/operations/ad-placement", icon: Megaphone, label: "广告位管理" },
    { path: "/admin/operations/ranking-config", icon: LayoutGrid, label: "榜单配置" },
    { path: "/admin/operations/homepage-popup", icon: Award, label: "首页弹窗" },
    { path: "/admin/operations/push-notifications", icon: Bell, label: "Push通知" },
    { path: "/admin/operations/banner-management", icon: Image, label: "Banner管理" },
    { path: "/admin/operations/in-app-messages", icon: MessageSquare, label: "站内消息配置" },
    { path: "/admin/operations/email-content", icon: MailOpen, label: "邮件内容" },
    { path: "/admin/operations/email-send", icon: Send, label: "邮件发送" },
    { path: "/admin/operations/honor-management", icon: Award, label: "荣誉管理" },
    { path: "/admin/operations/schedule-management", icon: Calendar, label: "日程安排管理" },
    { path: "/admin/operations/voice-materials", icon: Mic, label: "语音发料" },
    { path: "/admin/operations/message-send", icon: Send, label: "消息发送" },
    { path: "/admin/operations/create-email", icon: FileEdit, label: "创建邮件" },
    { path: "/admin/operations/deduction-details", icon: Minus, label: "抵扣金明细" },
    { path: "/admin/operations/trial-details", icon: Plus, label: "体验金明细" },
    { path: "/admin/operations/user-deduction", icon: DollarSign, label: "用户抵扣金" },
    { path: "/admin/operations/user-trial", icon: Gift, label: "用户体验金" },
    { path: "/admin/operations/coupon-config", icon: Ticket, label: "卡券配置" },
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
    { path: "/admin/ucard/users", icon: Users, label: "U卡用户列表" },
    { path: "/admin/ucard/suppliers", icon: Store, label: "U卡供应商" },
    { path: "/admin/ucard/config", icon: Settings, label: "U卡基础配置" },
    { path: "/admin/ucard/number-segments", icon: Hash, label: "U卡号段管理" },
    { path: "/admin/ucard/applications", icon: CreditCard, label: "U卡开卡记录" },
    { path: "/admin/ucard/recharge-records", icon: ArrowDownToLine, label: "U卡充值记录" },
    { path: "/admin/ucard/transactions", icon: ShoppingCart, label: "U卡消费记录" },
    { path: "/admin/ucard/asset-changes", icon: Activity, label: "U卡账户划转记录" },
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
    { path: "/admin/fiat/merchants", icon: Users, label: "法币用户管理" },
    { path: "/admin/fiat/currencies", icon: DollarSign, label: "币种管理" },
    { path: "/admin/fiat/suppliers", icon: Store, label: "供应商管理" },
    { path: "/admin/fiat/interfaces", icon: Network, label: "接口管理" },
    { path: "/admin/fiat/channels", icon: Network, label: "通道管理" },
    { path: "/admin/fiat/commission", icon: Percent, label: "代理商管理" },
    { path: "/admin/fiat/orders", icon: ShoppingCart, label: "代收订单" },
    { path: "/admin/fiat/payout-orders", icon: TrendingDown, label: "代付订单" },
    { path: "/admin/fiat/exchange-orders", icon: Globe, label: "兑换订单" },
  ],
  orders: [
    { path: "/admin/orders/crypto-assets", icon: BarChart3, label: "Crypto资产管理" },
    { path: "/admin/orders/fiat-assets", icon: BarChart3, label: "法币资产管理" },
    { path: "/admin/orders/funds", icon: Wallet, label: "资金记录" },
    { path: "/admin/orders/usdt", icon: DollarSign, label: "USDT买卖记录" },
    { path: "/admin/orders/spot", icon: TrendingUp, label: "现货订单" },
    { path: "/admin/orders/futures", icon: TrendingDown, label: "合约订单" },
    { path: "/admin/orders/finance", icon: PiggyBank, label: "理财订单" },
    { path: "/admin/orders/ucard", icon: CreditCard, label: "U卡订单" },
    { path: "/admin/orders/escrow", icon: Shield, label: "担保记录" },
    { path: "/admin/orders/payment", icon: Banknote, label: "支付订单" },
  ],
  system: [
    { path: "/admin/system/permissions", icon: Key, label: "权限管理" },
    { path: "/admin/system/roles", icon: UserCog, label: "角色管理" },
    { path: "/admin/system/users", icon: Users, label: "用户管理" },
    { path: "/admin/system/audit-config", icon: Settings, label: "审核配置" },
    { path: "/admin/system/app", icon: Settings, label: "APP管理" },
    { path: "/admin/system/operations", icon: Settings, label: "运维管理" },
    { path: "/admin/system/maintenance-plan", icon: Timer, label: "维护计划配置" },
    { path: "/admin/system/maintenance-whitelist", icon: ClipboardCheck, label: "维护白名单管理" },
  ],
}

interface AdminSidebarV2PropsExtended extends AdminSidebarV2Props {
  isOpen?: boolean
  onToggle?: () => void
}

export default function AdminSidebarV2({ currentModule, currentPage, onNavigate, isOpen = false, onToggle }: AdminSidebarV2PropsExtended) {
  const { theme } = useTheme()
  
  const menuItems = moduleMenus[currentModule] || []

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
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
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
            })}
          </nav>
        </div>
      </div>
    </>
  )
}
