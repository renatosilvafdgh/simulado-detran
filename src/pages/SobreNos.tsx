import { Heart, Target, Eye, Lightbulb, Shield, Rocket, Mail, CheckCircle } from 'lucide-react';

export function SobreNos() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-4">
                        <Heart className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Sobre Nós – Sou Habilitado
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        Bem-vindo à Sou Habilitado 🚗
                    </p>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mt-4">
                        Somos uma plataforma digital criada com o propósito de ajudar candidatos a se prepararem para a prova teórica de habilitação de forma prática, acessível e eficiente.
                    </p>
                </div>

                {/* Content Box */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12">

                    <div className="prose prose-slate dark:prose-invert max-w-none">

                        <p className="text-slate-600 dark:text-slate-300 mb-10 text-lg leading-relaxed">
                            Sabemos que conquistar a primeira habilitação é um passo importante. Por isso, desenvolvemos uma experiência de estudo simples, objetiva e focada no que <strong className="text-slate-800 dark:text-white">realmente importa</strong> para quem vai realizar o exame do DETRAN.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            {/* Missão */}
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                        <Target className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">Nossa Missão</h2>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 m-0">
                                    Tornar o estudo para a prova teórica mais acessível, organizado e eficiente, ajudando candidatos a se sentirem mais confiantes no dia do exame.
                                </p>
                            </div>

                            {/* Visão */}
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                                        <Eye className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">Nossa Visão</h2>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 m-0">
                                    Ser referência nacional em preparação online para provas teóricas de habilitação, oferecendo simulados atualizados, conteúdo claro e uma experiência intuitiva.
                                </p>
                            </div>
                        </div>

                        {/* O Que Fazemos */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                                    <Lightbulb className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">O Que Fazemos</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">A Sou Habilitado oferece:</p>
                            <ul className="grid sm:grid-cols-2 gap-3 list-none pl-0">
                                <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400"><CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" /> Simulados baseados nos principais temas exigidos</li>
                                <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400"><CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" /> Questões organizadas por categoria</li>
                                <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400"><CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" /> Interface simples e fácil de usar</li>
                                <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400"><CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" /> Acompanhamento de desempenho</li>
                                <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400"><CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" /> Conteúdo educativo complementar</li>
                            </ul>
                            <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">
                                Nosso objetivo é que você pratique quantas vezes quiser e identifique seus pontos de melhoria antes da prova oficial.
                            </p>
                        </div>

                        {/* Independência & Segurança */}
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <span className="text-2xl">⚖</span> Independência e Transparência
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                                    A Sou Habilitado é uma plataforma privada e independente. Não possuímos vínculo institucional com o DETRAN ou qualquer órgão público.
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Nosso conteúdo é elaborado com base na legislação vigente, incluindo o Código de Trânsito Brasileiro, e em diretrizes públicas relacionadas à formação de condutores.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-purple-500" />
                                    Segurança e Privacidade
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Valorizamos a segurança e a privacidade dos nossos usuários. Tratamos dados pessoais com responsabilidade e em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD).
                                </p>
                            </div>
                        </div>

                        {/* Nosso Compromisso */}
                        <div className="mb-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-rose-100 dark:bg-rose-900/40 p-2 rounded-lg text-rose-600 dark:text-rose-400">
                                    <Rocket className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">Nosso Compromisso com Você</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-4">Queremos que você:</p>
                            <ul className="list-disc pl-5 space-y-1 mb-4 text-slate-600 dark:text-slate-400 font-medium">
                                <li>Estude com confiança;</li>
                                <li>Pratique de forma estratégica;</li>
                                <li>Se sinta preparado no dia da prova;</li>
                                <li>Conquiste sua habilitação com mais segurança.</li>
                            </ul>
                            <p className="text-slate-800 dark:text-slate-300 font-semibold italic text-lg text-center mt-6">
                                "Acreditamos que uma boa preparação reduz a ansiedade e aumenta as chances de sucesso."
                            </p>
                        </div>

                    </div>

                    {/* Footer Contact */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 bg-indigo-50/50 dark:bg-indigo-900/10 -mx-8 sm:-mx-12 -mb-8 sm:-mb-12 p-8 sm:p-12 rounded-b-3xl">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Fale Conosco</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-1">Tem dúvidas, sugestões ou precisa de ajuda?</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Estamos aqui para ajudar você a dar o próximo passo rumo à sua habilitação.</p>
                            </div>
                            <a
                                href="mailto:contato@souhabilitado.com"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors shadow-sm whitespace-nowrap"
                            >
                                <Mail className="h-5 w-5" />
                                contato@souhabilitado.com
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
