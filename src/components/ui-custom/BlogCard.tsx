import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  id: number;
  titulo: string;
  resumo: string;
  imagem: string;
  categoria: string;
  tempoLeitura: number;
  dataPublicacao: string;
}

export function BlogCard({ 
  id, 
  titulo, 
  resumo, 
  imagem, 
  categoria, 
  tempoLeitura,
  dataPublicacao 
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <article className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imagem} 
            alt={titulo}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
              {categoria}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span>{new Date(dataPublicacao).toLocaleDateString('pt-BR')}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {tempoLeitura} min
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {titulo}
          </h3>

          <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
            {resumo}
          </p>

          <div className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <span>Ler artigo</span>
            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}
