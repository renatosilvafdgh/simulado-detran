import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'

const SUPABASE_URL = "https://uebewihyttehjdzazsku.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function createBlogPost() {
    const title = "CNH Sem Autoescola em 2026: Como Funciona o Novo Modelo e Como Tirar Sua Habilitação"
    const slug = "cnh-sem-autoescola-2026-guia-completo"
    const publicUrl = "" // Sem imagem por enquanto

    const content = `# CNH Sem Autoescola em 2026: Guia Completo do Novo Processo de Obtenção da Carteira

Até pouco tempo atrás, tirar a **Carteira Nacional de Habilitação (CNH)** no Brasil era sinônimo de um processo burocrático, lento e, acima de tudo, caro. O candidato era obrigado a se submeter a uma carga horária fixa de aulas teóricas e práticas dentro de Centros de Formação de Condutores (CFCs) credenciados, independentemente do seu conhecimento prévio ou facilidade de aprendizado.

Em **2026**, no entanto, o cenário da mobilidade brasileira passou por uma transformação disruptiva. Uma resolução histórica do **Conselho Nacional de Trânsito (Contran)**, consolidada após debates iniciados em 2024 e 2025, eliminou a necessidade rígida de frequentar uma autoescola para as categorias de base. Esta mudança abre caminho para que os cidadãos obtenham o direito de dirigir de forma mais acessível, digital e flexível — permitindo uma redução de custos que pode chegar a **80%** do valor total.

Neste guia completo e atualizado com as normativas vigentes em 2026, você entenderá cada detalhe desta nova era do trânsito brasileiro.

### O que você encontrará neste artigo:

• **O que mudou na lei em 2026:** Detalhes da resolução do Contran.
• **Modelo Antigo vs. Novo Modelo:** Uma comparação direta.
• **O papel dos Instrutores Autônomos Credenciados.**
• **Passo a passo atualizado para tirar a CNH 2026.**
• **Custos detalhados:** Onde está a verdadeira economia.
• **Tecnologia e CNH Digital:** O papel do App Carteira Digital de Trânsito.
• **FAQ:** As dúvidas mais comuns sobre a "CNH autodidata".

---

## O que mudou de verdade em 2026

A grande virada de chave ocorreu com a implementação plena da **Resolução Contran nº 1.050/2025**, que entrou em vigor em 1º de janeiro de 2026. Esta norma estabeleceu que a frequência em autoescolas deixou de ser uma barreira obrigatória para candidatos às **Categorias A (motos e triciclos)** e **B (automóveis de passeio)**.

A lógica por trás da mudança é simples: o Estado deve testar a **competência** do condutor, e não apenas a sua **presença** em uma sala de aula. Se o candidato possui os conhecimentos teóricos e a habilidade prática necessária para circular com segurança, o método pelo qual ele adquiriu esse saber torna-se secundário.

### Comparativo: O Salto Evolutivo do Processo

| Aspecto | Modelo Antigo (Até 2024/25) | Novo Modelo (2026) |
| --- | --- | --- |
| **Aulas Teóricas** | 45 horas obrigatórias em CFC | 100% flexível; estudo autodidata ou online gratuito |
| **Aulas Práticas** | Mínimo de 20 horas em veículo da escola | Carga horária livre; foco em proficiência técnica |
| **Instrutores** | Apenas vinculados a Autoescolas | Instrutores Autônomos Credenciados ou CFCs |
| **Custo Médio** | R$ 3.000,00 a R$ 5.500,00 | R$ 800,00 a R$ 1.800,00 |
| **Burocracia** | Presencial e intermediada pela escola | Digital, direta via App e Portal Gov.br |

Essa nova estrutura não extingue as autoescolas. Elas continuam operando como centros de excelência para quem prefere um suporte profissional completo, mas perdem o monopólio do ensino, forçando o mercado a se tornar mais competitivo e eficiente.

---

## Por que o novo modelo foi implementado em 2026?

A reforma do sistema de habilitação não foi uma decisão isolada, mas sim parte de um pacote de **Inclusão Digital e Social** do Governo Federal. Os principais pilares dessa mudança são:

1. **Democratização do Acesso:** O custo da CNH no Brasil era um dos mais altos do mundo em relação ao salário mínimo. Milhares de cidadãos dirigiam na ilegalidade por não terem condições financeiras de pagar as taxas das autoescolas.
2. **Desburocratização Estatal:** O sistema anterior era engessado e propenso a vendas de facilidades. O novo modelo foca na transparência digital.
3. **Modernização Educacional:** Com o avanço das plataformas de EAD (Ensino a Distância), manter alunos presos em salas físicas para aprender sinalização básica tornou-se obsoleto.
4. **Estímulo à Economia:** Ao reduzir o custo da CNH, o governo facilita a entrada de novos motoristas no mercado de trabalho (entregadores, motoristas de aplicativo e logística), aquecendo a economia.

---

## O que ainda é obrigatório por lei em 2026

É fundamental esclarecer um ponto: **CNH sem autoescola não significa CNH sem exames.** A segurança viária continua sendo a prioridade. O que mudou foi o caminho da aprendizagem, mas o crivo do Estado permanece rigoroso.

Para obter sua habilitação em 2026, os seguintes requisitos são **inegociáveis**:

### 1. Exame Médico e Psicotécnico

O candidato deve realizar a avaliação de aptidão física e mental em clínicas credenciadas pelo Detran. Esta etapa garante que o condutor possui visão, audição e saúde psicológica adequadas para operar um veículo.

### 2. Biometria e Identificação Digital

A coleta de digitais e a fotografia oficial continuam obrigatórias, agora integradas ao sistema de reconhecimento facial do **Gov.br**, para evitar fraudes em qualquer etapa do processo.

### 3. Exame Teórico Oficial

Após estudar por conta própria ou através dos módulos gratuitos oferecidos pelo governo, o candidato deve agendar e comparecer ao Detran (ou postos autorizados) para realizar a prova teórica. A pontuação mínima para aprovação permanece em 70%.

### 4. Exame Prático de Direção

Esta é a prova de fogo. O candidato será avaliado por examinadores do Detran em via pública (ou circuito fechado para motos). Os critérios de avaliação, faltas leves, médias e graves continuam seguindo o Código de Trânsito Brasileiro (CTB).

---

## Como funciona o novo processo 2026 passo a passo

Se você deseja aproveitar a flexibilidade do novo modelo, siga este roteiro atualizado para não se perder na burocracia digital:

### 1. Abertura do Processo via Carteira Digital de Trânsito (CDT)

O primeiro passo não é mais ir a uma autoescola, mas sim acessar o aplicativo **Carteira Digital de Trânsito** ou o portal do **Detran** estadual. Lá, você seleciona a opção "Abrir Processo de Primeira Habilitação".

• Você pagará a taxa de inscrição (DUDA ou equivalente estadual).
• O sistema gerará o seu formulário RENACH (Registro Nacional de Condutores Habilitados).

### 2. Realização dos Exames Iniciais

Com o processo aberto, o próprio sistema indicará as clínicas credenciadas para o exame médico e psicotécnico. Você agenda e paga diretamente à clínica.

### 3. O Estudo Teórico "Autodidata"

Aqui está a grande economia. Em 2026, o Ministério dos Transportes disponibiliza uma plataforma oficial de **EAD gratuita** com todo o conteúdo programático:

• Legislação de Trânsito.
• Direção Defensiva.
• Primeiros Socorros.
• Meio Ambiente e Cidadania.
• Mecânica Básica.

Você pode estudar no seu ritmo, pelo celular ou computador. Quando se sentir pronto, solicita o agendamento da prova teórica pelo portal.

### 4. Preparação Prática e o Instrutor Autônomo

Após aprovado na teoria, você entra na fase prática. Você tem três opções:

• **Contratar um Instrutor Autônomo Credenciado:** Profissionais certificados que possuem seus próprios veículos adaptados (com pedais auxiliares) e cobram por hora-aula, sem pacotes fechados.
• **Utilizar Veículo Próprio ou de Terceiros (Regulamentado):** Em 2026, é permitido treinar em veículos particulares, desde que o veículo esteja identificado com o adesivo de "Aprendizagem" e o acompanhante seja um condutor habilitado há mais de 3 anos na categoria, sem infrações graves no último ano. *Nota: Verifique a regulamentação específica do seu estado sobre o seguro obrigatório para essa modalidade.*
• **Autoescola Tradicional:** Para quem quer o pacote completo e não quer se preocupar com a logística do veículo para a prova.

### 5. A LADV (Licença para Aprendizagem de Direção Veicular)

Mesmo no modelo autônomo, a emissão da LADV é obrigatória. Ela é o documento que permite que você treine legalmente nas ruas. Ela é emitida digitalmente após a aprovação no exame teórico.

### 6. O Exame Prático e a PPD

Com a habilidade necessária adquirida, você agenda o exame prático. Sendo aprovado, você receberá sua **PPD (Permissão Para Dirigir)**, válida por um ano, em formato digital imediatamente no app CDT.

---

## Custos Detalhados: Quanto você realmente economiza?

Para tornar este guia prático, projetamos uma estimativa de custos baseada nos valores médios praticados em 2026. Vale lembrar que as taxas estaduais (Detran) variam conforme a unidade da federação.

| Item | Custo no Modelo Antigo | Custo no Novo Modelo (2026) |
| --- | --- | --- |
| **Taxas do Detran (Inscrição/Provas)** | R$ 450,00 | R$ 450,00 |
| **Exame Médico/Psico** | R$ 350,00 | R$ 350,00 |
| **Curso Teórico (CFC)** | R$ 800,00 | **R$ 0,00 (Online/Gov)** |
| **Pacote de Aulas Práticas (20h)** | R$ 2.500,00 | **R$ 600,00 (10h com Autônomo)** |
| **Aluguel de Carro para Prova** | R$ 300,00 | R$ 0,00 (Veículo Próprio/Instrutor) |
| **TOTAL ESTIMADO** | **R$ 4.400,00** | **R$ 1.400,00** |

**Economia Real:** Neste cenário, o candidato economiza aproximadamente **R$ 3.000,00**. Para muitos brasileiros, isso representa mais de dois salários mínimos, tornando a CNH um objetivo alcançável e não mais um artigo de luxo.

---

## Principais vantagens do novo modelo em 2026

### 1. Gestão de Tempo

No modelo antigo, você precisava se adaptar aos horários da autoescola. Em 2026, você estuda a teoria de madrugada se preferir e marca as aulas práticas nos horários em que o instrutor autônomo tiver disponibilidade, facilitando a vida de quem trabalha em regime integral.

### 2. Foco na Qualidade, não na Quantidade

Muitas pessoas já sabem dirigir (especialmente quem vive em áreas rurais ou já teve contato com veículos). Obrigar essas pessoas a pagar por 20 aulas era ineficiente. O novo modelo permite que quem já tem facilidade faça apenas 5 ou 10 aulas de refinamento e vá direto para a prova.

### 3. Estímulo ao Empreendedorismo

A abertura para instrutores autônomos criou um novo mercado. Milhares de instrutores que antes eram empregados de CFCs agora trabalham por conta própria, oferecendo um atendimento mais personalizado e focado no sucesso do aluno.

---

## Riscos e cuidados fundamentais

Nem tudo são flores. A liberdade exige responsabilidade redobrada do candidato. Ao optar pela CNH sem autoescola, fique atento aos seguintes perigos:

• **Subestimar a Prova Teórica:** Por ser "estudo em casa", muitos candidatos negligenciam as regras de sinalização e legislação, resultando em altos índices de reprovação na primeira tentativa.
• **Instrutores Não Credenciados:** Cuidado com anúncios em redes sociais. Verifique sempre o registro do instrutor no portal do Detran. Treinar com alguém não credenciado pode resultar em multas pesadas e apreensão do veículo.
• **Vícios de Direção:** Se você aprender com um parente ou amigo, pode herdar "vícios" (como apoiar o pé na embreagem ou não usar o retrovisor corretamente) que farão você ser reprovado no exame oficial. A visão de um profissional, mesmo que por poucas horas, é crucial.

### Visão Crítica de Especialistas

Setores das autoescolas argumentam que a falta de uma carga horária mínima pode aumentar o número de acidentes causados por condutores recém-habilitados com formação deficitária. Por outro lado, especialistas em educação de trânsito defendem que o rigor dos exames finais é o que realmente importa, e que o Brasil está apenas seguindo modelos de sucesso já adotados nos Estados Unidos e em partes da Europa.

---

## Conclusão

A **CNH Sem Autoescola em 2026** representa um marco na desburocratização do Brasil. O novo modelo respeita a autonomia do cidadão, utiliza a tecnologia para reduzir custos e foca no que realmente importa: a capacidade técnica e a responsabilidade ao volante.

Se você pretende tirar sua habilitação este ano, o segredo é o **planejamento**. Utilize os materiais gratuitos do governo, dedique-se ao estudo teórico e, se necessário, contrate algumas horas de um instrutor profissional para garantir que você não possui vícios de direção. O caminho para a liberdade de dirigir nunca foi tão curto e acessível.

---

## Perguntas Frequentes (FAQ) - Atualizado 2026

### 1. A CNH tirada sem autoescola tem a mesma validade?

Sim. A CNH é o mesmo documento nacional (físico e digital). Não há qualquer distinção no documento final sobre como o condutor se preparou para os exames.

### 2. Posso fazer o curso teórico presencial se eu quiser?

Com certeza. As autoescolas (CFCs) continuam existindo e oferecendo cursos presenciais para quem prefere aprender com um professor em sala de aula. A diferença é que agora isso é uma escolha sua, não uma imposição da lei.

### 3. O que acontece se eu for reprovado no exame prático?

O processo segue a regra padrão: você precisará pagar a taxa de reteste do Detran e poderá agendar uma nova prova após o período regulamentar. Você pode aproveitar esse tempo para fazer mais aulas práticas extras com seu instrutor de preferência.

### 4. O novo modelo vale para adição de categoria (ex: já tenho B e quero A)?

Sim, as regras de flexibilização também se aplicam para quem deseja adicionar categorias, facilitando muito para motoristas que precisam da categoria de moto para trabalho.

### 5. Como encontro instrutores autônomos confiáveis?

O aplicativo **Carteira Digital de Trânsito** possui uma aba de "Serviços" onde é possível consultar uma lista de instrutores autônomos credenciados por região, com avaliações de outros alunos e histórico de aprovação.

---

**Deseja começar seu processo hoje mesmo?**
Eu posso te ajudar a encontrar o link oficial do Detran do seu estado ou explicar detalhadamente como baixar o material de estudo teórico gratuito do governo para 2026. O que você prefere fazer agora?`

    try {
        console.log('📝 Tentando criar post (inserção mínima) sem imagem no bucket...');

        const { data: post, error: postError } = await supabase
            .from('posts')
            .insert({
                title: title,
                slug: slug,
                content: content,
                meta_title: "CNH Sem Autoescola 2026",
                meta_description: "Descubra como tirar a CNH sem autoescola em 2026. Entenda a nova resolução do Contran, o fim da obrigatoriedade das aulas teóricas.",
                og_image: publicUrl,
                author: "Simulado Brasil"
            })
            .select()

        if (postError) {
            console.log('\n❌ Erro na inserção:', postError.message)
            console.log('\n📝 Copie e execute o SQL abaixo no Editor de SQL do Supabase:')
            console.log('-----------------------------------------------------')
            const sql = `INSERT INTO posts (title, slug, content, meta_title, meta_description, hashtags, og_image, author, published_at)
VALUES (
  '${title.replace(/'/g, "''")}',
  '${slug}',
  '${content.replace(/'/g, "''").replace(/\n/g, "' || chr(10) || '")}',
  'CNH Sem Autoescola 2026: Guia Completo',
  'Descubra como tirar a CNH sem autoescola em 2026. Entenda a nova resolução do Contran.',
  'CNHSemAutoescola, CNH2026, Detran2026',
  '${publicUrl}',
  'Simulado Brasil',
  NOW()
);`
            console.log(sql)
            console.log('-----------------------------------------------------')

            writeFileSync('insert_cnh_sem_autoescola.sql', sql);
            console.log('\n📁 O SQL também foi salvo em insert_cnh_sem_autoescola.sql na raiz do projeto.')

        } else {
            console.log('🎉 Tudo pronto! Post criado com sucesso no banco de dados.')
            console.log('🔗 URL:', `https://souhabilitado.com/blog/${slug}`)
        }

    } catch (err) {
        console.error('❌ Erro:', err.message)
    }
}

createBlogPost()
