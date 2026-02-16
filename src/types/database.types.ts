export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    created_at: string
                    email: string
                    full_name: string | null
                }
                Insert: {
                    id: string
                    created_at?: string
                    email: string
                    full_name?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    email?: string
                    full_name?: string | null
                }
            }
            categories: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    icon: string | null
                }
                Insert: {
                    id?: string
                    name: string
                    description?: string | null
                    icon?: string | null
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string | null
                    icon?: string | null
                }
            }
            questions_bank: {
                Row: {
                    id: string
                    subject: string
                    question: string
                    category: string
                    state: string
                    alternative_1: string
                    alternative_2: string
                    alternative_3: string
                    alternative_4: string
                    correct_index: number
                    explanation: string | null
                }
                Insert: {
                    id?: string
                    subject: string
                    question: string
                    category: string
                    state: string
                    alternative_1: string
                    alternative_2: string
                    alternative_3: string
                    alternative_4: string
                    correct_index: number
                    explanation?: string | null
                }
                Update: {
                    id?: string
                    subject?: string
                    question?: string
                    category?: string
                    state?: string
                    alternative_1?: string
                    alternative_2?: string
                    alternative_3?: string
                    alternative_4?: string
                    correct_index?: number
                    explanation?: string | null
                }
            }
            simulados: {
                Row: {
                    id: string
                    created_at: string
                    user_id: string
                    category_name: string
                    status: string
                    score: number | null
                    total_questions: number
                    correct_answers: number | null
                    completed_at: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    user_id: string
                    category_name: string
                    status?: string
                    score?: number | null
                    total_questions: number
                    correct_answers?: number | null
                    completed_at?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    user_id?: string
                    category_name?: string
                    status?: string
                    score?: number | null
                    total_questions?: number
                    correct_answers?: number | null
                    completed_at?: string | null
                }
            }
            user_answers: {
                Row: {
                    id: string
                    created_at: string
                    simulado_id: string
                    question_id: string
                    user_answer: number
                    is_correct: boolean
                    time_spent: number | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    simulado_id: string
                    question_id: string
                    user_answer: number
                    is_correct: boolean
                    time_spent?: number | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    simulado_id?: string
                    question_id?: string
                    user_answer?: number
                    is_correct?: boolean
                    time_spent?: number | null
                }
            }
        }
    }
}
