import axios from 'axios';
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from '@/lib/auth';

/** Base URL for all API requests. Falls back to localhost in development. */
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

/**
 * Shared promise used to deduplicate concurrent token-refresh requests.
 * While a refresh is in flight, subsequent calls await the same promise
 * instead of issuing duplicate refresh requests.
 */
let refreshingPromise: Promise<string | null> | null = null;

/**
 * Attempts to obtain a new access token using the stored refresh token.
 * Concurrent callers share the same in-flight request to avoid race conditions.
 *
 * @returns The new access token, or `null` if the refresh failed.
 */
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

/**
 * Pre-configured Axios instance for all API calls.
 * - Sets `Content-Type: application/json` by default.
 * - Automatically attaches the Bearer token to every request.
 * - Handles 401 responses by refreshing the access token once and retrying.
 *   If the refresh fails the user is redirected to `/login`.
 */
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Request interceptor – injects the Authorization header when a token is available. */
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/** Response interceptor – handles 401 errors with a single token-refresh retry. */
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
