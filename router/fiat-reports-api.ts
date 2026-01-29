// 法币报表API服务：经营报表相关接口
// 支付系统API使用独立的API基础URL
import apiRequest from '../utils/api-request-util';
import { storageUtils } from '../utils/storage-util';

// ==================== 类型定义 ====================

// 商户统计
export interface MerchantStats {
  totalCount: number;
  activeCount: number;
}

// 今日/昨日业务
export interface BusinessData {
  collectAmount: number;
  payoutAmount: number;
}

// 下发统计
export interface PayoutStats {
  todayPayout: number;
  yesterdayPayout: number;
}

// 资金统计
export interface FundsStats {
  merchantAssets: number;
  transferAssets: number;
}

// 利润数据
export interface ProfitData {
  feeProfit: number;
  exchangeProfit: number;
  totalProfit: number;
}

// 经营报表概览响应
export interface ReportsSummaryResponse {
  merchantStats: MerchantStats;
  todayBusiness: BusinessData;
  yesterdayBusiness: BusinessData;
  payoutStats: PayoutStats;
  fundsStats: FundsStats;
  todayProfit: ProfitData;
  yesterdayProfit: ProfitData;
  monthProfit: ProfitData;
}

// 每日报表记录
export interface DailyReportRecord {
  reportDate: string; // yyyy-MM-dd
  activeMerchantCount: number;
  activeAgentCount: number;
  collectRateProfit: number;
  collectBasicProfit: number;
  payoutRateProfit: number;
  payoutBasicProfit: number;
  totalProfit: number;
}

// 每月报表记录
export interface MonthlyReportRecord {
  reportMonth: string; // yyyy-MM
  activeMerchantCount: number;
  activeAgentCount: number;
  collectRateProfit: number;
  collectBasicProfit: number;
  payoutRateProfit: number;
  payoutBasicProfit: number;
  totalProfit: number;
}

// 分页响应
export interface PaginatedResponse<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

// 每日报表查询参数
export interface DailyReportParams {
  queryDate?: string; // yyyy-MM-dd
  pageNumber?: number;
  pageSize?: number;
}

// 每月报表查询参数
export interface MonthlyReportParams {
  queryMonth?: string; // yyyy-MM
  pageNumber?: number;
  pageSize?: number;
}

// ==================== API服务类 ====================

class FiatReportsAPI {
  // 支付系统API使用独立的基础URL
  // 支付系统和交易所系统是分开独立的，需要直接访问支付系统API
  private getPaymentApiBaseUrl(): string {
    // 优先使用环境变量配置的支付API地址
    const paymentApiBaseUrl = process.env.NEXT_PUBLIC_PAYMENT_API_BASE_URL || 'http://pay.ubtai.biz:9217';
    
    // 在开发环境，直接使用支付API的完整URL（不走Next.js代理）
    // 因为支付系统和交易所系统是分开的，不能通过交易所的代理
    if (typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return paymentApiBaseUrl;
    }
    
    // 生产环境：也直接使用支付API地址
    return paymentApiBaseUrl;
  }

  // 创建支付系统专用的API请求实例
  private async paymentApiRequest<T>(url: string, options?: { signal?: AbortSignal }): Promise<T> {
    const baseURL = this.getPaymentApiBaseUrl();
    const fullUrl = `${baseURL}${url}`;
    
    // 获取认证token（复用现有的token获取逻辑，与api-request-util.ts保持一致）
    const getAccessToken = (): string => {
      if (typeof window === 'undefined') return '';
      
      // 优先级：localStorage (accessToken) > Cookie (token) > sessionStorage (accessToken) > localStorage (admin.accessToken)
      try {
        // 1. 尝试从 localStorage 获取（通过 storageUtils，key为 'accessToken'）
        let token = storageUtils.disk.get<string>('accessToken', '');
        if (token) return token;

        // 2. 尝试从 Cookie 获取（优先从 'token' cookie获取）
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

        // 3. 尝试从 sessionStorage 获取
        token = sessionStorage.getItem('accessToken') || '';
        if (token) return token;

        // 4. 尝试从 localStorage 获取（带 'admin.' 前缀）
        token = localStorage.getItem('admin.accessToken') || '';
        if (token) return token;
      } catch (e) {
        console.warn('Failed to get access token:', e);
      }
      
      return '';
    };

    const token = getAccessToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // 开发环境下记录请求URL
    if (process.env.NODE_ENV === 'development') {
      console.log('[Payment API Request]', 'GET', fullUrl);
    }

    const requestOptions: RequestInit = {
      method: 'GET',
      headers,
    };

    // 支持 AbortController
    if (options?.signal) {
      requestOptions.signal = options.signal;
    }

    const response = await fetch(fullUrl, requestOptions);

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      
      // 检查是否是HTML响应
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
    
    // 检查API响应格式 { code, msg, data }
    if (result.code !== undefined && result.code !== 0) {
      throw new Error(result.msg || '请求失败');
    }

    // 返回data字段，如果没有data字段则返回整个结果
    return result.data !== undefined ? result.data : result;
  }

  /**
   * 获取经营报表概览统计
   * GET /api/fiat/reports/summary
   */
  async getSummary(options?: { signal?: AbortSignal }): Promise<ReportsSummaryResponse> {
    return await this.paymentApiRequest<ReportsSummaryResponse>(
      '/api/fiat/reports/summary',
      options
    );
  }

  /**
   * 获取每日报表数据
   * GET /api/fiat/reports/daily
   */
  async getDailyReports(
    params?: DailyReportParams
  ): Promise<PaginatedResponse<DailyReportRecord>> {
    const queryParams = new URLSearchParams();
    
    if (params?.queryDate) {
      queryParams.append('queryDate', params.queryDate);
    }
    if (params?.pageNumber !== undefined) {
      queryParams.append('pageNumber', params.pageNumber.toString());
    }
    if (params?.pageSize !== undefined) {
      queryParams.append('pageSize', params.pageSize.toString());
    }

    const queryString = queryParams.toString();
    const url = `/api/fiat/reports/daily${queryString ? `?${queryString}` : ''}`;
    
    return await this.paymentApiRequest<PaginatedResponse<DailyReportRecord>>(url);
  }

  /**
   * 获取每月报表数据
   * GET /api/fiat/reports/monthly
   */
  async getMonthlyReports(
    params?: MonthlyReportParams
  ): Promise<PaginatedResponse<MonthlyReportRecord>> {
    const queryParams = new URLSearchParams();
    
    if (params?.queryMonth) {
      queryParams.append('queryMonth', params.queryMonth);
    }
    if (params?.pageNumber !== undefined) {
      queryParams.append('pageNumber', params.pageNumber.toString());
    }
    if (params?.pageSize !== undefined) {
      queryParams.append('pageSize', params.pageSize.toString());
    }

    const queryString = queryParams.toString();
    const url = `/api/fiat/reports/monthly${queryString ? `?${queryString}` : ''}`;
    
    return await this.paymentApiRequest<PaginatedResponse<MonthlyReportRecord>>(url);
  }

  /**
   * 导出CSV报表
   * GET /api/fiat/reports/export
   * @param startDate 开始日期，格式：yyyy-MM-dd
   * @param endDate 结束日期，格式：yyyy-MM-dd
   * @returns Promise<void> 触发文件下载
   */
  async exportCSV(startDate: string, endDate: string): Promise<void> {
    const baseURL = this.getPaymentApiBaseUrl();
    const queryParams = new URLSearchParams();
    queryParams.append('startDate', startDate);
    queryParams.append('endDate', endDate);
    const fullUrl = `${baseURL}/api/fiat/reports/export?${queryParams.toString()}`;
    
    // 获取认证token
    const getAccessToken = (): string => {
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
    };

    const token = getAccessToken();
    const headers: HeadersInit = {
      'Accept': 'text/csv,application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // 开发环境下记录请求URL
    if (process.env.NODE_ENV === 'development') {
      console.log('[Payment API Request]', 'GET', fullUrl);
    }

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`导出失败: HTTP ${response.status}: ${text || response.statusText}`);
    }

    // 检查Content-Type是否为CSV
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/csv') && !contentType.includes('application/octet-stream')) {
      const text = await response.text();
      throw new Error(`期望CSV文件，但收到: ${contentType}. ${text.substring(0, 200)}`);
    }

    // 获取文件名（从Content-Disposition头或使用默认名称）
    let filename = `法币经营报表_${startDate}_${endDate}.csv`;
    const contentDisposition = response.headers.get('content-disposition');
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].replace(/['"]/g, '');
        // 处理UTF-8编码的文件名
        try {
          filename = decodeURIComponent(filename);
        } catch {
          // 如果解码失败，使用原始值
        }
      }
    }

    // 下载文件
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

// 导出单例
export const fiatReportsApis = new FiatReportsAPI();
