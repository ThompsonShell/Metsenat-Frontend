import { api } from '@/lib/api';
import { Appeal } from '@/types';
import { isAxiosError } from 'axios';

/** Query parameters accepted by the appeals list endpoint. */
export interface AppealFilters {
  /** Filter by sponsor user ID. */
  sponsor?: string;
  /** Filter by appeal status (1–4). */
  status?: string;
  /** Filter by payment method ID. */
  payment_method?: string;
  /** Minimum amount (inclusive). */
  amount__gte?: string;
  /** Maximum amount (inclusive). */
  amount__lte?: string;
  /** Minimum available amount (inclusive). */
  available__gte?: string;
  /** Maximum available amount (inclusive). */
  available__lte?: string;
}

/** Shape of the request body used when creating or updating an appeal. */
export type AppealPayload = {
  phone_number: string;
  amount: number;
  available: number;
  status: number;
  sponsor: number;
  payment_method: number;
};

/**
 * API service for appeal CRUD operations.
 *
 * `update` and `delete` fall back to a URL without a trailing slash when the
 * primary URL returns 404, accommodating backend routing variations.
 */
export const appealService = {
  /**
   * Returns all appeals that match the optional filters.
   *
   * @param filters - Optional query parameters to narrow the results.
   */
  list: async (filters: AppealFilters = {}) => {
    const { data } = await api.get<Appeal[]>('/appeals/', { params: filters });
    return data;
  },

  /**
   * Returns a single appeal by its ID.
   *
   * @param id - The appeal ID.
   */
  get: async (id: string | number) => {
    const { data } = await api.get<Appeal>(`/appeals/${id}`);
    return data;
  },

  /**
   * Creates a new appeal.
   *
   * @param payload - Fields for the new appeal (all or a subset of AppealPayload).
   */
  create: async (payload: Partial<AppealPayload>) => {
    const { data } = await api.post<Appeal>('/appeals/', payload);
    return data;
  },

  /**
   * Partially updates an existing appeal.
   * Retries with an alternative URL if the primary endpoint returns 404.
   *
   * @param id      - The appeal ID.
   * @param payload - Fields to update.
   */
  update: async (id: string | number, payload: Partial<AppealPayload>) => {
    try {
      const { data } = await api.patch<Appeal>(`/appeals/${id}/update`, payload);
      return data;
    } catch (error) {
      if (!isAxiosError(error) || error.response?.status !== 404) {
        throw error;
      }
    }

    const { data } = await api.patch<Appeal>(`/appeals/${id}update`, payload);
    return data;
  },

  /**
   * Deletes an appeal by its ID.
   * Retries with an alternative URL if the primary endpoint returns 404.
   *
   * @param id - The appeal ID.
   */
  delete: async (id: string | number) => {
    try {
      await api.delete(`/appeals/${id}/delete`);
      return;
    } catch (error) {
      if (!isAxiosError(error) || error.response?.status !== 404) {
        throw error;
      }
    }

    await api.delete(`/appeals/${id}delete`);
  },
};
