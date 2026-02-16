import { useState } from 'react';
import { Trophy, Medal, Award, Star, TrendingUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { rankingSimulado } from '@/data/questoes';

export function Ranking() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('TODAS');

  const rankingFiltrado = filtroCategoria === 'TODAS' 
    ? rankingSimulado 
    : rankingSimulado.filter(r => r.categoria === filtroCategoria);

  const getIcon = (posicao: number) => {
    switch (posicao) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-slate-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <Star className="h-5 w-5 text-slate-300" />;
    }
  };

  const getRowStyle = (posicao: number) => {
    switch (posicao) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800';
      case 2:
        return 'bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border-slate-200 dark:border-slate-700';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Ranking de Alunos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Confira os melhores desempenhos nos simulados. 
            Compita com outros estudantes e tente chegar ao topo do ranking!
          </p>
        </div>

        {/* Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-500" />
              <span className="text-slate-600 dark:text-slate-400">Filtrar por categoria:</span>
            </div>
            <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODAS">Todas as categorias</SelectItem>
                <SelectItem value="A">Categoria A</SelectItem>
                <SelectItem value="B">Categoria B</SelectItem>
                <SelectItem value="C">Categoria C</SelectItem>
                <SelectItem value="D">Categoria D</SelectItem>
                <SelectItem value="E">Categoria E</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Podium - Top 3 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-3 gap-4 items-end">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-t-2xl p-4 pb-8">
                <Medal className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                <p className="font-bold text-slate-700 dark:text-slate-300">2º</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                  {rankingFiltrado[1]?.nome || '-'}
                </p>
                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
                  {rankingFiltrado[1]?.pontuacao || '-'}%
                </p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 dark:from-yellow-600 dark:to-yellow-700 rounded-t-2xl p-4 pb-12">
                <Trophy className="h-12 w-12 text-yellow-700 mx-auto mb-2" />
                <p className="font-bold text-yellow-800">1º</p>
                <p className="text-sm text-yellow-900 truncate">
                  {rankingFiltrado[0]?.nome || '-'}
                </p>
                <p className="text-xl font-bold text-yellow-800">
                  {rankingFiltrado[0]?.pontuacao || '-'}%
                </p>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="bg-gradient-to-b from-amber-200 to-amber-400 dark:from-amber-700 dark:to-amber-800 rounded-t-2xl p-4 pb-6">
                <Award className="h-8 w-8 text-amber-700 mx-auto mb-2" />
                <p className="font-bold text-amber-800">3º</p>
                <p className="text-sm text-amber-900 truncate">
                  {rankingFiltrado[2]?.nome || '-'}
                </p>
                <p className="text-lg font-bold text-amber-800">
                  {rankingFiltrado[2]?.pontuacao || '-'}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ranking List */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 text-sm font-medium text-slate-600 dark:text-slate-400">
              <div className="col-span-2 text-center">Posição</div>
              <div className="col-span-5">Nome</div>
              <div className="col-span-2 text-center">Pontuação</div>
              <div className="col-span-2 text-center">Categoria</div>
              <div className="col-span-1 text-center">Data</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {rankingFiltrado.map((item) => (
                <div
                  key={`${item.posicao}-${item.nome}`}
                  className={`grid grid-cols-12 gap-4 p-4 items-center ${getRowStyle(item.posicao)}`}
                >
                  <div className="col-span-2 flex justify-center">
                    {getIcon(item.posicao)}
                  </div>
                  <div className="col-span-5">
                    <p className={`font-medium ${
                      item.posicao <= 3 
                        ? 'text-slate-900 dark:text-white' 
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {item.nome}
                    </p>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      item.pontuacao >= 90
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                        : item.pontuacao >= 70
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                    }`}>
                      {item.pontuacao}%
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Cat. {item.categoria}
                    </span>
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="text-xs text-slate-400">
                      {new Date(item.data).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8">
            <TrendingUp className="h-10 w-10 text-white mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Quer aparecer no ranking?
            </h3>
            <p className="text-emerald-100 mb-6">
              Faça simulados e alcance as melhores pontuações para entrar no nosso ranking!
            </p>
            <Button 
              variant="secondary" 
              className="bg-white text-emerald-600 hover:bg-emerald-50"
              onClick={() => window.location.href = '/categorias'}
            >
              Fazer Simulado Agora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
