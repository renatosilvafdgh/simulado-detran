import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { artigosBlog } from '@/data/questoes';

export function Artigo() {
  const { id } = useParams<{ id: string }>();
  const artigo = artigosBlog.find(a => a.id === parseInt(id || '0'));

  if (!artigo) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Artigo não encontrado
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            O artigo que você procura não existe ou foi removido.
          </p>
          <Link to="/blog">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para o Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to="/blog">
            <Button variant="ghost" className="mb-6 text-slate-600 dark:text-slate-400">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para o Blog
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium rounded-full mb-4">
              {artigo.categoria}
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {artigo.titulo}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {artigo.resumo}
            </p>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="h-4 w-4" />
              {new Date(artigo.dataPublicacao).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="h-4 w-4" />
              {artigo.tempoLeitura} min de leitura
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="mb-8">
            <img
              src={artigo.imagem}
              alt={artigo.titulo}
              className="w-full h-64 lg:h-96 object-cover rounded-2xl"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: artigo.conteudo }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {artigo.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-sm"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Quer testar seus conhecimentos?
            </h3>
            <p className="text-emerald-100 mb-6">
              Faça um simulado gratuito e veja se está pronto para a prova do Detran.
            </p>
            <Link to="/categorias">
              <Button variant="secondary" className="bg-white text-emerald-600 hover:bg-emerald-50">
                Fazer Simulado Agora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
