import { api } from '@/lib/api';
import { StudentSponsor } from '@/types';
import { isAxiosError } from 'axios';

/** Query parameters accepted by the sponsors list endpoint. */
export interface SponsorFilters {
  /** Filter by sponsor user ID. */
  sponsor?: string;
  /** Filter by student user ID. */
  student?: string;
  /** Minimum amount (inclusive). */
  amount__gte?: string;
  /** Maximum amount (inclusive). */
  amount__lte?: string;
}

/** Shape of the request body used when creating or updating a sponsor assignment. */
export type SponsorPayload = {
  /** ID of the sponsoring user. */
  sponsor: number;
  /** ID of the student being sponsored. */
  student: number;
  /** Allocated sponsorship amount. */
  amount: number;
};

/**
 * API service for sponsor–student assignment CRUD operations.
 *
 * `update` and `delete` fall back to a URL without a trailing slash when the
 * primary URL returns 404, accommodating backend routing variations.
 */
export const sponsorService = {
  /**
   * Returns all sponsor assignments that match the optional filters.
   *
   * @param filters - Optional query parameters to narrow the results.
   */
  list: async (filters: SponsorFilters = {}) => {
    const { data } = await api.get<StudentSponsor[]>('/sponsors/', { params: filters });
    return data;
  },

  /**
   * Returns a single sponsor assignment by its ID.
   *
   * @param id - The assignment ID.
   */
  get: async (id: string | number) => {
    const { data } = await api.get<StudentSponsor>(`/sponsors/${id}`);
    return data;
  },

  /**
   * Creates a new sponsor–student assignment.
   *
   * @param payload - Fields for the new assignment.
   */
  create: async (payload: Partial<SponsorPayload>) => {
    const { data } = await api.post<StudentSponsor>('/sponsors/', payload);
    return data;
  },

  /**
   * Partially updates an existing sponsor assignment.
   * Retries with an alternative URL if the primary endpoint returns 404.
   *
   * @param id      - The assignment ID.
   * @param payload - Fields to update.
   */
  update: async (id: string | number, payload: Partial<SponsorPayload>) => {
    try {
      const { data } = await api.patch<StudentSponsor>(`/sponsors/${id}/update`, payload);
      return data;
    } catch (error) {
      if (!isAxiosError(error) || error.response?.status !== 404) {
        throw error;
      }
    }

    const { data } = await api.patch<StudentSponsor>(`/sponsors/${id}update`, payload);
    return data;
  },

  /**
   * Deletes a sponsor assignment by its ID.
   * Retries with an alternative URL if the primary endpoint returns 404.
   *
   * @param id - The assignment ID.
   */
  delete: async (id: string | number) => {
    try {
      await api.delete(`/sponsors/${id}/delete`);
      return;
    } catch (error) {
      if (!isAxiosError(error) || error.response?.status !== 404) {
        throw error;
      }
    }

    await api.delete(`/sponsors/${id}delete`);
  },
};
