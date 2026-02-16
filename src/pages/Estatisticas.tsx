import { useEffect, useState } from 'react';
import { 
  BarChart3, 
  Target, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Award,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useEstatisticas } from '@/hooks/useEstatisticas';
import type { ResultadoSimulado } from '@/types';

export function Estatisticas() {
  const { 
    simuladosRealizados, 
    totalQuestoesRespondidas, 
    totalAcertos, 
    mediaAproveitamento,
    melhorPontuacao,
    tempoTotalEstudo,
    historico,
    limparEstatisticas,
    formatarTempo
  } = useEstatisticas();

  const [showClearDialog, setShowClearDialog] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLimpar = () => {
    limparEstatisticas();
    setShowClearDialog(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Minhas Estatísticas
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Acompanhe seu progresso e evolução nos simulados.
            </p>
          </div>
          {simuladosRealizados > 0 && (
            <Button
              variant="outline"
              onClick={() => setShowClearDialog(true)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Dados
            </Button>
          )}
        </div>

        {simuladosRealizados === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="h-12 w-12 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Nenhum simulado realizado ainda
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Faça seu primeiro simulado para começar a acompanhar suas estatísticas de desempenho.
            </p>
            <Button 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
              onClick={() => window.location.href = '/categorias'}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Fazer Primeiro Simulado
            </Button>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Simulados</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {simuladosRealizados}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Questões</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {totalQuestoesRespondidas}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Média</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {mediaAproveitamento}%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Melhor Nota</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                      {melhorPontuacao}%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <Award className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {/* Progress Overview */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                  Desempenho Geral
                </h3>
                
                <div className="space-y-6">
                  {/* Acertos */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        Acertos
                      </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {totalAcertos} ({Math.round((totalAcertos / totalQuestoesRespondidas) * 100)}%)
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${(totalAcertos / totalQuestoesRespondidas) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Erros */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Erros
                      </span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {totalQuestoesRespondidas - totalAcertos} ({Math.round(((totalQuestoesRespondidas - totalAcertos) / totalQuestoesRespondidas) * 100)}%)
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${((totalQuestoesRespondidas - totalAcertos) / totalQuestoesRespondidas) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Tempo */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Tempo total de estudo</p>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">
                        {formatarTempo(tempoTotalEstudo)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                  Resumo Rápido
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Taxa de acerto</span>
                    <span className={`font-semibold ${
                      mediaAproveitamento >= 70 ? 'text-emerald-600' : 'text-orange-600'
                    }`}>
                      {mediaAproveitamento}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Média por simulado</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {Math.round(totalQuestoesRespondidas / simuladosRealizados)} questões
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Status</span>
                    <span className={`font-semibold ${
                      mediaAproveitamento >= 70 ? 'text-emerald-600' : 'text-orange-600'
                    }`}>
                      {mediaAproveitamento >= 70 ? 'Apto para prova' : 'Precisa estudar mais'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Histórico de Simulados
                </h3>
              </div>
              
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {historico.slice(0, 10).map((item: ResultadoSimulado, index: number) => (
                  <div 
                    key={index}
                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="col-span-2 sm:col-span-1">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium">
                        {historico.length - index}
                      </span>
                    </div>
                    <div className="col-span-4 sm:col-span-3">
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(item.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Cat. {item.categoria}
                      </span>
                    </div>
                    <div className="col-span-3 sm:col-span-2 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        item.percentual >= 70
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                      }`}>
                        {item.percentual}%
                      </span>
                    </div>
                    <div className="hidden sm:col-span-2 sm:flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                      <CheckCircle className="h-3 w-3 text-emerald-500" />
                      {item.acertos}/{item.totalQuestoes}
                    </div>
                    <div className="hidden sm:col-span-2 sm:flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-3 w-3" />
                      {formatarTempo(item.tempoTotal)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Clear Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limpar estatísticas?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todo o seu histórico de simulados será apagado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleLimpar}
              className="bg-red-500 hover:bg-red-600"
            >
              Limpar Tudo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
