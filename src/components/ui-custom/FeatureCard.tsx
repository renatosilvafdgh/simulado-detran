import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
