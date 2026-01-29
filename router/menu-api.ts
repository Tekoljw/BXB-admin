// 菜单API服务
import apiRequest from '../utils/api-request-util';

export interface MenuOption {
  code: string;
  name: string;
  showWeights: number;
  verification: boolean;
  method: string;
  url: string;
  children: null;
  options: null;
}

export interface MenuItem {
  code: string;
  name: string;
  showWeights: number;
  verification: boolean;
  method: string;
  url: string;
  children: MenuItem[] | null;
  options: MenuOption[] | null;
}

const _menuPromiseByCode: Record<string, Promise<MenuItem[]>> = {};

/**
 * 根据 sys-code 获取菜单数据（同 sysCode 并发请求复用，避免 Strict Mode 等导致重复请求）
 * @param sysCode 系统代码，例如 'admin-user', 'admin-asset' 等
 * @returns 菜单项数组
 */
async function fetchMenu(sysCode: string = 'management'): Promise<MenuItem[]> {
  const key = sysCode;
  if (_menuPromiseByCode[key]) return _menuPromiseByCode[key];
  const p = (async () => {
    try {
      const response = await apiRequest.get<MenuItem[]>(
        '/v1/admin/admin/profile/menu',
        {
          headers: {
            'Sys-Code': sysCode,
          },
        }
      );
      return response || [];
    } catch (error) {
      console.error(`Failed to fetch menu for sys-code ${sysCode}:`, error);
      return [];
    } finally {
      delete _menuPromiseByCode[key];
    }
  })();
  _menuPromiseByCode[key] = p;
  return p;
}

export { fetchMenu, type MenuItem, type MenuOption };
