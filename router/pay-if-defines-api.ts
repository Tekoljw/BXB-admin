import { storageUtils } from '../utils/storage-util';

export interface PayIfDefine {
  ifCode: string;
  ifName: string;
  wayCodeStrs?: string;
  wayCodeOutStrs?: string;
  cryptoWayCodeStrs?: string;
  cryptoWayCodeOutStrs?: string;
  globalSetting?: any;
  idrConfig?: any;
  [key: string]: any;
}

export interface GetPayIfDefinesParams {
  active?: 1;
}

export interface CreatePayIfDefineRequest {
  ifCode: string;
  ifName: string;
  wayCodeStrs?: string;
  wayCodeOutStrs?: string;
  cryptoWayCodeStrs?: string;
  cryptoWayCodeOutStrs?: string;
  globalSetting?: any;
  idrConfig?: any;
}

export type UpdatePayIfDefineRequest = Partial<CreatePayIfDefineRequest>;

class PayIfDefinesAPI {
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

  async getPayIfDefines(params?: GetPayIfDefinesParams & { signal?: AbortSignal }): Promise<PayIfDefine[]> {
    const qs = new URLSearchParams();
    if (params?.active === 1) qs.append('active', '1');
    const q = qs.toString();
    return await this.paymentApiRequest<PayIfDefine[]>(`/api/payIfDefines${q ? `?${q}` : ''}`, {
      signal: params?.signal,
    });
  }

  async getPayIfDefineDetail(ifCode: string, options?: { signal?: AbortSignal }): Promise<PayIfDefine> {
    return await this.paymentApiRequest<PayIfDefine>(`/api/payIfDefines/${encodeURIComponent(ifCode)}`, {
      signal: options?.signal,
    });
  }

  async createPayIfDefine(data: CreatePayIfDefineRequest): Promise<void> {
    return await this.paymentApiRequest<void>('/api/payIfDefines', { method: 'POST', body: data });
  }

  async updatePayIfDefine(ifCode: string, data: UpdatePayIfDefineRequest): Promise<void> {
    return await this.paymentApiRequest<void>(`/api/payIfDefines/${encodeURIComponent(ifCode)}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deletePayIfDefine(ifCode: string): Promise<void> {
    return await this.paymentApiRequest<void>(`/api/payIfDefines/${encodeURIComponent(ifCode)}`, { method: 'DELETE' });
  }
}

export const payIfDefinesApis = new PayIfDefinesAPI();

