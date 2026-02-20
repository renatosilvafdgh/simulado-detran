import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

// Create a public client to bypass RLS issues if the user is logged in
// but the policy only allows 'public'/'anon' access.
// UPDATE: Switched to main client for all queries to ensure consistency.
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const publicSupabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
//     auth: { persistSession: false }
// });

type Simulado = Database['public']['Tables']['simulados']['Row'];
// type SimuladoInsert = Database['public']['Tables']['simulados']['Insert']; // Unused
type UserAnswer = Database['public']['Tables']['user_answers']['Row'];
// We define Question interface based on usage since we removed questions_bank
export interface Question {
    id: string;
    subject: string | null;
    question: string; // The question text
    category: string | null;
    alternative_1: string;
    alternative_2: string;
    alternative_3: string;
    alternative_4: string;
    correct_index: number;
    explanation: string | null;
    image_url?: string | null; // Optional if existing
}

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
 * Get questions by category (Refactored to use module-based distribution)
 */
export async function getQuestionsByCategory(
    category: string,
    totalCount: number = 20
): Promise<{ data: Question[] | null; error: any }> {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const localClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false }
    });

    // Logical mandatory distribution:
    // M1 Com Imagem: 15% to 20% (Target 15%)
    // M1 Sem Imagem: 5% to 10% (Target 10%)
    // M2: 25%
    // M3: 25%
    // M4: 25%

    // Calculate shares (using integers to ensure sum is totalCount)
    const m1_com_share = Math.floor(totalCount * 0.15);
    const m1_sem_share = Math.floor(totalCount * 0.10);
    const m2_share = Math.floor(totalCount * 0.25);
    const m3_share = Math.floor(totalCount * 0.25);
    // Use remainder for M4 to guarantee sum
    const m4_share = totalCount - (m1_com_share + m1_sem_share + m2_share + m3_share);

    const modules = [
        { table: 'Modulo-1-com-imagem', limit: m1_com_share, prefix: 'm1c' },
        { table: 'Modulo-1-sem-imagem', limit: m1_sem_share, prefix: 'm1s' },
        { table: 'Modulo-2', limit: m2_share, prefix: 'm2' },
        { table: 'Modulo-3', limit: m3_share, prefix: 'm3' },
        { table: 'Modulo-4', limit: m4_share, prefix: 'm4' }
    ];

    const allQuestions: Question[] = [];

    try {
        for (const mod of modules) {
            if (mod.limit <= 0) continue;

            // Fetch random questions from each module
            const { data, error } = await (localClient
                .from(mod.table as any)
                .select('*')
                .limit(mod.limit) as any);

            if (error) {
                console.warn(`Error fetching from ${mod.table}:`, error);
                continue;
            }

            if (data) {
                const mapped = data.map((q: any) => ({
                    id: `${mod.prefix}-${q.id}`,
                    question: q.question,
                    category: category,
                    subject: q.subject || `Módulo ${mod.prefix}`,
                    alternative_1: q.alternative_1,
                    alternative_2: q.alternative_2,
                    alternative_3: q.alternative_3,
                    alternative_4: q.alternative_4,
                    correct_index: q.correct_index,
                    explanation: q.explanation,
                    image_url: q.image_url || null
                }));
                allQuestions.push(...mapped);
            }
        }

        // Shuffle all questions together
        const shuffled = allQuestions.sort(() => Math.random() - 0.5);

        // If we still don't have enough questions (e.g. some tables empty), 
        // return what we have (or we could try to fill from others, but requirement is per-module)
        return { data: shuffled, error: null };

    } catch (err) {
        console.error('SimuladoService distribution error:', err);
        return { data: null, error: err };
    }
}

/**
 * Get questions from Placas table (Legacy/Specific access directly)
 * Maintained for backward compatibility or direct calls
 */
export async function getQuestionsFromPlacasTable(
    limit: number = 20
): Promise<{ data: Question[] | null; error: any }> {
    return getQuestionsByCategory('Placas', limit);
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
