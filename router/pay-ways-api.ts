import { storageUtils } from '../utils/storage-util';

export interface PayWay {
  wayCode: string;
  wayName?: string;
  ifCode?: string;
  currency?: string;
  payType?: string;
  ifRate?: number;
  basicFee?: number;
  minValue?: number;
  maxValue?: number;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  records: T[];
  total: number;
  current: number;
  hasNext: boolean;
}

export interface GetPayWaysParams {
  wayCode?: string;
  wayName?: string;
  currency?: string;
  ifCode?: string;
  payType?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreatePayWayRequest {
  wayCode: string;
  wayName?: string;
  ifCode?: string;
  currency?: string;
  payType?: string;
  ifRate?: number;
  basicFee?: number;
  minValue?: number;
  maxValue?: number;
}

export type UpdatePayWayRequest = Partial<CreatePayWayRequest>;

class PayWaysAPI {
  private getPaymentApiBaseUrl(): string {
    const paymentApiBaseUrl = process.env.NEXT_PUBLIC_PAYMENT_API_BASE_URL || 'http://pay.ubtai.biz/manager';
    if (
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ) {
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
    } catch {
      // ignore
    }

    return '';
  }

  private async paymentApiRequest<T>(
    url: string,
    options?: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      body?: any;
      signal?: AbortSignal;
    }
  ): Promise<T> {
    const baseURL = this.getPaymentApiBaseUrl();
    const fullUrl = `${baseURL}${url}`;

    const token = this.getAccessToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(fullUrl, {
      method: options?.method || 'GET',
      headers,
      body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: options?.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`HTTP ${response.status}: ${text || response.statusText}`);
    }

    const result = await response.json();
    if (result.code !== undefined && result.code !== 0) {
      throw new Error(result.msg || '请求失败');
    }
    return result.data !== undefined ? result.data : result;
  }

  async getPayWays(params?: GetPayWaysParams & { signal?: AbortSignal }): Promise<PaginatedResponse<PayWay>> {
    const qs = new URLSearchParams();
    if (params?.wayCode) qs.append('wayCode', params.wayCode);
    if (params?.wayName) qs.append('wayName', params.wayName);
    if (params?.currency) qs.append('currency', params.currency);
    if (params?.ifCode) qs.append('ifCode', params.ifCode);
    if (params?.payType) qs.append('payType', params.payType);
    if (params?.pageNumber !== undefined) qs.append('pageNumber', String(params.pageNumber));
    if (params?.pageSize !== undefined) qs.append('pageSize', String(params.pageSize));
    const q = qs.toString();
    return await this.paymentApiRequest<PaginatedResponse<PayWay>>(`/api/payWays${q ? `?${q}` : ''}`, {
      signal: params?.signal,
    });
  }

  async getPayWayDetail(wayCode: string, options?: { signal?: AbortSignal }): Promise<PayWay> {
    return await this.paymentApiRequest<PayWay>(`/api/payWays/${encodeURIComponent(wayCode)}`, {
      signal: options?.signal,
    });
  }

  async createPayWay(data: CreatePayWayRequest): Promise<void> {
    return await this.paymentApiRequest<void>('/api/payWays', { method: 'POST', body: data });
  }

  async updatePayWay(wayCode: string, data: UpdatePayWayRequest): Promise<void> {
    return await this.paymentApiRequest<void>(`/api/payWays/${encodeURIComponent(wayCode)}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deletePayWay(wayCode: string): Promise<void> {
    return await this.paymentApiRequest<void>(`/api/payWays/${encodeURIComponent(wayCode)}`, { method: 'DELETE' });
  }
}

export const payWaysApis = new PayWaysAPI();

