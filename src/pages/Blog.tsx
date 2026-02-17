import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '@/services/blog.service';
import { formatDate } from '@/lib/utils';
import { Calendar, User, ArrowRight } from 'lucide-react';
import type { Database } from '@/types/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data, error: fetchError } = await getBlogPosts();
        if (fetchError) throw fetchError;
        if (data) {
          setPosts(data);
        }
      } catch (err: any) {
        console.error('Error loading blog posts:', err);
        setError(err.message || 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-emerald-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Blog do Simulado Brasil
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Dicas, novidades e conteúdos exclusivos para te ajudar a conquistar sua habilitação.
          </p>
          {/* Debug Info */}
          <div className="mt-4 p-2 bg-slate-100 dark:bg-slate-800 rounded text-xs text-left">
            <p>Debug Status:</p>
            <p>Posts encontrados: {posts.length}</p>
            {error && <p className="text-red-500">Erro: {error}</p>}
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Nenhum post encontrado no momento. Volte em breve!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-700 flex flex-col"
              >
                {post.image_url && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium">
                      {post.category || 'Geral'}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.published_at ? formatDate(post.published_at) : 'Data indisp.'}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
                    <Link to={`/post/${post.slug}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 text-sm flex-1">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <User className="h-4 w-4" />
                      <span>Simulado Brasil</span>
                    </div>

                    <Link
                      to={`/post/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:gap-2 transition-all"
                    >
                      Ler mais <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
