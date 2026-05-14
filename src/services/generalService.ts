import { api } from '@/lib/api';
import { PaymentMethod, University } from '@/types';

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
    const { data } = await api.patch<University>(`/general/${id}update`, payload);
    return data;
  },

  deleteUniversity: async (id: number) => {
    await api.delete(`/general/${id}delete`);
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
