import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bike, 
  Car, 
  Truck, 
  Bus, 
  Container, 
  ArrowRight, 
  Clock, 
  Target,
  CheckCircle,
  Zap,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CategoriaCNH, TipoSimulado } from '@/types';
import { estadosBrasil, categoriasInfo } from '@/data/questoes';

interface SimuladoOption {
  tipo: TipoSimulado;
  nome: string;
  descricao: string;
  questoes: number;
  tempo: string;
  icon: React.ElementType;
}

export function Categorias() {
  const navigate = useNavigate();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaCNH>('B');
  const [estado, setEstado] = useState<string>('SP');

  const opcoesSimulado: SimuladoOption[] = [
    {
      tipo: 'RAPIDO',
      nome: 'Simulado Rápido',
      descricao: '10 questões para uma prática rápida',
      questoes: 10,
      tempo: '15 min',
      icon: Zap
    },
    {
      tipo: 'COMPLETO',
      nome: 'Simulado Completo',
      descricao: '30 questões no formato oficial do Detran',
      questoes: 30,
      tempo: '45 min',
      icon: BookOpen
    }
  ];

  const categorias = [
    { key: 'A', ...categoriasInfo.A },
    { key: 'B', ...categoriasInfo.B },
    { key: 'C', ...categoriasInfo.C },
    { key: 'D', ...categoriasInfo.D },
    { key: 'E', ...categoriasInfo.E },
  ];

  const iconMap = {
    A: Bike,
    B: Car,
    C: Truck,
    D: Bus,
    E: Container
  };

  const iniciarSimulado = (tipo: TipoSimulado, quantidade: number) => {
    navigate(`/simulado?categoria=${categoriaSelecionada}&tipo=${tipo}&estado=${estado}&questoes=${quantidade}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Escolha seu simulado
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Selecione a categoria da sua CNH e o tipo de simulado que deseja fazer. 
            Todas as questões são baseadas no conteúdo oficial do Detran.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Panel - Category Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                1. Escolha a categoria
              </h2>

              <div className="space-y-3 mb-6">
                {categorias.map((cat) => {
                  const Icon = iconMap[cat.key as keyof typeof iconMap];
                  const isSelected = categoriaSelecionada === cat.key;

                  return (
                    <button
                      key={cat.key}
                      onClick={() => setCategoriaSelecionada(cat.key as CategoriaCNH)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.cor} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className={`font-medium ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                          {cat.nome}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {cat.descricao}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5 text-emerald-500 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>

              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                2. Selecione seu estado
              </h2>

              <Select value={estado} onValueChange={setEstado}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  {estadosBrasil.map((est) => (
                    <SelectItem key={est.sigla} value={est.sigla}>
                      {est.nome} ({est.sigla})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <Target className="h-4 w-4" />
                  <span>Nota de corte: 70%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span>Tempo limite: 45 minutos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Simulado Options */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              3. Escolha o tipo de simulado
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {opcoesSimulado.map((opcao) => {
                const Icon = opcao.icon;

                return (
                  <div
                    key={opcao.tipo}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {opcao.nome}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                      {opcao.descricao}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {opcao.questoes} questões
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {opcao.tempo}
                      </span>
                    </div>

                    <Button
                      onClick={() => iniciarSimulado(opcao.tipo, opcao.questoes)}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                    >
                      Iniciar Simulado
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">500+</p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">Questões disponíveis</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">95%</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">Taxa de aprovação</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">Grátis</p>
                <p className="text-sm text-purple-700 dark:text-purple-300">Sem limites</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
