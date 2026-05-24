/** Numeric role identifier: 1 = Admin, 2 = Student, 3 = Sponsor. */
export type Role = 1 | 2 | 3;

/** Numeric user-type identifier: 1 = Personal, 2 = Legal, 3 = Empty/unset. */
export type UserType = 1 | 2 | 3;

/** Numeric degree identifier: 1 = Bachelor, 2 = Masters, 3 = Empty/unset. */
export type Degree = 1 | 2 | 3;

/** Numeric appeal-status identifier: 1 = New, 2 = Moderation, 3 = Confirmed, 4 = Cancelled. */
export type AppealStatus = 1 | 2 | 3 | 4;

/** A university entity returned by the API. */
export interface University {
  id: number;
  name: string;
  slug: string;
  /** Annual contract amount as a string (e.g. "5000000"). */
  contract_amount: string;
}

/** A payment method entity returned by the API. */
export interface PaymentMethod {
  id: number;
  name: string;
  slug: string;
}

/** A platform user (admin, student, or sponsor). */
export interface User {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  /** Optional profile photo URL. */
  photo?: string | null;
  role: Role;
  user_type: UserType;
  degree: Degree;
  /** Total balance as a string. */
  balance: string;
  /** Available (unallocated) balance as a string. */
  available: string;
  /** The university this user is associated with, or null if none. */
  university: University | null;
}

/** A student sponsorship appeal. */
export interface Appeal {
  id: number;
  phone_number: string;
  /** Requested sponsorship amount as a string. */
  amount: string;
  /** Currently available/covered amount as a string. */
  available: string;
  status: AppealStatus;
  /** The sponsor assigned to this appeal, or null if unassigned. */
  sponsor: User | null;
  /** The payment method chosen for this appeal, or null if unset. */
  payment_method: PaymentMethod | null;
  created_at?: string;
}

/** A sponsor–student assignment record. */
export interface StudentSponsor {
  id: number;
  /** The sponsoring user, or null if unlinked. */
  sponsor: User | null;
  /** The student being sponsored, or null if unlinked. */
  student: User | null;
  /** Allocated sponsorship amount as a string. */
  amount: string;
  created_at?: string;
}

/** JWT token pair returned after a successful login. */
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

/** Human-readable labels for each Role value. */
export const ROLE_LABELS: Record<Role, string> = {
  1: 'ADMIN',
  2: 'STUDENT',
  3: 'SPONSOR',
};

/** Human-readable labels for each UserType value. */
export const USER_TYPE_LABELS: Record<UserType, string> = {
  1: 'PERSONAL',
  2: 'LEGAL',
  3: 'EMPTY',
};

/** Human-readable labels for each Degree value. */
export const DEGREE_LABELS: Record<Degree, string> = {
  1: 'BACHELOR',
  2: 'MASTERS',
  3: 'EMPTY',
};

/** Human-readable labels for each AppealStatus value. */
export const APPEAL_STATUS_LABELS: Record<AppealStatus, string> = {
  1: 'NEW',
  2: 'MODERATION',
  3: 'CONFIRMED',
  4: 'CANCELLED',
};
