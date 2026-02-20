import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Zap,
  Clock,
  ArrowRight,
  Loader2,
  CheckCircle,   // added if used by SimuladoOption or other, keeping for safety
  Shield,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';
import { getQuestionsByCategory, createSimulado } from '@/services/simulado.service';
import type { Database } from '@/types/database.types';

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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [generatingSimulado, setGeneratingSimulado] = useState(false);

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

  const iniciarSimulado = async (_tipo: 'RAPIDO' | 'COMPLETO', quantidade: number) => {
    setGeneratingSimulado(true);

    try {
      // Fetch questions from Supabase across all modules using the new distribution logic
      const res = await getQuestionsByCategory(
        "Geral", // Category name is ignored in current logic but required parameter
        quantidade
      );

      const questions = res.data;
      const questionsError = res.error;

      if (questionsError || !questions || questions.length === 0) {
        alert('Não há questões disponíveis. Por favor, adicione questões no banco de dados.');
        setGeneratingSimulado(false);
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
        setGeneratingSimulado(false);
        return;
      }

      // Navigate to simulado execution page
      navigate(`/simulado/executar/${simulado.id}`);
    } catch (err) {
      console.error('Erro ao iniciar simulado:', err);
      alert('Erro ao iniciar simulado. Verifique sua conexão.');
    } finally {
      setGeneratingSimulado(false);
    }
  };

  if (authLoading) {
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
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 hover:shadow-xl transition-shadow flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 shadow-md">
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {opcao.nome}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-base mb-6 px-4">
                    {opcao.descricao}
                  </p>

                  <div className="flex items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400 mb-8 bg-slate-50 dark:bg-slate-700/50 py-3 px-6 rounded-xl w-full">
                    <span className="flex items-center gap-2 font-medium">
                      <BookOpen className="h-4 w-4 text-emerald-500" />
                      {opcao.questoes} questões
                    </span>
                    <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                    <span className="flex items-center gap-2 font-medium">
                      <Clock className="h-4 w-4 text-emerald-500" />
                      {opcao.tempo}
                    </span>
                  </div>

                  <Button
                    onClick={() => iniciarSimulado(opcao.tipo, opcao.questoes)}
                    disabled={generatingSimulado}
                    className="w-full h-12 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white disabled:opacity-50 transition-all rounded-xl shadow-lg shadow-emerald-500/20"
                  >
                    {generatingSimulado ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        Iniciar Agora
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
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
