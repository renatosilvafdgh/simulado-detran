import { Link } from 'react-router-dom';
import { Bike, Car, Truck, Bus, Container, ArrowRight } from 'lucide-react';
import type { CategoriaCNH } from '@/types';

interface CategoryCardProps {
  categoria: CategoriaCNH;
  nome: string;
  descricao: string;
  questoes: number;
  tempo: string;
  aprovacao: string;
  gradient: string;
}

const iconMap = {
  A: Bike,
  B: Car,
  C: Truck,
  D: Bus,
  E: Container
};

export function CategoryCard({ 
  categoria, 
  nome, 
  descricao, 
  questoes, 
  tempo, 
  aprovacao,
  gradient 
}: CategoryCardProps) {
  const Icon = iconMap[categoria];

  return (
    <Link to={`/simulado?categoria=${categoria}`}>
      <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* Gradient Background on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-7 w-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {nome}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
          {descricao}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{questoes}</span> questões
          </span>
          <span className="flex items-center gap-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{tempo}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="font-semibold text-emerald-600">{aprovacao}</span> aprovação
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 group-hover:gap-2 transition-all">
          <span>Iniciar Simulado</span>
          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
