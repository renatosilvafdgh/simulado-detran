import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];

/**
 * Get all published blog posts
 */
export async function getBlogPosts(limit?: number): Promise<{ data: BlogPost[] | null; error: any }> {
    let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;
    return { data, error };
}

/**
 * Get blog post by ID
 */
export async function getBlogPostById(id: string): Promise<{ data: BlogPost | null; error: any }> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

    // Increment view count
    if (data && !error) {
        await supabase
            .from('blog_posts')
            .update({ views: (data.views || 0) + 1 })
            .eq('id', id);
    }

    return { data, error };
}

/**
 * Get blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<{ data: BlogPost | null; error: any }> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

    // Increment view count
    if (data && !error) {
        await supabase
            .from('blog_posts')
            .update({ views: (data.views || 0) + 1 })
            .eq('id', data.id);
    }

    return { data, error };
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(category: string): Promise<{ data: BlogPost[] | null; error: any }> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .eq('published', true)
        .order('published_at', { ascending: false });

    return { data, error };
}

/**
 * Get blog posts by tag
 */
export async function getBlogPostsByTag(tag: string): Promise<{ data: BlogPost[] | null; error: any }> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .contains('tags', [tag])
        .eq('published', true)
        .order('published_at', { ascending: false });

    return { data, error };
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(query: string): Promise<{ data: BlogPost[] | null; error: any }> {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
        .eq('published', true)
        .order('published_at', { ascending: false });

    return { data, error };
}

/**
 * Create a new blog post (admin only)
 */
export async function createBlogPost(post: BlogPostInsert): Promise<{ data: BlogPost | null; error: any }> {
    const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single();

    return { data, error };
}
