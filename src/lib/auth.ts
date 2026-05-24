/** localStorage key for the JWT access token. */
const ACCESS_KEY = 'access_token';

/** localStorage key for the JWT refresh token. */
const REFRESH_KEY = 'refresh_token';

/** Regex that validates Uzbekistan phone numbers in the format `+998XXXXXXXXX`. */
export const UZ_PHONE_REGEX = /^\+998\d{9}$/;

/**
 * Reads the JWT access token from localStorage.
 * Returns `null` when called on the server (no `window` object).
 */
export function getAccessToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(ACCESS_KEY);
}

/**
 * Reads the JWT refresh token from localStorage.
 * Returns `null` when called on the server (no `window` object).
 */
export function getRefreshToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(REFRESH_KEY);
}

/**
 * Persists a JWT token pair to localStorage and also writes the access token
 * to a short-lived cookie so the Next.js middleware can read it server-side.
 *
 * @param accessToken  - The new JWT access token.
 * @param refreshToken - The new JWT refresh token.
 */
export function saveTokens(accessToken: string, refreshToken: string) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);

  document.cookie = `${ACCESS_KEY}=${accessToken}; path=/; max-age=86400; samesite=lax`;
}

/**
 * Removes both JWT tokens from localStorage and expires the access-token cookie.
 * Safe to call on the server – returns immediately if `window` is undefined.
 */
export function clearTokens() {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  document.cookie = `${ACCESS_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax`;
}
