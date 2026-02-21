import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  BookOpen,
  Target,
  Zap,
  Shield,
  Smartphone,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/ui-custom/CategoryCard';
import { FeatureCard } from '@/components/ui-custom/FeatureCard';
import { TestimonialCard } from '@/components/ui-custom/TestimonialCard';
import { categoriasInfo } from '@/data/questoes';

export function Home() {
  const categorias = [
    { key: 'A', ...categoriasInfo.A, gradient: 'from-orange-500 to-red-500' },
    { key: 'B', ...categoriasInfo.B, gradient: 'from-blue-500 to-cyan-500' },
    { key: 'C', ...categoriasInfo.C, gradient: 'from-green-500 to-emerald-500' },
    { key: 'D', ...categoriasInfo.D, gradient: 'from-purple-500 to-violet-500' },
    { key: 'E', ...categoriasInfo.E, gradient: 'from-pink-500 to-rose-500' },
  ];

  const estados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Questões Atualizadas',
      description: 'Banco de questões sempre atualizado conforme as últimas mudanças no Código de Trânsito Brasileiro.'
    },
    {
      icon: Target,
      title: 'Simulados Realistas',
      description: 'Provas simuladas no mesmo formato e dificuldade da prova oficial do Detran.'
    },
    {
      icon: Zap,
      title: 'Feedback Instantâneo',
      description: 'Receba explicações detalhadas imediatamente após responder cada questão.'
    },
    {
      icon: Shield,
      title: 'Gratuito e Ilimitado',
      description: 'Acesse todos os simulados gratuitamente, sem limites e sem cadastro obrigatório.'
    },
    {
      icon: Smartphone,
      title: 'Acesse de Qualquer Lugar',
      description: 'Plataforma 100% responsiva. Estude no celular, tablet ou computador.'
    },
    {
      icon: Star,
      title: 'Aprovação Garantida',
      description: 'Mais de 50.000 alunos já passaram na prova com a ajuda do Simulado Brasil.'
    }
  ];

  const testimonials = [
    {
      name: 'Mariana Silva',
      role: 'Aprovada na categoria B',
      content: 'Fiz os simulados por uma semana antes da prova e passei na primeira tentativa! As questões são muito parecidas com as do Detran.',
      rating: 5,
      avatar: 'MS'
    },
    {
      name: 'Carlos Eduardo',
      role: 'Aprovado na categoria A',
      content: 'Excelente plataforma! O modo escuro é perfeito para estudar à noite e as estatísticas me ajudaram a identificar meus pontos fracos.',
      rating: 5,
      avatar: 'CE'
    },
    {
      name: 'Fernanda Lima',
      role: 'Aprovada na categoria B',
      content: 'Já tinha reprovado uma vez antes de conhecer o Simulado Brasil. Depois de praticar aqui, passei com 92% de aproveitamento!',
      rating: 5,
      avatar: 'FL'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/5 to-transparent dark:from-emerald-500/10" />

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />

        <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
              <Star className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                Mais de 50.000 alunos aprovados
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Passe na prova do{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Detran
              </span>{' '}
              na primeira tentativa
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Simulados gratuitos e ilimitados para prova teórica de habilitação.
              Questões atualizadas, feedback instantâneo e estatísticas de desempenho.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/simulado">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-6 text-lg shadow-xl shadow-emerald-500/25"
                >
                  Começar Simulado Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/blog">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Ver Dicas de Estudo
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span>Sem cadastro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span>Questões atualizadas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* States Section */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Selecione seu Estado
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Clique na bandeira do seu estado para começar
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {estados.map((estado) => (
              <Link
                key={estado.sigla}
                to={`/simulado?estado=${estado.sigla}`}
                className="group flex flex-col bg-gradient-to-b from-[#fecb00] to-[#e6b800] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-amber-300/50 hover:border-amber-400 hover:-translate-y-1 overflow-hidden"
              >
                <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100 relative border-b border-amber-300/30">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 pointer-events-none" />
                  <img
                    src={`/flags/${estado.sigla.toLowerCase()}.png`}
                    alt={`Bandeira do ${estado.nome}`}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback visual se a bandeira não existir
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x300/fecb00/000000?text=${estado.sigla}`;
                    }}
                  />
                </div>
                <div className="p-4 text-center flex-grow flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-amber-900/60 uppercase tracking-widest mb-1">
                    Simulado Detran
                  </p>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    {estado.nome}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Escolha sua categoria
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Simulados específicos para cada categoria de habilitação.
              Pratique com questões adequadas ao seu tipo de veículo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {categorias.map((cat) => (
              <CategoryCard
                key={cat.key}
                categoria={cat.key as 'A' | 'B' | 'C' | 'D' | 'E'}
                nome={cat.nome}
                descricao={cat.descricao}
                questoes={cat.questoes}
                tempo={cat.tempo}
                aprovacao={cat.aprovacao}
                gradient={cat.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Por que escolher o Simulado Brasil?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Desenvolvido por especialistas em educação para trânsito,
              nossa plataforma oferece tudo que você precisa para passar na prova.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              O que nossos alunos dizem
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Junte-se a milhares de alunos que já passaram na prova do Detran
              com a ajuda do Simulado Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 lg:p-16 text-center overflow-hidden max-w-4xl mx-auto">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full" />
            </div>

            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Pronto para passar na prova?
              </h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                Comece agora mesmo seu simulado gratuito. Não precisa cadastrar,
                é só escolher a categoria e começar a estudar!
              </p>
              <Link to="/simulado">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-6 text-lg font-semibold shadow-xl"
                >
                  Iniciar Simulado Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
