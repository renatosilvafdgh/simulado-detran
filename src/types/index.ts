// Tipos principais do Simulado Brasil

export type CategoriaCNH = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Questao {
  id: number;
  categoria: CategoriaCNH | 'TODAS';
  pergunta: string;
  alternativas: string[];
  respostaCorreta: number;
  imagem?: string;
  explicacao: string;
  assunto: string;
}

export interface SimuladoState {
  questoes: Questao[];
  questaoAtual: number;
  respostas: Map<number, number>;
  respostaSelecionada: number | null;
  mostrarResposta: boolean;
  tempoInicio: number;
  tempoDecorrido: number;
  finalizado: boolean;
}

export interface ResultadoSimulado {
  totalQuestoes: number;
  acertos: number;
  erros: number;
  percentual: number;
  tempoTotal: number;
  categoria: CategoriaCNH;
  data: string;
}

export interface EstatisticasUsuario {
  simuladosRealizados: number;
  totalQuestoesRespondidas: number;
  totalAcertos: number;
  mediaAproveitamento: number;
  melhorPontuacao: number;
  tempoTotalEstudo: number;
  historico: ResultadoSimulado[];
}

export interface ArtigoBlog {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  imagem: string;
  categoria: string;
  dataPublicacao: string;
  tempoLeitura: number;
  tags: string[];
}

export interface RankingItem {
  posicao: number;
  nome: string;
  pontuacao: number;
  categoria: string;
  data: string;
}

export interface EstadoBrasil {
  sigla: string;
  nome: string;
}

export type TipoSimulado = 'RAPIDO' | 'COMPLETO' | 'PERSONALIZADO';

export interface ConfigSimulado {
  categoria: CategoriaCNH;
  tipo: TipoSimulado;
  quantidadeQuestoes: number;
  estado?: string;
  comTemporizador: boolean;
}
