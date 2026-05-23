'use client';

import { useMemo } from 'react';
import { Users, UserCheck, GraduationCap, FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAppeals } from '@/hooks/useAppeals';
import { useUsers } from '@/hooks/useUsers';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

function StatCard({ title, value, icon, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-card border border-gray-100">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</p>
        <p className="mt-0.5 text-2xl font-bold text-gray-900">{value.toLocaleString('uz-UZ')}</p>
      </div>
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
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-white border border-gray-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Umumiy statistika</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Jami foydalanuvchilar"
            value={stats.users}
            icon={<Users size={20} />}
            iconBg="bg-brand-light"
            iconColor="text-brand"
          />
          <StatCard
            title="Sponsorlar"
            value={stats.sponsors}
            icon={<UserCheck size={20} />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <StatCard
            title="Talabalar"
            value={stats.students}
            icon={<GraduationCap size={20} />}
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Jami arizalar"
            value={stats.appeals}
            icon={<FileText size={20} />}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Arizalar holati</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Yangi"
            value={stats.newAppeals}
            icon={<Clock size={20} />}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Moderatsiya"
            value={stats.moderationAppeals}
            icon={<AlertCircle size={20} />}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
          <StatCard
            title="Tasdiqlangan"
            value={stats.confirmedAppeals}
            icon={<CheckCircle size={20} />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <StatCard
            title="Bekor qilingan"
            value={stats.cancelledAppeals}
            icon={<XCircle size={20} />}
            iconBg="bg-red-50"
            iconColor="text-red-500"
          />
        </div>
      </div>
    </div>
  );
}
