import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type Category = Database['public']['Tables']['categories']['Row'];

/**
 * Get all categories
 */
export async function getCategories(): Promise<{ data: Category[] | null; error: any }> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

    return { data, error };
}

/**
 * Get category by ID
 */
export async function getCategoryById(id: string): Promise<{ data: Category | null; error: any }> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

    return { data, error };
}
