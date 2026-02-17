import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://uebewihyttehjdzazsku.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function updatePostWithFormattedContent() {
    const slug = 'guia-de-placas-de-transito-contran-o-que-voce-precisa-saber-para-nao-errar'

    const updatedContent = `# O Código Visual das Vias: Como a Sinalização Vertical Governa o Espaço Público

A sinalização vertical de trânsito é muito mais que um arranjo de formas e cores; ela é a linguagem jurídica que gerencia o espaço compartilhado e preserva a vida. Para o engenheiro de tráfego, cada placa é um dispositivo de segurança projetado para reduzir a incerteza do condutor. Para o motorista, a decodificação cromática é o primeiro passo para a direção defensiva. Compreender a distinção entre as categorias de **Regulamentação**, **Advertência** e **Indicação** é o que separa o comportamento reativo do preventivo, garantindo que a via flua com ordem e legalidade.

## Placas de Regulamentação: O Caráter Imperativo da Lei

As placas de regulamentação são as garantidoras da ordem jurídica no trânsito. Diferente de outras categorias, elas possuem caráter **imperativo**: expressam obrigações, proibições ou restrições que o condutor deve seguir rigorosamente. O desrespeito a essas mensagens não é apenas um risco operacional, mas uma infração direta ao Código de Trânsito Brasileiro (CTB), sujeita a multas e penalidades.

### A Psicologia da Ordem
O formato circular com bordas vermelhas e fundo branco utiliza a cor do perigo para comunicar ordens imediatas. O uso da terminologia técnica é preciso: estas placas utilizam o termo **"Máximo Permitido"**.

#### 🛑 R-1 (Pare)
**Formato:** Octogonal | **Cor:** Vermelho com texto branco "PARE"

Única placa de formato octogonal. Sua geometria exclusiva visa garantir o reconhecimento imediato pelo condutor, mesmo quando visualizada por trás ou sob condições adversas de visibilidade, assegurando que o motorista pare totalmente o veículo.

#### 🔴 R-19 (Velocidade Máxima Permitida)
**Formato:** Circular | **Cor:** Branco com borda vermelha

Estabelece o limite legal intransponível para o trecho. O número em preto indica a velocidade máxima permitida (ex: 60 km/h).

#### 🚫 R-6a (Proibido Estacionar)
**Formato:** Circular | **Cor:** Branco com faixa diagonal vermelha

Uma restrição de uso da via que, se descumprida em desacordo com a regulamentação, caracteriza infração grave.

Uma vez estabelecida a lei, o sistema viário utiliza outra categoria para preparar o condutor para o que os olhos ainda não podem ver.

## Placas de Advertência: A Prevenção como Estratégia de Segurança

Se a regulamentação ordena, a advertência antecipa. A função dessas placas é alertar sobre condições potencialmente perigosas ou obstáculos geográficos que não são imediatamente visíveis. A engenharia de tráfego utiliza o formato de losango amarelo para elevar o estado de alerta do condutor, exigindo, invariavelmente, uma **redução de velocidade** e o aumento da atenção.

### Síntese Comportamental: "Limitado" vs. "Máximo Permitido"
A diferença linguística entre as categorias altera diretamente a reação do motorista. Enquanto a regulamentação impõe um limite legal, a advertência utiliza o termo **"Limitado"** para descrever uma condição física ou geográfica.

*   **O Raciocínio Logístico:** Um alerta de "Altura Limitada" (Advertência) serve para que o condutor desacelere e avalie seu veículo antes de encontrar a placa de "Altura Máxima Permitida" (Regulamentação) no local do obstáculo. Ignorar o aviso de advertência significa entrar em uma zona de risco físico antes mesmo da infração legal ocorrer.

### Padrões e Exceções Técnicas (Manual CONTRAN)
Embora o padrão seja o fundo amarelo, o Manual Brasileiro de Sinalização (2022) define exceções críticas:

#### 🚦 A-14 (Semáforo à frente)
**Formato:** Losango | **Cor:** Amarelo com símbolo de semáforo

Incorpora as cores verde, amarelo e vermelho para associação cognitiva imediata.

#### 🚧 A-24 (Obras)
**Formato:** Losango | **Cor:** Laranja (exceção!)

Para destacar o caráter temporário e o risco elevado, tanto o **fundo quanto a orla externa** devem ser obrigatoriamente na cor laranja. Símbolo de trabalhador com pá.

#### 🚶 A-30c (Trânsito Compartilhado)
**Formato:** Losango | **Cor:** Amarelo com símbolos de pedestre e ciclista

Sinalização especial que adverte ciclistas e pedestres sobre a circulação conjunta, vital para a mobilidade urbana segura.

## Placas de Indicação e Orientação: A Logística da Fluidez

A sinalização de indicação é a ferramenta estratégica para a manutenção da fluidez. Ela reduz o estresse do condutor em ambientes desconhecidos, permitindo que as decisões de rota (como trocas de faixa ou saídas) sejam tomadas com antecedência, evitando manobras bruscas.

*   **Identificação e Destinos:** Placas verdes e azuis identificam distâncias, percursos e locais de interesse.

#### 🏥 S-2 (Hospital)
**Formato:** Retangular | **Cor:** Azul com símbolo H branco

#### 🅿️ S-1 (Estacionamento)
**Formato:** Retangular | **Cor:** Azul com letra P branca

Garantem que o usuário localize suporte essencial sem desviar sua atenção da condução segura.

## O Layer Técnico: Visibilidade e Engenharia de Precisão

Para que uma placa seja eficaz, ela deve obedecer a critérios rígidos de engenharia previstos pelo CONTRAN. A sinalização deve ser legível sob qualquer condição climática ou de luminosidade.

1.  **Cálculo de Percepção e Reação:** O posicionamento das placas baseia-se em um tempo mínimo de **2,5 segundos de percepção e reação**. 
2.  **O Ângulo de Visada:** A distância de visibilidade inclui o trecho anterior à placa até o ponto onde a trajetória do veículo forma um **ângulo de 10 graus** em relação ao sinal — momento a partir do qual o condutor deixa de visualizar a placa para focar na execução da manobra.
3.  **Materiais e Retrorrefletividade:** Em vias sem iluminação pública, é obrigatório o uso de películas retrorrefletivas. Dependendo do projeto, podem ser utilizadas películas de **esferas inclusas, esferas encapsuladas ou lentes prismáticas**, que devolvem a luz dos faróis para o condutor.
4.  **Estrutura de Suporte:** As placas devem ser fixadas rigidamente em suportes de **aço ou madeira imunizada**, impedindo que sejam giradas ou deslocadas pelo vento ou impacto.

## Conclusão e Dicas de Memorização

Dominar a sinalização vertical exige entender que cada sinal é um nó de informação em um sistema complexo de segurança viária. Para facilitar sua rotina ao volante:

*   **Padrão de Cores:** Vermelho regula (ordem legal), Amarelo adverte (risco físico), Verde/Azul indica (logística).
*   **Padrão de Termos:** "Máximo" é o limite da lei; "Limitado" é o aviso do obstáculo.
*   **Estudo Ativo:** Utilize aplicativos de simulados e pratique a observação em tempo real, tentando identificar a função da placa antes de atingir a distância mínima de visibilidade.

A sinalização vertical não é uma sugestão; é o manual de instruções da via. Respeitá-la é a forma mais eficaz de garantir que todos cheguem ao seu destino com segurança.`

    console.log('🔄 Atualizando post com formatação melhorada...')

    const { data, error } = await supabase
        .from('posts')
        .update({ content: updatedContent })
        .eq('slug', slug)
        .select()

    if (error) {
        console.error('❌ Erro ao atualizar:', error.message)
        return
    }

    console.log('✅ Post atualizado com emojis e formatação melhorada!')
    console.log('\n🔗 Visualize em: https://souhabilitado.com/blog/' + slug)
}

updatePostWithFormattedContent()
