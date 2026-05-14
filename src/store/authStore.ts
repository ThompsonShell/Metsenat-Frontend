import { create } from 'zustand';
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from '@/lib/auth';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  loadFromStorage: () => void;
  logout: () => void;
}

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
