# Supabase Integration - Setup Guide

## Visão Geral

Este guia explica como configurar o Supabase para a aplicação Simulado Brasil.

## Pré-requisitos

- Conta no Supabase (https://supabase.com)
- Node.js instalado
- Projeto Supabase criado

## Passo 1: Configurar Variáveis de Ambiente

As credenciais do Supabase já estão configuradas no arquivo `.env`:

```
VITE_SUPABASE_URL=https://uebewihyttehjdzazsku.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Passo 2: Criar Tabelas no Banco de Dados

1. Acesse o painel do Supabase: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá para **SQL Editor** no menu lateral
4. Crie uma nova query
5. Copie e cole o conteúdo do arquivo `supabase/schema.sql`
6. Execute a query (clique em "Run" ou pressione Ctrl+Enter)

Isso criará:
- ✅ Tabela `profiles` - Perfis de usuários
- ✅ Tabela `categories` - Categorias de simulados
- ✅ Tabela `questions` - Banco de questões
- ✅ Tabela `simulados` - Sessões de simulados
- ✅ Tabela `user_answers` - Respostas dos usuários
- ✅ Tabela `blog_posts` - Posts do blog
- ✅ Políticas RLS (Row Level Security)
- ✅ Índices para performance
- ✅ Triggers para updated_at
- ✅ Categorias de exemplo

## Passo 3: Verificar Autenticação

1. No painel do Supabase, vá para **Authentication** > **Providers**
2. Certifique-se de que **Email** está habilitado
3. (Opcional) Configure confirmação de email se desejar

## Passo 4: Inserir Dados de Exemplo

### Adicionar Questões

```sql
INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty)
SELECT 
  c.id,
  'Qual é a capital do Brasil?',
  'São Paulo',
  'Rio de Janeiro',
  'Brasília',
  'Salvador',
  'C',
  'Brasília foi inaugurada em 21 de abril de 1960 como a nova capital do Brasil.',
  'easy'
FROM categories c
WHERE c.name = 'Geografia'
LIMIT 1;
```

### Adicionar Post no Blog

```sql
INSERT INTO blog_posts (title, slug, content, excerpt, author_id, category, published, published_at)
VALUES (
  'Bem-vindo ao Simulado Brasil',
  'bem-vindo-simulado-brasil',
  'Conteúdo completo do post...',
  'Comece a treinar para suas provas!',
  auth.uid(),  -- Use o ID do usuário logado
  'Notícias',
  true,
  NOW()
);
```

## Passo 5: Iniciar a Aplicação

```bash
# Instalar dependências (já foi feito)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## Estrutura dos Serviços

A aplicação usa os seguintes serviços:

### Auth Service (`src/services/auth.service.ts`)
- `signUp()` - Criar nova conta
- `signIn()` - Fazer login
- `signOut()` - Sair
- `getProfile()` - Obter perfil do usuário
- `updateProfile()` - Atualizar perfil

### Simulado Service (`src/services/simulado.service.ts`)
- `createSimulado()` - Criar nova sessão de simulado
- `getQuestionsByCategory()` - Buscar questões por categoria
- `saveUserAnswer()` - Salvar resposta do usuário
- `completeSimulado()` - Finalizar simulado e calcular pontuação
- `getUserStats()` - Obter estatísticas do usuário

### Blog Service (`src/services/blog.service.ts`)
- `getBlogPosts()` - Listar posts do blog
- `getBlogPostBySlug()` - Buscar post por slug
- `searchBlogPosts()` - Buscar posts

### Category Service (`src/services/category.service.ts`)
- `getCategories()` - Listar categorias
- `getCategoryById()` - Buscar categoria por ID

## Usando Autenticação

A aplicação usa `AuthContext` para gerenciar autenticação:

```tsx
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, session, loading, signOut } = useAuth();

  if (loading) return <div>Carregando...</div>;
  
  if (!user) {
    return <div>Faça login para continuar</div>;
  }

  return (
    <div>
      <p>Bem-vindo, {user.email}!</p>
      <button onClick={signOut}>Sair</button>
    </div>
  );
}
```

## Componentes de Autenticação

- `<LoginForm />` - Formulário de login
- `<SignupForm />` - Formulário de cadastro
- `<AuthModal />` - Modal que contém login/signup

## Políticas de Segurança (RLS)

Todas as tabelas têm Row Level Security habilitado:

- **profiles**: Usuários podem ver/editar apenas seu próprio perfil
- **simulados**: Usuários podem criar/ver apenas seus próprios simulados
- **user_answers**: Usuários podem criar/ver apenas suas próprias respostas
- **questions**: Todos usuários autenticados podem visualizar
- **categories**: Todos usuários autenticados podem visualizar
- **blog_posts**: Todos podem ver posts publicados, apenas autores podem editar

## Troubleshooting

### Erro: "Missing Supabase environment variables"
- Certifique-se de que o arquivo `.env` existe na raiz do projeto
- Reinicie o servidor de desenvolvimento

### Erro de TypeScript nos services
- Os erros de tipo são esperados até que as tabelas sejam criadas no Supabase
- Execute o schema.sql primeiro

### Usuário não consegue fazer login
- Verifique se o email provider está habilitado no Supabase
- Certifique-se de que o usuário confirmou o email (se obrigatório)

## Próximos Passos

1. ✅ Execute o schema SQL no Supabase
2. ✅ Adicione questões de exemplo
3. ✅ Teste a autenticação (signup/login)
4. ✅ Teste criar um simulado
5. ✅ Adicione posts no blog
