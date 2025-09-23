// Fetch utility for Next.js with full HTTP methods support
export interface FetchOptions extends RequestInit {
  timeout?: number;
  baseURL?: string;
  params?: Record<string, string | number | boolean>;
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export class FetchError extends Error {
  status: number;
  statusText: string;
  data?: unknown;

  constructor(message: string, status: number, statusText: string, data?: unknown) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

class ApiClient {
  private baseURL: string;
  private defaultOptions: RequestInit;

  constructor(baseURL = '', defaultOptions: RequestInit = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...defaultOptions.headers,
      },
      ...defaultOptions,
    };
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(endpoint, this.baseURL || window.location.origin);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const isJson = response.headers.get('content-type')?.includes('application/json');

    let data: T;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch {
      data = null as T;
    }

    if (!response.ok) {
      throw new FetchError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        response.statusText,
        data,
      );
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  private async request<T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    const { timeout = 10000, params, ...fetchOptions } = options;

    const url = this.buildURL(endpoint, params);
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...this.defaultOptions,
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          ...this.defaultOptions.headers,
          ...fetchOptions.headers,
        },
      });

      clearTimeout(timeoutId);
      return this.handleResponse<T>(response);
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new FetchError('Request timeout', 408, 'Request Timeout');
      }

      throw error;
    }
  }

  // GET method
  async get<T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  // POST method
  async post<T>(
    endpoint: string,
    data?: unknown,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT method
  async put<T>(
    endpoint: string,
    data?: unknown,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PATCH method
  async patch<T>(
    endpoint: string,
    data?: unknown,
    options: FetchOptions = {},
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE method
  async delete<T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // HEAD method
  async head(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<null>> {
    return this.request<null>(endpoint, { ...options, method: 'HEAD' });
  }

  // OPTIONS method
  async options<T>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'OPTIONS' });
  }
}

// Default instance
export const api = new ApiClient();

// Factory function to create custom instances
export const createApiClient = (baseURL?: string, defaultOptions?: RequestInit) => {
  return new ApiClient(baseURL, defaultOptions);
};

// Convenience functions for quick usage
export const get = <T>(endpoint: string, options?: FetchOptions) => api.get<T>(endpoint, options);
export const post = <T>(endpoint: string, data?: unknown, options?: FetchOptions) =>
  api.post<T>(endpoint, data, options);
export const put = <T>(endpoint: string, data?: unknown, options?: FetchOptions) =>
  api.put<T>(endpoint, data, options);
export const patch = <T>(endpoint: string, data?: unknown, options?: FetchOptions) =>
  api.patch<T>(endpoint, data, options);
export const del = <T>(endpoint: string, options?: FetchOptions) =>
  api.delete<T>(endpoint, options);
export const head = (endpoint: string, options?: FetchOptions) => api.head(endpoint, options);
export const options = <T>(endpoint: string, opts?: FetchOptions) => api.options<T>(endpoint, opts);

export default api;
