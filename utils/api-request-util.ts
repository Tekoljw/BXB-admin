/**
 * API请求封装
 * 支持自动添加Token、错误处理、请求拦截等
 */

import { storageUtils } from './storage-util';

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
    };

    // 先合并用户自定义的headers（但保留Token头的位置）
    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    // 最后添加token头（如果不需要跳过认证），确保Token头不会被覆盖
    if (!options.skipAuth) {
      const accessToken = this.getAccessToken();
      if (accessToken) {
        headers['Token'] = accessToken;
        // 添加统一的Authorization Bearer header
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    // Client-Code: 客户端唯一标识
    const clientCode = this.getOrCreateClientCode();
    if (clientCode) {
      headers['Client-Code'] = clientCode;
    }

    // Client-Device-Name: 设备名称（简化格式）
    if (typeof navigator !== 'undefined') {
      const platform = navigator.platform || '';
      const userAgent = navigator.userAgent || '';
      // 简化设备名称：优先使用平台信息，否则使用操作系统信息
      let deviceName = 'Unknown';
      if (platform.includes('Mac')) {
        deviceName = 'Mac OS';
      } else if (platform.includes('Win')) {
        deviceName = 'Windows';
      } else if (platform.includes('Linux')) {
        deviceName = 'Linux';
      } else if (userAgent.includes('Android')) {
        deviceName = 'Android';
      } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
        deviceName = 'iOS';
      }
      headers['Client-Device-Name'] = deviceName;
    }

    // Lang: 语言设置（使用简化的格式，如 'cn' 而不是 'zh-CN'）
    const lang = storageUtils.disk.get<string>('lang', 'zh-CN');
    // 将 'zh-CN' 转换为 'cn'，其他语言保持原样或简化
    let langHeader = lang;
    if (lang === 'zh-CN' || lang === 'zh') {
      langHeader = 'cn';
    } else if (lang === 'en-US' || lang === 'en') {
      langHeader = 'en';
    }
    headers['Lang'] = langHeader;

    // Api-Version: API版本标识（参考图一：xt4，可通过环境变量配置）
    const apiVersion = process.env.NEXT_PUBLIC_API_VERSION || 'xt4';
    headers['Api-Version'] = apiVersion;

    // Device: 设备类型（参考图一：web）
    headers['Device'] = 'web';

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

  /**
   * 从多个来源获取 accessToken
   * 优先级：localStorage (accessToken) > Cookie (token) > sessionStorage (accessToken) > localStorage (admin.accessToken)
   */
  private getAccessToken(): string {
    if (typeof window === 'undefined') {
      return '';
    }

    // 1. 尝试从 localStorage 获取（通过 storageUtils，key为 'accessToken'）
    let token = storageUtils.disk.get<string>('accessToken', '');
    if (token) {
      return token;
    }

    // 2. 尝试从 Cookie 获取（优先从 'token' cookie获取）
    token = this.getCookieValue('token');
    if (token) {
      return token;
    }

    // 3. 尝试从 sessionStorage 获取
    try {
      token = sessionStorage.getItem('accessToken') || '';
      if (token) {
        return token;
      }
    } catch (e) {
      // sessionStorage 可能不可用
    }

    // 4. 尝试从 localStorage 直接获取（不带前缀）
    try {
      token = localStorage.getItem('accessToken') || '';
      if (token) {
        return token;
      }
    } catch (e) {
      // localStorage 可能不可用
    }

    // 5. 尝试从 localStorage 获取（带 'admin.' 前缀）
    try {
      token = localStorage.getItem('admin.accessToken') || '';
      if (token) {
        return token;
      }
    } catch (e) {
      // localStorage 可能不可用
    }

    return '';
  }

  /**
   * 从 Cookie 中获取指定名称的值
   * 注意：JWT token 中可能包含 '=' 字符，需要正确处理
   */
  private getCookieValue(name: string): string {
    if (typeof document === 'undefined') {
      return '';
    }

    try {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const trimmed = cookie.trim();
        if (!trimmed) continue;
        
        const eqIndex = trimmed.indexOf('=');
        if (eqIndex === -1) continue;
        
        const cookieName = trimmed.substring(0, eqIndex).trim();
        const cookieValue = trimmed.substring(eqIndex + 1).trim();
        
        if (cookieName === name && cookieValue) {
          try {
            // 尝试解码，如果失败则返回原始值
            const decoded = decodeURIComponent(cookieValue);
            return decoded || cookieValue;
          } catch {
            // 解码失败，返回原始值（可能包含特殊字符）
            return cookieValue;
          }
        }
      }
    } catch (e) {
      console.warn('Failed to get cookie value:', e);
    }
    
    return '';
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // HTTP 401 状态码也表示认证失败/Token过期
      if (response.status === 401) {
        this.handleTokenExpired();
      }
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
      // 处理 Token 过期（code: 401）
      if (result.code === 401) {
        this.handleTokenExpired();
      }
      throw new APIError(result.msg || '请求失败', result.code, result.data);
    }

    return result.data;
  }

  /**
   * 处理 Token 过期
   * 清除本地存储的认证信息并跳转到登录页
   */
  private handleTokenExpired(): void {
    if (typeof window === 'undefined') {
      return;
    }

    // 清除所有认证相关的存储
    storageUtils.disk.remove('accessToken');
    storageUtils.disk.remove('refreshToken');
    
    // 清除 sessionStorage 中的登录状态
    sessionStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('isAdminLoggedIn');

    // 避免重复跳转
    if (window.location.pathname !== '/admin/login') {
      // 使用 window.location 跳转，确保页面完全刷新
      window.location.href = '/admin/login';
    }
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    const fullUrl = `${this.baseURL}${url}`;
    const headers = this.buildHeaders(options || {});

    try {
      // 从options中排除headers，避免覆盖已构建的headers（包括Token）
      const { headers: _, skipAuth: __, urlPrefix: ___, ...restOptions } = options || {};
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers,
        ...restOptions,
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
      // 从options中排除headers，避免覆盖已构建的headers（包括Token）
      const { headers: _, skipAuth: __, urlPrefix: ___, ...restOptions } = options || {};
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        ...restOptions,
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
      // 从options中排除headers，避免覆盖已构建的headers（包括Token）
      const { headers: _, skipAuth: __, urlPrefix: ___, ...restOptions } = options || {};
      const response = await fetch(fullUrl, {
        method: 'PUT',
        headers,
        body: data ? JSON.stringify(data) : undefined,
        ...restOptions,
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

    // 从options中排除headers，避免覆盖已构建的headers（包括Token）
    const { headers: _, skipAuth: __, urlPrefix: ___, ...restOptions } = options || {};
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers,
      ...restOptions,
    });

    return this.handleResponse<T>(response);
  }
}

const apiRequest = new APIRequest();

export default apiRequest;
