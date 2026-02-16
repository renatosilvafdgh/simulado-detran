# Questions Bank Integration - Guide

## Visão Geral

A aplicação agora está integrada com a tabela `questions_bank` do Supabase para gerar questões dos simulados.

## O que foi atualizado

### 1. Schema do Banco de Dados

✅ Tabela renomeada de `questions` para `questions_bank`  
✅ Índices atualizados (`idx_questions_bank_category`, `idx_questions_bank_difficulty`)  
✅ Políticas RLS mantidas  
✅ Foreign key em `user_answers` atualizada  

### 2. Tipos TypeScript

Arquivo: `src/types/database.types.ts`

```typescript
questions_bank: {
  Row: {
    id: string
    created_at: string
    category_id: string
    question_text: string
    option_a: string
    option_b: string
    option_c: string
    option_d: string
    correct_answer: 'A' | 'B' | 'C' | 'D'
    explanation: string | null
    difficulty: 'easy' | 'medium' | 'hard'
    tags: string[]
  }
}
```

### 3. Serviço de Simulados

Arquivo: `src/services/simulado.service.ts`

**Funções atualizadas:**
- `getQuestionsByCategory()` - Agora busca de `questions_bank`
- `getSimuladoWithAnswers()` - Join atualizado para `questions_bank`

## Como usar

### Buscar questões por categoria

```typescript
import { getQuestionsByCategory } from '@/services/simulado.service';

// Buscar 20 questões da categoria de Geografia
const categoryId = 'uuid-da-categoria';
const { data: questions, error } = await getQuestionsByCategory(categoryId, 20);

if (questions) {
  console.log(`${questions.length} questões carregadas`);
  questions.forEach(q => {
    console.log(q.question_text);
  });
}
```

### Criar simulado com questões

```typescript
import { useAuth } from '@/hooks/useAuth';
import { createSimulado, getQuestionsByCategory, saveUserAnswer } from '@/services/simulado.service';

const { user } = useAuth();
const categoryId = 'uuid-da-categoria';

// 1. Buscar questões
const { data: questions } = await getQuestionsByCategory(categoryId, 10);

// 2. Criar sessão do simulado
const { data: simulado } = await createSimulado(user.id, categoryId, questions.length);

// 3. Usuário responde às questões
// ... interface para responder ...

// 4. Salvar cada resposta
await saveUserAnswer(
  simulado.id,
  questions[0].id,
  'A', // resposta do usuário
  questions[0].correct_answer, // resposta correta
  30 // tempo em segundos
);
```

## Estrutura da Tabela questions_bank

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | UUID | Identificador único |
| created_at | TIMESTAMPTZ | Data de criação |
| category_id | UUID | Categoria da questão |
| question_text | TEXT | Texto da pergunta |
| option_a | TEXT | Alternativa A |
| option_b | TEXT | Alternativa B |
| option_c | TEXT | Alternativa C |
| option_d | TEXT | Alternativa D |
| correct_answer | TEXT | Resposta correta ('A', 'B', 'C' ou 'D') |
| explanation | TEXT | Explicação da resposta (opcional) |
| difficulty | TEXT | Dificuldade ('easy', 'medium', 'hard') |
| tags | TEXT[] | Tags para categorização |

## Migração de Dados

Se você já tem uma tabela chamada `questions` no banco:

1. Execute o script de migração:
   ```sql
   -- Arquivo: supabase/migrate_to_questions_bank.sql
   ALTER TABLE questions RENAME TO questions_bank;
   ALTER INDEX idx_questions_category RENAME TO idx_questions_bank_category;
   ALTER INDEX idx_questions_difficulty RENAME TO idx_questions_bank_difficulty;
   ```

Se você está começando do zero:

1. Execute o schema principal:
   ```
   supabase/schema.sql
   ```

## Inserindo Questões de Exemplo

```sql
-- Primeiro, pegue o ID de uma categoria
SELECT id, name FROM categories;

-- Insira questões
INSERT INTO questions_bank (
  category_id,
  question_text,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_answer,
  explanation,
  difficulty,
  tags
) VALUES (
  '[ID_DA_CATEGORIA_AQUI]',
  'Qual é a capital do Brasil?',
  'São Paulo',
  'Rio de Janeiro',
  'Brasília',
  'Salvador',
  'C',
  'Brasília foi inaugurada em 21 de abril de 1960 e é a capital federal do Brasil desde então.',
  'easy',
  ARRAY['geografia', 'brasil', 'capitais']
);
```

## Queries Úteis

### Contar questões por categoria

```sql
SELECT 
  c.name as categoria,
  COUNT(qb.id) as total_questoes
FROM categories c
LEFT JOIN questions_bank qb ON c.id = qb.category_id
GROUP BY c.name
ORDER BY total_questoes DESC;
```

### Buscar questões por dificuldade

```sql
SELECT 
  question_text,
  difficulty,
  tags
FROM questions_bank
WHERE difficulty = 'hard'
LIMIT 10;
```

### Verificar questões sem explicação

```sql
SELECT 
  id,
  question_text,
  difficulty
FROM questions_bank
WHERE explanation IS NULL;
```

## Testando a Integração

### 1. Verifique se a tabela existe

No SQL Editor do Supabase:
```sql
SELECT COUNT(*) as total FROM questions_bank;
```

### 2. Teste buscar questões

Na aplicação:
```typescript
const { data, error } = await getQuestionsByCategory(categoryId, 5);
console.log('Questões:', data);
console.log('Erro:', error);
```

### 3. Verifique no console do navegador

Abra o DevTools (F12) e veja se há erros relacionados ao Supabase.

## Troubleshooting

### Erro: relation "questions_bank" does not exist

**Solução**: Execute o schema SQL no painel do Supabase:
1. Vá para SQL Editor
2. Cole o conteúdo de `supabase/schema.sql`
3. Execute

### Erro: foreign key constraint violation

**Solução**: Certifique-se de que a `category_id` existe na tabela `categories`:
```sql
SELECT id, name FROM categories;
```

### Nenhuma questão retornada

**Solução**: Verifique se há questões na categoria:
```sql
SELECT COUNT(*) FROM questions_bank WHERE category_id = 'seu-uuid-aqui';
```

Se não houver, insira questões de exemplo.

## Próximos Passos

1. ✅ Execute o schema SQL (se ainda não executou)
2. ✅ Insira questões na tabela `questions_bank`
3. ✅ Teste criar um simulado pela interface
4. ✅ Verifique se as questões são carregadas corretamente

## Exemplo Completo de Uso

```typescript
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  getCategories 
} from '@/services/category.service';
import { 
  getQuestionsByCategory, 
  createSimulado,
  saveUserAnswer,
  completeSimulado
} from '@/services/simulado.service';

function SimuladoPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentSimulado, setCurrentSimulado] = useState(null);

  // Carregar categorias
  useEffect(() => {
    async function load() {
      const { data } = await getCategories();
      setCategories(data || []);
    }
    load();
  }, []);

  // Iniciar simulado
  async function startSimulado(categoryId) {
    // Buscar questões
    const { data: qs } = await getQuestionsByCategory(categoryId, 10);
    setQuestions(qs || []);

    // Criar sessão
    const { data: sim } = await createSimulado(user.id, categoryId, qs.length);
    setCurrentSimulado(sim);
  }

  // Responder questão
  async function answerQuestion(questionId, userAnswer, correctAnswer) {
    await saveUserAnswer(
      currentSimulado.id,
      questionId,
      userAnswer,
      correctAnswer
    );
  }

  // Finalizar simulado
  async function finishSimulado() {
    const { data } = await completeSimulado(currentSimulado.id);
    console.log('Pontuação final:', data.score);
  }

  return (
    <div>
      {/* UI do simulado... */}
    </div>
  );
}
```

---

**Integração completa! ✅** A aplicação agora usa `questions_bank` para todos os simulados.
