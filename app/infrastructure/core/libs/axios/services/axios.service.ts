import { Constants } from '@/infrastructure/core/constants';
import FailureResponse from '@/infrastructure/core/libs/axios/response/FailureResponse';
import InvalidModelStateResponse from '@/infrastructure/core/libs/axios/response/InvalidModelStateResponse';
import SuccessResponse from '@/infrastructure/core/libs/axios/response/SuccessResponse';

import axios, { AxiosInstance, AxiosError } from 'axios';

class AxiosService {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private refreshQueue: Array<(token: string) => void> = [];
  private abortController: AbortController | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
    });

    this.addInterceptors();
  }

  /**
   * Add request and response interceptors
   */
  private addInterceptors() {
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem(Constants.API_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => this.handleResponse(response), // Handle success responses
      async (error) => {
        if (error.response?.status === 401) {
          return this.handle401Error(error);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Handle responses with specific status codes
   */
  private handleResponse(response: any) {
    switch (response.status) {
      case 200: {
        const successResponse = new SuccessResponse('Success', response.data);
        if (!successResponse.data.success) {
          return Promise.reject(successResponse);
        }
        return successResponse;
      }

      case 202: {
        const failureResponse = new FailureResponse({
          code: '202',
          message: response.data.message || 'Request failed.',
          success: false,
        });

        return Promise.reject(failureResponse);
      }

      case 400: {
        const invalidModelResponse = new InvalidModelStateResponse({
          code: '400',
          message: response.data.errors?.[0]?.message || 'Invalid request parameters.',
          success: false,
        });

        return Promise.reject(invalidModelResponse);
      }

      default: {
        return response;
      }
    }
  }

  /**
   * Handle 401 Unauthorized errors
   */
  private async handle401Error(error: AxiosError) {
    const originalRequest = error.config;

    if (!originalRequest) return Promise.reject(error);

    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.refreshQueue.push((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(this.instance(originalRequest));
        });
      });
    }

    this.isRefreshing = true;
    const refreshToken = localStorage.getItem(Constants.API_REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      this.handleLogout();
      return Promise.reject(error);
    }

    try {
      const { data } = await this.instance.post('/auth/refresh-token', { refreshToken });
      const newToken = data.accessToken;
      localStorage.setItem(Constants.API_TOKEN_KEY, newToken);

      // Resolve all queued requests with the new token
      this.refreshQueue.forEach((callback) => callback(newToken));
      this.refreshQueue = [];

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return this.instance(originalRequest);
    } catch (refreshError) {
      this.handleLogout();
      return Promise.reject(refreshError);
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Handle logout by clearing tokens and redirecting to login
   */
  private handleLogout() {
    localStorage.removeItem(Constants.API_TOKEN_KEY);
    localStorage.removeItem(Constants.API_REFRESH_TOKEN_KEY);
    window.location.href = '/login';
  }

  /**
   * Create a new AbortSignal for request cancellation
   */
  public createAbortSignal(): AbortSignal {
    this.abortController = new AbortController();
    return this.abortController.signal;
  }

  /**
   * Cancel any ongoing requests
   */
  public cancelRequests() {
    this.abortController?.abort();
    this.abortController = null;
  }

  /**
   * Get Axios instance
   */
  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

const axiosService = new AxiosService();
export default axiosService;
