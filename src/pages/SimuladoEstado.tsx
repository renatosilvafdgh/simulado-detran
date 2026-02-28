import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    BookOpen,
    Zap,
    Clock,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';
import { getQuestionsByCategory, createSimulado } from '@/services/simulado.service';
import { getEstadoBySigla } from '@/data/estados';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { FaqRJ } from '@/components/simulado/FaqRJ';

interface SimuladoOption {
    tipo: 'RAPIDO' | 'COMPLETO';
    nome: string;
    descricao: string;
    questoes: number;
    tempo: string;
    icon: React.ElementType;
}

export function SimuladoEstado() {
    const { slug } = useParams<{ slug: string }>();
    const sigla = slug?.startsWith('simulado-detran-')
        ? slug.replace('simulado-detran-', '')
        : undefined;
    const navigate = useNavigate();
    const estado = getEstadoBySigla(sigla);

    const { user, loading: authLoading } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [generatingSimulado, setGeneratingSimulado] = useState<'RAPIDO' | 'COMPLETO' | null>(null);

    useEffect(() => {
        if (!estado && slug) {
            navigate('/simulado-detran', { replace: true });
        }
    }, [estado, slug, navigate]);

    const opcoesSimulado: SimuladoOption[] = [
        {
            tipo: 'RAPIDO',
            nome: 'Simulado Rápido',
            descricao: '10 questões para uma prática rápida',
            questoes: 10,
            tempo: '15 min',
            icon: Zap
        },
        {
            tipo: 'COMPLETO',
            nome: 'Simulado Completo',
            descricao: '20 questões para treino completo',
            questoes: 20,
            tempo: '30 min',
            icon: BookOpen
        }
    ];

    const iniciarSimulado = async (tipo: 'RAPIDO' | 'COMPLETO', quantidade: number) => {
        setGeneratingSimulado(tipo);

        try {
            const res = await getQuestionsByCategory(
                "Geral",
                quantidade,
                sigla
            );

            const questions = res.data;
            const questionsError = res.error;

            if (questionsError || !questions || questions.length === 0) {
                alert('Não há questões disponíveis para este estado no momento.');
                setGeneratingSimulado(null);
                return;
            }

            const { data: simulado, error: simuladoError } = await createSimulado(
                (user?.id || null) as string | null,
                "Geral",
                questions.length
            );

            if (simuladoError || !simulado) {
                console.error('Erro ao criar simulado:', simuladoError);
                alert(`Erro ao criar simulado. Tente novamente mais tarde.`);
                setGeneratingSimulado(null);
                return;
            }

            navigate(`/simulado-detran/executar/${simulado.id}`);
        } catch (err) {
            console.error('Erro ao iniciar simulado:', err);
            alert('Erro ao iniciar simulado. Verifique sua conexão.');
        } finally {
            setGeneratingSimulado(null);
        }
    };

    if (authLoading || !estado) {
        return (
            <LayoutWrapper title="Carregando...">
                <div className="min-h-screen pt-32 lg:pt-36 pb-16 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                </div>
            </LayoutWrapper>
        );
    }

    const pageTitle = `SIMULADO DETRAN ${estado.nome.toUpperCase()} | Simulado Brasil`;
    const pageDescription = `Faça o simulado oficial do Detran ${estado.nome}. Questões atualizadas para a prova teórica de habilitação no estado de ${estado.nome}.`;

    const baseUrl = 'https://souhabilitado.com';
    const currentPath = `/simulado-detran-${sigla?.toLowerCase()}`;
    const url = `${baseUrl}${currentPath}`;

    const schemas = [
        {
            "@type": "Organization",
            "@id": `${baseUrl}/#organization`,
            "name": "Simulado Brasil",
            "url": baseUrl,
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/logo.png`,
                "width": "600",
                "height": "160"
            }
        },
        {
            "@type": "WebPage",
            "@id": `${url}/#webpage`,
            "url": url,
            "name": pageTitle,
            "description": pageDescription,
            "isPartOf": { "@id": `${baseUrl}/#organization` },
            "breadcrumb": { "@id": `${url}/#breadcrumb` },
            "inLanguage": "pt-BR",
            "areaServed": {
                "@type": "State",
                "name": estado.nome,
                "alternateName": estado.sigla
            }
        },
        {
            "@type": "BreadcrumbList",
            "@id": `${url}/#breadcrumb`,
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Início",
                    "item": baseUrl
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Simulado",
                    "item": `${baseUrl}/simulado-detran`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": `Simulado Detran ${estado.nome}`,
                    "item": url
                }
            ]
        }
    ];

    if (sigla?.toUpperCase() === 'RJ') {
        schemas.push({
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "O que é o simulado do Detran RJ primeira habilitação?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "O simulado do Detran RJ primeira habilitação é um teste online baseado no formato oficial da prova teórica aplicada no Rio de Janeiro. Ele inclui questões sobre legislação de trânsito, placas, direção defensiva, primeiros socorros, meio ambiente e mecânica básica, ajudando o candidato a se preparar para a prova oficial."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Onde fazer simulado Detran RJ grátis?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Você pode fazer simulado Detran RJ grátis no site Sou Habilitado. O simulado online segue o padrão oficial da prova teórica do Detran RJ, possui correção automática e pode ser realizado quantas vezes o candidato desejar."
                    }
                },
                {
                    "@type": "Question",
                    "name": "O simulado Detran RJ 2026 está atualizado?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sim, o simulado Detran RJ 2026 está atualizado conforme as regras atuais da legislação de trânsito e o formato mais recente da prova teórica do Detran RJ, garantindo que o candidato estude com base no padrão vigente."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Como funciona o simulado online Detran RJ?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "O simulado online Detran RJ funciona como a prova oficial: possui 30 questões de múltipla escolha, tempo cronometrado e correção imediata. Ele ajuda o candidato a treinar para a prova teórica do Detran RJ e aumentar as chances de aprovação."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Como é a prova teórica do Detran RJ?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A prova teórica do Detran RJ contém 30 questões objetivas sobre legislação de trânsito, sinalização, direção defensiva, primeiros socorros, meio ambiente e mecânica básica. Para ser aprovado, o candidato precisa acertar no mínimo 21 questões."
                    }
                },
                {
                    "@type": "Question",
                    "name": "O Detran RJ simulado prova é parecido com a prova oficial?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "O Detran RJ simulado prova segue o mesmo padrão de formato e nível de dificuldade da prova oficial. Embora as perguntas não sejam idênticas, o estilo das questões é semelhante ao aplicado no exame teórico do Detran RJ."
                    }
                },
                {
                    "@type": "Question",
                    "name": "O exame psicotécnico Detran RJ reprova muita gente?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "O exame psicotécnico Detran RJ avalia atenção, raciocínio lógico, coordenação motora e equilíbrio emocional. Ele não exige estudo teórico, mas requer concentração e tranquilidade no dia da avaliação."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Preciso fazer prova na renovação CNH RJ?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Na renovação CNH RJ normalmente não é necessário refazer a prova teórica, salvo em situações específicas determinadas pelo Detran. Caso seja exigida prova, realizar um simulado Detran RJ pode ajudar na revisão do conteúdo."
                    }
                }
            ]
        } as any);
    }

    const fullSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": schemas
    });

    return (
        <LayoutWrapper title={pageTitle} description={pageDescription} schema={fullSchema}>
            <div className="min-h-screen pt-24 pb-16 relative overflow-hidden bg-white dark:bg-[#0B1120]">
                <div className="absolute inset-0 pointer-events-none -z-10">
                    <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] rounded-full bg-emerald-400/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen transition-all duration-1000"></div>
                    <div className="absolute bottom-[20%] right-[10%] w-[25rem] h-[25rem] rounded-full bg-teal-400/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen transition-all duration-1000"></div>
                </div>

                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4 uppercase">
                            SIMULADO DETRAN {estado.nome}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Prepare-se para a prova teórica do Detran {estado.sigla} com questões atualizadas e simulados cronometrados.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {opcoesSimulado.map((opcao) => {
                                const Icon = opcao.icon;

                                return (
                                    <div
                                        key={opcao.tipo}
                                        className="relative group bg-gradient-to-br from-white/90 to-emerald-50/50 dark:from-slate-800/90 dark:to-emerald-900/10 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgb(20,184,166,0.15)] border border-emerald-100/80 hover:border-emerald-400/50 dark:border-emerald-800/30 dark:hover:border-emerald-500/40 p-6 sm:py-7 sm:px-8 hover:-translate-y-1.5 transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
                                    >
                                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-emerald-400/20 to-transparent"></div>
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-500">
                                            <Icon className="h-8 w-8 text-white" />
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-2">
                                            {opcao.nome}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mb-5 px-2">
                                            {opcao.descricao}
                                        </p>

                                        <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm text-slate-700 dark:text-slate-300 mb-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 py-2.5 px-4 sm:px-6 rounded-xl w-full">
                                            <span className="flex items-center gap-2 font-medium">
                                                <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                                {opcao.questoes} questões
                                            </span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                            <span className="flex items-center gap-2 font-semibold">
                                                <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                                {opcao.tempo}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => iniciarSimulado(opcao.tipo, opcao.questoes)}
                                            disabled={generatingSimulado !== null}
                                            className="btn-3d disabled:opacity-50 disabled:cursor-not-allowed group/btn focus:outline-none"
                                        >
                                            <span className="btn-3d-top">
                                                {generatingSimulado === opcao.tipo ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                        Gerando...
                                                    </>
                                                ) : (
                                                    <>
                                                        Iniciar Agora
                                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                                                    </>
                                                )}
                                            </span>
                                            <span className="btn-3d-bottom"></span>
                                            <span className="btn-3d-base"></span>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {sigla?.toUpperCase() === 'RJ' && <FaqRJ />}

                {showAuthModal && (
                    <AuthModal
                        isOpen={showAuthModal}
                        onClose={() => setShowAuthModal(false)}
                        defaultView="login"
                    />
                )}
            </div>
        </LayoutWrapper>
    );
}
