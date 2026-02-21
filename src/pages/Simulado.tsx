import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  Zap,
  Clock,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';
import { getQuestionsByCategory, createSimulado } from '@/services/simulado.service';

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
  const [searchParams] = useSearchParams();
  const estadoFromUrl = searchParams.get('estado');

  const { user, loading: authLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [generatingSimulado, setGeneratingSimulado] = useState<'RAPIDO' | 'COMPLETO' | null>(null);

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

  const iniciarSimulado = async (tipo: 'RAPIDO' | 'COMPLETO', quantidade: number) => {
    setGeneratingSimulado(tipo);

    try {
      // Fetch questions from Supabase across all modules using the new distribution logic
      const res = await getQuestionsByCategory(
        "Geral", // Category name is ignored in current logic but required parameter
        quantidade,
        estadoFromUrl || undefined
      );

      const questions = res.data;
      const questionsError = res.error;

      if (questionsError || !questions || questions.length === 0) {
        alert('Não há questões disponíveis. Por favor, adicione questões no banco de dados.');
        setGeneratingSimulado(null);
        return;
      }

      // Create simulado session
      const { data: simulado, error: simuladoError } = await createSimulado(
        (user?.id || null) as string | null,
        "Geral",
        questions.length
      );

      if (simuladoError || !simulado) {
        console.error('Detalhes do erro:', simuladoError);
        alert(`Erro ao criar simulado: ${simuladoError?.message || JSON.stringify(simuladoError) || 'Erro desconhecido'}`);
        setGeneratingSimulado(null);
        return;
      }

      // Navigate to simulado execution page
      navigate(`/simulado/executar/${simulado.id}`);
    } catch (err) {
      console.error('Erro ao iniciar simulado:', err);
      alert('Erro ao iniciar simulado. Verifique sua conexão.');
    } finally {
      setGeneratingSimulado(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pt-32 lg:pt-36 pb-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 lg:pt-36 pb-16 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
      {/* Decorative Blob Backgrounds for Glass Effect */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] rounded-full bg-emerald-400/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen transition-all duration-1000"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] rounded-full bg-teal-400/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen transition-all duration-1000"></div>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Opções de Simulado
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Escolha iniciar um simulado rápido ou ter a experiência completa do exame.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opcoesSimulado.map((opcao) => {
              const Icon = opcao.icon;

              return (
                <div
                  key={opcao.tipo}
                  className="relative group bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)] border border-white/60 hover:border-white/90 dark:border-slate-700/50 dark:hover:border-slate-600/80 p-8 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
                >
                  {/* Subtle Top Inner Glow for Glass Detail */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-emerald-400/30 to-transparent"></div>

                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="h-10 w-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                    {opcao.nome}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-base mb-6 px-4">
                    {opcao.descricao}
                  </p>

                  <div className="flex items-center justify-center gap-6 text-sm text-slate-700 dark:text-slate-200 mb-8 bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm border border-white/30 dark:border-slate-600/30 py-3 px-6 rounded-xl w-full shadow-inner">
                    <span className="flex items-center gap-2 font-semibold">
                      <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      {opcao.questoes} questões
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300/80 dark:bg-slate-500/80"></div>
                    <span className="flex items-center gap-2 font-semibold">
                      <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      {opcao.tempo}
                    </span>
                  </div>

                  <button
                    onClick={() => iniciarSimulado(opcao.tipo, opcao.questoes)}
                    disabled={generatingSimulado !== null}
                    className="btn-3d disabled:opacity-50 disabled:cursor-not-allowed group/btn focus:outline-none"
                  >
                    <span className="btn-3d-top">
                      {generatingSimulado === opcao.tipo ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        <>
                          Iniciar Agora
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                        </>
                      )}
                    </span>
                    <span className="btn-3d-bottom"></span>
                    <span className="btn-3d-base"></span>
                  </button>
                </div>
              );
            })}
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
