interface ProgressBarProps {
  progresso: number;
  atual: number;
  total: number;
}

export function ProgressBar({ progresso, atual, total }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Progresso do simulado
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {Math.round(progresso)}%
        </span>
      </div>
      <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progresso}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i < atual 
                ? 'bg-emerald-500' 
                : i === atual 
                ? 'bg-teal-600 animate-pulse' 
                : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
