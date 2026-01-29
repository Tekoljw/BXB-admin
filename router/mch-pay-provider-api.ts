import { storageUtils } from '../utils/storage-util';

export interface MchPayProviderConfig {
  infoId: string;
  ifCode: string;
  providerNo: string;
  state: number;
  ifParams?: string;
}

export interface GetMchPayProviderParams {
  ifCode: string;
  mchNo: string;
}

export interface SaveOrUpdateMchPayProviderRequest {
  mchNo: string;
  ifCode: string;
  providerNo: string;
  state: number;
}

class MchPayProviderAPI {
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
    options?: { method?: 'GET' | 'POST'; body?: any; signal?: AbortSignal }
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

  async getMchPayProviderConfigList(
    params: GetMchPayProviderParams & { signal?: AbortSignal }
  ): Promise<MchPayProviderConfig[]> {
    const qs = new URLSearchParams({ ifCode: params.ifCode, mchNo: params.mchNo }).toString();
    return await this.paymentApiRequest<MchPayProviderConfig[]>(`/api/mch/payProvider?${qs}`, { signal: params.signal });
  }

  async saveOrUpdate(data: SaveOrUpdateMchPayProviderRequest, options?: { signal?: AbortSignal }): Promise<void> {
    return await this.paymentApiRequest<void>('/api/mch/payProvider/saveOrUpdate', {
      method: 'POST',
      body: data,
      signal: options?.signal,
    });
  }
}

export const mchPayProviderApis = new MchPayProviderAPI();

