import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogPostBySlug, type BlogPost } from '@/services/blog.service';
import { formatDate } from '@/lib/utils';
import { Calendar, User, ArrowLeft, Loader2, Clock, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import '@/styles/markdown.css';

export function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPost() {
            if (!slug) return;

            try {
                const { data } = await getBlogPostBySlug(slug);
                setPost(data);
            } catch (error) {
                console.error('Error loading blog post:', error);
            } finally {
                setLoading(false);
            }
        }

        loadPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Post não encontrado</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">O artigo que você procura não existe ou foi removido.</p>
                <Link to="/blog">
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Voltar para o Blog
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{post.title} - Blog Simulado Brasil</title>
                <meta
                    name="description"
                    content={post.excerpt || post.content.substring(0, 160).replace(/[#*`]/g, '')}
                />
                {post.image_url && <meta property="og:image" content={post.image_url} />}
                <meta property="og:title" content={`${post.title} - Simulado Brasil`} />
                <meta property="og:type" content="article" />
            </Helmet>
            <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1120] relative">
                <article className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                    {post.image_url && (
                        <div className="w-full h-64 md:h-96 overflow-hidden relative">
                            <img
                                src={post.image_url}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                                <div className="p-8 w-full">
                                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                                        {post.category || 'Geral'}
                                    </span>
                                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                                        {post.title}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )}

                    {!post.image_url && (
                        <div className="p-8 pb-0">
                            <div className="mb-4">
                                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                                    {post.category || 'Geral'}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                {post.title}
                            </h1>
                        </div>
                    )}

                    <div className="px-8 py-6 flex flex-wrap items-center gap-6 border-b border-slate-100 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Por Simulado Brasil</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{post.published_at ? formatDate(post.published_at) : 'Data indisp.'}</span>
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <Clock className="h-4 w-4" />
                            <span>{Math.ceil(post.content.split(' ').length / 200)} min de leitura</span>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <div className="p-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
                        <Link to="/blog">
                            <Button variant="ghost" className="gap-2">
                                <ArrowLeft className="h-4 w-4" /> Voltar para lista
                            </Button>
                        </Link>

                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Share className="h-4 w-4" /> Compartilhar
                            </Button>
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
}
