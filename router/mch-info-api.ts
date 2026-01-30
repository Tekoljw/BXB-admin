import { storageUtils } from '../utils/storage-util';

export interface MchApp {
  appId?: string;
  appName: string;
  appSecret?: string;
  mchNo?: string;
  state?: number;
}

export interface MchInfo {
  mchNo: string;
  mchName: string;
  mchShortName?: string;
  type: number;
  mchSandbox?: number;
  isvNo?: string;
  contactName?: string;
  contactTel?: string;
  contactEmail?: string;
  subscriberBalance?: number;
  fiatAssets?: number;
  cryptoAssets?: number;
  nftAssets?: number;
  fiatTransferAssets?: number;
  cryptoTransferAssets?: number;
  superiorsId?: string;
  coManageFundsRate?: number;
  coFundsDivideRate?: number;
  state: number;
  walletBindUserId: string;
  innerExchangeRate?: number;
  createdAt?: string;
  updatedAt?: string;
  loginUserName?: string;
  mchApp?: MchApp;
  frozenFiatAssets?: number;
  frozenCryptoAssets?: number;
  frozenAssets?: number;
}

export interface PaginatedResponse<T> {
  records: T[];
  total: number;
  current: number;
  hasNext: boolean;
}

export interface GetMchInfoListParams {
  mchNo?: string;
  isvNo?: string;
  mchName?: string;
  type?: number;
  state?: number;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateMchInfoRequest {
  mchName: string;
  mchShortName?: string;
  type: number;
  contactName?: string;
  contactTel?: string;
  contactEmail?: string;
  walletBindUserId: string;
  innerExchangeRate?: number;
  loginUserName: string;
  mchApp?: {
    appName: string;
    appSecret: string;
    state?: number;
  };
}

export interface UpdateMchInfoRequest {
  mchName?: string;
  mchShortName?: string;
  contactName?: string;
  contactTel?: string;
  contactEmail?: string;
  walletBindUserId: string;
  innerExchangeRate?: number;
  state?: number;
  resetPass?: boolean;
  defaultPass?: boolean;
  confirmPwd?: string;
  mchApp?: {
    appName?: string;
    appSecret?: string;
    state?: number;
  };
}

class MchInfoAPI {
  private getPaymentApiBaseUrl(): string {
    const paymentApiBaseUrl = process.env.NEXT_PUBLIC_PAYMENT_API_BASE_URL || 'http://pay.ubtai.biz/manager';
    if (typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return paymentApiBaseUrl;
    }
    return paymentApiBaseUrl;
  }

  private getAccessToken(): string {
    if (typeof window === 'undefined') return '';
    
    try {
      let token = storageUtils.disk.get<string>('accessToken', '');
      if (token) return token;

      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const trimmed = cookie.trim();
        if (!trimmed) continue;
        
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex === -1) continue;
        
        const cookieName = trimmed.substring(0, eqIndex).trim();
        const cookieValue = trimmed.substring(eqIndex + 1).trim();
        
        if (cookieName === 'token' && cookieValue) {
          try {
            const decoded = decodeURIComponent(cookieValue);
            return decoded || cookieValue;
          } catch {
            return cookieValue;
          }
        }
      }

      token = sessionStorage.getItem('accessToken') || '';
      if (token) return token;

      token = localStorage.getItem('admin.accessToken') || '';
      if (token) return token;
    } catch (e) {
      console.warn('Failed to get access token:', e);
    }
    
    return '';
  }

  private async paymentApiRequest<T>(
    url: string,
    options?: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      body?: any;
      headers?: Record<string, string>;
      signal?: AbortSignal;
    }
  ): Promise<T> {
    const baseURL = this.getPaymentApiBaseUrl();
    const fullUrl = `${baseURL}${url}`;
    
    const token = this.getAccessToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (options?.headers) {
      Object.assign(headers, options.headers);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Payment API Request]', options?.method || 'GET', fullUrl);
    }

    const requestOptions: RequestInit = {
      method: options?.method || 'GET',
      headers,
    };

    if (options?.signal) {
      requestOptions.signal = options.signal;
    }

    if (options?.body) {
      if (options.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
        requestOptions.body = options.body;
      } else {
        requestOptions.body = JSON.stringify(options.body);
      }
    }

    const response = await fetch(fullUrl, requestOptions);

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      
      if (text.trim().startsWith('<!') || text.includes('<html')) {
        console.error('Payment API returned HTML instead of JSON:', text.substring(0, 500));
        throw new Error(
          `支付系统API返回了HTML页面而不是JSON数据。请检查API地址是否正确: ${fullUrl}`
        );
      }
      
      throw new Error(`HTTP ${response.status}: ${text || response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      throw new Error(`期望JSON响应，但收到: ${contentType}`);
    }

    const result = await response.json();
    
    if (result.code !== undefined && result.code !== 0) {
      throw new Error(result.msg || '请求失败');
    }

    return result.data !== undefined ? result.data : result;
  }

  async getMchInfoList(params?: GetMchInfoListParams & { signal?: AbortSignal }): Promise<PaginatedResponse<MchInfo>> {
    const queryParams = new URLSearchParams();
    
    if (params?.mchNo) {
      queryParams.append('mchNo', params.mchNo);
    }
    if (params?.isvNo) {
      queryParams.append('isvNo', params.isvNo);
    }
    if (params?.mchName) {
      queryParams.append('mchName', params.mchName);
    }
    if (params?.type !== undefined) {
      queryParams.append('type', params.type.toString());
    }
    if (params?.state !== undefined) {
      queryParams.append('state', params.state.toString());
    }
    if (params?.pageNumber !== undefined) {
      queryParams.append('pageNumber', params.pageNumber.toString());
    }
    if (params?.pageSize !== undefined) {
      queryParams.append('pageSize', params.pageSize.toString());
    }

    const queryString = queryParams.toString();
    const url = `/api/mchInfo${queryString ? `?${queryString}` : ''}`;
    
    return await this.paymentApiRequest<PaginatedResponse<MchInfo>>(url, { signal: params?.signal });
  }

  async getMchInfoDetail(mchNo: string, options?: { signal?: AbortSignal }): Promise<MchInfo> {
    return await this.paymentApiRequest<MchInfo>(`/api/mchInfo/${mchNo}`, { signal: options?.signal });
  }

  async createMchInfo(data: CreateMchInfoRequest): Promise<void> {
    return await this.paymentApiRequest<void>('/api/mchInfo', {
      method: 'POST',
      body: data,
    });
  }

  async updateMchInfo(mchNo: string, data: UpdateMchInfoRequest): Promise<void> {
    return await this.paymentApiRequest<void>(`/api/mchInfo/${mchNo}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteMchInfo(mchNo: string): Promise<void> {
    return await this.paymentApiRequest<void>(`/api/mchInfo/${mchNo}`, {
      method: 'DELETE',
    });
  }
}

export const mchInfoApis = new MchInfoAPI();
