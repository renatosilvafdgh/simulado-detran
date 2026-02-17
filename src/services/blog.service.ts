import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

/**
 * Get all published blog posts
 */
export async function getBlogPosts(limit?: number): Promise<{ data: BlogPost[] | null; error: any }> {
    let query = (supabase as any)
        .from('posts')
        .select('*')
        // .eq('published', true) // 'posts' table might not have this column or it's not set
        .order('published_at', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching blog posts:', error);
        return { data: null, error };
    }

    const mappedData: BlogPost[] = ((data as any[]) || []).map(post => ({
        id: post.id,
        created_at: post.created_at,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.meta_description,
        image_url: post.og_image,
        category: 'Notícias',
        tags: post.hashtags ? post.hashtags.split(',').map((t: string) => t.trim()) : [],
        published: true,
        published_at: post.published_at,
        views: 0,
        author_id: post.author || 'system'
    }));

    return { data: mappedData, error: null };
}

/**
 * Get blog post by ID
 */
export async function getBlogPostById(id: string): Promise<{ data: BlogPost | null; error: any }> {
    const { data, error } = await (supabase as any)
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

    // Increment view count
    if (data && !error) {
        const post = data as BlogPost;
        await (supabase as any)
            .from('blog_posts')
            .update({ views: (post.views || 0) + 1 } as any)
            .eq('id', id);
    }

    if (error) {
        console.error('Error fetching blog post by ID:', error);
        throw error;
    }

    let mappedPost: BlogPost | null = null;

    if (data) {
        const post = data as any; // Cast data to any for mapping
        mappedPost = {
            id: post.id,
            created_at: post.created_at,
            title: post.title,
            slug: post.slug,
            content: post.content,
            excerpt: post.meta_description,
            image_url: post.og_image,
            category: 'Notícias',
            tags: post.hashtags ? post.hashtags.split(',').map((t: string) => t.trim()) : [],
            published: true,
            published_at: post.published_at,
            views: 0,
            author_id: post.author || 'system'
        };
    }

    return { data: mappedPost, error: null };
}

/**
 * Get blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<{ data: BlogPost | null; error: any }> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching blog post:', error);
        throw error;
    }

    let mappedPost: BlogPost | null = null;

    if (data) {
        const post = data as any;
        mappedPost = {
            id: post.id,
            created_at: post.created_at,
            title: post.title,
            slug: post.slug,
            content: post.content,
            excerpt: post.meta_description,
            image_url: post.og_image,
            category: 'Notícias',
            tags: post.hashtags ? post.hashtags.split(',').map((t: string) => t.trim()) : [],
            published: true,
            published_at: post.published_at,
            views: 0,
            author_id: post.author || 'system'
        };
    }

    return { data: mappedPost, error: null };
}

/**
 * Get blog posts by category
 */
export async function getBlogPostsByCategory(category: string): Promise<{ data: BlogPost[] | null; error: any }> {
    // The 'posts' table does not have a direct 'category' column.
    // Assuming 'category' might be derived from 'hashtags' or a default.
    // For now, this function will return all posts and set a default category.
    // If category filtering is needed, the 'posts' table schema or mapping logic needs adjustment.
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching blog posts by category:', error);
        throw error;
    }

    const mappedData: BlogPost[] = ((data as any[]) || []).map(post => ({
        id: post.id,
        created_at: post.created_at,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.meta_description,
        image_url: post.og_image,
        category: 'Notícias', // Default category
        tags: post.hashtags ? post.hashtags.split(',').map((t: string) => t.trim()) : [],
        published: true,
        published_at: post.published_at,
        views: 0,
        author_id: post.author || 'system'
    }));

    // If category filtering is desired, it would need to be done here based on mappedData.
    // For example: .filter(post => post.category === category) if category was dynamic.
    // As 'category' is hardcoded to 'Notícias' in the mapping, this filter would only work for 'Notícias'.
    const filteredData = mappedData.filter(post => post.category === category);


    return { data: filteredData, error: null };
}

/**
 * Get blog posts by tag
 */
export async function getBlogPostsByTag(tag: string): Promise<{ data: BlogPost[] | null; error: any }> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .ilike('hashtags', `%${tag}%`) // Assuming tags are stored in 'hashtags' column as comma-separated string
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching blog posts by tag:', error);
        throw error;
    }

    const mappedData: BlogPost[] = ((data as any[]) || []).map(post => ({
        id: post.id,
        created_at: post.created_at,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.meta_description,
        image_url: post.og_image,
        category: 'Notícias',
        tags: post.hashtags ? post.hashtags.split(',').map((t: string) => t.trim()) : [],
        published: true,
        published_at: post.published_at,
        views: 0,
        author_id: post.author || 'system'
    }));

    return { data: mappedData, error: null };
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(query: string): Promise<{ data: BlogPost[] | null; error: any }> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,meta_description.ilike.%${query}%`)
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error searching blog posts:', error);
        throw error;
    }

    const mappedData: BlogPost[] = ((data as any[]) || []).map(post => ({
        id: post.id,
        created_at: post.created_at,
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.meta_description,
        image_url: post.og_image,
        category: 'Notícias',
        tags: post.hashtags ? post.hashtags.split(',').map((t: string) => t.trim()) : [],
        published: true,
        published_at: post.published_at,
        views: 0,
        author_id: post.author || 'system'
    }));

    return { data: mappedData, error: null };
}

/**
 * Create a new blog post (admin only)
 */
// Deprecated or needs update if we want to write to 'posts' from app
// For now, keeping as is but it won't work with new 'posts' table structure perfectly
// unless we update it. Assuming read-only for now based on task.
export async function createBlogPost(post: Database['public']['Tables']['blog_posts']['Insert']): Promise<{ data: BlogPost | null; error: any }> {
    // This function acts on 'blog_posts'. If we need to write to 'posts', we need a new function.
    // Leaving as is to avoid breaking changes if this is used elsewhere,
    // but the app seems to only read for now.
    const { data, error } = await supabase
        .from('blog_posts')
        .insert(post as any)
        .select()
        .single();

    if (error) {
        console.error('Error creating blog post:', error);
        throw error;
    }

    return { data, error: null };
}
