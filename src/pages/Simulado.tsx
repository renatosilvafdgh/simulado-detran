import { useState, useEffect } from 'react';
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
  BookOpen,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// Select imports removed
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';
import { getCategories } from '@/services/category.service';
import { getQuestionsByCategory, createSimulado } from '@/services/simulado.service';
import type { Database } from '@/types/database.types';

type Category = Database['public']['Tables']['categories']['Row'];

interface SimuladoOption {
  tipo: 'RAPIDO' | 'COMPLETO';
  nome: string;
  descricao: string;
  questoes: number;
  tempo: string;
  icon: React.ElementType;
}

export function Simulado() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [generatingSimulado, setGeneratingSimulado] = useState(false);

  // Load categories from Supabase
  useEffect(() => {
    async function loadCategories() {
      try {
        const { data, error } = await getCategories();
        if (data && !error) {
          console.log('Received Categories:', data.map(c => c.name));
          // Filter out 'Placas' category as requested
          // Enhanced filter to catch any variation
          const filteredCategories = data.filter(c => {
            const name = c.name.toLowerCase();
            return !name.includes('placa') &&
              !name.includes('caminho') &&
              !name.includes('cor');
          });
          console.log('Filtered Categories:', filteredCategories.map(c => c.name));
          setCategories(filteredCategories);

          if (filteredCategories.length > 0) {
            setCategoriaSelecionada(filteredCategories[0].id);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar categorias:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

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
      descricao: '20 questões para treino completo',
      questoes: 20,
      tempo: '30 min',
      icon: BookOpen
    }
  ];

  const iconMap: Record<string, React.ElementType> = {
    'A': Bike,
    'B': Car,
    'C': Truck,
    'D': Bus,
    'E': Container,
  };

  const iniciarSimulado = async (_tipo: 'RAPIDO' | 'COMPLETO', quantidade: number) => {
    if (!categoriaSelecionada) {
      alert('Selecione uma categoria primeiro');
      return;
    }

    // Get category name from selected category
    const selectedCat = categories.find(c => c.id === categoriaSelecionada);
    if (!selectedCat) return;

    setGeneratingSimulado(true);

    try {
      // Fetch questions from Supabase using category name (A, B, C, D, E)
      // Now always uses getQuestionsByCategory which internally mixes in Placas questions
      const res = await getQuestionsByCategory(
        selectedCat.name,
        quantidade
      );

      const questions = res.data;
      const questionsError = res.error;

      if (questionsError || !questions || questions.length === 0) {
        alert('Não há questões disponíveis para esta categoria. Por favor, adicione questões no banco de dados.');
        setGeneratingSimulado(false);
        return;
      }

      // Create simulado session with category name
      const { data: simulado, error: simuladoError } = await createSimulado(
        (user?.id || null) as string | null,
        selectedCat.name,
        questions.length
      );

      if (simuladoError || !simulado) {
        console.error('Detalhes do erro:', simuladoError);
        alert(`Erro ao criar simulado: ${simuladoError?.message || JSON.stringify(simuladoError) || 'Erro desconhecido'}`);
        setGeneratingSimulado(false);
        return;
      }

      // Navigate to simulado execution page with simulado ID
      navigate(`/simulado/executar/${simulado.id}`);
    } catch (err) {
      console.error('Erro ao iniciar simulado:', err);
      alert('Erro ao iniciar simulado. Verifique sua conexão.');
    } finally {
      setGeneratingSimulado(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Escolha seu simulado (v2.0)
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Selecione a categoria e o tipo de simulado que deseja fazer.
            Todas as questões vêm diretamente do banco de dados.
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
                {categories.map((cat) => {
                  const Icon = iconMap[cat.name] || BookOpen;
                  const isSelected = categoriaSelecionada === cat.id;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoriaSelecionada(cat.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${isSelected
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                        }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className={`font-medium ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                          {cat.name}
                        </p>
                        {cat.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {cat.description}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <CheckCircle className="h-5 w-5 text-emerald-500 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>

              {categories.length === 0 && (
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Nenhuma categoria encontrada. Execute o schema SQL no Supabase.
                  </p>
                </div>
              )}

              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <Target className="h-4 w-4" />
                  <span>Nota de corte: 70%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span>Tempo sugerido: 30 minutos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Simulado Options */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              2. Escolha o tipo de simulado
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
                      disabled={generatingSimulado || !categoriaSelecionada}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white disabled:opacity-50"
                    >
                      {generatingSimulado ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        <>
                          Iniciar Simulado
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>


          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultView="login"
      />
    </div>
  );
}
