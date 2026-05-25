import { api } from '@/lib/api';
import { PaymentMethod, University } from '@/types';
import { isAxiosError } from 'axios';

type UniversityPayload = {
  name: string;
  slug: string;
  contract_amount: number | string;
};

export const generalService = {
  listUniversities: async () => {
    const { data } = await api.get<University[]>('/general/');
    return data;
  },

  createUniversity: async (payload: Partial<UniversityPayload>) => {
    const { data } = await api.post<University>('/general/', payload);
    return data;
  },

  updateUniversity: async (id: number, payload: Partial<UniversityPayload>) => {
    try {
      const { data } = await api.patch<University>(`/general/${id}/update`, payload);
      return data;
    } catch (error) {
      if (!isAxiosError(error) || error.response?.status !== 404) {
        throw error;
      }
    }

    const { data } = await api.patch<University>(`/general/${id}/update/`, payload);
    return data;
  },

  deleteUniversity: async (id: number) => {
    try {
      await api.delete(`/general/${id}/delete`);
      return;
    } catch (error) {
      if (!isAxiosError(error) || error.response?.status !== 404) {
        throw error;
      }
    }

    await api.delete(`/general/${id}/delete/`);
  },

  listPaymentMethods: async () => {
    const { data } = await api.get<PaymentMethod[]>('/general/payment-method');
    return data;
  },

  createPaymentMethod: async (payload: Partial<PaymentMethod>) => {
    const { data } = await api.post<PaymentMethod>('/general/payment-method', payload);
    return data;
  },
};
