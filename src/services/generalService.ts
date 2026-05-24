import { api } from '@/lib/api';
import { PaymentMethod, University } from '@/types';
import { isAxiosError } from 'axios';

/** Shape of the request body used when creating or updating a university. */
type UniversityPayload = {
  name: string;
  slug: string;
  /** Annual contract amount in numeric form. */
  contract_amount: number | string;
};

/**
 * API service for general reference-data operations:
 * universities and payment methods.
 *
 * `updateUniversity` and `deleteUniversity` fall back to a URL without a
 * trailing slash when the primary URL returns 404, accommodating backend
 * routing variations.
 */
export const generalService = {
  /**
   * Returns all universities.
   */
  listUniversities: async () => {
    const { data } = await api.get<University[]>('/general/');
    return data;
  },

  /**
   * Creates a new university.
   *
   * @param payload - Fields for the new university.
   */
  createUniversity: async (payload: Partial<UniversityPayload>) => {
    const { data } = await api.post<University>('/general/', payload);
    return data;
  },

  /**
   * Partially updates an existing university.
   * Retries with an alternative URL if the primary endpoint returns 404.
   *
   * @param id      - The university ID.
   * @param payload - Fields to update.
   */
  updateUniversity: async (id: number, payload: Partial<UniversityPayload>) => {
    try {
      const { data } = await api.patch<University>(`/general/${id}/update`, payload);
      return data;
    } catch (error) {
      if (!isAxiosError(error) || error.response?.status !== 404) {
        throw error;
      }
    }

    const { data } = await api.patch<University>(`/general/${id}update`, payload);
    return data;
  },

  /**
   * Deletes a university by its ID.
   * Retries with an alternative URL if the primary endpoint returns 404.
   *
   * @param id - The university ID.
   */
  deleteUniversity: async (id: number) => {
    try {
      await api.delete(`/general/${id}/delete`);
      return;
    } catch (error) {
      if (!isAxiosError(error) || error.response?.status !== 404) {
        throw error;
      }
    }

    await api.delete(`/general/${id}delete`);
  },

  /**
   * Returns all available payment methods.
   */
  listPaymentMethods: async () => {
    const { data } = await api.get<PaymentMethod[]>('/general/payment-method');
    return data;
  },

  /**
   * Creates a new payment method.
   *
   * @param payload - Fields for the new payment method.
   */
  createPaymentMethod: async (payload: Partial<PaymentMethod>) => {
    const { data } = await api.post<PaymentMethod>('/general/payment-method', payload);
    return data;
  },
};
