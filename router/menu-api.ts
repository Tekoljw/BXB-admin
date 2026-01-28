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

/**
 * 根据 sys-code 获取菜单数据
 * @param sysCode 系统代码，例如 'admin-user', 'admin-asset' 等
 * @returns 菜单项数组
 */
async function fetchMenu(sysCode: string = 'management'): Promise<MenuItem[]> {
  try {
    // 菜单接口返回：{ code: 0, msg: "Success.", data: MenuItem[] }
    // apiRequest.get 已经处理了响应，直接返回 data 部分
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
  }
}

export { fetchMenu, type MenuItem, type MenuOption };
