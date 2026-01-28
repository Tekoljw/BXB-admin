// 统一的菜单服务：支持根据模块或 sys-code 获取菜单
import { fetchMenu, type MenuItem } from './menu-api';
import { uaaApis, type SubSystem } from './uaa-api';

// 模块ID到sys-code的映射
const moduleToSysCodeMap: Record<string, string> = {
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
  orders: 'admin-asset', // 订单/资金管理可能对应资产管理系统
  // 默认值
  default: 'management',
};

/**
 * 根据模块ID获取对应的sys-code
 * @param moduleId 模块ID，例如 'permissions', 'users' 等
 * @returns sys-code，例如 'admin-auth', 'admin-user' 等
 */
export function getSysCodeByModule(moduleId: string): string {
  return moduleToSysCodeMap[moduleId] || moduleToSysCodeMap.default;
}

/**
 * 根据sys-code获取系统信息
 * @param sysCode 系统代码
 * @param systems 系统列表（可选，如果不提供则从API获取）
 * @returns 系统信息，如果不存在则返回null
 */
export async function getSystemBySysCode(
  sysCode: string,
  systems?: SubSystem[]
): Promise<SubSystem | null> {
  let systemList = systems;
  
  if (!systemList) {
    try {
      systemList = await uaaApis.getUserSys();
    } catch (error) {
      console.error('Failed to get system list:', error);
      return null;
    }
  }
  
  return systemList.find((sys) => sys.sysCode === sysCode) || null;
}

/**
 * 根据模块ID获取菜单
 * @param moduleId 模块ID
 * @returns 菜单项数组
 */
export async function getMenuByModule(moduleId: string): Promise<MenuItem[]> {
  const sysCode = getSysCodeByModule(moduleId);
  return fetchMenu(sysCode);
}

/**
 * 根据sys-code获取菜单
 * @param sysCode 系统代码
 * @returns 菜单项数组
 */
export async function getMenuBySysCode(sysCode: string): Promise<MenuItem[]> {
  return fetchMenu(sysCode);
}

/**
 * 获取所有可用系统的列表
 * @returns 系统列表
 */
export async function getAvailableSystems(): Promise<SubSystem[]> {
  try {
    return await uaaApis.getUserSys();
  } catch (error) {
    console.error('Failed to get available systems:', error);
    return [];
  }
}

/**
 * 根据路径获取对应的sys-code
 * @param path 路径，例如 '/admin/users/all'
 * @returns sys-code
 */
export function getSysCodeByPath(path: string): string {
  // 从路径中提取模块ID
  const pathParts = path.split('/').filter(Boolean);
  
  if (pathParts.length >= 2 && pathParts[0] === 'admin') {
    const moduleId = pathParts[1];
    return getSysCodeByModule(moduleId);
  }
  
  return moduleToSysCodeMap.default;
}
