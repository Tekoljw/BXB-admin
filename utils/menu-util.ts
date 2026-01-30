// 菜单工具函数：将API数据转换为UI格式

import {
  FileBarChart,
  Wallet,
  DollarSign,
  ArrowLeftRight,
  ArrowDownToLine,
  ArrowUpFromLine,
  List,
  FileText,
  Settings,
  Users,
  Shield,
  CheckCircle,
  Mail,
  Phone,
  Key,
  UserCog,
  MessageSquare,
  MessageCircle,
  Search,
  ShoppingCart,
  Store,
  Percent,
  Copy,
  PiggyBank,
  Coins,
  Network,
  TrendingDown,
  Globe,
  Ban,
  Timer,
  BarChart,
  ClipboardCheck,
  Banknote,
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
  ShieldCheck,
  Truck,
  ClipboardList,
  History,
  Activity,
  TrendingUp,
  Zap,
  FileCheck,
  UserX,
  Trash2,
  MousePointerClick,
  Eye,
  Upload,
  RefreshCw,
} from "lucide-react"
import type { MenuItem as ApiMenuItem } from "../router/menu-api"

// 图标映射表：根据菜单code映射到对应的图标
const iconMap: Record<string, any> = {
  // 财务管理相关
  management: FileBarChart,
  fundManagement: Wallet,
  fundTransfer: ArrowLeftRight,
  list: List,
  addOrReduce: Plus,
  export: ArrowDownToLine,
  addOrSubApplyList: History,
  view: Eye,
  historyList: History,
  transfer: ArrowLeftRight,
  transferIn: ArrowDownToLine,
  transferOut: ArrowUpFromLine,
  fundTransUpload: Upload,
  fundTransList: List,
  transferHistoryExport: ArrowDownToLine,
  fundTrans: RefreshCw,
  applyExcel: FileText,

  // 法币模块二级菜单（/admin/fiat/*）
  reports: FileBarChart,
  users: Users,
  currencies: DollarSign,
  suppliers: Store,
  interfaces: Network,
  channels: Network,
  commission: Percent,
  orders: ShoppingCart,
  'freeze-records': Lock,
  'exchange-orders': Globe,
  
  // 通用图标
  default: FileText,
}

// 默认图标
const DefaultIcon = FileText

// 根据code获取图标
function getIconByCode(code: string): any {
  return iconMap[code] || DefaultIcon
}

// 根据菜单code生成路径
function generatePathFromCode(code: string, module?: string, parentCode?: string): string {
  // 如果指定了模块，直接使用模块路径拼接code
  if (module) {
    return `/admin/${module}/${code}`
  }
  
  // 路径映射表：根据菜单code映射到实际路由路径（仅用于没有指定模块的情况）
  const pathMap: Record<string, string> = {
    // 财务管理相关
    management: '/admin/orders/finance',
    fundManagement: '/admin/orders/fund-management',
    fundTransfer: '/admin/orders/fund-transfer',
    
    // 资金增减相关
    addOrReduce: '/admin/orders/fund-management/add-or-reduce',
    addOrSubApplyList: '/admin/orders/fund-management/apply-list',
    
    // 资金划转相关
    transfer: '/admin/orders/fund-transfer/transfer',
    transferIn: '/admin/orders/fund-transfer/transfer-in',
    transferOut: '/admin/orders/fund-transfer/transfer-out',
    fundTransList: '/admin/orders/fund-transfer/list',
    transferHistoryExport: '/admin/orders/fund-transfer/export',
  }
  
  if (pathMap[code]) {
    return pathMap[code]
  }
  
  // 如果没有映射，根据parentCode生成路径
  if (parentCode) {
    // 如果parentCode有映射，使用父级路径
    const parentPath = pathMap[parentCode] || `/admin/${parentCode}`
    return `${parentPath}/${code}`
  }
  
  // 默认路径
  return `/admin/${code}`
}

// UI菜单项类型
export type UIMenuItem = { path: string; icon: any; label: string }
export type UIMenuGroup = { group: string; icon?: any; items: UIMenuItem[] }
export type UIMenuConfig = UIMenuItem[] | UIMenuGroup[]

// 将API菜单项转换为UI菜单项
function convertApiMenuItemToUI(apiItem: ApiMenuItem, module?: string, parentCode?: string): UIMenuItem {
  return {
    path: generatePathFromCode(apiItem.code, module, parentCode),
    icon: getIconByCode(apiItem.code),
    label: apiItem.name,
  }
}

// 转换API菜单数据为UI格式
export function convertMenuDataToUI(apiMenuData: ApiMenuItem[], module?: string): UIMenuConfig {
  const groups: UIMenuGroup[] = []
  const flatItems: UIMenuItem[] = []
  
  for (const item of apiMenuData) {
    // 如果有children，转换为分组
    if (item.children && item.children.length > 0) {
      const group: UIMenuGroup = {
        group: item.name,
        icon: getIconByCode(item.code),
        items: item.children.map(child => convertApiMenuItemToUI(child, module, item.code)),
      }
      groups.push(group)
    } else {
      // 没有children，直接添加为平面项
      flatItems.push(convertApiMenuItemToUI(item, module))
    }
  }
  
  // 如果有分组，返回分组格式；否则返回平面格式
  if (groups.length > 0) {
    return groups
  }
  return flatItems
}

// 根据模块获取菜单（用于兼容现有代码）
export function getMenuByModule(module: string, apiMenuData: ApiMenuItem[]): UIMenuConfig {
  // 根据模块过滤菜单
  // 这里可以根据实际需求进行过滤
  return convertMenuDataToUI(apiMenuData, module)
}
