export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
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
                    user_id: string | null
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
                    user_id?: string | null
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
                    user_id?: string | null
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
            blog_posts: {
                Row: {
                    id: string
                    created_at: string
                    title: string
                    slug: string
                    content: string
                    excerpt: string | null
                    image_url: string | null
                    category: string | null
                    tags: string[] | null
                    published: boolean
                    published_at: string | null
                    views: number
                    author_id: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    title: string
                    slug: string
                    content: string
                    excerpt?: string | null
                    image_url?: string | null
                    category?: string | null
                    tags?: string[] | null
                    published?: boolean
                    published_at?: string | null
                    views?: number
                    author_id: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    title?: string
                    slug?: string
                    content?: string
                    excerpt?: string | null
                    image_url?: string | null
                    category?: string | null
                    tags?: string[] | null
                    published?: boolean
                    published_at?: string | null
                    views?: number
                    author_id?: string
                }
            }
            posts: {
                Row: {
                    id: string
                    created_at: string
                    title: string
                    slug: string
                    content: string
                    meta_title: string | null
                    meta_description: string | null
                    hashtags: string | null
                    og_image: string | null
                    published_at: string | null
                    author: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    title: string
                    slug: string
                    content: string
                    meta_title?: string | null
                    meta_description?: string | null
                    hashtags?: string | null
                    og_image?: string | null
                    published_at?: string | null
                    author?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    title?: string
                    slug?: string
                    content?: string
                    meta_title?: string | null
                    meta_description?: string | null
                    hashtags?: string | null
                    og_image?: string | null
                    published_at?: string | null
                    author?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
