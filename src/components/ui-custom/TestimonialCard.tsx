import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export function TestimonialCard({ name, role, content, rating, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-slate-300 dark:text-slate-600'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
        "{content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-semibold">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-white text-sm">{name}</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}
