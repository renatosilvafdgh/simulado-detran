import { useState, useCallback, useEffect } from 'react';
import type { Questao, ResultadoSimulado, ConfigSimulado } from '@/types';
import { questoesDetran } from '@/data/questoes';

interface SimuladoState {
  questoes: Questao[];
  questaoAtual: number;
  respostas: Map<number, number>;
  respostaSelecionada: number | null;
  mostrarResposta: boolean;
  tempoInicio: number;
  tempoDecorrido: number;
  finalizado: boolean;
}

export function useSimulado() {
  const [state, setState] = useState<SimuladoState>({
    questoes: [],
    questaoAtual: 0,
    respostas: new Map(),
    respostaSelecionada: null,
    mostrarResposta: false,
    tempoInicio: 0,
    tempoDecorrido: 0,
    finalizado: false
  });

  const [config, setConfig] = useState<ConfigSimulado | null>(null);

  // Timer effect
  useEffect(() => {
    if (state.tempoInicio > 0 && !state.finalizado) {
      const interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          tempoDecorrido: Date.now() - prev.tempoInicio
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.tempoInicio, state.finalizado]);

  const iniciarSimulado = useCallback((configSimulado: ConfigSimulado) => {
    const questoesFiltradas = questoesDetran.filter(
      q => q.categoria === configSimulado.categoria || q.categoria === 'TODAS'
    );
    
    // Embaralhar questões
    const questoesEmbaralhadas = [...questoesFiltradas]
      .sort(() => Math.random() - 0.5)
      .slice(0, configSimulado.quantidadeQuestoes);

    setConfig(configSimulado);
    setState({
      questoes: questoesEmbaralhadas,
      questaoAtual: 0,
      respostas: new Map(),
      respostaSelecionada: null,
      mostrarResposta: false,
      tempoInicio: Date.now(),
      tempoDecorrido: 0,
      finalizado: false
    });
  }, []);

  const selecionarResposta = useCallback((indice: number) => {
    if (state.mostrarResposta) return;
    setState(prev => ({ ...prev, respostaSelecionada: indice }));
  }, [state.mostrarResposta]);

  const confirmarResposta = useCallback(() => {
    if (state.respostaSelecionada === null) return;
    
    setState(prev => ({
      ...prev,
      respostas: new Map(prev.respostas).set(
        prev.questoes[prev.questaoAtual].id,
        prev.respostaSelecionada!
      ),
      mostrarResposta: true
    }));
  }, [state.respostaSelecionada]);

  const proximaQuestao = useCallback(() => {
    if (state.questaoAtual < state.questoes.length - 1) {
      setState(prev => ({
        ...prev,
        questaoAtual: prev.questaoAtual + 1,
        respostaSelecionada: null,
        mostrarResposta: false
      }));
    } else {
      finalizarSimulado();
    }
  }, [state.questaoAtual, state.questoes.length]);

  const questaoAnterior = useCallback(() => {
    if (state.questaoAtual > 0) {
      const questaoId = state.questoes[state.questaoAtual - 1].id;
      const respostaAnterior = state.respostas.get(questaoId) ?? null;
      
      setState(prev => ({
        ...prev,
        questaoAtual: prev.questaoAtual - 1,
        respostaSelecionada: respostaAnterior,
        mostrarResposta: respostaAnterior !== null
      }));
    }
  }, [state.questaoAtual, state.questoes, state.respostas]);

  const finalizarSimulado = useCallback(() => {
    setState(prev => ({ ...prev, finalizado: true }));
    
    // Salvar resultado
    const acertos = calcularAcertos();
    const resultado: ResultadoSimulado = {
      totalQuestoes: state.questoes.length,
      acertos,
      erros: state.questoes.length - acertos,
      percentual: Math.round((acertos / state.questoes.length) * 100),
      tempoTotal: state.tempoDecorrido,
      categoria: config?.categoria || 'B',
      data: new Date().toISOString()
    };

    const historico = JSON.parse(localStorage.getItem('simulado-brasil-historico') || '[]');
    historico.unshift(resultado);
    localStorage.setItem('simulado-brasil-historico', JSON.stringify(historico.slice(0, 50)));
  }, [state.questoes, state.tempoDecorrido, config]);

  const calcularAcertos = useCallback(() => {
    let acertos = 0;
    state.respostas.forEach((resposta, questaoId) => {
      const questao = state.questoes.find(q => q.id === questaoId);
      if (questao && questao.respostaCorreta === resposta) {
        acertos++;
      }
    });
    return acertos;
  }, [state.respostas, state.questoes]);

  const getResultado = useCallback((): ResultadoSimulado => {
    const acertos = calcularAcertos();
    return {
      totalQuestoes: state.questoes.length,
      acertos,
      erros: state.questoes.length - acertos,
      percentual: Math.round((acertos / state.questoes.length) * 100),
      tempoTotal: state.tempoDecorrido,
      categoria: config?.categoria || 'B',
      data: new Date().toISOString()
    };
  }, [state.questoes, state.tempoDecorrido, config, calcularAcertos]);

  const reiniciarSimulado = useCallback(() => {
    if (config) {
      iniciarSimulado(config);
    }
  }, [config, iniciarSimulado]);

  const formatarTempo = useCallback((ms: number): string => {
    const segundos = Math.floor(ms / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    
    if (horas > 0) {
      return `${horas}:${(minutos % 60).toString().padStart(2, '0')}:${(segundos % 60).toString().padStart(2, '0')}`;
    }
    return `${minutos}:${(segundos % 60).toString().padStart(2, '0')}`;
  }, []);

  return {
    ...state,
    config,
    questaoAtualObj: state.questoes[state.questaoAtual],
    progresso: state.questoes.length > 0 ? ((state.questaoAtual + 1) / state.questoes.length) * 100 : 0,
    iniciarSimulado,
    selecionarResposta,
    confirmarResposta,
    proximaQuestao,
    questaoAnterior,
    finalizarSimulado,
    reiniciarSimulado,
    getResultado,
    formatarTempo
  };
}
