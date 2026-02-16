import { useState, useEffect, useCallback } from 'react';
import type { EstatisticasUsuario, ResultadoSimulado } from '@/types';

export function useEstatisticas() {
  const [estatisticas, setEstatisticas] = useState<EstatisticasUsuario>({
    simuladosRealizados: 0,
    totalQuestoesRespondidas: 0,
    totalAcertos: 0,
    mediaAproveitamento: 0,
    melhorPontuacao: 0,
    tempoTotalEstudo: 0,
    historico: []
  });

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = useCallback(() => {
    const historico: ResultadoSimulado[] = JSON.parse(
      localStorage.getItem('simulado-brasil-historico') || '[]'
    );

    if (historico.length === 0) return;

    const totalQuestoes = historico.reduce((acc, h) => acc + h.totalQuestoes, 0);
    const totalAcertos = historico.reduce((acc, h) => acc + h.acertos, 0);
    const melhorPontuacao = Math.max(...historico.map(h => h.percentual));
    const tempoTotal = historico.reduce((acc, h) => acc + h.tempoTotal, 0);

    setEstatisticas({
      simuladosRealizados: historico.length,
      totalQuestoesRespondidas: totalQuestoes,
      totalAcertos,
      mediaAproveitamento: Math.round((totalAcertos / totalQuestoes) * 100),
      melhorPontuacao,
      tempoTotalEstudo: tempoTotal,
      historico
    });
  }, []);

  const adicionarResultado = useCallback((resultado: ResultadoSimulado) => {
    const historico = JSON.parse(localStorage.getItem('simulado-brasil-historico') || '[]');
    historico.unshift(resultado);
    localStorage.setItem('simulado-brasil-historico', JSON.stringify(historico.slice(0, 50)));
    carregarEstatisticas();
  }, [carregarEstatisticas]);

  const limparEstatisticas = useCallback(() => {
    localStorage.removeItem('simulado-brasil-historico');
    setEstatisticas({
      simuladosRealizados: 0,
      totalQuestoesRespondidas: 0,
      totalAcertos: 0,
      mediaAproveitamento: 0,
      melhorPontuacao: 0,
      tempoTotalEstudo: 0,
      historico: []
    });
  }, []);

  const formatarTempo = useCallback((ms: number): string => {
    const segundos = Math.floor(ms / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    
    if (horas > 0) {
      return `${horas}h ${minutos % 60}min`;
    }
    return `${minutos}min`;
  }, []);

  return {
    ...estatisticas,
    adicionarResultado,
    limparEstatisticas,
    recarregar: carregarEstatisticas,
    formatarTempo
  };
}
