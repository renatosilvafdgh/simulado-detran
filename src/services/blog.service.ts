import { supabase } from '@/lib/supabase';

// Use 'posts' table as the source of truth

export interface BlogPost {
    id: string;
    created_at: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    image_url: string | null;
    category: string;
    tags: string[];
    published: boolean;
    published_at: string | null;
    views: number;
    author_id: string;
}

/**
 * Maps raw database post to BlogPost interface
 */
function mapBlogPost(post: any): BlogPost {
    return {
        id: post.id,
        created_at: post.created_at,
        title: post.title,
        slug: post.slug,
        content: post.content || '',
        excerpt: post.meta_description || post.excerpt || '',
        image_url: post.og_image || post.image_url || null,
        category: post.category || 'Notícias',
        tags: post.hashtags ? post.hashtags.split(',').map((t: string) => t.trim()) : (post.tags || []),
        published: true,
        published_at: post.published_at || post.created_at,
        views: post.views || 0,
        author_id: post.author || post.author_id || 'system'
    };
}

/**
 * Get all published blog posts
 */
export async function getBlogPosts(limit?: number): Promise<{ data: BlogPost[] | null; error: any }> {
    try {
        let query = supabase
            .from('posts')
            .select('*')
            .order('published_at', { ascending: false });

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching blog posts:', error);
            return { data: null, error };
        }

        const mappedData = (data || []).map(mapBlogPost);
        return { data: mappedData, error: null };
    } catch (err: any) {
        console.error('Unexpected error in getBlogPosts:', err);
        return { data: null, error: err };
    }
}

/**
 * Get blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<{ data: BlogPost | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .maybeSingle();

        if (error) {
            console.error('Error fetching blog post by slug:', error);
            return { data: null, error };
        }

        if (!data) return { data: null, error: null };

        return { data: mapBlogPost(data), error: null };
    } catch (err: any) {
        console.error('Unexpected error in getBlogPostBySlug:', err);
        return { data: null, error: err };
    }
}

/**
 * Get blog post by ID
 */
export async function getBlogPostById(id: string): Promise<{ data: BlogPost | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .maybeSingle();

        if (error) {
            console.error('Error fetching blog post by ID:', error);
            return { data: null, error };
        }

        if (!data) return { data: null, error: null };

        return { data: mapBlogPost(data), error: null };
    } catch (err: any) {
        console.error('Unexpected error in getBlogPostById:', err);
        return { data: null, error: err };
    }
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(query: string): Promise<{ data: BlogPost[] | null; error: any }> {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .or(`title.ilike.%${query}%,content.ilike.%${query}%,meta_description.ilike.%${query}%`)
            .order('published_at', { ascending: false });

        if (error) {
            console.error('Error searching blog posts:', error);
            return { data: null, error };
        }

        const mappedData = (data || []).map(mapBlogPost);
        return { data: mappedData, error: null };
    } catch (err: any) {
        console.error('Unexpected error in searchBlogPosts:', err);
        return { data: null, error: err };
    }
}

// Keeping legacy functions for compatibility if needed, but updating to use 'posts'
export async function getBlogPostsByCategory(category: string) {
    const { data, error } = await getBlogPosts();
    if (error) return { data: null, error };
    const filtered = (data || []).filter(p => p.category === category);
    return { data: filtered, error: null };
}

export async function getBlogPostsByTag(tag: string) {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .ilike('hashtags', `%${tag}%`)
            .order('published_at', { ascending: false });

        if (error) return { data: null, error };
        return { data: (data || []).map(mapBlogPost), error: null };
    } catch (err) {
        return { data: null, error: err };
    }
}
