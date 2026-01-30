import { storageUtils } from '../utils/storage-util';

export interface PayProvider {
  providerNo: string;
  providerName: string;
  providerShortName?: string;
  type: number;
  contactName?: string;
  contactTel?: string;
  contactEmail?: string;
  state: number;
  remark?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  records: T[];
  total: number;
  current: number;
  hasNext: boolean;
}

export interface GetPayProviderListParams {
  providerNo?: string;
  providerName?: string;
  state?: number;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreatePayProviderRequest {
  providerName: string;
  providerShortName?: string;
  type: number;
  contactName?: string;
  contactTel?: string;
  contactEmail?: string;
  state?: number;
  remark?: string;
}

export interface UpdatePayProviderRequest {
  providerName?: string;
  providerShortName?: string;
  type?: number;
  contactName?: string;
  contactTel?: string;
  contactEmail?: string;
  state?: number;
  remark?: string;
}

class PayProviderAPI {
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
      headers?: Record<string, string>;
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

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (options?.headers) {
      Object.assign(headers, options.headers);
    }

    const requestOptions: RequestInit = {
      method: options?.method || 'GET',
      headers,
      signal: options?.signal,
    };

    if (options?.body !== undefined) {
      requestOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(fullUrl, requestOptions);

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

  async getPayProviderList(
    params?: GetPayProviderListParams & { signal?: AbortSignal }
  ): Promise<PaginatedResponse<PayProvider>> {
    const queryParams = new URLSearchParams();
    if (params?.providerNo) queryParams.append('providerNo', params.providerNo);
    if (params?.providerName) queryParams.append('providerName', params.providerName);
    if (params?.state !== undefined) queryParams.append('state', String(params.state));
    if (params?.pageNumber !== undefined) queryParams.append('pageNumber', String(params.pageNumber));
    if (params?.pageSize !== undefined) queryParams.append('pageSize', String(params.pageSize));

    const qs = queryParams.toString();
    const url = `/api/payProvider${qs ? `?${qs}` : ''}`;

    return await this.paymentApiRequest<PaginatedResponse<PayProvider>>(url, { signal: params?.signal });
  }

  async getPayProviderDetail(providerNo: string, options?: { signal?: AbortSignal }): Promise<PayProvider> {
    return await this.paymentApiRequest<PayProvider>(`/api/payProvider/${providerNo}`, { signal: options?.signal });
  }

  async createPayProvider(data: CreatePayProviderRequest): Promise<void> {
    return await this.paymentApiRequest<void>('/api/payProvider', { method: 'POST', body: data });
  }

  async updatePayProvider(providerNo: string, data: UpdatePayProviderRequest): Promise<void> {
    return await this.paymentApiRequest<void>(`/api/payProvider/${providerNo}`, { method: 'PUT', body: data });
  }

  async deletePayProvider(providerNo: string): Promise<void> {
    return await this.paymentApiRequest<void>(`/api/payProvider/${providerNo}`, { method: 'DELETE' });
  }
}

export const payProviderApis = new PayProviderAPI();

