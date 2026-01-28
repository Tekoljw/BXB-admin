// UAA API服务：登录相关接口
import apiRequest from './api-request';
import { APIError } from './api-request';
import { storageUtils } from './storage';

export interface PublicKeyResponse {
  publicKey: string;
}

export interface LoginRequest {
  userName: string;
  password: string; // RSA加密
  verifyCode: number;
}

export interface LoginResponse {
  mfaId: string;
  multiFactorType: number;
  hasBind: boolean;
}

export interface GoogleQRCodeResponse {
  secret: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  sysUserId: number;
  userId: string;
  userName: string;
  exp: number;
  lang: string;
  accessToken: string;
  subSystems: SubSystem[];
  access: Set<string>;
}

export interface SubSystem {
  sysId: number;
  sysName: string;
  sysCode: string;
  showWeights: number;
}

export interface UserLangResponse {
  lang: string;
}

// 导航接口返回的数据结构：{ code: 0, msg: "Success.", data: SubSystem[] }
export type UserSysResponse = SubSystem[];

// 菜单接口返回的数据结构：{ code: 0, msg: "Success.", data: MenuItem[] }
export type MenuResponse = MenuItem[];

export interface MenuItem {
  code: string;
  name: string;
  showWeights: number;
  verification: boolean;
  method: string;
  url: string;
  children?: MenuItem[] | null;
  options?: MenuOption[] | null;
}

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

class UaaAPI {
  private request = apiRequest.newInstance().withUrlPrefix('v1/admin/admin-uaa');

  async getPublicKey(): Promise<string> {
    const response = await apiRequest.get<PublicKeyResponse>(
      '/v1/admin/admin-uaa/publicKey',
      { skipAuth: true }
    );
    return response.publicKey;
  }

  async login(userName: string, password: string): Promise<LoginResponse> {
    const data: LoginRequest = {
      userName,
      password,
      verifyCode: 0,
    };

    return await apiRequest.put<LoginResponse>(
      '/v1/admin/admin-uaa/signIn',
      data,
      { skipAuth: true }
    );
  }

  async getGoogleValidateQrCode(mfaId: string): Promise<GoogleQRCodeResponse> {
    return await apiRequest.get<GoogleQRCodeResponse>(
      '/v1/admin/admin-uaa/multiFactor/googleQRCode',
      {
        skipAuth: true,
        headers: {
          'mfa-id': mfaId,
        },
      }
    );
  }

  async doSetupGoogleValidate(
    mfaId: string,
    verifyCode: string
  ): Promise<GoogleQRCodeResponse> {
    return await apiRequest.post<GoogleQRCodeResponse>(
      '/v1/admin/admin-uaa/multiFactor/googleQRCode',
      {},
      {
        skipAuth: true,
        headers: {
          'mfa-id': mfaId,
          'verify-code': verifyCode,
        },
      }
    );
  }

  async googleValidate(
    mfaId: string,
    verifyCode: string
  ): Promise<TokenResponse> {
    return await apiRequest.post<TokenResponse>(
      '/v1/admin/admin-uaa/multiFactor/twoFactor',
      {},
      {
        skipAuth: true,
        headers: {
          'mfa-id': mfaId,
          'verify-code': verifyCode,
        },
      }
    );
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    return await apiRequest.put<TokenResponse>(
      '/v1/admin/admin-uaa/token',
      { refreshToken },
      { skipAuth: true }
    );
  }

  async getUserLang(): Promise<string> {
    const response = await apiRequest.get<UserLangResponse>(
      '/v1/admin/admin/profile/lang'
    );
    return response.lang;
  }

  async getUserSys(): Promise<SubSystem[]> {
    try {
      // 导航接口返回：{ code: 0, msg: "Success.", data: SubSystem[] }
      // apiRequest.get 已经处理了响应，直接返回 data 部分
      const response = await apiRequest.get<SubSystem[]>(
        '/v1/admin/admin/profile/sys'
      );
      return response || [];
    } catch (error) {
      console.warn('Failed to get user sys:', error);
      return [];
    }
  }

  async getMenu(sysCode: string): Promise<MenuItem[]> {
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
  }

  // 解析Token获取用户信息
  private parseToken(token: string): {
    userId: string;
    userName: string;
    sysUserId: number;
    exp: number;
  } | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }

      const payload = JSON.parse(atob(parts[1]));
      return {
        userId: payload.sub || payload.userId || '',
        userName: payload.userName || payload.name || '',
        sysUserId: payload.sysUserId || 0,
        exp: payload.exp || 0,
      };
    } catch (error) {
      console.error('Failed to parse token:', error);
      return null;
    }
  }

  private buildAccessSet(menus: MenuItem[], sysCode: string): Set<string> {
    const access = new Set<string>();

    const traverse = (items: MenuItem[]) => {
      items.forEach((menu) => {
        // 使用 menu.code 而不是 menu.menuCode（API 返回的字段名是 code）
        access.add(`${sysCode}.menu.${menu.code}`);

        if (menu.options) {
          menu.options.forEach((option) => {
            // 使用 option.code 而不是 option.optionCode（API 返回的字段名是 code）
            access.add(`${sysCode}.menu.${menu.code}.${option.code}`);
          });
        }

        if (menu.children) {
          traverse(menu.children);
        }
      });
    };

    traverse(menus);
    return access;
  }

  async queryCurrentUser(): Promise<UserInfo | null> {
    try {
      const refreshToken = storageUtils.disk.get<string>('refreshToken', '');
      if (!refreshToken) {
        return null;
      }

      let accessToken = storageUtils.disk.get<string>('accessToken', '');
      
      if (!accessToken) {
        try {
          const tokenResponse = await this.refreshToken(refreshToken);
          accessToken = tokenResponse.accessToken;
          storageUtils.disk.set('accessToken', tokenResponse.accessToken);
          if (tokenResponse.refreshToken) {
            storageUtils.disk.set('refreshToken', tokenResponse.refreshToken);
          }
        } catch (error) {
          storageUtils.disk.remove('accessToken');
          storageUtils.disk.remove('refreshToken');
          return null;
        }
      }

      const tokenInfo = this.parseToken(accessToken);
      if (!tokenInfo) {
        return null;
      }

      let lang = 'zh-CN';
      try {
        lang = await this.getUserLang();
        storageUtils.disk.set('lang', lang);
      } catch (error) {
        console.warn('Failed to get user lang:', error);
      }

      const subSystems = await this.getUserSys();
      
      // 排除旧系统
      const builtInSystems = (subSystems || []).filter(
        (sys) => !sys.sysCode.includes('old')
      );

      // 注意：不再在登录时遍历获取所有系统的菜单
      // 菜单应该在用户切换导航时按需获取（通过 Sys-Code 请求头）
      // 权限控制交给后端，前端只负责展示后端返回的菜单
      
      const userInfo: UserInfo = {
        sysUserId: tokenInfo.sysUserId,
        userId: tokenInfo.userId,
        userName: tokenInfo.userName,
        exp: tokenInfo.exp,
        lang,
        accessToken,
        subSystems: builtInSystems,
        access: new Set<string>(), // 权限由后端菜单接口控制，不再前端计算
      };

      return userInfo;
    } catch (error) {
      console.error('Failed to query current user:', error);
      return null;
    }
  }
}

// 导出单例
export const uaaApis = new UaaAPI();
