import axios from 'axios';
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from '@/lib/auth';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

let refreshingPromise: Promise<string | null> | null = null;

async function refreshAccessToken() {
  if (refreshingPromise) {
    return refreshingPromise;
  }

  refreshingPromise = (async () => {
    const refresh = getRefreshToken();
    if (!refresh) {
      return null;
    }

    try {
      const response = await axios.post(`${baseURL}/authentication/login/refresh/`, { refresh });
      const accessToken: string | undefined = response.data?.access || response.data?.access_token;
      const refreshToken: string = response.data?.refresh || response.data?.refresh_token || refresh;

      if (!accessToken) {
        return null;
      }

      saveTokens(accessToken, refreshToken);
      return accessToken;
    } catch {
      return null;
    } finally {
      refreshingPromise = null;
    }
  })();

  return refreshingPromise;
}

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }

      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
