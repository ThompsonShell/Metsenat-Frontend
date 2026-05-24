'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { TBody, THead, Table } from '@/components/ui/Table';
import { useUsers } from '@/hooks/useUsers';
import { DEGREE_LABELS, ROLE_LABELS, USER_TYPE_LABELS } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Tailwind badge classes applied per role value. */
const ROLE_COLORS: Record<number, string> = {
  1: 'bg-purple-50 text-purple-700',
  2: 'bg-blue-50 text-blue-700',
  3: 'bg-emerald-50 text-emerald-700',
};

/**
 * Users list page.
 *
 * Provides filter inputs (search, role, degree, university) and a paginated
 * data table. Pagination is client-driven: the `page` state is forwarded to
 * the API which returns the corresponding page of results.
 */
export default function UsersPage() {
  const [role, setRole] = useState('');
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { users, loading, error } = useUsers({ role, degree, university, search, page });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Users</h2>
      </div>

      <div className="rounded-xl bg-white border border-gray-100 shadow-card">
        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-4 border-b border-gray-50">
          <Input placeholder="Search by phone" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Input placeholder="Role (1/2/3)" value={role} onChange={(e) => setRole(e.target.value)} />
          <Input placeholder="Degree (1/2/3)" value={degree} onChange={(e) => setDegree(e.target.value)} />
          <Input placeholder="University ID" value={university} onChange={(e) => setUniversity(e.target.value)} />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12 text-sm text-gray-400">Loading...</div>
        )}
        {error && (
          <div className="m-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <div className="overflow-auto">
          <Table>
            <THead>
              <tr>
                {['#', 'Phone', 'First Name', 'Last Name', 'Role', 'Type', 'Degree', 'Balance', 'Available', 'University'].map((head) => (
                  <th key={head} className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {head}
                  </th>
                ))}
              </tr>
            </THead>
            <TBody>
              {users.map((user, idx) => (
                <tr key={user.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-400">{(page - 1) * 20 + idx + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.phone_number}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{user.first_name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{user.last_name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLORS[user.role] ?? ''}`}>
                      {ROLE_LABELS[user.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{USER_TYPE_LABELS[user.user_type]}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{DEGREE_LABELS[user.degree]}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{user.balance}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{user.available}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.university?.name || '—'}</td>
                </tr>
              ))}
              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-10 text-center text-sm text-gray-400">
                    No records found
                  </td>
                </tr>
              )}
            </TBody>
          </Table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-50 px-4 py-3">
          <span className="text-xs text-gray-400">{users.length} results</span>
          <div className="flex items-center gap-1">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 text-sm font-medium text-gray-700">{page}</span>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={users.length === 0}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
