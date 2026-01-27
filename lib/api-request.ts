/**
 * API请求封装
 * 支持自动添加Token、错误处理、请求拦截等
 */

import { storageUtils } from './storage';

export class APIError extends Error {
  code: number;
  data?: any;

  constructor(message: string, code: number, data?: any) {
    super(message);
    this.name = 'APIError';
    this.code = code;
    this.data = data;
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

interface RequestOptions extends RequestInit {
  urlPrefix?: string;
  headers?: Record<string, string>;
  skipAuth?: boolean;
}

interface APIResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

class APIRequest {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL?: string) {
    const envBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    // 开发环境且配置了API地址：使用Next.js代理避免跨域问题
    // 生产环境或未配置：直接使用API地址
    if (typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
        envBaseURL) {
      this.baseURL = '/api/proxy';
    } else {
      this.baseURL = baseURL || envBaseURL;
    }
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  newInstance(): APIRequest {
    return new APIRequest(this.baseURL);
  }

  withUrlPrefix(prefix: string): APIRequest {
    const instance = this.newInstance();
    instance.baseURL = `${instance.baseURL}/${prefix}`;
    return instance;
  }

  withHeader(headers: Record<string, string>): APIRequest {
    const instance = this.newInstance();
    instance.defaultHeaders = { ...instance.defaultHeaders, ...headers };
    return instance;
  }

  private buildHeaders(options: RequestOptions): HeadersInit {
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...options.headers,
    };

    if (!options.skipAuth) {
      const accessToken = storageUtils.disk.get<string>('accessToken', '');
      if (accessToken) {
        headers['Token'] = accessToken;
      }
    }

    const clientCode = this.getOrCreateClientCode();
    headers['Client-Code'] = clientCode;

    if (typeof navigator !== 'undefined') {
      headers['Client-Device-Name'] = navigator.userAgent;
    }

    const lang = storageUtils.disk.get<string>('lang', 'zh-CN');
    headers['Lang'] = lang;

    return headers;
  }

  private getOrCreateClientCode(): string {
    if (typeof window === 'undefined') {
      return '';
    }

    let clientCode = localStorage.getItem('clientCode');
    if (!clientCode) {
      // 生成19位随机字符串
      clientCode = Array.from({ length: 19 }, () =>
        Math.random().toString(36).charAt(2)
      ).join('');
      localStorage.setItem('clientCode', clientCode);
    }
    return clientCode;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new APIError(
        text || `HTTP ${response.status} ${response.statusText}`,
        response.status
      );
    }

    const contentType = response.headers.get('content-type');
    
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      throw new APIError(
        text || `HTTP ${response.status} ${response.statusText}`,
        response.status
      );
    }

    const result: APIResponse<T> = await response.json();

    if (result.code !== 0) {
      throw new APIError(result.msg || '请求失败', result.code, result.data);
    }

    return result.data;
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    const fullUrl = `${this.baseURL}${url}`;
    const headers = this.buildHeaders(options || {});

    try {
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers,
        ...options,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      // 网络错误（如CORS、连接失败等）
      throw new APIError(
        error instanceof Error ? error.message : '网络请求失败，请检查网络连接或API服务是否可用',
        -1
      );
    }
  }

  async post<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    const fullUrl = `${this.baseURL}${url}`;
    const headers = this.buildHeaders(options || {});

    try {
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(
        error instanceof Error ? error.message : '网络请求失败，请检查网络连接或API服务是否可用',
        -1
      );
    }
  }

  async put<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    const fullUrl = `${this.baseURL}${url}`;
    const headers = this.buildHeaders(options || {});

    try {
      const response = await fetch(fullUrl, {
        method: 'PUT',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(
        error instanceof Error ? error.message : '网络请求失败，请检查网络连接或API服务是否可用',
        -1
      );
    }
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    const fullUrl = `${this.baseURL}${url}`;
    const headers = this.buildHeaders(options || {});

    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers,
      ...options,
    });

    return this.handleResponse<T>(response);
  }
}

const apiRequest = new APIRequest();

export default apiRequest;
