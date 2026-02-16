import { Check, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Questao } from '@/types';

interface QuestaoCardProps {
  questao: Questao;
  numeroAtual: number;
  totalQuestoes: number;
  respostaSelecionada: number | null;
  mostrarResposta: boolean;
  onSelecionarResposta: (indice: number) => void;
  onConfirmar: () => void;
  tempoFormatado: string;
}

export function QuestaoCard({
  questao,
  numeroAtual,
  totalQuestoes,
  respostaSelecionada,
  mostrarResposta,
  onSelecionarResposta,
  onConfirmar,
  tempoFormatado
}: QuestaoCardProps) {
  const letras = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
            Questão {numeroAtual} de {totalQuestoes}
          </span>
          <span className="text-emerald-100 text-sm">
            {questao.assunto}
          </span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <span className="text-sm">⏱️</span>
          <span className="font-mono font-medium">{tempoFormatado}</span>
        </div>
      </div>

      {/* Question */}
      <div className="p-6 lg:p-8">
        <h2 className="text-lg lg:text-xl font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed">
          {questao.pergunta}
        </h2>

        {/* Alternatives */}
        <div className="space-y-3">
          {questao.alternativas.map((alternativa, indice) => {
            const isSelecionada = respostaSelecionada === indice;
            const isCorreta = questao.respostaCorreta === indice;
            const mostrarCorreta = mostrarResposta && isCorreta;
            const mostrarErrada = mostrarResposta && isSelecionada && !isCorreta;

            return (
              <button
                key={indice}
                onClick={() => onSelecionarResposta(indice)}
                disabled={mostrarResposta}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  mostrarCorreta
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : mostrarErrada
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : isSelecionada
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm ${
                      mostrarCorreta
                        ? 'bg-emerald-500 text-white'
                        : mostrarErrada
                        ? 'bg-red-500 text-white'
                        : isSelecionada
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {letras[indice]}
                  </span>
                  <span className={`flex-1 ${
                    mostrarCorreta
                      ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                      : mostrarErrada
                      ? 'text-red-700 dark:text-red-400'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {alternativa}
                  </span>
                  {mostrarCorreta && <Check className="h-5 w-5 text-emerald-500" />}
                  {mostrarErrada && <X className="h-5 w-5 text-red-500" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {mostrarResposta && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-400 mb-1">
                  Explicação
                </p>
                <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                  {questao.explicacao}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          {!mostrarResposta ? (
            <Button
              onClick={onConfirmar}
              disabled={respostaSelecionada === null}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8"
            >
              Confirmar Resposta
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
