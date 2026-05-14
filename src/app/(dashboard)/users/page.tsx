'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { TBody, THead, Table } from '@/components/ui/Table';
import { useUsers } from '@/hooks/useUsers';
import { DEGREE_LABELS, ROLE_LABELS, USER_TYPE_LABELS } from '@/types';

export default function UsersPage() {
  const [role, setRole] = useState('');
  const [degree, setDegree] = useState('');
  const [university, setUniversity] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { users, loading, error } = useUsers({ role, degree, university, search, page });

  const paginated = useMemo(() => {
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [users, page]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Foydalanuvchilar</h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        <Input placeholder="Search phone" value={search} onChange={(event) => setSearch(event.target.value)} />
        <Input placeholder="Role (1/2/3)" value={role} onChange={(event) => setRole(event.target.value)} />
        <Input placeholder="Degree (1/2/3)" value={degree} onChange={(event) => setDegree(event.target.value)} />
        <Input placeholder="University ID" value={university} onChange={(event) => setUniversity(event.target.value)} />
      </div>
      {loading && <div className="rounded bg-white p-4">Yuklanmoqda...</div>}
      {error && <div className="rounded bg-red-50 p-4 text-red-700">{error}</div>}
      <div className="overflow-auto rounded-lg border border-gray-200 bg-white">
        <Table>
          <THead>
            <tr>
              {['Phone', 'First name', 'Last name', 'Role', 'User type', 'Degree', 'Balance', 'Available', 'University'].map((head) => (
                <th key={head} className="px-3 py-2 text-left font-medium text-gray-600">
                  {head}
                </th>
              ))}
            </tr>
          </THead>
          <TBody>
            {paginated.map((user) => (
              <tr key={user.id}>
                <td className="px-3 py-2">{user.phone_number}</td>
                <td className="px-3 py-2">{user.first_name}</td>
                <td className="px-3 py-2">{user.last_name}</td>
                <td className="px-3 py-2">{ROLE_LABELS[user.role]}</td>
                <td className="px-3 py-2">{USER_TYPE_LABELS[user.user_type]}</td>
                <td className="px-3 py-2">{DEGREE_LABELS[user.degree]}</td>
                <td className="px-3 py-2">{user.balance}</td>
                <td className="px-3 py-2">{user.available}</td>
                <td className="px-3 py-2">{user.university?.name || '-'}</td>
              </tr>
            ))}
          </TBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2">
        <button className="rounded border px-2 py-1" onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
          Prev
        </button>
        <span>{page}</span>
        <button className="rounded border px-2 py-1" onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
