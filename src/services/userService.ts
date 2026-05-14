import { api } from '@/lib/api';
import { User } from '@/types';

export interface UserFilters {
  university?: string;
  degree?: string;
  role?: string;
  search?: string;
  page?: number;
}

export const userService = {
  list: async (filters: UserFilters = {}) => {
    const { data } = await api.get<User[]>('/users/user-list', { params: filters });
    return data;
  },
};
