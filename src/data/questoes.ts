import type { Questao, ArtigoBlog, EstadoBrasil, RankingItem } from '@/types';

export const questoesDetran: Questao[] = [
  // CATEGORIA B (mais comum)
  {
    id: 1,
    categoria: 'B',
    pergunta: 'A distância entre o veículo em movimento e o que se encontra à sua frente é denominada:',
    alternativas: [
      'Distância de reação',
      'Distância de frenagem',
      'Distância de segurança',
      'Distância de ultrapassagem'
    ],
    respostaCorreta: 2,
    explicacao: 'A distância de segurança é o espaço que deve ser mantido entre o seu veículo e o veículo da frente para garantir segurança em caso de frenagem brusca.',
    assunto: 'Direção Defensiva'
  },
  {
    id: 2,
    categoria: 'B',
    pergunta: 'O que é considerado infração gravíssima no Código de Trânsito Brasileiro?',
    alternativas: [
      'Estacionar em local proibido',
      'Dirigir sob influência de álcool',
      'Transitar com a lanterna queimada',
      'Não usar o cinto de segurança'
    ],
    respostaCorreta: 1,
    explicacao: 'Dirigir sob influência de álcool é infração gravíssima, com penalidade de multa, suspensão da CNH e possibilidade de prisão.',
    assunto: 'Legislação de Trânsito'
  },
  {
    id: 3,
    categoria: 'B',
    pergunta: 'Qual é a velocidade máxima permitida em vias urbanas não sinalizadas?',
    alternativas: [
      '40 km/h',
      '50 km/h',
      '60 km/h',
      '80 km/h'
    ],
    respostaCorreta: 2,
    explicacao: 'Em vias urbanas não sinalizadas, a velocidade máxima permitida é de 60 km/h, conforme o CTB.',
    assunto: 'Velocidade'
  },
  {
    id: 4,
    categoria: 'B',
    pergunta: 'A placa de trânsito na forma de octógono com fundo vermelho indica:',
    alternativas: [
      'Proibido estacionar',
      'Pare',
      'Dê a preferência',
      'Proibido virar à esquerda'
    ],
    respostaCorreta: 1,
    explicacao: 'A placa octogonal vermelha é internacionalmente reconhecida como sinal de PARE, obrigando o condutor a parar completamente.',
    assunto: 'Placas de Trânsito'
  },
  {
    id: 5,
    categoria: 'B',
    pergunta: 'O uso do farol baixo é obrigatório:',
    alternativas: [
      'Apenas à noite',
      'Das 18h às 6h e em túneis',
      'Somente em rodovias',
      'Apenas em dias de chuva'
    ],
    respostaCorreta: 1,
    explicacao: 'O farol baixo é obrigatório das 18h às 6h, em túneis, sob chuva, neblina ou em condições de baixa visibilidade.',
    assunto: 'Sinalização'
  },
  {
    id: 6,
    categoria: 'B',
    pergunta: 'O que fazer ao se aproximar de um cruzamento sem sinalização?',
    alternativas: [
      'Acelerar para passar primeiro',
      'Dar preferência para quem vem da direita',
      'Buzinar para alertar os outros',
      'Parar sempre, independente da situação'
    ],
    respostaCorreta: 1,
    explicacao: 'Em cruzamentos sem sinalização, a regra é dar preferência ao veículo que vem da direita.',
    assunto: 'Preferência'
  },
  {
    id: 7,
    categoria: 'B',
    pergunta: 'Qual a função do cinto de segurança?',
    alternativas: [
      'Apenas evitar multas',
      'Proteger os ocupantes em caso de colisão',
      'Conforto do motorista',
      'Estética do veículo'
    ],
    respostaCorreta: 1,
    explicacao: 'O cinto de segurança é fundamental para proteger os ocupantes, reduzindo o risco de lesões graves em caso de colisão ou freada brusca.',
    assunto: 'Segurança'
  },
  {
    id: 8,
    categoria: 'B',
    pergunta: 'O que significa a linha amarela contínua no centro da pista?',
    alternativas: [
      'Permite ultrapassagem',
      'Proíbe ultrapassagem',
      'Indica área de estacionamento',
      'Sinaliza ciclovia'
    ],
    respostaCorreta: 1,
    explicacao: 'A linha amarela contínua indica que está proibida a ultrapassagem naquele trecho da via.',
    assunto: 'Sinalização Horizontal'
  },
  {
    id: 9,
    categoria: 'B',
    pergunta: 'Em caso de acidente com vítimas, qual a primeira providência?',
    alternativas: [
      'Mover as vítimas para desobstruir a via',
      'Sinalizar o local e acionar o SAMU (192)',
      'Tirar fotos para o seguro',
      'Continuar viagem se não for culpado'
    ],
    respostaCorreta: 1,
    explicacao: 'A primeira providência é sinalizar o local para evitar novos acidentes e acionar o socorro médico pelo telefone 192.',
    assunto: 'Primeiros Socorros'
  },
  {
    id: 10,
    categoria: 'B',
    pergunta: 'O que é aquaplanagem?',
    alternativas: [
      'Tipo de lavagem de carro',
      'Perda de aderência do pneu na água',
      'Sistema de limpeza de para-brisa',
      'Vazamento do radiador'
    ],
    respostaCorreta: 1,
    explicacao: 'Aquaplanagem ocorre quando uma camada de água se forma entre o pneu e a pista, causando perda de aderência e controle do veículo.',
    assunto: 'Direção Defensiva'
  },
  {
    id: 11,
    categoria: 'B',
    pergunta: 'Qual a penalidade para dirigir usando celular?',
    alternativas: [
      'Multa leve',
      'Multa grave e 4 pontos na CNH',
      'Apenas advertência verbal',
      'Apreensão do veículo'
    ],
    respostaCorreta: 1,
    explicacao: 'Dirigir usando celular é infração grave, com multa e 4 pontos na CNH, além de ser extremamente perigoso.',
    assunto: 'Legislação de Trânsito'
  },
  {
    id: 12,
    categoria: 'B',
    pergunta: 'O que indica a luz vermelha no painel do veículo?',
    alternativas: [
      'Tudo está funcionando bem',
      'Problema grave que requer atenção imediata',
      'É apenas uma luz decorativa',
      'Indica economia de combustível'
    ],
    respostaCorreta: 1,
    explicacao: 'Luzes vermelhas no painel indicam problemas graves que podem comprometer a segurança e exigem parada imediata.',
    assunto: 'Mecânica Básica'
  },
  {
    id: 13,
    categoria: 'B',
    pergunta: 'Qual a distância mínima para estacionar de um hidrante?',
    alternativas: [
      '3 metros',
      '5 metros',
      '10 metros',
      '15 metros'
    ],
    respostaCorreta: 1,
    explicacao: 'É proibido estacionar a menos de 5 metros de hidrantes, pois pode impedir o acesso dos bombeiros em caso de incêndio.',
    assunto: 'Estacionamento'
  },
  {
    id: 14,
    categoria: 'B',
    pergunta: 'O que fazer quando o semáforo está amarelo?',
    alternativas: [
      'Acelerar para passar rápido',
      'Reduzir a velocidade e parar com segurança',
      'Buzinar para os outros pararem',
      'Ignorar se não houver policial'
    ],
    respostaCorreta: 1,
    explicacao: 'O sinal amarelo indica que o sinal vai fechar. O condutor deve reduzir e parar com segurança, se possível.',
    assunto: 'Semáforo'
  },
  {
    id: 15,
    categoria: 'B',
    pergunta: 'Qual documento obrigatório para conduzir veículo?',
    alternativas: [
      'Apenas RG',
      'CNH dentro do prazo de validade',
      'Comprovante de residência',
      'Certificado de escolaridade'
    ],
    respostaCorreta: 1,
    explicacao: 'A Carteira Nacional de Habilitação (CNH) é o único documento válido para conduzir veículos no Brasil.',
    assunto: 'Documentação'
  },
  {
    id: 16,
    categoria: 'B',
    pergunta: 'O que é o ponto cego do veículo?',
    alternativas: [
      'Área não visível pelos espelhos',
      'Lugar onde não há iluminação',
      'Parte quebrada do carro',
      'Local de estacionamento'
    ],
    respostaCorreta: 0,
    explicacao: 'O ponto cego é a área ao redor do veículo que não é visível pelos espelhos retrovisores, exigindo atenção especial.',
    assunto: 'Direção Defensiva'
  },
  {
    id: 17,
    categoria: 'B',
    pergunta: 'Qual a velocidade máxima em vias de trânsito rápido?',
    alternativas: [
      '60 km/h',
      '70 km/h',
      '80 km/h',
      '100 km/h'
    ],
    respostaCorreta: 2,
    explicacao: 'Em vias de trânsito rápido (arteriais), a velocidade máxima é de 80 km/h, quando não houver sinalização diferente.',
    assunto: 'Velocidade'
  },
  {
    id: 18,
    categoria: 'B',
    pergunta: 'O que significa uma placa circular com fundo branco e borda vermelha?',
    alternativas: [
      'Obrigação',
      'Proibição',
      'Advertência',
      'Informação'
    ],
    respostaCorreta: 1,
    explicacao: 'Placas circulares com borda vermelha são de proibição, indicando ações que não podem ser realizadas.',
    assunto: 'Placas de Trânsito'
  },
  {
    id: 19,
    categoria: 'B',
    pergunta: 'Quando é obrigatório usar luz de neblina?',
    alternativas: [
      'Durante o dia',
      'Em túneis',
      'Quando a visibilidade for reduzida por neblina',
      'Em estradas de terra'
    ],
    respostaCorreta: 2,
    explicacao: 'A luz de neblina deve ser usada apenas quando a visibilidade estiver gravemente reduzida por neblina, fumaça ou chuva forte.',
    assunto: 'Sinalização'
  },
  {
    id: 20,
    categoria: 'B',
    pergunta: 'Qual a multa por não usar cinto de segurança?',
    alternativas: [
      'Multa leve - R$ 88,38',
      'Multa grave - R$ 195,23',
      'Multa gravíssima - R$ 293,47',
      'Apenas advertência'
    ],
    respostaCorreta: 1,
    explicacao: 'Não usar cinto de segurança é infração grave, com multa de R$ 195,23 e 5 pontos na CNH.',
    assunto: 'Legislação de Trânsito'
  },
  {
    id: 21,
    categoria: 'B',
    pergunta: 'O que é a faixa de pedestres?',
    alternativas: [
      'Local para estacionar',
      'Área destinada à travessia de pedestres',
      'Ciclovia',
      'Área de carga e descarga'
    ],
    respostaCorreta: 1,
    explicacao: 'A faixa de pedestres é uma área demarcada na via destinada exclusivamente à travessia segura de pedestres.',
    assunto: 'Sinalização Horizontal'
  },
  {
    id: 22,
    categoria: 'B',
    pergunta: 'Qual a validade da CNH para condutores até 65 anos?',
    alternativas: [
      '2 anos',
      '5 anos',
      '10 anos',
      'Vitalícia'
    ],
    respostaCorreta: 1,
    explicacao: 'Para condutores até 65 anos, a CNH tem validade de 5 anos. Acima dessa idade, a renovação é bienal.',
    assunto: 'Documentação'
  },
  {
    id: 23,
    categoria: 'B',
    pergunta: 'O que fazer em caso de derrapagem?',
    alternativas: [
      'Frear bruscamente',
      'Virar o volante no sentido contrário',
      'Soltar o acelerador e manter a direção',
      'Acelerar para recuperar o controle'
    ],
    respostaCorreta: 2,
    explicacao: 'Em caso de derrapagem, solte o acelerador e mantenha a direção sem frear bruscamente até recuperar o controle.',
    assunto: 'Direção Defensiva'
  },
  {
    id: 24,
    categoria: 'B',
    pergunta: 'Qual a cor da placa de serviço de saúde?',
    alternativas: [
      'Azul',
      'Verde',
      'Vermelha',
      'Amarela'
    ],
    respostaCorreta: 0,
    explicacao: 'As placas de serviço de saúde (hospitais, postos de saúde) são de cor azul, indicando serviços de utilidade pública.',
    assunto: 'Placas de Trânsito'
  },
  {
    id: 25,
    categoria: 'B',
    pergunta: 'O que é considerado embriaguez ao volante?',
    alternativas: [
      'Apenas quando o motorista não consegue dirigir',
      'Teor igual ou superior a 0,6 mg/L de álcool',
      'Qualquer quantidade de álcool no sangue',
      'Apenas quando há acidente'
    ],
    respostaCorreta: 1,
    explicacao: 'É considerado embriaguez ao volante quando o condutor apresentar teor igual ou superior a 0,6 mg/L de álcool no sangue.',
    assunto: 'Legislação de Trânsito'
  },
  {
    id: 26,
    categoria: 'B',
    pergunta: 'Qual a função do ABS nos freios?',
    alternativas: [
      'Aumentar a velocidade',
      'Evitar o travamento das rodas na frenagem',
      'Reduzir o consumo de combustível',
      'Melhorar o conforto'
    ],
    respostaCorreta: 1,
    explicacao: 'O ABS (Anti-lock Braking System) impede o travamento das rodas durante a frenagem, mantendo o controle direcional.',
    assunto: 'Mecânica Básica'
  },
  {
    id: 27,
    categoria: 'B',
    pergunta: 'O que significa a sigla IPVA?',
    alternativas: [
      'Imposto sobre Propriedade de Veículos Automotores',
      'Instituto de Proteção ao Veículo Automotor',
      'Indicador de Preço de Veículos Automotores',
      'Imposto de Proteção Veicular Anual'
    ],
    respostaCorreta: 0,
    explicacao: 'IPVA é o Imposto sobre a Propriedade de Veículos Automotores, tributo estadual anual obrigatório.',
    assunto: 'Documentação'
  },
  {
    id: 28,
    categoria: 'B',
    pergunta: 'Em qual situação é permitido estacionar na calçada?',
    alternativas: [
      'Quando não há vagas na rua',
      'Apenas para carga e descarga',
      'Nunca é permitido',
      'Em horário comercial'
    ],
    respostaCorreta: 2,
    explicacao: 'É proibido estacionar sobre a calçada, pois prejudica a circulação de pedestres, especialmente idosos e cadeirantes.',
    assunto: 'Estacionamento'
  },
  {
    id: 29,
    categoria: 'B',
    pergunta: 'Qual a principal causa de acidentes de trânsito no Brasil?',
    alternativas: [
      'Defeito no veículo',
      'Falha humana',
      'Condições climáticas',
      'Sinalização precária'
    ],
    respostaCorreta: 1,
    explicacao: 'A falha humana é responsável por mais de 90% dos acidentes de trânsito, incluindo imprudência, negligência e imperícia.',
    assunto: 'Causas de Acidentes'
  },
  {
    id: 30,
    categoria: 'B',
    pergunta: 'O que é ultrapassagem pela direita?',
    alternativas: [
      'Ultrapassagem permitida em qualquer situação',
      'Ultrapassagem feita pela direita quando o veículo da frente der sinal',
      'Ultrapassagem proibida em todas as situações',
      'Ultrapassagem apenas para motos'
    ],
    respostaCorreta: 1,
    explicacao: 'A ultrapassagem pela direita é permitida apenas quando o veículo da frente der sinal para virar à esquerda.',
    assunto: 'Ultrapassagem'
  },
  
  // CATEGORIA A (Motos)
  {
    id: 31,
    categoria: 'A',
    pergunta: 'Qual equipamento de segurança é obrigatório para motociclistas?',
    alternativas: [
      'Capacete com viseira',
      'Jaqueta de couro',
      'Luvas',
      'Botas'
    ],
    respostaCorreta: 0,
    explicacao: 'O capacete com viseira é o único equipamento obrigatório por lei, embora outros equipamentos sejam altamente recomendados.',
    assunto: 'Segurança'
  },
  {
    id: 32,
    categoria: 'A',
    pergunta: 'Qual a velocidade máxima para motos em rodovias?',
    alternativas: [
      '80 km/h',
      '90 km/h',
      '110 km/h',
      '120 km/h'
    ],
    respostaCorreta: 2,
    explicacao: 'Em rodovias, a velocidade máxima para motocicletas é de 110 km/h, quando não houver sinalização diferente.',
    assunto: 'Velocidade'
  },
  {
    id: 33,
    categoria: 'A',
    pergunta: 'É permitido transportar criança em motocicleta?',
    alternativas: [
      'Sim, em qualquer idade',
      'Sim, a partir de 7 anos',
      'Sim, a partir de 10 anos',
      'Não é permitido em nenhuma hipótese'
    ],
    respostaCorreta: 2,
    explicacao: 'É permitido transportar crianças a partir de 10 anos em motocicleta, desde que usem capacete e estejam em posição segura.',
    assunto: 'Legislação de Trânsito'
  },
  {
    id: 34,
    categoria: 'A',
    pergunta: 'O que é "corredor" para motos?',
    alternativas: [
      'Faixa exclusiva para motos',
      'Espaço entre veículos parados ou lentos',
      'Área de estacionamento para motos',
      'Pista especial em rodovias'
    ],
    respostaCorreta: 1,
    explicacao: 'O "corredor" é o espaço entre as fileiras de veículos em congestionamento, que motos podem utilizar com cautela.',
    assunto: 'Direção Defensiva'
  },
  {
    id: 35,
    categoria: 'A',
    pergunta: 'Qual a penalidade para motociclista sem capacete?',
    alternativas: [
      'Multa leve',
      'Multa grave e retenção do veículo',
      'Apenas advertência',
      'Multa média'
    ],
    respostaCorreta: 1,
    explicacao: 'Conduzir motocicleta sem capacete é infração grave, com multa, 5 pontos na CNH e retenção do veículo até regularização.',
    assunto: 'Legislação de Trânsito'
  },

  // CATEGORIA C (Caminhões)
  {
    id: 36,
    categoria: 'C',
    pergunta: 'Qual a velocidade máxima para caminhões em rodovias?',
    alternativas: [
      '80 km/h',
      '90 km/h',
      '100 km/h',
      '110 km/h'
    ],
    respostaCorreta: 0,
    explicacao: 'Em rodovias, a velocidade máxima para caminhões é de 80 km/h, diferente dos veículos de passeio.',
    assunto: 'Velocidade'
  },
  {
    id: 37,
    categoria: 'C',
    pergunta: 'O que é o tempo de reação de um motorista?',
    alternativas: [
      'Tempo para o veículo parar completamente',
      'Tempo entre perceber o perigo e acionar o freio',
      'Tempo total de viagem',
      'Tempo de descanso obrigatório'
    ],
    respostaCorreta: 1,
    explicacao: 'Tempo de reação é o intervalo entre o motorista perceber um perigo e acionar o freio, em média 0,8 a 1 segundo.',
    assunto: 'Direção Defensiva'
  },
  {
    id: 38,
    categoria: 'C',
    pergunta: 'Qual a carga máxima permitida para caminhões de duas unidades?',
    alternativas: [
      '35 toneladas',
      '43,5 toneladas',
      '48 toneladas',
      '57 toneladas'
    ],
    respostaCorreta: 1,
    explicacao: 'A carga máxima permitida para caminhões de duas unidades (cavalo mecânico + semirreboque) é de 43,5 toneladas.',
    assunto: 'Carga'
  },
  {
    id: 39,
    categoria: 'C',
    pergunta: 'O que é o descanso obrigatório para motoristas profissionais?',
    alternativas: [
      '15 minutos a cada 2 horas',
      '30 minutos a cada 4 horas de direção',
      '1 hora a cada 5 horas',
      '2 horas a cada 8 horas'
    ],
    respostaCorreta: 1,
    explicacao: 'O motorista profissional deve fazer pausa de 30 minutos a cada 4 horas consecutivas de direção.',
    assunto: 'Legislação de Trânsito'
  },
  {
    id: 40,
    categoria: 'C',
    pergunta: 'O que indica a luz amarela no painel do caminhão?',
    alternativas: [
      'Problema grave',
      'Atenção ou manutenção preventiva',
      'Tudo funcionando normalmente',
      'Veículo desligado'
    ],
    respostaCorreta: 1,
    explicacao: 'Luzes amarelas no painel indicam atenção necessária ou manutenção preventiva, não sendo emergência imediata.',
    assunto: 'Mecânica Básica'
  },

  // CATEGORIA D (Ônibus)
  {
    id: 41,
    categoria: 'D',
    pergunta: 'Qual a validade da CNH categoria D para motoristas até 50 anos?',
    alternativas: [
      '1 ano',
      '2 anos',
      '3 anos',
      '5 anos'
    ],
    respostaCorreta: 2,
    explicacao: 'Para motoristas de transporte de passageiros (cat. D), a validade da CNH é de 3 anos até 50 anos de idade.',
    assunto: 'Documentação'
  },
  {
    id: 42,
    categoria: 'D',
    pergunta: 'Qual a velocidade máxima para ônibus em rodovias?',
    alternativas: [
      '70 km/h',
      '80 km/h',
      '90 km/h',
      '100 km/h'
    ],
    respostaCorreta: 2,
    explicacao: 'Em rodovias, a velocidade máxima para ônibus é de 90 km/h, quando não houver sinalização diferente.',
    assunto: 'Velocidade'
  },
  {
    id: 43,
    categoria: 'D',
    pergunta: 'O que é obrigatório em ônibus de transporte coletivo?',
    alternativas: [
      'Apenas cinto para o motorista',
      'Cinto de segurança para todos os assentos',
      'Cinto apenas nos assentos da frente',
      'Cinto apenas para idosos'
    ],
    respostaCorreta: 1,
    explicacao: 'É obrigatório o uso de cinto de segurança em todos os assentos de ônibus de transporte coletivo.',
    assunto: 'Segurança'
  },
  {
    id: 44,
    categoria: 'D',
    pergunta: 'Qual o documento específico para transporte de passageiros?',
    alternativas: [
      'Apenas CNH categoria D',
      'CNH D e Curso de Especialização',
      'Apenas autorização da empresa',
      'Certificado de antecedentes criminais'
    ],
    respostaCorreta: 1,
    explicacao: 'Além da CNH categoria D, o motorista de transporte de passageiros deve possuir Curso de Especialização.',
    assunto: 'Documentação'
  },
  {
    id: 45,
    categoria: 'D',
    pergunta: 'Onde o ônibus deve parar para embarque e desembarque?',
    alternativas: [
      'Em qualquer local da via',
      'Apenas em pontos autorizados',
      'Onde o passageiro solicitar',
      'Em qualquer esquina'
    ],
    respostaCorreta: 1,
    explicacao: 'O ônibus deve parar apenas em pontos de parada autorizados, garantindo segurança aos passageiros.',
    assunto: 'Transporte de Passageiros'
  },

  // CATEGORIA E (Caminhões com reboque)
  {
    id: 46,
    categoria: 'E',
    pergunta: 'Qual a velocidade máxima para veículos com reboque em rodovias?',
    alternativas: [
      '70 km/h',
      '80 km/h',
      '90 km/h',
      '100 km/h'
    ],
    respostaCorreta: 1,
    explicacao: 'Em rodovias, a velocidade máxima para veículos com reboque é de 80 km/h, igual aos caminhões.',
    assunto: 'Velocidade'
  },
  {
    id: 47,
    categoria: 'E',
    pergunta: 'O que é necessário para obter a categoria E?',
    alternativas: [
      'Ter apenas categoria B',
      'Ter categoria D por pelo menos 1 ano',
      'Ter categoria C e ser maior de 21 anos',
      'Ter qualquer categoria por 2 anos'
    ],
    respostaCorreta: 2,
    explicacao: 'Para obter a categoria E, é necessário ter a categoria C e ser maior de 21 anos.',
    assunto: 'Documentação'
  },
  {
    id: 48,
    categoria: 'E',
    pergunta: 'Qual a distância mínima entre o veículo trator e o reboque?',
    alternativas: [
      '1 metro',
      '2 metros',
      '3 metros',
      '5 metros'
    ],
    respostaCorreta: 2,
    explicacao: 'A distância máxima permitida entre o veículo trator e o reboque é de 3 metros, para garantir estabilidade.',
    assunto: 'Reboque'
  },
  {
    id: 49,
    categoria: 'E',
    pergunta: 'O que é obrigatório em reboques?',
    alternativas: [
      'Apenas lanternas traseiras',
      'Sinalização de largura e lanternas',
      'Apenas placa traseira',
      'Somente faixa refletiva'
    ],
    respostaCorreta: 1,
    explicacao: 'Reboques devem possuir sinalização de largura, lanternas, placa e faixas refletivas para visibilidade.',
    assunto: 'Sinalização'
  },
  {
    id: 50,
    categoria: 'E',
    pergunta: 'Qual a altura máxima permitida para carga?',
    alternativas: [
      '3,5 metros',
      '4,0 metros',
      '4,4 metros',
      '5,0 metros'
    ],
    respostaCorreta: 2,
    explicacao: 'A altura máxima permitida para carga é de 4,4 metros, medida do solo até o ponto mais alto da carga.',
    assunto: 'Carga'
  }
];

export const artigosBlog: ArtigoBlog[] = [
  {
    id: 1,
    titulo: 'Como Passar na Prova Teórica do Detran na Primeira Tentativa',
    resumo: 'Dicas essenciais e estratégias comprovadas para garantir sua aprovação na prova teórica do Detran.',
    conteudo: `
      <p>Passar na prova teórica do Detran na primeira tentativa é o sonho de todo candidato à CNH. Com a preparação adequada e as estratégias certas, você pode aumentar significativamente suas chances de sucesso.</p>
      
      <h3>1. Estude com Antecedência</h3>
      <p>Não deixe para estudar na véspera da prova. O conteúdo é extenso e inclui legislação de trânsito, direção defensiva, primeiros socorros e mecânica básica. Reserve pelo menos 2 semanas para estudar de forma consistente.</p>
      
      <h3>2. Faça Muitos Simulados</h3>
      <p>A prática leva à perfeição. Faça simulados diariamente para se familiarizar com o formato das questões e identificar seus pontos fracos. O Simulado Brasil oferece questões atualizadas e similares às da prova real.</p>
      
      <h3>3. Entenda, Não Decore</h3>
      <p>Em vez de decorar as respostas, procure entender o raciocínio por trás de cada questão. Isso ajudará você a responder até questões que nunca viu antes.</p>
      
      <h3>4. Gerencie Seu Tempo</h3>
      <p>Na prova, você terá tempo suficiente para responder todas as questões. Não corra! Leia cada questão com atenção e elimine as alternativas claramente erradas antes de escolher.</p>
      
      <h3>5. Fique Calmo</h3>
      <p>A ansiedade pode atrapalhar seu desempenho. Durma bem na noite anterior, chegue cedo ao local da prova e respire fundo antes de começar.</p>
    `,
    imagem: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    categoria: 'Dicas de Estudo',
    dataPublicacao: '2024-01-15',
    tempoLeitura: 5,
    tags: ['prova teórica', 'dicas', 'aprovação', 'estudo']
  },
  {
    id: 2,
    titulo: 'Principais Placas de Trânsito: Guia Completo',
    resumo: 'Aprenda a identificar todas as categorias de placas de trânsito e seus significados de forma simples e prática.',
    conteudo: `
      <p>As placas de trânsito são fundamentais para a organização e segurança no trânsito. Conhecê-las é essencial para qualquer condutor. Vamos explorar cada categoria:</p>
      
      <h3>Placas de Regulamentação</h3>
      <p>São circulares com fundo branco e borda vermelha. Indicam proibições como:</p>
      <ul>
        <li>Proibido estacionar</li>
        <li>Proibido virar à esquerda</li>
        <li>Proibido ultrapassar</li>
        <li>Velocidade máxima</li>
      </ul>
      
      <h3>Placas de Advertência</h3>
      <p>São triangulares com fundo amarelo e borda vermelha. Alertam sobre situações perigosas:</p>
      <ul>
        <li>Curva acentuada</li>
        <li>Lombada</li>
        <li>Cruzamento</li>
        <li>Ponte estreita</li>
      </ul>
      
      <h3>Placas de Indicação</h3>
      <p>São retangulares com fundo azul. Informam serviços e direções:</p>
      <ul>
        <li>Posto de gasolina</li>
        <li>Hospital</li>
        <li>Sentido de destino</li>
      </ul>
      
      <h3>Placas de Obrigação</h3>
      <p>São circulares com fundo azul. Indicam ações obrigatórias:</p>
      <ul>
        <li>Siga em frente</li>
        <li>Vire à direita</li>
        <li>Utilize correntes</li>
      </ul>
    `,
    imagem: 'https://images.unsplash.com/photo-1569346656677-16611334d5b9?w=800',
    categoria: 'Legislação',
    dataPublicacao: '2024-01-20',
    tempoLeitura: 7,
    tags: ['placas', 'sinalização', 'legislação', 'CTB']
  },
  {
    id: 3,
    titulo: 'Direção Defensiva: O Segredo da Segurança no Trânsito',
    resumo: 'Descubra como a direção defensiva pode salvar sua vida e prevenir acidentes no dia a dia.',
    conteudo: `
      <p>A direção defensiva é um conjunto de princípios e técnicas que visam prevenir acidentes, mesmo quando outros cometem erros. É a base da segurança no trânsito moderno.</p>
      
      <h3>Princípios Fundamentais</h3>
      
      <p><strong>1. Visão Ampla:</strong> Não olhe apenas para o carro da frente. Observe o trânsito à sua volta, espelhos e pontos cegos constantemente.</p>
      
      <p><strong>2. Mantenha Distância:</strong> A distância de segurança é crucial. Use a regra dos 2 segundos: quando o carro da frente passar por um ponto, você deve demorar pelo menos 2 segundos para passar pelo mesmo ponto.</p>
      
      <p><strong>3. Antecipe-se:</strong> Tente prever o que outros motoristas farão. Sinalize suas intenções com antecedência e esteja preparado para reações inesperadas.</p>
      
      <p><strong>4. Velocidade Adequada:</strong> Ajuste sua velocidade às condições da via, tempo e tráfego. Velocidade excessiva é a principal causa de acidentes graves.</p>
      
      <h3>Técnicas Práticas</h3>
      
      <p><strong>Posição das Mãos:</strong> Mantenha as mãos na posição 9 e 15 ou 10 e 10 horas no volante para maior controle.</p>
      
      <p><strong>Frenagem:</strong> Em veículos sem ABS, freie progressivamente. Com ABS, freie firmemente sem soltar.</p>
      
      <p><strong>Ultrapassagem:</strong> Só ultrapasse quando tiver 100% de certeza. Sinalize, verifique os pontos cegos e execute rapidamente.</p>
    `,
    imagem: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
    categoria: 'Direção Defensiva',
    dataPublicacao: '2024-01-25',
    tempoLeitura: 6,
    tags: ['direção defensiva', 'segurança', 'prevenção', 'acidentes']
  },
  {
    id: 4,
    titulo: 'Multas de Trânsito: Valores e Pontuação em 2024',
    resumo: 'Fique por dentro dos valores atualizados das multas e entenda como funciona o sistema de pontuação da CNH.',
    conteudo: `
      <p>O Código de Trânsito Brasileiro estabelece quatro classes de infrações, cada uma com penalidades específicas. Conhecê-las ajuda a evitar problemas e manter sua CNH em dia.</p>
      
      <h3>Classes de Infrações</h3>
      
      <p><strong>Infração Leve:</strong></p>
      <ul>
        <li>Multa: R$ 88,38</li>
        <li>Pontos: 3</li>
        <li>Exemplos: Transitar com lâmpada queimada, não usar luz baixa quando necessário</li>
      </ul>
      
      <p><strong>Infração Média:</strong></p>
      <ul>
        <li>Multa: R$ 130,16</li>
        <li>Pontos: 4</li>
        <li>Exemplos: Estacionar em local proibido, transitar em velocidade superior à máxima em até 20%</li>
      </ul>
      
      <p><strong>Infração Grave:</strong></p>
      <ul>
        <li>Multa: R$ 195,23</li>
        <li>Pontos: 5</li>
        <li>Exemplos: Não usar cinto de segurança, usar celular ao dirigir, avançar sinal vermelho</li>
      </ul>
      
      <p><strong>Infração Gravíssima:</strong></p>
      <ul>
        <li>Multa: R$ 293,47</li>
        <li>Pontos: 7</li>
        <li>Exemplos: Dirigir sob influência de álcool, ultrapassar em local proibido, fugir de abordagem policial</li>
      </ul>
      
      <h3>Sistema de Pontuação</h3>
      
      <p>O limite de pontos na CNH é de 20 pontos em 12 meses. Ao atingir este limite, o condutor terá a CNH suspensa.</p>
      
      <p>É possível reduzir pontos através de cursos de reciclagem, mas apenas uma vez por período de 12 meses.</p>
    `,
    imagem: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    categoria: 'Legislação',
    dataPublicacao: '2024-02-01',
    tempoLeitura: 8,
    tags: ['multas', 'pontuação', 'CNH', 'infrações', 'CTB']
  },
  {
    id: 5,
    titulo: 'Primeiros Socorros no Trânsito: O Que Você Precisa Saber',
    resumo: 'Aprenda as ações básicas de primeiros socorros que podem salvar vidas em caso de acidente de trânsito.',
    conteudo: `
      <p>Em caso de acidente de trânsito com vítimas, as primeiras ações são cruciais. Saber o que fazer pode fazer a diferença entre a vida e a morte.</p>
      
      <h3>Passo 1: Proteja o Local</h3>
      <p>Antes de tudo, sinalize o local do acidente para evitar novas colisões. Use o triângulo de segurança e ligue o pisca-alerta.</p>
      
      <h3>Passo 2: Chame Ajuda</h3>
      <p>Ligue imediatamente para:</p>
      <ul>
        <li>SAMU (192) - para emergências médicas</li>
        <li>Bombeiros (193) - em caso de incêndio ou necessidade de resgate</li>
        <li>Polícia Rodoviária (191) - em rodovias federais</li>
      </ul>
      
      <h3>Passo 3: Não Mova as Vítimas</h3>
      <p>A menos que haja risco iminente (como fogo), não mova vítimas de acidentes, especialmente se houver suspeita de lesão na coluna.</p>
      
      <h3>Passo 4: Avalie a Consciência</h3>
      <p>Verifique se a vítima está consciente. Chame-a pelo nome e observe se responde.</p>
      
      <h3>Passo 5: Verifique a Respiração</h3>
      <p>Observe se a vítima está respirando. Se não estiver, inicie a massagem cardíaca se estiver treinado.</p>
      
      <h3>Passo 6: Controle Hemorragias</h3>
      <p>Em caso de sangramento, comprima a ferida com gaze ou pano limpo até a chegada do socorro.</p>
      
      <h3>ATENÇÃO:</h3>
      <p>Estas são orientações básicas. O ideal é fazer um curso de primeiros socorros para estar realmente preparado.</p>
    `,
    imagem: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    categoria: 'Primeiros Socorros',
    dataPublicacao: '2024-02-10',
    tempoLeitura: 6,
    tags: ['primeiros socorros', 'acidentes', 'SAMU', 'emergência']
  },
  {
    id: 6,
    titulo: 'Mecânica Básica: Cuidados Essenciais com seu Veículo',
    resumo: 'Aprenda os cuidados básicos de manutenção que todo motorista deve ter com seu veículo.',
    conteudo: `
      <p>Conhecer a mecânica básica do veículo não é apenas exigência para a prova do Detran, mas uma necessidade para todo motorista. Cuidados simples podem evitar quebras e acidentes.</p>
      
      <h3>Verificações Diárias</h3>
      
      <p><strong>1. Pneus:</strong> Verifique a calibragem e o estado dos pneus. Pneus carecas ou mal calibrados aumentam o risco de acidentes e o consumo de combustível.</p>
      
      <p><strong>2. Luzes:</strong> Confira se todas as luzes estão funcionando: faróis, lanternas, setas e luz de freio.</p>
      
      <p><strong>3. Nível de Óleo:</strong> Verifique o nível de óleo do motor. Óleo baixo pode causar danos graves ao motor.</p>
      
      <p><strong>4. Água do Radiador:</strong> Mantenha o nível de água do radiador no máximo para evitar superaquecimento.</p>
      
      <h3>Luzes do Painel</h3>
      
      <p><strong>Luz Vermelha:</strong> Indica problema grave. Pare o veículo imediatamente e verifique.</p>
      
      <p><strong>Luz Amarela:</strong> Indica atenção. Agende uma revisão o mais breve possível.</p>
      
      <p><strong>Luz Verde/Azul:</strong> Indica sistema em funcionamento (como farol alto).</p>
      
      <h3>Manutenção Preventiva</h3>
      
      <p>Siga as revisões programadas pelo fabricante. Troque óleo e filtros nas datas corretas. Uma manutenção preventiva é sempre mais barata que um conserto.</p>
    `,
    imagem: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    categoria: 'Mecânica Básica',
    dataPublicacao: '2024-02-15',
    tempoLeitura: 5,
    tags: ['mecânica', 'manutenção', 'pneus', 'óleo', 'veículo']
  }
];

export const estadosBrasil: EstadoBrasil[] = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' }
];

export const rankingSimulado: RankingItem[] = [
  { posicao: 1, nome: 'João Silva', pontuacao: 100, categoria: 'B', data: '2024-02-15' },
  { posicao: 2, nome: 'Maria Santos', pontuacao: 98, categoria: 'B', data: '2024-02-14' },
  { posicao: 3, nome: 'Pedro Costa', pontuacao: 97, categoria: 'A', data: '2024-02-15' },
  { posicao: 4, nome: 'Ana Oliveira', pontuacao: 95, categoria: 'B', data: '2024-02-13' },
  { posicao: 5, nome: 'Carlos Lima', pontuacao: 94, categoria: 'C', data: '2024-02-15' },
  { posicao: 6, nome: 'Fernanda Souza', pontuacao: 93, categoria: 'B', data: '2024-02-12' },
  { posicao: 7, nome: 'Lucas Pereira', pontuacao: 92, categoria: 'A', data: '2024-02-14' },
  { posicao: 8, nome: 'Juliana Martins', pontuacao: 91, categoria: 'B', data: '2024-02-11' },
  { posicao: 9, nome: 'Roberto Almeida', pontuacao: 90, categoria: 'D', data: '2024-02-15' },
  { posicao: 10, nome: 'Patrícia Rocha', pontuacao: 89, categoria: 'B', data: '2024-02-10' }
];

export const categoriasInfo = {
  A: {
    nome: 'Categoria A',
    descricao: 'Motocicletas, ciclomotores e triciclos',
    icone: 'Bike',
    cor: 'from-orange-500 to-red-500',
    questoes: 20,
    tempo: '30 minutos',
    aprovacao: '70%'
  },
  B: {
    nome: 'Categoria B',
    descricao: 'Veículos de passeio até 3.500kg',
    icone: 'Car',
    cor: 'from-blue-500 to-cyan-500',
    questoes: 30,
    tempo: '45 minutos',
    aprovacao: '70%'
  },
  C: {
    nome: 'Categoria C',
    descricao: 'Veículos de carga acima de 3.500kg',
    icone: 'Truck',
    cor: 'from-green-500 to-emerald-500',
    questoes: 30,
    tempo: '45 minutos',
    aprovacao: '70%'
  },
  D: {
    nome: 'Categoria D',
    descricao: 'Ônibus e veículos de transporte de passageiros',
    icone: 'Bus',
    cor: 'from-purple-500 to-violet-500',
    questoes: 30,
    tempo: '45 minutos',
    aprovacao: '70%'
  },
  E: {
    nome: 'Categoria E',
    descricao: 'Veículos com unidade acoplada acima de 6.000kg',
    icone: 'Container',
    cor: 'from-pink-500 to-rose-500',
    questoes: 30,
    tempo: '45 minutos',
    aprovacao: '70%'
  }
};
