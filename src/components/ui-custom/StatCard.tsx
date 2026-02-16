import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ icon: Icon, value, label, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 flex items-center gap-1 ${
              trendUp ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {trend}
              {trendUp ? '↑' : '↓'}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
    </div>
  );
}
