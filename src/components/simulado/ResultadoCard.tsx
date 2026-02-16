import { useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Target, RotateCcw, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ResultadoSimulado } from '@/types';

interface ResultadoCardProps {
  resultado: ResultadoSimulado;
  onReiniciar: () => void;
  onVoltar: () => void;
  formatarTempo: (ms: number) => string;
}

export function ResultadoCard({ resultado, onReiniciar, onVoltar, formatarTempo }: ResultadoCardProps) {
  const aprovado = resultado.percentual >= 70;

  useEffect(() => {
    // Confetti effect for approved users
    if (aprovado) {
      const colors = ['#10b981', '#14b8a6', '#f59e0b', '#ef4444'];
      const confetti = Array.from({ length: 50 }).map(() => {
        const el = document.createElement('div');
        el.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          left: ${Math.random() * 100}vw;
          top: -10px;
          border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
          z-index: 9999;
          animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
        `;
        document.body.appendChild(el);
        return el;
      });

      const style = document.createElement('style');
      style.textContent = `
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      setTimeout(() => {
        confetti.forEach(el => el.remove());
        style.remove();
      }, 4000);
    }
  }, [aprovado]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className={`px-6 py-8 text-center ${
        aprovado 
          ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
          : 'bg-gradient-to-r from-orange-500 to-red-500'
      }`}>
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
          {aprovado ? (
            <Trophy className="h-10 w-10 text-white" />
          ) : (
            <Target className="h-10 w-10 text-white" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {aprovado ? 'Parabéns! Você foi aprovado!' : 'Não desanime! Tente novamente'}
        </h2>
        <p className="text-white/80">
          {aprovado 
            ? 'Você demonstrou excelente conhecimento sobre trânsito.' 
            : 'Estude um pouco mais e tente novamente. Você consegue!'}
        </p>
      </div>

      {/* Stats */}
      <div className="p-6 lg:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{resultado.acertos}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Acertos</p>
          </div>

          <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{resultado.erros}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Erros</p>
          </div>

          <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{resultado.percentual}%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Aproveitamento</p>
          </div>

          <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatarTempo(resultado.tempoTotal)}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tempo</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">Desempenho</span>
            <span className={`text-sm font-medium ${
              aprovado ? 'text-emerald-600' : 'text-orange-600'
            }`}>
              {resultado.percentual >= 90 ? 'Excelente' : resultado.percentual >= 70 ? 'Aprovado' : 'Reprovado'}
            </span>
          </div>
          <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                aprovado 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500'
              }`}
              style={{ width: `${resultado.percentual}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            Nota mínima para aprovação: 70%
          </p>
        </div>

        {/* Feedback */}
        <div className={`p-4 rounded-xl mb-6 ${
          aprovado 
            ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' 
            : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
        }`}>
          <p className={`text-sm ${
            aprovado ? 'text-emerald-700 dark:text-emerald-400' : 'text-orange-700 dark:text-orange-400'
          }`}>
            {resultado.percentual >= 90 
              ? '🌟 Incrível! Você domina perfeitamente as regras de trânsito. Está mais que pronto para a prova real!'
              : resultado.percentual >= 80
              ? '👏 Muito bem! Você tem um ótimo conhecimento. Continue praticando para chegar à perfeição!'
              : resultado.percentual >= 70
              ? '✅ Parabéns pela aprovação! Você está no caminho certo. Pratique mais para aumentar sua confiança!'
              : resultado.percentual >= 50
              ? '💪 Você está no caminho, mas precisa estudar mais. Revise os conteúdos e tente novamente!'
              : '📚 É hora de estudar mais! Recomendamos ler o material teórico e fazer mais simulados.'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onReiniciar}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Refazer Simulado
          </Button>
          <Button
            variant="outline"
            onClick={onVoltar}
            className="flex-1"
          >
            Voltar para Categorias
          </Button>
        </div>
      </div>
    </div>
  );
}
