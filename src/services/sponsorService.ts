import { api } from '@/lib/api';
import { StudentSponsor } from '@/types';

export interface SponsorFilters {
  sponsor?: string;
  student?: string;
  amount__gte?: string;
  amount__lte?: string;
}

export type SponsorPayload = {
  sponsor: number;
  student: number;
  amount: number;
};

export const sponsorService = {
  list: async (filters: SponsorFilters = {}) => {
    const { data } = await api.get<StudentSponsor[]>('/sponsors/', { params: filters });
    return data;
  },

  get: async (id: string | number) => {
    const { data } = await api.get<StudentSponsor>(`/sponsors/${id}`);
    return data;
  },

  create: async (payload: Partial<SponsorPayload>) => {
    const { data } = await api.post<StudentSponsor>('/sponsors/', payload);
    return data;
  },

  update: async (id: string | number, payload: Partial<SponsorPayload>) => {
    const { data } = await api.patch<StudentSponsor>(`/sponsors/${id}update`, payload);
    return data;
  },

  delete: async (id: string | number) => {
    await api.delete(`/sponsors/${id}delete`);
  },
};
