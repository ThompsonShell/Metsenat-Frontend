'use client';

import { useMemo } from 'react';
import { useAppeals } from '@/hooks/useAppeals';
import { useUsers } from '@/hooks/useUsers';

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { users, loading: usersLoading } = useUsers({});
  const { appeals, loading: appealsLoading } = useAppeals({});

  const stats = useMemo(() => {
    const sponsors = users.filter((user) => user.role === 3).length;
    const students = users.filter((user) => user.role === 2).length;

    return {
      users: users.length,
      sponsors,
      students,
      appeals: appeals.length,
      newAppeals: appeals.filter((appeal) => appeal.status === 1).length,
      moderationAppeals: appeals.filter((appeal) => appeal.status === 2).length,
      confirmedAppeals: appeals.filter((appeal) => appeal.status === 3).length,
      cancelledAppeals: appeals.filter((appeal) => appeal.status === 4).length,
    };
  }, [users, appeals]);

  if (usersLoading || appealsLoading) {
    return <div className="animate-pulse rounded bg-white p-6">Yuklanmoqda...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Jami foydalanuvchilar" value={stats.users} />
        <StatCard title="Jami sponsorlar" value={stats.sponsors} />
        <StatCard title="Jami talabalar" value={stats.students} />
        <StatCard title="Jami arizalar" value={stats.appeals} />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="NEW" value={stats.newAppeals} />
        <StatCard title="MODERATION" value={stats.moderationAppeals} />
        <StatCard title="CONFIRMED" value={stats.confirmedAppeals} />
        <StatCard title="CANCELLED" value={stats.cancelledAppeals} />
      </div>
    </div>
  );
}
