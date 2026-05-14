const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

export const UZ_PHONE_REGEX = /^\+998\d{9}$/;

export function getAccessToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(REFRESH_KEY);
}

export function saveTokens(accessToken: string, refreshToken: string) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);

  document.cookie = `${ACCESS_KEY}=${accessToken}; path=/; max-age=86400; samesite=lax`;
}

export function clearTokens() {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  document.cookie = `${ACCESS_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax`;
}
