// 模块映射工具：sysCode 到模块ID和图标的映射
import {
  BarChart3,
  Users,
  MessageSquare,
  Share2,
  DollarSign,
  Shield,
  CreditCard,
  TrendingUp,
  Copy,
  PiggyBank,
  Percent,
  Wallet,
  Store,
  FileText,
  FileCheck,
  Settings,
  Repeat,
  Activity,
  LineChart,
} from "lucide-react"
import type { SubSystem } from "../router/auth-api"

// sysCode 到模块ID的映射
export const sysCodeToModuleIdMap: Record<string, string> = {
  'admin-auth': 'permissions',
  'admin-user': 'users',
  'admin-im': 'im',
  'admin-spot': 'spot',
  'admin-futures': 'futures',
  'admin-earn': 'finance',
  'admin-invite': 'commission',
  'admin-fiat-deposit': 'fiat',
  'admin-operation': 'marketing',
  'admin-ops': 'system',
  'admin-ubcard': 'ucard',
  'admin-asset': 'orders',
  'admin-crypto': 'crypto',
  'admin-binaryOptions': 'options',
  'management': 'orders', // 默认值
}

// 模块ID到sysCode的反向映射
export const moduleIdToSysCodeMap: Record<string, string> = {
  permissions: 'admin-auth',
  users: 'admin-user',
  im: 'admin-im',
  spot: 'admin-spot',
  futures: 'admin-futures',
  finance: 'admin-earn',
  commission: 'admin-invite',
  fiat: 'admin-fiat-deposit',
  operations: 'admin-operation',
  marketing: 'admin-operation',
  system: 'admin-ops',
  ucard: 'admin-ubcard',
  orders: 'admin-asset',
  crypto: 'admin-crypto',
  options: 'admin-binaryOptions',
}

// sysCode 到图标的映射
export const sysCodeToIconMap: Record<string, any> = {
  'admin-auth': Shield,
  'admin-user': Users,
  'admin-im': MessageSquare,
  'admin-spot': TrendingUp,
  'admin-futures': TrendingUp,
  'admin-earn': PiggyBank,
  'admin-invite': Percent,
  'admin-fiat-deposit': Store,
  'admin-operation': Activity,
  'admin-ops': FileCheck,
  'admin-ubcard': CreditCard,
  'admin-asset': Wallet,
  'admin-crypto': Repeat,
  'admin-binaryOptions': LineChart,
  'management': Wallet, // 默认值
}

// 默认图标
const DefaultIcon = Settings

/**
 * 根据 sysCode 获取模块ID
 */
export function getModuleIdBySysCode(sysCode: string): string {
  return sysCodeToModuleIdMap[sysCode] || sysCode
}

/**
 * 根据模块ID获取 sysCode
 */
export function getSysCodeByModuleId(moduleId: string): string {
  return moduleIdToSysCodeMap[moduleId] || 'management'
}

/**
 * 根据 sysCode 获取图标
 */
export function getIconBySysCode(sysCode: string): any {
  return sysCodeToIconMap[sysCode] || DefaultIcon
}

/**
 * 将 SubSystem 转换为导航模块格式
 */
export function convertSubSystemToModule(sys: SubSystem) {
  return {
    id: getModuleIdBySysCode(sys.sysCode),
    sysCode: sys.sysCode,
    label: sys.sysName,
    icon: getIconBySysCode(sys.sysCode),
    showWeights: sys.showWeights,
  }
}

/**
 * 根据 showWeights 排序系统列表
 */
export function sortSystemsByWeights(systems: SubSystem[]): SubSystem[] {
  return [...systems].sort((a, b) => (b.showWeights || 0) - (a.showWeights || 0))
}
