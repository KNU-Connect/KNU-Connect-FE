import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosRequestHeaders,
  type AxiosHeaders,
} from 'axios';
import { useAuthStore } from '@/store/authStore';
import { refreshToken } from '@/pages/auth/services/refresh';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let refreshTokenPromise: Promise<{ token: string }> | null = null;

function isAxiosHeaders(headers: unknown): headers is AxiosHeaders {
  return (
    headers !== null &&
    headers !== undefined &&
    typeof (headers as AxiosHeaders).set === 'function'
  );
}

function setAuthHeader(
  headers: AxiosRequestHeaders | undefined,
  token: string,
): AxiosRequestHeaders {
  if (isAxiosHeaders(headers)) {
    headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  return {
    ...(headers || {}),
    Authorization: `Bearer ${token}`,
  } as unknown as AxiosRequestHeaders;
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers = setAuthHeader(config.headers, accessToken);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _skipRefresh?: boolean;
    };

    if (originalRequest._skipRefresh) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!refreshTokenPromise) {
          refreshTokenPromise = refreshToken();
        }

        const { token: newAccessToken } = await refreshTokenPromise;
        refreshTokenPromise = null;

        useAuthStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers = setAuthHeader(
          originalRequest.headers,
          newAccessToken,
        );

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        refreshTokenPromise = null;
        useAuthStore.getState().clearAccessToken();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
