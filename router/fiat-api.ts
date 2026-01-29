/**
 * 法币币种管理API服务
 * 
 * 根据法币管理模块 API 接口文档实现
 * 文档版本: 1.0.0
 * 最后更新: 2026-01-29
 * 
 * 基础说明:
 * - 所有接口需要在请求头中携带认证信息: Authorization: Bearer <token>
 * - 统一响应格式: { code: 0, msg: "success", data: {}, sign: null }
 * - 分页响应格式: { code: 0, msg: "success", data: { records: [], total: 100, current: 1, hasNext: true } }
 */
import { storageUtils } from '../utils/storage-util';

export interface FiatCurrency {
  id: number;
  currencyCode: string;
  buyRate: number;
  sellRate: number;
  avatar?: string;
  isShow: boolean;
  isUserShow: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  records: T[];
  total: number;
  current: number;
  hasNext: boolean;
}

export interface GetFiatListParams {
  currencyCode?: string;
  current?: number;
  size?: number;
}

export interface CreateFiatRequest {
  currencyCode: string;
  buyRate: number;
  sellRate: number;
  avatar?: string;
  isShow?: boolean;
  isUserShow?: boolean;
}

export interface UpdateFiatRequest {
  currencyCode: string;
  buyRate: number;
  sellRate: number;
  avatar?: string;
  isShow?: boolean;
  isUserShow?: boolean;
  sortOrder?: number; // 排序字段（可选，用于部分更新）
}

class FiatAPI {
  private getPaymentApiBaseUrl(): string {
    // 文档中的 base URL 是 http://pay.ubtai.biz/manager
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

    // 支持 AbortController
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

  // GET /api/wallet/fiat | 权限：ENT_C_FIATS_LIST
  async getFiatList(params?: GetFiatListParams & { signal?: AbortSignal }): Promise<PaginatedResponse<FiatCurrency>> {
    const queryParams = new URLSearchParams();
    
    if (params?.currencyCode) {
      queryParams.append('currencyCode', params.currencyCode);
    }
    if (params?.current !== undefined) {
      queryParams.append('current', params.current.toString());
    }
    if (params?.size !== undefined) {
      queryParams.append('size', params.size.toString());
    }

    const queryString = queryParams.toString();
    const url = `/api/wallet/fiat${queryString ? `?${queryString}` : ''}`;
    
    return await this.paymentApiRequest<PaginatedResponse<FiatCurrency>>(url, {
      signal: params?.signal
    });
  }

  // GET /api/wallet/fiat/{fiatId} | 权限：ENT_C_FIATS_LIST 或 ENT_C_FIATS_EDIT
  async getFiatDetail(fiatId: number): Promise<FiatCurrency> {
    return await this.paymentApiRequest<FiatCurrency>(`/api/wallet/fiat/${fiatId}`);
  }

  // POST /api/wallet/fiat | 权限：ENT_C_FIATS_ADD
  async createFiat(data: CreateFiatRequest): Promise<void> {
    return await this.paymentApiRequest<void>('/api/wallet/fiat', {
      method: 'POST',
      body: data,
    });
  }

  // PUT /api/wallet/fiat/{fiatId} | 权限：ENT_C_FIATS_EDIT
  async updateFiat(fiatId: number, data: UpdateFiatRequest): Promise<void> {
    return await this.paymentApiRequest<void>(`/api/wallet/fiat/${fiatId}`, {
      method: 'PUT',
      body: data,
    });
  }

  // POST /api/wallet/fiat/disable | 权限：ENT_C_FIATS_DEL
  async disableFiat(fiatId: string, status: boolean = true): Promise<void> {
    const formData = new URLSearchParams();
    formData.append('fiatId', fiatId);
    formData.append('status', status.toString());

    return await this.paymentApiRequest<void>('/api/wallet/fiat/disable', {
      method: 'POST',
      body: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  // DELETE /api/wallet/fiat/{fiatId} | 权限：ENT_C_FIATS_DEL
  async deleteFiat(fiatId: number): Promise<void> {
    return await this.paymentApiRequest<void>(`/api/wallet/fiat/${fiatId}`, {
      method: 'DELETE',
    });
  }
}

export const fiatApis = new FiatAPI();
