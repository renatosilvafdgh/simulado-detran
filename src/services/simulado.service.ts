import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

// Create a public client to bypass RLS issues if the user is logged in
// but the policy only allows 'public'/'anon' access.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const publicSupabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
});

type Simulado = Database['public']['Tables']['simulados']['Row'];
// type SimuladoInsert = Database['public']['Tables']['simulados']['Insert']; // Unused
type UserAnswer = Database['public']['Tables']['user_answers']['Row'];
type Question = Database['public']['Tables']['questions_bank']['Row'];

/**
 * Create a new simulado session
 */
export async function createSimulado(
    userId: string | null,
    categoryName: string,
    totalQuestions: number
): Promise<{ data: Simulado | null; error: any }> {
    const { data, error } = await (supabase as any)
        .from('simulados')
        .insert({
            user_id: userId,
            category_name: categoryName,
            total_questions: totalQuestions,
            status: 'in_progress',
        } as any)
        .select()
        .single();

    // Explicit casting to avoid 'never' issues if types mismatch
    return { data: data as Simulado | null, error };
}

/**
 * Get questions by category
 */
export async function getQuestionsByCategory(
    category: string,
    limit: number = 20
): Promise<{ data: Question[] | null; error: any }> {
    // 1. Fetch questions from the standard bank for this category
    // We fetch a bit less to make room for Placas, or just fetch requested amount
    // to ensure we have enough.
    const { data: bankData, error: bankError } = await (supabase as any)
        .from('questions_bank')
        .select('*')
        .eq('category', category)
        .limit(limit);

    if (bankError) {
        return { data: null, error: bankError };
    }

    // 2. Fetch some questions from Placas table to mix in
    // We'll aim for about 20-30% of the questions to be from Placas
    const placasCount = Math.max(2, Math.floor(limit * 0.3));

    // We pick random IDs from range 1-158. 
    // Since we can't easily do "random" in SQL without RPC, we'll fetch a range 
    // or just use our existing helper but for a specific count.
    // To get "random-ish", we can pick a random start ID.
    const randomStart = Math.floor(Math.random() * 140) + 1;

    const { data: placasData } = await (publicSupabase as any)
        .from('questions_placas_cores_e_caminhos')
        .select('*')
        .gte('id', randomStart)
        .limit(placasCount);

    // Map Placas data to Question structure
    const mappedPlacas = placasData ? placasData.map((q: any) => ({
        ...q,
        id: String(q.id),
        category: category, // Assign current category so they fit in the section
        subject: 'Placas, Cores e Caminhos'
    })) : [];

    // 3. Combine and Shuffle
    const combined = [...(bankData || []), ...mappedPlacas];

    // Simple shuffle
    const shuffled = combined.sort(() => Math.random() - 0.5);

    // Return requested limit
    return { data: shuffled.slice(0, limit), error: null };
}

/**
 * Get questions from Placas table (questions_placas_cores_e_caminhos)
 */
export async function getQuestionsFromPlacasTable(
    limit: number = 20
): Promise<{ data: Question[] | null; error: any }> {
    const { data, error } = await (publicSupabase as any)
        .from('questions_placas_cores_e_caminhos')
        .select('*')
        .lte('id', 158) // User specified ID 1-158
        .limit(limit);

    // Map to Question type and ensure ID is string
    const mappedData = data ? data.map((q: any) => ({
        ...q,
        id: String(q.id),
        // Ensure other required fields exist if missing
        category: q.category || 'Placas',
        subject: q.subject || 'Placas'
    })) : [];

    return { data: (mappedData as Question[]), error };
}

/**
 * Save user answer
 */
export async function saveUserAnswer(
    simuladoId: string,
    questionId: string,
    userAnswer: number,
    correctIndex: number,
    timeSpent?: number
): Promise<{ data: UserAnswer | null; error: any }> {
    const { data, error } = await (supabase as any)
        .from('user_answers')
        .insert({
            simulado_id: simuladoId,
            question_id: questionId,
            user_answer: userAnswer,
            is_correct: userAnswer === correctIndex,
            time_spent: timeSpent,
        } as any)
        .select()
        .single();

    return { data, error };
}

/**
 * Complete simulado and calculate score
 */
export async function completeSimulado(
    simuladoId: string
): Promise<{ data: Simulado | null; error: any }> {
    // Get all answers for this simulado
    const { data: answers, error: answersError } = await supabase
        .from('user_answers')
        .select('is_correct')
        .eq('simulado_id', simuladoId);

    if (answersError || !answers) {
        return { data: null, error: answersError };
    }

    const validAnswers = answers as { is_correct: boolean }[];
    const correctAnswers = validAnswers.filter(a => a.is_correct).length;
    const totalQuestions = validAnswers.length;
    const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    const { data, error } = await (supabase as any)
        .from('simulados')
        .update({
            status: 'completed',
            correct_answers: correctAnswers,
            score: Math.round(score),
            completed_at: new Date().toISOString(),
        } as any)
        .eq('id', simuladoId)
        .select()
        .single();

    return { data, error };
}

/**
 * Get user's simulado history
 */
export async function getUserSimulados(
    userId: string
): Promise<{ data: Simulado[] | null; error: any }> {
    const { data, error } = await (supabase as any)
        .from('simulados')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    return { data, error };
}

/**
 * Get simulado by ID with answers
 */
export async function getSimuladoWithAnswers(simuladoId: string) {
    const { data: simulado, error: simuladoError } = await supabase
        .from('simulados')
        .select('*')
        .eq('id', simuladoId)
        .single();

    if (simuladoError || !simulado) {
        return { data: null, error: simuladoError };
    }

    const { data: answers, error: answersError } = await supabase
        .from('user_answers')
        .select('*')
        .eq('simulado_id', simuladoId);

    return {
        data: {
            simulado,
            answers,
        },
        error: answersError,
    };
}

/**
 * Get user statistics
 */
export async function getUserStats(userId: string) {
    const { data: simulados, error } = await supabase
        .from('simulados')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'completed');

    const validSimulados = (simulados as Simulado[]) || [];

    if (error || !simulados) {
        return { data: null, error };
    }

    const totalSimulados = validSimulados.length;
    const averageScore = totalSimulados > 0
        ? validSimulados.reduce((acc, s) => acc + (s.score || 0), 0) / totalSimulados
        : 0;
    const totalQuestions = validSimulados.reduce((acc, s) => acc + s.total_questions, 0);
    const totalCorrect = validSimulados.reduce((acc, s) => acc + (s.correct_answers || 0), 0);

    return {
        data: {
            totalSimulados,
            averageScore: Math.round(averageScore),
            totalQuestions,
            totalCorrect,
            accuracy: totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0,
        },
        error: null,
    };
}
