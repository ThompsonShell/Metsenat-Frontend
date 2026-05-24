import { api } from '@/lib/api';
import { User } from '@/types';

/** Query parameters accepted by the user list endpoint. */
export interface UserFilters {
  /** Filter by university ID. */
  university?: string;
  /** Filter by degree (1 = Bachelor, 2 = Masters, 3 = Empty). */
  degree?: string;
  /** Filter by role (1 = Admin, 2 = Student, 3 = Sponsor). */
  role?: string;
  /** Full-text search query (matched against phone number or name). */
  search?: string;
  /** Page number for paginated results. */
  page?: number;
}

/**
 * API service for user-related read operations.
 */
export const userService = {
  /**
   * Returns a paginated list of users that match the optional filters.
   *
   * @param filters - Optional query parameters to narrow the results.
   */
  list: async (filters: UserFilters = {}) => {
    const { data } = await api.get<User[]>('/users/user-list', { params: filters });
    return data;
  },
};
