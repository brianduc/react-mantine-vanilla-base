import { Constants } from '@/infrastructure/core/constants';
import axios, { AxiosInstance } from 'axios';

class AxiosService {
  private instance: AxiosInstance;
  private abortController: AbortController | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL as string,
    });

    this.addInterceptors();
  }

  /**
   * Add request and response interceptors
   */
  private addInterceptors() {
    // Add Authorization header if token exists
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem(Constants.API_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle responses and refresh token logic
    this.instance.interceptors.response.use(
      (response) => response, // Pass successful response
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem(Constants.API_REFRESH_TOKEN_KEY);

          if (!refreshToken) {
            this.handleLogout();
            return Promise.reject(error);
          }

          try {
            const { data } = await this.instance.post('/auth/refresh-token', { refreshToken });
            localStorage.setItem(Constants.API_TOKEN_KEY, data.accessToken); // Save new token
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return this.instance(originalRequest); // Retry original request
          } catch (refreshError) {
            this.handleLogout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error); // Pass all other errors
      }
    );
  }

  /**
   * Handle user logout by clearing tokens and redirecting to login
   */
  private handleLogout() {
    localStorage.removeItem(Constants.API_TOKEN_KEY);
    localStorage.removeItem(Constants.API_REFRESH_TOKEN_KEY);
    window.location.href = '/login';
  }

  /**
   * Create a new signal for request cancellation
   */
  public createAbortSignal(): AbortSignal {
    this.abortController = new AbortController();
    return this.abortController.signal;
  }

  /**
   * Abort any ongoing requests
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
