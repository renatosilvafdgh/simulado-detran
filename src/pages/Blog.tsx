import { useState } from 'react';
import { Search, Tag, Clock, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/ui-custom/BlogCard';
import { artigosBlog } from '@/data/questoes';

export function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('TODAS');

  const categorias = ['TODAS', ...new Set(artigosBlog.map(a => a.categoria))];

  const artigosFiltrados = artigosBlog.filter(artigo => {
    const matchSearch = artigo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       artigo.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       artigo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategoria = categoriaSelecionada === 'TODAS' || artigo.categoria === categoriaSelecionada;
    return matchSearch && matchCategoria;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Blog do Simulado Brasil
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Dicas, guias e conteúdos exclusivos para ajudar você a passar na prova do Detran. 
            Aprenda sobre legislação, direção defensiva e muito mais.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categorias.map((cat) => (
                <Button
                  key={cat}
                  variant={categoriaSelecionada === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoriaSelecionada(cat)}
                  className={categoriaSelecionada === cat ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                >
                  {cat === 'TODAS' ? 'Todas' : cat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {!searchTerm && categoriaSelecionada === 'TODAS' && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-emerald-100 text-sm font-medium mb-2">
                    Artigo em Destaque
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {artigosBlog[0].titulo}
                  </h2>
                  <p className="text-emerald-100 text-sm mb-4 line-clamp-3">
                    {artigosBlog[0].resumo}
                  </p>
                  <div className="flex items-center gap-4 text-emerald-100 text-xs mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {artigosBlog[0].tempoLeitura} min de leitura
                    </span>
                    <span>{artigosBlog[0].categoria}</span>
                  </div>
                  <Button 
                    variant="secondary" 
                    className="w-fit bg-white text-emerald-600 hover:bg-emerald-50"
                  >
                    Ler Artigo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="hidden md:block">
                  <img 
                    src={artigosBlog[0].imagem} 
                    alt={artigosBlog[0].titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {artigosFiltrados.slice(searchTerm || categoriaSelecionada !== 'TODAS' ? 0 : 1).map((artigo) => (
            <BlogCard
              key={artigo.id}
              id={artigo.id}
              titulo={artigo.titulo}
              resumo={artigo.resumo}
              imagem={artigo.imagem}
              categoria={artigo.categoria}
              tempoLeitura={artigo.tempoLeitura}
              dataPublicacao={artigo.dataPublicacao}
            />
          ))}
        </div>

        {/* Empty State */}
        {artigosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Nenhum artigo encontrado
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Tente buscar com outros termos ou categorias.
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Tags Populares
          </h3>
          <div className="flex flex-wrap gap-2">
            {['legislação', 'direção defensiva', 'placas', 'multas', 'CNH', 'prova teórica', 'primeiros socorros', 'mecânica'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                <Tag className="h-3 w-3 inline mr-1" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
