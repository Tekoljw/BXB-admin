import { storageUtils } from '../utils/storage-util';

export interface PayOrder {
  payOrderId?: string;
  mchNo?: string;
  ifCode?: string;
  wayCode?: string;
  currency?: string;
  state?: any;
  createdAt?: string;
  amount?: number;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  records: T[];
  total: number;
  current?: number;
  size?: number;
  pageNumber?: number;
  pageSize?: number;
  hasNext?: boolean;
}

export type PayOrderQuery = Record<string, string | number | boolean | undefined | null>;

class PayOrderAPI {
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

  private async request<T>(
    url: string,
    options?: { method?: 'GET' | 'POST'; body?: any; signal?: AbortSignal; accept?: string }
  ): Promise<{ data: T; response: Response }> {
    const baseURL = this.getPaymentApiBaseUrl();
    const fullUrl = `${baseURL}${url}`;

    const token = this.getAccessToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: options?.accept || 'application/json',
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

    if ((options?.accept || '').includes('application/json') || (options?.accept || '') === '') {
      const result = await response.json();
      if (result.code !== undefined && result.code !== 0) throw new Error(result.msg || '请求失败');
      return { data: (result.data !== undefined ? result.data : result) as T, response };
    }

    return { data: (undefined as unknown) as T, response };
  }

  private buildQuery(params?: PayOrderQuery): string {
    const qs = new URLSearchParams();
    if (!params) return '';
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null) continue;
      const s = String(v).trim();
      if (!s) continue;
      qs.append(k, s);
    }
    const q = qs.toString();
    return q ? `?${q}` : '';
  }

  async getPayOrders(params?: PayOrderQuery & { signal?: AbortSignal }): Promise<PaginatedResponse<PayOrder>> {
    const { signal, ...rest } = params || {};
    return (await this.request<PaginatedResponse<PayOrder>>(`/api/payOrder${this.buildQuery(rest)}`, { signal })).data;
  }

  async getPayOrderDetail(payOrderId: string, options?: { signal?: AbortSignal }): Promise<PayOrder> {
    return (await this.request<PayOrder>(`/api/payOrder/${encodeURIComponent(payOrderId)}`, { signal: options?.signal })).data;
  }

  async reissueManualOrder(payOrderId: string): Promise<void> {
    await this.request<void>(`/api/payOrder/reissueManualOrder/${encodeURIComponent(payOrderId)}`, { method: 'POST' });
  }

  async manualRefund(payOrderId: string, mchNo: string): Promise<void> {
    await this.request<void>('/api/payOrder/manual/refund', { method: 'POST', body: { payOrderId, mchNo } });
  }

  async manualFreeze(payOrderId: string, mchNo: string): Promise<void> {
    await this.request<void>('/api/payOrder/manual/freeze', { method: 'POST', body: { payOrderId, mchNo } });
  }

  async manualUnfreeze(payOrderId: string, mchNo: string): Promise<void> {
    await this.request<void>('/api/payOrder/manual/unfreeze', { method: 'POST', body: { payOrderId, mchNo } });
  }

  async manualNotify(payOrderId: string): Promise<void> {
    await this.request<void>('/api/payOrder/manual/notify', { method: 'POST', body: { payOrderId } });
  }

  async refunds(payOrderId: string, refundAmount: number, refundReason?: string): Promise<void> {
    await this.request<void>(`/api/payOrder/refunds/${encodeURIComponent(payOrderId)}`, {
      method: 'POST',
      body: { refundAmount, refundReason },
    });
  }

  async download(params?: PayOrderQuery): Promise<{ blob: Blob; filename: string }> {
    const { response } = await this.request<void>(`/api/payOrder/download${this.buildQuery(params)}`, {
      accept: 'application/octet-stream',
    });

    const blob = await response.blob();
    let filename = `pay_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    const cd = response.headers.get('content-disposition');
    if (cd) {
      const m = cd.match(/filename\*?=(?:UTF-8''|")?([^;"\n]+)"?/i);
      if (m?.[1]) {
        try {
          filename = decodeURIComponent(m[1]);
        } catch {
          filename = m[1];
        }
      }
    }
    return { blob, filename };
  }
}

export const payOrderApis = new PayOrderAPI();

