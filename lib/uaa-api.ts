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

export interface UserSysResponse {
  subSystems: SubSystem[];
}

export interface MenuResponse {
  menus: MenuItem[];
}

export interface MenuItem {
  menuId: number;
  menuCode: string;
  menuName: string;
  parentId: number;
  children?: MenuItem[];
  options?: MenuOption[];
}

export interface MenuOption {
  optionId: number;
  optionCode: string;
  optionName: string;
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
      const response = await apiRequest.get<UserSysResponse>(
        '/v1/admin/admin/profile/sys'
      );
      return response.subSystems || [];
    } catch (error) {
      console.warn('Failed to get user sys:', error);
      return [];
    }
  }

  async getMenu(sysCode: string): Promise<MenuItem[]> {
    const response = await apiRequest.get<MenuResponse>(
      '/v1/admin/admin/profile/menu',
      {
        headers: {
          'Sys-Code': sysCode,
        },
      }
    );
    return response.menus;
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
        access.add(`${sysCode}.menu.${menu.menuCode}`);

        if (menu.options) {
          menu.options.forEach((option) => {
            access.add(`${sysCode}.menu.${menu.menuCode}.${option.optionCode}`);
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
      const allAccess = new Set<string>();
      
      // 排除旧系统
      const builtInSystems = (subSystems || []).filter(
        (sys) => !sys.sysCode.includes('old')
      );

      for (const subSystem of builtInSystems) {
        try {
          const menus = await this.getMenu(subSystem.sysCode);
          const access = this.buildAccessSet(menus, subSystem.sysCode);
          access.forEach((perm) => allAccess.add(perm));
        } catch (error) {
          console.warn(`Failed to get menu for ${subSystem.sysCode}:`, error);
        }
      }
      const userInfo: UserInfo = {
        sysUserId: tokenInfo.sysUserId,
        userId: tokenInfo.userId,
        userName: tokenInfo.userName,
        exp: tokenInfo.exp,
        lang,
        accessToken,
        subSystems,
        access: allAccess,
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
