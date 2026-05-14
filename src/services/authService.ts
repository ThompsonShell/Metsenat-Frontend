import { api } from '@/lib/api';
import { AuthTokens } from '@/types';

export const authService = {
  sendVerificationCode: async (phone_number: string) => {
    const response = await api.post('/authentication/send-verification-code/', { phone_number });
    return response.data;
  },

  userLogin: async (phone_number: string, auth_code: string): Promise<AuthTokens> => {
    const response = await api.post('/authentication/userlogin/', { phone_number, auth_code });
    return response.data;
  },

  logout: async () => {
    return api.get('/authentication/logout/');
  },
};
