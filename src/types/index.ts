export type Role = 1 | 2 | 3;
export type UserType = 1 | 2 | 3;
export type Degree = 1 | 2 | 3;
export type AppealStatus = 1 | 2 | 3 | 4;

export interface University {
  id: number;
  name: string;
  slug: string;
  contract_amount: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  slug: string;
}

export interface User {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  photo?: string | null;
  role: Role;
  user_type: UserType;
  degree: Degree;
  balance: string;
  available: string;
  university: University | null;
}

export interface Appeal {
  id: number;
  phone_number: string;
  amount: string;
  available: string;
  status: AppealStatus;
  sponsor: User | null;
  payment_method: PaymentMethod | null;
  created_at?: string;
}

export interface StudentSponsor {
  id: number;
  sponsor: User | null;
  student: User | null;
  amount: string;
  created_at?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export const ROLE_LABELS: Record<Role, string> = {
  1: 'ADMIN',
  2: 'STUDENT',
  3: 'SPONSOR',
};

export const USER_TYPE_LABELS: Record<UserType, string> = {
  1: 'PERSONAL',
  2: 'LEGAL',
  3: 'EMPTY',
};

export const DEGREE_LABELS: Record<Degree, string> = {
  1: 'BACHELOR',
  2: 'MASTERS',
  3: 'EMPTY',
};

export const APPEAL_STATUS_LABELS: Record<AppealStatus, string> = {
  1: 'NEW',
  2: 'MODERATION',
  3: 'CONFIRMED',
  4: 'CANCELLED',
};
