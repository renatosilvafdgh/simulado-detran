import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { basename } from 'path'

const SUPABASE_URL = "https://uebewihyttehjdzazsku.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}

async function createBlogPost() {
    const title = "CNH Gratuita e CNH Social 2026: Quem Tem Direito, Como Se Inscrever e Lista de Estados"
    const slug = "cnh-gratuita-cnh-social-2026"
    const imagePath = "C:\\Users\\srenato.rs\\.gemini\\antigravity\\brain\\d85733f8-73d9-4f03-9e2c-a59b2d90ed9d\\cnh_social_2026_blog_image_1771767061476.png"
    const fileName = `blog/cnh-social-2026-${Date.now()}.png`

    const content = `# CNH Gratuita e CNH Social 2026: Guia Completo Para Conseguir Sua Habilitação Sem Pagar

Tirar a Carteira Nacional de Habilitação no Brasil pode representar um investimento alto para muitas famílias. Em diversos estados, o valor total do processo ultrapassa facilmente R$ 2.000, considerando exames, aulas, taxas e emissão do documento. Por esse motivo, a busca por **CNH gratuita 2026** tem crescido de forma significativa.

Mas será que realmente existe habilitação gratuita? CNH gratuita é a mesma coisa que CNH Social? Existe algum programa federal que paga a carteira de motorista?

Neste guia completo e atualizado para 2026, você vai entender exatamente como funciona o programa, quem pode participar, quais estados costumam oferecer vagas e como fazer sua inscrição da forma correta, sem cair em golpes ou informações falsas.

## O que é CNH gratuita?

O termo “CNH gratuita” não é o nome oficial de nenhum programa nacional. Ele é uma expressão popular utilizada principalmente na internet e nas redes sociais para se referir ao programa conhecido oficialmente como **CNH Social**.

Na prática, quando alguém pesquisa por CNH gratuita, está buscando informações sobre a possibilidade de tirar a primeira habilitação sem pagar os custos tradicionais do processo.

É importante entender que não existe um programa federal fixo, permanente e obrigatório em todo o Brasil. A iniciativa depende de cada estado, que pode abrir editais específicos de acordo com seu orçamento e planejamento anual.

Ou seja:
*   **CNH gratuita** é o termo popular.
*   **CNH Social** é o nome oficial do programa estadual.

## O que é a CNH Social?

A CNH Social é um programa criado por governos estaduais com o objetivo de permitir que pessoas de baixa renda tenham acesso à primeira habilitação ou, em alguns casos, à mudança ou adição de categoria, sem arcar com os custos do processo.

O programa é administrado pelos Detrans estaduais, como por exemplo:
*   **Detran-SP**
*   **Detran-MG**
*   **Detran-PR**
*   **Detran-ES**

Cada estado define suas próprias regras, incluindo a quantidade de vagas disponíveis, critérios de renda, exigência de inscrição no CadÚnico e o período de inscrição. Isso significa que as regras podem mudar de um estado para outro, e também de um ano para outro.

## O que a CNH Social cobre?

Quando o candidato é selecionado no programa, ele não precisa pagar as etapas obrigatórias do processo de habilitação. Normalmente, o programa cobre:
*   Exame médico e psicológico
*   Curso teórico e Prova teórica
*   Aulas práticas e Prova prática
*   Taxas administrativas do Detran e Emissão da CNH

Na prática, o processo é exatamente o mesmo da habilitação tradicional. A diferença é que os custos são assumidos pelo programa social. Em alguns estados, a CNH Social também pode incluir mudança para categoria profissional (C, D ou E), o que representa uma oportunidade importante para quem deseja trabalhar como motorista profissional.

## Quem tem direito à CNH Social em 2026?

Os critérios variam conforme o edital estadual, mas de forma geral os requisitos costumam incluir:
*   Ter 18 anos ou mais
*   Estar inscrito no **CadÚnico** (Cadastro Único)
*   Possuir renda familiar baixa
*   Saber ler e escrever
*   Não possuir CNH (para primeira habilitação)

Em muitos estados, a seleção considera principalmente a situação socioeconômica da família. Beneficiários de programas sociais, pessoas desempregadas e estudantes da rede pública podem ter prioridade. Um ponto essencial é manter o CadÚnico atualizado; caso haja divergência nas informações, o candidato pode ser desclassificado.

## Estados que tradicionalmente oferecem CNH Social

A abertura de vagas depende do orçamento estadual. Estados que historicamente realizam edições do programa incluem:
*   **Paraná:** [detran.pr.gov.br](https://www.detran.pr.gov.br)
*   **Espírito Santo:** [detran.es.gov.br](https://www.detran.es.gov.br)
*   **Rio Grande do Sul:** [detran.rs.gov.br](https://www.detran.rs.gov.br)
*   **Maranhão:** [detran.ma.gov.br](https://www.detran.ma.gov.br)
*   **Amazonas:** [detran.am.gov.br](https://www.detran.am.gov.br)
*   **São Paulo:** [detran.sp.gov.br](https://www.detran.sp.gov.br)

É importante destacar que as inscrições não ficam abertas durante todo o ano. Cada estado divulga editais específicos com prazo determinado para cadastro.

## Como se inscrever na CNH Social 2026 (Passo a Passo)

### 1. Atualize seu CadÚnico
Antes de qualquer inscrição, é fundamental garantir que seus dados estejam corretos no Cadastro Único. Vá até o CRAS da sua cidade e confirme endereço, renda familiar e documentação. Muitas eliminações acontecem por inconsistência de dados.

### 2. Acompanhe o site oficial do Detran
Entre no site oficial do Detran do seu estado e procure pela aba “CNH Social”, “Habilitação Social” ou “CNH Popular”. Evite clicar em links patrocinados ou páginas não oficiais, pois golpistas costumam criar sites semelhantes aos oficiais.

### 3. Leia atentamente o edital
O edital é o documento mais importante. Nele constam o número de vagas, período de inscrição, critérios de seleção e documentos exigidos. Leia tudo com calma antes de preencher o cadastro.

### 4. Realize a inscrição online
Normalmente, o processo envolve o preenchimento de dados pessoais, número do NIS ou CadÚnico e declaração de renda. Após concluir, salve ou imprima o comprovante de inscrição.

### 5. Aguarde a seleção
Alguns estados realizam sorteio eletrônico público, enquanto outros utilizam critérios técnicos baseados na renda e situação social. Caso seja aprovado, você receberá orientações para iniciar o processo junto ao CFC credenciado.

## Como evitar golpes envolvendo CNH gratuita

Infelizmente, existem muitas promessas falsas de habilitação facilitada. Lembre-se sempre:
*   **Nenhum programa oficial cobra taxa para inscrição.**
*   Nenhum programa elimina provas ou exames obrigatórios.
*   Nenhum Detran vende vaga garantida.
Sempre utilize exclusivamente o site oficial do Detran do seu estado para qualquer procedimento.

## Conclusão

A CNH gratuita em 2026 continua sendo uma oportunidade real por meio da CNH Social, oferecida por diversos estados brasileiros. Embora não exista um programa federal permanente válido para todo o país, as iniciativas estaduais permitem que milhares de pessoas tenham acesso à habilitação sem arcar com os custos tradicionais. Para aumentar suas chances, é essencial manter o CadÚnico atualizado e acompanhar os canais oficiais do governo.

---

## Perguntas Frequentes (FAQ)

### CNH gratuita é a mesma coisa que CNH Social?
Sim. CNH gratuita é o nome popular utilizado para se referir ao programa estadual chamado CNH Social.

### O governo federal oferece CNH gratuita?
Não existe um programa federal permanente válido para todo o Brasil. A iniciativa depende de cada estado.

### Quem recebe Bolsa Família pode participar?
Se estiver inscrito no CadÚnico e atender aos critérios do edital estadual, pode participar do processo de seleção.

### Posso escolher qualquer categoria?
Normalmente as vagas são destinadas às categorias A ou B, mas alguns estados oferecem mudança ou adição para categorias profissionais.

### Preciso pagar alguma taxa durante o processo?
Não, caso você seja selecionado e aprovado dentro das regras do programa oficial do seu estado.`

    try {
        console.log('📤 Fazendo upload da imagem para Supabase Storage...')
        const fileBuffer = readFileSync(imagePath)
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(fileName, fileBuffer, {
                contentType: 'image/png',
                cacheControl: '31536000',
                upsert: true
            })

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(fileName)

        console.log('✅ Imagem enviada:', publicUrl)

        console.log('📝 Tentando criar post (inserção mínima)...')
        const { data: post, error: postError } = await supabase
            .from('posts')
            .insert({
                title: title,
                slug: slug,
                content: content,
                meta_title: "CNH Social 2026",
                meta_description: "Guia completo CNH Social 2026",
                og_image: publicUrl,
                author: "Simulado Brasil"
            })
            .select()

        if (postError) {
            console.log('\n❌ Erro na inserção:', postError.message)
            console.log('\n📝 Copie e execute o SQL abaixo no Editor de SQL do Supabase:')
            console.log('-----------------------------------------------------')
            console.log(`INSERT INTO posts (title, slug, content, meta_title, meta_description, hashtags, og_image, author, published_at)
VALUES (
  '${title.replace(/'/g, "''")}',
  '${slug}',
  '${content.replace(/'/g, "''").replace(/\n/g, "' || chr(10) || '")}',
  'CNH Gratuita e CNH Social 2026: Guia Completo',
  'Saiba como funciona a CNH Gratuita e CNH Social em 2026, quem pode participar, quais estados oferecem o programa e veja o passo a passo para se inscrever.',
  'CNHSocial, CNHGratuita, Detran2026, HabilitacaoSocial',
  '${publicUrl}',
  'Simulado Brasil',
  NOW()
);`)
            console.log('-----------------------------------------------------')
        } else {
            console.log('🎉 Tudo pronto! Post criado com sucesso.')
            console.log('🔗 URL:', `https://souhabilitado.com/blog/${slug}`)
        }

    } catch (err) {
        console.error('❌ Erro:', err.message)
    }
}

createBlogPost()
