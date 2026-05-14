import { api } from '@/lib/api';
import { Appeal } from '@/types';

export interface AppealFilters {
  sponsor?: string;
  status?: string;
  payment_method?: string;
  amount__gte?: string;
  amount__lte?: string;
  available__gte?: string;
  available__lte?: string;
}

export type AppealPayload = {
  phone_number: string;
  amount: number;
  available: number;
  status: number;
  sponsor: number;
  payment_method: number;
};

export const appealService = {
  list: async (filters: AppealFilters = {}) => {
    const { data } = await api.get<Appeal[]>('/appeals/', { params: filters });
    return data;
  },

  get: async (id: string | number) => {
    const { data } = await api.get<Appeal>(`/appeals/${id}`);
    return data;
  },

  create: async (payload: Partial<AppealPayload>) => {
    const { data } = await api.post<Appeal>('/appeals/', payload);
    return data;
  },

  update: async (id: string | number, payload: Partial<AppealPayload>) => {
    const { data } = await api.patch<Appeal>(`/appeals/${id}update`, payload);
    return data;
  },

  delete: async (id: string | number) => {
    await api.delete(`/appeals/${id}delete`);
  },
};
