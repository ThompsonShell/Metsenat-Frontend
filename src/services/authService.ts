import { api } from '@/lib/api';
import { AuthTokens } from '@/types';

/**
 * API service for authentication-related endpoints.
 */
export const authService = {
  /**
   * Sends a one-time verification code to the given phone number.
   *
   * @param phone_number - An Uzbek phone number in `+998XXXXXXXXX` format.
   */
  sendVerificationCode: async (phone_number: string) => {
    const response = await api.post('/authentication/send-verification-code/', { phone_number });
    return response.data;
  },

  /**
   * Verifies the OTP code and exchanges it for a JWT token pair.
   *
   * @param phone_number - The phone number that received the code.
   * @param auth_code    - The 4-digit one-time password.
   * @returns A promise that resolves to the access and refresh tokens.
   */
  userLogin: async (phone_number: string, auth_code: string): Promise<AuthTokens> => {
    const response = await api.post('/authentication/userlogin/', { phone_number, auth_code });
    return response.data;
  },

  /**
   * Invalidates the current session on the server side.
   * Failures are intentionally swallowed by the caller.
   */
  logout: async () => {
    return api.get('/authentication/logout/');
  },
};
