import { AlertTriangle, BookOpen, UserCheck, RefreshCw, AlertCircle, ExternalLink, Activity, Mail } from 'lucide-react';

export function AvisoLegal() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl mb-4">
                        <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                        Aviso Legal (Disclaimer)
                    </h1>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
                        Última atualização: 21 de fevereiro de 2026
                    </p>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        A <span className="text-amber-600 dark:text-amber-400 font-bold">Sou Habilitado</span> é uma plataforma privada e independente de ensino, criada com o objetivo de auxiliar candidatos na preparação para a prova teórica de habilitação.
                    </p>
                </div>

                {/* Content Box */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 md:p-12">

                    <div className="prose prose-slate dark:prose-invert max-w-none">

                        {/* Section 1 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-rose-100 dark:bg-rose-900/40 p-2 rounded-lg text-rose-600 dark:text-rose-400">
                                    <AlertCircle className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">1. Ausência de Vínculo com Órgãos Públicos</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 font-medium">
                                A Sou Habilitado não possui qualquer vínculo, parceria, autorização ou relação institucional com o DETRAN (Departamento Estadual de Trânsito), com o Denatran (atual SENATRAN) ou com qualquer outro órgão público federal, estadual ou municipal.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Todo o conteúdo disponibilizado é produzido de forma independente, com base em materiais públicos e legislação de trânsito vigente.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">2. Finalidade Educacional</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                Os simulados, questões, materiais e conteúdos disponibilizados na plataforma possuem finalidade <strong className="text-slate-700 dark:text-slate-300">exclusivamente educacional e preparatória</strong>.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">Não garantimos:</p>
                            <ul className="list-disc pl-5 space-y-2 mb-4 text-slate-600 dark:text-slate-400">
                                <li>Aprovação em exames oficiais;</li>
                                <li>Repetição exata das questões aplicadas pelo DETRAN;</li>
                                <li>Resultado específico em provas teóricas ou práticas.</li>
                            </ul>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                O desempenho do usuário dependerá exclusivamente de seu estudo, dedicação e preparação.
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                                    <UserCheck className="h-5 w-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white m-0">3. Uso de Marcas e Referências</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                Quaisquer menções a “DETRAN”, legislação de trânsito ou exames oficiais são realizadas apenas para fins informativos e descritivos, com o objetivo de indicar a finalidade educacional do serviço prestado.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-semibold italic">
                                A Sou Habilitado não representa oficialmente nenhum órgão público.
                            </p>
                        </div>

                        {/* Sections 4 & 5 */}
                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <RefreshCw className="h-5 w-5 text-purple-500" />
                                    4. Atualização de Conteúdo
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm leading-relaxed">
                                    Embora nos esforcemos para manter as informações atualizadas conforme o Código de Trânsito Brasileiro e regulamentações aplicáveis, não garantimos que todo o conteúdo esteja sempre atualizado no exato momento de alterações legislativas.
                                </p>
                                <div className="text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-3 py-2 rounded">
                                    Recomendamos que o usuário também consulte fontes oficiais.
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-orange-500" />
                                    5. Limitação de Responsabilidade
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-2 text-sm">A Sou Habilitado não se responsabiliza por:</p>
                                <ul className="list-disc pl-5 space-y-1 mb-3 text-slate-600 dark:text-slate-400 text-sm">
                                    <li>Decisões tomadas com base nos conteúdos da plataforma;</li>
                                    <li>Interpretação equivocada de questões ou explicações;</li>
                                    <li>Eventuais indisponibilidades temporárias do sistema;</li>
                                    <li>Resultados obtidos em exames oficiais.</li>
                                </ul>
                                <div className="text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded">
                                    O uso da plataforma é de responsabilidade exclusiva do usuário.
                                </div>
                            </div>
                        </div>

                        {/* Section 6 & 7 */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                    <ExternalLink className="h-5 w-5 text-sky-500" />
                                    6. Publicidade e Terceiros
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    A plataforma pode conter links para sites de terceiros ou exibir anúncios publicitários. Não somos responsáveis pelas práticas, políticas ou conteúdos de terceiros.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">7. Alterações neste Aviso</h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Este Aviso Legal pode ser atualizado a qualquer momento para refletir mudanças legais ou operacionais. A versão mais recente estará sempre disponível em nosso site.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Footer Contact */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 bg-amber-50/50 dark:bg-amber-900/10 -mx-8 sm:-mx-12 -mb-8 sm:-mb-12 p-8 sm:p-12 rounded-b-3xl">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">8. Contato</h3>
                                <p className="text-slate-500 dark:text-slate-400">Em caso de dúvidas sobre este Aviso Legal, entre em contato:</p>
                            </div>
                            <a
                                href="mailto:contato@souhabilitado.com"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors shadow-sm"
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
