import { create } from 'zustand';
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from '@/lib/auth';

/** Shape of the authentication slice of global state. */
interface AuthState {
  /** The current JWT access token, or `null` when logged out. */
  accessToken: string | null;
  /** The current JWT refresh token, or `null` when logged out. */
  refreshToken: string | null;
  /** Whether the user currently has a valid access token. */
  isAuthenticated: boolean;
  /**
   * Persists a token pair to storage and marks the user as authenticated.
   *
   * @param accessToken  - The new access token.
   * @param refreshToken - The new refresh token.
   */
  setTokens: (accessToken: string, refreshToken: string) => void;
  /**
   * Reads token values from localStorage and hydrates the store.
   * Should be called once on the client after the component mounts.
   */
  loadFromStorage: () => void;
  /** Clears all tokens from storage and marks the user as logged out. */
  logout: () => void;
}

/**
 * Zustand store for authentication state.
 * Provides token management and persistence helpers used throughout the app.
 */
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  setTokens: (accessToken, refreshToken) => {
    saveTokens(accessToken, refreshToken);
    set({ accessToken, refreshToken, isAuthenticated: true });
  },
  loadFromStorage: () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    set({
      accessToken,
      refreshToken,
      isAuthenticated: Boolean(accessToken),
    });
  },
  logout: () => {
    clearTokens();
    set({ accessToken: null, refreshToken: null, isAuthenticated: false });
  },
}));
