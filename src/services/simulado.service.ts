import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type Simulado = Database['public']['Tables']['simulados']['Row'];
type SimuladoInsert = Database['public']['Tables']['simulados']['Insert'];
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
    const { data, error } = await supabase
        .from('simulados')
        .insert({
            user_id: userId,
            category_name: categoryName,
            total_questions: totalQuestions,
            status: 'in_progress',
        })
        .select()
        .single();

    return { data, error };
}

/**
 * Get questions by category
 */
export async function getQuestionsByCategory(
    category: string,
    limit: number = 20
): Promise<{ data: Question[] | null; error: any }> {
    const { data, error } = await supabase
        .from('questions_bank')
        .select('*')
        .eq('category', category)
        .limit(limit);

    return { data, error };
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
    const { data, error } = await supabase
        .from('user_answers')
        .insert({
            simulado_id: simuladoId,
            question_id: questionId,
            user_answer: userAnswer,
            is_correct: userAnswer === correctIndex,
            time_spent: timeSpent,
        })
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

    const correctAnswers = answers.filter(a => a.is_correct).length;
    const totalQuestions = answers.length;
    const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    const { data, error } = await supabase
        .from('simulados')
        .update({
            status: 'completed',
            correct_answers: correctAnswers,
            score: Math.round(score),
            completed_at: new Date().toISOString(),
        })
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
    const { data, error } = await supabase
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

    if (error || !simulados) {
        return { data: null, error };
    }

    const totalSimulados = simulados.length;
    const averageScore = totalSimulados > 0
        ? simulados.reduce((acc, s) => acc + (s.score || 0), 0) / totalSimulados
        : 0;
    const totalQuestions = simulados.reduce((acc, s) => acc + s.total_questions, 0);
    const totalCorrect = simulados.reduce((acc, s) => acc + (s.correct_answers || 0), 0);

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
